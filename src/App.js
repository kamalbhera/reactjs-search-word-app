import {useState} from 'react'
// import logo from './logo.svg';
import './App.css';

function App() {
  const [word, setWord] = useState("");
  const [rhymeList, setRhymeList] = useState([]);

  function getRhymes() {
    fetch("https://api.datamuse.com/words?rel_rhy=" + word.toLowerCase())
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setRhymeList(res);
      });
  }
  return (
    <div className="App">
      <div className="inputContainer">
        <div className="prompt">Type a word to rhyme!</div>
        <input
          onChange={(event) => {
            event.preventDefault();
            setWord(event.target.value);
          }}
          className="input"
        />
        <button onClick={getRhymes} className="button" type="button">
          Rhyme word
        </button>
      </div>
      <div className="listContainer">
        <div className="successContainer">
          <div className="successText">
            {rhymeList.length === 0
              ? "Type a valid word"
              : `Found ${rhymeList.length} matching words!!!`}
          </div>
        </div>
        {rhymeList.map((rhyme, i) => (
          <div className="row">
            <div className="rowText">{rhyme.word}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
