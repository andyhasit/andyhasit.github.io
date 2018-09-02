import {App, Route, RouteArg} from '../dist/pillbug.js'
const c = console

test('RouteArg', () => {

  var routeArg = new RouteArg('id:int')
  expect(routeArg.convert('5')).toBe(5)

  var routeArg = new RouteArg('id:str')
  expect(routeArg.convert('5')).toBe('5')

  var routeArg = new RouteArg('id:float')
  expect(routeArg.convert('5')).toBe(5.0)

  var routeArg = new RouteArg('id')
  expect(routeArg.convert('5')).toBe('5')
})


test('Route with no arg', () => {
  let route = new Route('todos')
  expect(route.match('ztodos')).toBe(false)
  expect(route.match('todos')).toEqual({})
})


test('Route with one arg', () => {
  let route = new Route('todos/{id:int}')
  expect(route.match('ztodos/{id}')).toBe(false)
  expect(route.match('todos/79')).toEqual({id: 79})
})


test('Route with two args', () => {
  let route = new Route('todos/{id:int}/item/{pos:int}')
  expect(route.match('todos/79/item/45')).toEqual({id: 79, pos: 45})
})


test('Route with one param', () => {
  let route = new Route('todos?id:int')
  expect(route.match('ztodos')).toBe(false)
  expect(route.match('todos?id=79')).toEqual({id: 79})
})


test('Route with two params', () => {
  let route = new Route('todos?id:int,name')
  expect(route.match('ztodos')).toBe(false)
  expect(route.match('todos?id=79&name=joe')).toEqual({id: 79, name:'joe'})
})
