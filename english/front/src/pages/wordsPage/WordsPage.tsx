import { useEffect, useState } from 'react'
import './WordsPage.css'
import Words from '../../components/Words/Words'
import Modal from '../../RC/Modal/Modal';
import ModalAddWord from '../../components/Words/ModalAddWord/ModalAddWord';
import Alert from '../../RC/Alert/Alert';
import WordsSettings from '../../components/WordsSettings/WordsSettings';
import { SortedWordsState, wordsLanguageState, wordState } from '../../interfaces/main';
import { getWords } from '../../api/words';
import ModalWord from '../../components/Words/ModalWord/ModalWord';
import { useNavigate } from 'react-router-dom';

export default function WordsPage() {

  const [modal, setModal] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string>('russianToEnglish');
  const [words, setWords] = useState<wordState[]>([]);
  const [wordsLanguage, setWordsLanguage] = useState<wordsLanguageState>({ ru: [], en: [] });
  const [sortMethod, setSortMethod] = useState('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [modalWord, setModalWord] = useState<boolean>(false);

  const navigate = useNavigate();

  const sortedWordsObj: SortedWordsState = {
    'all': wordsLanguage,
    'ru': { ru: wordsLanguage.ru, en: [] },
    'en': { en: wordsLanguage.en, ru: [] },
  }

  const objWordsProps = {
    setModal,
    selectValue,
    setSelectValue,
    setWordsLanguage,
    wordsLanguage,
    words,
    isLoading,
    sortedWordsObj: sortedWordsObj[sortMethod],
    isError,
    setWords,
    modalWord,
    setModalWord
  }

  useEffect(() => {
    const loadWords = async () => {
      try {
        const loadedWords = await getWords();
        setWords(loadedWords);
      }
      catch (err) {
        setIsError(true);
      }
      finally {
        setIsLoading(false);
      }
    }

    //Если появились новые слова обновлять их,
    //если нет ошибки при заходе на URL, показывать слова
    if (!isError || isShow) {
      loadWords();
    }
  }, [isShow])

  useEffect(() => {

    const ruWords = words.filter((word: wordState) => word.startLanguage === 'ru');
    const enWords = words.filter((word: wordState) => word.startLanguage === 'en');

    setWordsLanguage({ ru: ruWords, en: enWords });
  }, [words])

  const getLanguageValue = (selectValue: string) => {
    setSortMethod(selectValue);
  }

  useEffect(() => {
    if (!modalWord) {
      navigate('/words');
    }
  }, [modalWord])

  return (
    <div className='wordsPage'>
      <Alert type='success' isShow={isShow} setIsShow={setIsShow} />
      <Alert type='error' isShow={isShowError} setIsShow={setIsShowError} />
      <Modal modal={modal}
        setModal={setModal}
      >
        <ModalAddWord
          words={words}
          setModal={setModal}
          setIsShow={setIsShow}
          selectValue={selectValue}
          setIsShowError={setIsShowError}
        />
      </Modal>

      <Modal modal={modalWord} setModal={setModalWord}>
        <ModalWord
          modalWord={modalWord}
          setModalWord={setModalWord}
          setIsShow={setIsShow} />
      </Modal>

      <WordsSettings getLanguageValue={getLanguageValue} />
      <Words objWordsProps={objWordsProps} />
    </div>
  )
}
