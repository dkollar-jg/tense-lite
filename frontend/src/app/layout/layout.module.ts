import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './navigation/header/header.component';

@NgModule({
  declarations: [HeaderComponent, LayoutComponent],
  imports: [CommonModule, LayoutRoutingModule],
})
export class LayoutModule {}
