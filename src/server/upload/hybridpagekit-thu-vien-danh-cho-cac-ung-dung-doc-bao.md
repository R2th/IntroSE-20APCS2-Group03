Như các bạn đã biết thì bài viết là sự kết hợp của HTML, CSS, JS gồm có các đoạn văn bản với hình ảnh và video đan xen vào với nhau.
Để đáp ứng hiển thị trên nhiều nền tảng web, mobile web thì mobile app phải sử dụng Webview để tải và render HTML trở thành giải pháp bắt buộc cho các ứng dụng đọc báo.

Chúng ta hãy tìm hiểu qua 1 chút về UIWebView và WKWebView.
## 1. UIWebView vs WKWebView

### Độ ổn định

- UIWebView có rất nhiều WebCore, JavaScriptCore crash, và rỏ rỉ bộ nhớ hệ thống có thể gây ra OOM, đó là một mối nguy hiểm lớn cho sự ổn định của ứng dụng.
- WkWebView dựa trên quy trình độc lập, không chiếm bộ nhớ ứng dụng và không dẫn đến app crash. Vì vậy về độ ổn định thì WKWebView có ưu thế hơn.

### Tốc độ

- WKWebView tối ưu hoá đáng kể tốc độ của JS thông qua JIT, nhưng đối với ứng dụng đọc báo thì việc tải và render HTML của WKWebView chậm hơn nhiều so với UIWebView.

### Khả năng tương thích

- NSURLProtocol, xoá cache trên iOS8, cấu hình cookies và UA, thực thi bất đồng bộ JS.
- Một loạt vấn đề đã trở thành thách thức lớn nhất để thay thế WKWebView.
 
### Khả năng mở rộng

- WKWebView có nhiều interface, hỗ trợ HTML và CSS nhiều hơn và tương tác JS thân thiện hơn.
- Đồng thời việc cập nhật liên tục API và cộng đồng tích cực là những lợi thế lớn về mặt sự dụng lâu dài.

Với việc sử dụng **HybridPageKit** thì các vấn đề của WKWebView đã được giải quyết ở một mức độ lớn và nó đã phát huy hiệu quả rất tốt.

## 2. Kết hợp WebView với các UI khác

Với các ứng dụng đọc báo, 1 WebView không thể đáp ứng giao diện và logic phức tạp. 
Các bạn có thể xem ví dụ như bài viết sau đây: Với việc trong bài viết có QC Google, Video, Image thì việc WebView tải và render UI như trên là không thực tế.

