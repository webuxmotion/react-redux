import { takeEvery, put, call } from 'redux-saga/effects';
import { hideLoader, savePosts, showAlert, showLoader } from './actions';
import { REQUEST_POSTS } from './types';

function* sagaWatcher() {
    yield takeEvery(REQUEST_POSTS, sagaWorker);
}

function* sagaWorker() {
    try {
        yield put(showLoader());
        const payload = yield call(fetchPosts);
        yield put(savePosts(payload));
    } catch (e) {
        yield put(showAlert('Что-то пошло не так!'));
    } finally {
        yield put(hideLoader());
    }
}

async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    return await response.json();
}

export {
    sagaWatcher
}