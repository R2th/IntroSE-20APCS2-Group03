# Lời mở đầu
![image.png](https://images.viblo.asia/18194769-b60d-4c14-9805-df5e75a67e23.png)

> Sau cuộc cách mạng công nghiệp lần thứ ba có thanh niên mới nổi tên là **[Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich)** đến từ **[Netscape](https://en.wikipedia.org/wiki/Netscape)** và là một dân cày chính hiệu. Sau khi xuất sơn anh ta mang theo một cuốn bí kíp có tên là **Mocha**, Xuống núi anh ta thấy **Java** lúc này của anh trai **James Gosling** đã dậy sóng giang hồ nên bú tí fame. Lật cuốn bí kíp của mình ra và đặt tên nó là **[Javascript](https://en.wikipedia.org/wiki/JavaScript)**. Từ đó một cuốn bí kíp ra đời làm nức lòng người hâm mộ.

Cuốn bí kiếp này giúp cho người mới rất dễ làm quen và vận dụng tốt được nó. Nó giúp anh em giang hồ giải quyết nhiều vấn đề gặp phải. như làm Web, App, Backend đều được. Nó càng ngày càng được ưa chuộng vởi ae Đép. Cuốn bí kíp này bạn có thể học nó theo muôn màu muôn vẻ và khi học, nó cũng k báo cho bạn là bạn đã làm đúng hay sai chỉ biết là học xong rồi. Đến khi thực hành thì tảu hoả nhập ma ối zồi ôi luôn. Biết vậy nên đại ca Microsoft bèn thêm 1 tý khuôn mẫu cho nó và đặt tên là Typescript. Như những Dev Javascript cũng biết, lúc đầu chuyển qua ông thần này học cuốn bí kiếp của ổng không đúng chuẩn là ổng chửi cho nhục luôn chứ không cần phải đợi lúc đánh nhau mới biết mình sai. Lúc đó thì quay đầu là bờ vực rồi các Dev ơi 😅

# [Typescript](https://www.typescriptlang.org/) là gì ?

Typescript là **Typed of Javascript**.  một ngôn ngữ lập trình được tạo nên dựa trên Javascript, giúp bạn tăng khả năng phát hiện mã lỗi trước khi bạn chạy mã của mình.  Nó rất mạnh trong việc kiểm tra kiểu dữ liệu và tạo những ràng buộc và bắt bạn phải tuân theo để dự án của bạn được quy trình hoá, nhắc lệnh cho developer và giúp code của bạn tường minh hơn.
> Trong javascript bạn không bị ràng buộc với kiểu dữ liệu nhiều nên việc maintain và chuyển giao dự án cho người mới là rất khó nhưng Typescript rất giỏi trong việc này. 

- Typescript là phiên bản nâng cấp hơn của javascript.
- Typescript dùng để bổ sung cú pháp vào javascript và nó kết hợp với IDE (Atom,VSCode,...) bắt lỗi ràng buộc sai hoặc thiếu dữ liệu trong mã của chúng ta.
- Bản thân Typescript không phải là ngôn ngữ thực thi vì vậy nó sẽ được biên dịch ra Javascript để chạy.

 ![image.png](https://images.viblo.asia/e98fcb81-134a-4f55-9b60-aeebcbac6ca0.png)

- Typescript sử dụng cú pháp của javascipt và thêm một số cú pháp riêng của nó để hỗ trợ chúng ta về việc có thể tự custom kiểu dữ liệu riêng.

![0ufu1q21.js-ts.jpg](https://images.viblo.asia/c5320d5b-d138-47c3-ba2e-10482dde9ff8.jpg)

# Tại sao nên sử dụng Typescript ?

💠 Với javascript mình đã từng làm việc và có một trải nghiệm không được tốt lắm về nó. Nó là ngôn ngữ đầu tiên mình biết có thể bị **lỗi cú pháp** trong thời gian chạy. 
### *Javascript* 
![](https://images.viblo.asia/55e30b7c-e935-43ef-8bf2-794fb225a62e.png)

Đấy, đoạn code trên được viết bằng javascript. Javascript không đủ thông minh để kiểm tra xem user có bị null không trước khi truy cập vào phần tử con là name. Điều này sẽ gây ra crash không cần thiết trong ứng dụng của bạn. Null là vô định tức là không có gì và chúng ta không thể nào truy cập vào phần tử con của nó (Giống như bạn không có ví mà vẫn muốn đếm trong đó mình cất được bao nhiêu tiền z 😵‍💫 )

**[Playground Link](https://playcode.io/948050)**

> Lúc này mình sẽ để các lập trình viên khác như Java,C++ nhìn vào mặt và cười sao ? Không, chúng ta không để điều đó xảy ra, với Typescript nó sẽ hiển thị lỗi cú pháp ngay sau khi khi bạn gõ sai kiểu dữ liệu và nếu bạn không biết sửa thì lúc đó ghé của tiệm của bác Stackoverflow đọc thần chú Ctrl+C và Ctrl+V ngay nào.

### *Typescript* 
![Screen Shot 2022-08-25 at 20.31.33.png](https://images.viblo.asia/28725cf0-dc81-454d-b050-7cf0c85fa230.png)

Còn với typescript bạn đang gõ rất máu nhưng lỗi hiện ra thì phải lên stackoverflow search và fix thôi.

<br/>

💠  Lợi ích chính của ngôn ngữ Typescript đó chính là khả năng thêm các kiểu dữ liệu tĩnh vào mã của bạn. Thay vì cứ any như Javascript. Typescript đã có những kiểu dữ liệu cho từng biến và hàm riêng biệt. Nó chỉ chấp nhận những kiểu dữ liệu nào, .v.v.

### *Javascript* 
```javascript:js
function addFive(num) {
    return num + 5
}
addFive("a")
```

Kết quả trả về của hàm trên là `a5` nè, **nhưng khoan**. Dừng khoản chừng là 5s. Chúng ta chỉ muốn một số + 5 với hàm này. Nhưng nó cho phép cả chuỗi cơ à. Liệu nó có phải tính năng 🙂. 

### *Typescript* 

```typescript:ts
function addFive(num:number /* Static Type is `number`*/) {
    return num + 5
}
addFive("a")
```
[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQwCaoGIwG4FMAUYIAtgFxHEBGuATogPQBUiAylMrBIgCoCeADrkQwAzogAGFajXGN6ASkQBvAFCJ1iGriggaSCogDUiAKwqAvirSYcBAETI78oA)

Với typescript bạn sẽ được bonus quả lỗi như sau.
![Screen Shot 2022-08-25 at 14.14.30.png](https://images.viblo.asia/c3854b74-e9e1-4445-82b0-85d71e1777b9.png)

> Đừng dễ dãi như javascript (any) kiểu dữ liệu nào cũng cho phép như là Đép tester nào tán cũng đổ HR nào ib cũng gửi CV. 🤣

💠 Về cú pháp của Typescript bạn cũng sẽ thấy nó dễ đọc hơn và không cần ngồi nghĩ kiểu dữ liệu của biến này là gì ? Vì những biến trong Typescript thường bắt buộc kiểu dữ liệu nghiêm ngặt (VD: number,string,CustomType,.v.v..)

💠 Nếu bạn là lập trình viên Javascript thì bạn đã đi được 50% quãng đường trở thành lập trình viên Typescript. Thực tế mã Typescript và Javascript giống hệt nhau. Bạn có thể chạy mã Javascript trong Typescript. Sự khác nhau duy nhất của nó là Typescript bổ sung kiểu dữ liệu cho biến còn Javascript thì sẽ là any (Gì cũng được).

Trên đây chính là phần 1 của bài chém gió **Có nên yêu Typescript không cần cớ ?** Cảm ơn các bạn đã dành thời gian đọc bài này. Nếu có bất kì thắc mắc hay góp ý các bạn hãy comment bên dưới hoặc tâm sự với mình qua mail phuong2612.mobile@gmail.com. 

Rất vui nếu có thể nhận góp ý hay những câu hỏi của mọi người. 

Phần sau mình sẽ giới thiệu về việc **Sử dụng Typescript như nào là hợp lí.** và **Master Typescript liệu có khó không ?** hi vọng mọi người sẽ theo dõi những bài viêt tiếp theo của mình <3