***Select*** và ***pluck*** là 2 cách khác nhau và hữu ích để trả về các giá trị từ một hoăc nhiều column trong bảng database dưới dạng tập hợp

Ví dụ, chúng ta có bảng **Question** với các column là id, text và một foreign key (khoá ngoại) để liên kết với bảng khác. Để chỉ trả về giá trị của text column, chúng ta sẽ sử dụng select hoặc pluck. Chúng ta sẽ cùng khám phá  sự khác biệt giữa chúng trong ứng dụng Rails.

# Select

select làm việc theo 2 cách sau:

### I. select tạo ra block và làm việc giống như Array#select

`Model.all.select{|m| m.field == value}`

Xây dựng một array mảng đối tượng từ database, chuyển đổi chúng thành một mảng và duyệt qua chúng sử dụng *Array#select*

***select và where***

Nếu sử dụng block trong select với lượng lớn dữ liệu sẽ chậm hơn việc sử dụng where như sau:

`Model.where(field: value)`

Vì khi sử dụng select, Rails sẽ chuyển đổi tất cả dữ liệu thành đối tượng trong Ruby, rồi sau đó chạy block cho từng đối tượng. Trong khi where sẽ tạo ra một câu lệnh SQL, giảm tải được dữ liệu trả về, cách này sẽ chạy nhanh hơn Ruby cho kiểu chọn lọc này.

### II. select tạo thành câu lệnh SELECT trong SQL để lựa chọn dữ liệu trả về

`Model.select(:field)`

Ví dụ với table Question của chúng ta:

```
Question.select(:text)
 => #<ActiveRecord::Relation [#<Question id: nil, text: "What's 2+2?">, ...]>
```

Sẽ tạo ra câu lệnh SQL tương tự như sau:

`SELECT questions.text FROM questions`

Hãy chú ý, select ở đây không trả về một mảng array, mà nó trả về đối tượng ActiveRecord::Relation. Điều này giúp chúng ta có thể liên kết nhiều scope lại với nhau để tạo thành một câu truy vấn.

`Question.select(:text).limit(5)`

Nếu muốn kiểm tra, bạn có thể sử dụng ***tosql*** để thấy được câu truy vấn SQL được tao ra với mỗi scope.

# Pluck

***pluck*** được sử dụng để truy vấn từ một hoặc nhiều column trong bảng dữ liệu. Nó nhận vào một danh sách tên các column và trả về một mảng array các giá trị của các column được chỉ định với giá trị tương đương.

Chúng ta lại lưu ý là nó trả về một mảng array, không giống với *ActiveRecord:Relation* của select, ví dụ:

```
Question.pluck(:text)
 => [“Text1”, “Text2”]
```

Bởi vì pluck chuyển đối kết quả truy vấn cơ sở dữ liệu thành một mảng array mà không cần chuyển đổi thành **ActiveRecord**, nên nó đạt hiệu suất cao hơn select. Nhưng lại đồng nghĩa với việc nó sẽ không liên kết được nhiều scope điều kiện khác, hãy thử với limit như trên:

```
Question.pluck(:text).limit(5)
 => NoMethodError: undefined method `limit' for #<Array:0x007fc5c1dfb3b0>
```

pluck có thể làm việc trên một đối tượng ActiveRecord, vì thế nó sẽ trả về kết quả mong đợi với ví dụ sau:

`Question.limit(5).pluck(:text)`

### Khi nào thì chúng ta sẽ sử dụng Pluck?

Bạn có thể sử dụng ***Pluck*** để xác định xem các đối tượng nào liên quan đến việc liên kết giữa các record khi truy vấn.

```
class Appointment < ActiveRecord::Base

 has_many :charges
end
```
 
Nếu bạn muốn xác định ***appointments*** có ***charges*** nào không, chúng ta có thể sử dụng pluck trong scope.

Chúng ta biết rằng pluck trả về một mảng, vì vậy chúng ta có thể xây dựng một mảng bao gồm các khóa ngoại mà chúng ta muốn liên kết. Ví dụ chúng ta có thể tạo mảng *appointmentid* tử bảng charges 

```
Charge.pluck(:appointment_id)
=> trả về mảng tất cả appointment_ids tử bảng chargescharges, ví dụ: [1, 2, 3, 4]
```

Để xác minhminh appointments  nào có liên kết với charges, ta sử dụng như sau:

```
Appointment.where(id: Charge.pluck(:appointment_id))
Điều này giống với Appointment.where(id: [1, 2, 3])
```

**pluck** cho phép chúng ta:

* Truy vấn hiệu quả từ một bảng cơ sở dữ liệu liên quan.
* Tạo một mảng từ bảng được liên kết với tất cả các đối tượng khoá ngoại từ bảng chính
* Sử dụng mảng đó để xác định đối tượng nào trong bảng chính có các đối tượng liên quan trong bảng phụ

*Nguồn: https://medium.com/@amliving/activerecords-select-pluck-3d5c58872053*