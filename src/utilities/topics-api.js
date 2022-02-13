import { sendRequest } from './send-request';

const BASE_URL = '/api/topics'

export function getTopics(){
    return sendRequest(BASE_URL);
}

export async function getThreads(topicId){
    const threads = await sendRequest(`${BASE_URL}/${topicId}`);
    return threads
}

export function createTopic(topicData){
    return sendRequest(BASE_URL, 'POST', topicData);
}

export function deleteTopic(topicId){
    return sendRequest(`${BASE_URL}/${topicId}`, 'DELETE');
}