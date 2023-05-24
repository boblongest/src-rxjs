import { mergeMap, from, of, interval, map, take } from 'rxjs';
import axios from 'axios';

const headers = { headers: { 'Accept-Encoding': 'application/json', } }

const urls = [
  'https://pokeapi.co/api/v2/pokemon/bulbasaur',
  'https://pokeapi.co/api/v2/pokemon/weedle',
  'https://pokeapi.co/api/v2/pokemon/charmander',
];

// Example 1 - with a single URL request
from(urls)
  .pipe(
    mergeMap((url) => {
      return axios.get(url, headers)
    })
  ).subscribe((response) => { 
    console.log("mergeMap 1:" + response.data.name)
  });
  
// Example 2 - with a chained URL request
from(urls)
  .pipe(
    mergeMap((url) => {
      return axios.get(url, headers)
    }),
    mergeMap((poke) => {
      return axios.get(`https://pokeapi.co/api/v2/ability/${poke.data.abilities[0].ability.name}`, { headers: { 'Accept-Encoding': 'application/json', } })
    })
  ).subscribe((response) => { 
    console.log("mergeMap 2:" + response.data.name)
  });
  
// Example 3 - simple display of mergemap for marbles
const letters = of('a', 'b', 'c');    // collection of letters
const result = letters.pipe(
  mergeMap(x => interval(100)         // over intervals of 100ms
    .pipe(    
      take(3),                        // take the first 3 emitted values
      map(i => x + i)                 // append a number to each item in the collection
    )    
  )
);

result.subscribe(x => console.log("simple 3:" + x));

/*
Generated marbles at https://thinkrx.io/rxjs/mergeMap/

const { rxObserver, palette } = require('api/v0.3');
const { of, from, timer, pipe, interval } = require('rxjs');
const { zip, take, map, mergeMap, delayWhen } = require('rxjs/operators');

const letters = of('a', 'b', 'c');
const result = letters.pipe(
    mergeMap(x => interval(100)
      .pipe(
        take(3),
        map(i => x + i)
      )
    )
  );

// visualization
letters.subscribe(rxObserver('source$'));
result.subscribe(rxObserver('mergeMap( timer(0, 3).take(3) )'));

*/