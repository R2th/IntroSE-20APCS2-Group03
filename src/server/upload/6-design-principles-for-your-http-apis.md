Không có gì phải bàn cãi một thực tế rằng, việc thiết kế các API tôt là một nghệ thuật. Khi chúng ta gặp một API được thiết kế đúng, chúng ta hoàn toàn có thể cảm nhận được nó.
Cũng giống như việc thiết kế giao diện người dùng UI, các API tốt không chỉ cần đẹp, nó còn phải đảm bảo các chức năng và giúp mọi người tiết kiệm thời gian. Với suy nghĩ đó, việc thiết kế các API tốt cũng yêu cầu và đòi hỏi không kém gì với thiết kế UI. Chúng không chỉ có ý nghĩa với máy móc mà còn phải có ý nghĩa cho những lập trình viên và cả người dùng. Việc phát triển các API khiến người dùng cảm thấy thích thú khi tương tác là một mục tiêu quan trọng của bất kì nhóm phát triển nào.

Trên thực tế, có rất nhiều tài liệu hướng dẫn các nguyên tắc thiết kế UI tốt, cũng như các ví dụ sinh động minh họa. Mặt khác, khi nói đến các API, lại có rất nhiều tài liệu giải thích về các giao thức, các ngôn ngữ và các framework khác nhau để thực thi nó. Nhưng gần như không đủ các tài liệu về các nguyên tắc thiết kế và lựa chọn cơ bản để tạo nên các API tuyệt vời.

Mặc dù kinh nghiệm trong việc thiết kế API của mỗi người hay mỗi team phát triển là rất quan trọng, nhưng chung quy lại chúng ta có thể áp dụng một số nguyên tắc cơ bản quan trọng để thiết kế API cho mình. 

# Consistency

Consistency, tính nhất quán, có nghĩa rằng, với các endpoint tương tự nhau sẽ thực hiện theo những cách tương tự nhau, kể cả khi gặp các trường hợp đặc biệt. Bạn nên luôn luôn cố gắng để giữ các format của từ vựng, các URL, cấu trúc, request, response cũng như xử lý lỗi một cách nhất quán trên toàn bộ các API.

Điều này sẽ cung cấp cho chúng ta một vài lợi ích quan trọng:

* Nó giúp việc tương tác với các API của bạn đơn giản và thuận tiện hơn nhiều: vì khi đó người dùng cũng như các lập trình viên sẽ luôn dễ dàng biết trước được những gì mà họ mong đợi ở các API mà không cần phải đọc toàn bộ tài liệu của mỗi endpoint.
* Nó cho phép chúng ta có thể viết các thư viện ở phía client mà không cần biết chính xác schema của các API, chỉ cần nắm được quy tắc mà bạn đã cam kết tôn trọng. Stripe API client là một ví dụ tốt cho điều này: vì cấu trúc của request và response luôn luôn nhất quán, nên nó có thể xây dựng các đối tượng một cách linh hoạt, và chỉ cần được cập nhật khi một trong các quy tắc API thay đổi.
* Nó tạo ra một tập hợp các hướng dẫn để test và thử nghiệm mỗi khi bạn muốn triển khai các tính năng mới trong API.

Tính nhất quán có lẽ là đặc điểm có ảnh hưởng lớn nhất mà bạn có thể thực hiện trong thiết kế API của mình và những người dùng hay các lập trình viên khác sẽ luôn biết ơn và cảm ơn bạn vì điều đó.


# Performance

Performance trong các API http là một vấn đề khó khăn. Vì các API không được các người dùng cuối sử dụng trực tiếp nên các vấn đề về performace thường không được chú ý đến trong một thời gian dài, đặc biệt là trong bối cảnh nở rộ của mô hình microservice tương tác giữa các máy chủ. Tuy nhiên, vì các phần mềm được tạo ra cho mọi người, nên các vấn đề về hiệu suất ở một khâu nào đó, cuối cùng sẽ ảnh hưởng đến người dùng cuối. 

Tuy nhiên, chúng ta cũng không nên tối ưu hóa về hiệu suất sớm, vì những lý do thông thường: 

* Làm chậm sự phát triển MVP(Minimum Viable Product) của bạn trong quá trình start up sản phẩm
* Bạn cũng không thể biết những phần nào mà bạn cần tối ưu hóa nếu như chưa có các số liệu thực tế phù hợp
* Bạn nên tối ưu hóa dựa trên các dữ liệu chứ không phải bản năng.

Với lẽ đó, điều quan trọng ở đây là bạn cần bắt đầu thu thập dữ liệu ngay từ ngày đầu tiên. Việc thiết lập tool APM chỉ mất vài giây nhưng nó sẽ cung cấp cho bạn rất nhiều thông tin hữu ích về các API của bạn đang được sử dụng trong thế giới thực

# Documentation

Cho dù API của bạn có nhất quán đến đâu, người dùng vẫn cần đến một nơi để họ có thể bắt đầu tìm hiểu hoặc có được thông tin chi tiết của các API của bạn. 

Hơn thế nữa, các tài liệu API không nên chỉ trình bày về các template của request hay response. Nó cần phải chứa đầy đủ các thông tin nào mà người dùng cảm thấy hữu ích, chẳng hạn như giải thích về những gì xảy ra ở background khi một lệnh gọi API được thực hiện hay những endpoint khác mà người dùng có thể cần thiết để hoàn thành transaction này.

