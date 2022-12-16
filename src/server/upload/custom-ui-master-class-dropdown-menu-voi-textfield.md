![](https://giphy.com/gifs/XI58O5eXKoUuUk9piq?utm_source=iframe&utm_medium=embed&utm_campaign=Embeds&utm_term=https%3A%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%3A%2F%2Fgiphy.com%2Fembed%2FXI58O5eXKoUuUk9piq%2Ftwitter%2Fiframe&%3Burl=https%3A%2F%2Fgiphy.com%2Fgifs%2FXI58O5eXKoUuUk9piq&%3Bimage=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FXI58O5eXKoUuUk9piq%2Fgiphy.gif&%3Bkey=a19fcc184b9711e1b4764040d3dc5c07&%3Btype=text%2Fhtml&%3Bschema=giphy)

# User case

Dropdown menu nên được sử dụng một cách hạn chế, và dùng cho tình huống bạn muốn người dụng lựa chọn trọng phạm vi xác định. Bạn nên thường xuyên chuyển sang View Controller thứ hai với một tableview thể hiện các phương án lựa chọn. Thành phần xây dựng của chúng ta hôm nay sẽ bao gồm một Textfield có thể cho người dùng nhập tuỳ chọn của họ nếu các lựa chọn không bao gôm được phương án họ mong muốn.

# DropdownTextField: Tổng quan

Logic liên quan đến việc dropdown không quá phức tạp, nhưng có rất nhiều tương tác đến các views khác. Để hiểu được cấu trúc mà chúng ta xây dựng, bạn hay quan sát sơ đồ sau:

![](https://cdn-images-1.medium.com/max/800/1*lzCBbGcXApjfuVWqM-cWzA.png)

TapView: Nằm ở top của Views, nó nhận các thao tác của User và kick hoạt dropdown animation.

TextField: bên dưới TabView, hiển thị các lựa chọn hoặc cho phép user tự nhập phương án của mình.

AnimationView: để nhìn thấy hiệu ứng dropdown, các hoạt động sẽ được thực hiện trên vùng animationView này.

TableView: nằm ở AnimationView và chứa các menu options.

Hãy bắt đầu bằng cách xây dựng các đối tượng view chúng ta mô tả.

# Bước 1: Tạo hệ thống Subviews

Như đã thấy, có rất nhiều setup view cần thiết. Để hỗ trợ quá trình này, hãy xem nhanh một số extensions. 
Đầu tiền, chúng ta có Theme enum đặt trong extensions của UIImage. 

```
extension UIImage {
    
    enum Theme {
        case triangle
        
        var name: String {
            switch self {
            case .triangle: return "triangle"
            }
        }
            
        var image: UIImage {
            return UIImage(named: self.name)!
        }
    }
}
```

Đoạn code tiếp theo để bổ sung các layout constraints.

```
extension UIView {
    
    func constraintsPinTo(leading: NSLayoutXAxisAnchor, trailing: NSLayoutXAxisAnchor, top: NSLayoutYAxisAnchor, bottom: NSLayoutYAxisAnchor) {
        self.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.leadingAnchor.constraint(equalTo: leading),
            self.trailingAnchor.constraint(equalTo: trailing),
            self.topAnchor.constraint(equalTo: top),
            self.bottomAnchor.constraint(equalTo: bottom)
            ])
    }
}
```


Bây giờ, chúng ta có thể tiến hành công việc. Dưới đây chúng ta sẽ tạo DropDownTextField - subclass của UIView.

```
class DropDownTextField: UIView {
       
    //public properties
    var boldColor = UIColor.black
    var lightColor = UIColor.white
    var dropDownColor = UIColor.gray
    var font = UIFont.systemFont(ofSize: 18, weight: .semibold)

    //private properties
    private var options: [String]
    private var initialHeight: CGFloat = 0
    private let rowHeight: CGFloat = 40
    
    //UI properties
    var underline = UIView()
    
    let triangleIndicator: UIImageView = {
        let image = UIImage.Theme.triangle.image
        image.withRenderingMode(.alwaysTemplate)
        let imageView = UIImageView(image: image)
        imageView.contentMode = .scaleAspectFit
        return imageView
    }()
    
    let tapView: UIView = UIView()
    
    lazy var tableView: UITableView = {
        let tableView = UITableView()
        //tableView.register(DropDownCell.self, forCellReuseIdentifier: "option")
        tableView.bounces = false
        tableView.backgroundColor = UIColor.clear
        tableView.separatorInset = UIEdgeInsets.zero
        tableView.separatorColor = lightColor
        return tableView
    }()
    
    let animationView = UIView()
    
    lazy var textField: UITextField = {
        let textField = UITextField(frame: .zero)
        textField.textColor = boldColor
        textField.autocapitalizationType = .sentences
        textField.returnKeyType = .done
        textField.keyboardType = .alphabet
        return textField
    }()
    
    init(frame: CGRect, title: String, options: [String]) {
        self.options = options
        super.init(frame: frame)
        self.textField.text = title
        calculateHeight()
        setupViews()
    }
    
    private override init(frame: CGRect) {
        options = []
        super.init(frame: frame)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc func animateMenu() {
        //
    }
}

extension DropDownTextField {
    
    private func calculateHeight() {
        self.initialHeight = self.bounds.height
        let rowCount = self.options.count + 1 //Add one so that you can include 'other'
        let newHeight = self.initialHeight + (CGFloat(rowCount) * rowHeight)
        self.frame.size = CGSize(width: self.frame.width, height: newHeight)
    }
    
    private func setupViews() {
        removeSubviews()
        addUnderline()
        addTriangleIndicator()
        addTextField()
        addTapView()
        addTableView()
        addAnimationView()
    }
    
    private func removeSubviews() {
        for view in self.subviews {
            view.removeFromSuperview()
        }
    }
    
    private func addUnderline() {
        addSubview(underline)
        underline.backgroundColor = self.boldColor
        
        underline.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            underline.topAnchor.constraint(equalTo: topAnchor, constant: initialHeight - 2),
            underline.leadingAnchor.constraint(equalTo: leadingAnchor),
            underline.trailingAnchor.constraint(equalTo: trailingAnchor),
            underline.heightAnchor.constraint(equalToConstant: 2)
            ])
    }
    
    private func addTriangleIndicator() {
        triangleIndicator.translatesAutoresizingMaskIntoConstraints = false
        triangleIndicator.tintColor = boldColor
        addSubview(triangleIndicator)
        let triSize: CGFloat = 12.0
        NSLayoutConstraint.activate([
            triangleIndicator.trailingAnchor.constraint(equalTo: trailingAnchor),
            triangleIndicator.heightAnchor.constraint(equalToConstant: triSize),
            triangleIndicator.widthAnchor.constraint(equalToConstant: triSize),
            triangleIndicator.centerYAnchor.constraint(equalTo: topAnchor, constant: initialHeight / 2)
            ])
    }
    
    private func addTextField() {
        textField.translatesAutoresizingMaskIntoConstraints = false
        self.addSubview(textField)
                NSLayoutConstraint.activate([
                    textField.leadingAnchor.constraint(equalTo: leadingAnchor),
                    textField.centerYAnchor.constraint(equalTo: topAnchor, constant: initialHeight / 2),
                    textField.trailingAnchor.constraint(equalTo: triangleIndicator.leadingAnchor, constant: -8)
                    ])
        textField.font = self.font
//        textField.delegate = self
    }
    
    private func addTapView() {
        tapView.translatesAutoresizingMaskIntoConstraints = false
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(animateMenu))
        tapView.addGestureRecognizer(tapGesture)
        addSubview(tapView)
        tapView.constraintsPinTo(leading: leadingAnchor, trailing: trailingAnchor, top: topAnchor, bottom: underline.bottomAnchor)
    }
    
    private func addTableView() {
//         tableView.delegate = self
//         tableView.dataSource = self
        tableView.translatesAutoresizingMaskIntoConstraints = false
        
        self.addSubview(tableView)
        tableView.constraintsPinTo(leading: leadingAnchor, trailing: trailingAnchor, top: underline.bottomAnchor, bottom: bottomAnchor)
//        tableView.isHidden = true
    }
    
    private func addAnimationView() {
        self.addSubview(animationView)
        animationView.frame = CGRect(x: 0.0, y: initialHeight, width: bounds.width, height: bounds.height - initialHeight)
        self.sendSubviewToBack(animationView)
        animationView.backgroundColor = dropDownColor
//        animationView.isHidden = true
    }
}
```

Hãy vào view controller, bây giờ bạn có thể khởi tạo được dropDownTextField.

```
class ViewController: UIViewController {
    
    private var dropDown: DropDownTextField!
    private var flavourOptions = ["Chocolate", "Vanilla", "Strawberry", "Banana", "Lime"]

    override func viewDidLoad() {
        super.viewDidLoad()

        self.view.layoutMargins = UIEdgeInsets(top: self.view.layoutMargins.top,
                                               left: 12.0,
                                               bottom: self.view.layoutMargins.bottom,
                                               right: 12.0)
        view.backgroundColor = UIColor.white
        addDropDown()
    }

    private func addDropDown() {
        let lm = view.layoutMargins
        let height: CGFloat = 40.0
        let dropDownFrame = CGRect(x: lm.left, y: lm.top + 60, width: view.bounds.width - (2 * lm.left), height: height)
        dropDown = DropDownTextField(frame: dropDownFrame, title: "Select Flavour", options: flavourOptions)
        //dropDown.delegate = self
        view.addSubview(dropDown)
    }
}
```

Nếu chúng ta build và chạy ứng dụng, đây là những gì chúng ta hy vọng: 

![](https://cdn-images-1.medium.com/max/800/1*vo9iN2UqyscJb3CErNX2FQ.png)

# Bước 2: Tạo và chỉ định Delegate

Mục tiêu của chúng ta là tạo ra một delegate để View Controller có thể nhận được thông tin từ dropDown. File đầu tiên bên dưới thể hiện việc tạo giao thức DropDownTextFieldDelegate, bên trong có hai methods.
Đầu tiên, menuDidAnimate cho View Controller biết mỗi khi Dropdown hoạt động. Phương thức thứ hai: optionSelected(option:)  cho View controller biết đáp án được chọn.

```
protocol DropDownTextFieldDelegate {
    func menuDidAnimate(up: Bool)
    func optionSelected(option: String)
}

class DropDownTextField {
  //add to class
  var delegate: DropDownTextFieldDelegate?

}
```

```
//MARK: Drop down textfield delegate
extension ViewController: DropDownTextFieldDelegate {
    
    func menuDidAnimate(up: Bool) {
        print("animating up: \(up)")
    }

    func optionSelected(option: String) {
        print("option selected: \(option)")
    }
}
```

# Bước 3: Thêm tuỳ chọn vào TableView

Bước tiếp theo là để các option xuất hiện trong bảng view. Chúng ta cần custom DropDownCell là subclass của UITableViewCell. 

```
class DropDownCell: UITableViewCell {
    
    var lightColor = UIColor.lightGray
    var cellFont: UIFont = UIFont.systemFont(ofSize: 18, weight: .semibold)
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
    }
    
    func configureCell(with title: String) {
        self.selectionStyle = .none
        self.textLabel?.font = cellFont
        self.textLabel?.textColor = self.lightColor
        self.backgroundColor = UIColor.clear        
        self.textLabel?.text = title
    }
}
```

```
extension DropDownTextField: UITableViewDelegate, UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return options.count + 1
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "option") as? DropDownCell ?? DropDownCell()
        cell.lightColor = self.lightColor
        cell.cellFont = font
        let title = indexPath.row < options.count ? options[indexPath.row] : "Other"
        cell.configureCell(with: title)
        return cell
    }

    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return tableView.frame.height / CGFloat(options.count + 1)
    }
}
```

Một lần nữa, chúng ta build và run ứng dụng. Hy vòng, đây là điều chúng ta thấy:

![](https://cdn-images-1.medium.com/max/800/1*3T0DUdNkfWjOio5-WdFYIw.png)