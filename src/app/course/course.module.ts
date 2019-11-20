import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CoursePage } from './course.page';
import {MatCardModule} from '@angular/material/card';

const routes: Routes = [
  {
    path: '',
    component: CoursePage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MatCardModule
    ],
  declarations: [CoursePage]
})
export class CoursePageModule {}
