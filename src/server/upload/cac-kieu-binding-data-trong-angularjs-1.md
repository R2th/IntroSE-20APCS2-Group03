Trong AngularJS, khi chúng ta define một component ( hoặc 1 directive), chúng ta có thể tạo ra các biến scope từ các attribute. Có 4 dạng truyền như sau:
```
bindings: {
  attr1: '@',
  attr2: '<',
  attr3: '=',
  attr4: '&'
}
```
Việc có nhiều phuơng thức binding như vậy khá là phức tạp và khó khăn cho mỗi lần sử dụng. Vì vậy mục tiêu của bài viết này là cũng nhau liệt kê, phân tích từng loại binding, và tìm ra điểm khác nhau giữa chúng.

Chúng ta sẽ lần lượt tìm hiều các mục sau:
1. Cách để pass string với '@'
2. Cách chuyền biểu thức động( hoặc variable) với '<' và '='
3. Cách bắt ouput với '&'
4. Cách để  thực hiện tất cả điểu trên mà không cần dùng bất kì 1 trong 4 kí tự kia :)


### Pass string với '@'
'@' là thứ được cho là đơn giản nhất. Nó thuần thúy là truyền 1 chuỗi string cho component.
```
app.component("readingstring", {
  bindings: { text: '@' },
  template: '<p>text: <strong>{{$ctrl.text}}</strong></p>'
});
```
Và Chúng ta sẽ render ra như sau:
```
<readingstring text="hello"></readingstring>
```
Kết quả nhận được từ component:

text: **hello**

Việc sử dụng '@' tạo ra 1 biến bên trong component với giá trị là nội dung của chuỗi string bên ngoài. Chúng ta có thể sử dụng nó khi cấu hình ban đầu của component.

### Cách chuyền biểu thức động( hoặc variable) với '<' và '='

Với '<' và '=' thay vì việc chúng ta chỉ có thể truyền 1 chuỗi string như '@', chúng ta có thể truyền value của một biến hoặc kết quả của một function.

** chú ý: Nhược điểm của '=' là tạo ra một rằng buộc dữ liệu 2 chiều( two-way data bindings sẽ được phân tích phía bên dưới) nên biểu thức chúng ta truyền vào component bắt buộc phải là một biến)

Ví dụ:
```
app.component("dynamicinput",{
  bindings: { in: '=' },
  template: '<p>dynamic input: <strong>{{$ctrl.in}}</strong></p>'
});
```
```
<dynamicinput in="outervariable"></dynamicinput>
```
Khi đó `$ctrl.in` và `outervariable` sẽ có 1 rằng buộc giá trị, có nghĩa là khi 1 cái thay đổi thì cái còn lại cũng thay đổi theo.

Từ angular 1.5, có thể sử dụng '<'. Với '<', chúng ta chỉ có rằng buộc 1 chiều. Có nghĩa là việc thay đổi value ở trong component sẽ không ảnh hưởng đến biến ở ngoài component. Chính vì thế, chúng ta có thể chuyền vào kết quả của 1 function như sau:
```
<dynamicinput in="calculateSomething()"></dynamicinput>
```
### Cách bắt ouput với '&'
Với '&' nó sẽ diễn giải đoạn string như một câu lênh và kết thúc trong 1 function, hiểu đơn giản là sử dụng 1 chuỗi string như 1 function được định nghĩa
```
Outer value: {{count}}
<output out="count = count + amount"></output>
```
```
app.component("output",{
  bindings: { out: '&' },
  template: `
    <button ng-click="$ctrl.out({amount: 1})">buy one</button>
    <button ng-click="$ctrl.out({amount: 5})">buy many</button> `
});
```
Sử dụng '&' khá khó hiểu và phức tạp. Ta sẽ sử dụng '=' thay thế trong trường hợp này xem sao:
```
Outer value: {{count}}
<output out="count"></output>
```

```
app.component("output",{
  bindings: { out: '=' },
  template: `<div>
    <button ng-click="$ctrl.out = $ctrl.out + 1;">buy one</button>
    <button ng-click="$ctrl.out = $ctrl.out + 5;">buy many</button>
  </div>`
});
```
Nhưng với cách dùng này lại có vấn đề không hợp lí:

 Chúng ta chỉ cần one-way nhưng lại sử dụng two-way ở đây

Có 1 phuơng án khá thú vị là sử dungj '<' để tạo ra ouput với 1 callback:

Create function callback in controller:
```
$scope.callback = function(amount){
  $scope.count += amount;
}
```
Pass nó vào trong component
```
<output out="callback"></output>
```
Và component chỉ việc sur dụng function đó:
```

app.component("output",{
  bindings: { out: '<' },
  template: `
    <button ng-click="$ctrl.out(1)">buy one</button>
    <button ng-click="$ctrl.out(5)">buy many</button>`
});
```
Trông có vẻ rất là magic đúng không :)

Theo tôi, tác dụng chính của '&' chính là giúp chúng ta có thể  truyển vào component một define của function,thay vì việc chỉ có thể truyền giá trị. Ví dụ chúng ta có 2 component cha con: <parentComponent> và <childrenComponent>. Ở trong childernComponent, chúng ta muốn gọi đến 1 function được đinhj nghĩa ở trong parentComponent, vậy phải làm sao? Cách giải quyết ở đây chính là sử dụng '&' để truyền function từ component cha vào conponent con.
    
###  Cách để  thực hiện tất cả điểu trên mà không cần dùng bất kì 1 trong 4 kí tự
Sau khi tìm hiểu nhưng 4 kí tự trên vẫn gây khó khăn?
hãy cũng nhau tìm những phuơng án mà không cần sử dụng chúng nữa
Tại component, chung ta có thể pass value thông qua trực tiếp serive `$element`:
```
<readingstring text="hello"></readingstring>
    
```
```
app.component("readingstring", {
  controller: function($element){
    this.text = $element.attr("text");
  },
  template: '<p>text: <strong>{{$ctrl.text}}</strong></p>'
});
```
Hoặc thông qua `attrs` của `link` trong directive:

```
app.directive("readingstring", function(){
  return {
    restrict: 'E',
    scope: {},
    link: function(scope,elem,attrs){
      scope.text = attrs.text;
    },
    template: '<p>text: <strong>{{text}}</strong></p>'
  };
});
```

## **Và đây là phần tổng kết tất cả**
![](https://images.viblo.asia/bd82ab9e-8dae-45be-bc23-c4f4655c7ba8.png)

Thân ái và quyết thắng!

(Link tham khảo:
http://blog.krawaller.se/posts/dissecting-bindings-in-angularjs/)