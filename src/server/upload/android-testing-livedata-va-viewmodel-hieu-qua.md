# I. Mở đầu
Architecture Components đã được giới thiệu trên Google I / O 2017 và chúng có nghĩa là sự cải thiện đáng kể trong thế giới phát triển Android. Cũng có rất nhiều bài viết nói về Architecture Components và cách để implement chúng. Có một trong những lợi ích khi implement chúng đó là khả năng testing dễ dàng hơn. Nhưng làm sao để hiểu quả khả năng testing. Chúng ta cùng đi vào bài viết ngày hôm nay.

# II. View và ViewModel giao tiếp qua LiveData
Một trong những biện pháp chính của Architecture Components là Observer Pattern để update Activity hoặc Fragment và xử lý các sự cố thường gặp .
Bạn có thể tham khảo thêm vài viết này để hiểu rõ hơn: https://viblo.asia/p/android-architecture-giao-tiep-giua-viewmodelpresenter-va-view-Ljy5VLN3Zra

![](https://images.viblo.asia/98ed9908-13dd-43b0-9126-c4e061cd9909.png)https://images.viblo.asia/98ed9908-13dd-43b0-9126-c4e061cd9909.png

Điều quan trọng ở đây là View vẫn thụ động, giữ tất cả logic trong ViewModel, đồng thời gửi các hành động của người dùng ngay lập tức đến ViewModel. Độ phức tạp để xác minh bằng thử nghiệm vẫn còn trong ViewModel và nếu có thể, chúng ta nên tránh phụ thuộc android. * để có thể kiểm tra bằng thử nghiệm JUnit thuần túy. Điều này rất quan trọng để đạt được Thử nghiệm ViewModel hiệu quả

# III. Test ViewModel hiệu quả
Một số mục tiêu muốn đạt được

1. Thực hiện kiểm tra nhanh
2. Mô hình hóa các trường hợp sử dụng thực tế của ViewModel đang được thử nghiệm
3. Dễ viết test và dễ dàng bảo trì

Giải quyết yêu cầu đầu tiên có nghĩa là chỉ giữ thử nghiệm trong JUnit, mà không sử dụng thử nghiệm Robolectric hoặc thiết bị. Điều này có thể dễ dàng đạt được và không mất nhiều effort.

Ở yêu cầu thứ 2, chúng ta chú ý đển điểm tại sao Architecture Components lại mang đến những điểm cải thiện cho khả năng test. Việc tách các thành phần giúp dễ dàng thay thế Activity bằng một thứ khác. Testing có thể hoạt động bình thường như Activity trong khi vẫn giữ mô hình thử nghiệm thực tế sử dụng tương tác với ViewModel.

Bây giờ chúng ta sẽ đi thảo luận về mục tiêu thứ 3

# IV. Viết test ViewModel hiệu quả
Trong buổi giới thiệu đầu tiên về  LiveData và ViewModel, câu hỏi được đặt ra: Đây có phải là RxJava không? Nó không phải, nhưng rõ ràng có một số điểm chung.

Có điều này trong tâm trí, cùng với thực tế rằng RxJava là thư viện được thử nghiệm rất tốt, chúng ta có thể lấy cảm hứng từ phương pháp thử nghiệm ở đó .Mỗi loại có một phương thức test () trả về TestObserver hoặc TestSubscacker để thực hiện các xác nhận kiểm tra ok

Chúng ta có thể triển khai TestObserver riêng của mình cho LiveData với các yêu cầu xác nhận, vì hiện tại chúng tôi sử dụng các công cụ như các phương thức mở rộng của Kotlin, chúng tôi có thể đạt được sự thoải mái giống như RxJava để có phương thức test () trên LiveData trực tiếp. Ví dụ: 

```
viewModel.counterLiveData()
  .test()
  .assertHasValue()
  .assertValue { it > 3 }
  .assertValue(4)
  .assertNever { it > 4 }
viewModel.plusButtonClicked() // internally increments counter
viewModel.counterLiveData()
  .test()
  .assertValue(5)
  .assertNever { it > 5}
...
```

Việc thực hiện điều này sử dụng phương thức mở rộng đơn giản để đăng ký LiveData và trả về TestObserver 
```
fun <T> LiveData<T>.test(): TestObserver<T> {  
  return TestObserver.test(this)
}
```

TestObserver là class Java, vì vậy bạn có thể sử dụng cách tiếp cận này ngay cả khi dự án của bạn chỉ sử dụng Java mà không có Kotlin. Sự khác biệt duy nhất sẽ là gọi static method:
```
TestObserver.test(viewModel.counterLiveData())
  .assertHasValue()
  ...;
```
Xin lưu ý rằng tất cả các thử nghiệm sử dụng LiveData hiện tại phải bao gồm InstantTaskExecutorRule từ android.arch.core:core-testing

# V. Tổng kết
Viết test như vậy đã hiệu quả chưa? có thể nói cũng đáp ứng được 3 mục tiêu đề ra ở trên.
Cảm ơn các bạn theo dõi bài viết.
nguồn: https://android.jlelse.eu/effective-livedata-and-viewmodel-testing-17f25069fcd4?fbclid=IwAR2Gz5kubbH92BQ4sPiJv8OmW_lvSAd0XXq9DSlqdQxeI5ZCKDwBauQcwqY