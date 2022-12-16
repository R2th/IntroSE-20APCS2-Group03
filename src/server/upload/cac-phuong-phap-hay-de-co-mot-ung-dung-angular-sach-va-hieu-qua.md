Bài viết này đưa ra các phương pháp chúng tôi sử dụng trong ứng dụng của mình và có liên quan đến Angular, Typescript, RxJs và @ngrx/store. Chúng tôi xem xét và đưa ra một số nguyên tắc viết code chung để giúp ứng dụng Angular của bạn sạch hơn.
## trackBy
Khi sử dụng ngFor để lặp lại một mảng trong `teamplate` của bạn, hãy sử dụng nó với một hàm `trackBy` sẽ trả về một số nhận dạng duy nhất cho mỗi phần tử trong mảng.
### Tại sao ư?
Khi một mảng thay đổi, Angular sẽ `re-render` lại toàn bộ cây DOM. Nhưng nếu bạn sử dụng `trackBy`, Angular sẽ biết phần tử nào đã thay đổi và sẽ chỉ thực hiện thay đổi DOM cho phần tử cụ thể đó. Ta có ví dụ sau:
**Before**

```
<li *ngFor="let item of items;">{{ item }}</li>
```
**After**

```
// in the template
<li *ngFor="let item of items; trackBy: trackByFn">{{ item }}</li>
// in the component
trackByFn(index, item) {    
   return item.id; // unique id corresponding to the item
}
```
## const vs let
Khi khai báo biến, sử dụng const khi giá trị không được gán lại.
### Tại sao ư?
Sử dụng `let` và `const` khi thích hợp làm cho ý định của các khai báo rõ ràng hơn. Nó cũng sẽ hữu ích trong việc xác định các vấn đề khi một giá trị được gán lại cho một hằng số do vô tình gây ra lỗi thời gian biên dịch. Nó cũng giúp cải thiện khả năng đọc của code.
**Before**
```
let car = 'ludicrous car';
let myCar = `My ${car}`;
let yourCar = `Your ${car};
if (iHaveMoreThanOneCar) {
   myCar = `${myCar}s`;
}
if (youHaveMoreThanOneCar) {
  yourCar = `${youCar}s`;
}
```
**After**
```
// the value of car is not reassigned, so we can make it a const
const car = 'ludicrous car';
let myCar = `My ${car}`;
let yourCar = `Your ${car};
if (iHaveMoreThanOneCar) {
   myCar = `${myCar}s`;
}
if (youHaveMoreThanOneCar) {
   yourCar = `${youCar}s`;
```

## Pipeable operators
Sử dụng toán tử pipeable khi sử dụng toán tử RxJs.
### Tại sao ư?
Các toán tử `pipeable` có thể phân tán theo dạng cây có nghĩa là chỉ những đoạn mã chúng ta cần thực thi sẽ được đưa vào khi chúng được nhập. Điều này cũng giúp dễ dàng xác định các toán tử không sử dụng trong file.
**Before**
```
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
iAmAnObservable
    .map(value => value.item)
    .take(1);
```
**After**
```
import { map, take } from 'rxjs/operators';
iAmAnObservable
    .pipe(
       map(value => value.item),
       take(1)
     );
```
## Subscribe in template
Tránh `subscribing` các `observables` từ các component và thay vào đó `subscribe` các `observables` từ `teamplate`.

### Tại sao ư?
`async pipes` tự động `unsubscribe` chúng và nó làm cho code đơn giản hơn bằng cách loại bỏ nhu cầu quản lý subscriptions theo cách thủ công. Nó cũng làm giảm nguy cơ vô tình quên hủy đăng ký một `subscription` trong `component`, điều này sẽ gây ra rò rỉ bộ nhớ. Rủi ro này cũng có thể được giảm thiểu bằng cách sử dụng quy tắc lint để phát hiện các đối tượng `unsubscribed observables`.

