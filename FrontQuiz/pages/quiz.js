import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Widget } from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Button from '../src/components/Button';
import AlternativesForm from '../src/components/AlternativesForm';
import { QuizContainer } from '../src/components/QuizContainer';
import db from '../db.json';


function QuestionWidget({
  // eslint-disable-next-line react/prop-types
  quest, totalQuestions, currentIndex, onSubmit, addResult,
}) {
  const [selected, setSelected] = useState(undefined);
  const questionId = `question ${currentIndex}`;
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const alternativeSelected = selected !== undefined;
  // const [name, setName] = useState('');
  // const [puntuation, setPuntuation] = useState();
  let isCorrect;

  // useEffect(()=>{
  //   setName();
  // }, [setName]);

  // eslint-disable-next-line no-unused-expressions
  !quest ? isCorrect = undefined : isCorrect = selected === quest.answer;

  return (
    <Widget>
      <Widget.Header>
        Pergunta
        {' '}
        { currentIndex + 1 }
        {' '}
        de
        {' '}
        { totalQuestions }
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={!quest ? 'https://placehold.it/400x400' : quest.url}

      />

      <Widget.Content>
        <h2>
          {!quest ? 'Titulo' : quest.title}
        </h2>
        <p>
          {!quest ? 'Descrição' : quest.description}
        </p>

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelected(undefined);
            }, 2 * 1000);
          }}
        >
          {!quest ? '' : quest.alternatives.map((quest, index) => {
            const alternativeId = `alternativa ${index}`;
            const selectedStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelect = selected === index;

            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                data-selected={isSelect}
                data-status={isQuestionSubmited && selectedStatus}
              >

                <input
                  type="radio"
                  name={questionId}
                  id={alternativeId}
                  onChange={() => setSelected(index)}
                />
                {quest}

              </Widget.Topic>
            );
          })}
          <Button type="submit" value="Confirmar" name={!alternativeSelected} />

          {isQuestionSubmited && isCorrect}
          {isQuestionSubmited && !isCorrect}
        </AlternativesForm>

      </Widget.Content>
    </Widget>
  );
}

// eslint-disable-next-line react/prop-types
function ResultsWidget({ results, name }) {
  const router = useRouter();
  const [teste, setTeste] = useState([]);
  // eslint-disable-next-line react/prop-types
  const point = results.reduce((soma, resultado) => {
    const isCorrect = resultado === true;
    if (isCorrect) {
      return soma + 100;
    }

    return soma;
  }, 0);

  const users = {
    name,
    punc: point
  }

  useState(()=>{
    axios.post('http://localhost:3001/senduser', users)
    .then()
  })

  axios.get('http://localhost:3001/getpunc')
  .then(res => {
    setTeste(res.data);
  })
  
  function compare(a,b) {
    if (a.punc < b.punc)
       return +1;
    if (a.punc > b.punc)
      return -1;
    return 0;
  }
  teste.sort(compare);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/');
  }

  return (
    <QuizContainer>
      <Widget>
        <Widget.Header>
          Pontuação
        </Widget.Header>
        <Widget.Content>
          <h3>Ótimo {' '} {name} {' '}, vamos para a pontuação!</h3>
          <h5>
            {name}
            {' '}
            você fez
            {' '}
            {point}
            {' '}
            pontos!
          </h5>
        </Widget.Content>
        <Widget.Content>
          <Widget.Card>
            <ul>
              {teste.map((result, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>
                  {index + 1}
                  {' '}
                  <strong>
                  {result.name}
                  </strong>
                  {' '}
                  -
                  {' '}
                  {result.punc}
                  {' '}
                  pontos
                  
                </li>
              ))}

            </ul>
          </Widget.Card>
          <Widget.Body onSubmit={handleSubmit}><Button type="submit" value="Jogar"/></Widget.Body>
          
        </Widget.Content>
      </Widget>
    </QuizContainer>
  );
}

function LoadingWidget() {
  return (
    <QuizContainer>
      <Widget>
        <Widget.Header>
          Carregando Pergunta
        </Widget.Header>
        <Widget.Content>
          Carregando a pergunta
        </Widget.Content>
      </Widget>
    </QuizContainer>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Quiz() {
  const [question, setQuestion] = useState([]);
  const [results, setResults] = useState([]);
  const [name, setName] = useState('');

  const totalQuestions = question.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const quest = question[currentIndex];
  const [screenState, setScreenState] = useState(screenStates.LOADING);

  function addResult(result) {
    setResults([...results, result]);
  }
  console.log(results);

  useEffect(() => {
    axios.get('http://localhost:3001/questions')
      .then((response) => {
        setQuestion(response.data);
      });
  }, [setQuestion]);

  useEffect(() => {
    if (!question) {
      setScreenState(screenStates.LOADING);

    } else {
      setScreenState(screenStates.QUIZ);
      const search = location.search;
      const Name = search.slice(6);
      setName(Name);
    }
  }, []);

  const handleSubmit = (e) => {
    const nextQuestion = currentIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentIndex(currentIndex + 1);
      console.log(currentIndex);
    } else {
      setScreenState(screenStates.RESULT);
    }
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>

        {screenState === screenStates.QUIZ && (
        <QuestionWidget
          quest={quest}
          totalQuestions={totalQuestions}
          currentIndex={currentIndex}
          onSubmit={handleSubmit}
          addResult={addResult}

        />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultsWidget name={name} results={results} />}

      </QuizContainer>
    </QuizBackground>
  );
}
