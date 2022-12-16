Kỹ năng giải quyết vấn đề thuật toán là một trong những kỹ năng quan trọng nhất đối với một lập trình viên. Các lập trình viên tuyệt vời có thể đưa ra các giải pháp về mặt khái niệm bằng cách hình dung và chia nhỏ vấn đề thành các phần nhỏ hơn. Sau đó, tùy thuộc vào lập trình viên để có thể viết một giải pháp "sạch đẹp", hiệu quả.
Với hy vọng rằng bài viết này sẽ giúp bạn trong hành trình giải quyết vấn đề tốt hơn, tôi sẽ ghi lại quá trình suy nghĩ của mình khi viết lên thuật toán sắp xếp hợp nhất (merge sort). Cũng là vì tôi đã không viết triển khai thuật toán này trong một thời gian khá lâu rồi nên có thể xem như tôi đang bắt đầu lại từ đầu nhé.

# Nắm bắt vấn đề
> Làm thế nào bạn có thể giải quyết một vấn đề mà bạn không hiểu đầy đủ?

Bạn đã bao giờ phải đối mặt với những khoảnh khắc mà bạn fix bug bằng cách thực hiện các thay đổi ngẫu nhiên và bạn cảm thấy như mình không đi đến đâu cả? Rất có khả năng điều này sẽ xảy ra khi bạn không hiểu hoàn toàn những gì gây ra tác dụng phụ hay lỗi, đó có thể là kết quả của vô số lý do: sự hiểu biết của bạn về công cụ bạn đang sử dụng có thể vẫn chưa đầy đủ, code của bạn có thể được cấu trúc theo một hướng mà làm cho nó khó có thể debug,...

Và giải quyết vấn đề thuật toán cũng vậy. Trong phần này, tôi sẽ trình bày cho bạn cách tiếp cận chung của tôi để giải quyết các vấn đề. Xin lưu ý rằng không phải tất cả các trường hợp là đều giống nhau và có những lúc bạn có thể cần phải thử nhiều phương pháp để có thể tìm ra được hướng đi đúng.

Tuy nhiên, bài viết này sẽ cung cấp cho bạn một bàn đạp để đi sâu vào và khám phá các cách giải quyết vấn đề thuật toán phù hợp nhất với bạn, và là của riêng bạn.

## Thu thập thông tin
Bước đầu tiên để hiểu bản chất của một vấn đề là thu thập càng nhiều thông tin càng tốt. Nghe có vẻ sáo rỗng nhưng mà quá trình thu thập thông tin, theo quan điểm của tôi lại là giai đoạn quan trọng nhất.

Mỗi người đều có cách thu thập và học hỏi khác nhau. Một số người thích đọc sách. Một số người thích xem video. Những người khác thì thích vẽ các sơ đồ và làm ví dụ.

Trong thời đại ngày nay, thông tin thuộc nhiều loại (và chất lượng) khác nhau đang tồn tại ở xung quanh chúng ta. Nắm vững nghệ thuật thu thập thông tin tốt và tiếp thu thông tin kịp thời là nguồn sống của các lập trình viên.

Việc bạn hiểu rõ về lĩnh vực của vấn đề như thế nào sẽ xác định chính xác mức độ bạn có thể làm tài liệu cho code, cũng như tối ưu hóa nó. Khi tôi nói làm tài liệu, tôi đang đề cập đến việc viết một giải pháp dễ bảo trì, dễ đọc và dễ hiểu. Những gì tôi có thường làm là hỏi những câu hỏi sau đây:

### Mục đích của thuật toán là gì?
Về cơ bản, bạn đang hỏi - Các trường hợp sử dụng cho thuật toán là gì? Trường hợp sử dụng sẽ chỉ ra phạm vi của các đầu vào có thể có. Trong hầu hết các trường hợp, khi thiết kế API cho thuật toán, người dùng lại có thể sẽ là các lập trình viên.

Nếu một junior dev sẽ sử dụng API của bạn, bạn sẽ muốn một thiết kế thật đơn giản, dễ sử dụng, xử lý tất cả các hoạt động phức tạp bên trong và trả về kết quả. Nếu một middle/senior dev sẽ là người dùng, bạn có thể muốn làm cho thuật toán của mình linh hoạt hơn để cung cấp một số tùy chọn tùy chỉnh để mở rộng phạm vi sử dụng của nó.

