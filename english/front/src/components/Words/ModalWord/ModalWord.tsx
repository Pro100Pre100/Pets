import { useLocation } from 'react-router-dom';
import Button from '../../../RC/Button/Button'
import Input from '../../../RC/Input/Input'
import './ModalWord.css'
import { ChangeEvent, useEffect, useState } from 'react';
import { modalWordProps, wordParamsState } from '../../../interfaces/main';
import { updateWord } from '../../../api/words';

export default function ModalWord({ modalWord, setModalWord, setIsShow }: modalWordProps) {

  const [wordParams, setWordParams] = useState<wordParamsState>({ startValue: '', toTranslate: '', translated: '' })

  const location = useLocation();
  const params = new URLSearchParams(location.search)

  useEffect(() => {
    const toTranslate = params.get('sl') ?? undefined;
    const translated = params.get('tl') ?? undefined;
    const startValue = toTranslate;
    setWordParams({ startValue: startValue, toTranslate: toTranslate, translated: translated })

  }, [modalWord])

  const sendToServer = async () => {
    try {
      const translations = wordParams.translated;
      const translatedArr = translations?.split(',').map((translation: string) => translation.trim());

      await updateWord({ ...wordParams, translated: translatedArr });

      setWordParams({ startValue: '', toTranslate: '', translated: '' });
      setModalWord(false);

      setIsShow(true);
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='modalWord'>
      <h2 className='modalWord__h2'>Изменить слово</h2>
      <div className="modalWord__sendSection">

        <div className='modalWord__inputArea'>
          <label className='modalWord__label' htmlFor='firstLanguage'>
            Слово:
          </label>
          <Input
            value={wordParams.toTranslate}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setWordParams({ ...wordParams, toTranslate: event.target.value })}
            id='firstLanguage' />
        </div>

        <div className='modalWord__inputArea'>
          <label className='modalWord__label' htmlFor='secondLanguage'>
            Перевод:
          </label>
          <Input
            value={wordParams.translated}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setWordParams({ ...wordParams, translated: event.target.value })}
            id='secondLanguage' />
        </div>

        <Button
          className='modalWord_button'
          text='Готово'
          eventHandler={sendToServer} />
      </div>
    </div >
  )
}