Điều cực kì quan trọng là tài liệu API của bạn phải luôn chính xác và được cập nhật thường xuyên. Cách duy nhất để thực hiện điều này là tạo một quy trình phát triển rõ ràng để tích hợp đầy đủ thông tin vào tài liệu mỗi khi có update. Một trong những cách tốt là tích hợp hệ thống quản lý phiên bản VCS và yêu cầu các lập trình viên update nó mỗi khi có thay đổi API.

Có nhiều lập trình viên cho rằng việc viết tài liệu là việc lãng phí thời gian, tuy nhiên, bạn càng dành nhiều thời gian để viết tài liệu thì bạn càng mất ít thời gian để trả lời các câu hỏi và điều tra các báo cáo lỗi không có thật.

Cuối cùng, phải đảm bảo rằng, tài liệu không chỉ cho có, mà còn là niềm vui mỗi khi tham khảo. Vì nó được sử dụng bởi con người nên các tài liệu cũng cần đảm bảo các UI, UX trực quan, dễ tham khảo tìm hiểu. Thay vì tự làm việc này, bạn có thể áp dụng một dịch vụ như Stoplight sẽ lưu trữ và trình bày nội dung theo dạng chuẩn cho bạn.

# Usability

Tính khả dụng. Mặc dù không có gì là sai khi chúng ta thiết kế ánh xạ 1:1 giữa các bảng cơ sở dữ liệu với các API của bạn, nhưng đây không phải là các duy nhất để thiết kế các API. Trong thực tế, đối với các API phức tạp, nó thường sẽ không phải là cách tốt nhất, nó sẽ đặt gánh nặng lên vai người dùng khi phải xâu chuỗi các API với từng hành động theo đúng thứ tự.

Nếu bạn có thể đơn giản hóa một giao dịch kinh doanh chỉ bằng việc gọi một lệnh API thay vì là hai, tại sao lại không? Khi đó giao diện người dùng UI sẽ không thể tưởng tượng được những gì đang được thực hiện trong API, và đó là chính xác chúng tôi làm trong nhiều API.

Một ví dụ minh họa cho điều này là API cho phép người dùng có thể thêm phương thức thanh toán mới và đánh dấu phương thức thanh toán là phương thức mặc định. Trong tình huống này, chúng ta có thể thêm thuộc tính mask_as_default vào endpoint tạo phương thức thanh toán và thực hiện mọi thứ trong một lời gọi API mà không yêu cầu 2 lời gọi. Điều này tiết kiệm cả thời gian phát triển và băng thông.

# Simplicity

Hãy xây dựng các API của bạn với các công cụ, tiêu chuẩn đơn giản nhất, và được chấp nhận rộng rãi nhất. Không cần thiết các envelop, schema, API gateways hay các giải pháp đặc biệt nào khác một khi bạn có lý do chính đáng để sử dụng chúng.

HTTP RFC đã cung cấp cho bạn hầu hết các công cụ mà bạn sẽ cần để xây dụng một dịch vụ WEB đáng tin cậy, dễ dàng tương tác, vì vậy, hãy tiếp tục đọc và sử dụng nó.

Đơn giản có nghĩa là ít chi phí hơn cho con người và máy móc, cũng như ít chỗ hơn cho những sai lầm, chẳng hạn, ở đây bạn cần những gì để tính phí thẻ tín dụng bằng API Stripe:

```
curl https://api.stripe.com/v1/charges \ 
  -u your_api_key: \ 
  -d amount=999 \ 
  -d currency=usd \ 
  -d description="Example charge" \ 
  -d source=tok_visa
```

Nó rất đơn giản, bạn có thể làm điều đó mà không cần tra cứu tài liệu.

# Evolution

Các ứng dụng Web truyền thống được update mọi lúc: các tính năng mới được thiết kế và thêm vào, những thứ hữu ích và phổ biến thì được cải tiến và sắp xếp hợp lý, những thứ sai sót bị phản hồi và loại bỏ. Người dùng đôi khi đã quen với việc sống và hoạt động trong một môi trường thay đổi liên tục. Trong hầu hết các trường hợp, các sản phẩm tốt thường thúc đẩy người dùng chấp nhận các tính năng mới.

Còn đối với các API, có vẻ như chỉ có 2 lựa chọn khả thi: hoặc bạn không bao giờ thay đổi giao diện của mình vì sợ phá vỡ các implement, hoặc bạn thay đổi nó mà không thông báo, làm gián đoạn hầu hết dịch vụ của khách hàng. Điều này thường xảy ra vì các nhóm phát triển API thường bị ngắt kết nối đến các người dùng của họ vì họ không trực tiếp tương tác với người dùng.

Nhưng một lựa chọn thứ ba là hoàn toàn có thể: với cơ sở hạ tầng và công cụ phù hợp, bạn có thể có API thay đổi theo cách có thể quản lý được cho người dùng. Bạn có thể sử dụng các số liệu để có thể có những quyết định sáng suốt giúp bạn mỗi khi cần update API:  mức độ thường xuyên được sử dụng của một endpoint?, người dùng đã gọi một endpoint đặc biệt nào trong 6 tháng vừa qua?  Hãy chắc chắn rằng bạn luôn luôn có thể trả lời các câu hỏi này, vì nó sẽ giúp API của bạn ngày một hoàn thiện hơn.

Tham khảo:

https://medium.com/@aldesantis/6-design-principles-for-your-http-apis-560434f9744e