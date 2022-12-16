Javascript là ngôn ngữ single-thread, tức là nó chỉ chạy trên một luồng duy nhất. Nếu xử lý theo cơ chế đồng bộ (synchonous) thì khi thực hiện các công việc như thao tác với database, gọi request đến server... thì ứng dụng sẽ phải bỏ ra một khoảng thời gian khá dài để chờ cho những công việc ở trên thực thiện xong rồi mới bắt tay vào thực hiện công việc tiếp theo, điều đó sẽ làm tiêu tốn một khoản thời gian không nhỏ ảnh, hưởng đến trải nghiệm người dùng hoặc trong trường hợp xấu có thể dẫn đến ... treo ứng dụng.

Xử lý bất đồng bộ là một công việc phức tạp và không thể tránh khỏi. Vì vậy, chúng ta nên dành chút ít thời gian để cùng tìm hiểu về nó, cụ thể ở đây mình giới thiệu qua về xử lý bất đồng bộ trong **Javascript** với ba công cụ **callback**, **promise** và **async/await**.

Bắt đầu thôi!

# I. Đồng bộ và bất đồng bộ
## 1. Xử lý đồng bộ (Synchronous/Sync)
Đúng như tên gọi của nó, khi xử lý đồng bộ, chương trình sẽ chạy theo từng bước và chỉ khi nào bước 1 được thực hiện xong thì mới bắt đầu chuyển sang thực hiện bước 2. Một trong những nguyên tắc cơ bản trong lập trình áp dụng quy tắc này chính là *biên dịch*.  Khi biên dịch, trình biên dịch sẽ thực hiện dịch lần lượt theo thứ tự từ trái qua phải, từ trên xuống dưới, khi nào dịch xong dòng trên thì mới dịch xuống dòng dưới, điều này sẽ sinh ra một trạng thái được gọi là **trạng thái chờ**. 

Ví dụ về đoạn code sau:

```
var a = 1;
var b = 2;
var c = b;

var kq1 = a + b;
var kq2 = b + c;
```
Chương trình sẽ chạy tuần tự từ dòng đầu tiên cho đến dòng cuối cùng. Bắt đầu với khởi tạo a, b, c sau đó tính kq1 trước rồi mới tính kq2 và kết thúc.

Lấy ví dụ thực tế về việc nấu ăn, đầu tiên bạn sẽ nấu cơm, đợi cơm chín rồi mới quay ra chiên trứng, trứng chín rồi quay sang nấu canh và cuối cùng là ăn cơm.

**Mặt tốt**:
- Vì chạy tuần tự theo đúng nguyên tắc nên sẽ hạn chế mắc phải các lỗi liên quan đến quá trình.
- Nếu bị lỗi thì sẽ dễ dàng tìm ra và khắc phục, dễ quản lý.

 **Mặt xấu**:
 - Vì chạy theo thứ tự và phải chờ đợi nhau nên sẽ sinh ra *trạng thái chờ*, sẽ có những câu lệnh cần phải thao tác với dữ liệu bên ngoài vì thế nó cần một khoảng thời gian để lấy dữ liệu về trước khi xử lý nên gây mất thời gian, ảnh hưởng đến trải nghiệm người dùng.

## 2. Xử lý bất đồng bộ (Asynchronous /Async)
Ngược lại Synchronous, Asynchronous cho phép chương trình nhảy một số bước nào đó để thực hiện một số đoạn mã nhất định. Nếu công việc thứ hai kết thúc trước, nó có thể sẽ cho ra kết quả trước cả công việc thứ nhất.

![](https://images.viblo.asia/df219cd6-07c8-4968-bf52-5330e1c084d3.png)


Lại lấy ví dụ về việc nấu ăn: thay vì đợi cơm chín rồi mới chiên trứng, bạn nấu cơm và đặt thời gian (callback) rồi sau đó quay sang chiên trứng.

**Mặt tốt**:
- Với bất đồng bộ, nhiều công việc có thể thực hiện cùng lúc mà không phải chờ đợi nhau, giảm thiểu được thời gian xử lý vì đã giảm thiểu được thời gian chờ đợi một task nào đó hoàn thành.

**Mặt xấu**:

- Khó kiểm soát
-  Một thao tác thêm dữ liệu phải thông qua hai công đoạn là validate dữ liệu và thêm dữ liệu, nếu thao tác validate xảy ra sau thao tác thêm thì còn gì tệ hại hơn nữa :).
# II. Callback (ES5)
## 1. Khái niệm
Callback là giải pháp đầu tiên được đưa ra của Javascript để giải quyết các vấn đề liên quan đến xử lý bất đồng bộ theo đúng trình tự mong muốn. 

 Định nghĩa về callback theo trang `MDN web docs`:

