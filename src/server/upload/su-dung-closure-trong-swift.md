# Mở đầu : 
Trong lập trình IOS, chúng ta đã rất quen thuộc với khái niệm closures trong swift và block trong Objective C. Mọi người sử dụng chúng rất thường xuyên trong code của mình tuy nhiên không phải ai cũng hiểu tường tận về chúng.
Còn rất nhiều vấn đề cần phải bàn luận, vì thế bài viết này mình sẽ đi vào phân tích một số khía cạnh khi sử dụng closure.


## I . Khái niệm.

**Closure là gì ?**

Về khái niệm thì các bạn có thể tham khảo trong page [THE SWIFT PROGRAMMING LANGUAGE](https://docs.swift.org/swift-book/LanguageGuide/Closures.html) .  Hiểu một cách đơn giản thì nó là một cấu trúc code đặc biệt được bao đóng giữa hai dấu ngoặc nhọn { }, nó có thể dùng độc lập như một hàm số bình thường hoặc trở thành một tham số cho một hàm số. Cụ thể như thế nào thì bạn sẽ thấy rõ ở phía dưới đây.

Về cú pháp cũng rất đơn giản, một đoạn code được đóng kín trong dấu ngoặc nhọn { } như mình nói phía trên.

>     { (parameters) -> return_type in
>          statements
>      }

- **parameters** : là các tham số truyền vào
- **return_type** : là kiểu trả về
- **in** : là từ khoá mặc định ngăn cách giữa kiểu trả về và đoạn code xử lý logic phía dưới
- **statements** : đây là vị trí các đoạn code xử lý logic, và cuối cùng sẽ return về giá trị mà bạn định nghĩa .


Chúng ta thường nhìn thấy dạng trên ở phía đuôi của closure, nhiều khi chúng ta chỉ muốn khai báo mà chưa muốn viết đoạn code xử lý logic, chúng ta có thể khai báo phần đầu như sau :

>     var closure_name: ((parameters) -> return_type )?

- **var** : vì ở đây chỉ là khai báo nên chúng ta sử dụng var để có thể khởi tạo sau, bạn có thể dùng let nếu khởi tạo luôn 
- **parameters** : là các tham số truyền vào
- **return_type** : là kiểu trả về
- **?** : đơn giản là mình chọn kiểu optional như một biến option thông thường.

Túm lại để cho dễ hiểu hãy nhìn ví dụ này :

>      let closure = { (param1: String, param2: Int) -> String in
>         let result = "Đây là ví dụ về closure, gồm có 2 tham số \(param1) và \(param2), kiểu trả về là 1 string"
>         return result
>      }
>
>       print(closure("Hello", 1))
>

> Kết quả trả về :     
>        Đây là ví dụ về closure, gồm có 2 tham số Hello và 1, kiểu trả về là 1 string


Trong ví dụ trên, mình khởi tạo 1 closure gồm có 2 tham số là param1 và param2, và nó sẽ trả về kết quả là 1 String. Để sử dụng thì rất đơn giản chỉ cần gọi như một hàm bình thường.

Chúng ta dễ dàng thấy, closure có một dạng đặc biệt :
- Đầu có dạng biến số (1)
- Đuôi có dạng hàm số có tham số truyển vào và có giá trị trả về. (2)

Nếu chỉ có (2) thì closure chẳng khác gì hàm số, tuy nhiên chính bởi tính chất (1) mà closure có thể sử dụng để truyền như một tham số trong hàm số.

## II. Cách sử dụng.

Mình sẽ hướng dẫn các bạn 3 cách sử dụng rất thông dụng của closure.
### 1. Sử dụng như một hàm số :

Giờ mình sẽ tạo một class tên là Student, class này có một closure là studentName với 2 tham số truyền vào là classId và studentId và trả về kết qủa là tên của student đó.

>     class Student {
>        var studentName: ((String, Int) -> String) = { (classId: String, studentId: Int) -> String in
>           return "Nguyễn Văn A"
>        }
 
 Okay, phía trên là cách viết đầy đủ của mình, thật ra khi viết code ít ai viết như thế vì nó rất dài, có 2 cách viết ngắn gọn hay dùng như sau :
 
 >     class Student {
>        var studentName = { (classId: String, studentId: Int) -> String in
>           return "Nguyễn Văn A"
>        }

hoặc

>     class Student {
>        var studentName: ((String, Int) -> String) = { (classId, studentId) in
>            return "Nguyễn Văn A"
>        }

Done, cả 3 cách đều như nhau, bạn dùng cách nào cũng được, tuy nhiên nhớ rằng khi sử dụng cách viết đầy đủ thì việc để tham số ở cả 2 phía đều phải giống nhau, như trong ví dụ các bạn có thể thấy tham số đều là (String, Int).

Về cách dùng thì rất đơn giản :

>     let student = Student()
>      print(student.studentName("classA", 1))
>      

> Kết quả trả về :     
>        Nguyễn Văn A

### 2. Sử dụng với cơ chế callback như delegate.

Đấy là một trong những tính chất đặc biệt của closure như mình đã nói ở phần khái niệm, đó là vì closure được khai báo như một biến số.

>     class Student {
>        var speak: ((String) -> Void)? //1
>        func thinkingAboutYourTeacher() { //2
>            DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
>            self.speak?("Teacher is always right")
>            }
>        }
>        
>      let student = Student()  //3
>      student.speak = { thinking in   //4
>         print("Students say that : \(thinking)")
>      }
>      student.thinkingAboutYourTeacher() //5
>      

Đoạn code trên mình viết tiếp class Student :
- (1) Khai báo 1 closure để check việc student nói những gì.
- (2) Viết hàm **thinkingAboutYourTeacher** để hỏi học sinh nghĩ gì về giáo viên của họ, sau khi nghĩ 2s sẽ đưa ra câu trả lời,lúc này closure đóng vai trò callback bằng cách gọi hàm speak và truyền vào tham số là một String.
- (3) Khởi tạo đối tượng **student**
- (4) Thực hiện implement **speak** để lắng nghe callBack từ student
- (5) Cuối cùng gọi hàm **thinkingAboutYourTeacher**

> Kết quả thu được là :
> Students say that :  Teacher is always right
> 

Done, vậy là mình hướng dẫn xong các bạn cách sử dụng thứ 2, trong cách sử dụng này mình chỉ lưu ý một chút như sau :

- Thứ nhất tại sao mình sử dụng optional khi kháo bảo **speak** ? Bạn hoàn toàn có thể sử dụng unwrapped optional tuy nhiên, trong trường hợp này, nếu không implement **speak** mà vẫn gọi hàm **thinkingAboutYourTeacher** thì sẽ bị crash do speak = nil.
- Thứ hai, bạn nên chú ý implement closure luôn phải thực hiện trước khi hàm callBack được gọi. Như ở trong ví dụ này là implement **speak** trước khi gọi hàm **thinkingAboutYourTeacher**. Tại sao như vậy, vì nếu làm ngược lại thì khi callBack được thưc hiện thì closure = nil và không có gì được gọi ở đây cả.

### 3. Sử dụng như một tham số trong hàm số.

Đây là cách mà mọi người vẫn rất hay sử dụng để viết API, hay muốn thực hiện một chức năng nhưng phải chờ kết quả từ một chức năng khác.

>     class Teacher {
>        var name: String
>        init(name: String) {
>           self.name = name
>        }
>     }
>     
>     class Student {
>        func thinkingAboutYourTeacher(name: String, completion: @escaping (String) -> Void) {
>             DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
>                  completion("is a good Teacher")
>             }
>         }
>     }
>
>     let student = Student() 
>     let teacher = Teacher(name: "Bob")
>     student.thinkingAboutYourTeacher(name: teacher.name) { (thinking) in 
>        print("\(teacher.name) \(thinking)")
>     }

> Kểt quả thu được là : Bob is a good Teacher

Vẫn là class Student, lần này hàm **thinkingAboutYourTeacher** có sự thay đổi so với cách thứ 2, closure không khai báo bên ngoài như một biến số nữa mà sẽ được khai báo luôn là một tham số của hàm.

So sánh về 2 cách dùng này chúng ta có thể thấy sự khác biệt chỉ đến từ cách dùng, còn về cơ chế sử dụng vẫn chỉ là một. 
- Ở cách sử dụng thứ 2, **speak** có thể được gọi đi gọi lại ở nhiều hàm khác nhau, ở bất cứ chỗ nào chỉ cần học sinh nói thì chúng ta sẽ lắng nghe được.
- Ở cách dùng thứ 3, closure chỉ được truyền trong hàm vì thế chỉ có hàm này mới được sử dụng, kết thúc hàm thì closure cũng kết thúc. 
> Hiểu đơn giản thì Closure ở cách thứ 2 là biến toàn cục, có phạm vi class, còn closure ở cách thứ 3 là biến cục bộ có phạm vi trong hàm.

## III. Quản lý memory khi sử dụng closure.

Một trong những vấn đề mà chúng ta cần phải cẩn thận và chú ý nhất khi sử dụng closure đó chính là vấn đề memory leak.

Chúng ta sẽ đi vào một số ví dụ để hiểu rõ hơn về closure.

Vẫn từ ví dụ nêu ra ở mục ii.3 mình sẽ thay đổi code một chút. Mình sẽ đưa đoan code vào trong 1 hàm **askStudentAboutHisTeacher**:

>     func askStudentAboutHisTeacher() {
>        let teacher = Teacher(name: "Bob") //1
>        student.thinkingAboutYourTeacher(name: teacher.name) { (thinking) in //2
>           print("\(teacher.name) \(thinking)")
>        }
>        print("finish askStudentAboutHisTeacher") //3
>     }
>     
>     askStudentAboutHisTeacher() 

Kêt quả thu được là :
>     finish askStudentAboutHisTeacher
>      Bob is a good Teacher

Rõ ràng là trong hàm askStudentAboutHisTeacher sẽ gọi theo thứ tự 1-2-3, theo logic khi 3 đã được gọi thì đối tượng **teacher** cũng phải tự giải phóng, tuy nhiên sau 2s khi closure kết thúc nó vẫn còn gía trị. Điều này có vẻ phi lý ???. 

Chúng ta sẽ làm tiếp một thí nghiệm nữa.
Ở đây mình sẽ sửa một tẹo bằng cách sử dụng [weak teacher] :
>        student.thinkingAboutYourTeacher(name: teacher.name) { [weak teacher] (thinking) in //2
>           print("\(teacher?.name) \(thinking)")
>        }
>        

 và kết quả trả về là :
 
>     finish askStudentAboutHisTeacher
>      nil is a good Teacher

Okay như thế này mới đúng logic chứ.

Vậy nguyên nhân là tại sao lai có sự bất thường ở trong ví dụ thứ nhất ??

Đó chính là khả năng **Capturing Values** của closure, mặc định nếu chúng ta không sử dụng weak hoăc unowned cho biến số bên ngoài khối closure thì closure sẽ tạo một strong reference đến biến số đó và chỉ giải phóng khi closure kết thúc.

Đây là một tính năng đảm bảo cho dữ liệu luôn nguyên vẹn khi closure sử dụng, nó giống như tạo một vòng bảo vệ để đảm bảo mọi dữ liệu bên trong khối code của nó, gỉa sử không có tính năng này, rất có thể xảy ra tình trạng crash khi closure dùng đến mà dữ liêu đã bị giải phóng.

Cũng chính bởi tính năng này mà chúng ta luôn phải cẩn thận để tránh rơi vào trường hợp bị memory leak. Hãy xem ví dụ dưới đây.

>     class SchoolViewController: UIViewController {
>     
>        let student = Student() // 1
>        
>        override func viewDidLoad() {
>            super.viewDidLoad()
>            student.speak = { thinking in //2
>                self.showThinking(thinking)
>            }
>        }
>         
>        private func showThinking(_ thinking: String) { //3
>            print("\(thinking)")
>        }
>
>        @IBAction func doTask(_ sender: Any) { //4
>            student.thinkingAboutYourTeacher()
>        }
>        
 >        @IBAction func backToParent(_ sender: Any) { //5
>            self.navigationController?.popViewController(animated: true)
>        }
>
>        deinit { //6
>           print("SchoolViewController deinit")
>        }
>     }
>     

- Ở đây mình viết môt viewcontroller là **SchoolViewController** có 2 button với 2 action là **doTask** (3) làm nhiệm vụ gọi hàm **thinkingAboutYourTeacher** và action **backToParent**(4) để pop về viewcontroller cha của SchoolViewController.Số (2) là thực hiện việc implement **speak** của **Student**, số (6) là hàm deinit, nếu SchoolViewController được giải phóng thì mình sẽ nhìn thấy log được in ra. 

Kịch bản được thực hiện là : Click button để gọi (3) sau đó khi nhìn thấy log được print từ (3) thì ấn nút để gọi (5). Chúng ta hãy xem có gì được in ra :

> Teacher is always right

![](https://images.viblo.asia/59d33f64-fbba-4cc9-89ff-9f580a67a186.jpeg)

Mặc dù đã pop về SchoolViewController nhưng **SchoolViewController deinit** thì không được gọi bởi vì đã xảy ra memory leak !!!

![](https://images.viblo.asia/8aff8d66-979c-490d-b0ac-6d537f89bbda.png)

Chúng ta có thể thấy **SchoolViewController** có 1 strong reference với friend, tiếp đó **student** lại có 1 strong reference với closure **speak**, cuối cùng closure lại có 1 strong reference với chính **SchoolViewController** thông qua gọi **self**. Khi chúng ta gọi hàm **popViewController** thì SchoolViewController lúc này vẫn không được giải phóng bởi vì closure vẫn giữ 1 strong reference đến nó và gây ra memoryleak.


Để giải quyết tình trạng này, vẫn theo cách cũ, chúng ta buộc phải loại bỏ 1 strong reference, bằng cách sử dụng **[weak self]**

>        override func viewDidLoad() {
>            super.viewDidLoad()
>            student.speak = { [weak self] thinking in //2
>                self?.showThinking(thinking)
>            }
>        }

Thử làm lại và lần này chúng ta đã giải quyết được vấn đề .

![](https://images.viblo.asia/ef7fcba3-08c8-4f3d-9277-12f91e006cc5.jpg)


# Kết.
Phù !!!! , vậy là cuối cùng mình cũng đã hoàn thành được bài viết này. Bài viết trông thì dài nhưng thật ra là rất dài các thím ạ.

Hi vọng mọi có ích với mọi  người ~~~~