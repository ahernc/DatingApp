import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

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
            { path: 'members', component: MemberListComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent }
        ]
    },
    // if route matches above path, this is the default: order is important
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

