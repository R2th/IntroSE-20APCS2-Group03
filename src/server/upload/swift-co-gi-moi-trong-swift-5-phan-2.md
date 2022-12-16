## Xử lý các trường hợp enum trong tương lai
SE-0192 bổ sung khả năng phân biệt giữa các enum cố định và enum có thể thay đổi trong tương lai.

Một trong những tính năng bảo mật của Swift, là nó yêu cầu tất cả các câu lệnh chuyển đổi phải đầy đủ - rằng chúng phải bao gồm tất cả các trường hợp. Mặc dù điều này hoạt động tốt từ góc độ an toàn, nhưng nó gây ra sự cố tương thích khi các trường hợp mới được thêm vào trong tương lai.

Với thuộc tính @unknown, giờ đây chúng ta có thể phân biệt giữa hai trường hợp khác nhau một cách tinh vi: Có thể chạy trường hợp mặc định này cho tất cả các trường hợp khác vì tôi không muốn xử lý riêng lẻ, bất cứ điều gì xuất hiện trong tương lai đều sử dụng điều này thay vì gây ra lỗi.

Dưới đây là một ví dụ enum:
```
enum PasswordError: Error {
    case short
    case obvious
    case simple
}
```

Chúng tôi có thể viết mã để xử lý từng trường hợp đó bằng cách sử dụng khối switch:
```
func showOld(error: PasswordError) {
    switch error {
    case .short:
        print("Your password was too short.")
    case .obvious:
        print("Your password was too obvious.")
    default:
        print("Your password was too simple.")
    }
}
```

Điều đó sử dụng hai trường hợp rõ ràng cho mật khẩu ngắn và rõ ràng, nhưng gói trường hợp thứ ba thành một khối mặc định.

Bây giờ, nếu trong tương lai chúng tôi đã thêm một trường hợp mới vào enum được gọi là old, đối với mật khẩu đã được sử dụng trước đó, trường hợp mặc định của chúng tôi sẽ tự động được gọi ngay cả khi thông điệp của nó không thực sự có ý nghĩa - mật khẩu có thể không được quá đơn giản.

Swift có thể Cảnh báo cho chúng tôi về mã này bởi vì nó đúng về mặt kỹ thuật, vì vậy lỗi này sẽ dễ dàng bị bỏ qua. May mắn thay, thuộc tính @unknown mới sửa chữa nó hoàn hảo - nó chỉ có thể được sử dụng trong trường hợp mặc định và được thiết kế để chạy khi các trường hợp mới xuất hiện trong tương lai.

Ví dụ:
```
func showNew(error: PasswordError) {
    switch error {
    case .short:
        print("Your password was too short.")
    case .obvious:
        print("Your password was too obvious.")
    @unknown default:
        print("Your password wasn't suitable.")
    }
}
```

Mã đó bây giờ sẽ đưa ra cảnh báo vì khối switch không còn toàn diện - Swift muốn chúng tôi xử lý từng trường hợp một cách rõ ràng. Thật hữu ích, đây chỉ là một cảnh báo, điều này làm cho thuộc tính này trở nên hữu ích: nếu thêm một trường hợp mới trong tương lai, bạn sẽ được cảnh báo về nó.

## Các loại Dynamic Callable
SE-0216 bổ sung một thuộc tính @dynamicCallable mới cho Swift, mang đến khả năng đánh dấu một type có thể gọi trực tiếp.
```
let result = random(numberOfZeroes: 3)
```
Sẽ như này:
```
let result = random.dynamicallyCall(withKeywordArguments: ["numberOfZeroes": 3])
```

Trước đây tôi đã viết về một tính năng trong Swift 4.2 có tên @dynamicMemberLookup. @dynamicCallable là phần mở rộng tự nhiên của @dynamicMemberLookup và phục vụ cùng một mục đích: giúp mã Swift hoạt động dễ dàng hơn cùng với các ngôn ngữ động như Python hay JavaScript.
<br>
Để thêm chức năng này vào các type của riêng bạn, bạn cần thêm thuộc tính @dynamicCallable cộng với một hoặc cả hai phương thức sau:
```
func dynamicallyCall(withArguments args: [Int]) -> Double

func dynamicallyCall(withKeywordArguments args: KeyValuePairs<String, Int>) -> Double
```

Loại đầu tiên được sử dụng khi bạn gọi là loại không có tham số (ví dụ: a(b, c)) và loại thứ hai được sử dụng khi bạn cung cấp tham số (ví dụ: a(b: cat, c: dog)).
<br>
@dynamicCallable thực sự linh hoạt về loại dữ liệu mà phương thức của nó chấp nhận và trả về, cho phép bạn hưởng lợi từ tất cả các loại an toàn của Swift trong khi vẫn có một số chỗ luồn lách để sử dụng nâng cao hơn. 
<br>
Vì vậy, đối với phương thức đầu tiên (không có tham số), bạn có thể sử dụng bất kỳ thứ gì phù hợp với ExpressibleByArrayLiteral như mảng và sets, đối với phương thức thứ hai (có tham số), bạn có thể sử dụng bất kỳ thứ gì phù hợp với ExpressibleByDixiLiteral như dictionary và các cặp giá trị chính.
<br>
* Lưu ý: Nếu trước đây bạn đã sử dụng KeyValuePairs, bây giờ sẽ là thời điểm tốt để tìm hiểu chúng là gì vì chúng cực kỳ hữu ích với @dynamicCallable. 
<br>

