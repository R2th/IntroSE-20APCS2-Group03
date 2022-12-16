Chắc hẳn những mẩu chuyện dưới đây sẽ không xa lạ với mọi người trong những năm gần đây:
![](https://images.viblo.asia/39943676-074d-4c01-b626-233c405b3e64.png)

![](https://images.viblo.asia/aa20574d-1d68-43f0-afd9-caa731ad4803.png)

Đó là những ví dụ thực tế về việc người dùng bị mất tiền trong tài khoản ngân hàng của mình được báo chí đưa tin rất nhiều trong thời gian gần đây. Vậy nguyên nhân của những vụ việc này đến từ đâu? Phải chăng việc chiếm đoạn tiền từ ngân hàng là rất dễ dàng do hệ thống bảo mật của ngân hàng còn yếu? Hay do hacker quá giỏi, có thể làm được những điều "phi thường" như vậy? Hay chỉ đơn giản đến từ chính những chủ nhân của các tài khoản ngân hàng này? Để Có được câu trả lời thỏa đáng, mới các bạn theo dõi bài viết dưới đây.

# Phân tích yếu tố kỹ thuật
## Hệ thống công nghệ thông tin ngân hàng
Các ngân hàng ngày này đều có hệ thống Công nghệ thông tin (CNTT) được đầu tư khá lớn về cả nhân lực vận hành cũng như chi phí để có thể đảm bảo an toàn cho hệ thống của chính họ. Tôi đã từng làm việc ở ngân hàng T một ngân hàng lớn  ở Việt Nam nên tôi hiểu được rằng để có thể tấn công được vào hệ thống CNTT của họ cũng không đơn giản chút nào. Ở đó họ có hệ thống giám sát liên tục 24/24 (được gọi là SOC), hệ thống máy chủ cũng như mạng được bảo vệ nhiều lớp, hệ thống sử dụng rất nhiều những sản phẩm giúp bảo vệ an toàn cho hệ thống của họ. Chưa kể đến nhân sự về an toàn bảo mật của họ cũng là những người có kỹ thuật chuyên môn và kinh nghiệm lâu năm trong ngành bảo mật. Vì vậy, việc hệ thống ngân hàng bị hacker tấn công chiếm đoạt tiền của khách hàng là khá khó. Dĩ nhiên, không có gì là tuyệt đối nhưng tôi tin rằng việc này làm là không hề dễ. Chưa kể đến, nếu bạn có đủ giỏi để làm được việc đó thì tôi tin các ngân hàng cũng có thể đủ năng lực để lần tìm ra bạn là ai, hay chậm chí là tìm đến tận nhà để đòi tiền hay bắt bạn phải chịu trách nhiệm với hành vi của mình:

Nhưng cũng không phải những ngân hàng lớn này đã an toàn tuyệt đối, thi thoảng đâu đó chúng ta vẫn nghe những thông tin về việc ngân hàng X, ngân hàng Y bị lộ dữ liệu người dùng. Ví dụ như vụ việc đình đám: 
>Trong năm 2019, trên diễn đàn hacker nổi tiếng Raidforum, một tài khoản đã đăng tải bài viết khẳng định đang nắm giữ thông tin của 2 triệu khách hàng tại một ngân hàng T***. Xem thêm [tại đây](https://thanhnien.vn/thoi-su/2-trieu-du-lieu-ngan-hang-nghi-bi-hacker-danh-cap-1151066.html).
Những thông tin này là thông tin của khách hàng cần được bảo vệ, và thực sự đã có vấn đề ở đây. Nhưng nó cũng chưa thể khiến chúng ta mất tiền ngay được.

## Khi thực hiện các giao dịch
Tiếp đến chúng ta xem khi thực hiện các giao dịch chúng ta cần những gì?
Thứ nhất, Tài khoản đăng nhập vào các ngân hàng để dùng các dịch vụ internet banking, mobile banking ... những thông tin này do ngân hàng cấp và đương nhiên là chỉ chủ tài khoản ngân hàng đó biết. Một số ngân hàng còn yêu cầu mật khẩu của khách hàng phải đủ mạnh và thực hiện đổi định kỳ, không chia sẻ với người khác.

Thứ hai, khi thực hiện các thao tác hay giao dịch, chúng ta cần thêm 1 yếu tố là xác thực 2 bước 2FA, thường sẽ là mã gửi về điện thoại di động của khách hàng thông qua số điện thoại di động mà khách hàng đăng ký trước đó với ngân hàng thông qua hình thức SMS hoặc soft-token (Mã sẽ được tạo ra trong ứng dụng và gửi về trên ứng dụng trên điện thoại). Các đoạn mã này là các đoạn mã có độ dài 6-8 ký tự, được tạo ra ngẫu nhiên và chỉ có hiệu lực trong một khoảng thời gian ngắn (1-3 phút). Mà chỉ khi nhập đúng mã này thì giao dịch của các bạn mới có thể thực hiện thành công.

Tài khoản chỉ mình tôi biết, điện thoại tôi cầm trong tay vậy ai có thể lấy được tiền của tôi chứ? Chính xác, điều đó hoàn toàn đúng. Nhưng nó chỉ đúng khi bạn không tiết lộ nó cho ai, và không ai xem được nó.

**Vậy tại sao tài khoản của khách hàng vẫn vị mất tiền??**
# Social engineering
Câu trả lời là đây, hacker sử dụng kỹ thuật social engineering để thực hiện các cuộc tấn công đánh cắp tiền của khách hàng.
Sơ qua về Social Engineering là gì.
> Social Engineering (hay tấn công phi kỹ thuật) là thuật ngữ phổ biến trong lĩnh vực bảo mật thông tin, mô tả kiểu tấn công sử dụng các hình thức thao túng hành vi của con người thay vì tập trung khai thác các lỗ hổng bảo mật của máy móc, thiết bị. Qua đó, kẻ tấn công có thể đạt được các mục đích của mình như xâm nhập vào hệ thống, truy cập thông tin quan trọng,… mà không cần phải thực hiện những kỹ thuật tấn công quá phức tạp. 
![](https://images.viblo.asia/94244ae2-64ab-4162-8ece-7d0f9ea2c8f4.jpg)

## Phân tích quá trình tấn công
Có rất nhiềU kịch bản tấn công khác nhau, nhưng phổ biến nhất vẫn là lợi dụng lòng tham của các nạn nhân hacker sẽ thực hiện lừa đảo người dùng trúng các phần thưởng có giá trị lớn và yêu cầu người dùng xác nhận bằng tài khoản ngân hàng để từ đó chiếm đoạt tài khoản và lấy cắp tiền. Hoặc hacker giả danh thành các đơn vị như công an, cảnh sát, nhân viên ngân hàng để lừa đảo người dùng cung cấp thông tin tài khoản ngân hàng

Dưới đây là một ví dụ minh họa:

### Bước 1: Dụ người dùng truy cập vào website lừa đảo
Lợi dụng lòng tham của nạn nhân, hacker gửi đến khách hàng một đoạn tin nhắn hoặc email với nội dung:

> Chúc mừng bạn X, bạn là một trong 100 người may mắn nhất trong chương trình "Tri ân khách hàng" của nhãn hàng Y. Phần quà của bạn là phần thưởng tiền mặt trị giá 500 triệu đồng. Để nhận thưởng, mời bạn truy cập vào link: https://nhanthuongtrian-xbank.com.vn  để xác nhận tài khoản trả thưởng.

![](https://images.viblo.asia/767cae7d-cec6-4850-b6bb-f09978710a96.png)


Đây là website được hacker tạo ra trước đó với giao diện giống hệt của ngân hàng X nhưng tên miền thì không phải của X. Hacker có thể sử dụng các công cụ để tạo ra một website y hệt với giao diện giống website thật như: SEtoolkit trong Kali Linux (tham khảo thêm [tại đây](https://www.thekalitools.com/2017/03/huong-dan-tao-web-phishing-voi-setoolkit.html). Dĩ nhiên được trúng thưởng ai mà chẳng mừng, nạn nhân sẽ click ngay vào trang website đó. Khi mở website ra, một website với giao diện y hệ của ngân hàng vietcombank được mở ra. Và không nghi ngờ gì, người dùng sẽ nhập tài khoản và mật khẩu để đăng nhập.


### Bước 2: Lấy mã OTP thực hiện giao dịch
Ngay sau khi người dùng nhập vào tài khoản ngân hàng user/password sẽ thấy một pop-up hiện ra yêu cầu nhập vào đó mã OTP. Thực chất là sau khi chiếm được tài khoản, hacker sẽ thực hiện ngay lập tức tạo ra một giao dịch chuyển tiền vào tài khoản ngân hàng của hacker, và cần mã OTP để hoàn tất giao dịch. Cùng thời điểm đó OTP được gửi về điện thoại của khách hàng, khách hàng nhập vào ô op-up hiện lên trên website giả mạo và hacker sẽ ngay lập tức sử dụng mã OTP này để thực hiện hoàn tất giao dịch.

Hoặc một kịch bản khác ở đây, hacker sẽ lấy điện thoại (dĩ nhiên không phải sdt của ngân hàng) để gọi cho nạn nhân và lừa nạn nhân cung cấp mã OTP để hoàn tất giao dịch.

![](https://images.viblo.asia/774c08f4-b5f1-44fc-b11b-67ceb7f55591.png)


Vậy là chả cần có được điện thoại của nạn nhân, hacker vẫn có được mã OTP một cách đơn giản
### Bước 3: Mất tiền
Đến đây thì bạn nhận được một thông báo rẳng tài khoản của ngân hàng của bạn đã bị trừ một số tiền và dĩ nhiên cũng chả có 500 triệu nào được chuyển về tài khoản của bạn hết.

# Trách nhiệm thuộc về ai?
Đến đây, việc làm của khách hàng đầu tiên sẽ là kêu với ngân hàng. Người nào hiểu biết kỹ thuật và quan tâm tin tức một chút thì sẽ hiểu và nhanh chóng thông báo tới ngân hàng để khóa tài khoản cũng như nhờ ngân hàng hỗ trợ để tìm ra kẻ lừa đảo. Người nào suy nghĩ "quá nhạy bén" sẽ kêu trời rằng ngân hàng bị hack rồi, tôi không làm gì mà tài khoản của tôi bị mất tiền.

Vậy ngân hàng có phải chịu trách nhiệm ở đây không? Câu trả lời là không các bạn nhé. Trách nhiệm của ngân hàng là họ đã thực hiện việc cảnh báo tới khách hàng liên tục qua nhiều kênh thông tin khác nhau để tránh các gian lận lừa đảo. Và dĩ nhiên là việc lừa đảo này là do nhận thức của khách hàng chưa đủ nên bị lừa. Ngân hàng ở đây sẽ có thể hỗ trợ bạn để tìm ra kẻ chủ mưu lừa đảo thông qua việc phối hợp với cơ quan công an. Và dĩ nhiên, đây là khi bạn mất một khoản tiền lớn. Còn nếu với một số tiền quá nhỏ, thì đến 96,69 % là bạn sẽ không thế lấy lại được tiền của mình. Vì dĩ nhiên bạn cũng chẳng thể kiện ngân hàng việc này, vì ngân hàng không hề làm sai điều gì cả.

Rất may là nhiều ngân hàng sẽ hạn chế được việc mất số tiền quá lớn bằng cách nếu bạn thực hiện giao dịch với một số tiền quá lớn, giao dịch sẽ không thực hiện ngay mà sẽ có xác nhận từ phía ngân hàng cho giao dịch này. Nếu là giao dịch của chính bạn, nó sẽ được thực hiện. Còn nếu là do bạn nhầm hoặc bị lừa đảo, thì ngay lập tức số tiền đó sẽ được phong tỏa và bạn sẽ không mất số tiền đó.

Vậy trong trường hợp nào thì tôi được ngân hàng đền bù? Đương nhiên nếu thực tế hệ thống CNTT ngân hàng có lỗ hổng bảo mật hoặc bị tấn công dẫn đến khách hàng bị mất tiền thì họ sẽ có trách nhiệm giải quyết và đền bù thiệt hại cho khách hàng.

Vậy chốt lại là trong trường hợp bị lừa đảo thế này ngân hàng sẽ không có trách nhiệm phải trả lại tiền bạn, vì lỗi không phải do họ, họ chỉ có trách nhiệm giúp bạn tìm ra thủ phạm và hỗ trợ bạn các vấn đề liên quan. Còn dĩ nhiên, nếu bạn may mắn tìm ra được thủ phạm hoặc biết đâu ngân hàng vẫn giúp bạn lấy lại số tiền đã mất. Dù rất hiếm nhưng cũng không phải không có ngoại lệ
# Vậy chúng ta cần làm gì để bảo vệ chính mình
Vậy làm sao để chúng ta không bị lừa đảo mất tiền? Một số lưu ý cho các bạn để tránh những sự cố đáng tiếc xảy ra:
1. Đừng vì lòng tham mà tin vào mấy cái thông báo trúng thưởng trên mạng, nó không dễ dàng như chúng ta tưởng. Vì nếu có trúng thưởng thật cũng cần vô vàn các bước, thủ tục giấy tờ, xác nhận các kiểu thì bạn mới còn nhận được phần thưởng đó
2. Luôn cảnh giác với các trang website có giao diện giống với ngân hàng (Kiểm tra thật kỹ url website có đúng là địa chỉ website chính xác của ngân hàng hay không)
3. Tuyệt đối không cung cấp tài khoản, mật khẩu, otp cho bất kỳ ai kể cả đó là nhân viên ngân hàng vì bản thân ngân hàng không bao giờ yêu cầu điều này
4. Đặt mật khẩu mạnh, thường xuyên cập nhật mật khẩu tài khoản ngân hàng để tránh việc lộ thông tin tài khoản
5. Luôn nâng cao ý thức cảnh giác đối với bản thân và người xung quanh, cập nhật tin tức thường xuyên để tránh trở thành nạn nhân các cuộc tấn công
6. Luôn nhớ một điều, đồng tiền đi liền khúc ruột. Nếu bản thân không có trách nhiệm tự giữ cho mình thì không trông mong vào người khác.