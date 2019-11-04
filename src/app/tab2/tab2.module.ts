import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import {MaterialModule} from '../material.module';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: Tab2Page}]),
        MaterialModule,
        MatExpansionModule
    ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
