import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent {
    collapsed = true;
    @Output() featureSelected = new EventEmitter<string>();

    toggleNavbar(): void {
        this.collapsed = !this.collapsed;
    }

    /*onSelect(feature: string): void {
        this.featureSelected.emit(feature);
    }*/
}
