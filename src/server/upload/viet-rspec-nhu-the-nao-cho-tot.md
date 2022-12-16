Hồi mình mới sử dụng Rspec mình dường như chưa hiểu thực sự ý nghĩa của viết Unit Test (Rspec) nên chỉ viết cho có, hay chưa có tâm. Viết unit test để làm gì, mặc dù cũng có Google đọc các thể loại chân kinh của các vị tiền bối để lại, nhưng có vẻ đạo hạnh không cao nên không thể giác ngộ. Và tất nhiên, những phần hướng dẫn unit test trong cuốn tutorial ROR đời đầu mình mới học đều được mình bỏ qua mà không một chút ngó ngàng. Đến với project đầu đời, khi rspec là bắt buộc, mình cảm thấy khá là tốn thời gian cho việc viết rspec này, thực sự lúc đó vẫn chưa biết nó hữu ích chỗ nào.  Sau bao lần nước đổ lá khoai thì mình cũng ngấm được một ít là đôi khi thà không viết test còn hơn viết test yếu (một cách sơ sài, cẩu thả). Bởi vì khi bạn không viết test, bạn biết bạn phải test mọi thứ, nhưng với cách viết test yếu, bạn đang tự đánh lừa mình và mọi người xung quanh rằng nó ổn. Làm thế nào để phát hiện ra cách viết test nào là yếu và chúng ta không bị phụ thuộc vào nó?

**Mục đích viết Rspec :**

* Đầu tiên dễ thấy nhất đó là bạn có một evindence làm hài lòng sếp, hài lòng khách hàng rằng Unit test của tôi cover được xx% code
* Viết unit test giúp kiểm tra đoạn code vừa viết có chạy hay ko.
* Giúp dev liệt kê các trường hợp có thể xảy ra với đoạn code mình vừa viết. Qua đó giúp phát hiện các trường hợp lúc code bị thiếu, chưa nghĩ ra. Cũng như có thể tái hiện các trường hợp mà khi test tay chưa test được.
* Đây là một hình thức giải thích khá hiệu quả, giúp reviewers và teamates đọc hiểu code nhanh hơn.
* Viết unit test tốt thì khi maintain dự án sẽ giảm thiểu rủi ro và đỡ mất nhiều effort khi mà một thời gian sau bạn chỉ cần nhìn vào rspec là có thể hiểu được code .

## Viết tối đa tỉ lệ cover các case cao nhất nếu có thể

Ruby có một cái gem là gem "simplecov", chỉ cần cài nó lên, nó sẽ hỗ trợ tính toán cho bạn những dòng code nào đã được cover test, những dòng nào chưa. Lúc đó với mục tiêu cover code thật là dễ dàng để bạn đạt phần trăm cover cao khi chỉ cần test vài trường hợp là nó đã cover được 100% file muốn unit test.
Một số người cho rằng việc này sẽ đảm bảo cho một hệ thống sẽ sạch bug 100% nhờ việc unit test đã bao phủ tất cả các dòng code trong hệ thống, một số người khác lại cho rằng việc này chỉ làm mất thời gian mà không hoàn toàn đạt được mục đích thật sự của việc viết Unit test. Ruby là một ngôn ngữ động (dynamic language), cho nên mình tin rằng Code Coverage là một thứ hết sức cần thiết tuy nhiên chưa thật sự là đủ.

Thường thì 100% Code Coverage chỉ nhằm thể hiện rằng hệ thống đã được đảm bảo 100% không có bug và nghe cũng khá là xịn xò đấy chứ, tuy nhiên trong thực tế thì việc này chỉ bảo vệ hệ thống của bạn khỏi các lỗi runtime thôi.

Rspec vẫn sẽ pass, Unit Test vẫn sẽ ngon lành, nhưng ở Production thì khác, sẽ có các data hay trạng thái được sự dụng mà đến bạn còn chả ngờ tới, test case cũng không có case đấy  cho nên mặc dù code Production đã đạt 100% coverage nhưng không thể cover hết được tất cả các case được những lỗi chỉ có chị tester mới phát hiện được .

