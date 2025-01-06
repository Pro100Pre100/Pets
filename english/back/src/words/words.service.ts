import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, UpdateResult } from 'mongoose';
import { Word, WordsToBD } from 'src/interfaces/word.interface';
import { WordDto, WordUpdateDto } from './dto/word.dto';

@Injectable()
export class WordsService {
  constructor(@InjectModel('Word') private readonly wordModel: Model<Word>) { }

  async getAll() {
    return await this.wordModel.find();
  }

  async addOne(addedWord: WordDto): Promise<Word> {
    const createdWord = new this.wordModel(addedWord);
    return await createdWord.save();
  }

  async addMore(words: WordsToBD[]): Promise<Word[]> {
    return await this.wordModel.insertMany(words);
  }

  async updateOne(updateWord: WordUpdateDto): Promise<UpdateResult> {
    return await this.wordModel.updateOne({ toTranslate: updateWord.startValue },
      { toTranslate: updateWord.toTranslate, translated: updateWord.translated });
  }

  async deleteOne(deletedWord: WordDto): Promise<DeleteResult> {
    return await this.wordModel.deleteOne(deletedWord);
  }
}
