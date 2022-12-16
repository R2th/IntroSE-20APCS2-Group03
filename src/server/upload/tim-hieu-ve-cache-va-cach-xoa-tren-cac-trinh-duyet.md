Đôi lúc trong khi testing, chúng ta hay gặp các vấn đề như: website hiển thị sai nội dung, hoặc trình duyệt chạy chậm. Nhưng khi đó ta log bug, hoặc báo dev, thì chỉ với 1 action thì data đã hiển thị đúng, cũng như trình duyệt đã chạy nhanh hơn trước - và nhận được cau trả lời của dev là bị lưu cache? 

Vậy cache là gì? tại sao nó lại bị ảnh hưởng như vậy? Và làm thế nào để clear cache. Mời bạn theo dõi bài viết của tôi nhé.

**Cache là gì?**

Cache còn được gọi là bộ nhớ đệm. Nó là phần cứng, hoặc có khi là phần mềm tích hợp sẵn trong máy tính để lưu trữ dữ liệu tạm thời.

Caching chính là hoạt động lưu trữ dữ liệu dạng nhị phân vào cache. Điều này giúp rút ngắn thời gian truy cập bằng cách tăng tốc độ và giảm độ trễ của webiste, đồng thời, các thao tác trên website cũng thuận tiện và nhanh hơn. Bởi phần lớn các workload của ứng dụng phụ thuộc vào tốc độ của input và output. Còn Cache được sử dụng nhằm mục đích tăng hiệu suất, giúp website hay ứng dụng có lượt truy cập cao.

