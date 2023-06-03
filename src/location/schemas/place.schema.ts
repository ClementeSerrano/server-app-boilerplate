import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Place {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
  })
  mapsUrl?: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
