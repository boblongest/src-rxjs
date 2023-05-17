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
  .pipe(   
    take(4),                  // put together a list of operators (functions)
    filter(x => x != '2'),    // filter out the letter 'B'
    map(y => "" + y + 'A'),   // concat the number 1 to each item in the list
  )
  .subscribe((response) => {  // call for the results of the observable and print
    console.log(response)
  });
