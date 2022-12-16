Xin chào mọi người, hôm nay mình xin được chia sẻ với các bạn làm thế nào để handle sự kiện ấn nút back của broswer. Ví dụ khi ấn nút back của trình duyệt sẽ hiện lên một modal để xác nhận yes/no. Để làm được việc này chúng ta cần sử dụng candeactive.

**1. Tìm hiểu candeactive.**

Candeactive sẽ áp dụng cho router trỏ đến component trong angular.
Ví dụ ta có 1 component là MyDocument:

```
@Component({
  selector: 'app-my-document',
  template: `
    <div>
      <button (click)="goBack()" >Back</button>
    </div>
  `
})
export class MyDocument {
  function goBack() {
    history.back();
  }
}
```

Để áp dụng candeactive ta cần tạo 1 class kế thừa CanDeactivate từ @angular/router:

```
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class ConfirmDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(component: CanComponentDeactivate) {
    return window.confirm('Are you sure?');
  }
}
```

Sau đó ta cần thêm ConfirmDeactivateGuard vào router:

```
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'app-my-document',
        component: MyDocument,
        canDeactivate: [ConfirmDeactivateGuard]
      }
    ])
  ],
  providers: [ConfirmDeactivateGuard]
})
class AppModule {}
```

Khi click vào nút back sẽ hiện window confirm xác nhận, do router thay đổi bị cadeactive bắt sự kiện và hiển thị confirm đó.

**2. Áp dụng handle khi ấn nút back của trinh duyệt.**

Điểm khác biệt khi ấn nút back của trình duyệt là sẽ luôn luôn bị pop stack history của trình duyệt, nên candeactive bắt được nhưng không giữ được trình duyệt ở lại trang hiện tại để hiển thị confirm.

Hiện tượng xảy ra là page vẫn bị back rồi hiển thị confirm trên trang back đó.
-> Để giải quyết vấn đề này chúng ta cần push thêm localtion vào history của trình duyệt:

```
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class ConfirmDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(component: CanComponentDeactivate) {
    history.push(window.location.href);
    var check = window.confirm('Are you sure?');
    if (check) {
      history.back();
    }
  }
}
```

**3. Phân biệt nút back trình duyệt và back của router**

Vấn đề tiếp theo cần giải quyết là khi ấn nút back trong app và ấn nút back của trình duyệt thì đều bị candeactive handle , vậy làm sao biết là cái nào mà push thêm location cho trương hợp là nút back của trình duyệt.

Ta cần truyền thêm 1 biến để xác địng việc này -> dùng service để thêm biến đó.
Tạo service: RouterService:

```
@Injectable()
export class RouterService {
  isBackApp = false;
}
```

Khi click button trong app sẽ set biến isBackApp thành true để xác định:

```
  goBack() {
    this.routerService.isBackApp = true;
    history.back();
  }
```

Trong component MyDocument cần set lại biến isBackApp khi chuyển router thành công, để lần sau back mới đúng, có thể làm việc này trong ngDestroy:

```
  ngOnDestroy() {
    this.routerService.isBackApp = false;
  }
```

* Cuối cùng ta sẽ check biến isBackApp trong candeactive là xong:

```
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class ConfirmDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(component: CanComponentDeactivate) {
    if (!this.routerService.isBackApp)
      history.push(window.location.href);
    }
    var check = window.confirm('Are you sure?');
    if (check) {
      history.back();
    }
  }
}
```

**4. Tạo modal confirm thay thế cho window confirm**

Chúng ta sẽ tạo ra một component riềng cho modal và tạo 1 service để hiển thị modal.
- Tạo ModalConfirmService:
  
```
  @Injectable()
export class ConfirmDialogService {
  eventShow: EventEmitter<Object>;
  isShow = false;

  constructor() {
    this.eventShow = new EventEmitter();
  }

  showConfirm() {
    this.eventShow.emit(true);
  }

  closeConfirm() {
    this.eventDone.emit(value);
  }
}
```
  
 Event eventShow để gọi sang ModalConfirmComponent hiển thị hoặc tắt modal.
  
- Tạo component ModalConfirmComponent:

```
  @Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-confirm-modal.component.html',
  styleUrls: ['./confirm-confirm-modal.component.scss']
})
export class ModalConfirmComponent {
  constructor(private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.confirmDialogService.eventShow.subscribe(
      obj => {
        this.confirmDialogService.isShow = true;
      }
    );
  }

  submitModal(value: boolean) {
    this.confirmDialogService.isShow = false;
    this.confirmDialogService.closeConfirm(value);
  }
}

```

Dùng ConfirmDialogService để họi ModalConfirm trong candeactive:

```
export class ConfirmDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  
  constructor(
    private modalConfirmService: ModalConfirmService
  ) {}
   
  canDeactivate(component: CanComponentDeactivate) {
    if (!this.routerService.isBackApp)
      history.push(window.location.href);
    }
    return this.ModalConfirmService.showConfirm();
  }
}
```

Ok. Trên đây là cách để handle router change bằng candeactive và áp dụng vào handle nút back.