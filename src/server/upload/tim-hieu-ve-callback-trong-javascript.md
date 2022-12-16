Tìm hiểu về callback của javascript.

# Callback là gì.

Định nghĩa đơn giản: callback là một function được thực thi sau khi một function khác thực thi xong.

Định nghĩa cụ thể hơn: trong javascript, function là một object. Vì vậy một function có thể nhận một function làm tham số, hoặc có thể được trả về bởi function khác. Function như trên gọi là higher-order fucntion (hàm có thứ tự ưu tiên cao hơn), function được truyền như tham số được gọi là callback function.

# Tại sao ta cần callback?

Nguyên nhân quan trọng đầu tiên là - javascript là ngôn ngữ hướng sự kiện. Nghĩ là thay cho việc chờ phản hồi rồi tiếp tục thực thi hàm thì javascript sẽ tiếp tục thực thi trong khi lắng nghe các sự kiện khác. Ví dụ

```
    function test1(){
      console.log(1);
    }
    function test2(){
      console.log(2);
    }
    test1();
    test2();
```

Sau khi đoạn code trên thực thi thì kết quả sẽ như sau:

```
    // 1
    // 2
```

Hàm test1() sẽ được thực thi trước và hàm test2() thức thi sau.

Tuy nhiên có một vấn đề xảy ra là khi hàm test1() chứa một vài dòng code không thể thực thi ngay lập tức, ví dụ như một request API, một fetch call bắt buộc ta phải chờ và đợi phản hồi. Để cụ thể hơn ta thêm vào hàm test1() một đoạn setTimeout trước khi console.log(1).


```
    function test1(){
      // Simulate a code delay
      setTimeout( function(){
        console.log(1);
      }, 500 );
    }
    function test2(){
      console.log(2);
    }
    test1();
    test2();
```
Như đoạn code trên ta sẽ delay console.log(1) đi 500ms và kết quả sẽ là:

```
    // 2
    // 1
```

Như ta thấy mặc dù hàm test1() được gọi trước như khi kết quả ta nhận được thì là của test2() trước. Điều này không có nghĩa javascript không thực hiện các hàm theo thứ tự ta mong muốn. Thay vào đó javascript sẽ không đợi hàm test1() trả về phản hồi mà thực hiện luôn test2().

Như vậy qua ví dụ trên ta thấy callback là cần thiết, và nó là một cách giúp một đoạn code không thực thi cho đến khi một đoạn code khác đã thực thi xong.

# Tạo một callback

Giả sử ta có một function

```
    function alertSomething(subject) {
      alert(`Alert some text here ${subject}`);
    }
```

Khi gọi hàm với tham số ta sẽ có popup alert hiện lên.

Giờ giả sử ta add thêm callback vào hàm trên, là tham số thứ 2 của hàm trên.

```
    function alertSomething(subject, callback) {
      alert(`Alert some text here ${subject}`);
      callback();
    }
```

Như vậy khi gọi hàm alertSomething() ta có thể truyền vào tham số thứ 2 là một function (có thể là một hàm không tên).

```
    alertSomething(123, function () {
        alert('Finished alert');
    })
```

Kết quả là sau khi popup aler của hàm alertSomething() được gọi thì alert của callback sẽ được gọi.

Ở trên ta định nghĩa callback function ngay khi gọi higher-order function. Nhưng callback function có thể được định nghĩa là một hàm riêng. Khi gọi higher-order function ta sẽ truyền vào tên của callback function vào.

```
    function alertSomething(subject, callback) {
      alert(`Alert some text here ${subject}`);
      callback();
    }

    function alertSomething2(){
      alert('Finished my homework');
    }

    alertSomething(123, alertSomething2);
```

Kết quả của đoạn code trên sẽ tương tự nhưng được viết lại bằng một cách khác.

# Kết luận
Callback giúp ta xử lý các vấn đề liên quan tới các hàm cần chờ và đợi phần hồi từ một tác vụ nào đó (có thể là request api hoặc async). Callback sẽ giúp xử lý các giá trị trả về bởi function. Tuy nhiên ngày nay có nhiều phương pháp để thay thể cho callback như: có thể dùng promise hoặc async function.
# Tài liệu tham khảo
1) https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced