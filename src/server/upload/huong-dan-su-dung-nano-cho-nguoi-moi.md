Cuộc nội chiến trong cộng đồng sử dụng Linux với lý do "Command-line editor nào là tốt nhất?" luôn luôn là cuộc chiến dai dẳng và quyết liệt. 1 bên là vi(VIM) và bên kia là Emacs. Mỗi bên đều có ưu điểm và nhược điểm riêng, tuy nhiên vì là 2 ông lớn nên quy tắc phe cũng khá lằng nhằng rắc rối. Cụ thể hơn là các keyboard shortcut của 2 command-line editor trên đều cần nhiều khả năng ghi nhớ. Và rất may mắn trên thế giới cũng đang có 1 command-line editor thứ 3 đang nổi lên với bộ keyboard đơn giản, phục vụ nhu cầu mở, sửa và lưu đủ dùng mà không cần phải nhớ lằng nhằng cho lắm. Đó là nano.

![](https://images.viblo.asia/91920a66-5a89-4160-878f-9fc594ba31be.png)

# Nano cần cài đặt không?
Theo mặc định của tất cả các hệ điều hành họ hàng Unix, nano được cài sẵn. Tuy nhiên trong 1 số trường hợp không có sẵn, bạn chạy lệnh sau để tải về
```bash
sudo apt-get install nano
```
Sau đó bạn chỉ cần chạy nó với 1 lệnh đơn giản: 
```bash
nano
```
Lệnh trên sẽ mở file mới. Sau đó bạn sẽ tuỳ ý chỉnh sửa và lưu lại.
# Mở tệp với nano
Bạn chỉ cần thêm tên file sau lệnh nano
```bash
nano kazusa_okuyama_and_nana_asakawa.txt
```
Bạn cũng có thể chỉ luôn đường dẫn tới thư mục, miễn là bạn có quyền truy cập
```bash
nano /path/to/Kasumi_Yamaya.txt
```
2 câu lệnh trên dù là tệp mới toanh hay mở tệp có sẵn trong máy đều có thể sử dụng được.
# Lưu tệp
Trong nano, ta lưu tệp bằng tổ hợp `ctrl+o`.

Trong trường hợp lưu ở format DOS, ta nhấn thêm `alt+d`.

Trong trường hợp lưu ở format MAC, ta nhấn thêm `alt+m`.

Tổ hợp `ctrl+o` trên còn nhiều tác dụng khác, như:
-  Nối văn bản nano vào cuối tệp khác, sau `ctrl+o` thì `alt+a`.
-  Nối văn bản nano vào đầu tệp khác, sau `ctrl+o` thì `alt+p`.
-  Back-up tệp, sau `ctrl+o` thì `alt+b`.
# Thoát khỏi nano
Tổ hợp cần gõ là `ctrl+x`
# Cắt dán văn bản
Để cắt một dòng văn bản trong nano, nhấn `ctrl+k`.

Nếu bạn nhấn `ctrl+k` lần nữa trước khi thực hiện bất kỳ thay đổi nào khác thì dòng văn bản sẽ được thêm vào virtual clipboard.

Khi bạn bắt đầu nhập thêm văn bản hoặc xóa văn bản và nhấn `ctrl+k` thì clipboard sẽ bị xóa và chỉ dòng cuối cùng bạn cắt sẽ dán được.

Nếu bạn muốn cắt chỉ một phần của một dòng, nhấn `ctrl+6` ở đầu văn bản bạn muốn cắt và sau đó nhấn `ctrl+k` để cắt văn bản.

Dán văn bản sử dụng `ctrl+u`.
# Show vị trí con trỏ
Nhấn tổ hợp `ctrl+c` sẽ cho output này.
```
line 5/11 (54%), col 10/100 (10%), char 100/200 (50%)
```
Đó chính là vị trí bạn đang ở hiện tại
# Đọc file với nano
Sử dụng `ctrl+r`. Nhấn `alt+f` nếu muốn mở file mới ở buffer mới.
# Tìm và thay thế các chuỗi
Để tìm chuỗi, chạy `ctrl+\`. Mặc định khi chạy tổ hợp phím này thì cũng hiển thị luôn cả việc thay thế.

Để tắt thay thế, `ctrl+r` là tổ hợp cần dùng. Bật lại thì nhấn lại tổ hợp này lần nữa.

Để tìm ở phía trc, sau khi tắt thay thế, nhấn `alt+b`.

Nếu muốn force case-sensative, sau khi ở chế độ tìm, `alt+c`. Và nhấn lại để huỷ.

1 text-editor luôn có chế độ tìm kiếm regex. Nano cũng không ngoại lệ. Đó là `alt+r`.

# Các tham số đi kèm trong nano:
nano -B (sao lưu tập tin trước khi chỉnh sửa nó) 
nano -E (chuyển đổi các tab thành space khi chỉnh sửa)
nano -c (liên tục hiển thị các số liệu thống kê vị trí con trỏ)
nano -i (tự động thụt dòng mới vào cùng vị trí với dòng trước)
nano -k (tuỳ chỉnh vị trí cắt để nó cắt từ vị trí con trỏ thay vì toàn bộ dòng)
nano -m (cho phép sử dụng chuột để yểm trợ)
nano -v (mở file chỉ để đọc)
# Tham khảo
https://www.lifewire.com/beginners-guide-to-nano-editor-3859002