Ruby không phải là ngôn ngữ biên dịch, nó không có một trình biên dịch nào cả (compiler) và thiếu đi những bước kiểm tra hệ thống mà các ngôn ngữ khác được tích hợp sẵn. Khi bạn thực thi một file Ruby, có kha khá cách để khiến trình thông dịch của Ruby fail và ngừng thực thi, tuy nhiên những exceptions gặp nhiều nhất trong khi code Ruby (on Rails) là các runtime exceptions.

Việc đảm bảo độ bao phủ cho hệ thống đã đóng phần nào vai trò của một trình biên dịch, đó là đảm bảo cho code ít nhất là sẽ CHẠY ĐƯỢC!

Những exception mà trình thông dịch sẽ bắt được ngay và luôn bao gồm MethodMissing, ArgumentError, NameError, và một số exception khác như Hash#KeyMissing từ lỗi liên quan đến các thư viện hay lỗi do gem từ bên thứ 3.

Đạt được 100% coverage không có nghĩa là code của bạn đã được test một cách đầy đủ - ý nghĩa thật sự của việc này là tất cả các dòng code đã được test, không có nghĩa chúng được test với mọi trường hợp.

Giả sử mình có hàm này :

```
def check_positive_number a
    if a > 0
        "positive number"
    esle
        "negative number"
    end
end
```

Giả sử với đoạn code trên bạn chỉ cần viết có 2 case a lớn hơn 0   và a  nhỏ hơn 0 thì tỉ lệ Code Coverage đã đạt 100%. Tuy nhiên nếu a  là chuỗi thì sao nhỉ ? . Bùm "ArgumentError: comparison of String with 0 failed" . Chúng ta dường như chỉ quan tâm đến mục đích chạy qua tất cả các dòng code mà lại quên đi kiểu giá trị của tham số. Thiếu sót này chính là nguy cơ tiềm ẩn của những bug không đáng có trong tương lai.


