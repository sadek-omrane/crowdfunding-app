import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { NavService } from '../../services/nav.service';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { HeaderComponent } from '../../components/header/header.component';
import { AppNavItemComponent } from 'src/app/components/sidebar/nav-item/nav-item.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { clientGuestNavItems, clientUserNavItems } from 'src/app/components/sidebar/sidebar-data';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AuthService } from 'src/app/services/auth.service';
import { NavItem } from 'src/app/components/sidebar/nav-item/nav-item';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: [],
  standalone: true,
  imports: [
    RouterModule,
    AppNavItemComponent,
    MaterialModule,
    CommonModule,
    SidebarComponent,
    NgScrollbarModule,
    TablerIconsModule,
    HeaderComponent,
    FooterComponent,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ClientLayoutComponent {
  navItems : NavItem[];

    @ViewChild('leftsidenav')
    public sidenav: MatSidenav | any;

    //get options from service
    private layoutChangesSubscription = Subscription.EMPTY;
    private isMobileScreen = false;
    private isContentWidthFixed = true;
    private isCollapsedWidthFixed = false;
    private htmlElement!: HTMLHtmlElement;

    get isOver(): boolean {
      return this.isMobileScreen;
    }

    constructor(
      private breakpointObserver: BreakpointObserver,
      private navService: NavService,
      private authService: AuthService,
    ) {

      this.htmlElement = document.querySelector('html')!;
      this.htmlElement.classList.add('light-theme');
      this.layoutChangesSubscription = this.breakpointObserver
        .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW])
        .subscribe((state) => {
          // SidenavOpened must be reset true when layout changes

          this.isMobileScreen = state.breakpoints[MOBILE_VIEW];

          this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
        });
    }

    ngOnInit(): void {
      this.authService.getObservableMe().subscribe((me) => {
        if(me){
          this.navItems = clientUserNavItems;
        }else{
          this.navItems = clientGuestNavItems
        }
      });
    }

    ngOnDestroy() {
      this.layoutChangesSubscription.unsubscribe();
    }

    toggleCollapsed() {
      this.isContentWidthFixed = false;
    }

    onSidenavClosedStart() {
      this.isContentWidthFixed = false;
    }

    onSidenavOpenedChange(isOpened: boolean) {
      this.isCollapsedWidthFixed = !this.isOver;
    }
  }
