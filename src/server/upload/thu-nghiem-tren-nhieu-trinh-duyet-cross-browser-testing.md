## Trình duyệt là gì?

Đầu tiên theo thuật ngữ kỹ thuật, browser (trình duyệt hay là trình duyệt web)  là phần mềm được sử dụng để trích xuất thông tin từ World Wide Web.

Trình duyệt web đưa bạn đến bất cứ đâu trên internet. Nó lấy thông tin từ các phần khác của web và hiển thị trên máy tính để bàn hoặc thiết bị di động của bạn. Thông tin được truyền bằng Giao thức truyền siêu văn bản, xác định cách thức truyền văn bản, hình ảnh và video trên web. Thông tin này cần được chia sẻ và hiển thị ở định dạng nhất quán để mọi người sử dụng bất kỳ trình duyệt nào, ở bất kỳ đâu trên thế giới đều có thể xem thông tin.

Không phải tất cả các nhà sản xuất trình duyệt đều chọn giải thích định dạng theo cùng một cách. Đối với người dùng, điều này có nghĩa là một trang web có thể trông và hoạt động khác nhau trên các trình duyệt khác nhau. (Tạo tính nhất quán giữa các trình duyệt để mọi người dùng có thể tận hưởng Internet, bất kể trình duyệt họ chọn, được gọi là tiêu chuẩn web.)

Khi trình duyệt web tìm nạp dữ liệu từ một máy chủ được kết nối internet, nó sử dụng một phần mềm được gọi là công cụ kết xuất để dịch dữ liệu đó thành văn bản và hình ảnh. Dữ liệu này được viết bằng ngôn ngữ đánh dấu siêu văn bản (HTML) và các trình duyệt web đọc mã này để tạo ra những gì chúng ta nhìn thấy, nghe thấy và trải nghiệm trên internet.

## Thử nghiệm trên nhiều trình duyệt là gì?

Cross Browser Testing là một loại kiểm tra để xác minh xem ứng dụng web của chúng ta có hoạt động trên các trình duyệt khác nhau như mong đợi hay không? Đây là quá trình xác minh khả năng tương thích của ứng dụng web với các trình duyệt khác nhau.

Mỗi trình duyệt diễn giải thông tin trên trang web theo cách khác nhau. Do đó, một số trình duyệt có thể thiếu các tính năng mà trang web của chúng ta đang cố gắng hiển thị và làm cho trang web của mình bị hỏng hay không hiển thị đầy đủ các thành phần trên trình duyệt đó.

Người dùng không nên bị hạn chế thao tác vì sử dụng bất kỳ trình duyệt cụ thể nào để truy cập ứng dụng của chúng ta. Do đó, cần phải kiểm tra khả năng tương thích của trang web với các trình duyệt khác nhau. Một số trình duyệt thường được sử dụng bao gồm Chrome, Safari, Firefox, ...

## Vì sao thử nghiệm trên nhiều trình duyệt lại quan trọng

Hãy tưởng tượng rằng bạn được gửi một trang web, bạn mở Internet Explore, dán URL, nhấn Enter và chờ tải. Khi đó, các nút và văn bản nằm trên khắp trang. Bạn kiểm tra kết nối của mình và tải lại,và không có gì thay đổi, màn hình vẫn hỗn loạn như cũ.

Sau cùng, bạn có thể sẽ rời đi, không vào lại trang web này nữa hoặc thử nó với một trình duyệt khác, ví dụ như Chrome chẳng hạn.

Các nhà cung cấp trình duyệt tuân theo Tiêu chuẩn Web Mở, nhưng họ có cách giải thích riêng về nó. Vì mỗi thứ đều hiển thị HTML, CSS và JavaScript theo những cách riêng, không chắc chắn để đảm bảo rằng trang web của bạn sẽ trông và hoạt động như dự kiến trên các trình duyệt khác nhau (hoặc các phiên bản khác nhau của một trình duyệt).

