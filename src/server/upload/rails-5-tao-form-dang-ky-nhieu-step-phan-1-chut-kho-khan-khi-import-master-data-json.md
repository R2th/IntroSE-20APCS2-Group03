*Chào các bạn! Sau một chuỗi ngày dài nắng nóng đến nỗi chẳng muốn có thứ gì dính lên người cả. Hôm nay, trời đã dịu mát bớt trở lại, không những thế còn có giông tố nữa.*

*Chính vì thế mình đã quay lại và giới thiệu với các bạn một vấn đề khá hay là "tạo form đăng nhiều step". Thực tế, với một newbie như mình việc làm việc với form nhiều step khá là vất vả. Vì vừa phải hiểu cách tạo form, rồi còn cả việc validate cho các trường trong form nữa. Thoạt đầu nghe có vẻ ít ít, ấy thế mà lại nhiều nhiều và cũng rối rối không tưởng.*

*Các yêu cầu, dữ liệu trong bài viết có thể không phù hợp trong thực tế . Trong những giới hạn nhất định, bài viết chỉ thể hiện ở quy mô nhỏ so với thực tế. Bài viết dựa trên Rails 5, bootstrap 4.*

*Hy vọng, serial bài viết gồm 2 phần này sẽ giúp ích cho các bạn trong công việc nha!*

## Phần 1: Chuẩn bị data master

### Các yêu cầu:


- Tạo form đăng ký gồm nhiều bước nhập thông tin đăng ký của người dùng muốn tìm việc làm;


- Cần phải nhập đầy đủ các thông tin trước khi tạo tài khoản cho người dùng;


- Người dùng chỉ có thể nhập thông tin ở bước sau nếu như đã nhập các thông tin của bước trước hợp lệ;


- Người dùng có thể quay trở lại bước trước để chỉnh sửa thông tin;


- Người dùng có thể submit form đăng ký bất kỳ lúc nào mà người dùng muốn. Sẽ tạo tài khoản thành công nếu các thông tin ở các bước đã được đầy đủ và hợp lệ.


### Chuẩn bị Master Data:


Do trong form nhập thông tin người dùng có chọn nước (country) nên master data tạm thời chỉ có data về các nước trên thế giới.


File countries.json được lưu trong *db/master_data*, có cấu trúc như sau:

```
[
  {name: 'Afghanistan', code: 'AF'},
  {name: 'Åland Islands', code: 'AX'},
  {name: 'Albania', code: 'AL'},
  {name: 'Algeria', code: 'DZ'},
  {name: 'American Samoa', code: 'AS'},
  {name: 'AndorrA', code: 'AD'},
  {name: 'Angola', code: 'AO'},
  {name: 'Anguilla', code: 'AI'},
  {name: 'Antarctica', code: 'AQ'},
  {name: 'Antigua and Barbuda', code: 'AG'},
  {name: 'Argentina', code: 'AR'},
  {name: 'Armenia', code: 'AM'},
  {name: 'Aruba', code: 'AW'},
  ...
]
```

