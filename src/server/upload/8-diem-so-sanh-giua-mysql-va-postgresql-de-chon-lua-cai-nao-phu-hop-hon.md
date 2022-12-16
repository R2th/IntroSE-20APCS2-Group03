Trong quá trình làm việc với khách hàng Nhật Bản có một dự án chuyên xử lý dữ liệu khá lớn bằng batch job, có file đến cả vài trăm Mb và tương lai còn tăng nữa, khiến bên họ phát sinh thảo luận nên dùng MySQL hay PostgreSQL và họ có gửi một bài lên room chung nói về 8 điểm so sánh giữa hai loại RDB này để cuối cùng đã đi đến chọn PostgreSQL. Đọc qua thấy khá hay nên tôi sẽ dịch lại để chia sẻ cùng mọi người :

Là một kỹ sự phát triển phần mềm thì bạn sẽ phải cân nhắc lựa chọn xem loại RDB nào sẽ là tối ưu cho dự án của mình. Với mỗi RDB thì sẽ có `sở trường` và `sở đoản` riêng của chúng. Do đó nếu mà chọn RDB mà không phù hợp với dự án, service thì sẽ có thể gây ra những vấn đề phát sinh không đáng có trong qúa trình phát triển hay cả khi đã đưa vào vận hành, vấn đề có thể nhiều hoặc ít nhưng tôi tin chắc là có. Trong số những RDB thì chúng tôi sẽ so sánh giữa hai loại khá phổ biến, khá là mạnh mẽ với nhiều tính năng, cũng như chúg đều là open source - PostgreSQL và MySQL. Vậy thì chúng cụ tỷ là có `sở trường` hay `sở đoản` gì ? Chúng tôi đã có buổi nói chuyện giữa hai nhà chuyên môn là Sawada chuyên PostgreSQL với Tanaka chuyên MySQL, họ đã cùng nhau so sánh theo từng chức năng như dưới đây. Hy vọng chúng sẽ là nội dung tham khảo hữu ích cho các bạn.

## 1. Non-blocking của thao tác DDL

#### Đầu tiên tôi muốn nói về DDL. Trước hết là MySQL.

Tanaka : MySQL thì tôi nghĩ có lợi điểm là có thể thực thi thao tác nhiều DDL bằng Non-blocking ( tức dù trong transaction nhưng mà block đến bảng là không có). Chức năng này có từ bản MySQL 5.6. Và trong trường hợp mà ALTER TABLE (thay đổi tên cột, thêm cột ...) chỉ những cột đối tượng cần xử lý thì nó không build bảng từ số 0 nên tốc độ xử lý nhanh, kéo theo việc sẽ giảm tải cho server.

#### Vậy còn PostgreSQL thì thao tác DDL như là ALTER TABLE không phải là Non-blocking ？

Sawada : Vâng. Nó tuỳ thuộc vào thực thi câu DDL nào thì sẽ khác nhưng mà thao tác write, ví dụ thêm cột chẳng hạn nó sẽ phát sinh block đến bảng khiến không thể tham chiếu đến nữa.

#### Tôi nghĩ là cũng sẽ có case mà muốn ALTER TABLE đối với DB production, vậy nên làm theo phương pháp như nào ?

Sawada : Thường thì tool chuyên dùng cho maintain là pg_repack sẽ được sử dụng. Nếu dùng nó thì có thể thực thi thao tác ALTER TABLE một phần hay tiến hành REINDEX bằng cách chỉ lock tối thiểu nhất.

#### Vậy thì chắc chắn là những kỹ sư mà vận hành PostgreSQL thì chắc là nên ghi nhớ có sự tồn tại của tool đó rồi.

## 2. Performance của câu DML

#### Tiếp theo tôi muốn so sánh các loại DML（thao tác dữ liệu）, trước tiên hãy nói về SELECT.

Tanaka : Nếu như là câu SELECT đơn giản thì tôi nghĩ không có sự khác biệt giữa MySQL và PostgreSQL.

Sawada : Chuẩn rồi. Khi đó SELECT không khác biệt gì.

Tanaka : Nhưng nếu mà SELECT mà cần phải sort lượng dữ liệu lớn （sau khi ORDER BY thì lấy tất cả dữ liệu ra chẳng hạn ...）thì MySQL sẽ bị chậm. Nguyên do là nếu mà so sánh với PostgreSQL thì MySQL có thuật toán sort không được tốt bằng. MySQL về cơ bản không coi việc sort lượng lớn dữ liệu là use case cần quan tâm.

#### Câu SELECT với điều kiện như nào thì MySQL mới phát huy điểm mạnh của nó ？

Tanaka : MySQL chuyên về use case như là lấy ra 10 hay 100 dữ liệu đầu tiên, ví dụ như cách của Twitter thì nó sẽ nhanh hơn so với PostgreSQL. 

