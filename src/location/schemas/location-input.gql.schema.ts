import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class LocationInput {
  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => Float, { nullable: true })
  altitude: number | null;

  @Field(() => Float, { nullable: true })
  accuracy: number | null;

  @Field(() => Float, { nullable: true })
  altitudeAccuracy: number | null;

  @Field(() => Float, { nullable: true })
  heading: number | null;

  @Field(() => Float, { nullable: true })
  speed: number | null;

  @Field(() => Float)
  timestamp: number;
}
