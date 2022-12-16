# Giới thiệu
Xin chào các bạn ! Ở bài viết này mình sẽ hướng dẫn các bạn làm một hệ mặt trời 2D đơn giản bằng Animation trong Swift . Những hình ảnh mình sử dụng ở trong project này các bạn có thể tải về tại đây. 
https://drive.google.com/drive/u/1/folders/1Ms1S_OSUqX3lsf5ElCjMc0AexiRhhw9Y

![](https://images.viblo.asia/8aa27422-3917-4e6e-a7fd-30fad652cd70.gif)
# Bắt đầu
Đầu tiên ta sẽ tạo một UIImageView ở giữa màn hình của ta. UIImageView này ta sẽ để hình mặt trời.!

[](https://images.viblo.asia/11155615-1ca5-4ac9-abba-c8b589e30554.png)

Tiếp theo ta sẽ tạo một container view ở bên ngoài có kích thước width và height bằng với UIImageView. Container View này sẽ chứa hình ảnh của các hành tinh của ta .Nên ở trong này ta sẽ tạo một UIImage View ở trong nó .

![](https://images.viblo.asia/07d8ae88-768b-43e4-b4a1-e5093867e6b8.png)

Ta sẽ tạo thêm các container view tương ứng với số hành tinh muốn hiển thị ở trong ứng dụng của ta.Ở đây mình chỉ ví dụ ba hành tinh thôi nên mình chỉ tạo ba container view.

![](https://images.viblo.asia/7a0f8e5f-7034-4714-a7b8-e250f4d8599e.png)
# Cài đặt Animation
Tiếp theo để cho các hành tinh này chuyển động xung quanh mặt trời thì ta cần thêm các animation cho nó.

![](https://images.viblo.asia/96a834ba-596e-44cd-b0a4-2a660f52549f.png)

Ở đây thì ta sẽ chỉnh lại contant top của các ảnh hành tinh cho nó ra xa cái mặt trời của ta một chút.

Ta tạo một hàm để khời tạo animation trong extension của UIView .

Animation này sẽ tranform theo số pi giúp cho container view chứa hành tinh của ta có thể xoay tròn xung quanh mặt trời

![](https://images.viblo.asia/79f2ac8c-8568-4196-8943-da5d75746029.png)

Cuối cùng ta chỉ cần cài từng animation cho từng cái container view của từng hành tinh là xong . Chỉnh cho time duration của các container view là khác nhau.

Xong rồi vậy là ta đã có thể tạo ra một hệ mặt trời đơn giản bằng cách sử dụng animation trong swift .

Cảm ơn các bạn đã xem bài viết.