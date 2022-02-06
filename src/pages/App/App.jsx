import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import TopicListPage from '../TopicListPage/TopicListPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      <>
        <NavBar user={user} setUser={setUser} />
        <div className="content">
        <Routes>
          <Route path="/" element={<TopicListPage />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
        </Routes>
        </div>
       </>

    </main>
  );
}

