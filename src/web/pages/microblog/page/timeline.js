import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCreatePost } from '../../../../core/microblog/actions';

function formatUsername(user) {
  if (user && user.username) {
    return `@${user.username}`;
  } else {
    return 'Unknown';
  }
}

function formatCreated(timestamp) {
  const t = new Date(parseInt(timestamp, 10));
  return t.toString();
}

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleChange(text) {
    this.setState({ ...this.state, text });
  }

  handlePost() {
    const { text } = this.state;
    this.props.dispatch(requestCreatePost({ text }));
    this.setState({ ...this.state, text: '' });
  }

  render() {
    const { user, usersReducer } = this.props;
    console.log('PROPS IN TIME LINGE', this.props)
    const { text } = this.state;

    const list = Object.keys(usersReducer).map(id => [usersReducer[id], id]);
    list.reverse();

    return (
      <div>
        <h3>Signed-in as {user.username}</h3>
        <div>
          <input type="text" value={text} onChange={e => this.handleChange(e.target.value)} />
          <input type="button" value="Post" onClick={() => this.handlePost()} />
        </div>
        <ul>
          {list.map(([post, id]) =>
            <li key={id}>{post.body} by {formatUsername(post.user)} at {formatCreated(post.created)}</li>
          )}
        </ul>
      </div>
    );
  }
}

function select({ appMicroblogReducer, usersReducer, postsReducer }) {
  const user = usersReducer[appMicroblogReducer.user];

  const compl = Object.keys(postsReducer).reduce((p, key) => {
    const post = postsReducer[key];
    const complPost = { ...post, user: usersReducer[post.userId] };
    return { ...p, [key]: complPost };
  }, {});

  return { user, usersReducer: compl };
}

export default connect(select)(Timeline);
