Trong bài viết này, chúng ta sẽ học về declarative pattern, pure function, Immutability and side effects.

### Functional Programming là gì
* Trong ngành khoa học máy tính, functional programming là một mô hình hoặc một kiểu lập trình (một phong cách của việc xây dựng cấu trúc và các thành phần của một chương trình máy tính).
* Functional Programming coi các tính toán như là kết quả của các hàm trong toán học.
* Functional Programming giúp tránh được các thay đổi trạng thái (changeing-state) và thay đổi dữ liệu.
### Các mô hình hay kiểu lập trình lớn khác
* **Procedural Programming**
* **Object Oriented Programming**
* **Meta Programming**
* **Imperative Programming**
* **Declarative Programming**

**Procedural Programming** (Lập trình hướng thủ tục) dựa trên khái niệm của lời gọi thủ tục( procedure call), chỉ đơn giản là bao gồm một loạt các tính toán sẽ được thực hiện. Bất cứ thủ tục nào đã được định nghĩa trước đó đều có thể được gọi tại bất kì thời điểm nào của quá trình thực thi chương trình, bao gồm cả chính nó. Các ngôn ngữ lập trình hướng thủ tục chính gồm: COBOL, BASIC, C, ADA và GO

**Object Oriented Programming**(Lập trình hướng đối tượng) dựa trên khái niệm của các đối tượng(objects), mỗi đối tượng bao gồm dữ liệu (hay còn gọi là thuộc tính) và thủ tục (hay còn gọi là phương thức). Kiểu này gần giống với Functional Programming. Các ngôn ngữ theo phong cách lập trình hướng đối tượng được biết đến như C++, Java, PHP, C#, Python, Ruby, Swift vv...

**Meta Programming**  có khả năng coi các chương trình như là dữ liệu của chúng. Điều đó có nghĩa là một chương trình có thể được thiết kế để đọc, tạo ra, phân tích hay biến đổi các chương trình khác và thậm chí tự sửa đổi trong khi chạy.

### Imperative Pattern vs Declarative Pattern
* **Imperative Pattern** tập trung vào việc miêu tả chương trình thực thi thế nào, một chương trình phần mềm viết theo kiểu imperative chứa những câu lệnh theo kiểu step by step, yêu cầu máy tính thực hiện từng bước để tạo ra kết quả, tức là yêu cầu máy tính phải làm gì.
* **Declarative Pattern** tập trung vào việc yêu cầu máy tính xem mình cần gì mà không cần phải chỉ ra là làm thể nào để có được kết quả đó (nghe hơi khó hiểu nhưng qua ví dụ phía dươí các bạn sẽ hiểu hơn).
* **Functional Programming** theo hướng declarative programming.

```
    const books = [{name:'JavaScript', pages:450}, {name:'Angular', pages:902}, {name:'Node', pages:732}];
    //Imperative Pattern
    for (var i = 0; i < books.length; i++) {
      books[i].lastRead =  new Date();
    }
    //Declarative Pattern
    books.map((book)=> {
      book.lastReadBy = 'me';
      return book;
    });
    console.log(books);
```

Trong ví dụ trên là 2 cách add thuộc tính mới cho các object trong một mảng, cách thứ nhất là nói cho máy tính từng bước làm như thế nào để có thể add thuộc tính mới vào (đầu tiên là dùng vòng lặp for với giới hạn là length của mảng, sau đó với mỗi biến lặp thì thên thuộc tính mới vào object, blah blah...). cách thứ 2 là dùng một phương thức mới của javascript (es6). Trong trường hợp này, code không miêu tả cách máy tính thực hiện chương trình, mà chỉ yêu cầu cái mình cần sau đó máy tính sẽ tìm cách cung cấp cho mình (hiểu nôm na là chỉ quan tâm tới kết quả chứ không phải quá trình).
### Mathematical Function or Pure Function

Trong toán học, một hàm là một mối quan hệ giữa tập các đầu vào và các đầu ra hợp phép với thuộc tính là ứng với mỗi đầu vào có liên quan tới chính xác 1 đầu ra.

Trong lập trình, các kiểu hàm như vậy được gọi là `pure function`, là hàm mà chỉ phủ thuộc vào dữ liệu đầu vào của hàm và không làm thay đổi dữ liệu đầu vào ngoại trừ dữ liệu được trả về.

`Math.random()` không phải là 1 `pure function` vì nó luôn trả về một giá trị mới tại mỗi lần chạy.

`Math.min(1, 2)` là một `pure function`.

### Tại sao lại chọn Functional Programming
* Việc viết `pure function` sẽ giúp tránh thay đổi các biến global, hay biến không nằm trong scope.

* Nó làm giảm sự phức tạp, không cần lo lắng về việc `how it is doing it` mà chỉ tập trung vào việc `what it is doing`.

* Đơn giản hoá việc viết unit test, bởi vì nó không phụ thuộc vào các biến trạng thái của ứng dụng và xác minh kết quả cũng sẽ dễ dàng.

* Nó làm source code dễ đọc hơn => dễ maintain hơn

### Side Effects

Hàm hay biểu thức được gọi là có side efect nếu nó thay đổi một vài state của chương trình, cái mà ngoài phạm vi của hàm hoặc có một tương tác bên ngoài với việc gọi các hàm của nó hoặc chương trình bên ngoài bên cạnh việc trả về các giá trị. Ví dụ: 

```
    let meetup = {name:'JS',isActive:true,members:49};
    const scheduleMeetup = (date, place) => {
      meetup.date = date;
      meetup.place = place;
      if (meetup.members < 50)
        meetup.isActive = false;
    }
    const publishMeetup = () => {
      if (meetup.isActive) {
        meetup.publish = true;
      }
    }
    scheduleMeetup('today','Bnagalore');
    publishMeetup();
    console.log(meetup);
```

Đoạn code trên có một `side effect` bởi vì mục đích thực tế của hàm `scheduleMeetup` là thêm *date* và *place* của object `meetup` nhưng nó sửa giá trị của thuộc tính *isActive*. Trong các project lớn, việc debug các *side effect* thực sự khá mệt mỏi và khó khăn, side effects không phải luôn xấu nhưng chúng ta nên cẩn trọng khi handle nó.

### Immutability (Sự bất biến)

Immutability là một điều quan trọng để đảm bảo rằng 1 function không thay đổi biến đầu vào gốc mà thay vào đó nên trả về 1 bản copy mới của biến sau khi thao tác với biến.

Giống như các array và object được truyền cho các hàm khác nhau và chúng ta không duy trì sự bất biến của chúng, sau đó các hàm có thể không nhận được giá trị gốc của các array hay object nữa (giống kiểu nhiều ông sửa 1 file xong push code lên sau đó conflict các kiểu).

Điều này làm cho việc debug thực sự khó khăn khi vậy nên hãy cẩn trọng khi sử dụng nó.

#### các thư viện hỗ trợ Immutable
Javascript mặc định không hỗ trợ việc `immutable` của object và array. Có một vài thư viện hỗ trợ việc này: 

* Seamless-immutable

* Immutable JS

### Kết luận

Các khía cạnh chính của Functional Programming là Pure và chia thành các function nhỏ, Immutability và ít các side effect hơn.