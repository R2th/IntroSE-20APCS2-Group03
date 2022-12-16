## Mở đầu
Trong quá trình phát triển website sử dụng framework Laravel, việc xây dựng các mỗi quan hệ của các đối tượng giúp người lập trình giảm nhẹ việc code, tăng tính khả chuyển giữa chúng. 

Và để giúp đỡ cho việc này, Laravel cung cấp một tập hợp các quan hệ giúp triển khai code một cách đơn giản hơn, và nó được xây dựng trên model của chính các đối tượng đó. Và chúng ta sẽ cùng tìm hiểu qua các Relationship đó trong bài viết này.

## Nôi dung chính

Việc hình thành các mội quan hệ
Do chúng ta đang tuân thủ theo mô hình hướng đối tượng nên việc xây dựng các mỗi quan hệ giữa chúng là một điều tất yếu. Và không ngoại lệ trong Laravel, chúng ta cũng có các mối quan hệ giữa các đối tượng hay các Model.
Chúng bao gồm:
* Quan hệ 1-1
* Quan hệ 1-n
* Quan hệ n-n

Đây là 3 quan hệ đặc thù của một đối tượng, ngoài ra chúng ta còn có quan hệ đa hình, quan hệ Through mà Laravel hỗ trợ, chúng ta sẽ đi tìm hiểu từng quan hệ môt. (Chú ý, tất cả các phương thức thể hiện cho quan hệ đều phải được biểu thị được mối quan hệ)

### Quan hệ 1 - 1

Là quan hệ ràng buộc của một đối tượng chỉ có quyền tương tác với một đối tượng khác và ngược lại. Ví dụ như một người chỉ có một số điện thoại:  
![](https://images.viblo.asia/2c088371-cb18-4748-a73d-745dbcf3bce4.png)

Một User chỉ có một Phone. Trong Larvel, ta sử dụng `hasOne` để xác định quan hệ 1 - 1 của một đối tượng lên một đối tượng khác, và để xác định quan hệ ngược lại giữa chúng, ta sử dụng `beLongsTo` :
![](https://images.viblo.asia/db49bbcc-bbd9-468a-b948-6d274a3d6b8a.png)

Như vậy là ta đã xác định được quan hệ 1 - 1 giữa hai đối tượng User và Phone

Và chú ý nếu để xác định quan hệ là 1 - 1 thì tên cả hai phương thức chứa quan hệ phải là số ít

Quan hệ 1 -1 này thường ít được sử dụng do một đối tượng thì ít khi chỉ có quan hệ 1 - 1 với một đối tượng khác.
  
### Quan hệ 1 - n

Là quan hệ ràng buộc mà một đối tượng có quyền tương tác với nhiều đối tượng khác và ngược lại.

Để có thể thiết lập quan hệ này, với đối tượng 1 trong quan hệ ta sẽ đặt nó là `hasMany` :
![](https://images.viblo.asia/4e9ca9d1-eab2-4075-ace6-6466e46bcd23.png)

Như chúng ta thấy, một Post chứa nhiều Comment nên Post sẽ chứa `hasMany` (Chú ý tên phương thức chứa quan hệ nhiều ở đây sẽ là số nhiều)
Ngoài ra như ở quan hệ 1 - 1, ta có thể thiết lập quan hệ ngược lại được :
![](https://images.viblo.asia/bbdc10cd-feb2-44fd-be0e-9e0b464f8bc7.png)

Model Comment ở đây có một phương thức thể hiện cho quan hệ ngược đó, dùng `beLongsTo` để thiết lập

### Quan hệ n - n

Là quan hệ ràng buộc mà nhiều đối tượng có quyền tương tác với nhiều đối tượng khác và ngược lại.
Để có thể thiết lập quan hệ này, ta sẽ sử dụng `belongsToMany` cho cả hai Model tương tác: 
![](https://images.viblo.asia/6d251383-8a8b-4b09-adee-2f8f6e3d80bb.png)

Ở đây model User có quan hệ n - n với Role, nên sẽ thiết lập là `beLongsToMany`. 

Và tương tự như ở  User,  Role cũng có một phương thức để thể hiện cho quan hệ đó :
![](https://images.viblo.asia/535bfc05-bc3b-4d7f-8125-de60048a7369.png)

Ngoài ba quan hệ trên thì trong Laravel còn có thêm một số quan hệ nữa. 
### Quan hệ đa hình

Đúng như tên gọi của quan hệ, đa hình. Việc một đối tượng lúc quan hệ với đối tượng này sẽ thể hiện một kiểu, lúc quan hệ với một đối tượng khác sẽ thể hiện kiểu khác. 

Để ví dụ đơn giản, ta có thể lấy ví dụ như sau:
Có hai đối tượng là Video và Post, cả hai đối tượng này đều có quan hệ với đối tượng Comment, thì quan hệ giữa Video với Comment và Post với Comment ở đây chính là quan hệ đa hình.

Và quan hệ đa hình ở đây cũng có 3 loại: Đa hình 1 - 1, đa hình 1 - n, đa hình n - n.

Chúng không khác gì 3 quan hệ cơ bản ở trên, chỉ khác một điểm quan trọng duy nhất, đó là thay vì liên kết đến nhau thì chúng sẽ liên kết qua một bảng trung gian thứ 2, trong đó cần quan tâm đến nhất là hai cột id(ko phải khóa chính của bảng đó) và type. 

* Cột ID  được Laravel đặt theo định dạng: tên_cột + able_id 
* Cột Type được Laravel đặt theo định dạng: tên_cột + able_type

trong đó cột id đó sẽ chứa khóa chính của các bảng tham chiều đến nó, còn cột type sẽ là kiểu hình thái của bảng ghi đó.

Ví dụ như trên, bảng Post có id = 2 tham chiều đến bảng Comment thì cột commentable_id sẽ có giá trị là 2, còn cột type sẽ có giá trị là tên đường dẫn trỏ đến vị trí của Model Post trong source code.

### Các dạng quan hệ Through

Là các mối quan hệ của một hay nhiều đối tượng khác thông qua một mối quan hệ khác có liên quan đến quan hệ đó.

Ví dụ như quan hệ giữa một công ty với nhiều người, mà mỗi người đó lại có quan hệ với nhiều bài viết, thì có thể công ty đó sẽ có thể có quan hệ với các bài viết đó thông quan những người đó.

Có hai dạng quan hệ trong Through, đó là Has One Through và Has Many Through

#### Has One Through
Được thiết lập thông qua phương thứ `hasOneThrough` với hai tham số là tên class muốn liên kết đến, tham số thứ 2 là tên class được liên kết qua :
![](https://images.viblo.asia/b3eb6d7e-c290-49e5-8585-412ac17c4fb3.png)
#### Has One Through
Được thiết lập thông qua phương thứ `hasManyThrough` với hai tham số là tên class muốn liên kết đến, tham số thứ 2 là tên class được liên kết qua :
![](https://images.viblo.asia/455898aa-0aa8-462e-aa59-26380cb20b43.png)

## Kết luận
Việc sử dụng relationship này ko chỉ giúp ta dễ dàng định hình các quan hệ cho các đối tượng, mà còn giúp chúng ta giảm bớt lượng code khi thao tác với các đối tượng, giúp phát triển sản phẩm một cách đơn giản hơn. Bài viết của tôi xin kết thúc tại đây, cảm ơn bạn đã đọc bài :)

Bài viết tham khảo: https://laravel.com/docs/5.8/eloquent-relationships