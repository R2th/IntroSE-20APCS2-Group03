Nếu bạn là nhà phát triển ứng dụng Rails, bạn đã từng bắt gặp thuật ngữ truy vấn N + 1. Và đây là điều bạn cần tránh.

Truy vấn N + 1 xảy ra khi tải từ cơ sở dữ liệu một nhóm các bản ghi theo cách không hiệu quả, cùng với các bản ghi liên kết với chúng. Các ví dụ dưới đây đi sâu vào cách chúng ta có thể giải quyết vấn đề này với :includes và sẽ giúp làm sáng tỏ cách thức phương pháp này hoạt động. Lưu ý rằng các đoạn code đang sử dụng Ruby 2.3.4 với Rails 4.2.11.

## Đặt ra vấn đề

Chúng ta có một mô hình: Employee has many Forms.
![](https://images.viblo.asia/4fe3e7a7-72b6-4bec-ae99-773ce82ec2c1.png)
```
# == Schema Information
# Table name: employees
# id
# name
class Employee < ApplicationRecord
  has_many: :forms
end

# == Schema Information
# Table name: forms
# id
# employee_id
# kind
class Form < ApplicationRecord
  belongs_to: :employee
end
```

Chúng ta có tổng số 5 employee records và forms của mỗi employee

![](https://images.viblo.asia/d756ea96-49bc-4b70-bf04-b53718a8cf5f.png)

`Employee.all.map { |employee| employee.forms }.flatten`

Câu query SQL như sau:

```
> SELECT `employees`.* FROM `employees` ORDER BY `employees`.`id`
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` = 1
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` = 2
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` = 3
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` = 4
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` = 5
```

Có 6 lượt truy cập vào cơ sở dữ liệu được thực hiện do chúng tôi tải employees trong truy vấn đầu tiên và sau đó thực hiện thêm 5 truy vấn để lấy các forms của mỗi employee. Nói cách khác, N + 1 SQL selects xảy ra trong đó N = 5.

![](https://images.viblo.asia/2abc3e66-d09e-4086-bc47-a7b656867152.png)

## Thực hiện truy vấn với :includes

Rails cung cấp một phương thức ActiveRecord được gọi là :includes tải các bản ghi liên quan trước và giới hạn số lượng truy vấn SQL được thực hiện cho cơ sở dữ liệu. Kỹ thuật này được gọi là "eager loading" và trong nhiều trường hợp sẽ cải thiện hiệu suất một lượng đáng kể.

Tùy thuộc vào truy vấn của bạn là gì :includes sẽ sử dụng phương thức ActiveRecord :preload hoặc :eager_load.

### Khi nào :includes sử dụng  :preload?

Trong hầu hết các trường hợp :includes sẽ mặc định sử dụng phương thức :preload sẽ bắn 2 truy vấn:

1. Tải tất cả các bản ghi gắn liền với leading model
2. Tải các bản ghi được liên kết với leading model dựa trên khóa ngoại trên model được liên kết với leading model
Vì vậy, nếu chúng tôi sử dụng :preload cho truy vấn của mình, chúng tôi sẽ chỉ tạo ra 2 SQL select ra các forms, dựa trên khóa ngoại Form#employee_id.
```

Employee.preload(:forms).map { |employee| employee.forms }.flatten

> SELECT `employees`.* FROM `employees`
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` IN (1, 2, 3, 4, 5)
```

![](https://images.viblo.asia/7a3c3d8a-7ebf-49cc-8617-31431a3e2d0a.png)

Câu query SQL cho ví dụ này sẽ giống với việc chúng ta thay thế :preload bằng :includes.

```
Employee.includes(:forms).map { |employee| employee.forms }.flatten

> SELECT `employees`.* FROM `employees`
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` IN (1, 2, 3, 4, 5)
```

### Khi nào :includes  sử dụng :eager_load?
:includes sẽ mặc định sử dụng :preload trừ khi bạn tham chiếu liên kết đang được tải trong mệnh đề tiếp theo, chẳng hạn như :where hoặc :order. Khi xây dựng một truy vấn theo cách này, bạn cũng cần tham chiếu rõ ràng mô hình eager loaded.
```

Employee.includes(:forms).where('forms.kind = "health"').references(:forms)
```
Trong trường hợp này, :includes sẽ sử dụng phương thức :eager_load sẽ tạo ra 1 truy vấn sử dụng các phép nối ngoài bên trái để xây dựng bảng trung gian mà sau đó được sử dụng để xây dựng đầu ra.

```
> SELECT `employees`.`id` AS t0_r0, `employees`.`name` AS t0_r1, `forms`.`id` AS t1_r0, `forms`.`employee_id` AS t1_r1, `forms`.`kind` AS t1_r2 LEFT OUTER JOIN `forms` ON `forms`.`employee_id` = `employees`.`id` WHERE (forms.kind = "health")
```

![](https://images.viblo.asia/6109c42e-b2b7-4c00-a04a-3def9cdad7d7.png)

Câu query SQL cho ví dụ này giống với việc chúng ta thay thế :eager_load bằng :includes. Chúng tôi có thể loại bỏ :references trong trường hợp này.

```
Employee.eager_load(:forms).where('forms.kind = "health"')

> SELECT `employees`.`id` AS t0_r0, `employees`.`name` AS t0_r1, `forms`.`id` AS t1_r0, `forms`.`employee_id` AS t1_r1, `forms`.`kind` AS t1_r2 LEFT OUTER JOIN `forms` ON `forms`.`employee_id` = `employees`.`id` WHERE (forms.kind = "health")
```

Tuy nhiên, nếu bạn thay thế :preload bằng :includes, truy vấn sẽ không thực thi.

## Có thể sử dụng :includes với model forms thay thế leading model không?
Nếu truy vấn bị đảo ngược, nơi các forms được tải trước tiên và chúng tôi muốn tải hiệu quả  cả các bảng liên kết với bảng employee, chúng tôi vẫn có thể sử dụng :includes. Truy vấn sẽ tải employee dựa trên bộ sưu tập Employee#ids, được tham chiếu từ Form#employee_id.

```
Form.includes(:employee)

> SELECT `forms`.* FROM `forms`
> SELECT `employees`.* FROM `employees` WHERE `employees`.`id` IN (1, 2, 3, 4, 5)
```

![](https://images.viblo.asia/64867701-7b02-4a60-b2f6-75c9819eb709.png)

## Có thể eager load các nested associations với :includes không?
Dưới đây là một vài ví dụ về các tình huống khác nhau mà bạn có thể sử dụng nếu model Form đã được sửa đổi để có các associations bổ sung như has_one: :signer và has_one: issuer, trong đó has_one: :address.
```

Employee.includes(forms: :issuer)

Employee.includes(forms: { issuer: :address })

Employee.includes(forms: [{ issuer: :address }, :signer])
```

## Sử dụng :includes luôn luôn nhanh hơn
Làm thế nào tăng hiệu suất bằng cách sử dụng :includes trong code của bạn? Và  khi :includes gọi :preload hoặc :eager_load, phương thức nào kết thúc nhanh hơn?

Tôi đã kiểm tra hiệu năng của các truy vấn tương tự được liệt kê trong các ví dụ ở trên trong một phiên bản cục bộ của cơ sở dữ liệu để thấy sự khác biệt. Mỗi truy vấn được chạy 3 lần với bộ nhớ đệm bị vô hiệu hóa và sau đó được tính trung bình trong bảng bên dưới.

```
Employee.first(n).map { |employee| employee.forms }.flatten

Employee.preload(:forms).first(n).map { |employee| employee.forms }.flatten

Employee.eager_load(:forms).first(n).map { |employee| employee.forms }.flatten
```

![](https://images.viblo.asia/c63479f1-8ad1-4423-bf9d-4f8f6223a64b.png)

Dữ liệu cho thấy việc sử dụng :includes sẽ cải thiện hiệu suất đáng kể khi :preload được gọi, nhưng có tác dụng ngược lại :eager_load trong hầu hết các trường hợp. :eager_load xây dựng một truy vấn phức tạp để thu thập thông tin về các liên kết đang được tải, do đó, có nghĩa là tùy chọn này sẽ chậm hơn (mặc dù tôi đã hơi sốc khi nó giảm mạnh).

Đo hiệu suất truy vấn trong ứng dụng của riêng bạn là cách tốt nhất để đảm bảo bạn đang sử dụng các phương pháp hiệu quả nhất có sẵn cho các trường hợp sử dụng của bạn. Tuy nhiên, theo nguyên tắc chung, việc tập thói quen sử dụng :includes sẽ dẫn đến mã hiệu suất tạo ra trải nghiệm tốt nhất cho các nhà phát triển khác trong code của bạn - và tất nhiên, khách hàng là người tương tác với ứng dụng của bạn.

### Tham khảo:
https://engineering.gusto.com/a-visual-guide-to-using-includes-in-rails/