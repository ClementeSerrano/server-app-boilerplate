import { Field, ObjectType } from '@nestjs/graphql';

import { Place } from 'src/location/dtos/object-types/place.object-type';

@ObjectType({ description: 'Message metadata object type.' })
export class MessageMetadata {
  @Field(() => [Place], { nullable: true })
  places?: Place[];
}
