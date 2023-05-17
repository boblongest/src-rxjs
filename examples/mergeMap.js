import { mergeMap, from } from 'rxjs';
import axios from 'axios';

const urls = [
  'https://pokeapi.co/api/v2/pokemon/bulbasaur',
  'https://pokeapi.co/api/v2/pokemon/weedle',
  'https://pokeapi.co/api/v2/pokemon/charmander',
];

// Example 1 - with a single URL request");
from(urls)
  .pipe(
    mergeMap((url) => {
      return axios.get(url, { headers: { 'Accept-Encoding': 'application/json', } })
    })
  ).subscribe((response) => { 
    console.log(response.data.name)
  });
  
// Example 2 - with a chained URL request");
from(urls)
  .pipe(
    mergeMap((url) => {
      return axios.get(url, { headers: { 'Accept-Encoding': 'application/json', } })
    }),
    mergeMap((poke) => {
      return axios.get(`https://pokeapi.co/api/v2/ability/${poke.data.abilities[0].ability.name}`, { headers: { 'Accept-Encoding': 'application/json', } })
    })
  ).subscribe((response) => { 
    console.log(response.data.name)
  });
  