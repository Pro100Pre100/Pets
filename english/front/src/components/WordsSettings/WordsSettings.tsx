
import { ChangeEvent, SelectHTMLAttributes, useState } from 'react'
import './WordsSettings.css'
import BackButton from '../../RC/BackButton/BackButton'

export default function WordsSettings({ getLanguageValue }: { getLanguageValue: (selectValue: string) => void }) {


  return (
    <div className='settingsBlock'>
      <BackButton route='/' />
      <h2 className='settingsBlock__selectLanguageText'>Выбрать язык</h2>
      <select className="settingsBlock__selectLanguage" onChange={(event: ChangeEvent<HTMLSelectElement>) => getLanguageValue(event.target.value)}>
        <option value='all'>Все</option>
        <option value='ru'>Только русский</option>
        <option value='en'>Только Английский</option>
      </select>
    </div>
  )
}
