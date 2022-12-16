Hôm nay cả công ty đi nghỉ mát còn tôi ở lại trực và làm việc. Công việc thì đã hòm hòm nên khá rảnh, mà rảnh rỗi sinh nông nổi nên viết một vài chữ để tâm sự công việc
Khoảng 1 năm trước tôi nhận được một bài toán Nhận diện người dùng spam. Khi mới nhận trong đầu mỉm cười nghĩ "cái này thì đơn giản thôi". Nhưng khi tôi lao vào làm rồi thì tôi mới thấy mình nhầm thực sự nhầm.

### **#Những cái khó**
***Khó 1: Định nghĩa về spam***

Cái định nghĩa được thường dùng nhất là:
> Spam là những hành vi gửi những tin nhắn không có ý nghĩa và gây phiền toái cho người nhận

Đó, vậy những tin như nào thì là không có ý nghĩa và như nào thì gây phiền toái cho người nhận. Người nhận không phải là một người mà là rất nhiều người. Ví dụ, có người A nhắn tin đòi chat sex với người B và người C. Người B thấy đó là sự phiền toái và xúc phạm nhưng người C thì lại đồng ý và thích thú. Vậy đây có phải spam hay không ?!

***Khó 2: Dữ liệu***

Khi xây dựng một mô hình Machine Learning thì việc tốn thời gian nhất và quan trọng nhất đó là xử lý dữ liệu. Xử lý dữ liệu ở đây là gì ? Xử lý là phân tích dữ liệu để đưa ra các thuộc tính, sau đó gán nhãn dữ liệu. Để các  bạn dễ hình dung thì tôi có một tập dữ liệu gồm 10 triệu bản ghi hay 10 triệu dòng về hành vi của người dùng, việc của tôi là phân tích dữ liệu để tìm ra những hành vi để phân biệt người dùng spam và người dùng không spam mà không có chút gợi ý nào cả. Đấy công việc của một Data Analyst đấy

