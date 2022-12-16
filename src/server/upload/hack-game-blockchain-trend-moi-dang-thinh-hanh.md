Dạo gần đây, phải là 1 năm trở lại đây trend game blockchain, hay NFT đang rất thịnh hành và mọi người có thể play to earn, kiếm tiền từ việc chơi game. Tuy nhiên có rất nhiều dự án cố gắng ăn theo trend mà bỏ đi yếu tố security, cố gắng ra game nhanh nhất có thể để user đỡ "chửi" vì ra game lâu, ôm coin để đó lâu quá giá không bay ... vân vân và mây mây, đủ thể loại lý do để có thể dev code nhanh nhanh chóng chóng để phục vụ người chơi. Mình cũng đi dạo trên internet và được homie mình chỉ đến cái trang web game này của Việt Nam, cùng mình khám phá xíu nhé.
# Recon
Đầu tiên lúc nào cũng vậy rồi, recon xem trang này có gì nàooooo
## Subdomain
```bash
┌──(minhtuan㉿MinhTuan-ACER)-[~]
└─$ cat list-domain/moniwar.io
https://playtoearn.moniwar.io
https://admin.moniwar.io
https://dev.daap.moniwar.io
https://api.moniwar.io
http://playtoearn.moniwar.io
http://admin.moniwar.io
http://dev.daap.moniwar.io
http://api.moniwar.io
https://www.moniwar.io
https://www.moniwar.io
https://daap.moniwar.io
https://docs.moniwar.io
https://dev.dapp.moniwar.io
https://moniwar.io
http://www.moniwar.io
http://www.moniwar.io
http://daap.moniwar.io
http://dev.dapp.moniwar.io
http://moniwar.io
http://docs.moniwar.io
```

![](https://images.viblo.asia/09472200-e0b0-4df4-9873-cc323e59f64a.png)


## Tìm ip thật
Do sử dụng cloudflare nên mình đã cố gắng tìm kiếm thông tin trong đống subdomain kia thì thấy có 1 trang web test game http://playtoearn.moniwar.io

![](https://images.viblo.asia/9cf6b6e3-83d3-433b-aaa4-c3bdd2cec38b.png)

Thử sử dụng chơi game 1 tý nhưng không đăng ký được (thật ra sau này mình đã đăng ký được do server bị tắt thôi) mình thấy có socket gửi lên server chính

![](https://images.viblo.asia/059a8f1a-f429-444b-ba10-6b1d6a722669.png)


Đây chắc hẳn là IP thật của server được che giấu đằng sau cloudflare, vậy recon tiếp bằng nmap thôi
# Attack
## Scan port
![](https://images.viblo.asia/c2e6f52e-daff-4886-875a-f69a40ab8f1b.png)

Sau một thời gian mình thử với các port scan được, mình đã nắm được các thông tin trên server như sau
- port 22: SSH, mình check version và k đoán được user nên cứ bỏ qua đã
- port 80, 443: Web connect với đống subdomain bên trên
- port 8080: Chạy dịch vụ SmartFoxServer, sau khi tìm hiểu thì con service này là server quản lý game
![](https://images.viblo.asia/5b9a4842-d0ae-48c0-b601-986fae5c3b3b.png)

- port 8888: là port socket, chắc là connect tới SmartFoxServer
- port 9933: sau một thời gian tìm hiểu thì port này sử dụng BlueBox, dịch vụ đi kèm SmartFoxServer
- port 27017: Mongodb, mình login với tài khoản test được nhưng bên trong chẳng có gì, không thể kiếm thêm gì được ở đây, đành focus vào port 8080

Tại sao mình lại để port 8080 check cuối cùng, thì đây các bạn sẽ hiểu nguyên nhân
![](https://images.viblo.asia/e29716f9-97ac-4b5c-8fde-a0325da74698.png)

Năm 2021 rồi, mình KHÔNG dùng được Adobe Flash Player nữa, tại sao vẫn có người dùng công nghệ cũ thế này, được sự trợ giúp của một người bạn, mình đã tải được VMware win XP có support vụ này =))

![](https://images.viblo.asia/05811af9-12c2-425f-9227-bcf0e9fa1845.png)

Thề luôn nhìn quả giao diện Win XP xúc động lắm :(

![](https://images.viblo.asia/2cf4b692-1010-49d1-8615-9019a61e2aad.png)

Và rồi, mình login vào đây được rồi :(
(user/pass:sfsadmin)

![](https://images.viblo.asia/13c3058c-37e2-4851-a9d4-2df9f562d0c7.png)

Ồ may quá, cuối cùng họ cũng update bản không cần flash :v

À cho ae xem hình ảnh game, chơi game giống loạn 12 sứ quân ngày xưa
![](https://images.viblo.asia/55388cce-ba92-46b0-afe1-10199be2b0a4.png)
# Kết
Lỗ hổng game này đã được fix, tuy nhiên cái thời điểm mình tìm ra thì mình không tài nào có thể liên lạc được với đội dev, đọc trong log server thì thấy có network connect tận trong miền Trung hay Nam gì đấy mình chả nhớ lắm, tuy nhiên mình mới check lại thì lỗ hổng đã được fix rồi nên mình public bài thôi :D

Qua đây có thể thấy, có vẻ dev game kiểu tay ngang, code web ăn liền hay sao ấy, lỗ hổng này có thể nói là cực kỳ basic, khai thác cực kỳ đơn giản thông qua vài bước recon cơ bản. Hoặc cũng có thể là họ chưa được cẩn thận lắm trong khâu setup, tuy nhiên dùng quả server đời tống thì mình (baiphuc)

> Mình đặt title là hack game blockchain thế thôi chứ đây là hack web bình thường mà, chưa có tý blockchain nào đâu, chẳng qua con game này là game blockchain thôi (lol). Xin lỗi mọi người vì cái title kia nhé huhu