Điều này cũng ngăn các component hoạt động bình thường và tạo ra các lỗi khi dữ liệu bị thay đổi bên ngoài subscription.
**Before**
```
// template
<p>{{ textToDisplay }}</p>
// component
iAmAnObservable
    .pipe(
       map(value => value.item),
       takeUntil(this._destroyed$)
     )
    .subscribe(item => this.textToDisplay = item);
```
**After**
```
// template
<p>{{ textToDisplay$ | async }}</p>
// component
this.textToDisplay$ = iAmAnObservable
    .pipe(
       map(value => value.item)
     );
```
## Clean up subscriptions
Khi `subscribing observables` luôn đảm bảo rằng bạn unsubscribe từ chúng một cách thích hợp bằng cách sử dụng các toán tử như take, takeUntil, v.v.
### Tại sao ư?
Không `unsubscribe` khỏi các `observables` sẽ dẫn đến rò rỉ bộ nhớ không mong muốn vì `observables` bị bỏ lại, có thể ngay cả sau khi một component đã bị phá hủy/người dùng đã điều hướng đến một trang khác. Tốt hơn nữa, hãy đưa ra một quy tắc nhỏ để phát hiện những observables chưa đượcunsubscribed.
**Before**
```
iAmAnObservable
    .pipe(
       map(value => value.item)     
     )
    .subscribe(item => this.textToDisplay = item);
```
**After**

Sử dụng `takeUntil` khi bạn muốn lắng nghe các thay đổi cho đến khi một observable khác được phát ra:
```
private _destroyed$ = new Subject();
public ngOnInit (): void {
    iAmAnObservable
    .pipe(
       map(value => value.item)
      // We want to listen to iAmAnObservable until the component is destroyed,
       takeUntil(this._destroyed$)
     )
    .subscribe(item => this.textToDisplay = item);
}
public ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
}
```

Sử dụng một private subject như trên là một mẫu để quản lý việc hủy đăng ký nhiều observables trong component.

Sử dụng `take` khi bạn chỉ muốn giá trị đầu tiên được phát ra bởi observable:
```
iAmAnObservable
    .pipe(
       map(value => value.item),
       take(1),
       takeUntil(this._destroyed$)
    )
    .subscribe(item => this.textToDisplay = item);
```

Lưu ý cách sử dụng `takeUntil` với `take` tại đây. Điều này là để tránh rò rỉ bộ nhớ gây ra khi `subscription` chưa nhận được giá trị trước khi `component` bị phá hủy. Không dùng `takeUntil` ở đây, `subscription` sẽ vẫn tồn tại cho đến khi nhận được giá trị đầu tiên, nhưng vì component đã bị phá hủy, nó sẽ không bao giờ nhận được giá trị - dẫn đến rò rỉ bộ nhớ.

## Sử dụng các toán tử thích hợp
Khi sử dụng toán tử làm phẳng với observables của bạn, hãy sử dụng toán tử thích hợp cho tình huống:
* switchMap: khi bạn muốn bỏ qua giá trị phát ra trước đó khi có giá trị mới.
* mergeMap: khi bạn muốn xử lý đồng thời tất cả các giá trị được phát ra.
* concatMap: khi bạn muốn xử lý lần lượt các giá trị khi chúng được phát ra.
* ExitMap: khi bạn muốn hủy bỏ tất cả các giá trị mới trong khi xử lý một giá trị phát ra trước đó.

## Lazy load
Khi có thể, hãy cố gắng` lazy load` các mô-đun trong ứng dụng Angular của bạn. Lazy load là khi bạn chỉ tải một thứ gì đó khi nó được sử dụng, chẳng hạn như chỉ tải một compoents khi nó được nhìn thấy.
### Tại sao ư?
Điều này sẽ làm giảm size của ứng dụng được tải và có thể cải thiện thời gian khởi động ứng dụng bằng cách không tải các mô-đun không được sử dụng.
**Before**
```
// app.routing.ts
{ path: 'not-lazy-loaded', component: NotLazyLoadedComponent }
```
**After**
```
// app.routing.ts
{ 
  path: 'lazy-load',
  loadChildren: 'lazy-load.module#LazyLoadModule' 
}
// lazy-load.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadComponent }   from './lazy-load.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
         { 
             path: '',
             component: LazyLoadComponent 
         }
    ])
  ],
  declarations: [
    LazyLoadComponent
  ]
})
export class LazyModule {}
```

## Tránh có subscriptions  bên trong subscriptions
Đôi khi bạn có thể muốn các giá trị từ nhiều hơn một giá trị observable để thực hiện một hành động. Trong trường hợp này, tránh subscribing từ một observable được trong subscribe của một observable khác. Thay vào đó, hãy sử dụng các toán tử nối thích hợp. Các toán tử nối chạy trên các observables từ operator trước chúng. Một số toán tử nối là: withLatestFrom,combineLatest, v.v.

