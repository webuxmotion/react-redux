import React from 'react';
import { connect } from 'react-redux';
import Post from '../post/post';

const Posts = ({ posts }) => {
    if (!posts?.length) {
        return <p className="text-center">Empty posts</p>
    }
    return posts.map((post) => {
        return <Post post={post} key={post.id} />
    });
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts
    };
};

export default connect(mapStateToProps, null)(Posts);