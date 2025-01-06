import axios from "axios";
import { languageSettingsProps, languageSettingsState, sendUpdateState, wordParamsState } from "../interfaces/main";
import { ErrorResponse } from "react-router-dom";

const serverURL = 'http://localhost:4000';

export const addWord = async ({ toTranslate, time }: { toTranslate: string, time: string }) => {
  try {
    const res = await axios.post(serverURL + '/words/addWord', { toTranslate, time });
    return res
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    else console.error('try to reload this page')
  }
}

export const addWords = async ({ words, languageSettings }: { words: string[], languageSettings: languageSettingsState }) => {
  try {
    const res = await axios.post(serverURL + '/words/addWords', { words, languageSettings });
    return res
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    else console.error('try to reload this page')
  }
}


export const deleteWord = async (word: string) => {
  try {
    const res = await axios.delete(serverURL + '/words/deleteWord', {
      data: { toTranslate: word }
    });
    return res
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    else console.error('try to reload this page')
  }
}

export const getWords = async () => {
  try {
    const res = await axios.get(serverURL + '/words/getWords');
    return res.data
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    else console.error('try to reload this page')
  }
}

export const updateWord = async (wordUpdate: sendUpdateState) => {
  try {
    const res = await axios.patch(serverURL + '/words/updateWord', wordUpdate);
    return res.data
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    else console.error('try to reload this page')
  }
}