## Globalization Testing là
(Tất cả hướng dẫn về  loại, danh sách  test ,  phương pháp test )

Globalization Testing nhằm đảm bảo sản phẩm có ổn định về mặt chức năng cũng như sự trình bày của dữ  liệu mặc dù có nhiều sự khác biệt về văn hóa/ địa điểm khác nhau.

Với sự phát triển nhanh chóng giữa con người, văn hoá và các nước thông qua sự phát triển của thương mại quốc tế, nhu cầu về các sản phẩm phần mềm toàn cầu hóa đã tăng lên đáng kể trên thị trường. Và, tại thời điểm này, Globalization testing xuất hiện trong bức tranh tổng thể của sản phẩm.

Khi chúng tôi tiến hành trong hướng dẫn này, chúng tôi sẽ tìm hiểu thêm về các vấn đề cơ bản của Globalized Software và globalization testing cùng với nhu cầu, tầm quan trọng, lợi thế, loại hình và cũng để biết cách kiểm tra này nên được thực hiện như thế nào?

![](https://images.viblo.asia/3bb72ff4-567d-454e-bbb6-6c05c1ed5a15.jpg)

### Globalized Software là gì?

Trước khi đi vào khái niệm globalization testing, chúng ta cần phải hiểu Globalized Software là gì.

Globalized Software là một sản phẩm chạy độc lập với môi trường địa lý, văn hoá và quốc gia. Tôi chắc chắn rằng hầu hết chúng ta đã từng nhìn thấy và sử dụng nhiều ứng dụng và phần mềm như vậy trong cuộc sống hàng ngày của bạn.

Một trong những ví dụ tốt nhất ở đây là Facebook. Ứng dụng này có một tính năng cài đặt ngôn ngữ, qua đó nó có thể được sử dụng bởi một số ngôn ngữ khu vực và quốc gia.

![](https://images.viblo.asia/354dfea0-b566-43c2-b73f-9e4ba4654e9d.jpg)

Ví dụ, nếu bạn ở Ấn Độ, sau đó bạn  có thể tùy chọn  sử dụng Facebook bằng tiếng Anh, Hindi, Marathi, Bangla, Punjabi, Gujarati hoặc ngôn ngữ nào bạn cảm thấy thoải mái.

Một người từ Nam Phi có thể sử dụng Facebook ở Afrikaans, một người từ Pháp có thể sử dụng nó trong Français và như vậy. Vì vậy, dựa trên quốc gia và vùng của bạn trên toàn cầu, bạn có thể chọn ngôn ngữ bạn chọn và sử dụng ứng dụng tương ứng.

![](https://images.viblo.asia/82fbc5fe-fb8e-4269-9852-03175e708460.jpg)

Tuy nhiên, các tính năng của ứng dụng sẽ vẫn như cũ. Chỉ có, ngôn ngữ mà trong đó mọi thứ được hiển thị cho người dùng sẽ thay đổi. Một số thứ khác cũng được đưa vào hình ảnh ở đây, chẳng hạn như ngày và giờ, đơn vị tiền tệ, tùy thuộc vào múi giờ và quốc gia của bạn

Chúng tôi sẽ thảo luận tất cả điều này một cách chi tiết khi chúng tôi nghiên cứu kỹ hướng dẫn này.

### Globalization Testing là gì?

![](https://images.viblo.asia/9a5b764a-1882-403c-9afa-df7441b57a68.jpg)

Đây là một kỹ thuật xác nhận liệu một ứng dụng có thừa nhận tất cả các văn bản đầu vào ngôn ngữ và nó có thể được sử dụng trên toàn cầu hay không.

ục đích duy nhất của Globalization Testing là để khám phá những vấn đề tiềm ẩn có thể cản trở tính phổ biến của trong một thiết kế ứng dụng.

#### NEED

Trong kịch bản ngày nay, thế giới đã trở thành một ngôi nhà chung. Bạn sẽ có lợi thế cạnh tranh nếu sản phẩm phần mềm của bạn phục vụ cho nhiều quốc gia, vùng hoặc thị trường trên toàn cầu.

Để đạt được điều này, điều quan trọng là xem sản phẩm phần mềm có trải qua quá trình Globalization Testing  thông qua đó chúng ta có thể đảm bảo rằng sản phẩm sẽ hoạt động tốt trong mỗi nền văn hoá mà nó đang phục vụ.

Ví dụ, ở Ấn Độ, mã Zip là 6 chữ số (không có bảng chữ cái). Vì vậy, nếu bạn đã chọn quốc gia của mình là Ấn Độ, sau đó khi nhập mã pin của khu vực của bạn, nó chỉ nên chấp nhận mã 6 chữ số. Tuy nhiên, nếu quốc gia của bạn là Canada, sau đó mã Zip bao gồm 6 ký tự chữ và số.

Trong trường hợp trên, đơn đăng ký của bạn phải chấp nhận mã Zip theo định dạng mã bưu điện của Canada. Do đó, điều quan trọng là đảm bảo nếu chức năng mã zip hoạt động tốt theo từng miền địa phương. Tương tự, nhiều vấn đề như vậy có thể xuất hiện trong khi thay đổi vị trí và ngôn ngữ.

Vì vậy, nhu cầu về  Globalization Testing  phát sinh trong đó xác định và khắc phục các vấn đề có thể xuất hiện do sự thay đổi ngôn ngữ và khu vực địa lý. Nó cũng giúp bạn đảm bảo rằng không có mã hóa cố định  trong ứng dụng của bạn.

### Các loại Globalization Testing

Phần testing này có thể được chia thành hai phần. Thứ nhất là Internationalization Testing (aka 118N testing) và thứ hai là Localization Testing (aka L10N testing).

![](https://images.viblo.asia/b6ffbcb2-43b4-4150-a376-c7c67b4f04e8.jpg)

#### Internationalization Testing

Internationalization Testing là quá trình mà mã của phần mềm được thiết kế riêng theo cách mà nó hoàn toàn độc lập với bất kỳ văn hoá và thông tin cụ thể về khu vực.

Ví dụ, Một trong những nhiệm vụ liên quan đến Kiểm tra Quốc tế hóa là sửa đổi logic cho tất cả các chức năng định dạng (định dạng ngày và giờ, định dạng số và tiền tệ, v.v.). Các giá trị mã hóa được kéo ra và lưu trữ trong các tệp bên ngoài (được gọi là gói tài nguyên) sẽ được tải tại thời gian chạy.


Còn được gọi là Kiểm tra 118N, Kiểm thử Quốc tế hóa kiểm tra xem ứng dụng có đang hoạt động thống nhất quanh các vùng và nền văn hóa toàn cầu khác nhau không.


Mục tiêu chính của kiểm thử Quốc tế hoá là xác minh xem mã có thể giải quyết tất cả các hỗ trợ quốc tế mà không vi phạm chức năng có thể gây mất dữ liệu hoặc các vấn đề toàn vẹn dữ liệu.

118N Kiểm Thử  chủ yếu tập trung vào:
* Kiểm tra Tương thích Ngôn ngữ: Điều này liên quan đến việc xác minh xem sản phẩm có thể hoạt động chính xác trong môi trường ngôn ngữ cụ thể hay không.

* Kiểm tra chức năng: Điều này liên quan đến việc thực hiện kiểm tra hồi quy chức năng trên các môi trường ngôn ngữ khác nhau và nhập các chuỗi ngôn ngữ bản xứ. Điều này bao gồm việc kiểm tra liệu thông tin cụ thể về văn hoá như tiền tệ, ngày tháng, thời gian được hiển thị chính xác hay không.

* Xác thực giao diện người dùng: Điều này cố gắng xác định bất kỳ vấn đề thị giác nào như vấn đề đồ hoạ, sự chồng chéo văn bản, cắt ngắn văn bản, v.v.

* Kiểm tra khả năng vận hành liên công: Điều này liên quan đến việc thử nghiệm phần mềm trên các nền tảng, hệ điều hành, phiên bản ứng dụng, v.v ...

* Kiểm tra Khả năng sử dụng: Nó kiểm tra tính dễ sử dụng của ứng dụng.

* Thử nghiệm cài đặt: Điều này liên quan đến việc cố gắng cài đặt ứng dụng bằng các ngôn ngữ bản địa khác nhau và xem nếu tất cả các thông báo cài đặt được hiển thị chính xác trên các cài đặt ngôn ngữ.

#### Localization Testing

Localization là quá trình sửa đổi một sản phẩm phần mềm theo từng địa phương (ngôn ngữ, lãnh thổ, trang mã vv) được hỗ trợ.

Điều này liên quan đến bản dịch của phần mềm và bản trình bày của nó cho người dùng cuối. Bản dịch của chương trình xem xét các biểu tượng, đồ họa, sách hướng dẫn sử dụng, các tệp trợ giúp, tài liệu, và các đặc điểm văn hóa khác.

Còn được gọi là  KiểmThử  L10n, Localizing testing là một bài kiểm tra xác minh ngôn ngữ được thực hiện để đảm bảo chất lượng sản phẩm cho một nền văn hoá cụ thể hoặc cài đặt ngôn ngữ. Nó chủ yếu tập trung vào UI và nội dung.

Kiểm thử này thường được thực hiện bởi người hiểu ngôn ngữ cụ thể.

Đến bây giờ, bạn phải hiểu được sự khác biệt giữa kiểm định quốc tế hóa và kiểm định bản địa hoá.


Tóm lại, kiểm thử  quốc tế nhằm đảm bảo sản phẩm phần mềm có khả năng thích ứng với các ngôn ngữ và khu vực địa lý khác nhau mà không làm thay đổi nó.

Mặt khác, kiểm thử bản địa hoá nhằm đảm bảo nếu sản phẩm quốc tế được điều chỉnh cho một ngôn ngữ hoặc khu vực cụ thể bằng cách thêm một số thành phần và văn bản cụ thể tại địa phương.

### Phương pháp Globalization Testing

Chúng ta cần phải xác định các khu vực thử nghiệm toàn cầu hoá trong chiến lược kiểm thử và giai đoạn lập kế hoạch của vòng đời thử nghiệm phần mềm. Sau đó, tạo các trường hợp thử nghiệm và thử nghiệm dữ liệu cho yêu cầu thử nghiệm toàn cầu hóa và thiết lập một máy chủ thông thường với nhiều địa điểm (khách hàng) để có một thiết lập môi trường thử thích hợp.

Kiểm thử toàn cầu hoá (thử nghiệm i18n plus l10n) phải được khởi động vào ngày đầu tiên, tức là ngày bắt đầu thử nghiệm phiên bản cơ bản (tiếng Anh) của sản phẩm.

Các lỗi toàn cầu hóa quan trọng cần được xác định và cố định ngay từ đầu. Bạn nên lập kế hoạch để sửa chữa, và regress kiểm tra những lỗi này kể từ khi bắt đầu thử nghiệm.

![](https://images.viblo.asia/8ce23b20-8917-478e-8deb-52a8ab5eb1e0.jpg)

Thông qua cách tiếp cận này, bạn có thể có một sản phẩm toàn cầu hóa hoàn hảo có thể được phát hành đồng thời trên nhiều thị trường.

### Những gì cần phải được kiểm tra?

Có rất nhiều điều cần được kiểm tra. Tuy nhiên, các khía cạnh quan trọng nhất là:

* Ngôn ngữ: Một sản phẩm toàn cầu hoá hỗ trợ nhiều ngôn ngữ. Vì nhiều ngôn ngữ mà nó hỗ trợ, thì càng cần phải kiểm tra.
* Giao diện người dùng: Như bạn đã biết, mỗi kịch bản ngôn ngữ có một phong cách viết khác nhau (một số được viết từ trái sang phải và chỉ có một số từ phải sang trái) và không gian theo yêu cầu của các từ có thể khác nhau từ ngôn ngữ này sang ngôn ngữ khác.
* Thời gian: Các định dạng hiển thị ngày và giờ sẽ khác nhau giữa các vùng.
* Định dạng Tiền tệ & Xử lý Tỷ lệ Chuyển đổi: Nếu ứng dụng của bạn bao gồm thương mại điện tử thì việc kiểm tra tiền tệ trở thành một điều rất quan trọng. Các định dạng số cho các loại tiền tệ khác nhau từ quốc gia này sang nước khác. Vì vậy, bạn nên chăm sóc các định dạng. Một điều quan trọng khác là hiển thị đúng biểu tượng của đồng tiền cùng với các đơn vị.
* Số điện thoại, định dạng mã địa chỉ và mã bưu điện: Trật tự trong đó địa chỉ được hiển thị thay đổi từ ngôn ngữ này sang ngôn ngữ khác.

### Globalization Testing Checklist

* Đảm bảo nếu cài đặt yêu cầu đang được thực hiện để thiết lập môi trường thử nghiệm
* Đảm bảo nếu cơ sở dữ liệu tương thích với chuẩn Unicode.
* Xác minh nếu không có chuỗi mã cứng trong mã.
* Đảm bảo ngôn ngữ được yêu cầu đã được cài đặt trên máy khách hay không.
* Kiểm tra bó nguồn cho tất cả các tệp thuộc tính ngôn ngữ bắt buộc có sẵn trong đó.
* Xác minh xem giao diện người dùng của ứng dụng được hiển thị bằng ngôn ngữ bản địa của ngôn ngữ của khách hàng.
* Xác minh xem ngôn ngữ hiển thị mặc định là tiếng Anh khi không chọn ngôn ngữ cụ thể hoặc khi tệp thuộc tính ngôn ngữ không có sẵn trong bó tài nguyên.
* Xác nhận nếu ứng dụng có thể xử lý dữ liệu rộng bao gồm bộ ký tự ngôn ngữ bản địa, ký tự ASCII, ký tự đặc biệt, v.v ...
* Xác minh xem lệnh của dữ liệu trên giao diện người dùng có tốt không theo vị trí của khách hàng.
* Xác minh xem chức năng lọc và tìm kiếm có hoạt động tốt theo vị trí của khách hàng hay không.
* Xác minh nếu định dạng ngày và thời gian chính xác được hiển thị trên ứng dụng.
* Xác minh xem các loại tiền tệ được hiển thị ở đúng định dạng hay không.
* Xác minh xem số điện thoại và mã pin được hiển thị đúng định dạng hay không.
* Xác minh xem con trỏ có được canh lề đúng phía của các trường đầu vào dựa trên hướng của tập lệnh ngôn ngữ hay không.
* Kiểm tra xem tất cả các yêu cầu của khách hàng được chỉ định đang được thử nghiệm không?
* Kiểm tra xem tất cả các đầu vào / đầu ra tương ứng với mỗi chức năng được kiểm tra?
* Kiểm tra xem tất cả các chức năng dựa trên đầu vào ngôn ngữ bản xứ đang được thử nghiệm?
* Kiểm tra nếu tất cả các yêu cầu cơ sở dữ liệu toàn bộ đang được thử nghiệm?
* Kiểm tra xem tất cả UI đã chỉ định đang được kiểm tra không?
* Xác minh rằng không có ký tự chồng chéo lên màn hình.
* Xác minh rằng không có ký tự rác được hiển thị trên màn hình.
* Xác minh rằng đồ họa xuất hiện chính xác trong giao diện người dùng.
* Xác minh xem các hướng dẫn sử dụng / tập tin trợ giúp được hiển thị bằng ngôn ngữ mẹ đẻ theo vị trí của khách hàng

### Kết luận

Kiểm thử  toàn cầu hoá cần phải được thực hiện để cung cấp một sản phẩm chất lượng toàn cầu hóa.
Sản phẩm của bạn phải được chấp nhận đối với cơ sở người dùng chung chung có thể thuộc về các vùng địa lý khác nhau và những người nói các ngôn ngữ khác nhau. Để đạt được sự chấp nhận trên toàn thế giới của sản phẩm phần mềm của bạn, bắt buộc phải kiểm tra tính khả dụng của nó đối với từng khu vực mà nó phục vụ.

Phần tốt nhất của  kiểm thử  này là khi bạn đang kiểm tra sự sẵn sàng trên thế giới, bạn cũng đang kiểm tra các chức năng chính cốt lõi của sản phẩm. Tuy nhiên,  kiểm thử toàn cầu hóa tiết kiệm thời gian và nỗ lực tổng thể của bạn cho kiểm thử phần mềm.

Bạn có biết bất kỳ thông tin nào khác về  KiểmThử  Toàn cầu hoá? Chúng tôi rất vui khi nghe tin này từ bạn !!

Nguồn: http://www.softwaretestinghelp.com/globalization-testing/