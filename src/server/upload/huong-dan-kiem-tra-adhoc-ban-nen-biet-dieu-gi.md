**Thử nghiệm adhoc là gì???**

Đôi khi trong công việc, chúng ta vẫn nghe thấy đồng nghiệp, sếp bảo: "Thực hiện Adhoc testing đi". Vậy thì ad-hoc testing là gì, cách nhận biết chúng và thực hiện testing như thế nào - chúng ta cùng tìm hiểu nhé!

**Thử nghiệm Adhoc** là một loại thử nghiệm ngoài kế hoạch, không tuân theo bất kỳ quy trình chính thức nào như tài liệu yêu cầu, kế hoạch thử nghiệm, trường hợp thử nghiệm, v.v.

Đây là một phương pháp kiểm tra hộp đen tập trung vào cả các kịch bản logic và phi logic một cách ngẫu nhiên. Thử nghiệm Adhoc phát hiện ra các lỗi mà chúng ta không thể tìm thấy khi tuân theo quy trình chính thức.

Người thử nghiệm nên hiểu rõ về sản phẩm vì việc thử nghiệm Adhoc hoàn toàn phụ thuộc vào sự ngẫu hứng và trực giác.

Nó thường được thực hiện sau khi thử nghiệm chính thức, điều này giúp tìm ra các lỗ hổng trong ứng dụng.

Đây là một loại kiểm thử phần mềm không có cấu trúc.

**Ví dụ về Thử nghiệm Adhoc**

**Tình huống 1:** Cài đặt trình duyệt khác nhau

Chúng ta có thể tinh chỉnh cài đặt trình duyệt và kiểm tra cách ứng dụng phản hồi hoặc hiển thị.

Giả sử chúng ta có một ứng dụng web đang hoạt động, chúng ta có thể tắt javascript trong một trình duyệt khác và kiểm tra ứng dụng ở đó.

**Tình huống 2:** Khả năng tương thích đa nền tảng

Thông thường, một quy trình kiểm tra chính thức tập trung vào việc kiểm thử một ứng dụng mà nó nhận được phần lớn lưu lượng truy cập.

Trong Adhoc, chúng ta có thể kiểm tra ứng dụng trên các nền tảng và thiết bị khác nhau mà thường không được đề cập trong các trường hợp kiểm tra.

**Tình huống 3:** Xác minh tính hợp lệ

Các thiết kế trường hợp thử nghiệm tập trung vào phân tích giá trị ranh giới và phân vùng tương đương để xác nhận một ứng dụng.

Trong thử nghiệm Adhoc, chúng ta có thể ném một loạt đầu vào hợp lệ / không hợp lệ để kiểm tra cách hệ thống phản ứng với dữ liệu đó và cách nó xử lý lỗi.

Chúng ta có thể cung cấp đầu vào không hợp lệ cho ứng dụng và kiểm tra xem ứng dụng có phản hồi thích hợp hay không.

**Tầm quan trọng của Kiểm tra Ad Hoc:**

Thử nghiệm đặc biệt có thể tìm thấy sơ hở trong chiến lược thử nghiệm.

Nó có thể cải thiện chất lượng của quá trình thử nghiệm với chi phí thấp hơn.

Nó giúp người kiểm tra cải thiện quy trình kiểm tra và phương pháp theo kịch bản.

Nó nhanh chóng tìm ra các lỗi bằng cách sử dụng kiểm tra bên ngoài hộp.

**Các loại thử nghiệm Adhoc:**

