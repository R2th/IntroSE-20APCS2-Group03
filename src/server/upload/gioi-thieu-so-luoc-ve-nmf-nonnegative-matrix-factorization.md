### Giới thiệu.

NMF chuyển một matrix X thành phép nhân 2 maxtrix cấp thấp hơn với độ xấp xỉ và sai số nhỏ. Mục đích để giảm cho việc lưu trữ và việc tính toán nhưng vẫn đảm bảo được các đặc điểm của dữ liệu (các đặc tính của mô hình).

![](https://images.viblo.asia/7ef2bbd9-54a6-4b59-a952-7db4ca776cac.png)

![](https://images.viblo.asia/575a4655-6284-41c0-a52d-a77d45520355.jpg)

![](https://images.viblo.asia/547ce207-339b-41ab-a6cb-39a1bc977d46.jpg)

Như trên, chúng ta có một ma trận dữ liệu X (p x n), mục đích của NMF là giảm chiều dữ liệu từ p xuống r
thông qua việc tìm 2 ma trận con có phép nhân ~= X
Để làm được vậy chúng ta thông qua việc 
* random dữ liệu ban đầu.
* So sánh các dữ liệu sinh ra với ma trận kết quả X.
* điều chỉnh lại các thông số cho hợp lí => để tối ưu hàm lỗi (error function).
![](https://images.viblo.asia/d4712e32-4838-47b4-9977-563224b3a81c.png)

* lặp lại các bước trên cho đến khi lỗi đủ nhỏ (đủ tốt)
### Ví dụ. (ứng dụng trong việc dự đoán phìm của netflix bình chọn của NMF):
Chúng ta có 4 người, với 2 thể loại phim là "comedy" và "action", ma trận X tương đương với ma trận lớn, các con số là số điểm rating bộ phim) ma trận "trái" "trên" tương đương với các ma trận cần tìm (phân tách).
![](https://images.viblo.asia/031015cf-c360-4d3b-9e44-94a6c067771a.png)

Như bạn thấy, với ma trận lớn ta cần 2 triệu entries để lưu trữ, trong khi việc phân tách ra 2 ma trận sẽ chỉ tốn 300.000 entries
![](https://images.viblo.asia/10304824-4fb0-492e-92ce-4148c56d6f2e.png)

Để tìm được 2 ma trận này ta random các giá trị khởi tạo, tính toán và so sánh với ma trận gốc.
![](https://images.viblo.asia/390ad4c0-8e4b-42f6-b48d-9fccbe2fdb59.png)

1.44 là nhỏ hơn 3, nên ta cần nâng các param lên.
![](https://images.viblo.asia/b1da84f3-cc5a-4c46-bdbf-c19a425a6baf.png)

Hoặc giảm xuống (như đối với giá trị tiếp theo).
![](https://images.viblo.asia/098f4b55-d796-4ef7-b6b0-6e9500d9c9ec.png)

Error function sẽ bằng tổng bình phương chênh lệch, đạo hàm của nó chính là cái chúng ta cần tối ưu.
![](https://images.viblo.asia/e2634d83-6f6f-42d6-95db-7bfe35370eac.png)

Sau khi tìm được 2 ma trận tương ứng, chúng ta có thể dự đoán được những điểm dữ liệu bị thiếu dựa vào việc nhân ma trận (vì dữ liệu thực tế thường không đầy đủ, rời rạc, chúng ta có thể filling các giá trị giả định, sau khi tìm được các ma trận phù hơp, chúng ta có thể quay lại dùng phép nhân ma trận để dự đoán các dữ liệu bị thiếu).
![](https://images.viblo.asia/9fea732a-3b7e-4cee-a424-a1ee10623ce3.png)


Hy vọng sẽ giúp bạn hiểu phần nào NMF. Cảm ơn mọi người (bow).

Source: https://phanngoc123.blogspot.com/2020/02/gioi-thieu-so-luoc-ve-nmf-nonnegative.html