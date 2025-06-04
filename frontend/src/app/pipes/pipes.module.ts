// this is the module file for the pipes

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcerptPipe } from './excerpt.pipe';
import { ImageUrlPipe } from './image-url.pipe';
import { DatePipe } from './date.pipe';

@NgModule({
  declarations: [
    ExcerptPipe,
    ImageUrlPipe,
    DatePipe,
  ],
  imports: [CommonModule],
  exports: [
    ExcerptPipe,
    ImageUrlPipe,
    DatePipe,
  ],
})
export class PipesModule {}
