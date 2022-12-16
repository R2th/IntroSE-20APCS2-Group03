# 1. Mở đầu

- Cùng một mã nguồn nhưng sau khi triển khai, có hệ thống thì trả về kết quả nhanh, nhưng cũng có hệ thống trả về chậm.

- Nguyên nhân thì có rất nhiều, nhưng thường hay được nhắc tới và xem xét, đặc biệt là với các global system, đó chính là CDN. Vậy CDN là gì ? 

- Công nghệ này có gì lợi hại mà 66% trong số 10.000 trang web hàng đầu thế giới sử dụng (theo BuiltWith, tháng 11 năm 2018) và không ngừng tăng lên.

- **Note**: Chém phần phật thế thui chứ số liệu được tra ở Google và cũng chưa tìm được bản gốc, các bác bỏ quá cho, hihi.

# 2. CDN là gì ?

- CDN (**Content Delivery Network**) tạm dịch là mạng phân phối nội dung.
- Là một mạng lưới máy chủ (caching server), được bố trí phân tán theo khu vực địa lý, với nhiệm vụ chính là phân phối nội dung tĩnh tới người dùng nhanh nhất có thể.


## 2.1 Ý tưởng
- **Đưa dữ liệu tới gần hơn với vị trí của người dùng.**
- Trước hết, chúng ta nói thêm một chút về 2 loại dữ liệu:
    - Dữ liệu tĩnh là những dữ liệu không bị thay đổi theo thời gian hoặc do tác động của người dùng như file ảnh, video, css, js, ...
    - Dữ liệu động là những dữ liệu biến động theo thời gian hoặc hành vi người dùng như tên sản phẩm, giá cả, lượt like, share, comment ...
    
