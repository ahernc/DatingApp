import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        // L67
        // on a "first match wins" basis....
        path: '', // you need the repeat here of path: ''
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [ 
            // All of the following paths are protected in one statement now instead of individually
            { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver} }, // L93 added resolver
            { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}}, // L93: added resolver
            { path: 'member/edit', component: MemberEditComponent,  resolve: {user: MemberEditResolver},
                canDeactivate: [PreventUnsavedChanges] },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent }
        ]
    },
    // if route matches above path, this is the default: order is important
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

