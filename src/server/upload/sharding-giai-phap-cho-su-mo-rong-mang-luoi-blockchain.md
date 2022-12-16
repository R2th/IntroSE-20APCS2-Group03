# 1, Sharding là gì?
   Đầu tiên, ta cùng điểm qua một số đặc điểm chính của một mạng Blockchain lý tưởng:
   - Decentralization (Phi tập trung)
   - Security (Tính bảo mật)
   - Scalability (Khả năng mở rộng)
   
  Và hiện tại thì Ethereum đã đảm bảo được `Decentralization`  và `Security`  còn `Scalability` vẫn đang là vấn đề cần được giải quyết một cách cấp thiết.
  
  Một số ví dụ để thấy được tính cần thiết của khả năng mở rộng cho mạng lưới Ethereum Blockchain:
  
  - Hiện nay, các tổ chức, doanh nghiệp, các công ty công nghệ ngày càng quan tâm hơn về lợi ích, tiềm năng của Blockchain và từ đó, ứng dụng của nó được mở rộng hơn và số lượng giao dịch cũng từ đó mà phát triển một cách đáng kinh ngạc:
   
  ![](https://images.viblo.asia/6e8c3824-84fe-4d0c-a0b7-aa40733ac35a.jpg)
   
                                                    (Biểu đồ số lượng giao dịch/ngày trên mạng Ethereum từ Tháng 10-2015 đến Tháng 5-2019) 
                                                    
   
   - Và tệ hơn là những trường hợp như sự cố **Cryptokitties**: Nếu ai chưa nghe tới thì có thể lên Google để tìm hiểu rõ ràng hơn hoặc để mình giải thích ngắn: **Cryptokitties** là một trò chơi hoạt động trên mạng lưới Ethereum mà ở đó, người chơi sẽ dùng Ether- đơn vị tiền mã hóa của Ethereum để trao đổi, mua bán những chú mèo. Nghe thì cũng thấy nó khá đơn giản và nhàm chán phải không nào :)) nhưng nó có tầm ảnh hưởng rất lớn vì là nó là một trong những game đầu tiên hoạt động trên nền tảng Blockchain.
   
Và nếu mọi người quan tâm có thể tìm hiểu, tham gia cộng đồng mèo Kitty tại: https://www.cryptokitties.co/  :grin::grin:

![](https://images.viblo.asia/6d95160b-640c-4a1c-af14-6611327e841d.jpg)
   
Và nó đã gặp sự cố do số lượng giao dịch thì ngày một tăng lên trong khi khả năng xử lý của Ethereum còn hạn chế (15 giao dịch/giây) khiến mạng lưới tắc nghẽn, không xử lý kịp.

Cũng chính vì thế, những mạng lưới Blockchain ngày nay tập trung vào cải thiện tốc độ, quy mô xử lý các giao dịch nhưng vẫn đảm bảo được tính security cho chúng.
# 2, Hiểu rõ hơn về vấn đề

Một trong những lý do khiến Blockchain đảm bảo được tính security của mình là do mỗi node tham gia trong mạng lưới đều xác thực qua tất cả các transaction (nếu transaction muốn được confirm lên mạng lưới). Nó giống với việc các bài tập về nhà của bạn phải được chấm bởi tất cả các giáo viên trong trường để đảm bảo được tính đúng đắn :))). Do vậy, nó sẽ tốn rất nhiều thời gian để bạn có thể biết được điểm của bài đó.

