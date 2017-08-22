import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Card } from '../model/card';
import { Todo } from '../model/Todo';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})


export class WhiteboardComponent implements OnInit {
  cards: FirebaseListObservable<any[]>;
  newCardTitle: string;

  constructor(public db: AngularFireDatabase) {
    this.cards = db.list('boards');
  }


  ngOnInit(){}

  addCard(){
    this.cards.push({title: this.newCardTitle, todos: []}).then(_ => {
      this.newCardTitle = '';
    });
  }

  removeCard(key){
    if ( confirm('Delete this card?') ){
      this.db.object('boards/' + key).remove();
    }
  }

}