> A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.
> 
![](https://images.viblo.asia/41082633-753b-472a-b336-506e79ecdffb.jpg)

Đại khái, callback là truyền một đoạn code (**hàm A**) vào trong một đoạn code khác (**hàm B**) dưới dạng đối số. Tới một thời điểm nào đó, hàm **A** sẽ được hàm **B** gọi lại (callback).

![](https://images.viblo.asia/8719d230-9b3e-447d-a401-fa6e1dd1ca44.gif)


Đọc xong phần trên bạn chưa hiểu được rõ thế nào là callback? Mình lúc mới tìm hiểu về nó cũng vậy, để dễ hiểu hơn mình xin lấy một ví dụ ở phần dưới.

## 2. Ví dụ và cách hoạt động
Lấy ví dụ về con mèo nhà mình, bình thường nó sẽ mất 5 giây uống nước trước rồi mới ăn.
```
// con mèo cần 5s để uống nước
function uong_nuoc() {
    setTimeout(() => {
        console.log('uống nước');
    }, 5000);
}

// con mèo ăn cơm
function an_com() {
    console.log('an com');
}

uong_nuoc();
an_com();
```

Thử làm ví dụ trên bạn sẽ thấy con mèo ăn cơm trước mặc dù chưa uống nước xong. Để đảm bảo con mèo nó ăn và uống theo đúng thứ tự, chúng ta sẽ cần thông tin khi nào con mèo uống nước xong rồi mới cho nó ăn cơm. Để làm như vậy chúng ta thêm vào một thằng sen bên cạnh mèo để đảm bảo mèo uống xong nước mới đưa khay cơm..
```
function uong_nuoc(sen_cua_meo) {
    setTimeout(() => {
        console.log('uống nước');
        sen_cua_meo(); // lúc sen nhận ra là mèo đã uống nước xong
    }, 5000);
}

// con mèo ăn cơm
function an_com() {
    console.log('an com');
}

// sen đứng cạnh đợi mèo ăn xong rồi đưa khay cơm
var sen_cua_meo = function() {
    an_com();
}

uong_nuoc(sen_cua_meo);
```

Hoặc đơn giản có thể viết gọn lại thành
```
uong_nuoc(() => {
    an_com();
});
```

## 3. Ưu/nhược điểm của callback

**Ưu điểm**:
- Callback là một mô hình khá phổ biến nên rất dễ hiểu
- Rất dễ implement trong các function của chúng ta

**Nhược điểm**:

Về cơ bản thì callback có thể giải quyết được vấn để xử lý bất đồng bộ trong javascript, tuy nhiên khi đưa vào áp dụng thực tế nó lại có khá nhiều vấn đề như:
- Khi thao tác bất đồng bộ, các callback phải chờ nhau thực hiện dẫn đến tổng thời gian hoàn thành công việc bị kéo dài hơn.

- Dài dòng, khó đọc, khó bảo trì.

- Callback hell (pyramid of doom): là cách code không tối ưu dẫn đến việc có quá nhiều callback lồng nhau từ đó sẽ gay mất thời gian cho việc bảo trì cũng như fix bug. Đại khái callback hell có dạng giống như hình bên dưới.

![](https://images.viblo.asia/097f906f-056e-4ec5-bba5-f03863d95c87.jpeg)

Để tránh được tình huống *callback hell* như vậy thì có nhiều cách như thiết kế ứng dụng theo dạng module, đặt tên cho callback, định nghĩa hàm trước khi gọi ... chi tiết tham khảo [ở đây](https://vntalking.com/callback-hell-trong-javascript-la-gi.html).

# Kết luận
Bài viết khá dài nên mình xin phép được chia làm 2 phần. Trong [phần tiếp theo](https://viblo.asia/p/1VgZvPv75Aw) mình sẽ trình bày về Promise, Async/await và ưu nhược điểm của nó. 

Cảm ơn các bạn đã đọc đến cuối của bài viết.