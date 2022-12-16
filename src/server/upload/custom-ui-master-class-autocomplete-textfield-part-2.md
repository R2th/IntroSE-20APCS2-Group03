![](https://media.giphy.com/media/1s2L1nTTH5oFIovMGv/giphy.gif)

Chúng ta sẽ đén với phần 2 của Autocomplete TextField. Trong phần trước chúng ta đã xây dựng một custom subclass của UITextfield. Textfield có ba tính năng chính: Cung cấp datasource của chính nó tại thời điểm người dùng tương tác, lọc datasource để cung cấp kết quả tốt nhất dựa trên input của user, sau khi bấm enter nó sẽ chuyển giá trị của String đã chọn lại cho view controller.

Và chúng ta hay thử làm việc với bộ dữ liệu phức tạp hơn. Sử dụng một adapter pattern, chúng ta sẽ xây dựng một thành phần mới gọi là **AutocompletePerson**, cung cấp giao diện làm việc với **Person** object. Như các bạn thấy ở trên, component sẽ tự đông điền tên của một người trong datasource và cập nhật image view. Chúng ta hãy bắt đầu

# Bước 1: Xây dựng Datasource Model

Bạn sẽ triển khai Persion model mà chúng ta sẽ làm việc. Ở đây chúng ta có một class với 3 properties: firstName, lastName, và profileImage. Vì AutocompleteTextField sử dụng fullname nên bạn có thể tạo ra một thuộc tính nội suy từ firstName và lastName

```
class Person {
    
    var firstName: String
    var lastName: String
    var profileImage: UIImage?
    
    var fullName: String {
        return "\(firstName) \(lastName)"
    }
    
    init(firstName: String, lastName: String, profileImage: UIImage?) {
        self.firstName = firstName
        self.lastName = lastName
        self.profileImage = profileImage
    }
    
}

//MARK: Custom String Convertible
extension Person : CustomStringConvertible {
    
    var description: String {
        return "Person called \(fullName)"
    }
    
}
```

Trên thực tế, chúng ta lấy datasource bằng cách truy vấn database trong runtime, tuy nhiên để cho mục đích demo, chúng ta sẽ cung cấp một dữ liệu tĩnh:

```
//MARK: Datasource
extension Person {
    
    enum PersonData {
        
        case jon
        case daenerys
        case gregor
        case cersei
        case tyrion
        case joffrey
        case sandor
        case sansa
        
        var firstName: String {
            switch self {
            case .jon: return "Jon"
            case .daenerys: return "Daenerys"
            case .gregor: return "Gregor"
            case .cersei: return "Cersei"
            case .tyrion: return "Tyrion"
            case .joffrey: return "Joffrey"
            case .sandor: return "Sandor"
            case .sansa: return "Sansa"
            }
        }
            
        var lastName: String {
            switch self {
            case .jon: return "Snow"
            case .daenerys: return "Targaryen"
            case .gregor: return "Clegane"
            case .cersei: return "Lannister"
            case .tyrion: return "Lannister"
            case .joffrey: return "Baratheon"
            case .sandor: return "Clegane"
            case .sansa: return "Stark"
            }
        }
        
        var imageName: String {
            return "\(self.firstName)\(self.lastName)"
        }
        
        var person: Person {
            return Person(firstName: self.firstName, lastName: self.lastName, profileImage: UIImage(named: self.imageName))
        }
        
        static func allPeople() -> [Person] {
            return [PersonData.jon.person,
                    PersonData.daenerys.person,
                    PersonData.gregor.person,
                    PersonData.cersei.person,
                    PersonData.tyrion.person,
                    PersonData.joffrey.person,
                    PersonData.sandor.person,
                    PersonData.sansa.person]
        }
    }
}
```

# Bước 2: Layout AutoCompletePerson

Chúng ta bắt đầu tạo một component là subclass của UIView và sau đó define 3 subviews. Đầu tiên là profileImage là một imageView với ảnh mặc định. Tiếp theo chúng ta khởi tạo autoCompleteTextField đã giới thiệu ở phần trước. Lưu ý bạn để nó là một lazy var để gắn autocompleteDelegate  với self. Cuối cùng, bạn tạo ra một underlineView chỉ để cho đẹp nhể :))

