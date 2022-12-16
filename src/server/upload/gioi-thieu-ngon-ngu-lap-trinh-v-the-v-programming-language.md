## Giới thiệu

V là một ngôn ngữ lập trình "statically typed compiled" mới được thiết kế xây dựng dưới dạng phần mềm mã nguồn mở.

Nó được mô tả như một ngôn ngữ đơn giản, nhanh chóng và được biên dịch để tạo ra phần mềm.

Người tạo ra nó, Alex Medvednikov, nói rằng nó rất giống với Go và được lấy cảm hứng từ Oberon, Rust và Swift .

Website official: https://vlang.io

Github: https://github.com/vlang/v

## Các tính năng trong V

### 1. Đơn giản (Simplicity): 
Bạn có thể học toàn bộ ngôn ngữ bằng cách xem tài liệu (https://vlang.io/docs) trong nửa giờ. 
Bạn sẽ mất ít thời gian hơn nếu bạn đã biết tới ngôn ngữ Go lang.
Mặc dù đơn giản, nhưng V cung cấp rất nhiều sức mạnh cho các nhà phát triển. 
Bất cứ điều gì bạn có thể làm trong các ngôn ngữ khác, thì bạn cũng có thể làm trong V.

### 2. Biên dịch nhanh (Fast compilation)
- V biên dịch ≈1,2 triệu dòng code mỗi giây trên mỗi core CPU  (Intel i5-7500 @ 3.40GHz, SM0256L SSD, no optimization)
- Tốc độ như vậy đạt được bằng cách trực tiếp generate ra machine code và module hóa mạnh mẽ.
- V tự biên dịch trong 0,3 - 0,6 giây.
- V cũng có thể emit C, sau đó tốc độ biên dịch giảm xuống ≈100k dòng code/giây/CPU.

### 3. Dễ dàng phát triển (Easy to develop)
Toàn bộ ngôn ngữ và thư viện tiêu chuẩn của nó là ít hơn 1 MB và bạn có thể build nó trong 0,4 giây.

So sánh với các ngôn ngữ khác
| Language | Space required | Build time |
| -------- | -------- | -------- |
| Go     | 525 MB	     | 1m 33s     |
| Rust     | 30 GB     | 45m     |
| GCC     | 8 GB     | 50m     |
| Clang     | 90 GB     | 25m     |
| Swift     | 70 GB     | 90m     |
| V     | < 1 MB     | 0.4s     |

V chỉ có một phụ thuộc: trình biên dịch C. Và nếu bạn đang phát triển, bạn đã cài đặt trình biên dịch C.

### 4. Hiệu suất (Performance)
- As fast as C
- C interop without any costs
- Minimal amount of allocations
- Built-in serialization without runtime reflection
- Compiles to native binaries without any dependencies: a simple web server is only 65 KB

### 5. An toàn (Safety)
- Không có giá trị null
- Không có biến toàn cục
- Không có undefined values
- Không có undefined behavior
- Không có variable shadowing
- Bounds checking
- Option/Result types & error handling
- Generics
- Các biến không thay đổi theo mặc định
- Các chức năng thuần túy theo mặc định
- Cấu trúc bất biến theo mặc định

### 6. Dịch ngôn ngữ C sang V
V có thể dịch toàn bộ dự án xóa C hoặc C ++ của bạn và cung cấp cho bạn sự an toàn, đơn giản và tăng tốc độ biên dịch lên tới 400 lần. 

Ví dụ C/C++
```
std::vector<std::string> s;
s.push_back("V is ");
s.push_back("awesome");
std::cout << s.size(); 
```

V lang
```
mut s := []
s << 'V is '
s << 'awesome'
println(s.len)
```
### 7. Làm mới code tức thì (Hot code reloading)
Nhận thay đổi của bạn ngay lập tức mà không cần biên dịch lại. 

Điều này có thể tiết kiệm rất nhiều phút quý giá cho thời gian phát triển của bạn.
![](https://images.viblo.asia/8a5d112a-f6ad-4747-b13a-526b305f48f8.gif)


### 8. Thư viện đồ họa và giao diện người dùng mạnh mẽ (Powerful UI and graphics libraries)
Thư viện bản vẽ đa nền tảng được xây dựng dựa trên GDI+/Cocoa Drawing và thư viện đồ họa dựa trên OpenGL cho các ứng dụng 2D/3D phức tạp hơn, cũng có các tính năng sau: 

- Tải các đối tượng 3D phức tạp bằng họa tiết xóa 
- Camera (di chuyển, nhìn xung quanh ) 
- Skeletal animation
- Hỗ trợ DirectX, Vulkan và Metal đã được lên kế hoạch.
![](https://vlang.io/img/gg.png)

Một ví dụ đơn giản về thư viện đồ họa đang hoạt động là tetris.v (https://github.com/vlang/v/tree/master/examples/tetris)

### 9. Dễ dàng biên dịch chéo (Easy cross compilation)
Để biên dịch chéo phần mềm của bạn chỉ cần chạy `v -os windows .` hoặc `v -os linux .`

Không cần thêm bước nào khác, ngay cả đối với GUI và ứng dụng đồ họa!

![](https://images.viblo.asia/172a4a75-f3a6-4931-9b75-a415757b60af.gif)

### 10. Tích hợp mạnh mẽ Web framework
```
['/post/:id']
fn (b Blog) show_post(id int) vweb.Result {
  post := b.posts_repo.retrieve(id) or {
     return vweb.not_found()
  }
  return vweb.view(post)
}
```
Đây là 2 ví dụ điển hình sử dụng vweb/vtalk để build: V forum (https://blog.vlang.io/forum) và V blog (https://blog.vlang.io/)

## Kết luận
V lang là một ngôn ngữ mới mẻ đáng chờ đợi nhất và vẫn đang ở bản alpha, bản 1.0 sẽ được ra mắt vào tháng 12 năm nay. 
V được đánh giá rất cao bởi các nhà phát triển trên thế giới, chính vì thế từ bây giờ các bạn có thể nghiên cứu cũng như học ngôn ngữ này.
Rất có thể sau này V lang sẽ trở thành một trong những ngôn ngữ hot nhất thế giới. :)