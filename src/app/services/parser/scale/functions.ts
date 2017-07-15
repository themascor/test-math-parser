import { IFunctions } from '../interfaces/IArg';

// Добвление ФУНКЦИЙ
// 1) добваить ф-цию которая и принимает n аргументов и возвращает  number.
// 2) Для розширения добваить в масив объект:
// selector - селектро
// priority - приоритет
// assoc - ассоциативность в паво "1" или в лево "-1"
// func - Наша функция. 

export const FUNCS: IFunctions[] = [
    {
        selector: 'cos', args: 1, func: cos
    },
    {
        selector: 'max', args: 2, func: max
    }
]

function cos (a: number): number {
const result = Math.cos(a);
return result;
}

function max (a , b: number): number {
const result = a < b ? b : a;
return result;
}

