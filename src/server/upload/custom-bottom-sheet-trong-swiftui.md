Chào các bạn hôm nay mình sẽ hướng dẫn các bạn custom một cái Sheet của riêng bạn bằng SwiftUI một cách đơn giản.
Thôi không dài dòng nữa chúng ta cùng bắt đầu thôi nào.
![](https://images.viblo.asia/86a9f965-105f-4c29-a0fc-65383757adba.png)
# Tạo một cái list
Thì ban đầu ta sẽ tạo ra một cái list để hiển thị ra những cái trái ác quỷ của ta ra cho người dùng thấy. 
Thì để làm như vậy thì ở đây mình sử dụng thằng LazyVGrid và mình để thằng Grid này bên trong một cái ScrollView giúp cho ta có thể trượt lên trượt xuống xem các trái ác quỷ có trong List của ta :smile:
Ở thằng LazyVGrid này thì ta chú ý thằng colums trong nó : 

![](https://images.viblo.asia/45b74d4d-518a-45e9-8e1f-999e093ecb82.png)

nó sẽ có ba loại chính để định nghĩa một colum trong grid đó là:
- **fixed** là một trong những thứ đơn giản nhất. Thiết lập kích thước cho cột để phù hợp với kích thước mà bạn xác định. 
-**flexible** cho phép chúng ta xác định một cột đó mở rộng hoặc co lại tùy thuộc vào không gian có sẵn. Chúng ta cũng có thể cung cấp kích thước tối thiểu và tối đa cho cột. Theo mặc định, nó sử dụng 10pt là giá trị nhỏ nhất và vô cực là giá trị lớn nhất.
- **adaptive**cho phép chúng tôi đặt vào nhiều mục nhất trong không gian của một cột.

![](https://images.viblo.asia/3fe39d60-82b1-4365-9570-e90398c9558b.png)

![](https://images.viblo.asia/86a9f965-105f-4c29-a0fc-65383757adba.png)

# Tạo Bottom Sheet của ta 

Thì ở đây thì ta cũng chỉ tạo một cái view thôi 

![](https://images.viblo.asia/8cd85300-35e3-4853-b550-9bb38eaf5803.png)

Ở đây trong View này có một thuộc tính là padding(.bottom, UIApplication.shared.windows.last?.safeAreaInsets.bottom ?? 0 + 10) 
thì thằng này sẽ tạo một khoảng cách của bottom view với độ dài là từ safe area bottom để cho bottom sheet của ta ko bị tụt xuống dưới cùng quá mà hở lên xí .
Và thằng view này có hai thuộc tính read only đó là cái item devil fruits mà nó sẽ hiển thị và background color của cái bottom sheet đó hai thuộc tính này đều truyền từ thằng ContentView qua.

Ở thằng Container View thì lúc này ta sẽ bỏ cái view danh sách trái ác quỷ và bottomView này của ta vào một cái ZStack để hai thằng sẽ nằm đè lên nhau.
Và khi người dùng bấm vào một trong các item của danh sách thì lúc này nó sẽ hiện thằng bottom sheet kia lên.

![](https://images.viblo.asia/77d0b010-8a55-4af0-8d28-296da65763d3.png)

![](https://images.viblo.asia/31517538-a20a-452b-9b3f-43b3b95c8d51.png)

Và ở cuối thằng ZStack ta chỉ cần để animation(.default) để cho nó có hiệu ứng trượt lên khi ta bấm vào.

![](https://images.viblo.asia/8d90babe-cc90-4769-a4a6-a95d8448ffe4.png)

![](https://images.viblo.asia/6f0e4704-12de-4fc6-b0e5-481174bfcd7e.png)

Chúc các bạn thành công :kissing_closed_eyes::kissing_closed_eyes:
Đây là mã nguồn của demo : https://github.com/thanduchuy/SwiftUI-OnePice