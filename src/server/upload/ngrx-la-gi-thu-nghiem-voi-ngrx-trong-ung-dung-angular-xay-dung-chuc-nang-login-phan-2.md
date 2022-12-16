Bài viết trước mình đã đi qua về các thành phần chính của Ngrx và cách cài đặt.Ở bài viết này mình sẽ hướng dẫn các bạn chức năng Login sử dụng ngRx.
# 1.Bài toán
Chúng ta sẽ xây dựng xây dựng chức năng login với flow cơ bản như sau :
* Nhập email - password  để login
* Login thành công hiện thông báo thành công , chuyển tới trang home và hiển thị username
* Login thất bại hiện thông báo thất bại

 Bây giờ chúng ta cùng xem với Ngrx thì bài toán này sẽ được giải quyết như nào nhé.
  
# 2.Thực hiện
Như ở[ bài viết trước](https://viblo.asia/p/ngrx-la-gi-thu-nghiem-voi-ngrx-trong-ung-dung-angular-phan-1-djeZ1pVjKWz) mình đã nói về các
thành phần của Ngrx.Bây giờ chúng ta cùng đi xây dựng nó nhé !

Đầu tiên cần tạo folder Store ,folder Store này sẽ là nơi chứa các Entity - thực thể, với bài toán của chúng ta thì Entity sẽ là User.Mỗi Entity này 
sẽ gồm 4 thành phần chính :

* Actions
* State
* Reducer
* Selector

![](https://images.viblo.asia/0eaba637-456b-40b3-8326-df255185c68b.png)
Chúng ta cùng đi vào chi tiết từng phần nhé !

### Actions (user.actions.ts)
Tại file này chúng ta cần định nghĩa các Action
```ts
import { Action } from '@ngrx/store';

// định nghĩa type cho user action
export enum EUserActions {
    LOGIN = '[USER] Login',
    LOGIN_SUCCESS = '[USER] Login Success',
    LOGIN_FAIL = '[USER] Login Fail'
}
export class Login implements Action {
    public readonly type = EUserActions.LOGIN;
    constructor(public payload: { email: string, password: string }) { }
}
export class LoginSuccess implements Action {
    public readonly type = EUserActions.LOGIN_SUCCESS;
    constructor(public payload: string) { }
}
export class LoginFail implements Action {
    public readonly type = EUserActions.LOGIN_FAIL;
    constructor() { }
}
export type UserActions = Login | LoginSuccess | LoginFail;

```

### State (user.states.ts)
Tại file này chúng ta định nghĩa state được lưu trong store

```ts
export interface IUserLoginState {
    loading: boolean;
    success: boolean;
    fail: boolean;
    userName: string;
}
export interface IUserState {
    login: IUserLoginState;
}

```

### Reducer (user.reducer.ts)

Tại đây,dữ liệu sẽ được xử lý trước khi được "Đẩy" vào store
``` ts
import { UserActions, EUserActions } from './user.actions';
import { IUserState, IUserLoginState } from './user.states';
const initLoginState: IUserLoginState = {
    loading: false,
    success: false,
    fail: false,
    userName: ''
};
const initUserState: IUserState = {
    login: initLoginState
};

export function userReducer(state = initUserState, action: UserActions): IUserState {
    switch (action.type) {
        case EUserActions.LOGIN:
            return {
>                 ...state,
                login: { ...initLoginState, loading: true}
            };
        case EUserActions.LOGIN_SUCCESS:
            return {
                ...state,
                login: { ...state.login, loading: false, success: true, userName: action.payload  }
            };
        case EUserActions.LOGIN_FAIL:
            return {
                ...state,
                login: { ...state.login, loading: false, fail: true }
            };
        default:
            return state;
    }
}

```

Ok.bây giờ để Reducer hoạt động  chúng ta cần "Register"  Reducer  với Store

/store/index.ts
``` ts
import * as fromUser from './user';
import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
    user: fromUser.IUserState;
}

export const appReducer: ActionReducerMap<IAppState> = {
    user: fromUser.userReducer
};
```

app.module.ts
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { appReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(AppEffects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
Đến đây chúng ta đã hoàn thành được 2/3 rồi.Tiếp theo chúng thực hiện việc Call Api để login.Ngrx cung cấp 1 package rất hay để xử lý việc
này là [NgxEffect](https://ngrx.io/guide/effects)(các bạn tự tìm hiểu phần này nhé).
Tương tự với store chúng ta tạo folder effects

![](https://images.viblo.asia/10f40aaf-1981-46e6-b319-c062d2b4d5ec.png)

### Effects

user.effects.ts
```ts
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../user.service';

import * as fromUser from '../store/user';

@Injectable()
export class UserEffects {
    constructor(private actions: Actions, private userService: UserService) {

    }
    @Effect()
    login$ = this.actions.pipe(
        ofType<fromUser.Login>(fromUser.EUserActions.LOGIN),
        switchMap(action => {
            const { email, password } = action.payload;
            return this.userService.login(email, password).pipe(
                map(res => new fromUser.LoginSuccess(email)),
                catchError(e => of(new fromUser.LoginFail()))
            );
        })
    );
};
```
./effects/index.ts

```ts
import { UserEffects } from './user.effects';

export const AppEffects = [UserEffects];
```

## Components
login.component.ts
```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as fromRoot from '../store/index';
import * as fromUser from '../store/user';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  loading$: Observable<boolean>;
  success$: Observable<boolean>;
  error$: Observable<boolean>;
  destroy$: Subject<void> = new Subject();
  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.IAppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading$ = this.store.select(fromUser.getLoadingLogin).pipe(takeUntil(this.destroy$));
    this.success$ = this.store.select(fromUser.getSuccessLogin).pipe(takeUntil(this.destroy$));
    this.error$ = this.store.select(fromUser.getFailLogin).pipe(takeUntil(this.destroy$));
    this.initForm();
    this.onLoginSucess();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }
  submit() {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(new fromUser.Login({ email, password }));
  }
  onLoginSucess() {
    this.success$.pipe(
      filter(success => success),
      //đợi 3s sau khi login thành công,chuyển tới home page
      delay(3000),
    ).subscribe(success => {
      this.router.navigate(['home']);
    });
  }
}

```

login.component.html
```html
<h3 class="text-center">Login Page</h3>
<div class="alert alert-danger" *ngIf="error$ | async">
    Login fail
</div>
<div class="alert alert-success" *ngIf="success$ | async">
    Login success
</div>
<div class="login-form">
    <form (submit)="submit()" [formGroup]="loginForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input class="form-control" id="username" placeholder="Enter email" formControlName="email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password" formControlName="password">
        </div>
        <div class="text-center">
            <div class="spinner-border" role="status" *ngIf="loading$ | async">
                <span class="sr-only">Loading...</span>
              </div>
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="loading$ | async">Login</button>
      </form>
</div>

```

# Kết quả
![](https://images.viblo.asia/ddd2ab21-ca25-4d57-963a-6aae20083940.png)

![](https://images.viblo.asia/fbd14e03-cf33-416d-94c7-cac09eac5df7.png)

![](https://images.viblo.asia/894c16db-88c3-44b6-acf4-337d5c952893.png)