# Lời mở đầu

Xin chào, sao bao ngày bận rộn thì cuối cùng mình đã trở lại rồi đây. Lâu quá rồi không viết cái gì, những nghiên cứu cũ cũng mốc meo hết cả lên rồi thế là thôi, không đụng tới nữa, bắt đầu chuỗi bài viết mới thôi. Chọn một chủ đề để viết cả loạt bài cho đủ KPI cũng thật vất vả, cuối cùng mình cũng đã chọn được một chủ đề cũng khá là thú vị, đó là security. 

Dev nhà mình tuy giỏi giang là thế, những đối với các vấn đề liên quan đến security thì ôi thôi, bay màu hết 50%. Tới mình thì mình cũng thực sự hoảng loạn khi bỗng dưng khách hàng hỏi mình về security của dự án. Thế là phải hỏi bác gu gồ , bác stack overflow... thế là có lí do để viết cái series này. Mà security thì cũng có đủ thứ trên đời, mấy anh hacker phải nói là đỉnh, hack đến độ còn cái nịt cũng hack nốt, không chừa thứ gì, nên nếu mà nghiên cứu hết mọi khía cạnh thì em xin bỏ cuộc, sức em có hạn, hahaa. Đùa vậy thôi chứ mình cũng không có đủ thời gian và năng lực để theo đuổi cái ngành bảo mật này thật, nên chỉ là tìm hiểu quanh những gì gặp phải trong dự án thôi. Mà thời buổi này, nhà nhà dùng API, người người dùng API, độ phổ biến của API chắc cũng khỏi cần nói đến lý do nữa nhỉ nên vấn đề bảo mật API cần phải được chú trọng. Vậy là mình xin được giới thiệu về API security.

Yay cuối cùng cũng chốt được chủ đề. Nào cùng bắt đầu tìm hiểu thôi.


# API security là gì và tại sao lại phải cần nó?

Đơn giản API security là sự bảo vệ cho các API của bạn sợ hữu hoặc đang sử dụng. Đó là những chiến lược, giải pháp để ngăn chặn, giảm thiểu các lỗ hổng bảo mật và các rủi ro do việc sử dụng API mang tới.

Như các bạn cũng biết là API là một phần không thể thiếu đối với việc thiết kế và phát triển application. Nó được sử dụng trong bất cứ application thuộc bất cứ lĩnh vực nào: tài chính, bán hàng, quảng cáo, IoT... hoặc nói gì đâu xa, microservices đang là hướng phát triển application chủ đạo hiện nay và API là giải pháp phổ biến nhất để giao tiếp giữa các services. API được sử dụng để làm cầu nối giữa các services, cung cấp các dịch vụ và quan trọng nhất là truyền dữ liệu. Và dữ liệu là thứ mà các anh hacker thèm muốn.  Chính vì thế, cũng dễ hiểu khi API là mục tiêu tấn công hàng đầu của mấy ảnh. Nếu không được bảo mật đầy đủ, các thông tin này có thể bị lộ, từ đó hacker có thể đoán được logic hiện tại, các thông tin mật của khách hàng... và gây thiệt hại nặng nề. Và chẳng ai mong muốn mình bị hack cả. Chính vì thế bảo mật API nên là vấn đề được quan tâm đối với bất kì ứng dụng nào đang sỡ hữu và sử dụng API.


# OWASP API Security: top 10 vấn đề bảo mật API thường gặp

Cho những ai chưa biết thì OWASP (Open Web Application Security Project)  là một tổ chức phi lợi nhuận hoạt động với tiêu chí cải thiện, nâng cao tính bảo mật của các phần mềm. Thông qua các dự án của họ (chẳng hạn như API Security project), OWASP trờ thành nguồn cung cấp các vấn đề và giải pháp hiệu quả cho việc bảo mật nhờ tạo dựng được một mạng lưới thành viên khổng lồ và trải rộng trên toàn thế giới. Từ đó tạo nên một lượng tới các tool và resources. Bên cạnh đó OWASP còn tập trung vào mảng giáo dục và đào tạo để bảo đảm chất lượng dài lâu. Chính vì thế OWASP trở thành lựa chọn hàng đầu khi bạn muốn tìm hiểu hoặc giải quyết các vấn đề bảo mật của mình. 


