Bài viết liên quan:

[Hướng dẫn cài đặt Python trên MacOS](https://viblo.asia/p/huong-dan-cai-dat-python-va-sublime-text-3-cho-macos-2020-07LKXm8rZV4)

[Hướng dẫn cài đặt Python trên Linux](https://viblo.asia/p/huong-dan-cai-dat-python-va-sublime-text-3-cho-linux-2020-gGJ5994J5X2)

Các hệ điều hành khác nhau cách cài đặt sẽ khác nhau, vì vậy bạn nên lưu ý những điểm đó. Trong phần hướng dẫn này sẽ đảm bảo Python được thiết lập chính xác trên hệ thống của bạn.

### Python trên Windows

Windows không có sẵn Python, vì vậy bạn phải cài đặt Python, và sau đó là Sublime Text.

**Cài đặt Python**

Đầu tiên, hãy kiểm tra xem Python có được cài đặt trên hệ thống của bạn không. Mở command windows bằng cách nhập **command** vào start menu

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/h2w3wbm63b_image.png)

Trên terminal window gõ lệnh **python**. Lưu ý **python** phải viết thường

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/f25m92hcc9_image.png)

Nếu hiển thị dấu nhắc của Python (>>>) thì có nghĩa là Python đã cài đặt trên hệ thống của bạn. Ngược lại, nếu bạn thấy thông báo là python is not a recongnized command, có nghĩa là Python chưa được cài đặt.

Trong trường hợp Python chưa được cài đặt, hoặc khi gõ lệnh **python** trên terminal window có phiên bản nhỏ hơn 3.7, thì bạn cần phải tải file cài đặt về cho Python Windows.

Try cập đường link https://www.python.org/ rê chuột vào chữ **Downloads** và bấm vào nút **Python 3.8.1** như hình

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/8haz61mjvz_image.png)

Sau khi tải về, tiến hành chạy file cài đặt. Chọn `Add Python 3.8 to PATH` để thêm Python vào biến môi trường.

Bấm vào nút `Install Now` để tiến hành cài đặt.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/2h9oepp1xe_image.png)

Bấm vào nút `Disable path length limit` để bỏ qua giới hạn 260 kí tự của MAX_PATH.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/a3v2x2cfnw_image.png)

### Một số vấn đề khi cài đặt trên Windows

Trên terminal window gõ lệnh **python**. Và xuất hiện hình như sau:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/f25m92hcc9_image.png)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/hamwf9fr5p_image.png)

Bạn nhập **manage app execution aliases** vào start menu và sau đó chọn **manage app execution aliases** như hình:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ew1pj8x0l3_image.png)

Chuyển về trạng thái **Off** cho "App Installer python.exe" và "App Installer python3.exe"

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ig346me5pe_image.png)

Tắt và mở lại terminal windows và gõ lệnh  **python** sẽ hiển thị python với phiên bản là 3.8.1:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/rp04f0vysr_image.png)

Nhập dòng sau vào terminal windows sẽ xuất ra Hello Python!

```
print("Hello Python!")
```

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/sv8nu9nwpt_image.png)

Bất kỳ lúc nào bạn muốn chạy code Python, hãy mở command window và gõ **python** để bắt đầu chạy code Python.

Để đóng phiên làm việc của Python bạn bấm nút Ctrl-Z và bấm nút Enter, hoặc gõ `exit()`

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/qbkt47025w_image.png)

### Cài đặt Sublime Text

Bạn có thể tải file cài đặt cho Sublime Text tại https://sublimetext.com/. 

Sau khi truy cập trang, bấm vào nút "DOWNLOAD FOR WINDOWS" để tải file cài đặt về

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ntv85v1paf_image.png)

Tiền hành mở file cài đặt. Chọn nơi lưu trữ file, ở đây mình chọn ổ D.

**Lưu ý:** Tên thư mục không nên có khoảng cách(space), rất dễ gây ra lỗi khó đỡ ^^

Tiếp theo bạn chọn Next

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/youctdaghu_image.png)

Và tiếp tục bấm Next 

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/9dypiitorl_image.png)

Chọn Install 

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/36qkne0ota_image.png)

Bấm nút Finish để hoàn tất quá trình cài đặt.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/uo407usyoj_image.png).

### Tổng kết

Như vậy là bạn đã cài đặt xong Python trên Windows và IDE hỗ trợ cho Python là Sublime Text 3.

Nếu có vấn đề khi cài đặt, bạn hãy comment bên dưới, mình sẽ hỗ trợ trong thời gian sớm nhất!

Cảm ơn các bạn đã quan tâm bài viết này.

### Tham khảo

PYTHON CRASH COURSE - A Hands On Project Based Introduction To Programming (Eric Matthes)