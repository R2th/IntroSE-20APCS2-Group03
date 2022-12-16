> **Trong quá trình làm dự án với Rails ở tầng app, chắc hẳn bạn sẽ gặp phải kiểu dữ liệu được trả về là JSON phải không, nếu bạn đang cảm thấy JSON thật là *"khó nhai"*, thì đây chính là bài viết dành cho bạn rồi đấy.
Vậy thì cùng mình tìm hiểu xem JSON nó có thực sự *"khó nhai"* như bạn nghĩ ko nhé. Lets's go (go)**
<br/><br/>**Lưu ý: Trong bài này mình sẽ tập trung vào JSON trong Rails và trong hệ quản trị cơ sở dữ liệu MySQL nha.**

## 1. What is JSON?

JSON là chữ viết tắt của Javascript Object Notation, đây là một dạng dữ liệu tuân theo một quy luật nhất định mà hầu hết các ngôn ngữ lập trình hiện nay đều có thể đọc được, bạn có thể sử dụng lưu nó vào một file, một record trong CSDL rất dễ dàng. JSON có định dạng đơn giản, dễ dàng sử dụng và truy vấn hơn XML rất nhiều nên tính ứng dụng của nó hiện nay rất là phổ biến.

* JSON là viết tắt của JavaScript Object Notation
* JSON là định dạng trao đổi dữ liệu văn bản dung lượng nhẹ
* JSON là ngôn ngữ độc lập
* JSON được "tự mô tả" và dễ hiểu.<br/>

*Đọc định nghĩa ở trên dài dòng khó nhớ quá phải không? Thôi đọc định nghĩa này dễ hơn nè:*

> JSON là một kiểu định dạng "beautiful" cho việc lưu trữ các object dưới dạng text. Điều này là *"không"* thể đối với XML. <br/>
> Yêu cầu lưu trữ về mặt kích thước cho kiểu JSON gần giống như đối với kiểu LONGBLOB hoặc LONGTEXT.<br/>
> "Not only is it not shit, it’s actually quite good!"

Nào giờ hãy cùng xem một số cách thật "cool" giúp bạn có thể tạo(generating) và phân giải(consume) JSON ngay sau đây nhé

## 2. Generating JSON (Encode JSON)
### Ruby support for JSON
Thư viện JSON của Ruby hỗ trợ chúng ta làm được điều này
```
$ irb
>> require 'json'
=> true

>> json_text = { :name => "Tram", :age => 18 }.to_json
=> "{\"name\":\"Tram\",\"age\":18}"     (như vậy to_json đã giúp chuyển một hash thành chuỗi json)
```
### Rails support for JSON
   Đối với Rails, ta có 2 cách để encode JSON: <br/>
   **Cách 1:** Ví dụ mình có 1 mảng như sau:
```
$ rails c
[1] pry(main)> array = [{"name": "Tram", "age": 18}, {"name": "Thao", "age": 25}]
=> [{:name=>"Tram", :age=>18}, {:name=>"Thao", :age=>25}]

[2] pry(main)> array.to_json      (vẫn là .to_json, nhưng Rails tự động hỗ trợ luôn, ko cần require thêm thư viện)
=> "[{\"name\":\"Tram\",\"age\":18},{\"name\":\"Thao\",\"age\":25}]"
```
   **Cách 2:** Sử dụng ActiveSupport::JSON giúp chuyển các objects (and more) của ActiveRecord thành JSON.
```
$ rails c
[1] pry(main)> hash = { name: "Tram", age: 18 }
=> {:name=>"Tram", :age=>18}

[2] pry(main)> ActiveSupport::JSON.encode hash
=> "{\"name\":\"Tram\",\"age\":18}"
```
Tương tự, đối với array(or something) cũng vậy
```
$ rails c
[1] pry(main)> array = [{"name": "Tram", "age": 18}, {"name": "Thao", "age": 25}]
=> [{:name=>"Tram", :age=>18}, {:name=>"Thao", :age=>25}]

[2] pry(main)> ActiveSupport::JSON.encode array
=> "[{\"name\":\"Tram\",\"age\":18},{\"name\":\"Thao\",\"age\":25}]"
```
## 3. Consume JSON (Decode JSON)
### Ruby support for JSON
Tương tự, thư viện JSON của Ruby cũng hỗ trợ chúng ta làm được điều này
```
$ irb
>> require 'json'
=> true
>> json_text = { :name => "Shawn", :gender => "male" }.to_json
=> "{\"name\":\"Shawn\",\"gender\":\"male\"}"

>> JSON.parse json_text      //keyword giúp ta decode JSON chính là JSON.parse
=> {"name"=>"Shawn", "gender"=>"male"}
```
### Rails support for JSON
   Tương tự, đối với Rails, ta có 2 cách để decode JSON: <br/>
   **Cách 1:** Ví dụ mình có 1 chuỗi json như sau:
