import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WordDocument = HydratedDocument<Word>;

@Schema()
export class Word {
  @Prop()
  toTranslate: string;

  @Prop()
  translated: string[];

  @Prop()
  startLanguage: string;

  @Prop()
  time: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);