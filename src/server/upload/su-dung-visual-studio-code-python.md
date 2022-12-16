Python đã trở thành một trong những ngôn ngữ lập trình phổ biến năm 2022.

Bài viết này sẽ hướng dẫn các bạn sử dụng Visual Studio Code - Một Editor đa năng phát triển bởi MicroSoft.

# 1. Để cài đặt
Các bạn download từ link bên dưới (Link chính thức của Microsoft)
[DOWNLOAD VISUAL STUDIO CODE](https://code.visualstudio.com/Download)

Việc cài đặt rất dễ dàng, bạn chọn file cài đặt tương ứng với hệ điều hành sử dụng, click đúp cài đặt phần mềm.
![image.png](https://images.viblo.asia/8c234f60-b54c-4370-9cb9-fc24622ea2a0.png)

![image.png](https://images.viblo.asia/066ec125-a3ba-408d-a204-1f6b1caff064.png)

![image.png](https://images.viblo.asia/d91e0d9f-0995-4682-8c79-ef90f46856f8.png)

![image.png](https://images.viblo.asia/2953a45d-7727-4dfd-9dba-0a0e562972c9.png)
# 2. Các extension hỗ trợ lập trình
Visual Studio Code được Microsoft phát triển cho nhiều ngôn ngữ lập trình, nên để lập trình Python trên đó các bạn cài một số extension cần thiết.

Để cài extension bằng lệnh, trên VS code bấm tổ hợp phím [ Ctrl + P ], nhập lệnh cài đặt và gõ phím [ Enter ]

Để cài đặt thông thường các bạn bấm tổ hợp phím [ Ctrl  + Shift + X ] hoặc bấm vào biểu tượng Extension trên VS code, tìm kiếm extension cần thiết bấm [ Install ] để cài đặt.
![image.png](https://images.viblo.asia/7420ce16-df10-4ff1-bb33-f794e1c066e7.png)

# 3. Hướng dẫn sử dụng VS
Tạo Workspace

Từ cửa sổ VS Code, bấm tổ hợp phím [ Ctrl + N ]

Tạo file hello-world.py

![image.png](https://images.viblo.asia/66c6d1b8-6cf3-4d2d-9ac5-aec160e5b833.png)

Lần sau bạn muốn mở lại Project chỉ cần chọn [ Ctrl + O ] browser tới file này.

# 4. Chạy python script
Sau khi tạo file hello-world.py, để chạy file này chúng ta kích chuột phải vào file chọn "Run python file in terminal"

![image.png](https://images.viblo.asia/79e8893e-d0d2-404a-85f4-5279bced63a7.png)

Kết quả:
![image.png](https://images.viblo.asia/78020514-fae1-4988-ab33-36ab4e5d12d0.png)

# 5. Một số mẹo hay khi lập trình Python bằng VS
a. Nhảy tới 1 function

Giữ phím [ Ctrl ] và bấm vào function, method để nhảy tới function mà bạn đã định nghĩa.

b. Format source code theo chuẩn PEP 8 

```python -m pip install -U autopep8 --user```

Bấm tổ hợp phím [ Ctrl + Shift + I ] để format file source code cho chúng.