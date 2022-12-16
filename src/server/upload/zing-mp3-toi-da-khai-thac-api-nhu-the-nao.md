Hello xin chào các bạn, lâu quá ko gặp, tối nay tôi lại hầu chuyện các bạn một tutorial "hơi" không phải lập trình 1 xíu, mà thiên về mảng "reverse" hơn.
Chả là lang man xíu nhé, chiều nay được ông anh điệu ra quán nước hưởng cái lạnh hiếm hoi của Đà Nẵng, lỡ mồm uống chai sting nên tối về ngủ ko đc, bình thường là tớ ngủ mất lúc 10h rồi, hôm nay ngồi mò mò lướt Facebook mãi
Bỗng, đọc được 1 share của 1 em "sinh viên" năm 2 về chủ đề em ấy thám thính  và xử lý cái API của Zing rất ngon ! Chi tiết anh em đọc ở đây: https://vovanhoangtuan4-2.medium.com/t%C3%B4i-%C4%91%C3%A3-l%E1%BA%A5y-api-zingmp3-nh%C6%B0-th%E1%BA%BF-n%C3%A0o-55f5fa555eda

Tôi bỗng cảm thấy xấu hổ :( Thầm nghĩ "Má, năm 2 người ta đã khai thác được API của MP3 ZING, trong khi mình năm 2 chỉ biết đánh bài" :( Buồn quá anh em ạ
Nhưng mà bản chất tò mò của mình cũng nổi lên, em ấy làm được thì chúng ta cũng làm được, có vị gì đâu phải ngại. Sau khi khám phá ra những gì em ấy đã làm thì mình xin hệ thống lại một chút rõ hơn về kỹ thuật khai thác và debug, tại vốn dĩ bài medium của em ấy cũng ổn rồi, mình chỉ hệ thống lại cách khai thác sao cho các bạn dễ hiểu và thực thi, cũng như vững tin rằng "Không có việc gì khó - Chỉ sợ ko chịu mò" - Slogin của đại ca Cuonglee (anh em nào cài MU Server những năm 2007 thì biết rõ anh này hehe)

Okay ! Dài dòng quá, vào việc chính nào, đầu tiên để explore cái API của Zing MP3 thì yêu cầu anh em dùng Chrome, bật DEV MODE lên và chạy vào Web Zing nào

![](https://images.viblo.asia/542a7713-838d-45e0-b133-7a4b165f4529.PNG)
Lưu ý: Phải vào chế độ desktop nhé, vị đại ca nào để chế độ mobile là ko làm tiếp được đâu

Tiếp theo, mở tab Network lên và bật thử một bài nhạc, tôi chọn 1 bài của Vozer đó là "Sao em lại tắt máy"
Sau đó nhìn xem nó fetch những gì, và chú ý vào những cái XHR của nó, tôi đặt biệt thích keyword "get-streaming" hehe (nghe nó gần vs mục đích của chúng ta)
![](https://images.viblo.asia/5ee03c81-cb16-450f-a843-37daea68c509.PNG)

Okay, khám phá API đó nào
![](https://images.viblo.asia/cf14bb51-40a0-4020-b772-4ad0a40484a0.PNG)
Ở đây chúng ta thấy,  API này có 4 query params đó là 
> - id (id của bài hát, đừng cố tìm hiểu nó,  chúng ta chả bao giờ hiểu được đâu =)) )
> - ctime (chính là timestamp thời điểm chúng ta fuck API)
> - sig=1 chuỗi gì đó , tạm gọi nó là "signature" tức là chữ ký, tí nữa tôi phân tích nó sau
> - key= API key hehehe (thằng này trong các XHR khác cũng dùng y key như vậy, nên nó là const, ta bợ nó nào)

Okay, vậy 4 tham số trên chỉ có thằng "sig" là có vấn đề, vì sao ? Vì nếu ta đem y cái url đó đi request thì ra info, nhưng thay thằng sig thì bị ăn bad request ngay ! 
Vậy mục đích chính của chúng ta là tìm cách tạo ra thằng sig này
Phân tích nó, tôi thấy nó chứa 128 ký tự, đẹp quá, ký tự lại toàn là các anh bạn trong bảng mã ASCII, lại toàn là anh em lowercase, hehe có khi SHA512 rồi, note lại đã
Bây giờ, tìm tới cách nó chế biến cái sig này, ta thấy trong query params có "id" và "ctime", nhưng từ "id" nếu search trong source thì chắc vỡ mồm vì độ nhiễu kết quả, nên ta sẽ lấy "ctime" để trace

Đây là lúc tại sao tôi giải thích anh em phải dùng giao diện desktop đây, vì có vậy ta mới lôi ra được file "main.min.js" nằm trong thư mục "zjs.zadn.vn\**zmp3-desktop**\release\vx.x.x\static\js"
![](https://images.viblo.asia/b9396f48-e6e4-45c2-b09e-597715f4231c.PNG)
Okay, bấm Pretty để format lại code cho dễ đọc, bấm Ctrl+F và search "ctime"
![](https://images.viblo.asia/3ac58e36-7c26-453c-a65d-5c19e2205ba1.PNG)

Nhìn vào line 501, thấy "t.sig", đặt break point ở đây và bấm chọn bài hát khác nào
![](https://images.viblo.asia/301a134e-40ec-4706-9892-1dde9c8133b4.PNG)
Break-point được freeze, data được push lên cho chúng ta thấy
Đại khái, function T sẽ nhận vào 2 tham số là e và t trong đó
- e chứa path của API
- t chứa object với nội dung là id và ctime
- t.sig sẽ gọi hàm S(e,t), hover chuột vào hàm S ta thấy nó được declare ở line 486
![](https://images.viblo.asia/a7b24009-8a0c-4164-8e38-47d3e164abb0.PNG)
Set break-point ở dòng 489 (kết quả trả về của hàm S) sau đó nhấn F9
![](https://images.viblo.asia/3927f552-5ab6-46e8-b52a-3b9f295e71fb.PNG)
Ta sẽ được freeze tại 489 và thấy kết quả trả về như trên
> - biến n sẽ được biến tấu lại, thành "ctime=xxxxid=yyyy"
> - biến r sẽ chứa giá trị là 1 hàm h(), hàm này nhận tham số là chuỗi n
> - Ta thấy biến r có sig bytes là 32, lúc nãy ta có note cái sig hoàn thiện là SHA512, SHA512 trả về 64bytes, ở đây nhận được 32 bytes tức nó có thể là SHA256
> - Có biến r rồi thì hàm này sẽ gọi đến hàm m với tham số là (e+r,b.Oc), e thì ta có là API path rồi, r ta cũng có là SHA256(n), b.0c thì hover chuột vào sẽ thấy
![](https://images.viblo.asia/e6601ee1-7b4e-41a5-8aa0-41d4f4f142ac.PNG)
Vậy, ta rút ra, hàm m này là SHA512 (note ở trên), tham số của nó là API path + SHA256(n) và SECRET KEY (b.Oc)

Thử xem nhé, tôi lười nên chạy luôn complier trên trình duyệt, mở https://repl.it/languages/nodejs lên và declare
```
const crypto = require('crypto');


const getHash256 = (a) => {
    return crypto.createHash('sha256').update(a).digest('hex');
}
const getHmac512 = (str, key) => {
    let hmac = crypto.createHmac("sha512", key);
    return hmac.update(Buffer.from(str, 'utf8')).digest("hex");
}
```
Sau đó bấm run
![](https://images.viblo.asia/07ed76dd-6342-4e57-b2db-97c1e212f3ec.PNG)

Rồi, bây giờ ta sẽ tiến hành lấy cái SHA256 của (n) nhé, tôi sẽ lấy lại tham số đã fetch lúc đầu
![](https://images.viblo.asia/ed1366da-8f5c-483c-b9d6-75fca4932cbc.PNG)


Tiếp theo, ta gọi SHA512(e+r,secret) nhé
![](https://images.viblo.asia/ac4d64d6-5b07-4092-8220-0115a82ce1d2.PNG)

Nhớ rằng cái chuỗi **10a01dcf33762d3a204cb96429918ff6** là SECRET KEY ta lấy được lúc nãy rồi nhé
Bây giờ có sig rồi, đem replace vào link API sau xem sao
https://zingmp3.vn/api/song/get-streamings-beat?id=ZOW0OBU8&ctime=1607185070&sig=716b083eea082f38c8eb2ad5aa1023120199bd906a30a6dd533c4987ba473a7eeb0e2b58c5a8d7c69a563bffb4648ad1762fff78298d1c043f0c542d3c92ee68&api_key=38e8643fb0dc04e8d65b99994d3dafff
![](https://images.viblo.asia/84de8ec2-30b3-4c2a-ba8e-97a7163c5791.PNG)
Ơ lỗi ??? Bình tĩnh, nhìn cái timestamp kìa, nãy chúng ta sinh cái signature với timestamp khác mà ^^, hãy correct lại cái url trên này

https://zingmp3.vn/api/song/get-streamings-beat?id=ZOW0OBU8&ctime=**160718421**&sig=716b083eea082f38c8eb2ad5aa1023120199bd906a30a6dd533c4987ba473a7eeb0e2b58c5a8d7c69a563bffb4648ad1762fff78298d1c043f0c542d3c92ee68&api_key=38e8643fb0dc04e8d65b99994d3dafff
![](https://images.viblo.asia/84de8ec2-30b3-4c2a-ba8e-97a7163c5791.PNG)
Thay đúng với cái ctime ta đã encrypt trong biến 'r' và chạy lại link xem sao :D
![](https://images.viblo.asia/f8879d2f-dd83-4450-8b2c-28da3356e6ed.PNG)
Đã thay nhưng vẫn lỗi =)), đùi ghê ri bây ! Hehe, bình tĩnh, nhớ rằng sig là kết quả của e và r, e ở đây là API path, nãy ta sinh signature cho api /get-song-info mà sao giờ dám dùng api /get-streamings-beat gọi được, lại correct url nào
https://zingmp3.vn/api/song/get-song-info?id=ZOW0OBU8&ctime=160718421&sig=716b083eea082f38c8eb2ad5aa1023120199bd906a30a6dd533c4987ba473a7eeb0e2b58c5a8d7c69a563bffb4648ad1762fff78298d1c043f0c542d3c92ee68&api_key=38e8643fb0dc04e8d65b99994d3dafff

Ta được
![](https://images.viblo.asia/bc27352d-7c75-4e9a-a1f4-8383f10f0530.PNG)

Vậy, ta rút ra rằng, sig chính là chuỗi chứa thông tin xác thực request API bao gồm (song id, ctime và api path). Vậy giờ muốn sử dụng cái /get-stream-beats thì ta cứ làm lại các bước lúc nãy để sinh sig cho API này thôi !
Nhưng tội gì, trong cái json lúc nãy của get-song-info đã trả về url stream trong đó rồi ^^ ko có 320kbs thôi, muốn có thì explore cái API get-streams xem sao nhé
![](https://images.viblo.asia/dbdd6133-7d2f-4318-9ae5-248ddd7d737c.PNG)

Okay ! Bài viết của mình cũng khá dài, và giờ là 12h10 P.M, mình cũng nên dừng bút và đi ngủ thôi, chúc các bạn thành công nha :D