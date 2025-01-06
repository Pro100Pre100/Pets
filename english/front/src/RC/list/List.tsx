import { listProps } from '../../interfaces/main'
import TranslationItem from '../TranslationItem/TranslationItem';
import './List.css'

export default function List({ arr, wordsLanguage, setWordsLanguage, setModalWord }: listProps) {

  return (
    <>
      {arr.map((word, index) =>
        <TranslationItem
          setModalWord={setModalWord}
          key={word._id}
          arr={arr}
          startLanguage={word.startLanguage}
          toTranslate={word.toTranslate}
          translation={word.translated}
          wordsLanguage={wordsLanguage}
          setWordsLanguage={setWordsLanguage}
        />
      )}
    </>
  )
}