Ngoài việc chấp nhận nhiều loại đầu vào, bạn cũng có thể cung cấp nhiều trạng thái cho nhiều loại đầu ra - có thể trả về một chuỗi, một số nguyên, v.v. Miễn là Swift có thể giải quyết cái nào được sử dụng, bạn có thể trộn và kết hợp tất cả những gì bạn muốn.
Hãy nhìn vào ví dụ. <br>
Đầu tiên, ở đây, một cấu trúc RandomNumberGenerator tạo ra các số từ 0 đến tối đa nhất định, tùy thuộc vào đầu vào nào được truyền vào:
```
struct RandomNumberGenerator {
    func generate(numberOfZeroes: Int) -> Double {
        let maximum = pow(10, Double(numberOfZeroes))
        return Double.random(in: 0...maximum)
    }
}
```
Để chuyển nó sang @dynamicCallable, chúng tôi sẽ viết một cái gì đó như thế này:
```
@dynamicCallable
struct RandomNumberGenerator {
    func dynamicallyCall(withKeywordArguments args: KeyValuePairs<String, Int>) -> Double {
        let numberOfZeroes = Double(args.first?.value ?? 0)
        let maximum = pow(10, numberOfZeroes)
        return Double.random(in: 0...maximum)
    }
}
```

Bây giờ chúng ta có thể tạo một thể hiện của RandomNumberGenerator và gọi nó như một hàm:
```
let random = RandomNumberGenerator()
let result = random(numberOfZeroes: 0)
```
Bạn có thể viết như này:
```
@dynamicCallable
struct RandomNumberGenerator {
    func dynamicallyCall(withArguments args: [Int]) -> Double {
        let numberOfZeroes = Double(args[0])
        let maximum = pow(10, numberOfZeroes)
        return Double.random(in: 0...maximum)
    }
}

let random = RandomNumberGenerator()
let result = random(0)
```

Có một số quy tắc quan trọng cần lưu ý khi sử dụng @dynamicCallable:
* Bạn có thể áp dụng nó cho structs, enums, class và protocol.

* Nếu bạn implement withKeywordArgument: và không implement withArgument:, type của bạn vẫn có thể được gọi mà không có tham số - bạn sẽ chỉ nhận được chuỗi trống cho các key.

* Nếu việc triển khai withKeywordArgument: hoặc cả withArgument: của bạn được đánh dấu là throw, việc gọi đến type cũng sẽ được throw ra.

* Bạn có thể thêm @dynamicCallable vào một extension, chỉ định nghĩa chính cho một type.

* Bạn vẫn có thể thêm các phương thức và thuộc tính khác vào loại của mình và sử dụng chúng như bình thường.

Có lẽ quan trọng hơn, không có hỗ trợ cho độ method resolution, có nghĩa là chúng ta phải gọi loại trực tiếp (ví dụ: random(numberOfZeroes: 5)) thay vì gọi các phương thức cụ thể (ví dụ: Random.generate (numberOfZeroes: 5)). Đã có một số cuộc thảo luận về việc thêm cái sau bằng cách sử dụng method signature như sau:
```
func dynamicallyCallMethod(named: String, withKeywordArguments: KeyValuePairs<String, Int>)
```

Nếu điều đó trở nên khả thi trong các phiên bản Swift trong tương lai, nó có thể mở ra một số khả năng rất thú vị để thử nghiệm.

Trong khi đó, @dynamicCallable dường như không phổ biến rộng rãi, nhưng nó cực kỳ quan trọng đối với một số ít người muốn tương tác với Python, JavaScript và các ngôn ngữ khác.

## Kiểm tra bội số nguyên

SE-0225 thêm phương thức isMultiple(of:) vào số nguyên, cho phép chúng tôi kiểm tra xem một số có phải là bội số của một số khác theo cách rõ ràng hơn nhiều so với sử dụng thao tác phần còn lại của phân chia %.

Ví dụ:
```
let rowNumber = 4

if rowNumber.isMultiple(of: 2) {
    print("Even")
} else {
    print("Odd")
}
```

Có, chúng tôi có thể viết cùng một cách để kiểm tra bằng cách sử dụng if rowNumber % 2 == 0 nhưng bạn phải thừa nhận rằng, nó ít rõ ràng hơn.

## Chuyển đổi và unwrap các giá trị trong Dictionary với compactMapValues()
SE-0218 thêm mới một phương thức compactMapValues() cho các Dictionary, kết hợp chức năng compactMap() từ các mảng (Thay đổi giá trị, hủy kết quả, sau đó loại bỏ bất cứ thứ gì nill) với phương thức mapValues() từ Dictionary (giữ nguyên các key nhưng biến đổi các value).

Ví dụ, ở đây, một Dictionary của những người trong một cuộc đua, cùng với thời gian họ mất để hoàn thành trong vài giây. Một người đã không hoàn thành, được đánh dấu là "DNF":
```
let times = [
    "Hudson": "38",
    "Clarke": "42",
    "Robinson": "35",
    "Hartis": "DNF"
]
```
Chúng ta có thể sử dụng compactMapValues() để tạo một Dictionary mới với tên và thời gian là một số nguyên, với một người DNF bị xóa:
```
let finishers1 = times.compactMapValues { Int($0) }
```

Ngoài ra, bạn có thể chuyển trực tiếp trình khởi tạo Int sang compactMapValues(), như thế này:

```
let finishers2 = times.compactMapValues(Int.init)
```
Bạn cũng có thể sử dụng compactMapValues() để hủy các giá trị tùy chọn và loại bỏ các giá trị nil như sau:

```
let people = [
    "Paul": 38,
    "Sophie": 8,
    "Charlotte": 5,
    "William": nil
]

let knownAges = people.compactMapValues { $0 }
```

Nguồn: hackingwithswift.com