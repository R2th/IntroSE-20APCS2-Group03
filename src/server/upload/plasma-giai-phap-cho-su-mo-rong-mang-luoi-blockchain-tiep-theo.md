Xin chào tất cả mọi người, trong bài viết này, mình xin phép được tiếp tục chia sẻ về những thứ liên quan tới công nghệ Blockchain mà mình tìm hiểu được, rất mong được sự ủng hộ của mọi người.

   Đầu tiên, mình xin được nhấn mạnh lại vấn đề: Các mạng Blockchain nổi bật nhất như Bitcoin và Ethereum đã phải vật lộn với các vấn đề về tốc độ giao dịch, khả năng mở rộng kể từ khi thành lập - vấn đề gây trở ngại cho việc áp dụng rộng rãi và sử dụng tiền điện tử hàng ngày. Và đây là nguyên nhân khiến việc mở rộng mạng lưới Ethereum hay Bitcoin nói riêng và mạng lưới Blockchain nói chung được đẩy mạnh ở thời điểm hiện tại. Và nó cũng là nguyên nhân để hôm nay, chúng ta được tìm hiểu về **Sharding** hay **Plasma**. Và bây giờ, chúng ta hãy cùng tìm hiểu xem chúng là gì, có thể làm gì và có ý nghĩa như thế nào đối với các mạng lưới Blockchain.
   
### Bắt đầu 

> "Sharding and Plasma to Help Ethereum Reach 1 Million Transactions Per Second"
> 
Đây là phát biểu của Vitalik Buterin (nhà đồng sáng lập ra Ethereum - một trong những mạng lưới Blockchain lớn nhất thế giới) và mình xin được phép dịch nó: "Sharding và Plasma có thể đẩy tốc độ giao dịch của Ethereum lên tới 1 triệu giao dịch / giây!!!" 

