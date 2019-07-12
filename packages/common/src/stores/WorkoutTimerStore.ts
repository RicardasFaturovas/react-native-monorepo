import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import dayjs from 'dayjs';

const padZero = (numberToPad: number): string => {
  let paddedNumber = `${numberToPad}`;
  if (numberToPad < 10) {
    paddedNumber = `0${numberToPad}`;
  }

  return paddedNumber;
}

export class WorkoutTimerStore {
  @persist('object') @observable startTime = dayjs();
  @persist @observable isRunning = false;
  @persist @observable seconds = 0;

  @action measure() {
    if (!this.isRunning) return;

    this.seconds = dayjs().diff(this.startTime, 'second');

    setTimeout(() => this.measure(), 1000);
  }

  @action startTimer() {
    this.isRunning = true;
    this.startTime = dayjs();
    this.measure();
  }

  @action endTimer() {
    this.seconds = 0;
    this.isRunning = false;
}

  @computed get display() {
    const minutes = Math.floor(this.seconds / 60);
    const seconds = this.seconds % 60;

    return `${padZero(minutes)}: ${padZero(seconds)}`;
  }

  
  @computed get percent() {
    return `${Math.min(100, (this.seconds / 60) * 100)}`;
  }
}
