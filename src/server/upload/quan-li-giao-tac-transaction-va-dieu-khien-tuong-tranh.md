Như chúng ta đã từng biết một trong các chức năng chính của hệ QTCSDL là phải đảm bảo tính tin cậy, tính nhất quán của CSDL, ngay cả khi có nhiều người dùng đồng thời truy cập vào CSDL hay thậm chí ngay cả khi xảy ra sự cố (phần cứng hay phần mềm). Trong bài viết này chúng ta sẽ cùng nhau đi tìm hiểu ba dịch vụ mà một hệ QTCSDL cung cấp: hỗ trợ giao tác, điều khiển tương tranh và khôi phục CSDL, những dịch vụ đó phụ thuộc vào nhau. Điều khiển tương tranh và khôi phục CSDL mỗi khi có sự cố , cả hai đều nhằm đảm bảo sự nhất quán về dữ liệu và tránh tổn thất thông tin.
# I. CÁC KHÁI NIỆM CƠ BẢN VỀ HỆ THỐNG CHO KHÔI PHỤC VÀ ĐIỀU KHIỂN TƯƠNG TRANH
## 1. Khái niệm giao tác:
> **Một giao tác (transaction)** là một hành động hay một chuỗi các hành động truy cập vào CSDL hoặc làm thay đổi nội dung CSDL, giao tác được đưa ra bởi một người sử dụng hay một chương trình ứng dụng


-----



Như vậy một giao tác là một đơn vị công việc trên CSDL xét trên tính logic. Một giao tác có thể là toàn bộ một chương trình (viết trong ngôn ngữ thao tác dữ liệu bậc cao hay trong ngôn ngữ lập trình như SQL, COBOL,...), nó cũng có thể là một phần của chương trình hay một câu lệnh đơn lẻ như câu lệnh INSERT, UPDATE của SQL.


Trong ngữ cảnh CSDL, có thể xem sự thực hiện một chương trình ứng dụng như một dãy các **giao tác** và xen kẽ giữa chúng là những thao tác không đòi hỏi xử lí CSDL (thao tác CPU). Để cho việc tiện theo dõi, mình sẽ minh họa hai lược đồ quan hệ **Products** và **Categories** đơn giản như sau:


> **Products**(id, category_id, name, price)
> 
> 
> **Categories**(id, name)


-----



**Giải thích:**


* Lược đồ **Products** gồm các thuộc tính về mã sản phẩm (**id**), mã thể loại (**category_id**), tên sản phẩm (**name**) và giá của sản phẩm (**price**)


* Lược đồ **Categories** dùng để tham chiếu mã thể loại ứng với từng sản phẩm bao gồm các thuộc tính về mã thể loại (**id**), tên thể loại (**name**)


**Ví dụ 1:**
Một giao tác đơn giản là nâng giá của một sản phẩm có mã số là $x$ thêm 10$%$ giá hiện tại của sản phẩm đó. Chúng ta có thể viết giao tác này như sau:

```
read(product.id = x, price)
new_price = price * 1.1
write(product.id = x, new_price)
```

Ở đây chúng ta quy ước dùng **read(x)** để chỉ thao tác đọc một mục dữ liệu có tên là $x$ ở CSDL vào một biến của chương trình. Để cho đơn giản việc trình bày chúng ta coi như biến chương trình này cũng có tên là $x$. Tương tự như vậy **write(x)** dùng để chỉ thao tác ghi giá trị biến $x$ của chương trình vào mục dữ liệu $x$ của CSDL


Việc thưc hiện một lệnh **read(x)** sẽ bao gồm các bước sau:
* Tìm địa chỉ của khối có chứa mục dữ liệu $x$
* Sao chép khối đó vào vùng đệm của bộ nhớ chính (nếu nó chưa có sẵn trong một vùng đệm của bộ nhớ chính)
* Sao chép mục dữ liệu $x$ từ vùng đệm vào biến có tên là $x$ của chương trình

Việc thưc hiện một lệnh **write(x)** sẽ bao gồm các bước sau:
* Tìm địa chỉ của khối có chứa mục dữ liệu $x$
* Sao chép khối đó vào vùng đệm của bộ nhớ chính (nếu nó chưa có sẵn trong một vùng đệm của bộ nhớ chính)
* Sao chép mục dữ liệu $x$ từ biến chương trình có tên là $x$ vào chỗ chính xác của nó trong vùng đệm
* Lưu trữ khối vừa cập nhập trong vùng đệm vào lại thiết bị nhớ để sau này có thể truy xuất (có thể lưu ngay tức thời hoặc tại thời điểm muộn hơn)


Trong ví dụ trên lệnh **read(product.id = x, price)** dùng để chỉ thao tác đọc dữ liệu ở thuộc tính ***price*** của bản ghi có giá trị khóa chính id=x, lệnh **write(product.id = x, new_price)** dùng để chỉ giao tác ghi lại giá trị của **new_price** vào cho bản ghi có khóa chính là x. Giữa hai thao tác đọc và ghi dữ liệu nới trên có một thao tác không truy cập CSDL, đó là thao tác *new_price = price * 1.1*


