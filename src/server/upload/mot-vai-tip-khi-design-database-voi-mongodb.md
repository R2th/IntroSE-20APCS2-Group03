## Duplicate data để tăng tốc độ, reference data để tăng tính toàn vẹn
Có 2 scheme chính để lưu những dữ liệu đó là embedded (denormalized) và referenced (normalized).

Ví dụ về denormalized data:

**School:**
```
{
    "_id" : schoolId,
    "name" : name
}
```

**Student:**
```
{
    "_id" : studentId,
    "name" : name,
    "school_name" : name,
}
```

**Teacher:**
```
{
    "_id" : teacherId,
    "name" : name,
    "school_name" : name,
}
```

Ví dụ về denormalized data:

**School:**
```
{
    "_id" : schoolId,
    "name" : name
}
```

**Student:**
```
{
    "_id" : studentId,
    "name" : name,
    "school_id" : schoolId,
}
```

**Teacher:**
```
{
    "_id" : teacherId,
    "name" : name,
    "school_id" : schoolId,
}
```

Việc denormalized sẽ giúp việc lấy tên trường học từ collection học sinh và giáo viên dễ dàng hơn vì không phải look up để tìm kiếm trong collection trường học. Tuy nhiên để đánh đổi việc này thì khí tên trường học thay đổi ta phải update lại toàn bộ trường **school_name** ở tất cả collection liên quan. Nếu có xảy ra sự cố trong quá tình update thì có thể dẫn đến làm mất tính nhất quán của dữ liệu ~ sai lệch dữ liệu không. Vì vậy việc lựa chọn giữa denormalized và normalized sẽ tùy thuộc vào từng bài toán cụ thể và thường dựa vào các yếu tố sau:

* Tần suất read và write của các data cần lưu: nếu như tần suất đọc của data rất lớn và tần suất update lại rất nhỏ thì ta nên denormalized và ngược lại. Như ví dụ bên trên ta thấy tên trường học hiếm khi thay đổi nên việc nhúng tên trường vào các collection liên quan là hoàn toàn hợp lý.
* Yêu cầu về tính nhất quán của dữ liệu: Nếu như data cần phải đảm bảo tính toàn vẹn ví dụ như khi ta muốn thay đổi % của một chiến dịch sale off từ 30% xuống 20%, nếu như nhúng % giảm giá vào tất cả các mặt hàng thì sẽ phải mất rất lâu để update lại chúng dẫn đến có mặt hàng hiển thị 20% có mặt hàng lại hiển thị 30%.

## Embed anything you can
Chúng ta nên cân nhắc nhúng các trường liên quan vào một document duy nhất để tăng read performance, chẳng hạn như một số ví dụ dưới đây:
* Các trường của document có quan hệ 1 - 1
* Các bảng join trong quan hệ n - n  của relationship database: ví dụ như thay vì tạo bảng join để lưu mối quan hệ n - n giữa học sinh và các môn học thì ta có thể lưu toàn bộ id của các môn học mà học sinh đó học vào 1 trường của document học sinh và ngược lại
* Các dữ liệu mang tính thời điểm như giá tiền của 1 sản phẩm trong đơn hàng, chúng ta sẽ không muốn thay đổi giá trong đơn hàng khi khách hàng đã đặt hàng

## Không embed những data có thể tăng số lượng rất nhanh
Document size có dung lượng giới hạn là 16 megabytes nên chúng ta không thể nhúng cả thế giới vào đó được. Hơn nữa document có dung lượng quá lớn cũng làm tăng thời gian truyền tải dữ liệu qua internet.

Dự án mình đang làm việc cũng đã gặp phải trường hợp tương tự. Dữ liệu thống kê hàng ngày của mỗi affiliate đã join vào merchant được nhúng hết vào document merchant, sau khoảng vài năm hoạt động thì số lượng affiliate join vào merchant không ngừng tăng lên dẫn tới việc document size đạt tới limit. Điều này kéo theo rất nhiều hệ lụy như thỉnh thoảng có exception do không lưu được bản ghi do quá dung lượng, performance cũng bị ảnh hưởng ...

Do đó trong những trường hợp như trên thì tốt hơn hết nên referenced thay vì embed

## Dọn những data rác thường xuyên
Liên quan đến ví dụ bên trên, nếu chúng ta vẫn quyết định embed những "growable" data như trên vì lý do read performance thì hãy giữ cho document size nhỏ nhất có thể. Ví tụ như ta có thể tạo cron job để unset những data thống kê cũ quá 1 năm. VIệc này giúp data có thể tiếp tục tăng lên và không vượt ngoài tầm kiểm soát.

## Pre-populate data thay vì calculate on the flight
Điển hình như những data thống kê dạng count hay sum, ... với điều kiện phức tạp và trên một collection với số lượng lớn documents. Hãy cache chúng lại và sử dụng **$inc** để update thay vì tính toán lại toàn bộ mỗi khi sử dụng chúng. Việc này sẽ làm tăng đáng kể  read performance và giảm thiểu việc phải tạo nhiều index