import { useState } from "react";
import { Grid, Box } from "@mui/material";
import NoteForm from "../components/NoteForm";
import NoteItem from "../components/NoteItem";

function Notes({ notes, addNote, editNote, deleteNote }) {
  const [editingNote, setEditingNote] = useState(null);

  return (
    <>
      <h1 style={{margin: "10px 0"}}>Notes</h1>
      <NoteForm
        addNote={addNote} 
        editNote={editNote} 
        editingNote={editingNote}
        setEditingNote={setEditingNote}
      />

      {/* Sử dụng Grid để hiển thị danh sách ghi chú */}
      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Box>
              <NoteItem 
                note={note}
                onEdit={setEditingNote}
                onDelete={deleteNote}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Notes;