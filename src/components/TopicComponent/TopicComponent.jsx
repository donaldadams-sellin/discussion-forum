import { Link } from 'react-router-dom';
import './TopicComponent.css';

export default function TopicComponent({ topic, idx, last }) {
    return (
        <div className={`TopicComponent ${ idx % 2 === 0 ? 'even' : 'odd'} ${idx === 0 && 'top'} ${idx === last && 'bottom'}`}>
           <Link to={`/${topic._id}`}> <p className="TopicName">{topic.name}</p></Link>
            <p className="TopicDescription">{topic.description}</p>
        </div>
    )
}