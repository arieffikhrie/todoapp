import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DateTimePickerModule } from 'ng-pick-datetime';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './../environments/firebase.config';

import { AppComponent } from './app.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { TodoComponent } from './todo/todo.component';

const appRoutes: Routes = [
  { path: 'board', component: WhiteboardComponent },
  { path: '',   redirectTo: '/board', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    WhiteboardComponent,
    HomeComponent,
    CardComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DateTimePickerModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
