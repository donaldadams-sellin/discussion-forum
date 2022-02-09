import { Link } from 'react-router-dom';
import './TopicComponent.css';

export default function TopicComponent({ topic, idx }) {
    return (
        <div className={`TopicComponent ${ idx % 2 === 0 ? 'even' : 'odd'}`}>
           <Link to={`/${topic._id}`}> <p className="TopicName">{topic.name}</p></Link>
            <p className="TopicDescription">{topic.description}</p>
        </div>
    )
}