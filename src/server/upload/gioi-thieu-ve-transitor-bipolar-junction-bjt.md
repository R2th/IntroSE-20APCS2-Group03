Giới thiệu về Transitor Bipolar Junction (BJT)

Việc phát minh ra bóng bán dẫn lưỡng cực vào năm 1948 đã mở ra một cuộc cách mạng trong ngành điện tử. Những kỳ công kỹ thuật trước đây đòi hỏi những ống chân không có sức hút tương đối lớn, cơ học, có sức mạnh đột nhiên có thể đạt được với những hạt nhỏ xíu, có độ cứng cơ học, tiết kiệm năng lượng của silicon tinh thể. Cuộc cách mạng này đã làm cho thiết kế và sản xuất các thiết bị điện tử rẻ tiền, rẻ tiền mà chúng tôi hiện nay đã cho phép. Hiểu được cách các chức năng của bóng bán dẫn có tầm quan trọng tối thượng đối với bất kỳ ai quan tâm đến việc hiểu các thiết bị điện tử hiện đại.[đặt hàng linh kiện](https://www.dathanglinhkien.com/)

Mục đích của tôi ở đây là tập trung hoàn toàn nhất có thể vào chức năng thực tế và ứng dụng các bóng bán dẫn lưỡng cực, thay vì khám phá thế giới lượng tử của lý thuyết bán dẫn. Thảo luận về lỗ và electron tốt hơn để lại cho một chương khác theo ý kiến ​​của tôi. Ở đây tôi muốn khám phá cách sử dụngcác thành phần này, không phân tích chi tiết nội bộ thân mật của chúng. Tôi không có ý định hạ thấp tầm quan trọng của sự hiểu biết vật lý bán dẫn, nhưng đôi khi một sự tập trung dữ dội vào vật lý trạng thái rắn làm giảm sự hiểu biết về các chức năng của các thiết bị này ở cấp độ thành phần. Tuy nhiên, trong cách tiếp cận này, tôi giả định rằng người đọc sở hữu một kiến ​​thức tối thiểu về chất bán dẫn: sự khác biệt giữa chất bán dẫn pha tạp “P” và “N”, các đặc tính chức năng của tiếp điểm PN (diode) và ý nghĩa của các thuật ngữ "Ngược lại thiên vị" và "chuyển tiếp thành kiến". Nếu những khái niệm này không rõ ràng cho bạn, tốt nhất là hãy tham khảo các chương trước trong cuốn sách này trước khi tiếp tục với cuốn sách này.

Một bóng bán dẫn lưỡng cực bao gồm một ba lớp "bánh sandwich" của vật liệu bán dẫn pha tạp (bên ngoài), hoặc PNP trong hình dưới đây (b) hoặc NPN tại (d). Mỗi lớp tạo thành các bóng bán dẫn có một tên cụ thể, và mỗi lớp được cung cấp với một dây tiếp xúc để kết nối với một mạch. Các biểu đồ sơ đồ được thể hiện trong hình bên dưới (a) và (d).



[Bóng bán dẫn BJT](https://www.dathanglinhkien.com/search/label/ic-ban-dan.html): (a) Biểu tượng sơ đồ PNP, (b) bố trí vật lý (c) Biểu tượng NPN, (d) bố cục.


Sự khác biệt chức năng giữa transistor PNP và transistor NPN là xu hướng thích hợp (phân cực) của các nút giao tiếp khi vận hành. Đối với bất kỳ trạng thái hoạt động nào, các hướng hiện tại và các cực phân cực điện áp cho mỗi loại bóng bán dẫn chính xác là ngược lại với nhau.

Các bóng bán dẫn lưỡng cực hoạt động như các bộ điều chỉnh dòng điện được điều khiển hiện tại . Nói cách khác, các bóng bán dẫn giới hạn lượng dòng điện truyền qua theo một dòng điều khiển nhỏ hơn. Dòng điện chính được điều khiển đi từ bộ thu đến bộ phát, hoặc từ bộ phát đến bộ thu, tùy thuộc vào loại bóng bán dẫn mà nó là (PNP hoặc NPN, tương ứng). Dòng điện nhỏ điều khiển dòng điện chính đi từ đế tới bộ phát, hoặc từ bộ phát đến cơ sở, một lần nữa tùy thuộc vào loại bóng bán dẫn mà nó là (PNP hoặc NPN, tương ứng). Theo các tiêu chuẩn của mã vạch bán dẫn, mũi tên luôn chỉ chống lại sự chỉ đạo của dòng electron. (Hình bên dưới )



Nhỏ cơ sở Emitter hiện kiểm soát lớn Collector-Emitter hiện tại chảy chống mũi tên emitter.


Các bóng bán dẫn lưỡng cực được gọi là bi cực bởi vì dòng chính của electron thông qua chúng diễn ra trong hai loại vật liệu bán dẫn: P và N, là dòng chính đi từ bộ phát tới bộ thu (hoặc ngược lại). Nói cách khác, hai loại sóng mang điện - electron và lỗ — bao gồm dòng chính này thông qua transistor.


Như bạn có thể thấy, việc kiểm soát hiện tại và kiểm soát hiện tại luôn lưới với nhau thông qua các dây emitter, và electron của họ luôn luôn chảy chống lại sự chỉ đạo của mũi tên của transistor. Đây là quy tắc đầu tiên và quan trọng nhất trong việc sử dụng các bóng bán dẫn: tất cả các dòng phải đi theo hướng thích hợp để thiết bị hoạt động như một bộ điều chỉnh hiện tại. Dòng điều khiển nhỏ, thường được gọi đơn giản là dòng cơ bản bởi vì nó là dòng điện duy nhất đi qua dây cơ bản của bóng bán dẫn. Ngược lại, dòng điều khiển lớn được gọi là dòng thubởi vì nó là dòng điện duy nhất đi qua dây thu. Dòng điện phát là tổng của các dòng cơ sở và bộ thu, phù hợp với Luật hiện hành của Kirchhoff .

Không có dòng điện qua cơ sở của bóng bán dẫn, tắt nó như một công tắc mở và ngăn dòng điện qua bộ thu. Một dòng cơ bản, biến bóng bán dẫn trên như một công tắc đóng và cho phép một lượng dòng điện tỉ lệ thông qua bộ thu. Dòng thu hiện chủ yếu bị giới hạn bởi dòng cơ bản, bất kể lượng điện áp có sẵn để đẩy nó. Phần tiếp theo sẽ tìm hiểu chi tiết hơn về việc sử dụng các bóng bán dẫn lưỡng cực như các phần tử chuyển mạch.

ÔN TẬP:
Các bóng bán dẫn lưỡng cực được đặt tên như vậy bởi vì dòng điều khiển phải trải qua hai loại vật liệu bán dẫn: P và N. Dòng điện bao gồm cả dòng electron và lỗ, trong các phần khác nhau của transistor.
Các bóng bán dẫn lưỡng cực bao gồm cấu trúc "bánh sandwich" bán dẫn hoặc PNP hoặc bán dẫn NPN.
Ba đạo trình của một bóng bán dẫn lưỡng cực được gọi là Emitter , Base và Collector .
Các bóng bán dẫn hoạt động như các bộ điều chỉnh dòng điện bằng cách cho phép một dòng điện nhỏ để điều khiển dòng điện lớn hơn. Lượng hiện tại cho phép giữa bộ thu và bộ phát chủ yếu được xác định bởi lượng di chuyển hiện tại giữa đế và bộ phát.
Để cho một bóng bán dẫn hoạt động đúng như một bộ điều chỉnh hiện tại, dòng điều khiển (cơ sở) và dòng điều khiển (bộ thu) phải đi theo hướng thích hợp: chia lưới liên kết tại bộ phát và đi ngược lại biểu tượng mũi tên phát.