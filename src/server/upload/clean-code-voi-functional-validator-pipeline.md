Validate dữ liệu là một công việc đơn giản mà hầu hết các lập trình viên làm mỗi ngày. Tuy nhiên, khi đối mặt với nhiều thay đổi về requirements hoặc khi ứng dụng ngày càng mở rộng, logic của các đoạn code validation có thể là một cơn ác mộng thật sự. Bài viết này đề xuất một cách tổ chức phần validation logic một cách clean nhất có thể, tăng cao tính dễ đọc, dễ bảo trì cũng như tái sử dụng.

![Functional Validator Pipeline](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/7d1np1pk3e_functional-validator.jpeg)

Dưới đây là một ví dụ về một đoạn code validation trong giai đoạn mới bắt đầu. Rule validate rất đơn giản, chỉ có một vài thuộc tính cần được kiểm tra. Ở đây, tất cả dữ liệu đều sẽ chạy qua hàm này (được pass vào function argument) để được validate.

```javascript
function validatorIsHocSinhGioi(obj) {
  if (obj.score < 8) {
    alert("Điểm dưới 8 sao đòi học sinh giỏi")
    return false
  } else if (obj.ethics < 8) {
    alert("Hạnh kiểm khá cũng không được học sinh giỏi đâu nhé")
    return false
  } else {
    return true
  }
}
```

Vì đoạn validation trên không chứa quá nhiều logic, nó trông có vẻ ổn. Tuy nhiên khi nhiều điều kiện hơn được thêm vào, chắc chắn phải refactor lại code rồi.

Một cách đơn giản để làm cho các đoạn code validation trở nên maintainable hơn là chia tách các function ra, bóc tách các hàm validate phức tạp thành các hàm nhỏ hơn. Sẽ có một hàm để combine các validate logic nhỏ này lại, khi cần đổi logic, chỉ cần sửa ở mỗi hàm nhỏ bên trong.

Trong đoạn ví dụ dưới đây, chúng ta thực hiện check một học sinh có phải là học sinh giỏi hay không bằng một hàm như sau:

```javascript
function checkHocSinhGioi({ obj, errorArray = [] }) {
  if (obj.score > 8 && obj.ethics > 8) {
    return {
      obj,
      errorArray,
    }
  }

  return {
    obj,
    errorArray: [...errorArray, "Không đủ điều kiện được học sinh giỏi"],
  }
}
```

Hàm trên nhận vào hai tham số: một object cần được validate và một mảng. Mảng này sẽ chứa tất cả những lỗi xảy ra khi thực hiện validate check. Bằng cách này, nếu có lỗi validate, UI có thể iterate qua mảng này để tạo một thông báo cho mỗi lỗi. Việc validate sẽ được pass khi `errorArray.length === 0` hay viết ngắn gọn hơn là `!errorArray.length`.

Ok, vậy là ở trên ta đã có 1 rule validate, làm sao để kết hợp nhiều rule validate với nhau? Nếu bạn đang xài Lodash, thì có thể dùng ngay hàm `pipe()`, hàm này cho phép bạn kết hợp nhiều function với nhau (như một đường ống nối tiếp nhau).

Còn nếu không xài Lodash thì bạn có thể tự tạo hàm pipe bằng đoạn code sau:

```javascript
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
```

Để mô tả rõ ràng hơn về cách kết hợp nhiều rule validate với hàm `pipe`, chúng ta cần thêm một số rule khác (mỗi hàm chỉ chứa một logic validate), giả sử chúng ta có thêm hai rule validate như sau:

```javascript
function checkHocSinhDiHocDayDu({ obj, errorArray = [] }) {
  if (obj.absent === 0) {
    return {
      obj,
      errorArray,
    }
  }

  return {
    obj,
    errorArray: [...errorArray, "Học sinh này không đi học đầy đủ"],
  }
}

function checkHocSinhBiGhiSoDauBai({ obj, errorArray = [] }) {
  if (obj.frauds && !obj.frauds.length) {
    return {
      obj,
      errorArray,
    }
  }

  return {
    obj,
    errorArray: [...errorArray, "Học sinh này từng bị ghi sổ đầu bài."],
  }
}
```

Hàm `pipe` hoạt động bằng cách lấy giá trị trả về từ hàm trước, truyền vào tham số hàm sau hay nói cách khác nó tạo ra một pipeline của function, implement trong code như sau:

```javascript
const hocSinhXuatSacValidator = pipe(
  checkHocSinhGioi,
  checkHocSinhDiHocDayDu,
  checkHocSinhBiGhiSoDauBai
)
```

Để kiểm tra lỗi sau khi chạy hàm pipe, hãy xem đoạn code đầy đủ dưới đây:

```javascript
const hocSinhXuatSacValidator = pipe(
  checkHocSinhGioi,
  checkHocSinhDiHocDayDu,
  checkHocSinhBiGhiSoDauBai
)
```

Để kiểm tra lỗi sau khi chạy hàm pipe, hãy xem đoạn code đầy đủ dưới đây:

```javascript
// Tạo validation pipeline
const hocSinhXuatSacValidator = pipe(
  checkHocSinhGioi,
  checkHocSinhDiHocDayDu,
  checkHocSinhBiGhiSoDauBai
)

// Obj cần được validate
const hocSinh = {
  name: "Phạm Hoàng Linh",
  score: 6,
  ethics: 5,
  absent: 2,
  frauds: ["Dám bật lại thầy", "Dám ngắt lời thầy"],
}

// Chạy validate pipeline
const { errorArray } = hocSinhXuatSacValidator(hocSinh)

// Kiểm tra lỗi và hiển thị lỗi
if (!errorArray.length) {
  // Đã pass validation
  capGiayChungNhanHocSinhXuatSac(hocSinh)
} else {
  // Báo lỗi trên UI
  errorArray.forEach(error => {
    alert(error)
  })
}
```

## Tổng kết

Sau khi tổ chức phần validation logic kiểu functional pipeline, code lúc này rõ ràng là dễ đọc và dễ bảo trì hơn nhiều, đồng thời còn góp phần làm cho việc tổ chức codebase dễ dàng và clean hơn, bạn có thể tạo một module riêng chuyên chứa những hàm validate.