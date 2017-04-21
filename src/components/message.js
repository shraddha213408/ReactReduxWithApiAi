import React, {Component, PropTypes} from 'react';
import html from 'html-parse-stringify';
class Message extends Component {
	render() {
		const fromMe = this.props.fromMe ? 'from-me' : '';
		return (
			<div className={`message ${fromMe}`}>
				<div className="message-body">
					{this.props.message}
				</div>
			</div>
		);
	}
}

export default Message;
