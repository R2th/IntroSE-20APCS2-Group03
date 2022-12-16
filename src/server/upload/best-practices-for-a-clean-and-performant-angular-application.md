Bài viết này sẽ gợi ý một số cách giúp ứng dụng angular của chúng ta có performance tối nhất có thể.
####  1. trackBy

Khi chúng ta sử dụng `ngFor` lặp một mảng trong template thì nên sử dụng hàm `trackBy` sẽ trả về một số nhận dạng duy nhất  cho từng chỉ mục.
#### Why?
Khi mà mảng có sự thay đổi thì Angular sẽ hiển thị toàn bộ cây **DOM**. Nhưng nếu sử dụng `trackBy` thì Angular sẽ biết đối tượng nào trong mảng có sự thay đổi từ đó chỉ cần hiển thị lại những đối tượng có sự thay đổi mà không phải hiện thị lại toàn bộ.
Để  giải thích kỹ hơn  cơ chế hoạt động các bạn có thể thảo khảo:  [Structural directives in Angular](https://viblo.asia/p/structural-directives-in-angular-Qbq5QQrJ5D8)
#### Before
```
<li *ngFor="let item of items;">{{ item }}</li>
```
#### After
```
// in the template
<li *ngFor="let item of items; trackBy: trackByFn">{{ item }}</li>
// in the component
trackByFn(index, item) {    
   return item.id; // unique id corresponding to the item
}
```
#### 2. const vs let
Đối với các biến mà không bị thay đổi giá trị thì nên dùng `const`.
#### Why?
VIệc sử dụng `let` vs `const` một cách hợp lý sẽ giúp chủ đích của các khai báo được rõ ràng hơn. Nó cũng sẽ giúp xác đinh một vấn đế rõ ràng hơn khi vô tình một biến hằng số được gán giá trị khác thì nó sẽ báo lỗi lúc biên dịch code.
#### Before
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

#### After
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
}
```
#### 3. Pipeable operators
Sử dụng toán tử chuyển đối khi sử dụng toán tử RxJs
#### Why?
Pipeable operators are tree-shakeable  nghĩa là chỉ những mã cần thực thì sẽ được đưa vào khi chúng được imported. Hiểu cách khác là chúng ta cần toán tử nào thì hay import vào để sử dụng, trách việc  import một lọat các toán tử không dùng.
Từ phiên bản 5.5+
#### Before
```
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
iAmAnObservable
    .map(value => value.item)
    .take(1);
```

#### After
```
import { map, take } from 'rxjs/operators';
iAmAnObservable
    .pipe(
       map(value => value.item),
       take(1)
     );
```
#### 4. Isolate API hacks
Không phải tất cả API đều có khả năng chống tại các cuộc tấn công, đôi khi chúng ta cần thêm đoạn code để xử lý những trường hợp như vậy . Chúng ta sẽ để nhũng đoạn code đó tách riêng thành service và cô lập với component.
#### Why?

#### 5. Subscribe in template
Tránh việc đăng ký observables từ component, thay vào đó chúng ta nên đăng ký từ template
#### Why?
Các pipe không đồng bộ tự động  hủy đăng  ký và  làm code trở lên đơn giản hơn bằng cách loại  bỏ quản lý đăng ký theo cách thủ công. Nó cũng làm giảm nguy cơ quên hủy đăng ký  trong component, điều này sẽ gây ra rõ rỉ bộ nhớ. Rủi ro này cũng có thể giảm thiểu bằng cách sử dụng  quy tắc `lint` để phát hiện những observables chưa được đăng ký.

 Việc đăng ký từ component sẽ là component hoạt động không ổn định 

#### Before

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

#### After

```
// template
<p>{{ textToDisplay$ | async }}</p>
// component
this.textToDisplay$ = iAmAnObservable
    .pipe(
       map(value => value.item)
     );