#### Còn những câu DML khác thì thế nào, ví dụ là UPDATE.

Tanaka : UPDATE thì performance của MySQL sẽ ngon hơn đó.

Sawada: Tôi cũng nghĩ vậy.

#### Tại sao vậy ？

Sawada : PostgreSQL nếu nói về kỹ thuật thì khi UPDATE sẽ có xử lý gần giống như là khi INSERT. Cụ thể là nó sẽ oánh dấu flag như là delete vào dòng trước khi thay đổi rồi thêm dòng mới mà có dữ liệu sau khi mà thay đổi vào.

Tanaka : Ngược lại thì MySQL sẽ ghi đè đối tượng sẽ được UPDATE nên nó đúng với nghĩa là cập nhật.

#### Ra là thế, giờ tôi đã hiểu, vậy còn DELETE ？

Tanaka : MySQL có yếu điểm là DELETE chậm. Lý do là nó sau khi xoá dữ liệu sẽ thực hiện oánh lại secondary index (tất cả index ngoại trừ cluster index) bằng xử lý đồng bộ nên sẽ tốn thời gian cho xử lý đó. Nhưng ở bản 5.5 đã được cải thiện cũng tương đối bởi change buffer bất đồng bộ của secondary index (nó làm dạng mà buffering thay đổi đến secondary index, rồi khi server ở trạng thái idle thì mới merge nội dung thay đổi), cái đó khác hiệu quả. Kết luận là việc DELETE chậm không còn nhưng bạn sẽ chọn đúng phiên bản từ 5.5 trở lên.

## 3. Thuật toán JOIN

#### Kế tiếp chúng ta hãy so sánh JOIN. Tôi thấy có 3 thuật toán hay được dùng là Nested Loop Join, Hash Join và Sort Merge Join.

Tanaka : MySQL cơ bản chỉ support Nested Loop Join. Bởi lẽ MySQL được thiết kế theo quan điểm là không support thuật toán phức tạp.

#### Tại sao MySQL lại có quan điểm như vậy ？

Tanaka : Trước khi được dùng cho các ứng dụng Web thì MySQ vốn dĩ đã được dùng trên các hệ thống dạng Insert, nó cần chạy DB trên memory hay disk mà có dung lương rất nhỏ nên phải bỏ qua các thuật toán phức tạp

#### Đã hiểu, thế còn PostgreSQL ？

 Sawada : PostgreSQL thì khác, nó support cả 3 luôn.
 
#### Với mỗi pattern đó thì nó hướng theo những use case nào ？

Sawada : Khi mà lượng dữ liệu cần JOIN nhiều thì Hash Join và Sort Megre Join hay được dùng. Trường hợp dữ liệu đó đã được sort thì Sort Merge Join sẽ ngon còn không thì tôi khuyên dùng Hash Join. Nested Loop Join sẽ được chọn khi mà lượng dữ liệu của các bảng được JOIN nó đều ít hoặc bảng ít bảng nhiều. Hoặc là trường hợp như bên MySQL là lúc có thể sử dụng index scan ở phía bảng inner. 

## 4. Xử lý transaction

#### Tiếp theo, tôi muốn hỏi về xử lý transaction. Vì tôi từng nghe đến là xử lý transaction của PostgreSQL với MySQL là khác nhau. 

Tanaka : Vâng, MySQL mặc định là REPEATABLE-READ. Với phương thức này thì dữ liệu đối đượng được đọc sẽ hoàn toàn không phải bận tâm là nó sẽ được thay đổi mất ở một transaction khác. Nhưng mà phantom-read ( hiện tượng mà dữ liệu đã được thêm bởi transaction khác lại được thấy khi chạy transaction), để tránh nó thì hiện MySQL đang dùng Next key locking

#### Nó như thế nào ？

Tanaka : Khi mà transaction đang chạy thì nó sẽ gán lock increment key chính để record không tăng lên. Nhưng cũng chính vì cơ chế như vậy mà có thể lại gây vấn đề khác. Ví dụ như là sử dụng `SELECT FOR UPDATE` chẳng hạn, mà trong mệnh đề  `WHERE` sử dụng dấu nhỏ hơn `<` để tìm kiếm records mà dưới 10 thì tất cả các key trên 10 đều bị locking. Khi này thì không thể phát sinh thêm key mới nữa khiến không thể INSERT được dữ liệu, nên các bạn khi dùng cần phải để ý đến nó. Để giảm conflict về locking thì cũng có case đổi sang dùng đến READ-COMMITTED（hình thức lấy dữ liệu mới nhất đã commit）.

#### Vậy PostgreSQL thì mặc định xử lý transaction là gì ？

