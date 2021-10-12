import Day from '../day.ts';
import { Response } from '../main.ts';

export default class Day01 implements Day {
  main(data: string): Response {
    const parAsNumbers: number[] = data
      .split('')
      .map((element: string): -1 | 1 => (element === '(' ? 1 : -1));
    let found: boolean = false;
    return [
      {
        message: 'The instructions take Santa to floor',
        value: parAsNumbers.reduce((a: number, b: number): number => a + b),
      },
      {
        message:
          'The position of the character that causes Santa to first enter the basement',
        value: parAsNumbers.reduce(
          (a: number, b: number, i: number): number => {
            if (a === -1) {
              found = true;
              return i;
            }
            return found ? a : a + b;
          }
        ),
      },
    ];
  }
}
