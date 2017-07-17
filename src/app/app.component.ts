import { Component } from '@angular/core';

import { IArg } from './services/parser/interfaces/IArg';
import { PreserService } from './services/parser/preser.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public formula = '';
  public result = '';
  // Масив для билда инпутов
  public args: IArg[] =
  [{name: 'a1', value: 0},
  {name: 'a2', value: 0},
  {name: 'a3', value: 0}];
  // Масив для хранения переменных
  // (так как при использовании ngFor по одному масиву для 
  // билда и хранения, слетает фокус с инпутов при обновлении значений в масиве)
  public argument: IArg[] = this.args.slice();
  constructor(private parser: PreserService) {

}

  addArg() {
  function getNextArg(a: IArg[]): number {
    let aIndexes: number[] = [];
    let stArgs = '';
    let maxArg = 0;
    let nextArg = 1;
    a.forEach (item => stArgs = stArgs + item.name);
    stArgs.split('a').forEach( (item, index) => {
      if (index > 0) {
        aIndexes.push(+item)
        if (+item > maxArg || index === 1) { maxArg = +item; }
      };
    });
  nextArg = maxArg + 1;
    outer: for (let i = 1; i < maxArg; i++) {
      if (aIndexes.indexOf(i) < 0) {
        nextArg = i;
        break outer;
      }
    }
   // console.log('aIndexes:', aIndexes);

    return nextArg;
  }
  const nextArg: string = getNextArg(this.args).toString();
    this.args.push({name: 'a' + nextArg, value: 0});
    this.argument.push({name: 'a' + nextArg, value: 0})
 // console.log(this.argument);

  }
  delArg(index: number) {
     // console.log('index:', index);
    if (!index && index !== 0 ) {return};
    this.args.splice(index, 1);
    this.argument.splice(index, 1);
    // console.log(this.argument);
    }
  doCalc(f: string) {
   this.result = '';
   this.parser.pars(f, this.argument)
   .then((rez) =>  this.result = (Math.round( (rez as number) * 10000) / 10000)   + '')
   .catch((err) => console.log((err as string)));
  }
  setValue($event) {
    const id: string = $event.target.id;
    const index = +id.split('a')[1];
    let j = -1;
    outer: for (let i = 0; i < this.argument.length; i++) {
      if (index === (+this.argument[i].name.split('a')[1])) {
        j = i;
        break outer
      }
    }
if (j >= 0) {
    this.argument[j].value = $event.target.value;
    } else {
      alert('cant find index of arguments');
    }
  // console.log(id, ',', index);
  }
  }

