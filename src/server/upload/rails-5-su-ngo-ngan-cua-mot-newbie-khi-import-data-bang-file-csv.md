*Con người đôi khi cũng có sự ngớ ngẫn ở một phút giấy nào đó trong ngày. Nhưng nhờ sự ngớ ngẫn đó mà con người thấu hiểu được sự việc. Và với một newbie thì sự ngớ ngẫn đôi khi lặp đi lặp lại trong ngày. ^.^  <br>*
*Làm việc với file trong Rails thì cũng chẳng phải là điều mới mẻ, nhưng sự ngớ ngẫn khiến bản thân mình loay hoay mãi chẳng tìm ra lối thoát dù đã tham khảo nhiều bài viết tương tự. <br>*
*Bài viết sử dụng Rails 5, sử dụng module CSV sẵn có và không sử dụng thêm gem nào. Giải pháp trong bài viết có thể chưa là giải pháp tối ưu nhất. Các model, database mang tính thử nghiệm, có thể không thực tế lắm. <br>*

## Tình huống
Tạo csv importer dữ liệu về các officers với chức danh và phòng ban.
<br>

**+ Giả định:<br>**
       - Hiện tại có 2 model là  Officer và OfficerPosition. Officer có quan hệ một-nhiều với OfficerPosition. Officer gồm các thuộc tính: name, birthday, birthplace. OfficerPosition gồm các thuộc tính: officer_id, position_name, department_name;<br>
       - File csv được tạo và lưu theo đường dẫn: db/csv_data/officers.csv;<br>
       - File csv có nội dung cụ thể và cấu trúc nhất định với header: officer và officer_position.<br>
   
**+ Yêu cầu:<br>** 
       - Dùng seed để import file csv;<br>
       - Các thông tin về officer và officer_position phải được thể hiện đúng và đầy đủ.<br>
        
**+ Dữ liệu mẫu và nội dung các model sử dụng trong tình huống: <br>**
*Officers.csv<br>*

```
officer|officer_position
Nguyen Van A, 1989/01/11, Da Nang|Chu Tich Hoi Dong Quan Tri, Ban Quan Tri;Giam Doc, Ban Lanh Dao
Tran Thi B, 1989/02/12, Quang Nam|Pho Chu Tich Hoi Dong Quan Tri, Ban Quan Tri;Pho Giam Doc, Ban Lanh Dao
Cao Van C, 1989/03/13, Quang Ngai|Truong Phong, Nhan Su;Truong Phong, Marketing
Ngo Thi D, 1989/04/14, Binh Dinh|Pho Phong, Marketing
Ho Van M, 1989/08/18, Binh Thuan|Nhan Vien, Marketing
Ha Van E, 1989/05/15, Phu Yen|Truong Phong, San Xuat
Do Thi H, 1989/06/16, Nha Trang|Pho Phong, San Xuat
Dinh Van K, 1989/07/17, Da Lat|Nhan Vien, San Xuat
```

*Các Models: <br>*

```
class Officer < ApplicationRecord
  has_many :officer_positions
 
 accepts_nested_attributes_for :officer_positions, allow_destroy: true
end

class OfficerPosition < ApplicationRecord
  belongs_to :officer, optional: true
end
```

## Phân tích: 

**+ Sự ngớ ngẫn: <br>**
Khi nhìn vào bài toán thì mình đã hiện ngay sự ngớ ngẫn. Thôi xong, bình thường hay import file csv có headers là tên các thuộc tính giống với các thuộc tính trong model. Giờ sao build các thuộc tính đây? Chưa kể còn có cả thông tin của hai bảng officer và officer_position trong cùng row. Còn có cả dấu "," ";" "|".<br>
Thế là mình tham khảo các bài viết và hỏi đồng nghiệp. Tuy nhiên, vẫn chưa ngộ ra chân lý. Vì sự ngớ ngẫn vẫn quanh quẫn trong đầu mình. Thế rồi mình vào "wc". Sự thư giãn ngắn ngủi đã làm sự ngớ ngẫn tan biến.

**+ Sự thấu hiếu: <br>**
Bắt đầu từ file csv, mình nhận thấy nó chia làm 2 phần với sự phân tách nhau bởi dấu "|". Phần dữ liệu bên trái giống như dữ liệu của 1 officer. Còn phần bên phải có cấu trúc của 1 officer_position với position_name và department_name và mỗi position tương ứng với một officer được phân tách nhau bởi dấu ";". Tiếp tục nào! Officer và OfficerPosition có quan hệ một-nhiều (tương ứng).<br>
Như vậy cần tạo Officer với nested attributes là officer_positions và tạo hash với cấu trúc dữ liệu gồm phần thông tin của officer và officer_position theo dạng: 

```
{name: value0, birthday: value1, birthplace: value2, officer_positions_attributes: {position_name: data0, department_name: data1}}
```

## Giải pháp:

Tạo một file *"csv_importer.rb"*. Sử dụng module CSV sẵn có trong Rails để xử lý tác vụ.<br>
Khi sử dụng module CSV để lấy dữ liệu cho từng row theo cách thông thường, thực chất mỗi row sẽ có data theo dạng:

```
#<CSV::Row officer:"Nguyen Van A, 1989/01/11, Da Nang" officer_position:"Chu Tich Hoi Dong Quan Tri, Ban Quan Tri;Giam Doc, Ban Lanh Dao">
```

