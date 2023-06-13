import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Brand } from './entities/brand.entity'
import { S3 } from 'src/utils/s3'
import * as fs from 'fs'

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

  async uploadLogo(input: string): Promise<Brand> {
    const stream = fs.createReadStream('assets/logo.png')
    console.log(Buffer.from(stream.toString()).toJSON())
    await this.s3.upload(
      'test1.png',
      stream,
      'devshop-s3-crystyan',
      'image/png',
      'test1.png'
    )
    return null
  }
}
