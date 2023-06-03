import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Place object type.' })
export class Place {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  mapsUrl?: string;
}
