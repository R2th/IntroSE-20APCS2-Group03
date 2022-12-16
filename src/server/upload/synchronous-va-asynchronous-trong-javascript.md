Trước khi vào tìm hiểu các vấn đề nâng cao như Promise, Class thì chúng ta sẽ tìm hiểu thế nào la Asynchronous và Synchronous. Đây là hai khái niệm mà đa số các lập trình viên mới vào nghề chưa hiểu được bản chất của nó nên dẫn tới xử lý tình huống bị sai.

Trong bài có sử dụng từ viết tắt:

Sync => Synchronous
Async => Asynchronous
Đầu tiên chúng ta sẽ tìm hiểu khái niệm về Asynchronous và Synchronous đã nhé.

## 1. Synchronous là gì?
Synchronous có nghĩa là xử lý đồng bộ, chương trình sẽ chạy theo từng bước và chỉ khi nào bước 1 thực hiện xong thì mới nhảy sang bước 2, khi nào chương trình này chạy xong mới nhảy qua chương trình khác. Đây là nguyên tắc cơ bản trong lập trình mà bạn đã được học đó là khi biên dịch các đoạn mã thì trình biên dịch sẽ biên dịch theo thứ tự từ trên xuống dưới, từ trái qua phải và chỉ khi nào biên dịch xong dòng thứ nhât mới nhảy sang dòng thứ hai, điều này sẽ sinh ra một trạng thái ta hay gọi là trạng thái chờ. Ví dụ trong quy trình sản xuất dây chuyền công nghiệp được coi là một hệ thống xử lý đồng bộ.

### Mặt tốt của Synchronous
Chương trình sẽ chạy theo đúng thứ tự và có nguyên tắc nên sẽ không mắc phải các lỗi về tiến trình không cần thiết. Không chỉ trong lập trình mà trong thực tế cũng vậy, một công ty đưa ra quy trình đồng bộ sẽ đảm bảo được chất lượng của sản phẩm, nếu bị lỗi thì sẽ biết ngay là lỗi tại quy trình nào và từ đó sẽ dễ dàng khắc phục.

### Mặt xấu của Synchronous
Chương trình chạy theo thứ tự đồng bộ nên sẽ sinh ra trạng thái chờ và là không cần thiết trong một số trường hợp, lúc này bộ nhớ sẽ dễ bị tràn vì phải lưu trữ các trạng thái chờ vô duyên đó.

Khi bạn viết một chương trình quản lý và trong đó có thao tác lưu, mỗi khi lưu bạn yêu cầu người dùng có muốn lưu hay không? Nếu muốn lưu thì click Yes, ngược lại click No. Trường hợp nay gây tai họa nếu người dùng vô tình chỉ click Lưu mà không chú ý đến câu hỏi mà hệ thống đưa ra nên ngồi nhâm nhi cafe, đột nhiên cúp điện thế là cứ tưởng đã lưu rồi :) Vậy quy trình xử lý nên đưa ra chức năng lưu tự động, nghĩa là thao tác lưu sẽ bỏ qua bước hỏi đáp kia đi, không nhất thiết phải chờ nó OK mới lưu.

## 2. Asynchronous là gì?
Ngược lại với Synchronous thì Asynchronous là xử lý bất động bộ, nghĩa là chương trình có thể nhảy đi bỏ qua một bước nào đó, vì vậy Asynchronous được ví như một chương trình hoạt động không chặt chẽ và không có quy trình nên việc quản lý rất khó khăn. Nếu một hàm A phải bắt buộc chạy trước hàm B thì với Asynchronous sẽ không thể đảm bảo nguyên tắc này luôn đúng.

### Mặt tốt của Asynchronous
Có thể xử lý nhiều công việc một lúc mà không cần phải chờ đợi nên tạo cảm giác thoải mái :) Ví dụ bạn đi ký một văn bản ở Xã, Phường thì nếu bạn có tiền bạn sẽ bỏ qua được một vài công đoạn phải không nào, lúc đó măt sẽ tươi rói và đương nhiên là anh nhân viên cũng tươi không kém :)

