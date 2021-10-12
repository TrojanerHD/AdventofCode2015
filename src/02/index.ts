import Day from '../day.ts';
import { Response } from '../main.ts';

export default class Day02 implements Day {
  main(data: string): Response {
    return [
      {
        message: 'Total square feet of wrapping paper',
        value: data
          .split(/\r?\n/)
          .filter((value: string): boolean => value !== '')
          .reduce(
            (a: number, present: string): number =>
              a +
              2 *
                Number(present.split('x')[0]) *
                Number(present.split('x')[1]) +
              2 *
                Number(present.split('x')[1]) *
                Number(present.split('x')[2]) +
              2 *
                Number(present.split('x')[0]) *
                Number(present.split('x')[2]) +
              Number(present.split('x').sort((a: string, b: string): number => Number(a) - Number(b)).slice(0, 2).reduce((a: string, b: string): string => (Number(a) * Number(b)).toString())),
            0
          ),
      },
      {
        message: 'Total feet of ribbon',
        value: data.split(/\r?\n/).reduce(
          (previous, present) =>
            previous +
            2 *
              Number(
                present
                  .split('x')
                  .sort((a: string, b: string): number => Number(a) - Number(b))
                  .slice(0, 2)
                  .reduce((a: string, b: string): string =>
                    (Number(a) + Number(b)).toString()
                  )
              ) +
            Number(present.split('x')[0]) *
              Number(present.split('x')[1]) *
              Number(present.split('x')[2]),
          0
        ),
      },
    ];
  }
}
