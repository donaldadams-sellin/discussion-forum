import { Link } from 'react-router-dom'
import './ThreadComponent.css';

export default function ThreadComponent({ user, thread, deleteThread, idx, last }) {

    return (
        <div className={
            `ThreadComponent 
        ${idx % 2 === 0 ? 'even' : 'odd'} ${idx === 0 && 'top'} ${idx === last && 'bottom'}`}
        >
            <div>
                <Link to={thread._id}><p className='thread-title'>{thread.title}</p></Link>
                {user && ((user._id === thread.user._id || user.isAdmin) && <button className='delete-btn' onClick={() => deleteThread(thread._id)}>DELETE</button>)}
            </div>
            <div className='align-end'>
                <p>Replies: {thread.replies.length}</p>
            </div>
            <div className='align-end'>
                <p>Author: {thread.user.name}</p>
                <p>{thread.createdAt.slice(0, 10)}</p>
            </div>

        </div>
    )
}