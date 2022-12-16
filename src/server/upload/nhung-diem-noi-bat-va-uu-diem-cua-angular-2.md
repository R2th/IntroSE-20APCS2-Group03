Em xin chia sẻ về một số điểm nổi bật và ưu điểm về Angular2 mà em biết:

Với sự nổi lên của React do Facebook phát hành, Angular cũng chuyển mình thay đổi với một phiên bản mới hoàn toàn kèm với nhiều sự thay đổi cũng như những tích hợp mới để trở nên mạnh mẽ hơn nữa với lời hứa của Google:

Hiệu năng cao hơn.
Dễ sử dụng hơn.
Tương thích với ES6.
Dùng theo tiêu chuẩn web (web standards).
Bài viết này sẽ là điểm của phiên bản Angular 2.
# Component-Based
Tạm biệt Controller và $scope, những thứ quen thuộc trong Angular 1. Angular 2 hoàn toàn là các Component và Directive. Mỗi Component là các chỉ dẫn tới các template tương ứng. Để hình dung rõ hơn có thể nhìn đoạn code ví dụ, ta sẽ thấy component này sẽ gọi trong file HTML với tag <angularComponent> và thực hiện các logic bên trong class AngularComponent.

```
/// <reference path="typings/tsd.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';

// Annotation section
@Component({
    selector: 'angularComponent'
})

@View({
    templateUrl: 'component.html'
})

class AngularComponent {
    constructor() {
        // Do something...
    }
}

bootstrap(AngularComponent);
```
**Lưu ý:** tất cả các component được sử dụng phải được khai báo trong bootstrap.
# Directives
Directive trong Angular 2 cũng đã được đơn giản hoá đáng kể, chỉ cần gõ @Directive là một directive đã được khai báo. Bên dưới là một ví dụ về khai báo một Directive, thậm chí trong block ‘host listeners’, có thể thấy chúng ta có thể liên kết các stardard funtion với mục đích riêng.
```
/// <reference path="typings/tsd.d.ts" />
import {Directive} from 'angular2/angular2';

@Directive({
    selector: '[hover]',
    properties: ['text: hover'],
    hostListeners: {
        hostListeners: {
            'onmouseenter': 'onMouseEnter()',
            'onmouseleave': 'onMouseLeave()'
        }
    }
})

export class Hover {
    constructor() {
        console.debug("constructed");
    }

    set text(value: string) {
        console.debug(value);
    }
}
```
# Dependency Injection
Bao gồm 3 phần thực hiện:
* Injector, gồm các API dùng để inject các dependency và làm chúng hoạt động.
* Bindings, giúp định nghĩa các dependency dưới một tên biến để sử dụng.
* Cuối cùng, các dependency thực sẽ được khởi tạo và có thể được inject.
Một object có thể được truyền thông qua constructor nên ta chỉ cần sử dụng injector view để thực hiện việc inject đơn giản.
```
// Annotation section
@Component({
    selector: 'my-app',
    viewInjector: [MessageList, httpInjectables]
    // Something else ...
})
```
# TypeScript và lợi ích của ECMAScript 6
EcmaScript 6 ta có các class, điều này thực sự rất ý nghĩa.
```
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```
Ở các phiên bản ES trước, mọi thứ đều phải định nghĩa qua prototype. Giờ ta có thể sử dụng Class giống như các ngôn ngữ hướng đối tượng khác một cách rất dễ dàng. Và TypeScript chính là một phần mở rộng của ES6, thực tế cho thấy:

**TypeScript = ES6 + Types + Annotations**

TypeScript bắt nguồn từ Microsoft nên được hỗ trợ rất nhiều và nó cũng nổi tiếng trong cộng đồng .NET Developers. TypeScript tuy viết dưới khuôn mẫu hướng đối tượng gồm class, kế thừa,… đầy đủ những có thể được biên dịch ra Javascript, vì vậy tính tương thích rất cao. Với việc sử dụng TypeScript nên Angular 2 đồng thời cũng hoàn toàn có thể sử dụng các thư viện dành cho TypeScript một cách dễ dàng.

