import { mergeMap, concatMap, from } from 'rxjs';
import axios from 'axios';

const headers = { headers: { 'Accept-Encoding': 'application/json', } }

const urls = [
  'https://pokeapi.co/api/v2/pokemon/bulbasaur',
  'https://pokeapi.co/api/v2/pokemon/weedle',
  'https://pokeapi.co/api/v2/pokemon/charmander',
];

// Example 1 - with concatMap URL request
from(urls)
  .pipe(
    concatMap((url) => {
      return axios.get(url, headers)
    })
  ).subscribe((response) => { 
    console.log("concatMap:" + response.data.name)
  });

// Example 2 - with mergeMap URL request
from(urls)
  .pipe(
    mergeMap((url) => {
      return axios.get(url, headers)
    })
  ).subscribe((response) => { 
    console.log("mergeMap:" + response.data.name)
  });
  