**Ví dụ 2:** Hãy xem xét một ví dụ phức tạp hơn. 

Giả sử có một giao tác xóa bỏ bản ghi về **Categories** có mã thể loại $id = x$ khỏi quan hệ trong **ví dụ 1**. Do ràng buộc tham chiếu từ lược đồ **Products** đến lược đồ **Categories**, để có thể xóa được bản ghi trong **Categories** thì trong **Products** ta cần gán lại một giá trị khác chẳng hạn là y (y khác x) cho tất cả các bản ghi mà có **category_id = x**. Giao tác này được trình bày như sau:

```
Delete(Categories.id = x)
begin
   read(products.category_id = x)
   if (products.category_id = x) then begin
       products.category_id = y
       write(category_id = y)
   end
end
```


Ở đây nếu việc cập nhập lại cho các bản ghi tương ứng trong lược đồ **Products** không được tiến hành thì CSDL sẽ rơi vào trang thái không nhất quán, vi phạm ràng buộc tham chiếu vì lúc này một số bản ghi product sẽ nói về một category không tồn tại trong CSDL.


Một giao tác phải chuyển CSDL từ trạng thái nhất quán này sang trạng thái nhất quán khác, mặc dù trong quá trình thực hiện giao tác, có những thời điểm CSDL tạm thời ở trạng thái không nhất quán.


Rất có thể trong quá trình thực hiện dãy hành động của một giao tác, một sự cố nào đó xảy ra và việc thực hiện giao tác không thành công. Như vậy, khi thực hiện một giao tác, chúng ta có một trong hai kết quả: giao tác được **thực hiện thành công** hoặc **thực hiện không thành công**. 
* Trong trường hợp thứ nhất chúng ta nói là giao tác đã được **chuyển giao (committed)**, CSDL đã được chuyển sang một trạng thái mới, nhất quán.
* Trong trường hợp thứ hai chúng ta nói rằng giao tác bị **hủy bỏ (aborted)**, khi giao tác bị hủy bỏ thì CSDL phải được **khôi phục (trả về)** trạng thái nhất quán của nó trước khi bắt đầu thực hiện giao tác làm cho nó bị hủy. Những giao tác bị hủy bỏ như vậy được gọi là những giao tác bị **phục hồi (rollback)**

Một giao tác đã được chuyển giao sẽ không thể bị hủy bỏ. Nếu chúng ta nhận thấy giao tác này đã thực hiện một sai sót thì chỉ còn một cách là thực hiện một giao tác khác điều chỉnh lại gọi là giao tác bù, hủy đi tác động của các giao tác trước đó đã gây ra sai sót. 


Các hệ QTCSDL không thể tự hiểu được rằng những phép cập nhập nào sẽ được nhóm lại thành một đơn vị logic công việc hay một giao tác-transaction, bởi vậy người dùng phải tự định biên cho một giao tác bằng các từ khóa **BEGIN TRANSACTION**, **COMMIT**, **ROLLBACK** theo quy định của các ngôn ngữ DML. Trong trường hợp không có sự định biên cho các giao tác thì hệ thống sẽ coi toàn bộ chương trình là một giao tác, hệ QTCSDL sẽ tự động thực hiện **COMMIT** khi chương trình thực hiện không có một lỗi nào xuất hiện và **ROLLBACK** trong tình huống ngược lại.

## 2. Các tính chất của giao tác:
Để đảm bảo tính nhất quán của dữ liệu, các hệ QTCSDL cần đảm bảo các tính chất sau đây cho giao tác, tính chất **ACID**
* **Tính nguyên tố (Atomicity):** toàn bộ các thao tác trong cùng một giao tác đều được thực hiện hoặc không một thao tác nào trong chúng được thực hiện. Một giao tác là một đơn vị công việc không thể phân chia
* **Tính nhất quán (Consistency):** một giao tác phải chuyển CSDL từ một trạng thái nhất quán này sang một trạng thái nhất quán khác
* **Tính cô lập (Isolation):** Các giao tác phải được thực hiện một cách độc lập với nhau. Nói một cách khác những tác động của giao tác này sẽ không thể thấy được đối với những giao tác khác, khi giao tác này chưa thực hiện xong hoàn toàn
* **Tính bền vững (Durability):** những thay đổi của CSDL do tác động của một giao tác thành công là bền vững, không bị mất đi


mở rộng hơn một tí: chúng ta sẽ để cập đến kiến trúc của một hệ CSDL, ở trong kiến trúc này bộ quản lí giao tác (**transaction manager**) thay mặt các chương trình ứng dụng điều phối các giao tác. Nó liên hệ với bộ lập lịch, nơi có trách nhiệm thực hiện một chiến lược điều khiển tương tranh. Nếu có một sự cố trong quá trình thực hiện giao tác thì tính nhất quán của CSDL cần được bảo toàn, đây là trách nhiệm của bộ quản lí khôi phục dữ liệu. Bộ quản lí vùng nhớ đệm có nhiệm vụ chuyển giao dữ liệu qua lại giữ các thiết bị nhớ thứ cấp và bộ nhớ chính.