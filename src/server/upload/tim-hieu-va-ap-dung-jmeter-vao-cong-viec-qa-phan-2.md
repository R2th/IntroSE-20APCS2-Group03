Sau khi đã cài đặt và bước đầu làm quen với JMeter ở [phần 1 ](https://viblo.asia/p/tim-hieu-va-ap-dung-jmeter-vao-cong-viec-qa-phan-1-bWrZnPz95xw) , để có thể làm việc được với các script trong JMeter, chúng ta cần hiểu về các chức năng cần có khi làm việc với JMeter. 
# Tạo và chạy 1 testplan cơ bản

Ở nhiều trang hướng dẫn tìm hiểu về JMeter thường sau phần cài đặt sẽ giới thiệu về các Element và sau đó đến Test Plan, nhưng như thế mình cảm giác khá lúng túng ban đầu. Vì thế mình sẽ bắt đầu thực hành luôn việc tạo 1 Test Plan lồng với giải thích từng phần cụ thể sau đó.

**Bước 1**: Tạo 1 Test Plan bằng cách khởi chạy JMeter và chọn **File** --> **New**.

![](https://images.viblo.asia/946d8a38-b35c-4d0d-8ba5-e1e3bea68c7a.PNG)

Test plan là một khái niệm đã quen thuộc với QA. Trong JMeter, Test Plan chính là nơi lưu giữ tất cả các test step, element và các cấu hình cần thiết.  
Trước khi chạy 1 performance testing thì việc tạo và chạy 1 Test Plan cơ bản nhất sẽ là bước đầu bạn cần thực hiện.

Ngữ cảnh 1 Test Plan mình sẽ dùng minh họa như sau: 
- Truy cập trang Viblo https://viblo.asia/
- Vào trang danh mục Trending https://viblo.asia/trending , và mở thêm 1 bài post, chẳng hạn  https://viblo.asia/p/hoc-react-native-tu-co-ban-den-nang-cao-phan-1-huong-dan-cai-dat-va-chay-hello-world-RQqKLYW0Z7z
- Thực hiện test với 10 user, và mỗi user lặp lại 2 lần.

**Bước 2**: Tạo các element cần thiết để thực hiện ngữ cảnh đã đưa trên.

Element có thể hiểu các thành phần khác nhau được dùng trong JMeter và mỗi element sẽ được dùng với mục đích khác nhau. 
Trong JMeter, có nhiều thành phần khác nhau, tuy nhiên việc tìm hiểu cùng một lúc ban đầu sẽ dễ khiến ta chán và lúng túng, vì thế chúng ta chỉ cần nắm rõ một số element cần biết trước khi bắt đầu kiểm thử trong JMeter, bao gồm:

* Thread Group
* Samplers
* Listeners
* Configuration

a. Tạo Thread Group

Thread Group là một nhóm gồm nhiều Thread. Dễ hiểu hơn, có thể xem Thread Group giống như 1 bộ Test Suites nơi chứa toàn bộ Testcase mình cần thực hiện bên  trong.
Mỗi Thread sẽ đại diện cho 1 user ảo dùng để kiểm thử. 
Bất cứ Test Plan nào của JMeter đều phải có Thread Group và thông thường mỗi test plan đơn giản nhất chỉ cần một Thread Group.

Tạo 1 Thread Group bằng cách nhấp chuột phải vào **Test Plan > Add > Threads (Users) > Thread Group** . Thread Group bạn tạo xong sẽ nằm ngay bên dưới Test Plan. 
Theo ngữ cảnh ở trên thì mình cần cấu hình Number of Threads (Users) = 10 và Loop Count = 2 . 

![](https://images.viblo.asia/138a8a6f-8a54-4112-888c-25b1a64410d0.PNG)

b. Tạo các Sampler

JMeter hỗ trợ việc kiểm thử các giao thức HTTP, FTP, JDBC và nhiều loại khác nữa. Và Sampler được dùng để yêu cầu JMeter gửi các request tới server.  
Mỗi ngữ cảnh sẽ tương ứng với 1 HTTP Request. 
Và theo ngữ cảnh trên thì giao thức của bên mình là HTTP request vì thế ở bước này mình sẽ tạo các HTTP request bằng cách nhấp phải vào **Thread Group > Add > Sampler > HTTP Request**. 

**HTTP Request 1 - Truy cập trang chủ Viblo**
* Đổi Name thành HomePage cho dễ nhớ.
* Nhập https vào trường **Protocol [http]** . Nếu trang mình cần truy cập là web HTTP bình thường thì không cần nhập ở đây.
* Nhập tên domain (viblo.asia) vào trường **Server Name or IP**. 
* Nhập / vào trường **Path**. 

![](https://images.viblo.asia/e5c85698-e08a-4c57-a47b-2fcafe5f3467.PNG)

**HTTP Request 2 - Vào trang danh mục Trending của Viblo**
* Chỉ cần nhấp chuột phải vào Sampler HomePage, chọn Duplicate và sau đó thay đổi thông tin cho HTTP Request 2.
* Đổi Name thành Trending.
* Nhập */trending* vào trường **Path**.

![](https://images.viblo.asia/847154c7-5dfa-42fd-b847-f160fae86c11.PNG)

**HTTP Request 3 - Mở một bài post trên Viblo**
* Chỉ cần nhấp chuột phải vào Sampler Trending, chọn Duplicate và sau đó thay đổi thông tin cho HTTP Request 3.
* Đổi Name thành AccessPost:.
* Nhập */p/hoc-react-native-tu-co-ban-den-nang-cao-phan-1-huong-dan-cai-dat-va-chay-hello-world-RQqKLYW0Z7z* vào trường **Path**.

![](https://images.viblo.asia/e8c8665a-f81b-41b3-bcf1-4944a4133dcf.PNG)

c. Tạo các Listener

Trong JMeter, các Listener được dùng để xử lý sau khi request dữ liệu. Nói cách khác, Listener được dùng để kiểm tra kết quả của các sampler ở bước b. Và có thể tạo nhiều listener khác nhau, tùy mục đích sử dụng. 
Hai listener mình làm demo ở  đây là View Result Tree (**Thread Group → Add → Listener → View Result Tree**) và Aggreate Report (**Thread Group → Add → Listener → Aggregate Report**).

![](https://images.viblo.asia/28fc70a3-9b4a-4a4c-9288-301ba0bebda8.PNG)

**Bước 3. Chạy thử Test Plan**

Sau khi tạo 1 Test Plan cơ bản như ở trên, hãy nhớ lưu nó lại. Trước khi chạy thử nó, bạn có thể kiểm tra xem cấu hình Test Plan đúng chưa bằng cách nhấp phải vào **Thread Group > Validate**.  
Để chạy toàn bộ Test Plan, nhấp button Run trên Toolbar.  Trong khi chạy và sau khi hoàn thành, chọn View Result Tree hoặc Aggregate Report để xem kết quả. 

![](https://images.viblo.asia/eada25d8-2bbd-48b4-9b2f-39509a06f781.PNG)

Về cách đọc kết quả, mình sẽ nói kỹ hơn ở những phần sau.

Như vậy, việc tạo 1 Test Plan trong JMeter thật đơn giản đúng không các bạn? Ở phần tiếp theo, mình sẽ tiếp tục đi sâu hơn vào phần tối ưu hóa Test Plan ở phần này cũng như các chức năng  khác mình có thể vận dụng khi sử dụng JMeter.

..............................................................

**Tài liệu tham khảo:** 
Chuỗi bài viết được tham khảo bằng cách dịch lại từ Guru99 và có chỉnh sửa theo những gì mình vừa tìm hiểu và thực hành: 
* https://www.guru99.com/jmeter-element-reference.html
* https://www.guru99.com/hands-on-with-jmeter-gui.html