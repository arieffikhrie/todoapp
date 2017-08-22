import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Todo } from '../model/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() key;
  @Input() cardKey;

  todo: FirebaseObjectObservable<any>;

  isChecked: boolean = false;

  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {
    this.db.object('boards/' + this.cardKey + '/todos/' + this.key).subscribe(res => {
      this.todo = res;
    });
  }

  removeTodo(){
    if (confirm('Remove todo?')) {
      this.db.object('boards/' + this.cardKey + '/todos/' + this.key).remove();
    }
  }
  completeTodo(event){
    this.db.object('boards/' + this.cardKey + '/todos/' + this.key).set({
      complete: !this.todo['complete'],
      description: this.todo['description'],
      deadline: this.todo['deadline']
    });
  }

}
