![](https://images.viblo.asia/b4304155-7312-4001-b222-bdc4797b897a.png)


## 1. Giới thiệu `pipe`

`Pipe` là một tính năng được xây dựng sẵn từ Angular 2 với mục tiêu nhằm biến đổi dữ liệu đầu ra, hiển thị lên trên template đúng với ý tưởng thiết kế lập trình, thân thiện với người sử dụng

Ví dụ là định dạng kiểu hiển thị datetime, viết hoa chữ cái, hiển thị tên thành phố, định dạng lại số hay đơn vị tiền, ...

List pipe mà angular cung cấp dùng mặc định ([xem thêm](https://angular.io/api?type=pipe))

## 2. Sử dụng pipe

Ví dụ dưới đây sẽ sử dụng `pipe` để biến đổi ngày sinh nhật từ dữ liệu thô sang định dạng dễ đọc hơn

```
#src/app/hero-birthday1.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-birthday',
  template: `<p>The hero's birthday is {{ birthday | date }}</p>`
})
export class HeroBirthdayComponent {
  birthday = new Date(1988, 3, 15);
}

//Fri Apr 15 1988 00:00:00 GMT+0700 (Indochina Time) ->  April 15, 1988
```

Bên trong biểu thức nội suy `{{}}`, bạn đã biến đổi ngày sinh nhật bằng biểu thức pipe `|` từ định dạng của js `Fri Apr 15 1988 00:00:00 GMT+0700 (Indochina Time)` sang `April 15, 1988`, dễ đọc cho người dùng

## 3. Tham số trong `pipe`

Để có thể bổ sung tham số trong `pipe`, chúng ta sử dụng dấu hai chấm `:` sau tên pipe đó (ví dụ currency:'EUR')

Nếu pipe đó chấp nhânj nhiều tham số đúng với cú pháp, hay viết `:` nằm giữa hai tham số (ví dụ slice:1:5)

Tương tự với ví dụ trên, chúng ta sẽ truyền tham số là định dạng của `[DatePipe](https://angular.io/api/common/DatePipe)`

```
#src/app/app.component.html

<p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }} </p>
```

Tham số có thể được custom lại thông qua các thao tác thay đổi sự kiện (nhưng vẫn phải đúng với cú pháp của pipe đó)

Sử dụng tiếp với ví dụ trên, chúng ta sẽ không truyền tham số định dạng trực tiếp đằng sau `datepipe` mà sẽ ràng buộc thông qua một biến là `format` và chúng ta sẽ thay đổi `format` đó thông qua một button bên dưới

```
#src/app/hero-birthday2.component.ts (template)

template: `
  <p>The hero's birthday is {{ birthday | date:format }}</p>
  <button (click)="toggleFormat()">Toggle Format</button>
`
```

Sự kiện `click` sẽ thay đổi `format` của `datepipe` giữa kiểu `shortDate` và `fullDate`

```
#src/app/hero-birthday2.component.ts (class)

export class HeroBirthday2Component {
  birthday = new Date(1988, 3, 15); // April 15, 1988
  toggle = true; // start with true == shortDate

  get format()   { return this.toggle ? 'shortDate' : 'fullDate'; }
  toggleFormat() { this.toggle = !this.toggle; }
}
```

Kết quả: 

![](https://images.viblo.asia/e288781b-95b1-4e29-ba06-cc61fa57cd4c.gif)

## 4. Chuỗi các `pipe`

Bạn có thể kết hợp sử dụng các pipe liên tiếp với nhau, pipe trước sẽ là dữ liệu đầu vào của pipe sau, đúng như nghĩa đen của nó là `ống nước`

Ví dụ, sử dụng kết hợp cả `DatePipe` và `UpperCasePipe`

```
#src/app/app.component.html

The chained hero's birthday is
{{ birthday | date | uppercase}}

// APR 15, 1988
```

Sử dụng tham số cùng với chuỗi pipe

```
#src/app/app.component.html

The chained hero's birthday is
{{  birthday | date:'fullDate' | uppercase}}

// FRIDAY, APRIL 15, 1988
```

## 5. Custom pipes

Ngoài những pipe mà angular tích hợp sẵn trong code, nó còn cung cấp cho chúng ta công cụ để có thể tự sáng tạo ra những pipe của riêng mình

```
#src/app/exponential-strength.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'exponentialStrength'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent?: number): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }
}
```

Pipe trên là một `custom pipe`

Có thể hiểu đầu vào là 2 tham số, tham số thứ nhất là số ngẫu nhiễn, tham số thứ 2 là số mũ. Đầu ra sẽ là phép tính lũy thừa từ hai số

```
#src/app/power-booster.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-power-booster',
  template: `
    <h2>Power Booster</h2>
    <p>Super power boost: {{2 | exponentialStrength: 10}}</p>
  `
})
export class PowerBoosterComponent { }
```

Kết quả:

![](https://images.viblo.asia/a014e114-5a72-473b-94ef-2e90d5b4270b.png)


Những nội dung cần làm để tạo một custom pipe

- Viết một class và decorate nó với decorator `@Pipe` ( báo cho angular biết đây là pipe) và decorator này cần tối thiểu một object có property name, chính là tên của pipe để có thể gọi ra trong template.

- Tiếp theo, chúng ta cần implement một interface là PipeTransform, và implement hàm transform của interface đó. Hàm `transform` sẽ làm biến đổi dữ liệu

- Sau khi hoàn thiện pipe trên, ta cần import custom pipe trên vào trong NgModule mà template cần sử dụng custom pipe thuộc về ( ví dụ trên là viết cùng file )


Ví dụ trên là dữ liệu tĩnh, bây giờ chúng ta sẽ làm cho nó động hơn với `ngModel`

```
#src/app/power-boost-calculator.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-power-boost-calculator',
  template: `
    <h2>Power Boost Calculator</h2>
    <div>Normal power: <input [(ngModel)]="power"></div>
    <div>Boost factor: <input [(ngModel)]="factor"></div>
    <p>
      Super Hero Power: {{power | exponentialStrength: factor}}
    </p>
  `
})
export class PowerBoostCalculatorComponent {
  power = 5;
  factor = 1;
}
```

Kết quả:

![](https://images.viblo.asia/a6b8cef6-e76c-45df-85b9-46e25199510e.gif)


## 6. Kết luận

Trên đây là tìm hiểu của mình về pipe trong angular, hi vọng giúp ích được cho mọi người

## 7. Tài liệu tham khảo

[Pipe trong angular](https://www.tiepphan.com/thu-nghiem-voi-angular-pipe-trong-angular/)

[Custom pipe](https://viblo.asia/p/custom-pipes-trong-angular-7-E375zXPRZGW)

[Angular doc](https://angular.io/guide/pipes)

[API list pipe](https://angular.io/api?query=pipe)