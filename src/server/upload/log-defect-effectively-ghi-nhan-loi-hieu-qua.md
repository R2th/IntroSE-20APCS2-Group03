Trong quá trình kiểm thử phần mềm, khi người kiểm thử phát hiện ra lỗi của phần mềm thì người kiểm thử viên đó phải ghi nhận lại lỗi, phân tích để giao cho tác giả hoặc người thích hợp để sửa nó.
##  1. Vậy mục đích của việc ghi nhận lại lỗi đó là gì?
- Thứ nhất: để cung cấp cho lập trình viên, người quản lý và người liên quan, thông tin chi tiết về sự kiện người kiểm thử quan sát được các lỗi phát hiện và sửa lỗi nếu cần.
- Thứ 2: để cung cấp cho người quản lý đội kiểm thử phương tiện để theo dõi chất lượng của hệ thống, sản phẩm đang được kiểm thử và tiến độ của việc kiểm thử.
- Thứ 3: là việc ghi nhận lỗi sẽ cung cấp thêm ý tưởng cho việc cải tiến quy trình phát triển và kiểm thử phầm mềm.

 Một bug được ghi nhận tốt, giúp cho người đọc có thể dễ dàng nhìn ra được vấn đề, không phải mất nhiều thời gian để tìm hiểu và trao đổi qua lại quá nhiều lần, bên cạnh đó cũng là để phòng ngừa và phát hiện những vấn đề nghiêm trọng xảy ra, liên quan và ảnh hưởng trực tiếp đến chất lượng sản phẩm phần mềm.

Về mặt lý thuyết, có lẽ các bạn đều biết được rằng bug được đưa lên thì nội dung cần phải ngắn gọn súc tích nhưng vẫn phải đảm bảo cung cấp đủ các thông tin cần thiết. Ôi mà như thế nào là ngắn gọn mà vẫn đầy đủ thông tin? Dưới đây mình sẽ nêu một số quan điểm mà mình nghĩ nó rất quan trọng trong việc log bug.
##  2.Một số quan điểm cần chú ý khi log bug
###  2.1. Cung cấp thông tin chi tiết, đầy đủ: What, How, When
Điểm quan trọng đối với việc log bug, đó là bạn phải cung cấp được thông tin liên quan đến bug đó như là điều gì đã xảy ra, nó đã xảy ra như thế nào nào? ở đâu, khi nào?
Ví dụ: bug này xảy ra khi bạn đã thực hiện các bước với test data như thế nào, trong môi trường như thế nào, và bạn đã thực hiện nó ở phần chức năng nào của hệ thống. Để từ đó người đọc sẽ hình dung, dễ dàng tái hiện và tìm bug theo mô tả này của bạn hơn.
### 2.2. Mỗi bug nên tập trung vào một vấn đề thôi
Trong một bug bạn chỉ nên tập trung vào một vấn đề cụ thể mà bạn gặp đó thôi, đừng nghĩ là mất công log một bug này nên là tranh thủ gom vài vấn đề vào chung luôn cho đỡ phải log tiếp, như vậy làm cho các vấn đề trở nên rắc rối, khó nắm bắt, nhiều khi bị lan man mất nhiều thời gian để có thể giải quyết và close được bug.
### 2.3. Mô tả lỗi thường dựa trên các thành phần 
Mỗi công ty/đội dự án lại có các cách quản lý bug khác nhau, các biểu mẫu và cách báo cáo khác nhau. Nhưng nhìn chung thì log bug chúng ta cũng đều phải đảm bảo và lưu ý một số yếu tố dưới đây:
   1. Mã định danh lỗi( bug ID): Yếu tố này giúp việc quản lý, tìm kiếm dễ dàng và nhanh chóng hơn. Đặc biệt đối với project mà số lượng bug trở nên quá lớn qua các  build version.

   2. Tiêu đề của bug (Bug title): Đây sẽ là phần mà thường là ta sẽ đọc đầu tiên trước khi mở bug đó ra và đọc tiếp các mô tả bên trong, do đó phần này nên mô tả một cách khái quát nhất, ngắn gọn nhất nhưng đủ để người đọc biết đó là lỗi gì và hình dung ra 1 cách nhanh nhất. Giúp người đọc có thể hiểu được và biết được là bug đã được fix hay đã gặp lần nào bao giờ chưa. Việc đưa ra quy tắc đặt tiêu đề lỗi như thế nào thì thường do người quản lý đội kiểm thử quy định hoặc khách hàng quy định
   3. Mô tả lỗi(Description) : Mô tả chi tiết làm thế nào để phát hiện ra lỗi đó hay làm thế nào để lỗi đó xuất hiện. Phần mô tả này càng chi tiết càng tốt.Đưa ra các bước theo đúng tuần tự thực hiện để có thể tái hiện lỗi:

      *Môi trường/Nền tảng/Device test: Ở đây ta cần phải đưa ra thông tin cụ thể việc xảy ra bug đó khi bạn test trên môi trường nào, sử dụng device test nào:         ví dụ như test  trên Window 7, Chrome latest version…. Hay iPhone 7, iOS 9…., vì đôi khi thì bug đó chỉ xảy ra ở một số môi trường đặc biệt nào đó thôi, việc         cung cấp các  thông tin này cũng giúp cho đội Dev có thêm thông tin để tìm được ra được các vấn đề.

 
      *Điều kiện đầu vào: Bao gồm các bước chuẩn bị, test data…

 
      *Test steps: Các bước thực hiện, nên đánh số 1, 2, 3, …

 
      *Kết quả mong đợi: Kết quả đúng cho case này là gì?

 
      *Kết quả thực tế: Thực tế nó đã xảy ra như thế nào, cần mô tả rõ ràng và đầy đủ kết quả thực tế đã xảy