```
class AutoCompletePerson: UIView {
    
    let profileImage: UIImageView = {
        let imageView = UIImageView(image: UIImage(named: "DefaultProfileImage"))
        imageView.contentMode = .scaleAspectFill
        imageView.layer.masksToBounds = true
        return imageView
    }()
    
    lazy var autoCompleteTextfield: AutoCompleteTextField = {
        let autoComplete = AutoCompleteTextField()
        autoComplete.font = UIFont.systemFont(ofSize: 18, weight: .medium)
        autoComplete.placeholder = "Person's name"
        autoComplete.tintColor = UIColor.gray
        autoComplete.boldTextColor = UIColor.black
        autoComplete.lightTextColor = UIColor.gray
        //autoComplete.autocompleteDelegate = self
        return autoComplete
    }()
    
    let underlineView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.black
        return view
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        setupViews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}

extension AutoCompletePerson {
    
    private func setupViews() {
        
        addSubview(profileImage)
        profileImage.frame = CGRect(x: 0, y: 0, width: self.bounds.height, height: self.bounds.height)
        profileImage.layer.cornerRadius = profileImage.frame.width / 2
        
        addSubview(autoCompleteTextfield)
        autoCompleteTextfield.frame = CGRect(x: profileImage.frame.width + Layout.pad.rawValue, y: self.bounds.height / 2 - 11, width: self.bounds.width - profileImage.frame.width - Layout.pad.rawValue, height: 22)
        
        addSubview(underlineView)
        underlineView.frame = CGRect(x: autoCompleteTextfield.frame.origin.x, y: autoCompleteTextfield.frame.maxY + 4, width: autoCompleteTextfield.frame.width, height: 2)
    }

}
```

```
class AutoCompletePersonViewController: UIViewController {
    
    var autoCompletePerson: AutoCompletePerson?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.view.backgroundColor = UIColor.white
    }
    
    override func viewWillLayoutSubviews() {
        layoutAutocompletePerson()
    }
    
}

//MARK: Layout methods
extension AutoCompletePersonViewController {
    
    private func layoutAutocompletePerson() {
        
        if let acp = autoCompletePerson {
            acp.removeFromSuperview()
        }
        
        let height: CGFloat = 160.0
        let acpFrame = CGRect(x: Layout.pad.rawValue,
                              y: (self.view.frame.maxY / 4),
                              width: self.view.bounds.width - (2 * Layout.pad.rawValue),
                              height: height)
        
        autoCompletePerson = AutoCompletePerson(frame: acpFrame)
        view.addSubview(autoCompletePerson!)
    }
    
}
```

Sau khi hoàn tất layout, bạn có thể chạy chương trình và hy vọng nó sẽ giống với ảnh ở đầu bài viết ;)

# Bước 3: Setup AutocompletePerson Datasources

Để đơn giản, tôi muốn  UI component này chỉ làm việc với kiểu Person. Nói cách khác, tôi muốn tạo một datasource là một mảng Person. Các bạn cũng cần nhớ rang, AutoCompleteTextField chỉ hoạt động với kiểu String. Điều này đòi hỏi việc thiết lập bên trong class của chúng ta, cung cấp giao diện kiểu Person, nhưng AutoCompleteTextField sẽ nhận datasource kiểu String.

