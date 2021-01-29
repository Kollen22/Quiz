import React, { useState } from 'react';
import { useRouter } from 'next/router';

// import axios from 'axios';
import Button from '../src/components/Button';
import { Widget } from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitCorner from '../src/components/GithubCorner';
import Back from '../src/components/QuizBackground';
import db from '../db.json';
import { QuizContainer } from '../src/components/QuizContainer';

export default function Home() {
  // const [question, setQuestion] = useState([]);
  const [name, setName] = useState('');
  const router = useRouter();

  // axios.get('http://localhost:3001/questions')
  //   .then((response) => {
  //     setQuestion(response);
  //     console.log(question);
  //   });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Back backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Um Quiz qualquer</h1>
          </Widget.Header>
          <Widget.Content>
            <h4>Teste seus conhecimentos sobre alguma coisa!</h4>
          </Widget.Content>
          <Widget.Content>
            <Widget.Body onSubmit={handleSubmit}>
              <input type="text" placeholder="Digite seu nome" onChange={handleChange} />
              <Button type="submit" name={name.length === 0} value="Jogar" />
              <h4>
                Nome:
                <strong>{name}</strong>
              </h4>
            </Widget.Body>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h1>Quizes da Galera!</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Vários nada</p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>
      <GitCorner projectUrl="https://github.com/kollen22" />
    </Back>
  );
}
