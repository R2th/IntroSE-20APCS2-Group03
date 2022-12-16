**Giới thiệu**

Chắc hẳn ai khi biết về Material Design khi phát triển ứng dụng đều muốn ứng dụng của mình áp dụng theo phong cách thiết kế này. Material design không mới nhưng mình chắc là nhiều người trong chúng ta vẫn đang dùng mà không thực sự hiểu về nó(trong đó có cả mình (yaoming)). 

Theo nguyên tắc chung thì Material Design là một môi trường 3 chiều bao gồm:  light, material, shadows. Trong đó thì light và shadows là cực kì quan trọng nếu muốn phát triển ứng dụng theo Material Design. 

Mình mới đọc được 1 bài viết khá hay về Shadows trong Material Design, nay mình viết bài viết nay với mong muốn chia sẻ đến mọi người.
Để hiểu về Light và Shadow thì có đến 6 topic liên quan bao gồm: 
*  3D trong Android
*  Độ sâu
*  Z value, độ cao và Translation Z
*  Ánh sáng
*  Trạng thái button (Đã nhấn và nghỉ)
*  Outline

Bài viết về Shadow của mình được chia làm 2 phần. Ở phần 1 này mình xin được viết về 3 topic đầu tiên bao gồm **3D trong Android,  Độ sâu, Z value độ cao và Translation Z*

# 1. 3D trong android
  Môi trường material là không gian 3D, có nghĩa là tất cả các đối tượng có kích thước x, y, và z. Trục z được định hướng vuông góc với mặt phẳng của màn hình, với trục z mở rộng hướng tới người xem. Trong material design, mọi vật đều có độ dày 1 dp.

![](https://images.viblo.asia/a95684c8-7015-4fed-a327-bad177e7a775.png)

# 2. Độ sâu

  Material design khác với thiết kế khác vì nó có chiều sâu. Chúng ta có thể nói độ sâu xác định mức độ quan trọng của **Views** trong giao diện người dùng. Hình dung bạn đang có 1 tờ giấy trên mặt bàn sau đó đặt thêm 1 tờ giấy nữa lên trên đó, đôi mắt của chúng ta sẽ thấy rằng nó có chiều sâu.
Hình bên dưới sẽ giúp bạn dễ hình dung hơn về độ sâu của các **Views** trên màn hình 

![](https://images.viblo.asia/bcdd3823-f635-4fcc-8e6a-b24dfc2e3b1f.png)

  Như trên hình các bạn có thể nhìn thấy 3 thành phần chính đang hiển thị bao gồm: **Cardviews, Appbar Layout, Floating Action Button**.  Màn hình hiển thị ta đang ước tính là bề mặt có độ sâu là 0. Mỗi thành phần hiển thị có ưu tiên khác. **Cardviews** đang hiển thị là lớp dưới cùng. Tiếp đến là **Appbar Layout**. Lớp thứ ba (Lớp trên cùng) là **Floating Action Button**.
Vậy làm thế nào để chúng ta xác định thứ tự? Làm thế nào để chúng ta làm cho người dùng cảm thấy độ sâu? Với tư duy 3d trong android bên trên ta có trả lời ta cần đến: **Z-value**.

# 3. Z value

Giá trị Z cho một **Views** có hai thành phần:
1. Elevation(Độ cao) : Thành phần tĩnh.
2. Translation Z : Thành phần động được sử dụng cho animations.
Vậy sự khác nhau giữa độ cao và TranslationZ là gì?

Elevation là tĩnh . Vì vậy, bạn dừng thay đổi nó một cách động. Nếu bạn muốn tạo ảnh động trong trục Z (như nhấn và nghỉ), bạn cần sử dụng thuộc tính Translation-Z 
Translation Z: Ở đây mình lấy một ví dụ về việc nhấn button. Thì lúc nhấn button xuống bạn sẽ nhận thấy sự thay đổi về bóng của button trên màn hình. 
Trên thực tế, giá trị độ cao không thay đổi. Translation Z đang thay đổi. Android đang sử dụng mặc định 2 giá trị trên cho các đối tượng view, button. Hình bên duới sẽ cho các bạn thấy việc thay đổi 2 giá trị Elevation và TranslationZ của sẽ có tác động như thế nào đến 2 view riêng biệt.

![](https://images.viblo.asia/1fa47262-b176-4ade-9e81-d49e1a6d3594.png)

***Z-Value = Elevation + TranslationZ***

Z-Value đã có rồi nhưng để nhìn thấy 1 cái bóng hiển thị thì bạn còn cần đến 1 giá trị nữa đó là Ánh sáng. Vậy ánh sáng trong android được sử dụng vào material design như thế nào mình xin được trình bày tiếp vào phần 2. 
Bài viết được dịch từ https://android.jlelse.eu/mastering-shadows-in-android-e883ad2c9d5b và những hiểu biết cá nhân. Nếu có gì sai sót rất mong nhận được sự đóng góp từ phía các bạn.