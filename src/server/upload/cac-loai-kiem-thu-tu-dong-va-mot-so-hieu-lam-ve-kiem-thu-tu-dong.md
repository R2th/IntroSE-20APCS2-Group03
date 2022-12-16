Trong bài này, tôi sẽ mô tả về các loại Automation Testing và quan trọng nhất là tôi cũng sẽ làm rõ luôn vài vấn đề về sự hiểu lầm trong Test Automation.


![](https://images.viblo.asia/2ebb7c48-f440-4a99-901b-d5e11728a3ab.jpg)
# Types of Automated Tests:
Có 3 loại Test Automation chính đó là:

## 1. Automated Unit Tests

Automated Unit Tests được viết ra để sử dụng kiểm thử ở cấp Code chức năng. Bugs được tìm ra trong các chức năng, các phương pháp cũng như vòng lặp được viết nên bởi Developers.
 
Nhiều công ty yêu cầu bên phát triển phần mềm tự kiểm thử cấp Unit này và một số lại thuê nguồn nhân lực bên ngoài chuyên kiểm thử tự động . Bên thứ ba này sẽ có quyền truy cập vào Mã nguồn và họ sẽ viết ra các trường hợp kiểm thử đơn vị để chia nhỏ phần code ở môi trường thật. Do sự có mặt của kiểm thử đơn vị tự động này, mà bất cứ chỗ nào đã có biên dịch code, tất cả kiểm thử đơn vị đã được viết ra sẽ chạy và báo lại cho họ biết rằng kết quả là tất cả các Chức năng đang được hoạt động ổn định và nếu như có bất cứ một đơn vị code nào chạy bị lỗi, có nghĩa là bug này cũng sẽ xảy ra trên môi trường thật.

Các công cụ phổ biến nhất hiện có trên thị trường là NUnit và JUnit. Microsoft cũng cung cấp hết framework của họ cho kiểm thử đơn vị gọi tới MSTest. Chúng ta cũng có thể tìm thấy qua các trang web nói về các công cụ này và xem thử một vài ví dụ và hướng dẫn về cách viết kiểm thử đơn vị nhé.

## 2. Automated Web Service / API Tests

Giao diện lập trình ứng dụng (API) giúp phần mềm có khả năng giao tiếp với các ứng dụng phần mềm khác. Cũng giống các ứng dụng phần mềm khác, API cần phải được kiểm thử. Trong loại kiểm thử này, thường không cần quan tâm đến GUI.
Cái mà chúng ta cần kiểm thử ở đây là các chức năng phải chạy bình thường, phải tuân thủ và bảo mật. Trong ứng dụng web, chúng ta có thể kiểm thử các Yêu cầu và Phản hồi của ứng dụng của mình xem chúng có an toàn và đã được mã hoá hay chưa?

Đây là một trong những ví dụ mà chúng ta có thể sử dụng để Kiểm tra API. Công cụ phổ biến nhất để thử nghiệm API là SOAPUI có cả phiên bản miễn phí và trả phí. Và còn những công cụ khác cũng rất tốt, mà bạn cũng có thể sử dụng theo nhu cầu của bạn.

## 3. Automated GUI Tests.

Loại kiểm thử tự động này là hình thức tự động hóa khó nhất vì nó liên quan đến thử nghiệm giao diện Người dùng của ứng dụng.

Nói là khó bởi vì GUI rất hay có khả năng thay đổi. Nhưng loại kiểm thử này cũng gần nhất với những gì người dùng sẽ làm với ứng dụng của chúng ta. Vì người dùng sẽ sử dụng chuột và bàn phím, nên các kiểm thử GUI tự động cũng phải bắt chước được hành vi tương tự bằng cách sử dụng chuột và bàn phím để nhấp hoặc điền vào các đối tượng có trên giao diện người dùng. Do đó, chúng ta có thể tìm thấy các lỗi sớm và nó có thể được sử dụng trong rất nhiều tình huống ví dụ như kiểm thử hồi quy hoặc kiểm thử điền vào các biểu mẫu, những hành động mà nếu kiểm thử thủ công sẽ mất rất nhiều thời gian.

Các công cụ kiểm tra GUI phổ biến nhất là QTP (Hiện được gọi là UFT), Selenium, Test Complete và Microsoft Coded UI (là một phần của Visual Studio ultimate và Premium editions).

# Một vài sự hiểu lầm về Automation Testing
Trong những năm qua, tôi có được nghe một số quan niệm sai lầm về kiểm thử tự động hoá. Tôi nghĩ rằng tôi sẽ cần phải làm rõ chúng trong bài viết này.

## 1. Kiểm thử tự động xuất hiện là để thay thế cho kiểm thử thủ công

Kiểm thử tự động hóa là để giúp người kiểm thử thực hiện kiểm thử nhanh hơn và theo cách đáng tin cậy hơn. Chứ thực chất thì nó không bao giờ có thể thay thế con người.

Hãy thử nghĩ kiểm thử tự động như một chiếc xe hơi. Nếu bạn đi bộ, bạn sẽ mất khoảng 20 phút để đến nhà. Nhưng nếu bạn sử dụng xe hơi, bạn sẽ về nhà chỉ trong hai phút. Người điều khiển chiếc xe vẫn là bạn, một con người, nhưng .. chiếc xe giúp con người đạt được mục tiêu của mình nhanh hơn. Ngoài ra, phần lớn năng lượng của bạn được tiết kiệm, vì bạn đã không đi bộ. Vì vậy, bạn có thể sử dụng năng lượng này để thực hiện những điều khác quan trọng hơn.

Tương tự với kiểm thử tự động. Bạn sử dụng nó để nhanh chóng kiểm tra hầu hết các bài kiểm tra lặp đi lặp lại, dài và nhàm chán của bạn và tiết kiệm thời gian cũng như năng lượng của bạn để tập trung và kiểm tra chức năng khác mới và quan trọng.

**James Bach đã từng nói một quan điểm rất tuyệt vời như sau:**
*"Công cụ thì không kiểm thử được. Chỉ có con người mới kiểm thử được. Công cụ chỉ thực hiện được các hành động, cái mà sẽ "giúp" được cho con người kiểm thử."*

Có nghĩ là công cụ có thể nhấp vào đối tượng. Nhưng nơi để nhấp sẽ luôn được xác định bởi một người kiểm thử thủ công. Và giờ thì tôi nghĩ rằng bạn đã có thể hiểu được quan điểm của tôi rồi.

## 2. Tất cả mọi thứ dưới ánh mặt trời đều có thể tự động hoá được

Nếu bạn cố gắng tự động hóa 100% các trường hợp kiểm thử của mình, có thể bạn sẽ có thể làm được như vậy, nhưng nếu điều đó bạn có thể làm, thì quan điểm đầu tiên của chúng ta trở thành sai. Bởi vì nếu mọi thứ đều tự động, thì người kiểm thử thủ công sẽ làm gì?

Thật là bối rối? Đúng không?

Trên thực tế, vấn đề là như này, bạn không thể tự động hóa 100% các trường hợp kiểm thử của mình. Bởi vì chúng ta, với tư cách là người kiểm thử, tin rằng không có ứng dụng nào có thể được kiểm thử 100%. Sẽ luôn có một số kịch bản mà chúng ta sẽ bỏ lỡ. Sẽ luôn có những lỗi chỉ xuất hiện khi ứng dụng của bạn được khách hàng sử dụng.

Vậy nếu ứng dụng không thể được kiểm thử 100%, thì làm thế nào bạn có thể hứa rằng sẽ tự động hóa 100%?

Ngoài ra, vẫn có thể có một số ít cơ hội rất nhỏ rằng bạn sẽ có thể tự động hóa mọi trường hợp thử nghiệm hiện tại của bạn. 
Luôn có những kịch bản khó tự động hóa và dễ thực hiện thủ công hơn.

Ví dụ: Một người dùng sẽ nhập dữ liệu, người dùng thứ hai sẽ phê duyệt dữ liệu, người dùng thứ ba sẽ xem dữ liệu và người dùng thứ tư bị cấm xem dữ liệu. Những kịch bản này có thể được tự động hóa, nhưng chúng sẽ tốn rất nhiều thời gian và công sức. Vì vậy, nó sẽ dễ dàng hơn nếu bạn chỉ làm điều đó bằng tay.

Hãy nhớ rằng, chúng ta sử dụng ô tô để đi giữa các khoảng cách, nhưng có thể có tín hiệu dài trên đường, sẽ có mức tiêu thụ nhiên liệu, sẽ có vấn đề về chỗ đậu xe, phí đỗ xe và đau đầu hơn rất nhiều. Trong một số kịch bản, chúng ta chỉ cần đi bộ và cũng đạt đến đích của chúng ta :).

