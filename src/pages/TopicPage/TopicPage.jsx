import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import * as topicsAPI from '../../utilities/topics-api';
import './TopicPage.css';

export default function TopicPage({ topics }) {
    const { id } = useParams();
    const topic = topics.find((topic) => topic._id === id)
    const [threads, setThreads] =useState([]);

    useEffect(function(){
        async function getThreads(){
            const threads = topicsAPI.getThreads(topic._id);
            setThreads(threads);
        }
        getThreads();
    },[]);
    return (
        <div>
            <h1>TEST</h1>
            <p>{topic.name}</p>
        </div>
    )
}