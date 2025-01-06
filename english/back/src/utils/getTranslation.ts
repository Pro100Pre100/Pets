import puppeteer from 'puppeteer'
import { getTranslationProps } from 'src/interfaces/word.interface';

export const getTranslation = async (words, { startLanguage, toLanguage }) => {

  const resultWords = [];

  const browser = await puppeteer.launch({
    headless: false
  });

  const getData = async (word: string) => {

    const page = await browser.newPage();
    page.setDefaultTimeout(10000)

    await page.goto(`https://translate.yandex.ru/?source_lang=${startLanguage}&target_lang=${toLanguage}&text=${word}`);
    await page.waitForSelector('.Qn9a6K_RlhqIX7H0AZ0a');

    const wordTranlsations = await page.evaluate(() => {

      const findClass = '.Text.CydeOlIjD_toauAzGyJg.ddQ60iXJYcvRxYtH1GJg.q_bAuJPeF0y3NprmK2m1.IzfaFtWaTQtNDevuShe4.TpX4jdMzOVe9YwxEpisF.ACa0lWp_Xm3L6T8FMW5J.GqocpmTF2FkoSwvdNEEy'
      const arrWords = [];

      const nodes = document.querySelectorAll(findClass);

      for (let i = 0; i < 4; i++) {
        if (nodes[i]) {
          arrWords.push(nodes[i].textContent);
        }
      }

      return arrWords
    })

    return wordTranlsations;
  }

  for (let i = 0; i < words.length; i++) {

    const translations = await getData(words[i]);
    resultWords.push({
      toTranslate: words[i],
      translated: translations,
      startLanguage: startLanguage
    })

    if (words.length === resultWords.length) {
      browser.close();
      return resultWords
    }
  }


}
