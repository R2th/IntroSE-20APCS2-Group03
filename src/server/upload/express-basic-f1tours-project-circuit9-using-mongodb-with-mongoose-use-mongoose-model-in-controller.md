Chào các bạn! Nối tiếp [Circuit8](https://viblo.asia/p/express-basic-f1tours-project-circuit8-using-mongodb-with-mongoose-Az45bDkwZxY). Hôm nay, chúng ta tiếp tục đến với chặng 9 của "F1 Tours"! Trong phần này, mình sẽ sử dụng mongoose model trong controller để thao tác với cơ sở dữ liệu Mongodb. <br>
Giờ cùng bước vào các phần chính của bài  hôm nay nào! <br>
# 1. Giải thích các options khi kết nối đến Mongodb bằng mongoose:
Ở bài Circuit8 mình đã sử dụng mongoose để kết nối đến Mongodb bằng đoạn code: <br>
```javascript
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
```
Hôm nay mình sẽ giải thích các *options* mình sử dụng khi kết nối đến Mongodb.<br>
Khi xem trong *package-lock.json* có thể thấy thư viện *mongoose (v5.10.0)* đang requires thư viện *mongodb (v3.6.0)*. Theo thông báo từ các nhà phát triển thư viện [mongodb](https://www.npmjs.com/package/mongodb) kể từ phiên bản 3.x trở đi sẽ có những thay đổi lớn trong API của thư viện. Và một trong số đó là *[connection string](https://github.com/mongodb/node-mongodb-native/blob/HEAD/CHANGES_3.0.0.md)*. <br>
Trước hết, mình sẽ tìm hiểu và nhận biết xem *connection string* là gì?<br>
Sau khi tìm hiểu, theo mình *connection string* ở đây là một cái string chứa thông tin kết nối theo một định dạng nào đó để xác định kết nối giữa app và Mongodb. (Chi tiết hơn mời các bạn tham khảo [link](https://docs.mongodb.com/manual/reference/connection-string/)). Như trong đoạn kết nối trên thì *connection string* chính là *const DB = process.env.MONGODB_LOCAL;*, cụ thể hơn là *mongodb://localhost:27017/f1tours*. <br>
Vậy thì chuyện gì đã xảy ra với *connection string*? Yep, từ phiên bản 3.x trở đi *connection string* có những thay đổi lớn so với trước đây (tham khảo thêm [tại đây](https://github.com/mongodb/node-mongodb-native/blob/HEAD/CHANGES_3.0.0.md)) như:
+ Thay đổi *connection string specification*: Username và password trong *connection string* (nếu có) phải ở dạng URI-escaped;
+ Thay đổi về cách thức xác thực và thành phần trong hostname
+ Và phải ở dạng URL-encoded
+ Nếu không ở dạng URL-encoded sẽ không bắn lỗi mà chỉ hiển thị warning.
```
Ví dụ:
Một connection string trước đây:
mongodb://u$ername:pa$$w{}rd@/tmp/mongodb-27017.sock/test
Từ phiên bản 3.x trở đi :
mongodb://u%24ername:pa%24%24w%7B%7Drd@%2Ftmp%2Fmongodb-27017.sock/test
```
Ví dụ trên chỉ là một phần nhỏ trong những thay đổi từ phiên bản 3.x trở đi. Và điều này cũng ảnh hưởng đến thư viện mongoose.<br>
Sau đây, dựa trên [docs connection](https://mongoosejs.com/docs/connections.html) của mongoose, mình giải thích về các options khi kết nối như sau: <br>
+ useNewUrlParser: Nên set true để sử dụng new parser. Và khi set true thì cần phải chỉ định rõ port kết nối trong *connection string* do new parser không hỗ trợ *connection string* không chỉ định port. <br>
+ useCreateIndex: mặc định là false. Set true để set Mongoose default build index sử dụng phương thức createIndex() thay vì ensureIndex() để tránh xuất hiện các *deprecation warnings* do các thay đổi trong Mongodb driver.<br>
+ useUnifiedTopology: mặc định là false. Nên set là true để sử dụng *engine* quản lý kết nối mới từ Mongodb driver.<br>
+ useFindAndModify: mặc định là true. Set false nếu bạn muốn method findOneAndUpdate() và findOneAndRemove() sử dụng thuần túy phương thức findOneAndUpdate() thay vì findAndModify().<br>
Trên đây chỉ là một vài options trong mongoose connections. Còn rất nhiều tùy chọn khác mà khi sử dụng chúng ta cần tham khảo docs để có thể sử dụng phù hợp cho từng tình huống cụ thể.

# 2. Sử dụng mongoose Model trong tour controller để thao tác với Mongodb:
Ở bài trước mình đã xây dựng Model cho f1Tour, giờ là lúc mình sử dụng nó để thao tác với cơ sở dữ liệu (sau đây viết tắt là *csdl*)<br>
Trong *controllers/tourController.js*, sau khi thay đổi như sau:
```javascript
const fs = require('fs');

const F1Tour =  require('./../models/f1TourModel');

exports.getAllF1Tours = async (req, res) => {
  try {
    const tours = await F1Tour.find();
    
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours
      }
    });
  } catch(e) {
    res.status(404).json({
      status: 'fail',
      message: e
    });
  };

};

exports.getAF1Tour = async (req, res) => {
  try {
    const tour = await F1Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch(e) {
    res.status(404).json({
      status: 'fail',
      message: e
    });
  };
};

exports.createAF1Tour = async (req, res) => {
  try {
    const newF1Tour = await F1Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newF1Tour
      }
    })
  } catch(e) {
    res.status(404).json({
      status: 'fail',
      messages: e
    })
  };
};

exports.updateAF1Tour = async (req, res) => {
  try {
    const tour = await F1Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch(e) {
    res.status(404).json({
      status: 'fail',
      messages: e
    })
  };
};

exports.deleteAF1Tour = async (req, res) => {
  try {
    const tour = await F1Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch(e) {
    res.status(404).json({
      status: 'fail',
      messages: e
    })
  };
};
```
Các thay đổi quan trọng:<br>
+ Thay vì sử dụng data là json thì mình đã chuyển sang sử dụng model f1Tour đã xây dựng trước đó bằng cách require model vào *tourController*;<br>
+ Sử dụng async và await nhằm mục đích đảm bảo việc trao đổi dữ liệu với Mongodb qua model được thực thi xong trước khi xử lý các logic khác và trả về response cho client. (Về async và await mình sẽ có bài chi tiết sau)<br>
+ Sử dụng các API trong thư viện Mongoose để thao tác với csdl thay vì dùng query string. Các API được sử dụng trong *tourController* :<br>
  - F1Tour.find() : tìm kiếm toàn bộ tours, trả về kết quả là toàn bộ tours trong csdl;<br>
  - F1Tour.findById(req.params.id) : tìm kiếm theo *_Id*, trả về kết quả là tour tương ứng với *_id* trong csdl;<br>
  - F1Tour.create(req.body) : tạo mới (insert và csdl một document mới) 1 tour với các tham số được truyền vào. Trước khi tạo một tour mới và insert vào csdl, Model sẽ thông qua schema đã được định nghĩa sẵn trong model để check validation được định nghĩa trong schema để đảm bảo việc tạo mới là phù hợp.<br>
  - F1Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });<br>
    Tìm kiếm tour theo *_Id* và cập nhật tour theo tham số được truyền lên. Nếu không set option *runValidators: true* thì việc cập nhật sẽ bỏ qua việc kiểm tra các validation được định nghĩa trong schema của model. Nếu option *new* không được chỉ định thì mặc định là false, kết quả trả về sẽ là document trước khi update. Nếu option *new: true* sẽ trả về document sau khi update. <br>
    
Thực chất các API trên đều sinh ra query để thao tác với csdl Mongo mà thôi. <br>
Test dạo một vòng, thì mọi thứ đều ổn cả. Ahihi ! :v: 
# 3. Phần kế tiếp:
Circuit9 đến đây xin kết thúc. Mời các bạn đón xem phần kế tiếp nhé.<br>
*Cảm ơn các bạn đã đọc bài viết của mình.* <br>
*Bài viết không thể tránh khỏi những thiếu xót, mong nhận được sự góp ý của các bạn để bài viết được hoàn thiện hơn.* <br>
***Nguồn tham khảo***:<br>
*- Expressjs.com*<br>
*- Udemy.com* <br>
*- [mongoosejs.com](https://mongoosejs.com/docs/index.html)* <br>
*- [mongodb.com](https://docs.mongodb.com/)* <br>
*- Và một số nguồn khác* <br>
***Link github [F1Tours](https://github.com/dtmhdev89/ExpressSample_F1Tours)***