Và sau đây là 10 vấn đề của API security thường gặp do OWASP thống kê năm 2019 và không thay đổi cho tới nay. Điều này có nghĩa là đây thực sự là những vấn đề cần được chú ý hàng đầu và cần được đảm bảo. Đây là những điều cơ bản nhất không được vi phạm. Tuy nhiên vì mục đích không phải chỉ là giới thiệu lí thuyết suông nên mình xin phép được chia nó thành 2 bài viết, mỗi bài viết sẽ giới thiệu 5 vấn đề bảo mật để có thêm không gian cho việc đưa ví dụ và giải thích, giúp các bạn hiểu rõ bản chất của các vấn đề. Mong các bạn thông cảm nhé. Vì đảm bảo KPI thôi chứ tháng này sung thì tháng sau đói ạ.

## 1. Broken Object Level Authorization

![](https://images.viblo.asia/7b58850c-2265-41ff-8eef-b19f632cd405.jpg)

Thông qua hình ảnh, các bạn cũng dễ hình dung được nó là gì rồi ha. Đây là vấn đề cơ bản về phân quyền đối mà hầu hết các dev đề gặp phải.

Ví dụ như: Hacker biết được API của chúng ta có dạng `/api/{companyId}/allUser` và anh ta tiến hành thử nghiệm bằng cách thay thế từng `companyId` một. Điều gì sẽ xảy ra nếu nhưng API không kiểm tra quyền truy cập dữ liệu? Rất dễ đoán, toàn bộ thông tin user của các công ty sẽ bị lộ và thế là chúng ta toi. Việc thiếu kiểu tra quyền đã dẫn đến việc hacker có thể xem được thông tin của tất cả các công ty. 

Nếu như chúng ta thêm policy là user công ty nào chỉ xem được thông tin của công ty đấy thì sẽ giảm bớt được rủi ro. Hacker nếu có thông tin của user công ty A thì sẽ không xem được thông tin của công ty B. Thế còn trường hợp user Admin bị lộ thì sao? Có gì khác?
Thì vấn đề bảo mật ở đây ngoài sự thiếu xót trong kiểm tra quyền hạn mỗi khi client request thì vấn đề nổi bật chính là sử dụng `companyId` dễ đoán. Việc dùng `companyId` mang tính tuyến tính đã mang lại rủi ro rất lớn và nếu như Authorization không tốt, hacker có thể lấy toàn bộ thông tin một cách dễ dàng. Các API endpoint thường sử dụng object identity và các hacker có thể khai thác nó bằng một cuộc tấn công dạng IDOR (Insecure Direct Object Reference - tham chiếu các đối tượng không bảo mật) và nếu thiếu xót trong việc kiểm tra quyền truy cập dữ liệu thì cuộc tấn công sẽ diễn ra dễ dàng và thông tin sẽ bị lấy mất

Cách phòng chống cho trường hợp này là:

* Check authorization mỗi lần client request và nên có hệ thống phân quyền có cấp bậc. Chẳng hạn userA chỉ có thể xem thông tin của userA, không thể xem được thông tin của userB. Chỉ có admin có thể xem được danh sách toàn bộ user, tuy nhiên admin cũng chỉ được trích xuất các thông tin public của user. Phải có phân quyền đặc thù mới có thể xem được toàn bộ data.
* Không nên sử dụng các field dễ đoán như ID tăng dần mà hãy sử dụng random ID (UUID) để không ai có thể đoán ra được. Trường hợp may mắn thì cũng không thể nào lộ được quá nhiều thông tin.


## 2. Broken Authentication

Vấn đề Authorization (`AuthZ`) chưa xong thì ta lại đến với Authentication (`AuthN`). À mà ai chưa biết phân biệt được 2 cái này thì nên bỏ chút thời gian để tìm hiểu đi nhé, cái này quá cơ bản rồi nên mình sẽ không nhắc lại khái niệm đâu. Đến cả AuthN và AuthZ còn không phân biệt được thì hãy xem lại bạn có thực sự nghiêm túc với công việc của mình hay chưa nhé.

Để dễ hiểu thì mình sẽ tiếp tục với một ví dụ:

Với các hệ thống Authentication, việc apply OAuth và sử dụng access token trở nên phổ biến. Thông thường access token thường được lưu ở cookies và hacker có thể dễ dàng lấy được access token này. Thông qua việc nắm được access token, harker có thể giải mã nó là lấy được thông tin như sau
```
{
    "username": "trinhlvtq",
    "role": "user"
}
```

và với sự phán đoán của mình, anh ta sửa username thành `administrator`  và role thành `admin` sau đó mã hóa và thay thế access token hiện tại trong cookies. Và lúc này hacker chiếm đoạt thông tin trong hệ thống với một user có role cao hơn. Điều này thực sự nguy hiểm.

Hoặc ví dụ khác với API yêu cầu cung cấp lại mật khẩu và bắt nhập SMS token, hacker tạo và gửi hàng loạt request với các SMS token khác nhau (thường là 6 số, tầm 1 triệu request) thì sẽ có một cái thành công nếu như cơ chế xác thực chỉ đơn giản là check SMS token valid.

```
POST authN/resetpassword/verificationSMS/
{
    "username": "trinhlvtq",
    "SMSToken": "123456"
}
```

Qua ví dụ các bạn chắc cũng hiểu sơ lược về các vấn đề xác thực và cũng không mấy ngạc nhiên khi nó nằm ở Top 2 trong OWASP. Xác thực là cách cổng đầu tiên cần phải vượt qua khi muốn đánh chiếm hệ thống thì tất nhiên mấy hacker chẳng thể nào mà bỏ qua được. Các nguyên nhân có thể kiến hệ thống AuthN sụp đổ có thể là:

* Do cơ chế xác thực đơn giản, không đi theo những phương pháp hiệu quả hiện nay. 
* Thiếu xót các thành phần vadilation trong access token (chẳng hạn verify signature trong JWT) 
* Sử dụng mật khẩu yếu hoặc các cơ chế mã hóa lạc hậu, hash ngây thơ không dung salt...
* Cơ chế xác thực không đối ứng được các trường hợp tấn công cường độ lớn
* Sử dụng token vĩnh viễn, không hết hạn

Từ những nguyên nhân ở trên, ta có thể đưa được các cách phòng chống chủ yếu:

- Áp dụng mọi phương thức AuthN hiệu quả hiện nay 
- Thêm các xác thực khác như xác thực app để biết request được gửi bằng cách nào
- Sử dụng token có lifetime ngắn hạn
- Sử dụng giới hạn AuthN và có các chính sách khóa 
- Đối với mật khẩu hoặc các thông tin bảo mật khác, cần được áp dụng các cơ chế mã hóa tối tân, chưa được bẻ khóa hiện nay

## 3. Excessive Data Exposure

Đây cũng là một vấn đề thường xuyên xảy ra, chủ yếu là do lỗi con người, thiếu sự gắn kết giữa front-end và back-end. Đã bao giờ bạn tự hỏi, tại sao phải thực hiện search dữ liệu ở phía server (backend) mà không phải là ở (frontend) chưa? Không hẳn là do việc get và trả về full data tốn rất nhiều cost, giảm performance mà có còn là về vấn đề bảo mật. Sẽ có những data mà client không được phép truy cập và việc trả về full data là quá mức cần thiết. Ví dụ như việc truy vấn thông tin user, chuyện gì sẽ xảy ra nếu như phía server trả về list tất cả user và client xử lý để lấy ra đúng user client mong muốn. Hacker sẽ thông qua API là lấy đi tất cả thông tin user đó.  Đây là một ví dụ điển hình cho vấn đề bảo mật truy cập dữ liệu quá mức cần thiết.

Một ví dụ khác với API getBill chẳng hạn thì thay vì thông tin user trong bill_to chỉ bao gồm là username, address

```
{
    "billTo": {
        "user": {
             "username": "tringlvtq",
             "address": "sun asterisk"
        }
    }
}
```


thì data lúc này là full User model
```
{
    "billTo": {
        "user": {
             "username": "trinhlvtq",
             "password": "hashstring",
             "address": "sun asterisk"
             "dob": "01/01/2001",
             "creditCard": "0000 0000 0000 0000",
             "creditCardSecret": "no please dont show me no please nooooooooo",
             "...":  "..."
        }
    }
}
```

chỉ một chút nhầm lẫn về user model cần trả về, thông tin cá nhân của user đã bị lộ, và nếu như mật khẩu trong trường hợp trên có thể giải mã được, thì user có thể bị hacker chiếm đoạt tài khoản bằng cách tạo thêm 1 đống bill khác. Hay thông tin credit card của user bị lộ, thời của credit card chùa đây rồi. Vấn đề này thực sự nguy hiểm đối với người dùng cuối và nó xảy ra bởi vì nguyên nhân dev chúng ta không xử lý tốt thông tin.

Vì vậy, có thể phòng chống bằng cách:

* Xác định rõ đâu là thông tin nhạy cảm không được phép lộ ra, hoặc phải có lí do chính đáng để cho phép trích xuất dữ liệu (AothZ policy). Thông tin nhạy cảm ở đây có thể là `PII (Personally Identifiable Information)`, `PCI (Paymemt Card Industry` hoặc các thông tin quan trọng khác
* Không bao giờ t thực hiện filter data ở phía client. 
* Phải có sự thống nhất rõ ràng từ cả 2 phía backend và front trong việc thiết kế và xây dựng API để xác định rõ data cần thiết cho mỗi API response 
* Thêm xử lý kiểm tra cần thiết đối với các data response, ngăn chặn nếu như dữ liệu đó nằm trong blacklist


## 4. Lack of Resources & Rate Limiting

Thông thường, chẳng có giới hạn nào đối với số lượng cũng như lượng tài nguyên API request cả. Điều này có thể dẫn đến một số vấn đề sau:

Nhận nhiều API request hơn mức khả năng API server có thể xử lý hoặc gửi API request nhanh hơn tốc độ API server có thể xử lý. Ví dụ như hacker lấy được API request thay đổi mật khẩu của user và tạo hàng loạt các request tương ứng gửi lên phía server. Và kết quả server update password bằng API request của hacker thay vì của client.

Kích thước của request vượt quá khả năng API server xử lý chẳng hạn như "Zip bombs", server xử lý unzip và bùm, file giải nén chiếm hết dung lượng tài nguyên của server và server không có khả năng xử lý thêm bất cứ thứ gì (Denial of Service hay DoS). Mà các bạn cũng biết hậu quả khi bị DoS là gì rồi đây.

Những cách phòng chống có thể nghĩ ra được:

* Giới hạn payload size và kiểm tra tỉ lệ nén file, xác định giới hạn của server và có biện phát scale hợp lý 
* Đối với các phương thức API request, cần có những biện pháp phù hợp với thời gian xử lý. Ví dụ như cần có cơ chế cache data cho GET request để giảm thiểu thời gian xử lý đối với những request giống nhau. Hoặc thêm các xác thực đối với các PUT request (chẳng hạn dùng eTag) để xác định version dữ liệu, từ đó chặn các request có data bất thường.


## 5. Broken Function Level Authorization

Và lại thêm một vấn đề nữa của AuthZ. Ở top 1 chúng ta có Object Level, tức là vấn đề liên quan đến việc sử dụng Object identity dễ đoán và thiếu xót trong việc kiểm tra quyền khi truy vấn thông tin từ các đối tượng. Thì ở function level có gì khác. Một ví dụ đơn giản đó là API getListUser, thì rõ ràng chỉ có admin mới thể thể sử dụng chức năng này. Nhưng không, vì một sai lầm của AuthZ, function này lại không kiểm tra phân quyền của user. Và thế là hết.

![](https://images.viblo.asia/63b7ad41-8a02-4d91-b7e6-640e15ed8026.jpg)

Hình ảnh minh họa cũng khá giống với mục 1 nhưng các bạn đừng có nhầm lẫn nha. Mục 1 là đoán Id còn mục này là đoán function. Mức độ đoán tương đối khó hơn nên nó nằm ở top 5 chứ không phải top 1 như Object level. Và vâng, ở function level, cũng tồn tại các vấn đề tương ứng là vấn đề về phân quyền sử dụng function và tên function được sử dụng. Tuy nhiên thì về tên function không phải là vấn đề chính ở mục này.

Thì cách phòng chống nó sẽ là:

* Mặc định là từ chối tất cả các request anonymous
* Phân quyền chặt chẽ đối với tất cả các API. Có thể phân quyền theo từng role hoặc chia thành các group để có thể sử dụng.
* Triển khai các function access control trên server, không bao giờ xử lý trên client


# Lời kết

Viết thế là đủ dài rồi, toàn lý thuyết chắc các bạn chán lắm đúng không? Nhưng biết làm sao được, phải nắm được nội dung các vấn đề thì chúng ta mới biết đường mà triển khai đối ứng. Bài viết này chỉ với mục tiêu là giới thiệu cho các bạn biết về những vấn đề bào mật API phổ biến hiện nay, còn muốn đào sâu hơn vào từng vấn đề, cũng như cách triển khai ở mặt code thì hẹn các bạn ở bài viết khác nhé.

Xin chào và chúc một ngày tốt lành. Cảm ơn các bạn đã đọc bài viết


# Tham khảo

https://owasp.org/www-project-api-security/

https://apisecurity.io/encyclopedia/content/owasp/owasp-api-security-top-10.htm