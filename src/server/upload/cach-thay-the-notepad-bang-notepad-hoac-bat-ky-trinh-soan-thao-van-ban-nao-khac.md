Notepad là một chương trình nhẹ phù hợp cho người dùng chỉ cần các tính năng chỉnh sửa văn bản rất tối thiểu. Đối với các tính năng và chức năng bổ sung, các trình soạn thảo của bên thứ ba như Notepad ++ và Sublime Text rất tuyệt vời với rất nhiều tính năng được tích hợp.

Nếu bạn đang tìm cách thay thế hoàn toàn Notepad cũ bằng Notepad ++ hoặc bất kỳ trình chỉnh sửa của bên thứ ba nào, bài đăng này sẽ cho bạn biết cách thực hiện. Notepad ++ là trình chỉnh sửa mã nguồn miễn phí và thay thế Notepad hỗ trợ một số ngôn ngữ. Hãy xem cách bạn thay thế Notepad bằng Notepad ++ mà không cần phải thay thế bất kỳ tệp hệ thống nào nhé.

##  Làm thế nào để thay thế Notepad bằng Notepad ++ trong Windows?

**Bạn nên sử dụng phương pháp nào dưới đây?**

Nếu bạn muốn Notepad ++ mở bất cứ khi nào bạn bấm đúp vào file văn bản và bất cứ khi nào notepad.exeđược thực thi, hãy làm theo một trong các tùy chọn bên dưới Method 2. Và Điều này cũng có nghĩa là bạn không thể chạy Notepad miễn là cài đặt có hiệu lực.

Trong khi đó, nếu bạn làm theo Phương pháp 1, bạn vẫn có thể khởi chạy Notepad bằng cách đề cập đến đường dẫn đầy đủ của nó trong hộp thoại Run. Bạn cũng có thể mở tệp bằng Notepad bằng cách chọn Notepad từ Mở bằng hộp thoại nhé.

## Cách 1: Liên kết tệp văn bản (.txt) với Notepad ++

1. Tạo một tài liệu văn bản mẫu trên máy tính để bàn.
2. Nhấp chuột phải vào file và nhấp vào Properties.
 ![hình ảnh](https://images.viblo.asia/b43e06b4-33cf-420c-b3f4-9cfcf74f839c.png)
3. Nhấp vào nút Thay đổi, chọn Notepad ++ từ danh sách các ứng dụng được hiển thị và nhấp vào **OK**.

![hình ảnh 3](https://images.viblo.asia/1ea5288c-733b-45d2-84ac-d4f312c5a9e6.png)

4. Nếu Notepad ++ không được liệt kê ở đó, hãy nhấp vào Thêm ứng dụng khác. Để hiển thị danh sách mở rộng. Notepad ++ có thể không được liệt kê ở đó nếu bạn đang sử dụng phiên bản di động. Nếu vậy, hãy nhấp vào Tìm kiếm một ứng dụng khác trên PC này và duyệt thủ công thư mục Notepad ++ để chọn tệp thực thi. Đường dẫn thực thi Notepad ++ mặc định là *C:\Program Files (x86)\Notepad++\notepad++.exe*
5. Bấm đúp vào file .txt  bây giờ sẽ mở Notepad ++.

## Cách 2: Thay thế Notepad bằng Notepad ++ bằng Debugger Registry Value
##  
 Windows cung cấp một cách để chuyển hướng một chương trình (quy trình) bằng cách sử dụng Debugger Registry Value. Khi bạn chuyển hướng một chương trình bằng phương pháp này, mỗi khi bạn khởi chạy Notepad bằng cách chạy notepad.exe trực tiếp hoặc khi chạy file văn bản, Notepad ++ sẽ khởi động thay vì Notepad.


### Tùy chọn 1: Sử dụng dòng lệnh mới của Notepad ++

Lưu ý: Đây là phương pháp KHUYẾN NGHỊ . Nó không cần chương trình hoặc kịch bản của bên thứ 3.

Nếu bạn có phiên bản Notepad ++ 7.5.9trở lên, bạn có thể chạy lệnh sau để tạo Notepad ++ thay thế Notepad.

1. Bắt đầu một Dấu nhắc lệnh nâng cao hoặc bằng Adminstrator
2. Sao chép lệnh sau và dán nó vào cửa sởo Command Prompt:

```
reg add "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v "Debugger" /t REG_SZ /d "\"%ProgramFiles(x86)%\Notepad++\notepad++.exe\" -notepadStyleCmdline -z" /f
```


Lưu ý rằng bạn có thể cần phải sử dụng  %ProgramFiles%\Notepad++\Thay thế cho  %ProgramFiles(x86)%\Notepad++\ nếu bạn đã cài đặt Notepad ++ 64 bit hoặc sử dụng đường dẫn khác nếu Notepad ++ của bạn được cài đặt ở vị trí không mặc định.

Sau khi chạy lệnh, đây là cách debugger giá trị đăng ký trông như sau:
![giả lập tencent với gameloop.mobi](https://images.viblo.asia/6d3ff1eb-af59-4ba5-b8a3-861baa4c0b1c.png)


notepad cộng với thay thế trình gỡ lỗi notepad.exe Bạn cũng có thể sửa đổi giá trị đăng ký ở trên bằng cách sử dụng Registry Editor ( regedit.exe) nếu bạn không thích phương thức dòng lệnh.

Để hoàn tác (đảo ngược) thay thế, sử dụng lệnh sau:

```
reg delete "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v "Debugger" /f
```

Đóng cửa sổ  Command Prompt .

**Tùy chọn 2: Sử dụng chương trình NotepadReplacer

Phần mềm NotepadReplacer từ Binary Fortress cho phép bạn thay thế Notepad một cách dễ dàng! Không cần chỉnh sửa registry; chương trình tự động làm điều đó.

Tải về chương trình NotepadReplacer này và chạy nó.
![](https://images.viblo.asia/eccbf103-e1bd-4cac-801b-220db1f10553.png)


Chọn lựa chọn thay thế Notepad (giả sử Notepad ++) bằng cách duyệt và chọn tệp thực thi và hoàn tất các bước.
![gameloop.mobi tencent gaming buddy](https://images.viblo.asia/2510284f-3886-4e2f-99b3-3268a32ac88f.png)


Chương trình này tự động thiết lập trình gỡ lỗi cho Notepad, chuyển hướng nó sang Notepad NotepadReplacer.exe, một chương trình proxy sau đó khởi chạy Notepad ++ và chuyển các đối số tên tệp cho nó.

Bài viết bởi: Gameloop.Mobi