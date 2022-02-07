import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as topicsAPI from '../../utilities/topics-api';
import ThreadComponent from '../../components/ThreadComponent/ThreadComponent';
import ThreadForm from '../../components/ThreadForm/ThreadForm';
import './TopicPage.css';

export default function TopicPage({ topics, user }) {
    const { id } = useParams();
    const topic = topics.find((topic) => topic._id === id)
    const [threads, setThreads] = useState([]);
    const [showForm, setShowForm] = useState(false)

    useEffect(function () {
        async function getThreads() {
            const threads = await topicsAPI.getThreads(topic._id);
            console.log(`Topic Page ${threads}`)
            setThreads(threads);
        }
        getThreads();
    }, []);
    return (
        <div>
            <div className="topic-bar">
                <span className="topic-name">{topic.name}</span>
               { user && <button onClick={()=>setShowForm(!showForm)}>ADD THREAD</button> }
            </div>
            {showForm && <ThreadForm user={user} topic={topic} threads={threads} setThreads={setThreads} />}
            <div>
                {threads.map((thread, idx) => <ThreadComponent thread={thread} key={idx} />)}
            </div>
        
        </div>
    )
}