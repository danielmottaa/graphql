import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Users } from "../models/Users";
import crypto from 'crypto'

//query: buscar dados (famoso GET)
//mutation: Criar, alterar ou deletar dados (famoso: Create, Update and Delete)

@Resolver()
export class UserResolver {
  private data: Users[] = []
  @Query(() => [Users])
  async users () {
    return this.data
  }

  @Mutation(() => Users)
  async createUsers(
    @Arg('name') name: string
  ) {
    const user = {
      id: crypto.randomUUID(),
      name
    }
    this.data.push(user)
    return user;
  }

}