## Mức độ bảo mật của password

`^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$`

Mã Regex này giúp người dùng đánh giá được mật khẩu mình đặt có đủ mạnh để có thể sử dụng được hay không

## Kiểm tra địa chỉ Email có hợp lệ hay không ?

`/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm`

Có chức năng tương tự hàm filter_var trong PHP : `filter_var($email, FILTER_VALIDATE_EMAIL)` giúp lập trình viên kiểm tra chuỗi nhập vào có đúng là email hợp lệ hay không ?

## Dấu phân cách chuỗi số

`/\d{1,3}(?=(\d{3})+(?!\d))/g`

Mã Regex có chức năng phân tách chứ số thứ 3 trong dãy số thành hàng ngàn hay triệu

## Tự động thêm HTTP/HTTPS vào trước liên kết nếu không có

```
if (!s.match(/^[a-zA-Z]+:\/\//))
{
    s = 'http://' + s; 
    // s = 'https://' + s;
    // đối với https
}
```

Mã Regex này kiểm tra xem chuỗi URL có tiền tố http/https hay không và tự động thêm vào đầu chuỗi http/https tuỳ thuộc vào nhu cầu sử dụng của lập trình viên

## Chích xuất nguồn ảnh

`\< *[img][^\>]*[src] *= *[\"\']{0,1}([^\"\'\ >]*)`

Nếu chúng ta muốn lấy nguồn ảnh trực tiếp từ HTML thì đoạn regex này là phương án hoàn hảo dành cho Backend developer

## Loại bỏ comment trong HTML

<!--(.*?)-->

Muốn xoá bỏ tất cả comment trong file ví dụ như index.html hãy sử dụng đoạn mã regex trên sẽ tiết kiệm khá nhiều thời gian cho các bạn đó 

## Thêm thuộc tính rel="nofollow" vào các liên kết trong HTMl

`(<a\s*(?!.*\brel=)[^>]*)(href="https?://)((?!(?:(?:www\.)?'.implode('|(?:www\.)?', $follow_list).'))[^"]+)"((?!.*\brel=)[^>]*)(?:[^>]*)>`

Chắc hẳn với những SEOer thì việc thêm thủ công thuộc tính rel="nofollow" vào từng liên kết là khá cực nhọc, thay vì vậy chúng ta có thể sử dụng regex trên để tối giản hoá những công việc lặp đi lặp lại

Nguồn: [sưu tầm](https://kipalog.com/posts/30-doan-bieu-thuc-chinh-quy-ma-lap-trinh-vien-web-nen-biet)