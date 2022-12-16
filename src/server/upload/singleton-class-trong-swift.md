Singleton là một design pattern rất phổ biến trong phát triển phần mềm. Hầu hết các lập trình đều đang sử dụng design pattern này. Singleton rất đơn giản, phổ biến và dễ sử dụng trong dự án của bạn. Nó cùng lúc khởi tạo thể hiện lớp của bạn chỉ với thuộc tính tĩnh và nó sẽ chia sẻ thể hiện lớp của bạn trên toàn project.
Chúng ta đã sử dụng rất nhiều lần các API của Apple Foundation như - UserDefaults.standard, FileManager.default. Đó là những singleton class pattern.
### **Một số ví dụ đơn giản để sử dụng class**
```
class LocationManager{
//MARK: - Location Permission
    func requestForLocation(){
        //Code Process
        print("Location granted")
    }
    
}
//Access the class
let location = LocationManager() //initialization class
location.requestForLocation()    //Call function here
```
Ví dụ trên là 1 class không có sử dụng singleton. Để truy cập bất kì hàm nào, chúng ta cần khởi tạo 1 đối tượng của LocationManager để gọi đến chúng. Để tránh vấn đề này, chúng ta sẽ sử dụng single class với 1 static instance.
### **Tạo single class**
```
class LocationManager{
    
    static let shared = LocationManager()
    
    init(){}
    
    func requestForLocation(){
        //Code Process
        print("Location granted")
    }
    
}
//Access class function with Singleton Pattern 🚀
LocationManager.shared.requestForLocation()  //"Location granted"
//Still you can use your class like this
let location = LocationManager()
location.requestForLocation()
```
### **Cách tốt hơn để tạo single class**
```
class LocationManager{
    
    static let shared = LocationManager()
    
    var locationGranted: Bool?
    //Initializer access level change now
    private init(){}
    
    func requestForLocation(){
        //Code Process  
        locationGranted = true     
        print("Location granted")
    }
    
}
//Access class function in a single line
LocationManager.shared.requestForLocation()
```
Sau khi thay đổi cấp độ truy cập của trình khởi tạo, bạn sẽ gặp loại lỗi này
![](https://images.viblo.asia/1f11444e-536d-4af5-8746-8a889988ed61.png)
Mỗi lớp có trình khởi tạo công khai mặc định, nó thay đổi thành riêng tư. Bây giờ bạn không thể khởi tạo lại singleton class của mình.
### **Sử dụng Singleton như thế nào?**
```
//In a single line you can access easily 
LocationManager.shared.requestForLocation() // "Location granted"
//Access variable value
print(LocationManager.shared.locationGranted ?? false) // true
```
### **Kết luận**
Giờ đây, bạn đã hiểu cách tạo Singleton class trong dự án của bạn. Nó mất rất ít thời gian để tạo ra. Dễ dàng sử dụng bên trong dự án. Nó có một số lợi thế và bất lợi. Nếu bạn sử dụng nhiều mẫu Singleton hơn trong các dự án của mình, thì khó có thể quản lý vòng đời của Singleton Class. Ngoài ra, nó vẫn duy trì trạng thái chia sẻ toàn cục

Nguồn:[Singleton Class in Swift](https://medium.com/@nimjea/singleton-class-in-swift-17eef2d01d88)