![](https://images.viblo.asia/cbc9c478-ea60-4694-9c71-03632853667d.png)

Mặc dù thử nghiệm đặc biệt là một loại thử nghiệm không có cấu trúc, chúng ta phải tuân theo một số điều kiện nhất định để có được kết quả tốt nhất.

**Buddy Testing:**

Trong loại thử nghiệm này, ít nhất hai thành viên trong nhóm thực hiện thử nghiệm, lý tưởng nhất là một nhà phát triển và một người thử nghiệm sẽ thử nghiệm cùng một mô-đun.

Nó thường diễn ra sau khi thử nghiệm đơn vị. Điều này giúp nhà phát triển hiểu được quy trình thử nghiệm từ đó tạo ra mã tốt hơn và nó cũng giúp người thử nghiệm tránh lãng phí thời gian vào việc báo cáo các lỗi không hợp lệ.

**Pair Testing:**

Trong loại thử nghiệm này, hai người thử nghiệm làm việc cùng nhau trong đó một người thực hiện các trường hợp thử nghiệm và các tài liệu khác.

Họ chia sẻ ý tưởng, quan điểm và kiến thức về cùng một sản phẩm để xác định lỗi và khiếm khuyết từ các khía cạnh khác nhau dựa trên kiến thức và trình độ chuyên môn.

**Monkey Testing:**

Trong loại thử nghiệm này, một người thử nghiệm thực hiện thử nghiệm một cách ngẫu nhiên với ý định phá vỡ hệ thống.

Nó hoàn toàn dựa trên sự sáng tạo của người kiểm tra để cung cấp bởi các đầu vào ngẫu nhiên, đầu ra được quan sát.

Mục tiêu ở đây là tìm ra tất cả các lỗi và sự mâu thuẫn với hành vi đã được lên kế hoạch.

**Cách thực hiện Kiểm tra Adhoc Hiệu quả hơn:**

 ***1. Nghiên cứu:*** Có một bản phân tích lỗi của một ứng dụng tương tự có thể làm tăng khả năng tìm thấy những lỗi đó trong ứng dụng đó. Việc chuẩn bị như vậy có thể tiết kiệm rất nhiều thời gian và giúp người kiểm tra tập trung vào những điểm còn yếu hơn là lãng phí thời gian kiểm tra một cách ngẫu nhiên.
 
***2. Lập dàn ý:*** Mặc dù không có kế hoạch kiểm tra chi tiết liên quan, nhưng việc có một dàn ý cơ bản về ‘bắt đầu từ đâu?’ Và ‘chúng ta đang tìm kiếm điều gì?’ Có thể giúp nhóm hiểu được nhóm kiểm tra nên làm gì.

***3. Phiên:*** Nhóm thử nghiệm có thể xác minh một số tính năng nhưng họ không thể thực hiện tất cả cùng một lúc. Do đó, các phiên họp có thể giúp nhóm tập trung và hiểu vấn đề tốt hơn.

***4. Tập trung vào các khu vực chưa được khám phá:*** Các khu vực không được đề cập trong các trường hợp thử nghiệm có thể giúp ích rất nhiều trong việc giảm các tình huống thừa và giúp bao phủ các khu vực chưa được khám phá của ứng dụng.

***5. Các công cụ bổ sung:*** Các công cụ như trình gỡ lỗi, trình lập hồ sơ và ứng dụng giám sát có thể giúp nhóm phát hiện ra nhiều lỗi hơn.

***6. Phát hiện tài liệu:*** Lưu giữ hồ sơ về những phát hiện này có thể giúp cả nhà phát triển và người thử nghiệm hiểu điều gì đang hoạt động tốt và điều gì không.

**Khi nào chúng ta cần thực hiện thử nghiệm Adhoc:**

Thử nghiệm đặc biệt có thể thực sự linh hoạt, nó có thể được thực hiện ở bất kỳ giai đoạn nào của SDLC, nó áp dụng từ thử nghiệm đơn vị đến thử nghiệm hệ thống và nó có thể được thực hiện bởi người thử nghiệm, nhà phát triển hoặc bất kỳ thành viên nào khác, tức là bất kỳ ai có kiến thức tốt về sản phẩm đều có thể thực hiện thử nghiệm Adhoc.

***1. Nó chỉ được thực hiện khi sản phẩm ổn định.***

***2. Nó thường được thực hiện sau khi hoàn thành thử nghiệm chính thức.***

***3. Nó được thực hiện khi thời gian kiểm tra không có nhiều thời gian để thực hiện kiểm tra toàn diện.***

***4. Nó được thực hiện khi nhóm không có bất kỳ nhiệm vụ nào trong tay, tức là trong thời gian rảnh hoặc thời gian hệ thống ngừng hoạt động.***

***5. Đôi khi người thử nghiệm ghi lại các tình huống trong quá trình thử nghiệm chính thức có thể có vấn đề và xác minh chúng khi họ có thời gian, đây cũng sẽ là một phần của thử nghiệm Adhoc.***

**Các phương pháp hay nhất về thử nghiệm Adhoc:**

1. Người kiểm tra có chuyên môn tốt và kiến thức chuyên sâu về sản phẩm có thể tạo ra sự khác biệt rất lớn trong cách thực thi các trường hợp thử nghiệm Adhoc.

2. Tập trung vào các khu vực không được đề cập trong các trường hợp thử nghiệm có thể giúp khám phá các vấn đề cơ bản mà chưa bao giờ được tìm thấy.

3. Người kiểm tra nên tập trung vào các tính năng quan trọng nhất được người dùng cuối sử dụng.
 
4. Cần đưa ra các mốc thời gian thích hợp để sử dụng thời gian một cách hiệu quả.
 
5. Phân loại và ưu tiên các khu vực khác nhau của ứng dụng trước khi thử nghiệm có thể làm cho quá trình hiệu quả hơn.
 
6. Mặc dù đây là một loại thử nghiệm không chính thức, tài liệu về các quan sát sẽ giúp người thử nghiệm tái tạo các tình huống đó và tìm ra cốt lõi của vấn đề.
 
7. Hiệu quả của thử nghiệm có thể được tăng lên bằng cách sử dụng đúng bộ công cụ

**Các kỹ năng cần thiết để thực hiện kiểm tra Adhoc:**

1. Người kiểm tra nên có kiến thức sâu về sản phẩm.
 
2. Người kiểm tra phải có kinh nghiệm thời gian thực trong ứng dụng
 
3. Nhóm nên tập trung vào việc ưu tiên các tính năng quan trọng.

4. Lập kế hoạch sơ bộ để đưa ra định hướng cho quá trình thử nghiệm.

5. Khả năng lập tài liệu để quan sát và ghi lại các khiếm khuyết.

6. Người kiểm tra nên nghĩ ra các tình huống kiểm thử.

**Ưu điểm của Thử nghiệm Adhoc:**

1. Thử nghiệm Adhoc có thể được thực hiện ở bất kỳ giai đoạn nào của SDLC, bất kỳ lúc nào, bất kỳ nơi nào, thử nghiệm có thể được thực hiện để phát hiện ra các vấn đề.

2. Ngay cả nhà phát triển cũng có thể làm việc trên thử nghiệm Ad hoc, nó không chỉ giới hạn ở nhóm thử nghiệm.

3. Vì nó không tuân theo quy trình có cấu trúc nên người kiểm tra có thể trực tiếp bắt đầu tìm lỗi thay vì tập trung vào tài liệu và các quy trình khác.

4. Nó giúp tìm ra các khu vực chưa được khám phá trong các trường hợp thử nghiệm, điều này cải thiện khả năng miễn dịch của sản phẩm.

5. Nó tiết kiệm rất nhiều thời gian vì nó không yêu cầu lập kế hoạch kiểm tra chi tiết, tài liệu, thiết kế trường hợp thử nghiệm

**Nhược điểm của Thử nghiệm Adhoc:**

1. Nếu không có bất kỳ trường hợp thử nghiệm và tài liệu nào, có thể khó tái tạo sự cố.

2. Người thử nghiệm phải có kiến thức chuyên sâu và hiểu biết tốt về sản phẩm, người thử nghiệm mới không thể làm được điều đó.

3. Không có gì đảm bảo rằng một lỗi sẽ được tìm thấy.

4. Người kiểm tra có thể không thu thập được các kịch bản chính xác trong tương lai vì chúng không được ghi lại.

5. Người kiểm tra có thể không biết về việc lặp lại các tình huống giống nhau.

6. Việc này có thể tốn nhiều thời gian vì lượng thời gian, công sức và nguồn lực cho thử nghiệm Adhoc có thể không xác định được.

7. Không thể theo dõi các yêu cầu bằng ma trận xác định nguồn gốc hoặc bất kỳ tài liệu nào như vậy, vì vậy không có cách nào để biết chính xác mức độ phù hợp.

**Phần kết luận:**

Thử nghiệm Adhoc có thể giúp cải thiện bộ thử nghiệm bằng cách mở rộng phạm vi thử nghiệm và các khu vực có vấn đề lặp lại được chuyển đổi thành các trường hợp thử nghiệm. Nó cho phép người thử nghiệm tự do hơn để kiểm tra sản phẩm mà không cần lo lắng về tài liệu và thiết kế trường hợp thử nghiệm. Đây sẽ là một hoạt động thú vị cho nhóm thử nghiệm vì thử nghiệm Adhoc phụ thuộc vào sự sáng tạo và hiểu biết của người thử nghiệm sản phẩm.

Bài viết được dịch thuật từ: https://www.softwaretestingmaterial.com/adhoc-testing/