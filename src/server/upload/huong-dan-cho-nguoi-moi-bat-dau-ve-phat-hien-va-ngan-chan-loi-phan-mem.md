![](https://images.viblo.asia/9b6226cc-aae5-4f2f-84d4-091cbfd0e20e.jpg)

Kiểm thử phần mềm rất phức tạp. Đặc biệt, nếu bạn là người mới, bạn có thể bị lạc và không biết những hoạt động kiểm tra nào bạn nên tập trung vào để thành công trong công việc kiểm thử

Tuy nhiên, tin hay không, kiểm thử phần mềm là công việc liên quan đến các lỗi của phần mềm. Sớm hay muộn, bạn sẽ nhận ra hầu hết các hoạt động kiểm tra hàng ngày của bạn sẽ được xây dựng xung quanh hai hoạt động chính này: phát hiện lỗi (bug) và phòng ngừa lỗi . Nếu bạn thực hiện kiểm thử mà dành hầu hết effort cho hai hoạt động trên thì bạn đang đặt mình vào vị trí để đạt được thành công. Trong bài đăng hôm nay, tôi muốn giải thích thêm về hai hoạt động này: chúng là gì, tại sao bạn cần chúng và phải làm gì với chúng.
# 1. Lỗi (bug) phần mềm là gì?
Đơn giản. Đó là lỗi trong phần mềm 😀

![](https://images.viblo.asia/8d771432-e3ac-43a6-b837-3285429e0f47.jpg)

[Theo Wiki](https://en.wikipedia.org/wiki/Software_bug) : lỗi phần mềm  là lỗi, sai sót hoặc lỗi trong chương trình máy tính hoặc hệ thống khiến nó tạo ra kết quả không chính xác hoặc không mong muốn hoặc hành xử theo cách không lường trước được. 

Không có định nghĩa duy nhất về lỗi phần mềm. James Bach có định nghĩa riêng về các lỗi : Lỗi là bất cứ điều gì đe dọa đến giá trị của sản phẩm. Một cái gì đó lỗi làm phiền ai đó có vấm đề quan trọng.

Có nhiều định nghĩa bạn có thể tìm thấy trên Internet, nhưng về cơ bản, một lỗi hoặc khiếm khuyết là bất cứ điều gì không hoạt động như mong đợi trong hệ thống.

# 2. Tại sao phần mềm có lỗi?
Có nhiều lý do. SoftwareTestingHelp cung cấp [danh sách](https://www.softwaretestinghelp.com/why-does-software-have-bugs/) 20 lý do tại sao phần mềm có lỗi. Trong số đó, đây là những lý do quan trọng nhất:
- Thiếu yêu cầu hoặc hiểu sai các yêu cầu (ví dụ: yêu cầu thay đổi không được theo dõi hoặc quản lý đúng cách, yêu cầu không rõ ràng hoặc mơ hồ, yêu cầu không thể kiểm tra được, v.v.)

![](https://images.viblo.asia/8e7ed783-6913-483f-bfc4-7424366f1f73.gif)

- Sự phức tạp của phần mềm: Với sự tiến bộ của công nghệ, phần mềm ngày nay không chỉ là một trang web đơn giản hay một ứng dụng máy tính để bàn độc lập. Phần mềm ngày nay ngày càng phức tạp hơn khi cần xử lý một lượng lớn dữ liệu, tích hợp các mô-đun của bên thứ ba và chạy đa nền tảng. Những thứ như IoT, Dữ liệu lớn, Học máy, AI, v.v. bạn đặt tên cho nó. Do đó, việc phát triển và thử nghiệm hệ thống như vậy thực sự là một thách thức
- Áp lực thời gian để phát hành: Để đối phó với thị trường cạnh tranh, phần mềm ngày nay phải chịu áp lực phải phát hành ra thị trường càng sớm càng tốt. Đương nhiên, khi thời gian phát hành bị thu hẹp, thời gian thử nghiệm và giao tiếp bị cắt, mọi thứ được thực hiện vội vàng và do đó, lỗi xảy ra và lỗi được đưa ra.
Một số người có thể nói, những gì về lỗi lập trình nhưng ngày nay, với sự hỗ trợ của các công cụ phát triển phần mềm tiên tiến, lỗi lập trình ngày càng ít đi. Ngoài ra, với thực tiễn lập trình, lỗi code không còn nhiều như trước.

Đó là những nguyên nhân phổ biến nhất gây lỗi trong phần mềm.

Tuy nhiên, điều này có liên quan gì đến việc phát hiện lỗi không? 
Biết nguồn gốc của các lỗi sẽ giúp bạn định hướng nỗ lực kiểm tra các nơi bạn có thể tìm thấy các lỗi nhiều nhất.

Chúng ta hãy đi vào phần chính của bài viết

# 3. Phát hiện lỗi phần mềm

![](https://images.viblo.asia/be9dfe12-8d50-4c50-abaf-722ec10d8f2f.jpg)

Nói cách khác, làm thế nào để tìm lỗi trong phần mềm?

Khi nói đến kỹ năng kiểm thử phần mềm, tìm lỗi vẫn là một trong những kỹ năng quan trọng nhất. Ở một mức độ nào đó, một người kiểm thử tuyệt vời thường là một người kiểm có thể tìm thấy các lỗi quan trọng nhất trong hệ thống. Càng tìm thấy nhiều lỗi quan trọng, bạn càng làm tốt công việc. Tất nhiên, có nhiều kỹ năng khác để giúp bạn trở thành người kiểm thử tuyệt vời, nhưng tìm lỗi vẫn là một kỹ năng quan trọng đối với kiểm thử viên.

Có hai cách tiếp cận chính để tìm lỗi trong hệ thống:

- Kiểm thử kịch bản (Scripted testing)
- Kiểm thử thăm dò (Exploratory testing)

## 3.1 Kiểm thử kịch bản:

![](https://images.viblo.asia/3fb592a3-2e0b-4258-97f4-17d14ba7cd61.jpg)

Trong loại thử nghiệm này, bạn sẽ phải chạy qua danh sách các Testcase theo kịch bản hoặc danh sách kiểm tra để xác minh hệ thống theo các yêu cầu đã xác định và xác nhận nếu yêu cầu được thông qua hoặc thất bại. Mặc dù kiểm thử theo kịch bản là kiểm tra bắt buộc phải kiểm tra, tôi sợ rằng những kiểm thử viên có thể phát hiện ra nhiều lỗi chỉ bằng cách thực hiện các trường hợp kiểm thử theo kịch bản.

Tại sao vậy? Lý do là các trường hợp kiểm thử theo kịch bản như vậy được thiết kế dựa trên các đường dẫn quan trọng của hệ thống và vì chúng là các đường dẫn quan trọng, nên các nhà phát triển thường chăm sóc chúng rất tốt.

Cũng xin lưu ý rằng tôi không nói rằng các lỗi được tìm thấy bằng cách thực hiện các trường hợp kiểm tra là không có giá trị, ngược lại, các lỗi được tìm thấy trên các đường dẫn quan trọng được coi là ưu tiên cao nhất. Điều tôi đang cố gắng nói là nếu bạn đi theo cùng một con đường hết lần này đến lần khác, bạn sẽ ít có cơ hội khám phá những khiếm khuyết mới.

Bây giờ, nếu bạn muốn tìm thêm nhiều lỗi, tôi khuyên bạn nên đi theo con đường này:

## 3.2 Thử nghiệm thăm dò (Exploratory testing):

![](https://images.viblo.asia/de1dc479-a105-40a7-af30-d13133e7ccb7.jpg)

Khi nói đến thử nghiệm thăm dò,[ **HICCUPPS**](https://vntesters.com/xac-dinh-bug-dua-vao-nac-cuc/)  được coi là hướng dẫn cho những người kiểm thử khi họ muốn tìm lỗi trong hệ thống. Tôi sẽ giải thích **HICCUPPS**  là gì:

**History**. Chúng tôi hy vọng phiên bản hiện tại của hệ thống phù hợp với các phiên bản trước đây của hệ thống

**Image**. Chúng tôi hy vọng hệ thống phù hợp với hình ảnh mà tổ chức muốn chiếu, với thương hiệu hoặc với danh tiếng của nó.

**Comparable Products**. Chúng tôi hy vọng hệ thống này phù hợp với các hệ thống theo một cách nào đó có thể so sánh được.

**Claims**. Chúng tôi hy vọng hệ thống phù hợp với những điều quan trọng mà mọi người nói về nó, cho dù bằng văn bản (thông số kỹ thuật tham khảo, tài liệu thiết kế, hướng dẫn sử dụng, bảng trắng phác thảo) hoặc trong cuộc trò chuyện (cuộc họp, thông báo công khai, cuộc trò chuyện trong phòng ăn trưa).

**Users’ Desires**. Chúng tôi tin rằng hệ thống phải phù hợp với ý tưởng về những gì người dùng hợp lý có thể muốn.

**Product**.  Chúng tôi hy vọng mỗi yếu tố của hệ thống (hoặc sản phẩm) phù hợp với các yếu tố tương đương trong cùng hệ thống.

**Purpose**. Chúng tôi hy vọng hệ thống phù hợp với việc sử dụng rõ ràng và tiềm ẩn mà mọi người có thể đặt nó.

**Statutes**. Chúng tôi hy vọng một hệ thống phù hợp với luật pháp hoặc quy định có liên quan đến sản phẩm hoặc việc sử dụng nó.

Điều đó có nghĩa là nếu bất kỳ điểm nào ở trên không đáp ứng được kỳ vọng, bạn có thể tuyên bố rằng đó là **Bug** .

## 3.3 Ưu tiên và mức độ nghiêm trọng của lỗi

Nhưng không phải tất cả các lỗi đều có giá trị như nhau, một số lỗi quan trọng và đáng sửa hơn các lỗi khác

Giả sử, có hai người Kiểm thử:

Tester A: Tìm thấy 5 lỗi trong 1 bản Build
Tester B: Tìm thấy 20 lỗi trong 1 bản Build

Người kiểm thử nào tốt hơn? Chà, chúng tôi không biết, không có đủ dữ liệu để nói.
Bây giờ nếu:
Người kiểm thử A: Tìm thấy 5 lỗi trong một bản Build và hầu hết trong số đó làm cho hệ thống bị sập

Người kiểm thử B: Đã tìm thấy 20 lỗi trong một bản dựng và hầu hết trong số đó là các lỗi nhỏ và không ai quan tâm để sửa chúng.

Rõ ràng, người kiểm thử A đã làm tốt hơn so với người kiểm thử B.

## 3.4 Làm thế nào để báo cáo một lỗi .. đúng cách?

Bạn tìm thấy một bug, tuyệt vời! 
Bước tiếp theo (nhưng quan trọng) là báo cáo chúng.

Hey, tôi tìm thấy một lỗi, hãy xem

Đáng buồn thay, hầu hết những người kiểm thử bỏ qua bước này. Họ viết các báo cáo bug kém mà không mô tả các vấn đề rõ ràng. Báo cáo bug bằng văn bản như vậy làm cho tất cả các nỗ lực tìm kiếm bug của họ bị lãng phí.

![](https://images.viblo.asia/4f86c1ef-4520-4654-ac0d-50509c4c640b.jpg)

Xin lưu ý rằng với tư cách là người kiểm thử, bạn không chỉ thực hiện kiểm tra mà còn thực hiện dịch vụ . Dịch vụ của bạn là cung cấp càng nhiều thông tin càng tốt về hệ thống đang được kiểm thử cho khách hàng / các bên liên quan của bạn.
Hãy chú ý đến báo cáo lỗi như tìm lỗi.
## 3.5 Làm thế nào để biết nếu bạn đang làm một công việc tốt trong việc phát hiện lỗi?

Tin tốt là bạn có thể dựa trên các số liệu để giúp bạn đo lường hiệu quả của việc phát hiện bug.

Có nhiều số liệu khác nhau để đo lường hiệu quả của việc phát hiện bug nhưng hai số liệu phổ biến là:
### Tỷ lệ phát hiện lỗi

**Tỷ lệ phần trăm phát hiện lỗi (DDP**) đưa ra thước đo về hiệu quả kiểm tra. Nó được tính như một tỷ lệ lỗi được tìm thấy trước khi phát hành và sau khi phát hành bởi khách hàng

Công thức: 
![](https://images.viblo.asia/c4e3d5b5-e4a6-4d91-915d-8ed2557d0c7b.png)

Ví dụ:

Số lượng lỗi được tìm thấy trong giai đoạn Kiểm thử: 60
Số lượng lỗi được tìm thấy sau khi phát hành: 20
DDP = (60 / (60 + 20)) * 100 = 75%
### Tỷ lệ rò rỉ lỗi 

Tỷ lệ rò rỉ lỗi đưa ra một thước đo về việc người kiểm tra có thể phát hiện các lỗi dựa trên các lỗi bị bỏ sót của họ như thế nào (hay còn gọi là lỗi do khách hàng tìm thấy). Nó được tính như một tỷ lệ lỗi số được tìm thấy bởi khách hàng và số lượng lỗi được tìm thấy bởi người kiểm tra.
Công thức: 
**DLR = số lỗi được tìm thấy bởi khách hàng sau khi phát hành / số lỗi được tìm thấy bởi người kiểm tra trước khi phát hành**

Ví dụ: Nếu sau khi phát hành máy khách phát hiện 9 lỗi, trong quá trình kiểm tra, người kiểm tra đã báo cáo 201 lỗi và từ 20 lỗi này không hợp lệ, thì

Tỷ lệ rò rỉ lỗi  = (9 / 201-20) * 100 = 4,9%

Giống như tôi đã nói ở trên, tin tốt là chúng tôi có các số liệu dựa trên cơ sở và đây là tin xấu:

Số liệu là sai lệch và nó sẽ trở nên có hại hơn là tốt nếu bạn chỉ dựa vào một số liệu để đưa ra quyết định mà không xem xét bối cảnh.

Chúng ta hãy vào phần thứ hai của bài viết:

# 4. Ngăn ngừa lỗi phần mềm

![](https://images.viblo.asia/a5d28286-0bec-43f6-ba41-40397802a3e8.jpg)

## Phòng ngừa lỗi là gì và tại sao chúng ta cần nó?

**Lưu ý:** Phần này là một chút nâng cao cho người  kiểm thử mới. Tuy nhiên, nếu bạn có thể áp dụng các thực hành phòng ngừa lỗi trong công việc của mình, bạn sẽ tự đưa mình lên cấp độ tiếp theo

Vậy phòng ngừa lỗi là gì?
Ngăn ngừa lỗi là một chiến lược được áp dụng cho vòng đời phát triển phần mềm nhằm xác định nguyên nhân gốc của lỗi và ngăn chúng xảy ra
Nhưng bạn có thể hỏi tại sao chúng ta cần nó? Tôi nghĩ là một người thử nghiệm, công việc của tôi là tìm ra càng nhiều lỗi càng tốt. Nếu chúng ta ngăn chặn chúng, còn lại gì để tìm?
Nó có ý nghĩa nhưng không hoàn toàn đúng.
Khi tôi mới bắt đầu, tôi có suy nghĩ chính xác. Tôi nghĩ rằng tôi rất tuyệt khi tôi có thể tìm thấy rất nhiều lỗi trong hệ thống. Một số lỗi của tôi đã làm sập hệ thống và đôi khi khiến các nhà phát triển bối rối.
Tôi sẽ giải thích…

Tìm ra lỗi là tốt, bạn càng có thể tìm thấy tốt hơn cho sản phẩm của bạn. Tuy nhiên, sẽ có chi phí đòi hỏi của nó. Trong sản xuất, các chi phí này bao gồm làm lại, tháo dỡ, vật liệu, sắp xếp lại vật liệu, vv Nếu bạn làm trong ngành sản xuất, bạn sẽ biết rằng loại bỏ chất thải là ưu tiên hàng đầu.

Bây giờ trong ngành công nghiệp phần mềm, chi phí cho các lỗi phần mềm có thể không rõ ràng như trong sản xuất, nhưng nó vẫn là một sự lãng phí.

Nhìn! Khi bạn tìm thấy một lỗi, nhóm sẽ dành thời gian để xem xét và đưa ra quyết định về những gì cần giải quyết. Nếu nhóm đồng ý sửa nó, sẽ tốn thời gian và nguồn lực để sửa nó. Sau khi các nhà phát triển cung cấp bản sửa lỗi, người kiểm tra cần xác minh bản sửa lỗi và thực hiện kiểm tra hồi quy. Rõ ràng, nó sẽ luôn tốn nhiều thời gian và nguồn lực hơn để xử lý các lỗi.
![](https://images.viblo.asia/b0b2505f-81a4-4b68-baf5-8a038868ee45.jpg)

Như đã nói, điều đó không có nghĩa là bạn không nên tìm ra lỗi hoặc chỉ che giấu chúng để giảm chi phí. đó không phải là ý tôi. Ý tôi là **nếu bạn có thể giúp ngăn chặn các lỗi xảy ra ngay từ đầu, điều đó sẽ rất có giá trị .**

## Vậy, làm thế nào để ngăn chặn nó?

Về cơ bản, phòng ngừa lỗi bao gồm các hoạt động  **ngăn chặn** lỗi được đưa vào phần mềm ngay từ đầu. Đây là một số ý tưởng:

- **Phân tích và xem xét các yêu cầu**: Đây là một trong những thực tiễn quan trọng nhất trong các hoạt động phòng ngừa lỗi vì hầu hết các lỗi được đưa vào phần mềm do các yêu cầu không rõ ràng, không thể kiểm chứng. Phân tích và xem xét các yêu cầu sẽ loại bỏ các rủi ro để đưa ra các lỗi như vậy
- **Đánh giá code** (bao gồm đánh giá ngang hàng , tự đánh giá): Điều này sẽ làm giảm các lỗi liên quan đến việc triển khai thuật toán, logic không chính xác hoặc các điều kiện thiếu nhất định.
- **Phân tích nguyên nhân gốc rễ** : Phân tích nguyên nhân gốc rễ của những lỗi để ngăn chặn nó xảy ra lần nữa
Như đã nói, người kiểm thử cần phải tham gia ngay từ đầu và trong suốt các giai đoạn phát triển phần mềm.

## “Zero defects”  là một huyền thoại

Bây giờ, có vẻ như nếu bạn có thể làm theo tất cả các thực hành tốt về phát hiện lỗi và phòng ngừa lỗi, thì không có lỗi nào bị rò rỉ cho khách hàng phải không? 
Đáng buồn thay, bất kể bạn phát hiện lỗi hay ngăn chặn chúng tốt như thế nào, không có cách nào để bạn ngăn chặn hoặc phát hiện tất cả các lỗi trong hệ thống . Bạn không thể loại bỏ chúng hoàn toàn. Bạn chỉ có thể giảm số lượng lỗi bị bỏ lỡ (ít quan trọng hơn) và chuẩn bị một thái độ tốt để đối phó với chúng.

Đôi khi, tất cả những gì bạn cần làm là:
![](https://images.viblo.asia/884338ab-124c-4d89-9900-1dafabd9aa72.jpg)


Đây là bài viết Translate Article

Tham khảo: https://www.asktester.com/defect-detection-and-prevention/