![](https://www.altushost.com/wp-content/uploads/2015/09/tumblr_inline_mgmzaaT1od1rxis0k.gif)

Tìm ra các thuộc tính rồi thì là việc "tay to" gán nhãn. Gán nhãn giống như công việc bạn dạy đứa trẻ (đứa trẻ ở đây là máy tính) làm sao để nó biết quả cam khác quả táo như thế nào. Nói vậy để biết được việc gán nhãn quan trọng và quyết định tới sự thành công của mô hình như nào. Nếu ta cứ bảo với một đứa trẻ quả táo là quả cam và ngược lại thì lúc nó lớn lên khi cầm quả táo nó sẽ bảo đó là quả cam. Mà uốn cây từ thuở còn non, lớn rồi thì không dậy được nữa, dạy lại thì rất khó cách dạy lại dễ nhất là "reset" :-<

Mà gán nhãn muốn chính xác nhất là phải tay to tức là tự làm bằng tay đấy ạ. Trong khi đó để giải quyết bài toán spam chỉ có mình tôi làm từ A->Z từ phân tích dữ liệu đến thiết kế và phát triển hệ thống. Mà một mình việc gán nhãn 10.000.000 bản ghi là điều không thể nên t chỉ làm được khoảng 3000 nhãn.

![](https://chumley.barstoolsports.com/union/giphy/2020/07/01/994ce8dd.gif)

***Khó 3: Chính sách bảo vệ sự riêng tư của người dùng***

Để bảo vệ người dùng tất cả dữ liệu về người dùng như số điện thoại, tên tài khoản đều dược mã hóa và thay vào đó để định danh người dùng tôi chỉ được tiếp cận với id của người dùng đó mà id đó không phải là một số nguyên tự tăng mà đó là một chuỗi string sau mã hóa mà tôi cũng không biết nó được mã hóa hay được sinh như nào. Điều này thì hoàn toàn dễ hiểu và cũng không làm cản trở đến việc xây dựng hệ thống của tôi.

Nhưng người ta thường nhận diện spam dựa trên nội dung ví dụ như email hay sms. Còn đây tôi không được làm thế. Nội dung tin nhắn tôi không được xem mà cũng không có mà xem. Câu hỏi đặt ra là như vậy thì có nhận diện được người dùng spam không ? Câu trả lời là Có, nhưng tỉ lệ sẽ không được chính xác như việc kết hợp cả hành vi và nội dung người dùng.

Giả sử, nếu nhận diện spam dựa trên nội dung thì sao ? Thì cũng rất khó khăn. Nếu như nhận diện spam email hay trên một hệ thống có văn phong chuẩn như spiderum thì việc xử lý NLP lại dễ dàng. Còn với các hệ thống SMS như Mocha, Zalo thì là một ác mộng vì người dùng hay dùng chữ viết tắt, teen code, hay một kiểu ngôn ngữ nào đó mà chỉ có...người mới hiểu còn để biểu đạt cho máy hiểu thì bạn lại phải phân tích, gán nhãn, xây dựng mô hình. Hay nói cách khác là bạn làm lại NLP Core cho từng code hay ngôn ngữ đó.

***Khó 4: Xử lý dữ liệu lớn trong thời gian gần thực***

Hồi tôi mới làm tôi chưa có kinh nghiệm xử lý dữ liệu lớn bằng việc xử dụng Hadoop, Spark,... tôi chỉ dùng python thuần và các thư việc phụ trợ như pandas, sklearn. Lúc đầu để tôi detect hành vi spam bắt đầu từ việc tách thuộc tính đến việc detect mất  2h cho khoảng 200.000 user/10.000.000 bản ghi/ngày. Sau đó, tôi sử dụng queue và chiến lược chia để trị + xử lý song song và phân tán (tất cả đều tự code mà không dùng bất kỳ 1 framework xử lý dữ liệu lớn nào) thì chỉ mất khoảng 20 phút để xử lý xong.

Một cái củ chuối nữa là phải nhận diện ra user có hành vi spam trong thời gian ngắn nhất hay có thể hiểu là nhận diện user spam dựa trên hành vi trong thời gian thưc ?!
Đúng rồi đó ?! Các bạn không nghe nhầm đâu. Hành vi là thứ phải được tích luy trong 1 khoảng thời gian nhất định nhưng phải nhận diện trong thời gian thực ? =(((((((

![](https://media1.tenor.com/images/0d2ab2a829a39772546a1439468ad70b/tenor.gif?itemid=5138379)

Trong cái khó nó ló ra cái khôn. Tôi xử lý bằng cách liên tục cho quét các hành vi của người dùng trong thời gian delta t rất nhỏ ví dụ 1 phút/lần. Như vậy ở thời gian t0 user đó chưa spam nhưng thời gian t1 user đó đã có đủ hành vi spam và được nhận diện. Bởi vì, thời gian quét hay delta t là rất nhỏ nên có thể coi là real time <3. Như vậy là đáp ứng được yêu cầu phát hiện được hành vi spam của user trong thời gian sớm nhất có thể rồi :3

***Khó 5: Tìm ra thuộc tính của các user spam***

Quay lại với cái khó khi phân tích dữ liệu người dùng. Để tìm được các thuộc tính phân biệt được người dùng spam và người dùng bình thường quả như đãi cát tìm vàng. 
Việc đầu tiên là đặt ra các câu hỏi User spam thì thường làm những cái gì ? Mong muốn của spam là gì ? Từ đó tìm ra các thuộc tính.

Nhưng mà cuộc sống nó lại không như cuộc đời mới cay. Những thằng spam nó lại có hành vi giống với những thằng bình thường. Ví dụ thời gian gửi tin nhắn giữa các lần gửi tin của những ông spam lại giống với những ông nhắn tin bình thường,...

Vậy làm sao để tìm ra các thuộc tính ? Câu trả lời là tiếp tục suy nghĩ, query dữ liệu, visualize thành các biểu đồ, số liệu để so sánh giữa người dùng spam và người dùng bình thường =)))
Giải thích ý nghĩa và nguồn gốc!

[](https://images.viblo.asia/db0e81b2-7386-4f13-b7c2-dd774aa69f16.jpg)

***Khó 6: Đánh giá***

Thông thường khi để đánh giá một mô hình phân lớp người ta thường dùng Accurancy hoặc True/False Positive/Negative. Nhưng đấy là khi ta đã có một bộ dữ liệu đã gán nhãn sẵn dùng cho khi nghiên cứu. Nhưng khi áp vào thực tế thì dữ liệu ta có hoàn toàn là dữ liệu không được gán nhãn. Do vậy, làm sao để đánh giá được mô hình khi ta phải gán nhãn cho khoảng 10.000.000 bản ghi trên ngày đây =(((((( Chỉ có cách là thuê cả 1 đội về gán nhãn mới biết chính xác được

Nhưng nhà nghèo không chơi như thế được thì ta chỉ có các thống kê, đánh giá dựa trên kết quả mô hình trả về. Ví dụ, mô hình chúng ta nhận diện được 100 user spam/ngày trong đó 90 user đúng là spam thì ta có thể tạm coi là nó đúng 90%. Cộng thêm tỉ lệ người dùng spam mà ta thống kê được trước đó để so sánh xem có đúng thực tế không. Nếu tỉ lệ thống kê trước đây so với tỉ lệ mô hình đoán ra chênh nhau không quá 10% thì tỉ lệ rất cao là mô hình của bạn đã đúng

![](https://images.viblo.asia/db0e81b2-7386-4f13-b7c2-dd774aa69f16.jpg)

### Cái kết

Sau khoảng 2 tháng cuối cùng tôi đã build được mô hình và tỉ lệ đạt được cũng khá ổn trong mức 96% - con số này chỉ đánh giá dựa trên các thông báo nhận diện spam mà mô hình trả về. Thôi thì cũng tạm hài lòng. Nhưng vẫn còn rất nhiều việc để làm và để tối ưu vì người dùng luôn luôn tìm tòi và vượt qua được mô hình AI mà.


1s quảng cáo
[](https://ducthang1996.wordpress.com/2020/11/10/phan-loai-nguoi-dung-spam-rat-la-de/)