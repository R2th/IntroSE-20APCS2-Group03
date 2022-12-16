# Lời mở đầu
Khi xây dựng một ứng dụng Angular, một trong những câu hỏi thường gặp nhất mà chúng ta phải đối mặt ngay từ đầu là: làm thế nào để chúng ta cấu trúc ứng dụng của mình?

Cần trả lời được một số câu hỏi như:

* Có những loại Component nào? 
* Các Component nên tương tác như thế nào? 
* Nên inject service vào Component nào? 
* Làm cách nào để làm cho các Component có thể sử dụng lại trên các View?

Để trả lời được thì có thể chia Components thành 2 loại như sau
* Smart Components:  Đôi khi được biết đến như là Application-level Components, Container Components hoặc Controller Components trong kiến trúc của Angular
* Presentational Components: Đôi khi được gọi là Pure Components hoặc Dumb Components trong kiến trúc Angular

Vậy hãy cùng tìm hiểu xem 2 loại Component này có gì khác nhau nhé!

# 1. Đặt vấn đề so sánh
**Tạo một component đơn giản không thuộc 2 loại component kia. Component này sẽ hiển thị một Table danh sách Lessons**
```js
@Component({
  selector: 'app-home',
  template: `
    <h2>All Lessons</h2>
    <h4>Total Lessons: {{lessons?.length}}</h4>
    <div class="lessons-list-container v-h-center-block-parent">
        <table class="table lessons-list card card-strong">
            <tbody>
            <tr *ngFor="let lesson of lessons" (click)="selectLesson(lesson)">
                <td class="lesson-title"> {{lesson.description}} </td>
                <td class="duration">
                    <i class="md-icon duration-icon">access_time</i>
                    <span>{{lesson.duration}}</span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    lessons: Lesson[];

  constructor(private lessonsService: LessonsService) {
  }

  ngOnInit() {
      this.lessonsService.findAllLessons()
          .do(console.log)
          .subscribe(
              lessons => this.allLessons = lessons
          );
  }

  selectLesson(lesson) {
    ...
  }

}
```

* Dễ dàng nhận thấy kích thước file Component này đang tăng lên khi có thêm nhiều hơn các chức năng, số lượng line code tăng lên, các hàm xử lý cũng được viết thêm nhiều hơn.
* Trong trường hợp muốn sử dụng Component này sử dụng ở một phần khác chả hạn như hiển thị danh sách các bài học của Lessons khác, nên tính tái sử dụng của Components cần được lưu ý.

# 2. Smart Components
Viết lại dưới dạng Smart Components như sau

```js
import { Component, OnInit } from '@angular/core';
import {LessonsService} from "../shared/model/lessons.service";
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'app-home',
  template: `
      <h2>All Lessons</h2>
      <h4>Total Lessons: {{lessons?.length}}</h4>
      <div class="lessons-list-container v-h-center-block-parent">
          <lessons-list [lessons]="lessons" (lesson)="selectLesson($event)"></lessons-list>
      </div>
`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    lessons: Lesson[];

  constructor(private lessonsService: LessonsService) {
  }

  ngOnInit() {
     ...
  }

  selectLesson(lesson) {
    ...
  }

}
```

*  Smart Component đã thay thế phần danh sách các màn hình của trang Home bằng các Lessons Component được import vào. Bây giờ, Home Component sẽ lấy danh sách các bài học tại Lessons Service.
*  Component này sẽ chứa logic xử lý chức năng của phần này, gần giống với Home Component ban đầu
*  Sẽ rất khó để sử dụng Component này trong một ứng dụng khác.
*  Ngay cả khi chuyển data sang bộ giải quyết dữ liệu của router, component ít nhất vẫn phải có service ActivatedRoute được inject vào.
*  Smart Component không nhất thiết phải là router component cấp cao nhất. Có thể có các component khác cũng được inject service như LessonSelectedService và không nhất thiết chỉ lấy dữ liệu từ @Input()

# 3. Presentational Components
Những gì chúng ta sẽ muốn làm trong tình huống này là trích xuất phần bảng của màn hình thành một thành phần riêng biệt, hãy gọi nó là LessonsListComponent:

```js
import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'lessons-list',
  template: `
      <table class="table lessons-list card card-strong">
          <tbody>
          <tr *ngFor="let lesson of lessons" (click)="selectLesson(lesson)">
              <td class="lesson-title"> {{lesson.description}} </td>
              <td class="duration">
                  <i class="md-icon duration-icon">access_time</i>
                  <span>{{lesson.duration}}</span>
              </td>
          </tr>
          </tbody>
      </table>  
  `,
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent {

  @Input()
  lessons: Lesson[];

  @Output('lesson')
  lessonEmitter = new EventEmitter<Lesson>();

    selectLesson(lesson:Lesson) {
        this.lessonEmitter.emit(lesson);
    }

}
```

* Điểm khác so với Component cũ là nó sẽ không inject Lessons Service vào. Thay vào đó sẽ nhận được các lesson từ property input là biến @Input. 
* Presentational Component sẽ không quan tâm đên việc xử lý dữ liệu, nó sẽ chú trọng vào xây dựng giao diện cho ứng dụng, còn xử lý logic nó sẽ không tham gia vào mà chỉ nhận dữ liệu từ các Component hay Service khác thông qua model (One-way-binding)

# 4. Kết hợp Smart Component và Presentational Component
* Ở ví dụ trên, khi kết hợp thì Smart Component đưa dữ liệu vào Presentational Component qua @Input và nhận bất kỳ action nào mà Presentational Component có thể active thông qua @Output.
* Sử dụng @Output Presentational Component vẫn được tách biệt khỏi Smart Component thông qua giao diện được xác định rõ ràng:
    * Presentational Component có danh sách lesson gắn vào một event, nhưng không biết event là gì hoặc sẽ làm gì để đáp ứng với event
    * Smart Component trên màn hình chính đăng ký vào cuastom event của lesson và tác động với event đó, nhưng nó không biết điều gì đã active event. Ví dụ:  Người dùng đã nhấp đúp vào danh sách Lesson hay người dùng đã nhấp vào View Button? Điều này cho thấy sự rõ ràng hơn của các Smart Component
* Việc xây dựng ứng dụng của trên đơn giản như tạo ra tất cả các Smart Component cấp cao nhất và xây dựng chúng bằng cách sử dụng local tree các Presentational Component.
* Nhưng vấn đề là đôi khi nó không đơn giản vì các custom event như Lesson không bubble up. Vì vậy, nếu ví dụ có một deep tree các component và muốn có nhiều level component ở trên để biết về event.


**Cảm ơn các bạn đã theo dõi đến đây. Xin chào và hẹn gặp lại ^^!**

Link tham khảo: https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/