```

#### 6. Clean up subscriptions
Khi bạn đăng ký với Observable , hay luôn đảm bảo bạn sẽ hủy đăng ký nó một cách thích hợp với việc sử dụng các toán tử  `take`, `takeUntil`

#### Why?
Nếu fail hủy đăng ký  Observable có thể sẽ dẫn đến rò rĩ bộ nhớ không mong muốn  vì  luông Observable luôn để mở , có khă năng ngay cả khi component đó đã bị destroy hay user đã chuyển sang một page khác.

Thậm chí là nên có một quy tắc có thể phát hiện những đối tượng nào chưa hủy đăng ký với Observable

#### Before
```
iAmAnObservable
    .pipe(
       map(value => value.item)     
     )
    .subscribe(item => this.textToDisplay = item);
```

#### After
Sử dụng `takeUntil` để lăng nghe  Observable có sự thay đổi giá trị  
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

Sử dụng subject private giống như việc sử dụng một mẫu quản lý  nhiều hủy đăng ký  đối Observable trong component.

Sử dụng `take` khi mà bạn muốn ngay từ giá trị đầu tiên thay đổi từ Observable.
```
iAmAnObservable
    .pipe(
       map(value => value.item),
       take(1),
       takeUntil(this._destroyed$)
    )
    .subscribe(item => this.textToDisplay = item);
```
Có chút lưu ý khi sử dụng `takeUntil`  với `take` ở đây. Điều này thực sựu sẽ gây ra rõ rỉ bộ nhớ  vì  khi đăng ký vẫn tồn tại khi nó nhận được giá trị đầu tiên nhưng sau đó thì component đã bị destroy do đó component hiện tại không bao giờ nhận được giá trị .

#### 6. Use appropriate operators
Khi sử dụng  operators để làm giảm chiều observables (trong observrable lại chưa observable) , sử dụng một cách thích hợp cho từng tình  huống.

**switchMap**:  Khi bạn muốn bỏ qua các emission trước khi có các emission mới.

**mergeMap**:  Khi bạn muốn xử lý đồng thời các emission.

**concatMap**: Khi bạn muốn xử lý lần lượt khi các emission được phát ra.

**exhaustMap**: Khi bạn muốn cancel tất cả các emission mới  trong khi đang xử lý các emission trước đó.

#### Why?
Trong khi có thể sử dụng một operator có thể thay thế nhều operator mà cùng mang lại kết quả tương tự  thì code sẽ ngắn gọn hơn, sử dụng sai các operator có thể dẫn đến các hành vi không mong muốn (không control được hết) vì các operator handle  các  observables theo cách thức khác nhau.

#### 7. Lazy load

Khi có thể hay cố găng lazy load module trong angular.Lazy load nghĩa là khi ta chỉ load nhưng cái ta sử dụng .

#### Why?
Điều này làm giảm size ứng dụng được load và cải thiện thời gian khởi động ứng dụng khi không tải các module không được sử dụng

#### Before 
```
// app.routing.ts

{ path: 'not-lazy-loaded', component: NotLazyLoadedComponent }
```

After 
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

#### 8. Avoid having subscriptions inside subscriptions
Đôi khi bạn muốn nhiều hơn một giá trị  từ observable để thực hiện một công việc nào đó. Trong trường hợp này, tránh đăng ký observcale trong observable.  Thay vào đó ta nên sử dụng  chaining  operator thích hợp.  

#### Before 

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

After

```
firstObservable$.pipe(
    withLatestFrom(secondObservable$),
    first()
)
.subscribe(([firstValue, secondValue]) => {
    console.log(`Combined values are: ${firstValue} & ${secondValue}`);
});

