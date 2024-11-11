// sagas/todoSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { setTodos } from '../slices.js/todoSlices';

function* fetchTodos() {
  try {
    const response = yield call(axios.get, 'https://66f5fc36436827ced9759ca6.mockapi.io/todo');
    yield put(setTodos(response.data));
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  }
}

export default function* todoSaga() {
  yield takeEvery('todo/fetchTodos', fetchTodos);
}