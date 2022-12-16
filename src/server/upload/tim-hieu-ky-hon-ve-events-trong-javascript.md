Có lẽ chúng ta cũng không xa lạ gì với khái niệm events trong javascript nữa. Nó được ví như trái tim của các ứng dụng web sử dụng javascript. Trong bài viết này chúng ta hãy cùng nhau tìm hiểu một cách tỉ mỉ nhất có thể về events trong javascript. Cũng như từ đó có những góc nhìn khái quán về event handling và nhưng vấn đề xoay quanh. Cùng bắt đầu thôi!

# I. Events overview
Như bên trên mình đã đề cập thì events có ý nghĩa quan trọng khi vận hành trong các ứng dụng javascript. Vì sao ư? ... Vì nếu không có events cũng sẽ không có scripts. Cùng nhìn vào bất kỳ ứng dụng web nào mà chúng ta từng truy cập mà có sử dụng javascript trong đó. Thì có một điều rất dễ nhận ra là hầu như tất cả các trường hợp xảy ra sẽ là 1 event để kích hoạt script. Lý do vì sao thì rất đơn giản, cùng nhìn lại lý do mà javascript ra đời hoặc định nghĩa về nó. Javascript có nghĩa là sẽ thêm tính tương tác cho ứng dụng web, tăng tương tác mỗi khi người dùng thực hiện một hành động nào đó trên web thì sẽ có những phản ứng lại tương ứng (như việc người dùng click button A thì web sẽ show lên một thông báo chẳng hạn).

Vì thế javascript sẽ cần một hướng để phát hiện được những hành động của người dùng để biết rõ khi nào sẽ phản ứng lại những hành động đó. Nó cũng cần biết được phương thức nào sẽ được thực thi cũng như là phương thức sẽ thực thi một công việc nào đó mà những người phát triển web mong muốn để  tăng tương tác cho trang web.

Cũng có một số trường hợp khi nào người dùng thực hiện 1 hành động nào đó trên web thì sẽ có một số event sẽ không được khởi chạy (đơn giản vì event đó không phụ thuộc vào người dụng, ví dụ như event `load` sẽ  khởi chạy khi web đã được tải).

Vì vậy events là trung tâm của javascript trong quá trình tăng tương tác với người dùng. Khi người dùng thực hiện 1 hành động sẽ tạo ra event. Khi mà những script đã viết trong web phản ứng lại event đó cũng là lúc sự tương tác được sinh ra.

# II. Event handling script
Chúng ta cùng tìm hiểu các khâu trong trong event handling.

## 1. Đăng ký một event handling
Bước đầu tiên sẽ luôn là đăng ký event handling. Chúng ta cần phải chắc rằng khi trình duyệt thực thi đoạn script của chúng ta thì event mà chúng ta đã chọn để handler phải diễn ra.

Cách tốt nhất là sử dụng [mô hình event truyền thống](https://www.quirksmode.org/js/events_tradmod.html) (ngoài cách này thì chúng ta có thể sử dụng [inline](https://www.quirksmode.org/js/events_early.html)). Nó sẽ đảm bảo đoạn script handler của chúng ta sẽ được thực thực trên hầu hết các trình duyệt (cross-browser)

```javascript
alertBtn.onclick = function showAlert(){ // show alert }
if (alertBtn.captureEvents) alertBtn.captureEvents(Event.CLICK)
```
Đoạn code khá thô. Nhưng nó sẽ giúp chúng ta tránh các trường hợp lỗi khi chạy trên các trình duyệt khác nhau.

Còn bây giờ thì chúng ta đã thành công đăng ký function `showAlert` như một handler cho `click` event của HTML element `alertBtn`. Điều này có nghĩ là mỗi khi người dùng click vào `alertBtn` thì function `showAlert` sẽ được thực thi.
## 2. Truy cập vào event
Khi chúng ta đã đăng ký thành công event handler thì tiếp theo chúng ta sẽ viết script thực thi trong đó. Và chúng ta có thể sẽ muốn truy cập vào đối tượng event để xem các thông tin bên trong.

Để truy cập event và truy cập các thông tin bên trong nó thì hãy bắt đầu với phương thức mà chúng ta dùng làm handler.
```javascript
function showAlert(e) {
  if (!e) var e = window.event
  // e trỏ đến event
  // từ e chúng ta có thể xem thông tin bên trong event
}
```

## 3. Truy cập vào HTML element
Trong một số trường hợp chúng ta muốn truy cập vào HTML element mà event diễn ra. Có 2 cách là sử dụng từ khoá `this` hoặc sử dụng thuộc tính `target/srcElement`.

Cách an toàn nhất là sử dụng từ khoá `this`. `this` không phải lúc nào cũng trỏ đến đúng HTML element, nhưng lại rất phù hợp khi sử dụng với mô hình event truyền thống.
```javascript
function showAlert(e) {
  if (!e) var e = window.event
  // e sẽ trỏ đến event
  // this trỏ đến HTML element mà nó handle
  // target/srcElement trỏ đến HTML element mà event diễn ra ban đầu
}
```
Thuộc tính `target/srcElement` lưu trữ 1 tham chiếu đến HTMl element mà event diễn ra ban đầu. Nó rất hữu ích, nhưng khi event capture hoặc bubble  thì `target/srcElement` không thay đổi, nó vẫn là HTML element mà event diễn ra ban đầu.

## 4. Đọc các thuộc tính trong event
Các thuộc tính này sẽ rất dễ bị bug sử dụng trên nhiều trình duyệt khác nhau. Nên khi sử dụng các thuộc tính này chúng ta nên cân nhắc tính khả dụng của nó để hạn chế khả năng xảy ra bug.

Để chắc chắn tính khả thi của thuộc tính thì đầu tiên hãy kiểm tra thuộc tính đó có tồn tại không rồi sau đó mới sử dụng.
```javascript
function showAlert(e) {
  if (!e) var e = window.event
  alert(e.type)
}
```
## 5. Event order
Cuối cùng là chúng ta sẽ quyết định xem liệu mình có muốn event bubble up (event sẽ được pass lên cả element cha). Nếu chúng ta không muốn chúng ta có thể chặn nó.
```javascript
function showALert() {
  if (!e) var e = window.event
  // handle event
  e.cancelBubble = true
  if (e.stopPropagation) e.stopPropagation()
}
```

# III. Tổng kết
Bài chia sẻ của mình đến đây là hết. Thì bài này chỉ nhằm giới thiệu lại chi tiết nhất có thể về event. Còn những phần kiến thức liên quan thì mình sẽ tìm hiểu thêm và trình bày trong những bài tiếp theo.

Với những gì mình trình bày thì mong muốn chúng ta sẽ có cái nhìn khái quát về event để từ đó chúng ta sẽ đánh sâu vào chi tiết giúp hiểu rõ hơn về hoạt động của event nói riêng và javascript nói chung và nâng cao kiến thức và có nhiều hơn hướng xử lý những vấn đề liên quan đến event và javascript.

Các tài liệu tham khảo các bạn có thể truy cập tại [đây](https://www.quirksmode.org/).

Một lần nữa cảm ơn các bạn đã đón đọc bài viết. Hẹn gặp lại trong bài chia sẽ tiếp theo.