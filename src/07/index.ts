import Day from '../day.ts';
import { Response } from '../main.ts';

export default class Day07 implements Day {
  #signals: Map<string, number> = new Map();
  #repeat: string[] = [];

  main(data: string): Response {
    let dataSplit: string[] = data.split(/\r?\n/);
    this.run(dataSplit);

    const solutionPart1: number = this.#signals.get('a')!;

    this.#signals.clear();
    this.#signals.set('b', solutionPart1);
    dataSplit = dataSplit.filter(
      (value: string): boolean => !value.match(/-> b$/)
    );
    this.run(dataSplit);

    return [
      {
        message: 'The value of a',
        value: solutionPart1,
      },
      {
        message: 'The value of a after setting b to the previous a',
        value: this.#signals.get('a')!,
      },
    ];
  }

  private run(dataSplit: string[]): void {
    for (const rawInstruction of dataSplit)
      this.splitInstruction(rawInstruction, false);

    while (this.#repeat.length !== 0) {
      for (const rawInstruction of this.#repeat)
        this.splitInstruction(rawInstruction, true);
    }
  }

  private splitInstruction(instruction: string, repeat: boolean): void {
    const io: string[] = instruction.split(' -> ');
    const inputInfo: string = io[0];
    const output: string = io[1];

    const inputInstructions: string[] = inputInfo.split(' ');
    let inputNumber: number | undefined;
    switch (inputInstructions.length) {
      case 1:
        inputNumber = this.numberOrWire(
          inputInstructions[0],
          repeat,
          instruction
        );
        if (inputNumber === undefined) return;

        this.#signals.set(output, inputNumber);
        break;

      case 2:
        inputNumber = this.numberOrWire(
          inputInstructions[1],
          repeat,
          instruction
        );
        if (inputNumber === undefined) return;
        let binaryNumber: string = inputNumber.toString(2);
        binaryNumber = binaryNumber
          .split('')
          .map((digit: string): string => (digit === '0' ? '1' : '0'))
          .join('');
        for (let i = binaryNumber.split('').length; i < 16; i++)
          binaryNumber = `1${binaryNumber}`;

        this.#signals.set(output, parseInt(binaryNumber, 2));
        break;
      case 3:
        inputNumber = this.numberOrWire(
          inputInstructions[0],
          repeat,
          instruction
        );
        let input2Number = this.numberOrWire(
          inputInstructions[2],
          repeat,
          instruction
        );
        if (inputNumber === undefined || input2Number === undefined) return;
        switch (inputInstructions[1]) {
          case 'AND':
            this.#signals.set(output, inputNumber & input2Number);
            break;
          case 'OR':
            this.#signals.set(output, inputNumber | input2Number);
            break;
          case 'LSHIFT':
            this.#signals.set(output, inputNumber << input2Number);
            break;
          case 'RSHIFT':
            this.#signals.set(output, inputNumber >> input2Number);
            break;
          default:
            throw new Error(`Operator ${inputInstructions[1]} invalid`);
        }
        break;
      default:
        throw new Error('Something went wrong');
    }

    if (repeat)
      this.#repeat = this.#repeat.filter(
        (value: string): boolean => value !== instruction
      );
  }

  private numberOrWire(
    input: string,
    repeat: boolean,
    instruction: string
  ): number | undefined {
    if (!isNaN(Number(input))) return Number(input);
    if (this.#signals.has(input)) return this.#signals.get(input);
    if (!repeat) this.#repeat.push(instruction);
  }
}
