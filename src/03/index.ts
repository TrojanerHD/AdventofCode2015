import Day from '../day.ts';
import { Response } from '../main.ts';

enum Direction {
  UP,
  LEFT,
  RIGHT,
  DOWN,
}

interface Coordinate {
  x: number;
  y: number;
}

export default class Day03 implements Day {
  main(data: string): Response {
    const instructionSet: string[] = data.split('');
    const coordinatesPartOne: Coordinate[] =
      this.getCoordinates(instructionSet);
    const firstCoordinatesPartTwo: Coordinate[] = this.getCoordinates(
      instructionSet.filter((_: string, i: number): boolean => i % 2 === 0)
    );
    const secondCoordinatesPartTwo: Coordinate[] = this.getCoordinates(
      instructionSet.filter(
        (_: string, i: number): boolean => (i + 1) % 2 === 0
      )
    );

    const coordinatesDayTwo: Coordinate[] = firstCoordinatesPartTwo.concat(secondCoordinatesPartTwo);
    return [
      {
        message:
          'Santa delivers at least one present to the following number of houses',
        value: this.filterCoordinates(coordinatesPartOne).length,
      },
      {message: 'Santa and Robo-Santa deliver at least one present to the following number of houses',
    value: this.filterCoordinates(coordinatesDayTwo).length}
    ];
  }

  private getCoordinates(instructionSet: string[]): Coordinate[] {
    const directions: Direction[] = instructionSet.map(
      (value: string): Direction => {
        switch (value) {
          case '^':
            return Direction.UP;
          case 'v':
            return Direction.DOWN;
          case '>':
            return Direction.RIGHT;
          case '<':
            return Direction.LEFT;
          default:
            throw new Error('Invalid input found');
        }
      }
    );
    let coordinates: Coordinate[] = [{ x: 0, y: 0 }];
    for (const direction of directions) {
      const lastCoordinate = coordinates[coordinates.length - 1];
      const newCoordinate = { x: lastCoordinate.x, y: lastCoordinate.y };
      switch (direction) {
        case Direction.UP:
          newCoordinate.y--;
          break;
        case Direction.DOWN:
          newCoordinate.y++;
          break;
        case Direction.LEFT:
          newCoordinate.x--;
          break;
        case Direction.RIGHT:
          newCoordinate.x++;
          break;
      }
      coordinates.push(newCoordinate);
    }

    return coordinates;
  }

  private filterCoordinates(coordinates: Coordinate[]): Coordinate[] {
    return coordinates.filter(
      (coordinate: Coordinate, i: number): boolean =>
        !coordinates.find(
          (otherCoordinate: Coordinate, otherI: number): boolean =>
            i < otherI &&
            otherCoordinate.x === coordinate.x &&
            otherCoordinate.y === coordinate.y
        )
    );
  }
}
