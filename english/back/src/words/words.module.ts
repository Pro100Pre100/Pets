import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WordSchema } from 'mongodb/models/word';

@Module({
  controllers: [WordsController],
  providers: [WordsService],
  imports: [MongooseModule.forFeature([{ name: 'Word', schema: WordSchema }])],
})
export class WordsModule {}
