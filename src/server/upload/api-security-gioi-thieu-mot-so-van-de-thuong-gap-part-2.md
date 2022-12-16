# Lời mở đầu

Xin chào, hôm nay chúng ta sẽ tiếp tục với bài viết lần trước, lần nãy sẽ là giới thiệu 5 vấn đề còn lại trong Top 10 OWASP API security. Phần đầu tiên chủ yếu là về Authentication và Authorization, vậy phần tiếp theo sẽ là gì đây, cùng tìm hiểu nhé.

# Mass Assignment

Việc sử dụng các framework trong lập trình là điều vô cùng thiết thực, nó giúp ta tiết kiệm ra nhiều thời gian trong quá trình phát triển dự án. Tuy nhiên, thì framework cũng do các dev chúng ta tạo ra và tất nhiên là nó sẽ có những lỗ hổng bảo mật nhất định. Bởi vì rằng thì là, framework chỉ đưa ra một các khung nhất định, không thể xử lý hết tất cả các vấn đề có thể phát sinh được. Chính vì thế, chúng ta cần phải tìm hiểu rõ ràng những vấn đề tồn động trong framework để từ đó đưa ra cách phòng chống hiệu quả. Một lỗ hổng điển hình khi sử dụng framework đó chính là binding data từ API request sang object properties trong hệ thống. Request chỉ field gì chỉ cần match với object properties là ok. Về mặt logic, framework xử lý không hề sai. Bind parameters từ API sang object properties đúng thế cơ mà. Thế cái sai ở đây là gì? Thì ví dụ nhé:

chẳng hạn ta có một API để create user info

```
POST /{userGUID}/userInfo với access token hợp lệ và payload như thế này

{
    "username": "trinhlvtq",
    "dob": "01/01/1111",
    "address": {
        "unitNumber": "1",
        "streetNumber",
        "streetName",
        "...": "..."
    }
}
```


và có một anh hacker nhanh tay nắm được request này và chỉnh sửa lại payload, thêm 1 số field mà anh ta cho là sẽ có trong hệ thống và nó có thật

```
POST /{userGUID}/userInfo với token hợp lệ và payload như thế này

{
    "username": "trinhlvtq",
    "password": "yyyyyyyy",
    "dob": "01/01/1111",
    "address": {
        "unitNumber": "1",
        "streetNumber",
        "streetName",
        "...": "..."
    },
    "isAdminUser": true
}
```

và hệ thống bind sang class Users với không một lỗi lầm. 

```
var currentUser = getUserByID(userGuid);
var userInfo = new UserInfo(req.body);
currentUser.UserInfo = userInfo;
currentUser.save(); 
```

và thế là thông tin user được lưu. Và chuyện gì sẽ xảy ra. Oh hell no. Lỗi của ai bây giờ.

Thì chắc các bạn cũng nhận ra được vấn đề ở đây là gì. Đó là update những field không mong đợi. Và nó được update thông qua cơ chế binding dữ liệu của framework, một chức năng khá tiện khi chúng ta làm việc với API. Và tất nhiên, đây là điều không mong muốn và là một trong những lỗi bảo mật phổ biến vì harker nắm rõ vấn đề của framework nằm ở đâu và cứ thế mà tấn công thôi.

Và việc phòng chống, tất nhiên là với suy nghĩ của một dev bình thường như mình, cũng có thể nghĩ ra được. Đó là tạo whitelist hay blacklist các field cần xử lý. Đối với từng endpoint, phải chỉ định rõ ràng những field được phép xuất hiện và chỉ lấy dữ liệu từ những field đó. Hay tạo ra một data model trung gian với những properties cần thiết để binding và sau đó mới mapping vào object trong hệ thống. Đây là cách cơ bản và phổ biến cho trường hợp này. Không có gì là khó, cái khó ở đây là bạn thiếu hiểu biết và bỏ qua vấn đề này thôi.


# Security Misconfiguration

Cái này mới là cái đặc biệt quan trọng mà hầu như ai cũng gặp phải. Đây có thể là lỗi bất cẩn của cá nhân mà từ đó mở ra cánh cổng cho harker đột nhập. Hoặc là sự thiết xót trong việc thiết lập bảo mật. Hẳn các bạn còn nhớ những vụ việc liên quan đến upload source lên repo mà repo đang setting là public. Hay là mãi mê test endpoint dưới local nên để allow anonymous request cho tiện rồi khi deploy lại quên edit. 

