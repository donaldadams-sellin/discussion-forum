import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as usersAPI from '../../utilities/users-service';
import * as topicsAPI from '../../utilities/topics-api';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import TopicListPage from '../TopicListPage/TopicListPage';
import TopicPage from '../TopicPage/TopicPage';
import ThreadPage from '../ThreadPage/ThreadPage';

export default function App() {
  const [user, setUser] = useState(usersAPI.getUser());
  const [topics, setTopics] = useState([]);

  useEffect(function () {
    async function getTopics() {
      const topics = await topicsAPI.getTopics();
      setTopics(topics);
    }
    getTopics();
  }, []);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <div className="content">
        <Routes>
          <Route path="/" element={<TopicListPage user={user} topics={topics} setTopics={setTopics} />} />
          <Route path='/:id' element={<TopicPage user={user} topics={topics} />} />
          <Route path='/:id/:threadId' element={<ThreadPage user={user} />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
        </Routes>
      </div>


    </main>
  );
}

