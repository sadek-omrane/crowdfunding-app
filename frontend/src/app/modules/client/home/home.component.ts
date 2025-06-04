import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { MatButtonModule } from '@angular/material/button';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectCardComponent } from "../../../components/project-card/project-card.component";
import { PaymentCardComponent } from 'src/app/components/payment-card/payment-card.component';
import { MatDialog } from '@angular/material/dialog';
import { PartnerService } from 'src/app/services/partner.service';
import { Partner } from 'src/app/models/partner';
import { Testmonial } from 'src/app/models/testmonial';
import { TestmonialService } from 'src/app/services/testmonial.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    SlickCarouselModule,
    MatCardModule,
    TablerIconsModule,
    PipesModule,
    ProjectCardComponent,
  ],
  providers: [
    ProjectService,
    PartnerService,
    TestmonialService,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  projectParams = {
    page: 1,
    limit: 20,
    status: '',
  };
  partnerParams = {
    page: 1,
    limit: 20,
  };
  testmonialParams = {
    page: 1,
    limit: 20,
  };
  categories = [
    {
      id: 1,
      name: 'Technology',
      icon: 'cpu'
    },
    {
      id: 2,
      name: 'Health',
      icon: 'heart'
    },
    {
      id: 3,
      name: 'Finance',
      icon: 'currency-dollar'
    },
    {
      id: 4,
      name: 'Education',
      icon: 'book'
    },
    {
      id: 5,
      name: 'Entertainment',
      icon: 'music'
    },
    {
      id: 6,
      name: 'Travel',
      icon: 'plane'
    },
    {
      id: 7,
      name: 'Food',
      icon: 'utensils'
    },
    {
      id: 8,
      name: 'Fashion',
      icon: 't-shirt'
    },
    {
      id: 9,
      name: 'Sports',
      icon: 'soccer-ball'
    },
    {
      id: 10,
      name: 'Real Estate',
      icon: 'home'
    },
    {
      id: 11,
      name: 'Automotive',
      icon: 'car'
    },
  ];
  projects ?: Project[];
  partners ?: Partner[];
  testimonials ?: Testmonial[];
  projectsSlideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: true,
    dots: true,
    navText: ["<i-tabler name='square-rounded-arrow-left' class='icon-16'></i-tabler>", "<i-tabler name='square-rounded-arrow-right' class='icon-16'></i-tabler>"],
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  };
  categoriesSlideConfig = {
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: true,
    dots: true,
    navText: ["<i-tabler name='square-rounded-arrow-left' class='icon-16'></i-tabler>", "<i-tabler name='square-rounded-arrow-right' class='icon-16'></i-tabler>"],
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
    ]
  };
  testimonialsSlideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: true,
    dots: true,
    centerMode: true,
    centerPadding: '200px',
    navText: ["<i-tabler name='square-rounded-arrow-left' class='icon-16'></i-tabler>", "<i-tabler name='square-rounded-arrow-right' class='icon-16'></i-tabler>"],
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: false,
          centerPadding: '0px',
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  };

  constructor(
    private projectService:ProjectService,
    private partnerService:PartnerService,
    private testmonialService:TestmonialService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadProjects();
    this.loadPartners();
    this.loadTestimonials();
  }

  loadProjects(loadMore = false){
    if(loadMore){
      this.projectParams.page++;
    }
    this.projectService.get(null, this.projectParams).subscribe((res:any)=>{
      this.projects = res.data;
    });
  }

  loadPartners(loadMore = false){
    if(loadMore){
      this.partnerParams.page++;
    }
    this.partnerService.get(null, this.partnerParams).subscribe((res:any)=>{
      this.partners = res.data;
    });
  }

  loadTestimonials(loadMore = false){
    if(loadMore){
      this.testmonialParams.page++;
    }
    this.testmonialService.get(null, this.testmonialParams).subscribe((res:any)=>{
      this.testimonials = res.data;
    });
  }

  addSlide() {
    //this.slides.push({})
  }

  removeSlide() {
    //this.slides.length = this.slides.length - 1;
  }

  slickInit(e:any) {
    console.log('slick initialized');
  }

  breakpoint(e:any) {
    console.log('breakpoint:', e);
    if(e.breakpoint <= 1024){
      console.log('1024');
      //this.testimonialsSlideConfig.centerPadding = '50px';
    }
  }

  afterChange(e:any) {
    console.log('afterChange');
  }

  beforeChange(e:any) {
    console.log('beforeChange');
  }

  openPaymentDialog() {
    this.dialog.open(PaymentCardComponent, {width: '550px',data: {project: {id: 1, title: 'Project 1', amount: 1000}}});
  }

}
