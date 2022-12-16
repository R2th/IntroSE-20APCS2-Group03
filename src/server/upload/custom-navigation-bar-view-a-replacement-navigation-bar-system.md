Trong hai bài trước mình đã hướng dẫn xây dựng một [BaseTableContorller](https://viblo.asia/p/uitableview-design-pattern-E375zRL15GW) và BaseCollectionController. Trong bài này mình sẽ làm một ví dụ nhỏ sử dụng BaseTableController đồng thời hướng dẫn các bạn customize Navigationbar thay thế cho Navigationbar của hệ thống.

## Tại sao chúng ta phải thay thế khi nó đã hỗ trợ khá tốt: 
- Thứ nhất navigationbar hệ thống khá phức tap khi muốn customize theo ý muốn.
- Khi design nó đa phần sử dụng code thay vì sử dụng file xib. Dẫn đến thiếu trực quan khó maintain hơn.
- Animation không được như ý muốn.
- Không thích dùng những cái có sẵn =)).

## Tạo project
Trong bài này mình sẽ tạo một project nhỏ như sau:
![](https://images.viblo.asia/91645d6e-da83-48ef-bd71-9423b93b9fb9.gif)

Để ý thấy trong project mình có sử dụng ba kiểu navigationbar.
Ở màn hình hôm là một kiểu màn hình search một kiểu và màn hình libary một kiểu.
## Tạo NavigationBarView
Thêm mợi một Cacoa Touch Class kế thừa UIView (BaseUIView nếu có) có đính kèm cả file xib.

Implement code:
```
 class func instanceFromNib(_ frame: CGRect) -> NavigationBarView {
        let myNavigationBar = UINib(nibName: "NavigationBarView", bundle: nil).instantiate(withOwner: nil, options: nil)[0] as! NavigationBarView
        myNavigationBar.frame = frame
        return myNavigationBar
    }
    
    class func instanceFromSearchNib(_ frame: CGRect) -> NavigationBarView {
        let myNavigationBar = UINib(nibName: "SearchNavigationBarView", bundle: nil).instantiate(withOwner: nil, options: nil)[0] as! NavigationBarView
        myNavigationBar.frame = frame
        return myNavigationBar
    }

    class func instanceFromLibraryBooksNib(_ frame: CGRect) -> NavigationBarView {
        let myNavigationBar = UINib(nibName: "LibraryNavigationBarView", bundle: nil).instantiate(withOwner: nil, options: nil)[0] as! NavigationBarView
        myNavigationBar.frame = frame
        return myNavigationBar
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        self.txtSearch?.delegate = self
    }
    
    func updateTitle(_ title:String?) {
        if let _title = title {
            lbTitle?.text = _title
        }
    }
    
    func hiddenOrtherButton(_ hidden:Bool) {
        self.otherButton?.isHidden = hidden
    }
    
    func setupRightButton(_ img:String, hidden:Bool) {
        self.rightButton?.isHidden = hidden
        self.rightButton?.setImage(UIImage(named: img), for: UIControlState())
    }
    
    func showRightButton() {
        self.rightButton?.isHidden = false
    }

    var navigationBarType: NavigationType = .standard {
        didSet{
            switch navigationBarType {
            case .standard:
                lbTitle?.isHidden = false
                searchBarView?.isHidden = true
                break
            case .naviSearchBar:
                lbTitle?.isHidden = true
                searchBarView?.isHidden = false
                break
            case .naviSearchButton:
                lbTitle?.isHidden = false
                searchBarView?.isHidden = true
                break
            case .libraryBooks:
                lbTitle?.isHidden = false
                
            default:
                lbTitle?.isHidden = true
                searchBarView?.isHidden = true
                break
            }
        }
    }
    
    @IBAction func clickLeftButton(_ sender: AnyObject) {}
    
    @IBAction func otherButtonClick(_ sender: AnyObject) {}
    
    @IBAction func rightButtonClick(_ sender: AnyObject) {}
    
    
//MARK: - Handle with search Navigatiobar
extension NavigationBarView {
    @IBAction func clickSearch(_ sender: AnyObject) {
        switch navigationBarType {
        case .naviSearchButton:
            break
        default:
        }
        self.endEditing(false)
    }
}

//MARK: - Handle with search Library
extension NavigationBarView {
    @IBAction func clickDelete(_ sender: AnyObject) {}
    
    @IBAction func clickDeleteAll(_ sender: AnyObject) {}
}

//MARK: - UITextField Delegate
extension NavigationBarView: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        if delegate?.navigationBarView(_:searchWithText:) != nil {
            if (txtSearch?.text?.count)! > 0 {
                delegate?.navigationBarView!(self, searchWithText: txtSearch?.text)
            }
        }
        return true
    }
}
    
```


Để ý mình tạo ra 3 `instanceFromNib` để cho 3 style của mình điều đó có nghĩa là mình đã sẽ tạo ra 3 file xib cho 3 style khác nhau. TH bạn muốn thêm style nào thì thêm file xib update design và set class cho nó là "NavigationBarView".

Ở trên mình có Implement một số function cho phép bạn update NavigationBarView từ bên ngoài như: updateTitle, hiddenOrtherButton, navigationBarType ... tuỳ vào nhu cầu của từng project mà bạn có thể public một số phương thức update navigation ra bên ngoài

## Tạo protocol cho NavigationBarView:
Trong project này navigation bar của mình sẽ có một số action cơ bản sau:
+ Click Menu
+ Click search
+ Click Delete
Tuỳ vào từng case mà nó sẽ có thể là go to màn hình search hay thực hiện request search. Cũng như tuỳ vào màn hình mà button menu có thế là button back và action của nó là pop ViewController hay dismisViewController ... 
## Create Navigation Bar Protocol:
```
@objc protocol NavigationHandle {
    @objc optional func navigationBarView(_ navigationView: NavigationBarView, clickLeftMenu sender: AnyObject)
    @objc optional func navigationBarView(_ navigationView: NavigationBarView, clickRightMenu sender: AnyObject)
    @objc optional func navigationBarView(_ navigationView: NavigationBarView, clickSearch sender: AnyObject)
    @objc optional func navigationBarView(_ navigationView: NavigationBarView, searchWithText keyword: String?)
    @objc optional func navigationBarView(_ navigationView: NavigationBarView, clickDeleteAll sender: AnyObject)
}
```

Rồi bây giờ chúng ta sẽ xử lý các action khi **Touch Up Inside**.
Click button Menu:
```
@IBAction func clickLeftButton(_ sender: AnyObject) {
        if (delegate?.navigationBarView(_:clickLeftMenu:)) != nil {
            delegate?.navigationBarView?(self, clickLeftMenu: sender)
        }
    }
```
Click Button Search:
```
extension NavigationBarView {
    @IBAction func clickSearch(_ sender: AnyObject) {
        switch navigationBarType {
        case .naviSearchButton:
            if delegate?.navigationBarView(_:clickSearch:) != nil {
                delegate?.navigationBarView!(self, clickSearch: sender)
            }
            break
        default:
            if delegate?.navigationBarView(_:searchWithText:) != nil {
                if (txtSearch?.text?.count)! > 0 {
                    delegate?.navigationBarView!(self, searchWithText: txtSearch.text)
                }
            }
        }
        self.endEditing(false)
    }
}
```

Click Button Delete:
```
extension NavigationBarView {
    @IBAction func clickDelete(_ sender: AnyObject) {
        let button = sender as! UIButton
        button.isSelected = !button.isSelected
        if delegate?.navigationBarView(_:clickDelete:) != nil {
            delegate?.navigationBarView!(self, clickDelete: sender)
        }
    }
    
    @IBAction func clickDeleteAll(_ sender: AnyObject) {
        if delegate?.navigationBarView(_:clickDeleteAll:) != nil {
            delegate?.navigationBarView!(self, clickDeleteAll: sender)
        }
    }
}
```

Ngoài ra còn phải Implement `UITextFieldDelegate` nhưng trong bài này mình sẽ không nói đến.

Xong phần xử lý action trên NavigationBarView.
## Implement NavigationHandle on BaseViewController
Mỗi ViewController đều sẽ có một NavigationBar. Mình sẽ viết một số phương thức cơ bản ở đây và tuỳ vào từng màn hình mà bạn có thể gọi nó.

```
     func initNaviBarSearchButton(onView owner:UIViewController?, withTitle title:String?) {
        if myNavigationBar == nil {
            myNavigationBar = NavigationBarView.instanceFromSearchNib(CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: MyAppLication.navigationBarHeight))
            self.view.addSubview(myNavigationBar!)
            myNavigationBar?.delegate = owner as? NavigationHandle
        }
        myNavigationBar?.updateTitle(title)
        myNavigationBar?.navigationBarType = .naviSearchButton
    }
    
    func initNaviBarSearch(onView owner:UIViewController?, withTitle title:String?) {
        if myNavigationBar == nil {
            myNavigationBar = NavigationBarView.instanceFromSearchNib(CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: MyAppLication.navigationBarHeight))
            self.view.addSubview(myNavigationBar!)
            myNavigationBar?.delegate = owner as? NavigationHandle
        }
        myNavigationBar?.updateTitle(title)
        myNavigationBar?.navigationBarType = .naviSearchBar
    }
    
    
    func initNavigationForListBookLibrary(onView owner:UIViewController?, withTitle title:String?) {
        if myNavigationBar == nil {
            myNavigationBar = NavigationBarView.instanceFromLibraryBooksNib(CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: MyAppLication.navigationBarHeight))
            self.view.addSubview(myNavigationBar!)
            myNavigationBar?.delegate = owner as? NavigationHandle
        }
        myNavigationBar?.updateTitle(title)
        myNavigationBar?.navigationBarType = .libraryBooks
    }
    
```

Rồi mình đã viết 3 phương thức khởi tạo navigation bar cho BaseViewController.
## Usage
Với HomeViewController bạn chỉ cần thực hiện gọi init navigation bar trong viewDidLoad (Mình không làm nó trong base vì không phải màn hình nào cũng cần navigation bar).
`initNaviBarSearchButton(onView: self, withTitle: self.nibName)`
Bạn sẽ gọi initNaviBarSearchButton đồng thời truyền vào nibName để hiển thị lên title.
Implement NavigationHandle:
```
extension HomeViewController: NavigationHandle {
    func navigationBarView(_ navigationView: NavigationBarView, clickLeftMenu sender: AnyObject) {
        UIAlertView.show(withTitle: "Toturial", message: "Coming soon!", cancelButtonTitle: "OK", otherButtonTitles: nil, tap: { (alertView, index) in
        })
    }
    
    func navigationBarView(_ navigationView: NavigationBarView, clickSearch sender: AnyObject) {
        let searchViewController = SearchViewController(usingNib: SearchViewController.nibName())
        navigationController?.pushViewController(searchViewController, animated: true)
    }
}
```

Như trong đoạn code trên mình sau khi click vào button search bạn sẽ push searchViewController lên.

Trong Search ViewController, Library ViewController  bạn sẽ làm tương tự. 
- Gọi init navigation bar vơi style bạn muốn.
- Implement NavigationHandle.

Ngoài ra mình cũng đã thử tạo một instance cho BaseTableController bài trước mình làm nhưng không có thời gian làm example.

Nói qua một chút về phần này để tạo một instance cho BaseTableController khá đơn giản bạn chi cân Implement một số function mình lấy ví dụ như searchController của project này:

```

class SearchController: BaseTableController {
    override func fetchData() {
        self._targetTableView?.alpha = 0.0
        UIView.animate(withDuration: 0.25, delay: 0.5, options: UIViewAnimationOptions.curveEaseIn, animations: {
            self._targetTableView?.alpha = 1.0
            self._targetTableView?.setContentOffset(CGPoint(x: 0, y: 0), animated: true)
        }) { (finish) in
            self.updateWithListItem([Quotations().getListQuotations()] as [AnyObject])
        }
    }
    
    override func registerNibWithTargetTableView(_ targetTableView: UITableView) {
        targetTableView.backgroundColor = ColorConfig.BACKGROUND_SEARCHLIST_COLOR
        targetTableView.register(cellType: ResultsTableViewCell.self)
    }
    
    override func getCellIdentify(withItem item: AnyObject?, returnClassName: Bool) -> String {
        return ResultsTableViewCell.nibName(returnClassName: returnClassName)
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if let item = self.itemAtIndexPath(indexPath) {
            UIAlertView.show(withTitle: "Toturial", message: "Would you like store this quota?", cancelButtonTitle: "Cancel", otherButtonTitles: ["OK"], tap: { (alertView, index) in
                switch (index) {
                case 0:
                    break
                case 1:
                    let libaryViewController = LibraryViewController.init(withQuota: item as? [String:String])
                    MainViewController.shared.pushViewController(libaryViewController, animated: true)
                    break
                default:
                    break
                }
            })
        }
    }
}
```

về cơ bản bạn không phải implement một đống thứ của UITableViewDelegate và UITableViewDataSource nữa thay vào đó bạn chỉ cần override lên nhưng method sau:

```
override func fetchData() - optional
override func registerNibWithTargetTableView(_ targetTableView: UITableView) -require
override func getCellIdentify(withItem item: AnyObject?, returnClassName: Bool) -> String -require
```
## Chốt

Bạn có thể xem chi tiết hơn bằng cách clone project mình về xem nó không quá phức tạp mình nghĩ là khá clear. Và một điều quan trọng nữa đó là mình đã cố gắng tách tất cả các xử lý của UITableView ra khỏi UIViewController. 

Full source code: [MTNavigationBar](https://github.com/phamminhtien305/mtnavigationbar)