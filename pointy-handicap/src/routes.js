import {Router} from '../../pillbug/dist/pillbug.js';

import HomePage from './views/HomePage';

const routes = [
  ['/', HomePage],
  //['records', RecordsListingPage],
  //['todos/{id}?name,age', ''],
]


export {routes as default};