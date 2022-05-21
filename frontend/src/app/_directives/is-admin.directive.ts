import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Directive({
  selector: '[appIsAdmin]',
})
export class IsAdminDirective implements OnInit {
  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    const isAdmin = this.authService.getCurrentUser()?.isAdmin;
    if (isAdmin) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
