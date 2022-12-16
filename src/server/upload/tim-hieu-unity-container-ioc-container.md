# 1. Giới thiệu
Chào mọi người, chắc hẳn trong giới lập trình phần mềm của chúng ta, ai cũng ít nhất một lần nghe đến các khái niệm như SOLID, OOP Design, Dependency Inversion hay IoC.

Các bạn có thể tham khảo bài viết sau để hiểu thêm về các khái niệm trên

https://viblo.asia/p/dependency-inversion-inversion-of-control-and-dependency-injection-qzakzNYBkyO

Trong phạm vi bài viết này thì mình sẽ giới thiệu về 1 framwork thực hiện dependency injection 1 cách tự động. Đó là Unity Container IoC.

Unity Container là một mã nguồn mở IoC container  cho các ứng dụng .NET được Microsoft hỗ trợ.
Nó cung cấp tất cả các tính năng thường thấy trong các cơ chế tiêm phụ thuộc, bao gồm các method để register type mappings và object instances, resolve objects.

# 2. Cài đặt
Chúng ta có thể cài đặt Unity container trong Visual Studio bằng NuGet.


# 3. Register and Resolve

Register: Chúng ta phải thực hiện Register để Container biết phụ thuộc lớp nào để khởi tạo khi nó gặp một loại cụ thể.

Resolve: Unity tạo một đối tượng của lớp được chỉ định và tự động chèn các phụ thuộc bằng cách sử dụng phương thức Resolve().
### 3.1. Construction Injection using Unity Container
Ví dụ chúng ta có 1 Constructor Injection như bên dưới
```javascript
public interface ICar
{
    int Run();
}

public class BMW : ICar
{
    private int _miles = 0;

    public int Run()
    {
        return ++_miles;
    }
}

public class Audi : ICar
{
    private int _miles = 0;

    public int Run()
    {
        return ++_miles;
    }

}
public class Driver
{
    private ICar _car = null;

    public Driver(ICar car)
    {
        _car = car;
    }

    public void RunCar()
    {
        Console.WriteLine("Running {0} - {1} mile ", _car.GetType().Name, _car.Run());
    }
}
```
```javascript
IUnityContainer container = new UnityContainer();
container.RegisterType<ICar, BMW>();// Map ICar with BMW 

//Resolves dependencies and returns Driver object 
Driver drv = container.Resolve<Driver>(); 
drv.RunCar();
// Output: Running BMW - 1 mile
```
Trong ví dụ trên, container.RegisterType <ICar, BMW> () ánh xạ ICar sang BMW. 

container.Resolve<driver>() method nó sẽ tạo và đưa đối tượng BMW vào một hàm tạo của lớp Driver và trả về một đối tượng của lớp Driver.
    