Tất cả điều đó đã giúp việc hiểu những logic code cực kỳ nhanh và hiệu quả nhờ sự quen thuộc.
# Generics
Đây là một khái niệm khá nổi tiếng và có phần hơi khó nắm bắt trong C#, tuy nhiên khi hiểu thì việc sử dụng nó rất hiệu quả, và TypeScript đã đưa generics lên front-end. Ví dụ bên dưới minh hoạ cho việc ẩn giấu của generics khi cùng một lớp Person nhưng dường như việc chuẩn bị thức ăn sẽ cho ra kết quả khác nhau.
```
export class Person {
    prepareFood() {
        return new Food("what to prepare");
    }
}

export class Food {
    typeOfFood: string;

    constructor(typeOfFood: string) {
        this.typeOfFood = typeOfFood;
    }
}

export class Female extends Person {
    prepareFood() {
        return new Food("yummie");
    }
}

export class Male extends Person {
    prepareFood() {
        return new Food("raw");
    }
}
```
Trong Angular, mọi class hoặc directive được sử dụng đều phải được import vào component trước khi chúng thực sự được dùng. Ví dụ bên dưới ta có thể thấy NgFor là directive đã được import để sử dụng cho tất cả các generic (được tao ra từ function prepareFood).

```
/// <reference path="typings/tsd.d.ts" />
import {Component, View, NgFor, boostrap} from 'angular2/angular2';
import {Person, Male, Female, Food} from 'person';

@Component({
    selector: 'food-preparation'
})

@View({
    templateUrl: 'food.html',
    directives: [NgFor]
})

class FoodPreparationComponent {
    foods: Array<string>;

    constructor() {
        this.foods = [];
        this.foods.push(prepareFood(new Male()));
        this.foods.push(prepareFood(new Female()));
    }
}

function prepareFood<T extends Person>(cooker: T): string {
    return cooker.prepareFood().typeOfFood;
}

boostrap(FoodPreparationComponent);
```
Cuối cùng ta chỉ việc show ra HTML, trong đó kiểu T sẽ tự nhận biệt đối tượng và function tương ứng cần thực hiện.
```
<p>Dishes:</p>
<ul>
    <li *ng-for="#food of foods">
        {{ food }}
    </li>
</ul>
```
# Lambdas với TypeScript
Một kiểu khai báo thú vị nữa tiếp tục được đưa vào sử dụng với TypeScript, có thể hiểu Lambdas expression sẽ định nghĩa một anonymous function, một cách khai báo đẹp và nhanh gọn. Nếu bạn đã sử dụng C# hoặc Scala thì sẽ cảm nhận rõ hơn sự thú vị của nó.
```
pushMessage(...messageStrings: Array<String>) {
    this.messages.push(
        ...messageStrings.map((m) => {
            return new Message(m, new Date(), "Sender name");
        })
    );
}
```
# Ưu điểm
### 1. Angular2 sẽ dễ dàng hơn:
Angular2 được phát triển trên nền tảng hiện đại hơn, nhiều tính năng, và dễ dàng cho người mới học hơn là Angular 1.x và cũng dễ dàng hơn cho các chiến binh lâu năm.

Với Angular 1, các nhà phát triển  đã biết về  sự khác nhau giữa Controllers, Services, Factories, Providers và các khái niệm khác có thể gây ra sự khó hiểu đặc biệt là các coder mới.

Angular 2 là một framework với sự sắp xếp hợp lý hơn cho phép lập trình viên tập trung vào việc tạo lên các class JavaScript đơn giản. Views và các controllers sẽ được thay thế bởi Components, thứ mà có thể mô tả là một sự tinh chế mới của directives. Ngay cả các lập trình viên có kinh nghiệm với Angular cũng không chắc là có thể biết tất cả những khả năng của directives. Angular 2 component đã tăng khả năng đọc đáng kể, các API của chúng giảm đáng kể các biệt ngữ hơn là Angular 1.x directive.