4. Tài kiệu đính kèm: “Một hình ảnh bằng hàng nghìn lời nói”, do đó bạn nên đính kèm theo mỗi bug các hình ảnh liên quan trực tiếp đến nó, có thể highlight vùng lỗi lên để người đọc dễ quan sát hơn, hoặc bạn cũng có thể quay một video các bước đã thực hiện, cách này sẽ giúp ích rất nhiều trong việc tái hiện và hiểu bug. Ngoài ra nếu bạn có thể lấy được các log file ( hồi trước mình test automotive thì bug nào cũng cần phải lấy log file, nói chung là tùy dự án) thì cũng có thể đính kèm lên cùng với bug, rồi các tài liệu tham khảo liên quan khác, nếu cần thiết.

5. Mức độ nghiêm trọng của bug(Severity): Khi bug xảy ra, bạn có thể đánh giá độ nghiêm trọng của lỗi để gán cho nó trạng thái tương ứng, các trạng thái này có thể là Critical, Major, Minor, … tùy từng hệ thống, thường thì sẽ dựa vào chỉ số này để ưu tiên các bug nào sẽ phải được/nên được fix trước.
 
6. Trạng thái của lỗi ( Status): Việc kiểm soát quản lý lỗi thì phải thông qua các trạng thái lỗi. Nhìn vào trạng thái lỗi thì biết được hiện trạng của lỗi đó đang như thế nào? có phải xử lý gì tiếp không?
 
7. Người được giao xử lý lỗi(Asigned to): Thường sẽ là tên người sửa lỗi hay là người sẽ chịu trách nhiệm xử lý lỗi đó. Ví dụ: Phân tích, kiểm thử xác nhận...

 Các thông tin trên thường là thông tin để mô tả một lỗi, ngoài ra cũng có thể có các thông tin như sau:
 
  - QC Activity: Tên của hoạt động đảm bảo đã thực hiện và phát hiện ra lỗi. Ví dụ: lỗi đang ghi nhận khi tìm ra khi thực hiện hoạt động kiểm thử tĩnh là review code thì mục này sẽ được điền là review code. Có thêm thông tin này, để sau này có thể xác định xem trong các hoạt động đảm bảo chất lượng của sản phẩm thì hoạt đọng nào là hiệu quả nhất.

  - Độ ưu tiên khi sửa lỗi(Priority):Thực hiện yêu cầu mức độ ưu tiên khi sửa lỗi. Có thể bạn thấy rằng, các lỗi có mức độ nghiêm trọng càng cao thì càng cần phải sửa sớm nên có thông tin về mức độ nghiêm trọng của lỗi là đủ rồi, không cần thông tin này nữa thì không hẳn là như vậy. Chỉ đúng ở 1 khía cạnh, các lỗi có mức độ nghiêm trọng càng lớn, nếu là lớn nhất thì phải sửa nhanh nhất có thể. Ví dụ: vào 1 chức năng nào đó để kiểm thử mà chức năng đó chết luôn và không làm được gì tiếp thì lỗi đó phải xử lý luôn. Nhưng đối với lỗi có mức độ ưu tiên thấp hơn 1 chút thì ưu tiên sửa chữa như thế nào, đặc biệt là ở những giá đoạn khác nhau thì cần có ưu tiên khác nhau. Ví dụ: 2 ngày nữa là phải bàn giao sản phẩm cho khách hàng thì lúc này không con các lỗi có mức độ nghiêm trọng ở mức cao nhất và nhì nữa mà chỉ còn ở mức 3 và 4. Trong đó, các lỗi về giao diện(UI) thì mức độ nghiêm trọng thường ở mức thấp nhất vì nó không ảnh hưởng đến nghiệp vụ của chức năng sản phẩm đó. Nếu như theo mức nghiêm trọng lại không sửa các lỗi giao diện có mức độ nghiêm trọng ở mức 4( mức thấp nhất) thì thực sự lại là vấn đề trong quản trị dự án. Bởi vì các lỗi giao diện này tuy không ảnh hưởng đến nghiệp vụ của chức năng sản phẩm nhưng lại là bộ mặt của chắc năng sản phẩm đó và dễ dàng được phát hiện khi khách hàng thực hiện kiểm thử chấp nhận. Lúc họ kiểm thử phần chức năng sản phẩm đó mà có nhiều lỗi, chưa tính đến lỗi đó có nghiêm trọng hay không thì cũng sẽ có ác cảm với sản phẩm của mình. Do đó, độ ưu tiên một lỗi cũng được đưa vào khi mô tả, ghi nhận một lỗi.
  
  - Ngày phát hiện ra lỗi(Create date), tên người phát hiện ra lỗi( Create by), hành động sửa lỗi(mô tả xem đã sửa lỗi như thế nào, có thể đưa vào cả nguyên nhân gốc rễ của lỗi).
