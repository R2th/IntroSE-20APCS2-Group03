Ước lượng phần mềm hay gọi nôm na là Estimate là một bước không thể thiếu để bắt đầu một dự án, đơn cử như KH giao cho công ty hay nhóm của bạn một dự án thì bây giờ làm thế nào để biết được dự án này làm hết bao nhiêu thời gian, và với thời gian mong muốn Release của KH thì cần bao nhiêu nhân sự để thực hiện, trong đó lại có bao nhiêu Senior, bao nhiêu Junior hoặc Intern.


Hoặc là đơn giản hơn khi Teamleader giao cho bạn một màn hình, anh ý hỏi bạn là em mất bao nhiêu thời gian để làm màn hình này, thì phải dựa vào cái gì để tính toán đây?

![Ước lượng - Chìa khóa của thành công (Ảnh sưu tầm)](https://images.viblo.asia/ae02d437-2508-4766-b5e9-c97f292e6d67.jpg)

Thường thường thì có 2 dạng est cho tất cả các case như mình nói ở trên:

**1. Phổ biến nhất là dựa trên kinh nghiệm.**

Tức là tôi đã làm màn hình này rồi, thì dự kiến khoảng 3 tiếng, cũng có thể có siêu nhân xuất hiện thì thông báo là em cần 40 phút để làm xong cái này.
Ví dụ như các bạn làm Freelancer thì lại áp dụng thêm 1 tiếng khoảng 15$ ~ 20$, thì suy ra được kiếm dc bao nhiêu tiền sau khi làm xong.

Nhưng cách thức này khá là hên xui, ví dụ như nghiệp vụ của cái màn hình đấy gần giống như cái màn mà bạn đã từng làm. thì có vẻ sai số khoảng 5~10%, nhưng nếu nhìn có vẻ giống, mà bên trong lại lòi ra vài chức năng khác, thì sai số là sẽ là rất lớn. 

Ngoài ra cũng còn tùy thuộc vào người thực hiện ước lượng thuộc level nào, bạn đó ước lượng dựa trên kinh nghiệm và khả năng của bạn đó, nhưng trong team, đâu phải ai cũng được như vậy

![](https://images.viblo.asia/0fe4b51e-5f0f-402a-8f01-19fe5a9a2806.png)

Và tất nhiên bạn commit thời gian hoàn thành như thế nào, thì cần phải cố gắng, rồi OT thực hiện đúng commit đó thôi.

Nhưng khả năng là không ai muốn trường hợp đó xảy ra cả.

**2. Cách 2 là dựa trên dự đoán bằng khoa học và công thức tính toán.**

Đây là phương pháp mình đang mong muốn chia sẻ tới các bạn trong phạm vi bài viết này.

Tức là với từng chức năng, màn hình mà mình sẽ cố công thức tính phù hợp để đưa ra con số cuối cùng, và từ con số đó có thể tính toán ra được manhours hoặc LineOfCode.

Các phương pháp này thì thường khả năng sai số chỉ khoảng dưới ~ 15% tùy thuộc vào thời gian áp dụng, thời gian áp dụng ở đây giống như kiểu là vừa làm vừa học và thay đổi trọng số cho phù hợp. Áp dùng cho càng nhiều dự án thì về sau độ chính xác càng cao.

Nghe thì có vẻ to lớn là chỉ áp dụng cho quy mô dự án, nhưng thực tế là những task nhỏ các bạn được leader giao cũng hoàn toàn có thể áp dụng được, và sẽ giảm được rất nhiều rủi ro cho các bạn và dự án.

![](https://images.viblo.asia/a4f64d5a-12f3-4eba-84e5-044fd28a62d0.jpg)

Có khá nhiều phương pháp hỗ trợ mình làm việc này, hôm nay mình xin phép chỉ giới thiệu về phương pháp khá cơ bản là Function Point Analytics (FPA) thôi.

Thực ra trên viblo trước đây cũng có bạn Kim Chi chia sẻ về chủ để này rồi (năm 2016), nhưng có vẻ hơi lý thuyết một chút. Nếu ai có hứng thú thì có thể xem thêm nội dung bài viết này [tại đây](https://viblo.asia/p/gioi-thieu-function-points-analysis-fpa-phuong-phap-dinh-luong-phan-mem-dua-tren-function-points-bxjvZWpmGJZ) .

Về cơ bản là FPA là phương pháp đếm chức năng/item trong một màn hình hoặc cả 1 dự án, sau đó áp dụng công thức để suy ra được điểm, từ số điểm này thì suy ra được 2 cái mấu chốt là LINE OF CODE hoặc là ManHours.

Và tất nhiên từ 2 cái output này thì các bạn hoàn toàn có thể est được task mình làm, hoặc các sếp quản lý có thể tính được dự án này cần làm trong bao lâu và KH cần chi bao nhiêu tiền và cần bao nhiêu người để thực hiện.

Với FPA thì có thể ước lượng được:

- Dự án mới hoàn toàn
- Dự án Maintaince
- Dự án Đang chạy Production

Bên trong đó thì dựa vào 5 yêu tố chính để tính toán ra con số cuối cùng

- Về DB
- Về Màn hình
- Về Input/Output các file bên ngoài hệ thống
- Liên kết đến hệ thống thứ 3
- ...

Tính toán riêng cho từng yêu tố đó và cộng lại thì ra được điểm cuối cùng

Cụ thể ví dụ như khi ước lượng cho một màn hình đăng nhập chẳng hạn.

![](https://images.viblo.asia/e65709b5-0608-4df8-aecc-6c6e026881ac.jpg)

Một màn hình đăng nhập thì thường có 4 items chính

1. UserID
1. Password
1. RememberMe
1. Login Button

Ngoài ra thì còn có thêm các link Lost Password/Create New Account, thực tế 2 cái đó nó link sang màn hình khác rồi, nên có thể gộp chung làm 1 item để tính toán, còn action thì mình lại estimate riêng cho các màn hình đó.

Ở màn hình có 5 items, mỗi item này tùy từng loại sẽ có một trọng số riêng, 

Ví dụ như Textbox, Checkbox, Button, Link thì sẽ có độ phước tạp và point riêng, cái này thì FPA họ đưa ra cho mình pattern sẵn, nên chỉ việc đếm và tính toán.

Sau khi đếm các item trên màn hình rồi, thì bắt đầu đếm thêm các ngoại lệ (exception) có thể xảy ra, ví dụ như có bao nhiêu lỗi có thể xảy ra với màn hình login này, như là:
- Nhập sai tài khoản mật khẩu
- Tài khoản không đúng định dạng
- Lỗi hệ thống (server chết)

Mỗi message này là được cấu hình tĩnh trong code, hay là lấy từ file message tham thiếu, hay là lấy từ DB, hay là lấy ra từ msg của thithparty trả về.

Mỗi cái đó coi như là 1 item và lại có point riêng,

Cuối cùng chúng ta có 1 bảng tổng hợp số lượng item theo phân loại và point tương ứng của màn hình này. 

Có tổng lượng point của màn hình này rồi, thì còn cần thêm 1 bước là nhân với trọng số của ngoại cảnh, có 14 tác nhân ngoại cảnh có thể ảnh hưởng đến con số point cuối cùng, 

Ví dụ như:
- Xử lý phân tán hay không
- Xử lý với performance cao
- Có dùng lại được hay không.
- Triển khai có dễ dàng không.
- ...

Sau khi nhân với trọng số ta sẽ có con số Point cuối cùng, có con số này thì việc còn lại khá đơn giản.

Thường thì có 2 cách chính để output ra kết quả từ con số FPA này, 
1. Output trực tiếp ra Manhours
1. Ouput ra LOC sau đó ra Manhours

Cách 1 thì thường tính toán bằng 1 trọng số, nó được đưa ra dựa trên số lượng project mà chúng ta đã làm trước đây và tính trung bình, tức là ước lượng lại các dự án đã làm, để ra con số Point, sau đó +-*/ để ra số trọng số trung bình để áp dụng cho các dự án sau này.
> Thường thường thì 1FP = 5 hours

Cách 2 thì có vẻ chính xác hơn, từ FP có thể tính toán ra được LOC theo công thức có sẵn, sau đó tùy tự án áp dụng ngôn ngữ lập trình gì thì lại có cách tính toán riêng.

Ví dụ như:
- Javascript/PHP: 67 LOC/FP
- Java/Ruby/Python: 53 LOC/FP

*Ref: http://www.qsm.com/resources/function-point-languages-table*

Ra được số lượng LOC cần cho màn hình, thì có thể dễ dàng suy ra được số giờ cần để làm và bao nhiêu member các loại tham gia. Theo như mình tìm hiểu được thì:
> 1 Senior:  1 giờ = 100 ~ 400 LOC
>  
> 1 Junior: 1 giờ = 50 ~ 100 LOC

Tất nhiên là LOC sau review, không bao gồm các dòng blank và theo một số tiêu chuẩn Coding Standard.

Rồi cứ từ đó sẽ tính toán ra được số người cần làm cho cả 1 dự án, và hết bao lâu thì có thể release được!

Hy vọng bài viết mình chia sẻ hôm nay sẽ có ích để hỗ trợ có cách nhìn mạch lạc hơn về việc ước lượng, tính toán về thời gian làm khi nhận được một yêu cầu cụ thể hoặc mơ hồ.