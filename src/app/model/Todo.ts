export class Todo {
  id: number;
  description: string = '';
  deadline: Date;
  importance: string = 'high';
  complete: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