Vì vậy, các nhà phát triển web rơi vào sự khác biệt trừu tượng của trình duyệt. Kiểm tra trang web trên tất cả các trình duyệt giúp thực hiện điều đó bằng cách xác định chính xác các lỗi tương thích trên trình duyệt cụ thể để có thể làm cho chúng hoạt động như mong muốn. Nó giúp đảm bảo rằng bạn không loại trừ một bộ phận người dùng đáng kể nào đó – đơn giản vì trang web của bạn không hoạt động trên trình duyệt của họ.

## Vì sao phải thực hiện thử nghiệm trên nhiều trình duyệt

* Để biết những gì đang lỗi, phát hiện nó và có thể sửa chữa nó
* Để nâng cao hiệu quả và trải nghiệm người dùng
* Nếu một trình duyệt hoàn toàn không được hỗ trợ người dùng nên được thông báo về bất kỳ vấn đề gì có thể xảy ra
* Giao diện, cách hiển thị của màn hình trong các trình duyệt khác nhau - nó có giống nhau hay khác nhau? cách hiển thị này có tốt hơn cách hiển thị kia không, ...
Tương tự với từng chức năng và cách thức hoạt động của nó

## Những tính năng nào cần được lưu ý khi thực hiện thử nghiệm trên nhiều trình duyệt

Kiểm tra khả năng tương thích bao gồm mọi thứ, nhưng không phải lúc nào chúng ta cũng có thời gian cho việc đó.

Chúng ta cần có một tài liệu đặc tả thử nghiệm (thông số kỹ thuật thử nghiệm) trong đó nêu ra những yếu tố cần thiết:
* Danh sách các tính năng cần thử nghiệm
* Trình duyệt / phiên bản / nền tảng nào cần thử nghiệm để đáp ứng tiêu chuẩn tương thích
* Các tình huống thử nghiệm
* Tiến trình và ngân sách, ...

Chúng ta có thể phân loại các tính năng sẽ thử nghiệm như sau:
* Chức năng cơ bản: Để đảm bảo rằng chức năng cơ bản hoạt động trên hầu hết các trình duyệt -hệ điều hành. Ví dụ: chúng ta có thể thử nghiệm để xác minh rằng:
     - Tất cả các thành phần trên màn hình hiển thị đầy đủ 
     - Tất cả các link, nút và menu đang hoạt động như dự kiến
     - Việc nhập dữ liệu bằng bàn phím trên điện thoại di động hoặc máy tính bảng hoạt động tốt
* Thiết kế: Đảm bảo rằng giao diện của trang web, phông chữ, hình ảnh và bố cục phù hợp với các thông số kỹ thuật do nhóm Thiết kế chia sẻ
* Khả năng đáp ứng: 
     - Xác minh rằng thiết kế là linh hoạt và phù hợp với các kích thước / hướng màn hình khác nhau
     - Ứng dụng phản hồi tốt như thế nào đối với hành động của người dùng
     - Tải các trang trong khung thời gian cho phép

Nếu ứng dụng của bạn hoạt động tốt trên một trình duyệt, điều đó không có nghĩa là nó cũng sẽ hoạt động tốt trên các trình duyệt khác. Do đó, thử nghiệm này giúp bạn đảm bảo rằng một ứng dụng chạy trên các trình duyệt khác nhau mà không có bất kỳ lỗi nào

## Làm thế nào để chọn trình duyệt cho việc kiểm thử

Số lượng các trình duyệt, thiết bị và hệ điều hành hiện có khiến không thể xây dựng và thử nghiệm trên mọi tổ hợp trình duyệt - hệ điều hành đang tồn tại. Mục tiêu thực tế hơn là tập trung nỗ lực thử nghiệm để tối đa hóa phạm vi tiếp cận của trang web trong thị trường mục tiêu. Để làm điều này, chúng ta cần chọn ra các phiên bản và trình duyệt quan trọng nhất:
* Dựa trên mức độ phổ biến: Chọn 5-10 trình duyệt phổ biến nhất hoặc được sử dụng phổ biến nhất. Chọn hai nền tảng hàng đầu như Android và iOS. Điều này là để tối đa hóa phạm vi tiếp cận của chúng ta ở bất kỳ thị trường mục tiêu nào. 
* Dựa trên phân tích: Xem số liệu thống kê về lưu lượng truy cập của trang web của chúng ta khi được các công cụ phân tích (như Google Analytics hoặc Kissmetrics) thu thập và chia nhỏ chúng theo thiết bị, trình duyệt. Mục đích là để tìm ra:
     - Đối tượng mục tiêu của chúng ta sử dụng kết hợp trình duyệt, hệ điều hành nào phổ biến nhất
     - Trang web của chúng ta thường được xem trên những thiết bị nào

