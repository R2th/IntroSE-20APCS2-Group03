Xin chào tất cả mọi người, bài viết này minh xin giới thiệu về Pipe trong Angular, rất mong được mọi người theo dõi

### 1) Pipe trong Angular là gì

- Là một tính năng được xây dựng sẵn từ Angular với mục tiêu nhằm biến đổi dữ liệu trước khi hiển thị ra cho người dùng
- Một số pipe dựng sẵn trong Angular.

    - lowercase: Chuyển chuỗi thành kí tự thường
    - uppercase: Chuyển chuỗi thành kí tự hoa
    - date: Chuyển dữ liệu thành định dạng ngày tháng
    - currency: Chuyển dữ liệu thành định dạng tiền tệ
    - json: Chuyển dữ liệu về dạng JSON
    - percent: Chuyển dữ liệu về dạng %
    - number: Chuyển dữ liệu về dạng thấp phân
    - slice: Cắt dữ liệu của mảng hoặc chuỗi
    - ...

- Các bạn có thể tham khảo chi tiết hơn các pipe trong Angular [tại đây](https://angular.io/api?type=pipe)

**1.1 Cú pháp**

> {{ data | pipeName :  (Parameter1): (Parameter2) ...}}


Trong đó:
- **data** : là dữ liệu cần chuyển đổi
- **pipeName** : là pipe mà bạn sử dụng
- **Parameter1, Parameter2**: là các tham số truyền vào cho pipe

**1.2) Ví dụ 1**

**app.component.ts**
```js
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public content : string = `
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book
    `;
}
```
- ở file này mình sẽ khai báo 1 biến  content và gán cho nó 1 nội dung bất kỳ sau đó mình sẽ qua file template sử dụng pipe để hiển thị nó ra

**app.component.html**

```html
<div class="container" [style.margin-top.px]="30">
    <table class="table table-bordered table-hover">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên Pipe</th>
                <th>Dữ liệu đầu vào</th>
                <th>Kết quả</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>UpperCase</td>
                <td>{{ content }}</td>
                <td>{{ content | uppercase }}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>LowerCase</td>
                <td>{{ content }}</td>
                <td>{{ content | lowercase }}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>TitleCase</td>
                <td>{{ content }}</td>
                <td>{{ content | titlecase }}</td>
            </tr>
        </tbody>
    </table>
</div>
```
- trong ví dụ trên mình có sử dụng 3 pipe là uppercase, lowercase,  titlecase để hiển thị dữ liệu ra
- Kết quả mình thu được là

