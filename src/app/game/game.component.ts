import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  game!: Game;
  currentCard: string = '';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      let card =this.game.stack.pop()
      if(card !== undefined) {
        this.currentCard  = card;
        this.pickCardAnimation = true;
        this.game.currentPlayer++
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      }
      // console.log('Game is', this.game)
      // console.log('NEW CARD is:' + this.currentCard);


      setTimeout(() => {
      this.game.playedCards.push(this.currentCard)
      this.pickCardAnimation = false;
      }, 1000);
    }
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name)
      }
    });
  }
}
