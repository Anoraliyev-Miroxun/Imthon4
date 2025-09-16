import { Repository } from 'typeorm';
import { IFindOptions, ISuccess } from '../response/interface-success';
import { successRes } from '../response/get-succes-res';
import { HttpException } from '@nestjs/common';

export class BaseService<CreateDto, UpdateDto, Entity> {
  constructor(private readonly repo: Repository<any>) {}

  get gerRepo() {
    return this.repo;
  }

  async create(dto: CreateDto): Promise<ISuccess> {
    let data = this.repo.create({
      ...dto,
    });
    data = (await this.repo.save(data)) as any as Entity;
    return successRes(data, 201);
  }

  async findAll(optinos?: IFindOptions<Entity>): Promise<ISuccess> {
    const data = (await this.repo.find()) as Entity[];
    return successRes(data);
  }

  async getById(id: number, optinos?: IFindOptions<Entity>) {
    const data = (await this.repo.findOne({
      select: optinos?.select || {},
      relations: optinos?.relations || [],
      where: { id, ...optinos?.where },
    })) as unknown as Entity;

    if (!data) {
      throw new HttpException('not found', 404);
    }

    return successRes(data);
  }

  async update(id: number, updateDto: UpdateDto): Promise<ISuccess> {
    await this.getById(id);
    await this.repo.update(id, updateDto as any);
    const data = await this.repo.findOne({ where: { id } });
    return successRes(data);
  }

  async delete(id: number) {
    const data = await this.repo.findOne({ where: { id } });
    if (!data) {
      throw new HttpException('not found', 404);
    }
    (await this.repo.delete(id)) as unknown as Entity;
    return successRes({});
  }
}
