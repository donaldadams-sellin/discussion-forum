import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as topicAPI from '../../utilities/topics-api'
import './TopicComponent.css';

export default function TopicComponent({ topic, idx, last, showAdmin, setTopics }) {
    const [showConfirm, setShowConfirm] = useState(false);

    async function deleteTopic() {
        const updatedTopics = await topicAPI.deleteTopic(topic._id);
        setTopics(updatedTopics);
        setShowConfirm(false);
    }

    return (
        <div className={`TopicComponent ${idx % 2 === 0 ? 'even' : 'odd'} ${idx === 0 && 'top'} ${idx === last && 'bottom'}`}>
            <div>
                <Link to={`/${topic._id}`}> <p className="TopicName">{topic.name}</p></Link>
                <p className="TopicDescription">{topic.description}</p>
            </div>
            {showAdmin && <p className="align-end">Sort Order Rank:{topic.sortOrder}</p>}
            <div className="align-end">
                {showAdmin && <button onClick={() => setShowConfirm(!showConfirm)} className="delete-btn">DELETE TOPIC</button>}
                {showConfirm &&
                    <>
                        <h2>Are you sure?</h2>
                        <button className="delete-btn" onClick={deleteTopic}>YES, DELETE</button>
                        <br />
                        <br />
                        <button onClick={() => setShowConfirm(!showConfirm)}>NO, CANCEL</button>
                    </>
                }
            </div>
        </div>
    )
}