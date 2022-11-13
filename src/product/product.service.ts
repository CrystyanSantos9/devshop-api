import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './product.entity'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ loadRelationIds: true })
  }

  async findById(id: string): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id: id },
      loadRelationIds: true
    })
  }

  async create(input: Product): Promise<Product> {
    return await this.productRepository.save(input)
  }

  async update(input: Product): Promise<Product> {
    await this.productRepository.update(input.id, {
      name: input.name,
      slug: input.slug,
      description: input.description,
      category: input.category
    })
    return input
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.productRepository.delete(id)
      return true
    } catch {
      return false
    }
  }

  async findBySlug(slug: string): Promise<Product> {
    return this.productRepository.findOne({ where: [{ slug }] })
  }
}
