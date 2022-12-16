Hầu hết trong mọi app chúng ta đều cần xử lý các vấn đề liên quan đến ngày tháng ví dụ như hiển thị ngày tháng theo một format nào đó như "yyyy/mm/dd" hay "dd-mm-yyyy" chẳng hạn, hay thậm chí là so sánh giữa 2 dates với nhau để làm một tác vụ nào đó, ...

Với sự phổ biến như vậy, hôm nay mình sẽ cùng tìm hiểu cụ thể hơn về nó, ít nhất là 3 object: Date, DateFormatter và DateComponents.


### Date struct:
- Date là một struct trong Foundation framework. Nó đại diện cho một thời điểm cụ thể trong thời gian độc lập với bất kỳ calendar hay time zone nào.
- Date structure là cầu nối tới NSDate class.
- Date structure cung cấp các medthods để:

    +  So sánh các Dates với nhau.
    +  Tính toán khoảng thời gian giữa 2 dates.
    +  Tạo mới 1 date từ một khoảng thời gian liên quan từ một date khác.
- Nó không làm bất cứ việc gì liên quan đến format date hay convert một string sang date hay ngược lại.
### DateFormatter class:
- Thuộc Foundation framework.
- Một formater cung cấp các phương thức để chuyển đổi từ Date thành String và từ String thành Date.
- Cho phép bạn tùy chỉnh biểu diễn của chuỗi Date bằng cách sử dụng các kiểu định sẵn hoặc xây dựng định dạng của riêng bạn.
- Cũng support localization.
### DateComponents struct:
- Thuộc Foundation framework.
- Date hay Time được đại diện bởi các đơn vị như năm, tháng, ngày, phút hay giờ trong một calendar cụ thể.
- Nó cung cấp các truy cập trực tiếp đến các components khác nhau của Date và Time.

Sau đây là một vài ví dụ
#### 1. Cách tạo một object Date:
- Tạo 1 date với current date và time:
    ```swift
    let currentDate = Date()
    print(currentDate)
    ```
    **Result:**  *2018-06-25 11:34:42 +0000*
- Tạo 1 date bằng cách add time interval - in seconds - to current date:
    ```swift
        let date = Date.init(timeIntervalSinceNow: 86400)
        print(date)
    ```
    **Result:**  *2018-06-26 11:35:35 +0000*
- Tạo 1 date bằng cách add time interval – in seconds – since reference date:
    ```swift
        let date = Date.init(timeIntervalSinceReferenceDate: 86400)
        print(date)
    ```
    **Result:**  *2001-01-02 00:00:00 +0000*

- Tạo 1 date từ DateComponents
    ```swift
    let calendar = Calendar.current
    var components = DateComponents()

    components.day = 26
    components.month = 6
    components.year = 2018
    components.hour = 0
    components.minute = 15

    let newDate = calendar.date(from: components)
    print(newDate)
    ``` 
    **Result:** *Optional(2018-06-25 17:15:00 +0000)*
#### 2. Convert Date sang String:
- Convert với dateStyle và timeStyle định sẵn
    
    Date style và Time style có 5 options:
    ```swift
    public enum Style : UInt {
            case none
            case short
            case medium
            case long
            case full
        }
    ```    
    
    // code
    ``` swift
    let currentDate = Date()
    let dateFormatter = DateFormatter()
    dateFormatter.dateStyle = .full
    dateFormatter.timeStyle = .full
    let dateString = dateFormatter.string(from: currentDate)
    print(dateString)
    ```
    

    **Result:** *Tuesday, June 26, 2018 at 8:42:28 AM Indochina Time*

- Convert với style tự định nghĩa:
    ```swift
    let currentDate = Date()
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "MMMM-dd-yyyy HH:mm"
    let dateString = dateFormatter.string(from: currentDate)
    print(dateString)
    ```
    
    **Result:** *June-26-2018 09:02*
#### 3. Convert String to Date:
Lưu ý, dateFormat của DateFormatter() phải trùng với date format của string. Nếu không thì kết quả trả về sẽ nil
- Ví dụ không trùng với date format của string:
    ```swift
    let dateString = "26-06-2018"
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "MM-dd-yyyy"
    let dateFromString = dateFormatter.date(from: dateString)
    print(dateFromString)
    ```
    **Result:** *nil*
- Ví dụ trùng với date format của string:
    ```
    let dateString = "26-06-2018"
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "dd-MM-yyyy"
    let dateFromString = dateFormatter.date(from: dateString)
    print(dateFromString)
    ```
    **Result:** *Optional(2018-06-25 17:00:00 +0000)*
#### 4. Compare dates:
So sánh rất đơn giản, chỉ dùng các toán tử >, <, == là so sánh được.
```swift
let start = "2017-05-25"
let end = "2017-05-25"
let dateFormat = "yyyy-MM-dd"

let dateFormatter = DateFormatter()
dateFormatter.dateFormat = dateFormat

let startDate = dateFormatter.date(from: start)
let endDate = dateFormatter.date(from: end)

guard let startDate = startDate, let endDate = endDate else {
    fatalError("Date Format does not match ⚠️")
}

if startDate < endDate {
    print("Early")
} else if startDate > endDate {
    print("Later")
} else {
    print("Equal")
}
```
**Result:** *Equal*
#### 5. Get components of Date
```swift
let dateCurrent = Date()
let calendar = Calendar.current
let components = calendar.dateComponents([Calendar.Component.day, Calendar.Component.month, Calendar.Component.year], from: dateCurrent)
print("Day:\(components.day!) Month:\(components.month!) Year:\(components.year!)")
```
**Result**: *Day:26 Month:6 Year:2018*
### Kết:
Trên đây mình có giới thiệu về Date trong swift với những ví dụ rất hay được sử dụng. Rất mong nó hữu ích vs mọi người. Thanks.