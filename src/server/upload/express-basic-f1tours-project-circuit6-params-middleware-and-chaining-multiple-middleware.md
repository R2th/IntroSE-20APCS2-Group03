Chào các bạn! Nối tiếp [Circuit5](https://viblo.asia/p/express-basic-f1tours-project-circuit5-restructure-4dbZN2kQZYM). Hôm nay, chúng ta tiếp tục đến với chặng 6 của "F1 Tours" nhé! Trong phần này, mình sẽ tìm hiểu về *params middleware* và cách *chaining multiple middleware*.<br>
Về phần giới thiệu middleware, các bạn có thể tìm hiểu ở trang chủ của express.js, hoặc có thể tìm trong viblo.asia, ... <br>
# 1. Param Middleware:
Vậy *param middleware* có thể hiểu như thế nào? Theo mình, một cách ngắn gọn có thể hiểu là một hoặc nhiều middleware dùng để xử lý param truyền lên trên ứng dụng express.js để xử lý trước hoặc sau khi các middleware khác hoặc các chức năng thực hiện một xử lý nào đó.<br>
Để dễ dàng hình dung, mình sẽ sử dụng param middleware để xử lý việc kiểm tra hợp lệ của *param id* truyền lên khi *get/update/delete* một chặng *F1Tour*.<br>
Xem lại phần *restructure code* ở [Circuit5](https://viblo.asia/p/express-basic-f1tours-project-circuit5-restructure-4dbZN2kQZYM) có thể thấy được khi thực hiện *get/update/delete* một chặng *F1Tour* đều phải xử lý việc kiểm tra xem *id* truyền lên có hợp lệ hay không? Nếu không sẽ trả về message lỗi. Việc lặp lại xử lý này ở *get/update/delete* sẽ gây ra sự lặp lại code. Do đó, việc sử dụng param middleware sẽ giúp mình không lặp lại code ở đây và luôn xử lý việc kiểm tra thông tin khi xuất hiện *param id* trong *tourRoutes.js*.<br>
Để sử dụng param middleware có thể thực hiện như sau: <br>
```js
const router = express.Router();

router.param("id", (req, res, next, val) => {
    // xử lý
    next();
});
```
Trong đó, *"id"* là tên của param truyền lên trong routes; *req* tương ứng là đối tượng request, *res* là đối tượng response, *next* là hàm dùng để chuyển tiếp middleware sau khi xử lý xong, *val* là giá trị truyền lên của* param id*.<br>
Thực hiện, xử lý *checkId* trong *tourRoutes* như sau:
```js
tourController.js
//Thêm function checkId
...
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/f1tours.json`));

exports.checkId = (req, res, next, val) => {
  const id = parseInt(req.params.id);

  const tour = tours.find(el => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  res.locals.tour = tour;
  next();
};
...
```
Ở đây cần lưu ý *res.locals.tour = tour;* dùng để truyền *object tour* vào response để tiếp tục xử lý ở các function *get/update/delete* thay vì phải đi tìm kiếm lại. Như vậy, ở các *function getAF1Tour|updateAF1Tour|deleteAF1Tour* cần bỏ đoạn code xử lý check id và chỉnh sửa một chút việc nhận *object tour* đã truyền vào *res.locals* để xử lý tiếp theo. Thay đổi như sau: <br>
```js
exports.getAF1Tour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: res.locals.tour
    }
  })
};

