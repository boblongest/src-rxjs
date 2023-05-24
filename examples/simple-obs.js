import { from, filter, map, delay, interval, take } from 'rxjs';

// Example 1
console.log("Example 1 with a single operator");
from(['A','B','C'])
  .pipe(                      // put together a list of operators (functions)
    filter(x => x != 'B')     // filter out the letter 'B'
  )
  .subscribe((response) => {  // call for the results of the observable and print
    console.log(response)
});

// Example 2
console.log("Example 2 with multiple operators showing a time series");
interval(1000)
  .pipe(                      // put together a list of operators (functions)
    take(4),                  // take the first 4 items emitted 
    filter(x => x != '2'),    // filter out the number '2'
    map(y => "" + y + 'A'),   // concat the letter 'A' to each item in the list
  )
  .subscribe((response) => {  // call for the results of the observable and print
    console.log(response)
  });

/*
Generated marbles at https://thinkrx.io/rxjs/filter/

const { rxObserver } = require('api/v0.3');
const { timer, interval } = require('rxjs');
const { filter, take, map } = require('rxjs/operators');

const source$ = timer(0, 5).pipe(
    take(4)
  );

const result$ = source$
  .pipe(   
    take(4),                  // put together a list of operators (functions)
    filter(x => x != '2'),    // filter out the number '2'
    map(y => "" + y + 'A'),   // concat the letter 'A' to each item in the list
  )

source$.subscribe(rxObserver());
result$.subscribe(rxObserver());
*/