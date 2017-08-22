import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../model/Todo';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardName: string;
  @Input() key: string;
  @Output() remove = new EventEmitter();

  todos = [];

  form = new FormGroup({
    description: new FormControl(),
    deadline: new FormControl((new Date()).getTime()),
    importance: new FormControl('high'),
    complete: new FormControl(false),
  });

  tempDate: any;

  showForm: boolean = false;
  constructor(public db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.db.list('boards/' + this.key + '/todos').subscribe(res => {
      this.todos = res;
    });
  }

  addTodo(form){
    if ( form.value.description == '' ){
      return;
    }
    if ( typeof form.value.deadline == 'undefined' ){
      return;
    }
    form.value.deadline = form.value.deadline.getTime();
    this.db.list('boards/' + this.key + '/todos').push(form.value).then(() => {
      this.showForm = false;
    });
  }

  removeTodo(key){
    this.db.object('boards/' + this.key + '/todos/' + key).remove();
  }

  removeCard(){
    this.remove.emit();
  }
}
