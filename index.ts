import './style.css';
import {
  map,
  BehaviorSubject,
  combineLatest,
  fromEvent,
  withLatestFrom,
} from 'rxjs';

const teamOneGoals$ = new BehaviorSubject<number>(0);
const teamTwoGoals$ = new BehaviorSubject<number>(0);
const totalGoals$ = new BehaviorSubject<number>(0);

const t1Btn = document.getElementById('t1Btn');
fromEvent(t1Btn, 'click')
  .pipe(
    withLatestFrom(teamOneGoals$),
    map((_event, goals) => goals + 1)
  )
  .subscribe((goals) => teamOneGoals$.next(goals));

const t2Btn = document.getElementById('t2Btn');
fromEvent(t2Btn, 'click')
  .pipe(
    withLatestFrom(teamTwoGoals$),
    map((_event, goals) => goals + 1)
  )
  .subscribe((goals) => teamTwoGoals$.next(goals));

combineLatest([teamOneGoals$, teamTwoGoals$])
  .pipe(map(([one, two]) => totalGoals$.next(one + two)))
  .subscribe();

teamOneGoals$.subscribe((v) => {
  document.getElementById('t1input').innerText = v.toString();
});
teamTwoGoals$.subscribe((v) => {
  document.getElementById('t2input').innerText = v.toString();
});
totalGoals$.subscribe((v) => {
  document.getElementById('totalinput').innerText = v.toString();
});
