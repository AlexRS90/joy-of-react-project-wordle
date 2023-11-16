import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import Form from '../Form/Form';
import WordsList from '../WordsList/WordsList';
import {NUM_OF_GUESSES_ALLOWED} from '../../constants';
import WonBanner from '../WonBanner/WonBanner';
import LoseBanner from '../LoseBanner/LoseBanner';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [status, setStatus] = React.useState('running');
  function handleSubmitGuess(tentativeGuess){
    //todo
    const nextGuess = [...guesses, tentativeGuess];
    setGuesses(nextGuess);
    if(tentativeGuess === answer){
      setStatus('won')
    }else if(nextGuess.length >= NUM_OF_GUESSES_ALLOWED){
      setStatus('lost');
    }
  }
  return(
    <>
      <WordsList guesses={guesses} answer={answer} />
      <Form handleSubmitGuess={handleSubmitGuess} status={status} />
      {status === 'won' &&
        <WonBanner numOfGuesses={guesses.length} />
      }
      {status === 'lost' &&
        <LoseBanner answer={answer} />
      }
    </>
  );
}

export default Game;
