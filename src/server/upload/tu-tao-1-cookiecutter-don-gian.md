# Cơ chế hoạt động của cookiecutter

Cách đơn giản nhất để hiểu cookiecutter là tạo 1 cái đơn giản với nó, chúng ta sẽ xem cách nó hoạt động ra sao.


# ExampleProject

### Tạo thư mục mới
```bash
mkdir ExampleProject
cd ExampleProject
```

### tạo các mẫu template đơn giản
Bên trong thư mục chúng ta sẽ tạo 1 folder như sau:
```
mkdir {{cookiecutter.directory_name}}
cd {{cookiecutter.directory_name}}
```

Phần `directory_name` sẽ được ghi đè hoặc lấy giá trị mặc định ở file `cookiecutter.json`
chúng ta sẽ tạo thêm 1 file được ghi đè tên file khi chạy CLI
```
touch {{cookiecutter.file_name}}.py
```
Bên trong file đó chúng ta sẽ ghi thêm đoạn hello world đơn giản, với ngôn ngữ python cho dễ, mặc dù chúng ta có thể sử dụng mọi loại file ngôn ngữ tùy ý.

```
print("Hello, {{cookiecutter.example_option}}!"}
```

### tạo file cookiecutter.json
Cuối cùng chúng ta sẽ có file `cookiecutter.json`
```
{
    "directory_name": "Example",
    "file_name": "test_controller",
    "example_option": "quanghung97"
}
```

### kiểm tra cấu trúc thư mục
![](https://images.viblo.asia/4597a5ba-e1e0-4268-bb41-b2916a586fdb.png)

# Khởi chạy demo
```
cookiecutter ExampleProject
```
![](https://images.viblo.asia/aa33d44d-2871-4043-9304-31a3c768437d.png)

kết quả thu được chúng ta có 1 directory mới là `ahihi`

![](https://images.viblo.asia/438c81c6-e98a-415e-b052-9acb5f703abc.png)

chạy thử cái file được tạo `ahuhu.py` như sau:

![](https://images.viblo.asia/eaee00ef-02f2-4a2e-aa46-a17c59c48a0c.png)

# Kết luận
Thông qua ví dụ minh họa có thể thấy được cách sử dụng rất đơn giản. Tiếp theo mình sẽ tích hợp kiến thức đã học với cookiecutter để tạo 1 base dự án extension chorme template với Vue và các tùy chọn cài đặt ban đầu với các thư viện tùy theo mục đích sử dụng. Dự án này là Open source, tương lai có thể làm nhưng chưa biết là lúc nào làm xong. =))