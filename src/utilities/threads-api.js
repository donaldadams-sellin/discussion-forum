import { sendRequest } from './send-request';

const BASE_URL = '/api/threads';

export async function getThread(threadId){
    return sendRequest(`${BASE_URL}/${threadId}`)
}

export async function createThread(threadData){
    return sendRequest(`${BASE_URL}`, 'POST', threadData);
}

export async function addReply(replyData, threadId){
    return sendRequest(`${BASE_URL}/${threadId}/replies`, 'POST', replyData);
}