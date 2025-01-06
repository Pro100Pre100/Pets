import { Module } from '@nestjs/common';
import { WordsModule } from './words/words.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [WordsModule, 
            MongooseModule.forRoot('mongodb+srv://englishAdmin:12345@englishcluster.ljvl6.mongodb.net/englishDB?retryWrites=true&w=majority&appName=EnglishCluster')]
})
export class AppModule {}