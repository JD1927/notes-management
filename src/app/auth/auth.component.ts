import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../shared/services/firebase/firebase-auth.service';

@Component({
  selector: 'nm-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: FirebaseAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.handleUserNavigation();
  }

  async handleUserNavigation(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      return;
    }
  }

}
