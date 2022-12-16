Dịch: https://hackernoon.com/refactor-your-php-legacy-code-real-projects-examples-da9edf03ff4b

![](https://images.viblo.asia/f1f6d59e-216d-44a1-a80f-f2ed11144b5a.png)

Lập trình viên giỏi được định nghĩa bằng chất lượng mỗi dòng code mà họ viết ra. Trong ngành công nghiệp phần mềm, viết code đẹp bằng với tiết kiệm tiền bạc mà có thể dùng để đầu tư cho việc test, cập nhật, mở rộng hoặc fix bug. Trong bài viết này, tôi sẽ giới thiệu cho bạn một vài kỹ thuật thực tế và ý thưởng giúp bạn refactor code. Những kỹ thuật này không chỉ giúp bạn refactor code cũ, mà còn cho bạn những ý tưởng để viết code pro sau này.

### Refactoring là gì và tại sao ta cần nó?
Refactoring là  thuật ngữ để chỉ những kỹ thuật và phương cách giúp bạn viết được những dòng code rõ ràng rành mạch. Điều này là rất quan trọng với những developer khác, những người mà sau này sẽ đọc, mở rộng hoặc tại sử dụng những dòng code đó mà không cần phải chỉnh sửa quá nhiều (nôm na là mấy ông maintain).

### Không refactor khi chưa viết test
Lời khuyên đầu tiên của tôi là đừng bao giờ refactor khi chưa có unit test. Lý do rất hiển nhiên: Bạn sẽ tạo ra một đống chức năng lỗi rất khó fix bởi vì chính bạn cũng không biết đoạn nào đang lỗi cả. Bởi thees, nếu bạn cần refactor, hãy viết test trước, và chắc chắn là đoạn code bạn đang refactor được cover bởi test ([PHPUnit code coverage analysis](https://phpunit.readthedocs.io/en/7.1/code-coverage-analysis.html))

### Refactor từ điểm sâu nhất trong code
Hơi khó hiểu thì hãy xem ảnh dưới. Đây là một dự án thực tế về hệ thống quản lý khách sạn mà tôi tìm thấy trên Github. 

![](https://images.viblo.asia/8c2228c4-77ad-4ccd-92e2-43ec5c781059.png)

Như bạn thấy đấy, có 3 cấp độ được đánh dấu đỏ. Điểm sâu nhất là câu lệnh if/else nằm trong điều kiện if đầu tiên của function `add`. Thông thường, điểm sâu nhất này sẽ chỉ tập trung vào một logic đơn giản, nên sẽ dễ để refactor.

### Chia nhỏ function hoặc vào file config/database table
Trong trường hợp trên, ta có thể tách nó vào một hàm private như sau:

![](https://images.viblo.asia/db225b0a-ed66-4422-b86a-0ca8a3393efa.png)

Khi đó, điểm sâu nhất sẽ lấy data và load view. Hãy xem lại function `add()` sau khi refactor. Nó trông gọn gàng, dễ đọc và dễ test hơn.

![](https://images.viblo.asia/2c3c88ce-e3d8-4749-b40d-2c7c78c11886.png)

### Luôn dùng {} trong câu lệnh if
Hầu hết ngôn ngữ lập trình hỗ trợ câu lệnh if với 1 dòng lệnh, và một số developer thường dùng nó vì nó gọn và đơn giản. Tuy nhiên, nó không dễ đọc và dễ gây phiền phức.

![](https://images.viblo.asia/3070eacf-6f63-4bc0-a8be-c0dd5e0ffdd6.png)

### Đừng dùng magic number hoặc magic string
Ở ví dụ dưới, nếu có hơn 250 phòng thì nó sẽ trả về thông báo lỗi. Trong trường hợp này, 250 có thể xem như một *magic number*. Nếu bạn không phải developer viết đoạn code này thì sẽ khó mà biết được 250 biểu thị cho cái gì.

![](https://images.viblo.asia/3eb27c39-4fd7-44f4-a636-8eef902586d1.png)

Để refactor function này, ta có thể thấy là 250 là số phòng tối đa. Bởi vậy, thay vì fix cứng nó, ta có thể tách nó vào biến `$maxAvailableRooms`, giờ thì trông dễ hiểu hơn rồi.

![](https://images.viblo.asia/4f563169-ff57-47d2-bd2a-d8228fd76058.png)

### Không dùng câu lệnh *else* nếu không cần thiết
Trong hàm *availablerooms()* ta thấy câu lệnh if, ở đây ta có thể dễ dàng bỏ phần *else* đi mà logic vẫn không thay đổi

![](https://images.viblo.asia/ecf729f1-ff2c-4913-8ac2-74edb78a35e2.png)

(Note: quy tắc này tương tự việc *return* sớm khi có thể, càng *return* sớm thì bạn càng dễ bỏ *else*)

### Đặt tên biến, hàm có ý nghĩa
Ở ví dụ dưới , bạn thấy có 2 function từ hệ thống quản lý khách sạn được gọi là *index()* và *room_m()*. Bản thân tôi không thể hiểu được mục đích của chúng là gì. Tôi nghĩ nếu tên của chúng có ý nghĩa một chút thì chắc sẽ dễ hiểu hơn.

![](https://images.viblo.asia/def2bb18-f95b-4a4c-9212-86a45f479b67.png)

### Tận dụng tối đa ngôn ngữ lập trình đang dùng
Nhiều developer không tận dụng hết tôi đa ngôn ngữ lập trình họ đang sử dụng. Nhiều chức năng có thể tiết kiệm cho bạn rất nhiều *effort* và giúp code bạn trông mạnh hơn. Hãy xem ví dụ sau và để ý cách đạt được cùng một kết quả chỉ với ít dòng code hơn bằng *type hinting*

![](https://images.viblo.asia/405b7232-b1a4-4334-aba9-28647e6a0bdd.png)

![](https://images.viblo.asia/244fb6d9-30d6-4388-b291-1e13d4be95d6.png)

Tôi sẽ kết thúc bài viết với một vài mẹo nhỏ để viết code đẹp hơn:
- Dùng kiểu array mới `[]` thay vì `array()`
- Dùng `===` thay vì `==` trừ khi việc check kiểu dữ liệu là không cần thiết
- Phương thức *public* thì nên đặt tên gọn và có nghĩa, còn các hàm *private* thì có thể có tên dài cũng được, vì chúng có phạm vi sử dụng giới hạn
- Chỉ dùng những tên thông dụng như *add()* khi đặt tên cho hàm của *interface*, còn nếu là phương thức của *class* thì nên dùng *addUser()* hoặc *addDocument()*
- Xóa những phương thức không dùng đến
- Sử dụng prefix *is/has* với hàm trả về *boolean*, chẳng hạn *isAdmin($user)*, *hasPermission($user)*
- Luôn sử dụng *access modifier* với hàm hoặc biến trong class (*public*, *protected*, *private*)
- Các hàm public nên đặt phía trên cùng của class
- Luôn áp dụng khái niệm *Single Responsibility* vào class