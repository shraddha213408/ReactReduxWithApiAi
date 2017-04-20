import {FETCH_POSTS, SHOW_POST, FETCH_CHAT} from '../actions/index';

const INITIAL_STATE = {
	all: [],
	post: null
};

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case SHOW_POST:
			return {
				...state,
				post: action.payload.data
			};
		case FETCH_POSTS:
			return {
				...state, 
				all: action.payload.data
			};
		case FETCH_CHAT:
			return {
				...state,
				all: action.payload.data
			};
		default:
			return state;
	}
}
