**1. Giới thiệu**

Trong bài nói của  Rob về Angular Elements (https://www.youtube.com/watch?v=Z1gLFPLVJjY) .Angular 6 đc giới thiệu đến cta , những developer , và dưới đây ,t sẽ liệt kê 1 vài điểm mới của nó.

**2. Tree-shakeable providers**

PHương thức khai báo mới với các provider.Nó chấp nhận tham số 'root' trong hầu hết tất cả cacs module.Khi bạn sử dụng tham số 'root',  injectable sẽ được khai báo như 1 singleton trong application, và bạn ko  cần phải thêm nó vào trong  providers của  root module. 
```javascript

export const baseUrl = new InjectionToken<string>('baseUrl', {
    providedIn: 'root',
    factory: () => 'http://localhost:8080/'
});

beforeEach(() => TestBed.configureTestingModule({
  providers: [UserService]
}));
```

**3. RxJS 6**

Angular 6 giờ sử dụng RxJS 6, và yêu cầu bạn cập nhật ứng dụng của bạn.

Và… RxJS 6 đã thay đổi cách nhập mọi thứ!

RxJS 5 syntact
```javascript
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

const squares$: Observable<number> = Observable.of(1, 2)
  .map(n => n * n);
```

In RxJS 5.5 syntact
```javascript
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

const squares$: Observable<number> = of(1, 2).pipe(
  map(n => n * n)
);
```

In RxJS 6 syntact
```javascript
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const squares$: Observable<number> = of(1, 2).pipe(
  map(n => n * n)
);
```
**4. Animations**

Các polyfill web-animations-js không cần thiết nữa cho các hoạt ảnh trong Angular 6.0, ngoại trừ nếu bạn đang sử dụng AnimationBuilder. Ứng dụng của bạn có thể đã giành được một vài byte quý giá! Trong trường hợp trình duyệt không hỗ trợ API element.animate, Angular 6.0 sẽ dự phòng các khung hình CSS.

**5. ElementRef<T>**
    
Trong Angular 6.0, bây giờ bạn có thể nhập ElementRef nghiêm ngặt hơn nếu bạn muốn:
 ```javascript
    @ViewChild('loginInput') loginInput: ElementRef<HTMLInputElement>;

ngAfterViewInit() {
  // nativeElement is now an `HTMLInputElement`
  this.loginInput.nativeElement.focus();
}
 ```
 
**6. Project Ivy: the new Angular renderer**

Bạn có thể nôm na 1 cách đơn giản ,đó là việc thực hiện renderer view ko làm thay đổi cách các bạn thực thi code ,viết code như thế nào trong các  templates, nhưng nó có cải thực hiện việc cải tiền 1 vài chỗ :
* build time
* bundle size

```javascript
"angularCompilerOptions": {
  "enableIvy": true
}

export class PonyComponent {

    static ngComponentDef = defineComponent({
      type: PonyComponent,
      selector: [['ns-pony']],
      factory: () => new PonyComponent(),
      template: (renderFlag, component) {
        if (renderFlag & RenderFlags.Create) {
          elementStart(0, 'figure');
          elementStart(1, 'ns-image');
          elementEnd();
          elementStart(2, 'div');
          text(3);
          elementEnd();
          elementEnd();
        }
        if (renderFlag & RenderFlags.Update) {
          property(1, 'src', component.getPonyImageUrl());
          text(3, interpolate('', component.ponyModel.name, ''));
        }
      },
      inputs: { ponyModel: 'ponyModel' },
      directives: () => [ImageComponent];
    });

    // ... rest of the class

}
```