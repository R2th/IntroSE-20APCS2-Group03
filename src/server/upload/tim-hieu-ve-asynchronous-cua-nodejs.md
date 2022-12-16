## Về NodeJS.

**Nodejs** là một open source được tạo ra nhằm mục đích xây dựng các ứng dụng ở phía môi trường Server. **Nodejs** hoạt động trên rất nhiều các platform khác nhau  (Windows, Linux, Unix, Mac OS X,..). **Nodejs** đem lại tốc độ response nhanh chóng, các tác vụ được xử lý với tốc độ nhanh và đáp ứng thời gian thực, nhờ phần Core được viết bằng C++. Chính vì những lý do này, **Nodejs** được áp dụng vào các sản phẩm có lượng request  lớn, scale liên tục, cần sử dụng những công nghệ mới hoặc muốn đem **Javascript** lên phát triển ở Server.

## Khái niệm Synchronous và Asynchronous trong lập trình.

Khi phát triển ứng dụng thường có hai khái niệm mà chúng ta cần quan tâm là **Synchronous**  và **Asynchronous**

- **Synchronous** hiểu đơn giản là xử lý đồng bộ, đoạn mã của chúng ta sẽ được thực thi từng dòng từ trên xuống dưới và trái qua phải. Dòng tiếp theo chỉ được thực thi khi dòng trước nó hoàn thành, điều này sẽ sinh ra một trạng thái chờ.

``` javascript
console.log('Step 1')
console.log('Step 2')
console.log('Step 3')

// Output
//  Step 1
//  Step 2
//  Step 3
```
Điểm lợi của Xử lý đồng bộ là chương trình của chúng ta sẽ chạy theo trình tự, không gây các lỗi và dễ dàng quản lý các tiến trình này. Tuy nhiên, nhược điểm của nó là giữa các đoạn mã sẽ sinh ra một trạng thái chờ không cần thiết.

- **Asynchronous** là xử lý bất đồng bộ, chương trình có thể bỏ qua một vài bước để thực hiện bước tiếp theo trước. Xử lý bất đồng bộ đem lại trải nghiệm tốt hơn, các đoạn mã được thực hiện nhanh chóng,  và không có trạng thái chờ giữa các công việc. Chính vì những điều này, **Asynchronous programming** là một khái niệm quan trọng được sử dụng trong **Nodejs** để mang lại sự realtime cũng như khả năng xử lý được lượng request lớn.

``` javascript
console.log('Starting')
setTimeout(() => {
    console.log('2 Second Timer')
}, 2000)
console.log('Stopping')

// Output
//  Starting
//  Stopping
//  2 Second Timer
```

Đoạn mã trên là một ví dụ cho việc xử lý bất đồng bộ, hàm setTimeout đã bị bỏ qua và thực thi hàm `console.log('Stopping') `trước, sau đó mới quay lại `console.log('2 Second Timer')`

## Cách hoạt động của Asynchronous trong Nodejs.

Một chương trình được thực thi bất đồng bộ đem lại trải nghiệm, tốc độ xử lý tốt hơn, tuy nhiên chính vì sự bất nguyên tắc, không có thứ tự thực hiện như vậy nên việc quản lý các tiến trình trở nên phức tạp và khó khăn hơn, như ví dụ dưới đây:

``` javascript
console.log('Starting up')

setTimeout(() => {
    console.log('Two Second')
}, 2000)

setTimeout(() => {
    console.log('Zero Second')
}, 0)

console.log('Finishing up')

// Output
//  Starting up
//  Finishing up
//  Zero Second
//  Two Second

```

Bạn có thắc mắc tại sao
``` js
setTimeout(() => {
    console.log('Zero Second')
}, 0)
```
có timeout là 0s nhưng lại bị thực thi sau hàm `console.log('Finishing up')` không? Bởi vì Nodejs được phát triển dự trên Javascript Runtime nên để giải thích cho vấn đề này chúng ta cùng xem những khái niệm quan trọng của Javascript.

> Javascript là một ngôn ngữ single-threaded, non-blocking, asynchronous và concurrent. Javascript có một Call Stack, một Event Loop, một Callback Queue, vài Apis và các thứ linh tinh khác.

### Javascript Engine.

Từ khi **NodeJS** ra mắt năm 2009, cái tên V8 đã trở nên rất phổ biến. Đồng thời cũng trở thành ví dụ điển hình cho một Javascript Engine. **V8 Javascript Engine** bao gồm hai thành phần chính:
![](https://images.viblo.asia/7c479126-5c6d-451b-a4e3-fb4ae9b40176.png)
- Memory Heap: cấp phát bộ nhớ sẽ diễn ra ở đây.
- Call Stack: cấu trúc dữ liệu nơi chứa các lời gọi hàm khi code được thực thi.

### Call Stack.

**Javascript** đã giới thiệu nó là một ngôn ngữ đơn luồng, cũng có nghĩa là nó chỉ có một **Call Stack** và một lúc chỉ làm một việc thôi.

> Call Stack là một cấu trúc dữ liệu dạng ngăn xếp (stack) dùng để chứa thông tin về hoạt động của chương trình máy tính trong lúc thực thi.


Nếu bạn đã từng debug code kiểu nhảy từng dòng lệnh, thường thì các IDE sẽ cung cấp luôn một giao diện để chúng ta xem call stack hiện tại. Nôm na là khi bạn debug/step đến một function A, thì A sẽ được push (on top) vào call stack. Sau khi A thực thi xong và trả về kết quả, A sẽ bị pop ra khỏi stack.

**Call Stack** của JS cũng vậy. 

![](https://images.viblo.asia/9cbd7208-1a11-4577-84fb-3d990c4be528.gif)

**Call Stack** ban đầu sẽ trống trơn khi engine bắt đầu thực thi đoạn code. Ngay sau đó, từng step sẽ giống như trên. Mỗi step bạn thấy trong hình là một entry hay một bản ghi trong **Call Stack**  và được gọi là **Stack Frame**.

### Event Loop và Callback Queue.

Bên cạnh **Javascript Engine**, browser còn cung cấp các **Node APIs**, một **Event Loop** và một **Callback Queue**. Chúng chạy trên các `thread` riêng và được browser bảo trợ về concurrency.

Các hàm `async callback` sẽ được thêm vào hàng đợi **Callback Queue**. Nhiệm vụ của **Event Loop** là đợi đến khi** Call Stack** rỗng, và quay lại kiểm tra trong **Callback Queue** có gì không?, nếu có thì lấy lần lượt chúng đẩy vào trong **Call Stack** để chạy tiếp.

![](https://images.viblo.asia/4c2aa5d8-2f95-4205-8d33-9833a1eaadf0.gif)

Nếu bạn để ý cái gif trên kĩ chút thì sẽ không thấy `setTimeout` xuất hiện trong khung `Node Apis`, thì tại chúng ta đang để `timeout=0` mà. Điều này khẳng định lại rằng, **Event Loop** phải đợi cho **Call Stack** rỗng thì mới đẩy tác vụ từ **Callback** **Queue** vào. Nên cho dù bạn để `setTimeout zero` thì `cantWait()` cũng phải chờ và `"Zero Second"` sẽ được in ra sau `"Finishing up"`.

## Kết luận
Hy vọng sau khi giới thiệu về các khái niệm trong Javascript, mình đã giúp các bạn hiểu thêm về cách hoạt động của Asynchronous trong Nodejs cũng như trong Javascript, cũng như nắm được cách kiểm soát hoạt động bất đồng bộ trong ứng dụng của mình.