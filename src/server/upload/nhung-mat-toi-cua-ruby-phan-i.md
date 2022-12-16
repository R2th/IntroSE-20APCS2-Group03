Không có gì là hoàn hảo và Ruby cũng không phải là ngoại lệ. Giữa tất cả các tính năng mạnh mẽ, cú pháp tao nhã và mô hình đối tượng rõ ràng dễ hiểu, trong Ruby còn có một số thành phần không hiệu quả, khó hiểu hoặc đơn giản là trông rất xấu xí. Trong bài viết này,mình sẽ tập trung vào các điểm yếu của Ruby. Danh sách mình đưa ra là hoàn toàn theo ý kiến chủ quan và các bạn có thể không đồng ý với một số điểm. Hoặc có lẽ có điều gì đó mà bạn cảm thấy khó chịu về Ruby mà mình không đề cập đến trong bài viết. Trong trường hợp đó, mình rất vui lòng được lắng nghe ý kiến đóng góp của các bạn.
# 1. Hiệu suất:
Ruby nổi tiếng là một ngôn ngữ tương đối chậm. Lý do đơn giản là Ruby là ngôn ngữ động và được hỗ trợ nhiều. Nếu chúng ta so sánh nó với ngôn ngữ biên dịch tĩnh, chẳng hạn như C + +, chúng ta sẽ tìm ra rằng nó là thực sự, chậm hơn trong nhiều trường hợp. Vậy thực sự Ruby chậm hơn chính xác là bao nhiêu? Theo nhiều điểm chuẩn so sánh hiệu suất của các ngôn ngữ lập trình khác nhau, ứng dụng Ruby có thể chậm hơn đến hai lần so với chương trình tương tự viết bằng C ++. Điều đó chắc chắn đủ để kết luận rằng Ruby không phải là một trong những ngôn ngữ có hiệu suất tốt nhất trên thế giới.