![](https://images.viblo.asia/9a81633d-472d-4d7a-9325-f4952349b5cd.jpg)

**Các loại lưu Cache:**

Lưu Cache chia thành 3 loại:


**1.Write-around Cache:**
Loại này có khả năng ghi vào bộ nhớ những hoạt động trực tiếp và tất nhiên nó bỏ qua Cache. 

***Ưu điểm:***

Giảm tình trạng quá tải của bộ nhớ vì không có nhiều bản ghi Input/Output được thực hiện cùng thời điểm.

***Nhược điểm:***

Không lưu trữ dữ liệu, trừ trường hợp nó được xuất từ bộ nhớ. Vì thế, điều này làm cho hoạt động truy cập ban đầu bị chậm lại. 


**2.Write-through Cache:**

Kỹ thuật này cho phép ghi đè dữ liệu lên bộ nhớ Cache và Storage.

***Ưu điểm:***

Quá trình xuất và đọc dữ liệu thuận tiện, nhanh chóng vì chúng được lưu trữ tạm thời.

***Nhược điểm:***

Do hoạt động ghi chỉ hoàn tất khi tất cả dữ liệu đã ghi trên bộ nhớ Cache và bộ nhớ Primary Storage (bộ nhớ chính) nên thời gian lưu trữ bị kéo dài. Vì thế, điều này dẫn đến tình trạng chậm trễ của quá trình ghi nhớ dữ liệu lẫn lưu trữ.


**3. Write-back Cache:**

Đây là bộ nhớ đệm ghi lại. Nó là một kỹ thuật có tính năng chuyển tất cả các hoạt động sang bộ nhớ đệm Cache. Nhờ có Write-back Cache, quá trình ghi trở nên hoàn chỉnh khi toàn bộ dữ liệu đều lưu trên Cache. Tiếp đến, dữ liệu sẽ được sao chép từ bộ nhớ Cache sang bộ nhớ chính.

***Ưu điểm:***

Tốc độ truy cập và hiệu năng hoạt động của website hay ứng dụng nhanh hơn, thông qua việc dữ liệu đã lưu trữ trên bộ nhớ Cache.

***Nhược điểm:***

Cơ chế hoạt động của bộ nhớ Cache quyết định đến độ bảo mật thông tin. Vì thế, đôi khi sẽ xảy ra trường hợp mất dữ liệu trước khi nó được lưu trong bộ nhớ chính.

**Ưu điểm của Cache là gì?**

Caching có các ưu điểm như:

Giảm băng thông: Web caching loại bỏ sự lặp lại của các hoạt động mạng trong quá trình máy khách gửi yêu cầu và máy chủ phản hồi (request – response). Nhờ thế, lượng băng thông bị máy khách chiếm dụng đã được giảm đáng kể.

Cải thiện tốc độ: Nhờ lưu trữ dữ liệu Cache nên quá trình truy xuất các yêu cầu diễn ra gần như  ngay tức thời. Điều này giúp tăng hiệu suất vận hành của website.

Giảm gánh nặng cho máy chủ: Vì bộ nhớ đệm đã đảm nhận một phần dữ liệu nên nó có thể giúp máy chủ xử lý các yêu cầu gửi đến.

Đáp ứng lượng truy cập lớn: Hầu hết các gói hosting có hỗ trợ Cache đêu luôn đáp ứng tốt nhất lưu lượng truy cập lớn. Thực tế, nó có khả năng chịu tải cao gấp 3 – 4 lần so với hosting không hỗ trợ Cache.

**Cách xóa bộ nhớ Cache:**

Với mỗi trình duyệt web khác nhau thì cách xóa Cache sẽ không giống nhau. Sau đây, Hosting Việt sẽ hướng dẫn bạn cách xóa bộ nhớ đệm trên những trình duyệt thông dụng như Chrome, Firefox, Microsoft Edge, Safari và thiết bị di động.

***1.Cách xóa bộ nhớ đệm trên Chrome:***

Các bước thực hiện như sau:

- Bước 1: Trên thanh menu, bạn click chuột vào biểu biểu tượng dấu 3 chấm dọc. Sau đó, chọn mục History, rồi chọn tiếp History.

- Bước 2: Bạn chọn Clear browsing data…

- Bước 3: Tại đây, bạn tùy ý chọn mốc thời gian và loại dữ liệu muốn xóa. 

- Bước 4: Cuối cùng, chọn nút Clear data để hoàn tất xóa dữ liệu.
 
 ![](https://images.viblo.asia/1e06f0ae-7f85-4472-ad2d-01b92eaf6063.png)

***2.Cách xóa bộ nhớ Cache trên Firefox:***

Các bước thực hiện như sau:

- Bước 1: Trên thanh menu, bạn chọn biểu tượng 3 gạch. Sau đó chọn Library, tiếp đến chọn History, rồi click chọn Clear Recent History.

- Bước 2: Tại pop – up hiện ra, bạn tùy ý chọn thời gian và loại dữ liệu muốn xóa.

- Bước 3: Cuối cùng, bạn nhấn nút Clear now để hoàn tất xóa dữ liệu.

***3.Xóa Cache trên Microsoft Edge:***

Các bước thực hiện như sau:

- Bước 1: Trên thanh Menu, bạn chọn dấu 3 chấm (…), tiếp đến chọn History và sau đó chọn Clear History.

- Bước 2: Dưới tab Clear browsing data, bạn chọn mục dữ liệu muốn xóa.

- Bước 3: Click nút Clear để hoàn tất cài đặt xóa dữ liệu.

Lưu ý: Bạn cũng có thể chuyển chế độ “Always clear this when I close the browser” thành on để khi trình duyệt đóng thì hệ thống tự động xóa Cache.

***4.Cách xóa bộ nhớ đệm Cache trên Safari:***

Các bước thực hiện như sau:

- Bước 1: Trên thanh menu, bạn chọn tab History, sau đó chọn Clear History.

- Bước 2: Bạn chọn thời gian muốn xóa dữ liệu.

- Bước 3: Bạn click Clear History để hoàn tất. Đối với Safari thì nó bắt buộc người dùng xóa cả lịch sử, Cache và cookies.

Lưu ý: Với 4 trình duyệt trên, nếu muốn đến trang xóa Cache nhanh thì bạn sử dụng tổ hợp phím tắt:

- Hệ điều hành Windows: Ctrl + Shift + Delete

- Hệ điều hành OS: Command + Shift + Delete

***5.Cách xóa bộ nhớ Cache là gì trên điện thoại di động:***

Xóa Cache trên điện thoại di động cũng giống như trên máy tính. Cụ thể, cách thực hiện như hướng dẫn sau.

   ***5.1.Trình duyệt Chrome trên Android:***
   
- Bước 1: Trên thanh menu của trình duyệt, bạn click biểu tượng 3 chấm dọc. Tiếp đến chọn History.

- Bước 2: Bạn chọn Clear Browsing Data…

- Bước 3: Ở bước này, bạn chọn thời gian, loại dữ liệu muốn xóa.

- Bước 4: Cuối cùng click Clear Data để tiến hành xóa dữ liệu.

   ***5.2.Trình duyệt Chrome trên iOS:***
   
Bạn thực hiện bước 1 và 2 như thao tác trên hệ điều hành Andoid. Sau đó, hệ thống xuất hiện pop-up để xác nhận về việc xóa dữ liệu. Lúc này, bạn chỉ việc nhấn OK để hoàn tất.

   ***5.3.Trình duyệt Firefox trên iOS:***
   
- Bước 1: Chọn mục Settings trên thanh menu.

- Bước 2: Kéo trang xuống rồi nhấn chọn mục Clear Private Data.

- Bước 3: Tick chọn dữ liệu muốn xóa.

 - Bước 4: Click Clear Private Data để hệ thống thực hiện xóa dữ liệu.

- Bước 5: Một pop – up xuất hiện để xác nhận xóa dữ liệu. Bạn click chọn OK. 

   ***5.4.Trình duyệt Safari trên iOS:***
   
- Bước 1: Bạn vào phần Setting của điện thoại.

- Bước 2: Khởi động Safari.

- Bước 3: Click chọn Clear History and Website Data.

- Bước 4: Lúc này hệ thống xuất hiện pop – up, bạn click Clear History and Data để xóa dữ liệu.

Việc xóa Cache không nhất thiết phải thực hiện hàng ngày, bởi trình duyệt có khả năng tự động ghi đè. Bạn chỉ nên áp dụng cách xóa trên khi thấy website hiển thị sai nội dung, hoặc trình duyệt chạy chậm.

Hiểu về Cache là gì và các thao tác làm việc với nó sẽ giúp bạn có được trải nghiệm tốt nhất trong quá trình làm việc trên môi trường internet. Hy vọng bì viết này sẽ có ích cho các bạn.

Bài viết được tìm hiểu từ:

https://askleo.com/browser-cache/