Nếu để nguyên dữ liệu như vậy sẽ khó xử lý. Ở đây, mình chuyển về kiểu dữ liệu Hash.

```
{:officer=>"Nguyen Van A, 1989/01/11, Da Nang",
 :officer_position=>"Chu Tich Hoi Dong Quan Tri, Ban Quan Tri;Giam Doc, Ban Lanh Dao"}
```

Lúc này, có thể thấy việc xử lý dữ liệu dễ dàng và dễ hình dung hơn nhiều. Mỗi keys trong hash tương tự một cách xử lý cơ bản như khi chúng ta import file csv có headers là tên các trường trong bảng.<br>
Phần key "officer" tôi sẽ phân tách theo dấu "," về data dạng mảng và tạo giá các keys mới là thuộc tính của officer: 

```
{:officer=>"Nguyen Van A, 1989/01/11, Da Nang",
 :officer_position=>"Chu Tich Hoi Dong Quan Tri, Ban Quan Tri;Giam Doc, Ban Lanh Dao",
 :name=>"Nguyen Van A", :birthday=>"1989/01/11", :birthplace=>"Da Nang"}
```

Phần dữ liệu của keys officer_position sẽ được phân tách 2 lần. Một lần theo dấu ";" và một lần theo dấu "," để tạo ra mảng data cho từng position và đưa vào mảng với tên *officer_positions_attributes*:<br>

```
{:officer=>"Nguyen Van A, 1989/01/11, Da Nang",
 :officer_position=>"Chu Tich Hoi Dong Quan Tri, Ban Quan Tri;Giam Doc, Ban Lanh Dao",
 :name=>"Nguyen Van A", :birthday=>"1989/01/11", :birthplace=>"Da Nang",
 :officer_positions_attributes=>
  [{:position_name=>"Chu Tich Hoi Dong Quan Tri",
    :department_name=>" Ban Quan Tri"},
   {:position_name=>"Giam Doc", :department_name=>" Ban Lanh Dao"}]}
```

Đến lúc này mình chỉ cần loại bỏ phần keys và value (tương ứng) dư thừa và tạo data từ hash này nữa là xong. <br>

```
{:name=>"Nguyen Van A",
 :birthday=>" 1989/01/11",
 :birthplace=>" Da Nang",
 :officer_positions_attributes=>
  [{:position_name=>"Chu Tich Hoi Dong Quan Tri",
    :department_name=>" Ban Quan Tri"},
   {:position_name=>"Giam Doc", :department_name=>" Ban Lanh Dao"}]}
```

Cuối cùng, mình hoàn thành *csv_importer.rb* như sau: <br>

```
require "csv"
module ImporterEngines
  class ImporterEngines::CSVImport
    def initialize obj
      @obj = obj
    end

    def import_with_nested_attributes options_destroy_all = false
      destroy_all if options_destroy_all
      i = 0
      file_path = csv_file_path
      CSV.foreach(file_path, headers: true, col_sep: "|", header_converters: :symbol) do |row|
        row = row.to_hash

        officer_datas = row[:officer].split(",")
        row[:name] = officer_datas[0]
        row[:birthday] = officer_datas[1]
        row[:birthplace] = officer_datas[2]

        officer_positions_attributes = []
        row[:officer_position].split(";").each do |pos|
          officer_position = {}
          data = pos.split(",")
          officer_position[:position_name] = data[0]
          officer_position[:department_name] = data[1]
          officer_positions_attributes.push officer_position
        end

        row[:officer_positions_attributes] = officer_positions_attributes
        row.delete :officer
        row.delete :officer_position
        p "create success! row #{i}" if obj.create(row)
        i += 1
      end
    end

    private
    attr_reader :obj

    def destroy_all
      obj.destroy_all
    end

    def csv_file_path
      file_name = obj.name.underscore.pluralize
      Rails.root.join "db", "csv_data", "#{file_name}.csv"
    end
  end
end

```

Và trong file *seeds.rb*, mình thêm vào:

```
require "importers/csv_importer"

ImporterEngines::CSVImport.new(Officer).import_with_nested_attributes
```

Giờ chỉ việc vào console và gõ lệnh: *rails db:seed*. Và tận hưởng thành quả.<br>

## Kết quả:

Nếu các bạn có làm thử theo bài này của mình, có thể sẽ thấy kết quả thỏa mãn yêu cầu đúng không nào?<br>

![](https://images.viblo.asia/c1b9ddd0-7a8b-4e9c-a738-baad1d83fb45.png)

![](https://images.viblo.asia/64f1a39a-5aa1-449f-a29e-f9d5456de11e.png)

Mặc dù vậy, trong thực tế có thể có nhiều yêu cầu khắt khe hơn, như phải kiểm tra kiểu dữ liệu của trường, row nào bị lỗi thì bỏ qua vẫn lưu các row khác ...<br>
Hy vọng bài viết có thể giúp cho các bạn có thêm được giải pháp để giải quyết vấn đề trong thực tế và có những giải pháp hiệu quả nhất cho vấn đề của các bạn.<br>
Mong nhận được sự góp ý của bạn đọc để bài viết được hoàn thiện hơn.<br>
Cảm ơn các bạn.