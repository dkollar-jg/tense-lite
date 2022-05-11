import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  @Input() testInput: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