Hiểu đơn giản , security misconfiguration là sự thiếu xót hay sai sót khi thiết lập các phương thức bảo mật cho hệ thống, ở đây là web application. Các vấn đề cơ bản như:
- không thay đổi cấu hình mặc định, sử dụng các user mặc định... hay đơn giản là giữ nguyên debug mode ở các môi trường khác. Ví dụ thay vì show error page thì show hẳn màn hình chứa stack trace.
- thiếu cài đặt cấu hình HTTP header, CORS policy.
- tồn tại các endpoint không cần thiết. Chẳng hạn khi dùng auto tạo CRUD API, chúng ta chỉ sử dụng PUT hoặc POST nhưng vì tạo bằng command nên dư ra GET hoặc DELETE, và chúng ta quên mất việc xóa chúng, cứ để đấy cho hacker sử dụng.
- không cài đặt bảo vệ cho file và thư mục. Chắc chúng ta cũng không mấy xa lạ với Apache web server mà màn hình trang index của nó. Nó hiện ra list các file và thư mục mà nếu không có cài đặt quyền xem xóa chỉnh sửa thì hacker có thể đảo lộn toàn bộ hệ thống của bạn. Nghe đáng sợ chưa.


Và để phòng chống thì tất nhiên bạn phải có check list cho những vấn đề này và phải kiểm tra từng cái một trước khi thực hiện merge hay deploy bất cứ thứ gì. Những thứ có thể setting thì hãy setting nó. Hạn chế để setting default trừ những trường hợp bắt buộc nó phải thế. Những tài khoản mặc định như administrator, root không nên tồn tại trong hệ thống. Vì đa số trường hợp xử dụng những tài khoản này thì mật khẩu cũng không quá khó đoán đâu.  Một số gạch đầu dòng cho check list như:

- Xóa bỏ các tính năng không cần thiết (vd: những API dư thừa)
- Thiết lập các chính sách về request header, CORS, domain white list...
- Xác định rõ các output, đặc biệt khi xảy ra lỗi.
- Giới hạn quyền hạn của người quản trị mà hãy chia nhỏ ra, không nên có một superuser có toàn quyền thao túng hệ thống. Mà thay vào đó là một vài admin với những vai trò nhất định cùng quản lý hệ thống.


# Injection

Một vấn đề cũng phổ biến không kém đó là injection. Injection ở đây bao gồm các thể loại từ SQL, no SQL, OS Command cho tới XML parser, Object-Relational Mapping... Hiểu đơn giản nó là những đoạn mã độc được đưa vào hệ thống thông qua các field value nhằm mục đấy lấy những dữ liệu nhạy cảm khi các giá trị đó được đưa vào câu truy vấn hoặc xử dụng quá trình trích xuất dữ liệu. Và thiệt hại của nó thì chắc cũng không cần nhắc nữa. Đã có quá nhiều bài học liên quan đến vấn đề này

Thực sự thì nó quá sức là phổ biến nhưng hầu như các dev nhà ta chẳng hề có một tí khái niệm nào về vấn đề này. Thậm chí cả những câu SQL injection cơ bản nhất cũng không biết, thì làm sao các bạn có thể đảm bảo code mình ngon được. Ví dụ này:

