import React, { useState } from 'react';
import './styles.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    photo: '',
    absences: '',
    grade: '',
    subject: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          ...form,
          photo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      name: form.name,
      photo: form.photo,
      absences: parseInt(form.absences, 10),
      grade: parseFloat(form.grade),
      subject: form.subject
    };

    setStudents([...students, newStudent]);
    setForm({
      name: '',
      photo: '',
      absences: '',
      grade: '',
      subject: ''
    });
  };

  const removeStudent = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  return (
    <div className="container">
      <Header />
      <main>
        <div className="main-content">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h2>Agregar Estudiante</h2>
              <label htmlFor="name">Nombre:</label>
              <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />

              <label htmlFor="photo">Foto:</label>
              <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} required />

              <label htmlFor="absences">Faltas:</label>
              <input type="number" id="absences" name="absences" value={form.absences} onChange={handleChange} required />

              <label htmlFor="grade">Calificación:</label>
              <input type="number" id="grade" name="grade" value={form.grade} onChange={handleChange} required />

              <label htmlFor="subject">Materia:</label>
              <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange} required />

              <button type="submit">Agregar Estudiante</button>
            </form>
          </div>

          <div className="student-list">
            {students.map((student, index) => (
              <div key={index} className={`student-item ${student.absences > 5 || student.grade < 7 ? 'red' : ''}`}>
                <img src={student.photo} alt={student.name} />
                <p>Nombre: {student.name}</p>
                <p>Faltas: {student.absences}</p>
                <p>Calificación: {student.grade}</p>
                <p>Materia: {student.subject}</p>
                <button className="remove-button" onClick={() => removeStudent(index)}>Remover</button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
