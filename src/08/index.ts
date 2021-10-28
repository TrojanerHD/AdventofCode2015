import Day from '../day.ts';
import { Response } from '../main.ts';

export default class Day08 implements Day {
  main(data: string): Response {
    const dataSplit: string[] = data.split(/\r?\n/);
    let stringCode: number = 0;
    let inMemory: number = 0;
    let newStringLengths: number = 0;
    for (let string of dataSplit) {
      stringCode += string.length;
      string = string.replace(
        /^"|\\(?=\\)|\\(?=")|(?<!\\)\\x[a-fA-F0-9](?=[a-fA-F[0-9])|"$/g,
        ''
      );
      inMemory += string.length;
    }

    for (let string of dataSplit) {
      string = string.replace(/"|\\/g, '  ');
      newStringLengths += string.length + 2;
    }
    return [
      {
        message: 'String literals minus chars of string code',
        value: stringCode - inMemory,
      },
      {
        message:
          'The difference in length between all strings after they are escaped',
        value: newStringLengths - stringCode,
      },
    ];
  }
}
