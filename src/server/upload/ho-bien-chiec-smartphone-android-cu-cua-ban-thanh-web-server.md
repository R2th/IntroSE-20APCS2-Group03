![](https://images.viblo.asia/3bc29c34-df60-4a78-bd41-44822d08d454.jpg)

Ok ok đọc tiêu đề thôi là biết rồi đúng ko =)). Nhân ngày săn sale mình tính mua cục pin gắn cho cái điện thoại cũ (vì pin ẻm bị phồng và mình quăng luôn rồi), mà search google ra thì thấy sao mà bán rẻ quá có mỗi 70-150k, mua về xài mà nổ thì tèo luôn. Nên thôi mình quyết định lên google tra xem có cách nào biến ẻm thành cái gì đó ngon ngon không.

Bài viết hướng dẫn trên google thì khá là ít nên thôi mình viết ở đây, cho bạn nào có điện thoại cũ mà chưa biết làm gì thì coi tham khảo nhé. Nào, xem tiếp thôi....

> Bài viết có văn chương khá lủng củng, các bạn cân nhắc trước khi xem ><.

## 1. Các Bước Chuẩn Bị

### Một Chiếc Smartphone Android Cũ

Tất nhiên là một chiếc điện thoại rồi (smartphone), cũ mới gì tùy bạn, mà tất nhiên là cấu hình phải ổn một xíu, chạy được 24/7 nếu bạn muốn duy trì lâu dài :v:.

Ở đây mình chuẩn bị một con Redmi Note 4x cấu hình em này thì cơ bản là ngon, con này từng bị mình vọc thay màn một lần giờ lại vỡ, pin thì không có nên mình phải cắm sạc 24/7 để duy trì nha.

<p align="center">
    <img src="https://images.viblo.asia/822ed1b6-d473-4edf-abeb-4db81ef655f9.jpg" />
    <img src="https://images.viblo.asia/b84f18b2-e3d8-4a3c-afc4-bff43fb3dca1.jpg" />
</p>

### Smartphone Cài Được Phần Mềm

