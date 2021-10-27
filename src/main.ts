import Day from './day.ts';
import { existsSync } from 'https://deno.land/std/fs/mod.ts';

export interface Log {
  message: string;
  value: number;
}
export interface DayTime {
  day: string;
  time: number;
}
export type Response = Log[];

export class Solution {
  #day: string;
  #runTimes: DayTime[];

  constructor(day: number, runTimes: DayTime[]) {
    this.#day = day.toString();
    if (day <= 9) this.#day = `0${this.#day}`;
    this.#runTimes = runTimes;
  }

  async readValues(): Promise<void> {
    let runTimesIndex: number = -1;
    const currentDayTime: DayTime | undefined = this.#runTimes.find(
      (value: DayTime, i: number): boolean => {
        runTimesIndex = i;
        return value.day === this.#day;
      }
    );
    if (currentDayTime)
      console.log(
        `Day ${this.#day} is expected to run about ${currentDayTime.time}s`
      );
    Deno.chdir(`./src/${this.#day}`);
    if (!existsSync('./index.ts')) {
      console.error(`Day ${this.#day} is not solved`);
      return;
    }
    const execute: any = await import(`./${this.#day}/index.ts`);
    const file: string = Deno.readTextFileSync(`./values.txt`);
    const day: Day = new execute.default();

    const timeStart: number = performance.now();
    const response: Response = day.main(file.trim());
    const timeEnd: number = performance.now();
    Deno.chdir('../../');
    const totalTime: number = timeEnd - timeStart;
    if (!currentDayTime)
      this.#runTimes.push({
        day: this.#day,
        time: Math.round(totalTime / 1000),
      });
    else this.#runTimes[runTimesIndex].time = Math.round(totalTime / 1000);
    for (let i = 0; i < response.length; i++) {
      const log: Log = response[i];
      this.logger(i + 1, log.message, log.value);
    }
    console.log(`It took ${totalTime}ms to solve day ${this.#day}`);
  }

  private logger(part: number, message: string, value: number) {
    console.log(
      `[Year 2020, Day ${this.#day}, Part: ${part}] ${message}: ${value}`
    );
  }
}

const runTimes: DayTime[] = existsSync('./runtimes.json')
  ? JSON.parse(Deno.readTextFileSync('./runtimes.json'))
  : [];

for (const arg of Deno.args) {
  if (!isNaN(+arg)) await new Solution(+arg, runTimes).readValues();
  else console.error(`Parameter ${arg} is not a number`);
}

Deno.writeTextFileSync('./runtimes.json', JSON.stringify(runTimes));