Con số này lớn hơn rất nhiều tốc độ giao dịch trung bình của visa (khoảng 1700 giao dịch/giây)  hay paypal (khoảng 193 giao dịch / giây) theo thống kê của [link](https://steemit.com/cryptocurrency/@steemhoops99/transaction-speed-bitcoin-visa-iota-paypal). Vậy Sharding và Plasma có liên quan gì tới nhau? Và làm thế nào mà chúng có thể đưa tốc độ giao dịch của Etherem chỉ (khoảng) 20 giao dịch / giây (ở thời điểm hiện tại) có thể lên tới con số khổng lồ tới vậy?

## 1, Sharding và Plasma 

Như bài trước mình đã chia sẻ về Sharding, và các bạn có thể xem lại [bài viết](https://viblo.asia/p/sharding-giai-phap-cho-su-mo-rong-mang-luoi-blockchain-6J3ZggwRZmB) để xem lại chi tiết hơn (một chút chút :D) về nó. Và mình xin được nhắc lại đôi nét:

- Sharding là một giải pháp cho sự mở rộng mạng lưới Ethereum bằng cách chia toàn bộ mạng lưới thành các "shards" hoặc "micro-chains" để xử lý các giao dịch riêng biệt. Bằng cách phân loại các giao dịch trên các chuỗi riêng lẻ trong chuỗi khối Ethereum chính, chỉ một nhóm các nút cần xác minh giao dịch có liên quan.
- Nó loại bỏ sự cần thiết của toàn bộ các nút trong mạng lưới để xử lý các giao dịch riêng lẻ. Điều này giúp tăng tốc độ giao dịch trên Ethereum Blockchain (tất nhiên, nó giống như là chỉ cần xin chữ ký của cả xóm thì sẽ nhanh hơn rất nhiều so với việc phải xin chữ ký của cả làng để xác nhận cùng 1 vấn đề :grinning:)

![hình ảnh minh họa cho Sharding](https://images.viblo.asia/7967e713-0afd-4c38-bcc4-497507b0c341.png)

(hình ảnh minh họa về Sharding)

còn Plasma? 

![](https://images.viblo.asia/2e9ae96d-8ae9-4251-afb5-333fcf09819c.jpg)

Hay liên tưởng tới trong giờ thi toán, bạn (chuỗi Ethereum chính) phân thân ra 1 người nữa (chuỗi plasma) và nhiệm vụ của hắn là tính toán các phép tính (tất nhiên phải tính đúng rồi :grinning:) và nhiệm vụ của bạn chỉ còn là ghi kết quả lên giấy mà không cần xử lý các phép toán nữa, và từ đó bạn có thể ngồi ngắm crush hoặc abcxyz... thật là perfect phải không nào (hehe)

Và đó cũng là ý tưởng chính của **Plasma**: **Plasma** bổ sung một chuỗi thứ hai nối vào chuỗi Ethereum chính và từ đó ta có thể xử lý các giao thức trong hợp đồng thông minh khối lượng lớn và nhanh hơn. Có một meme vui với Plasma với nội dung là: với Plasma, bạn có thể tạo ra "blockchain trong blockchain trong blockchain trong blockchain gốc" nhưng nó hoàn toàn đúng, nó chính là cách mà Plasma hoạt động và nó được mô tả trong [White Paper](https://plasma.io/plasma.pdf) của Plasma, mọi người có thể tham khảo sâu hơn tại đó.

![](https://images.viblo.asia/32bdb48a-8a51-4290-a597-0679e7f5a39b.png) (hình ảnh minh họa về Plasma)

Ta cũng có thể nghĩ tới trường hợp sau để hiểu sự cần thiết của Plasma đối với Ethereum là thế nào: Trong một thế giới game thì các bạn cũng biết số lượng các giao dịch, các trận chiến, các thông số,... hằng ngày của nó là "siêu to, khổng lồ" tới mức nào. Nếu đưa tất cả chúng lên mạng Ethereum (vì muốn tận dụng tính minh bạch, không thể sửa đổi càng nhiều thì ta phải đưa lên Blockchain càng nhiều thôi) ở tốc độ hiện tại khoảng 20 TPS (Transactions Per Second) thì chỉ nói riêng tới game đó thôi, việc xử lý các giao dịch sẽ phải chờ (và tốn cả phí nữa chứ) lâu tới mức nào!!  Khi đó, sự xuất hiện của "thế giới thứ 2", nơi sẽ xử lý các giao dịch, các thông số, các trận chiến,... cho Ethereum và nhiệm vụ của chuỗi chính Ethereum bây giờ chỉ còn là nhận những dữ liệu (cần thiết) và lưu nó trong các Block mà thôi :sunglasses:

Và chúng ta cùng tiếp tục nào!

> “So if you get a 100x from Sharding and a 100x from Plasma, those two basically give you a 10,000x scalability gain, which basically means blockchains will be powerful enough to handle most applications most people are trying to do with them.”
> 
Đó cũng là phát biểu của Buterin khi ông mô tả tác các giải pháp mở rộng quy mô mới trên mạng Ethereum. Và lướt qua thì ta cũng có thể hiểu ý tưởng của ổng: Plasma và Sharding có thể kết hợp với nhau (vừa tiến hành Sharding vừa tiến hành Plasma) để đưa tốc độ giao dịch của Ethereum lên tới con số 1 triệu TPS theo cách hoạt động của chúng. 

Vậy là ta đã hiểu mối liên quan giữa Sharding và Plasma như thế nào rồi, hai giải pháp mở rộng có thể kết hợp trong khi vẫn đảm bảo được tính bảo mật trên Ethereum, tạo ra một hệ sinh thái phi tập trung có khả năng hỗ trợ một triệu giao dịch mỗi giây.

## 2, Plasma hoạt động như thế nào?

Plasma, về bản chất, là các chuỗi khối được xây dựng bên trên các chuỗi khối. Đó chính là một loạt các hợp đồng thông minh chạy trên chuỗi gốc - ở đây là chuỗi chính của Ethereum.

Nếu người ta hình dung về kiến trúc và cấu trúc của Plasma thì có thể liên tưởng tới Blockchain chính và chuỗi khối Plasma như một cái cây. Chuỗi chính là gốc trong khi các chuỗi Plasma hay còn gọi là chuỗi con là các nhánh phát triển lên.

![](https://images.viblo.asia/8409e1f3-a502-47ec-85b2-7df73dc4f466.jpeg)
(hình ảnh minh họa về kiến trúc của Plasma - Hackernoon)

Các chuỗi con hoạt động xung quanh chuỗi gốc (chuỗi chính của Ethereum Blockchain) thực hiện các tính toán của riêng chúng và định kỳ cung cấp thông tin trạng thái (dữ liệu cần lưu trữ) cho chuỗi gốc. Chuỗi gốc không liên quan tới bất kỳ điều gì xảy ra trong chuỗi con mà nó chỉ quan tâm tới dữ liệu từ chuỗi con gửi lên trừ khi có sự tranh chấp cần giải quyết trong chuỗi con (có sự giả mạo hay giao dịch nào đó không đúng). 

Một số liên tưởng để hiểu rõ hơn về hoạt động của các chuỗi Plasma và chuỗi chính:

### 2.1, Vòng lặp 
Chuỗi gốc và các chuỗi con sẽ tạo thành một tập hợp các chuỗi khối lồng nhau. Để hiểu cách hệ thống lồng nhau lồng nhau hoạt động, mình xin lấy ví dụ về các vòng lặp lồng nhau:
```
for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++) {
        conditions
    }
    conditions
    }
```

-> Thay vì chỉ sử dụng một vòng lặp để thực thi toàn bộ điều kiện, ta sẽ sử dụng một vòng lặp khác bên trong vòng lặp chính và phân tách các điều kiện. Vòng lặp bên trong thực hiện phép tính và trả về giá trị cho vòng lặp chính (vòng lặp bên ngoài) để thực thi các điều kiện cuối cùng. Điều này làm cho tính toán ít phức tạp hơn nhiều.

Đó là bản chất làm thế nào các chuỗi khối lồng nhau hoạt động. Một ví dụ minh họa khá dễ hiểu phải không nào :smile:

Một cách thú vị khác để hiểu hơn về **Plasma** và đặc biệt là để biết cách giải quyết tranh chấp trong Plasma hoạt động, ta sẽ liên hệ với "hệ thống tòa án".

### 2.2, Hệ thống tòa án

![](https://images.viblo.asia/24591e3f-9b19-4de7-b1c1-058924de499b.jpg)    (hình ảnh minh họa hệ thống phân cấp tòa án của UK - [Nguồn](https://law.duke.edu/lib/researchguides/english/))


Trong trường hợp này:  
- Tòa án tối cao chính là chuỗi gốc, nó đưa ra luật đất đai. 
- Tòa án tối cao có các chuỗi con của nó (Hình sự và Dân sự) và mỗi chuỗi con lại có chuỗi con riêng.

Vì vậy, nếu một người đưa ra một vụ án dân sự lên tòa án, họ có thể trực tiếp đến tòa án tối cao (tất nhiên điều này phụ thuộc vào mức độ cao của vụ án).

Người nộp đơn trước tiên sẽ phải tới các tòa án quận. Nếu họ không hài lòng với quyết định của quận, thì họ có thể đi lên tòa án cấp cao hơn trước khi cuối cùng kháng cáo lên tòa án tối cao và tại đó, chắc chắn mọi thắc mắc, yêu cầu của họ sẽ được giải quyết (còn đúng hay không nữa thì lúc đó sẽ phải chấp nhận rồi :upside_down_face:).

Đó là các ý tưởng để giúp chúng ta tiếp cận với Plasma cũng như cách hoạt động của nó một cách dễ ràng hơn, và mình cũng xin dừng lại bài viết ở đây. Chắc chắn sẽ còn rất nhiều vấn đề xoay quanh không chỉ Plasma mà còn cả Ethereum hay Blockchain. Mọi người có thể tìm hiểu sâu hơn ở các tài liệu, white paper,...

## 3, Tổng kết
**Plasma** và **Sharding** là 2 giải pháp (thực ra mình không biết gọi là 2 giải pháp có chính xác không nữa vì chúng có thể kết hợp thành một và là một giải pháp cực kỳ cần thiết cho sự mở rộng của các mạng lưới Blockchain). Nhưng cái gì cũng có tính hai mặt của nó, tăng được khả năng mở rộng, tốc độ giao dịch được đẩy lên cao nhưng tính bảo mật hay tính phi tập trung lại là vấn đề mà chúng ta cần cân nhắc. 

Nhìn chung, ở góc độ của lập trình viên hay những người có đam mê tìm hiểu về công nghệ như chúng ta thì nó không phải vấn đề gì quá to lớn, chỉ là có thêm kiến thức cần tìm hiểu và có thêm thứ để ta ngồi trà đá chém gió với nhau thôi, cũng hay mà :grin::grin: 

Cảm ơn mọi người đã theo dõi bài chia sẻ của mình, chắc chắn bài viết của mình không thể thiếu được những sai sót và sự thiếu sót về cả nội dung lẫn giải thích, rất mong mọi người cùng mình thảo luận, đóng góp để mình và chúng ta cùng hoàn thiện hơn. Mình xin cảm ơn!

Tài liệu tham khảo: 

  https://cryptoslate.com/vitalik-buterin-sharding-and-plasma-to-help-ethereum-reach-1-million-transactions-per-second/

  https://blockgeeks.com/guides/what-is-omisego-the-plasma-protocol/