### Những trở ngại và thách thức chính là gì?
![](https://images.viblo.asia/230b0bd0-4eda-4576-8986-80589b09b23f.jpg)
Một vấn đề là một vấn đề bởi vì có những trở ngại và thách thức liên quan. Không có ý mỉa mai, nhưng tôi muốn nhấn mạnh điều đã nói ở trên để định vị lại mục đích chính đằng sau các thuật toán.

Một vấn đề rất khó giải quyết, bởi vì bạn chưa bao giờ thấy một vấn đề nào trước đây hoặc bạn (tính đến thời điểm hiện tại) không biết cách tiếp cận nó.

> Các vấn đề thách thức (hoặc hầu hết các vấn đề) là một tập hợp các vấn đề nhỏ hơn.

Nghiên cứu case study hiện tại của chúng ta: thuật toán sắp xếp hợp nhất thể hiện hoàn hảo điều đã nói ở trên.

> Liệt kê những gì bạn biết và những gì bạn không biết

Bắt đầu với những gì bạn biết. Trong hình ảnh ở trên, học sinh biết cách cộng và nhân, nhưng không biết phải làm gì khi chúng được kết hợp. Học sinh này đã làm đúng bằng cách hỏi một câu hỏi: "Tôi giải từ trái sang phải có đúng không?"

Bây giờ cậu học sinh cần tìm hiểu xem liệu phương pháp đó có khả thi thông qua nghiên cứu và thử nghiệm ứng dụng.

###  Môi trường hoạt động và các ràng buộc
Okay, điều cuối cùng sẽ không phải là một câu hỏi. Tuy nhiên, điều quan trọng là phải biết những hạn chế mà bạn được trao cho. Ví dụ, bạn làm việc với bộ nhớ bao nhiêu? Độ phức tạp thời gian mong muốn của thuật toán là gì?

Trong dự án hiện tại của tôi, tôi đã phải tối ưu hóa các thuật toán của mình để chiếm ít bộ nhớ nhất có thể. Do đó, thay vì tốc độ, lượng bộ nhớ được sử dụng bởi các thuật toán của tôi là quan trọng hơn. Xác định và biết những ràng buộc này sẽ giúp bạn hình dung ra những thách thức có thể xuất hiện, trang bị tốt hơn cho bạn để giải quyết vấn đề.

Hầu hết thời gian, các ràng buộc này sẽ không được thể hiện về mặt kỹ thuật, kiểu như "nó phải chạy với `O(log(n))`". Các lập trình viên giỏi có thể phân tích các mô tả phi kỹ thuật và các vấn đề hành vi và biến nó thành các đặc điểm kỹ thuật và yêu cầu.

### Thông tin về thuật toán sắp xếp hợp nhất
Bây giờ, chúng ta sẽ quay trở lại thuật toán sắp xếp hợp nhất. Chúng ta biết rằng mục đích của thuật toán này là sắp xếp một danh sách (trong trường hợp của tôi là theo thứ tự tăng dần).

> Vậy những yêu cầu nào khác cho thuật toán của tôi là gì?

Bởi vì tôi biết rằng thuật toán sắp xếp hợp nhất, theo định nghĩa sẽ có độ phức tạp thời gian là `O(nlog(n))`, nên tôi sẽ thêm nó vào danh sách các yêu cầu.

## Vẽ sơ đồ
![](https://images.viblo.asia/bc9cb36c-2f12-4661-83e5-2bb98043f409.jpg)
Bởi vì trí nhớ của tôi không tốt lắm, để có thể hình dung đúng và hiểu những gì tôi cần phải viết, tôi đã vẽ ra một sơ đồ.

Khi gặp những phần khó hiểu, tôi thường viết / nói ra từng bước khi tôi vẽ nó. Kiểu như:
> Được roài. Thuật toán sắp xếp hợp nhất hoạt động bằng cách chia một danh sách hiện có thành một nửa cho đến khi chúng ta không còn có thể chia được nữa. Một danh sách về mặt kỹ thuật sẽ là một danh sách đã được sắp xếp. Sau đó, chúng ta sẽ hợp nhất từng mảnh độc lập lại để tạo thành một danh sách. Trong khi hợp nhất các danh sách, chúng ta sẽ đặt các phần tử trong danh sách từ nhỏ nhất đến lớn nhất. Chúng ta sẽ tiếp tục quá trình này, cho đến khi có được một danh sách duy nhất.

## Viết mã giả
Viết mã giả là một cách tuyệt vời để tập trung vào logic, trái ngược với việc bị cuốn vào việc viết mã thực tế bị hạn chế bởi các ràng buộc kỹ thuật. Nó cho phép chúng ta viết ra logic của mình mà không phải lo lắng về các chi tiết nào bên ngoài khía cạnh logic trong việc giải quyết vấn đề ví dụ như chi tiết ngôn ngữ.

Điều này cho phép chúng ta có một cái nhìn tổng quan toàn diện về dòng logic trong chương trình của mình. Tất nhiên, chúng ta vẫn có thể sẽ gặp phải lỗi khi viết ra các chi tiết triển khai thực tế bằng ngôn ngữ của mình. Tuy nhiên, viết mã giả, cho chúng ta một cặp thấu kính khác để kiểm tra vấn đề. Đương nhiên, điều này mở rộng quan điểm của chúng ta và kết quả là, lỗi được phát hiện nhanh hơn nhiều.

Mã giả là một cách tuyệt vời để ghi lại các bước chính trong việc giải quyết vấn đề, mà chúng ta sẽ thảo luận trong các bước sau. Lưu ý rằng có nhiều kiểu viết mã giả khác nhau, nên hãy chắc chắn rằng bạn đang chọn phong cách có ý nghĩa nhất cho đối tượng mục tiêu của bạn. Ví dụ: nếu bạn đang viết mã giả cho các Java dev, hãy viết nó theo kiểu Java. Mặt khác, nếu bạn chỉ viết cho chính mình, hãy viết nó theo cách có ý nghĩa nhất đối với bạn. Thậm chí là bạn có thể bẻ cong các quy ước. =))

