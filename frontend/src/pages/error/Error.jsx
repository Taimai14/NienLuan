import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useState } from 'react';
import './error.scss'

export default function Error() {
  const[genre, setGenre] = useState('');
  return (
      <div >
        <Navbar setGenre={setGenre}/>
        <div className='page'>
        <h1>PAGE NOT FOUND 404</h1>
        </div>
    </div>
  )
}
