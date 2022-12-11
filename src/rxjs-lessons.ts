import { debounceTime, distinctUntilChanged, fromEvent, map, Observable } from "rxjs";

const search$ = new Observable<Event>(observer => {
  const search = document.getElementById('search');
  if (!search) {
    observer.error('Element does not exist')
    return;
  }
  search.addEventListener('input', event => {
    console.log(1)
    observer.next(event);
    observer.complete();
  })
});

// @ts-ignore
// const search$: Observable<Event> = fromEvent<Event>(document.getElementById('search'), 'input') // for RxJs для вызова событий


search$.pipe(
  map(event => {
    return (event.target as HTMLInputElement).value
  }),
  debounceTime(500),
  map(value => value.length > 3 ? value : ''),
  distinctUntilChanged(),
  ).subscribe(value => {
    console.log(value)
  })


