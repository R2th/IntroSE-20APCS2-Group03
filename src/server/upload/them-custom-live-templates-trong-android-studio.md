**Custom live teamplate là gì ?**

Trong Android Studio, đây là khái niệm về việc chèn bất kì 1 nội dung ở bất kì nơi đâu được yêu cầu . Bằng cách sử dụng live templates, Chúng ta có thể chèn những cấu trúc thường xuyên sử dụng vào trong code của chúng ta.

Vậy nó có hữu ích như thế nào nhỉ ?

**Làm sao để tạo live template mới**

Để cấu hình live template , chúng ta cần mở trang Live Templates của Android Studio : **File -> Settings -> Editor -> Live Templates**. Trên trang này bạn có thể thấy những live template có sẵn, sửa lại chúng hoặc bạn tạo mới chúng. 

![](https://images.viblo.asia/e90b68a2-85eb-4c5e-9aca-c5ac0b18b8b0.png)

Để định nghĩ một template mới, ở bên phải của window , Click **+** . Sau khi bạn click có sẵn 2 lựa chọn cho bạn : **Live Template** và **Template group**.

![](https://images.viblo.asia/63972319-25ea-417a-94fe-a31d533c706e.png)

Tiếp tục nào và tạo group mới và đặt tên nó là **test**.

Sau khi bạn tạo group có tên là **test**  , chúng ta lựa chọn group **test** và click lần nữa **+** để tạo live template mới bên trong group chúng ta mới tạo.

Chỉ khi chúng ta lựa chọn live template thì bên dưới window chúng ta sẽ thấy được live template editor như sau : 

![](https://images.viblo.asia/7c22e008-d3e8-49ea-a157-d25398eb5047.png)

Tại đây, Đầu tiên chúng ta phải thiết lập là abbreviation (nghĩa là : viết tắt). Abbreviation giống như là keyword sẽ kích hoạt việc chèn template bên trong editor.  Chúng ta có thể sử dụng  description một cách hữu ích. Vì thế nếu chúng ta có nhiều chữ viết tắt cho nhiều nơi khác nhau thì bạn có thể xem descreption một cách cụ thể hơn. 

Chúng ta đặt test như là từ viết tắt và JUnit test function như là mô tả.
    
Tiếp tục, Chúng ta phải xác định context (Bối cảnh) nơi template mới của chúng ta sẽ được có sẵn. Tại vị trí bên dưới cùng của live template editor window,có một cảnh bảo nho nhỏ như sau **No applicable contexts** :

![](https://images.viblo.asia/d8f488bc-d132-4e44-9fcb-e7149050f4b1.png)
    
 Không có gì phải sợ cả chúng ta click vào **define** bên cạnh liền :
 
 ![](https://images.viblo.asia/d9900f80-1158-4496-8766-88d4705755fb.png)
 
 Như hình mình đưa cho bạn bên trên, Mình lựa chọn là Kotlin Class như là template context, và khi bạn lựa chọn như thế có nghĩ là template này sẽ có sẵn ở Kotlin class files.
 
 Giờ  chúng ta thiết lập template thực sự cái mà chúng ta muốn có sẵn khi bạn nhập từ viết tắt và bỏ đoạn chú thích nhỏ này vào **Template text** như sau :
 
 ```
@org.junit.jupiter.api.Test
fun $EXPR$() {
 org.junit.jupiter.api.Assertions.assertEquals($EXPR1$, $EXPR2$)
}
```
 
 Và cái cuối cùng chúng ta phải là đó là lưu lại và done. Bây giờ chúng ta cùng nhau xem nó trông như thế nào .  Mở 1 file koltin bất kì nào và bên trong phần body chúng ta đánh từ viết tắt : **test**
 
 ![](https://images.viblo.asia/0bf50a41-2033-4bf4-b1fc-c5c5806789a8.png)
 
 Bạn chỉ cần enter sau đó và thành quả chúng ta đạt được như sau :
 
 ![](https://images.viblo.asia/b60e16ee-45bd-4816-a732-34247b6a58b2.png)
 
 Vậy mình đã thực hiện xong . Mình hy vọng nó giúp được bạn viết code nhanh hơn.
 Có gì sai xót hay muốn mình cải thiện hơn. bạn có thể comment ở bên dưới nhé :) 
 
 Link tham khảo : https://proandroiddev.com/add-custom-live-templates-in-android-studio-11b59dd0284d