# Triển khai luôn
## Webhooks và webhooks trong github
Trước tiên thì nói về khái niêm webhook. Về cơ bản, theo mình hiểu thì webhook là 1 dạng request ngoại tại gửi tới hệ thống của chúng ta mà chúng ta cần dữ liệu của request đó để phục vụ yêu cầu mong muốn. Bạn đọc có thể [đọc tại đây](https://sendgrid.com/blog/whats-webhook/) để hiểu rõ và nắm được webhook vận hành như thế nào. 

Cũng như các hệ thống khác, các lập trình viên của github đã cung cung cấp webhook các payload của các event trên git.

## Tương tác với Chatwork
Hiện tại, mình sử dụng backend là rails để thực hiện xử lý request các payloads từ webhook github gửi đến. 

Trong rails hiện tại có 1 gem hỗ trợ khá ngon cho anh em gửi tin nhắn đến chatwork một cách dễ dàng. Các bạn có thể đọc [tại đây ](https://www.rubydoc.info/gems/chatwork)để hiểu và biết cách sử dụng nghe :v

Thì cơ bản ở đây là gì, mình đi qua vài bước đơn giản nhé:
+ Trước tiên thì cần 1 project rails đã nhỉ
```
rails new chat_bot
```
+ Thêm gem
```
gem "chatwork"
```
Chúng ta có thể dùng rails c để demo vài thứ sơ khai. Ồ, tới đây mình mới nhớ là chúng ta cần 1 acc chatwork để thực hiện thao tác nhỉ :v Có thể [vào đây](https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php) để get api key của chatwork, bắt đầu he,  set api_key bằng cách sau:
```
2.5.0 :001 > ChatWork.api_key = "aa208c1pa1442b8febffl283a7ddc4z7"
 => "aa208c1pa1442b8febff7983a7ddc4e7"
```
về cơ bản thì đừng để lộ key này nha =))

Chúng ta có thể get thông tin cá nhân của acc chatwork này bằng cách
```
2.5.0 :002 > ChatWork::Me.get
 => #<Hashie::Mash account_id=5158557 avatar_image_url="https://appdata.chatwork.com/avatar/4737/4737813.rsz.jpg" chatwork_id="" department="" facebook="tranloc1997" introduction="" login_mail="loctran.sun@gmail.com" mail="" name="[bot] SSV" organization_id=3708272 organization_name="" room_id=198328272 skype="" tel_extension="" tel_mobile="" tel_organization="" title="Em anh Lộc :v" twitter="" url=""> 
```
Thường thường trong quá trình chúng ta dùng chatwork thì thường join vào các room chat nhỉ, 1 link của room có kiểu dạng như sau `https://www.chatwork.com/#!rid190328208`. Thì hậu tố 190328208 ở đây chính là room_id của room đó. Khi gửi nội dung tới group nào thì yếu tố cần là room_id

Giả sử mình muốn gửi nội dung "Xin chào các bạn!" tới room trên thì chỉ thao tác đơn giản
```
2.5.0 :003 > ChatWork::Message.create room_id: "190328208", body: "Xin chào các bạn!"
 => #<Hashie::Mash message_id="1360263275979251712">
```
Và đây là kết quả
![](https://images.viblo.asia/24264516-cede-4372-b8f7-2dc54ac39192.png)
Muốn TO ai đó thì có thể TO theo id của người đó
```
2.5.0 :005 > ChatWork::Message.create room_id: "190328208", body: "[To:3130608]BigCityBoy \nXin chào!"
 => #<Hashie::Mash message_id="1360264715921543168">
```
Và đây là kết quả
![](https://images.viblo.asia/3fdb1083-dee5-4a4e-a7e8-bb071cbb60c1.png)

Vậy là qua vài thao tác đơn giản chúng ta có thể tương tác từ server của mình đến chatwork rồi.

## Xử lý payload từ github
Vào github và tạo 1 payload để sử dụng nào
![](https://images.viblo.asia/9e1e980a-d5b8-4e2d-b484-e04f22baae0e.png)
Mục `Payload URL` chúng ta có thể điền action xử lý payload mà chúng ta có, nhưng làm sao gửi tới nếu chúng ta đang ở local, hehe. Mình có biết tới 1 cái gọi là ngrok giúp public nhanh chóng local của mình ra internet mà không cần deploy, [vào đây](https://ngrok.com/download) để đọc và dùng.

Mình lựa chọn option `Let me select individual events.` vì mình chỉ cần dùng 1 vài events của git thôi. Giả sử mình muốn cứ mỗi lần comment và PR sẽ TO cho ai đó thì mình tích chọn mục `Issue comments`. 

Sau này cứ có event này thì webhook github sẽ gửi request tới server của mình kèm theo payload params của lần thao tác đó. Mình xử lý gì thì cứ viết thôi :v

--> Update webhook

## Kết
Qua 2 sự giới thiệu đơn giản vừa rồi, mình nghĩ các bạn đã hiểu phần nào về cơ chế của cái mà mình đang nói. Có thể vào [đây](https://github.com/loctx-2273/ChatBot) để đọc bài demo của mình làm, code chuối lắm các bạn đừng chê nha :v. Cũng tìm hiểu để làm nhanh 1 con bot phục vụ dự án nên mình code qua loa và nghiên cứu chưa sâu về các mảng, có sai sót các bạn cứ góp ý để mình sửa dần hướng tới bài viết chất lượng hơn cho bạn đọc sau.

Cám ơn bạn đã đọc bài chia sẻ của mình.