### Mặt xấu của Asynchronous
Nếu một chuong trình đòi hỏi phải có quy trình thì bạn không thể sử dụng Asynchronous được, điển hình là trong quy trình sản xuât một sản phẩm của các nhà máy công nghiệp không thể áp dụng kỹ thuật làm nhiều công việc một lúc thế này được. Còn về chương trình trong lập trình thì sao? Một thao tác thêm dữ liệu phải thông qua hai công đoạn là validate dữ liệu và thêm dữ liệu, nếu thao tác validate xảy ra sau thao tác thêm thì còn gì tệ hại hơn nữa :).

## 3. Ajax Asynchronous
Từ trước giờ mình có nhận một số câu hỏi như: Tại sao em gán thay đổi giá trị của biến vào action success mà nó không thấy thay đổi vậy anh? Teamviewer kiểm tra thì thấy bạn đã mắc phải lỗi "chưa hiểu về xử lý bất đồng bộ" :).

### Ajax Async
Theo khái niệm của Ajax là gì thì Ajax được viết tắt của các từ Asynchronous JavaScript and XML, rõ ràng từ Asynchronous đã nói lên Ajax là một kỹ thuật xử lý bất đồng bộ. Nhiều bạn lập trình viên khi viết ứng dụng Ajax mà quên mất rằng đây là một chương trình bất đồng bộ, tức là thao tác gửi Ajax và các đoạn code bên dưới sẽ được chạy song song.
```
// ĐOẠN 1
var message = 'Xin chào tấc cả các bạn!';
 
// ĐOẠN 2
$.ajax({
    url : "some-url",
    data : {}
    success : function(result){
        message = 'Giá trị đã được thay đổi';
    }
});
 
// ĐOẠN 3
alert(message); // Kết quả là 'Xin chào tấc cả các bạn!'
```
Như vậy trong ĐOẠN 3 đã không nhận được giá trị của ĐOẠN 2, lý do tại sao?

Theo quy trình xử lý thì chương trình hoạt động từ trên xuông dưới và từ trái qua phải (điều đương nhiên), nhưng do Ajax phải mất một khoảng thời gian rất lớn (so với tốc độ của trình biên dịch) để request đến URL nên nếu đưa nó vào xử lý đồng bộ thì quả thật trình duyệt phải mất một khoảng thời gian chờ, vì vậy nó sẽ tiếp tục chạy xuống phía dưới mặc kệ đoạn ajax khi nào xong thì xong => dẫn đến giá trị message không thay đổi.

### setTimeout Async
Nhưng nếu bạn tạm ngưng trong vòng 10 giây chẳng hạn (ta coi như 10 giây đủ để request thực hiện xong) thì biến message sẽ nhận được giá trị mới.

```
// ĐOẠN 1
var message = 'Xin chào tấc cả các bạn!';
 
// ĐOẠN 2
$.ajax({
    url : "some-url",
    data : {}
    success : function(result){
        message = 'Giá trị đã được thay đổi';
    }
});
 
// ĐOẠN 3
setTimeout(function(){
    alert(message); 
}, 10000);
 
//// Giá trị đã được thay đổi
```

Tại sao lại như vậy? Bản chất setTimeout cũng là một Async đấy các bạn, nghĩa là các đoạn code bên dưới sẽ hoạt động trước nội dung bên trong setTimeout().

```
setTimeout(function(){
    alert('1');
}, 0);
 
alert('2');
```

Kết quả sẽ xuất hiện 2 -> 1 chứ không phải là 1 - 2 như bạn đang nghĩ đâu :)

## 4. Lời kết
Hầu như những người mới bắt đầu làm quen đều mắc các sai lầm về việc “asynchronous” như là setTimeout() và AJAX, ví dụ bằng cách đưa ra setTimeout() để thực hiện các đoạn code sau một khoảng thời gian hoặc cách xử lý response trực tiếp trong hàm AJAX resquest.

Nếu bạn biết cách sử dụng chúng một cách phù hợp thì bạn có thể tránh được sự nhầm lẫn như thế. Bạn nên biết rằng lệnh setTimeout() sẽ không thực thi đoạn mã khi hết thời gian, nhưng khi thời gian trong setTimeout() hết thì yêu cầu thực hiện lệnh sẽ được đưa vào hàng chờ và có một tin nhắn sẽ gửi tới bạn. Chỉ cần gọi lệnh lên thì hàm sẽ được thực thi ngay.