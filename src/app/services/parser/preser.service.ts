import { Injectable } from '@angular/core';
import { IArg, IOperators, IFunctions } from './interfaces/IArg';
import { OPERATORS } from './scale/operators';
import { FUNCS } from './scale/functions';

@Injectable()
export class PreserService {
  private _opers = new Set();
  private _funcs = new Set();
  private _separs = new Set();
  constructor() {
    OPERATORS.forEach(item => this._opers.add(item.selector));
    FUNCS.forEach(item => this._funcs.add(item.selector));
    this._separs.add(',');
  };

  private isNumber(n): boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  private isFunction(n): boolean {
    return this._funcs.has(n);
  }

  private isOperation(n): boolean {
    return this._opers.has(n);
  }
  private isSepar(n): boolean {
    return this._separs.has(n);
  }


  private symCompare(a: string, b: string): boolean {
    let rez = true;
    if (!a || !b) {
      return false;
    }
    if ((a.length - b.length) != 0) {
      rez = false;
    } else {
      outer: for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
          rez = false;
          break outer
        }
      }
    }
    return rez;
  }

  private replaceArgs(f: string, a: IArg[], ): string {
    let rez = f.slice(0);
    a.forEach(item => {
      const regx = new RegExp(`\\b${item.name}\\b`, 'g');
      // console.log (regx);
      // console.log (item.value.toString());
      rez = rez.replace(regx, item.value.toString())
      // console.log(rez);
    })
    return rez;
  }
  private getOperatorBySelector(s: string): IOperators {
    let rez: IOperators = { selector: '', priority: 0, assoc: 0, func: null }
    if (!s) { return rez; }
    outer: for (let i = 0; i < OPERATORS.length; i++) {
      if (this.symCompare(OPERATORS[i].selector, s)) {
        rez = OPERATORS[i];
        break outer
      }
    }

    return rez;
  }

  private getFunctionBySelector(s: string): IFunctions {
    let rez: IFunctions = { selector: '', args: 0, func: null }
    if (!s) { return rez; }
    outer: for (let i = 0; i < FUNCS.length; i++) {
      if (this.symCompare(FUNCS[i].selector, s)) {
        rez = FUNCS[i];
        break outer
      }
    }
    return rez;
  }

  private toRPN(flow: string): string[] {
    function breakToTokens(f: string): string[] {
      let setOfTokens = new Set();
      OPERATORS.forEach(item => setOfTokens.add(item.selector));
      setOfTokens.add(',');
      setOfTokens.add('(');
      setOfTokens.add(')');
      let i = 0;
      let result: string[] = []
      let buff = '';
      while (i < f.length) {
        buff = f[i]
        if (!setOfTokens.has(buff)) {
          while ((i + 1 < f.length) && !setOfTokens.has(f[i + 1])) {
            i++;
            buff = buff + f[i];
          }
        };
        result.push(buff);
        i++;
      }

      return result;
    }
    // ===== body toRPN =======
    let output: string[] = []
    let stek: string[] = []
    const tokens = breakToTokens(flow);
    // console.log ('Tokens:', tokens);
    tokens.forEach(token => {
      // console.log('Out:', output, 'Stek:', stek, 'token: ', token);
      //  Если токен — число, то добавить его в очередь вывода.
      if (this.isNumber(token)) { output.push(token) };
      //  Если токен — функция, то поместить его в стек.
      if (this.isFunction(token)) { stek.unshift(token) };
      // Если токен — разделитель аргументов функции:
      if (this.isSepar(token)) {
        // Пока токен на вершине стека не открывающая скобка, перекладывать операторы из стека в выходную очередь.
        while (stek[0] != '(' && stek.length > 0) {
          output.push(stek[0]);
          stek.splice(0, 1);
        }
      };
      // Если токен — оператор, то:
      if (this.isOperation(token)) {
        const op1 = this.getOperatorBySelector(token);
        let op2 = this.getOperatorBySelector(stek[0]);
        // Пока присутствует на вершине стека токен оператор op2, и
        while ((stek.length > 0) &&
          (((!this.symCompare(stek[0], token)) && (this.isOperation(stek[0]))) &&
            // Либо оператор op1 лево-ассоциативен и его приоритет меньше, чем у оператора op2 либо равен,
            // или оператор op1 право-ассоциативен и его приоритет меньше, чем у op2,
            (((op1.assoc < 0 && op1.priority <= op2.priority))
              || (op1.assoc > 0 && op1.priority < op2.priority)))) {
          // переложить op2 из стека в выходную очередь;
          output.push(stek[0]);
          stek.splice(0, 1);
          op2 = this.getOperatorBySelector(stek[0]);
        };
        stek.unshift(token);
      };
      // Если токен — открывающая скобка, то положить его в стек.
      if (this.symCompare(token, '(')) { stek.unshift(token) };
      // Если токен — закрывающая скобка:
      if (this.symCompare(token, ')')) {
        // Пока токен на вершине стека не является открывающей скобкой, перекладывать операторы из стека в выходную очередь.
        while (!this.symCompare(stek[0], '(') && stek.length > 0) {
          output.push(stek[0]);
          stek.splice(0, 1);
        }
        // Выкинуть открывающую скобку из стека, но не добавлять в очередь вывода
        if (this.symCompare(stek[0], '(')) { stek.splice(0, 1); }
        // Если токен на вершине стека — функция, добавить её в выходную очередь.
        if (this.isFunction(stek[0])) {
          output.push(stek[0]);
          stek.splice(0, 1);
        }
      };
    });
    // Если больше не осталось токенов на входе:
    // Пока есть токены операторы в стеке:
    while (stek.length > 0) {
      // Переложить оператор из стека в выходную очередь.
      output.push(stek[0]);
      stek.splice(0, 1);
    }
    return output;
  }// ===== toRPN =======

  private calcRPN(rpn: string[]): number {
    let stek: number[] = [];
    let flow: string[] = rpn;
    let token = '';
    let i = 0;
    if (!rpn) { return null; }
    while (flow.length > 0) {
      token = flow[i];
      // Если токен - цифра переложить в стек
      if (this.isNumber(token)) { stek.unshift(+token); };
      // Если оператор или функция - забрать со стека необходимое количество аргументов и выполнить функцию, вернуть в стек результат
      if (this.isOperation(token)) {
        let oper = this.getOperatorBySelector(token);
        if (oper.selector && stek.length >= 2) {
          let arg = stek.splice(0, 2).reverse();
          stek.unshift(oper.func(...arg));
        };
      };
      if (this.isFunction(token)) {
        let funcs = this.getFunctionBySelector(token);
        if (funcs.selector && stek.length >= funcs.args) {
          let arg = stek.splice(0, funcs.args).reverse();
          stek.unshift(funcs.func(...arg));
        };
      };
      flow.splice(0, 1);
    }
    return stek[0];
  }


  pars(f: string, a: IArg[]) {
    return new Promise((resolve, reject) => {
      let rpn: string[] = [];
      let rez: number = null;
      // console.log('Operators: ', this._opers);
      // console.log('Functions: ', this._funcs);
      // console.log('Functions: ', this._separs);
      f = f.replace(/\s/g, '');
      // console.log('1. spaces cut: ', f);
      f = this.replaceArgs(f, a);
      // console.log('2. replace args: ', f);
      if (f[0] == '-') { f = '0' + f };
      rpn = this.toRPN(f);
      // console.log('3. transform to RPN: ', rpn);
      rez = this.calcRPN(rpn);
      // console.log('4. Calc RPN: ', rez);
      if (!rez && rez != 0) { reject('error: ' + rez) } else { resolve(rez) } // pass values
    });
  }



}