```

#### Why?
Sẽ dẫn đến Code smell/readability/complexity: Khi không sử dụng một cách thích hợp các api RxJs cung cấp. 
Performance: Mếu obserables là `cold`,  nó sẽ đăng ký firstObservable, chờ cho nó hoàn thành, sau đó bắt đầu làm việc với observable thứ 2.  Nếu đây là các request network thì nó sẽ hiện thị dưới dạng  synchronous/waterfall.

#### 10. Avoid any; type everything;

Luôn luôn khai báo biến hoặc hằng số cùng với các kiểu của nó không nên để kiểu `any`.

#### Why?
Khi khai báo biến hoặc hằng số trong Typescript không cần kiểu của biến, kiểu của biến / hằng số sẽ được suy ra bởi giá trị được gán. Điều này sẽ gây ra những sự cố mà chúng ta không control.
```
const x = 1;
const y = 'a';
const z = x + y;
console.log(`Value of z is: ${z}`
// Output
Value of z is 1a
```

Điều này  có thể gây ra một số vấn đề không mong muốn khi bạn mong chờ y cùng là kiểu số. Nhưng vấn đề này có thể tránh được nếu ta gán giá trị một cách thích hợp .

```
const x: number = 1;
const y: number = 'a';
const z: number = x + y;
// This will give a compile error saying:
Type '"a"' is not assignable to type 'number'.
const y:number
```
Đây là cách bạn có thể tránh bug vì thiếu kiểu biến.
Khi khai báo biến có kiểu dữ liệu sẽ giúp dễ tái cấu trúc và an toàn hơn.

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

Giả sử chúng tôi muốn đổi tên thuộc tính **location** trong **myFlashObject** 

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

Nếu bạn không khai báo kiểu dữ liệu cho **myFlashObject** , nó sẽ  nghĩ rằng thuộc tính **location** trong **myFlashObject** là không xác định chứ không phải lỗi do biến không hợp lệ.

Nếu chúng ta nhập giá trị cho  **myFlashObject** nó báo lỗi lúc biên dịch code.

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

Nếu bạn bắt đâu dự án mới , bạn nên setting strict:true trong tsconfig.json file để bật chế độ kiểm tra lựa chọn kiểu dữu liệu.

#### 11. Make use of lint rules

`tslint` có rất nhiều lựa chọn tích hợp  giống như no-any, no-magic-numbers, no-console, mà bạn có thể cấu hình trong file `tslint.json`để đảm bảo thực thi các rule mà chúng ta đã đinh nghĩa.

#### Why?
Có các quy tắc `lint` có nghĩa là bạn sẽ mắc phải một số lỗi nhỏ khi bạn làm điều gì đó mà bạn không nên làm. Điều này sẽ thực thi tính nhất quán trong ứng dụng và  khả năng đọc của bạn.
#### Before

```
public ngOnInit (): void {
    console.log('I am a naughty console log message');
    console.warn('I am a naughty console warning message');
    console.error('I am a naughty console error message');
}
// Output
No errors, prints the below on console window:
I am a naughty console message
I am a naughty console warning message
I am a naughty console error message
```


#### After

```
// tslint.json
{
    "rules": {
        .......
        "no-console": [
             true,
             "log",    // no console.log allowed
             "warn"    // no console.warn allowed
        ]
   }
}
// ..component.ts
public ngOnInit (): void {
    console.log('I am a naughty console log message');
    console.warn('I am a naughty console warning message');
    console.error('I am a naughty console error message');
}
// Output
Lint errors for console.log and console.warn statements and no error for console.error as it is not mentioned in the config
Calls to 'console.log' are not allowed.
Calls to 'console.warn' are not allowed.
```

#### 12. Small reusable components

Trich xuất các phần nhỏ có thể tái sử  dụng trong component và  biến nó thành một phần mới . Làm cho component mới càng câm càng tốt tức là không có bất ký logic phưc tạp nào và hoạt động hoàn toàn dựa vào input  cung cấp.

Theo nguyên tắc chung thì component con cuối cùng thì câm nhất.

#### Why?
Các component có thể tái sử dụng giảm thiểu việc lặp code sau này việc maintain và mở rộng sẽ dễ hơn.

Các component câm thì đơn giản hơn sẽ ít khả năng bị lỗi hơn.

#### 13. Component should only deal with display logic
Tránh việc có logic khác ngoài logic hiển thi trong component bất cứ khi nào có thể bạn có thể chỉ xử lý với logic hiển thị.
####  Why?
Các component được thiết kế cho mục đích display và control  những gì view phải làm. Bất kì logic nghiệp vụ nào cũng lên tách ra thành các method/service của riêng nó khi thích hợp, tách locgic nghiệp vụ ra khỏi view.
Logic nghiệp vụ thường dễ kiểm tra hơn khi trích xuất ra một service và có thể được sử dụng lại bởi bất kỳ chô nào cần dùng lại.

#### 14. Avoid long methods
Các method dài thường chỉ ra rằng chúng đang làm quá nhiều thứ. Cố gắng sử dụng nguyên tắc `Single Responsibility Principle`(1 method chỉ nên thực hiện một công việc ).
#### Why?
Method dài thì khó đọc, khó hiểu, khó maintain. Chúng cũng dễ gặp lỗi, vì việc thay đổi một thức có thể ảnh hưởng đến nhiều thứ kahcs trong method đó. Nó cũng làm việc tái cấu trúc (vốn là điều quan trọng trong bất kỳ ứng dụng nào ) trở nên khó khăn.

#### 15. DRY
Không lặp lại đoạn code giống nhau ở nhiều nơi. Hay tách phần code đó thành một method độc lập sao cho có thể dụng lại tại nhiều chỗ.

####  Why?
Có cùng một mã ở nhiều nơi có nghĩa là nếu chúng ta thay đổi đối với logic đó thì sẽ phải thay đổi toàn bộ code ở nhiều nơi. Điều này gây ra khó khăn cho việc bảo trì và cũng dễ xay ra lỗi mà chugns ta có thể bỏ lỡ việc cập nhật . 

Trong trường hợp này thì nên tách thành đoạn mã riêng để tái sử dụng . Điều này có nghĩa là chỉ cần sửa một chỗ đoạn mã chung kia là được và cũng kiểm tra một chỗ đó sẽ tốt hơn.

#### 16. Add caching mechanisms
Khi call API , response từ một số chúng không thường xuyên thay đổi. Trong những trường hợp đó, bạn có thêm cơ chế bộ nhớ đệm và lưu trữ giá trị từ API. Khi một request khác tới cùng một API được thực hiện, hay kiểm tra xem có giá trị nào cho nó có trong bộ nhớ cache không và nếu có , thì hay sử dụng nó. Nếu không hãy thực hiện lệnh gọi API .

#### Why?
Có cơ chế bộ nhớ cache để tránh call API không không mong muốn. Bằng cách chỉ thực hiện call API  nếu được yêu cầu tránh trung lặp. Không phải tại lại thông tin đã tải rồi và cải thiện hiệu năng ứng dụng.

#### 17.Avoid logic in templates
Nếu bạn có bất kỳ loại logic nào trong template của mình, ngay cả khi đó là một mệnh đề && đơn giản, thì tốt hơn là bạn nên trích xuất nó vào thành phần của nó.

#### Why?
Có logic trong template nghĩa là không thể kiểm tra đơn vị nó và do đó dễ xảy ra lỗi hơn khi thay đổi code  template.
#### Before
```
// template
<p *ngIf="role==='developer'"> Status: Developer </p>
// component
public ngOnInit (): void {
    this.role = 'developer';
}
```

After

```
// template
<p *ngIf="showDeveloperStatus"> Status: Developer </p>
// component
public ngOnInit (): void {
    this.role = 'developer';
    this.showDeveloperStatus = true;
}
```
#### 18. Strings should be safe
Nếu bạn có một biến kiểu chuỗi chỉ có thể có một tập giá trị, thay vì khai báo nó là kiểu chuỗi, bạn có thể khai báo danh sách các giá trị có thể là kiểu.

#### Why?
Bằng cách khai báo kiểu của biến một cách thích hợp, chúng ta có thể tránh các lỗi khi viết mã trong thời gian biên dịch hơn là trong thời gian chạy.

#### Before
```
private myStringValue: string;
if (itShouldHaveFirstValue) {
   myStringValue = 'First';
} else {
   myStringValue = 'Second'
}
```

#### After
```
private myStringValue: 'First' | 'Second';
if (itShouldHaveFirstValue) {
   myStringValue = 'First';
} else {
   myStringValue = 'Other'
}
// This will give the below error
Type '"Other"' is not assignable to type '"First" | "Second"'
(property) AppComponent.myValue: "First" | "Second"
```




Building một ứng dụng là một hành trình liên tục và luôn luôn phải cải thiện mọi thứ . Danh sách tối ưu này là một cách để áp dụng giúp dự án của bạn được nhất quán, giúp ứng dụng ít xảy ra bug và ứng dụng sẽ có hiệu năng tốt hơn.



link tham khảo

https://angular.io/guide/styleguide

https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/