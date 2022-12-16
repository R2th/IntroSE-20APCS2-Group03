Xin chào tất cả mọi người!!
    
Trong thời kì Công nghệ số (4.0) phát triển như ngày hôm nay, chắc hẳn ai ai cũng biết tới các giao dịch online (ví dụ như banking, ví điện tử....) Thay vì muốn chuyển tiền bạn phải ra cây atm hay thậm chí ra quầy ngân hàng, hoặc là muốn thanh toán tiền điện, tiền nước là vô cùng khó khăn, khổ sở... wow. Nhưng ngày nay, với internet banking, momo, viettelpay... thì những vấn đề trên đều được giải quyết một các hết sức là đơn giản. Chỉ với chiếc smartphone, 1 vài cờ líck đơn giản, là bạn đã có thể chuyển được tiền cho bạn bè, cho người thân, và cho Gấu chó.... Nhưng nó hoạt động ra sau? Tại sao bạn sử dụng banking của ngân hàng A lại chuyển được sang ngân hàng B. WOw??? có ai đặt ra câu hỏi đó chưa nhỉ?? Hay là các ngân hàng có hệ thống gì đó có thể nói chuyện được với nhau. Hehe mình sẽ giải quyết bài toán đó cùng các bạn nhé!
     
## Phần I: Giới thiệu về hệ thống core của ngân hàng.
   
Thứ nhất: Trong mỗi ngân hàng, đều sẽ có 1 hệ thống quản lý thẻ hay còn gọi là core thẻ. Công việc của core thẻ đó chính là quản lý số thẻ của các bạn (hiểu đơn giản vậy thôi nhé). Ngoài việc lưu trữ, quản lý số thẻ, nó còn giúp cho các ngân hàng có thể xem được các giao dịch, lịch sử giao dịch thực hiện bởi số thẻ đó... 

- Không những vậy, 1 hệ thống core thẻ còn có rất nhiều công việc khác nữa nhé( mình sẽ làm 1 bài chi tiết về core thẻ nhé, bài này đang overview mà).
- Một số ngân hàng hiện nay đang sử dụng giải pháp của thanh toán của 1 số nhà cung cấp nước ngoài (ví dụ hệ thống của Nga): ví dụ: Way4. Way4 là 1 hệ thống rất rất là lớn... bao gồm:
* >         TransactionSwitch (viết tắt là TS)
* >         Netserver (viết tắt là NS)
* >         Database Managerments (viết tắt là DBM)
* >         Webservice (runtime ws)
* >         Access Server (AS)
         
Công việc của thể của chúng là gì?
         
### 1. TransactionSwitch (TS):
         
Cái tên nói lên tất cả. Hiểu nôm na, TS là 1 service routing giúp định hướng đường đi của các luồng message. Để điều hướng đường đi, trên server TS open rất nhiều service để các service khác gọi đến. TS có 1 số service như là: IntraLinks (kênh connect từ NS tới TS và ngược lại), RBS (kênh làm việc với ESB (enterprise service bus), NAPAS (kênh kết nối tới NAPAS (https://vi.wikipedia.org/wiki/Napas)).... Mỗi 1 service sẽ có những phải config riêng (file xml, config IP, PORT và 1 số field của message ISO 8583).
           
### 2. Netserver (NS):
         
Trước kia, 1 số service như là ATM (bật tắt ATM, ATM controller, kênh POS...) đều đi qua NS rồi mới sang TS thực hiện giao dịch. Nhưng ngày nay, chiến lược mới đang là gỉam thiểu NS và thực hiện chuyển tất cả các dịch vự trước đây sang TS. Các dịch vụ của ATM đều đc đi qua NS trước (qua message ISO 8583) rồi mới thực hiện qua TS rồi định hướng đi tiếp (có thể vào core, hoặc kênh NAPAS).
             
### 3. Database Managerments (DBM):
            
DBM, hay còn gọi là Way4, được viết bằng java swing, là một phần mềm quản lý, cấu hình, tạo ra những thứ liên quan tới thẻ (ví dụ: tạo thẻ, chuyển trạng thái của thẻ, xem lịch sử giao dịch của thẻ, quản lý các cây ATM, ....) Nôm nà là giao diện giúp chúng ta quản lý dễ dàng hơn.
                 
### 4. Webservice (WS):
        
Đúng như cái tên, WS được viết ra giúp support 1 số message đơn giản hơn. Công việc của các bạn IT chỉ đơn giản là call các APIs được viết bằng SOAP. (WS có 2 loại là restful và soap) nó có 1 số message như là: isspayment to (ghi có vào thẻ - nôm na là bắn tiền vào thẻ cộng tiền), isspayment from (ghi nợ vào thẻ - nôm na là lấy tiền từ thẻ ra, trừ tiền ).... rất nhiều APIs khác nữa.
           
### 5. Access Server (AS):
- Thường thì mỗi bank sẽ có 2 con AS gọi là AS 1 và AS 2. Nhiệm vụ của AS là giúp connection tới DB. Chúng ta cần tới 2 con server AS vì nhiệm vụ loadbalace( hàng ngày có rất nhiều req các bạn nhé). AS đứng trung giản ở giữa NS và DB (giúp NS connect tới DB bằng việc sử dụng socket).
               
Hôm nay tạm thời đến đây nhé các bạn? nếu các bạn ủng hộ mình sẽ chi tiết từng mục từng mục vào các bài viết sau nhé. 

Nếu có thắc mắc hoặc câu hỏi dành cho mình, đừng ngần ngại comment nhé!!!!