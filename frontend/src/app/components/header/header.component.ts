import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { PageContentService } from 'src/app/services/page-content.service';
import { PageContent } from 'src/app/models/page-content';
import { BrandingComponent } from "../sidebar/branding.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    BrandingComponent,
],
  providers: [
    PageContentService,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Input() mode='client';
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  @Input() isOver: boolean = false;
  me : User | null = null;
  isAdmin: boolean = false;
  isLoading:boolean = false;
  errorMessage:string;
  pageContents : PageContent[] = [];
  params = {
    page: 1,
    limit: 20,
    status: 'published',
  };
  constructor(
    private router: Router,
    private authService: AuthService,
    private pageContentService: PageContentService,
  ) {}

  ngOnInit() {
    this.authService.getObservableMe().subscribe((me) => {
      this.me = me;
    });
    this.loadPageContents();
  }

  logout(){
    this.isLoading = true;
    this.authService.logout().subscribe((data:any) => {
    }, (error:any) => {
      this.errorMessage = error.error.message;
    }, ()=>{
      this.isLoading = false;
      localStorage.clear();
      this.authService.setMe(null);
      this.router.navigate(['/client']);
    });
  }

  loadPageContents(loadMore = false){
    if(loadMore){
      this.params.page++;
    }
    this.pageContentService.get(null, this.params).subscribe((res:any)=>{
      this.pageContents = res.data;
    });
  }
}

