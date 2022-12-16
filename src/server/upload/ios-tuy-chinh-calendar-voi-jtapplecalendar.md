Xin chào, hôm nay mình xin giới thiệu các bạn về 1 lib khá hay để bạn có thể custom các calendar (dạng lưới) một cách dễ dàng. :D theo như bài viết mình tìm hiểu thì bạn ấy bảo có thể đáp ứng tới 98% yêu cầu dù bất cứ UI nào đấy.
## Setup
Muốn tạo một calendar lên trên màng hình thì việc của bạn chỉ cần setup nó bằng một function khá đơn giản thui nhưng mình sẽ chỉnh sửa bài 1 tí để hướng dẫn các bạn từng bước luôn nhé

**1.** Đầu tiên đương nhiên là phải cài pod rồi. Bạn init pod trong terminal cài lib theo dòng lệnh
```
pod 'JTAppleCalendar'
```
**2.** Mở Xcode lên và chiến thui. Đầu tiên là kéo collection vào và ở mục Identity Inspector nhớ chỉ class của CollectionView lại thành JTAppleCalendarView nhé. Đừng quên ánh xạ cho nó nhé
![](https://images.viblo.asia/57eb51ec-f3d7-4686-bbf8-6aa79c5600c0.png)
**3.** Tạo các collectionViewCell cho calendarView nhớ dùng class JTAppleCell của lib nhé
```
import UIKit
import JTAppleCalendar
class CustomCell: JTAppleCell {
    @IBOutlet weak var dayLabel: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
}
```
**4.** Implement các hàm trong delegate và dataSource của lib là xong :D bạn có ngay cái calendar dc setup nhưng hơi bị ngáo tí (do chưa hoàn chỉnh UI thôi)
```
func configureCalendar(_ calendar: JTAppleCalendarView) -> ConfigurationParameters {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy MM dd"
        
        let startDate = formatter.date(from: "2018 01 01")!
        let endDate = Date()
        
        let parameters = ConfigurationParameters(startDate: startDate,
                                                 endDate: endDate)
        
        return parameters
    }
    
    func calendar(_ calendar: JTAppleCalendarView, cellForItemAt date: Date, cellState: CellState, indexPath: IndexPath) -> JTAppleCell {
        guard let cell = calendarCollectionView.dequeueReusableJTAppleCell(withReuseIdentifier: "CustomCell", for: indexPath) as? CustomCell else {
            return JTAppleCell()
        }
        cell.dayLabel.text = cellState.text
        return cell
    }
    
    func calendar(_ calendar: JTAppleCalendarView, willDisplay cell: JTAppleCell, forItemAt date: Date, cellState: CellState, indexPath: IndexPath) {
        let cell = calendarCollectionView.dequeueReusableJTAppleCell(withReuseIdentifier: "CustomCell", for: indexPath) as? CustomCell
        cell.dayLabel.text = cellState.text
    }
```

**5.** Kết quả của mình đây, nó bị liền nhau do ko có header nhé  :D 
![](https://images.viblo.asia/38db9a38-2ac7-475b-afcd-57e98bd18920.png)
## Khái niệm về inDates và outDates
InDates và OutDates được tạo ra nhằm mục đích để bù vào các khoảng trống trên calendar. Vd: trong hình dưới này thì ngày 1 đã được đặt lệch sang phải để nhường cho ngày 31. 
![](https://images.viblo.asia/6e8970d8-e690-4658-ad6c-395f4b29b4c7.png)
Nếu bạn muốn calendar có các offset(khoảng trống bù lại cho các cell) này thì bạn có thể set style cho inDates và outDates để chúng generate, còn không thì bạn vẫn có thể tắt đi một cách dễ dàng.

Bạn vẫn có thể generate chúng ra và ẩn đi một cách dễ dàng đấy chứ không cần phải tắt hẳn đâu nhé. Dưới đây là hình mình làm cho 1 cái calendar đây
![](https://images.viblo.asia/d4f06046-7851-4a50-8393-220dc16ac439.png)

Dưới đây là các trường bạn phải điền vào để config cho calendar của bạn chỉ có 2 trường bắt buộc là `startDate` và `enDate`. Các trường còn lại khi bạn để trống thì chúng sẽ tự động điền vào giá trị default
Dưới đây là toàn bộ các parameters bạn cần config cho calendar được mặc định giá trị default sẵn
```
let parameters = ConfigurationParameters(
    startDate: startDate,  // This is manditory and must be supplied by you
    endDate: endDate,      // This is manditory and must be supplied by you
    numberOfRows: 6,                       // Default
    calendar: Calendar.current,            // Default
    generateInDates:  .forAllMonths,       // Default
    generateOutDates: .tillEndOfGrid,      // Default
    firstDayOfWeek:   .sunday              // Default
)
```
Chúng ta đi vào tìm hiểu các parameters này nhé:

**1. generateInDates:** param này có thể set thành:
* **forFirstMonthOnly** - Chỉ có tháng đầu tiên tạo ra inDates/offset. Các tháng còn lại sẽ không có inDates/offset.
* **forAllMonths** - Tất cã các tháng đều có inDates/offset.
* **off** - Không tháng nào có inDates/offset.

**2. generateOutDates**

* **tillEndOfRow** - Calendar sẽ tạo ra outDates cho đến khi nó kết thúc đầu tiên của 1 hàng. Hiểu ngắn gọn là, nếu calendar của bạn hiển thị 1 tháng có 6 hàng nếu bạn truyền vào 6 hàng, và sẽ là 5 hàng nếu bạn nhập con số là 5.
* **tillEndOfGrid** - outDates sẽ được tạo ra cho đến khi nó đạt đến giới hạn của 6 hàng x 7 cột (42 ô). Tóm lại là, nó sẽ luôn hiển thị một tháng có 6 hàng trong calendar.
* **off** - Calendar sẽ không hiển thị outDates cho bất kì tháng.

**3. firstDayOfWeek**

Bạn có thể thay đổi ngày bắt đầu của 1 tháng khi nhập trường này 
Default của nó là :
```
Sun | Mon | Tue | Wed | Thu | Fri | Sat
```
Với trường này thì bạn có thể đổi bất kì ngày nào trong tuần là ngày bắt đầu đầu tiên của tháng
```
Sat | Sun | Mon | Tue | Wed | Thu | Fri
```
## Lỗi thường gặp khi làm calendar 1 row
Mình thấy mọi người hay gặp lỗi setup dưới đây
```
let parameters = ConfigurationParameters(
    startDate: startDate,  
    endDate: endDate,      
    numberOfRows: 1,
    calendar: Calendar.current,
    generateInDates:  .forFirstMonthOnly,
    generateOutDates: .tillEndOfGrid,
    firstDayOfWeek:   .sunday
)
```
Mặc dù setup kiểu này là hoàn toàn đúng, chẳng sai gì hết trơn (vì bạn muốn calendar của bạn như v mà =))) ) nhưng mà ở đây sẽ gặp sự cố mà không ai muốn cã. Bạn còn nhớ tấm hình này không ? 
![](https://images.viblo.asia/6e8970d8-e690-4658-ad6c-395f4b29b4c7.png)
Nếu bạn setup calendar 1 hàng với parameters như trên, thì bạn cũng đang muốn nó tạo ra cái outDates cho bạn. Nghĩa là khi bạn scroll 1 hàng thì bạn sẽ thấy 2 loại date luôn, đầu tiên là bạn sẽ thấy outDates của 1 tháng X và sau đó sẽ là ngày thật của tháng X + 1 sau đó. Theo như cái hình ví dụ trên thì chúng ta sẽ thấy giá trị từ ngày 1 -> 12 bị lập lại 2 lần đó nhé.

**Hướng giải quyết:** cho các calendar 1 hàng, bạn nên cho giá trị outDates là `.off`

Với cái lib linh động chỉnh sửa layout này, bạn có thể tuỳ biến bất cứ calendar dạng lưới nào một cách dễ dàng :v đương nhiên là cần thời gian để vọc tìm hiểu mới làm được nhé.
## 1 param nữa  thôi
Rãnh rỗi sinh nông nổi, bạn muốn tạo 1 cái calendar độc nhất vô nhị mà đết ai thấy bao giờ ? Còn 1 trường params nữa trong setup là
```
let parameters = ConfigurationParameters(
    startDate: startDate, 
    endDate: endDate,     
    numberOfRows: 6,
    calendar: Calendar.current,
    generateInDates:  .forFirstMonthOnly,
    generateOutDates: .tillEndOfGrid,
    firstDayOfWeek:   .sunday,
    hasStrictBoundaries: false
)
```
hasStrictBoundaries - Param này sẽ được apply khi mà calendar của bạn không có header. Thế nó dùng để làm gì ? 
Giả sử bạn có 1 calendar 6 hàng và outDates được off. Cell date của bạn chưa nằm ở vị trí bên phải ngoài cùng để kết thúc 1 hàng và bạn có 1 vài khoảng trống ngay đó. Với hasStrictBoundaries set là off thì nó sẽ biến cái cell kế tiếp đang trống (sau ngày cuối cùng cuả tháng này) của bạn thành ngày đầu tiên của tháng sau luôn.


-----
Tài liệu tham khảo mình tìm hiểu tại trang này [Calendar layout (JTAppleCalendar)](https://patchthecode.github.io/CalendarLayout/)

Các bạn có thể dễ dàng tìm hiểu qua youtube với clip hướng dẫn code luôn nên thành ra mình sẽ không up code lên git nhé ^^. :D Chúc các bạn thành công. 

Link đây, link đây:
[Youtube: JTAppleCalendar Creating a Calendar](https://www.youtube.com/watch?v=zOphH-h-qCs)