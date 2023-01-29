import { BehaviorSubject, map, Observable, take } from 'rxjs';

export abstract class DataBase<T> {
  protected data$: BehaviorSubject<T[]> = new BehaviorSubject([]);

  public findOne(
    key: string,
    value: string | boolean | number,
  ): Observable<T | null> {
    return this.data$.pipe(
      take(1),
      map((data) => {
        console.log(data);
        const foundItem = data.find((item) => item[key] === value);
        return foundItem ? foundItem : null;
      }),
    );
  }
}
