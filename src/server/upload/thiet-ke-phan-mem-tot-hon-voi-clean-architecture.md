# Đặt vấn đề
Bạn đã từng thực hiện code mà:

- Gây lỗi nặng nề.
- Khổ sở để debug hoặc mở rộng với những tính năng mới.
- Khó hoặc không thể test nếu không có những thứ như database hoặc web server.
- Có tầng presentation được trộn lẫn với business logic hoặc business logic được trộn với data acccess logic.
- Khó để cho các lập trình viên khác hiểu bởi vì nó không thể hiện rõ ràng ý định hoặc mục đích trong ứng dụng như code đã viết.

Tôi biết tôi đã từng như thế. Qua thời gian tôi đã học về những patterns khác nhau và đã nỗ lực một cách có ý thức để giữ cho các nguyên tắc cứng rắn chạy trên một luồng ngầm định trong tư duy của tôi khi tôi viết code. Trong khi những ý tưởng này chắc chắn đã giúp giảm thiểu các vấn đề được liệt kê ở trên, tuy nhiên vấn đề không hoàn toàn bị loại bỏ. Khi viết phần mềm web hoặc desktop sử dụng MVC hoặc MVM tôi vẫn tìm ra một triệu chứng giống như trong các dự án trước đó của của tôi. Những thứ như business logic rò rỉ đến controllers, entry models được sử dụng trên tất cả các nơi cho những những mục đích khác nhau của code mà không có unit test để coverage bởi vì chúng có một vài sắp xếp sự phụ thuộc trên database và http client.

# Câu trả lời

Một ngày, một khóa học đã gửi link giới thiệu [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) bởi Uncle Bob. Nó gây chú ý với tôi ngay lập tức như nó đã trình diễn một giải pháp cho các vấn đề giống nhau mà tôi đang gặp. Phần tốt nhất, đó là không có gì thần bí hay phức tập về **Clear Architechture**. Nó là một architechture template tương đối đơn giản và có thể áp dụng tới nhiều mảng ứng dụng nếu bạn chọn để làm theo chỉ một vài quy định cơ bản.


# Clear Architecture làm việc như thế nào
Quy tắc chính bên trong của **Clear Architecture** là: **Dependency Rule**. Ý chính của điều này chỉ đơn giản là các phụ thuộc được gói gọn trong mỗi "vòng" của mô hình kiến trúc và các phụ thuộc này chỉ có thể hướng vào trong.

