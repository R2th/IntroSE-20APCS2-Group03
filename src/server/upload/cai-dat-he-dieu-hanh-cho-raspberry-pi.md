# Tổng quan
Xin chào các bạn, chắc hẳn các bạn ít nhiều cũng đã xem Iron Man 1 vài lần. Lần đầu khi mình xem phim thì ngoài việc ấn tượng về bộ giáp sắt thì trợ lý ảo Jarvis của Iro Man cũng làm mình ấn tượng mạnh, hồi đó mình đã nghĩ sau này mình cũng phải làm 1 con trợ lý ảo cho riêng mình. Mình có thể nói chuyện, ra lệnh cho trợ lý ảo, từ đó có thể rút ngắn việc chạm chân tay và tiện dụng trong cuộc sống. Chính vì thế trong series này thì mình sẽ cùng các bạn sẽ xây dựng 1 chiếc gương thông minh có tích trợ lý ảo Google Assistant để chúng ta có thể thực hiện hóa ước mơ nói chuyện và ra lệnh cho máy móc tùy theo ý chúng ta nhé ^^.

## Chuẩn bị
1.  Trước tiên về phần cứng, các bạn chuẩn bị cho mình 1 con Raspberry Pi nhé, mình sử dụng Raspberry Pi 3B cho project này
2.  1 thẻ nhớ SD tầm 16GB

## Bắt đầu setup thôi nào
### Setup hệ điều hành cho Raspberry Pi
Trước tiên là cài đặt hệ điều hành cho Raspberry Pi, các bạn vào [đây để download](https://www.raspberrypi.org/software/operating-systems/). Các bạn download cái đầu tiên ( Raspberry Pi OS with desktop and recommended software ) nhé. 
![](https://images.viblo.asia/ca9a93f2-8aae-4058-8153-f072e00499da.png)
Sau đó các bạn tải [BalenaEtcher](https://www.balena.io/etcher/) để Flash image vào thẻ nhớ SD để cài hệ điều hành 
![](https://images.viblo.asia/7b5c4240-7665-4ec3-8cbf-bc126003f7e7.png)
Sau khi đó các bạn vào BalenaEtcher rồi chọn file hệ điều hành của Raspberry Pi các bạn download bên trên và Unzip nó rồi Open để bắt đầu Flash
![](https://images.viblo.asia/86022a38-7fec-47e9-8b0c-3455e41e0fd6.png)
Sau khi đó chọn Flash vào thẻ SD của các bạn rồi chờ nó Flash xong rồi cắm vào Raspberry Pi thôi!.

### Thiết lập hệ điều hành

Và đây là giao diện khi khởi động lần đầu tiên

![](https://images.viblo.asia/ffac2d80-2737-4831-9f0b-315e5e98c244.png)

Tiếp theo các bạn chọn quốc gia, ngôn ngữ, múi giờ và bố cục bàn phím

![](https://images.viblo.asia/f18a83b8-230a-4df7-8030-35e0cb1a5b4f.png)

Sau đó các bạn nhập mật khẩu Pi ( nếu các bạn remote qua SSH thì đổi nhé, còn không thì Next thôi )

![](https://images.viblo.asia/042147b5-7d49-49ef-87ca-76a8dc76e480.png)

Bước này bạn có thể chọn khung viền cho Desktop hoặc không

![](https://images.viblo.asia/233bffac-90d6-41ac-9784-a349c1a91d18.png)

Tiếp theo là kết nối đến Wifi

![](https://images.viblo.asia/77095897-dfa7-47b3-81e0-47a27568d86c.png)

Sau đó các bạn có thể chọn update hoặc không thì các bạn có thể update bằng lệnh trên terminal

![](https://images.viblo.asia/f3dc3487-24a0-4e96-950e-c59c789e2ac4.png)

Bước cuối là hoàn tất cài đặt

![](https://images.viblo.asia/cdfc49a5-7a96-4218-9611-3ecb9b2178b0.png)

Vậy là chúng ta đã cài đặt hệ điều hành và thiết lập cho Pi thành công. Ở bài viết tiếp theo thì mình sẽ cùng với các bạn làm gương thông minh nhé!
Cảm ơn các bạn đã đọc bài viết của mình :smiley: <br>

**Bài viết này mình có tham khảo của anh NGUYỄN QUỐC VƯƠNG trên trang web của ProE. Mình xin cảm ơn anh và toàn thể anh em của ProE ^^**