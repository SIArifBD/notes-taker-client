import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";
import { useEffect, useState } from "react";



function App() {
  const [notes, setNotes] = useState([]);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {

    fetch("http://localhost:5000/notes")
      .then(res => res.json())
      .then(data => setNotes(data))


  }, [isReload]);
  /**
   * 1. here there will be a function named handleSearch to handle search by query, and it will be passed as props to header
   */
  const handleSearch = event => {
    event.preventDefault();
    const queryText = event.target.searchText.value;
    if (queryText) {
      fetch(`http://localhost:5000/notes?userName=${queryText}`)
        .then(res => res.json())
        .then(data => setNotes(data));
    }
  }


  /**
   * 2. here there will be a function named handleDelete to delete a note, and it will be passed as props to NoteCard that will be triggered using delete button.
   */
  const handlePost = event => {
    event.preventDefault();
    const userName = event.target.userName.value;
    const dataText = event.target.dataText.value;
    console.log({ userName, dataText });
    fetch('http://localhost:5000/note', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ userName, dataText }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsReload(!isReload);
      });
  }

  /**
   * 3. there will be a function named handleUpdate to update data, and it will be passed as props to NoteCard and later it will be passed to Update modal using props.
   */
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/notes?userName=${id}`)
  }






  /*
4.  there will be a function named handlePost
to post data to backend, and it will be passed as props to InputFrom.
 */



  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <InputForm handlePost={handlePost} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard
            note={note}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
