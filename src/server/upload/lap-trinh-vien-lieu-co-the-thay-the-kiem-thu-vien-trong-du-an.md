Bạn có thể dạy con cún nhà bạn rất nhiều trò như ra lệnh cho nó nằm, lăn, đi nhặt bóng ... nhưng bạn không thể dạy cho nó bay như các loài chim trên trời hay các loài côn trùng có cánh.
![](https://images.viblo.asia/9e1a9ced-ab1a-49f0-a45b-a2b6cf1291bd.png)

Tôi đã cố gắng giải thích cho một cặp đôi trong Agile Team rằng tại sao mà một lập trình viên thường không thể trở thành một kiểm thử viên giỏi ở trong cùng một dự án. Sau khi tôi lục lọi lại trí nhớ của mình (dựa vào những kinh nghiệm tôi có), tôi đã đưa ra một danh sách ngắn liệt kê các lí do và trình bày nó dưới đây.

Theo ý kiến chủ quan, tôi nghĩ lập trình viên có thể đảm nhận được một phần  trong các đầu mục công việc kiểm thử, nhất là trong Agile Team. Tuy nhiên, nhất định sẽ có những hạn chế hay nói cách khác là sẽ có những “điểm mù”, những khả năng mà họ không lường được để kiểm tra và tất nhiên nó sẽ gây ảnh hưởng đến những đầu mục công việc về kiểm thử mà họ đang đảm nhận.

Vậy hãy cùng tìm hiểu các lí do mà tại sao một lập trình viên thường khó có thể đảm nhận được các đầu việc về kiểm thử trong một dự án nhé.

**1. “Tâm lý cha mẹ” đối với code của họ.**

Lập trình viên luôn có một mối liên hệ cảm tính với những dòng code họ viết ra, nghe thì có vẻ ngớ ngẩn nhưng thực sự là vậy, sẽ khó có thể đưa ra được những nhận xét khách quan về những dòng code mà chính tự tay mình viết. 

Ví dụ: Tôi biết rằng những đứa con của tôi không bao giờ hoàn hảo cả và tôi chắc chắn về điều đó. Nhưng nếu một ai đó đến và đưa ra các chỉ trích về chúng với tôi thì chắc chắn sẽ làm tôi khó chịu và không vui, sau đó nhất định tôi sẽ đưa ra các lời bào chữa cho chúng và sau tất cả thì chúng lại trở thành hoàn hảo.

**2. Luôn tập trung vào các “điểm tích cực”**

Các lập trình viên khi làm việc luôn dựa trên các trường hợp hoàn hảo và áp dụng chúng cho sản phẩm. Phần lớn nguồn lực của họ sẽ bỏ vào việc làm sao cho sản phẩm chạy đúng và hiệu quả ... Nhưng khi đảm nhận vai trò kiểm thử viên, họ lại phải thay đổi tư duy của mình từ như trên thành tập trung vào các trường hợp đặc biệt, các trường hợp luồng chạy sai thì sản phẩm sẽ ra sao hay thậm chí trong ngành kiểm thử còn có một khái niệm là “test phá”. Vì vậy nếu trong cùng một dự án và trong một thời gian ngắn thì rất khó để một lập trình viên có thể thay đổi tư duy trái chiều như vậy.

**3. Làm việc dựa vào các nguyên tắc đơn giản hóa các trường hợp phức tạp.**

Một trong các điều cốt lõi ở tư duy của các kiểm thử viên đó là họ luôn luôn tìm kiếm các trường hợp kiểm thử phức tạp trong công việc của họ (ví dụ như thực hiện nhiều thao tác cùng lúc hoặc các thao tác lặp đi lặp lại liên tục trên sản phẩm...) để có thể làm sản phẩm mất kiểm soát và dẫn đến các lỗi có thể xảy ra trong quá trình sử dụng.

Vậy ở phía bên các lập trình viên thì sao, họ luôn cố gắng đơn giản hóa các yêu cầu của khách hàng, tìm ra những con đường đi ngắn nhất, đơn giản nhất và mất ít công sức nhất, luôn cố gắng chia nhỏ các đầu việc ra sau đó mới thực hiện chúng.


**4. Không có khả năng “bắt” được những chi tiết nhỏ trong một “bức tranh lớn”**


Về phần này thì thực sự khó có thể giải thích được một cách chi tiết cặn kẽ cụ thể nhưng đại loại như sau. Một yếu tố để trở thành một kiểm thử viên giỏi là phải nhận ra được điểm nào đó không phù hợp trong “bức tranh” tổng thể hay nói vui theo quan điểm hiện đại bây giờ đó là có cái gì đó sai sai. Đây tất nhiên là thuộc về cảm nhận của từng người, chỗ này người này thấy như thế hợp lý rồi, chỗ kia người kia lại thấy chưa hợp lý ... Nhưng theo ý kiến cá nhân của tôi thì trong những năm làm kiểm thử viên của mình thì những người lập trình viên thường không có được cảm nhận này.
![](https://images.viblo.asia/228be304-7a63-4045-bf03-2019784ec9e1.png)

**5. Thiếu cái nhìn bao quát, tổng quan như người dùng cuối sử dụng sản phẩm.**

Do tính chất các đầu việc của lập trình viên làm nên họ thường chỉ tập trung vào các đối tượng đơn lẻ hay những chức năng riêng biệt của sản phẩm họ đang lập trình. Chính vì vậy, họ không thể nắm bắt được cách mà các khách hàng cuối sử dụng hệ thống như thế nào.

Là một kiểm thử viên thì cần phải có một cái nhìn bao quát hơn về sản phẩm, phải thật hiểu rõ các yêu cầu về sản phẩm và kiểm thử chúng theo quan điểm của người dùng cuối.

**6. Ít kinh nghiệm về việc bắt bug.**

Điều này thì chắc chắn rồi ! Một lập trình viên không thể có nhiều kinh nghiệm hơn một kiểm thử viên về khoản bắt bug được vì đơn giản số lượng bug mà họ gặp sẽ ít hơn rất nhiều lần số lượng bug của một kiểm thử viên. 

Chính vì vậy mà khi bắt đầu tiến hành một đầu việc về kiểm thử ở trong cùng một dự án thì dựa vào kinh nghiệm của mình, các kiểm thử viên sẽ tiếp cận các bug thông thường nhanh hơn và dễ dàng để tìm ra chúng hơn là các lập trình viên.

Tóm lại, sau tất cả các lý do trên thì nó không có nghĩa là các lập trình viên không muốn làm các đầu việc về kiểm thử hay không thể giúp các kiểm thử viên về công việc của mình trong cùng một dự án. Tuy nhiên điều đó có thể không hiệu quả hoặc có thể gây ảnh hưởng đến các đầu việc khác. Nhưng bên cạnh đó thì lại có một số đầu việc của kiểm thử viên không thể thiếu được sự giúp đỡ của các lập trình viên. Điều tôi muốn nói sau cùng là chúng ta cần phải có sự kết hợp một cách nhịp nhàng, luôn hỗ trợ cho nhau để đem lại thành công cho dự án.

Link tham khảo:
https://qablog.practitest.com/why-cant-developers-be-good-testers/