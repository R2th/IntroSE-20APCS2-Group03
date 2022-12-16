Cách đây hơn 2 năm lúc mới bắt đầu chập chững vào nghề và sau khi được join dự án đầu tiên là 1 trang web của công ty. Ngay lúc đó mình đã bị ngợp do dự án quá lớn và kiến thức mình còn rất nhiều hạn chế. Kỹ năng dùng stackoverflow của mình tự tin bao nhiêu thì mình lại fail bấy nhiêu trong vấn đề searching, lý do thì nhiều vô kể nhưng chủ yếu là web đó công ty dùng devexpress và nó có một cộng đồng hỏi đáp riêng chuyên biệt, với cách trả lời của các supporter rất khác lạ đối với mình, cộng với việc thiếu kỹ năng tìm key work cho vấn đề.

Thấy không ổn và chậm chạp mình đã lục tung google để tìm hướng giải quyết và vô tình đọc được 1 bài viết của dev nước ngoài với tựa đề "**[5 Steps to Solving Programming Problems](https://www.adrianprieto.com/5-steps-to-solving-programming-problems/)**" và giờ khi tìm lại có thêm 1 bài viết nâng cấp hơn đó là "**[10 Steps to Solving a Programming Problem](https://codeburst.io/10-steps-to-solving-a-programming-problem-8a32d1e96d74)**".
Cụ thể bài viết đó có nội như sau (viết dưới ý hiểu của mình nên có chút khác biệt).
## 5 Bước giải quyết vấn đề cho việc lập trình
Giải quyết vấn đề là yếu tố thiết yếu của LTV và mỗi người đều có những cách giải quyết khác nhau. Cá nhân tác giả tìm ra được giải pháp không chỉ giúp chúng ta giải quyết vấn đề mà nó còn nhanh hơn, hiệu quả hơn.
### 1. Đọc các vấn đề nhiều lần cho đến khi bạn có thể giải thích nó cho người khác
![](https://images.viblo.asia/e6d0b1c9-cbec-4fa9-a036-0cad3dcc4d7e.jpg)

Đây là bước lâu nhất, quan trọng nhất , đọc vấn đề vài lần, cho đến khi bạn hoàn toàn hiểu nó, nếu bạn không hiểu nó, bạn sẽ không thể giải quyết được nó. cách tốt nhất để biết nếu bạn hiểu vấn đề là bằng cách có thể giải thích nó cho người khác.

### 2. Giải quyết vấn đề theo cách thủ công
> Nothing can be automated that cannot be done manually!

Mọi mã code chúng tôi đều xây dựng trên những nền tảng ban đầu và đó là quy trình thủ công. Điều tôi muốn nói tới là giải quyết vấn đề bằng tay đầu tiên, theo cách đó bạn biết chính xác những gì bạn muốn và có thể tự động được, điều này sẽ giúp bạn tiết kiệm rất nhiều thời gian lãng phí nếu bạn chỉ bắt đầu viết mã như một coder thông thường.

Bằng những bài test case bạn hãy kiểm tra mã của bạn để xác thực nó. Chú ý đến từng bước, bạn biết đó khi vòng lặp chạy trong đầu bạn cũng đã hình dung được từng bước của vòng lặp, hãy nháp nó ra giấy để biết rằng nó là 1 trường hợp đúng.

### 3. Làm cho giải pháp thủ công của bạn tốt hơn
Xem bạn có thể làm cho quy trình của bạn tốt hơn không, nếu có cách nào dễ dàng hơn để thực hiện điều đó hoặc nếu bạn có một số bước bạn có thể cắt để đơn giản hóa nó (như vòng lặp). Bước này rất quan trọng, hãy nhớ rằng việc tái tạo lại quy trình trong đầu của bạn dễ dàng hơn nhiều so với việc thực hiện trong đoạn mã của bạn.

![](https://images.viblo.asia/10784e4f-ab3b-4a9a-a582-c1d4b989dd58.png)

Lúc này bạn sẽ có một vài suy nghĩ về muốn viết về những mã mà bạn chưa làm được trong đây, chúng tôi có thêm một bước để hỗ trợ, tôi hứa với bạn nó sẽ làm cho đoạn mã cuối cùng của bạn dễ dàng hơn khi viết.

### 4. Viết giả code
Giả mã là một mô tả chi tiết về những gì một chương trình phải làm, điều này sẽ giúp bạn viết mọi dòng mã cần thiết để giải quyết vấn đề của bạn.

Đôi khi các lập trình viên có kinh nghiệm bỏ qua bước này, nhưng tôi có thể đảm bảo với bạn dù bạn có kinh nghiệm thế nào đi nữa, nếu bạn viết mã giả, quá trình viết mã cuối cùng sẽ dễ dàng hơn nhiều vì bạn chỉ phải dịch từng dòng mã giả vào mã thực.

*đây là điều mình hứng thú nhất bởi mình chả cần suy nghĩ nhiều đến các hàm của ngôn ngữ, codingconvention hay nhiều thứ khác. Chỉ cần đặt bút xuống và viết những ý tưởng của mình thế là thành công :smile:.*

Ví dụ nhé: *Tạo hàm tính bình phương một số *

````
# Khởi tạo giá trị 'n'

# Nhân chính nó với nó

# Trả về kết quả của phép nhân
````

### 5. Thay thế code thật vào giả code
Đây là phần thú vị, bây giờ bạn biết chắc chắn chương trình của bạn nên làm gì, chỉ cần viết một số mã và kiểm tra nó. hãy nhớ rằng bạn luôn có thể làm cho mã của bạn tốt hơn dọc theo quá trình phát triển.
```
def square(n)
  variable = n   #=> Khởi tạo giá trị 'n'
  answer = variable * variable   #=>  Nhân chính nó với nó
  Return answer    # Trả về kết quả của phép nhân
end
```

Cuối cùng là tối ưu hóa nó
```
def square(n)
  n * n
end
```

Điều này có vẻ giống như một quá trình rõ ràng, nhưng hầu hết mọi người bỏ qua một nửa của nó và bắt đầu vào bước 5, dẫn đến lãng phí thời gian quý báu khi gặp khó khăn.

Dù vấn đề của bạn phức tạp thế nào đi nữa, tôi đảm bảo với bạn 5 bước này sẽ giúp bạn giải quyết nó trong thời gian ít hơn và ít bị đau đầu hơn.

Lưu ý: Nếu vấn đề của bạn quá phức tạp, hãy phân chia nó thành các vấn đề nhỏ, đó là kỹ thuật được gọi là “**[Divide and conquer algorithm](https://en.wikipedia.org/wiki/Divide_and_conquer_algorithm)**” .

## Thực tế có áp dụng được không ?

![](https://images.viblo.asia/98e24456-07c2-45b4-84da-79caaf057463.png)

Hồi mới tìm được bài viết này mình cảm thấy đây thực sự là chân lý, nhưng giảng viên trương trường của mình tại sao lại không đưa ra cho chúng mình có cái nhìn tổng quát nhất về nghề mình đang và sẽ làm việc này nhi ??.

Nhưng càng về sau mình càng nhận ra việc thực hiện 5 bước này là không đúng điều hầu như mọi người làm là dành 30% vào bước 1 và 70% vào bước 5 (bao gồm cả việc test), và bước 5 là 1 vòng lặp vô hạn cho đến khi bạn rời dự án thì thôi :D :D :D.

Nhưng thực sự khi bạn đi làm đủ lâu hoặc làm cùng một đội ngũ giỏi bạn sẽ có nhiều ý tưởng thật sự điên rồi nhưng hết sức hiệu quả. Và mình rút ra được một vài quy tắc khi làm một task yêu cầu bạn phải đầu tư rất nhiều tư duy như sau:

1. Nắm rõ đề bài, yêu cầu. Bằng cách sử dụng "5 why?"
2. Tự đưa ra cách giải quyết và 1 cách backup. Điều này là rất cần thiết nếu bạn không muốn bị dồn vào thế đường cùng. Luôn tạo cho mình 1 con đường thứ 2.
3. Tạo ra mã code và sửa lỗi theo các case của mình và test. Xin ý kiến của mọi người cùng team.
4. Đến đây nếu bạn không làm được hoặc làm không nổi nữa, yêu cầu đã vượt quá sức của bạn thì hãy đến với bước 5.
5. Hãy tham khảo ý tưởng của đối thủ.

*Cách này rất khó với những người mới. Nhưng những nhà phát triển lâu lăm thì nó là một trong những yếu tố bắt buộc.*

Để chứng minh cách này mình có một câu hỏi là: Đây là bức ảnh của Pitu 1 phần mềm chỉnh sửa ảnh của hàn quốc. Vậy họ tạo ra frame bằng cách nào? Có phải chỉ là ghép ảnh lên trên hay không ? ?? Tinh mắt vào nhé :D.

![](https://images.viblo.asia/45a8f373-5bb7-4132-9d44-86166132fcf6.JPG)

Nếu không tìm được cách thì mình đã tìm ra  1 cách mà theo mình Pitu đã sử dụng nó.
[This is link](https://github.com/tuanbacyen/Make-Frame-IOS-APP).

Cảm ơn các bạn đã đọc. Cùng chia sẻ ý kiến bên dưới nhé :D. Thank!