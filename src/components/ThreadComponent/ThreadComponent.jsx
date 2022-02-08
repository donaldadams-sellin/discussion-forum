import { Link } from 'react-router-dom'
import './ThreadComponent.css';

export default function ThreadComponent({ thread }) {
    return (
        <div className='ThreadComponent'>
            <Link to={thread._id}><p>{thread.title}</p></Link>
            <p>{thread.user.name}</p>
        </div>
    )
}