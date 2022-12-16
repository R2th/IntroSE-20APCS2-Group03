- Quá trình tính toán ngày tháng và các mốc thời gian khác nhau cho chúng ta cảm giác nó là một quá trình đơn giản. Chúng ta đều biết là 1 phút có 60 giây, 1 h có 60 phút và 1 ngày thì gồm 24h tuy nhiên để hiển thị chính xác và có thể thiết lập tuỳ chỉnh ngày tháng thì yêu cầu chúng ta nhiều model phức tạp.

- Rất may mắn cho chúng ta là Apple đã cung cấp cho chúng ta một bộ API bào gồm đầy đủ các tuỳ chỉnh của ngày tháng trong Foundation mặc dù một số API trông có vẻ rất phức tạp ngay từ cái nhìn đầu tiên. Các API này cho phép chúng ta có thể xử lý code để xử lý ngày tháng với nhiều điều kiện và vùng miền khác nhau mà không cần chúng ta quan tâm đến các điều kiện khác nhau.

# 1/ Tuỳ chỉnh khoảng thời gian:
- `TimeInterval` type cho phép chúng ta biểu diễn một khoảng thời gian cách nhau - điều rất hữu dụng khi chúng ta tính toán ngày tháng trong tương lai gần như ví dụ dưới:

```swift
let date = Date().addingTimeInterval(20)
schedule(notification, for: date)
```

- Tuy nhiên, các tính toán ngày tháng bên trên dễ bị lỗi khi mà khoảng thời gian được tăng lên như thêm một số giây vào thời điểm hiện tại sẽ không kiểm soát được số giây lẻ ra dẫn đến tính sai như hiển thị thời gian ban ngày và ban đêm.

- Lấy ví dụ, mặc dù theo đoạn code trên cho chúng ta tính toán 24h về số giây, nhưng việc hiển thị là `tomorrow` hay `previous day` thì hoàn toàn phụ thuộc vào khoảng thời gian được cộng thêm tại thời điểm cộng:

```swift
let tomorrow = Date().addingTimeInterval(60 * 60 * 24)
```

- Trong khi độ chính xác luôn được yêu cầu khi xử lý ngày tháng thì việc sử dụng khoảng thời gian được tính toán thủ công dẫn đến việc gây ra một số lỗi nếu chúng ta giả định ngày mai là khoảng thời gian tuyệt đối so với hiện tại.

- Chúng ta có thể tính toán theo cách sau một cách hiệu quả hơn là sử dụng `Calendar` trong Foundation cho phép chúng ta thao tác ngày tháng theo lịch cụ thể:

```swift
// Calendar.current gives us access to a calendar that’s
// configured according to the user’s system settings:
let calendar = Calendar.current
let date = Date()

// Define which date components that we want to be considered
// when looking for tomorrow’s date. This essentially decides
// what level of precision that we’d like:
let components = calendar.dateComponents(
    [.hour, .minute, .second, .nanosecond],
    from: date
)

let tomorrow = calendar.nextDate(
    after: date,
    matching: components,
    matchingPolicy: .nextTime
)
```

- Mặc dù đoạn code trên sẽ thực sự mang đến cho chúng ta ngày tháng mà tương đương với cùng thời điểm như bây giờ trong tương lai tuy nhiên việc viết codee đó mỗi khi chúng ta muốn thực hiện phép tính ngày như vậy có thể nhanh chóng bị trùng lặp, do đó hãy sử dụng `Date` thay thế:

```swift
extension Date {
    func sameTimeNextDay(
        inDirection direction: Calendar.SearchDirection = .forward,
        using calendar: Calendar = .current
    ) -> Date {
        let components = calendar.dateComponents(
            [.hour, .minute, .second, .nanosecond],
            from: self
        )
        
        return calendar.nextDate(
            after: self,
            matching: components,
            matchingPolicy: .nextTime,
            direction: direction
        )!
    }
}
```

