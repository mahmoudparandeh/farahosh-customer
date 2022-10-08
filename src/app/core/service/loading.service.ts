import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  count = 0;
  countChanged = new EventEmitter<number>();

  countSet(count: number) {
    this.count = count;
  }
  onCountChange() {
    if (this.count > 0) {
      this.count--;
      this.countChanged.emit(this.count);
    }
  }
}
