# Giới thiệu
Spotlight Search cho phép người dùng tìm kiến bản ghi ứng dụng của mình trên thanh Search Bar của iPhone/iPad
![](https://images.viblo.asia/702d0fc6-724d-4984-a9fe-7727e41ad799.png)

# Kịch bản
Ứng dụng của chúng ta sẽ cho phép người dùng thêm, xóa, chỉ định các trường bản ghi trong tiêu chí tìm kiếm của iPhone/iPad Spotlight.
Ví dụ như trong ứng dụng Books, Book Title có thể sử dụng làm tiêu chí tìm kiếm
Người dùng có thêm lựa chọn để thêm tiêu chí title vào Spotlight trong màn hình **New Book** hoặc **Edit Book**.


# Kỹ thuật
Swift sử dụng các hàm chức năng của Spotlight để index (thêm) và remove (xóa) các tiêu chí trong tìm kiếm.
Các tiêu chí tìm kiếm được tham chiếu như một "**indentifier**", ứng dụng của bạn sẽ là **domainIdentifier**, tên ứng dụng của bạn sẽ là **contentDescription**

- Index functions gồm:
  + CSSearchableItem(..), 
  + CSSearchableIndex.default().indexSearchableItems(..)

- Delete function gồm:
   + CSSearchableIndex.default().deleteSearchableItems(..)
 
 Mã nguồn của chương trình sẽ dựa trên ứng dụng  **AppsGym Books** được đăng tải trên Apple Store với tên **8Books**
 
 # Giao diện người dùng
 Ta sẽ sử dụng các hộp hội thoại Yes/No để index/delete các tiêu chí tìm kiếm trong Spotlight.
 
 **NewBookTableViewController.swift** sẽ hiển thị 2 nút Yes/No, Nếu người dụng chọn **Yes** thì Book Title sẽ được index (thêm) vào Spotlight khi bản ghi sách được lưu trữ.
 
![](https://images.viblo.asia/c1843540-ed7b-4902-a91b-6e58615d42a7.png)

**EditBookTableViewController.swift** sẽ hiện thị trạng thái hiện tại của Spotlight seach. Nếu người dùng chọn No thì Book Title sẽ được xóa khỏi Spotlight search. Nếu người dùng chọn Yes thì Book Title sẽ được thêm vào Spotlight search khi bản ghi của sách được lưu lại.
![](https://images.viblo.asia/cc385926-eda3-44b4-9e87-b4ee62a36a0c.png)

![](https://images.viblo.asia/b82cde35-8757-43b1-8581-050802296f09.png)


# Logic
Ta cần import 2 thư viện: **CoreSpotlight** và **MobileCoreServices** 

Ta sẽ có 2 xử lý chính: Index (add) và Delete (remove) với cầm tham số là Book Title.
- addToSpotlightSearch(_ title: String)
- removeFromSpotlightSearch(_ title: String)
Sẽ được gọi dựa trên trạng thái của 2 nút Yes/No

Kết nối Yes/No button vào cùng một **@IBAction** và thay đổi trạng thái On/Off tương ứng với các cờ (các biến boolean) để quy định xem nút nào được chọn.

# Code
## Code: New Book
Code New Book được lưu trong file **NewBookTableViewController.swift**
```
//NewBookTableViewController.swift
// SPOTLIGHT
import CoreSpotlight
import MobileCoreServices       // Must be used with CoreSpotlight

class NewBookTableViewController: UITableViewController,
..
   var book:Book! 
....
    @IBOutlet weak var titleTextField: UITextField!
        { didSet {
            titleTextField.tag = 1
            titleTextField.delegate = self    }  
}

...
    // SPOTLIGHT
    // funcs addToSpotlightSearch() or removeFromSpotlightSearch() on Save
    var isSpotlightYesButtonTapped = false
    var isSpotlightNoButtonTapped = false
    
    @IBOutlet weak var spotlightYesButtonOutlet: UIButton!
    @IBOutlet weak var spotlightNoButtonOutlet: UIButton!
    @IBOutlet weak var spotlightImageButtonOutlet: UIButton!
    
    @IBAction func spotlightYesNoButtonToggle(_ sender: UIButton) {
        if sender == spotlightYesButtonOutlet {
            spotlightYesButtonOutlet.backgroundColor = yesGreen
            spotlightNoButtonOutlet.backgroundColor = .lightGray
            spotlightImageButtonOutlet.setImage(UIImage(named: "SpotlightGreen"), for: .normal)
            isSpotlightYesButtonTapped = true         // ref addToSpotlightSearch() on Save
            isSpotlightNoButtonTapped = false         // ref addToSpotlightSearch() on Save
        } else if sender == spotlightNoButtonOutlet {
            spotlightNoButtonOutlet.backgroundColor = .red
            spotlightYesButtonOutlet.backgroundColor = .lightGray
            spotlightImageButtonOutlet.setImage(UIImage(named: "SpotlightRed"), for: .normal)
            isSpotlightYesButtonTapped = false        // ref removeFromSpotlightSearch() on Save
            isSpotlightNoButtonTapped = true         // ref addToSpotlightSearch() on Save
        }
    }
...
```

NewBookTableViewController.swift viewDidLoad()
```
// NewBookTableViewController.swift viewDidLoad()
   override func viewDidLoad() {
        super.viewDidLoad()
...
        // Spotllight
        spotlightYesButtonOutlet.backgroundColor = .lightGray
        spotlightNoButtonOutlet.backgroundColor = .lightGray
        spotlightImageButtonOutlet.setImage(UIImage(named: "SpotlightEmpty"), for: .normal)  
....
```

NewBookTableViewController.swift saveRecordToCoreData()

```
// NewBookTableViewController.swift saveRecordToCoreData()
func saveRecordToCoreData() {

        if let managedObjectContext = (UIApplication.shared.delegate as? AppDelegate)?.managedObjectContext {
            
            let book = NSEntityDescription.insertNewObject(forEntityName: "Book", into: managedObjectContext) as! Book
        
            book.id = UUID().uuidString
            book.title = titleTextField.text!
....
            if isSpotlightYesButtonTapped { book.isSpotlight = true } else {  book.isSpotlight = false }
...
        if isSpotlightYesButtonTapped == true {
             addToSpotlightSearch(titleTextField.text!)
        }
```

NewBookTableViewController.swift Spotlight Functions

```
// NewBookTableViewController.swift Spotlight Functions
// SPOTLIGHT
    func addToSpotlightSearch(_ title: String) {
        if #available(iOS 9.0, *) {
            let attributeSet = CSSearchableItemAttributeSet(itemContentType: kUTTypeText as String)
            attributeSet.title = title // titleTextField.text!
            attributeSet.contentDescription = "8Books"
            let identifier = titleTextField.text!
            let item = CSSearchableItem(uniqueIdentifier: identifier, domainIdentifier: "com.kilani", attributeSet: attributeSet)
            CSSearchableIndex.default().indexSearchableItems([item]) { (error: Error?) -> Void in
                if let error =  error {
                    print("Indexing error: (error.localizedDescription)")
                } else {
                    print("Search Title Added to Spotlight for (identifier)")
                }   }  }  else { // Fallback on earlier versions
        }   } // end func addToSpotlightSearch removeFromSpotlightSearch()
    
```

## Code: Edit Book
Mã nguồn Edit Book được lưu trong file **EditBookTableViewController.swift**

```
// Spotlight
import CoreSpotlight
import MobileCoreServices

class EditBookTableViewController: UITableViewController,
...
    // SPOTLIGHT
    // funcs addToSpotlightSearch() or removeFromSpotlightSearch() on Save
    var isBookAddedToSpotlight = false  // true/false value of book.zMisc1 'SpotlightYes'/'SpotlightNo'
    var isSpotlightYesButtonTapped = false    // Default, in case the Yes/No buttons are not tapped
    var isSpotlightNoButtonTapped = false       // if changed to true, remove from Spotlight
    var titlePreSpotlight: String! = ""
    
    @IBOutlet weak var spotlightYesButtonOutlet: UIButton!
    @IBOutlet weak var spotlightNoButtonOutlet: UIButton!
    @IBOutlet weak var spotlightImageButtonOutlet: UIButton!
    
    @IBAction func spotlightYesNoButtonToggle(_ sender: UIButton) {
        if sender == spotlightYesButtonOutlet {
            spotlightYesButtonOutlet.backgroundColor = yesGreen
            spotlightNoButtonOutlet.backgroundColor = .lightGray
            spotlightImageButtonOutlet.setImage(UIImage(named: "SpotlightGreen"), for: .normal)
            isSpotlightYesButtonTapped = true         // ref addToSpotlightSearch() on Save
            isSpotlightNoButtonTapped = false         // ref addToSpotlightSearch() on Save
        } else if sender == spotlightNoButtonOutlet {
            spotlightNoButtonOutlet.backgroundColor = .red
            spotlightYesButtonOutlet.backgroundColor = .lightGray
            spotlightImageButtonOutlet.setImage(UIImage(named: "SpotlightRed"), for: .normal)
            isSpotlightYesButtonTapped = false        // ref removeFromSpotlightSearch() on Save
            isSpotlightNoButtonTapped = true
        }
    }
```

EditBookTableViewController.swift vewDidLoad()
```
// EditBookTableViewController.swift  vewDidLoad()
    override func viewDidLoad() {
        super.viewDidLoad()
      ...
            if (book.isSpotlight == true) {
            spotlightYesButtonOutlet.backgroundColor = .lightGray
            spotlightNoButtonOutlet.backgroundColor = .lightGray
            spotlightImageButtonOutlet.setImage(UIImage(named: "SpotlightYellow"), for: .normal)
            isBookAddedToSpotlight = true
        } else {
            spotlightYesButtonOutlet.backgroundColor = .lightGray
            spotlightNoButtonOutlet.backgroundColor = .red
            spotlightImageButtonOutlet.setImage(UIImage(named: "SpotlightRed"), for: .normal)
            isBookAddedToSpotlight = false
        }
```

EditBookTableViewController.swift saveRecordToCoreData()
```
// EditBookTableViewController.swift   saveRecordToCoreData()
    // Setup Book Entity Record
    func saveRecordToCoreData() {
        
        if let managedObjectContext = (UIApplication.shared.delegate as? AppDelegate)?.managedObjectContext {
            
        book.title = titleTextField.text!
        book.author = authorTextField.text!
        // ...
          
            // SPOTLIGHT
            //3 Button Actions possible: none tapped, No tapped, Yes tapped.
            // 1. If None tapped, do nothing (ignore both Ifs)
            // 2. if No tapped, remove current and/or new
            // 3. If Yes tapped, remove current / add new
            if isSpotlightYesButtonTapped { 
              book.isSpotlight = true }
                else { 
                  if isSpotlightNoButtonTapped { book.isSpotlight = false 
                                               } 
// ....            
            do {
                try managedObjectContext.save()
                print(#function, "Saved \(book.title!) to CoreData!")
            } catch {
                print(error)
                return
            }
        
            // AFTER SAVING BOOK TO CORE DATA, PERFORM SPOTLIGHT Logic, If Any
            if isSpotlightYesButtonTapped == true {
                removeFromSpotlightSearch(titlePreSpotlight)   // Remove Old Title, if any
                addToSpotlightSearch(titleTextField.text!)     // Add New Title, if any
            } // end if
                else {      // if false (default) the check if No button tapped to Remove Old and New Titles
                if isSpotlightNoButtonTapped { // Remove Existing Title and Replace by New Title
                        removeFromSpotlightSearch(titlePreSpotlight)
                        removeFromSpotlightSearch(titleTextField.text!)
                    }
                } // end else
```

EditBookTableViewController.swift Spotlight Functions
```
// EditBookTableViewController.swift SPOTLIGHT FUNCTIONS
    func addToSpotlightSearch(_ title: String) {
        if #available(iOS 9.0, *) {
            let attributeSet = CSSearchableItemAttributeSet(itemContentType: kUTTypeText as String)
            attributeSet.title = title // titleTextField.text!
            attributeSet.contentDescription = "8Books" // "AppsGym Books"
            let identifier = titleTextField.text!
            let item = CSSearchableItem(uniqueIdentifier: identifier, domainIdentifier: "com.appsgym", attributeSet: attributeSet)
            CSSearchableIndex.default().indexSearchableItems([item]) { (error: Error?) -> Void in
                if let error =  error {
                    print(#function, "Indexing error: \(error.localizedDescription)")
                } else {
                    print(#function, "\(identifier) + \(title)")
                       }
                    }
        }  else { // Fallback on earlier versions
        }   
    } // end func addToSpotlightSearch 
    

    func removeFromSpotlightSearch(_ title: String) {
        if #available(iOS 9.0, *) {
            let identifier = title // titleTextField.text!
            CSSearchableIndex.default().deleteSearchableItems(withIdentifiers: [identifier])
            { (error: Error?) -> Void in
                if let error = error {
                    print("Remove error: \(error.localizedDescription)")
                } else {
                    print(#function, "\(identifier) + \(title)")
                } 
            }  
        }  
    } // end func removeFromSpotlightSearch()
```

Bài viết đã cung cấp đầy đủ các bước từ cấu hình, logic và mã nguồn để thêm/bớt tiêu chí tìm kiếm trong Spotlight cho một bản ghi sách mới. Bạn có thể sử dụng với bất kỳ bản ghi nào trong ứng dụng của bạn.

# Nguồn tham khảo
- https://mazenkilani.medium.com/spotlight-search-for-your-indexed-swift-app-records-601864abf51b