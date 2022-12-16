## Giới thiệu.

Xin chào các bạn, trong thời gian code Swift chắc hẳn đã nghe qua mấy khái niệm như memory management, ARC, memory leak, retain cycle. Hôm nay mình sẽ hệ thống lại bọn này nhé :)

Swift sử dụng ARC (Automatic Reference Counting) để theo dõi và quản lý bộ nhớ của App. ARC làm việc một cách *automatic*, ARC giúp chúng ta kiểm soát và giải phóng những object không còn được reference đến nữa, chúng ta không phải ngồi lần mò, kiểm tra chắc chắn xem đã *release* object đó hay chưa vì đã có ARC giúp chúng ta làm điều đó, nhưng chúng ta cần quan tâm tới mối quan hệ giữa các object để tránh *memory leaks*, lý do thì mình giải thích bên dưới nhé.

## Cách hoạt động.

Khi khởi tạo một instance của một class, ARC sẽ cung cấp cho nó một vùng nhớ để lưu thông tin về kiểu và giá trị. Ngoài ra, một instance nếu như lâu không được sử dụng , ARC sẽ giải phóng vùng nhớ của nó để nhường chỗ cho instance khác. Dựa vào số lượng reference đến object đó mà được gán một số được gọi là **reference counting**. Mỗi khi object được reference bởi object khác, số *reference counting* sẽ tăng thêm, và giảm khi nó không còn được reference đến nữa. Một object sẽ được xoá bỏ và trả lại bộ nhớ cho hệ thống khi nó không còn được reference bởi bất kỳ object nào khác, hay *reference counting* bằng 0.

Đến đây thì bạn đã biết được **reference counting** là số lượng reference tới một object, khi *reference counting* bằng 0 thì nó sẽ được tự động giải phóng bộ nhớ (mình không cần phải release, ARC làm cho mình á, ARC làm việc rất tốt đúng không các bạn). Tuy nhiên, nếu như *reference counting* không bao giờ giảm xuống 0 được, thì xảy ra hiện tượng gọi là **retain cycle**, là nguyên nhân dẫn tới *memory leaks*. Ví dụ: giả sử chúng ta có 2 object, các object chúng ta đã không còn sử dụng đến nữa, nhưng chúng vẫn có reference đến nhau, do đó số *reference counting* vẫn khác 0, mà khác 0 thì sẽ không được giải phóng bộ nhớ dẫn đến bị *memory leaks*.

Ví dụ về *retain cycle*:
```
class ObjectA {
    var objectB: ObjectB?
    
    init() {
        print("init A")
    }
    deinit {
        print("deinit A")
    }
}
class ObjectB {
    var objectA: ObjectA?
    
    init() {
        print("init B")
    }
    deinit {
        print("deinit B")
    }
}

// khi khởi tạo 1 object, reference counting là 1
var objectA: ObjectA? = ObjectA() // reference counting của objectA = 1
var objectB: ObjectB? = ObjectB() // reference counting của objectB = 1

objectA?.objectB = objectB // objectA được reference bởi objectB nên reference counting của objectA = 1 + 1 = 2
objectB?.objectA = objectA // objectB được reference bởi objectA nên reference counting của objectB = 1 + 1 = 2

objectA = nil // không sử dụng objectA nữa nên reference counting của objectA = 2 - 1 = 1
objectB = nil // không sử dụng objectB nữa nên reference counting của objectB = 2 - 1 = 1
```

Kết quả in ra như sau:
```
init A
init B
```

Vì cuối cùng số *reference counting* của objectA và objectB đều bằng 1, nên cả 2 object đều không được giải phóng, chúng đang chờ lẫn nhau để giải phóng, nên phương thức *deinit* ở trong 2 class sẽ không được thực thi, đây à hiện tượng *retain cycle*, bộ nhớ không được giải phóng dẫn đến bị *memory leaks*.

## Giải quyết retain cycle.

Nếu chúng ta không chỉ định cụ thể thì mọi reference tới một object khác đều là *strong reference*. Để giải quyết *retain cycle* thì thay vì dùng strong reference, chúng ta sử dụng: *weak* hoặc *unowned*. 

### Weak reference.

Khi sử dụng *weak reference* (tham chiếu yếu) thì số *reference counting* không bị tăng lên. Cách sử dụng là bạn sử dụng từ khóa *weak*  khi khai báo biến. Khi khai báo một biến với từ khóa *weak* thì nó luôn là optional và tham chiếu đến nil khi được deinit. Nó luôn đi cùng từ khoá *var*.

Bây giờ mình thêm từ khóa *weak* vào ví dụ trên như sau:

```
class ObjectA {
   weak var objectB: ObjectB? = nil
   ...
}
```

Chạy lại đoạn code trên, kết quả in ra như sau:

```
init A
init B
deinit B
deinit A
```

Như vậy, khi sử dụng weak reference sẽ giải quyết được vấn đề memory leaks.
### Unowned reference.

Có một cách khác để không làm tăng số reference couting là sử dụng *unowned reference*. Cách sử dụng là bạn sử dụng từ khóa *unowned* khi khai báo biến. Unowned thì không phải là dạng optional, khi object bị dealloc nó sẽ vẫn trỏ tới một vùng nhớ rác nào đó, nên chúng ta phải cẩn thận khi sử dụng *unowned*, tránh dẫn đến crash do object vẫn đang trỏ tới vùng nhớ không hợp lệ. 

Tóm lại, chúng ta sử dụng *weak reference* khi biết rằng object nó tham chiếu tới có thể trở thành nil, trong khi *unowned reference* sử dụng khi chúng ta biết chắc chắn rằng object đó sẽ không bao giờ trở thành nil. Chúng ta sẽ định nghĩa các *weak reference* bằng các biến kiểu optional, có nghĩa là có giá trị hoặc không giá trị và định nghĩa *unowned reference* bằng các biến kiểu non-optional.

Bài viết của mình tới đây là hết, cảm ơn các bạn đã đọc <3