![](https://images.viblo.asia/6cde5fc2-1315-4e1e-a0b5-1d6ccf91c810.PNG)
![](https://images.viblo.asia/d9d08e20-885a-43cc-a233-54d5febc2413.PNG)
![](https://images.viblo.asia/57cd5f4f-dd7a-438a-b4f6-65279ee7b11e.PNG)

Ở đây mình sẽ nêu ra 2 cách để xử lý việc kết hợp nhiều UI với nhau.

### Sử dụng TableView

![](https://images.viblo.asia/e4cd7bac-8302-4280-8ec2-c512daae9ea8.png)

#### Nguyên lý:

- Do có nhiều mô-đun kết hợp trong bài viết như bài viết liên quan, bình luận .., nên cách thực hiện đơn giản nhất là các mô-đun này được xử lý bởi TableView. 
- Để thực hiện được việc này có 2 cách như hình trên: TableView được chèn vào WebView đựa trên contentInset và WebView là header của TableView.

#### Ưu điểm:

- Giải pháp này tương đối đơn giản và dễ dàng để nhận ra bố cục của từng mô-đun. 
- Đồng thời, dựa vào TableView nó có thể dễ dàng xử lý linh hoạt việc cập nhât, thêm, xoá từng mô-đun. Sự kết hợp với WebView cũng mượt mà.

#### Nhược điểm:

- Giải pháp này khó có thể tái sử dụng lại UI và logic mô-đun. Bố cục của UI lại phụ thuộc vào chế độ của TableView và tính linh hoạt của nó kèm.
- Với sự gia tăng của các loại thành phần, các kiểu view khác nhau không tái sử dụng được tableView cell.
- Đồng thời, nó cũng ảnh hưởng đến việc render của WebView hoặc TableView, và khó khăn trong việc maintain sau này.
- Hơn nữa, việc sử dụng header và inset rất khó thực việc để thêm UI ở đầu như pullToRefresh.

### Sử dụng ScrollView

![](https://images.viblo.asia/41593109-fb09-44e9-92f6-1eb7e9970cdb.png)

#### Nguyên lý:

- Giải pháp này sử dụng ScrollView làm container và các thành phần như WebView và các mô-đun tương ứng như là các subView.
- Tất cả subView không được phép scroll và tất cả sự kiện scrolling được xử lý ở container.
- Đối với các subView trong scrollView nếu contentSize nhỏ hơn chiều cao của màn hình nó sẽ được sử dụng như view bình thường, nếu không nó sẽ được set chiều cao màn hình và tính toán lại offset và frame.
- Nó sẽ tự động điều chỉnh view liên quan đến frame của container và chỉnh contentOffset để đạt được hiệu ứng scroll.

#### Ưu điểm:

- Giải pháp này hoàn toàn độc lập với việc triển khai từng mô-đun, làm cho UI và logic đối ứng với nhau.
- Và việc render HTML là độc lập.
- Các mô-đun được tải và bố trí linh hoạt, dễ dàng quản lý và tái sử dụng.
- Thật dễ dàng để thêm và xoá các mô-đun. Khả năng linh hoạt và tái sử dụng được cải thiện rất nhiều.

#### Nhược điểm

- Bởi vì giải pháp này cần tính toán lại offset của scrollView, frame và offset của các mô-đun rất là phức tạp.
- May mắn HybridPageKit đã xử lý việc này rất tốt.

## 3. Hiển thị các UI phức tạp trong WebView

Với các thành phần phức tạp như video, image, music có thể là cả bản đồ thì sẽ làm giảm đáng kể tốc độ render của WebView và sẽ làm tăng thêm thời gian để phát triển và bảo trì sau này.

### Khó khăn trong giao diện người dùng và tương tác phức tạp

- Để có trải nghiệm tốt hơn, các bài viết thường thêm nhiều nội dung hơn như phát video liên tục, bản đồ, tap vào ảnh để mở toàn màn hình, phát hiện mã QR ...
- Kết quả logic làm tăng CSS và JS, tăng giao tiếp giữa app và web; và một lượng lớn sử dụng LocalStorage và bộ đệm HTTP.
- Do đó với các giao diện phức tạp mà chỉ sử dụng webView để hiển thị sẽ rất khó khăn và làm cho chi phí phát triển và bảo trì sau này tăng lên.

### Hiển thị hình ảnh

- Cách đơn giản nhất để hiển thị hình ảnh trong WebView là gắn các thẻ <img> trong bài viết, và nó phụ thuộc vào việc tải xuống và hiển thị của chính webView.
- Tuy nhiên tính linh hoạt của cách này tương đối thấp.
- Ứng dụng không thể kiểm soát hợp lý thời gian tải xuống cũng như không thực hiện được cache và cắt ảnh nếu cần.
- Để đồng thời với tính linh hoạt và rút ngắn thời gian tải hình ảnh, HybridPageKit đã thay thế tất cả các hình ảnh trong WebView thành các UIImageView.
- Nó có thể giảm quá trình và giao tiếp không cần thiết, cải thiện đáng kể tốc độ tải.

### Thay thế tất cả UI trong webView thành native ngoài trừ text

![](https://images.viblo.asia/999ebdd9-f0af-4c63-8614-c66d7e2dba04.png)

- Để giảm chi phí phát triển và bảo trì các UI phức tạp và các mô-đun tương tác phức tạp, giảm logic giao tiếp giữa Web và App, cải thiện tốc độ hiển thị mô-đun trong WebView.
- HybridPageKit đã thay tất cả các thành phần không phải là văn bàn thành các UI native.

#### Sử dụng empty div

- Kết hợp với template và dữ liệu từ server, tất cả các thành phần không phải là text để ánh xạ thành các thẻ div mà được kết hợp với ID để định danh sau này.
- Đối với đồng bộ hoá dữ liệu, kích thước của các component có thể được set ngay lúc đầu hoặc cập nhật sau này.

#### Lấy frame thông qua JS khi quá trình render kết thúc

- Khi webView render kết thúc, nó sẽ lấy tẩt cả các thẻ div với frame và id thông qua JS

#### Thêm các native view

- Khi JS trả về tất frame thì các native component cũng được update frame dựa trên id

## 4. Tái sử dụng các component trong ScrollView

- Sau khi thay đổi tất cả các thành phần không phải text thành các native component
- Số lượng hình ảnh, video .. sẽ tăng lên rất nhiều do đó nếu không thể tái sử dụng các component trên thì sẽ phải đối mặt với 2 vấn đề: hiệu năng và bộ nhớ
- Đồng thời, để cải thiện trải nghiệm người dùng sẽ cần tính toán vị trí của từng thành phần khi scroll.

### Các cách cho phép tái sử dụng trong scrollView

- LazyScrollView(https://github.com/alibaba/LazyScrollView) một scrollView cho phép reuse các component.
- ReusableNestingScrollview(https://github.com/dequan1331/ReusableNestingScrollview)

### Tái sử dụng các thành phần trong WebView

![](https://images.viblo.asia/4117d3b9-fafd-4792-847a-c550d3ae38aa.png)

- ReusableNestingScrollview mở rộng các delegate của scrollView để xử lý subView reuse
- Do đó việc reuse và recovery của tất cả subView thì không cần phải kế thừa
- Bởi vì view cần được reuse thì data state của view phải được lưu vào trong object.
- Nó không chỉ dễ dàng để mở rộng mà còn tối ưu logic của việc tái sử dụng.
- Và việc cache lại thông tin giống như frame giúp tối ưu quá trình render layout.

### Tái sử dụng các thành phần khác trong ScrollView

![](https://images.viblo.asia/44b8990d-853f-466e-a8ca-3ecaa5ebc7f3.png)

- Sau khi thay đổi tất cả các thành phần không phải text sang native và giải quyết vấn đề tái sử dụng trong webView.
- Chúng ta áp dụng triển khai cho các thành phần khác trong scrollView như bài viết liên quan, bình luận

Đây là link framework: https://github.com/dequan1331/HybridPageKit
Bài tiếp theo mình sẽ làm ứng dụng demo để mô tả cách sử dụng thực tế.