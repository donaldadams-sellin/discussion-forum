import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as topicsAPI from '../../utilities/topics-api';
import * as threadsAPI from '../../utilities/threads-api';
import ThreadComponent from '../../components/ThreadComponent/ThreadComponent';
import ThreadForm from '../../components/ThreadForm/ThreadForm';

export default function TopicPage({ topics, user }) {
    const { id } = useParams();
    const topic = topics.find((topic) => topic._id === id);
    const [threads, setThreads] = useState([]);
    const [showForm, setShowForm] = useState(false);

    async function deleteThread(threadId){
        const updatedThreads = await threadsAPI.deleteThread(threadId);
        setThreads(updatedThreads);
    }
    
    useEffect(function () {
        async function getThreads() {
            const threads = await topicsAPI.getThreads(topic._id);
            setThreads(threads);
        }
        getThreads();
    }, [topic]);
    return (
        <>
            <div className="header-bar">
                <span className="header-name">{topic && topic.name}</span>
                <span>Threads:{threads.length}</span>
               { user && !user.isBanned ? <button className='btn' onClick={()=>setShowForm(!showForm)}>ADD THREAD</button> : <div></div>}
            </div>
            {threads.length === 0 && <h1>No Threads Yet</h1>}
            {(showForm && user && !user.isBanned) && <ThreadForm user={user} topic={topic} threads={threads} setThreads={setThreads} />}
            
                {threads.map((thread, idx, threads) => <ThreadComponent user={user} thread={thread} deleteThread={deleteThread} idx={idx} key={idx} last={threads.length -1} />)}
           
        
        </>
    )
}