**Nếu có nhiều Constructors :** 
1) Nếu một lớp bao gồm nhiều hàm tạo thì sử dụng thuộc tính [InjectionConstructor] để chỉ ra hàm tạo nào được sử dụng để tiêm xây dựng.
```javascript
public class Driver
{
    private ICar _car = null;
       
    [InjectionConstructor]
    public Driver(ICar car)
    {
        _car = car;
    }
    
    public Driver(string name)
    {
    }
    
    public void RunCar()
    {
        Console.WriteLine("Running {0} - {1} mile ", _car.GetType().Name, _car.Run());
    }
}
```
```javascript
IUnityContainer container = new UnityContainer();
container.RegisterType<ICar, BMW>();
Driver drv = container.Resolve<Driver>(); 
drv.RunCar();
```
2) Chúng ta có thể thiết lập tương tự như trên vào thời gian chạy thay vì áp dụng thuộc tính [InjectionConstructor] bằng cách pass InjectionConstructor trong phương thức RegisterType () như hiển thị bên dưới.
```javascript
container.RegisterType<Driver>(new InjectionConstructor(new Ford()));
//or 
container.RegisterType<ICar, Ford>();
container.RegisterType<Driver>(new InjectionConstructor(container.Resolve<ICar>()));
```
### 3.2. Property Injection using Unity Container
Chúng ta thay đổi class Driver như bên dưới 
```javascript
public class Driver
{
    public Driver()
    {
    }

    [Dependency]
    public ICar Car { get; set; }

    public void RunCar()
    {
        Console.WriteLine("Running {0} - {1} mile ", 
                            this.Car.GetType().Name, this.Car.Run());
    }
}
```
Property injection trong unity container có thể được thực hiên bằng 2 cách:
1) Sử dụng [Dependency] Attribute 
```javascript
var container = new UnityContainer();
container.RegisterType<ICar, BMW>();
            
var driver = container.Resolve<Driver>();
driver.RunCar();
//Output: 
//Running BMW - 1 mile
```
2) Run-time Configuration
```javascript
var container = new UnityContainer();
            
//run-time configuration
container.RegisterType<Driver>(new InjectionProperty("Car", new BMW()));

var driver = container.Resolve<Driver>();
driver.RunCar();
//Output:
//Running BMW - 1 Mile
```
Như bạn có thể thấy trong ví dụ trên, container.RegisterType <driver> (new InjectionProperty ("Car", new BMW ())) đăng ký lớp Driver bằng cách truyền 1 đối tượng InjectionProperty chỉ định tên thuộc tính "Car" và đối tượng BMW như một giá trị.  Vì vậy, container unity sẽ set một đối tượng của BMW vào thuộc tính Car khi sử dụng container.Resolve <Driver> ().
###  3.3. Method Injection
Chúng ta thay đổi class Driver như bên dưới    
```javascript
public class Driver
{
    private ICar _car = null;

    public Driver() 
    {
    }
    [InjectionMethod]
    public void UseCar(ICar car) {
        _car = car;
    }

    public void RunCar()
    {
        Console.WriteLine("Running {0} - {1} mile ", _car.GetType().Name, _car.Run());
    }
}
```
Tương tự như Property Injection thì Method Injection cũng có 2 cách thực hiện
1) Sử dụng [InjectionMethod] Attribute
```javascript
var container = new UnityContainer();
container.RegisterType<ICar, BMW>();
            
var driver = container.Resolve<Driver>();
driver.RunCar();
```
2)  Run-time Configuration
```javascript
var container = new UnityContainer();
            
//run-time configuration
container.RegisterType<Driver>(new InjectionMethod("UseCar", new Audi()));

//to specify multiple parameters values
container.RegisterType<Driver>(new InjectionMethod("UseCar", new object[] { new Audi() }));

var driver = container.Resolve<Driver>();
driver.RunCar();
```

### 3.4. Register Named Type
```javascript
var container = new UnityContainer();
container.RegisterType<ICar, BMW>();
container.RegisterType<ICar, Audi>("LuxuryCar");

// Register Driver type            
container.RegisterType<Driver>("LuxuryCarDriver", 
                new InjectionConstructor(container.Resolve<ICar>("LuxuryCar")));

Driver driver1 = container.Resolve<Driver>();// injects BMW
driver1.RunCar();

Driver driver2 = container.Resolve<Driver>("LuxuryCarDriver");// injects Audi
driver2.RunCar();
//Output:
//Running BMW - 1 Mile 
//Running Audi - 1 Mile
```
Trong ví dụ trên, chúng tôi đã đăng ký lớp Driver với tên "LuxuryCarDriver" và chỉ định một đối tượng của InjectionConstructor. 
The new InjectionConstructor(container.Resolve<ICar>("LuxuryCar")) chỉ định một construction injection cho lớp Driver và object được tiêm là Audi bởi vì container.Resolve("LuxuryCar") returns Audi object.    
    
### 3.4. Register Instance

Container Unity cho phép chúng ta đăng ký một thể hiện hiện có bằng cách sử dụng phương thức RegisterInstance (). Vì vậy, container unity sẽ không tạo một thể hiện mới cho loại đã đăng ký và sẽ sử dụng cùng một thể hiện mỗi lần.

```javascript
var container = new UnityContainer();
ICar audi = new Audi();
container.RegisterInstance<ICar>(audi);

Driver driver1 = container.Resolve<Driver>();
driver1.RunCar();
driver1.RunCar();

Driver driver2 = container.Resolve<Driver>();
driver2.RunCar();
//Output:
//Running Audi - 1 Mile 
//Running Audi - 2 Mile 
//Running Audi - 3 Mile
```
# 4. Kết bài:
Nội dung bài viết chỉ mới ở mức làm quen và tìm hiểu về Unity Container. Các bạn có thể tham khảo thêm ở link bên dưới 

Hy vọng bài viết này một phần nào đó có thể giúp các bạn về Unity Container framwork, chúc các bạn thành công.

**Tài liệu thàm khảo:**

https://www.tutorialsteacher.com/ioc/unity-container

https://docs.microsoft.com/en-us/previous-versions/msp-n-p/ff647202(v%3dpandp.10)