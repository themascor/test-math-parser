import { IOperators } from '../interfaces/IArg';

// Добвление ОПЕРАТОРОВ
// 1) добваить ф-цию которая и принимает 2 аргумента и возвращает  number.
// 2) Для розширения добваить в масив объект:
// selector - селектро
// priority - приоритет
// assoc - ассоциативность в паво "1" или в лево "-1"
// func - Наша функция. 

export const OPERATORS: IOperators[] = [
    {
        selector: '+', priority: 1, assoc: -1, func: plus
    },
      {
        selector: '-', priority: 1, assoc: -1, func: minus
    },
      {
        selector: '*', priority: 2, assoc: -1, func: multiply
    },
      {
        selector: '/', priority: 2, assoc: -1, func: divide
    },
      {
        selector: '^', priority: 3, assoc: 1, func: pow
    },
]


function plus (a: number, b: number): number {
const result = a + b;
return result;
}
function minus (a: number, b: number): number {
const result = a - b;
return result;
}
function multiply (a: number, b: number): number {
const result = a * b;
return result;
}
function divide (a: number, b: number): number {
const result = a / b;
return result;
}
function pow (a: number, b: number): number {
const result = Math.pow(a , b);
return result;
}

