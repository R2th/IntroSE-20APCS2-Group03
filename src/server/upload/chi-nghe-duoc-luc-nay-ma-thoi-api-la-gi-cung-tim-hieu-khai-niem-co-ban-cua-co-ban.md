***Dịch từ bài viêt 「いまさら聞けない！APIとは何か？~基礎の基礎を学ぼう~」của tác giả Sano Hiroshi (佐野裕史)。Link bài viết: https://www.sejuku.net/blog/7087***

Xin chào mọi người, tôi là Sano. Đối với những người mới bắt đầu, API quả thật là một khái niệm khó hiểu đúng không nào?

> API là gì?
> “API đã được công khai” nghĩa là sao? 
> Tôi đã tra cứu nhưng không hiểu những thứ được thuyết minh ...
Đây có lẽ là từ ngữ chuyên dụng khó hiểu nhất phải không?

Tuy nhiên, API vô cùng cần thiết đối với việc lập trình, nếu lý giải được nó, phạm vi phát triển của bạn sẽ mở rộng ra nhiều. Vì vậy, lần này, tôi sẽ giải thích về API một cách dễ hiểu nhất để ngay cả người mới bắt đầu cũng có thể nắm được.

# 1.API là gì?
## 1.1 Định nghĩa API
Đầu tiên, hãy cùng xem Wikipedia định nghĩa API thế nào:
> Application Programming Interface (API) là spec của interface được sử dụng để liên kết thông tin giữa các software components
Định nghĩa này không dễ hiểu lắm nhỉ? Nói một cách đơn giản thì, API là việc chia sẻ chức năng của phần mềm (software).
## 1.2 API là việc chia sẻ chức năng của phần mềm (software)
API là một phần của software đã được công khai và các phần mềm khác có thể sử dụng những chức năng ấy. 

Bằng việc công khai một bộ phận phần mềm trên WEB, bất cứ ai cũng có thể access chức năng đó từ bên ngoài. Bằng cách ấy, các chức năng trong phần mềm của chúng ta có thể được nhúng vào (embed) các phần mềm khác, biến việc liên kết giữa các application trở nên khả thi.
## 1.3 API= Chức năng + Spec
Dù nói rằng chức năng của phần mềm có thể được sử dụng từ bên ngoài nhưng code nội bộ không được công khai. Do đó, người sử dụng API không biết được các sử dụng và spec của chức năng ấy. Điều này dẫn đến sự cần thiết của việc đưa ra những giải thích “phải làm thế này để sử dụng được chức năng” hay “hãy sử dụng chức năng này như thế này”.

Thêm vào đó, nhìn từ quan điểm Bảo mật thông tin, các quy tắc “Cách sử dụng này không thể được thực hiện” hay “Cách dùng này là sai” cần được thiết lập. Thông thường, API được dùng để chỉ chức năng được công khai trên WEB đi kèm với các hướng dẫn sử dụng và quy định, quy tắc này. Nói cách khác, API là Chức năng đi kèm với tài liệu Spec.

API thường được sử dụng thông qua truyền tin trên WEB nên thường được gọi là WEBAPI. Thông thường, khi nhắc đến API là ta đang chỉ WEBAPI.
# 2. Interface là gì?
API là cụm từ viết tắt của Application Programming Interface. Có lẽ mọi người đều đã quen với 2 từ Application và Programming rồi, nhưng Interface là một từ khá lạ tai nhỉ?

Interface theo từ ngữ chuyên ngành IT là từ dùng để chỉ bộ phận tiếp xúc giữa con người và máy tính. Interface là đường biên tiếp giáp giữa con người với máy tính, đóng vai trò trao đổi thông tin giữa 2 phía.

Cụ thể hơn, bàn phím và chuột máy tính, điều khiển TV, máy bán vé tự động của nhà ga là các ví dụ về Interface. Toàn bộ những vật dụng kể trên có vai trò như máy phiên dịch truyền đạt thông tin tới máy tính theo những thao tác của con người.

Tương tự, API đóng vai trò thay cho lập trình viên truyền đạt các thông tin và chỉ thị tới application nên được gọi là Application programming interface.
# 3. Bản chất của API là gì?
Chắc bạn đã lý giải được API là gì rồi nhỉ? Bằng việc tìm hiểu tại sao API được tạo ra, tại sao phải sử dụng API, sự lý giải của bạn về API sẽ sâu sắc thêm, cùng với đó, bạn cũng sẽ ứng dụng được API vào thực tế. Vậy thì, hãy cùng tôi tiếp cận bản chất của API nào.
## 3.1 Tại sao API được tạo ra:
###  Nhằm mục đích tạo ra nhiều dịch vụ mới hơn:
Bằng việc công khai chức năng của service của mình dưới dạng API, việc phát triển các dịch vụ khác vươi những đặc trưng tương đồng sẽ trở nên dễ dàng hơn. Nhờ vào đó, việc đặc trưng hóa một số chức năng hay tập trung cải thiện một bộ phận chức năng nào đó có thể được thực hiện. Kêt quả là, nhiều dịch vụ hơn được phát triển, cuộc sống sẽ trở nên tiện lợi hơn.
### Sử dụng data cấp 2
Bằng API, ta có thể sử dụng data của các doanh nghiệp khác. Cùng một thông tin có thể được dùng ở nhiều lĩnh vực khác nhau, khiến cho việc phân tích dữ liệu trở nên đơn giản hơn, đồng thời có thể tiến hành phân tích đặc trưng hóa cho mỗi một lĩnh vực. Nhờ đó, ta có thể phát hiện được những đặc trưng và khuynh hướng của khách hàng để tạo ra những cách tân và tạo ra những loại hình business mới.
## 3.2 Tại sao cần sử dụng API
###  Tăng hiệu suất việc phát triển phần mềm:
Trường hợp chức năng cần làm đã được công khai dưới dạng API, ta sẽ không cần phải tự viết chương trình mới nữa. Nhờ đó, thời gian phát triển sản phẩm sẽ được rút ngắn.

