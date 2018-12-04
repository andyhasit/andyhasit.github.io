import {Router} from '../../pillbug/dist/pillbug.js';

import HomePageView from './views/HomePageView';

const routes = [
  ['/', HomePageView],
  ['todos/{id}?name,age', ''],
]


export {routes as default};