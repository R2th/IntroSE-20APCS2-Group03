Halo  các bạn tạm rời xa  công cuộc tìm hiểu về JS hôm nay mình  xin giới thiệu đến các bạn Mongo DB trong quá trình  mình làm việc  và tìm hiểu .
# 1 Mongo DB là gì ? 
Tương tự như cách cơ sở dữ liệu quan hệ dựa trên các bảng (table), cơ sở dữ liệu hướng tài liệu như MongoDB dựa trên bộ sưu tập tài liệu(doccument), với mỗi doccument này bao gồm các thuộc tính key / value. Một doccument có thể được coi là tương đương với một hàng trong bảng, với mỗi khóa tương tự như tên cột và mỗi giá trị của khóa tương tự với giá trị của hàng tương ứng. Sự khác biệt chính là một doccument không bị ràng buộc với một lược đồ hoặc cột nhất định trong một table. Hai doccument  có thể chia sẻ các yếu tố tương tự nhau, như trường ID, cũng như có các yếu tố hoàn toàn khác nhau. Chẳng hạn, trong một hệ thống kiểm kê, tất cả các mặt hàng sẽ có giá, nhưng các bộ phận ô tô sẽ có các thuộc tính bổ sung hoàn toàn khác với các thuộc tính bổ sung mà giày sẽ có. Và vì MongoDB cho phép thay đổi lược đồ động, nên dễ dàng thực hiện các thay đổi nhanh mà không cần phải sửa lại cơ sở dữ liệu hiện có để hỗ trợ các trường mới, chẳng hạn như thêm một sản phẩm kiểm kê mới với bộ thuộc tính duy nhất của riêng nó. Ngoài ra, cấu trúc phân cấp của tài liệu dễ dàng phân cấp đối tượng trong mã ứng dụng, đơn giản hóa các hoạt động tạo, đọc, cập nhật và xóa.

MongoDB không chỉ cung cấp tất cả các khả năng này mà còn làm như vậy mà không ảnh hưởng đến hiệu suất, tính sẵn sàng cao hoặc khả năng mở rộng. Trên thực tế, MongoDB vượt trội hơn nhiều RDBMS truyền thống với các tính năng phản chiếu và tự động mở rộng tuyệt vời, cho phép nó phát triển khi nhu cầu và dữ liệu thay đổi theo thời gian.
# 2 Các trường hợp sử dụng  phổ biến
**Quản lý và phân phối nội dung** - Quản lý danh mục sản phẩm đa dạng về nội dung trong một kho dữ liệu duy nhất cho phép thay đổi nhanh chóng và thời gian phản hồi nhanh chóng mà không cần thêm sự phức tạp từ các hệ thống truy xuất nội dung.

**Cơ sở hạ tầng di động và xã hội** - MongoDB cung cấp một nền tảng có tính sẵn sàng cao, độ trễ thấp, nhanh nhẹn và có thể mở rộng cho phép các khả năng không gian địa lý, phân tích thời gian thực và tính khả dụng toàn cầu.

**Quản lý dữ liệu khách hàng**  - Sử dụng các khả năng truy vấn phong phú để phân tích thời gian thực trên cơ sở người dùng lớn với các mô hình dữ liệu phức tạp bằng cách sử dụng các lược đồ động và tự động bảo vệ cho tỷ lệ ngang.
# 3 Các chức năng chính 
**Các lược đồ động** - Lược đồ động của MongoDB cung cấp một cách đơn giản để kết hợp các thay đổi khi các yêu cầu ứng dụng thay đổi. Những thay đổi này có thể được thực hiện cho cơ sở dữ liệu mà không ảnh hưởng đến dữ liệu hoặc mã ứng dụng hiện có và không có thời gian chết.

**Trí thông minh hoạt động** - Khung tổng hợp / giảm và bản đồ gốc của MongoDB cung cấp cái nhìn sâu sắc về thời gian thực cho các ứng dụng, vượt xa khả năng của các công nghệ phân tích hàng loạt như Hadoop và các công cụ BI truyền thống.

**Tính linh hoạt triển khai** - MongoDB được xây dựng để hoạt động với các kiến ​​trúc phần cứng và đám mây hàng hóa. Dữ liệu được bản địa hóa cho các truy vấn để đảm bảo hiệu suất mạnh mẽ và có thể dự đoán được bất kể quy mô triển khai.

**Mở rộng quy mô đơn giản** - MongoDB được thiết kế để thu nhỏ trên các cụm máy chủ. Khi khối lượng dữ liệu tăng lên, các tổ chức có thể chỉ cần thêm nhiều nút vào cụm của họ và MongoDB sẽ cân bằng dữ liệu một cách liền mạch và tự động trong nền.

**Truy vấn phong phú** - MongoDB hỗ trợ ngôn ngữ truy vấn đầy đủ và lập chỉ mục chính và phụ, cũng như tìm kiếm toàn văn bản với cú pháp giống như Google.
# 4 Các công ty sử dụng 
MongoDB đã phục vụ nhiều công ty Fortune 500 và Global 500 trên các ngành tài chính, chính phủ, y tế, truyền thông và giải trí, bán lẻ và viễn thông. Dưới đây là một vài ví dụ về cách một số công ty đã kết hợp MongoDB vào hoạt động kinh doanh của họ:

**Forbes** - Sử dụng MongoDB để tổng hợp và tích hợp nội dung động từ kho lưu trữ dữ liệu tĩnh và im lặng của họ để cập nhật và kiểm soát nội dung trên trang web của họ. Vì MongoDB là nguồn mở, nên họ có thể làm như vậy với kinh phí tối thiểu hoặc nhân sự bổ sung.

