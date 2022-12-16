![image.png](https://images.viblo.asia/8ffa6c12-ba51-4db5-9576-087236ca2291.png)
Các class giống như việc xây dựng các kiểu dữ liệu phức tạp, có nghĩa là nó chứa nhiều kiểu dữ liệu. Các class trông tương tự như một struct, nhưng có một vài điểm khác nhau. Không có phương thức init() tự động, bạn cần phải tự khai báo. Trong các class, nếu bạn tạo một bản sao của instance và bạn cố gắng thay đổi giá trị, thì giá trị của đối tượng gốc cũng sẽ bị thay đổi. Instance của class được gọi là một object.

### Khởi tạo một đối tượng

![image.png](https://images.viblo.asia/2fda7b21-cad6-4c85-823a-d21d13fd81d6.png)

Các biến được khai báo bên trong các class được gọi là property và các function bên trong một class được gọi là method. Nếu chúng ta khởi tạo class của mình như một struct, Swift sẽ không cho phép chúng ta biên dịch code của mình. Trong struct, nó tự động init các property nhưng trong các class, bạn cần tự tạo init() của riêng mình.

Để làm điều này, tạo một method bên trong class và gọi nó là init().

![image.png](https://images.viblo.asia/a4e08991-5414-464f-8620-40727b581eac.png)

Bạn cần lưu ý rằng trước phương thức init (), không viết func vì init () này là đặc biệt. Chúng ta đang truyền cùng một tên thuộc tính trong phương thức init () nên bạn cần sử dụng self. để làm cho có ý nghĩa hơn rằng chúng ta đang gán những giá trị đó cho thuộc tính bên trong các class. Việc tạo các instances của class đó trông giống như struct:

![image.png](https://images.viblo.asia/94453c82-c089-4fd7-b7bc-641128c26f2f.png)

### Kế thừa Class

Một class dựa trên một class hiện có kế thừa tất cả các thuộc tính và phương thức của nó và thêm một đoạn code lên trên các phương thức được kế thừa được gọi là Kế thừa class. Class bạn kế thừa được gọi là parent class hoặc superclass và class mới được gọi là child class. Dấu hai chấm giữa class có nghĩa là class Employee mở rộng class Person.

![image.png](https://images.viblo.asia/3ee22c9b-dfdb-43db-8521-254bc27cba1a.png)

Ở đây, chúng ta đang tạo một class Employee mới và chúng ta đang kế thừa tất cả các thuộc tính và phương thức của Person. \
Chúng ta cũng có thể cung cấp cho Employee trình khởi tạo của riêng chúng ta như thế này

![image.png](https://images.viblo.asia/8a6e4f84-6378-4bfc-b90b-91a3af32f238.png)

Swift luôn cho phép bạn super.init () vì một số công việc quan trọng phải được thực hiện khi parent class được khởi tạo.

### Function Overriding

Tôi đã tạo một hàm aboutMe () trong parent class, tức là trong class Person:

![image.png](https://images.viblo.asia/209fc3dd-b0e7-49bf-b9ef-331c3e715bbc.png)

Trong Swift nếu bạn muốn sử dụng cùng một phương thức trong child class tồn tại trong parent class thì bạn nên biết về từ khóa: override. Điều này sẽ giúp bạn thực thi hàm parent class cũng như hàm child class nếu bạn sử dụng super.

![image.png](https://images.viblo.asia/98ee08b9-7f5f-465a-a98e-82dd83ea65bb.png)

Nếu bạn sử dụng super.aboutMe () trong child class thì nó sẽ thực thi hàm parent class và sau đó nó sẽ thực thi hàm child class.

![image.png](https://images.viblo.asia/b4fbcd9b-5e57-4322-b1e3-3fa3e70fa205.png)

Ở đây bạn có thể thấy hàm parent class được thực thi đầu tiên và sau đó hàm child class được thực thi.

![image.png](https://images.viblo.asia/d8ed8425-1a57-4d74-8543-b5cbe1afdd4b.png)

Ở đây super.aboutMe () được viết ở cuối hàm, đó là lý do tại sao hàm child class được thực thi trước rồi mới đến parent class.

![image.png](https://images.viblo.asia/f0a03de7-1f50-43d4-98a8-0832b27ce6af.png)

Ở đây tôi đã loại bỏ hàm super.aboutMe (), đó là lý do tại sao hàm parent class không được thực thi ở đây.

### Final Classes

Đôi khi bạn muốn không cho phép các nhà phát triển xây dựng class của riêng họ dựa trên class của bạn, vì vậy trong trường hợp đó, bạn có thể sử dụng từ khóa final trước class của mình để không nhà phát triển nào khác có thể thay đổi hành vi của class của bạn.

![image.png](https://images.viblo.asia/4691c37d-8c52-4d55-9ee8-3a4e8bc5fbe1.png)

Trong trường hợp của chúng ta, tôi đã thêm keywoard final trước Person. Nó tạo ra một lỗi trong class Employee vì chúng ta không thể kế thừa class Person.

### Copying Objects

Trong class, nếu bạn sao chép một object thì cả object gốc và object trùng lặp đều trỏ đến cùng một giá trị có nghĩa là nếu bạn thay đổi giá trị của object gốc thì giá trị object trùng lặp cũng thay đổi theo.

![image.png](https://images.viblo.asia/5d6f84e7-18ab-4b10-b7ee-b8d7d773fb5c.png)

Vì vậy, bây giờ tôi đang cố gắng thay đổi giá trị của giá trị Employee ban đầu, hãy xem điều gì sẽ xảy ra.

![image.png](https://images.viblo.asia/50892515-6325-48dd-97e2-8e84ab5d134b.png)

Ở đây bạn có thể thấy rõ tôi đã thay Employee name ban đầu, tức là emp1 từ “Joy” thành “Agnel Selvan”. Giá trị cũng bị thay đổi trong emp1Copy, điều này là do cả hai object đều trỏ đến cùng một vị trí trong bộ nhớ.

### Deinitializers in Classes

Bạn có thể chạy code khi instance của class bị hủy, nó được gọi là Deinitializers. Bạn cần viết code khi instance của class bị hủy bên trong deinit.

![image.png](https://images.viblo.asia/b9f051af-c008-4a1e-8065-d2b8dff00bb7.png)

Hãy minh họa bằng một ví dụ bằng cách tạo một vòng lặp Employee để instance Employee mới sẽ được tạo và sau đó bị hủy.

![image.png](https://images.viblo.asia/5d436c27-3449-4988-a058-3c27cbad368f.png)

### Mutability

Nếu bạn có một class hằng với thuộc tính biến, thuộc tính đó có thể được thay đổi. Bởi vì các class này không cần từ khóa mutating.

![image.png](https://images.viblo.asia/4ad92028-89c8-4f14-b4ac-25c95f548e53.png)

Nếu bạn muốn tránh thay đổi giá trị thuộc tính của biến thì bạn cần phải làm cho biến đó không đổi bằng cách thêm từ khóa let. Như thế này

![image.png](https://images.viblo.asia/ba614a62-e982-4d22-ab0e-7c75875c1df0.png)

nguồn tham khảo: [More about classes in Swift](https://agnelselvan007.medium.com/more-about-classes-in-swift-f0a87e2570ed)