Nếu bạn là dev mới học FLutter thì bạn sẽ thấy khá phiền phức vì cấu trúc lồng nhau của nó, sự khó khăn của việc thêm hoặc xoá các widget ở đoạn giữa của cây widget hay là việc tìm kiếm chỗ kết thúc của một widget widget. Rồi bạn phải dành nhiều thời gian chỉ để tìm các cặp dấu ngoặc đóng mở tương ứng. Điều này không lạ một chút nào vì hầu hết dev Flutter đều từng trải qua việc này lúc ban đầu. May sao AS IDE đã hỗ trợ cho chúng ta một số shortcut cực kì tiện dụng giúp chúng ta giải quyết các rắc rối đó và việc của mình hôm nay là giới thiệu chúng đến cho các bạn để việc dev Flutter nhanh hơn và mượt hơn.

# Tạo mới một Stateless hay Stateful widget

Bạn không cần phải tạo một class thủ công rồi override build fun mà IDE đã có sẵn shortcut để làm việc đó cho bạn rồi.

gõ `stless` để tạo mới một Stateless widget

![](https://images.viblo.asia/43a9f782-3cf3-4af9-a6c2-b9693a0abe13.gif)

hoặc gõ `stful` để tạo mới một Stateful widget

![](https://images.viblo.asia/4d0c6347-c3d8-4a78-8da5-d69f65a8e63c.gif)

Trường hợp bạn đã có sẵn một Stateless với hàm build đã được implement với các child widget mà bạn muốn chuyển nó thành Stateful thì liệu bạn có cần phải tạo một Stateful và copy toàn bộ hàm build sang hay không? Câu trả lời là không, IDE đã hỗ trợ sẵn cho bạn việc chuyển đổi này.

Bạn chỉ cần di chuyển con trỏ đến vị trí của `StatelessWidget`, nhấn `Alt + Enter` và chọn `Convert to StatefulWidget`. Mọi việc sau đó được chuyển hoàn toàn tự động, tuyệt vời.

![](https://images.viblo.asia/41b3c1a8-d43a-44df-bf03-6370c9e595fe.gif)

# Các thủ thuật khác với Alt + Enter

`Alt + Enter` là chìa khoá thần kỳ để bạn có thể dev FLutter nhanh hơn, ví dụ bạn có thể chọn một widget bất kì và nhấn `Alt + Enter` để xem các tuỳ chọn mà bạn có thể thực hiện cho widget đấy.

## Thêm một Padding xung quanh một Widget

Giả sử rằng bạn có một widget không phải là Container thì nó sẽ không có thuộc tính padding. Nếu bạn muốn thêm padding cho nó nhưng lại thấy cấu trúc lồng nhau thật phức tạp khó sửa. Thì với cách này bạn có thể thêm Padding một cách dễ dàng:

![](https://images.viblo.asia/4ccfff36-75e8-4ae9-9e6d-85fcc0da1ee5.gif)

Bạn chỉ cần nhấn `Alt + Enter` trên widget mà bạn cần thêm padding và nhấn chọn `Add Padding`, sau đó bạn có thể tuỳ chỉnh giá trị padding mà bạn mong muốn nếu như khác với giá trị default.

## Center một Widget

Đơn giản là đưa widget của bạn vào center của vùng khả dụng. Cái này không hoạt động trong Column và Row.

![](https://images.viblo.asia/5551af8a-14fc-4f78-b312-ee8e58d73c47.gif)

## Wrap widget với một Container, Column, Row hoặc một widget bất kỳ

Cũng với cách tương tự ở trên thì bạn có thể wrap một widget bởi một `Container`, và `Container` mới sẽ là parent widget của widget hiện tại

![](https://images.viblo.asia/797abb16-731e-48ed-b801-133290b4e9b6.gif)

Bạn cũng có thể wrap nhiều widget bởi một Column hoặc Row

![](https://images.viblo.asia/a24faa8c-a33f-4417-9232-5be9a08e47a4.gif)

Ngoài ra bạn có thể wrap với một `StreamBuilder`

![](https://images.viblo.asia/6abc7415-35bf-4667-8e09-0dbc2592d418.gif)

## Xoá widget

Với `Alt + Enter` thì xoá widget cũng dễ dàng như thêm mới vậy.

Lưu ý: child hoặc children của widget bị xoá sẽ không bị xoá cùng nó
bạn chỉ có thể xoá một widget có children khi mà parent của widget đó cũng có children

![](https://images.viblo.asia/37941146-7219-4cb3-a94a-40d65c48f8ef.gif)

# Chọn toàn bộ một Widget

Đôi khi bạn cần chọn toàn bộ một widget để extract, copy hay gì đó. Nhưng việc mà phải chọn thủ công một widget với cấu trúc ngoặc lồng ngoặc rắc rối như của flutter thì khá là khó khăn. Giờ đây bạn sẽ chỉ click chọn widget và nhấn `Ctrl + W` là có thể chọn toàn bộ widget đó dễ dàng


![](https://images.viblo.asia/74655fce-4822-44eb-8bd5-488d34b8f182.gif)

# Extract một Widget

Khi mà child view trở nên quá dài hoặc bạn muốn tách một widget thành một fun hay một widget khác để dùng lại thì thay vì phải tạo thủ công thì bạn có thể di chuyển con trỏ chuột tới widget đó và thực hiện click chuột phải chọn refactor hoặc nhấn các shortcut sau
- `Ctrl Alt M` : extract widget thành method
- `Ctrl Alt W` : extract widget thành một class widget riêng cùng file
- `Ctrl Alt E` : extract widget thành một class widget riêng ở file khác

# Flutter outline

Flutter không có preview UI cho chúng ta khi dev nhưng với hot reload thì việc này không cần thiết lắm. Ngoài ra thì Flutter cung cấp cho chúng ta công cụ tab Flutter Outline cũng giúp cho chúng ta dễ dàng nắm kiến trúc tổng quan của widget và một số thao tác sửa nhanh với cây widget.

![](https://images.viblo.asia/3c34a974-0202-4f42-81cf-6c6c7f3daff8.png)

# Kết

Mình vừa giới thiệu với các bạn một số shortcut của Android Studio IDE giúp cho việc dev Flutter mượt hơn rất nhiều, tránh tình trạng đập bàn phím và chửi thề vì code cấu trúc ngoặc lồng ngoặc gây ức chế :D.

# Tham khảo

https://medium.com/flutter-community/flutter-ide-shortcuts-for-faster-development-2ef45c51085b

https://codewithandrea.com/articles/2018-06-02-flutter-keyboards-shortcuts/