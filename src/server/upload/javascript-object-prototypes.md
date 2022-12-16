# Lời mở đầu
Hello các bác, lại là em đây =]]. Dạo gần đây rảnh dỗi là lại ngồi "ôn lại kỷ niệm xưa" các bác ạ, đó là ngồi đọc Doc của Javascript kkkk. Đúng là đọc lại Doc thì với nhiều bác chắc là nhàm chán lắm, em cũng vậy =)) nhiều khi buồn ngủ kinh khủng. Nhưng đổi lại thì kết quả nhận được cũng không tồi mấy đâu nhé keke.

Nhiều khi làm trong dự án thì chỗ nào lấn cấn, quên hay thậm chí chưa biết là google cái ra luôn, tuy nhiên thì với những bác nào là Newbie thì chưa chắc đã nắm rõ được bản chất của giải pháp đó và tại sao lại làm như vậy. Mình chỉ coppy & paste thôi mà chưa hiểu là chưa đụ đâu nhé =]]. 

Sau khi đọc Doc thì em cũng củng cố lại một chút kiến thức về `Object Prototype`, khái niệm mà không ít bác khi bắt đầu tìm hiểu về Javascript đều thấy lúng túng. Hôm nay em xin chia sẻ một chút kiến thức mà mình biết, cũng như tìm hiểu được để các bác cùng tham khảo nhé. Bắt đầu nào!!!!!
# Prototype là gì? 
 Prototype nó là một khái niệm cơ bản và cốt lõi của Javascript, bất kì bác nào muốn nắm vững về Javascript đều phải hiển về khái niệm prototype. Trước khi có ES6 tức là từ ES5 trở về trước thì mọi sự kế thừa trong Javascript thì đều dựa vào prototpye. Có thể nói nôm na Prototype nó như một cái khuôn hay là cha của một object.
 
Trong Javascript thì hầu như toàn bộ các kiểu dữ liệu là object, Các kiểu string, số, boolean lần lượt là object dạng String, Number, Boolean. Mảng là object dạng Array, hàm là object dạng Function, cha của String là String.prototype, cha của Number là Number.prototype, của Array là Array.prototype.
 
 <br>
 Prototype bản thân nó là một đối tượng object trong Javascript được gọi là Object Prototype. Tất cả các object trong Javascript đề có một prototypr, và các object này kế thừa thuộc tính (properties) và phương thức (methods) từ prototype của mình. Như em đã nói từ ES5 trở về trước thì trong JavaScript, việc kế thừa được hiện thực thông qua prototype. Khi ta gọi property hoặc function của một object, JavaScript sẽ tìm trong chính object đó, nếu không có thì tìm lên cha của nó. Do đó, ta có thể gọi các hàm toUpperCase, trim trong String là do các hàm đó đã tồn tại trong String.prototype.
 
  <br>
  
  ![](https://images.viblo.asia/61d06a29-fbdd-4162-8837-e48471f6daba.png)
  
  <br>
  
  ![](https://images.viblo.asia/1a4d4a52-0a4a-44f2-8786-7ebac21d6417.png)
  
  <br>
  
 Ví dụ khi ta thêm một phương thức cho prototype thì những đối tượng kế thừa prototype cũng có thể sử dụng
 
 <br>
 
 ```
 var number = 2;
Number.prototype.doubleValue = function () {
  return this*2;
}

console.log(number.doubleValue());
 ```
 
 kết quả là console.log ra bằng 4.
  ![](https://images.viblo.asia/4d183f5b-5ab8-4974-a717-3518e5f20f5f.png)
  
  # Làm sao để khởi tạo Prototype?
Trong Js, bản thân 1 hàm (function) cũng được coi là 1 object, và function có một  thuộc tính prototype, bản thân thuộc tính prototype này mang giá trị là 1 object. (Chú ý: một instance object thì không có thuộc tính prototype)

<br>
Hàm khởi tạo đối tượng cũng được xem là 1 đối tượng prototype, do đó các đơn giản để tạo ra 1 đối tượng prototype là khai báo một hàm khởi tạo

```
function nguoi(_ten, _tuoi) {
  this.ten = _ten;
  this.tuoi = _tuoi;
  this.thongTin = function () {
    console.log('Toi la:' + this.ten + ', Toi '  + this.tuoi);
  }
}

var Duong = new nguoi('Tien Duong', '23');
Duong.thongTin();
```

Kết quả:

![](https://images.viblo.asia/410d7837-feba-4337-8bdf-3692b50e3f56.png)
# Prototype quan trọng như thế nào?

Từ các phiên bản ES5 trở về trước, Javascript không có khái niệm class, và do vậy mà nó không thể thực hiện việc kế thừa để mở rộng ứng dụng như các ngôn ngữ OOP khác. Tuy nhiên, prototype giúp chúng ta thực hiện kế thừa theo một cách gần tương tự như thế: Javascript thực hiện kế thừa theo cơ chế prototype-based. Nói nôm na, prototype có phần giống class, được sử dụng để hiện thực việc kế thừa (interitance) trong JavaScript.
# Kết luận
Vậy là em đã chia sẻ với các bác một chút kiến thức của mình về prototype. không biết cách diễn đạt, trình bày của em có dễ hiểu không? nếu chưa ổn lắm các bác có thể comment bên dưới để em cảu thiện trong các bài viết tới. hi vọng các bác sẽ có thể hiểu hơn về prototype sau bài viết này, trân thành cảm ơn các bác đã đọc bài. Giờ thì tạm biệt và hẹn gặp lại các bác =)). Peach!!!