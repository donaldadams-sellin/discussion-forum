import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as threadsAPI from '../../utilities/threads-api';
import ReplyForm from '../../components/ReplyForm/ReplyForm';
import Reply from '../../components/Reply/Reply';
import './ThreadPage.css';


export default function ThreadPage({ user }) {
    const { threadId } = useParams();
    const [thread, setThread] = useState({ replies: [] })
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    async function deleteReply(replyId) {
        const updatedThread = await threadsAPI.deleteReply(replyId);
        if (updatedThread) {
            setThread(updatedThread);
        } else {
            navigate(`/${thread.topic._id}`)
        }
        setThread(updatedThread);
    }

    async function editReply(replyId, replyContent) {
        const updatedThread = await threadsAPI.editReply(replyId, replyContent);
        setThread(updatedThread);
    }

    useEffect(function () {
        async function getThread() {
            const thread = await threadsAPI.getThread(threadId);
            console.log(thread);
            setThread(thread)
        }
        getThread();
    }, [])
    return (
        <>
            <div className="header-bar">
                {thread.replies.length && <Link className='btn' to={`/${thread.topic._id}`}> Back to {thread.topic.name}</Link>}
                <span className="header-name">{thread.title}</span>
                {user && <button className='btn' onClick={() => setShowForm(!showForm)}>ADD REPLY</button>}
            </div>
            {showForm && <ReplyForm thread={thread} setThread={setThread} setShowForm={setShowForm} />}
            {thread.replies.map((reply, idx) => <Reply user={user} reply={reply} deleteReply={deleteReply} editReply={editReply} idx={idx} last={thread.replies.length - 1} key={idx} />)}
        </>
    )
}