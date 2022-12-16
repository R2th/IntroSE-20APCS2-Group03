Sau một vài ngày xem các channel của hacker nước ngoài, mình đã khám phá ra một công cụ rất hiệu quả cho lập trình viên, - đó là Cheat.sh.

> Unified access to the best community driven cheat sheets repositories of the world

*Đó là miêu tả ngắn từ trang chủ của cheat.sh*

Nói đơn giản thì đây là một công cụ giúp chúng ta tìm kiếm thông tin về các vấn đề coding, thay vì phải dùng google thì chúng ta chỉ cần mở terminal lên và gõ lệnh.
# Các tính năng chính:
- Có giao diện curl đơn giản.<br>
- Bao gồm hơn 56 ngôn ngữ lập trình, đa số DBMSes, và hơn 1000 câu lệnh UNIX/Linux quan trọng.<br>
- Cung cấp quyền truy cập vào kho lưu trữ do cộng đồng tốt nhất trên thế giới như StackOverflow.<br>
- Có thể dùng mà không cần cài đặt.<br>
- Cực nhanh, trả dữ liệu về dưới 100ms.<br>
- Có câu lệnh riêng tiện lợi, cht.sh,nó rất hữu ích và nó không bắt buộc phải dùng.<br>
- Có thể dùng ngay trong code editor, không cần phải mở trình duyệt.<br>

# Cách dùng
Chúng ta cùng thử dùng nó theo cách cơ bản nhất
```bash
curl cheat.sh
```
![](https://images.viblo.asia/05cf2ab2-8347-47c8-a315-65565562b759.png)
Như các bạn thấy nó cung cấp rất nhiều tính năng, bên cạnh đó bạn có thể thực thi câu lệnh bằng nhiều cách khác nhau như:
```bash
curl cheat.sh
curl cht.sh
curl https://cht.sh
```


Giờ đến phần chính của công cụ này, ví dụ bạn muốn tìm cách dùng của lệnh "ls" nhưng manual quá rườm rà, bạn chỉ cần đơn giản là
```bash
curl cht.sh/ls
```
![](https://images.viblo.asia/896f2b12-fafd-4471-bcce-264c3341b748.png)
Nó sẽ trả về cho bạn cách dùng và cả các ví dụ cụ thể.

Áp dụng vào thực tế, ví dụ bạn đang code javascript mà quên cách convert string sang number thì bạn chỉ việc gõ lệnh mà không cần phải lên google và click đọc từng trang.
```bash
curl cht.sh/javascript/convert-string-to-number
```
![](https://images.viblo.asia/2b1d4840-fe91-47b7-aa01-22feba1c729b.png)
Như bạn thấy có cả code mẫu cho bạn có thể tham khảo và rất nhiều cách khác nhau. Dĩ nhiên bạn có thể tìm cả ngôn ngữ khác.
![](https://images.viblo.asia/a2655441-8e68-4870-b5d9-77e88613b93a.png)

Bạn cũng có thể tìm hiểu document về tính năng của ngôn ngữ với syntax như trên. Ví dụ javascript async/await, java hibernate, etc.

# Tổng kết
Sau vài ngày trải nghiệm thì mình đã dần giảm thời gian phải research quá nhiều thông tin trên google, hoàn thành task nhanh hơn cũng như hiệu quả hơn. Cảm ơn các bạn đã đọc, mình mong công cụ này sẽ được phát triển nhiều hơn nữa.

### Tham khảo:
https://cheat.sh/

https://github.com/chubin/cheat.sh