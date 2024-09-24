import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { SpaceComponent } from "../space/space.component";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CommonModule,
    SpaceComponent
],
  templateUrl: './grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit { 
  spaces: (string | null)[]
  spaceFilled: boolean[]
  xTurn: boolean
  winner: string | null

  constructor() {
    this.spaces = []
    this.spaceFilled = []
    this.xTurn = true
    this.winner = null
  }

  ngOnInit(): void {
      this.spaces = Array(9).fill(null)
      this.spaceFilled = Array(9).fill(false)
  }
  
  newGame(): void {
    this.spaces = Array(9).fill(null)
    this.spaceFilled = Array(9).fill(false)
    this.xTurn = true
    this.winner = null
  }

  get player(): string {
    return this.xTurn ? 'X' : 'O'
  }

  takeTurn(index: number): void {
    if(this.winner){
      return
    }

    if(!this.spaceFilled[index]) {
      this.spaces[index] = this.player
      this.spaceFilled[index] = true
      this.xTurn = !this.xTurn
    }

    this.winner = this.checkWin()
  }

  checkWin(): string | null {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    
    let inProgress: boolean = false

    for(var index in winLines) {
      const [a, b, c] = winLines[index]
      if(
        this.spaces[a] && 
        this.spaces[a] === this.spaces[b] &&
        this.spaces[a] === this.spaces [c]
      ) {
        return this.spaces[a]
      }
    }

    for(var index in this.spaces) {
      if(!this.spaces[index]){
        inProgress = true
      }
    }

    if(inProgress) {
      return null
    }

    return 'Draw'
  }

  enterAnimation(index: number) {
    if(!this.spaceFilled[index] && !this.winner){
      this.spaces[index] = this.player
    }
  }

  exitAnimation(index: number) {
    if(!this.spaceFilled[index] && !this.winner){
      this.spaces[index] = null
    }
  }
}
