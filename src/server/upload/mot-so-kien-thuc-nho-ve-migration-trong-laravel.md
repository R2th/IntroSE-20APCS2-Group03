> Chắc hẳn những dev gà mờ mới làm quen với laravel sẽ gặp một từ khóa: Migration. Mà ko chỉ có framwork Laravel mới gặp từ khóa này mà ở nhiều framework khác chắc chắn cũng sẽ gặp từ khóa này. Vậy đó là gì ? Tác dụng và cách sử dụng nó ra sao?  Bài viết này sẽ giúp bạn phần nào hiểu rõ hơn về cái từ khóa này và những công năng thần kì mà nó mang lại, mình sẽ sử dụng Laravel để làm ví dụ cho bài viết này. Vì văn vẻ ko hay nên mình sẽ đi thằng vào vấn đề chính ngay =)) 


-----

### 1. Migration là gì ?

Migration là các file giúp quản lý các phiên bản database, giúp ta chính sửa và quản lý database của mình dễ dàng hơn, thay vì phải tự chỉnh sửa lại trong database. Nó đặc biệt hữu dụng khi làm việc nhóm. Nếu như bạn có một sự chỉnh sửa nào đó trong database mà bạn muốn các teamate của mình cũng có sự thay đổi đó, chẳng lẽ bạn lại kêu họ cũng sửa lại database bằng tay như mình, hoặc bạn export cả cái database của mình ra sau đó đưa cho họ để họ import và máy họ :confused: như thế thì có vẻ ko hay. Nhưng với migration, bạn chỉ cần tạo một file migration và đưa cho họ file đó để họ run, và thế là chúng ta đã đồng bộ hóa database cho team

   Nghe có vẻ hợp lý !
    
### 2. Cách sử dụng
Đầu tiên, toàn bộ các file migration đều nằm trong thư mục your_project/database/migrations
<br><br>
Trước khi tìm hiểu về cách sử dụng thì chúng ta cần một file migration. Và các nhanh nhất là sử dụng artisan của laravel giúp tự động tạo migration

> `php artisan make:migration action_name_table`
> 
trong đó: action là tên hành động mà bạn muốn thực hiên (create, update, delete, ...) , name là tên bảng bị tác động **(chú ý tên bảng phải là số nhiều)**

![](https://images.viblo.asia/c9665059-7449-431f-a461-bb1e5dc8951e.png)

Như hình trên mình đã tạo ra bảng **roles** chỉ với cú pháp :
> ` php artisan make:migration create_roles_table`





-----



`Có khá nhiều kiểu định dạng kiểu dữ liệu trong migration phù hợp với database, một số kiểu cơ bản như `

| Command | Description |
| -------- | -------- |
| $table->date('created_at');     | Kiểu ngày tháng |
| $table->string('name', 100);     | Kiểu kí tự |
| $table->unsignedInteger('votes');     | Kiểu số nguyên dương |
| $table->float('amount', 8, 2);    | Kiểu số thực |



-----

 
Và tất nhiêu, trong ví dụ về bảng roles ở trên thì ko thể chỉ có column Id thế kia,  ta cần tạo thêm một số cột cho bảng, ta sẽ cho thêm cột `name` vào bảng bằng cách thêm `$table->string('name');` 

![](https://images.viblo.asia/7a529eca-62f0-4521-a9ff-ad3b43a36fde.png)

Sau đó chạy câu lệnh trong terminal để việc migrate được thực hiện
> `php artisan migrate`
> 
Nếu các bạn chạy lệnh php artisan migrate mà bị lỗi "class not found" thì hãy thử thực thi câu lệnh này: `composer dump-autoload` trước rồi lại migrate như bình thường nhé
<br><br>

Bây giờ vào lại database xem thì ta thấy sẽ có bảng roles và uses =)) Vì khi tạo ra project, migration tạo bảng users đã có sẵn nên bạn đừng ngạc nhiên nhé. Ngoài ra chúng ta còn thấy có thêm bảng migrations, bảng này chúng ta sẽ tìm hiểu sau.

Ngoài tác dụng giúp chúng ta tạo ra cấu trúc của các bảng, migration còn giúp ta tạo ra các ràng buộc, các liên kết ngoại, các index, nói chung là gần như có thể làm tất cả các công việc liên quan đến thao tác với cấu trúc database.<br>
#### Một số ràng buộc trong migration hỗ trợ: 
* nullable() (cho phép null)
* unique() (ràng buộc duy nhât)
* default() (giá trị mặc định)
* unsigned() (phải là số nguyên)
* autoIncrement() (giá trị tự tăng)
<br><br>
#### Khóa ngoại trong migration

