import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

    constructor(private router: Router){

    }

    scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    routerByPath(path: string) {
        this.scrollToTop();
        this.router.navigate([`/${path}`]);
    }

    routerByPathAndRequestParam(path: string, requestParam: any) {
        this.scrollToTop();
        this.router.navigate([`/${path}`, requestParam]);
    }

    routerWithBody(path: string, body: any) {
        this.scrollToTop();
        this.router.navigate([`/${path}`], { state: { body } });
    }

    routerByPathAndRequestParamWithBody(path: string, requestParam: any, body: any) {
        this.scrollToTop();
        this.router.navigate([`/${path}`, requestParam], { state: { body } });
    }

}
