Để phát triển một ứng dụng thu hút được nhiều người sử dụng và phản hồi tốt thì ngoài nội dung hay thiết kế đẹp thì trải nghiệm người dùng cũng là một yếu tố qua trọng. Để cải thiện được trải nghiệm người dùng thì cần rất nhiều việc phải làm đôi khi nó chỉ là những issue nhỏ nhưng mang lại trải nghiệm rất tốt. Trong bài này mình sẽ tạo một Autocomplete TextField nó thường được dùng trong những ô text search trong app của bạn.

![](https://images.viblo.asia/6b6cd0ef-3a40-4607-809f-846940b8a778.gif)

## Autocomplete TextField: Use Case
Trong trường hợp bạn phải nhập thông tin để tìm kiếm một sản phẩm nó có nhiều trường cần thiết để filter. Trong cở sở dữ liệu có rất nhiều sản phẩm  được thực hiện nhiều lần bởi nhiều user khác nhau. Trong TH này sử dụng Autocomplete TextField sẽ giúp bạn rút ngắn được số lượng đối tượng cần tìm kiếm nếu nó là đủ thông tin tối thiểu nó sẽ suggest cho bạn kết quả chính xác và đầy đủ.

Trong bài viết này mình sẽ tạo một textfield nhập tên người dung tìm kiếm kết qủa và trả về đối tượng đã chọn.

## Step 1: Initial Setup
Chúng ta sẽ tạo một subclassing của UITextField.  Bạn cần override một số function đồng thời Implement một function trong delegate của UITextField ở đây.

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

## Step 2: Get Datasource
Dữ liệu sẽ được update từng ngày và việc tìm kiếm được thực hiện tại thời điểm data được cập nhật mới nhất. Đầu tiên chúng ta phải tạo một protocol để lấy dữ liệu cho textfield của bạn. Khai báo method provideDatasource(). 

```
protocol AutoCompleteTextFieldDatasource {
    func provideDatasource()
}
```
Tiếp theo khai báo thêm một số biến trong AutoCompleteTextField chúng ta vừa tạo trước đó.
```
    var autocompleteDelegate: AutoCompleteTextFieldDatasource?
    private var currInput: String = ""
    private var isReturned: Bool = false
 
```
Implement UITextFieldDelegate. Tại textFieldShouldBeginEditing thực hiện update datasource để đảm bảo data là mới nhất tại thời điểm user thao tác. Đồng thời reset lại một số thuộc tính.
```

extension AutoCompleteTextField: UITextFieldDelegate {
    
    func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool {
        self.autocompleteDelegate?.provideDatasource()
        self.currInput = ""
        self.isReturned = false
        return true
    }
}
```
Tại ViewController chứa textfeild thực hiện một số  bước để khởi tạo textfield và set datasource cho textfield.
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

```
Implement datasource update datasource cho AutoCompleteTFViewController
//MARK: AutoCompleteTextFieldDelegate

```
extension AutoCompleteTFViewController: AutoCompleteTextFieldDatasource {
   func provideDatasource() {
        let datasource = ["Jon Snow", "Daenerys Targaryen", "Gregor Clegane", "Cersei Lannister", "Tyrion Lannister", "Joffrey Baratheon", "Sandor Clegane", "Sansa Stark"]
        autoCompleteTextField.datasource = datasource
    }
}
```


## Step 3: Implement Filtering Logic
Thêm một protocol AutoCompleteTextFieldDelegate để thực hiện clear textfield
```
protocol AutoCompleteTextFieldDelegate {
    func textFieldCleared()
}
```
Thực hiện filtering logic như sau.
```
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

## Step 4: Pass and Clear Selection
Thêm method  func returned(with selection: String) vào  AutoCompleteTextFieldDelegate

```
protocol AutoCompleteTextFieldDelegate {
    func provideDatasource()
    func returned(with selection: String)
    func textFieldCleared()
}
```

Implement textFieldShouldReturn &  textFieldDidEndEditing
```
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
Tại ViewController chứa textfield thực hiện logic cập nhật thông tin khi user thao tac. Nếu user nhập chính xác nó sẽ callback lại trong function returned nó được set lại trong selection và print ra tên của  object bạn vừa tìm.

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
    func returned(with selection: String) {
        self.selection = selection
    }
    
    func textFieldCleared() {
        self.selection = nil
    }
```

## Wrap Up
Trong bài này mình mới chỉ tạo được Autocomplete TextField tuy nhiên còn rất nhiều thứ phải làm để cải thiện trải nghiệm người dùng. Mong rằng né sẽ giúp được các bạn (seeyou)