![](https://images.viblo.asia/56c15927-7258-4acc-9243-34ca00279c56.jpg)

**Clear Architecture** giữ các chi tiết như web frameworks và databases ở layer bên ngoài trong khi các business rules và policies quan trọng được để ở bên trong các vòng tròn và không biết bất kì điều gì ở bên ngoài. Xem xét điều này, bạn có thể bắt đầu thấy làm thế nào nó đạt được việc phân chia cụ thể rất rõ ràng. Bởi việc đảm bảo business rules và core domain của bạn bên trong vòng tròn là hoàn toàn không có bất kì sự phụ thuộc nào bên ngoài hoặc các thư việc bên thứ 3 (3rd party libraries) có nghĩa là chúng phải sử dụng code C# thuần vì sẽ dễ dàng hơn trong việc test. Tác giả đã đưa ra quy tắc quan trọng nhất trong câu nói sau:

>In fact your business rules simply don’t know anything at all about the outside world -
>Robert C. Martin

Có một vài khái niệm quan trọng khác cái mà tôi sẽ nêu bật trong suốt bài viết với ví dụ bên dưới nhưng nếu bạn thú vị với lý thuyết thì vui lòng xem bài viết gốc của Uncle Bob [Clear Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

# Triển khai với use case "Course Registration"
Hãy xem cách làm thế nào nó làm việc bằng cách sử dụng use case trong thế giới thực. Đối với những người đã làm với agile scrum, tôi nhận ra rằng use case không phải là cách hiện đại để mô tả yêu cầu. Nhưng với bài viết này, nó là hoàn hảo bởi vì tôi sẽ chỉ cách làm thế nào tất cả các chi tiết của use case có thể được được mô hình hóa bên trong **clear architecture**. Một user story đơn giản là quá mơ hồ.

Tôi đã viết ra thực thể use case ở đây để tham chiếu như vậy bạn không cần phải tiếp thu toàn bộ ngay lúc này. Chúng ta sẽ đảm bảo các khía cạch của nó trong chi tiết trong từng bước triển khai việc sử dụng **clear architecture**.

###
**Tiêu đề:** Đăng kí khóa học.

**Mô tả:** Student truy cập vào hệ thống và view các khóa học đang có sẵn cho anh ấy đăng kí. Tiếp theo anh ấy chọn khóa học và đăng kí chúng

**Tác nhân chính:** Student

**Điều kiện tiên quyết:**

* Student đăng nhập vào hệ thống
* Student chưa từng ghi dang hoặc đăng kí
* Student không thể đang kí trong vòng 5 ngày từ khi khóa học bắt đầu

**Kết quả:** Student được đăng kí khóa học.

**Kịch bản thành công chính:**

1. Student chọn "Register New Courses" từ menu
2. Hệ thống hiển thị danh sách khóa học có sẵn cho việc đăng kí
3. Student chọn một hoặc nhiều khóa học anh ấy muốn đăng kí
4. Student click button "submit"
5.  Hệ thống đăng kí student cho những khóa học đã chọn và hiển thị một confirmation message.

**Mở rộng:**

* (2a) Không có khóa học nào sẵn có cho student.

1. Hệ thống hiển thị error message nói rằng không có khóa học có sẵn, và cung cấp lý do và làm thế nào để khắc phục nếu có thể
2. Student hoặc quay trở lại của use case này, hoặc cố gắng lại sau khi khắc phục nguyên nhân.

* (5a) Một vài khóa học không thể đăng kí.
1. Hệ thống hiển thị message chỉ ra khóa học nào đã được đăng kí và khóa học nào không được đăng kí cùng với lý do của mỗi thất bại
* (5b) Không có khóa học nào có thể được đăng kí
1. Hệ thống hiển thị message nói rằng không có khóa học nào có thể đăng kí cùng với lý do thất bại.


Đây là một use case đơn giản cho phép một student đăng kí một hoặc nhiều lớp học và tiếp theo trả về hoặc thành công hoặc kết quả lỗi để thông báo đến họ. Chúng ta sẽ sử dụng **clear architecture** để viết use case này để đáp ứng mục đích tránh các vấn đề mà tôi đã đề cập ở đầu bài viết.

# Tạo entities

Entities là trái tim của **clear architecture** và chứa bất kì business rules và logic của toàn bộ ứng dụng. Bây giờ, bạn có thể không làm việc trong bối cảnh của một ứng dụng và điều ấy là hoàn hảo. Nếu bạn đang viết một ứng dụng đơn Uncle Bob đề suất tham khảo đến những cái như **Business Object**. Điều quan trọng ở đây là những quy tắc không cho một ứng dụng cụ thể nào - như vậy về cơ bản bất kì những gì toàn cục và có thể chia sẻ về logic mà có thể tái sử dụng trong những ứng dụng khác nên được đóng gói trong một entity.

####
Kiểm tra trường hợp sử dụng của chúng, ta coi 2 entities chúng ta cần: **Student** và **Course**.
###

Phương thức ```RegisterForCourse()``` triển khai 2 quy tắc từ use case của chúng ta.

```csharp
public class Student : EntityBase
{
   public string FirstName { get; set; }
   public string LastName { get; set; }
   public IList<Course> RegisteredCourses { get; }
   public IList<Course> EnrolledCourses { get; set; }

   public Student()
   {
      RegisteredCourses = new List<Course>();
      EnrolledCourses = new List<Course>();
   }

   public bool RegisterForCourse(Course course)
   {
      // student has not previously enrolled
      if (EnrolledCourses.Any(ec => ec.Code == course.Code)) return false;

      // registration cannot occur with 5 days of course start date
      if (DateTime.UtcNow > course.StartDate.AddDays(-5)) return false;

      RegisteredCourses.Add(course);
      return true;
   }
}
```

```csharp
[Fact]
public void CannotRegisterForCourseWithin5DaysOfStartDate()
{
  // arrange
  var student = new Student();
  var course = new Course { Code = "BIOL-1507EL", Name = "Biology II", StartDate = DateTime.UtcNow.AddDays(+3) };

  // act
  var result = student.RegisterForCourse(course);

  // assert
  Assert.False(result);
}

[Fact]
public void CannotRegisterForCourseAlreadyEnrolledIn()
{
  // arrange
  var student = new Student
  {
     EnrolledCourses = new List<Course>
     {
       new Course { Code = "BIOL-1507EL", Name = "Biology II" },
       new Course { Code = "MATH-4067EL", Name = "Mathematical Theory of Dynamical Systems, Chaos and Fractals" }
             }
     };

 // act
 var result = student.RegisterForCourse(new Course { Code = "BIOL-1507EL" });

 // assert
 Assert.False(result);
}
```

# Use Cases
Di chuyển lên từ entities chúng ta có Use Case layer. Những class ở đây có một vài đặc tính riêng và chịu trách nhiệm:

* Chứa các business rules của ứng dụng xác định.
* Đóng gói và triển khai tất cả các use cases của hệ thống. Một rule tốt để bắt đầu là: một class trên một use case.
* Điều phối luồng dữ liệu từ entities và có thể dựa vào các business rules của chúng để đạt được mục đích của use case.
* Không có sự phụ thuộc và là hoàn toàn cô lập với những thứ như database, UI hoặc framework đặc biệt.
* Gần như chắc chắn sẽ yêu cầu refactoring nếu chi tiết requirements của use case  thay đổi.

Class của use case thông thường sẽ có hậu tố với từ Interactor. Uncle Bond đề cập trong [Cuộc nói chuyện này](https://www.youtube.com/watch?v=0oGpWmS0aYQ) cái mà anh ấy đã xem xét gọi những controller của chúng nhưng điều này sẽ là quá dễ nhầm lẫn với MVC như vậy Interactor được chọn.
####
Use case của chúng ta là được mô hình trong [RequestCourseRegistrationInteractor.cs.](https://github.com/mmacneil/CleanArchitecture/blob/master/CleanArchitecture.Core/UseCases/RequestCourseRegistrationInteractor.cs)

Có một vài khía cạnh quan trọng của use case class tôi muốn làm nổi bật.
####
Đầu tiên, nó triển khai interface ```IRequestHandler```.  Interface này là một ví dụ của [mediator pattern](https://www.dofactory.com/net/mediator-design-pattern) cái mà bắt buộc các implementor kia sẽ làm việc với đối tượng request và response nhất định theo kiểu liên kết lỏng.

```csharp
public class RequestCourseRegistrationInteractor : IRequestHandler<CourseRegistrationRequestMessage, CourseRegistrationResponseMessage>
...
```

Có một phương thức đơn ```TResponse Handle(TRequest message )``` được định nghĩa trên interface cái mà cơ bản thực hiện tất cả công việc của use case. Khá đơn giản phải không ? ```Handle()``` nắm giữ một đối tượng requets như một tham số của nó cái mà thông thường sẽ chứa bất kì data nào được truyền từ layer bên ngoài (UI) và trả về một response message với các cả kiểu bắt buộc bởi ```IRequestHandler``` interface. Tất cả logic của ứng dụng chỉ định cho use case sẽ đi đến phương thức này.

####
Một khía cạnh chính của request/response messages mà luồng vào và ra của use case interactors và các ranh giới xuyên qua mà chúng là các cấu trúc dữ liệu đơn giản, có nghĩa là chúng không chứa các kiểu đặc biệt, ví dụ: entities, hoặc kiểu được cung cấp bởi thư viện bên thứ 3,v.v.. - chúng là đối tượng C# thuần.

```csharp
public class CourseRegistrationRequestMessage : IRequest<CourseRegistrationResponseMessage>
{
  public int StudentId { get; private set; }
  public List<string> SelectedCourseCodes { get; private set; }

  public CourseRegistrationRequestMessage(int studentId,List<string> selectedCourseCodes)
  {
    StudentId = studentId;
    SelectedCourseCodes = selectedCourseCodes;
  }
}
```
Đối tượng ```CourseRegistrationRequest``` bao gồm chỉ ```StudentId``` và một list code của các khóa học được chọn bởi người dùng.
####
Đây là triển khai đầy đủ của  [RequestCourseRegistrationInteractor.cs](https://github.com/mmacneil/CleanArchitecture/blob/master/CleanArchitecture.Core/UseCases/RequestCourseRegistrationInteractor.cs)
```csharp
public class RequestCourseRegistrationInteractor : IRequestHandler<CourseRegistrationRequestMessage, CourseRegistrationResponseMessage>
{
  private readonly IStudentRepository _studentRepository;
  private readonly ICourseRepository _courseRepository;
  private readonly IAuthService _authService;
  public RequestCourseRegistrationInteractor(IAuthService authService, IStudentRepository studentRepository, ICourseRepository courseRepository)
  {
    _authService = authService;
    _studentRepository = studentRepository;
    _courseRepository = courseRepository;
  }

public CourseRegistrationResponseMessage Handle(CourseRegistrationRequestMessage message)
{
   // student must be logged into system
   if (!_authService.IsAuthenticated())
   {
     return new CourseRegistrationResponseMessage(false,null,"Operation failed, not authenticated.");
   }

   // get the student
   var student = _studentRepository.GetById(message.StudentId);

   // save off any failures
   var errors = new List<string>();

   foreach (var c in message.SelectedCourseCodes)
   {
     var course = _courseRepository.GetByCode(c);

     if (!student.RegisterForCourse(course))
     {
         errors.Add($"unable to register for {course.Code}");
     }
   }

   _studentRepository.Save(student);
   return new CourseRegistrationResponseMessage(!errors.Any(), errors);
}
```

Chú ý việc sử dụng của ```_authService```, ```_studentRepository``` và ```_courseRepository```. Những services này thông thường được tham chiếu đến như ```Getways``` bên trong **clear architecture** và nhận injected đến Use Case layer như trên quy tắc sự phụ thuộc (dependency). Đây là những thứ liên quan đến database, services còn lại hoặc các đơn vị bên ngoài khác và việc triển khai của chúng thuộc interface ```Adapters``` layer. Interactors chỉ biết hành vi nào của những getways này đề suất theo định nghĩa interface của chúng. Chúng không có ý tưởng làm thế nào chúng làm công việc của chúng bởi vì những chi tiết đó là được đóng gói trong một layer bên ngoài cái mà Use Case không biết gì về nó.

# Interface Adapters

Mục đích của interface adapter layer là hành động như một người kết nối giữa business logic trong interactors và framework của chúng ta. Cho ví dụ, trong một ứng dụng ASP.Net MVC, đây là nơi của models, views và controllers. Getways giống như services và repositories cũng được implement ở đây.

>It is this layer, for example, that will wholly contain the MVC architecture of a GUI. The Presenters, Views, and Controllers all belong in here.

>Also in this layer is any other adapter necessary to convert data from some external form, such as an external service, to the internal form used by the use cases and entities.

>Robert C. Martin

###
Trong ví dụ này tôi đang sử dụng ứng dụng console cơ bản để tiêu thụ use case của tôi như vậy server này như một interface adapter layer. Nó chứa những triển khai cụ thể của những ```Getways``` được yêu cầu và có ```Presentation``` logic để định dạng response từ  Use Case đến một số thứ thân thiện cho UI.
Trong phương thức ```Main()``` chúng ta có thể thấy sử dụng gọi use case và trình diễn những kết quả.
```csharp
//*************************************************************************************************
// Here we're connecting our app framework layer with our Use Case Interactors
// This would typically go in a Controller Action in an MVC context or ViewModel in MVVM etc.
//*************************************************************************************************
// 1. instantiate Course Registration Use Case injecting Gateways implemented in this layer
var courseRegistraionRequestUseCase = new RequestCourseRegistrationInteractor(authService, studentRepository, courseRepository);

// 2. create the request message passing with the target student id and a list of selected course codes 
var useCaseRequestMessage = new CourseRegistrationRequestMessage(1, new List<string> { userInput.ToUpper() });

// 3. call the use case and store the response
var responseMessage = courseRegistraionRequestUseCase.Handle(useCaseRequestMessage);

// 4. use a Presenter to convert the use case response to a user friendly ViewModel
var courseRegistraionResponsePresenter = new CourseRegistrationRequestResponsePresenter();
var vm = courseRegistraionResponsePresenter.Handle(responseMessage);

Console.Clear();

// render results

if (vm.Success)
{
  Console.BackgroundColor = ConsoleColor.DarkGreen;
  Console.ForegroundColor = ConsoleColor.White;
}
else
{
  Console.BackgroundColor = ConsoleColor.Red;
  Console.ForegroundColor = ConsoleColor.White;
}
Console.WriteLine();
Console.WriteLine(vm.ResultMessage);
Console.WriteLine();
```
# Presentation

Chúng ta mong muốn để đưa ra một vài thứ thân thiện tới người dùng khi chúng ta nhận một response trở lại từ interactor. Để hoàn thành điều này, tôi đã tạo ```CourseRegistrationResponsePresenter``` cái mà có trách nhiệm chuyển đổi một ```CourseRegistrationResponseMessage``` đến một ```CourseRegistrationResponseViewModel```. Tôi sẽ đề cập trở lại rằng response message và viewmodel là POCO objects không chứa kiểu đặc biệt hoặc cấu trúc dữ liệu, chỉ eveday collection và kiểu giá trị.
```csharp
public class CourseRegistrationResponsePresenter
{
  public CourseRegistrationResponseViewModel Handle(CourseRegistrationResponseMessage responseMessage)
  {
    if (responseMessage.Success)
    {
         return new CourseRegistrationResponseViewModel(true,"Course registration successful!");
    }

    var sb = new StringBuilder();
    sb.AppendLine("Failed to register course(s)");
    foreach (var e in responseMessage.Errors)
    {
       sb.AppendLine(e);
    }

    return new CourseRegistrationResponseViewModel(false,sb.ToString());
  }
}
```
# Frameworks and Drivers
Layer này chứa công cụ như databases hoặc frameworks. Mặc định, chúng ta không viết quá nhiều code ở layer này, nhưng nó là quan trọng để nêu rõ vị trí và mức độ ưu tiên của các công cụ đó trong kiến trúc tổng thể.

# Tổng quan
Clear Architecture cung cấp một framework đơn giản và hiệu quả cho việc chia những khía cạnh khác nhau của hệ thống tạo ra một kiến trúc có tính phân tách cao, dễ dàng cho việc testing. Hy vọng hướng dẫn này đã cung cấp một cái nhìn sâu sắc về **Clean Architecture** có thể cải thiện việc thiết kế phần mềm của bạn và ngăn chặn những cạm bẫy phổ biến gây cản trở dự án. Chúc các bạn thành công.

###
Bài viết lược dịch từ bài viết gốc: [Better Software Design with Clean Architecture](https://fullstackmark.com/post/11/better-software-design-with-clean-architecture)