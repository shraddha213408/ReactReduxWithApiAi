import axios from 'axios';
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const SHOW_POST = 'SHOW_POST';
export const DELETE_POST = 'DELETE_POST';
export const FETCH_CHAT = 'FETCH_CHAT';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=987abc234def';
const CLIENT_KEY = '62f4d1092c244580aac9ca6ef9e5c547'; // your client key goes here
const API_AI_URL = 'https://api.api.ai/v1/query';

export function fetchPost() {
	const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)

	return {
		type: FETCH_POSTS,
		payload: request
	};
}

export function createPost(props) {
	const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props)

	return {
		type: CREATE_POST,
		payload: request
	};
}

export function showPost(id) {
	const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)

	return {
		type: SHOW_POST,
		payload: request
	};
}

export function deletePost(id) {
	const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)

	return {
		type: DELETE_POST,
		payload: request
	};
}

export function getChat(query){
	const request = axios({
		method: 'post',
		url: API_AI_URL,
		data: {
			"query": query,
			"lang": "en",
    		"sessionId": "1234567890"
		},
		headers: {"Authorization": `Bearer ${CLIENT_KEY}`,"Content-Type": "application/json; charset=utf-8"}
	})

	return {
		type: FETCH_CHAT,
		payload: request
	};
}
