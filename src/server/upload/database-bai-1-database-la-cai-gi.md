Như vậy là chúng ta lại bắt đầu một `Sub-Series` mới của [Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m) để tìm hiểu những kiến thức bổ trợ cho tiến trình xây dựng một trang blog cá nhân đơn giản. Trong `Sub-Series` mới này, chúng ta sẽ tìm hiểu về một vài phương thức lưu trữ dữ liệu phổ biến và ứng dụng của những phương thức này. Và điểm khởi đầu của chúng ta vẫn giống như các `Sub-Series` khác, đó là câu hỏi định nghĩa đơn giản - `Cơ sở dữ liệu là cái gì?`.

Ừ thì là... một cơ sở... nơi mà có lưu trữ dữ liệu. :D

## Có thể nào trả lời cụ thể hơn một chút được không?

Thực tế thì cụm từ `cơ sở dữ liệu` hay `database`, cũng giống như rất nhiều khái niệm khác trong cuộc sống của chúng ta và thường được hiểu với những ý nghĩa có hơi khác nhau một chút tùy vào ngữ cảnh của câu chuyện. Nếu là câu trả lời mang tính chất học thuật và yêu cầu độ chuẩn về ngôn từ thì mình không thể giúp bạn tốt hơn Wikipedia hay Google được, còn nếu là một câu trả lời chia sẻ lại ở dạng kinh nghiệm bản thân thì... đây -

Bạn cứ chọn một vị trí đặt góc nhìn là nơi cần sử dụng tới dữ liệu, ví dụ như là bạn đang viết một phần mềm và gửi yêu cầu truy vấn dữ liệu tới một kho tài nguyên nào đó kiểu như Github, YouTube, v.v... thì những kho tài nguyên đó có thể được xem là `database` đối với phần mềm của bạn. 

Hoặc là nếu phần mềm bạn đang viết hoạt động dựa trên dữ liệu được cung cấp bởi một phần mềm khác trong máy tính của bạn, thì phần mềm đang cung cấp dữ liệu kia cũng có thể được xem là `database` đối với phần mềm của bạn.

Hoặc, nếu phần mềm bạn đang viết không tương tác với một nguồn dữ liệu nào như trên mà tự thực hiện lưu trữ dữ liệu trong một hay nhiều tệp tĩnh, thì những tệp đó cũng có thể được xem là `database` đối với phần mềm của bạn.

> Bất kỳ một nguồn dữ liệu nào mà chúng ta có thể phát động các thao tác như - truy vấn, thêm mới, chỉnh sửa, và xóa các thông tin lưu trữ - thì đều có thể được xem là một `cơ sở dữ liệu` hay `database`.  
> *_Một người đang học lập trình*

Cũng như tất cả những khái niệm lập trình khác mà chúng ta đã đi qua trong hành trình `Tự Học Lập Trình Web Một Cách Thật Tự Nhiên`, đâu đó ở một thời điểm sau này, chúng ta sẽ xem lại định nghĩa `database` nói trên. Nhưng ở đây và bây giờ thì chúng ta hãy cứ ghi nhớ ngắn gọn vậy được không? :D

## Vậy chúng ta sẽ sử dụng kiểu database nào trong số những trường hợp trên?

Xuất phát từ lý do mà chúng ta bắt đầu `Sub-Series` này, mục tiêu gần nhất và quan trọng nhất mà chúng ta đang hướng đến đó là để xây dựng một blog cá nhân đơn giản. Do đó chúng ta sẽ khởi đầu với việc tìm hiểu phương thức lưu trữ và quản lý dữ liệu bằng các tệp tĩnh. Sau đó chúng ta sẽ tìm hiểu thêm về hai trường hợp còn lại để bổ sung kiến thức và mở ra thêm những khả năng mới cho những ý tưởng phần mềm xuất hiện sau này.

## Lưu trữ dữ liệu bằng các tệp thì có gì phức tạp mà chúng ta phải tìm hiểu nhỉ?

Đồng ý. Chúng ta vẫn làm thao tác này thường ngày khi làm việc với máy tính. Việc tạo ra, tìm kiếm, chỉnh sửa, xóa... các tệp trên máy tính là những thao tác rất đơn giản đứng từ góc độ người dùng. Tuy nhiên, câu chuyện ở đây là chúng ta đang hướng đến việc tự động hóa những thao tác này bằng code phần mềm.

Chẳng hạn chúng ta đang có 1001 tệp chứa nội dung các bài viết blog được xếp vào các hạng mục khác nhau. Bây giờ chúng ta muốn code viết ra có thể thực hiện thao tác truy vấn 10 bài blog đầu tiên của một hạng mục nào đó; Và hiển nhiên lúc này việc tổ chức lưu trữ các tệp sẽ cần có các dạng thức chung `convention` nào đó để code của chúng ta có thể nhận biết được các tệp thuộc hạng mục đang tìm kiếm và thứ tự mà các tệp này đã được khởi tạo.

Và trong bài viết tiếp theo, chúng ta sẽ nói về hai khái niệm `convention` đầu tiên - đó là `Data & Metadata`.

[[Database] Bài 2 - Data & Metadata](https://viblo.asia/p/Do754rGJZM6)