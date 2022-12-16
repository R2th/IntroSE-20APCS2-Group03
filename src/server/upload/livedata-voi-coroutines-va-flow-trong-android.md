## 1. Reactive UIs

Ngay từ những ngày đầu của Android, chúng ta đã học rất nhanh rằng vòng đời của Android rất khó hiểu, đầy rẫy các trường hợp và cách tốt nhất  là tránh chúng càng nhiều càng tốt.

Đối với vấn đề này, hãy sử dụng một kiến trúc phân lớp, vì vậy chúng ta có thể viết code độc lập với UI mà không cần suy nghĩ quá nhiều về vòng đời. 
Ví dụ: chúng ta có thể thêm một lớp miền chứa logic nghiệp vụ (những gì ứng dụng của bạn thực sự làm) và một lớp dữ liệu.

![](https://images.viblo.asia/27255759-93e2-4b0f-b777-80243acffbb1.png)

Hơn nữa, chúng ta đã học được rằng lớp **presentation** có thể được chia thành các thành phần khác nhau với các tác vụ khác nhau:

- **View** : Activity hoặc Fragment xử lý các callbacks, sự kiện của người dùng và điều hướng.
- **Presenter** hoặc **ViewModel** : cung cấp dữ liệu tới View và hầu như ko biết đến vòng đời đang diễn ra trong View.
Điều này có nghĩa là ko có gián đoạn và ko cần phải dọn dẹp khi View được tạo lại.

Có 2 cơ chế để gửi dữ liệu từ **ViewModel/Presenter** tới **View** :

- Có một tham chiếu đến **View** và gọi nó trực tiếp. Thường được liên kết với cách thức hoạt động của **Presenters**.
- Tiếp xúc dữ liệu observable cho các observer. Thường được liên kết với cách thức hoạt động của **ViewModels**.

Đây là một quy ước được thiết lập khá tốt trong cộng đồng Android, nhưng bạn sẽ tìm thấy những bài viết không đồng ý.
Có hàng trăm bài đăng blog xác định Presenter, ViewModel, MVP và MVVM theo những cách khác nhau. 

Bạn nên tập trung vào các đặc điểm của lớp presentationy của mình và bạn sử dụng ViewModel Cấu trúc kiến trúc Android :

- Vẫn tồn tại như thay đổi cấu hình, như xoay, thay đổi ngôn ngữ, thay đổi kích thước cửa sổ, chuyển đổi chế độ tối, v.v.
- Có vòng đời rất đơn giản. Nó có một lifecycle callback duy nhất, onCleared, được gọi khi sở hữu vòng đời của nó kết thúc.

**ViewModel** được thiết kế để sử dụng Observers pattern :
- Nó không nên có một tham chiếu đến View.
- Nó phơi bày dữ liệu cho các observers, không cần biết các observers đó là gì. Bạn có thể sử dụng LiveData cho việc này.

Khi một View ( một Activity, Fragment hoặc bất cứ sở hữu Lifecycle nào) được tạo, **ViewModel** sẽ được lấy và nó bắt đầu hiển thị dữ liệu thông qua một hoặc nhiều LiveDatas đã đăng ký.

![](https://images.viblo.asia/78d326e1-1a09-41c8-a26f-c91d98b3c490.png)
ViewModel hiển thị dữ liệu thông qua LiveData, được quan sát bởi View.

Subscription này có thể được thiết lập với LiveData.observe hoặc tự động với thư viện Data Binding.

Bây giờ, nếu thiết bị được xoay thì View bị hủy (#1) và một instance mới được tạo (# 2):

![](https://images.viblo.asia/be835c7c-51bc-470d-aec1-16a8dde9e5d1.png)
View #1 bị  hủy, vì vậy nó dừng tự động lắng nghe. View #2 bắt đầu đang ký lắng nghe thay đổi.

Nếu chúng ta có tham chiếu đến Activity trong ViewModel, chúng ta sẽ cần đảm bảo:

- Xóa nó khi View bị hủy.
- Tránh truy cập nếu View ở trạng thái chuyển tiếp.

## 2. Phạm vi

Vì **Activity** và **Fragment** có tuổi thọ bằng hoặc ngắn hơn **ViewModels**, chúng ta có thể bắt đầu nói về phạm vi hoạt động.

Một operation(tiến trình) là bất cứ điều gì bạn cần làm trong ứng dụng của mình, như lấy dữ liệu từ internet, lọc kết quả hoặc tính toán sắp xếp một số text.

Đối với bất kỳ tiến trình nào bạn tạo, bạn cần suy nghĩ về phạm vi của nó: phạm vi thời gian giữa lúc khởi chạy và khi nó hủy bỏ. Hãy cùng xem xét hai ví dụ:

- Bạn bắt đầu một tiến trình trong một Activity ở onStart và kết thúc ở onStop.
- Bạn bắt đầu một tiến trình trong một ViewModel ở init và bạn dừng nó trong onCleared ().

![](https://images.viblo.asia/7cf5ccb4-48e7-487f-8bdc-07ef69028ab9.png)


Nhìn vào sơ đồ, chúng ta có thể xác định vị trí của từng thao tác.


- **Lấy dữ liệu** : nằm trong phạm vi Activity sẽ buộc chúng ta phải tìm lại dữ liệu đó sau khi xoay, do đó, nó nên được đưa vào phạm vi **ViewModel**.

- **Sắp xếp text** không có ý nghĩa trong một hoạt động nằm trong phạm vi ViewModel vì sau khi xoay, bộ chứa văn bản của bạn có thể đã thay đổi hình dạng.

Rõ ràng, một ứng dụng trong thế giới thực có thể có phạm vi rộng hơn nhiều so với những ứng dụng này.