### 2.4.**Ghi nhận lỗi một cách kịp thời**

 Ghi nhận lỗi ngay sau khi phát hiện ra lỗi, thể hiện tính kịp thời khi bạn ghi nhận ngay. Thứ nhất bạn sẽ mô tả chính xác lỗi bạn vừa tìm thấy. Thứ 2, khi bạn ghi nhận lỗi kịp thời sẽ giúp cho những người đang kiểm soát dự án, người quan tâm đến dự án biết được hiện trạng đứng đắn của dự án để có những hành động kịp thời.
### 2.5.Không log trùng lỗi
Một vấn đề khác, đó là việc log bug bị trùng, nguyên nhân thì do chủ quan hay khách quan đều có, nhưng dù là gì đi nữa thì bạn cũng nên hạn chế thấp nhất vấn đề này, một vài lần xảy ra sẽ khiến dev “mất niềm tin” ở bạn ngay. Vì vậy, cần kiểm tra và lọc kỹ thông tin trước khi log bug, một vài chục bug ta có thể nhớ được chứ khi đã lên đến hàng trăm thì không thể chủ quan được!
### 2.6.Yếu tố tâm lý: Đóng góp – đừng ra lệnh
Khi test mà bắt được con bug nào, tester vui mừng bao nhiêu thì Dev buồn bấy nhiêu. :)) Vì thế hãy luôn mang một tinh thần và mục tiêu là cùng đóng góp để xây dựng một sản phẩm chất lượng, đừng gay gắt ra lệnh, nó dễ làm ảnh hưởng đến tâm lý người nhận và dễ gây căng thẳng giữa hai bên

![](https://images.viblo.asia/aa212c14-2b3f-4a42-8150-87c7352d2062.PNG)

Một lưu ý nữa là bạn cần đảm bảo là đã sử dụng bản build test và điều kiện phù hợp tương ứng với test cycle. Và nhớ đọc kỹ lại một lượt bug để đảm bảo không mắc các lỗi về diễn đạt hay chính tả nữa nha. Một số bug chỉ xảy ra sometime rất khó tái hiện, vậy nên cách tốt nhất là nên lưu lại evidence quá trình test của mình.
## 3.Làm gì để hạn chế “Not a bug” hay “Invalid bug”
* Điều đầu tiên, bạn phải nắm chắc được tổng quan hệ thống bạn sẽ test, nắm chắc requirement và quan trọng nhất là phần bạn phụ trách test.

* Nên xem xét kỹ các điều kiện, môi trường, device test kỹ càng. Cách sử dụng, các cấu hình cần thiết, việc cài cắm các thiết bị, phần mềm tích hợp khác có liên quan, trước khi thực thi test. Để đảm bảo được các yếu tố này thì bạn cần phải nắm được bạn sẽ cần những gì khi test hệ thống đó để tìm hiểu các thông tin tương ứng, tránh trường hợp không biết cấu hình, hay cấu hình sai, bạn sẽ trở thành tội đồ của chính mình! :3

* Khi phát hiện ra vấn đề khác thường, thì nên check lại latest requirement của phần này một lần nữa để đảm bảo là vấn đề khác thường này đúng là khác thường thật! 
* Lưu ý là version mới nhất ấy nhé, tránh trường hợp sử dụng version cũ thì lỗi lầm lại thuộc về bạn ngay từ bước này rồi! 

* Kiểm tra lại nhiều lần để xác định tần xuất xảy ra bug, có thể là reset lại máy test, clear cache các thứ để xem việc tái hiện vấn đề này có vấn đề gì không?

* Sau đó kiểm tra một lần nữa trên các máy test khác xem nó có xảy ra trên máy khác hay không?

* Nếu vẫn chưa chắc chắn thì có thể tham khảo ý kiến của các thành viên trong nhóm, hay những người có kinh nghiệm để xem xét thêm về vấn đề này.
* Trong trường hợp có xảy ra tranh cãi, những thông tin liên quan cần thiết bạn đã cung cấp đầy đủ rồi mà vẫn không tìm được tiếng nói chung với người được assgin để fix bug thì nên nhanh chóng đưa vấn đề lên leader hoặc người có trách nhiệm cao hơn để cùng tìm hướng giải quyết phù hợp nhất.

Hy vọng bài viết này sẽ giúp ích cho các bạn trong việc log bug!