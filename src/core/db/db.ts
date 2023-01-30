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
        const foundItem = data.find((item) => item[key] === value);
        return foundItem ? foundItem : null;
      }),
    );
  }
  public update(key: string, dataToUpdate: T): Observable<T> {
    return this.data$.pipe(
      take(1),
      map((data) => {
        const updatedData = data.map((dataItem) =>
          dataItem[key] === dataToUpdate[key]
            ? { ...dataItem, ...dataToUpdate }
            : dataItem,
        );
        this.data$.next(updatedData);
        return dataToUpdate;
      }),
    );
  }
  public create<C>(createDto: C): Observable<T> {
    return this.data$.pipe(
      take(1),
      map((data) => {
        const id = data.length;
        const createdItem = {
          id,
          ...createDto,
        } as T;
        this.data$.next([...data, createdItem]);
        return createdItem;
      }),
    );
  }
}
