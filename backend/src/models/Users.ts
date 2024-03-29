import { Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()

export class Users {
    @Field(_type => ID)
    id: string;

    @Field()
    @Length(3, 50)
    name: string;
}