**Before**
```
firstObservable$.pipe(
   take(1)
)
.subscribe(firstValue => {
    secondObservable$.pipe(
        take(1)
    )
    .subscribe(secondValue => {
        console.log(`Combined values are: ${firstValue} & ${secondValue}`);
    });
});
```
**After**
```
firstObservable$.pipe(
    withLatestFrom(secondObservable$),
    first()
)
.subscribe(([firstValue, secondValue]) => {
    console.log(`Combined values are: ${firstValue} & ${secondValue}`);
});
```

## Avoid any; type everything;
Luôn khai báo các biến hoặc hằng với type khác với any.
### Tại sao ư?
Khi khai báo biến hoặc hằng số trong Typecript mà không cần type, type của biến sẽ được suy ra bởi giá trị được gán cho nó. Điều này sẽ gây ra sự cố ngoài ý muốn. Ví dụ như:
```
const x = 1;
const y = 'a';
const z = x + y;
console.log(`Value of z is: ${z}`
// Output
Value of z is 1a
```
Điều này có thể gây ra các vấn đề không mong muốn khi bạn mong đợi y cũng là một số.

Những vấn đề này có thể tránh được bằng cách nhập các biến một cách thích hợp.
```
const x: number = 1;
const y: number = 'a';
const z: number = x + y;
// This will give a compile error saying:
Type '"a"' is not assignable to type 'number'.
const y:number
```

Bằng cách này, chúng ta có thể tránh các lỗi `missing types`.

Một lợi thế khác của việc có các kiểu dữ liệu tốt trong ứng dụng của bạn là nó giúp việc tái cấu trúc dễ dàng và an toàn hơn. Cùng xem ví dụ sau:
```
public ngOnInit (): void {
    let myFlashObject = {
        name: 'My cool name',
        age: 'My cool age',
        loc: 'My cool location'
    }
    this.processObject(myFlashObject);
}
public processObject(myObject: any): void {
    console.log(`Name: ${myObject.name}`);
    console.log(`Age: ${myObject.age}`);
    console.log(`Location: ${myObject.loc}`);
}
// Output
Name: My cool name
Age: My cool age
Location: My cool location
```
Hãy để chúng tôi nói, chúng tôi muốn đổi tên `loc` thành `location` trong `myFlashObject`:
```
public ngOnInit (): void {
    let myFlashObject = {
        name: 'My cool name',
        age: 'My cool age',
        location: 'My cool location'
    }
    this.processObject(myFlashObject);
}
public processObject(myObject: any): void {
    console.log(`Name: ${myObject.name}`);
    console.log(`Age: ${myObject.age}`);
    console.log(`Location: ${myObject.loc}`);
}
// Output
Name: My cool name
Age: My cool age
Location: undefined
```
Nếu chúng tôi không có type cho `myFlashObject`, nó cho rằng thuộc tính `loc` trên `myFlashObject` chỉ là `undefined` chứ không phải là thuộc tính hợp lệ.

Nếu chúng ta đặt type cho  `myFlashObject`, chúng ta sẽ gặp lỗi `compile time` như hình dưới đây:
```
type FlashObject = {
    name: string,
    age: string,
    location: string
}
public ngOnInit (): void {
    let myFlashObject: FlashObject = {
        name: 'My cool name',
        age: 'My cool age',
        // Compilation error
        Type '{ name: string; age: string; loc: string; }' is not assignable to type 'FlashObjectType'.
        Object literal may only specify known properties, and 'loc' does not exist in type 'FlashObjectType'.
        loc: 'My cool location'
    }
    this.processObject(myFlashObject);
}
public processObject(myObject: FlashObject): void {
    console.log(`Name: ${myObject.name}`);
    console.log(`Age: ${myObject.age}`)
    // Compilation error
    Property 'loc' does not exist on type 'FlashObjectType'.
    console.log(`Location: ${myObject.loc}`);
}
```

Nếu bạn đang bắt đầu một dự án mới, bạn nên đặt `strict:tru` trong tệp `tsconfig.json` để bật tất cả các tùy chọn kiểm tra loại strict.

## Tài liệu tham khảo
https://medium.com/free-code-camp/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f