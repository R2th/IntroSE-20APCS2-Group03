Trong khoảng thời gian trải qua dự án. Mình học hỏi được khá nhiều điều mới cao siêu và thú vị, nhưng cho đến 1 hôm mình được giao task nhỏ về keyboard mình mới biết rằng hoá ra có những cái rất cơ bản nhưng mình vẫn chưa biết.

Bài viết này mình xin chia sẻ 1 bài dịch của 1 tác giả nước ngoài để hướng dẫn cho mọi người các cách hiệu quả nhất để **dismiss Keyboard** trong lập trình **iOS**.

Cùng vào bài viết nhé ^^!!!
# Tắt keyboard cho view controller
Tôi đã suy nghĩ rất nhiều để thảo luận về các cách để tắt keyboard trong 1 ứng dụng iOS và cố gắng tìm ra cách nào phù hợp nhất.

UITextfields có 1 cơ chế gọi là **first responders**, ngay khi bạn click vào nó thì keyboard sẽ hiển thị lên màn hình. Nhiệm vụ của lập trình viên chúng ta là viết code để tắt cái keyboard ấy đi. Tôi sẽ giải thích cho bạn về vài cách làm đặc biệt là trong trường hợp cái view của bạn có vài cái textfields chứ không phải là 1
![](https://images.viblo.asia/4e311423-3f42-422f-8099-9df190ca1f1c.png)


## Cách 1:
Thực thi 1 hàm **textFieldShouldReturn** của delegate trong view controller hiện tại và dùng code tắt cái keyboard đó đi

```
func textFieldShouldReturn(textField: UITextField) -> Bool {
   
   textField.resignFirstResponder()
   //or
   //self.view.endEditing(true)
   return true
}
```
=======> Cách này khá tốt đấy. Nhưng không phải lúc nào keyboard cũng hiển thị nút return để chúng ta thực thi cã

## Cách 2:
Khi mà cái textfield của bạn cho ra keyboard không có nút return (vd: UIKeyboardType.NumberPad)

![](https://images.viblo.asia/169be619-613d-439a-8449-c9d86386426d.png)
Hướng giải pháp tốt nhất ở đây sẽ là thêm 1 cái UIToolBar trên đầu và bắt sự kiện cho nó
```
override func viewDidLoad() {
   super.viewDidLoad()
   //init toolbar
   let toolbar:UIToolbar = UIToolbar(frame: CGRect(x: 0, y: 0,  width: self.view.frame.size.width, height: 30))
   //create left side empty space so that done button set on right side
   let flexSpace = UIBarButtonItem(barButtonSystemItem:    .flexibleSpace, target: nil, action: nil)
   let doneBtn: UIBarButtonItem = UIBarButtonItem(title: “Done”, style: .done, target: self, action: Selector(“doneButtonAction”))
   toolbar.setItems([flexSpace, doneBtn], animated: false)
   toolbar.sizeToFit()
   //setting toolbar as inputAccessoryView
   self.textField1.inputAccessoryView = toolbar
   self.textField2.inputAccessoryView = toolbar
}
func doneButtonAction() {
   self.view.endEditing(true)
}
```

Và kết quả chúng ta đạt được là:
![](https://images.viblo.asia/7fbe05fa-8fb3-463d-a0da-4e722c69d96a.png)

## Cách 3:
Còn gì bằng khi bạn chỉ cần tap 1 chỗ nào đó trên màn hình để tắt keyboard đi. Chỉ cần 1 dòng code là đủ để thực thi việc này. Bạn chỉ đơn giản nhất là add 1 **gesture recogniser** cho view hiện tại và set targer là self.view và thêm 1 action là endEditing: (bạn có thể add dòng code này trong viewDidLoad() hoặc bất cứ đâu bạn muốn miễn là nó được gọi ra ^^)

```
self.view.addGestureRecognizer(UITapGestureRecognizer(target: self.view, action: Selector(“endEditing:”)))
```

Vậy là xong phải không nhỉ ?

Như **'Uncle Ben'** (:v ông chú này nổi lắm, mấy bạn nào fan Marvel chắc sẽ biết ông chú số nhọ này =]]) đã nói: **“Great power comes with great responsibility”** (tạm dịch: Sức mạnh lớn thì trách nhiệm của bạn càng lớn). Dòng code này sẽ gây ra vấn đề nếu trong cái view của bạn có TableView được đặt trên cái view bạn bắt gesture. Bạn sẽ gặp vấn đề với delegate **didSelectRowAtIndexPath** của tableView bởi nó che bà cái sự kiện gesture hide keyboard của bạn rồi.

Để giải quyết vấn đề này thì bạn chỉ cần set **cancelsTouchesInView** sang false là xong 
```
let tap = UITapGestureRecognizer(target: self.view, action: Selector(“endEditing:”))
tap.cancelsTouchesInView = false
self.view.addGestureRecognizer(tap)
```

## Cách 4:
Khi mà keyboard của bạn được gắn trên ScrollView hay là bất cứ cái view con nào của ScrollView. Vd: TableView, CollectionView... thì Apple có cho bạn sẵn 1 cái hàm hổ trợ tắt keyboard rồi đấy:
```
tableView.keyboardDismissMode = .onDrag // .interactive
```

Các bạn đọc giả còn thêm vào vài cách khá là cool ngầu để mình share cho các bạn luôn cho tiện: 

1. Cách của bạn *Jeff Scaturro*:  Đó là override cái hàm touchBegan của Viewcontroller và trong đó thực thi `endEditing` cho self.view

```
override func touchesBegan(_ touches: Set<UITouch>, 
                          with event: UIEvent?) {
     self.view.endEditing(true)
}
```

2. Cách của bạn  *Subhajit Paul*: bạn có thể làm y như trên nhưng dùng 1 global call:

```
UIApplication.shared.sendAction(#selector(UIApplication.resignFirstResponder), to: nil, from: nil, for: nil)
```

Hi vọng các bạn góp ý kiến để mở rộng thêm bài viết cho mình.


-----

Đó là các cách mình đã học được và mình mạo muội chia sẽ lại cho mọi người.
Rất vui vì các bạn đã đọc và nếu các bạn muốn xem bài viết này bằng tiếng anh của chính tác giác thì đây là link: 
https://medium.com/@KaushElsewhere/how-to-dismiss-keyboard-in-a-view-controller-of-ios-3b1bfe973ad1