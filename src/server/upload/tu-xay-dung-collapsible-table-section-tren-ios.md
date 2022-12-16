# Giới thiệu
Bài viết sẽ hướng dẫn người dùng từng bước xây dựng một Collapsible table section sử dụng thuần code Swift3, không sử dụng storyboard và XIB

Bài viết tập trung vào các kỹ thuật cơ bản khi làm việc với UITableView như tùy biến UITableViewCell, tự động resize chiều cao của UITableViewCell theo nội dụng, tùy biến Header của một UITableView.

# Chi tiết các bước thực hiện
## Bước 1: Xây dựng cấu trúc dữ liệu
Trong ví dụ này dữ liệu hiển thị trong bảng sẽ được phân chia theo từng nhóm (Section)
Ta sẽ xây dựng cấu trúc Section để mô tả cho từng nhóm dữ liệu sẽ hiển thị trong bảng này

```
struct Section {
  var name: String
  var items: [String]
  var collapsed: Bool
    
  init(name: String, items: [Item], collapsed: Bool = false) {
    self.name = name
    self.items = items
    self.collapsed = collapsed
  }
}
    
var sections = [Section]()

sections = [
  Section(name: "Mac", items: ["MacBook", "MacBook Air"]),
  Section(name: "iPad", items: ["iPad Pro", "iPad Air 2"]),
  Section(name: "iPhone", items: ["iPhone 7", "iPhone 6"])
]
```

Trường dữ liệu **collapsed** để lưu trạng thái collapsed của một section, mặc định sẽ có giá trị là **false**.

## Bước 2: Khởi tạo UITableView để hỗ trợ Autosizing
Đoạn code dưới đây sẽ giúp UITableViewCell tự động thay đổi chiều cao của từng cell tương ứng theo nội dung hiển thị của cell.
```
override func viewDidLoad() {
  super.viewDidLoad()
        
  // Auto resizing the height of the cell
  tableView.estimatedRowHeight = 44.0
  tableView.rowHeight = UITableViewAutomaticDimension
  
  //More code
}
```

## Bước 3: Tùy biến Section Header của UITableView
Ta sẽ tùy biến Section Header thông qua việc kế thừa và mở rộng class **UITableViewHeaderFooterView**
```
class CollapsibleTableViewHeader: UITableViewHeaderFooterView {
  let titleLabel = UILabel()
  let arrowLabel = UILabel()
    
  override init(reuseIdentifier: String?) {
    super.init(reuseIdentifier: reuseIdentifier)
    contentView.addSubview(titleLabel)
    contentView.addSubview(arrowLabel)
  }
    
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}
```

Về mặt tương tác người dùng, người dùng có thể mở rộng hay thu gọn một section bằng cách tap vào header. Ta sẽ sử dụng **UITapGestureRecognizer** để thực thi những tương tác này.
Ngoài ra ta cần xây dựng một **delegate** để xử lý khi trạng thái "collapsed" của một section thay đổi
```
protocol CollapsibleTableViewHeaderDelegate {
    func toggleSection(header: CollapsibleTableViewHeader, section: Int)
}
class CollapsibleTableViewHeader: UITableViewHeaderFooterView {
    var delegate: CollapsibleTableViewHeaderDelegate?
    var section: Int = 0
    ...
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        ...
        addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(CollapsibleTableViewHeader.tapHeader(_:))))
    }
    ...
    func tapHeader(gestureRecognizer: UITapGestureRecognizer) {
        guard let cell = gestureRecognizer.view as? CollapsibleTableViewHeader else {
            return
        }
        delegate?.toggleSection(self, section: cell.section)
    }
    func setCollapsed(collapsed: Bool) {
        // Animate the arrow rotation (see Extensions.swf)
        arrowLabel.rotate(collapsed ? 0.0 : .pi / 2)
    }
}
```

