import { sendRequest } from './send-request';

const BASE_URL = '/api/topics'

export function getTopics(){
    return sendRequest(BASE_URL);
}