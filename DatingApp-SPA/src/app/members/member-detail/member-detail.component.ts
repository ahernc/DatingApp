import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // Default approach... this.loadUser();
    // L93:
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }

  // L93: when we use the resolver, this is no longer needed.
  // loadUser() {
  //   // Original syntax:
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
  //   // Notice that the + in the parameter, is actually an int conversion...!
  //   // this.userService.getUser(+this.route.snapshot.params.id).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