## Thị phần trình duyệt hiện nay

Tham khảo về thị phần trình duyệt trên toàn thế giới thông qua [Statcounter GlobalStats](https://gs.statcounter.com/browser-market-share) để có thể xem xét và quyết định gợi ý cho dự án của bạn nên chú trọng trên những loại trình duyệt nào 
![](https://images.viblo.asia/0c7f32ca-34b8-4fc4-859a-4bfacb68f45e.png)

Số liệu của biểu đồ trên được tính toán trong 1 năm trở lại đây, từ tháng 04/2020 đến tháng 04/2021 và top 5 trình duyệt thống lĩnh là:
1. Chrome 
2. Safari
3. Firefox 
4. Edge 
5. Opera

Hiện nay công ty mình làm việc với thị trường Nhật Bản vì vậy cùng tham khảo những khách hàng của chúng ta thường thao tác với những trình duyệt nào nhé
![](https://images.viblo.asia/33e8baef-1989-4616-9f6b-d8f4d5925d61.png)
1. Chrome 
2. Safari
3. Edge 
4. IE
5. Firefox

Qua số liệu này thấy rằng ngoài 2 trình duyệt phổ biến là Chrome và Safari thì người dân Nhật Bản khá chuộng Edge và IE, trình duyệt mà làm các anh em Dev nhà mình lắm lúc muốn điên đầu :D

Thông tin thêm, Statcounter GlobalStats còn có thể hỗ trợ chúng ta lọc dữ liệu cụ thể theo các tiêu chí sau
- Theo platform:
     + Desktop
     + Tablet
     + Mobile
- Theo vùng miền:
     + Châu Phi
     + Châu Á
     + Châu Âu
     + Châu Bắc Mỹ
     + Châu Đại Dương
     + Từng đất nước
- Theo các mốc thời gian:
     + 12 tháng gần đây
     + Từng năm gần đây

## Ai là người thực hiện thử nghiệm trên nhiều trình duyệt

Bạn có đang nghĩ, "Có một triệu trình duyệt, phiên bản hay nền tảng ngoài kia - nên chọn cái nào?" - Rất may, đây không phải là câu hỏi mà bắt buộc người thử nghiệm phải quyết định. Khách hàng, nhóm phân tích kinh doanh và nhóm tiếp thị có vai trò chính trong quyết định này. Ngoài ra, các công ty thu thập số liệu thống kê về sử dụng / lưu lượng truy cập để thu hẹp những trình duyệt, môi trường và thiết bị nào đang được sử dụng chủ yếu.

Toàn bộ nhóm dự án nên có sự quan tâm,  đầu tư thời gian, tiền bạc và cơ sở hạ tầng để hỗ trợ nỗ lực này.

Nhóm kiểm thử có thể tham gia vào quá trình này hoặc có thể là nhóm thiết kế muốn biết ứng dụng hoạt động như thế nào trong nhiều trình duyệt.

Cho dù nó được thực hiện bởi người kiểm thử hay bất kỳ nhóm nào khác - kết quả được giải thích bởi nhóm thiết kế và phát triển và các thay đổi liên quan được thực hiện.

Thông thường, các nhóm kiểm thử thực hiện các kịch bản thử nghiệm trên nhiều trình duyệt để đảm bảo rằng trang web đáp ứng các tiêu chuẩn về khả năng tương thích của trình duyệt. Nhóm kiểm thử chạy các trường hợp kiểm thử trên các trình duyệt để tìm hiểu xem giao diện người dùng của trang web hoạt động như thế nào trên các thiết bị khác nhau.

## Cách thực hiện thử nghiệm trên nhiều trình duyệt

Câu hỏi đầu tiên - nó được thực hiện thủ công hay sử dụng một công cụ khác hỗ trợ?

Nó chắc chắn có thể được thực hiện thủ công - nhiều máy, nhiều hệ điều hành, nhiều trình duyệt, nhưng rõ ràng, điều này dẫn đến nhiều vấn đề, nhiều khoản đầu tư và nhiều thách thức.

![](https://images.viblo.asia/b34d92c5-6cbc-4802-bb91-b62e46e10955.png)

### Thực hiện thủ công

Trong trường hợp này, một doanh nghiệp xác định các trình duyệt mà ứng dụng phải hỗ trợ. Sau đó, người thử nghiệm sẽ chạy lại các trường hợp thử nghiệm tương tự bằng cách sử dụng các trình duyệt khác nhau và quan sát hành vi của ứng dụng và báo cáo lỗi nếu có.

Trong loại thử nghiệm này, không thể bao gồm nhiều trình duyệt. Và ứng dụng cũng có thể không được thử nghiệm trên các phiên bản trình duyệt chính.

Ngoài ra, việc thực hiện kiểm tra trên nhiều trình duyệt theo cách thủ công cũng rất tốn kém và mất thời gian.

### Công cụ hỗ trợ

Cross-browser testing về cơ bản là chạy một tập hợp các trường hợp kiểm tra nhiều lần trên các trình duyệt khác nhau.

Loại nhiệm vụ lặp đi lặp lại này là phù hợp nhất cho tự động hóa. Do đó, việc thực hiện thử nghiệm này bằng cách sử dụng các công cụ sẽ hiệu quả hơn về chi phí và thời gian.

Vì vậy, rất nhiều công cụ có sẵn trên thị trường để làm cho việc này dễ dàng hơn.

Một vài công cụ hỗ trợ: 
* LambdaTest
* CrossBrowserTesting
* Selenium
* BrowserStack
* Browserling

## Tổng kết

Một số bước thực hiện thử nghiệm trên nhiều trình duyệt
1. Xác định những tính năng nào chúng ta sẽ thử nghiệm và viết các bước để chỉ định các tình huống
1. Xác định các trình duyệt và hệ điều hành theo mức độ phổ biến hoặc phân tích lưu lượng truy cập trang web mà cần sẽ kiểm tra
1. Chọn cách chúng ta sẽ thực hiện các tình huống thử nghiệm: thủ công hoặc tự động
1. Thiết lập các thiết bị / trình duyệt chúng ta sẽ thử nghiệm (hoặc kết nối với nhà cung cấp công cụ tự động)
1. Thực hiện các tình huống thử nghiệm trên các trình duyệt có tỷ lệ lưu lượng truy cập cao nhất, sau đó chuyển sang các trường hợp ngoại lệ
1. Tài liệu hóa và chia sẻ kết quả kiểm tra với các nhóm có thể gỡ lỗi / khắc phục sự cố
1. Liên tục chạy các bài kiểm tra khả năng tương thích giữa các trình duyệt để đảm bảo rằng không có lỗi nào bị bỏ sót

Như bạn đã biết, mỗi loại thử nghiệm đều giúp cải thiện chất lượng của ứng dụng và thử nghiệm trên nhiều trình duyệt cũng vậy

Thử nghiệm trên nhiều trình duyệt giúp tạo ấn tượng tốt với người dùng bằng cách cung cấp cho họ trải nghiệm nhất quán trong toàn bộ ứng dụng bất kể trình duyệt hay hệ điều hành

Sửa lỗi tiết kiệm chi phí trong giai đoạn đầu của vòng đời phát triển và điều này cũng áp dụng cho các lỗi được tìm thấy như một phần của thử nghiệm này.

Đây là một minh chứng khác cho khái niệm rằng lĩnh vực kiểm thử phần mềm là một lĩnh vực đa chiều



>  Bài viết đươc tham khảo từ nguồn **[Software Testing Help](https://www.softwaretestinghelp.com/how-is-cross-browser-testing-performed/)**