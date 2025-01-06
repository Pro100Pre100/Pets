import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class WordDto {
  @IsString()
  @IsNotEmpty()
  toTranslate: string;

  translated?: string[];
  startLanguage: string;

  time?: number;
}

export class WordUpdateDto {
  @IsString()
  @IsNotEmpty()
  toTranslate?: string;

  @IsArray()
  @IsNotEmpty()
  translated?: string[];
  startValue: string;

  time?: number;
}

export class WordsDto {
  @IsArray()
  @IsNotEmpty()
  words: string[];
  languageSettings: {startLanguage: string, toLanguage: string}; 

  time?: number;
}