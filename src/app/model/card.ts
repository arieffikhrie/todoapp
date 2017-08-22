import { Todo } from './Todo';

export class Card {
  title: string;
  todos: Todo[] = [];

  constructor(title:string){
    this.title = title;
  }
}
