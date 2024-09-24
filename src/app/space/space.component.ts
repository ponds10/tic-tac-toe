import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-space',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './space.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceComponent { 
  @Input() value: string | null = null
  @Input() filled: boolean = false
}
