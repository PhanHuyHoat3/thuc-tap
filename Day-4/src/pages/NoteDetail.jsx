import React from 'react';
import { useParams } from 'react-router-dom';

function NoteDetail({ notes }) {
  const { id } = useParams();
  const note = notes.find((n) => n.id === Number(id));

  if (!note) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Không tìm thấy ghi chú</p>;

  const styles = {
    container: {
      padding: '20px',
      margin: '40px auto',
      maxWidth: '600px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      fontSize: '24px',
      marginBottom: '10px',
      color: '#333',
    },
    content: {
      fontSize: '16px',
      color: '#555',
      marginBottom: '10px',
    },
    date: {
      fontSize: '14px',
      color: '#888',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{note.title}</h2>
      <p style={styles.content}>{note.snippet}</p>
      <p style={styles.date}>Ngày tạo: {new Date(note.createdAt).toLocaleString()}</p>
    </div>
  );
}

export default NoteDetail;