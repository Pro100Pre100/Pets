import { Body, Controller, Delete, Get, Patch, Post, ValidationPipe } from '@nestjs/common';
import { WordsService } from './words.service';
import { Word } from 'src/interfaces/word.interface';
import { WordDto, WordsDto, WordUpdateDto } from './dto/word.dto';
import { DeleteResult, UpdateResult } from 'mongoose';
import { getTranslation } from 'src/utils/getTranslation';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) { }
  @Get('/getWords')
  getWords() {
    return this.wordsService.getAll();
  }

  @Post('/addWord')
  createWord(@Body() addedWord: WordDto): Promise<Word> {
    try {
      return this.wordsService.addOne(addedWord);
    }
    catch (err) {
      throw new Error(err);
    }
  }

  @Post('/addWords')
  async createWords(@Body() addedWords: WordsDto): Promise<Word[]> {
    try {
      const arrWords = await getTranslation(addedWords.words, addedWords.languageSettings);
      return this.wordsService.addMore(arrWords);
    }
    catch (err) {
      throw new Error(err);
    }
  }

  @Patch('/updateWord')
  updateWord(@Body() updateWord: WordUpdateDto): Promise<UpdateResult> {
    try {
      return this.wordsService.updateOne(updateWord);
    }
    catch (err) {
      throw new Error(err);
    }
  }

  @Delete('/deleteWord')
  deleteWord(@Body() deletedWord: WordDto): Promise<DeleteResult> {
    try {
      return this.wordsService.deleteOne(deletedWord);
    }
    catch (err) {
      throw new Error(err);
    }
  }
}

