Có một thành ngữ phổ biến: giết gà đừng dùng dao mổ trâu.


Dịch ra trong ngữ cảnh công nghệ là: Đừng sử dụng công nghệ xịn, hãy sử dụng công nghệ phù hợp.

Trong lập trình, ta thường muốn chọn những điều gì đó xịn xò nhất, tối tân nhất, state-of-the-art nhất có thể. 
Những công nghệ, ngôn ngữ thịnh hành có thể kể đến: Golang, gRPC, .NET 7, Nodejs...

Lý do ư? Performance cao, tốc độ load nhanh, độ thịnh hành của công nghệ v.v, chưa kể lý do dev muốn áp dụng cái mới vào để được vọc vạch.

Nhưng đó chắc chỉ là suy nghĩ của một technical-guy, còn có nên chọn hay không chúng ta lại phải cân nhắc nhiều vấn đề khác.

## Những điều cần cân nhắc khi chọn một công nghệ để làm website

- Công nghệ có đáng tin cậy hay không? Ai là người tạo ra nó?
- Công nghệ có phù hợp với nghiệp vụ dự án không?
- Cộng đồng có nhiều hay không?
- Hệ sinh thái (ecosystem) có đủ lớn hay không?
- Chi phí bỏ ra (license, server, resource…) cho công nghệ này có ít hơn hay không?
- Nguồn lực developer hiện tại có đủ hay không?

### Các công ty lớn lựa chọn tech stack
Ví dụ nghiệp vụ của dự án bạn làm cần 1 công nghệ có thể chịu tải cao, dùng cho mục đích quảng bá thông tin (blog, landing) với lượng user đông đảo. 
Chắc hẳn các bạn sẽ muốn chọn backend là một cái gì đó xịn xò, chẳng hạn ông bạn Golang mới nổi.

Nhưng không, mình nghĩ trong trường hợp website tin tức này, NodeJs là lựa chọn hợp lý. Điển hình là [Binance Academy.](https://academy.binance.com/vi)
Một ví dụ khác là [Etherscan](https://etherscan.io/), lượng truy cập và dữ liệu cực kì khủng, nhưng em này vẫn đang kiên trì với ASP.NET.

## Câu chuyện cá nhân
Gần đây mình vừa mới code 1 giao diện wordpress với tailwindcss, mục đích là dùng cho 1 website cá nhân của mình. 


Ủa, tại sao mình không tiếp tục dùng các SSG (mình sẽ nói ở bài sau) như web [devgiangho.github.io](http://devgiangho.github.io) của mình, mà lại đi dùng wordpress cổ lỗ sĩ?

### Lý do mình chọn wordpress
Có vài lý do để mình chọn wordpress:

- Wordpress có chi phí hosting thấp (mình paid 30$ cho 1 năm, tốc độ rất ổn)
- Dễ dàng migrate
- Có nhiều plugin hỗ trợ, cộng đồng đông đảo
- Cấu trúc dữ liệu (database) đã được thiết kế sẵn
- Đỡ thời gian code =))

### Các website hiện tại của mình
Các bạn có thể check những website sau, mình làm không phải mục đích kiếm tiền, không chèn quảng cáo. Chi phí hàng tháng mình bỏ ra chỉ có mấy chục nghìn:
- [Đại Việt Cổ Phong](https://daivietcophong.com/) (wordpress): Chia sẻ, nghiên cứu và phát huy văn hóa cổ phong Việt.

- [Gom Truyện](https://gomtruyen.com/) (laravel php): Web đọc truyện, mình code đâu đó có 1 tuần, crawl truyện về đọc, lên mấy web khác quảng cáo nhiều quá. Tiền thân em này là 1 domain khác mình đã bán với giá 20tr vnđ, có thời gian mình sẽ kể lại câu chuyện.

Hosting mình sử dụng là gói [AZ Pro](https://my.azdigi.com/aff.php?aff=4243&url=https://azdigi.com/ssd-hosting/linux-pro/) ở [azdigi](https://my.azdigi.com/aff.php?aff=4243), chi phí rất rẻ và hosting lại cực kì mạnh so với các đối thủ ở VN, mình đã dùng qua nhiều nhà cung cấp hosting nhưng azdigi vẫn có đội support và hạ tầng tốt nhất.
![](https://images.viblo.asia/68211c06-13c8-49fd-bd5f-8e17e5750f69.png)

## Kết luận
Nói chung, mọi công nghệ đều có 1 mục đích là xử lý vấn đề. Nếu sử dụng thứ gì đó xịn xò nhưng không giải quyết được vấn đề thì coi như không và ngược lại.

Khi chúng ta bớt tư duy tech-bias, thì chúng ta sẽ có một cái nhìn toàn cảnh hơn và lựa chọn được một công nghệ phù hợp hơn.