Đây là một đoạn mã giả mẫu được lấy từ wikipedia:
```
Sub fizzbuzz()
  For i = 1 to 100
    print_number = True
    If i is divisible by 3 Then
      Print "Fizz"
      print_number = False
    End If
    If i is divisible by 5 Then
      Print "Buzz"
      print_number = False
    End If
    If print_number = True Then print i
    Print a newline
  Next i
End Sub
```

## Phân tích các công đoạn chính khi giả quyết vấn đề
[](https://images.viblo.asia/fe224caa-dc5a-4733-ab89-13af2afdd868.jpg)
Khi bạn làm cơm rang Kimchi, nó sẽ trông giống như thế này:
1. Đập, tách trứng và rán lên
2. Thêm giăm bông, kimchi và đảo đều trong 2 phút.
3. Cho cơm vào và tiếp tục đảo trong 5 phút để không bị cháy.

Dù sao, cũng giống như việc nấu ăn, vẫn có những bước khi bạn giải quyết vấn đề. Hãy cùng xem thuật toán sắp xếp hợp nhất. Rất may, ngay cả trước khi đặt câu hỏi, vì tôi biết thuật toán hoạt động như thế nào, tôi đã có thể đưa ra các bước sau:
1. Trong mỗi vòng lặp, tôi sẽ chia danh sách thành 2 nửa.
2. Lặp lại quá trình này cho đến khi chiều dài danh sách là 1. Tại sao nhỉ? Bởi vì một danh sách có độ dài 1 chính là một danh sách `đã được sắp xếp`.
3. Nối các mảnh lại với nhau theo cặp cho mỗi lần lặp. Ví dụ: vì 6 nhỏ hơn 10, khi nối vào danh sách có độ dài hai, phần tử đầu tiên sẽ là 6, tiếp theo là 10.
4. Tiếp tục hợp nhất các danh sách con cho đến khi chúng ta có một danh sách duy nhất. Đây sẽ là kết quả được sắp xếp.

Có thể đưa ra các bước này là một dấu hiệu cho thấy bạn hiểu được vấn đề. Nếu bạn không thể biểu diễn các bước ở dạng viết hoặc bằng lời nói, đó là một dấu hiệu cho thấy bạn không hiểu lĩnh vực của vấn đề.

# Triển khai code
Nếu tất cả các bước khác là tạo mẫu và chuẩn bị, viết mã sẽ là bước cuối cùng. Đừng vội chán nản nếu bạn không đưa ra được giải pháp trong lần đầu (Tôi tự nói với chính mình điều này mọi lúc :smiley: ). Một trong những mục đích của bước này là kiểm tra xem logic của bạn có đúng hay không. Lỗi sẽ dễ dàng debug hơn miễn là bạn hiểu lĩnh vực của vấn đề. Phần khác sẽ giúp bạn là kinh nghiệm của bạn như là một lập trình viên và sự hiểu biết của bạn về ngôn ngữ.

Do đó, điều cực kỳ quan trọng là bạn phải viết mã thường xuyên, ngay cả khi bạn là một lập trình viên toàn thời gian chuyên nghiệp. Code ngoài công việc, luôn luôn làm việc như là làm các dự án phụ. Sự chăm chỉ làm việc của bạn sẽ không phụ bạn đâu :blush:

# Tối ưu code
Trong trường hợp bạn không nhận thấy, đoạn mã trên có tối ưu về mặt sử dụng bộ nhớ. Một thuật toán sắp xếp tại chỗ sẽ hiệu quả hơn nhiều và ngay cả khi bạn muốn có một bản sao hoàn toàn mới, có nhiều cách tốt hơn để viết thuật toán để loại bỏ mã dư thừa và làm tăng hiệu suất.

# Tìm kiếm các "edge cases"
Edge cases có thể hiểu đơn giản là các trường hợp dễ bị bỏ sót, chỉ xảy ra với một số điều kiện nhất định.
Lý tưởng nhất là bạn đã bao gồm tất cả các "edge cases" trong lần viết đầu tiên của mình, nhưng đôi lúc, khi mã được mang ra sử dụng, bạn bắt đầu gặp một số lỗi không thấy trong giai đoạn thử nghiệm.

Trường hợp nói trên là một cơn ác mộng đối với các lập trình viên. Tìm kiếm các edge case thực sự là rất khó khăn (toét cả mắt mà không ra) . Bạn sẽ trở nên tốt hơn thông qua:
- Luyện tập
- Kinh nghiệm

Bạn càng làm nhiều việc, bạn càng dễ dàng xác định những gì có thể xảy ra và đã sai sót trong quá khứ. Kinh nghiệm và sự chăm chỉ của bạn sẽ không phụ bạn ;)

