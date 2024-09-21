import { ChangeDetectionStrategy, Component,  OnInit,  signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  pTitle = signal("Home");
  logo = 'https://raw.githubusercontent.com/po-ui/po-angular/master/docs/assets/po-logos/po_color_bg.svg';

  readonly menus: PoMenuItem[] = [
    { label: 'Home', shortLabel: 'Home', link: '/home', icon: 'ph ph-house', action: this.onMenuClick.bind(this) },
    { label: 'Dashboard', shortLabel: 'Dashboard', link: '/dashboard', icon: 'ph ph-presentation-chart', action: this.onMenuClick.bind(this) },
    { label: 'Lista Entregas', shortLabel: 'Entregas', link: '/entregas', icon: 'ph ph-truck-trailer', action: this.onMenuClick.bind(this) },
  ];

  ngOnInit() {
    this.menus.map((item) => {
      if(item.link === location.pathname) {
        this.pTitle.set(item.label);
        return;
      }
    });
  }

  private onMenuClick(item: PoMenuItem) {
    this.pTitle.set(item.label);
  }

}
