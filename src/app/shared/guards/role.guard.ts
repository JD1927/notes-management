import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	CanDeactivate,
	CanLoad,
	Route,
	Router,
	RouterStateSnapshot,
	UrlSegment,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../services/firebase/firebase-auth.service';

@Injectable({
	providedIn: 'root',
})
export class RoleGuard
	implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
	constructor(
		private authService: FirebaseAuthService,
		private router: Router,
	) {}

	async canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Promise<boolean | UrlTree> {
		const result = await this.authService.checkUserRole(route?.data);
		if (!result) {
			this.router.navigate(['/dashboard']);
			return false;
		}
		return true;
	}
	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return true;
	}
	canDeactivate(
		component: unknown,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot,
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return true;
	}
	canLoad(
		route: Route,
		segments: UrlSegment[],
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return true;
	}
}
