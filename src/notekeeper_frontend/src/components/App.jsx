import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { notekeeper_backend } from "../../../declarations/notekeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      // Calling the notekeeper function to add a Note (Backend)
      notekeeper_backend.createNote(newNote.title, newNote.content)
      return [newNote, ...prevNotes];
    });
  }

  async function fetchData() {
    const notesArray = await notekeeper_backend.readNotes();
    setNotes(notesArray);
  }

  useEffect(() => {
    fetchData();
  }, [])


  function deleteNote(id) {
    //Pass the note id you want to delete from the frontend to backend
    notekeeper_backend.removeNote(id)
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
