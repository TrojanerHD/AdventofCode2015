import Day from '../day.ts';
import { Response } from '../main.ts';
import MD5 from './MD5.ts';

export default class Day04 implements Day {
  main(data: string): Response {
    let i: number = 0;
    let j: number = -1;
    let k: number = -1;

    while (true) {
      const hash: string = MD5(data + ++i);
      if (j === -1 && hash.startsWith('0'.repeat(5))) {
        j = i;
        if (k !== -1) break;
      }
      if (hash.startsWith('0'.repeat(6)) && k === -1) {
        k = i;
        if (j !== -1) break;
      }
    }
    return [
      {
        message:
          'The first MD5 hash starting with five zeros has the following number',
        value: j,
      },
      {
        message:
          'The first MD5 hash starting with five zeros has the following number',
        value: k,
      },
    ];
  }

}
