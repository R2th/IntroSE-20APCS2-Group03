## I) OSINT  là gì ?

Bước đầu tiên trong 1 cuộc tấn công có chủ đích - hoặc 1 cuộc kiểm thử của red team là Thu thập các thông tin của mục tiêu. Khi đó sử dụng OSINT là một cách khá hiệu quả và tiện để thu thập các thông tin của mục tiêu.

Vậy OSINT ta đang nói đến là gì? 
OSINT là 1 cụm viêt tắt cho Open Source Intelligency . Trong đó OS là Open Source hay còn gọi là những nguồn mở được public trên internet và Intelligency là Tình báo (sự thu thập các tin tức). Từ đó ta có thể hiểu được là đây chính là những phương thức, cách thức khai thác lấy những thông tin từ video,hình ảnh, văn bản,.. từ những gì liên quan đến mục tiêu có sẵn và đang public trên internet. Những nguồn đó có thể ở bất cứ đâu : trên forum, trên các trang báo,trong 1 cuốn sách, video hay là những thư viện mở,các báo cáo và lịch sử từ trước đó.

## II)Bài viết này có thể giúp ích được cho ai ?  
*  Đối những những người làm Sale, marketing hay bên quản lý sản phẩm có thể sử dụng để tìm ra khách hàng mục tiêu tiềm năng, giúp tăng tỉ lệ chuyển đổi (conversion rate) -giúp tăng lượng khách hàng và hiệu quả hơn khi public ra công chúng một sản phẩm hay dịch vụ nào đó
*  Đối với 1 đội ngũ pentest và dev thì ta có sử dụng nhằm thu thập các thông tin của mục tiêu để có được 1 cái nhìn tổng quát và có những thông tin hữu ích để sử dụng trong quá trình khai thác cũng như cho bên dev hiểu được và phòng tránh để lộ các thông tin nhạy cảm ra internet.

## III) Kỹ thuật khi sử dụng OSINT và các nguồn để khai thác thông tin.
Đầu tiên, có thể bạn sẽ cần phải đặt ra một vài câu hỏi cho bản thân mình như:
* Mình đang tìm kiếm thông tin gì/cái gì/điều gì?
* Mục tiêu chính của mình là sẽ có được gì?
* Ai/cái gì sẽ là mục tiêu của mình?
* Ta sắp đặt, làm những gì để đảm bảo được tính hiệu quả và đầy đủ thông tin cần thiết? 

Ngoài ra ta có thể thấy có rất nhiều các kỹ thuật OSINT đang được sử dụng bởi chính phủ và quân đội mà họ đang nhắm vào chúng ta nhưng 1 số thì thực hiện tốt nhưng một số thì không thì cái vấn đề nằm 1 phần ở chiến lược OSINT như là bạn phải tìm ra được nguồn thông tin từ đâu sẽ có khả năng cung cấp cho bạn đúng là liên quan gần nhất đến điều mà bạn tìm kiếm.

Và dưới đây có thể là 1 số tiêu chí nhắm đến khi tìm thông tin của 1 đối tượng:

* Sử dụng Google Maps và các nguồn hình ảnh vệ tinh mở khác để truy xuất hình ảnh về vị trí địa lý của người dùng.
* Giám sát blog cá nhân và doanh nghiệp, cũng như xem xét hoạt động của người dùng trên các diễn đàn
* Xem lại nội dung có sẵn trên các mạng xã hội như Facebook, Twitter, Google Plus hoặc Linkedin.
* Thu thập tên đầy đủ của nhân viên, vai trò công việc, cũng như phần mềm họ sử dụng.
* Chạy quét cổng dựa trên cơ sở hạ tầng máy chủ của công ty mục tiêu để tìm dịch vụ đang chạy.
* Khám phá Dịch vụ DNS, cũng như tên miền, tên miền phụ và địa chỉ IP bằng bộ công cụ [SecurityTrails](https://securitytrails.com/).
* Sử dụng các công cụ để tìm kiếm các thiết bị kết nối internet như Shodan được sử dụng bởi mục tiêu của bạn.
* Sử dụng các công cụ thu thập dữ liệu của mọi người như [Pipl](https://pipl.com/), người sẽ giúp bạn tiết lộ nhiều thông tin về các cá nhân ở một nơi duy nhất.
* Truy cập dữ liệu được lưu trong bộ nhớ cache cũ từ Google - thường tiết lộ thông tin thú vị.
* Khám phá các phiên bản cũ của trang web để tiết lộ thông tin quan trọng bằng cách sử dụng [Wayback Machine](https://archive.org/web/)
* Xác định số điện thoại di động, cũng như địa chỉ thư từ các mạng xã hội hoặc kết quả của Google.
* Tìm kiếm ảnh và video trên các trang chia sẻ ảnh xã hội phổ biến, như Flickr, Google Photos, v.v.
* Xác định tất cả các mạng xã hội được sử dụng bởi người dùng hoặc công ty mục tiêu.
* Sử dụng các công cụ như [GeoCreepy](https://www.geocreepy.com/) để theo dõi thông tin vị trí địa lý để có một bức tranh rõ ràng về các vị trí hiện tại của người dùng.
* Sử dụng các công cụ OSINT tự động để truy xuất thông tin, chẳng hạn như [Spiderfoot](https://securitytrails.com/blog/spiderfoot-osint-automation-tool) hoặc [Us](https://securitytrails.com/blog/phantom-app-integration)

Đến bước cuối cùng chính là tổng hợp toàn bộ các thông tin bạn vừa tìm được, hãy lọc và phân loại chúng và hệ thống lại để có được 1 cái nhìn tổng thể nhất.

## OSINT Framework

Một nơi khá là phù hợp để bắt đầu là [OSINT Framework](https://osintframework.com/), một framework được tạo bởi Justin Nordine. Khung này cung cấp các liên kết đến các nhóm các tài nguyên cho rất nhiều nhiệm vụ từ thu thập địa chỉ email đến tìm kiếm phương tiện truyền thông xã hội hoặc deepweb.

![](https://images.viblo.asia/9f00b4c5-cedd-410e-a46d-a6fee256f797.png)

Trong nhiều bài viết về các công cụ OSINT, bạn sẽ thấy tham chiếu đến một hoặc hai gói có trong bản phân phối Kali Linux, như Harvester hoặc Maltego, nhưng để biết tổng quan đầy đủ về các công cụ OSINT có sẵn cho Kali, hãy xem [danh sách Công cụ Kali](https://tools.kali.org/tools-listing) và ví dụ về cách sử dụng từng công cụ.

![](https://images.viblo.asia/81d9a73f-9634-40fd-b305-abc87729de20.png)

Trong số những công cụ hữu ích mà bạn sẽ tìm thấy ở đây để thu thập thông tin nguồn mở maà các nhà nghiên cứu yêu thích như Nmap và Recon-ng. Công cụ Nmap cho phép bạn xác định IP, nói và xác định máy chủ nào khả dụng, dịch vụ nào máy chủ đó cung cấp, hệ điều hành họ chạy, tường lửa nào đang sử dụng và nhiều chi tiết khác.

Ngoài ra, Recon-Ng là một công cụ được viết bằng Python bởi Tim Tomes để dò. Bạn có thể sử dụng nó để làm những việc như liệt kê subdomain, nhưng bên cạnh đó có hàng tá mô-đun cho phép bạn kết nối vào những thứ như công cụ tìm kiếm internet Shodan, Github, Jigsaw, Virustotal và các loại khác.