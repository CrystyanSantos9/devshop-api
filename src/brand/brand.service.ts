import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Brand } from './entities/brand.entity'
import { S3 } from 'src/utils/s3'
import * as fs from 'fs'
import * as sharp from 'sharp'

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    private s3: S3
  ) {}
  async findAll(): Promise<Brand[]> {
    return this.brandRepository.find()
  }

  async findById(id: string): Promise<Brand> {
    return await this.brandRepository.findOne({ where: { id: id } })
  }

  async create(input: Brand): Promise<Brand> {
    return this.brandRepository.save(input)
  }

  async update(input: Brand): Promise<Brand> {
    console.log(input)
    await this.brandRepository.update(input.id, {
      name: input.name,
      slug: input.slug
    })
    return input
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.brandRepository.delete(id)
      return true
    } catch {
      return false
    }
  }

  async findBySlug(slug: string): Promise<Brand> {
    return this.brandRepository.findOne({ where: [{ slug }] })
  }

  async uploadLogo(
    id: string,
    createReadStream: () => any,
    filename: string,
    mimetype: string
  ): Promise<boolean> {
    const stream = createReadStream().pipe(sharp().resize(300))
    console.log(Buffer.from(stream.toString()).toJSON())
    const logoUrl = await this.s3.upload(
      stream,
      'devshop-s3-crystyan',
      mimetype,
      id + '-' + filename
    )
    await this.brandRepository.update(id, {
      logo: logoUrl
    })
    return true
  }
}
