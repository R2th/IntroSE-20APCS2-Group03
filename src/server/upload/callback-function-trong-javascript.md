Trong bài viết hôm nay mình và các bạn sẽ cùng nhau tìm hiểu về hàm callback trong Javascript.

 ```In JavaScript, almost "everything" is an object```
 
  Trong Javascript một hàm cũng chính là 1 object, bởi thế hàm sẽ mang nhiều tính chất giống các kiểu dữ liệu thông thường khác như Number, String, Array, … 
  
  Do vậy chúng ta có thể thực hiện những việc như: lưu trữ hàm trong 1 biến,  **truyền hàm vào hàm khác như 1 tham số**,  khai báo 1 hàm bên trong 1 hàm, và return hàm như 1 giá trị trả về.
  
  Việc truyền 1 hàm **a** vào trong 1 hàm **b** nào đó,  thì hàm **a** được gọi là **callback**, bản thân từ callback cũng cho chúng ta hiểu nôm na là được gọi và thực thi sau.
  
  Hàm **b** được gọi là higher-order function.
  
  Callback được sử dụng rất nhiều trong javascript, đối với một số bạn mới học hoặc chỉ sử dụng Jquery để thao tác sử lý trên DOM, tuy các bạn có thể không để ý callback là gì, nhưng chắc chắn sử dụng nó thường xuyên. Trong Jquery sử dụng rất nhiều callback
  ```
  $("#button").click(function(){
      alert('vào')
  })
  ```
  `function(){alert('vào')}` chính là một callback
 # Khái niệm Callback và Higher-order function
* **Callback function** : là hàm được truyền vào một hàm **cha** khác như một tham số đầu vào, sau đó sẽ được gọi kích hoạt bên trong hàm **cha** này.
* **Higher-order  function**: là hàm có hoạt động dựa trên 1 hàm khác, tức là: nó có thể nhận 1 hàm làm tham số đầu vào(hàm **cha** trong khái niệm callback function chính là một higher-order  function), hoặc sẽ return ra 1 hàm khác. Một trong 2 điều kiện đó xảy ra thì được gọi là hàm higher-order.

Chúng ta cùng xem xét các minh hoạ sau đây để dễ hiểu hơn nhé.
```
function alertCallback() {
    alert('i am calback')
}
function logAndAlert(a) {
    console.log('vào');
    a();
}
logAndAlert(alertCallback);
```
Ta thấy, hàm `logAndAlert()` có nhận 1 tham số, khi chạy ta truyền tham số là hàm `alertCallback`.

Như vậy hàm `logAndAlert()` được gọi là hàm higher-order.

Ngoài ra hàm `alertCallback()` được truyền vào như là 1 tham số, do đó ta gọi hàm `alertCallback()` hoặc tham số a là hàm callback.

