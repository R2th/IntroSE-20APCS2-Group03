Model-View-Presenter trong Android

Có rất nhiều bài viết và ví dụ về kiến trúc MVP và có rất nhiều cách implement khác nhau. Và cộng đồng Android developers đang nỗ lực để implement pattern này với project Android một cách tốt nhất có thể. 
Nếu bạn quyết định áp dụng pattern này, bạn đang thực hiện một lựa chọn kiến trúc và bạn phải biết rằng codebase của bạn sẽ thay đổi, cũng như cách của bạn để tiếp cận các tính năng mới. Bạn cũng phải biết rằng bạn cần phải đối mặt với các sự cố phổ biến của Android như Activity lifecycle  và bạn có thể tự hỏi mình các câu hỏi như:
Nên lưu trạng thái của presenter không?
Nên có lifecycle cho presenter hay không?

Trong bài viết này, tôi sẽ đưa ra một danh sách các nguyên tắc khi implement MVP Pattern:

![](https://images.viblo.asia/b1c35ec5-d23c-4408-bf4e-e27771842fe3.jpg)

Model: nó là một interface chịu trách nhiệm quản lý dữ liệu. Trách nhiệm của Model bao gồm sử dụng API, caching data, quản lý cơ sở dữ liệu, v.v. Model cũng có thể là một interface giao tiếp với các module khác.
Presenter:  là trung gian giữa người Model và View. Tất cả logic trình bày của bạn đều thuộc về nó. Presenter có trách nhiệm truy vấn Model và cập nhật View, xử lý tương tác của người dùng khi cập nhật Model.
View: nó chỉ chịu trách nhiệm trình bày dữ liệu theo cách mà Presenter quyết định. View có thể được thực hiện bởi các Activity, Fragments, bất kỳ widget Android hoặc bất cứ thứ gì có thể thực hiện các hoạt động như hiển thị ProgressBar, cập nhật một TextView, điền vào một RecyclerView .v.v.

Có 1 số quy tắc để implement pattern này dựa trên quan điểm cá nhân của tôi:
1. Làm cho View trở nên Passive:
Một trong những vấn đề lớn nhất của Android là View(Activities, Fragments,…) không dễ dàng để test vì tính phức tạp của framework.  Để giải quyết vấn đề này, bạn nên triển khai Passive View pattern, việc thực hiện pattern này làm giảm hành vi của View xuống mức tối thiểu bằng cách sử dụng một bộ điều khiển, trong trường hợp của chúng ta là Presenter. Lựa chọn này giúp cải thiện đáng kể khả năng test view.
Ví dụ: nếu bạn có biểu mẫu tên người dùng / mật khẩu và nút “submit”, bạn sẽ không viết logic để xác thực bên trong View mà hãy viết bên trong Presenter. View của bạn chỉ cần thu thập tên người dùng và mật khẩu và gửi cho Presenter.

2. Làm cho Presenter trở nên độc lập:
Để làm cho nguyên tắc trước đó thực sự hiệu quả (cải thiện khả năng test), hãy đảm bảo rằng Presenter không phụ thuộc vào các class của Android. Và hãy trừu tượng hóa Presenter. từ đó bạn có thể viết các bài unit test không có dụng cụ cho Presenter, chạy thử nghiệm nhanh hơn trên JVM cục bộ của bạn và không cần có máy ảo.

3. Viết một interface để mô tả sự tương tác giữa View và Presenter
Khi bạn định viết một tính năng mới, bạn nên viết một interface ở bước đầu tiên. Interface mô tả giao tiếp giữa View và Presenter, nó giúp bạn thiết kế theo cách tương tác rõ ràng hơn.
Tôi thích sử dụng giải pháp được Google đề xuất trong kho Android Architecture: nó bao gồm một interface với hai interface bên trong, một cho View và một cho Presenter.

![](https://images.viblo.asia/f7f49a9f-2d8c-49e8-b6a1-554f01b93edf.png)

4. Define quy ước đặt tên để phân chia trách nhiệm
Presenter nói chung có thể có hai loại methods:
Action (load () chẳng hạn): chúng mô tả những gì Presenter làm
User events (queryChanged(...) chẳng hạn): chúng là những hành động được kích hoạt bởi người dùng như “nhập vào TextView để tìm kiếm” hoặc “nhấp vào một mục danh sách”.
Bạn có nhiều hành động hơn, nhiều logic hơn nằm trong View. Thay vào đó, các sự kiện của người dùng sẽ do Presenter quyết định phải làm gì. Ví dụ: tìm kiếm chỉ có thể được khởi chạy khi ít nhất một số ký tự cố định được người dùng nhập. Trong trường hợp này, View chỉ gọi phương thức queryChanged (...) và Presenter sẽ quyết định thời điểm khởi chạy tìm kiếm mới áp dụng logic này.
Phương thức loadMore (), thay vào đó, được gọi khi người dùng cuộn đến cuối danh sách, sau đó người Presenter một trang kết quả khác. Lựa chọn này có nghĩa là khi người dùng cuộn đến cuối, View sẽ biết rằng một trang mới phải được tải. Để “đảo ngược” logic này, tôi có thể đặt tên phương thức onScrolledToEnd () để cho Presenter cụ thể quyết định phải làm gì.

5. Không tạo các callback kiểu vòng đời Activity trong giao diện Presenter
Với tiêu đề này, có nghĩa là Presenter không nên có các phương thức như onCreate (...), onStart (), onResume () vì một số lý do:
Bằng cách này, Presenter sẽ được kết hợp đặc biệt với vòng đời Activity. Nếu tôi muốn thay thế Activity bằng Fragment thì sao? Khi nào tôi nên gọi phương thức presenter.onCreate (state)? Trong phần onCreate (...) của Fragment, onCreateView (...) hoặc onViewCreated (...)? Nếu tôi đang sử dụng chế độ Custom View thì sao?
Presenter không nên có một vòng đời quá phức tạp. Thực tế là các thành phần chính của Android được thiết kế theo cách này, không có nghĩa là bạn phải phản ánh hành vi này ở mọi nơi. Nếu bạn có cơ hội để đơn giản hóa, hãy làm điều đó.
Thay vì gọi một phương thức có cùng tên, trong vòng đời Activity, bạn có thể gọi hành động của Presenter. Ví dụ, bạn có thể gọi load () ở cuối Activity.onCreate (...).

6. Presenter có mối quan hệ 1 : 1 với chế độ xem
Presenter không có ý nghĩa nếu không có View. Nó đi kèm với View và huỷ khi View bị phá hủy. Nó quản lý một View tại một thời điểm.

7. Không lưu trạng thái bên trong Presenter
Ý tôi là sử dụng một Bundle. Bạn không thể làm điều này nếu bạn muốn tôn trọng điểm 2. Bạn không thể serialize data vào một Bundle vì Presenter sẽ được kết hợp với class Android.

8. Không cố gắng khôi phục Presenter
Tôi không thích giải pháp này chủ yếu bởi vì tôi nghĩ rằng Presenter không phải là điều chúng ta nên retain, nó không phải là một lớp dữ liệu, rõ ràng.

9. Cung cấp bộ nhớ cache cho Model để khôi phục trạng thái View
Theo tôi, việc giải quyết vấn đề "khôi phục trạng thái" đòi hỏi phải thích nghi một chút kiến trúc ứng dụng. Một giải pháp tuyệt vời phù hợp với suy nghĩ này đã được đề xuất trong bài viết này. Về cơ bản, tác giả đề xuất lưu trữ kết quả bằng cách sử dụng interface như Kho lưu trữ hoặc bất kỳ thứ gì có mục đích quản lý dữ liệu, phạm vi ứng dụng chứ không phải Activity (để có thể tồn tại để thay đổi định hướng).