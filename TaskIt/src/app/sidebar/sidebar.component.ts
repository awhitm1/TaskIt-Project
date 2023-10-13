import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() displaySelected = new EventEmitter<string>();


  onSelect(display: string){
    this.displaySelected.emit(display)
  }
}
