import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as threadsAPI from '../../utilities/threads-api';
import './ThreadPage.css';


export default function ThreadPage(){
    const {threadId} = useParams();
    const [thread, setThread] = useState({replies:[]})

    useEffect(function(){
        console.log('does this run')
        async function getThread(){
            const thread = await threadsAPI.getThread(threadId);
            setThread(thread)
        }
        getThread();
    },[])
    return(
        <div>
            <p>{thread.title}</p>
            {thread.replies.map((reply, idx)=> <p>{reply.content}</p>)}
        </div>
    )
}