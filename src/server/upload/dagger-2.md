Trong bài viết này chúng ta sẽ cùng tìm hiểu về Dagger! <br>
Đầu tiên chúng ta sẽ tìm hiểu ntn là Dependency. Chúng ta có thể dịch nó ra tiếng việt và hiểu nó lại sự phụ thuộc, còn trong lập trình nó là sự phụ thuộc của 2 class. Ví dụng chúng ta có class A và class B, class A sử dụng class B bên trong nó ta nói class A phụ thuộc vào class B, bất cứ khi nào chúng ta cần sử dụng class A chúng ta sẽ phải khởi tạo class B. Chúng ta có thể thấy sự phụ thuộc các class lẫn nhau xuất hiện rất nhiều trong lập trình và điều đó gây ra các vấn đề như:
* Giảm tính tái sử dụng của code -> do các class và hàm gắn kết với nhau nên khi thay đổi sẽ gây ra ảnh hưởng tới nhiều nơi.
* Khó khăn cho quá trình test 
* Cản trở việc maintain và mở rộng hệ thống sau này.
Các loại Dependency:
Ở đây chúng ta sẽ tổng hợp ra cá loại chính:
* Class dependency: 
Giống như ví dụ ở trên chúng ta sẽ minh họa bằng code:
```
class A {
        
        public A() {
                // Mỗi khi chúng ta cần sử dụng class A chúng ta sẽ phải khởi tạo cả class B
                B b = new B();
                b.doSomeThing();
        }
}
```
* Interface depencency
Là sự phụ thuộc của các interface với nhau:
``` 
public interface A {
    public Result executePlan(B b) {
       //B được implement bởi nhiều class khác nhau
   }
}
```
* Method/fild deependency
```
public String doSomething(YouClass yourClass) {
  return yourClass.do();
}
```
* Direct và indirect dependency
A -> B -> C 
<br>
Vậy chúng ta phải làm sao để ngăn chặn Dependency? 
## I. Dependency Injection? (DI)
Chắc hẳn mọi người đều thấy quen thuộc với DI, đây là 1 trong các phương pháp đơn giản nhất và được sử dụng khá phổ biến giúp chúng ta đánh bại Dependency! DI được xây dựng dựa trên Inversion of Control. **Thay vì khởi tạo class bên trong class chúng ta nên lấy đối tượng của class cần dùng từ class cấu hình.**
<br>Nói nghe có vẻ trừu tượng! chúng ta sẽ sử dụng code để mọi người hình dung dễ hơn:
<br> Trong Sun chúng ta có rất nhiều các bộ phận nhân viên khác nhau điển hình là Developer & Tester 2 class này sẽ kế thừa thừa từ interface Employee:
```
public interface Employee {
    void work();
}

public class Developer implements Employee{
    
    @Override
    public void work() {
        System.out.println("Developer write code");
    }
}

public class Tester implements Employee{

    @Override
    public void work() {
        System.out.println("Tester log bugs");
    }
}

public class Sun {
    private Developer mDeveloper;

    private Tester mTester;

    public Sun() {
        mDeveloper = new Developer();
        mTester = new Tester();
        mDeveloper.work();
        mTester.work();
    }
}
```

