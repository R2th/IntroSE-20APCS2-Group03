![](https://media.giphy.com/media/1s2L1nTTH5oFIovMGv/giphy.gif)

# Autocomplete TextField: Use Case


Một trong những control phổ biến nhất để thu thập dữ liệu người dùng từ việc nhập liệu là textfield. User có thể tương tác để nhập vào một đoạn dữ liệu mong muốn. Tuy nhiên việc gõ đòi hỏi rất nhiều từ người dùng về mức độ tập trung và chuyển động chính xác. Chung ta có thể làm một điều độc đáo và tiện lơi hơn. Đặc biệt, trường hợp ứng dụng của bạn lưu trữ dữ liệu người dùng trên một mạng lớn, rất có thể ai đó, ở đâu đó đã nhập thông tin mà người dùng hiện tại của bạn sắp sửa nhập. Trong trường hợp này, autocomplete textfields  thực sự có ý nghĩa.

Qua hai bài viết, chúng ta sẽ triển khai một autocomplete (như hình trên) sẽ nhận đầu vào của người dùng cho một tên người, tìm kiếm các kết quả khớp và trả về đối tượng Person (Persion object). Trong bài viết đầu tiên này, chúng ta sẽ tạo custom textfield và làm việc với nguồn dữ liệu của String. Let's start

## Bước 1: Khởi tạo

Chúng ta sẽ thêm autocomplete logic vào thành phần của UITextField, vì vậy chúng ta bắt đầu bằng cách tạo một custom class AutoCompleteTextField, subclassing UITextField (line 1).  Tiếp theo chúng ta tạo một datasource property để thu thập các giá trị người dùng nhập vào. Trong gif trên, bạn sẽ nhận thấy có những màu khác biệt với entered text và suggestion text. Vì vậy, hai properties tiếp theo là màu với những giá trị mặc định. 

```
class AutoCompleteTextField: UITextField {
    
    var datasource: [String]?
    
    var lightTextColor: UIColor = UIColor.gray {
        didSet {
            self.textColor = lightTextColor
        }
    }
    
    var boldTextColor: UIColor = UIColor.black
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        self.textColor = lightTextColor
        self.delegate = self
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}

extension AutoCompleteTextField: UITextFieldDelegate {
    //Autocomplete logic will go here.
}
```

## Bước 2: Get Datasource

Trong demo này, bạn có thể tưởng tượng các đối tượng Persion sẽ được tạo trong khi runtime, và nếu chúng ta muốn đưa chúng vào dataSource của texfield thì cần phải yêu cầu một datasource từ view controller, cách tốt nhất để thực hiện là từ delegate.

Chúng ta tạo **AutoCompleteTextFieldDelegate** với phương thức **provideDatasource()**. Sau đó tạo delegate property. Trong trường hợp này, tên của delegate liên quan tới  UITextField delegate mà chúng ta đã sử dụng trước đó. Do đó nên sử dụng cùng tên **autocompleteDelegate**. Tôi muốn delegate cung  cấp datasource ngay khi người dùng chạm vào textfield bằng cách sử dụng phương thức textFieldShouldBeginEditing. Bởi vì chúng ta không chỉ muốn hiển thị nội dung người dùng nhập vào mà cả suggestion text nữa. Chúng ta cần lưu trữ data người dùng nhập vào trong một property riêng biệt. 

```
protocol AutoCompleteTextFieldDelegate {
    func provideDatasource()
}

class AutoCompleteTextField: UITextField {
    
    var autocompleteDelegate: AutoCompleteTextFieldDelegate?
  
    private var currInput: String = ""
    private var isReturned: Bool = false
    
}

extension AutoCompleteTextField: UITextFieldDelegate {
    
    func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool {
        self.autocompleteDelegate?.provideDatasource()
        self.currInput = ""
        self.isReturned = false
        return true
    }
}
```

```
class AutoCompleteTFViewController: UIViewController {
    
    var autoCompleteTextField: AutoCompleteTextField = {
        let textfield = AutoCompleteTextField()
        textfield.font = UIFont.systemFont(ofSize: 18, weight: .medium)
        textfield.placeholder = "Person's name"
        textfield.tintColor = UIColor.gray
        textfield.boldTextColor = UIColor.black
        textfield.lightTextColor = UIColor.gray
        return textfield
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
 
        self.view.backgroundColor = UIColor.white
    }
    
    override func viewWillLayoutSubviews() {
        
        layoutAutocompleteTextField()
    }

}

//MARK: Layout methods
extension AutoCompleteTFViewController {
    
    private func layoutAutocompleteTextField() {
        autoCompleteTextField.removeFromSuperview()
        
        let height: CGFloat = 22.0
        let pad: CGFloat = 16.0
        autoCompleteTextField.frame = CGRect(x: pad,
                                             y: view.bounds.maxY / 2 - (height / 2),
                                             width: view.bounds.width - (pad * 2),
                                             height: height)
        view.addSubview(autoCompleteTextField)
        autoCompleteTextField.autocompleteDelegate = self
    }
}

//MARK: AutoCompleteTextFieldDelegate
extension AutoCompleteTFViewController: AutoCompleteTextFieldDelegate {

    func provideDatasource() {
        let datasource = ["Jon Snow", "Daenerys Targaryen", "Gregor Clegane", "Cersei Lannister", "Tyrion Lannister", "Joffrey Baratheon", "Sandor Clegane", "Sansa Stark"]
        autoCompleteTextField.datasource = datasource
    }

}
```

Trong view controller, giờ đây ta có thể khởi tạo autoCompleteTextField. Cuối cùng, chúng ta áp dụng giao thức **AutoCompleteTextFieldDelegate** và trong phương thức **provideDatasource**, chúng ta tạo một số dữ liệu giả để gắn cho **dataSource**. Khi bạn build và chạy ứng dụng, bạn có thể đặt breakpoint trong provideDatasource để kiểm tra dữ liệu cung cấp đã chính xác chưa.

## Step 3: Cài đặt filtering

Nếu bạn muốn **AutoCompleteTextField** cập nhật suggested completion với từng ký tự được nhập vào, nơi tốt nhất để thực hiện việc đó là **textField(_ textField:, shouldChangeCharactersIn: replacementString:). **

**updateText(_ string:, in textField:)** chúng ta đặt màu chữ cho **lightTextColor** vì chúng ta sẽ sử dụng **NSMutableAttributionStrings**  với nhiều màu chữ trong các phương thức sau. Tiếp theo chúng ta nối ký tự mới nhập vào currInput  và cập nhật text property của textfield.


```
protocol AutoCompleteTextFieldDelegate {
    func provideDatasource()
    func textFieldCleared()
}

extension AutoCompleteTextField: UITextFieldDelegate {
 
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        
        updateText(string, in: textField)
        
        testBackspace(string, in: textField)

        findDatasourceMatch(for: textField)

        updateCursorPosition(in: textField)

        return false
    }
    
    private func updateText(_ string: String, in textField: UITextField) {
        self.currInput += string
        textField.text = self.currInput
    }
    
    private func testBackspace(_ string: String, in textField: UITextField) {
        let char = string.cString(using: String.Encoding.utf8)
        let isBackSpace: Int = Int(strcmp(char, "\u{8}"))
        if isBackSpace == -8 {
            print("Backspace was pressed")
            self.currInput = String(self.currInput.dropLast())
            if self.currInput == "" {
                textField.text = ""
                autocompleteDelegate?.textFieldCleared()
            }
        }
    }
    
    private func findDatasourceMatch(for textField: UITextField) {
        guard let datasource = self.datasource else { return }
        
        let allOptions = datasource.filter({ $0.hasPrefix(self.currInput) })
        let exactMatch = allOptions.filter() { $0 == self.currInput }
        let fullName = exactMatch.count > 0 ? exactMatch.first! : allOptions.first ?? self.currInput
        if let range = fullName.range(of: self.currInput) {
            let nsRange = fullName.nsRange(from: range)
            let attribute = NSMutableAttributedString.init(string: fullName as String)
            attribute.addAttribute(NSAttributedString.Key.foregroundColor, value: self.boldTextColor, range: nsRange)
            textField.attributedText = attribute
        }
    }
    
    private func updateCursorPosition(in textField: UITextField) {
        if let newPosition = textField.position(from: textField.beginningOfDocument, offset: self.currInput.count) {
            textField.selectedTextRange = textField.textRange(from: newPosition, to: newPosition)
        }
    }
}

extension String {
    func nsRange(from range: Range<Index>) -> NSRange {
        return NSRange(range, in: self)
    }
}
```

Bây giờ nếu bạn chạy ứng dụng, bạn có thể nhập vào texfield và nhìn thấy autocomplete. Văn bản trong textfield sẽ có màu đậm và nhạt để phân biệt nội dung nhập vào và autocomplete.

## Bước 4: Pass and Clear Selection

```
protocol AutoCompleteTextFieldDelegate {
    func provideDatasource()
    func returned(with selection: String)
    func textFieldCleared()
}

extension AutoCompleteTextField: UITextFieldDelegate {
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        self.autocompleteDelegate?.returned(with: textField.text!)
        self.isReturned = true
        self.endEditing(true)
        return true
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        resignFirstResponder()
        if !isReturned {
            textField.text = ""
            self.currInput = ""
        } else {
            textField.textColor = boldTextColor
        }
    }
   
}
```

```
class AutoCompleteTFViewController: UIViewController {
    
    var selection: String? {
        didSet {
            print("SELECTION IS: \(String(describing: selection))")
        }
    }

}

//MARK: AutoCompleteTextFieldDelegate
extension AutoCompleteTFViewController: AutoCompleteTextFieldDelegate {

    func provideDatasource() {
        let datasource = ["Jon Snow", "Daenerys Targaryen", "Gregor Clegane", "Cersei Lannister", "Tyrion Lannister", "Joffrey Baratheon", "Sandor Clegane", "Sansa Stark"]
        autoCompleteTextField.datasource = datasource
    }

    func returned(with selection: String) {
        self.selection = selection
    }

    func textFieldCleared() {
        self.selection = nil
    }

}
```


# Tổng kết

Đây là phần đầu tiên của tạo custom UI master class. Chúng ta đã thấy nó hoạt động rất tốt phần autocompleting với dataSource của String. Để thực hiện điều này chúng ta đã làm việc rất nhiều với UITextFieldDelegate và các thao tác chuỗi (String).

[Refer](https://medium.com/swift2go/custom-ui-master-class-autocomplete-textfield-part-1-218024b693f9)