- Ở trên chúng ta có thể hỗ trợ thêm để chỉ định `SearchDirection` cho phép chúng ta có thể tiến hoặc lùi một khoảng thời gian khi tính ngày kế tiếp, đồng nghĩa chúng ta có thể tạo 2 API để tính thờin gian hiện tại của ngày mai và ngày hôm qua:

```swift
extension Date {
    static var currentTimeTomorrow: Date {
        return Date().sameTimeNextDay()
    }
    
    static var currentTimeYesterday: Date {
        return Date().sameTimeNextDay(inDirection: .backward)
    }
}
```

# 2/ Từ khoảng cách thời gian cho đến khoảng cách ngày:

- Ngoài việc di chuyển một ngày về phía trước hoặc sau, `Calendar` cũng bao gồm các API thuận tiện cho làm việc với ngày trong khoảng thời gian nhất định. Trong khi `Date` là giá trị đại diện duy nhất trong thời gian, nhận thức của chúng ta xoay quanh ngày, tháng, năm hơn là mốc thời gian chính xác.

- Lấy ví dụ chúng ta làm việc trên app mà nó làm mới nội dung để show cho từng user tại nửa đêm với thời gian của user là theo khu vực. Thay vì liên tục làm mới nội dung từ server, chúng ta sẽ lưu trữ bất kì content nào được load cho đến nửa đêm cho đến khi request mới của ngày tiếp theo được bắt đầu:

- Thay vì việc tính chính xác thời điểm ngày mới bắt đầu, hãy sử dụng method `startOfDay` trong `Calendar` kết hợp với API tiện lợi `currentTimeTomorrow`:

```swift
func contentDidLoad(_ content: Content) {
    let refreshDate = calendar.startOfDay(for: .currentTimeTomorrow)
    cache(content, until: refreshDate)
}
```

- Mặc dù điều kiện trên cho chúng ta chính xác ngày mà content mới nên sẵn sàng, có nghĩa là nếu chúng ta thực hiện request của mình vào đúng ngày đó chúng ta vẫn có thể nhận được content ngày hôm qua trong trường hợp đồng hồ của server chậm hơn đồng hồ khách hàng.

- Để khắc phục điều đó, chúng ta cần đến sự giúp sức của `TimeInterval` để làm mới ngày để khắc phục sự khác nhau về thời gian giữa khách hàng và server:

```swift
func contentDidLoad(_ content: Content) {
    let refreshDate = calendar.startOfDay(for: .currentTimeTomorrow)
    cache(content, until: refreshDate.addingTimeInterval(100))
}
```
- Bên cạnh việc tính toán khởi đầu một khoảng thời gian nhất định như một ngày, `Calendar` cũng cho phép chúng ta tìm kiếm các khoảng thời gian chẳng hạn như cuối tuần tiếp theo ngay sau một ngày nhất định nào đó.

```swift
let nextWeekend = calendar.nextWeekend(startingAfter: Date())!

showPartySchedulingView(
    withStartDate: nextWeekend.start,
    endDate: nextWeekend.end
)
```

- Cúng ta cũng có thể sử dụng `Calendar` để truy xuất một phần của một ngày. Ví dụ: Chúng tôi có thể truy xuất ngày bắt đầu và ngày kết thúc của ngày-tháng-năm hiện tại:

```swift
let date = Date()
let today = calendar.dateInterval(of: .day, for: date)
let currentMonth = calendar.dateInterval(of: .month, for: date)
let currentYear = calendar.dateInterval(of: .year, for: date)
```

- Ở đây, cách chúng ta có thể tính thời gian cho năm sau, bằng cách thêm một năm vào ngày hôm nay và sau đó sử dụng ngày hôm nay để tính khoảng thời gian:

```swift
let components = DateComponents(year: 1)
let todayNextYear = calendar.date(byAdding: components, to: Date())!
let nextYear = calendar.dateInterval(of: .year, for: todayNextYear)
```