![](https://images.viblo.asia/6c13a46a-7d6d-421d-803e-1c1f4171536c.PNG)

**Ví dụ 2**

- Trong ví dụ một ta có sử dụng một số pipe liên quan đến string và không có tham số tuyền vào của pipe ở ví dụ này ta sẽ sử dụng pipe có truyền tham số qua các pipe number và precent, currency, date.

**app.component.ts**

```js
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public dataNumber : number = 89.14246; // test pipe number
    public result : number = 0.899123; // test pipe percent
    public dola : number = 89.9; // test pipe currency
    public toDay : Date = new Date(); // test pipr date
}
```

**app.component.html**

```html
<div class="container" [style.margin-top.px]="30">
    <table class="table table-bordered table-hover">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên Pipe</th>
                <th>Dữ liệu đầu vào</th>
                <th>Kết quả</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Number</td>
                <td>{{ dataNumber }}</td>
                <td>{{ dataNumber | number :'1.0-3' }}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Percent</td>
                <td>{{ result }}</td>
                <td>{{ result | percent :'1.0-3' }}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Currency</td>
                <td>{{ dola }}</td>
                <td>{{ dola | currency :'USD' :true: '1.0-3' }}</td>
            </tr>
            <tr>
                <td>4</td>
                <td>Date</td>
                <td>{{ toDay }}</td>
                <td>{{ toDay | date :'dd/MM/y hh:mm:ss' }}</td>
            </tr>
        </tbody>
    </table>
</div>
```
- Như các bạn đã thấy thì trong hai pipe trên thì mình có truyền tham số vào trong pipe để pipe nó biết định dạng dữ liệu mình muốn là như thế nào
- Pipe **number**, **precent** tham số : '1.0-3' có ý nghĩa như sau: 
    - **1**: số chữ số phần nguyên - nếu thiếu sẽ tự thêm số 0
    - **0**: số chữ số thập phân tối thiểu - nếu thiếu sẽ tự thêm số 0
    - **3**: Số chữ số thập phân tối đa (lưu ý là nó phải luôn lớn hơn hoặc bằng số chữ số thập tối thiểu)
- Pipe **precent** là pipe chuyển đổi số sang dạng % nên khi sử nó thì mặc định nó sẽ thêm `%` và cuối dữ liệu hiển thị
- Pipe **currency** là pipe liên quan đến xử lý tiền tệ 
    - **USD**:  là tham số tiền của quốc gia mặc định nó sẽ là USD mã này sẽ theo chuẩn là [ISO 4217](https://vi.wikipedia.org/wiki/ISO_4217)
    - **true**: có nghĩa là có hiển thị đơn tiền tệ hay không, mặc định là false
    - **1.0-3**: thì nó cũng giống như **number** đã được giải thích ở trên

- Pipe **date** là pipe liên quan đến xử lý định dạng thời gian
    - **'dd/MM/y hh:mm:ss**': tham số này cho biết định dạng thời gian sẽ được hiển thị như thế nào (chi tiết về định dạng ta có thể tham khảo [tại đây](https://angular.io/api/common/DatePipe))
- Kết quả :
![](https://images.viblo.asia/9abeebbe-3a73-4d27-8054-55194fe64e7b.PNG)




### 2) Custom Pipe
- Trong quá trình xử lý dữ liệu để hiển thị ra cho người dùng thì các pipe mà Angular hỗ trợ sẵn thì sẽ là chưa đủ so với yêu cầu mà bài toán đưa ra, để có để đáp ứng được yêu cầu đó thì ta có thể tự viết ra các pipe để phù hợp với bài toán
- Cú pháp : 

> ng g pipe my-pipe

**2.1) Ví dụ**

- Mình sẽ tạo ra 1 pipe cú nhiệm vụ là cắt string khi chữ nó quá dài thì sẽ hiển thị `...`

> ng g pipe format-content


- Sau khi chạy lệnh tạo pipe ở trên xong thì ta sẽ có 1 file như sau:

**format-content.pipe.ts**

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatContent'
})
export class FormatContentPipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {
        return null;
    }

}
```

- Trong đó :
    - **value**: sẽ là dữ liệu đầu vào của pipe
    - **args**: sẽ là các tham số truyền vào cho pipe
- Tiếp theo ta sẽ custom lại cái pipe để cho nó hiển thị được như yêu cầu ở trên của mình

**app.component.ts**

```js
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public content : string = `
        Thời điểm 8h30 theo giờ Việt Nam,
        giá vàng thế giới đứng ở mức 1.837 USD/ounce,
        giảm nhẹ 2 USD/ounce so với chốt phiên tuần trước.
    `;
}
```
**app.component.html**

```html
<div class="container" [style.margin-top.px]="30">
    <table class="table table-bordered table-hover">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên Pipe</th>
                <th>Dữ liệu đầu vào</th>
                <th>Kết quả</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Format Content</td>
                <td>{{ content }}</td>
                <td>{{ content | formatContent :0 :20 }}</td>
            </tr>
        </tbody>
    </table>
</div>
```

**format-content.pipe.ts**

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatContent'
})
export class FormatContentPipe implements PipeTransform {

    transform(value: string, start : number, end: number): unknown {
        return value.substr(start, end) + '...';
    }

}
```

- Ở pipe này mình nhận dữ liệu đầu vào kèm theo 2 tham số được truyền vào cho pipe sau đó mình xử lý dữ liệu với hàm **substr()** và kết quả mình thu được là

![](https://images.viblo.asia/1630d9e3-cc6c-44e1-bb5c-b87394e48a90.PNG)


**Kết luận**

- Trên đây là một chút kiến thức mà mình tìm hiểu được về pipe trong Angular. Cảm ơn mọi người đã theo dõi bài viết của mình.

**Nguồn tham khảo**

- https://angular.io/api?type=pipe