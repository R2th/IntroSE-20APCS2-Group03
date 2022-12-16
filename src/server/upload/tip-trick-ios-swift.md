**self**

## * Global Func


Global Func không thể sử dụng **Self** hoặc **self**.
```swift
func globalFunc (_ arg1: String) { 
    print(arg1) 
}
```

## * Static/Class Func
static và class truy cập thông qua class, không phải qua instance, self trong static và class là type, self trong instance chính là instance của object đó.

```swift
class Object {
    static func staticFunc() {
        print(self) // self trong static func là Type print: "Object"
    }
    
    class func classFunc() {
        print(self) // self trong class func là Type print: "Object"
    }
    
    func objectFunc() {
        print(self)// self trong object func là instance của Object
    }
}
```

**Self**

Self được sử dụng trong Protocol và trong Extension Protocol được dùng để ám chỉ loại adopt Protocol này.

```swift
extension MyProtocol {
    
    func protocolFunction()-> String {
        return "\(Self.self)" // Self.self return về Type
    }
    
}

let object = MyClass()
object.protocolFunction() // "MyClass"

extension MyProtocol {
    
    static func staticProtocolFunction() {
        print(Self.self == self) // true // static func, self là Type,Self.self return Type -> true
    }
}
```

* có thể sử dụng Self để làm kết quả trả về.
```swift
protocol MyProtocol { 
    init () 
}
extension MyProtocol { 
    
    static func create () -> Self { 
        return Self () 
    }
}
```

**Meta - Type**

```swift
let type = MyViewController.self //get Type
```

## * Bonus: Extension get Type trong các dự án mình hay sử dụng.

```swift
// MARK: - Response Type
protocol ResponseType {}

extension ResponseType {
    
    static var type: Self.Type {
        return Self.self
    }
    
    var type: Self.Type {
        return Self.self
    }
}

let vc = MyViewController()
let type = vc.type // return MyViewController.Type
let type = MyViewController.type // === MyViewController.self
```

* Get Tên Object

```swift
// MARK: - Response Identifier
protocol ResponseIdentifier {}

extension ResponseIdentifier {
    var identifier: String {
        return String(describing: type(of: self))
    }
    
    static var identifier: String {
        return String(describing: self)
    }
}
```

**Ứng dụng**
## 1. Get index của ViewController trong UINavigationController
```swift
extension UINavigationController {
    
    func index(of type: UIViewController.Type)-> Int? {
        return self.viewControllers.index(where: { vc in
            type(of: vc) == type
        })
    }
    
}
let navigationController = UINavigationController()
navigationController.index(of: MyViewController.type)
```
## 2. Response ObjectModel, Tạo Object Model kết hợp với Factory Methods
```swift
// MARK: - ResponseModel
protocol ResponseModel {
    init?(_ json: JSON?)
}

extension ResponseModel {
    
    static func responseObject(forKey: String? = nil, object: Any?) -> Self? {
        guard let object = object else {
            return nil
        }
        
        /// has key
        if let _forkey = forKey {
            let json = JSON(object)[_forkey]
            return self.init(json)
        }
        
        /// not key
        let json = JSON(object)
        return self.init(json)
    }
    
    static func responseCollectionObject(forKey: String? = nil, object: Any?) -> [Self]? {
        guard let object = object else {
            return nil
        }
        
        /// has key
        if let _forKey = forKey {
            let jsons = JSON(object)[_forKey].arrayValue
            return jsons.compactMap{self.init($0)}
        }
        
        /// not key
        let jsons = JSON(object).arrayValue
        return jsons.compactMap{self.init($0)}
    }
}

```

## 3. GetView trong file Nib
```swift
// MARK: - Response UIView
protocol ResponseUIView {}

extension ResponseUIView where Self: UIView {
    
    private static func fromNib<T: UIView>(_ type: T.Type) -> T? {
        if let view = Bundle.main.loadNibNamed(type.identifier, owner: nil, options: nil)?.first, let _view = view as? T {
            return _view
        } else {
            return nil
        }
    }
    
    static func fromNib() -> Self? {
        return fromNib(self)
    }
}

//example
let vc = MyViewController.fromNib()
```

## 4. Get ViewController trong file Storyboard

