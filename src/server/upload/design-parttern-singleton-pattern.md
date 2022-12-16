# 1. Singleton Parttern là gì?
Singleton Parttern là một design parttern cực kì phổ biến. Hầu hết mọi lập trình viên đều sử dụng singleton Parttern vào dự án của họ.
Singleton Parttern đảm bảo chỉ duy nhất một instance được tạo ra và nó sẽ cung cấp cho bạn một method để có thể truy xuất được thể hiện duy nhất đó mọi lúc mọi nơi trong chương trình. 

![1_BIz_fzj8rSjrTYVQC9MLHA.png](https://images.viblo.asia/ab93add3-d764-453e-905c-966b6e1b17a1.png)
# 2. Chúng ta nên sử dụng Singleton Parttern khi nào?
Trong thực tế chúng ta chỉ muốn tạo ra một struct hay class một lần trong project , khi đó chúng ta sẽ tổ chức struct hay class đó thành Singleton. Việc này sẽ giúp chúng ta không phải tạo ra nhiều instance tránh lãng phí bộ nhớ và dễ dàng quản lý source code hơn.
# 3. Cách để triển khai Singleton Parttern với Swift
- Chỉ định access modifiers cho constructor là **private**
- Tạo ra một **public static method return về chính instance** được khởi tạo.

Để hiểu rõ hơn chúng ta cùng quan sát ví dụ dưới đây:
``` Swift
class LocationManager {
    
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

Có một lưu ý khi triển khai Singleton với Swift: Mọi class đều được để default access modifiers là public. Vì vậy chúng ta phải chỉ định access modifiers cho hàm init() là private để đảm bảo không thể khởi tạo instance bên ngoài class.

Ở ví dụ trên chúng ta đã tạo ra 1 singleton class LocationManager. Khi chung ta muốn truy cập đến các phương thức trong LocationManager, chúng ta chỉ việc thông qua phương thức shared.
Nếu chúng ta cố tính tạo ra 1 instance thì ngay lập tức sẽ bị lỗi. 
![1_PoJfJSC8mLRk9oMq4exFpg.png](https://images.viblo.asia/845015d2-b159-415d-ac96-c200bfa37beb.png)

# 4. Tổng kết
Qua bài viết chúng ta đã cùng nhau tìm hiểu về Singleton Parttern và cách tạo ra một class Singleton. Việc tạo ra một class hay struct singleton vô cùng đơn giản và dễ áp dụng trong một dự án. Rất mong thông qua bài viết này sẽ đem đến những kiến thức bổ ích cho bạn đọc.

Một số tài liệu tham khảo thêm:
- https://medium.com/@nimjea/singleton-class-in-swift-17eef2d01d88
https://www.tutorialspoint.com/design_pattern/singleton_pattern.htm