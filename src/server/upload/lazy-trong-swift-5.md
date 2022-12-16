Lazy là gì? khi nào sử dụng nó? Liệu nó có an toàn không?
![](https://images.viblo.asia/0190cbcd-cae2-410a-a584-17be2a147f20.png)

Nhiều người trong chúng ta đã nhìn thấy keyword `lazy` trước đây hoặc đã sử dụng nó.  Liệu bạn đã thực sự hiểu về nó, hãy cùng tìm hiểu dưới đây!

`Lazy` cho phép chúng ta thực hiện khá nhiều thứ:

1. Khởi tạo một thực thể: class, struct,.. mà không cần cung cấp giá trị khởi tạo ban đầu của nó.
2. Tạm dừng bất kì task nào cho đến khi cần thiết.
3. Lưu trữ các biến tính toán và ngăn việc cần tính toán lại.

## Khai báo `lazy`
Bạn có thể dễ dàng  khai báo lazy bằng cách thêm từ khoá `lazy` . Một biến lazy cần được khai báo với `var`

Và vì tất cả các hằng số phải có một giá trị khi kết thúc quá trình khởi tạo, nên các thuốc tính lazy phải được khai báo var.

![](https://images.viblo.asia/02dccfb5-97f8-4da0-8ee2-79832fad5655.png)

Bây giờ chúng ta hãy xem một ví dụ về ý nghĩa của việc không có giá trị tại thời điểm khởi tạo:

![](https://images.viblo.asia/15f83d5b-1df3-41c2-8235-9d04daaefc56.png)

Ở ví dụ trên, chúng ta có class `User` với một vài thông tin của member và có một hàm khởi tạo. Khi cố gắng  khởi tạo `user1` hệ thống sẽ đưa ra một lỗi rằng `fullName` không có giá trị.
Trong khi đó, cùng thời điểm biến `heavyComputation` được khai báo `lazy` và không có lỗi ở đây.

Vì vậy, rõ ràng là bằng cách khai báo `lazy` chúng ta có thể tránh được các ràng buộc khi khởi tạo (Tạm dừng một task)
## Suspend task
Một lí do khác để sử dụng `lazy` là việc khởi tạo sẽ  nhanh hơn bằng cách tạm dừng task tại thời điểm khởi tạo. 

Nói cách khác, là nhà phát triển, chúng ta muốn có thể tạo ra thực thể của mình nhanh nhất có thể. Vì vậy, cần tránh các task nặng hoặc cần tính toán cho đến khi thực sự cần thiết. Ví dụ:

![](https://images.viblo.asia/68334623-9675-4f0a-a76b-be890e620f95.png)

Như ở ví dụ trên, tất cả các thực hiện tính toán được thực hiện tại thời điểm khởi tạo. Điều này xảy ra bởi vì `heavyComputation` được khai báo là hằng số. Điều này là không thực sự cần thiết. 

Như chúng ta đã biết tại thời điểm khởi tạo, không nhất thiết gán các giá trị cho thuộc tính `lazy` , hãy cùng xem:

![](https://images.viblo.asia/eee245d9-5ccb-4fe0-8495-c1e9e4378c49.png)


Từ ví dụ trên bạn có thể nhận ra được sự khác biệt rõ rệt :D

## Tránh việc tính toán lại

![](https://images.viblo.asia/7aab0f2b-de2e-4465-8108-c2b3de847bc1.png)

Từ ví dụ trên chúng ta có thể thấy 1 biến tính toán cũng có thể tạm dừng được 1 task. Nhưng điều này có nghĩa là thuộc tính tính toán và lazy là tương tự nhau không? 

Câu trả lời là không! Nhìn qua bạn sẽ nhầm hiểu chúng giống nhau, tuy nhiên chúng có sự khác biệt cơ bản. 
Hãy thử truy cập vào biến tính toán nhiều lần và xem điều gì sẽ xảy ra:

![](https://images.viblo.asia/1a408e2e-6403-4681-8306-deb645d2c27d.png)

Những gì chúng ta có thể nhìn thấy ở trên là khi chúng ta truy cập thuộc tính tính toán nhiều lần thì n sẽ bị tính toán lại.
Và hãy thử điều đó với biến lazy

![](https://images.viblo.asia/ce3567a0-7085-4d2c-863a-c07d81822f75.png)

Điều thú vị là lần này thuộc tính được tính 1 lần. Điều này có nghĩa là sau khi giá trị được tính lần đầu tiên, giá trị của nó sẽ được lưu đê sử dụng trong tương lai
và không thực sự được tính toán nhiều lần.
Do đó, dựa trên các ví dụ trên, chúng ta có thể dễ dàng thiết lập rằng thuộc tính `lazy` lưu trữ các giá trị và không được tính toán mỗi khi chúng được truy cập, do đó tiết kiệm nhiều công suất và thời gian xử lí.


## Khi nào không nên dùng lazy
Khi đã hiểu được tác dụng của biến lazy, giờ chúng ta bắt buộc phải hiểu các sử dụng của nó và thận trọng khi sử dụng nó.

Đây là cách để nắm bắt, vì `lazy` chỉ được tính một lần, nên chúng ta không thể sử dụng nó để tính toán các giá trị phụ thuộc vào các biến có giá trị thay đổi thường xuyên.
Điều này là do chúng ta có thể kết thúc với giá trị sai trong biến lazy sau lần tính toán đầu tiên.

Ngoài ra, lazy không phải thread-safe. Có nghĩa là chúng ta có thể kết thúc với các giá trị khác nhau cho cùng một biến khi được truy cập trên các luồng khác nhau.
Apple có nói:

```
If a property marked with the lazy modifier is accessed by multiple threads simultaneously 
and the property has not yet been initialized, 
there’s no guarantee that the property will be initialized only once.
```

Điều này cho thấy việc sử dụng `lazy` quá nhiều thực sự có thể cho kết quả không đúng. Nhưng có những nơi chúng ta có thể sử dụng `lazy` ở nhưng nơi ít thay đổi.

### Tham khảo:
https://ayusinghi96.medium.com/lazy-keyword-swift-5-ios-eae3dde18a80