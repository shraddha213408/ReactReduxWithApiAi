import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPost} from '../actions/index';
import {Link} from 'react-router';


class PostsIndex extends Component {
	componentWillMount() {
		this.props.fetchPost();
	}

	renderPosts(){
		return (
			this.props.posts.map((post) => {
				return (
					<li className="list-group-item" key={post.id}>
						<Link to={"posts/" + post.id}>
							<span className="pull-xs-right">{post.categories}</span>
							<strong>{post.title}</strong>
						</Link>
					</li>
				)
			})
		)
	}

	render() {

		return (
			<div>
				<div className="text-xs-right">
					<Link to="/posts/new" className="btn btn-primary">
						Add a post
					</Link>
					<Link to="/chat" className="btn btn-primary">
						Chat
					</Link>
				</div>
				<h3>Posts</h3>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		posts: state.posts.all
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchPost}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
