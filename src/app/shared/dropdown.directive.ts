import { Directive, HostBinding, HostListener, OnInit, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;
    @HostListener('document.click', ['$event']) toggleOpenWindow(event: Event) {
        console.log('clcik outside');
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
    @HostListener('click') toggleOpen(evt: Event) {
        this.isOpen = !this.isOpen;

        const ref = this.elRef.nativeElement;
        if (this.isOpen) {
            ref.querySelector('.dropdown-toggle')?.classList.add('show')
            ref.querySelector('.dropdown-menu')?.classList.add('show')
        } else {
            ref.querySelector('.dropdown-toggle')?.classList.remove('show')
            ref.querySelector('.dropdown-menu')?.classList.remove('show')
        }
    }

    constructor(private elRef: ElementRef) {}
}