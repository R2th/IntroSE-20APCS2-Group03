Nhiều khi bạn thấy rằng cần có một tìm kiếm toàn cục trong ứng dụng Rails của bạn. ví dụ như tìm kiếm nhiều model trong một form. Có một cách tốt là tìm kiến tự động tại `SeatGeek`. Bài viết này sẽ thử và đạt được một cái gì đó tương tự như seatgeek bằng cách xây dựng tìm kiếm tự động hoàn toàn trên nhiều model trong ứng dụng rails của chúng ta. Để làm việc này chúng ta sẽ sử dụng `Soulmate Gem` .

1. INSTALLING REDIS

Chúng ta cần cài đặt redis:

- Nếu là mac bạn chỉ cần chạy lệnh: `brew install redis`
- Nếu là hệ thông cơ bản Unix/Linux, cho debian based systems ví dụ: ubuntu chỉ cần chạy: `sudo apt-get install redis` và trên redhat based systems ví dụ: Fedora/Opensuse chạy `sudo yum install redis`

Sau đó bạn có thể xác minh nếu redis đã được cài đặt thành công bằng cách bắt đầu máy chủ redis. Mở terminal bạn chạy:

> $ redis-server

Bạn có kết qủa tương tự như:

![](https://images.viblo.asia/0dcd7671-221b-4d1e-8f4a-9c82bdf81576.png)

2. GETTING STARTED

Bây giờ chúng ta có thể bật redis lên và sẵn sàng, hãy bắt đầu tạo một ứng dụng rails 4 để thử soulmate

> $ rails new fast-autocomplete

Tiếp theo chúng ta cần thêm gem soulmate và gemfile của bạn. chúng ta cần thêm cả gem faker để điền vào database các bản ghi test thay vì tạo chúng. và chạy `bundle install` để cài đặt gem.

```ruby
gem 'faker', github: 'stympy/faker'
gem 'rack-contrib'
gem 'soulmate', :require => 'soulmate/server'
```

3. CREATING MODELS AND ADDING TEST DATA

Sau khi đã cài đặt được các gem xong, chúng ta sẽ nhanh chóng tạo 2 model scaffold. Chúng ta sẽ có model Noun và model Verb để test dữ liệu. Chúng ta sẽ dễ dàng điền dữ liệu vào bảng sử dụng gem Faker. Sử dụng terminal để chạy lệnh sau:

>$ rails g scaffold noun name:string
>
>$ rails g scaffold verb name:string

Tiếp theo cần chạy `rake db:migrate` để tạo các table trong database của bạn. Chúng ta có thể thực hiện các thao tác CRUD cho cả nouns và verbs tại `http://0.0.0.0:3000/nouns` và `http://0.0.0.0:3000/verbs`. Chúng ta có thể tự động thêm dữ liệu trong table của mình bằng cách sử dụng gem Faker và viết code trong file `seeds.rb`

```ruby
# create 500 nouns
puts "Creating 'nouns'"
500.times do
  Noun.create(name: Faker::Name.name)
end

# create 500 verbs
puts "Creating 'verbs'"
500.times do
  Verb.create(name: Faker::Name.name)
end
```

Nó sẽ tạo 500 dữ liệu test nouns và 500 dữ liệu test cho verbs trong database. Chúng ta sẽ đưa dữ liệu vào database bằng cách chạy lệnh sau:

>$ rake db:seed

4. ADDING THE AFTER_SAVE AND BEFORE_DESTROY CALLBACKS

Chúng ta sẽ thêm callback `after_save` và `before_destroy` vào các model (Noun và Verb). `after_save` sẽ thêm dữ liệu vào Redis thông qua module `Soulmate::Loader` được cung cấp bởi gem soulmate và `before_destroy` sẽ xoá dữ liệu từ redis khi một bản ghi được xoá tức là chúng tôi không muốn có một record đơn độc hoặc không sử dụng đến trong database Redis và cũng để tiết kiệm bộ nhớ

`noun.rb`

```ruby
class Noun < ActiveRecord::Base
	after_save :load_into_soulmate
	before_destroy :remove_from_soulmate

    validates_uniqueness_of :name

	private

	def load_into_soulmate
		loader = Soulmate::Loader.new("nouns")
		loader.add("term" => name, "id" => self.id, "data" => {
			"link" => Rails.application.routes.url_helpers.noun_path(self)
	   	})
	end

	def remove_from_soulmate
		loader = Soulmate::Loader.new("nouns")
	    loader.remove("id" => self.id)
	end
end
```

`verb.rb`

```ruby
class Verb < ActiveRecord::Base
	after_save :load_into_soulmate
	before_destroy :remove_from_soulmate

    validates_uniqueness_of :name

	private

	def load_into_soulmate
		loader = Soulmate::Loader.new("verbs")
		loader.add("term" => name, "id" => self.id, "data" => {
			"link" => Rails.application.routes.url_helpers.verb_path(self)
	   	})
	end

	def remove_from_soulmate
		loader = Soulmate::Loader.new("verbs")
	    loader.remove("id" => self.id)
	end
end
```

Bạn sẽ chú ý lựa chọn key là data. Đây là một lựa chọn nơi chứa cho metadata bạn muốn trả lại khi một item là phù hợp. Đối với trường hợp của chúng tôi, chúng tôi thêm một link tương ứng đến url noun / verb mà sẽ có ích sau này trong các kết quả tìm kiếm sẽ được click.

5. LOADING DATA INTO REDIS

Bây giờ chúng ta có thể callbacks model tại nơi chúng ta có thể load tất cả các dữ liệu vào Redis bằng cách gọi lưu lại của mỗi record, điều này sẽ kích hoạt callback `load_into_soulmate` trong model của chúng ta. Chạy rails console và thực hiện như sau:

(Bạn cần chắc chắn rằng bạn đang chạy server redis trước khi chạy các lệnh sau)

> $ rails console
>
> 2.1.0 :001 >  Noun.find_each(&:save)
>
> 2.1.0 :001 > Verb.find_each(&:save)

Việc này sẽ lưu lại tất cả các records gây ra callback `load_into_soulmate`. Cho phép lấy một sneak peek tại các dữ liệu bên trong Redis và làm thế nào nó được lưu bởi soulmate. Trên terminal nhập `redis-cli` để truy cập console của redis.

> $ redis-cli

query redis để lấy các record trong hash `soulmate-data` của noun và verb đầu tiên tương ứng. Bạn nên làm tương tự:

>127.0.0.1:6379> hget soulmate-data:nouns 1
>
>"{\"term\":\"alarm\",\"id\":1,\"data\":{\"link\":\"/nouns/1\"}}
>
>127.0.0.1:6379> hget soulmate-data:verbs 1
>
>"{\"term\":\"calculate\",\"id\":1,\"data\":{\"link\":\"/verbs/1\"}}"

Từ khoá Redis sử dụng mô hình `“soulmate-data:nouns”` và `"soulmate-data:verbs"` do tôi đã thêm `“nouns”` và `"verbs"` như đối số khi gọi class `Soulmate::Loader`

Chúng ta sẽ được biết các bước tiếp theo để thực hiện Fast Autocomplete Search Terms trong Rails ở bài viết sau.
Tài liệu tham khảo: http://josephndungu.com/tutorials/fast-autocomplete-search-terms-rails