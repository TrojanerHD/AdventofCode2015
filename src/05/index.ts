import Day from '../day.ts';
import { Response } from '../main.ts';

export default class Day05 implements Day {
  main(data: string): Response {
    return [
      {
        message: 'Number of nice strings',
        value: data
          .split(/\r?\n/)
          .filter(
            (value: string): boolean =>
              !!value.match(/(.*[aeiou]){3}/) &&
              !!value.match(/(.)\1/) &&
              !['ab', 'cd', 'pq', 'xy'].find((notInclude: string): boolean =>
                value.includes(notInclude)
              )
          ).length,
      },
      {message: 'Number of nice strings with the new rules',
    value: data.split(/\r?\n/).filter((value: string): boolean => !!value.match(/(..).*\1/) && !!value.match(/(.).\1/)).length}
    ];
  }
}