**MetLife** - Được sử dụng MongoDB làm công cụ dữ liệu cho trộm The Wall, một ứng dụng dịch vụ khách hàng sáng tạo tương tự như giao diện người dùng Facebook, cung cấp cái nhìn tổng hợp về khách hàng MetLife trên tất cả các ngành kinh doanh. Một nguyên mẫu được chế tạo trong hai tuần và sống ở Mỹ sau 90 ngày.

**Cern** - Tạo một hệ thống tổng hợp dữ liệu được xây dựng trên MongoDB để cung cấp thông tin tìm kiếm và tổng hợp từ nhiều nguồn khác nhau thành một dạng bất khả tri về dữ liệu nhất quán. Điều này cho phép hàng ngàn người dùng nhanh chóng truy vấn biểu mẫu miễn phí đối với terabyte dữ liệu meta và trả về hàng chục nghìn kết quả.

**Under Armour** - MongoDB tận dụng trung tâm của nền tảng thương mại điện tử để cho phép cơ sở hạ tầng dữ liệu linh hoạt cho nhu cầu thay đổi nhanh chóng của doanh nghiệp, cũng như đáp ứng nhu cầu phục hồi và mở rộng thảm họa của họ thông qua nhân rộng và bảo vệ đa trung tâm dữ liệu.
# 5 Take away
MongoDB là cơ sở dữ liệu NoQuery hàng đầu trên thị trường và sử dụng cơ sở dữ liệu hướng tài liệu.

MongoDB hỗ trợ truy vấn phong phú các bộ dữ liệu lớn hay nhỏ với thời gian phản hồi nhanh

Sử dụng các lược đồ động, MongoDB cho phép phát triển nhanh và linh hoạt cho các thay đổi yêu cầu kinh doanh hoặc ứng dụng.

MongoDB nhấn mạnh hiệu suất, khả năng mở rộng và tính sẵn sàng cao và trong nhiều trường hợp vượt quá cơ sở dữ liệu truyền thống trong các lĩnh vực này.

MongoDB là một giải pháp đã được chứng minh cho một loạt các yêu cầu kinh doanh cho các công ty trên nhiều ngành công nghiệp.
# 6 Các thuật ngữ trong Mongo DB 
**Collections**  : Tương tự như bảng trong cơ sở dữ liệu quan hệ.  Nó có thể chứa nhiều document JSON.

**Documents** : Tương tự như các bản ghi (record) hoặc hàng (row) dữ liệu trong SQL. Trong khi một hàng SQL có thể tham chiếu dữ liệu trong các bảng khác, các document Mongo thường kết hợp dữ liệu đó trong 1 document.

**Fields**  : Tương tự như các cột trong bảng SQL.

**Schema** : Trong khi Mongo  không có lược đồ, SQL định nghĩa một lược  đồ thông qua định nghĩa bảng . Một lước đồ Mongo là một cấu trúc dữ liệu tài liệu được  thực thi thông qua lớp ững dụng.

**Models**: Là các hàm tạo bậc cao (higher-oder constructors) lấy schema và tạo 1 instance của một document tương đương với các bản ghi trong cơ sở dữ liệu quan hệ.

# 7. Install 
 Các bạn có tham khảo tại doc của mongob  db có hướng dẫn 1 cách đầy đủ cài [đặt mongo db ](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
# 8 Mongoose Schema
 Một model  mongoose  là một trình bao bọc trên Mongoose schema. Moongoose schema xác định cấu trúc tài liệu của doccument, giá trị default, validator .... Trong khi  đó  Mongoose  model cung cấp interface cho cơ sở dữ liệu để tạo, truy vấn, cập nhật, xóa bản ghi..
 tạo một  Mongoose model gồm chủ yếu 3 phần :
 
* Referencing  mongoose*

```js
let mongoose = require('mongoose')

```
Tham chiếu này sẽ giống như tham chiếu được trả về khi chúng ta kết nối tới cơ sở dữ liệu, điều đó có nghĩa là các định nghĩa model và schema sẽ không cần kết nối rõ ràng với cơ sở dữ liệu.

* xác định Schema*

một Schema  xác định các thuộc tính của model thông qua một đối tượng trong đó tên khóa tương ứng với tên thuộc tính trong bộ sưu tập
```js
const UserSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
      required: true,
    },
    email: {
      type: String,
      default: '',
      lowercase: true,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      default: '',
      unique: true,
      required: true,
    },
    full_address: {
      type: String,
      default: '',
    },
    phone_number: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
  }
);
``` 
Ở đây chúng ta  xác định các thuộc tính với từng kiểu dữ liệu và giá trị  mặc default. 

*Export Model*

Chúng ta cần gọi hàm tạo mô hình trên cá thể Mongoose và truyền cho nó tên của bộ sưu tập và một tham chiếu đến định nghĩa schem.
```js
module.exports = mongoose.model ('User', userSchema)

```
# Kết
Trong bài  viết này mình xin phép giới thiệu về Mongo DB. Trong các bài tiếp theo mình sẽ tiếp tục trình bày về các cách làm việc với Mongo DB .
 Nguồn tham khảo 
 https://www.mongodb.com/
 
 https://medium.freecodecamp.org/introduction-to-mongoose-for-mongodb-d2a7aa593c57
 
 https://www.credera.com/blog/technology-insights/java/mongodb-explained-5-minutes-less/?fbclid=IwAR1Pj-UmcyaiXC2VV6UBf7iBssblpzYCH5M7aeBz0ansSTleD5Num1s23mo