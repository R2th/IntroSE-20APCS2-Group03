Pipes trong angular là những hàm đơn giản được sử dụng trong các biểu thức template để chấp nhận một giá trị đầu vào và trả về một giá trị đã chuyển đổi.<br>
Bạn có thể sử dụng pipes để chuyển đổi các chuỗi, số tiền, ngày tháng và dữ liệu khác để hiển thị trong template của chúng ta.<br>
Hãy theo dõi cách sử dụng các pipes đã có sẵn trong angular như bên dưới nhé:<br>

### 1.Sử dụng LowerCasePipe và UpperCasePipe
**UpperCasePipe**: Chuyển  đổi văn bản thành tất cả các chữ hoa.<br>
**LowerCasePipe**: Chuyển đổi văn bản thành tất cả các chữ thường.<br>
**Cú pháp**:<br>
```
{{ value_expression | lowercase }}
{{ value_expression | uppercase }}
```
Ví dụ tạo một component tên là pipes với command sau:<br>
```
ng g c pipes
```
Thêm selector của component vừa tạo vào file: **src/app/app.component.html**<br>
```
<app-pipes></app-pipes>
```
Ví dụ, cập nhật code vào file: **src/app/pipes/pipes.component.ts**<br>
```Javascript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent implements OnInit {
  ngOnInit(): void {}

    value: string = 'Angular 13';
}
```
Tiếp tục, cập nhật code vào file: **src/app/pipes/pipes.component.html**<br>
```Javascript
<div class="container">
    <table class="table">
        <thead>
          <tr class="table-info">
            <th scope="col">Name</th>
            <th scope="col">Input</th>
            <th scope="col">Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>In lowercase:</td>
            <td>{{value}}</td>
            <td>{{value | lowercase}}</td>
          </tr>
          <tr>
            <td>In uppercase:</td>
            <td>{{value}}</td>
            <td>{{value | uppercase}}</td>
          </tr>
        </tbody>
      </table>
</div>
```
**Output**:<br>
![](https://images.viblo.asia/6c9b6880-3782-45fd-b5c0-aa850ca7ffec.png)

### 2.Sử dụng SlicePipe
Tạo một mảng hoặc chuỗi mới chứa một tập hợp con của các phần tử.<br>
**Cú pháp**:<br>
```
{{ value_expression | slice : start [ : end ] }}
```
Ví dụ, hãy cập nhật code vào file: **src/app/pipes/pipes.component.ts**<br>
```Javascript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent implements OnInit {
  ngOnInit(): void {}
    str: string = 'abcdefghij';
    collection: string[] = ['a', 'b', 'c', 'd'];
}
```
Tiếp tục, cập nhật code vào file: **src/app/pipes/pipes.component.html**<br>
```Javascript
<div class="container">
    <div class="col col-lg-6">
        <table class="table">
            <thead>
              <tr class="table-info">
                <th scope="col">Name Pipe</th>
                <th scope="col">Input</th>
                <th scope="col">Output</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>slice:0:4</td>
                    <td>{{str}}</td>
                    <td>{{str | slice:0:4}}</td>
                </tr>
                <tr>
                    <td>slice:4:0</td>
                    <td>{{str}}</td>
                    <td>{{str | slice:4:0}}</td>
                </tr>
                <tr>
                    <td>slice:-4</td>
                    <td>{{str}}</td>
                    <td>{{str | slice:-4}}</td>
                </tr>
                <tr>
                    <td>slice with list data in array</td>
                    <td>{{collection}}</td>
                    <td>{{collection | slice:1:3}}</td>
                </tr>
            </tbody>
          </table>
    </div>
</div>
```
**Output**:<br>
![](https://images.viblo.asia/e0b98d81-c373-4821-adae-57a9f7afb27d.png)

### 3.Sử dụng DecimalPipe
**Cú Pháp**:<br>
```
{{ value_expression | number [ : digitsInfo [ : locale ] ] }}
```
**digitsInfo**: Biểu diễn chữ số và thập phân<br>
**locale**: Chỉ định các quy tắc định dạng ngôn ngữ sẽ sử dụng<br><br>
Cách sử dụng:<br>
**digitsInfo**<br>
Biểu diễn thập phân của giá trị được chỉ định bởi tham số digitInfo, được viết ở định dạng sau:<br>
```
{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
```
**minIntegerDigits**: Số chữ số nguyên tối thiểu trước dấu thập phân. Mặc định là 1.<br>
**minFractionDigits**: Số chữ số tối thiểu sau dấu thập phân. Mặc định là 0.<br>
**maxFractionDigits**: Số chữ số tối đa sau dấu thập phân. Mặc định là 3.<br>

**locale**<br>
locale sẽ định dạng một giá trị theo quy tắc ngôn ngữ<br>
Khi không được cung cấp, hãy sử dụng giá trị LOCALE_ID, theo mặc định là en-US.<br>
Để sử dụng locale, bạn phải chạy 2 command bên dưới để cài đặt thư viện **localize** nhé:<br>
```
ng add @angular/localize
ng build --localize
```

Ví dụ, hãy thêm code bên dưới vào file : **src/app/pipes/pipes.component.ts**<br>
```Javascript
import { Component, OnInit} from '@angular/core';
import '@angular/common/locales/global/fr';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent implements OnInit {
    ngOnInit(): void {}
    pi: number = 3.14159265359;
}

```
Tiếp theo, cập nhật code vào file: **src/app/pipes/pipes.component.html**<br>
```Javascript
<div class="container">
    <div class="col col-lg-6">
        <table class="table">
            <thead>
              <tr class="table-info">
                <th scope="col">Name Pipe</th>
                <th scope="col">Input</th>
                <th scope="col">Code</th>
                <th scope="col">Output</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Decimal</td>
                    <td>{{pi}}</td>
                    <td>{{"pi | number"}}</td>
                    <td>{{pi | number}}</td>
                </tr>
                <tr>
                    <td>Decimal</td>
                    <td>{{pi}}</td>
                    <td>{{"pi | number:'4.1-5'"}}</td>
                    <td>{{pi | number:'4.1-5'}}</td>
                </tr>
                <tr>
                    <td>Decimal</td>
                    <td>{{pi}}</td>
                    <td>{{"pi | number:'4.1-5'"}}</td>
                    <td>{{pi | number:'4.15-20'}}</td>
                </tr>
                <tr>
                    <td>With digitsInfo and
                        locale parameters specified:</td>
                    <td>{{pi}}</td>
                    <td>{{"pi | number:'4.1-5':'fr'"}}</td>
                    <td>{{pi | number:'4.1-5':'fr'}}</td>
                </tr>
            </tbody>
          </table>
    </div>
</div>
```
**Output**:<br>
![](https://images.viblo.asia/50d8bef5-1ee0-43dd-9d37-e889c1d95215.png)

### 4.Sử dụng PercentPipe
**Cú Pháp**:<br>
```
{{ value_expression | percent [ : digitsInfo [ : locale ] ] }}
```
Cú pháp về cơ bản cũng giống như **DecimalPipe**, chúng ta chỉ cần thay tham số **number** thành **percent**<br>
Ví dụ, hãy cập nhật 2 dòng code bên dưới vào file: **src/app/pipes/pipes.component.ts**<br>
```Javascript
    a: number = 0.259;
    b: number = 1.3495;
```
Tiếp tục, cập nhật code vào file: **src/app/pipes/pipes.component.html**<br>
```Javascript
<div class="container">
    <div class="col col-lg-7">
        <table class="table">
            <thead>
              <tr class="table-info">
                <th scope="col">Name Pipe</th>
                <th scope="col">Input</th>
                <th scope="col">Code</th>
                <th scope="col">Output</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>use percent:</td>
                    <td>{{ a }}</td>
                    <td>{{"a | percent"}}</td>
                    <td>{{ a | percent }}</td>
                </tr>
                <tr>
                    <td>use percent:</td>
                    <td>{{ b }}</td>
                    <td>{{ "b | percent:'4.3-5'" }}</td>
                    <td>{{ b | percent:'4.3-5' }}</td>
                </tr>
                <tr>
                    <td>use percent and locale parameters specified:</td>
                    <td>{{ b }}</td>
                    <td>{{ "b | percent:'4.3-5':'fr'" }}</td>
                    <td>{{ b | percent:'4.3-5':'fr' }}</td>
                </tr>
            </tbody>
          </table>
    </div>
</div>

```
**Output**:<br>
![](https://images.viblo.asia/fce19112-4f8f-431d-8ea1-041d7f99f564.png)

### 5.Sử dụng CurrencyPipe
**Cú Pháp**:<br>
```
{{ value_expression | currency [ : currencyCode [ : display [ : digitsInfo [ : locale ] ] ] ] }}
```
Cách sử dụng:<br> 
**digitsInfo**, **locale** thì giống như các pipes **DecimalPipe**, **PercentPipe** ở mục trước mình có đề cập nhé.<br>
**currencyCode**: Mã tiền tệ [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217), chẳng hạn như USD đối với đô la Mỹ và EUR đối với đồng euro.<br>
**display**: Định dạng cho chỉ báo tiền tệ, giá trị truyền vào có thể là string hoặc boolean, hãy tham khảo tại ([click vào link tham khảo này nhé!](https://angular.io/api/common/CurrencyPipe) )<br>

Ví dụ, cập nhật code vào file template: **src/app/pipes/pipes.component..html**<br>
```Javascript
<div class="container">
    <div class="col col-lg-7">
        <table class="table">
            <thead>
              <tr class="table-info">
                <th scope="col">Name Pipe</th>
                <th scope="col">Input</th>
                <th scope="col">Code</th>
                <th scope="col">Output</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>use currency:</td>
                    <td>{{ a }}</td>
                    <td>{{"a | currency"}}</td>
                    <td>{{a | currency}}</td>
                </tr>
                <tr>
                    <td>use currency:</td>
                    <td>{{ a }}</td>
                    <td>{{ "a | currency:'CAD'" }}</td>
                    <td>{{a | currency:'CAD'}}</td>
                </tr>
                <tr>
                    <td>use currency:</td>
                    <td>{{ a }}</td>
                    <td>{{ "a | currency:'CAD':'code'" }}</td>
                    <td>{{a | currency:'CAD':'code'}}</td>
                </tr>
                <tr>
                    <td>use currency:</td>
                    <td>{{ b }}</td>
                    <td>{{ "b | currency:'CAD':'symbol':'4.2-2'" }}</td>
                    <td>{{b | currency:'CAD':'symbol':'4.2-2'}}</td>
                </tr>
                <tr>
                    <td>use currency:</td>
                    <td>{{ b }}</td>
                    <td>{{ "b | currency:'CAD':'symbol-narrow':'4.2-2'" }}</td>
                    <td>{{b | currency:'CAD':'symbol-narrow':'4.2-2'}}</td>
                </tr>
                <tr>
                    <td>use currency:</td>
                    <td>{{ b }}</td>
                    <td>{{ "b | currency:'CAD':'symbol':'4.2-2':'fr'" }}</td>
                    <td>{{b | currency:'CAD':'symbol':'4.2-2':'fr'}}</td>
                </tr>
                <tr>
                    <td>use currency:</td>
                    <td>{{ b }}</td>
                    <td>{{ "b | currency:'CLP'" }}</td>
                    <td>{{b | currency:'CLP'}}</td>
                </tr>
            </tbody>
          </table>
    </div>
</div>

```
**Output**:<br>
![](https://images.viblo.asia/0facfe83-02ee-4c63-8d1a-8dd44444c8dc.png)

### 6.Sử dụng DatePipe
**Cú Pháp**:<br>
```
{{ value_expression | date [ : format [ : timezone [ : locale ] ] ] }}
```
Parameters<br>
**format**: Tùy chọn. Mặc định là 'mediumDate'.<br>
**timezone**: Tùy chọn. Mặc định là undefined.<br>
**locale**: Tùy chọn. Mặc định là undefined.<br>

Miểu tả cách  sử dụng, hãy tham khảo tại [Chi tiết thì click vào link này nhé](https://angular.io/api/common/DatePipe)<br>
Ví dụ, hãy cập nhật 1 dòng code vào file: **src/app/pipes/pipes.component.ts**<br>
```Javascript
    today: number = Date.now();
```
Tiếp tục, cập nhật code vào file template: **src/app/pipes/pipes.component..html**<br>
```Javascript
<div class="container">
    <div class="col col-lg-7">
        <table class="table">
            <thead>
              <tr class="table-info">
                <th scope="col">Name Pipe</th>
                <th scope="col">Input</th>
                <th scope="col">Code</th>
                <th scope="col">Output</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>use date:</td>
                    <td>{{ today }}</td>
                    <td>{{"today | date"}}</td>
                    <td>{{today | date}}</td>
                </tr>
                <tr>
                    <td>use date:</td>
                    <td>{{ today }}</td>
                    <td>{{ "today | date:'fullDate'" }}</td>
                    <td>{{today | date:'fullDate'}}</td>
                </tr>
                <tr>
                    <td>use time :</td>
                    <td>{{ today }}</td>
                    <td>{{ "today | date:'h:mm a z'" }}</td>
                    <td>{{today | date:'h:mm a z'}}</td>
                </tr>
            </tbody>
          </table>
    </div>
</div>

```
**Output**:<br>
![](https://images.viblo.asia/75e198e2-8ed6-49f2-86ea-1fdd4b86ea8f.png)<br>
Trên đây mình vừa mới giới thiệu một số pipes phổ biến hay sử dụng trong angular,còn rất nhiều các pipes khác trong angulars, các bạn có thể tham khảo trong tài liệu angulars nhé.<br>