Tuy nhiên, có thể cho rằng việc so sánh Ruby và C++ nó giống như so sánh táo và cam. Sẽ công bằng nếu so sánh Ruby với một ngôn ngữ khác có tính chất tương tự. Một ứng cử viên tuyệt vời cho cuộc đối đầu như vậy là Python. Đó là một ngôn ngữ động giống như Ruby. Trong những khoảng thời xa xưa của Ruby 1.8, người về nhất giữa hai ngôn ngữ là Python. Sự khác biệt không quá lớn như với C + +, nhưng sự hơn kém về hiệu suất là có thật. Tuy nhiên, với việc phát hành phiên bản 1.9 của Ruby đã mang lại một sự cải tiến tốc độ lớn, như nhiều nguồn có thể xác nhận (xem trên: [Medium](https://medium.com/airbnb-engineering/upgrading-from-ree-1-8-7-to-ruby-1-9-3-c304e2493b34), [pothoven](http://blog.pothoven.net/2012/10/ruby-187-vs-193-performance.html), [codinginthecrease](https://www.codinginthecrease.com/news_article/show/156863)) Ruby 2 và 2,1 đã mang lại tốc độ cao hơn nhiều. Trang web http://www.isrubyfastyet.com/ cho phép bạn xem mức tăng tốc độ Ruby ảnh hưởng đến hiệu năng của các ứng dụng web được viết bằng Rails.

Vậy, việc hiệu suất Ruby chậm có phải là một vấn đề mà bạn cần lo lắng tới không? Câu trả lời còn phụ thuộc vào nhiều yếu tố. Ruby có thể không phải là ngôn ngữ được lựa chọn để thực hiện các thuật toán tính toán phức tạp hoặc các hệ thống thời gian thực. Tuy nhiên, trường hợp sử dụng phổ biến nhất của Ruby là các ứng dụng web. Và đối với trường hợp đó thì hiệu suất của Ruby là quá đủ. Bạn sẽ nhận được sự cải thiện lớn hơn trong ứng dụng của mình bằng cách tối ưu hóa các truy vấn cơ sở dữ liệu, sử dụng các bộ nhớ đệm một cách khéo léo, ủy thác các hoạt động tốn thời gian cho các quá trình nền,... Tất nhiên việc viết ứng dụng của bạn bằng một số ngôn ngữ khác nhanh hơn, có thể cho phép bạn giảm thời gian của ứng dụng một vài mili giây. Tuy nhiên, trong hầu hết các trường hợp, hiệu suất tốt hơn một chút không đáng để mất tốc độ và sự đơn giản mà Ruby cung cấp. Danh sách các trang web được xây dựng bằng cách sử dụng Ruby bao gồm rất nhiều trang web nổi tiếng như: twitter, airbnb, Github và Hulu. Nếu họ lựa chọn Ruby cho mình, thì Ruby cũng có thể sẽ là sự lựa chọn tốt cho bạn.
# 2. Xử lý:
Điểm này có thể là một phần của 'Hiệu suất', nhưng mình nghĩ nó xứng đáng được đưa ra thành một phần riêng.

Trong Ruby 1.8 chúng tôi đã gọi là "green thread", chúng được sắp xếp bởi trình thông dịch thay vì sử dụng các cơ chế luồng của hệ điều hành cơ bản. Các luồng như vậy rất linh hoạt - chúng hoạt động trên bất kỳ nền tảng nào mà thông dịch viên có thể chạy, vì chúng không phụ thuộc vào khả năng của hệ điều hành. Chúng cũng nhẹ hơn so với các bản sao gốc - chúng đòi hỏi bộ nhớ ít hơn và thường nhanh hơn để bắt đầu. Tuy nhiên, nó cũng có những hạn chế nghiêm trọng. Chúng được giới hạn trong một bộ xử lý.
Với việc phát hành phiên bản Ruby 1.9, cơ chế luồng đã được chuyển sang "native thread". Mỗi luồng Ruby được ánh xạ tới một luồng của hệ điều hành. Điều này cho phép các chương trình Ruby chạy trên nhiều bộ vi xử lý.

Hiệu suất của các ứng dụng đa luồng vẫn còn đôi chút hạn chế. Trình thông dịch Ruby sử dụng cơ chế được gọi là GIL (Global Interpreter Lock) chỉ cho phép thực hiện một luồng một lúc, ngay cả khi chạy trên hệ thống đa xử lý.

Điều quan trọng cần lưu ý liên quan đến MRI. Một số trình thông dịch khác của Ruby, chẳng hạn như JRuby, chạy trên máy ảo Java hoặc IronRuby, sử dụng DLR (Dynamic Language Runtime) của Microsoft thì không sử dụng GIL và do đó không có bất kỳ thiếu sót nào.

# 3. And, or, not:
Mình thích Ruby vì cú pháp thanh lịch và sự diễn cảm. Tuy nhiên, có một số cấu trúc trong ngôn ngữ mà thay vì làm cho cuộc sống của dev dễ dàng và dễ chịu hơn - nó lại có thể là một nguồn gây nhầm lẫn và làm cho code không thể đọc được.

Một ví dụ về những vấn đề như vậy đối với cú pháp của ngôn ngữ là các toán tử logic and, or, và not. Thoạt nhìn, chúng dường như chỉ là một cú pháp ngọt ngào - một lựa chọn thay thế dễ đọc hơn cho các -ký tự truyền thống &&, || và !, tương ứng. Tuy nhiên, khi kiểm tra kỹ hơn về hành vi của nó, hóa ra có một chút khác so với những ký hiệu truyền thống. Sự khác biệt là chúng có độ ưu tiên thấp hơn, có thể dẫn đến nhiều nhầm lẫn nếu bạn cố gắng sử dụng cả hai loại toán tử hoán đổi cho nhau.
Hãy xem ví dụ sau:
```
if user = User.find(user_id) and doc = Document.find(doc_id)
  # code using 'user' and 'doc' variables
end
```
Đoạn code trên sẽ không hoạt động như mong đợi với toán tử '&&' được sử dụng thay cho 'and'. Hãy sử dụng ví dụ đơn giản hơn để hình dung nó:
```
# using and operator
if var1 = 'AAA' and var2 = 'BBB'
  puts "var1: #{var1}"
  puts "var2: #{var2}"
end

=> var1: AAA
=> var2: BBB

# and now with &&
if var1 = 'AAA' && var2 = 'BBB'
  puts "var1: #{var1}"
  puts "var2: #{var2}"
end

=> var1: BBB
=> var2: BBB
```
Để có kết quả như mong đợi với toán tử && chúng ta cần thêm một số dấu ngoặc đơn vào:
```
if (var1 = 'AAA') && (var2 = 'BBB')
   đặt "var1: # {var1}"
   đặt "var2: # {var2}"
kết thúc

=> var1: AAA
=> var2: BBB
```
Ví dụ trên cho thấy rõ ràng, rằng and, or và not phải là các toán tử có thể khá hữu ích và giúp chúng ta viết code sạch hơn. Tuy nhiên, nó có thể được coi là vi phạm quy tắc POLS (Principle Of Least Surprise).

Nguồn: https://www.amberbit.com/blog/2014/9/9/ruby-the-bad-parts/