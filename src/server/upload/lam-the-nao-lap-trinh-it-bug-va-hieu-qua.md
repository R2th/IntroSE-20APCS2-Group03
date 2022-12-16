Mình làm việc với nhiều bạn lập trình viên. Nhiều bạn code rất giỏi nhưng vẫn chưa biết cách code như thế nào để nhanh, hiệu quả và ít bug. Bài viết này mình chia sẻ cách để lập trình hiệu quả.

1. Khi viết một chương trình hoặc module dài không nên CODE CHAY toàn bộ module, chương trình rồi sau đí mới compile rồi chạy test. Thay vào đó bạn chia chương trình thành các hàm nhỏ, định nghĩa tên tuổi rõ ràng, nội dung hàm chưa cần định nghĩa. Compile và test chạy được. Sau đó viết nội dung từng hàm, compile và test từng hàm kĩ lưỡng. Chạy test thử trong toàn bộ chương trình.
Lấy ví dụ: Viết chương trình nhập 10 số nguyên và  sắp xếp chúng.
Đầu tiên bạn hay viết 3 hàm Nhap(), Sort(), Xuat(). Cho 3 hàm này chương trình compile và test thử. Sau đó bạn viết hàm Nhap(), compile và test thử. Rồi đến hàm Xuat(), và cuối cùng hàm Sort() khó nhất.

2. Sửa bug. Bạn nên đi theo quy tắc sau:
- Dự đoán: Đoán xem bạn bị sai cái gì
- Kiểm tra dự đoán: Xác minh dự đoán đúng hay sai,
- Nếu dự đoán sai thì quay về bước 1.
Lấy ví dụ: Chương trình trên in kết quả sai
- Các số hiện ra không giống input
- Dự đoán hàm Sort làm thay đổi số -> Comment hàm sort -> Kết quả vẫn ra sai
- Dự đoán Hàm Nhập() sai -> Debug mảng Nhap() -> Kết quả nhập đúng
- Suy ra hàm Xuất sai.

3. Sửa bug nếu như bạn mất 1 giờ sửa không ra (bao gồm search google các loại) bạn hãy thử hỏi bạn mình, đồng nghiệp, hỏi bâng quơ thôi nhưng đôi khi rất hữu ích. Môt ví dụ rất vui trong team là: bạn A chạy API lấy dữ liệu nhưng cứ bị báo lỗi, bực bội la lên "Chạy API hoài không ra!!!". Bạn B bên cạnh nói: "Mất Internet nãy giờ rồi."

4. Nếu trên 3 giờ sửa vẫn không ra nên nhờ một ai khác xem code của mình. Đôi khi chỉ thiếu một khoảng trắng cũng gây nên chuyện nhưng bạn của bạn lại thấy. Vấn đề tại sao phải hỏi người khác? Vì lúc code trong đầu bạn có sẵn những mặc định cho là đúng nên bạn không nhìn ra được. Trong khi đó bạn của bạn, đầu đang fresh nên nhanh chóng nhìn ra.

5. Nếu như sửa code mà hành vi của chương trình không thay đổi, ngay cả khi bạn cố y nhập cho chương trình báo lỗi compile. Bạn  phải nghĩ ngay đến bạn sửa sai tập tin source code. Lỗi này có vẻ hơi buồn cười nhưng ngay cả những người lập trình lâu năm vẫn bị và có khi mất cả ngày mới phát hiện ra mình ngớ ngẩn như vậy.

6.7 Sẽ suy nghĩ tiếp....
Happy coding...