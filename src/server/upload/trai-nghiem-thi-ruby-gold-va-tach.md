Xin chào các bạn.

Lời nói đầu thì thường đi thi chứng chỉ xong, chúng ta sẽ hay viết những bài như này nếu như đỗ. Tuy nhiên, các bạn có thấy ngán mấy bài "Người thành công nói cái `#%&amp;*!#$#` gì cũng đúng không"? Thế nên mình viết bài này để cho mọi người thấy rằng dù thất bại thì cũng có khá nhiều kinh nghiệm hay ho để chia sẻ.

# Lý do đi thi

Lý do đơn giản nhất thì thế mạnh lập trình của mình là Ruby thì mình thi chứng chỉ của Ruby Association thôi :v

Và tuy Ruby Silver cũng làm mình khá thỏa mãn, nhưng Ruby Gold lại là phần đi sâu vào OOP nên mình quyết tâm cày thêm Ruby Gold để ôn lại OOP. Hơn nữa, thi Ruby Silver xong dừng thì nó hơi... nửa vời. Mình muốn leo lên level cao nhất ở Ruby để ngôn ngữ lập trình thế mạnh của mình thật sự mạnh.

# Tại sao lại thi lúc này

Sau kì thi Ruby Silver, mình đã định tạm nghỉ để tập trung vào 1 số mảng khác quan trọng rồi Ruby Gold để năm sau với lý do: Các chứng chỉ Ruby Programmer sẽ đổi version từ 2.1 lên 3.1. Đang ở version đề thi có rất nhiều tài liệu ôn và support, bỗng dưng thi ở version mới toanh thật sự cơ hội đốt tiền rất cao(và như tiêu đề thì mình tạch thật)

Tuy nhiên, mình có 3 động lực để tiếp tục như sau:
- Chính sách dự thi của Ruby Assocaites: trong thời gian từ tháng 10-2022 tới tháng 1-2023. Nên mình bị kích thích bởi việc muốn thử vì không mất tiền thi lần 2 khi rủi ro xảy ra.