### 2. TypeScript
Angular2 được viết với TypeScript, một superset của JavaScript, nó triển khai nhiều tính năng của ES2016 và các tính năng của TypeScript.

Bằng cách tập trung tạo nên một framework dễ dàng hơn trong việc xử lý, Angular2 cho phép hệ sinh thái phát triển phong phú hơn. Các lập trình viên có thể sử dụng các trình soạn thảo tinh vi hơn với các tính năng gợi ý code hay tự động hoàn thành code. Những tính năng này giúp giảm thời gian học Angular2. May mắn hơn nữa cho các nhà phát triển ES5 truyền thống rằng không nhất thiết phải viết ES6 hay TypeScript, các coder có thể vẫn viết JavaScript thuần mà không cần biên dịch.

### 3. Quen thuộc
Mặc dù được viết lại hoàn toàn, Angular2 vẫn giữ lại các khái niệm cốt lõi và các quy tắc của Angular1.x. Điều đó có nghĩa là các lập trình viên giỏi vói Angular1 sẽ dễ dàng  chuyển đổi sang Angular2 hơn là các thư viện khác như ReactJS....

### 4. Hiệu năng và tương thích mobile
Angular2 được thiết kế cho mobile từ ban đầu. Bỏ qua một bên các vấn đề về sức mạnh xử lý, các thiết bị di động có các tính năng khác và sự giới hạn đó phân biệt chúng với máy tính truyền thống. Giao diện chạm, màn hình nhỏ, phần cứng đã được tính toán trong Angular2. Máy tính để bàn cũng sẽ được cải tiến về hiệu suất và khả năng đáp ứng.

Angular2 giống React và các framework hiện đại khác, có thể tăng hiệu năng bằng cách render ra HTML trên server hoặc ngay cả trên browser. Phụ thuộc vào thiết kế cấu trúc giúp cho trải nghiệm người dùng tốt hơn.

Yêu cầu về hiệu năng không bao giờ là dừng lại với việc tiền xử lý. Angular 2 có khả năng tích hợp với mobile bằng cách tích hợp với NativeScript, một thư viện mã nguồn mở là cậu nỗi giữa JavaScript và mobile. Bổ sung thêm, Ionic cũng đang được phát triển trên Angular2 cung cấp một cách khác giúp tăng hiệu quả của ứng dụng trên mobile.

### 5. Kiến trúc dự án và bảo trì
Phiên bản đầu tiên của Angular cung cấp cho các lập trình viên một thư viện mềm dẻo để phát triển ứng dụng. Đây là sự thay đổi đáng kể cho các lập trình viên web, và trong khi framework rất hữu ích thì nó là một bằng chứng cho sự linh hoạt đó. Qua thời gian, các best practice từ cộng đồng được tán thành rộng rãi.

Angular 1.x đã cố gắng làm việc xung quanh các hạn chế trên trình duyệt liên quan đến JavaScript. Điều này được giải quyết bằng cách cung cấp một hệ thống các module sử dụng cơ chế Dependency Injection. Điều này thật tuyệt tuy nhiên có một vài vấn đề.

Angular 2.x sử dụng hệ thống module ECMA Script 6 (ES6), và các công cụ đóng gói hiện đại như Webpack hoặc SystemJS. Module được tùy biến theo cách riêng của Angular để dễ dàng viết các Generic cho JS để cắm vào Angular. Hệ thống module mới giúp dễ dàng phát triển các dự án lớn hiệu quả hơn.

### 6. Tính năng mới
Một vài tính năng thú vị trên Angular2:
* Form Builder
* Change Detection
* Templating
* Routing
* Annotations
* Observables
* Shadow DOM

Tóm lại: trên đây là những điều mình đã tìm hiểu đc ở Angular2, phần tới chúng ta sẽ nghiên cứu kỹ hơn về những tính năng mới của Angular2 đã kể ở trên, cảm ơn mọi người.