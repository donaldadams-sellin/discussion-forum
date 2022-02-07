import { sendRequest } from './send-request';

const BASE_URL = '/api/threads';

export async function createThread(threadData){
    return sendRequest(`${BASE_URL}`, 'POST', threadData);
}