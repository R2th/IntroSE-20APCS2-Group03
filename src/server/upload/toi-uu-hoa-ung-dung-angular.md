### Giới thiệu.
Một ứng dụng được phát triển ra nhằm giải quyết một số vấn để của con người, cung cấp cho người dùng nó những tính năng để tối ưu hóa được công việc. Nhưng để có thể cạnh tranh với thị trường phần mềm ngày nay thì **hiệu năng** lại đóng một vai trò rất quan trọng trong việc thành công của ứng dụng đó. Chính vì thế việc tối ưu hóa hệ thống là điều vô cùng cần thiết của một ứng dụng. 
Cụ thể như trong dự án của mình đang làm, khách hàng có đưa ra yêu cầu tối ưu hóa tốc độ của ứng dụng. Mọi người đã đưa ra nhiều phương án tối ưu từ BE đến FE. Thay vì truy vấn toàn bộ dữ liệu của một bản ghi thì chỉ chọn ra những giá trị cần thiết để sử dụng. Còn bên FE dự án sử dụng angular thì mọi người cũng phát hiện ra rằng một method được sử dụng ở view sẽ được gọi rất nhiều lần trước khi được hiển thị. Chính vì thế bài viết này sẽ đi tìm hiểu về  nguyên nhân tại sao nó xảy ra và phương án giải quyết vấn để này như thế nào nhé!

### 1. Thí nghiệm.
trước tiên hãy khởi tạo một ứng dụng angular.
sau đó, trong file app.component.ts ghi đè lại những method trong vòng đời (lifecycle hooks) của component.
```
src/app/app.component.html

import { OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  private var01: string = "default value";

  constructor(){}

  ngOnChanges (){
     console.log('OnChanges');
  }
  ngOnInit (){
     console.log('OnInit');
  }
  ngDoCheck (){
     console.log('DoCheck');
  }
  ngAfterContentInit(){
     console.log('After Content Init');
  }
  ngAfterContentChecked(){
     console.log('After content checked');
  }
  ngAfterViewInit(){
     console.log('After view init');
  }
  ngAfterViewChecked(){
     console.log('After view checked');
  }
  ngOnDestroy(){
     console.log('Trace on destroy');
  }
  sayHello() {
    console.log('Hello!');
    return "Hello!"
  }
}
```
tiếp theo là định nghĩa thêm phương thức **sayHello()** và sau đó thực hiện gọi nó trên view.

```
src/app/app.component.html

{{ sayHello() }}
```

mở console lên và quan sát kết quả:

```
app.component.ts:18 OnInit
app.component.ts:21 DoCheck
app.component.ts:24 After Content Init
app.component.ts:27 After content checked
app.component.ts:39 Hello!
app.component.ts:30 After view init
app.component.ts:33 After view checked
app.component.ts:39 Hello!
app.component.ts:21 DoCheck
app.component.ts:27 After content checked
app.component.ts:39 Hello!
app.component.ts:33 After view checked
app.component.ts:39 Hello!
client:52 [WDS] Live Reloading enabled.
```
Thật lạ! method **sayHello()** được gọi những 4 lần. vậy nguyên nhân do đâu dẫn tới việc gọi liên tục method như thế ??? Ta hay cùng đi tới phần tiếp theo để làm rõ vấn đề này nhé!

### 2. Nguyên nhân.
Ta tự hỏi, chuyện gì đang xảy ra vậy?  Để tìm hiểu sâu hơn về những gì thực sự đang xảy ra ở đây, các bạn nên đọc tài liệu chính thức của Angular 2 về vòng đời ([lifecycle hooks])
Mình cũng tổng quát nó như sau:
Sau khi khởi tạo một component / directive bằng cách gọi hàm constructor của nó, Angular gọi các phương thức hook theo trình tự sau tại các thời điểm cụ thể:
| **Hook** | 	**Mục đích & thời điểm** |
| -------- | -------- |
| ngOnChanges() | Thực thi khi Angular thiết lập các thuộc tính đầu vào ràng buộc dữ liệu. Được gọi trước ngOnInit() và bất cứ khi nào một hoặc nhiều thuộc tính đầu vào ràng buộc dữ liệu thay đổi. |
| ngOnInit() | Khởi tạo directive / component sau khi Angular hiển thị các thuộc tính ràng buộc dữ liệu và đặt các thuộc tính đầu vào của directive / component. Được gọi một lần, sau ngOnChanges() đầu tiên. |
| ngDoCheck() | Phát hiện và hành động theo những thay đổi mà Angular không thể hoặc sẽ không tự mình phát hiện. Được gọi trong mỗi lần chạy phát hiện thay đổi, ngay sau ngOnChanges() và ngOnInit(). |
| ngAfterContentInit() | Thự thi sau khi Angular thêm nội dung bên ngoài vào view của component / view mà directive được đưa vào. Được gọi một lần sau ngDoCheck() đầu tiên. |
| ngAfterContentChecked() | Thự thi sau khi Angular đã kiểm tra nội dung bên ngoài đã được đưa vào view của component. Được gọi sau ngAfterContentInit() và mọi ngDoCheck() tiếp theo. |
| ngAfterViewInit() | Thự thi sau khi Angular khởi tạo các view của component và các view con / view mà directive được đưa vào. Được gọi một lần sau ngAfterContentChecked() đầu tiên. |
| ngAfterViewChecked() | Thực thi sau khi Angular kiểm tra các view của component và các view con /view mà directive được đưa vào. Được gọi sau ngAfterViewInit() và mọi ngAfterContentChecked() tiếp theo. |
| ngOnDestroy() | Dọn dẹp ngay trước khi Angular phá hủy directive / component. Hủy đăng ký Observables và tách trình xử lý sự kiện để tránh rò rỉ bộ nhớ. Được gọi ngay trước khi Angular phá hủy directive / component. |

