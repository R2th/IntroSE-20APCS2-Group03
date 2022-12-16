![](https://images.viblo.asia/e4fae9c6-e012-40e6-b67b-7b4005e756f1.png)
* Bạn có muốn sử dụng 1 widget ở bottom của scrren như hình bên trên không ? Nó không phải là library của 1 tổ chức riêng biệt nào tạo nên mà nó được google xây dựng nên.
* Cùng 1 loạt đổi mới về mô hình kiến trúc mà Google muốn Android develope hướng tới, họ cũng xây dựng một chuẩn mới về design cho Android để cung cấp nhiều tính năng hơn cho Android developer và cho người dùng trải nghiệm tốt hơn.
* Trong sự thay đổi, Google không thay đổi tất cả mà vẫn giữ cải cũ cải tiến view của nó như: Button, Card... và có thêm 1 số widget mới nhứ: Chip, ButtonAppBar...
* Nghe có vể thú vị đúng không chúng ta hãy xem 1 vài hình ảnh khác về nó để có cái nhìn trực quan hơn.
* **Lưu ý**: Để có thể sử dụng các widget mình suggest đưới đây, các bạn phải import thư viện *material component* và chuyển sử dụng import support library sang *AndroidX*: 

```
   com.google.android.material:material:$versions.support_design
```
* Mình và mọi người sẽ đi qua 1 vài widget để thấy được sự thay đổi 
# 1. Button
![](https://images.viblo.asia/c92a5d0a-e916-4762-a634-6376678795a6.png)
* Với việc áp dụng style có sẵn mà material cung cấp chúng ta có thể có được các button 1 cách dễ dàng:
```
   style="@style/Widget.MaterialComponents.Button.UnelevatedButton"
```
```
   style="@style/Widget.MaterialComponents.Button.UnelevatedButton"
```
```
   style="@style/Widget.MaterialComponents.Button.TextButton"
```
```
   style="@style/Widget.MaterialComponents.Button.OutlinedButton"
```
* Chi tiết các bạn có thể xem ở đây: https://material.io/design/components/buttons.html

# 2. BottomAppBar
![](https://images.viblo.asia/e4fae9c6-e012-40e6-b67b-7b4005e756f1.png)
* Material cung cấp 1 widget mới có chức năng rất đầy đủ là BottomAppBar, chúng cho chúng ta thêm action và behavior. 

# 3. Chip
![](https://images.viblo.asia/17aeb0a9-cf0d-4e0a-ac47-f1ffd202024f.png)
* Chip là 1 widget mới cho phép người sử dụng nhập thông tin, lọc nội dung và áp dụng những ứng dụng. Nó có thể thay thế cho Button, CheckBox.
# 4. Tổng kết
* Công nghệ google đang thay đổi liên tục. Hi vọng bài viết này sẽ giúp ích phần nào cho mọi người.
* Trong bài viết mình có dùng thêm 1 vài component mới như Navigation, ViewModel. Mọi người có thể bỏ qua và tập trung vào các component nha.
* Link github: https://github.com/fs-sournary/MaterialDesignTutorial