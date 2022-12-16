Đối với 1 lập trình viên phần mềm mới vào nghề, vấn đề nan giải nhất có lẽ chính là debugging. Lúc đầu, khi mở được console ở chrome và gõ `console.log()`, tôi đã nghĩ đây quả là 1 phương pháp thần thánh để giải quyết đống bugs mà mình đang gặp phải. Thông thường tôi hay sử dụng `console.log()` như sau:

```console
// Kiểm tra giá trị của biến
console.log('Total Price:', total)

// Kiểm tra chương trình thực thi đến đâu
console.log('Here')
```

Tuy vậy, sau 1 thời gian, chắc ai cũng nhận ra được hạn chế của cách debug này. Chúng ta cần 1 phương pháp khác hiệu quả hơn, như thử sử dụng debugging tool của chính browser, cụ thể tôi đang muốn nhắc tới **Chrome Developer Tools**.

Trong bài viết này, tôi sẽ mô tả việc đặt breakpoints, thiết lập watch expressions, step through vào từng dòng code và apply thử các thay đổi trong code với Chrome Developer Tools.

## Step 1: Tái hiện bug

Chúng ta sẽ bắt đầu thực hiện các bước để tái hiện bug với 1 chương trình calculator đang bị lỗi. Bạn có thể thử chương trình đó tại [đây](https://chromedevtoolsdemo.herokuapp.com/).

1. Nhập 12 cho 'Entree 1'
2. Nhập 8 cho 'Entree 2'
3. Nhập 10 cho 'Entree 3'
4. Nhập 10 cho 'Tax'
5. Chọn 20% cho 'Tip'
6. Nhấn Calculate Bill

Kết quả chúng ta mong muốn là 39.6, tuy nhiên chương trình lại cho ra kết quả 15500.1 → bị bug rồi.

![](https://images.viblo.asia/d900795e-b471-4fb8-b155-22ced2febafd.png)

## Step 2: Sử dụng Sources panel

Để mở Chrome Developer Tools, ấn `Command + Option + I (Mac)` hoặc `Control + Shift + I (Linux)`.

![](https://images.viblo.asia/ed3ee5ba-edb1-4aeb-81bc-3704cbd9ecc0.png)

Click vào Sources panel ở phía trên, chúng ta sẽ nhìn thấy 3 khung: file navigator, code editor, debugger được hiển thị.

## Step 3: Đặt Breakpoint

Trước khi thử đặt breakpoint, tôi muốn quay lại với `console.log()` để các bạn có thể hình dung được debug bằng phương pháp đó trông sẽ thế nào:

![](https://images.viblo.asia/3d3143e8-33c7-4356-802a-a72a2361fb5c.png)

Với dev tools, chúng ta không cần phải sửa code như trên nữa, thay vào đó, chỉ cần đặt breakpoint, sau đó đi vào từng câu lệnh để xem các giá trị biến có hợp lý hay không.

Đặt breakpoint là chỉ cho chương trình biết chỗ dừng thực thi, để cho phép chúng ta debug từ đó.

> Chúng ta có thể đặt breakpoint để bắt event từ chuột bằng cách lựa chọn *click* trong *Event Listener Breakpoints* của *Mouse* ở khung debugger.

Nếu bạn đặt breakpoint như trên, mỗi khi bạn click vào button Calculate Bill, chương trình sẽ dừng lại ở dòng đầu tiên của function `onClick()`. Nếu debugger dừng lại ở chỗ khác, hãy ấn vào *play* button để debugger bỏ qua chỗ đó.

## Step 4: Đi vào từng dòng code

Ở các debug tools, người sử dụng có thể lựa chọn chương trình tiếp tục thực thi ra sao, bằng *step into* hoặc *step over*.

*Step into* cho phép từng câu lệnh trong 1 function được tiếp tục thực thi. *Step over* cho phép bỏ qua function hiện tại (sử dụng trong trường hợp chắc chắn function đó ko có vấn đề).

Dưới đây là 1 ví dụ khi tôi thử debug chương trình calculator. Ở khung bên phải, tôi có thể xác nhận được giá trị của các entree đã nhập.

![](https://images.viblo.asia/a28bf19d-cd5e-4248-8104-d670f1717127.png)

## Step 5: Line-of-Code Breakpoint

Việc đi vào từng dòng code thực sự tuyệt vời, nhưng không phải lúc nào cũng cần kiểm tra quá chi tiết như vậy. Để kiểm tra giá trị biến ở vài vị trí mong muốn, chúng ta có thể sử dụng line-of-code breakpoint.

> Line-of-code breakpoint chính là lý do để từ bỏ `console.log()`

Để đặt line-of-code breakpoint, bạn chỉ cần đơn giản click vào chỗ hiển thị số dòng của dòng tương ứng. Sau đó chạy code và bạn sẽ thấy mọi thứ dừng lại ở dòng mình vừa đặt, thay vì cứ phải đi từng dòng từ đầu.

![](https://images.viblo.asia/b1215d2d-04ce-4546-aac1-a8141478d3b1.png)

Như các bạn thấy trong hình, các entree có giá trị đúng, nhưng subTotal lại có giá trị sai là 10812. Có lẽ vấn đề nằm ở việc thay vì thực hiện phép toán tính tổng, tôi đã thực hiện phép nối string.

Hãy thử sử dụng *watch expression* để kiểm tra được chi tiết hơn.

## Step 6: Watch Expressions

Tại thời điểm này, chúng ta đã biết phép cộng các entree được thực hiện không đúng, hãy thử đặt *watch expressions* cho từng entree xem sao.

*Watch expressions* sẽ cho chúng ta nhiều thông tin hơn về các biến.

> Click vào thẻ *Watch* ở khung bên phải, click *+* rồi gõ tên biến hoặc các thuộc tính khác vào.

![](https://images.viblo.asia/a36dea38-84d6-4c16-844a-de3652e0ef67.png)

Đúng như phán đoán lúc nãy, các giá trị entree đang được lưu dưới dạng string, khiến phép cộng không được thực hiện như mong muốn. Có lẽ hàm `querySelector()` chính là thủ phạm.

## Step 7: Sửa lỗi

Có nhiều cách để khắc phục lỗi trên. Đơn giản nhất là ép giá trị từ string sang number bằng `Number()`.

> Để sửa code, lựa chọn *Elements*, expand các tag ra để tìm javascript code. Click chuột phải và chọn *edit as html*. 

![](https://images.viblo.asia/8f736558-9096-4f5c-9b1b-45cd297733d5.png)

Nếu bạn đang sử dụng workspace, chỉ cần save code là có thể xem được kết quả thay đổi luôn. Nếu không, bạn cần save 1 bản copy về local bằng `Command + S (Mac)` hoặc `Control + S (Linux)`.

![](https://images.viblo.asia/2cda0bb9-e40c-4f29-bb24-5c79624ba585.png)

***
**Source**: *[How to stop using console.log() and start using your browser’s debugger](https://medium.com/datadriveninvestor/stopping-using-console-log-and-start-using-your-browsers-debugger-62bc893d93ff)*