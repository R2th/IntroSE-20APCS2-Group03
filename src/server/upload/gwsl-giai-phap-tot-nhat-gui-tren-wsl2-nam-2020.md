![kikiguru.com](https://kikiguru.com/content/images/size/w600/2021/01/gwsl2.png)

*Bài viết được đăng lại từ blog của mình [https://kikiguru.com](https://kikiguru.com/gwsl-giai-phap-tot-nhat-gui-tren-wsl2-nam-2020/)*
____

## Hoàn cảnh của mình

Từ giữa năm 2020, mình đã chuyển toàn bộ môi trường DEV của mình lên WSL2 và mình thấy thoải mái hơn nhiều so với giải pháp VMware lúc trước. Như các bạn đã biết WSL2 hiện tại chưa suppport GUI app mà phần lớn là các app command cụ thể hơn là docker các kiểu, npm, composer... Vậy còn IDE hay các tool GUI khác thì sao nhỉ? Và mình chạy PHPStorm trên WSL luôn.

Mình chọn chạy GUI từ WSL vì đơn giản thấy nó là giải pháp ổn nhất. Dù theo mình biết VSCode hỗ trợ khá tốt WSL, nhưng chỉ hỗ trợ code không là chưa đủ (nếu bạn là dev giống mình). Đôi khi mình cần thực hiên các lệnh như azure login, hay chạy test thì nó sẽ đòi chúng ta mở browser lên từ môi trường Linux.

![GWSL-KIKIGURU.COM](https://kikiguru.com/content/images/size/w1000/2021/01/image-11.png)

Như các bạn đã biết hiện tại WSL2 chưa support GUI, chắc phải đợi tới năm 2021 thì Microsoft mới support GUI native thông qua  cái thứ là Wayland. Vì vậy từ giờ đến hết năm 2021 thì để có được GUI trên WSL2 thì giải pháp duy nhất chắc chỉ có thể thông qua X11 thui nha. Và giải pháp có thể nói là miễn phí và dễ tiếp cận nhất chính là xài GWSL. GWSL có mặt trên store luôn nhé, anh em cài từ store cho khỏe sau này tiện cho việc update phiên bản mới.

Như các bạn đã biết hiện tại WSL2 chưa support GUI, chắc phải đợi tới năm 2021 thì Microsoft mới support GUI native thông qua  cái thứ là Wayland. Vì vậy từ giờ đến hết năm 2021 thì để có được GUI trên WSL2 thì giải pháp duy nhất chắc chỉ có thể thông qua X11 thui nha. Và giải pháp có thể nói là miễn phí và dễ tiếp cận nhất chính là xài GWSL. 

## Cài đặt GWSL
GWSL có mặt trên store luôn nhé, anh em cài từ store cho khỏe sau này tiện cho việc update phiên bản mới.

> [GWSL](https://opticos.github.io/gwsl/)
> The Feature-Packed, Highly-Integrated Windows 10 XServer 

Cài xong và chạy ứng dụng thì mình sẽ có giao diện như bên dưới nhé.
![GWSL-KIKIGURU.COM](https://kikiguru.com/content/images/size/w1000/2021/01/image-8.png)

Và mình xin lướt sơ sơ qua vài tính năng ăn tiền mà miễn phí của nó luôn.

### GWSL dễ cài đặt
Trước khi xài GWSL thì mình từng xài qua X11 Server trên  MobaXterm, Xming, vcxsrv. Sau khi config mấy tool này chạy được, rồi auto start với windows các kiểu, viết script tạo shortcut, thì thật sự là mất gần nửa ngày.

Ví dụ như MobaXterm thì dễ cài, tuy nhiên để nó chạy được dạng background thì mò mò cũng mất cả tiếng.

Một ví dụ khác đó chính là giả sử mình đang gõ lệnh trên terminal mà gõ geditthì ứng dụng phải chạy được luôn ra windows như cái hình bên dưới.
![GWSL-KIKIGURU.COM](https://kikiguru.com/content/images/size/w1000/2021/01/image-5.png)

Thật ra bạn có thể copy 2 dòng này bỏ trong .bashrc thì nó cũng có hiệu quả tương tự.

```
export DISPLAY_NUMBER="0.0"
export DISPLAY=$(grep -m 1 nameserver /etc/resolv.conf | awk '{print $2}'):$DISPLAY_NUMBER

```
Và các bạn thấy đó GWSL siêu dễ sử dụng, chỉ cần lên store click 1 cái là được. Và mọi thứ mình chỉ cần thao tác trên giao diện.



### Shortcut Creator
Đây có thể nói là tính năng quan trọng nhất đối với mình. Trước khi có cái này thì khi muốn mở PHPStorm lên thì mình thường mở Windows Terminal, rồi bash, rồiphpstorm,  kiểu kiểu thế này nè => Rồi nhìn một mớ giun dế nó chui ra! :)).

![GWSL-KIKIGURU.COM](https://kikiguru.com/content/images/size/w1000/2021/01/image-10.png)
Tính năng này khá dễ, anh em chỉ cần để điền vài thông tin cơ bản như là Shortcut Label, path và done. Đơn giản lắm anh em ơi!

![GWSL-KIKIGURU.COM](https://kikiguru.com/content/images/2021/01/image-17.png)
Mình tạo 2 cái Shortcuts bên dưới cho công việc hàng ngày. Tuy nhiên để được 2 cái icon đẹp đẹp này thì mình phải chỉnh tay ha.

### Linux App
Cái này nó cho phép bạn access những cái apps cơ bản trên linux. Cái này thì có app chạy được và không chạy được nhé. Nói chung đôi khi mình cần tìm một cái apps nào đó mà không biết tìm đâu thì mình lên đây tìm. Cũng giúp được kha khá việc.
![GWSL-KIKIGURU.COM](https://kikiguru.com/content/images/2021/01/image-18.png)