```
$ rails c
[1] pry(main)> json_text = "[{\"type\":\"watch\",\"color\":\"green\"},{\"type\":\"table\",\"color\":\"white\"}]"
=> "[{\"type\":\"watch\",\"color\":\"green\"},{\"type\":\"table\",\"color\":\"white\"}]"

[2] pry(main)> JSON.parse json_text
=> [{"type"=>"watch", "color"=>"green"}, {"type"=>"table", "color"=>"white"}]
```
   **Cách 2:** Sử dụng ActiveSupport::JSON.decode() giúp decode chuỗi JSON thành hash (and more) của ActiveRecord
```
$ rails c
[1] pry(main)> json_hash = { name: "Tram", age: 18 }.to_json
=> "{\"name\":\"Tram\",\"age\":18}"\

[2] pry(main)> ActiveSupport::JSON.decode json_hash
=> {"name"=>"Tram", "age"=>18}
```
Tương tự, đối với array(or something) cũng vậy
```
$ rails c
[1] pry(main)> json_array = [{"name": "Tram", "age": 18}, {"name": "Thao", "age": 25}].to_json
=> "[{\"name\":\"Tram\",\"age\":18},{\"name\":\"Thao\",\"age\":25}]"

[2] pry(main)> ActiveSupport::JSON.decode json_array
=> [{"name": "Tram", "age": 18}, {"name": "Thao", "age": 25}]
```
*Hy vọng tới đây các bạn có thể convert giữa các kiểu dữ liệu và JSON thành thạo. Tùy vào yêu cầu của bài toán cần giải quyết, bạn linh động áp dụng nhé. Bây giờ thì qua phần Unit Test thôi.*

## 4. Unit Test with JSON
Giả sử mình có một bảng như sau, **với cột goods là kiểu JSON:**

Table **Sale**
| id | name | goods |
| -------- | -------- | -------- |
| 1     | table     |  [{"uid": "00000", "name": "circle table", "color": "white", "sold": true}, {"uid": "00001", "name": "square table", "color": "black", "sold": false}, {"uid": "00002", "name": "rectangle table", "color": "yellow", "sold": true}]     |
| 2     | outfit     | [{"uid": "00000", "name": "skirt", "color": "white", "sold": true}, {"uid": "00001", "name": "jean pants", "color": "black", "sold": false}, {"uid": "00002", "name": "sweater", "color": "yellow", "sold": true}]     |

Nếu như bạn cần test hàm **show_a_goods** trong **SalesController**, là hàm show 1 goods trong cột **goods**
```
before_action :load_a_goods, only: :show_a_goods

def show_a_goods
  render json: success_data
end
```

như vậy trong file test bạn cần lấy ra được uid của 1 goods nào đó trong cái goods *"to"* kia xem nó có tồn tại ko khi chạy qua *load_a_goods* đã đúng không, <br/>
vậy thì trong file rspec: spec/controller/sales_controller_spec.rb mình sẽ viết
```
describe "GET #show_a_goods" do
  let(:sale) do
    attributes_for :sale
  end

  context "when uid of goods is valid" do
    it do
      get :show_a_goods, xhr: true, params: {id: sale[:goods].first[:uid]} //vậy là mình đã lấy đc uid của 1 goods nào đó rồi nè
          
      expect(response_body[:status]).to eq "success"
      expect(response_body[:data][:good][:uid]).to eq "00000"
    end
  end
end
```

## 5. Lời kết
Để encode JSON từ một mảng/hash,... thành chuỗi JSON
* dùng hàm **.to_json**
* dùng hàm **ActiveSupport::JSON.encode()**               //chỉ có trong Rails <br/>

Để decode chuỗi JSON thành một mảng/hash,...
* dùng hàm **JSON.parse**
* dùng hàm **ActiveSupport::JSON.decode()**              //chỉ có trong Rails <br/>

Một tips nhỏ để lấy ra thuộc tính của một record đó là dùng hàm **attributes_for** <br/>
<br/>Tới đây thì bạn đã có câu trả lời cho câu hỏi *"Liệu JSON có "khó nhai" như bạn nghĩ?"* chưa. Hy vọng các bạn sẽ áp dụng thành công những chia sẻ này để làm tốt dự án của mình nhé. Peace!

-----
Tham khảo thêm tại: https://mike.bailey.net.au/2011/02/json-with-ruby-and-rails/