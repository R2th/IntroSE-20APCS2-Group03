Lựa chọn giữa việc sử dụng Storyboards hoặc tạo view bằng code thì khá chủ quan. Mỗi cách thức đều có lợi thế và bất lợi riêng, ví dụ như khi làm dự án team nhiều người thì sẽ tiện lợi hơn khi tạo view bằng code thay vì dùng storyboards vì ta sẽ tránh được merge conflicts khi nhiều người cùng làm chung một class, view.<br>
Bố trí các khối code là vấn đề chung mọi người thường gặp khi mới bắt đầu tạo view từ code. Nếu ta theo cách tiếp cận storyboards bằng việc gộp mọi view liên quan đến nhau vào chung viewcontroller, thì khối lượng code trong view controller sẽ rất lớn:<br>

```
final class MyViewController: UIViewController {
    private let myButton: UIButton = {
    	//
    }()
  
  	private let myView: UIView = {
    	//
    }()
  
  	// Các views khác 
  
  	override func viewDidLoad() {
        super.viewDidLoad()
      	setupViews()
    }
  
  	private func setupViews() {
    	setupMyButton()
      	setupMyView()
      	//setup các views
    }
  
  	private func setupMyButton() {
  	    view.addSubview(myButton)
    	//constraints myButton
    }
  
    private func setupMyView() {
  	    view.addSubview(myView)
    	//constraints myView
    }
  
  	//Những config khác
  
  	//ViewModel logic 
  
  	//vv..
}
```
<br>
Chúng ta có thể làm cho class trên clean hơn bằng cách chuyển các views đến các files khác và tham chiếu về lại View Controller, nhưng ta vẫn phải constraint và setup các views:<br>

```
final class MyViewController: UIViewController {
    
	let myView = MyView()
  
  	override func viewDidLoad() {
        super.viewDidLoad()
      	setupMyView()
    }
  
  	private func setupMyView() {
  	    view.addSubview(myView)
    	//code constraint
    	myView.delegate = self
    	//'view' và 'myView'
    }
}
```
<br>
Nếu chúng ta muốn code hoàn toàn bị chia tách khỏi ViewController thì có một cách đơn giản đó là override lại các thuộc tính view gốc của một UIViewController, cách đó cho phép chúng ta maintain được các file chia rẻ trong khi view controller không phải thực hiện các setup view.<br>
<br><h3>loadView()</h3><br>
loadView() là một phương thức UIViewController có nhiệm vụ thiết lập sự tồn tại của view ban đầu. Khi sử dụng Storyboards, phương thức này load các file nib và gán nó vào view, nhưng khi tạo các thực thể view controller thủ công, tất cả các phương thức sẽ tạo một UIView trống. Và ta có thể override nó lại để thay đổi các xử lý và thêm các thể loại view và thuộc tính view của view controller.<br>

```
final class MyViewController: UIViewController {
	override func loadView() {
	    let myView = MyView()
	    myView.delegate = self
        view = myView
    }

    override func viewDidLoad() {
        super.viewDidLoad()
		print(view) // a MyView instance
	}
}
```
<br>
Ở code trên, view tự động constrain bản thân vào các cạnh của viewController, nên ta sẽ không cần constraint myView.<br>
Để truy cập nội dung của myView thì ta có thể cast view thành dạng custom riêng:<br>

```
var myView: MyView {
    return view as! MyView
}
```
<br>
Ta cast view thành MyView vì view đây vẫn được định nghĩa như là UIView.<br>

```
public protocol HasCustomView {
    associatedtype CustomView: UIView
}

extension HasCustomView where Self: UIViewController {
    /// The UIViewController's custom view.
    public var customView: CustomView {
        guard let customView = view as? CustomView else {
            fatalError("Expected view to be of type \(CustomView.self) but got \(type(of: view)) instead")
        }
        return customView
    }
}
```
ViewController:
```
final class MyViewController: UIViewController, HasCustomView {
	typealias CustomView = MyView

	override func loadView() {
	    let customView = CustomView()
	    customView.delegate = self
        view = customView
    }

    override func viewDidLoad() {
    	super.viewDidLoad()
    	customView.render() //some MyView method
	}
}
```
<br>
<br><h3>Kết luận:</h3><br>
Overriding loadView() là một cách tốt để làm view controller dễ đọc và maintain hơn. View coding có thể là cái gì đó lạ đối với những mới bắt đầu lập trình iOS, tuy nhiên nó sẽ mang lại nhiều lợi ích thấy rõ đặc biệt khi dự án scale lớn hơn và nhiều thành viên cùng làm trên một dự án.
 <br>
 Reference: https://swiftrocks.com/writing-cleaner-view-code-by-overriding-loadview.html