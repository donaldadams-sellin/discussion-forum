import { Link } from 'react-router-dom';
import './TopicComponent.css';

export default function TopicComponent({ topic }) {
    return (
        <div className="TopicComponent">
           <Link to={`/${topic._id}`}> <p className="TopicName">{topic.name}</p></Link>
            <p className="TopicDescription">{topic.description}</p>
        </div>
    )
}