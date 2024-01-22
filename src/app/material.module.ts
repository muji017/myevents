import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog"
import { MatSidenavModule } from "@angular/material/sidenav"
import {MatListModule} from "@angular/material/list"

@NgModule({
    exports: [
        MatTooltipModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatSidenavModule,
        MatListModule
    ]
})

export class MaterialModule { }