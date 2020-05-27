// Created in L100. This prevents users accidentally losing their changes when they hit a back button...
// add this to provers
import {Injectable} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if(component.editForm.dirty) {
            return confirm ('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}