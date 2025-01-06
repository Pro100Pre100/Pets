import { ChangeEvent, KeyboardEvent, KeyboardEventHandler, useState } from 'react'
import './ModalAddWord.css'
import Input from '../../../RC/Input/Input'
import Button from '../../../RC/Button/Button'
import Item from '../../../RC/Item/Item'
import { addWords } from '../../../api/words'
import { modalAddWordProps } from '../../../interfaces/main'
import Loader from '../../../RC/Loader/Loader'

const languageSettings: { [index: string]: any } = {
  'russianToEnglish': { startLanguage: 'ru', toLanguage: 'en' },
  'englishToRussian': { startLanguage: 'en', toLanguage: 'ru' }
}

export default function ModalAddWord({ words, setModal, setIsShow, setIsShowError, selectValue }: modalAddWordProps) {

  const [wordAddList, setWordAddList] = useState<string[]>([]);
  const [wordToAdd, setWordToAdd] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const addWord = () => {

    //Если в массиве что-то есть, возв ращает false
    const existsWords = words.map((word) => word.toTranslate)

    const isUnique = ![...existsWords, ...wordAddList].includes(wordToAdd.toLowerCase());
    if (wordToAdd.length === 0
      || !isUnique
      || wordToAdd.length >= 20) {
      return
    }
    setWordAddList((prev) => [...prev, wordToAdd.toLowerCase()]);
    setWordToAdd('')
  }

  const enterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addWord()
    }
  }

  const sendWords = async () => {
    if (wordAddList.length > 0) {
      setIsLoading(true)
      try {
        await addWords({ words: wordAddList, languageSettings: languageSettings[selectValue] });
        setIsShow(true)
      }
      catch (err) {
        console.error(err);
        setIsShowError(true)
      }
      finally {
        setIsLoading(false);
        setWordAddList([]);
        setModal(false);
      }
    }

  }

  const clickItemHandler = (index: number) => () => {
    const newArr = [...wordAddList]
    newArr.splice(index, 1);
    setWordAddList(newArr);
  }

  const sendToList = (event: ChangeEvent<HTMLInputElement>) => {
    setWordToAdd(event.target.value)
  }

  return (
    <div className='modalAddWord'>
      {isLoading
        ? <div className='addWordLoader'><Loader /></div>
        : <ul className='modalAddWord__wordList'>
          {wordAddList.map((word, index) =>
            <Item
              key={word}
              word={word}
              clickHandler={clickItemHandler(index)}
            />)}
        </ul>}
      <div className='modalAddWord__panel'>
        <Input
          maxLength={20}
          onChange={sendToList}
          onKeyDown={enterHandler}
          value={wordToAdd}
        />

        <Button eventHandler={addWord} text={'Добавить слово'} />
        <Button eventHandler={sendWords} />
      </div>
    </div>
  )
}
