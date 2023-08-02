import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryService } from './category.servcice'
import { CategoryPublic } from './dto/category'
import { CategoryCreateInput } from './dto/category-create.input'
import { CategoryUpdateInput } from './dto/category-update.input'
import { CategoryMapper } from './dto/category.mapper'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/utils/jwt-auth.guard'

@Resolver(of => CategoryPublic)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Query(returns => [CategoryPublic], { name: 'getAllCategories' })
  async getAllCategories(): Promise<CategoryPublic[]> {
    return this.categoryService.findAll()
  }

  @Query(returns => CategoryPublic, { name: 'getCategoryById' })
  async getCategoryById(@Args('id') id: string): Promise<CategoryPublic> {
    return await this.categoryService.findById(id)
  }

  @Query(returns => CategoryPublic, { name: 'getCategoryBySlug' })
  async getCategoryBySlug(@Args('slug') slug: string): Promise<CategoryPublic> {
    return await this.categoryService.findBySlug(slug)
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => CategoryPublic, { name: 'panelCreateCategory' })
  async createCategory(
    @Args('input') input: CategoryCreateInput
  ): Promise<CategoryPublic> {
    return this.categoryService.create(CategoryMapper.toEntity(input))
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => CategoryPublic, { name: 'panelUpdateCategory' })
  async updateCategory(
    @Args('input') input: CategoryUpdateInput
  ): Promise<CategoryPublic> {
    return this.categoryService.update(input)
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelDeleteCategory' })
  async deleteCategory(@Args('id') input: string): Promise<boolean> {
    return this.categoryService.delete(input)
  }
}