![](https://images.viblo.asia/60887b37-1049-4735-8ab2-3d91ff583ad4.png)

- Trong cơn say chiến thắng Ruby Silver, mình có làm thử Ruby Gold nghiêm túc và kết quả là như ảnh dưới

![](https://images.viblo.asia/7ab79fa5-a79f-475a-9ee7-56f7a021a222.png)

Cơ mà xét cho cùng so với lần đầu tiên mình làm đề Silver nghiêm túc chỉ với 1 năm rưỡi kinh nghiệm code Ruby(chính thức, không kể đi thực tập) mà chỉ có 42 điểm thì lần này cũng không tệ cho lắm nên mình tự tin nếu học và luyện thì sẽ đỗ
- Sau khi có Ruby Silver, mình bỗng có vài Rails Girl(thuật ngữ đặc thù để chỉ các nữ developer của Ruby) ở phía VN hâm mộ xin học hỏi kinh nghiệm. Thế nên thi Ruby Gold để ... làm quen với nhiều bạn nữ hơn :v
- Muốn thử thách bản thân mạo hiểm 1 chút xem liệu tài liệu outdate thì mình có thể pass được không

# Chiến thuật học thi

Sau khi trình bày ra các lý do trên thì chúng ta sẽ vào phân trọng tâm của bài này. Mình sẽ nêu ra hết các chiến thuật, cách học và tài liệu trong lần này như sau:

## Tài liệu

- [Quyển sách luyện đề bản giấy](https://www.amazon.co.jp/%E6%94%B9%E8%A8%822%E7%89%88-Ruby%E6%8A%80%E8%A1%93%E8%80%85%E8%AA%8D%E5%AE%9A%E8%A9%A6%E9%A8%93%E5%90%88%E6%A0%BC%E6%95%99%E6%9C%AC-Silver-Gold%E5%AF%BE%E5%BF%9C-Ruby%E5%85%AC%E5%BC%8F%E8%B3%87%E6%A0%BC%E6%95%99%E7%A7%91%E6%9B%B8/dp/4774191949 "Quyển sách luyện đề bản giấy"): Đây là quyển sách rất quan trọng trong chiến lược của mình. Mặc dù đi thi đã bị outdate nhiều nhưng vẫn có phần dùng lại được. Các bạn có thể dùng sách mềm và tool translate hoặc là chơi sách cứng tiếng Nhật như mình. Sách kích thước nhỏ vừa đủ chuẩn đọc trên tàu của Nhật nên với mình là lợi thế lớn.
- [school-ctc](https://www.school.ctc-g.co.jp/ruby/training_ruby_gold_01_10.html "school-ctc") đây là nơi luyện đề khá ổn với 60 câu và có thể chấm điểm tại trận luôn. Dễ luyện nhanh vì chia 10 câu chấm điểm 10 câu
- https://rex.libertyfish.co.jp/ Trang luyện đề nổi tiếng được recommend ngay trên chính trang chủ của Ruby Association.

# Chiến thuật đầu tiên: Vừa học vừa kiểm tra và ghi chú lại
Chúng ta không thể học thuộc như những con vẹt được, nhất là với Ruby 3.1 thì chưa chắc những câu trong các tài liệu 2.1 đã chạy đúng với 3.1 đâu. Nên việc đọc câu hỏi, chạy thử code và ghi chú lại là chuyện phải làm. Khi chắc chắn đúng rồi thì câu nào chạy được ở 3 mình giữ, không chạy được thì mail thẳng vào info@ruby.or.jp hỏi để xác nhận(Rất yên tâm là trong vòng 12 tiếng kể từ khi gửi email thắc mắc thì thế nào cũng sẽ có giải đáp ngay lập tức bằng tiếng Nhật hoặc tiếng Anh). Và khi chắc chắn nó không chạy ở 2 thì mình loại luôn ra khỏi đầu không care.
Và những phần còn lại thì mình vừa học, vừa tìm cách giải thích tại sao code chạy thế và memo lại. Cái này thì tùy các bạn có cách memo khác nhau, nhưng mình tự tin rằng với kiến thức kĩ thuật cần memo thì mình có thể xuất cả techblog =)) Và mình đã dùng cách này với chính Ruby Silver: https://viblo.asia/p/on-thi-ruby-silver-v-21-vyDZOv0xKwj/

Còn memo Gold thì lúc nào mình đỗ mình sẽ đưa ra cho các bạn.

# Chiến thuật 2: Đi tàu nhanh
Đây là chiến thuật sẽ hơi đòi hỏi phần nhân cách mọt sách và việc di chuyển bằng phương tiện công cộng như xe bus và tàu.
Ở Nhật, các bạn có thể được nghe tới rất nhiều về việc đọc sách trên tàu như 1 nét văn hóa bla bla gì đó :v Thật ra không chỉ có đọc sách mà các vị còn chơi game, ngủ hay thậm chí là còn mở cả máy tính ra làm việc ngay trên tàu. Và nó cũng nói thật chả có gì đáng để kính phục đâu. Nhưng trong case của mình thì đây là cách khá hữu hiệu.

Với không gian đông và chật như ở trên tàu của Nhật lúc đi làm, lúc nào được ngồi mình sẽ lấy sách ra để luyện câu hỏi trong sách, sau đó tẩy đi và luyện lại nhiều lần. Khi phải đứng thì mình sẽ dùng điện thoại để chiến ở trang school-ctc để load ít hơn. Trang rex mình sẽ để dành lúc ở nhà có thời gian ngồi máy tính cho tiết kiệm dung lượng 4G.

Mình sẽ gọi đây là chiến thuật "Tàu nhanh". Ai cũng thích tàu nhanh vì nó nhanh và sướng :3
## Chiến thuật 3: Mình có fangirl từ hồi Ruby Silver mà nhỉ?
2 chiến thuật trên thì mình đã áp dụng và có kiểm chứng với Ruby Silver nên chắc chắn ổn. Và đây là điểm mới cho lần ôn thi này của mình: ôn thi có bạn học cùng.
Ở chiến thuật này có 2 điểm mấu chốt:
- Vẫn phải tự ý thức và kiến thức của bạn. Bản chất cách mình áp dụng là tìm 1 cách để giải thích những câu hỏi mình gặp phải trong quá trình luyện thi. Chứ không được quá ỷ lại vào bạn cùng học.
- Bạn cùng học là người support và biết lắng nghe mình. Không cần biết kiến thức cũng được. Nếu không thì rất có thể ăn block.(Hơi giống như là chat với chatbot chạy bằng cơm :v )

Như vậy các bạn có thể kiếm gồm có đồng nghiệp, người cùng hội dùng Ruby, hay 1 số case là bạn cùng phòng đóng vai trò người lắng nghe,... Với case mình thì có fan nữ hâm mộ thì tội gì không tâm tình dãi bày với các fan :v Các Rails Girl cũng giúp mình thì rất tiếc là các bạn ở VN và không thể trực tiếp thi được hiện tại. Mình cũng đã tư vấn mail thẳng cho Ruby Associate nhờ support thử và đổi lại các bạn giúp mình với suy nghĩ: không thi được nhưng cũng học hỏi được và có kiến thức. Và cũng khá may cho mình có các em gái support như thế. Chưa kể nói chuyện nhẹ nhàng, tình cảm nên việc ôn thi cũng đỡ căng thẳng :v

Và cách thức thực hiện thì mình thống nhất đối phương sẽ đọc câu hỏi như mình, không dùng máy tính để compile code ra đáp án luôn. Đáp án đối phương đưa ra không nhất thiết phải đúng, nhưng bản thân mình phải có đáp án đúng và phải lý giải được luồng code đã hoạt động như nào. Và để làm được như vậy thì 2 cách bên trên học phải thật thuần thục và hiểu chứ không phải luyện thi không não. Và case của mình thì rất may là có 1 mức độ để đo luôn là các bạn code Ruby mình giải thích cho nếu hiểu thì mình đã giải thích thành công và bản thân mình cũng hiểu được vấn đề đó.

![](http://vtitech.vn/wp-content/uploads/2022/11/Screenshot_20221119_103743.png)

Những tưởng các phương pháp trên, mình có thể pass Ruby Gold vì trên sách và trang ctc mình làm 100% liên tục trong 1 tuần, trên REx thì điểm đã trên 90, nhưng...

# TẠCH và các lý do
Thôi nào các bạn, xem phim phải nhìn tiêu đề và biết ai là nhân vật chính chứ :v Thế nên đọc bài này cũng phải chú ý lại tiêu đề để biết kết quả. Không phải phương pháp nghe hay và đã ứng dụng hiệu quả là mình thành công đâu.

![](https://images.viblo.asia/73dd0f16-ecdc-47c9-b6a9-34a29cafbab6.png)

Cùng mổ xẻ nguyên nhân thì:
- Đề thi mới tinh gọn hơn, đi vào các phần quan trọng như OOP, regex, block-proc-lambda,... bỏ hết các râu ria Fiber với socket đi NHƯNG có những cú pháp của version 3.1 khiến mình không thực hành nhiều nên không biết
- Có nhiều câu dùng 1 đoạn code nhưng hỏi khác so với tài liệu. Mình ôn cũng nhớ đại khái nó sẽ chạy như thế nên khi hỏi khác đi mình đã sai oan. Ví dụ luôn là `const_missing`
```ruby
class Foo
  def self.const_missing a
    p "#{a}"
  end
end
Foo::B
```
Khi ôn thì mình được câu hỏi kết quả đoạn code này là gì và khi thi mình ăn câu hỏi `def ............. a` điền cái gì. Mình đã mất điểm ngu tức tưởi vì lý do chọn được `Object.const_missing` và `B`, nhưng chọn đáp án 2 là `const_missing` và `Foo::B`, trong khi đáp án đúng là `self.const.missing` và `Foo::B`. Lẫn lộn tai hại giữa instance method và class method.
- Câu hỏi "3 môn phối hợp" lắt léo:

```ruby
class Company
  __(1)__
  attr_reader :id
  attr_accessor :name
  def initialize id, name
    @id = id
    @name = name
  end
  def to_s
    "#{id}:#{name}"
  end
  __(2)__
  def <=> other
    self.id <=> other.id
  end
end

c1 = Company.new(3, 'Dog')
c2 = Company.new(2, 'Fish')
c3 = Company.new(1, 'Cat')

print c1.between?(c2, c3)
print c2.between?(c3, c1)
```
Ở phần 1 bạn phải chọn đúng là module nào được dùng và dùng như nào(đáp án là `include Comparable`) và phần 2 phải chọn là đánh `protected` hay `private`(Theo mình chạy code thử thì `private` cũng được. Hơi ảo. Để mình xem lại). Các tài liệu thi sẽ không có những câu như này đâu mà tách riêng lẻ ra. Mình khả năng cũng đã mất điểm ở câu này.
- Cũng là `private` mà nó lạ lắm: Hãy xem đoạn code sau và chạy thử nó ở 2.x và 3.1. Quả này thì mình không đỡ nổi được. Đúng nghĩa đổi version nên không thể tránh được việc mất điểm
```ruby
class Sample
  def hoge
    self.fuga # 2.1 là báo lỗi ở đây
  end

  private

  def fuga
    puts "fuga"
  end
end
Sample.new.hoge # => fuga ở 3.1
```

# Kế hoạch tiếp theo
Và như vậy mình đã thử dùng kiến thức ở 2.1 đi thi 3.1 và đã không pass. Tuy nhiên mình có 1 lần thi free. Ngay sau lần không pass này mình đã nộp form để có thể được dự thi lần tiếp không mất phí. Và khả năng nhanh nhất là tháng 2 mình sẽ đi thi lại nếu muốn thử thách còn không thì đợi sách luyện đề mới ra cho an toàn.

1 điều nữa là mình cũng khá yên tâm vì khi thi nhìn thấy sự khác biệt đã biết trước kết quả này. Về nhà tra thử thì có cụ này đi thi Gold 3 và điểm thì cũng suýt soát trượt(dù đang cầm Gold 2.1): https://zenn.dev/universato/articles/20221011-z-rubygold3

Cao thủ mà suýt soát qua thì mình tạch cũng là chuyện bình thường :v Lấy lại tinh thần ôn tiếp thôi

# Kết bài
 Cảm ơn các bạn đã đọc hết bài của mình. Mình sẽ cố gắng để thử lại lần nữa vào năm sau và tiếp tục ôn luyện.

Xin cảm ơn lực lượng bạn ôn bài hùng hậu đã support mình thời gian qua dù mình chưa thành công.