Trong bài viết này ta không sử dụng StoryBoard và XIB, ta sẽ mở rộng hàm **constraintsWithVisualFormat** của **NSLayoutConstraint** cho phần xử lý **Autolayout**
```
override init(reuseIdentifier: String?) {
    ...
    // arrowLabel must have fixed width and height
    arrowLabel.widthAnchor.constraintEqualToConstant(12).active = true
    arrowLabel.heightAnchor.constraintEqualToConstant(12).active = true
    titleLabel.translatesAutoresizingMaskIntoConstraints = false
    arrowLabel.translatesAutoresizingMaskIntoConstraints = false
}
override func layoutSubviews() {
    super.layoutSubviews()
    ...
    let views = [
        "titleLabel" : titleLabel,
        "arrowLabel" : arrowLabel,
    ]
    contentView.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat(
        "H:|-20-[titleLabel]-[arrowLabel]-20-|",
        options: [],
        metrics: nil,
        views: views
    ))
    contentView.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat(
        "V:|-[titleLabel]-|",
        options: [],
        metrics: nil,
        views: views
    ))
    contentView.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat(
        "V:|-[arrowLabel]-|",
        options: [],
        metrics: nil,
        views: views
    ))
}
```

## Bước 4: Thực thi cho UITableView DataSource và UITable Delegate
Thực thi hàm **numberOfSectionsInTableView** để mô tả số lượng section có trong table:
```
override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
  return sections.count
}
```

Và hàm **numberOfRowsInSection** để mô tả số row trong một section:
```
override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return sections[section].collapsed ? 0 : sections[section].items.count
}
```

Lưu ý rằng ta không cần thiết phải render các cell của section đang ở trạng thái **collapsed**, và có thể giúp tăng hiệu khi khi render bảng, đặc biệt là khi trong section có nhiều cell.

Ngoài ra ta cần phải thực thi hàm **viewForHeaderInSection** của table view để tùy biến header của table:
```
override func tableView(tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
    let header = tableView.dequeueReusableHeaderFooterViewWithIdentifier("header") as? CollapsibleTableViewHeader ?? CollapsibleTableViewHeader(reuseIdentifier: "header")
    header.titleLabel.text = sections[section].name
    header.arrowLabel.text = ">"
    header.setCollapsed(sections[section].collapsed)
    header.section = section
    header.delegate = self
    return header
}
```

Đối với các cell không nằm trong collapsed section ta sẽ thực thi hàm **cellForRowAtIndexPath** như sau:
```
override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCellWithIdentifier("cell") as UITableViewCell? ?? UITableViewCell(style: .Default, reuseIdentifier: "cell")
    cell.textLabel?.text = sections[indexPath.section].items[indexPath.row]
    return cell
}
```

## Bước 5: Xử lý thu gọn và mở rộng Section
Nguyên tắc xử lý hết sức đơn giản, đó là cập nhật chiều cao của các **row** bên trong một **section**, khi thuộc tính **collapsed** của section đó bị thay đổi.
- Khi **collapsed = true** thì cập nhật chiều cao của các row bằng 0
- Khi **collapsed = false** thì cập nhật chiều cao của các row bằng **UITableViewAutomaticDimension**
```
override func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
  return sections[(indexPath as NSIndexPath).section].collapsed ? 0 : UITableViewAutomaticDimension
}
```

Dưới đây là đoạn code để xử lý khi touch vào section header:
```
extension CollapsibleTableViewController: CollapsibleTableViewHeaderDelegate {
  func toggleSection(_ header: CollapsibleTableViewHeader, section: Int) {
    let collapsed = !sections[section].collapsed
        
    // Toggle collapse
    sections[section].collapsed = collapsed
    header.setCollapsed(collapsed)
    
    // Reload the whole section
    tableView.reloadSections(NSIndexSet(index: section) as IndexSet, with: .automatic)
  }
}
```

Sau khi các section được reload, toàn bộ các cell trong section đó sẽ được tính toán và hiển thị lại trên giao diện.

Sau khi thực hiện các bước trên, bạn đã có một Collapsible Table Section của riêng mình.

# Kết luận
Rất mong qua bài viết này nhưng người lần đầu làm quen với iOS sẽ quen hơn với việc tùy biến UITableView, sử dụng Autolayout bằng code thay vì sử dụng các công cụ hỗ trợ kéo thả.

Mã nguồn chương trình Demo: https://github.com/oLeThiVanAnh/R6_2018

# Nguồn tham khảo
- https://medium.com/@jeantimex/how-to-implement-collapsible-table-section-in-ios-142e0c6266fd
- https://github.com/jeantimex/ios-swift-collapsible-table-section