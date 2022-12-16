Một ngày đẹp trời, bạn nhận được mail từ google có nội dung

`After review, ******, has been removed from Google Play`

ờ may chỉ là cảnh báo nhẹ, policy updated nên cần update lại code mới là ok.
Sửa sửa lại xong, chạy ngon này, build apk để up thôi. Như thói quen, tìm lại keystore đã thân thuộc từ lâu, đúng là nó đây rồi, nhập pass như thường lệ:

![](https://images.viblo.asia/6faf94bd-72cb-44b7-8ded-449a454bc55b.png)
(??) goắt, cái gì vậy, lỗi à, mình chưa tắt CapsLock à,? Đang để Unikey à? Tắt hết các thứ đi rồi thử lại, vẫn vậy. Thử thêm một đống pass khác vẫn không được. Ok, ko có keystore thì update app kiểu gì đây.

Sau đó thì đành lên mạng tìm cách, thì ra là cũng rất nhiều cách (cảm thấy ngon rồi), nhưng thử mấy cái thì đều không dùng được (đã thử cả cái http://maxcamillo.github.io/android-keystore-password-recover/ không hiểu sao nó không chạy). 

Đang lướt lướt thì đọc được một câu trả lời không phải top nhưng có vẻ hấp dẫn ở trên stackoverflow.com (Cảm ơn tác giả câu trả lời `reverie_ss`) 

Link : https://stackoverflow.com/questions/8894987/android-forgot-keystore-password-can-i-decrypt-keystore-file/46797131 - câu trả lời của `reverie_ss`

nhìn chỉ có 2 class, làm rất dễ dàng, lại đọc thêm được comment ở dưới là :

*I was like (I can't believe my eyes). After trying this technique. It worked perfectly*. 

Có vẻ tin tưởng đây, cũng lấy 2 class về, rồi làm y như hướng dẫn, code 2 class có thể lấy ở đây

https://gist.github.com/zach-klippenstein/4631307


Làm đúng như hướng dẫn : 
1. Download 2 class

Sau đó thì dùng lệnh javac để chạy như là hồi mới học chạy file HelloWorld.java

2. Run `javac ChangePassword.java`
3. Run `java ChangePassword <keystore file> <new keystore file>`

Sau khi chạy thấy hiện ra màn hình hỏi là nhập password, nhập vào xong thấy done. Ra xem thì đúng là có tạo ra 1 file keystore mới thật.

Bây giờ phải thử dùng keystore đấy xem có update được version mới lên GGPlay không, kết quả thì giống như comment trong câu trả lời :

*I was like (I can't believe my eyes). After trying this technique. It worked perfectly.*

Apk mới được GGPlay chấp nhận như keystore cũ!

Hi vọng giúp ích được mọi người trong trường hợp tương tự.
### Thanks for reading!