100 % Code Coverage  không  thể nói nên bạn viết code không bug đã cover hết các case, bạn cần cover hết các C0, C1, C2 test coverage. Để hiểu C0, C1, C2 test coverage là gì bạn có thể tham khảo bài viết [này](https://viblo.asia/p/gioi-thieu-khai-niem-test-coverage-c0c1c2-ORNZqgyq50n)


Tuy nhiên sự khác biệt về hiểu quả của việc đạt 100% coverage với việc đạt được tý lệ thấp hơn không thể tính toán một cách rõ ràng được. Bạn nên nhớ rằng, 100% coverage KHÔNG PHẢI có nghĩa là code của bạn không có bug, điều này chỉ có ý nghĩa là hệ thống chỉ pass được những bài test cơ bản nhất: có thể thực thi và không có lỗi runtime. Tuy nhiên phòng cháy còn hơn chữa cháy mà.

Với một project mới, chúng ta nên bắt đầu với việc bắt buộc phải đạt 100% coverage, việc này hoàn toàn có thể kiểm soát được bằng gem SimpleCov và config cho CI fail khi coverage ở dưới một ngưỡng nhất định. Với SimpleCov, bạn có thể mở file `coverage/index.html` ở root của hệ thống để có thể nắm được covered và missed lines của hệ thống.

Với những project đã tồn tại từ lâu và thiếu coverage thì việc cover được toàn bộ code cũ (có khi của những người không còn ở trong dự án) là vô cùng khó, và đôi khi không dám sửa đến những đoạn code cũ do nó đã tồn tại từ lâu và không thật sự hiểu được nó có ảnh hưởng như thế nào đến các chức năng cũ.
Tuy nhiên dựa vào coverage hiện tại thì bạn có thể phân tích được mức độ ảnh hưởng và nguy cơ của việc thay đổi code. Sau đó có thể báo lại với các bên để mọi người hiểu được nguy cơ đó.  Chúng ta cũng có thể sử dụng thêm các tool từ bên thứ 3 như Coveralls, CodeCov, hay CodeClimate để kiểm soát coverage theo thời gian và hiểu rõ hơn về phần nào đang bị thiếu cũng như sự nghiêm trọng của chúng.

## Sử dụng RSpec's shared_examples_for

Rspec của bạn cũng cần được tổ chức một cách rõ ràng và dễ hiểu. Ở Rails, mọi người thường nhắc đến nguyên tắc DRY trong khi code và khi viết test cũng vậy, RSpec đã cung cấp cho chúng ta một công cụ gọi là shared_examples_for giúp cho chúng ta tránh lặp lại những đoạn test trùng nhau, làm cho các file rspec của chúng ta trông ngắn gọn và dễ follow hơn.
Đế sử dụng nó thì cực kì đơn giản, tất cả đều có trên google nhưng quan trọng là chúng ta có chịu tìm hiểu hay không mà thôi. 
Giả sử trong ứng dụng của mình có 2 model đó là User và Project, cả 2 đều tồn tại các relation phục vụ cho chức năng follow. Việc liên kết các relation và thực hiện việc follow được viết trong module Followable.

Để cụ thể hơn, hãy tạo một ví dụ đơn giản. Mình muốn mô tả hành vi của những con chó khác nhau. Mỗi một loại chó có thể thực hiện một số hành động thông thường, nhưng cũng có một số hành động nhất định mà họ không thực hiện. Ví dụ, Snuff có thể sủa và gầm gừ, nhưng không thích nhảy. Mặt khác, Scooby-Doo thích nhảy và chạy trốn, nhưng không gầm gừ. Scrappy-Doo quá nhỏ để sủa, nhưng nó rất thích gầm gừ.

Giờ chúng ta sẽ viết rspec cho mỗi hành động cho mỗi chú chó  vào một hàm chung :

```
shared_examples 'a normal dog' do |growl: true, bark: true, jump: true|
  it { is_expected.to be_able_to_growl } if growl
  it { is_expected.to be_able_to_bark } if bark
  it { is_expected.to be_able_to_jump } if jump
  it { is_expected.to be_able_to_flee }
end
```

Giờ mình sẽ viết rpsec cho từng chú chó :

Giả sử nếu mình không dùng `shared_examples`  mỗi Rspec của một chú chó sẽ như này, cụ thể mình viết chú chó Snuff :

```
  context 'Snuff' do
    subject(:snuff) { Dog.new(true, true, false, true) }
     it { is_expected.to be_able_to_growl }
     it { is_expected.to be_able_to_bark }
     it { is_expected.to be_able_to_jump }
  end
```

Thật dài phải không nếu mình dùng shared_examples sẽ ngắn hơn rất nhiều : 

```
describe 'Dogs behavior' do

  context 'Snuff' do
    subject(:snuff) { Dog.new(true, true, false, true) }
    it_behaves_like 'a normal dog', jump: false
  end

  context 'Scooby-Doo' do
    subject(:scooby_doo) { Dog.new(false, true, true, true) }
    it_behaves_like 'a normal dog', growl: false
  end

  context 'Scrappy-Doo' do
    subject(:scrappy_doo) { Dog.new(true, false, true, true) }
    it_behaves_like 'a normal dog', bark: false
  end
end
```

Chúng ta cần gom lại các đoạn test giống nhau, là cứ copy chỗ này bỏ vào chỗ khác như ở ví dụ trên, làm cho đoạn test của chúng ta dài loằng ngoằng :v:
Vậy làm thế nào để tránh việc duplicate các đoạn test, cùng xem cách mà mình sử dụng thằng shared_examples_for để thực hiện việc đó nhé.
Chúng ta sẽ tạo một thư mục để viết những đoạn test có thể sử dụng lại. Có thể nói thằng này tương tự như một module trong Rails vậy thôi.


**Kết**

Chúng ta nên viết  Rspec một các chỉnh chu nhất có thể không chỉ viết để pass 100 % mà cần đảm bảo cover hết tất cả các case. Viết rspec sao cho dễ nhìn không làm người review chán khi đẩy code lên . Chúc các bạn cuối tuần vui vẻ !

Tham khảo : https://www.codementor.io/@theundefined/ruby-the-misconceptions-of-100-code-coverage-keituk3qc