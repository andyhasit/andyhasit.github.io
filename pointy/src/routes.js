import {Router} from '../../pillbug/dist/pillbug.js';

import HomePage from './views/HomePage';
import RecordsListingPage from './views/RecordsListingPage';

const routes = [
  ['/', HomePage],
  ['records', RecordsListingPage],
  //['todos/{id}?name,age', ''],
]


export {routes as default};