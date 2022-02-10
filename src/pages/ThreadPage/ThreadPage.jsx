import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as threadsAPI from '../../utilities/threads-api';
import ReplyForm from '../../components/ReplyForm/ReplyForm';
import Reply from '../../components/Reply/Reply';
import './ThreadPage.css';


export default function ThreadPage({ user }) {
    const { threadId } = useParams();
    const [thread, setThread] = useState({ replies: [] })
    const [showForm, setShowForm] = useState(false);

    async function deleteReply(replyId) {
        const updatedThread = await threadsAPI.deleteReply(replyId);
        setThread(updatedThread);
    }

    async function editReply(replyId, replyContent){
        const updatedThread = await threadsAPI.editReply(replyId, replyContent);
        setThread(updatedThread);
    }

    useEffect(function () {
        async function getThread() {
            const thread = await threadsAPI.getThread(threadId);
            setThread(thread)
        }
        getThread();
    }, [])
    return (
        <>
            <div className="topic-bar">
                <span className="topic-name">{thread.title}</span>
                {user && <button onClick={() => setShowForm(!showForm)}>ADD REPLY</button>}
            </div>
            {showForm && <ReplyForm thread={thread} setThread={setThread} setShowForm={setShowForm} />}
            {thread.replies.map((reply, idx) => <Reply user={user} reply={reply} deleteReply={deleteReply} editReply={editReply} idx={idx} last={thread.replies.length -1} key={idx} />)}
        </>
    )
}