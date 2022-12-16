## Enum là gì?
```
An enumeration defines a common type for a group of related values and enables you to work with those values in a type-safe way within your code.
```
=> Enum định nghĩa 1 nhóm các giá trị có liên quan đến nhau và cho phép bạn làm việc với những giá trị đó 1 cách an toàn trong code của bạn
Ví dụ bạn có thể định nghĩa ra một tập hợp các ngày trong tuần (Thứ 2, 3,... , chủ nhật).
```
let CONST_MONDAY = 2;
let CONST_TUESDAY = 3;
let CONST_WEDNESDAY = 4;
let CONST_THURSDAY = 5;
let CONST_FRIDAY = 6;
let CONST_SATURDAY = 7;
let CONST_SUNDAY = 1;
```
Một hàm mô phỏng lấy ra tên công việc sẽ làm ứng với ngày cụ thể trong tuần. (Giống kiểu thời khóa biểu)
```
// Tham số truyền vào là ngày trong tuần.
// Trả về tên công việc sẽ làm.
func getJobByDay(dayInWeek: Int) -> String {
     
    if (dayInWeek == CONST_SATURDAY
        || dayInWeek == CONST_SUNDAY) {
        return "Nothing";
    }
    return "Coding";
     
}
```
## Kiểu phổ thông
Chắc hẳn chúng ta thấy kiểu viết enum này rất quen thuộc, đặc biệt là đối với những ai dùng alamofire
```
enum Result<T> {
    case success(T)
    case failure(Error)

    public var value: T? {
        switch self {
        case .success(let v): return v
        case .failure: return nil
        }
    }

    public var error: Error? {
        switch self {
        case .success: return nil
        case .failure(let e): return e
        }
    }
}
```
và để sử dụng Result ta sẽ switch - case như này:
```
switch result {
case .success(let value):
    // TODO
case .failure(let error):
    // TODO
}
```
## Kiểu for fun
Mình không thích switch - case cho lắm, vậy nên sẽ "hack" chút theo ý mình thích.
Ở enum vừa rồi, mình sẽ thêm 2 hàm:
```
unc isSuccess(complete: @escaping (T) -> Void) -> Result<T> {
    guard let value = self.value else {
        return self
    }

    complete(value)
    return self
}

func `else`(complete: @escaping (Error) -> Void) {
    guard let err = self.error else {
        return
    }

    complete(err)
}
```
Vậy là từ giờ mình có thể check kết quả theo cách sau
```
let r: Result<Int> = .success(10)

r.isSuccess { (value) in
    print("show value:", value)
}.else { (err) in
    print(err)
}
```