(Tải file đầy đủ theo link này: https://gist.github.com/keeguon/2310008#file-countries-json)

Tiếp theo tạo, database với tên countries gồm 2 trường: name và code.
Sau đó, tạo file json_importer.rb trong *lib/master_importer*.
Khoan hãy bàn về code của json_importer. Vì chính lúc viết code cho json_importer đã phát sinh một số vấn đề.


### Chút khó khăn khi import file json

Bạn có thể tìm kiếm trên google với từ khóa *json import in rails*, kết quả trả về là rất đa dạng nhưng nhìn chung đoạn code import json file như sau:

```
restaurant_list = JSON.parse(File.read('restaurant_list.json'))

restaurant_list.each do |restaurant|
  Restaurant.create(restaurant.to_h)
end
```

Mình hay tin người nên cũng nghĩ nó sẽ đúng và cho chạy thử thì bị lỗi khi read file và parse dữ liệu đã read về JSON.(Nhưng thực tình thì code đúng nha. Lỗi tại ...)<br>
Ngay sau đó, mình nhận ra mình đã sai vì đã không xem kỹ nội dung file json này trước khi sử dụng. File này chưa tạo đúng chuẩn kiểu json. Cấu trúc dữ liệu file json đúng phải là thế này:
```
[
      {"name": "Afghanistan", "code": "AF"},
      {"name": "Åland Islands", "code": "AX"},
      {"name": "Albania", "code": "AL"},
      {"name": "Algeria", "code": "DZ"},
      {"name": "American Samoa", "code": "AS"},
      {"name": "AndorrA", "code": "AD"},
      {"name": "Angola", "code": "AO"},
      ...
  ]
```

Lúc này mình có 2 sự lựa chọn: 1 là chỉnh sửa file countries.json về đúng cấu trúc json; 2 là thử xem có cách nào khác vẫn có thể import file countries.json với cấu trúc như vậy được không.
Không biết các bạn, sẽ chọn cách nào, chứ mình thì hơi tham "quất" luôn cả hai.

Đầu tiên, là việc sửa file countries về đúng định dạng json và chạy thử thì kết quả không thể tốt đẹp hơn. Mọi thứ thật "ngon lành cành đào".
Tiếp theo mình thử không thay đổi về đúng định dạng json chuẩn, mà tìm cách khác import luôn.
Khi read file json chuẩn các bạn sẽ có được kết quả như sau:

```
 "[\n  {\"name\": \"Afghanistan\", \"code\": \"AF\"},\n  {\"name\": \"Åland Islands\", \"code\": \"AX\"},\n  {\"name\": \"Albania\", \"code\": \"AL\"},\n  {\"name\": \"Algeria\", \"code\": \"DZ\"},\n  {\"name\": \"American Samoa\", \"code\": \"AS\"},\n  {\"name\": \"AndorrA\", \"code\": \"AD\"},\n  {\"name\": \"Angola\", \"code\": \"AO\"},\n  {\"name\": \"Anguilla\", \"code\": \"AI\"},\n  {\"name\": \"Antarctica\", \"code\": \"AQ\"},\n  {\"name\": \"Antigua and Barbuda\", ...\n]\n"
```

Khi read file json chưa đúng như ban đầu sẽ có được kết quả như sau:

```
"[\n  {name: 'Afghanistan', code: 'AF'},\n  {name: 'Åland Islands', code: 'AX'},\n  {name: 'Albania', code: 'AL'},\n  {name: 'Algeria', code: 'DZ'},\n  {name: 'American Samoa', code: 'AS'},\n  {name: 'AndorrA', code: 'AD'},\n  {name: 'Angola', code: 'AO'},\n  {name: 'Anguilla', code: 'AI'},\n  {name: 'Antarctica', code: 'AQ'},\n  {name: 'Antigua and Barbuda', code: 'AG'},\n  {name: 'Argentina', code: 'AR'},\n  {name: 'Armenia', code: 'AM'},\n  {name: 'Aruba', code: 'AW'},\n  {name: 'Australia', code: 'AU'},\n  {name: 'Austria', code: 'AT'},\n  {name: 'Azerbaijan', code: 'AZ'},\n  {name: 'Bahamas', code: 'BS'},\n  {name: 'Bahrain', code: 'BH'},\n  {name: 'Bangladesh', code: 'BD'},...\n]\n"
```

Các bạn chắc hẳn cũng đã nhận ra sự khác biệt. Và vì vậy khi *"JSON.parse(File.read(countries.json))"* gặp lỗi.

Vậy giờ phải làm thế nào đây? Chắc hẳn nhiều bạn cũng có chung giải pháp là làm sao biến nó về thành cái string có dạng chuẩn ở phía trên. Và lúc này, hầu hết newbie chúng mình sẽ gọi tên "google". 
Okay, giải pháp đó là hàm *eval*. (Tìm hiểu thêm về "eval" theo [link này](https://viblo.asia/p/ruby-metaprogramming-eval-rQOvPKjqkYj))
Bạn thử mở rails console lên và copy đoạn data trong file coutries.json dán vào và enter xem thử kết quả trả về là gì. Đó là một mảng các object json phải không nào? Rails đã giúp đỡ chúng ta đấy.
Việc gọi eval với đối số truyền vào là string dữ liệu countries này cũng giống như việc chúng ta copy và paste trực tiếp dữ liệu vậy.

```
[{:name=>"Afghanistan", :code=>"AF"},
 {:name=>"Åland Islands", :code=>"AX"},
 {:name=>"Albania", :code=>"AL"},
 {:name=>"Algeria", :code=>"DZ"},
 {:name=>"American Samoa", :code=>"AS"},
 {:name=>"AndorrA", :code=>"AD"},
 {:name=>"Angola", :code=>"AO"},
 {:name=>"Anguilla", :code=>"AI"},
...]
```

Đến lúc này chỉ việc to_json sau khi eval nữa là chúng ta đã có kiểu dữ liệu json "chuẩn không cần chỉnh" rồi.
Và cuối cùng thì đoạn code cho json_importer.rb của mình như sau:

```
module MasterImporter
  class MasterImporter::JsonImporter
    def initialize model
      @model = model
    end

    def execute
      destroy_all
      file_path = get_file_path
      obj_list = eval File.read(file_path)
      obj_list.each do |obj|
        model.create obj.to_h
      end
    end

    private
    attr_reader :model

    def destroy_all
      model.destroy_all
    end

    def get_file_path
      model_name = model.name.underscore
      file_name = model_name.pluralize
      Rails.root.join "db", "master_data", "#{file_name}.json"
    end
  end
end

```

Chẳng cần phải JSON.parse làm gì phải không nào.  ^.^

Mình xin kết thúc phần 1 ở đây. Mong nhận được góp ý của các bạn để bài viết được hoàn thiện hơn.
Cảm ơn các bạn.