Ở đây Developer và Tester là các phụ thuộc của Sun nếu ko có họ Sun sẽ ko word :) Đối với các ứng dụng nhỏ thì việc khởi tạo instance của các class khác trong constructor của 1 class ko thành vấn đề nhưng với ứng dụng lớn nó sẽ làm chúng ta điên mất. Vậy chúng ta sẽ sử dụng DI như thế nào để tránh được vấn đề này?<br>
Như đề cập bên trên chúng ta sẽ không khởi tạo instance của class bên trong class mà chúng ta nên lấy instance nó từ class bên ngoài!
```
public class Sun {
    private Developer mDeveloper;

    private Tester mTester;

    public Sun(Developer developer, Tester tester) {
        mDeveloper = developer;
        mTester = tester;
    }
    
    public void operate(){
        mDeveloper.work();
        mTester.work();
    }
}
```
Mình nghĩ lag hầu hết các bạn đã sử dụng DI trong project rồi mà không hay biết. sử dụng DI các đối tượng của chúng ta ko cần phải khỏi tạo hoặc tìm kiếm các thành phần phụ thuộc mà luôn luôn được cung cấp để sẵn sàng sử dụng. Tất nhiên chúng ta sẽ cần 1 nơi để sản xuất các instance cần thiết đó thường là nơi chạy đầu tiên của Chương trình nhưu hàm main() hay hàm onCreate() của Activity.<br>
Nhưng DI cũng tồn tại những hạn chế nhất định. Ví dụ như khi bạn có cả tá các class cần dùng và bạn cần chuyển instance của nó vào 1 class dùng chung như trong ví dụ trên chúng ta có rất nhiều các bộ phận làm chung trong công ty và chúng ta sẽ phải pass các instance của nó vào class Sun --> died. Bên cạnh đó bạn sẽ phải thay đổi code khi có thêm class mới, khi thay đổi 1 class đã có sẵn ...Và đây là lúc chúng ta cần sử dụng Dagger 2 ;)
##  II. Dagger 2
Dagger 2 là 1 trong các open source DI framework giúp chúng ta tự động sinh ra các đoạn code giống nhau. Nó là framework DI duy nhất giúp chúng ta tạo ra những đoạn mã nguồn bắt chước như người dùng viết tay. Chúng không được linh hoạt nhưng tính đơn giản và performance thì như nhau. 
<br> Đầu tiên chúng ta sẽ tìm hiểu các Annotation.  Annotation là class thuộc MetaData, nó có thể đi cùng với class, phương thức, trường, thậm trí là các Annotation khác. Trong Java nó được dùng để cung cấp thêm thông tin, nên nó có thể đưuọc sử dụng thay thế cho XML và   Java marker interface. <br>
Annotation Processors là các đoạn code được tạo ra nhằm hạn chế các đoạn mã nguồn giống nhau bằng cách tạo ra các đoạn code đó trong quá trình compile time. Vì được tạo ra trong quá trình Compile time nên nó không gây ảnh hưởng tới performance.
<br> Tịa sao mình lại nhắc tới Annotation Processors ở đây? Do Dagger làm việc trên Annotation Processors vì vậy các đoạn code được tạo ra trong thời gian này chúng ta hoàn toàn có thể theo dõi được cũng như các từ khóa @Override, @BindView.
### 1. Inject Annotation
Annotation này đi kèm với:
* Constructor Injection : được sử dụng với constructor của class.
* Field Injection được sử dụng với fields của class 
* Method injection được sử dụng với phương thức.
@Injection annotation sẽ nói vs Dagger rằng tất cả các yếu tố phụ thuộc này cần được chuyển tới cho class hiện tại.

### 2. Component Annotation
Được sử dụng trong xây dựng câu nối giữa @Module và @Inject. Nó là nơi vẫn chuyển các phụ thuộc tới vị trí @Inject.
Chúng ta sẽ viết lại class Developer, Tester và Sun ở ví dụ trên:
```
public class Developer implements Employee{

    @Inject
    public Developer() {
    }
    @Override
    public void work() {
        System.out.println("Developer write code");
    }
}

public class Tester implements Employee{

    @Inject
    public Tester() {
    }
    
    @Override
    public void work() {
        System.out.println("Tester log bugs");
    }
}

public class Sun {
    private Developer mDeveloper;

    private Tester mTester;

    @Inject
    public Sun(Developer developer, Tester tester) {
        mDeveloper = developer;
        mTester = tester;
    }
    
    public void operate(){
        mDeveloper.work();
        mTester.work();
    }
}
```
Chúng ta có 2 phụ thuộc trong class Sun vậy nên chúng ta sẽ phải đánh dấu chúng với @Inject<br>
Thêm @Component Annotation<br>
Bây giờ chúng ta sẽ sử dụng @Component để nói cho Dagger biết làm ntn để các phụ thuộc được phân phát. Để làm được điều đó trược tiên tạo 1 interface WorkComponent:
```
@Component
interface SunComponent {
    Sun getSun();
}
```
interfacw SunComponent này sẽ được 1 class implement, và đặc sắc là class này sẽ do Dagger 2 tự gen ra cho chúng ta và hàm getWork sẽ được trả về Sun để chúng ta sử dụng.
<br> Bây giờ hãy rebuild project của bạn.<br>
Sau khi build xong hãy check class DraggerSunComponent, nó sẽ giúp chúng ta vẫn chuyển Sun instance đến nơi chúng ta cần sử dụng.
```
public class ManagementCompany {

    public static void main(String[] args){
//        Mannual DI
//        Developer developer = new Developer();
//        Tester tester = new Tester();
//        Sun sun = new War(developer,tester);
//        sun.operate();

//  Using Dagger 2
        SunComponent component = DaggerSunComponent.create();
        Sun sun = component.getSun();
        sun.operate();
    }
}
```
Bằng cách sử dụng DraggerSunComponent class chúng ta có thể sử dụng phương thức getSun() để lấy đối tượng Sun.
### 3. DraggerSunComponent
Bây giờ chúng ta sẽ cùng tìm hiểu class DraggerSunComponent để hiểu rõ hơn cách Dragger làm việc!
```
public final class DaggerSunComponent implements SunComponent {
  private DaggerSunComponent(Builder builder) {}

  public static Builder builder() {
    return new Builder();
  }

  public static SunComponent create() {
    return new Builder().build();
  }

  @Override
  public Sun getSun() {
    return new Sun(new Developer(), new Tester());
  }

  public static final class Builder {
    private Builder() {}

    public SunComponent build() {
      return new DaggerSunComponent(this);
    }
  }
}
```
Chúng ta có thế thấy trong DraggerSunComponent Dagger đã sử dụng builder pattern và override lại hàm getSun để cung cấp cho chúng ta instance của Sun. <br>
Bây giwof ...<br>
Chúng ta sẽ thêm hai phương thức để lấy ra instance của từng đối tượng Developer và Tester trong interface SunComponent 
```
@Component
public interface SunComponent {
    Sun getSun();

    Developer getDeveloper();

    Tester getTester();
}
```
Nào hãy ấn nút build để thấy được sự thay đổi của class DraggerSunComponent với 2 phương thức override xuất hiện: 
```
public final class DaggerSunComponent implements SunComponent {

   ....
  @Override
  public Developer getDeveloper() {
    return new Developer();
  }

  @Override
  public Tester getTester() {
    return new Tester();
  }
  ....
```
Ở đây dagger của chúng ta đã map các đối tượn cần được tạo ta thông qua @Inject mà chúng ta sử dụng ở trên. Để  chứng minh điều đó bạn có thể bỏ @Inject ở class Developer hoặc Tester ở trên bạn sẽ nhận được message báo lỗi  "Tester cannot be provided without @Inject constructor or from an @Provides-annotated method." <br>
Vậy khi sử dụng Dagger 2 chúng ta có thể theo dõi được các lỗi xảy ra luôn trong quá trình compile time.
### 4. Module và Provide
a. @Module<BR>
 Nói ngắn ngọn thì @Module giúp chúng ta đánh dấu 1 module hay 1 class. Ví dụ như trong 1 Android project chúng ta cần tạo 1 class tên ContextModule chuyên để cung cấp context cho các class cần sử dụng nó và chúng ta sẽ đánh dấu nó vs @Module.
 <br>b. Provide<br>
 Còn với Provide được sử dụng để đánh dấu cho các method bên trong module. Như trong ví dụ trên chúng ta có phương thức cung cấp ApplicationContext bên trong ContextModule và chúng ta đánh dấu nó với #Provides.
