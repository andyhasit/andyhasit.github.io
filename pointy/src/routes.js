import {Router} from '../lib/pillbug.js';

import HomePage from './views/homepage';

const routes = [
  ['/', HomePage],
  ['todos/{id}?name,age', ''],
]


export {routes as default};