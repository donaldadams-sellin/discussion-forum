import { useState } from 'react';
import TopicComponent from '../../components/TopicComponent/TopicComponent';
import TopicForm from '../../components/TopicForm/TopicForm';


export default function TopicListPage({ user, topics, setTopics }) {
    const [showAdmin, setShowAdmin] = useState(false);

    return (
        <>
            <h3>Browse to a topic to see what people are discussing!</h3>
            {topics.map((topic, idx, topics) => <TopicComponent key={idx} idx={idx} topic={topic} last={topics.length - 1} showAdmin={showAdmin} setTopics={setTopics} />)}
            <br />
            {user && user.isAdmin &&
                <div className="header-bar">
                    <span>Admin Info</span>
                    <span>Topics:{topics.length}</span>
                    {user && !user.isBanned ? <button className='btn' onClick={() => setShowAdmin(!showAdmin)}>SHOW ADMIN</button> : <div></div>}
                </div>
            }
            {(user && user.isAdmin && showAdmin) && <TopicForm setTopics={setTopics} />}
        </>

    )
}