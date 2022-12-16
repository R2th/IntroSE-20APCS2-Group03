# Giới thiệu 
Tại trang chủ của [developer.google.com](https://developers.google.com/web/tools/chrome-devtools) có giới thiệu về Chrome Devtools:
> Chrome DevTools is a set of web developer tools built directly into the Google Chrome browser. DevTools can help you edit pages on-the-fly and diagnose problems quickly, which ultimately helps you build better websites, faster.

Theo đó thì Chrome DevTools là công cụ được tích hợp sẵn trên trình duyệt dành cho nhà phát triển. 

Nó là một trong những công cụ thiết yếu của các web developer. Dễ dàng sử dụng, không cần cài đặt. Giúp developer phát triển sửa lỗi website một cách nhanh chóng.
![](https://images.viblo.asia/afb9431a-d874-43fd-9ff8-4d5c91439105.PNG)

# Sử dụng
## Cách mở Chrome Devtool
- Cách thông dụng thường thấy nhất là click chuột phải vào page đang chọn và chọn `Inspect`
![](https://images.viblo.asia/4bf94640-2ecb-47d2-8458-66a43690d2e7.png)

- Bạn cũng có thể dùng phím tắt `Ctrl + Shift + C` để vào tool `Elements` hay  `Ctrl + Shift + J` để vào tool  Console, hoặc `Ctrl + Shift + I` để vào tool cuối cùng bạn đã mở trên Devtools.
## Hiển thị
### Toggle device toolbar (Ctrl + shift + M)
Một cách điều chỉnh kích thước cửa sổ của bạn để kiểm tra với các thiết bị khác nhau. Có thể chọn các kích thước loại máy có sẵn, hay tự chỉnh responsive bằng cách kéo thả bottom và right hay chỉnh sửa trực tiếp kích thước.
![](https://images.viblo.asia/44233ab4-0208-403d-899e-b26ec9776804.png)
Chrome cũng gợi ý bạn kích thước trang web theo thiết bị (thanh màu xám ngay dưới tùy chọn).

Nhấn một lần nữa Ctrl + Shift + M hay click icon `Toggle device toolbar` góc trên bên trái devtools để trở lại bình thường
### Option
Là tùy chọn phía trên bên phải màn hình Devtools.
![](https://images.viblo.asia/13a3804f-b3ef-4e95-b260-edd16350a879.PNG)

**Dock size**
![](https://images.viblo.asia/09672d1e-9f56-45fd-96bb-4567ae5ba41c.png)
Ở bên phải màn hình Devtool có tùy chọn hiển thị:
- Undock into separate window
- Dock to left
- Dock to buttom
- Dock to right

Tương ứng với các vị trí bạn muốn devtool hiển thị: tạo một cửa sổ riêng, bên trái, bên dưới và bên phải.

Ví dụ để Devtool hiển thị bên phải:
![](https://images.viblo.asia/05569c10-f010-4308-b325-99d7522395df.PNG)

**More tools**

Bạn có biết những Devtools bạn nhìn thấy là những devtool bạn hay sử dụng, còn rất nhiều những devtool bạn ít sử dụng đến nó được ẩn đi. Bạn có thể chọn Option -> `More tool` để chọn những tools này.

**Search** (Ctrl + Shift + F)

Để search với dữ liệu là dữ liệu của tất cả các tools trong devtool, bạn có thể chọn chức năng search khi Devtools được bật lên (nhớ là chỉ khi devtools được bật lên nhé :upside_down_face:)

**Run command** (Ctrl + Shift + P)

Devtools cũng có các command của nó. Để bật bạn có thể chọn Option -> `Run command` hoặc  (Ctrl + Shift + P). Tương tự Search thì nó cũng chỉ chạy khi Devtools được bật, không là bạn sẽ vào Print đấy.
![](https://images.viblo.asia/7c37c83e-c149-424c-aadc-35e238482c5c.png)

Command ở đây có 5 kiểu:
- Một là command bật các tool ( có dấu `>` ở đầu):
Có rất nhiều, rất nhiều lựa chọn ở đây, gần như bạn có thể chọn bất kỳ tool nào, hay setting qua `command`.
![](https://images.viblo.asia/9ca0943f-5185-4d32-8205-bd2749c9009e.png)

- Hai là command mở các files (không có dấu `>` ở đầu):
Cái này thì chỉ gõ tên tìm kiếm click mở file thôi :rofl:
![](https://images.viblo.asia/5e841d09-21f7-4897-a98e-b1146ecf71cb.png)
- ... còn có Goto line, Run snippet, Go to symbol.
### Setting

Các cấu hình của devtool được cấu hình ở đây
![](https://images.viblo.asia/0660c2e3-bd84-4892-b746-df0aa53d6489.png)
Có nhiều cái có thể cấu hình quá nên mình xin phép không kể hết ra :sweat_smile:

Nhưng cái mình hay vào đây để sử dụng là `Disable Javascript` trong Preferences/Debugger. 

**Note**: Có những trang người ta cho mình xem text nhưng không cho mình copy thì chỉ cần `Disable Javascript` là copy như thường thoi.

Một cái nữa cũng hay xem là các `Shortcuts` các phím tắt của Chrome Devtools, xem để sử dụng cho nhanh :+1: 

# Tổng kết
Các phần tiếp theo mình sẽ tìm hiểu về một số tools sử dụng phổ biến của Chrome Devtools.

Cảm ơn các bạn đã đọc :maple_leaf::maple_leaf::maple_leaf: