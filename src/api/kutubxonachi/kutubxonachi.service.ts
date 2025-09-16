import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKutubxonachiDto } from './dto/create-kutubxonachi.dto';
import { UpdateKutubxonachiDto } from './dto/update-kutubxonachi.dto';
import { BaseService } from 'src/infrastructure/base/base-service';
import { User } from 'src/core/entity/user-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoService } from 'src/infrastructure/crypto/Crypto';
import { Roles } from 'src/common/enum/role-enum';
import { TokenService } from 'src/infrastructure/token/Token';
import { IToken } from 'src/infrastructure/token/token-interface';
import { successRes } from 'src/infrastructure/response/get-succes-res';
import { Response } from 'express';

@Injectable()
export class UserService extends BaseService<
  CreateKutubxonachiDto,
  UpdateKutubxonachiDto,
  User
> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly crypto: CryptoService,
    private readonly tokenService: TokenService,
  ) {
    super(userRepo);
  }
  async createUser(createKutubxonachiDto: CreateKutubxonachiDto) {
    const { password: pass, email, role, ...rest } = createKutubxonachiDto;
    const rols = Roles.KUTUBXONACHI;
    const existEmail = await this.userRepo.findOne({ where: { email } });
    if (existEmail) {
      throw new ConflictException('email arleyed exist');
    }
    const password = String(this.crypto.encrypt(pass));
    super.create({ ...rest, password, email, role: rols });
  }

  async updateUser(id: number, updateUserDto: UpdateKutubxonachiDto) {
    const { password, email, role, ...rest } = updateUserDto;
    const admin = await this.userRepo.findOne({ where: { id } });
    if (email) {
      const existEmail = await this.userRepo.findOne({ where: { email } });
      if (existEmail && existEmail.id !== id) {
        throw new ConflictException('Username arledy exist');
      }
    }
    let pass = admin?.password;
    if (password) {
      pass = await this.crypto.encrypt(password);
    }

    await this.userRepo.update(id, {
      password: pass,
      email: email,
      role: Roles.KUTUBXONACHI,
      ...rest,
    });
    return this.userRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const data = await this.userRepo.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException('Admin not found');
    }
    return this.delete(id);
  }

  async singin(signInDto: CreateKutubxonachiDto, res: Response) {
    const { full_name, password } = signInDto;
    const admin = await this.userRepo.findOne({ where: { full_name } });
    const isMatchPassword = await this.crypto.decrypt(
      password,
      admin?.password || '',
    );
    if (!admin || !isMatchPassword) {
      throw new BadRequestException('Username or password incorrect');
    }
    const payload: IToken = {
      id: admin.id,
      role: admin.role,
    };
    const accessToken = await this.tokenService.accessToken(payload);
    const refreshToken = await this.tokenService.refreshToken(payload);
    await this.tokenService.writeCookie(res, 'adminToken', refreshToken, 30);
    return successRes({ token: accessToken });
  }
}
