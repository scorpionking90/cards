import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      advanced_words: []
    }
  }
  componentDidMount() {
    const wordRef = firebase.database().ref('words');
    console.log(wordRef);
    wordRef.on('value', (snapshot) => {
      console.log(snapshot)
      let words = snapshot.val();
      let newState = [];
      for (let word in words) {
        newState.push({
          id: word,
          word: words[word].word,
          meaning: words[word].meaning
        })
      }
      this.setState({
        words: newState
      });
    });

    const advRef = firebase.database().ref('advanced_words');
    console.log(wordRef);
    advRef.on('value', (snapshot) => {
      console.log(snapshot)
      let advWords = snapshot.val();
      let newState = [];
      for (let advWord in advWords) {
        newState.push({
          id: advWord,
          advWord: advWords[advWord].word,
          meaning: advWords[advWord].meaning
        })
      }
      this.setState({
        advanced_words: newState
      });
    });
  }
  render() {
    // console.log(this.props.match.params.username);

    return (
      <div>
        <div>
          <a href="#normal">Words 1</a>
          <a href="#adv">Words 2</a>
        </div>
        <section id="normal">
          <div>
            <h1>Words 1</h1>
            {this.state.words.map((word) => {
              return (
                <div>
                  <h3>{word.word}</h3>
                  <p>{word.meaning}</p>
                </div>
              )
            })}
          </div>
        </section>
        <section id="adv">
          <div>
            <h1>Words 2</h1>
            {this.state.advanced_words.map((word) => {
              return (
                <div>
                  <h3>{word.advWord}</h3>
                  <p>{word.meaning}</p>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default App