Vì vậy, bạn không nên cố gắng tự động hóa mọi thứ. Chỉ tự động hóa các kịch bản quan trọng và những kịch bản gây mất nhiều thời gian để thực hiện thủ công.

## 3. Tự động hoá chỉ liên quan đến ghi và phát

Làm ơn đừng sống trong một thế giới giả tưởng. Sự tưởng tượng này thực sự được tạo ra bởi các quảng cáo sai lệch từ các nhà cung cấp công cụ tự động hóa khác nhau. Họ nói rằng bạn chỉ cần ghi và phát lại các bước kiểm thử của bạn và tất cả các trường hợp kiểm thử của bạn sẽ được tự động. Ôi, đó là một lời nói dối lớn!

Tự động hóa là tất cả mọi thứ sẽ ghi và phát lại. Các kỹ sư tự động hóa chuyên họ thường không sử dụng tính năng ghi và phát lại này. Ghi và phát lại thường được sử dụng để lấy ý tưởng về cách công cụ tạo tập lệnh cho các bước của chúng ta.

Khi chúng ta biết được kịch bản, chúng ta luôn sử dụng kịch bản để tạo các bài kiểm thử tự động. Hãy nhớ rằng, bạn phải biết lập trình nếu bạn muốn làm tự động hóa kiểm thử. Mặt khác, cũng đừng thất vọng nếu bạn không biết lập trình. Bởi vì giống như bất kỳ nhiệm vụ nào khác, lập trình cũng có thể được học bằng thực tiễn và sự cống hiến.

Tôi đã biết, những người thậm chí không đi ra từ cái nền tảng công nghệ thông tin, nhưng họ học lập trình và bây giờ họ là những kỹ sư tự động hóa tuyệt vời. Tại Microsoft, họ thuê những người thử nghiệm có thể làm lập trình. Chúng được gọi là SDET (Kỹ sư phát triển phần mềm để kiểm tra). Dòng đầu tiên của mô tả công việc cho biết, SD SDET viết rất nhiều code.

Hãy học cách lập trình, đừng bỏ chạy. Nó sẽ làm cho bạn trở thành một kỹ sư kiểm thử tuyệt vời.

Kết luận nhé:
Tôi hy vọng bài viết này sẽ giúp bạn hiểu rõ hơn một số khái niệm liên quan đến kiểm thử tự động hóa.

Trong bài viết tiếp theo, tôi sẽ thảo luận về cách bắt đầu tự động hóa kiểm thử trong tổ chức của bạn từng bước.

Hãy cho tôi biết ý kiến của bạn, nó sẽ giúp tôi cải thiện hơn trong các bài viết tiếp theo của tôi.


***Nguồn tham khảo: https://www.softwaretestinghelp.com/automation-testing-tutorial-2/***