Về cơ bản, phương thức **sayHello()** sẽ được chạy trong **hook doCheck**. Cụ thể là các hook **afterContentChecked** và **afterViewChecked**. Sau khi chạy hook này những method được gọi trên view sẽ được gọi lại. Đó chính là lý do tại sao việc lặp phương thức xảy ra. Nói một cách dễ hiểu hơn những method được gọi trên view sẽ được thực thi lại trong mỗi **event** trên **view**.

### 3. Giải pháp.
Trước khi tìm giải pháp cho vấn đề này. Hãy tìm hiểu qua về **pipe**. 
Pipe có 2 loại là **pure pipe** và **impure pipe.**

| **Hook** | 	**Mục đích & thời điểm** |
| -------- | -------- |
| Pure pipe| chỉ thực hiện thay đổi khi đầu vào thay đổi. (các immutable objects, primitive type: string, number, boolean, etc): lowercase, uppercase, date, etc. |
| Impure pipe | thực hiện thay đổi mỗi chu kỳ của Change detection (chu kỳ kiểm tra xem các state trong ứng dụng có thay đổi không để update lên view): async, json, etc. |

Nhìn vào cách mà pipe hoạt động, Chúng ta có thể mượn tính chất của pure pipe để áp dụng vào giải quyết vấn đề hiện tại. Cụ thể là ta sẽ tìm cách để thay thế những method này bằng pure pipe thì vấn đề có thể sẽ được giải quyết. Không vòng vo hãy bắt tay vào làm thử và xem kết quả ra sao nhé.

Trước tiên thử với impure pipe: tạo ra một impure pipe có tên message

```
sr/app/message.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'message', pure:false})
export class MessagePipe implements PipeTransform {
  transform(msg:string):string {
    console.log(msg);
    return msg;
  }
}
```

thực hiện gọi nó trên view
```
src/app/app.component.html

{{ 'hello' | message }}
```

quan sát kết quả, không có gì thay đổi.
```
OnInit
app.component.ts:20 DoCheck
app.component.ts:23 After Content Init
app.component.ts:26 After content checked
message.pipe.ts:6 hello
app.component.ts:29 After view init
app.component.ts:32 After view checked
message.pipe.ts:6 hello
app.component.ts:20 DoCheck
app.component.ts:26 After content checked
message.pipe.ts:6 hello
app.component.ts:32 After view checked
message.pipe.ts:6 hello
client:52 [WDS] Live Reloading enabled.
```

Bây giờ thử với pure pipe: bằng cách thay đổi giá trị của pure: thành true.

```
sr/app/message.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'message', pure:true})
export class MessagePipe implements PipeTransform {
  transform(msg:string):string {
    console.log(msg);
    return msg;
  }
}
```

quan sát kết quả:
```
OnInit
app.component.ts:20 DoCheck
app.component.ts:23 After Content Init
app.component.ts:26 After content checked
message.pipe.ts:6 hello
app.component.ts:29 After view init
app.component.ts:32 After view checked
app.component.ts:20 DoCheck
app.component.ts:26 After content checked
app.component.ts:32 After view checked
client:52 [WDS] Live Reloading enabled.
```

Thật bất ngờ lúc này đoạn text 'hello' chỉ xuất hiện một lần. Tóm lại bằng cách vận dụng tính chất của pure pipe thì ta có giảm tại việc gọi method nhiều lần khi sử dụng nó trên view. Và tằng được hiệu năng hệ thống. Với những dự án lớn thì một cải thiện nhỏ có khi cũng mang lại cho ta những thay đổi lớn. ^^ Trên đây là những kiến thức mình tổng hợp được. Cảm ơn mọi người đã đọc.

### 4. Tài liệu tham khảo.
https://blog.appverse.io/why-it-is-a-bad-idea-to-use-methods-in-the-html-templates-with-angular-2-30d49f0d3b16
https://dzone.com/articles/why-we-shound-not-use-function-inside-angular-temp