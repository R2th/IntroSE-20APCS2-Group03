> "Moving money around the world should be as easy and cheap as sending a text message. No matter where you live, what you do, or how much you earn."
> 
Trích dẫn từ trang chủ [libra.org](https://libra.org/en-US/) của Libra- "thứ" đang làm dậy sóng cộng đồng Blockchain thế giới trong 2 ngày qua khi Facebook chính thức tung ra white paper và mạng test (dự kiến khoảng 2020 sẽ chính thức ra mạng mainnet) và sức ảnh hưởng của nó lớn thế nào thì ở tầm của cá nhân mình chưa nghĩ tới được :thinking: 

Mọi người có thể tham khảo ở [bài viết](https://viblo.asia/p/libra-nen-tang-tien-ma-hoa-sap-duoc-cong-bo-cua-facebook-ORNZqjwGl0n) (nóng hổi tới mức nó mới được public khi mình đang viết bài này :v) để biết thêm nhiều điều hay ho về Libra cũng như những thứ xoay quanh nó. 
Còn trong bài viết này, chúng ta hãy cùng tiến hành test thử giao dịch trên testnet mới công bố của Libra Blockchain xem nó thế nào nhé.

![](https://images.viblo.asia/f213092c-ee56-45e8-8df8-f42be81f4e8f.jpg)

## 1, Cài đặt môi trường
Những gì bạn cần cho máy tính của bạn:
- Chạy trên hệ thống Linux (Red Hat hoặc Debian-based) hoặc macOS.
- Có kết nối ổn định với internet.
- Có cài đặt git
- Đã cài đặt yum hoặc apt-get (đối với Linux/Ubuntu) hoặc homebrew (đối với hệ thống macOs)

## 2, Tiến hành thử nghiệm
Ta sẽ tiến hành lần lượt theo các bước:
- Bước 1: Clone và build Libra core.
- Bước 2: Xây dựng máy khách và kết nối với testnet.
- Bước 3: Tạo tài khoản để tiến hành giao dịch (ta sẽ tạo 2 tài khoản gọi là Alice và Bob).
- Bước 4: Nhận coin (ở testnet nó cho coin free nên mình gọi là nhận coin còn ở mainnet là phải mua :v) cho 2 tài khoản.
- Bước 5: Tiến hành giao dịch.

#### Bước 1: Clone và build Libra core
Ta tiến hành mở terminal lên để clone repo của Libra từ github về:
```
git clone https://github.com/libra/libra.git
```
>Có một lưu ý mình vừa gặp đó là vì nó mới và được update liên tục nên ta sẽ hay phải pull lại để có thể có được bản mới nhất để tiến hành test được 

Sau khi đã clone xong về máy của mình, mình tiến hành set up Libra core bằng lệnh:
```
cd libra
```
rồi chạy
```
./scripts/dev_setup.sh
```
![](https://images.viblo.asia/74632bac-ad6b-4371-8efd-2ed176361591.jpg)

Ở đây họ hỏi là sẽ phải tải các file cần thiết, có tiến hành tiếp không thì ta cứ `y` rồi `Enter` tiếp thôi.

>Lưu ý: quá trình này có thể sẽ mất kha khá thời gian vì nó phải install khá nhiều thứ: Rustup, Go, CMake, protoc,... do đó các bạn có thể tab sang [bài viết](https://viblo.asia/p/libra-nen-tang-tien-ma-hoa-sap-duoc-cong-bo-cua-facebook-ORNZqjwGl0n#_tien-so-libra-6) để tìm hiểu thêm về Libra cũng như những thứ xoay quanh nó :3 

#### Bước 2: Dựng máy khách và kết nối với testnet

Sau một khoảng thời gian khá lâu thì mình cũng đã cài đặt xong những thứ cần thiết.
![](https://images.viblo.asia/8a7c0b60-b2f0-44a5-9933-5341df8213f4.jpg)

Và bây giờ mình sẽ tiến hành dựng máy khách và kết nối với testnet thôi nào. Ta tiến hành lệnh:
```
./scripts/cli/start_cli_testnet.sh
```

Và quá trình này cũng tốn kha khá thời gian lần nữa... :sleepy::sleepy:

...

Và khi nó hiện ra như vậy cũng là lúc mình cũng đã setup xong mọi thứ :smile::smile:
![](https://images.viblo.asia/890bb0ae-70cb-4163-8725-e4ac5858fa40.jpg)

> Lưu ý trước bước tạo tài khoản: Có thể ở các bước cài đặt sẽ có những lỗi về phiên bản hoặc của máy khiến việc cài đặt không thể hoàn thành, moị người có thể tham khảo thêm tại phần Troubleshooting của [link](https://developers.libra.org/docs/my-first-transaction#setup) hoặc search trên google để fix lại lỗi ạ.

Bây giờ thì ta tiến hành tạo tài khoản rồi test giao dịch thôi nào!

#### Bước 3: Tạo tài khoản

Ta tiến hành tạo tài khoản bằng lệnh:
```
libra% account create
```
![](https://images.viblo.asia/27cd50d5-7774-441b-a2f3-02862a4d00cf.jpg)

Vậy là ta đã tạo xong 1 tài khoản, ta gọi là tài khoản của Alice. Ở đây: 
- `#0` là số thứ tự của tài khoản đó và ở đây tài khoản này là số 0 (vì Alice là tài khoản đầu tiên ta tạo)
-  Dãy `af724fc5158e0e55f8f8b6f41caa29e1c861644d2f4baaea3d6665487fe1d0e9` là địa chỉ ví của Alice (địa chỉ ví này là duy nhất và bất biến)

Ta tiếp tục tạo thêm 1 tài khoản nữa- tài khoản của Bob để có thể tiến hành giao dịch giữa 2 tài khoản. Ta tiếp tục chạy lệnh:
```
libra% acount create
```

![](https://images.viblo.asia/3ae35a9c-3e70-4b31-9891-cc31e4e2e0df.jpg)

Vậy là mình đã tạo xong tài khoản của Bob. Cũng như vậy:
- `#1` là số thứ tự tài khoản của Bob.
- `bdc73035a8dff95c9f41466b5ca529f09d2ba5c6281ad0945eebfbcf98f14e19` là địa chỉ ví của Bob.

Ta thử kiểm tra xem chính xác danh sách các tài khoản đã tạo bằng lệnh:
```
libra% account list
```
![](https://images.viblo.asia/d83fb6c9-89b3-4cab-8d26-c19c7d8f8074.jpg)

> Trong hình còn xuất hiện thêm 1 thứ cần lưu ý: `sequence number` - nó là số giao dịch đã được gửi đi từ tài khoản đó. Và ở địa chỉ của Alice, số sequence là 2 do lúc trước mình test mình đã gửi đi 2 giao dịch (((: xin lỗi mọi người nha :smile:

Vậy là ta đã tạo xong 2 tài khoản để có thể tiến hành giao dịch (các bạn có thể tạo ra bao nhiêu tài khoản tùy ý, ở đây mình chỉ cần 2 tài khoản để có thể tiến hành giao dịch được).

#### Bước  4: Nhận coin cho 2 tài khoản

Ta chạy lệnh:
```
libra% account mint x y
```
Ở đây: `x` và `y` ta sẽ thay theo tùy ý với `x` là thứ tự của tài khoản ta muốn nhận coin (và của mình là 0 - Alice hoặc 1 - Bob) còn `y` là số coin ta muốn nhận.

Mình sẽ tiến hành xin cho Alice 100 coins và Bob 100 coins:
```
libra% account mint 0 100
```
1 giây sau...
![](https://images.viblo.asia/8a6cc78a-6619-4528-bbaa-29a5f64412f5.jpg)
Kiểm tra tài khoản cho chắc cú (((:
```
libra% query balance 0
```
* Ở đây `0` là số thứ tự tài khoản của Alice 

![](https://images.viblo.asia/1da4724a-c69b-40ac-a106-5a4fa968ded0.jpg)

Vậy là ngon rồi :smile::smile:

Tương tự như vậy, ta sẽ xin cho Bob 100 coins rồi kiểm tra tài khoản:
```
libra% account mint 1 100

libra% query balance 1
```
![](https://images.viblo.asia/36b5d3e9-cc22-42e0-a5a0-947c57d61ae9.jpg)
Mọi thứ đã ổn =)) ta tiến hành giao dịch thôi.

#### Bước 5: Tiến hành giao dịch
Để tiến hành giao dịch coin, ta chạy lệnh:
```
libra% transfer x y z
```
Ở đây: `x`, `y`, `z` ta sẽ thay tùy ý với `x` là số thứ tự của sender (người gửi) và `y` là số thứ tự của receiver (người nhận) và `z` là lượng coin muốn gửi (tất nhiên x,y,z phải phù hơp và đúng nếu không sẽ báo lỗi).

Ta sẽ thử gửi 50 coins từ Alice tới Bob nào:
```
libra% transfer 0 1 50
```
Và xem kết quả:

![](https://images.viblo.asia/2b6d0694-7e5e-46f3-ba15-6ef44f8f1a45.jpg)
Và mình kiểm tra tài khoản của Alice và Bob ngay sau đó:

![](https://images.viblo.asia/0b1caaae-d719-4c5a-a8b6-08a15690f32a.jpg)

Tài khoản của Alice đã trừ đi 50 coins và tài khoản của Bob đã cộng thêm 50 coins :wink:

(Phải nói là mọi thứ diễn ra như thể mình đang inbox với crush qua terminal vậy :v) 

Ngoài ra, còn có 1 cách nữa để giao dịch giữa 2 tài khoản:
```
libra% transferb x y z
```
Với `x`, `y`, `z` vẫn tương ứng như trên. Khi chạy lệnh `transferb` thay vì `transfer`, nó sẽ gửi lại thông báo khi và chỉ khi giao dịch đã được đẩy lên Blockchain. Và ở đây, mình tiến hành gửi lại từ Bob cho Alice 50 coins:

![](https://images.viblo.asia/eabc5690-7572-4bb1-a092-5b02c1d0f2f4.jpg)

> Và có một điểm các bạn cần lưu ý: `[waiting Transaction completed, found sequence number 2]`, mình cũng từng test từ tài khoản của Bob gửi đi 1 lần (không nói trong bài), và lần này là lần gửi thứ 2 nên nó `found sequence number 2` là đúng rồi ạ :grin:

## 3, Tổng kết
Vậy là mình vừa tiến hành xong giao dịch trên testnet của Libra Blockchain :grin::grin: 

Và mọi người có thể truy cập vào [link](https://developers.libra.org/docs/my-first-transaction) để làm thêm những thứ hay ho khác xung quanh việc giao dịch trên testnet của Libra :+1:

Chưa biết trên mainnet và sau này thì thế nào nhưng thực sự bắt tay vào test với việc: `mint`, `transfer`, `query`,... như vừa rồi thì các bạn sẽ thấy: `Moving money around the world should be as easy and cheap as sending a text message` là có thật =))  

Chúng ta hãy cùng đợi xem Libra hay Facebook có thể làm gì tiếp theo thôi!
Cảm ơn mọi người đã theo dõi bài viết của mình, bài viết trên không thể thiếu được những sai sót cũng như sự thiếu thông tin được, mong mọi người chỉ giáo thêm để chúng ta cùng nhau "làm chủ" những công nghệ mới :grin::grin:

Nguồn tham khảo:
https://developers.libra.org/