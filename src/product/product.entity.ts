import { Category } from 'src/category/entities/category.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

interface ProductVariation {
  optionName1: string
  optionName2: string
  sku: string
  price: number
  weight: number
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 250, nullable: false })
  name: string

  @Column({ length: 900, nullable: false })
  description: string

  @Column({ length: 250, nullable: false })
  slug: string

  @ManyToOne(type => Category, category => category.id)
  category: Category

  @Column({ type: 'jsonb', nullable: true })
  optionNames: string[]

  @Column({ type: 'jsonb', nullable: true })
  variations: ProductVariation[]

  @Column({ length: 250, nullable: true })
  sku: string

  @Column({ nullable: true })
  prince: number

  @Column({ nullable: true })
  weight: number
}
