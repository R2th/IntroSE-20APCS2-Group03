# 1. Viết các test case chuyên sâu hơn từ một acceptance criteria

Những acceptance criteria được viết chi tiết và dễ hiểu có thể là người bạn tốt nhất của tester. Chúng cung cấp một cơ sở để viết các test case và quan trọng nhất là chúng thông báo cho team về chức năng mà business đang mong muốn.

![](https://images.viblo.asia/8b1c1471-3821-4e59-aabc-6ca1927f557d.png)

## 1.1. Mục đích của acceptance criteria không phải là xác định lỗi

![](https://images.viblo.asia/135b0e31-89d3-413d-b2a3-f46076624733.jpg)

Nếu developer đã thực hiện xong chức năng của họ trước khi gửi bản build qua cho QA, tất cả các bug sẽ được xác định và xử lý trước khi đến giai đoạn này. Nhưng tất nhiên sẽ có trường hợp cần thực hiện thay đổi vào phút cuối, ngay trước gửi bản build. Để đảm bảo không có lỗi lớn, tester phải luôn test kỹ về acceptance criteria trước khi chuyển sang bắt đầu chạy test case của họ.

## 1.2. Chuẩn bị sớm

![](https://images.viblo.asia/08033c15-a73b-4306-b873-3e4eb661f2e4.jpg)

Trước khi các test case có thể được viết, product owner, business hoặc khách hàng sẽ cần phải viết user story chi tiết và acceptance criteria, để thông báo cho team develop và tester về cách họ hình dung sản phẩm đầu cuối cùng. Đặt mình vào suy nghĩ của end-user có thể mang lại hiệu quả cao, cho phép họ làm việc logic thông qua tất cả các bước mà người dùng sẽ cần để sản phẩm đạt đến đích đến. Với tài liệu ít chi tiết, những hiểu lầm có thể phát sinh, dẫn đến một số điểm có khả năng vẫn chưa được test. Khi team QA nhận được user story, một cuộc họp lập kế hoạch để xem xét tất cả các user story để đảm bảo tất cả các chức năng được hiểu đầy đủ. Sau cuộc họp team, tester có thể tiếp tục viết test case của họ với user story. Với những tester tham gia vào cuộc họp lập kế hoạch, họ có thể cộng tác bằng cách giúp xử lý những điểm sau:

1. Business team tạo ra các requirement và acceptance criteria cho một user story.
2. QA xem xét và bắt đầu viết các test case.
3. Trong khi test các test case, QA xác định scenerio không được cover trong các requirement.
4. QA truyền đạt scenerio tới Business Analyst.
5. BA nhận ra một sự thay đổi theo requirement.

Nếu quá trình này diễn ra trước khi team develop bắt đầu hoặc hoàn thành code, nó sẽ ngăn các thay đổi acceptance criteria sau khi phần mềm được release. Xác định các thay đổi requirement sớm trong quy trình, tiết kiệm cho cả team một lượng thời gian và effort rất lớn.

## 1.3. Bắt đầu từ acceptance criteria

Hãy lấy một user story mẫu và thêm một vài acceptance criteria. Sau đó, chúng ta sẽ bắt đầu suy nghĩ để viết các test case.

### 1.3.1. Ví dụ về acceptance criteria và user story

```
As a recurring customer, I want to reorder items from my previous orders so I don’t have to search for them each time.

AC1. Order history option is displayed on accounts page.
AC2. Previously purchased items are displayed when clicking on order history.
AC3. User may add previously ordered items to the cart.
```

## 1.4. Hình dung quy trình làm việc

![](https://images.viblo.asia/7d877070-df2c-4509-b889-2d5dd0607667.jpg)

Cho dù bạn đã test web (hoặc app) trong nhiều năm hay đây là lần đầu tiên bạn test trang web này, hãy bắt đầu bằng việc trực quan hóa quy trình làm việc. Bạn thấy gì khi người dùng nhấp vào "Order history"? Điều gì xảy ra khi họ nhấp vào “Add to cart”? Nếu người dùng nhấp vào nút Back, thì cái gì được hiển thị? Nếu bạn biết rõ về ứng dụng này, có lẽ bạn có thể nhanh chóng hình dung ra điều này và bắt đầu với việc viết test case. Nếu bạn không quen thuộc với trang web, bạn sẽ muốn quan sát các quy trình công việc khác trong ứng dụng. Ví dụ: quan sát hành vi khi nhấp vào “Add to cart” từ kết quả tìm kiếm chung.

### 1.4.1. Create the Happy Path

Tôi luôn thích bắt đầu với happy path, một path không gặp phải lỗi hay ngoại lệ nào. Nó có thể bao gồm một tập lớn các bước để thực hiện và nếu nó không hoạt động trơn tru, phần còn lại của công việc của bạn có thể bị chặn lại. Trong ví dụ này, happy path sẽ như thế này:

1. Mua các mặt hàng từ tìm kiếm chung
2. Nhấp vào "Order history" từ trang tài khoản
3. Xác minh rằng các mục đã đặt trước đó được hiển thị
4. Thêm các mặt hàng vào giỏ hàng từ danh sách đặt hàng trước đó
5. Hoàn thành mua các mặt hàng đã đặt trước đó

Khi bản build được gửi cho tôi để test, đây sẽ là test case đầu tiên được thực thi.

### 1.4.2. Standard Items

![](https://images.viblo.asia/e7c48da1-875a-4b1b-aeb3-1d1ac3f68f68.png)

Một test case nhanh và dễ dàng khác trong ví dụ này, sẽ là để xác minh rằng các đối tượng tiêu chuẩn được hiển thị trên các trang. Các mục như tiêu đề, footer và menu tiêu chuẩn có thể dễ dàng bị bỏ qua nếu bạn không viết lại chúng trong test case. Tôi đã thấy các liên kết đến những thứ như điều khoản và điều kiện bị lỗi khi thêm một trang mới. Tạo các test case để xác minh các item tiêu chuẩn. Bạn có thể đã test chúng nhiều lần đến mức bạn chỉ mong chúng hoạt động và không xem xét đến chúng. Một test case sẽ cứu bạn khỏi bỏ lỡ điều này.

### 1.4.3. Negative Testing

Tất cả các trường hợp lỗi có thể xảy ra là gì? Dưới đây là một số ví dụ xuất hiện trong user story này:

1. Hết hàng rồi. Họ đã đặt hàng trước đó, nhưng bây giờ đã hết hàng. Thông tin này có hiển thị trên trang lịch sử đặt hàng không?
2. Giá đã thay đổi. Điều này được phản ánh trên trang lịch sử đặt hàng.
3. Sự cố hệ thống xảy ra. Những lỗi nào được hiển thị trên toàn bộ trang web khi xảy ra sự cố hệ thống? Tạo một test case để xác minh mọi lỗi được hiển thị khi cần.

### 1.4.4. Boundaries

1. Có bao nhiêu mặt hàng từ lịch sử đặt hàng sẽ được hiển thị? Nếu nó không nằm trong acceptance criteria, điều này cần được giải quyết với BA hoặc product owner. Developer có thể code chỗ này để hiển thị tất cả các mục từ lịch sử của khách hàng nhưng điều gì xảy ra khi người dùng có lịch sử đặt hàng 5.000 mặt hàng?
2. Mặt khác, nếu người dùng chưa bao giờ đặt hàng thì sao? Tùy chọn Lịch sử đơn hàng có nên được hiển thị trong trang tài khoản không? Nếu vậy, text nào được hiển thị khi người dùng điều hướng đến "Order history"?

Đây là những ví dụ về test giá trị biên tối đa và tối thiểu. Sau khi đặt câu hỏi như vậy, product owner hoặc BA có thể quyết định họ cần tạo thêm user story để thêm sắp xếp, lọc và phân trang.

# 2. Phần kết luận
Thoạt nhìn, có vẻ như các acceptance criteria bao gồm phần lớn những gì cần được test. Nhưng, như bạn có thể thấy từ ví dụ này, chúng tôi đã tạo ra rất nhiều test case chỉ với một chút suy nghĩ. Dành thời gian để xem xét quy trình làm việc, giá trị biên và các negative case và bạn sẽ tạo ra phạm vi test cho từng trường hợp vượt xa những gì bạn có thể nghĩ. Theo đó, bạn sẽ xác định được requirement và đặt các câu hỏi. Do đó, bạn sẽ ngăn chặn việc lack requirement, ngăn việc develop lại từ đầu và có tầm quan trọng sống còn, cứu toàn bộ team khỏi những sai lầm không cần thiết!

# 3. Tham khảo
- [Writing Test Cases from User Stories & Acceptance Criteria](https://blog.testlodge.com/writing-test-cases-from-user-stories-acceptance-criteria/)