- Khi chưa áp dụng CDN, dữ liệu sẽ được lưu trữ tại một máy chủ trung tâm (origin server) và tất cả đều được phân phối cho người dùng từ đây. 
    - Ví dụ: origin server đặt ở Ấn Độ thì người dùng ở Mỹ, Anh, Pháp, Nhật ... đều phải tải dữ liệu từ tận bên Ấn Độ về, khoảng cách địa lý là `bao nhiêu năm ánh sáng đó 🥲`, càng xa thì càng lâu.
    
      ![](https://images.viblo.asia/8a21b3e3-df2a-4107-a79d-f8f223e1a422.png)


- Sau khi áp dụng CDN, chúng ta sẽ có một hệ thống rất nhiều caching server chứa những dữ liệu tĩnh được bố trí ở nhiều nơi, user sẽ  tải những dữ liệu tĩnh đó từ caching server nào gần với vị trí của mình nhất, giúp giảm khoảng cách từ dữ liệu tới người dùng, dẫn tới giảm thời gian tải mà không phụ thuộc origin server đặt ở đâu.
    - Khi đó, người dùng ở Mỹ sẽ được tải dữ liệu từ máy chủ ở ngay nước Mỹ chứ không cần ***ăn bát cháo, chạy ba quãng đồng*** ở tận Ấn Độ nữa, ở Lao và Campodia có thể lấy dữ liệu từ Singapore hoặc HongKong (Ví dụ vậy)

        ![](https://images.viblo.asia/ccf68b18-5645-4ebc-9635-d6b6d884faaf.png)
        
    - Còn dữ liệu động thì chịu hoi, vẫn phải lấy từ origin server. 
    - Thực ra là vẫn có trò [Deploying to multiple regions](https://cloud.google.com/run/docs/multiple-regions), nôm na là đặt nhiều origin server ở nhiều nơi, user ở gần máy chủ nào hơn thì tới đó lấy data.
    - Cơ mà có lẽ hệ thống khá to mới cần đến mức này, chi phí cho nó cũng tương đối, chưa kể các vấn đề đồng bộ database, ... nên xin phép được bỏ qua ở đây. Trước mắt cứ 1 origin server là ngon rồi =))
    - Mà CDN chỉ có vậy thôi à ? Đúng vậy, bản chất thì chỉ có vậy nhưng hiệu ứng đi kèm thì nhiều, cứ bình tĩnh ...


## 2.2 Thành phần

- CDN có 3 phần như bên dưới:
    ![](https://images.viblo.asia/d83fd08b-7a01-4f4c-9b6f-dad8698f2f02.png)

- Point of Presence (PoP)
    - Đây là một điểm địa lý riêng lẻ chứa nhiều caching server, chẳng hạn như Singapore hay HongKong trong ví dụ ở trên.
    - Nhiều PoP này kết hợp lại sẽ tạo thành CDN, nếu đủ lớn thì sẽ trở thành CDN toàn cầu.

- Caching server
    - Có thể hiểu đây là máy chủ nhưng không xử lý logic như origin server, chủ yếu nó cache file tĩnh và trả về thôi.
    - Ví dụ PoP ở Singapore có 1000 caching server nhưng PoP ở Ấn Độ chỉ có 800 caching server chẳng hạn, số lượng này phụ thuộc nhà cung cấp.

- SSD/HDD + RAM.
    - Trong mỗi caching server thì dữ liệu được lưu trữ trong ổ cứng và RAM.

## 2.3  Ưu điểm

- Cải thiện thời gian tải website nhờ:
    - Giảm khoảng cách địa lý.
    - Giảm dung lượng file bằng cách nén ảnh, nén file, làm gọn file css, js ...
    
    -> Từ đó, nâng cao trải nghiệm người dùng, giảm tỉ lệ thoát trang, kéo người dùng ở lại và gắn bó lâu dài hơn, thuận lợi cho SEO.

- Giảm tải cho origin server, từ đó:
    - Giảm hoặc giải quyết tình trạng **nghẽn cố chai** giữa client và server.
    - Tăng khả năng xử lý được nhiều requets đồng thời cho origin server.
    - Tăng tính khả dụng của nội dung tĩnh: Khi origin server gặp sự cố thì hệ thống vẫn có thể cung cấp nội dung tĩnh, hơn nữa nhờ bản chất phân tán của CDN nên nó có thể xử lý được nhiều lưu lượng hơn, khả năng chịu lỗi tốt hơn origin server.
    - Tăng luôn cả tính khả dụng của toàn hệ thống nhờ **load balancing (cân bằng tải)**, phân phối hợp lý lưu lượng tới các caching server, an toàn hơn khi hệ thống tăng nhanh, đột biến về lưu lượng. Giả sử có một caching server gặp sự cố thì vẫn còn những đồng đội khác bọc lót hỗ trợ nhau.
    - Giảm thiểu lượng băng thông tiêu thụ, có trường hợp, caching server gánh gần hết băng thông của hệ thống:
        - Ví dụ origin server dùng Google Cloud thì chi phí băng thông hiện nay trung bình khoảng 0,06$/GB, giả sử 1 ngày dùng 100GB thì chi phí bằng thông 1 tháng là 100 * 30 * 0.06 = 180$
        - Nếu dùng CDN, thì phụ thuộc nhà cung cấp, như CloudFlare có gói 20$ /tháng và không giới hạn băng thông.

- Tăng cường bảo mật: 
    - Lọc request có hành vi khác thường, phát hiện và chặn các hành động như crawler hoặc attack ...
    - Tính năng ẩn IP, giúp che giấu IP của origin server khỏi sự dòm ngó của hacker, hạn chế được tác động khi bị tấn công DDoS.
    - Có thể đọc để hiểu thêm về [SSL/TLS](https://www.cloudflare.com/learning/cdn/cdn-ssl-tls-security/) nhé !
    


## 2.4  Nhược điểm

- Nếu CDN không có PoP đặt gần user hơn so với origin server thì tốc độ truy cập sẽ chậm hơn so với ban đầu.
    - Ví dụ thế này, có một đội dev ở Việt Nam, thuê server ở Việt Nam, khi làm sản phẩm xong (chưa có CDN) thấy chạy khá là nhanh vì mình lấy data tại chỗ, còn global user thì comment là app load chậm, vì họ ở xa quá.
    - Sau khi bạn tích hợp CDN xong thì đội dev sẽ hỏi: "Ủa sao mất thêm tiền cài CDN vào mà app chạy còn chậm hơn ban đầu vậy 🤣"
    - Đơn giản đây là bài toán cho global user, 95% user ở khắp thế giới sẽ thấy load nhanh hơn và 5% user ở Việt Nam thấy chậm hơn vì ko được lấy data tại **sân nhà** nữa mà phải sang tận Sing hoặc HongKong để lấy data về.
- Không cập nhật phiên bản mới của dữ liệu.
    - Khi bạn thay đổi file ảnh nhưng giữ nguyên tên, hoặc thay đổi nội dung file css, js, thì đường dẫn sẽ không thay đổi.
    - Dẫn tới dữ liệu vẫn được tải từ caching server mà không được cập nhật mới từ origin server.
    - Giải pháp là đánh dấu thêm tên phiên bản vào đường dẫn, ví dụ từ `main.js` thành `main_v1.js`, `main.js?version=1` ... hoặc xóa cache trên caching server đi. (Lát nữa tới demo CloudFlare sẽ có hướng dẫn chi tiết)

- Khó debug hơn
    - Bây giờ thì request sẽ không đi thẳng một mạch giữa origin server và client nữa.
    - Nên đôi khi hệ thống gặp vấn đề và cần debug thì yêu cầu người thực hiện cần có kiến thức về CDN và nhà cung cấp đang sử dụng.

## 2.5 Nên dùng khi nào

- Căn cứ vào mục đích sử dụng thì có 3 loại sau:
    - Pull HTTP/Static: Cung cấp tên miền + IP, sau đó các PoPs sẽ tự động đến lấy dữ liệu và cache lại.
    - Post/Push/Put/Storage: Tải trực tiếp dữ liệu lên caching server.
    - Streaming CDN: Giúp phân phối nội dung phát trực tuyến, tiết kiệm băng thông cho origin server.

- Căn cứ vào quy mô, tính chất của website thì nên tích hợp CDN nếu user ở xa máy chủ hoặc lượt truy cập lớn, tốn nhiều băng thông, còn nếu máy chủ đã gần người dùng sẵn hoặc lượt truy cập thấp thì cũng chưa cần dùng công nghệ này. 

- Note: Có trường hợp, người dùng chỉ ở Việt Nam, hosting cũng ở Việt Nam nhưng vì muốn tận dụng tính năng chống tấn công DDoS và giá cả tốt nên website vẫn tích hợp CloudFlare CDN gói free, mặc dù biết là khi đó truy cập sẽ chậm hơn đôi chút. Vì vậy, nên hiểu bản chất và linh động áp dụng chứ không nên bám vào suy nghĩ CDN là để nhanh hơn và phải nhanh hơn.

## 2.6 Lịch sử

Phiên bản đầu tiên đã ra đời năm 1997, khá lâu đời rồi nhỉ.

![](https://images.viblo.asia/8eead77f-be1f-4f8f-83dc-89bca7cc5d9b.png)

## 2.7 Nhà cung cấp
Hiện nay, có rất nhiều nhà cung cấp dịch vụ CDN, khi chọn lựa nên lưu ý 3 điều sau:

1. Hệ thống PoP
    - Việc bố trí các PoP như thế nào là câu chuyện kinh doanh của từng nhà cung cấp, một số thì chủ trương bao phủ bằng cách đặt nhiều máy chủ nhỏ ở nhiều nơi, một số thì lại muốn xây dựng và duy trì PoP ít hơn nhưng hiệu suất cao.
    
        - Các nhà cung cấp tại Việt Nam như [VNCDN](https://vncdn.vn/) với 280 PoPs ở 32 quốc gia, [HostVN](https://hostvn.net/cloud/content-delivery-network) với 11 PoPs trong nước, [Viettel IDC](https://www.idcviettel.vn/dich-vu-online/cdn/59.html), [Bizfly Cloud](https://bizflycloud.vn/cdn), ...
          
        - Các nhà cung cấp nước ngoài như [Google](https://cloud.google.com/cdn/docs/locations) với hơn [100 PoPs](https://peering.google.com/#/infrastructure), [CloudFlare](https://www.cloudflare.com/network/) với hơn 250 [PoPs](https://www.cloudflarestatus.com/) trên hơn 110 quốc gia, ...
        
         - Theo bảng so sánh tốc độ phản hồi trung bình này thì hàng của Google nhanh nhất.
             ![](https://images.viblo.asia/92a9dbec-3dd4-4ce4-8ae7-961598dc3d1d.png)

        - Phụ thuộc vào nhiều tiêu chí nhưng nhìn chung, nên chọn nhà cung cấp có nhiều PoPs nơi hệ thống có nhiều người dùng nhất, như Tiki đang sử dụng của [VNCDN](https://cdnvietnam.com/he-thong-cdn-lon-nhat-viet-nam)
        
2. Thanh toán, có hai hình thức:
    - Trọn gói:
        - **Nhóm này không giới hạn băng thông**, phù hợp với những hệ thống dùng băng thông lưu lượng lớn.
        - Như CloudFlare đang có 4 gói sau:
            ![](https://images.viblo.asia/d0bddf12-cadc-4609-9abc-0197decba9e8.png)
    
            
    
    - Dùng bao nhiêu trả bấy nhiêu.
        - Nhóm này thì phù hợp với những ai muốn thử nghiệm về CDN, xem có phù hợp với hệ thống của mình không, hoặc hệ thống dùng ít băng thông.
        - Như anh Google tính [tương đối phức tạp](https://cloud.google.com/cdn/pricing), đã từng dùng và chia ra trung bình khoảng 0.06$ / GB
        - Tới [KeyCDN](https://www.keycdn.com/pricing) thì đỡ phức tạp hơn:
            ![](https://images.viblo.asia/cdd3756b-82e7-44b0-b385-fa4c5bff4ba2.png)

        - Với [Viettel](https://www.idcviettel.vn/dich-vu-online/cdn/59.html) nhà mình:
        
           ![](https://images.viblo.asia/7dddb5d5-0e45-40d6-8f90-35d0c778694e.png)

        

3. Tính năng hỗ trợ
    - Ban đầu thì mình không có dự định liệt kê nhưng sau đó bổ sung, nó cũng ảnh hưởng đôi chút.
    - Là câu chuyện kinh doanh nên một số nhà cung cấp cạnh tranh bằng cách đi theo hướng tập trung vào hình ảnh, tối ưu hóa kích cỡ ảnh trên nhiều thiết bị, lazy load, thay đổi kích thước, nén, thêm hiệu ứng bo tròn, mờ ... Hoặc tối ưu css, js tự động nén ... Một số thì thiết kế chuyên dụng cho website dùng WordPress như Photon ... một số thì bảo [BunnyCDN](https://bunny.net/pricing) khá xịn và rẻ, nên là có nhiều sự lựa chọn và tùy biến nha.



> **Trong bài viết này, chúng ta sẽ thực hành với CloudFlare**
    
   -> Có hỗ trợ gói Free cho các bạn thử nghiệm. 
   
   -> Không giới hạn băng thông.   
   
   -> Thuận tiện khai triển khai + bảo mật.
      
   -> Nhiều tiện ích đi kèm, giao diện thân thiện, dễ sử dụng.
      
   -> Hệ thống ổn định.
      
   -> Khá nổi tiếng và quen thuộc, được đông đảo người dùng tin tưởng và sử dụng.

# 3. CloudFlare là gì ?

- CloudFlare là tên của một công ty 🤣

- Công ty này cùng cấp nhiều dịch vụ cho website như DNS, CDN, SPDY, Firewall chống tấn công DDoS, Spam, chứng chỉ SSL, ... nhiều lắm.

- Chúng ta sẽ tìm hiểu về hệ sinh thái CloudFlare ở một bài khác, còn trong phạm vi bài viết này sẽ chỉ nói về `CloudFalre CDN`, nhưng dây mơ rễ má có liên quan nên cũng phải hiểu thêm một chút về `CloudFlare DNS` nữa.

- DNS là viết tắt của Domain Name System - hệ thống phân giải tên miền.

- Ở mức cơ bản nhất, khi muốn truy trang báo điện tử Dân Trí để đọc tin tức, ta cần truy cập vào máy chủ của Dân Trí để lấy thông tin, ta cần IP của nó, ví dụ, ping vào 192.168.xx.xxx chẳng hạn, nhưng người dùng sẽ khó mà nhớ được những con số IP loằng ngoằng kia, hơn nữa IP lại có thể thay đổi. Do đó, ta gắn tên miền `dantri.vn` vào IP đó để thuận tiện cho người dùng. Còn hệ thống để chỉ dẫn từ tên miền này trỏ vào IP nào thì gọi là DNS.

- Tại sao cần biết về CloudFlare DNS khi nói tới CloudFlare CDN.
  
  
  ![](https://images.viblo.asia/f7507d3c-4478-4d40-a609-33447beb1f6f.png)

- Sau khi nhận request `dantri.vn` từ trình duyệt của người dùng, CloudFlare DNS sẽ phân tích và điều hướng, để dữ liệu tĩnh thì được lấy thì caching server gần nhất với user, còn dữ liệu động thì lấy từ origin server, ta có thể hiểu đơn giản là vậy.

# 4. CloudFare CDN

## 4.1 Đăng ký và cấu hình

- Các bạn cứ đăng lý tài khoản CloudFlare và add thẻ thanh toán quốc tế vào bình thường nhé !
- Sau đây là một số hình ảnh mình họa:
    - Ấn vào Add A Site
        
        ![](https://images.viblo.asia/aeac6f55-f988-4393-a06a-8ddc7b461260.png)

        
    - Điền domain rồi sau đó chọn Plan
    
        Cứ chọn Free, sau khi thiết lập xong nâng cấp lên sau.
        ![](https://images.viblo.asia/8c1b9758-a28e-4273-b620-8c2cb3a0dbe6.png)
        
    - Trỏ Name servers về CloudFlare
        
        DNS thì có nhiều nhà cung cấp, công ty mà bạn mua Domain thường cũng sẽ cung cấp DNS cho bạn.
        
        Bây giờ, bạn cần chuyển từ nhà cung cấp DNS đó sang CloudFlare DNS cho domain.
        
        Cứ làm theo hướng dẫn mà CloudFlare chỉ cho bạn là được, ví dụ như này
        ![](https://images.viblo.asia/15c4225e-63ca-4634-abf2-5a3d6ed5c5b3.png)
        
        **Sau khi thành công thì CloudFlare sẽ gửi mail cho bạn để chúc mừng & xác nhận nhé**

    - Cấu hình DNS
      
        Ở mức cơ bản, ta cần tạo 1 record với:
        + Type: A    
        + Name: Tên miền
        + Content: Địa chỉ IP
        + Proxy Status: Proxied
            + Màu vàng: Vừa DNS, vừa CDN
            + Màu trắng: Chỉ có DNS (tức là chỉ phân giải domain ra IP thôi, mà không có CDN)
        + TTL: Auto
    
        ![](https://images.viblo.asia/de5d2deb-a084-4f54-a255-920db99a47e2.png)



        
    - Những cài đặt khác như SUBDOMAIN, SSL/TLS, HTTPS  ... thì hẹn ae ở bài sau nhé, bài này chỉ liên quan tới CDN.

## 4.1 Kiểm tra và theo dõi

- Kiểm tra
    - Ngay tại trang Viblo.asia
    - Ấn F12, chọn tab Network, filter theo file JS
    - Chọn một request bất kì, ấn vào để kiểm tra **Response Headers** sẽ thấy những thông tin sau:
        - **server: cloudflare** (Cloudflare tiếp nhận xử lý rồi nhé)
        - **cf-cache-status: HIT** (File này đã HIT thành công, ngoài ra còn có những trạng thái [MISS, EXPIRED, BYPASS, REVALIDATED](https://developers.cloudflare.com/cache/about/default-cache-behavior) ... )
        - **cf-ray: 6e2e4ba59c3b8b36-HKG** (HKG nghĩa là PoP ở HongKong)
       
       ![](https://images.viblo.asia/460f7a76-43af-4c67-9191-76857a4d6697.png)


- Theo dõi tỉ lệ caching (HIT rate)
    
    - Trong ví dụ bên dưới, ta thấy:
    
        Trong vòng 24h qua
    
        Có 1,76 triệu request được gửi lên
    
        Trong đó 85% được trả về từ caching server (HIT 1,51 triệu request)
        
        ![](https://images.viblo.asia/e9404d6d-e3c9-4e0d-a48f-fce584f6bc59.png)

        
        Có 352,7 GB băng thông được sử dụng
    
        Trong đó 99,92% đã được cache lại và chỉ có 0,08% lấy từ origin server, **ghê chưa ^_^**
        
        ![](https://images.viblo.asia/d3fdfa96-31ce-4588-a824-68ec5a3d1113.png)
        
        **Cứ trải nghiệm thêm thì sẽ còn một số thống kê khá thú vị nữa nha.**
        
        **Đây là số liệu thật từ một hệ thống mà mình đang quản trị.**


## 4.2 Một số vấn đề có thể gặp

- Không tải được nội dung mới nhất của file
    - Như đã đề cập ở trên, thay đổi nội dung file, nhưng không thay đổi tên dẫn đến không thay đổi url
    - Ví dụ như sửa css, js, đổi file ảnh nhưng giữ nguyên tên.
    - Vào Caching/ Configuration, chọn Purge Everything nếu muốn xóa tất cả dữ liệu caching, Custom Purge nếu muốn thêm tùy chọn
    - Chọn Url, Điền url bạn muốn xóa cache, ví dụ https://www.viblo.asia/cat.jpg
    
        ![](https://images.viblo.asia/5ae145c7-2968-42b1-8f24-09ad34f86173.png)


- Tỉ lệ HIT rate thấp, có thể có nhiều lý do:
    1. Origin server được cấu hình để không cho chép các server khác cache data. 
        -  [Default Cache Behavior](https://developers.cloudflare.com/cache/about/default-cache-behavior) sẽ luôn tôn trọng chỉ định của origin server, ví dụ như `private`, `no-store`, `no-cache` hoặc `max-age=0`
        -  Khi đó, hãy sử dụng CloudFlare Rules để bắt buộc cache lại những file này
        -  Vào Rules chọn Create Page Rule
            -  Cache Level: Cache Everything, 
            -  Edge Cache TTL: a month
        
            Lúc này CloudFlare sẽ bỏ qua chỉnh định của origin server và làm theo Rule.
        ![](https://images.viblo.asia/ea8eb73b-64a6-4e74-b810-98665be22783.png)

    2. Đây là phỏng đoán, dựa theo kinh nghiệm cá nhân.
        - Sau khi HIT một thời gian nhất định mà người dùng không tải lại file đó nữa thì CloudFlare hiểu file này có lượt truy cập thấp
        - Và sẽ xóa file này để nhường chỗ cho những file khác
        - Ví dụ với hệ thống có 10.000 bức ảnh, được load random, nếu như lượng user chưa có đủ nhiều để bao phủ, thì mất khá nhiều thời gian để random tới bức ảnh đã được tải lần trước, và lúc này nó đã bị xóa khỏi cache rồi.
        - Và con số thời gian đó là bao nhiêu thì mình cũng chưa tìm thấy tài liệu chính thức nào cả.


Tham khảo:
1. https://www.hostinger.vn/huong-dan/cdn-la-gi
2. https://speed.family/cdn-la-gi/
3. https://www.cloudflare.com/learning/cdn/what-is-a-cdn/
4. https://www.cloudflare.com/learning/cdn/performance/
5. https://www.cloudflare.com/learning/cdn/cdn-ssl-tls-security/
6. https://www.imperva.com/learn/performance/what-is-cdn-how-it-works/
7. https://www.imperva.com/learn/performance/cache-control/
8. https://speed.family/rac-roi-cdn/
9. https://cdnvietnam.com/cdn-viet-nam/