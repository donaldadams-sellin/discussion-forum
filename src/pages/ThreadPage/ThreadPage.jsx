import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as threadsAPI from '../../utilities/threads-api';
import ReplyForm from '../../components/ReplyForm/ReplyForm';
import Reply from '../../components/Reply/Reply';
import './ThreadPage.css';


export default function ThreadPage({user}){
    const {threadId} = useParams();
    const [thread, setThread] = useState({replies:[]})
    const [showForm, setShowForm] = useState(false);

    async function deleteReply(replyId){
        const updatedThread = await threadsAPI.deleteReply(replyId);
        setThread(updatedThread);
    }

    useEffect(function(){
        console.log('does this run')
        async function getThread(){
            const thread = await threadsAPI.getThread(threadId);
            setThread(thread)
        }
        getThread();
    },[])
    return(
        <div className='ThreadPage'>
            <div className="thread-bar">
                <span className="thread-name">{thread.title}</span>
               { user && <button onClick={()=>setShowForm(!showForm)}>ADD REPLY</button> }
            </div>
            {showForm && <ReplyForm thread={thread} setThread={setThread} />}
            {thread.replies.map((reply, idx)=> <Reply user={user} reply={reply} deleteReply={deleteReply} key={idx} />)}
        </div>
    )
}