exports.updateAF1Tour = (req, res) => {
  const updatingTour = res.locals.tour;
  Object.assign(updatingTour, req.body);

  tours.map(r => (updatingTour.id == r.id) || r);

  fs.writeFile(`${__dirname}/../data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: updatingTour
      }
    })
  });
};

exports.deleteAF1Tour = (req, res) => {
  const deleteTour = res.locals.tour;
  remainTours = tours.filter(function(obj, index, arr){ return obj.id !== deleteTour.id;})

  fs.writeFile(`${__dirname}/../data/f1tours.json`, JSON.stringify(remainTours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: null
      }
    })
  });
};
```
Và trong *tourRoutes.js* thêm dòng xử lý như sau:
```js
...
const router = express.Router();

router.param("id", tourController.checkId);

...
```
Cùng kiểm tra lại một lượt các chức năng nhé. Xử dụng lệnh *curl* đã đề cập ở [CIrcuit2](https://viblo.asia/p/express-basic-f1tours-project-circuit2-xu-ly-patch-va-delete-request-924lJPjmKPM) để call api. Có thể thấy khi *call api* trả về tất cả chặng đua F1 không có *param id* nên *param middleware* không xử lý *checkId*, nhưng khi *call api* *get/update/delete* chặng đua F1 thì id sẽ được kiểm tra qua *checkId*.

# 2. Chaining Multiple Middleware:
*Chaining Multiple Middleware* hay nói cách là việc thực hiện xử lý nhiều middleware theo thứ tự nhất định. Giả sử, khi *create* một chặng đua F1, hiện tại, *body data* truyền lên để tạo không được kiểm tra. Điều này, có nghĩa là mình thích tạo chặng đua F1 bằng thông tin gì đó cũng được.<br>
Để giải quyết vấn đề này, dĩ nhiên là có nhiều cách, và một trong số cách đó là *móc nối nhiều middleware theo thứ tự* lại với nhau để xử lý.<br>
Giờ mình giả định khi tạo chặng đua F1 trong *body* truyền lên bắt buộc phải có *name, unit, race_distance, number_of_laps, circuit_length*. Lúc này, thứ tự cần xử lý là kiểm tra hợp lệ của *body param* truyền lên, và xử lý tạo chặng đua F1.<br>
Trong *tourController.js*, mình thêm middleware *mwCheckBodyParams* để check *body params*:
```js
exports. = (req, res, next) => {
  const requiredFields = ["name", "unit", "race_distance", "number_of_laps", "circuit_length"];
  var bodyParams = req.body;
  var missingParams = [];
  
  requiredFields.forEach(field => {
    if(!bodyParams[field]) missingParams.push(field);
  })
  
if(missingParams.length > 0) {
    return res.status(400).json({
      status: "failed",
      message: "Missing required params: " + missingParams.join(', ')
    })
  }

  next();
};
```
Middleware này xử lý: nếu không có đủ params bắt buộc sẽ trả về lỗi, ngược lại sẽ thực hiện create một chặng đua F1 mới. Nhưng đến đây chưa xong. Trong *tourRoutes.js*, mình sẽ *chain* middleware này vào phần route xử lý tạo chặng đua F1. <br>
```js
...
router
  .route('/')
  .get(tourController.getAllF1Tours)
  .post(tourController.mwCheckBodyParams, tourController.createAF1Tour)
...
```
Trong xử lý *post*, mình đã *móc nối theo thứ tự* *tourController.mwCheckBodyParams*  rồi đến *tourController.createAF1Tour* để xử lý khi tạo chặng đua F1. Mở terminal lên và test thử xem sao.<br>
```
curl -H "Content-Type: application/json" -v localhost:3000/api/f1/tours -d 
'{"name": "NETHERLANDS - Zandvoort Circuit", "first_grand_prix": "1952", "circuit_length": "4.259",  "race_distance": "306.648",    "lap_record": "",    "lap_record_by": "",    "lap_record_year": ""}' |json_pp
```
```js
{
   "status" : "failed",
   "message" : "Missing required params: unit, number_of_laps"
}
```

```
curl -H "Content-Type: application/json" -v localhost:3000/api/f1/tours -d 
'{"name": "NETHERLANDS - Zandvoort Circuit", "first_grand_prix": "1952", "circuit_length": "4.259", "number_of_laps": 72,  "race_distance": "306.648",    "lap_record": "",    "lap_record_by": "",    "lap_record_year": "", "unit": "km"}' |json_pp
```

```js
{
   "status" : "success",
   "data" : {
      "tour" : {
         "lap_record" : "",
         "name" : "NETHERLANDS - Zandvoort Circuit",
         "first_grand_prix" : "1952",
         "lap_record_year" : "",
         "circuit_length" : "4.259",
         "unit" : "km",
         "race_distance" : "306.648",
         "id" : 5,
         "lap_record_by" : "",
         "number_of_laps" : 72
      }
   }
}
```
Mọi thứ hoạt động vẫn thật ổn đúng không nào.
# 3. Phần kế tiếp:
Circuit6 đến đây xin kết thúc. Phần tiếp theo mình sẽ đề cập đến phục vụ *static files* và biến môi trường.<br>
*Cảm ơn các bạn đã đọc bài viết của mình.* <br>
*Bài viết không thể tránh khỏi những thiếu xót, mong nhận được sự góp ý của các bạn để bài viết được hoàn thiện hơn.* <br>
***Nguồn tham khảo***:<br>
*- Expressjs.com*<br>
*- Udemy.com* <br>
*- Và một số nguồn khác* <br>
***Link github [F1Tours](https://github.com/dtmhdev89/ExpressSample_F1Tours)***