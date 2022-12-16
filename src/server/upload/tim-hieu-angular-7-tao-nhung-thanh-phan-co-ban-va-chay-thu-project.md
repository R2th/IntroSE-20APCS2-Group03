Ở bài viết lần trước [[Tìm hiểu Angular 7] Những thiết lập đầu tiên](https://viblo.asia/p/tim-hieu-angular-7-nhung-thiet-lap-dau-tien-QpmleoWoKrd#_running-the-application-10), tôi và các bạn đã tìm hiểu về những thiết lập cơ bản để có thể chạy được project Angular. Trong bài viết này chúng ta cùng nhau thử viết những dòng code đơn giản nhé.
## Running the application
### Making a `Component`
Một trong những ý tưởng lớn đằng sau Angular là ý tưởng về các `components`. Trong ứng dụng Angular, chúng ta viết các thẻ HTML để trình bày và giúp ứng dụng tương tác với user. Nhưng browser lại chỉ hiểu được giới hạn một tập các thẻ được built sẵn như là  `<select>`, `<form>` hay `<video>`. 

Điều gì sẽ xảy ra nếu chúng ta dạy cho browser một tag mới?. Và điều gì xảy ra nếu chúng ta muốn có thẻ `<weather>` để hiển thị thông tin thời tiết? Hay nếu chúng ta muốn tạo một thẻ `<login>` để hiển thị login panel thì phải làm thế nào?<br>
Và đây cũng chính là ý tưởng cơ bản đằng sau các `components`: đó là, dạy browser các thẻ mới, và tùy chỉnh chức năng cho chúng.

> Nếu bạn có nền tảng về AngularJS 1.X, bạn có thể nghĩ  `components` như là một new version của directives
> 
Nào, hãy cùng tôi tạo component đầu tiên. Khi tạo xong chúng ta có thể dùng nó trong HTML document, bằng cách gọi thẻ `app-hello-world`:<br>
**`<app-hello-world></app-hello-world>`**<br>
Để tạo một component mới bằng Angular CLI, chúng ta sẽ dùng lệnh **generate**. <br>
Chẳng hạn để tạo ra component `hello-world` , chúng ta cần chạy lệnh dưới đây:
```
$ ng generate component hello-world

CREATE src/app/hello-world/hello-world.component.css (0 bytes)
CREATE src/app/hello-world/hello-world.component.html (30 bytes)
CREATE src/app/hello-world/hello-world.component.spec.ts (657 bytes)
CREATE src/app/hello-world/hello-world.component.ts (288 bytes)
UPDATE src/app/app.module.ts (414 bytes)
```

Vậy một Component mới thì được định nghĩa như thế nào? Một component cơ bản có 2 thành phần:
1. Một Component decorator
2. Một Component định nghĩa class

Đầu tiên, chúng ta hãy xem code của component dưới đây. Mở TypeScript file `hello-world.component.ts`

**src/app/hello-world/hello-world.component.ts**
```
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
```
Nhìn đoạn code trên có vẻ khá là loằng ngoằng đúng không? Đừng lo lắng quá, chúng ta sẽ đi tìm hiểu từng bước một.

>Để ý thấy rằng, đuôi của file TypeScript phía trên là `.ts`  chứ không phải là `.js`, vấn đề là do browser của chúng ta không biết cách nào để diễn giải file TypeScript. Và để giải quyết vấn đề đó, lệnh `ng serve` sẽ tự động biên dịch file `.ts` sang `.js`.
>

### Importing Dependencies
Câu lệnh `import` sẽ định nghĩa ra những module mà chúng ta muốn viết code. Ở đây, chúng ta đang import 2 thứ đó là: `Component` và `OnInit`.<br>
Chúng ta sẽ `import Component` từ module `"@angular/core"`. Và `"@angular/core"` sẽ nói cho chương trình của chúng ta biết nơi tìm các dependencies mà chúng ta mong muốn. Và ở trong trường hợp này, chúng ta đang nói với compiler rằng, `"@angular/core"` hãy defines và exports ra 2 object JavaScript/TypeScript đó là: `Component` và `OnInit`

Và chúng ta cũng `import OnInit` từ cùng một module như ở bên trên. Cái này chúng ta sẽ tìm hiểu sau, tuy nhiên ngắn gọn là `OnInit` sẽ giúp chúng ta chạy code khi khởi tạo Component, còn hiện tại thì đừng quan tâm nó vội.<br>
Chú ý, format của lệnh import đó là : `import { thứ mong muốn } từ đâu đó`.<br>
Trong `{ thứ mong muốn }` mà chúng ta đang dùng được gọi là `destructuring`. Destructuring là một tính năng được cung cấp bởi ES6 và TypeScript. Chúng ta sẽ tiếp tục nói về nó ở các phần tìm hiểu sau.<br>
Ý tưởng về `import` thì khá giống với `import` trong Java và `require` trong Ruby: Chúng ta kéo nó những dependencies này từ một module khác và làm cho nó sẵn sàng để sử dụng trong file này.  

### Component Decorators
Sau khi import các dependencies, chúng ta tiếp tục khai báo Component:

**src/app/hello-world/hello-world.component.ts**
```
@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
```
Nếu bạn mới sử dụng TypeScript thì cú pháp của câu lệnh tiếp theo này có vẻ hơi lạ:
```
@Component({ 
//...
})
```
Cái này được gọi là `decorators`.<br>
Chúng ta hiểu một cách đơn giản thì, `decorators` như là một metadata được thêm vào code của bạn. Khi dùng `@Component` ở `HelloWorld` class, thì đó là chúng ta đang coi `HelloWorld` như là một component.<br>
Nếu bạn muốn có thể dùng component này bằng cách dùng tag `<app-hello-world>`, thì bạn cần configure `@Component` và chỉ rõ ở `selector` là `app-hello-world`.
```
@Component({
selector: 'app-hello-world' 
// ... more here
})
```
Cú pháp của component selectors Angular cũng tương tự với selectors của CSS (tuy nhiên, Angular component cũng có một số cú pháp đặc biệt cho selectors, chúng ta sẽ cùng tìm hiểu ở phần sau ). Hiện tại, chúng ta cứ hiểu rằng selector sẽ định nghĩa là một tag mới.<br>
Thuộc tính `selector` chỉ ra `DOM element` nào mà component này sẽ sử dụng. Trong trường hợp này, bất kỳ thẻ `<app-hello-world></app-hello-world>` nào xuất hiện trong template đều được compiled bằng HelloWorldComponent class và nhận bất kỳ chức năng đính kèm nào.

### Adding a template with `templateUrl`
Trong component, chúng ta có chỉ định `templateUrl` là `./hello-world.component.html`. Điều này có nghĩa là chúng ta sẽ load template từ file `hello-world.component.html` trong cùng một directory với component. Hãy xem file dưới đây:<br>
**src/app/hello-world/hello-world.component.html**
```
<p>
  hello-world works!
</p>
```
Ở đây, chúng ta đã định nghĩa một thẻ `p` với một text cơ bản. Khi Angular load component này, nó sẽ đọc từ file này và dùng nó như là một template của component.

### Adding a template
Chúng ta có thể định nghĩa template theo 2 cách, hoặc là dùng `template` key trong `@Component` hoặc là chỉ ra `templateUrl`.
Dưới đây, chúng ta sẽ thêm `template` key vào `@Component`:<br>
```
@Component({
selector: 'app-hello-world' 
template:  `
<p>
hello-world works inline!
</p>
`
})
```

 Ở đây chúng ta đang định nghĩa một chuỗi ký tự của template dùng dấu backtick (` ... `). Đây là một tính năng mới và rất tuyệt vời của ES6 cho phép chúng ta viết chuỗi ký tự trên nhiều dòng. Nó cho phép chúng ta dễ dàng đặt `template` trong file này. <br>
 
>  Câu hỏi đặt ra ở đây là, có nên viết trực tiếp template trong file code này không? Câu trả lời là: tùy vào từng trường hợp. Từ trước tới nay, người ta vẫn khuyên rằng nên viết code và template tách biệt nhau. Điều này có thể dễ dàng đối với một số team, tuy nhiên đối với một số dự án, nó sẽ phát sinh thêm nhiều nguồn lực vì phải chuyển đổi giữa rất nhiều file. 
>  
>  Đối với quan điểm cá nhân của tôi, nếu template ngắn hơn một page, thì tôi thích viết template và code cùng với nhau (nghĩa là, viết trong cùng một file `.ts`). Khi cả code logic và view được viết cùng nhau, sẽ rất dễ hiểu sự tương tác giữa chúng. 
>  
>  Hạn chế lớn nhất của việc viết lẫn giữa code và view là rất nhiều editor không hỗ trợ hiển thị format code template trong file `.ts`. Hy vọng, tương lại sẽ có nhiều editor hỗ trợ format code html trong template. 
>  

### Adding CSS Styles with styleUrls
Chú ý  key `styleUrls` <br>
`styleUrls: ['./hello-world.component.css']`
Điều này có nghĩa là, chúng ta sẽ sử dụng CSS trong file `hello-world.component.css` cho component này. Angular sử dụng một khái niệm gọi là  “style-encapsulation” , điều này có nghĩa là styles được chỉ định cho một component cụ thể thì *chỉ ứng dụng cho component đó.* . Chúng ta sẽ nói sâu hơn về vấn đề này trong phần sau.
<br> Hiện tại, chúng ta không sử dụng bất kỳ component-local styles nào, do vậy bạn có thể để file đó nguyên hiện trạng như vậy.<br>
> Bạn có thể nhận thấy rằng cái key này khác với cái `template`, cái mà chấp nhận một mảng các argument. Điều này là do chúng ta có thể load nhiều stylesheets cho một single component
>

### Loading Our Component
Chúng ta đã có component đầu tiên, vây làm sao để load nó vào page của chúng ta?<br>
Khi truy cập lại application trong trình duyệt, chúng ta không thấy có gì thay đổi cả. Lý do là vì chúng ta đã tạo component đó, nhưng chưa sử dụng nó. <br>
Do vậy sau đây, chúng ta sẽ thêm component tag vào template mà đã được render. Mở file: `src/app/app.component.html`<br>
Hãy nhớ rằng chúng ta đã config `HelloWorldComponent` với selector là `app-hello-world`, cho nên chúng ta có thể dùng thẻ `<app-hello-world></app-hello-world>` trong template. Nào giờ thì hãy add tag  ` <app-hello-world>` vào file `app.component.html`. <br>
```
<h1>
  {{title}}
  <app-hello-world></app-hello-world>
</h1>
```

Sau khi refresh lại trình duyệt, nó sẽ trông như thế này:
![](https://images.viblo.asia/78bffe57-0c95-465f-bd0d-b18ff9d61979.png)

## Adding Data to the Component

Hiện tại, component của chúng ta đang render ra một static template, do vậy component đó không thú vị lắm. <br>
Hãy tưởng tượng là chúng ta có một app show ra list users với tên của họ. Trước khi render ra cả list uers đó, chúng ra sẽ render ra một user trước. Nào, giờ hãy tạo ra một component mới để show ra tên của user. <br>
Chúng ta sử dụng lệnh `ng generate` để tạo ra một component mới: <br>
`ng generate component user-item` <br>
Hãy nhớ rằng, để xem được component chúng ta vừa tạo, thì cần add nó vào template . Hãy thêm tag `app-user-item` vào file  `app.component.html` theo như dưới đây:<br>
```
<h1>
  {{title}}
  <app-hello-world></app-hello-world>

  <app-user-item></app-user-item>
</h1>
```
Sau refresh lại page, bạn sẽ nhìn thấy text `user-item works!` xuất hiện ở page. <br>
Và sau đây, chúng ta sẽ cho `UserItemComponent`hiển thị tên của một user cụ thể. Giờ sẽ tạo ra một `property` mới là `name`. Khi có property `name`, chúng ta có thể tái sử dụng component này cho nhiều user khác nhau. (giữ nguyên logic và style).
<br>Chúng ta sẽ tạo biến local `name` vào `UserItemComponent` như ở dưới đây:<br>
**src/app/user-item/user-item.component.ts**
```
export class UserItemComponent implements OnInit {
  name: string; // added name property
  
  constructor() {
    this.name = 'Felipe'; // set the name
  }

  ngOnInit() {
  }
}
```
Lưu ý, chúng ta vừa thay đổi 2 thứ: <br>
**1. `name` Property**
<br> Trong Class UserItemComponent, chúng ta đã add một `property` mới. Đây là syntax mới so với ES5 JavaScript. Khi chúng ta viết `name: string` thì có nghĩa là chúng ta đang khai báo property `name` có kiểu là `string `. <br>
Bằng cách setting biến này thành `string`, trình biên dịch sẽ đảm bảo biến `name` là một chuỗi, và sẽ ném ra error nếu chúng ta assign cho nó một giá trị `number ` chẳng hạn. Cú pháp này cũng là cách TypeScript định nghĩa các instance properties. Bằng cách đặt `name: string` như thế này, chúng ta đang cung cấp cho UserItemComponent 1 property `name`.

**2. Constructor**
<br> Trong class `UserItemComponent` chúng ta đã định nghĩa một `constructor`, đây là một function được gọi khi chúng ta tạo instance mới của class. Trong `constructor` chúng ta có thể gán giá trị cho `name` property bằng cách viết `this.name`. <br>Cụ thể là khi chúng ta viết: <br>
**src/app/user-item/user-item.component.ts**
```
  constructor() {
    this.name = 'Felipe'; // set the name
  }
```
Chúng ta đang nói rằng bất cứ khi nào một UserItemComponent mới được tạo, thì hãy set giá trị của `name` thành 'Felipe'.

### Rendering The Template
Khi chúng ta có một property trong component, chúng ta có thể hiển thị giá trị đó trong template bằng cách dùng 2 dấu ngoặc nhọn {{ }}. <br>
Ví dụ chúng ta viết như sau:<br>
**src/app/user-item/user-item.component.html**
```
<p>
  Hello {{name}}
</p>
```
Chú ý rằng, chúng ta đã vừa thêm một cú pháp mới đó là  {{name}}. Dấu ngoặc này được gọi là `template tags` (hay đôi khi được gọi là `mustache tags`). <br>
Bất cứ thứ gì nằm trong `template tags` sẽ được mở rộng như một biểu thức. Ở đây, `template` được liên kết với Component cho nên biến `name` sẽ được mở rộng thành giá trị của `this.name`, ví dụ  'Felipe'.

### Try It Out
Sau khi thực hiện những thay đổi trên, chúng ta reload lại page, page sẽ hiển thị là `Hello Felipe`
![](https://images.viblo.asia/bcc38d1b-777d-4e21-9719-7c8f18b1a9bb.png)






<br><br><br>			
*Hết. Mời các bạn tham khảo tiếp ở các bài viết lần tới*			
			
*Nguồn:  https://www.ng-book.com/2/*