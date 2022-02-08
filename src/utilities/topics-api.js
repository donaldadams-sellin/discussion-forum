import { sendRequest } from './send-request';

const BASE_URL = '/api/topics'

export function getTopics(){
    return sendRequest(BASE_URL);
}

export async function getThreads(id){
    const threads = await sendRequest(`${BASE_URL}/${id}`);
    return threads
}