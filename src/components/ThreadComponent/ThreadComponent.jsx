import { Link } from 'react-router-dom'
import * as threadsAPI from '../../utilities/threads-api';
import './ThreadComponent.css';

export default function ThreadComponent({ user, thread, deleteThread }) {
    
    return (
        <div className='ThreadComponent'>
            <Link to={thread._id}><p>{thread.title}</p></Link>
            <p>{thread.user.name}</p>
           {user && (user._id === thread.user._id && <button onClick={()=> deleteThread(thread._id)}>DELETE THREAD</button>)}
        </div>
    )
}