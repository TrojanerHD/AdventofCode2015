import Day from '../day.ts';
import { Response } from '../main.ts';

export default class Day06 implements Day {
  main(data: string): Response {
    const instructionSet: string[] = data.split(/\r?\n/);
    const lights: boolean[][] = [];
    const lightBrightness: number[][] = [];
    for (let i: number = 0; i < 1000; i++) {
      lights.push(Array(1000).fill(false));
      lightBrightness.push(Array(1000).fill(0));
    }
    for (const instruction of instructionSet) {
      const firstSplit: string[] = instruction.split(' through ');
      const action: string = firstSplit[0].split(/ \d/)[0];
      const firstCoordinateString: string = firstSplit[0].split(/ (?=\d)/)[1];
      const firstCoordinates: number[] = firstCoordinateString
        .split(',')
        .map((value: string): number => Number(value));
      const secondCoordinateString: string = firstSplit[1];
      const secondCoordinates: number[] = secondCoordinateString
        .split(',')
        .map((value: string): number => Number(value));
      for (let y: number = firstCoordinates[1]; y <= secondCoordinates[1]; y++)
        for (
          let x: number = firstCoordinates[0];
          x <= secondCoordinates[0];
          x++
        ) {
          lights[y][x] =
            action === 'turn on'
              ? true
              : action === 'turn off'
              ? false
              : !lights[y][x];
          lightBrightness[y][x] +=
            action === 'turn on'
              ? 1
              : action === 'turn off' && lightBrightness[y][x] > 0
              ? -1
              : action === 'toggle'
              ? 2
              : 0;
        }
    }
    return [
      {
        message: 'So many lights are lit',
        value: lights
          .map(
            (light: boolean[]): number =>
              light.filter((value: boolean): boolean => value).length
          )
          .reduce((a: number, b: number): number => a + b),
      },
      {
        message: 'The total brightness is',
        value: lightBrightness
          .map((value: number[]): number =>
            value.reduce((a: number, b: number): number => a + b)
          )
          .reduce((a: number, b: number): number => a + b),
      },
    ];
  }
}
