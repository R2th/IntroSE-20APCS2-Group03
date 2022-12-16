Thời điểm hiện tại cơ sở dữ liệu NoSQL không phải là hiếm. Một trong những cơ sở dữ liệu phổ biến là MongoDB đây là một cơ sở dữ liệu open source và đa nền tảng cái mà cho phép bạn lưu trữ dữ liệu theo dạng document. Series bài viết này sẽ minh họa làm thế nào MongoDB có thể sử dụng trong những ứng dụng ASP.NET Core.

# Giới thiệu tóm tắt về MongoDB
Tôi sẽ không đi sâu vào quá nhiều chi tết của MongoDB trong bài viết này. Bạn có thể đọc tài liệu chính thức [ở đây](https://docs.mongodb.com/). Hãy để tôi tóm tắt một vài điều cơ bản về MongoDB như bên dưới: 
- MongoDB là một cơ sở dữ liệu NoSQL mã nguồn mở và đa nền tảng.
- MongoDB cho phép bạn lưu trữ dữ liệu theo dạng document.
- MongoDB documents được lưu trữ theo định dạng JSON.
- Một document nắm dữ dữ liệu theo dạng cặp key-value.
- Một tập documents được gọi là một collection.
- Một cơ sở dữ liệu chứa một hoặc nhiều collections.
- Khi bạn thêm một document mới đến cơ sở dữ liệu, mặc định thêm trường *id* và đối xử như một khóa chính. Mặc định *id* được thiết lập một **ObjectId** nhưng bạn có thể gán tới bất kì giá trị duy nhất nào khác cho nó.
# Cài đặt MongoDB trên Windows
Ok. Bây giờ bạn có một ý tưởng cơ bản MongoDB là gì hãy nhìn làm thế nào bạn có thể cài đặt nó trên Windowns. Truy cập [ở đây](https://www.mongodb.com/download-center/community) và download hoặc gói MSI hoặc file ZIP chứa những files cần thiết. Chắc chắn chuyển đến tab Server để tìm file download cần thiết.
![](https://images.viblo.asia/9e366de0-4e1b-4040-a729-d76300136205.png)

Trong ảnh chụp màn hình ở trên tôi đang tải file ZIP **MongoDB Community Server version 4.0.0**. Sau đó giải nén file ZIP đến một thư mục, nội dung của nó được tiết lộ như hình bên dưới:
![](https://images.viblo.asia/287503b9-0caf-4489-87cd-ee9ffae97914.png)

Chú ý 2 file có thể thực thi nằm trong thư mục Bin. **mongod.exe** là công cụ dòng lệnh cái mà cho phép bạn kết nối với server MongoDB. **mongo.exe** là một công cụ cái mà hoạt động như một client đến server MongoDB và bạn có thể sử dụng nó để thực thi lệnh đối với cơ sở dữ liệu giống như thêm, sửa, xóa, update.

# Tạo một cơ sở dữ liệu MongoDB
Bây giờ chúng ta có phần mềm cần thiết đã được cài đặt hãy xử lý để tạo cơ sở dữ liệu MongoDB.
Mặc định MongoDB lưu trữ file cơ sở dữ liệu dưới thư mục ```/data/db```. Nhưng bạn có thể thay đổi location này tùy theo ý muốn của bạn. Trong ví dụ của chúng ta, chúng ta sẽ lưu trữ file cơ sở dữ liệu dưới thư mục ```\MongoDB_4.0.4\Data```. Như vậy, tạo thư mục Data dưới thư mục Mongo_4.0.4.
Tiếp theo, mở một cửa sổ dòng lệnh và điều hướng đến thư mục ```MongoDB_4.0.4\Bin``` (Thư mục nơi **mongod.exe** và **mongo.exe** đã đặt ở đó). Tiếp đó tạo một lệnh tại cửa sở dòng lệnh như bên dưới:
```ps
> mongod --dbpath ..\data
```
Lệnh trên nỗ lực để kết nối với server MongoDB và chỉ định tham số dòng lệnh ```dbpath``` tới thư mục Data chúng ta đã tạo dưới thư mục MongoDB_4.0.4 trước đó. Hình dưới đây chỉ ra ví dụ chạy lệnh này:

![](https://images.viblo.asia/515890e4-7c7e-49ad-afed-0ac745501329.png)

Bây giờ, hãy tạo một cơ sở dữ liệu mới được gọi là **FirstDatabase**. Để làm vậy, mở một cửa sổ dòng lệnh khác, điều hướng đến thư mục Bin như trước đó, và gõ lệnh sau:

```ps
> mongo 
```
Lệnh này sẽ start MongoDB client cái mà bạn có thể sử dụng để thành lập các lệnh khác nữa. Hình bên dưới trình diễn một ví dụ chạy lệnh trên:
![](https://images.viblo.asia/731d5ea0-f893-49ae-b3bc-0aaa37da48c9.png)

Tiếp theo, thành lập lệnh sau trong cửa sổ dòng lệnh MongoDB client:
```ps
use FirstDatabase
```
Lệnh trên hướng dẫn MongoDB để sử dụng cơ sở dữ liệu được chỉ định. Nếu cơ sở dữ liệu đã tồn tại bạn sẽ được chuyển tới nó, ngược lại một cơ sở dữ liệu mới sẽ được tạo với tên trên dòng lệnh này.

# Tạo một collection trong MongoDB
Như đã đề cập trước đó, documents của MongoDB được lưu trữ trong các collection. Cho ví dụ, chúng ta sẽ lưu trữ dữ liệu trong một collection **Employees**. Bạn có thể tạo collection như sau:
```ps
db.createCollection("Employees")
```
Phương thức ```createCollection``` sẽ tạo một collection mới với tên đã được chỉ định. Một lần được tạo bạn có thể thêm các document đến collection.

# Thao tác CRUD sử dụng MongoDB client

Bây giờ bạn đã tạo cơ sở dư liệu mới - **FirstDatabase**. - hãy thực hiện các thao tác CRUD (Create, Read, Update, Delete).
###
Đầu tiên, chúng ta sẽ thêm một số document tới **FirstDatabase**. Hãy giả sử rằng chúng ta muốn lưu trữ thông tin **Employees** đến cơ sở dữ liệu của chúng ta - ```EmployeeID, FirstName, LastName, và Designation```.
###
Cấu trúc JSON bên dưới biểu diễn **Employee** document trông như thê nào:
```json
{
  EmployeeID : 1,
  FirstName : "Nancy",
  LastName : "Davolio",
  Designation : "Sales manager"
}
```
### Inserting data
Bạn thêm mới document này tới **FirstDatabase** như thế nào ? Đơn giản thành lập lệnh bên dưới tại cửa sổ dòng lệnh của MongoDB client:
```ps
> db.Employees.insert({{EmployeeID : 1,
  FirstName : "Nancy",
  LastName : "Davolio",
  Designation : "Sales manager"} })
```

Ở đây, **Employees** là lập trình viên định nghĩa tên của collection (Chúng ta đã tạo nó trong mục trước). Chúng ta thêm mới một document đến **Employess** collection sử dụng lệnh ```insert```.

###
Thêm một vài employee documents sử dụng lệnh giống nhau như vậy chúng ta có thể thực hiện các hành động còn lại.

### Đọc dữ liệu

Ok, trước việc update hoặc delete dữ liệu hãy cố gắng để lấy ra **Employee** documents chúng ta vừa lưu trữ. Thành lập lệnh bên dưới:
```ps
> db.Employees.find()
```

Lệnh ```find``` sẽ nhận tất cả các documents từ **Employees** collection và chúng sẽ xuất ra trên console. Cho ví dụ, quan sát đầu ra bên dưới:
```json
{ "_id" : ObjectId("5bf37c94cfaa07a8454b3fb8"), 
  "EmployeeID" : 1, 
  "FirstName" : "Nancy", 
  "LastName" : "Davolio", 
  "Designation" : "Sales manager" }
  ...
```

Bạn đã chú ý rằng một trường - *id* được tự động thêm cho vào vào trong document ? Điều này được làm bởi MongoDB server cho bạn và *_id* hành xử giống như một khóa chính. Mặc định giá trị *_id* là cái gì chúng ta đã biết như một **ObjectId** nhưng bạn có thể sử dụng bất kì giá trị duy nhất nào khác mình muốn. Cho ví dụ, bạn có thể lưu trữ ```EmployeeID``` như giá trị của *_id*. Trong trường hợp này lệnh ```insert``` sẽ giống như thế này: 

```ps
> db.Employees.insert({{_id : 1,
  FirstName : "Nancy",
  LastName : "Davolio",
  Designation : "Sales manager"} })
```

Bây giờ, MongoDB sẽ không gán **ObjectId** đến trường *_id*, thay vì thế nó sẽ sử dụng giá trị bạn đã chỉ định.

### Cập nhật dữ liệu
Bây giờ, hãy cập nhật employee document. Gõ lệnh sau:
```ps
> db.Employees.update({EmployeeID : 1},
  {$set:{Designation : "Sales Executive"}})
```
Lệnh cập nhật có 2 tham số:
- Tham số đầu tiên là một tiêu chí quyết định document nào được chỉnh sửa.
- Tham số thứ hai chỉ định trường được chỉnh sửa.

Trong ví dụ trước, tìm kiếm một document cái mà có ```EmployeeID``` bằng 1 và tiếp đến chúng ta thay đổi trường ```Designation``` của nó để **Sales Executive**.

Bạn có thể chỉ định nhiều trường trong tham số đầu tiên nếu cần thiết. Tham số thứ hai không cần bao gồm tất cả các trường, chỉ những trường được chỉnh sửa là đủ. Đây là công việc của toán tử ```$set```. Nếu bạn bỏ qua ```$set``` toàn bộ document sẽ được thay thế bở ducument được chỉ định trong tham số thứ hai.

Chỉ xác nhận rằng update đã thực sự xảy ra. Thành lập lệnh ```find()``` như trước. Bạn nên thấy designation mới được xuất trên của sổ console.

### Xóa sửa dữ liệu
Bây giờ hãy gỡ bỏ dữ liệu ra khỏi **Employee** collection. Thành lập lệnh như bên dưới:

```ps
db.Employees.remove({EmployeeID:1})
```

Lệnh ```remove``` chấp nhận tiêu chí cho việc gỡ bỏ dữ liệu và gỡ bỏ matching document. Trong ví dụ trên chúng ta xóa một employee document cái mà trường ```EmployeeID``` bằng 1. Như xác nhận trước đó dữ liệu đã thực sự bị xóa bỏ hoặc không tìm thấy bởi lệnh ```find()```.

Nếu bạn muốn gỡ bỏ tất cả documens bạn có thể gõ lệnh theo sau:
```ps
db.Employees.remove({})
```
Như bạn có thể thấy việc chỉ định một tiêu chí rỗng gỡ bỏ tất cả các documents từ **Employees** collections

# Kết
Đây là bài viết được dịch từ series [Use MongoDB In ASP.NET Core](http://www.binaryintellect.net/articles/6fc57221-2787-4d9f-8f98-a2cd8c2709c2.aspx) của tác giả **Bipin Joshi**. Phần 1 bài viết là những kiến thức cơ bản về MongoDB như: Cài đặt, tạo cơ sở dữ liệu, collection, document, thêm, sửa, xóa. Nội dung được trình bày rất cơ bản và dễ hiểu. Bài viết tiếp theo mình sẽ tiếp tục giới thiệu về việc kết nối MongoDB trong ASP.NET Core. Hy vọng bài viết này sẽ đem lại cho những bạn mới bắt đầu có thể dễ dàng tiếp cận với với cơ sở dữ liệu rất nổi tiếng này. Cám ơn các bạn