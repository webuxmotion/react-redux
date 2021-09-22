import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/actions';
import Loader from '../loader/loader';
import Post from '../post/post';

const FetchedPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.fetchedPosts)
    const loading = useSelector(state => state.app.loading)

    if (loading) {
        return <Loader />
    }
    if (!posts?.length) {
        return (
            <button 
                className="btn btn-primary"
                onClick={() => dispatch(fetchPosts())}
            >Load posts</button>
        );
    }

    return (
        <div>
            {posts.map((post) => {
                return <Post post={post} key={post.id} />
            })}
        </div>
    )
}

export default FetchedPosts;