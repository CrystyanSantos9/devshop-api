import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { type } from 'os'
import { User } from './user.entity'

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => User, user => user.authTokens)
  user: User

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date

  @BeforeInsert()
  setCreatedDate(): void {
    this.createdAt = new Date()
  }
}