Sawada : Là READ-COMMITTED. Trường hợp là hình thức này thì có khả năng xảy ra vấn đề phantom-read hay non-repeatable-read ( là hiện tượng mà trong cùng 1 transaction đọc cùng dữ liệu mà giá trị là thay đổi）. Và với PostgreSQL nếu mà đổi sang REPEATABLE-READ thì sẽ không có next key locking nên tránh được phantom-read, do đó tôi nghĩ về việc dễ tránh conflict thì nó ngon hơn là MySQL. 

![](https://cdn-ak.f.st-hatena.com/images/fotolife/b/blog-media/20170901/20170901185230.jpg)

## 5. Store proceduce, trigger

#### Về Store Procedure các bạn nghĩ sao？

Sawada : PostgreSQL có lợi điểm là ngoài SQL thì còn có thể sử dụng cả procedure bên ngoài như là dùng Python ...

Tanaka : MySQL thì chỉ có SQL thôi. Ngoài ra,  nó còn có điểm yếu ở trên mỗi MySQL thì không thể thực thi step của store procedure được.

#### Còn trigger？

Tanaka : Với bản trước MySQL 5.6 thì đã có điểm yếu là đối với 1 bảng chỉ được gán tối đa là 6 trigger. Và riêng với BEFORE INSERT TRIGGER thì con số đó chỉ là 1 mà thôi, khá là hạn chế. Hiện tại thì hạn chế này đã hết, nhưng trigger của MySQL chỉ có FOR EACH ROW, còn FOR EACH STATEMENT không có nên cũng cần đánh giá điểm đó khi cần dùng.

## 6. Dạng logic và vật lý của replication.

#### Tiếp đến là về replication.

Tanaka : Trường hợp của MySQL thì replication dạng logic (copy câu SQL) hay vật lý (copy image dòng sau khi thay đổi) là có thể chọn lựa. Vốn dĩ, dạng logic là setting mặc định nhưng mà từ MySQL 5.7 về sau thì dạng vật lý đã là mặc định. 

Sawada : PostgreSQL thì chỉ có dạng vật lý thôi. Nhưng mà bản release beta version 10 thì có thể dùng cả dạng logic. 

#### Trên MySQL thì dạng vật lý đã thành mặc định nhưng vì lý do gì mà dạng logic bị thất sủng？

Tanaka : Dạng logic có cả tốt lẫn không tốt, ví dụ các bảng của master có ít nhiều sai khác với slave thì khi chạy SQL cũng không có lỗi. Với spec như thế nó có thể vận dụng được khá thoải mái nhưng chính thế mà nó có khả năng không thể tìm ra được sự sai khác giữa master và slave. Vì vậy nên để an toàn thì đã đổi sang dạng vật lý làm mặc định.

## 7. Chức năng tiện lợi mà chỉ có trong 1 bên.

#### Tôi muốn hỏi có chức năng tiện lợi nào mà chỉ có trong 1 bên thôi không ？

Tanaka : Bên PostgreSQL thì có hàm window có thể apply hàm tổng hợp thành set kết quả mà đã được phân chia theo từng phần, hay mệnh đề WITH có thể tạo sub query trước khi thực hiện SELECT. Do đó về mặt phân tích thì PostgreSQL mạnh hơn. Nhưng ở bản MySQL 8.0 sẽ dự định đưa vào mấy chức năng hay ho đó :)

#### Vậy thì tương lai về mặt phân tích sẽ không có khác biệt nhỉ. Thế còn cái gì khác nữa không？

Sawada : Đó là query song song. Cái này nó giúp làm tăng tốc độ xử lý lên bằng cách dùng nhiều CPU để chạy query. Và rất nhiều kỹ sư đã nêu ra lý do họ chọn PostgreSQL là có OSS tool của bên thứ 3 là PostGIS, nó chuyên dùng để handle thông tin như dữ liệu hình học, bản đồ ... Bởi thế mà tôi nghĩ chính sự đa dạng, phong phú của tools là điểm hơn của PostgreSQL so với MySQL.

Tanaka :  PostgreSQL có chức năng mà tôi khá là ghen tị đó là `pg_basebackup`, nó thực sự quá tiện luôn. Do ta hoàn toàn có thể base backup DB online hay trên remote được. Với MySQL thì chỉ có backup vật lý online bằng XtraBackup hay Enterprise Backup nên không thể thực hiện base backup online hay trên remote. được.

![](https://cdn-ak.f.st-hatena.com/images/fotolife/b/blog-media/20170901/20170901185227.jpg)

## 8. Về sự lỏng lẻo của loại dữ liệu, thay đổi loại, so sánh chuỗi

#### Cuối cùng hãy cho tôi hỏi về dự lỏng lẻo của loại dữ liệu ( sự thay đổi loại được thực thi một cách ngầm định, hay sự nghiêm ngặt khi so sánh chuỗi ...)

Tanaka : Từ bản 5.6 của MySQL về trước thì đó thực sự  đã là vấn đề rất lớn. Nhưng từ bản 5.7 đã được sửa nên không còn mấy bug liên quan đến loại dữ liệu. Có vài use case cần chú ý, ví dụ :

```PHP
(int) 1 = (string) '1' = (string) '1Q84'
```

Trường hợp MySQL thì nó nghĩ là cả 3 đều có cùng giá trị.

#### Thật á, tại sao như thế？

Tanaka : Khi mà số 「1」với chuỗi 「1」thì ngầm định là chuỗi đã được đổi sang dạng số nên chúng bằng nhau. Và khi so sánh số 「1」 với chuỗi「1Q84」thì 「1Q84」ngầm định được đổi thành số. Do nó đọc dữ liệu từ phía trước rồi nó sẽ biến đổi những cái mà có thể đổi sang số được.

#### Ra là thế, vậy 「1Q84」có thể đọc là「1」

Tanaka : Đúng thế, do đó nó nhận định rằng cả 3 đều bằng nhau mất tiêu luôn. Ngoài ra thì cũng có case biến đổi ngầm định giống vậy, như dạng ngày tháng 「2017-07-01」mà trừ đi số「1」thì số nguyên sẽ được trả về. Do spec như vầy nên các bạn cần chú ý là nó có thể gây bug.

#### PostgreSQL có biến đổi dữ liệu như thế không ？

Sawada : PostgreSQL khá là nghiêm ngặt với những biến đổi dạng dữ liệu. Như cái mà Tanaka vừa nói về đổi ngày tháng sang số nguyên thì hoàn toàn không có ngầm định xảy ra mà phải do người viết SQL thực hiện rõ ràng cast dữ liệu, việc này hoàn toàn do user định nghĩa chứ bản thân PostgreSQL không tự làm.

#### Thế còn việc so sánh chuỗi ？

Tanaka : MySQL với setting mặc định sẽ không phân biệt hoa thường. Ngoài ra, từ bản 8.0 sẽ không còn phân biệt âm đục và bán âm đục.  Do đó mà 「は」(ha) với「ぱ」(pa) với「ば」(ba) là bằng nhau, cũng như 「びょういん」(byouin) với 「びよういん」(biyouin) sẽ như nhau cả.

#### Tại sao lại có spec như thế ？

Tanaka : Vì nó phụ thuộc vào spec của Unicode. Unicode được chia ra 4 cấp từ 1 đến 4 về setting của sự nghiêm ngặt trong thứ tự đối chiếu. Để mà phân biệt「は」(ha) với 「ぱ」(pa) với 「ば」(ba)  thì cần so sánh ở cấp 2 là「びょういん」(byouin) với 「びよういん」(biyouin), và cần tiếp cấp 3 để phân biệt cấp 2 đó nhưng với setting mặc định của MySQL nó chỉ thực hiện ở cấp 1 nên chúng là như nhau. Do để chính xác thì xử lý sẽ nặng nề vì cần tăng cấp so sánh nên theo quan điểm thiết kế đơn giản cho tốc độ nhanh.

#### Thật là thú vị.

## Vậy kết luận ở đây sẽ là chọn cái nào cho service như thế nào？

#### Tôi muốn tổng quan lại, giữa PostgreSQL và MySQL thì khi nào sẽ chọn cái nào？

Sawada : PostgreSQL có điểm mạnh là lớn nhất là nhiều chức năng nên hệ thống nào cần nhiều chức năng hỗ trợ thì nó có lẽ sẽ phù hợp hơn. Ví dụ như khi chuyển từ Oracle Database sang, hay những doanh nghiệp hệ SIer (System Integration-er). Sau nữa là hệ phân tích cũng dùng nhiều.

#### Phía MySQL thì sao？

Tanaka :  Cơ bản thì tôi nghĩ MySQL phù hợp đối với những dịch vụ web đơn giản, tức hệ thống mà lấy ra lượng dữ liệu nhất định rồi hiển thị ra. Giống như bên Twitter chỉ hiển thị phần đầu của timeline và chỉ khi scroll xuống mới lấy set dữ liệu tiếp theo, những ẻm như thế thì rất hợp với ông MySQL. Nhưng về sau khi nâng version thì có lẽ cả PostgreSQL lẫn MySQL cũng sẽ có nhưng tính năng được nâng cấp tốt hơn. Và lúc đó ai thích cái nào thì dùng do không còn nhiều khác biệt.

#### Một kết luận thật 'hoà bình'. Xin cảm ơn cả hai khách mời rất nhiều !

Nguồn : [employment.en-japan.com](https://employment.en-japan.com/engineerhub/entry/2017/09/05/110000#比較ポイントDDL操作のノンブロッキング)