![](https://images.viblo.asia/ec5a243e-c729-4ba6-9b91-96bb5c7e413a.jpg)

Và vấn đề về Scalability mà Ethereum đang phải đối diện cũng vậy: Mỗi node là một giáo viên và mỗi transaction là 1 bài kiểm tra của bạn vậy (Nhưng ở đây là hàng ngàn, hàng triệu node chứ không phải vài chục giáo viên ở trường...)

Sẽ thế nào nếu ta thỏa hiệp rằng sẽ chỉ cần một nhóm nhỏ giáo viên (các node) đủ tin tưởng để chấm bài kiểm tra (xác thực giao dịch) đó sao cho vẫn đảm bảo được tính đúng đắn mà tốc độ sẽ được cải thiện đáng kể?

=> Và Sharding chính là câu trả lời cho bài toán về khả năng mở rộng để cho phép tăng tốc độ giao dịch và áp dụng rộng rãi hơn.

# 3, Sharding- Giải pháp cho bài toán Scalability 
Sharding, theo cách hiểu truyền thống, là một loại phân vùng tách các cơ sở dữ liệu lớn thành các phần nhỏ hơn, nhanh hơn được gọi là `shard`. Một shard theo định nghĩa chỉ là một phần nhỏ của một phân vùng lớn hơn.

![](https://images.viblo.asia/bd2384dc-72bc-4ccc-9be7-49f17ba5844d.png)

Và hãy tưởng tượng rằng mạng lưới Ethereum bị chia thành hàng ngàn các shard. Và những gì cộng đồng Ethereum đang cố gắng đạt được với việc thực hiện Sharding là bỏ đi yêu cầu các giao dịch phải được kiểm tra bằng tất cả các nút trên toàn mạng lưới. Và khi đó, sharding sẽ cho phép hàng nghìn giao dịch mỗi giây mà không cần qua tất cả các nút, điều này cũng sẽ làm giảm đáng kể kích thước tổng thể. Tuy nhiên, quá trình này không tin tưởng vì các nút có sự phụ thuộc hơn là độc lập. Đây là sự hy sinh tính bảo mật để tăng khả năng mở rộng cho hệ thống.

Khi một nút cụ thể yêu cầu thông tin không được lưu trữ trong shard riêng của nó thì nó sẽ tìm thông tin ở các khối khác. Đây là cơ chế mà các shard trao đổi thông tin với nhau.

Một ví dụ về cách hoạt động này:

Bob (Địa chỉ ở Shard 1) Muốn gửi 100 ETH cho Alice (Địa chỉ ở Shard 10).

1, Một giao dịch được gửi lên Shard 1 và hệ thống sẽ đợi cho giao dịch được xác thực (đảm bảo được tính đúng đắn của giao dịch: Tài khoản của Bob có số tiền đó,...) 

2, Một biên lai được tạo.

3, Một giao dịch được gửi tới Shard 10 gồm biên lai vừa tạo và Shard 10 kiểm tra nếu biên lai đó chưa chi tiêu.

4, Shard 10 xử lý giao dịch và gửi số tiền đó cho Alice, đồng thời xác nhận là biên lai từ Shard 1 đó đã được sử dụng.

5, Shard 10 tạo một biên lai mới để có thể sử dụng ở các giao dịch tiếp theo.

# 4, Tổng kết

Sharding là một cách tiếp cận rất khả thi để giải quyết vấn đề về khả năng mở rộng blockchain. Tuy nhiên, nó không phải không có nhược điểm. Do cấu trúc của nó, nó có thể dễ dàng bị mất đi tính security của Blockchain.

Và đây cũng chính là một trong những lý do thúc đẩy Ethereum chuyển sang Proof-Of-Stake (Một kiểu của cơ chế đồng thuận giúp các mạng lưới Blockchain hoạt động được). Proof-Of-Stake giúp giảm thiểu lỗ hổng bảo mật đi kèm với Sharding. Và đây là phát biểu của Vitalik Buterin- người đồng sáng lập ra mạng Ethereum: "Sharding and Plasma to Help Ethereum Reach 1 Million Transactions Per Second" - mình xin tạm dịch: "Sharding và Plasma có thể đưa tốc độ giao dịch của Ethereum lên đến 1 triệu giao dịch trên giây" @@ một con số hoàn hảo phải không nào? Và Plasma hay Proof-Of-Stake là gì thì mình xin chia sẻ thêm ở những bài viết sau.

Tham khảo: https://medium.com/prysmatic-labs/how-to-scale-ethereum-sharding-explained-ba2e283b7fce 

Trên đây là những chia sẻ của mình về sharding sau khi tìm hiểu. Rất mong nhận được sự đóng góp ý kiến của mọi người. Xin cảm ơn!