Thêm vào đó, việc sử dụng API là miễn phí nên chi phí cho quá trình phát triển cũng được giảm đáng kể, cùng với đó là hiệu quả được tăng lên. Nếu sử dụng thêm các tools và services thì hiệu quả phát triển sẽ càng tăng lên.
###  Sự tiện lợi đối với người sử dụng service:
Bằng việc sử dụng API, ta có khả năng tạo chức năng đăng nhập vào hệ thống công ty mình bằng thông tin người dùng đăng ký trên hệ thống khác. Nhờ đó, người dùng sẽ không cần phải đăng ký lại một lần nữa. Nhìn từ phương diện người dùng, vì không cần nhập lại mail address và password, những quy trình rắc rối đã được giản lược.

Có thể nói, API là một cơ chế tiện lợi đối với người sử dụng ứng dụng và dịch vụ.
## 3.3 Nếu minh họa API bằng việc nấu ăn thì ....
Nếu minh họa API bằng việc nấu ăn, sử dụng API sẽ giống như mượn dụng cụ nấu ăn từ công ty khác vậy. Do không cần phải tự mình chuẩn bị tất cả dụng cụ nấu ăn, quy trình đã được giản lược.

# 4. Ví dụ về việc sử dụng API
Các API đang được sử dụng hiện nay rất đa dạng về chủng loại, do đó, để giúp các bạn dễ dàng hình dung hơn, tôi sẽ đưa ra ví dụ cụ thể về API. Tôi sẽ giới thiệu về application đang được biết đến rộng rãi: Instagram. Application này sử dụng Facebook API. Do Instagram sử dụng Facebook API, chỉ cần đăng ký tài khoản Facebook, người dùng có thể lập tức bắt đầu dùng Instagram.

Có lẽ bạn đã từng nhìn thấy màn hình sau rồi nhỉ?
![](https://images.viblo.asia/93cf94c5-b0cf-4abd-a5d4-74e1e8f0d2e7.png)

Do Instagram sử dụng thông tin từ Facebook, màn hình đang đưa ra đề nghị cấp quyền access Facebook của người dùng. Vì việc tự ý sử dụng thông tin người dùng không được cho phép, ứng dụng bắt buộc phải xin được cấp quyền từ người dùng.

Thêm vào đó, bằng việc sử dụng Facebook API, nếu bạn bè của bạn trên Facebook bắt đầu sử dụng Instagram hoặc có bài đăng mới, bạn sẽ nhận được thông báo.

Chức năng này không thể được thực hiện nếu Instagram không liên kết với Facebook bằng việc sử dụng Facebook API.

Tương tự như vậy, sử dụng API giúp cho việc liên kết giữa các ứng dụng trở nên khả thi. Với việc dùng API, tùy thuộc vào ý tưởng và cách làm, ta có thể tạo ra dịch vụ mới tiện ích hơn một cách dễ dàng hơn.

# 5.Cách sử dụng API
Tiếp sau đây, tôi sẽ nói về cách sử dụng API. Do phương pháp sử dụng giống nhau với mọi API, hãy nhớ các bước và tham khảo khi cần nhé.

## Đăng ký application lên trang API
Đầu tiên, hãy tới trang chuyên dụng của doanh nghiệp cung cấp API và đăng ký thông tin về application của mình.

Bằng thao tác này, ta đang cho phía API biết “Ứng dụng này sẽ sử dụng API đó!”

Nội dung đăng ký bao gồm: Tên App, Tên miền App (URL), Trả về thông tin đến URL nào (còn gọi là Callback), v.v. Bằng việc đăng ký những thông tin này, phía API có thể phán đoán ứng dụng nào đang access đến API để tạo thành liên kết.
## Get API key và Secret Key
Tuy rằng bất cứ ai cũng có thể tự do sử dụng API, vì việc này là hành động tác động đến data nên cần phải chú ý đến khía cạnh Bảo mật.

Do đó, API key và secret key được tạo ra. Chúng đóng vai trò như tổ hợp địa chỉ mail và password. Đây là tổ hợp không thể thiếu khi sử dụng API.

## Setting trên ứng dụng, hoàn tất việc chuẩn bị
Setting API key và secret key trên ứng dụng của bạn. Đến đây, không còn nỗi lo về việc bị tùy ý sử dụng từ bên ngoài.

Các thao tác chuẩn bị cho việc sử dụng API hoàn tất.

## Tham khảo reference để deploy
Sau khi hoàn tất việc chuẩn bị, chỉ còn lại thao tác xem Tài liệu tham khảo của API và nhớ cách sử dụng chức năng mà thôi. Bằng việc thử viết code và sử dụng API, bạn sẽ có thể tự mình trải nghiệm được sự tiện lợi của API.

***(Bài viết còn các phần chứa link dẫn sang các bài viết khác thuyết minh về các loại API và tài liệu học API, tôi xin phép lược bỏ không dịch tiếp ở đây. Cảm ơn các bạn đã đọc hết bài viết này!)***