## Giới thiệu
Bình thường, để tạo ra form, chúng ta thường tạo bằng html tĩnh. Nhưng nếu một ngày nào đó, bạn mệt mỏi vì ứng dụng của bạn có quá nhiều form, bạn sẽ nghĩ mình cần tối ưu và làm cho chúng trở nên "động". Formly chính là solution cho bạn.
Formly được hiểu là form động, tức là thay vì sử dụng các thẻ html tĩnh như bình thường, ta sẽ khai báo chúng động dưới dạng biến. Mọi xử lý liên quan đến hiển thị và validate cũng sẽ được xử lý trong khai báo biến. 

Angular-formly là thư viện giúp bạn xây dựng các form trong Angular, support nhiều tiện ích cho form. Giờ cùng bắt đầu thử dùng nó thôi nào.

## Cài đặt
Các bước cài đặt khá đơn giản :
```
  npm install @angular/forms @ngx-formly/core --save
```

Sau khi cài đặt xong, chúng ta cần tiếp tục import như sau

**app.module.ts**
```
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';

@NgModule({
  imports: [
    ...,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
  ],
})
export class AppModule {}
```
Nếu bạn muốn import thêm các lib UI, đọc kỹ hơn ở đây nhé
https://ngx-formly.github.io/ngx-formly/guide/getting-started

## Ví dụ mở đầu
Giờ bắt đầu thử với form động qua ví dụ simple nhất này nhé :relaxed:. Ở đây, chúng ta sẽ cần 2 file, file component và file template

**app.component.ts**
```
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-app-example',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Input',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
      },
    },
  ];
}
```

**app.component.html**
```
<form [formGroup]="form">
  <formly-form [model]="model" [fields]="fields" [options]="options" [form]="form"></formly-form>
</form>
```

Điều bạn cần chú  ý nhất ở đây chính là `fields` và `model`. Hiểu theo cách đơn giản nhất:
* `fields` chính là nơi để bạn config các phần tử cho form
* `model` nơi lưu giá trị của các phần tử đó

Trong ví dụ trên thì mình đang định nghĩa cho form có đúng 1 phần tử dạng input, có key là `name` , tiếp theo là định nghĩa thêm các options cho nó như `label`, `placeholder`,.... nhớ là phải khai báo chúng trong `templateOptions` thì formly mới hiểu được nhé.

Ngay sau khi bạn thay đổi giá trị thì `model` sẽ được cập nhật, lúc đó nó sẽ có dạng object lưu trữ tất cả dữ liệu của form, mỗi key của object sẽ tương ứng với `key` mà bạn đã định nghĩa ở trên, còn value thì chính là value của trường đó rồi
 ```
{
    name: 'gia tri ban dang nhap'
}
```

Thông qua ví dụ trên, bạn có thể thấy việc khai báo form động giúp chúng ta giảm đi rất nhiều số code trong template, nhưng đồng thời lại tăng số lượng code trong component, tuy nhiên, việc này không đáng lo ngại vì mình chỉ khai báo chúng gọn trong `fields` mà thôi.
Ví dụ trên khá đơn giản, nên chắc hẳn bạn sẽ cũng sẽ thắc mắc một số câu hỏi, kiểu như:
<br>
<br>

**1.*Làm sao để giảm thiểu cả code trong component nữa nhỉ?***

Lưu chúng trong database dưới dạng JSON, mọi thứ "động" đều được load từ database

**2.*Formly có đầy đủ các dạng element của form không? Nếu muốn định nghĩa kiểu khác kiểu thông thường thì sao***

Đương nhiên là suport đầy đủ nhé, còn nếu bạn muốn tạo kiểu khác, thì hãy đọc thêm phần này nhé
https://ngx-formly.github.io/ngx-formly/guide/custom-formly-field

**3.*Dùng formly thì validate kiểu gì nhỉ?***

Cứ yên tâm vì formly đã support validate tận răng, nó suport regex, message, function khi validate

**4.*Khi nào nên dùng formly và khi nào nên dùng form động***

Tất nhiên là bạn nên cân nhắc thật cẩn thận, vì nếu ứng dụng bạn ít form thì chả cần dùng đến formly để làm gì cho tốn công cài thêm package, code cũng không gọn được là bao, khi ứng dụng quá phức tạp, cần load form có cấu trúc giống nhau nhưng phụ thuộc theo nhiều điều kiện thì sử dụng formly là một giải pháp hay
<br>
<br>

Hi vọng một số câu hỏi mình cũng đã từng tự hỏi sẽ giúp các bạn khi mới bắt đầu với formly. Đây chỉ là bài viết giới thiệu sơ lược nhất, nếu muốn tìm hiểu kĩ hơn nữa thì bạn đọc thêm ở  trang chủ nhé https://ngx-formly.github.io/ngx-formly/. À quên đây là lib formly dành cho ngx (angular >=2). Nếu bạn muốn sử dụng cho AngularJS thì là click vào [đây](http://angular-formly.com/#!/) nhé, tuy nhiên, giờ bản này đã không còn được maintain nữa :disappointed_relieved: