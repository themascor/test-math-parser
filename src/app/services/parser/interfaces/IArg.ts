// Интерфейс для описания хранения переменных (а1,а2,а3...)
export interface IArg {
    name: string,  
    value: number 
  }
// Интерфейс для описания хранения операторов строго для работы с 2 операндами.
  export interface IOperators {
    selector: string, // селектор "+" "-" "*" и тд.
    priority: number, // приоритет
    assoc: number, // асоция (например "+" - лево "^" - право (2+2+2 = (2+2)+2. 2^2^2 = 2^(2^2))
    func: any; // функция для выполенния операции с операндами
  }
// Интерфейс для описания хранения ф-ций  для работы с n >= 1 в том числе и 2 операндами.
  export interface IFunctions {
   selector: string,// селектор "cos" "sin" "doublePizza" и тд.
   args: number; // Точное (!) количество аргументов для ф-ции
   func: any; // сама ф-ция
  }