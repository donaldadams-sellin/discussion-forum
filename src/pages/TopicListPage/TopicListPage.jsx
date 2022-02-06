import * as topicsAPI from '../../utilities/topics-api'
import { useState, useEffect } from 'react';
import TopicComponent from '../../components/TopicComponent/TopicComponent';
import './TopicListPage.css';

export default function TopicListPage() {
    const [topics, setTopics] = useState([]);

    useEffect(function () { 
        async function getTopics(){
            const topics = await topicsAPI.getTopics();
            console.log(topics)
            setTopics(topics);
        }
        getTopics();
    }, []);

    return (
        <div className="TopicList">
            {topics.map((topic, idx)=><TopicComponent key={idx} topic={topic} />)}
        </div>
        
    )
}