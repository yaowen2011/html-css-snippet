// https://v6.angular.io/guide/practical-observable-usage
import { fromEvent } from 'rxjs';
// video of tutial https://www.youtube.com/watch?v=6lKoLwGlglE
import { ajax } from 'rxjs/ajax';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

const searchBox = document.getElementById('search-box')

// you can see an efficient method, will ask for so much
// conditions to finally decide to make a run
const typeahead$ = fromEvent(searchBox, 'input').pipe(
  map((e: KeyboardEvent) => e.target.value),
  filter(text => text.length > 2),
  debounceTime(10),
  distinctUntilChanged(), // this method must placed after debountTime() 
  switchMap(() => ajax('/api/endpoint'))
)

// subscribe the Observable, so you can 
// handle the data from the API
typeahead$.subscribe(data => {
  // ...todo
  // bind the data to the view
})


// something about mergeMap
var span = document.querySelector('span')

var input1 = document.querySelector('#input1')
var input2 = document.querySelector('#input2')
var obs1 = Rx.Observable.fromEvent(input1, 'input')
var obs2 = Rx.Observable.fromEvent(input2, 'input')
// after two Observable both emit values,will first generate first value
obs1.mergeMap(event1 => obs2.map(event2 => event1.target.value + ' ' + event2.target.value))
  .subscribe(combineValue => span.textContent = combineValue)
  
// how switchMap works
// 点击事件触发网络请求 重复点击重复触发
// switchMap will clear all other requests except current one
var obs1 = Rx.Observable.fromEvent(button, 'click')
var obs2 = Rx.Observable.interval(1000)//or like ajax('/api/request')
// obs1.subscribe(
// event => obs2.subscribe( value => console.log(value))
// )
obs1.switchMap(event => obs2)
  .subscribe(value => console.log(value))
