Chào các bạn! Nối tiếp [Circuit7](https://viblo.asia/p/express-basic-f1tours-project-circuit7-serving-static-files-and-environtment-variables-924lJ3W85PM). Hôm nay, chúng ta tiếp tục đến với chặng 8 của "F1 Tours"! Trong phần này, mình sẽ sử dụng Mongodb để lưu dữ liệu F1 Tours thay vì dùng *file data json* như hiện tại. Mình sẽ không giới thiệu qua Mongodb và Mongoose.  Các bạn có thể tự tìm hiểu với rất nhiều nguồn tham khảo khác nhau. <br>
Giờ cùng bước vào các phần chính của bài  hôm nay nào! <br>
# 1. Xây dựng model cho F1Tour:
Mình sẽ không đi vào chi tiết Mongoose là gì nhưng sẽ  giới thiệu sơ qua một chút như sau:<br>
 + Mongoose là một thư viện *Object  Data Modeling (ODM)* cho MongoDB và  Node.js; <br>
 + Mongoose cho phép chúng  ta giao tiếp một cách nhanh chóng và đơn  giản  với cơ sở dữ liệu (CSDL) MongoDB; <br>
 + Mongoose sử dụng schema để mô hình hóa dữ liệu và  mối quan hệ  giữa chúng, giúp dễ dàng kiểm tra các ràng buộc dữ liệu dễ dàng, hỗ trợ  các API truy vấn một cách thuận tiện và nhanh chóng,...<br>

Các tính năng này hết sức quen thuộc và cần thiết khi chúng ta xây dựng ứng dụng dựa trên mô hình MVC.<br>
Ở đây mình sẽ mô hình hóa đối tượng F1Tour để tận dụng sức mạnh của Mongoose thao tác với CSDL MongoDB cho đối tượng này. Lưu ý ở đây mình chỉ mô hình hóa tương đối các thuộc tính của model F1Tour.<br>
Để xây dựng model F1Tour, trước hết cần cài đặt MongoDB Server và Mongoose. (Các bạn xem hướng dẫn cài đặt tương ứng ở trang chủ của MongoDB và Mongoose nhé!). Sau đó, mình tạo thư mục *models* cùng cấp với *controllers*, tạo *f1TourModel.js* với nội dung như sau: <br>
```
const mongoose = require('mongoose');

const f1TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A F1Tour must have a name'],
    unique:true
  },
  first_grand_prix: {
    type: Number
  },
  circuit_length: {
    type: Number
  },
  unit: {
    type: String,
    default:"km",
    trim: true
  },
  number_of_laps: {
    type: Number
  },
  race_distance: {
    type: Number
  },
  lap_record: {
    type: String,
    trim: true
  },
  lap_record_by: {
    type: String,
    trim: true
  },
  lap_record_year: {
    type: Number
  }
});

module.exports = mongoose.model('F1Tour', f1TourSchema);
```
Về cơ bản cách dùng *new* để khởi tạo một *instance schema*  của mongoose tuân thủ theo chuẩn ES6 (Trong giới hạn thì mình với tìm hiểu cơ bản về ES6). Và dĩ nhiên để tạo được *mongoose schema*, mình cần *require* thư viện này trong model.<br>
Trong *Schema* nhận một object gồm các *field* mà chúng ta muốn mô hình hóa F1Tour. Tương ứng mỗi field sẽ có kiểu thuộc tính (String, Number, Date,...), các ràng buộc dữ liệu (data validation: required, unique,...), các *callback options trong schema types* như trim, lowcase, ... <br>
Đối với field chỉ cần khai báo *data type* mà không có thêm  các *schema types options* khác thì mình có thể viết theo dạng shorthand, ví dụ như: <br>
```
  first_grand_prix: {
    type: Number
  }
  ==>
    first_grand_prix: Number
```
Các bạn có thể tham khảo thêm cách tạo schema trong [docs](https://mongoosejs.com/docs/index.html) của Mongoose.<br>
Và cuối cùng để có thể sử dụng model F1Tour, mình export model này ra để sử dụng.<br>
```
module.exports = mongoose.model('F1Tour', f1TourSchema);
```
Về cơ bản việc tạo ra model để sử dụng cần có tên model (tương ứng sẽ là tên collection trong MongoDB) và schema của model. Ngoài ra còn có callback (optional).<br>
Giờ thì mình đã có model F1Tour. Bắt  tay vào công việc tiếp theo  thôi nào.

# 2. Kết nối đến MongoDB Server:
Để dùng Mongoose thao tác với CSDL MongoDB, trước tiên, cần phải kết nối được đến MongoDB Server. Ở đây để đơn giản, mình đã tạo sẵn database F1Tour trên MongoDB server.<br>
Trong phần này mình chỉ thực hiện cách kết nối đến MongoDB Server ở local bằng cách sử dụng biến môi trường như mình đã trình bày ở phần trước. Cách thực hiện như sau:<br>
 + Trước tiên mình tạo biến môi trường *MONGODB_LOCAL* chứa đường dẫn kết nối đến database server trong *file config.env*:<br>
```
//config.env

MONGODB_LOCAL = mongodb://localhost:27017/f1tours
```
 + Sau đó trong *server.js*, mình thêm phần kết nối như sau: <br>
```
//server.js
//đặt dưới phần khai báo app

const DB = process.env.MONGODB_LOCAL;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('connect to db successfully');
}).catch(err => {
  console.log('=== HANDLE ERROR on initial CONNECTION: ', err);
});

mongoose.connection.on('error', err => {
  console.log('=== HANDLE ERROR after initial CONNECTION established: ',  err);
});
```
Theo hướng dẫn ở docs Mongoose, mình sử dụng *mongoose.connect* để tiến hành kết nối đến MongoDB server với các thông số kết nối như trên. (Mình sẽ giải thích thêm về các thông số này ở các phần sau hoặc các bạn có thể tự tìm hiểu trên docs của Mongoose). Khi kết nối thành công mình báo log thành công và lỗi mình sẽ báo log lỗi. Chắc hẳn có bạn sẽ thắc mắc tại sao mình sử dụng *catch* để bắt error rồi lại dùng *on error* trên *mongoose.connection* nữa. Vâng, mọi chuyện đều có mục đích của nó.<br>
Theo docs của Mongoose hướng dẫn, và mình cũng đã ghi dòng chú thích ngay trên log: <br>
 + Khi sử dụng catch ở *mongoose.connect* sẽ giúp mình bắt lỗi khi *khởi tạo kết nối đến MongoDB Server*. Tức là phạm vi ở đây chính là tạo kết nối đến server nếu có lỗi sẽ xuất hiện lỗi ở đây. Như vậy chúng ta dễ dàng kiểm tra và xử lý lỗi hơn.<br>
 + Khi bắt sự kiện *error* ở *mongoose.connection* sẽ giúp mình bắt lỗi *sau khi đã khởi tạo kết nối đến MongoDB Server*. Tức là phạm vi ở đây sẽ bao gồm cả lúc khởi tạo và lúc đã/sau khi khởi tạo xong.<br>

Như vậy, mình đã kết nối thành công đến MongoDB Server. <br>

# 3. Phần kế tiếp:
Circuit8 đến đây xin kết thúc. Phần kế tiếp mình sẽ tiến hành xử lý ở *f1tour controller* để có thể thao tác với MongoDB nhé.<br>
*Cảm ơn các bạn đã đọc bài viết của mình.* <br>
*Bài viết không thể tránh khỏi những thiếu xót, mong nhận được sự góp ý của các bạn để bài viết được hoàn thiện hơn.* <br>
***Nguồn tham khảo***:<br>
*- Expressjs.com*<br>
*- Udemy.com* <br>
*- [mongoosejs.com](https://mongoosejs.com/docs/index.html)* <br>
*- [mongodb.com](https://docs.mongodb.com/)* <br>
*- Và một số nguồn khác* <br>
***Link github [F1Tours](https://github.com/dtmhdev89/ExpressSample_F1Tours)***