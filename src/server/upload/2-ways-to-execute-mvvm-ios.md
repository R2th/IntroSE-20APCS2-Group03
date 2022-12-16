Đối với việc phát triển ứng dụng dành cho thiết bị di động, MVVM là kiến trúc hiện đại. Nó thực hiện phân tách mối quan tâm tốt hơn để làm cho mã sạch hơn. Như chúng ta đã thảo luận trong bài viết trước, MVVM đã cải thiện giao tiếp giữa logic nghiệp vụ và View bằng cách liên kết các biến trong ViewModel với các phần tử ViewController. Bài viết này sẽ giới thiệu hai cách để thực hiện MVVM.
   
###    MVVM with Swift

Để thực hiện hai cách binding  mà không phụ thuộc, chúng ta cần tạo Observable của riêng mình. Đây là đoạn mã dưới đây:
 ![](https://images.viblo.asia/62d4207f-8f42-4876-b9dd-e3a2c2494cb5.png)

Observable <T> là một lớp tuỳ chỉnh có thể giữ giá trị kiểu T.Nếu giá trị thay đổi thì kích hoạt didSet, mà gọi hàm liên kết, chuyển giá trị trở lại người gọi. Để biết một ví dụ cụ thể, hãy kiểm tra mã ở đây: 
    ![](https://images.viblo.asia/e1dd3ca7-80a8-45c4-a876-735d8d884f7f.png)
    ![](https://images.viblo.asia/7709b35e-a1d5-4c67-b5e8-9490b6c2159a.png)
    ![](https://images.viblo.asia/08d9a68e-b690-4390-bb90-7eb2a70e0ee1.png)
    ![](https://images.viblo.asia/7e6c9f64-c61d-4449-8cbd-348ee0290725.png)
    ![](https://images.viblo.asia/a78fe53f-4483-44d9-9af3-b804a1afccc5.png)
    
    
   Nếu chúng ta tập trung vào phần 1, chúng ta có cellViewModels liên kết với reloadTableViewClosure, isLoading liên kết với updateLoadingStatus và alertMessage liên kết với showAlertClosure.
    
Trong ViewController, chúng tôi bind các closures với các phần tử UI, chúng ta có thể trigger( kích hoạt ) các yêu cầu không đồng bộ hoá nào trong viewModel.Trong đoạn mã trên, nó là số 3 initFetch (). Nó yêu cầu API và nếu xảy ra lỗi, nó sẽ cập nhật alertMessage, nếu yêu cầu thành công, nó sẽ cập nhật biến cellViewModels.  Cả hai thay đổi biến sẽ cập nhật giao diện người dùng trong ViewController.
   
   Ở đó chúng ta có ràng buộc hai chiều.
    
### MVVM with RxSwift
    
   Với RxSwift, việc ràng buộc hai chiều trở nên dễ dàng hơn. Đây là mã: 
    
  ![](https://images.viblo.asia/48676c12-4260-4a82-8d37-54c8aa04494d.png)
  ![](https://images.viblo.asia/21247062-45f5-4ac4-b67e-8641acacaad2.png)
   ![](https://images.viblo.asia/c9be0f61-4296-4b36-8bb8-73e908e31e8f.png)

   Trong đoạn mã trên, chúng ta có thể dễ dàng xác định Đầu vào (Input) giữ biến quan sát để chấp nhận sự kiện từ ViewController và Đầu ra (Output) với biến quan sát để ràng buộc các phần tử UI trong ViewController. Hàm init  phụ thuộc và xử lý dữ liệu từ API và khởi tạo Đầu vào (Input) và Đầu ra (Output).
    
  Đây là mã ViewController:
  
   ![](https://images.viblo.asia/d0f149de-7acc-4313-ae75-c23afbb86a56.png)
   ![](https://images.viblo.asia/017aeb15-23fd-4fba-9265-d1f438fadf50.png)
   ![](https://images.viblo.asia/73f5406e-e1f8-42ee-82ae-22626f108636.png)
  ![](https://images.viblo.asia/4f8a783e-6142-44ff-8ff7-0215cd4e7005.png)

Trong ViewDidLaod (), chúng tôi áp dụng setupBinding () và setupErrorBinding () để liên kết các phần tử UI với các phần tử có thể quan sát được trong ViewModel. Khi tất cả ràng buộc đã sẵn sàng, chúng ta có self.articleViewModel.input.reload.accept (()) để kích hoạt luồng dữ liệu. Sau đó, chúng tôi có dữ liệu không đồng bộ từ Api có thể tự động phản ánh trên ViewController.
    
###     Final Thoughts
    
   Dưới đây là các biểu đồ để hiển thị cách hoạt động của ràng buộc hai chiều.
    
   ![](https://images.viblo.asia/24ebaea8-a00d-48d6-a0ee-744af76438be.png)
    
  Trước khi yêu cầu dữ liệu, các phần tử UI phải ràng buộc Đầu ra(Output) và Đầu vào(Input) trong ViewModel trước. Nó giống như đường hầm được xây dựng lên.
    
  Sau đó, chúng ta có thể kích hoạt luồng dữ liệu, đây là biểu đồ. ViewController có thể có nhiều phần tử giao diện người dùng liên kết với nhiều đầu vào và đầu ra. Với luồng dữ liệu này, mã sẽ dễ đọc và ngắn gọn hơn.
    
   ![](https://images.viblo.asia/4debe026-2e63-4c29-85a6-7f3450bd5754.png)
    
   MVVM với Rxswift không hoàn hảo, Dưới đây là những nhược điểm khiến Rxswift không trở thành lựa chọn tốt nhất.
1.    Đường cong học tập: Đường cong học tập sâu sắc khiến việc đưa các nhà phát triển mới vào dự án trở nên khó khăn (và về cuối dự án, hoàn toàn không thực tế). Đây là lý do số 1 mà chúng tôi nên xem xét tránh RxSwift: khi đến thời điểm ra mắt, chúng tôi sẽ không thể thêm các nhà phát triển vào dự án trừ khi họ đã là những người kỳ cựu của Rx.
1. Gỡ lỗi các phép biến đổi dữ liệu Rx thật kinh khủng. Khi Rx đang hoạt động như dự định, nó sẽ trở nên kỳ diệu. Khi nó gặp sự cố, quá trình gỡ lỗi sẽ khó khăn hơn đáng kể. Bất kỳ điểm ngắt nào bạn nhấn trong luồng dữ liệu sẽ hiển thị hơn 40 điểm truy cập ngược mục nhập với hàng chục phương pháp Rx nội bộ khó hiểu phân tách và che khuất mã chúng tôi thực sự đã viết.
    
    
RxSwift có thể không cắt giảm đáng kể thời gian phát triển về tổng thể. Nó chỉ chuyển các vấn đề thành một số vấn đề mới. Nếu nhóm chưa sẵn sàng cho Rx và thực sự khó tìm thấy các nhà phát triển RxSwift trên thị trường, thì Rx có thể không phải là lựa chọn tốt nhất. Cá nhân, Tôi luôn sử dụng MVP kết hợp với MVVM và Rxswift. Tôi tin rằng Rxswift có thể giải quyết các vấn đề bất đồng bộ một cách suôn sẻ nhưng chúng tôi gặp rất nhiều trường hợp không có yêu cầu không đồng bộ hóa. Trong trường hợp này, MVP hoàn toàn ổn.
    
    Nguồn bài viết :    https://levelup.gitconnected.com/2-ways-to-execute-mvvm-ios-5c47d60ebcd0