Đọc đến đây mà máy bạn cài được ứng dụng thì hãy đọc tiếp nha ><. Các bạn vào CHPlay tìm ứng dụng [Termux](https://play.google.com/store/apps/details?id=com.termux) và cài đặt vào, ứng dụng này chạy terminal linux nha.

Khi cài xong mở lên thì ứng dụng sẽ có giao diện như thế này.

<p align="center">
    <img src="https://images.viblo.asia/ff08c5fa-3ab1-4eb1-a662-ce4d849f3312.jpg" />
    <img src="https://images.viblo.asia/a2f6bb4e-659c-445c-9474-38e04e6ec954.jpg" />
</p>

## 2. Thiết Lập Project

### Cài Đặt Các Package

Ở đây mình sẽ cài NodeJs, Git và Vim để chỉnh sửa file nếu cần, mình cũng cài thêm Yarn để chạy lệnh NodeJs (bạn có thể dùng npm nếu chưa biết xài yarn). Lệnh cài đặt trên Linux cho bạn nào chưa biết:

```bash
$ pkg install nodejs-lts
$ pkg install git
$ pkg install vim
$ pkg install yarn
```

Ngoài ra nếu bạn muốn cài các package khác có thể tìm kiếm bằng câu lệnh `pkg search <tên-package>`.

Dưới đây là hình ảnh khi mình cài Git và dùng lệnh `pkg search php`:

<p align="center">
    <img src="https://images.viblo.asia/60640e55-e23e-4755-b1ce-3db9b943b3d7.jpg" />
    <img src="https://images.viblo.asia/f40f211a-9423-4c93-a98e-5abfc2db9459.jpg" />
</p>

Để kiểm tra các package có cài được thành công hay chưa, hãy nhập lần lượt các lệnh sau:

```bash
$ node --version
$ git --version
$ yarn --version
$ vim --version
```

> Để xóa sạch nội dung trên màn hình bạn có thể dùng lệnh `clear`.

![](https://images.viblo.asia/13d5f76b-dd14-4c72-93f1-ea5a12fbbf1f.jpg)

**Lỗi Khi Cài Đặt Các Package:**

Nếu có lỗi khi cài đặt các package bạn chạy lệnh sau `termux-change-repo`. Nó sẽ ra các lựa chọn, bạn hãy chọn vào `main repository` và tiếp tục chọn thử những mirrors khác.

<p align="center">
    <img src="https://images.viblo.asia/13714295-6d0b-4da9-8426-bbc2294c6141.jpg" />
    <img src="https://images.viblo.asia/f5bd8a46-1716-4bb5-9954-6dd13d9992d2.jpg" />
</p>

### Cài Đặt Project

Nếu bạn nào muốn test thử của mình luôn thì có thể clone dự án của mình về chạy luôn nha.

```bash
$ git clone https://github.com/tronghieu60s/nodejs-fantastic.git
$ cd nodejs-fantastic
```

Để chạy dự án NodeJs các bạn làm như sau, ở đây mình sử dụng yarn mà ở phần trước mình có cài.

```bash
$ yarn install
$ yarn start
```

<p align="center">
    <img src="https://images.viblo.asia/4aecf269-1fc3-4d9a-98e0-b8c37e40e56c.jpg" />
    <img src="https://images.viblo.asia/be4b8df3-ab12-4cf2-be61-85ba72d6bc4b.jpg" />
</p>

> Để coi dữ liệu thư mục hiện tại bạn chạy câu lệnh `ls -a`.
> 
> Để di chuyển vào một thư mục bạn dùng câu lệnh `cd <tên-thư-mục>`.
> 
> Để di chuyển ra khỏi một thư mục bạn dùng câu lệnh `cd ..`.

Sau khi clone và chạy thì mình truy cập thử vào đường dẫn `http://localhost:3000/` để coi được không nha.

![](https://images.viblo.asia/27398689-b6da-4eb4-ab65-0c01bce9874d.jpg)

Vậy là xong bây giờ mình đã chạy được web server trên máy rồi, vậy làm sao public ra cho mọi người trên internet có thể vào xem đây? Mời bạn xem tiếp....

## 3. Public Localhost Lên Internet

Để public lên internet mình sẽ dùng [localhost.run](https://localhost.run/docs/), các bạn cũng có thể public bằng cách setup modem của nhà mình. Cũng khá rắc rối nên mình chỉ cách dễ thôi nha, bạn nào cần nghiên cứu mình có thể để link mà mình đã từng tìm kiếm phía dưới. Nào cùng bắt đầu setup thôi...

Các bạn mở tiếp một terminal mới trên điện thoại, bằng cách dùng tay kéo thanh bên phải và chọn `New Session` :hugs: .

![](https://images.viblo.asia/9e940322-6d00-4fd5-876a-6540ea507790.jpg)

Để chạy được [localhost.run](https://localhost.run/docs/) bạn cài tiếp SSH vào máy của mình nha. Chạy tiếp các câu lệnh sau để cài đặt và [setup key](http://localhost.run/docs/faq/#generating-an-ssh-key).

```bash
$ pkg install openssh
$ ssh-keygen -t rsa
```

> Khi chạy câu lệnh `ssh-keygen -t rsa` bạn có thể enter cho qua hết nha.

![](https://images.viblo.asia/036dda77-b6ad-4d35-9837-439aecf5f3c7.jpg)

Tiếp tục chạy câu lệnh dưới đây để kết nối [localhost.run](https://localhost.run/docs/) đến [port 3000](https://localhost.run/docs/#put-a-locally-running-http-https-or-tls-app-on-the-internet) (cái port server mình đã chạy ở phần trước).

```bash
$ ssh -R 80:localhost:3000 localhost.run
```

![](https://images.viblo.asia/864182e0-587a-418a-a1f3-07d25f75821a.jpg)

Ok sau khi chạy localhost.run sẽ cấp cho mình một subdomain, nằm dưới cùng bạn dùng nó để chạy thôi. Ngoài ra bạn có thể tùy chỉnh domain của mình rất dễ dàng, bạn có thể xem [ở đây](https://localhost.run/docs/custom-domains).

## 4. Kết thúc

Ôi vậy là xong, bây giờ bạn muốn server chạy liên tục thì cứ treo 24/7 cái điện thoại của mình thôi. Ứng dụng của thằng này thì rất nhiều bạn có thể làm chatbot, trợ lí ảo, chạy nhiều server với Docker, bla bla...

Với cấu hình của các smartphone thì chỉ có thể test được thôi chứ mình không chắc em nó chạy ổn định đâu nha, bạn nên mua VPS để chạy thì hơn :yum:.

Nếu bạn cảm thấy bài viết hay, giúp ích thì cho mình 1 vote, nếu có gì sai sót bạn hãy bình luận ở dưới đóng góp cho mình cải thiện hehe :heart_eyes:. Cảm ơn các bạn đã xem.

Một số nguồn tham khảo:
1. https://daynhauhoc.com/t/su-dung-chiec-smartphone-android-cu-de-lam-server-mini-chay-chatbot-tai-sao-khong/79897
2. https://localhost.run/docs/custom-domains
3. http://localhost.run/docs/faq/#generating-an-ssh-key
4. https://stackoverflow.com/a/68109719/9724078

Một số nguồn tham khảo cấu hình modem:
1. https://youtu.be/GyLBvVrlBXQ?t=1159
2. https://youtu.be/_PXSoVnrzw0
3. https://quantrimang.com/huong-dan-cach-thiet-lap-port-forwarding-tren-router-118468