## Hỏi ý kiến từ người khác
Sau khi tôi có phần triển khai, tôi chuyển mã này cho người khác và nhờ họ sử dụng nó. Nếu một lập trình viên khác sử dụng nó và gặp một số edge cases kỳ lạ, bạn sẽ có thêm việc phải làm :cry:

Hãy cảm ơn họ và mua cho họ một ly cà phê vì đã giúp bạn tiết kiệm hàng giờ và có thể là hàng ngày đau đầu. :hugs: 

# Đánh giá các giả định hiện có
Điều đầu tiên tôi nghĩ đến khi viết mã là các trường hợp cơ bản. Khi nhắc đến các nhiệm vụ lặp đi lặp lại, bộ não của tôi thường trôi nổi theo hướng tiếp cận đệ quy, bởi vì nó dễ đọc và dễ hiểu hơn (tốt, đối với tôi). Tuy nhiên, lưu ý rằng mỗi lời gọi đệ quy sẽ thêm chức năng đó vào ngăn xếp lời gọi. Lý tưởng nhất, một thuật toán tại chỗ sẽ có hiệu suất cao hơn, đặc biệt là về bộ nhớ, nhưng tôi sẽ không tiếp cận phương pháp tối ưu nhất trong lần đầu tiên.

Nếu bạn đang phải đối mặt với một thử thách, hãy thử giải quyết vấn đề trước. Sử dụng `brute force`, làm bất cứ điều gì cần thiết mà bạn nghĩ ra...
> Khi bạn đã có một giải pháp làm việc, việc xác định các mẫu/cách để tối ưu hóa giải pháp của bạn sẽ trở nên dễ dàng hơn.

Hãy chắc chắn rằng bạn đang giải quyết vấn đề trước theo cách tối ưu nhất xuất hiện trong đầu. Cố gắng đưa ra một cách "siêu lạ mắt" ngay trong lần đầu tiên sẽ khiến bạn mở ra nhiều lỗi hơn, điều này thường tương đương với việc lãng phí nhiều thời gian hơn.

# Bài học rút ra
> Giải quyết một vấn đề gần như vô nghĩa nếu không có gì được học qua quá trình

Đây là lý do tại sao nhiều lập trình viên không khuyến khích thực hành copy và paste (bao gồm cả bản thân tôi). 

Thật tuyệt vời khi bạn đã giải quyết được một vấn đề và khách hàng của bạn rất vui. Tôi muốn đề cập rằng, nếu bạn không học được gì từ việc giải quyết vấn đề, tất cả những gì bạn đã làm chỉ là đổi thời gian lấy tiền mà thôi. Trong trường hợp của một công việc, điều đó là tốt, nhưng nếu bạn đang làm việc trong một dự án phụ với trọng tâm là học tập và phát triển, thì đó lại là một vấn đề.

Ghi chú (có ghi chú bằng văn bản thực tế) về những gì bạn đã học để đào sâu thêm kiến thức hiện có. Dưới đây là một số câu hỏi mà bạn có thể hỏi để hướng cho bạn qua quy trình này nếu bạn không chắc chắn nên bắt đầu từ đâu:
1. Thử thách / khó khăn lớn nhất phải đối mặt khi giải quyết vấn đề là gì.
2. Nếu bạn có thể giải quyết lại vấn đề này, bạn sẽ tiếp cận nó như thế nào.
3. Một số "sai lầm" mà bạn đã từng gặp là gì? Liệt kê một số lý do tại sao bạn đã thực hiện các việc đó và một số cách có thể để tránh mắc lỗi tương tự trong tương lai.

Dù sao, tôi hy vọng rằng bài viết này đã làm bớt đi những mơ hồ trong cách tiếp cận của bạn đối với việc giải quyết vấn đề thuật toán.

Cảm ơn vì đã theo dõi!

Bài viết được tham khảo dịch từ [Algorithmic Problem Solving for Programmers](https://www.thecodingdelight.com/algorithmic-problem-solving-programmers/)