```swift
// MARK: - Response UIViewController
protocol ResponseUIViewController {}

extension ResponseUIViewController where Self: UIViewController {
    static func fromNib() -> Self {
        return self.init(nibName: String(describing: self), bundle: nil)
    }
    
    static func fromStoryboard(_ storyboardName: UIStoryboard.StoryboardName, withIdentifier: String = Self.identifier) -> Self? {
        return Self.fromStoryboard(self, storyboardName: storyboardName, withIdentifier: withIdentifier)
    }
    
    private static func fromStoryboard<T: UIViewController>(_ type: T.Type, storyboardName: UIStoryboard.StoryboardName, withIdentifier: String?) -> T? {
        let storyboard = UIStoryboard(storyboard: storyboardName, bundle: nil)
        return storyboard.instantiateViewController(type)
    }
}
```
## 5. Ứng dụng trong UITableView và UICollectionView

```swift
//====================== *** UITableView *** ======================
extension UITableViewCell {
    
    class var nib: UINib {
        return UINib(nibName: identifier, bundle: nil)
    }
    
    class var identifier: String {
        return String(describing: self)
    }
    
    class func dequeueCell(_ tableView: UITableView, indexPath: IndexPath) -> Self? {
        return tableView.dequeueCell(self, forIndexPath: indexPath)
    }
    
    class func dequeueCell(_ tableView: UITableView) -> Self? {
        return tableView.dequeueCell(self)
    }
}

extension UITableViewHeaderFooterView {
    class var nib: UINib {
        return UINib(nibName: identifier, bundle: nil)
    }
    
    class func dequeueHeaderFooter(_ tableView: UITableView) -> Self? {
        return tableView.dequeueHeaderFooter(self)
    }
}

extension UITableView {
    
    func registerCellByNib<T: UITableViewCell>(_ type: T.Type) {
        register(type.nib, forCellReuseIdentifier: type.identifier)
    }
    
    func registerCell<T: UITableViewCell>(_ type: T.Type) {
        register(type, forCellReuseIdentifier: type.identifier)
    }
    
    func registerHeaderFooter<T: UITableViewHeaderFooterView>(_ type: T.Type) {
        register(type.nib, forHeaderFooterViewReuseIdentifier: type.identifier)
    }
    
    func dequeueCell<T: UITableViewCell>(_ type: T.Type, forIndexPath indexPath: IndexPath) -> T? {
        return dequeueReusableCell(withIdentifier: type.identifier, for: indexPath) as? T
    }
    
    func dequeueCell<T: UITableViewCell>(_ type: T.Type) -> T? {
        return dequeueReusableCell(withIdentifier: type.identifier) as? T
    }
    
    func dequeueHeaderFooter<T: UITableViewHeaderFooterView>(_ type: T.Type) -> T? {
        return dequeueReusableHeaderFooterView(withIdentifier: type.identifier) as? T
    }
}

```

```swift
//====================== *** UICollectionView *** ======================
extension UICollectionViewCell {
    class var nib: UINib {
        return UINib(nibName: identifier, bundle: nil)
    }
    
    class var identifier: String {
        return String(describing: self)
    }
    
    class func dequeueCell(_ collectionView: UICollectionView, indexPath: IndexPath) -> Self? {
        return collectionView.dequeueCell(self, forIndexPath: indexPath)
    }
    
}

extension UICollectionView {
    func registerCellByNib<T: UICollectionViewCell>(_ type: T.Type) {
        register(type.nib, forCellWithReuseIdentifier: type.identifier)
    }
    
    func registerCell<T: UICollectionViewCell>(_ type: T.Type) {
        register(type, forCellWithReuseIdentifier: type.identifier)
    }
    
    func dequeueCell<T: UICollectionViewCell>(_ type: T.Type, forIndexPath indexPath: IndexPath) -> T? {
        return dequeueReusableCell(withReuseIdentifier: type.identifier, for: indexPath) as? T
    }
}
```

## Load ViewController from Storyboard

```swift
//Auto as? LoginViewController
if let viewController = LoginViewController.fromStoryboard(.main) {

}
```

## `Load ViewController from Nib file`

```swift
let viewController = LoginViewController.fromNib()
```

## `Loading UIVIew from Nib`

```swift
// Auto as? Baseview
if let view = BaseView.fromNib() {

}
```
## `Reigister Cell By Nib file`
```swift
tableView.registerCellByNib(LoginTableViewCell.type)
```

## `Register Cell By Code`
```swift
tableView.registerCell(LoginTableViewCell.type)
```
## `DequeueCell`
```swift
// Auto as? LoginTableViewCell
if let cell = LoginTableViewCell.dequeueCell(tableView, indexPath: indexPath) {

}
// Auto as? LoginTableViewCell
if let cell = tableViewCell.dequeueCell(LoginTableViewCell.typeSelf, indexPath: indexPath) {

}
```