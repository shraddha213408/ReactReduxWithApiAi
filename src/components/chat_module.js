import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getChat} from '../actions/index';
import {Link} from 'react-router';
import Messages from './messages';
import Modal from 'react-modal';

const customStyles = {
	overlay : {
	    position          : 'fixed',
	    top               : 0,
	    left              : '50%',
	    right             : 0,
	    bottom            : 0,
	    marginRight		  : '-50%',
	    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
	    width             : '50%'
	 },
	 content : {
	 	overflow          		   : 'hidden',
	 	position                   : 'absolute',
	    top                        : '10px',
	    left                       : '40px',
	    right                      : '40px',
	    bottom                     : '10px',
	    border                     : '1px solid #ccc',
	    background                 : '#fff',
	    WebkitOverflowScrolling    : 'touch',
	    borderRadius               : '4px',
	    outline                    : 'none',
	    padding                    : '10px'
	 }
};

class ChatModule extends Component {
	constructor(props){
		super(props);
		this.state = {
			term:'',
			messages:[],
			modalIsOpen: true
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);

		this.openModal = this.openModal.bind(this);
	    this.closeModal = this.closeModal.bind(this);
	    this.quickReply = this.quickReply.bind(this);
	}

	openModal() {
		this.setState({modalIsOpen: true});
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}
	componentDidUpdate(prevProps, prevState){
		if(prevProps.chat !== this.props.chat){
			Object.values(this.props.chat).map((res) => {
				if(res.fulfillment !== undefined){
					if(res.fulfillment.messages!== undefined){
						res.fulfillment.messages.map((message) => {
							if(message.type === 0){
								if(message.speech !== '') {
									this.addMessage({message: message.speech, fromMe: false});
								}
							}else if(message.type === 1){
								if(message.title !== '' && message.title!==undefined || message.subtitle !== '' && message.subtitle!==undefined){
									const cardMessage = [message.title, <br/>,  message.subtitle];
									this.addMessage({message: cardMessage, fromMe: false});
								}
								if(message.imageUrl !== undefined){
									const cardMessage = [<a href='https://belong.com.au/about-us' target='_blank'><img src={message.imageUrl} width='50px' height='50px'/></a>];
									this.addMessage({message: cardMessage, fromMe: false});
								}
								if(message.buttons !== undefined){
									message.buttons.map((cards) => {
										const cardMessage = [<a href={cards.postback} target='_blank'><button className='btn btn-primary'>{cards.text}</button></a>];
										this.addMessage({message: cardMessage, fromMe: false});
									})
								}
							} else if(message.type === 2) {
								if(message.replies !== undefined){
									let reply = [];
									let cardMessage;
									message.replies.map((cards) => {
										reply.push(<button className="btn btn-primary reply-btn" value={cards} onClick={this.quickReply}>{cards}</button>);
										cardMessage = [message.title, <br/>, reply];
									});
									this.addMessage({message: cardMessage, fromMe: false});
								}
							} else if(message.type === 3){
								if(message.imageUrl !== undefined){
									const cardMessage = [<a href='https://belong.com.au/about-us' target='_blank'><img src={message.imageUrl} width='50px' height='50px'/></a>] ;
									this.addMessage({message: cardMessage, fromMe: false});
								}
							}
						});
					}else{
						if(res.fulfillment.speech !== '') {
							this.addMessage({message: res.fulfillment.speech, fromMe: false});
						}
					}
				}
			})
		}
	}

	quickReply(event) {
		console.log(event.target.value);
		this.addMessage({message: event.target.value, fromMe: true});
		this.props.getChat(event.target.value);
	}

	onInputChange(event){
		this.setState({
			term: event.target.value
		})
	}

	onFormSubmit(event){
		event.preventDefault();
		const messageObject = {
			message: this.state.term,
			fromMe: true
		};
		this.addMessage(messageObject);

		this.props.getChat(this.state.term);
		this.setState({
			term: ''
		})
	}

	addMessage(message) {
		const messages = this.state.messages;
		messages.push(message);
		this.setState({messages});
	}

	renderChat() {
		return (
			Object.values(this.props.chat).map((res) => {
				return <div className="pull-xs-right">{res.speech}</div>
			})
		)
	}

	render() {
		return (
			<div>
				<Link to="/">Back To Index</Link>
				<Link to="/chat" className="btn btn-primary pull-xs-right" onClick={this.openModal}>
					Chat
				</Link>
				<Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
				    <div className="container">
			            <Messages messages={this.state.messages} />
		            	<form onSubmit={this.onFormSubmit} className="chat-input">
			                <input required placeholder="Hey, ask me something..." type="text" onChange={this.onInputChange} value={this.state.term} />
		                </form>
				    </div>
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		chat: state.posts.all
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getChat}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatModule);