<br> Hãy cùng làm ví dụ để hiểu rõ hơn nhé!<br>
 Công ty Sun cần cung cấp máy tính và thiết bị test cho Developer và Tester. Chúng ta tạo 2 class này:
```
 public class Device {

    public Device() {
    }
}
public class Computer {
    public Computer(){

    }
}
```
Bây giờ bạn muốn từ nhận được instance của Device và Computer từ instance của class DraggerSunComponent (class kế thừa SunComponent do Dagger tạo ra) chúng ta  cần khai báo 1 Module cung cấp chúng rồi link module này tới interface SunComponent để cho Dagger biết lấy dữ liệu instance của 2 class trên ở đâu. <br>
Phương thức khai báo khá đơn giản:
```
@Module
public class DeveloperModule {
    private Computer mComputer;
    private Device mDevice;

    public DeveloperModule(Computer computer, Device device) {
        mComputer = computer;
        mDevice = device;
    }
    @Provides
    Computer provideComputer(){
        return mComputer;
    }
    @Provides
    Device provideDevice(){
        return mDevice;
    }
}
```
Chúng ta có thể thấy DeveloperModule của chúng ta cần cung cấp 2 instance của 2 class nêu trên. Với mỗi phương thức cung cấp đi kèm theo annotation @Provides và class đưuọc đi kèm @Module.
<br> Bây giờ chúng ta cần khai báo Module này trên interface SunComponent để thông báo cho Dagger biết thông qua:
 **@Component(modules = DeveloperModule.class)**
```
@Component(modules = DeveloperModule.class)
public interface SunComponent {
    Sun getSun();

    Developer getDeveloper();

    Tester getTester();

    Computer getComputer();

    Device geDevice();
}
```
Thêm các phương thức để lấy intance của Computer và Device và đừng quên ấn rebuild!
    <br>
Bây giờ là lúc chúng ta sử dụng SunComponent:
```
public class ManagementCompany {

    public static void main(String[] args) {

        Computer computer = new Computer();
        Device device = new Device();

        SunComponent component = DaggerSunComponent.builder().developerModule(new DeveloperModule(computer,device)).build();
        Sun sun = component.getSun();
        sun.operate();

        // using instance of Computer and Device
        component.geDevice();
        component.getComputer();
    }
}
```
Bài viết của mình dừng lại ở đây, mong nhận được ý kiến đóng góp của mọi người trong phần comment bên dưới.<br>\
Link tham khảo:
   https://medium.com/@harivigneshjayapalan/dagger-2-for-android-beginners-dagger-2-part-i-f2de5564ab25