![](https://images.viblo.asia/b9221b19-a783-4e88-bb4f-404c9bc99aa3.gif)

nếu bạn không hiểu ví dụ này thì mình cũng xin giải thích nhẹ là với sql query, dữ liệu dạng string sẽ được đặt trong cặp dấu nháy đơn `'something'` và để truy vấn thì dev chúng ta hay viết như sau

`WHERE USERNAME='{username}' AND PASSWORD='{password}'`

Tuy nhiên vì hacker không biết được password nên để câu truy vấn trả về kết quả mong muốn, hacker sẽ truyền thêm một string với value là `' OR '1'='1`. Giá trị này sẽ kết hợp với câu query thì nó sẽ thành

`WHERE USERNAME='{username}' AND PASSWORD='' OR '1'='1'`

Lúc này điều kiện kiểm tra trở thành vô nghĩa vì `1 = 1` luôn là true. Và kết quả là hacker đã đăng nhập thành công dù không biết user và password. 

Để ngăn chặn, phòng tránh các thứ thì không còn cách nào khác ngoài xác định rõ các dữ liệu đầu vào. Những field value cần phải được validate cẩn thận. Thậm chi ngay cả dữ liệu output cũng phải được kiểm tra để tránh lộ các thông tin nhạy cảm. 


# Improper Assets Management

Cuối cùng cũng có một cái không liên quan gì đến code. Hay ít dính dáng tới code nhất. Mấy cái vấn đề trên, cái nào cũng phải dùng code để chỉnh sửa hay xử lý. Còn cái này thì không cần code. Improper Assets Management, nghĩa tiếng việt thì mình cũng không biết phải trình bày nó như thế nào. Mình thay đổi thói quen là không dịch bất cứ thứ gì sang tiếng Việt nữa để tránh mất đi ý nghĩa của nó. Chúng ta có thể hiểu nó là việc quản lý resource không chính xác và lỗi thời. Để dễ hiểu thì sau đây là ví dụ:

Như các bạn cũng biết thì việc code và create document là chuyện phải đi đôi với nhau. Với API, thì đi đôi với nó là swagger. Việc đồng bộ giữa API và Swagger cũng là điều cần thiết. Tuy nhiên cuộc sống của một người làm phát triển phần mềm không phải lúc nào cũng như mong đợi. Nói gì thì nói chứ nhiều con bug không biết phải tái hiện dưới local như thế nào mà chỉ có chạy trên prod mới được. Mà ngồi confirm, năn nỉ lấy data từ khách hàng thì có mà tới tết mới hết được đống bug này. Thế là chúng ta xin khách hàng tạo một cái endpoint để lấy dữ liệu bất thường về nghiên cứu, để KH yên tâm thì nó sẽ không được mô tả trong Swagger. Rồi sau đó, bug thì fix xong mà API thì vẫn cứ ở đó. Chúng ta cũng quên nó luôn vì không có trong Swagger. Rồi hacker phát hiện được endpoint này và sử dụng.  Và sau đó, không có sau đó nữa.

Nói đùa thế thôi chứ đó là ví dụ cho việc không đồng bộ giữa API và Swagger. Bên cạnh đó, còn là sự không đồng bộ giữa các môi trường. Và đặc biệt là ở những instance backup. Ai mà từng làm green/blue deployment thì chắc biết sẽ có một con instance vẫn chạy với môi trường cũ so với phiên bản hiện hành. Đôi khi, những instanse này vẫn còn chứa các API bị lỗi bảo mật mà chưa được fix (còn chạy version mà trước version các bạn fix lỗi đó). Các API đó sẽ là những miếng mồi cho hacker nếu họ có thể kết nối được với những instance cũ này. Ngoài ra, còn một số vấn đề như API có thể select data ở nhiều môi trường dựa vào tham số truyền vào, chằng hạn như link resource, thì ở dưới dev cũng có thể lấy data của product. 

![](https://images.viblo.asia/f5df3295-a577-46f0-8ea1-9201b5180aa3.jpg)


Và để khắc phục cũng như phòng tránh thì cần phải thực hiện một số điều sau:
- Hạn chế truy cập vào những gì chưa được công khai (cái API mà dùng để điều tra ở trên đó), muốn được sử dụng, cần phải có phân quyền đặc biệt.
- Hạn chế truy cập vào product data, với những instance cũ mặc dù chạy trên môi trường product nhưng nó sẽ không có quyền truy cập vào database hiện tại
- Triển khai sử dụng API firewall hoặc một số biện phán kiểm soát bên ngoài khác
- Lưu trữ và up-to-date các tài liệu liên quan, thậm chí là các shadow API cũng cần phải được quản lý


# Insufficient Logging & Monitoring

Và cái cuối cùng trong top 10 OWASP API security - đó chính là logging và monitoring không hiệu quả, thiếu chính xác và không đầy đủ. Sau khi làm ngon lành cành đào hết các bước code test các thứ, thì bước cuối cùng chính là tạo log và quản lý log. Việc log càng chi tiết giúp chúng ta có thể giúp chúng ta nhanh chóng tìm ra nguyên nhân của các issue. Tuy nhiên thì nó lại là gánh nặng trong việc giám sát cũng như quản lý log. Nó đòi hỏi có một hệ thống log hiệu quả, cũng như một hệ thống giám sát tự động vận hành. Tại sao lại là tự động, thì việc log cập nhật liên tục và với số lượng cực kì nhiều thì việc làm thủ công trở nên risk hơn bao giờ hết.

Ví dụ như nếu không có hệ thống tự động và khi có sự cố xảy ra, phải mất bao lâu để tìm được issue đó, nào là select ERROR log, rồi lần mò truy vết request, gọi từ service nào, rồi data gì mà chạy lỗi. Chuyện gì sẽ xảy ra nếu giám sát men của chúng ta đi ngủ và hacker tấn công, không có ai biết được, nếu không xử lý log tốt nữa thì đến chúa mới biết hacker đã làm gì với hệ thống của chúng ta. Nếu thế, thay vào đó chúng ta sử dụng một hệ thống monitoring, báo hiệu ngay khi có error xảy ra và đưa ra các log liên quan. Cuộc sống sẽ tốt hơn rất nhiều.

Một câu chuyện vui của mình mà là ví dụ cho việc xử lý log không hiệu quả đó là việc sử dụng try catch và sau đó log error. Chuyện chẳng có gì xảy ra nếu cái log error của mình lại sinh ra error. Và thế là chỉ có log mỗi cái error của cái xử lý error chứ không hề liên quan gì đến cái error cả. Nghe rối não thế chứ nội dung chính là log không đúng chủ đề đó các bác ạ. Ờ mà cũng không bám sát lắm. Phải nói là cái ngu khi log request mà lại không log cái payload. Thế là ngồi điều tra bug trong mù mờ. Ờ mà thế cũng chằng liên quan gì đến việc bảo mật. Có đấy, nếu như hacker tấn công mà không biết rõ request thế nào thì làm sao mà chống đây.

Ví dụ thế là đủ rồi. Thì mặc dù nó nằm ở vị trí thứ 10 trong top 10, tức là đứng chót, nhưng các bạn hãy nên biết rằng dầu gì nó cũng nằm trong top 10. Thì có nghĩa là nó rất nghiêm trọng và không thể bỏ qua được đâu. Có thể nó không phải là cái mà hacker chăm chú vào nhiều nhất, nhưng nó sẽ trở thành công cụ hữu ích cho hacker tấn công hệ thống của bạn (nó giúp kéo dài thời gian tấn công do không có sự phát hiện kịp thời). Dùng thứ của mình chống lại mình nghe có đau đớn không.

Và để điều đó không xảy ra, thì cần thực hiện các biện pháp bên dưới:
- Ghi lại chi tiết tất cả những failure trong hệ thống, đặc biệt là các failure về AuthN và AuthZ, các security check như CORS policy, field value validation
- Log được cung cấp theo đúng định dạng mà các tool giám sát có thể xử lý tự động được. Đúng định dạng nhưng bên cạnh đó cũng phải đúng và đầy đủ data để nếu có bất cứ issue nào phát sinh, chúng ta có thể nhanh chóng phán đoán được nguyên nhân.
- Một điều tất nhiên là phải bảo vệ log cẩn thận vì nó cũng là thông tin nhạy cảm. Hacker mà có được đống log thì việc tấn công nó lại là dễ như ăn bánh. Cứ đọc log rồi suy ra những gì mình cần để mà bypass
- Và một điều nên nhớ, là không được để thông tin nhạy cảm vào trong log. Chẳng hạn như nhập sai user password mà log hẳn password not match 'xxxxx' thì thôi rồi.


# Lời kết

Qua bài viết này, hi vọng bạn có cái nhìn rõ hơn về các vấn đề bảo mật API thường gặp và có cho mình những kiến thức để xử lý chúng. Vì nó đã quá phổ biến rồi nên việc mắc phải nó lại trở nên tồi tệ hết sức. Mình thông qua việc tìm hiểu các vấn đề này, cũng có cái nhìn rõ hơn về những thứ mà dự án đang triển khai cũng như framework đang sử dụng. Tại sao mọi thứ lại diễn ra thế này mà không phải là thế kia, ngoài việc đúng design pattern, thì cái đống rườm rà đó lại giúp cho việc tăng tính bảo mật của hệ thống. Mà đọc xong thì cũng có bài tập cho các bạn thực hành, không cần phải trả lời mình đâu. Tự đưa ra câu trả lời cho mình và xác minh xem nó có đúng hay không nhé.

1. Việc tồn tại console.log(something) vi phạm vào điều nào? 
2. Việc return về error.Message (chứa stack trade) trong mỗi API có nên hay không? nếu không thì vì sao?

Xin chào và chúc một ngày tốt lành. Hẹn gặp lại ở một bài viết khác.