Chạy thử đoạn code trên sẽ cho kết quả như sau:
![](https://images.viblo.asia/fa3df324-3d99-42ba-a6f7-617f25593695.png)
Một ví dụ nữa về higher-order
```
function bongDa() {
    return function(ketQua) {
        switch(ketQua) {
            case 0:
               alert('thua')
                break;
            case 1:
                alert('hòa')
                break;
            default:
                alert('thắng')
       }
    }
}

let ketQua = bongDa();
ketQua();
```
Hàm `bongDa()` cũng được coi là 1 higher-order function vì nó trả về một hàm khác.

# Callback thường xuất hiện ở đâu trong Javascript
Trong Js, nếu xét ở phía client, ngoài những đoạn code xử lí tuần tự thông thường, ta có 2 hoạt động tương đối khác biệt so với những ngôn ngữ server khác, đó là:

* **Lắng nghe event**: lắng nghe sự kiện click chuột, bấm phím, hover .....
* **Xử lí bất đồng bộ**: Đặc trưng nổi bật của JS là khả năng xử lí bất đồng bộ, có thể kể đến vài hoạt động như: gọi AJAX, đọc file dạng async, …
  
  Về phần code xử lí lắng nghe event, một đoạn code rất quen  thuộc của  jQuery, thì những callback function sẽ có dạng như thế này:
  ```
  $("li").click(function() {
       alert("li tag Clicked");
   });

  ```
  
 Ngoài ra, nếu bạn gọi AJAX, hoặc các xử lí bất đồng bộ tương tự như thế, bạn cũng sẽ sử dụng callback rất nhiều:
 
 ``` 
 function successCallback( jqXHR ) {
    // Do something if success
}
 
function errorCallback( jqXHR ) {
    // Do something if success
}
 
$.ajax({
    url: "http://fiddle.jshell.net/favicon.png",
    success: successCallback,
    error: errorCallback
});
 ```

# Hoạt động củaCallback

Chúng ta có thể truyền hàm callback vào tương tự như tham số bình thường, như cách chúng ta vẫn làm với các kiểu dữ liệu khác vậy.

Nghĩa là khi truyền một callback vào một hàm khác thì callback tuy nó là một hàm nhưng sẽ không có dấu "()" sau tên hàm.

Điều đó giúp cho hàm callback không được thực thi, mà chỉ được truyền vào như một tham số mà thôi.
```
function doSomething() {
    alert('vào');
}
function something(doCallback) {
    doCallback();
}
something(doSomething);
```
Trong ví dụ trên `doSomething` tuy là một hàm, nhưng khi được truyền vào hàm `something()` thì sẽ không có dấu "()" nữa, hàm `something()` muốn thực thi được `doSomething` thì chỉ cần thêm dấu "()" sau tên hàm là được.

# Vấn đề gặp phải khi sử dụng Callback
## Vấn đề với con trỏ "this"
Khi một hàm được kích hoạt, bản thân nó sẽ có một giá trị tham chiếu tới đối tượng vừa gọi nó, giá trị nó nằm ở con trỏ this.

Ta có thể truyền hàm callback đi bất kì đâu ta muốn, tức là đối tượng kích hoạt hàm callback này chính là hàm higher-order chứa nó.

Tuy nhiên, trong nhiều trường hợp khi thiết kế hàm callback, người dùng mong muốn con trỏ this của hàm callback là 1 đối tượng cụ thể nào khác chứ không phải là hàm higher-order.
```
var obj = {
    method: function() {
        console.log(this);
    }
};

var a = obj.method;
a(); // this là window
$('#button').click(obj.method); // this đã tham chiếu đến button chứ không phải window
``` 

Rất nhiều bug xảy ra khi ta không chủ động kiểm soát tốt context của hàm callback khi gọi, vì vậy hãy chú ý tới việc này mỗi khi có ý định sử dụng callback.

Các bạn có thể tìm hiểu thêm về hàm `bind`, `call`, `apply` và `arrow function` thì có thể hoàn toàn kiểm soát được contex của con trỏ this

## Callback hell
 Như ta đã biết, hàm callback được thực thi bên trong 1 hàm khác, nếu ta tiếp tục có hàm callback bên trong một callback khác thì thế nào? Vòng lặp vô tận “callback bên trong callback bên trong callback … ” sẽ có khả năng xảy ra. Thứ quái quỷ này được gọi là callback hell – địa ngục callback, ta sẽ rất hay gặp vấn đề này trong khi xử lí các lệnh bất đồng bộ, kiểu như:
```
p_client.open(function(err, p_client) {
   p_client.dropDatabase(function(err, done) {
      p_client.createCollection('test_custom_key', function(err, collection) {
         collection.insert({'a':1}, function(err, docs) {
            // ...
            // và nhiều callback nữa
         });
      });
   });
});
```

 Khi callback hell xuất hiện, logic xử lí của chương trình sẽ trở nên cực kì phức tạp và khó nắm bắt, khi có lỗi xảy ra ta rất khó để debug cũng như giải quyết.
 
 Bên cạnh đó, callback hell cũng làm cho tính thẩm mĩ của code giảm đi đáng kể, khó đọc, khó maintain.
 
 Các bạn có thể tìm hiểu thêm về promise và async/await để giải quyết vấn đề callback hell này nhé
 # Tham khảo
 http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/
 https://viblo.asia/p/undefined-gDVK2MGX5Lj
 https://kipalog.com/posts/Callback-function-va-Higher-order-function-trong-Javascript