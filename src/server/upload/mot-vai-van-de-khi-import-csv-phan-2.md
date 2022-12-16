Tiếp nối phần trước (https://viblo.asia/p/import-csv-data-va-mot-vai-cau-chuyen-thuong-gap-phai-L4x5xNXYZBM), trong bài viết này, mình sẽ đề cập đến 2 vấn đề gặp phải khi thực hiện chức năng import csv.

Bài toán ở đây là, với mỗi row, cần phải import vào 1 bảng chính (vd bảng User) và vài bảng trung gian (vd experiment_history, education_history, language, certification) có quan hệ với bảng chính đó. Từng cột trong row sẽ tương ứng với 1 trường trong các bảng trên, tuy nhiên, không phải là import trực tiếp dữ liệu của row vào mà phải qua các cách chuyển đổi được cho trước.

Ngoài ra, mỗi một loại file csv sẽ được lấy từ nhiều nguồn khác nhau, mỗi nguồn sẽ có 1 format header khác nhau và cách chuyển đổi khác nhau.

Với các header khác nhau thì sẽ được lưu vào các cột khác nhau.

VD về 1 vài yêu cầu chuyển đổi là 

giá trị của trường giới tính:
- Loại file 1 chứa giá trị là male, female 
- Loại file 2 chứa giá trị là 0, 1
- Loại file 3 chứa giá trị là 1, 2
trong bảng User thì trường gender chỉ nhận giá trị true, false tức là 1, 0

Trường address:
- File 1 chứa giá trị zipcode, address, city 
- File 2 chỉ chưa address 
- File 3 chưa zipcode, address
trong khi bảng User chỉ lưu mỗi trường address, tức là mỗi loại file sẽ phải gộp lại address theo 1 format của từng file 

Trường birthday:
- File 1 lưu theo format dd/mm/yy 
- File 2 lưu theo format yy-mm-dd
- File 3 lưu theo format tiếng nhật là yy年mm月dd日
bảng User lưu birthday theo định dạng date thông thường 

Trường experiment có file lưu text, có file lưu 1 dãy số 100,101,102 , ứng với mỗi số là 1 text dựa theo bảng master, yêu cầu là phải chuyển đổi thành 1 chuỗi text 1, text 2, text 3 .
Và nhiều cách thức mapping khác.

Với bài toán import trên, chúng ta cần phải với mỗi loại file, phải lấy đúng dữ liệu và import cho các bảng khác nhau.
Cách làm đơn giản nhất là chạy lặp từng row, kiểm tra thuộc file nào, chạy đến cột nào thì đặt lệnh if kiểm tra để lưu vào trường nào trong db, rồi convert dữ liệu và lưu vào.
Làm theo kiểu này thì với tập dữ liệu là 10 loại file và mỗi file hơn 100 cột thì code sẽ thật kinh khủng.

Cách giải quyết bài toán trên:
Tạo các bảng master cho từng loại file, mỗi bảng sẽ lưu lại cách thức chuyển đổi (mapping) từng cột dữ liệu, lưu thêm với từng tên cột thì sẽ lưu vào trường nào, nếu là cột có dữ liệu đặc biệt, thì tạo thêm bảng master phục vụ chuyển đổi dữ liệu đặc biệt sang dữ liệu chuẩn lưu trong db.

VD: với file 1

table master_conversion
|id|table_name|column_name|column_ja|key_name|sort|file_type_id|column_type|
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
|1|user|       gender|     性別|      gender| 1|    1|string|
|2|user|       birthday|   生年月日|   birthday|2|   1|date|
|5|experiment_history|summary|実験の歴史1|summary_1|5|1|array_integer|
|6|experiment_history|summary|実験の歴史2|summary_2|6|1|array_integer|
....

như trong vd trên, cột gender của file 1 lưu kiểu male, female trong khi db ta để kiểu boolean 
nên ta cần tạo bảng để chuyển đổi giá trị 

table converion
|id|master_conversion_id|
| -------- | -------- |
|1|1|

table conversion_item
|id|original_data|data_text|conversion_id|
| -------- | -------- | -------- | -------- |
|1|male|0|1|
|2|female|1|1|

với phương pháp trên, bài toán sẽ trở về là chạy lặp từng row, với mỗi cột ta query vào db, và lấy ra dữ liệu với trường tương ứng rồi lưu vào db.

Tuy nhiên, nếu chỉ làm vậy thì sẽ phát sinh 1 vấn đề khác đó là phải query quá nhiều, trong khi dữ liệu để query là master, nên dễ bị lặp.

### Đó là vấn đề 1: `query dữ liệu master quá nhiều lần khi thưc hiện import`

Với vấn đề này, cách giải quyết mà mình hay làm đó là tạo 1 format hash mong muốn từ các bảng master này. Bởi vì, dữ liệu master thông thường là ít, nên ta tạo 1 hash để lưu lại thì sẽ không ảnh hưởng đến bộ nhớ. Khi đó, ta chỉ cần lấy dữ liệu thông qua key hash, nhờ vậy không cần phải liên tục trigger đến db nữa.

Với bài toán trên, dù có tới 3 bảng master, nhưng ta phải dự kiến 1 cấu trúc hash hợp lý để dễ dàng sử dụng khi lấy dữ liệu
VD:
```
{
    1 => { table_name: "user", column_name: "gender", keyname: "gender", conversions: [{"male"=>"1"}, {"female"=>"0"}] },
    2 => { table_name: "user", column_name: "birthday", keyname: "birthday", conversions: nil },
    ...
}
```
khi ta đã tưởng tượng 1 cấu trúc hash để dễ xử lý nhất thì việc convert ra chỉ là 1 phép biến đổi code cơ bản. Nhờ vậy, ta có thể tái sử dụng hash này cho từng row, mà ko cần phải liên tục query vào db.

Sau khi có 1 cấu trúc hash trên, ta tạo 1 hàm để convert 1 row ban đầu thành 1 row theo đúng các trường trong db dựa theo cấu trúc hash được lưu sẵn 

```
# row ban đầu 
{ "性別": "male", "生年月日": "2000/01/01", "実験の歴史1": "100,101,102",
  "実験の歴史2": "103,104", .. }

class Converter
  def initilizer hash_master
    @hash_master = hash_master
  end
  
  def assign_attributes row
    @row = row
  end
  
  def convert
    # chạy logic convert cho row trả về format mong muốn
  end
end

converter = Converter.new(hash_master)
converter.assign_attributes row
converter.convert

#khi đó ta sẽ có kết quả mong muốn:
{ 
  gender: 1, birthday: "2000/01/01", 
  experiment_histories_attributes: [
    { "summary": "text 1, text 2, text 3" }, 
     { "summary": "text 4, text 5" }
  ], ... 
}
```

Chúng ta có thể tận dụng kỹ thuật nested attribute trong rails, với params trên thì chỉ cần dùng User.create(attributes) thì sẽ tạo bản ghi user và tất cả các bản ghi liên quan.

Hoặc ta lưu toàn bộ attribute vào 1 mảng và thực hiện bulk import để tăng tốc import.

Ở trên có 1 kỹ thuật mình rất thích dùng, đó là cache object, gán lại 1 dữ liệu mới cho object.

```
  converter = Converter.new(hash_master)
  csv.for_each do |row|
    converter.assign_attributes row
    converter.convert
  end
```
với việc cache này, ta chỉ cần 1 object Converter để xử lý convert cho toàn bộ row, giảm bớt tài nguyên khi khởi tạo và dọn dẹp object.

### Vấn đề 2 là cách validate dữ liệu
Cách đơn giản là sau khi convert 1 row, ta chạy lệnh valid? là sẽ hiển thị toàn bộ lỗi nếu có.

Tuy nhiên, khách hàng có yêu cầu là phải trả về lỗi ở cột nào và loại lỗi gì ở cột đấy, vậy nên với lệnh `valid?` thì ta không biết lỗi ở cột nào và có thể trả về các lỗi khác, vì trong model, ta có thể định nghĩa thêm nhiều loại validate khác, có thể phải query nhiều bảng để check, hoặc có thể không thuộc kiểu trường của tất cả các cột import. 

Với vấn đề này, thì mình làm theo hướng: là tạo một model ảo validate cho 1 row 

```
class ImportCsv::RowValidator
  include ActiveModel::Validations

  def initialize type, args = {}
    @type = type
    singleton_class.class_eval { attr_accessor *M::MasterConversion.convert_key_name(type.id) }
    headers.each do |attr|
      instance_variable_set "@#{attr}", args[master_conversion_hash[attr]]
    end
    M::MasterConversion.by_type(type.id).each do |conversion|
      singleton_class.validates conversion.key_name,
        "import_csv/#{conversion.column_type}_type" => { column_name: conversion.column_ja }
    end
    singleton_class.validate :blank_row
    singleton_class.validate :maxi_size_full_address
  end

  def assign_attributes row
      row.each.with_index(start_sort_index) do |(key, value), index|
        next unless master_conversion_hash_with_sort[index]
        public_send "#{master_conversion_hash_with_sort[index]}=", value
      end
  end
  
  private
  
  def headers
    @headers ||= M::MasterConversion.convert_key_name(type.id)
  end
  
  def master_conversion_hash
    @master_conversion_hash ||=
      M::MasterConversion.by_type(type.id).pluck(:key_name, :column_ja).to_h
  end  
end 
```

class RowValidator tạo biến instance attribute để validate chính là các cột trong row, gọi hàm `validates` cho từng instance, khởi tạo các custom validator để check valid
vd `"import_csv/string_type"` hoặc `"import_csv/#date_type"` trong thư mục `app/validators`
```
class ImportCsv::DateTypeValidator < ActiveModel::EachValidator
  VALID_DATE_REGEX = /\A[0-9]{4}年(0[1-9]|1[0-2]|[1-9])月(0[1-9]|[1-2][0-9]|3[0-1]|[1-9])日\Z/
  VALID_DATE_REGEX_2 = /\A[0-9]{4}-(0[1-9]|1[0-2]|[1-9])-(0[1-9]|[1-2][0-9]|3[0-1]|[1-9])\Z/
  DATE_CHARACTER_REPLACE = "/".freeze

  def validate_each record, attribute, value
    return true if value.blank?
    return true if ((value =~ VALID_DATE_REGEX) || (value =~ VALID_DATE_REGEX_2)) && (date.blank? || date <= Time.zone.now)
    error_message = I18n.t "errors.messages.invalid_data_type",
      attribute: options[:column_name], value: value
    record.errors[:body] << error_message
  end
end
```

hoặc kiểu array_string
```
class ImportCsv::ArrayIntegerTypeValidator < ActiveModel::EachValidator
  VALID_ARRAY_INTEGER_REGEX = /^\d*年\d*月\d*日$/i

  def validate_each record, attribute, value
    return true
    error_message = I18n.t "errors.messages.invalid_data_type",
      attribute: options[:column_name], value: value
    record.errors[:body] << error_message
  end
end
```
trong các validator này, ta sử dụng regex để check chuỗi dữ liệu thoả mãn kiểu ta mong muốn, ở đây là kiểu date, array_string(chuỗi các số)

nhờ vậy khi chạy 
```
row_validator = ImportCsv::RowValidator.new(type)
row_validator.assign_attributes row
row_validator.valid?
```
thì sẽ kiểm tra và có thể trả về lỗi của từng cột với nội dung lỗi tương ứng.

Với phương pháp này, ta có thể đảm bảo trả về dữ liệu lỗi đầy đủ từng cột, vẫn có thể áp dụng kỹ thuật cache object, và hơn hết, ở đây được kiểm tra bằng so sánh regex nên tốc độ sẽ nhanh hơn nhiều so với gọi hàm valid cho user hay các model liên quan.

Ta có thể gọi phần xử lý validate này trước phần convert, để khi có lỗi sẽ bỏ qua đoạn xử lý convert, nhờ vậy giảm bớt thời gian khi import.

Trên đây là 2 vấn đề mình gặp phải, và có lẽ cũng là các vấn đề chung khi thực hiện import file, nếu bạn có giải pháp khác cho các vấn đề này thì đề xuất thêm để mình nghiên cứu và sử dụng hợp lý hơn.