```
class AutoCompletePerson: UIView {
    
    //Add two datasource properties.
    private var personDatasource: [String: Person]? {
        didSet {
            setAutoCompleteTextFieldDatasource()
        }
    }

    private var autoCompleteDatasource: [String]?
    
}

//MARK: prepare data for autocomplete textfield
extension AutoCompletePerson {

    func setPersonDatasource(_ input: [Person]) {
        var data = [String: Person]()

        for person in input {
            data["\(person.fullName)"] = person
        }
        self.personDatasource = data
    }

    private func setAutoCompleteTextFieldDatasource() {

        guard let personData = self.personDatasource else {
            self.autoCompleteDatasource = nil
            return
        }

        self.autoCompleteDatasource = Array(personData.keys)
    }
}
```


# Bước 4: Cài đặt AutoCompleteTextFieldDelegate

Bây giờ chúng ta đã chuẩn bị xong datasource. Bạn có thể hiện 3 phương thức của AutoCompleteTextFieldDelegate. Khi người dùng tương tác, provideDatasource sẽ được gọi. 

```
class AutoCompletePerson: UIView {

  //Add property for selected person    
   private var selectedPerson: Person? 
    
}

//MARK: AutoCompleteTextFieldDelegate
extension AutoCompletePerson: AutoCompleteTextFieldDelegate {

    func provideDatasource() {
        autoCompleteTextfield.datasource = autoCompleteDatasource
    }

    func returned(with selection: String) {
        guard let data = self.personDatasource else { return }

        if let person = data[selection] {
            self.profileImage.image = person.profileImage
            self.selectedPerson = person
        }
    }

    func textFieldCleared() {
        self.profileImage.image = UIImage(named: "DefaultProfileImage")
        self.selectedPerson = nil
    }

}
```

# Bước 5: Tạo AutoCompletePersonDelegate

Và đến đây, textfield sẽ tự động hoàn tất và chọn một Person từ datasource. Vì vậy chúng ta cần tạo một delegate để chuyển đối tượng Person đến view controller. 

```
protocol AutoCompletePersonDelegate {
   func selectedPerson(_ person: Person?)
}

class AutoCompletePerson: UIView {
    
    private var selectedPerson: Person? {
        didSet {
           self.delegate?.selectedPerson(selectedPerson)
        }
    }
    
   var delegate: AutoCompletePersonDelegate?
    
}
```

```
class AutoCompletePersonViewController: UIViewController {
    
    var autoCompletePerson: AutoCompletePerson?
    
    var selection: Person? {
        didSet {
            print("SELECTION IS: \(String(describing: selection))")
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.view.backgroundColor = UIColor.white
    }
    
    override func viewWillLayoutSubviews() {
        layoutAutocompletePerson()
    }
    
}

//MARK: Layout methods
extension AutoCompletePersonViewController {
    
    private func layoutAutocompletePerson() {
        
        if let acp = autoCompletePerson {
            acp.removeFromSuperview()
        }
        
        let height: CGFloat = 160.0
        let acpFrame = CGRect(x: Layout.pad.rawValue,
                              y: (self.view.frame.maxY / 4),
                              width: self.view.bounds.width - (2 * Layout.pad.rawValue),
                              height: height)
        
        autoCompletePerson = AutoCompletePerson(frame: acpFrame)
        view.addSubview(autoCompletePerson!)
        autoCompletePerson?.delegate = self
        autoCompletePerson?.setPersonDatasource(Person.PersonData.allPeople())
    }
    
}

//MARK: AutoCompletePersonDelegate methods
extension AutoCompletePersonViewController : AutoCompletePersonDelegate {
    
    func selectedPerson(_ person: Person?) {
        self.selection = person
    }
}
```

Và bây giờ chúng ta đã có thể chạy chương trình và xem được tất cả tính năng của custom UI component.

# Tổng kết

Chúng ta đã sử dụng AutocompleteTextField và xây dựng một UI component để cung cấp giao diện cho kiểu dữ liệu phức tạp hơn thể hiện qua Person model. Với cách tiếp cận này bạn có thể tuỳ chính giao diện của mình với bất kỳ liệu data một cách phù hợp nhất.

Thank you for reading!
[Refer](https://medium.com/swift2go/custom-ui-master-class-autocomplete-textfield-part-2-ac656f9d1054)