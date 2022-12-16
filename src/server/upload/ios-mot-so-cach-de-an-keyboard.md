# Một số cách thường được sử dụng để ẩn Keyboard

Khi nhắc đến Keyboard thì chúng ta hẳn sẽ nghĩ ngay đến Textfield, một component quá phổ biến mà hầu hết các app iOS đều có (không nhắc đến game nha 😅). Mặc định khi nhấn vào một UITextfield thì keyboard sẽ tự động xuất hiện, và việc của developer đó là ẩn nó đi khi người dùng thao tác xong. Sau đây tôi xin đề cập đến một số cách mà chúng ta thường sử dụng để ẩn keyboard trên View Controller.

![](https://images.viblo.asia/e87fcddd-a60c-4589-984c-e799afa88b56.png)

## Cách thứ nhất

Implement phương thức *textFieldShouldReturn* của UITextfieldDelegate và thực hiện gọi đến *resignFirstResponder*

```
func textFieldShouldReturn(textField: UITextField) -> Bool {
   
   textField.resignFirstResponder()
   //or
   //self.view.endEditing(true)
   return true
}
```

Các thức này khá thông dụng và hiệu quả đối với những textfiled cho phép hiển thị nút Return, còn đối với những textfield không có nút Return thì sao?

# Cách thứ hai

Đối với những textfield không có nút Return ví dụ như khi người dùng đang nhập vào bằng bàn phím số (*UIKeyboardType.NumberPad*) :

![](https://images.viblo.asia/b38cf4b0-f198-44aa-9627-75ceed9f4772.png)

ĐỐi với trường hợp này thì cách mà chúng ta sẽ làm đó là hiển thị một thanh toolbar với nút Done nằm phía trên Keyboard. Khi user sẽ nhấn vào nút Done này để đánh dấu việc nhập xong dữ liệu cho khung textfield. Chúng ta thực hiện bằng cách tạo một UIToolbar và gán nó vào thuộc tính có tên *inputAccessoryView* của UITextfield.

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

![](https://images.viblo.asia/1c177a19-c528-4205-9092-6bcb87a3a257.png)

## Cách thứ ba

Cách tiếp theo mà tôi muốn nhắc đến đó là user chỉ việc tap vào một vị trí bất kì trên màn hình và keyboard sẽ tự đông được ẩn đi. Hẳn ai cũng biết là tôi muốn nhắc đến UITapGesture đúng không?
Chỉ một vài dòng code đơn giản là đã có thể thực hiện được thao tác này: trong *viewDidLoad* tiến hành khởi tạo một UITapGesture với selector là một phương thức gọi đến *resignFirstResponder*

```
self.view.addGestureRecognizer(UITapGestureRecognizer(target: self.view, action: Selector(“endEditing:”)))
```

Rất dễ dàng đúng không nào? Nhưng như chúng ta đã biết, Ben, người chú đáng kính của chàng người nhện Peter Parker đã từng nói: "***Great power comes with great responsibility***". Vấn đề mà chúng ta có thể sẽ gặp phải khi sử dụng UITapGesture để ẩn bàn phím, là nếu trên màn hình có một UITableView, chúng ta sẽ không thể thực hiện tap vào cell để gọi đến *didSelectRowAtIndex*
Và đây sẽ là giải pháp:

```
let tap = UITapGestureRecognizer(target: self.view, action: Selector(“endEditing:”))
tap.cancelsTouchesInView = false
self.view.addGestureRecognizer(tap)
```

Hãy chắc chắn rằng giá trị *cancelsTouchesInView* được set về *false*.

## Cách thứ tư

Nếu textfield của chúng ta đãng được add lên trên UIScrollView, (tương tự với UITableview, UICollectionView vì chúng đều là subclass của UIScrollView), chúng ta có thể sử dụng thuộc tính *keyboard dismiss mode* như sau:

```
tableView.keyboardDismissMode = .onDrag // .interactive

```

Như vậy, mỗi khi user scroll xuống phía dưới, bàn phím sẽ được tự động ẩn đi.

# Tổng kết

Trên đây tôi vừa đề cập đến một số cách mà chúng ta có thể sử dụng để ẩn bàn phím khi làm việc trên một số component như UITextfield, UITextView.
Cũng xin đề cập thêm là ngoai cách gọi phương thức* textField.resignFirstResponder() * để ẩn bàn phím, chúng ta có thể sử dụng một số cách như sau mà không cần quan tâm đến textfield đang được focus:

```
// Cách 1
self.view.endEditing(true)

// Cách 2
UIApplication.shared.sendAction(#selector(UIApplication.resignFirstResponder), to: nil, from: nil, for: nil)

```


Vậy đâu là cách mà các bạn đã/đang/sẽ sử dụng khi làm việc với Keyboard, hãy đừng ngại để lại comment/lời nhắn/góp ý phía dưới. 

## Thanks for reading!