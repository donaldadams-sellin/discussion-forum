import { sendRequest } from './send-request';

const BASE_URL = '/api/threads';


//thread top level functions
export async function getThread(threadId){
    return sendRequest(`${BASE_URL}/${threadId}`)
}

export async function createThread(threadData){
    return sendRequest(`${BASE_URL}`, 'POST', threadData);
}

export async function deleteThread(threadId){
    return sendRequest(`${BASE_URL}/${threadId}`, 'DELETE');
}

//thread reply level functions
export async function addReply(replyData, threadId){
    return sendRequest(`${BASE_URL}/${threadId}/replies`, 'POST', replyData);
}

export async function deleteReply(replyId){
    return sendRequest(`/api/replies/${replyId}`, 'DELETE');
}