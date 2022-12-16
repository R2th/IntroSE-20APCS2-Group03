Hôm nay mình sẽ giới thiệu tới cách custom view với **@IBDesignable** và **@IBInspectable**.
Vậy **@IBDesignable** và **@IBInspectable** là gì?
*   **@IBDesignable** cho phép chúng ta xem trực tiếp các thay đổi của view trong storyboard hoặc trong file xib mà không cần phải run app. Chỉ cần đặt  **@IBDesignable** trước class view được custom và implement phương thức **prepareForInterfaceBuilder()**
*   **@IBInspectable** cho phép chúng ta tạo ra những thuộc tính trong code và nó sẽ được gán giá trị ở ngoài storyboard hoặc file xib. Ví dụ bình thường trong code bạn muốn bo tròn 1 view. Thì bạn cần phải triển khai viết đoạn code `myView.layer.cornerRadius = 10`. Giả sử bạn có 10 view thì bạn phải viết 10 dòng code như vậy. Nhưng với **@IBInspectable** bạn chỉ cần tạo ra thuộc tính, và gán giá trị cho nó trong storyboard hoặc file xib. Tương tự như việc bạn set background color cho view vậy.
# Cách sử dụng @IBDesignable
![](https://images.viblo.asia/198854e2-af38-42d7-9216-d8fe309ca150.png)

Ở đây mình tạo 1 class CustomView và kế thừa lại từ UIView. Mình thêm @IBDesignable vào trước class. Bên trong mình sẽ tạo ra các thuộc tính như color ( dùng để set background color), cornerRadius ( dùng để set cornerRadius), tương tự với borderWidth và borderColor. Mình tạo 1 function `setupView()` để set các thuộc tính cho view, và override lại phương thức `prepareForInterfaceBuilder()`.
![](https://images.viblo.asia/f94ed293-e9a7-4da2-b348-04785e63684d.png)

Bây giờ mình kéo 1 view vào trong ViewController và cho nó kế thừa CustomView.
![](https://images.viblo.asia/3dd7303b-bb91-4b02-8642-51044e970030.png)

Và đây là kết quả, mọi người có thể thấy mình chỉ cần thay đổi giá trị các thuộc tính trong code và chúng ta có thể nhìn thấy luôn được sự thay đổi trong storyboard ( có thể làm tương tự với file xib) mà không cần phải run app.
# Cách sử dụng @IBInspectable
![](https://images.viblo.asia/0e8a9de4-8757-49a7-a4b0-1779826ae8b0.png)

Ở đây mình mở rộng UIView và tạo ra các properties cornerRadius, borderColor, borderWidth để set các thuộc tính tương ứng cho view. Giờ quay lại storyboard xem có gì nhé. 
![](https://images.viblo.asia/4d02dc5d-a666-4eff-9356-921236221f4a.png)

Mọi người sẽ thấy có 3 thuộc tính được thêm vào ngoài storyboard, ở đây chúng ta có thể set giá trị cho các thuộc tính đó. Sau đó run app, và đây là kết quả:
![](https://images.viblo.asia/16cd7eb4-25b0-4c46-a10b-50b69bf2a840.png)
# Kết hợp @IBDesignable và @IBInspectable
Ngoài việc sử dụng riêng lẻ từng thuộc tính như bên trên mình giới thiệu, chúng ta có thể kết hợp cả 2 thuộc tính này cùng nhau. Ví dụ:
![](https://images.viblo.asia/2ac4ef2b-74eb-4f33-b495-98f69b606bb4.png)
Sau đó quay lại storyboard và cho view của mình kế thừa lại Customview, và đây là kết quả
![](https://images.viblo.asia/3de5acde-c6c5-451b-92e9-697f2eb359f0.png)
Chúng ta không cần run app, tuỳ chỉnh thuộc tính ngoài storyboard (hoặc file xib) và có thể xem luôn được các thay đổi của view sau khi được set các thuộc tính đó.

Trên đây mình đã giới thiệu về @IBDesignable và @IBInspectable và cách sử dụng, cảm ơn mọi người đã đọc bài viết.