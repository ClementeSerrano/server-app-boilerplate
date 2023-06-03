import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Place } from 'src/location/interfaces/place.interface';
import { PlaceSchema } from 'src/location/schemas/place.schema';

@Schema()
export class MessageMetadata {
  @Prop({
    type: PlaceSchema,
  })
  place?: Place;
}

export const MessageMetadataSchema =
  SchemaFactory.createForClass(MessageMetadata);
