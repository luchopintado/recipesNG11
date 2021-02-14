import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent {
    collapsed = true;

    toggleNavbar(): void {
        this.collapsed = !this.collapsed;
    }
}
