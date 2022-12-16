## UserDefaults trong Swift 5.1
![](https://images.viblo.asia/faf0cff0-b33f-4cf8-9f4f-5c27a93b9f7b.jpeg)
Trong Ứng dụng iOS để lưu dữ liệu nhỏ, chúng ta sẽ sử dụng UserDefaults.
Đây là giải pháp chuyên nghiệp để dễ dàng xử lý những điều này.
### UserDefaults
Tại sao lại là UserDefaults? Bởi vì đôi khi chúng ta cần lưu một lượng nhỏ dữ liệu như cài đặt, trạng thái hoặc bản ghi trong ứng dụng của mình và chúng ta có thể sử dụng dữ liệu này thay cho Core Data.
Điều này có thể hỗ trợ lưu các loại dữ liệu như Bool, Dictionary, Int, String, Data, và Array.
### Lưu giá trị kiểu String
```
UserDefaults.standard.set("Doom", forKey: "name")
```
### Lấy ra giá trị String
```
let name = UserDefaults.standard.string(forKey: “name”) ?? “”
```
Tại sao chúng ta sử dụng "name" ở đây? Đây là key được sử dụng để lưu và lấy dữ liệu. Mỗi phần dữ liệu chúng ta có thể lưu trữ bằng key duy nhất, nếu không, nó sẽ thay thế dữ liệu cũ bằng dữ liệu mới.
Thêm một ví dụ về kiểu dữ liệu ...
### Lưu giá trị Boolean
```
UserDefaults.standard.set(true, forKey: “userlogin”)
```
### Lấy ra giá trị Boolean
```
let status = UserDefaults.standard.bool(forKey: “userlogin”) ?? false
```
### Một ví dụ nhỏ để quản lý chi tiết người dùng
```
struct Defaults {
    
    static let (nameKey, addressKey) = ("name", "address")
    static let userSessionKey = "com.save.usersession"
    private static let userDefault = UserDefaults.standard
    
    /**
       Nó được sử dụng để lấy ra và gán giá trị người dùng vào UserDefaults
     */
    struct UserDetails {
        let name: String
        let address: String
        
        init(_ json: [String: String]) {
            self.name = json[nameKey] ?? ""
            self.address = json[addressKey] ?? ""
        }
    }
    
    /**
     - Lưu chi tiết người dùng
     - Inputs - name `String` & address `String`
     */
    static func save(_ name: String, address: String){
        userDefault.set([nameKey: name, addressKey: address], 
                        forKey: userSessionKey)
    }
    
    /**
     - Tìm nạp các giá trị thông qua Model `UserDetails`
     - Output - `UserDetails` model
     */
    static func getNameAndAddress()-> UserDetails {
        return UserDetails((userDefault.value(forKey: userSessionKey) as? [String: String]) ?? [:])
    }
    
    /**
        - Xoá chi tiết người dùng trong UserDefault qua key "com.save.usersession"
     */
    static func clearUserData(){
        userDefault.removeObject(forKey: userSessionKey)
    }
}
```
### Sử dụng thế nào?
Lưu thông tin người dùng
```
Defaults.save("Doom", address: "Hai Duong")
```
Lấy ra thông tin:
```
let name = Defaults.getNameAndAddress.name
```
Xoá thông tin: 
```
Defaults.clearUserData()
```
## Kết luận
Đây là cách dễ nhất để xử lý ứng dụng của bạn, một lượng nhỏ dữ liệu để lưu trữ trong UserDefaults. Nó rất dễ sử dụng và hỗ trợ khá nhiều loại giá trị như Dictionary, Array, Any, String, Int, Float, Double, Bool, URL.
Một điều quan trọng hơn là UserDefaults là một thread-safe
Lưu ý:
Tránh sử dụng UserDefaults.standard.synchronize()