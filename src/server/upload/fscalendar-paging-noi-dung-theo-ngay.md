# FSCalendar là gì?
FSCalendar là một thư viện lịch dành cho iOS có thể tuỳ chỉnh, làm việc tương thích với cả Objective-C và Swift.

Mọi người thể tìm hiểu thêm tại đây
https://github.com/WenchaoD/FSCalendar

## Một vài hình ảnh được chia sẻ từ FSCalendar

### iPhone
![FSCalendar](https://cloud.githubusercontent.com/assets/5186464/10262249/4fabae40-69f2-11e5-97ab-afbacd0a3da2.jpg)

### iPad
![FSCalendar](https://cloud.githubusercontent.com/assets/5186464/10927681/d2448cb6-82dc-11e5-9d11-f664a06698a7.jpg)

# Áp dụng Page View Controller cho FSCalendar.
Mục đích là có thể swipe sang trái, sang phải ở nội dung để có thể thay đổi nội dung theo ngày.

![FSCalendar](https://raw.githubusercontent.com/tranhanhuy/FSCalendar/project/day-mode/assets/daymode1.png)

# Sau đây mình sẽ hướng dẫn các bạn làm.
### Các view controller 

* **DayModeViewController** - Chứa calendar và pageViewController
* **DayModePageViewController** - Được kế thừa từ UIPageViewController, dùng để hiện thực nội dung cũng như bắt sự kiện swipe trái / phải.
* **DayModeContentViewController** - Chứa các events được filter theo từng ngày.

### DayModeContentViewController

Trong ContentViewController, tạo 1 tableView để hiện thỉ nội dung. Như ví dụ ở đây chỉ tạo nội dung về events, các bạn có thể tuỳ biến việc nội dung hiện thị ra sao.

```
// MARK:- UITableViewDataSource
extension DayModeContentViewController: UITableViewDataSource {

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 20
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell.init(style: .subtitle, reuseIdentifier: nil)
        cell.imageView?.image = UIImage(named: "icon_cat")
        cell.textLabel?.text = "\(indexPath.row + 1)/ Lorem ipsum dolor sit er elit lamet"
        if let date = date {
            cell.detailTextLabel?.text = dateFormatter.string(from: date)
        }
        return cell
    }
}

// MARK:- UITableViewDelegate
extension DayModeContentViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        if let date = date {
            let label = UILabel()
            label.text = "    📅  \(dateFormatter.string(from: date))"
            label.textColor = .white
            label.backgroundColor = .lightGray
            return label
        }
        return nil
    }
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 45
    }
}
```

### DayModePageViewController 

Tại đây mình có tạo một protocol để bắt sự kiện swipe và callback nội dung về DayModeViewController

```
protocol DayModePageDelegate: NSObject {
    func swipeDate(date: Date?)
    func swipeNextDate(date: Date?)
    func swipePreviousDate(date: Date?)
}
```

Trong DayModePageViewController sẽ kế thừa `UIPageViewControllerDataSource` và `UIPageViewControllerDelegate`

```
extension DayModePageViewController: UIPageViewControllerDataSource, UIPageViewControllerDelegate {
    
    // Khởi tạo Content View Controller dựa vào date
    func createContentViewController(_ date: Date) -> UIViewController {
        let vc = DayModeContentVC()
        vc.date = date
        return vc
    }
    
    // Lấy View Controller đang hiện thị ở PageViewController
    func getCurrentViewController() -> DayModeContentVC? {
        return viewControllers?.first as? DayModeContentVC
    }
    
    // DataSource & Delegate - Khởi tạo Content của ngày hôm qua
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController? {
        return createContentViewController(self.previousDay)
    }
    
    // DataSource & Delegate - Khởi tạo Content của ngày kế tiếp
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController? {
        return createContentViewController(self.nextDay)
    }
    
    // DataSource & Delegate - Sự kiện sau khi swipe thành công, sẽ trả dữ liệu về trang DayModeViewController để xử lý các mong muốn.
    func pageViewController(_ pageViewController: UIPageViewController, didFinishAnimating finished: Bool, previousViewControllers: [UIViewController], transitionCompleted completed: Bool) {
        if finished, let delegate = dayModePageDelegate, let vc = getCurrentViewController() {
            currentDate = vc.date ?? currentDate
            delegate.swipeDate(date: vc.date)
        }
    }
}
```

### DayModeViewController

Khởi tạo một số biến cần thiết.
```
var calendar: FSCalendar! //Tạo một calendar ở header
var containerView: UIView! //Chứa view của pageViewController
var pageViewController: DayModePageViewController!
```

Gắn pageViewController  vào containerView
```
pageViewController = DayModePageViewController(selectedDay: calendar.selectedDate ?? Date())
pageViewController.dayModePageDelegate = self
addChildViewController(pageViewController)   
containerView.addSubview(pageViewController.view)
pageViewController.didMove(toParentViewController: self)
```

Nhận sự kiện từ PageViewController thông qua delegate
```
// MARK:- DayModePageDelegate
extension DayModeViewController: DayModePageDelegate {
    func swipeDate(date: Date?) {
        calendar.select(date, scrollToDate: true)
    }
    
    func swipeNextDate(date: Date?) {
        
    }
    
    func swipePreviousDate(date: Date?) {
        
    }
}
```

## Kết quả 

Ngoài ra các bạn có thể customize thêm nhiều thứ khác mà FSCalendar hỗ trợ. 

Full SourceCode:

https://github.com/tranhanhuy/FSCalendar/tree/project/day-mode


-----


Một vài hình ảnh:

![FSCalendarDayMode](https://raw.githubusercontent.com/tranhanhuy/FSCalendar/project/day-mode/assets/daymode1.png)
![FSCalendarDayMode](https://raw.githubusercontent.com/tranhanhuy/FSCalendar/project/day-mode/assets/daymode2.png)