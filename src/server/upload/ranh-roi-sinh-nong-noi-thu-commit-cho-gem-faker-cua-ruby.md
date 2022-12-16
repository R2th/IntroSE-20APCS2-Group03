Chào mọi người

Sau 5 năm mài mông ở luyện ngục nổi tiếng của Hà Nội, chịu nhiều khổ đau nhưng cũng học được nhiều thứ thì mình đã đào tẩu thành công!!!!!!

Dự định là chơi tẹt ga cả 1 thời gian để cho thoải mái do đau đầu về tech quá lâu nhưng không hiểu bị cái gì mà tay chân lại táy máy và đi nghịch project linh tinh. Thế là mình quyết định chọn [stympy/faker](https://github.com/stympy/faker) để lấy về nghịch ngợm để thử commit xem sao! Và đây là các bước của mình.

# Bước 1: Fork và clone về 
Cái này file CONTRIBUTING.md hướng dẫn khá chi tiết. Mình chỉ nêu ở đây thôi.
# Bước 2: thêm và bổ sung các file .md để hướng dẫn
Khi xây dựng module mới thì để module được sử dụng, chúng ta phải có hướng dẫn cẩn thận chứ nhỉ

Đầu tiên, mình tạo file instrument_model.md trong thư mục doc/unreleased/music và viết như sau 

![](https://images.viblo.asia/3fdf7e1d-c5c5-41f2-ad92-c4f1e44edf9d.png)

Đây là module nhỏ mình mong muốn xây dựng. Khi sử dụng nó, các bạn có thể tạo ra các dữ liệu về các sản phẩm nhạc cụ. Đối tượng hướng tới của mình là các bạn cần xây dựng website bán nhạc cụ.

Tiếp đến mình bổ sung ở unrealeased_README.md như sau

![](https://images.viblo.asia/768160a6-a588-458a-9491-2541c7ef81e3.png)

Mình không chỉnh thẳng README với lý do module này của mình là module nhỏ và tự mình phát triển, chắc chắn là có vài thiếu sót ở đây nên để ở unrealeased. Sau này khi các quản lý git của gem ra version mới thì khi đó họ sẽ thêm vào README.(mong các bạn hiểu giải thích lủng củng của mình ở đây)

Sau khi viết hướng dẫn bên trên, chúng ta sẽ thấy mục tiêu đã được đặt ra. Và cố gắng thực hiện mục tiêu đó sẽ ở bước 3
# Bước 3: Viết code
Chúng ta sẽ tạo 1 file rb mới mang tên instrumental_model.rb ở lib/faker/music
```ruby
# frozen_string_literal: true

module Faker
  class Music
    class InstrumentModel < Base
      class << self
        def name
          fetch("instrument_model.name")
        end
      end
    end
  end
end
```

Ở đây chúng ta sẽ fetch từ đâu? Hãy tạo file instrumental_model.yml ở lib/locales/en
```
en:
  faker:
    instrumental_model:
      name: ["Fender Stratocaster", "Fender Telecaster", "Gibson Les Paul", "Ibanez GRG370DX", "ESP RS", "Fender Jaguar", "Premium F5 Ac - Bk", "Cort G-100", "SYNYSTER GATES CUSTOM-S", "Tama Silverstar Jazz Kit", "Mapex TND5294 Tornado Standard", ""]
```
Tới đây chắc xong!

Đợi đã, làm sao bạn chắc là module kia của bạn là ok? Phải viết test chứ! Tạo test_faker_instrument_model.rb tại test/faker/music nào 
```ruby
# frozen_string_literal: true

require_relative "../../test_helper"

class TestFakerOpera < Test::Unit::TestCase
  def setup
    @tester = Faker::Music::InstrumentModel
  end

  def name
    assert @tester.name.match(/\w+/i)
  end
end
```
Thế là xong việc viết code
# Bước 4: Chạy test 
Quay lại file CONTRIBUTING.md và đọc tiếp. Chúng ta sẽ chạy test bằng lệnh:
```bash
bundle && bundle exec rake
```
Kết quả test chạy chắc cũng không có gì đáng lo đâu.
# Bước 5: Contribute thôi nào 
Vâng. Bước này chỉ là git khá đơn giản. Commit xong push rồi sau đó create pull request rất nhanh gọn. Và sau đó là chờ được merge.
# Bài học thu được
Việc nghịch ngợm này cũng giúp mình rút ra được vài điều. Đó là:
- Code ruby thuần, không dùng framework nhưng lại phục vụ cho framework.
- Ôn lại về gitflow.
- Ôn lại kiến thức khá căn bản đã học từ quyển プロを目指す人のためのRuby入門 về code thuần, test, viết doc,...
- Thử commit cho 1 project opensource, dù là nó khá đơn giản.
# Vấn đề phát sinh
Mình đã định kết bài ở bên trên rồi. Tuy nhiên lại có comment ở Github. Nội dung như sau: 

![](https://images.viblo.asia/f3410fb6-abed-47de-970b-623b493424bc.png)

À, vậy ở đây là mình phải có sự sủa đổi. Vậy thì mình sẽ nhanh chóng sửa lại code như sau:
## Đặt ra method mới 
Với 1 cửa hàng nhạc cụ thì với mỗi nhạc cụ sẽ gắn với 1 cty sản xuất nhất định. Vậy nên mình sẽ thêm method mới chính là công ty sản xuất nhạc cụ:
```ruby
Faker::Music::InstrumentModel.company #=> "Gibson"
```
## Viết method
```ruby
# lib/faker/music
def company
     fetch("instrument_model.company")
end
```
## Viết test
```ruby
# test/faker/music
  def company
    assert @tester.company.match(/\w+/i)
  end
```
## Thêm dữ liệu
File instrument_model.yml mới của mình sẽ như sau:
```yml
en:
  faker:
    instrumental_model:
      name: ["Fender Stratocaster", "Fender Telecaster", "Gibson Les Paul", "Ibanez GRG370DX", "ESP RS", "Fender Jaguar", "Premium F5 Ac - Bk", "Cort G-100", "SYNYSTER GATES CUSTOM-S", "Tama Silverstar Jazz Kit", "Mapex TND5294 Tornado Standard", "Yamaha PSR-F51"]
      company: ["Fender", "Gibson", "Yamaha", "Epiphone", "ESP", "Ibanez", "Roland", "Korg", "Essex", "Kohler & Campbell", "Boston", "Taylor", "Cort"]
```
Cuối cùng là chạy lại test như trên.
# Kết quả
Sau khi sửa lại thì mình đã có chiếc pull request này: https://github.com/stympy/faker/pull/1628. Mặc dù đã pass hết các test case và được đánh Feature Request nhưng các quản lý của gem thì vẫn chưa merge cho mình. Thôi thì việc merge theo hứng này đành phải chịu vậy.

Bài viết của mình đến đây xin hết. Cảm ơn các bạn đã đọc.