## 1. Test Case là gì?

![](https://images.viblo.asia/b0b63e7c-3623-4001-a10a-71dd93731143.png)

Các test case giúp hướng dẫn tester thông qua một chuỗi các bước để xác thực xem application có lỗi hay không và hoạt động theo yêu cầu của người dùng hay không. Học cách viết các test case đòi hỏi các kỹ năng viết cơ bản, chú ý đến chi tiết và tester phải hiểu rõ về application được test.

Thông thường, các test case được viết cho một mô-đun nhất định hoặc một phần của application, được nhóm thành một test suite. Không phải thông thường, một phiên test sẽ bao gồm nhiều test case vì thường sẽ có nhiều hơn một kịch bản cụ thể được test.

## 2. Một test case được viết tốt sẽ cho phép bất kỳ tester nào cũng hiểu được và thực hiện được test.

![](https://images.viblo.asia/82be0c6e-9c37-4e4b-8b4d-08a884344371.jpg)

Khi viết test case, điều quan trọng là bạn phải đặt mình vào vị trí của người dùng và nghĩ về tất cả những điều bạn cho là cần thiết để application hoạt động đúng. Trước tiên là bạn phải nổ lực để viết các test case tốt trước sẽ giúp bạn tiết kiệm thời gian và công sức sau này. Các test case được viết tốt sẽ tạo ra sự khác biệt giữa một application được test tốt và một application được test không tốt.

Viết các test case - đặc biệt là viết một số lượng lớn trong cùng một lúc - có thể là một công việc tốn thời gian. Ở đây, chúng ta sẽ nghiên cứu một số mẹo về cách viết các test case, cùng với một mẫu của một test case ở cuối bài viết này.

## 3. Cách viết test case cho phần mềm:

### 3.1. Sử dụng một tiêu đề rõ ràng

![](https://images.viblo.asia/6be6d221-34a7-44b4-93e3-e9b62e985dc5.jpg)

Một test case tốt bắt đầu với một tiêu đề rõ ràng. Như một best practice, tốt nhất là đặt tên cho test case cùng với tên mô-đun mà bạn đang test. Ví dụ: nếu bạn đang test trang login, hãy thêm "[Login Page]" vào trong tiêu đề của test case. Trong một số trường hợp, nếu công cụ bạn đang sử dụng chưa làm điều này, thì bạn cũng nên thêm vào một mã định danh duy nhất trong tiêu đề của test case, khi đó, định danh có thể được tham chiếu thay vì tiêu đề dài

### 3.2. Phải có một mô tả rõ ràng

Mô tả sẽ cho tester biết họ sẽ test cái gì. Đôi khi phần này cũng có thể bao gồm các thông tin khác như môi trường test, dữ liệu test và các điều kiện tiên quyết/giả định. Một mô tả phải dễ đọc và ngay lập tức truyền đạt mục tiêu test.

### 3.3. Nên chứa giả định và điều kiện tiên quyết

Bạn nên có một giả định bất kỳ nào áp dụng cho test và bất kỳ điều kiện tiên quyết nào phải được đáp ứng trước khi test được thực hiện. Thông tin này có thể bao gồm trang nào người dùng nên bắt đầu test, phụ thuộc vào môi trường test và bất kỳ yêu cầu thiết lập đặc biệt nào phải được thực hiện trước khi chạy test. Thông tin này cũng giúp giữ cho các bước test ngắn gọn và súc tích.

### 3.4. Giữ các bước test rõ ràng và súc tích

Các test case nên đơn giản. Hãy nhớ rằng, người viết test case có thể không phải là người thực hiện chính bài test đó. Các bước test phải bao gồm dữ liệu và thông tin cần thiết về cách thực hiện test. Đây có lẽ là phần quan trọng nhất của một test case. Giữ phần này rõ ràng và súc tích, nhưng đừng bỏ qua bất kỳ chi tiết cần thiết nào. Viết một test case để bất cứ ai cũng có thể xem và thực hiện test.

### 3.5. Phải chứa kết quả mong đợi

Kết quả mong đợi sẽ cho tester biết họ nên nhận được gì khi thực hiện các bước test. Đây là cách tester xác định xem test case pass hay fail.

### 3.6. Nên viết test case có thể tái sử dụng được

Một test case tốt có thể tái sử dụng và có giá trị lâu dài cho testing team của bạn. Khi viết một test case, hãy ghi nhớ điều này. Bạn có thể tiết kiệm thời gian xuống bằng cách sử dụng lại test case thay vì viết lại.

## 4. Mẫu của một test case
Dưới đây là một ví dụ về test case:

**Title**: [Login Page] Login successfully.

**Summary**: Verify if a user will be able to login with a valid username and valid password.

**Pre-condition**: User created an account before.

**Step by Step**

```
1. Navigate to [Login] page
2. Input username is correct
3. Input password is correct
4. Tap on [Login] button
5. Observe
```

**Expected result**: Login successfully when entering username and password are correct 

## 5. Công cụ để viết test case

Không có một phương pháp chính xác để viết lại nội dung các test case của bạn, nhưng có nhiều công cụ giúp quá trình viết các test case hiệu quả. Ví dụ, các test case thường được viết trong file excel. Nhiều testing team vẫn lựa chọn phương pháp này. Nó khá linh hoạt, bạn có thể tạo quy trình và phương pháp theo dõi các test case của riêng mình, nhưng nó cũng có thể cực kỳ tốn thời gian và cồng kềnh.

Một số team sử dụng các công cụ quản lý dự án để ghi lại các test case của họ. Đây là một thay thế tuyệt vời cho excel vì có khả năng share giữa các member trong team

Với một công cụ dành riêng cho các test case, bạn có thể viết các test case của mình, thực hiện các test của mình, báo cáo kết quả và cộng tác với nhóm của bạn trong mỗi bước của quy trình.

## 6. Lợi ích thêm của viết test case

Việc luyện tập viết test case giúp cho testing team có thể coverage được nhiều case nhất có thể xuyên suốt application, nhưng việc viết các test case thậm chí có tác động hơn đến việc đảm bảo chất lượng và trải nghiệm người dùng.

Các test case sẽ giúp phát hiện ra rất nhiều bug sớm; điều đó có thể giúp cải thiện chất lượng product của bạn. Dưới đây là một số lợi ích thêm khi viết test case:

- Bạn sẽ tìm thấy những lỗi trong thiết kế sớm hơn
- Bạn sẽ tìm thấy các vấn đề về khả năng sử dụng
- Những thành viên mới có thể nhận và test application mà không cần phải đào tạo nhiều
- Nó có thể tạo sự đồng cảm với người dùng của bạn
- Nó giúp bạn và những người khác hiểu về product

Khi viết test case bạn đã đặt bạn vào vị trí của người dùng, điều này tạo nên sự đồng cảm cho những người dùngthực sự sẽ sử dụng product của bạn. Điều này có thể giúp dễ dàng feedback trở lại về thiết kế và quá trình phát triển. Khi bạn viết các test case, bạn sẽ xác định các vấn đề và các điểm cần cải thiện, những vấn đề này có thể được giải quyết trước khi application được đưa lên production.

Viết test case có nghĩa là bất kỳ thành viên nào mới đều có thể dễ dàng tăng tốc độ làm việc trên dự án mà không cần đào tạo nhiều. Cuối cùng, các test case phác thảo chính xác cách sử dụng product và những gì được mong đợi.

Một bộ các test case tốt sẽ giúp các thành viên khác trong team có thể share cho người khác để dễ dàng tìm hiểu về dự án. Hãy nghĩ về việc hỗ trợ khách hàng. Team hỗ trợ có thể duyệt các test case để hiểu các tính năng sắp tới sẽ hoạt động như thế nào. Họ có thể sử dụng những test case đó để viết tài liệu kỹ thuật và nội dung trợ giúp.

## 7. Phần kết luận

Viết các test case cần phải thực hành và có hiểu biết về phần mềm đang được test. Các test case được viết tốt có thể làm cho quá trình test của bạn trơn tru hơn và giúp bạn tiết kiệm thời gian trong quá trình sau này. Hãy dùng một công cụ để bạn có thể quản lý và sắp xếp các test case của mình một cách hiệu quả.

## Tham khảo
- https://blog.testlodge.com/how-to-write-test-cases-for-software-with-sample/