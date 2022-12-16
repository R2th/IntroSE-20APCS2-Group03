![](https://images.viblo.asia/7be6cf8d-e287-4f43-abba-fcb09d7947d8.jpg)

Bài viết này là sự tiếp nối của "Hiểu biết về các tính năng Jmeter cơ bản - Phần 1". Chúng ta sẽ tìm hiểu qua các tính năng Jmeter được đề cập dưới đây trong bài viết này:

**1) HTTP Request Defaults**

**2) HTTP Cookie Manager**

**3) User Defined Variables**

**4) Listeners**

## HTTP Request Defaults

HTTP Request Defaults là một trong những yếu tố chính trong Jmeter Test Plan. Nếu biết cách sử dụng tính năng này một cách hiệu quả, bạn có thể tránh trùng lặp dữ liệu và có thể maintain các parameter trên tất cả các requests.

Giả sử bạn có một Test Script bao gồm 50 HTTP Requests. Tất cả các requests sẽ được trỏ đến cùng một máy chủ. Bây giờ bạn cần thực thi một test script tương tự trên một máy chủ khác. Trong trường hợp này, bạn cần phải cung cấp tên miền / IP mới cho mỗi Requests HTTP theo cách thủ công. Nếu Test Script của bạn có hơn 50 Requests HTTP thì sao? Có thể là 150 hay thậm chí nhiều hơn thế?

Mặc định Requests HTTP cho phép bạn configure cấu hình các parameter đó và mỗi requests sẽ kế thừa các giá trị này trong khi thực thi.

Ngoài "Tên máy chủ hoặc IP", bạn cũng có thể cấu hình "Số Port" và "Parameters".

## Làm thế nào để thêm các HTTP Request Defaults?

Nhấp chuột phải vào **Thread Group > Add > Config Element > HTTP Request Defaults.**

![](https://images.viblo.asia/5b7631bd-6423-4133-aed4-c53110a5c9c3.png)

Khi các HTTP Request Defaults được thêm vào, nó sẽ giống như được hiển thị trong hình dưới đây:

![](https://images.viblo.asia/ae3bf15f-cedd-489d-9e61-fbd2fffdb64d.png)

## HTTP Cookie Manager

Chức năng chính của HTTP Cookie Manager là lưu trữ các cookie được sử dụng trong tất cả các Request transactions trong tương lai. Nếu Jmeter Script của bạn có Request HTTP và response chứa cookie withing, HTTP Cookie Manager (Nếu được thêm) sẽ lưu trữ tự động tất cả các dữ liệu này. Cookie không xuất hiện trên màn hình Cookie Manager, nhưng bạn có thể thấy chúng bằng cách sử dụng View Result Tree listener.

Cookies có thể được lưu dưới dạng biến. Để thực hiện việc đó. Đi tới thư mục Cài đặt > Mở thư mục Bin > Mở jmeter.properties file bằng notepad > Cài đặt CookieManager.save.cookies = true. Jmeter sẽ lưu trữ tất cả Cookie có tiền tố “COOKIE_” Nếu bạn muốn lấy giá trị của cookie có tên “JSESSIONID” từ “Cookie Storage Area”, hãy sử dụng ${COOKIE_JSESSIONID}.

## Làm thế nào để thêm HTTP Cookie Manager ?

Nhấp chuột phải vào **Thread Group > Add > Config Element > HTTP Cookie Manager.**

![](https://images.viblo.asia/93ab58fb-a1d4-4f32-94a0-99bf41cae355.png)

Khi HTTP Cookie Manager  được thêm vào, màn hình của bạn sẽ trông giống như sau:

![](https://images.viblo.asia/dd9109f7-a33b-4e80-b2ab-fcbb779b8b8b.png)

Có một tùy chọn để xóa cookie sau mỗi lần lặp lại (iteration). Các cookie được định nghĩa bởi máy chủ sẽ bị xóa sau mỗi lần thiết lập lại Thread Group. Cookie do người dùng defined vẫn được giữ nguyên.

## CSV Dataset Config

CSV Dataset Config được sử dụng khi bạn phải test một ứng dụng web với một bộ test data cho một trường duy nhất. Ví dụ: Bạn đã recorded một Jmeter script cho chức năng Đăng nhập. Bây giờ để thực hiện cùng một script với độ chịu tải của 20 người dùng, bạn sẽ cần một nơi lưu trữ test data của 20 người đó và Jmeter sẽ thực thi mỗi Thread bằng cách sử dụng thông tin riêng biệt của từng người dùng. 

Jmeter hỗ trợ tệp CSV để đọc Test Data. Hãy xem xét configuration required  trong CSV Datset Config.

- **Tên tệp** : Tên tệp chính xác (có đuôi .csv) chứa test data để thực thi và nằm ở cùng vị trí với script jmeter.
 
- **Tên biến** : Danh sách tất cả các tên biến (được phân cách bằng dấu phẩy) theo thứ tự như được đề cập trong Tệp CSV.

- **Dấu phân cách**: Quy ước là dấu ”,“.

- **Tái sử dụng trên EOF** : Nếu số lượng thread lớn hơn số lượng test data, bạn có muốn tiếp tục thực thi bằng cách bắt đầu đọc từ đầu không?

- **Dừng thread trên EOF** : Nếu cài đặt “True”, Gán vào EOF sẽ làm cho thread dừng lại.

- **Chế độ chia sẻ** : Cùng một tệp được chia sẻ giữa “Tất cả thread ” HOẶC mỗi tệp được mở cho mỗi Nhóm thread HOẶC mỗi tệp được mở riêng cho từng thread.

## Cách thêm CSV Dataset Config?

Nhấp chuột phải vào **Thread Group > Add > Config Element > CSV Data Set Config.**

![](https://images.viblo.asia/91e4f98a-abec-4e76-ae90-5ab7bb7687a5.png)

## Listeners

Jmeter thu thập thông tin trong quá trình thực thi chạy script. Những response  thu thập được hiển thị bởi Jmeter Listeners. Có nhiều loại trình listeners có sẵn. "View Result Tree" cung cấp chi tiết về sampler request và nhận response  dưới dạng HTML, XML, JSON, vv "Graph Listeners" hiển thị thông tin dưới dạng biểu đồ response.

Trong một số điều kiện bắt buộc, bạn có thể trích xuất dữ liệu từ response do listeners tìm nạp và coi chúng như một phần của Request parameters cho các subsequent samplers.

## Làm thế nào để thêm Listeners ?

Nhấp chuột phải vào Thread Group > Add > Listeners.


***Bài viết được dịch lại từ nguồn***: http://www.testingjournals.com/understanding-basic-jmeter-features-part-2/