Ta sẽ làm ví dụ với bảng users và bảng roles, mình sẽ giả định rằng liên kết giữa hai bảng là liên kết 1 role - nhiều user cho dễ làm nhé.

Thường chúng ta sẽ liên kết khóa ngoai qua khóa chính (thường là cột Id) của bảng cha, ở đây bảng cha chính là bảng 1 - bảng role, vì cột Id đã tự động được sinh ra khi ra viết đúng cú pháp tạo migration nên ta sẽ ko cần tạo nữa.
Tiếp theo ta sẽ tạo một cột để dùng làm khóa ngoại, và cú pháp đặt tên cột khóa ngoại đó là **tên bảng cha số ít_id** và kiểu dữ liệu của nó phải là unsignedInteger nếu như bạn liên kết vào cột Id của bảng cha

![](https://images.viblo.asia/65040c7c-d7b9-4136-9494-2503c7fc197e.png)

Ở đây bảng users là bảng con, roles là bảng cha nên sẽ tạo cột côt khóa ngoại có tên là role_id.

Bạn nên chú ý cách đặt tên này vì nếu ko sau khi vào code nó sẽ ko nhận đúng tên cột. Và chúng ta cũng nên đặt ràng buộc nullable cho cột này để sau này đỡ sinh ra lỗi khi insert =))

-----

Tiếp theo ta sẽ tìm hiểu kĩ hơn vào chi tiết của file migration

#### File migration

Nhìn sơ lược qua có thể thấy nó có hai function chính là up() và down()
<br><br>
##### Hàm up()

Khi bạn thực hiện chạy `php artisan migrate` thì hàm up được gọi ra, nó sẽ run tất cả cá câu lệnh bên trong đó để execute. Và nó sẽ liên quan đến bảng migrate mà chúng ta vừa nói ở trên khi tạo ra project, cụ thể hơn là cột batch của bảng.
Khi mở bảng migrations này ra, ta có thể nhin thấy trong bảng có cột id, migration - lưu tên file migration, và cột batch - lưu sô lần chạy lệnh migrate mà file đó được thực hiện. 

Để có thể hình dung dễ dàng hơn, ta sẽ lấy lại ví dụ với bảng roles, khi tạo hai bảng này bình thường thì batch của hai file này sẽ là 1, nhưng khi chúng ta thay đổi file tạo bảng roles, sau đó chạy lại migrate thì nó sẽ tằng batch này lên 1, cứ thế con số batch này sẽ tăng lên mỗi khi ta sửa file migration và chạy lại migrate. 
<br><br>
##### Hàm down()

Hàm này ngược lại so với hàm up(), nếu như hàm up() tạo ra bảng users thì hàm down này sẽ xóa bảng users. Hiểu một cách đơn giản, hàm up làm gì thì hàm down này sẽ làm ngược lại hết. 
Để thực hiện việc rollback này, ta chỉ cần dùng `php artisan migrate:rollback`

Với việc dùng migrate:rollback ta có thể kiểm soát việc rollback về batch nào bằng việc dùng `php artisan migrate:rollback --step=5` với 5 là số batch muốn rollback lại

Còn nếu muốn mạnh hơn nữa thì ta có thể dùng `php artisan migrate:reset`  :joy:  , nó sẽ rollback toàn bộ migration, tức là chạy lại toàn bộ hàm down() của cá file migration

Và một câu hỏi sẽ được đặt ra: **Hàm down có tác dụng gì ?** 

Chúng ta tưởng tượng, khi tạo ra một file để drop khóa ngoại viết ở hàm up() , chạy migrate, ok drop được khóa ngoại, nhưng khi một file khác trước đó sửa mà cần đến khóa ngoại đó ở hàm up() thì sao. Chúng sẽ xảy ra lỗi ko tìm thấy khóa ngoại đó để mà liên kết.
<br><br>
##### Vì vậy cần có hàm down() này để rollback lại các việc mình đã làm ở hàm up(), nó giống như một bản sao lưu trước khi mình chạy hàm up(), lúc nào cần thì dùng. 

Và chia sẻ cho bạn một bí kíp khi bạn quá chán khi phải chỉnh down và up loạn hết lên:

> **`php artisan migrate:refresh`** 

Nó sẽ drop toàn bộ các bảng đi và chạy lại các hàm up() của các file migration. Nhưng cách này có một nhược điểm là nó sẽ làm mất đi dữ liệu của ban =)) nên hãy cân nhắc khi dùng nó, trừ khi bạn đang vào đường cùng =))
<br><br>

Trên đây là một số chia sẽ ít ỏi mà mình tích lũy được khi làm project, hi vọng sẽ giúp được các bạn gà mờ mới tìm hiểu về Laravel cũng như migration sáng tỏ chút. 

##### Chúc các bạn code vui vẻ :)))

-----