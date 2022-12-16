Có thể trong quá trình lập trình iOS bạn sẽ gặp crash với lỗi EXC_BAD_ACCESS. Bài viết này sẽ giúp bạn hiểu EXC_BAD_ACCESS  là gì và điều gì gây ra nó, cũng như một vài mẹo để giải quyết nó. 

## 1. EXC_BAD_ACCESS  là gì?
Khi bản hiểu được nguyên nhân cơ bản của EXC_BAD_ACCESS bạn sẽ hiểu rõ hơn về cái tên khó hiểu của nó. 
* Hiểu theo cách đơn giản:
Bất cứ khi nào bạn gặp phải EXC_BAD_ACCESS, điều đó có nghĩa là bạn đang gửi message tới một đối tượng đã được giải phóng. Đây là điều hay xảy ra nhất, tuy nhiên vẫn có các trường hợp ngoại lệ khác sẽ được trình bày sau đây. 
* Ý nghĩa thực sự: 
Theo nghĩa phức tạp hơn, trong C và Objective-C thì chắc chắn bạn sẽ biết tới con trỏ. Một con trỏ giống như một biến lưu trữ một đối tượng. Con trỏ trỏ tới địa chỉ bộ nhớ và lấy  giá trị của nó. 

Khi một khối lệnh không còn được trỏ tới, không còn được sử dụng nữa cho ứng dụng của bạn. Khi điều đó xảy ra, Kernel sẽ gửi một ngoại lệ (EXC) cho biết ứng dụng của bạn không được phép truy cập vào vùng nhớ đó (BAD_ACCESS).

Nói tóm lại, khi nhận được lỗi EXC_BAD_ACCESS có nghĩa là ứng dụng của bạn đang trỏ tới vùng nhớ không thể gửi message nữa. Tuy nhiên trong một số trường hợp EXC_BAD_ACCESS xảy ra do lỗi của con trỏ. 

## 2. Debug EXC_BAD_ACCESS
Việc debug EXC_BAD_ACCESS có vẻ rất khó khăn, sau khi hiểu được nó là gì có lẽ bạn sẽ thấy bớt chút khó khăn hơn trước. 
### Zombie.
Cách đầu tiên phải nói đến chính là zombie, nó đã rất phổ biến và xuất hiện trong Xcode trong hơn một thập kỉ nay. Cái tên Zombie nghe có vẻ nguy hiểm nhưng nó sẽ rất hữu ích cho việc debug EXC_BAD_ACCESS.

Trong Xcode bạn có thể bật các đối tượng Zombie, có nghĩa là các đối tượng đã được giải phóng sẽ được giữ lại như Zombie. Nói cách khác, các đối tượng đã giải phóng vẫn được giữ lại để có thể gỡ lỗi. 
Nếu bạn truy cập đến một đối tượng Zombie ứng dụng của bạn sẽ bị lỗi EXC_BAD_ACCESS ngay lập tức. 
Tại sao điều này lại hữu ích với bạn? Điều khó của EXC_BAD_ACCESS là bạn không biết ứng dụng của bạn đang cố truy cập vào object nào đã được giải phóng.  Bằng cách giữ lại các đối tượng đã được giải phóng thì Xcode có thể chỉ ra lỗi xảy ra ở đâu. 

Kích hoạt Zombie trong Xcode rất là dễ dàng. Lưu ý điều này có thể khác nhau với từng phiên bản Xcode mà bạn đang sử dụng. Bạn hãy chọn vào scheme ở góc trên bên phải chọn `Edit Scheme` Chọn `Run` và sang tab `Diagnostics`và tick chọn `Enable Zombie Objects.`

![](https://images.viblo.asia/399a2fb2-6f74-4bee-9572-025a4c313607.jpg)

Giờ đây nếu bạn đã bật Zombie thì khi bị vào trường hợp EXC_BAD_ACCESS thì trên console sẽ thông báo lỗi kiểu như sau 
```swift 
2015-08-12 06:31:55.501 Debug[2371:1379247] -[ChildViewController respondsToSelector:] message sent to deallocated instance 0x17579780
```
Trong lỗi trên chúng ta có thẻ thấy nó xuất phát từ `respondsToSelector` đã cố truy cập đến một đối tượng đã bị giải phóng. Điều này sẽ giúp cho bạn tìm được nguồn gốc của lỗi crash và điều tra nó. 

### Analyze.
Nếu như Zombie không giải quyết được vẫn đề của bạn, thì nguyên nhân gốc có thể phức tạp hơn. Trong trường hợp này bạn cần xem xét kĩ hơn code của mình có thể phức tạp và tốn thời gian.
Để giúp bạn dễ tìm ra lỗi trong code thì có thể yêu cầu Xcode phân tích code của bạn để bạn có thể tìm được các vùng code có vấn đề. Để yêu cầu Xcode phân tích thì bạn hãy chọn `Analyze` trong tab `Product` trên thanh menu hoặc dùng tổ hợp phím tắt `Shift-Command-B`. Sẽ mất tời vài phút để thực hiện, sau khi hoàn thành các issue sẽ được hiển thị trong thanh navigation bên trái. Các vấn đề sẽ được bôi xanh lên. 

![](https://images.viblo.asia/5d934011-264c-4bc7-a1e0-44f3c4362ae2.jpg)

Khi bạn click vào đó, Xcode sẽ điều hướng bạn tới đoạn code đó để xem xét. 
![](https://images.viblo.asia/0fe063db-787c-4d2a-af12-877a230c6d65.jpg)

Nếu không tìm được nguyên nhân gây ra EXC_BAD_ACCESS thì bạn cần xem xét kĩ tất cả các vấn đề mà Xcode đã tìm ra được.
## 3. Tổng kết.
EXC_BAD_ACCESS là một vấn đề phổ biến đối với các lập trình viên, nó liên quan tới việc quản lý bộ nhớ thử công. Nó ít xảy ra hơn từ khi ARC xuất hiện, nhưng không có nghĩa là nó biến mất. :D

##### Tham khảo: https://code.tutsplus.com/tutorials/what-is-exc_bad_access-and-how-to-debug-it--cms-24544