Có một cấu trúc được tích hợp vào nhiều ngôn ngữ lập trình được rất ít người biết và sử dụng đến, nhưng thực tế nó lại khá là hữu ích nếu bạn biết tới nó. 
Hôm nay mình sẽ giới thiệu một khái niệm đó là **Reflection**

## **Reflection là gì ?**

Về mặt ngôn ngữ Reflection có thể tạm dịch là phản chiếu
Ở đây Reflection nói tới khả năng quan sát và chỉnh sửa cấu trúc và hành động của một đối tượng trong runtime.

Nghe thì có vẻ rất trừu tượng, tuy nhiên để hiểu đơn giản nhất thì Reflection giúp bạn có thể truy cập vào thuộc tính hay hành động của một object trong runtime.


Mình sẽ đưa ra ví dụ cho các bạn dễ hiểu hơn :

![](https://images.viblo.asia/aac272af-e53e-4893-89dd-8797078f02ac.png)

- Các bạn đã thấy phía trên mình khai báo class tên là Dog với 2 thuộc tính là name và age, dễ thấy chúng đều là các thuộc tính private và không thể đọc chúng 1 cách bình thường. Vậy làm thế nào để có thể đọc được chúng ? Vấn đề này sẽ được giải quyết dễ dàng bằng Reflection

- Tiếp đến, giả sử trong trường hợp bạn sử dụng một lib, nó chỉ cung cấp cho bạn interface của 1 class nhưng bạn lại muốn log tất cả các thuộc tính của chúng. Reflection cũng sẽ giúp bạn giải quyết việc này.

Tuy nhiên đối với Swift thì Reflection bị giới hạn hơn so với các ngôn ngữ khác, nó chỉ có khả năng đọc(read-only) đối với các thuộc tính của object.

*Ở đây mình nói object chứ không phải class bởi vì class chỉ là một trong số loại object ngoài ra còn có : struct, enum, tuple, Optional, Collection, Dictionary và Set.*

![](https://images.viblo.asia/56b98d78-8b25-4668-8774-73ba2f92b274.png)


## Let's go ! Giờ chúng ta sẽ đi sâu hơn về Swift's reflection

***Trên ngôn ngữ swift, để xây dựng reflection apple đã tạo ra một struct gọi là Miror***

Để tạo ra Miror chỉ cần một dòng lệnh rất đơn giản :

```
let mickey = Dog(name: "Mickey", age: 2)
let mirror = Mirror(reflecting: myDog)
```

Mirror cung cấp một số function để chúng ta truy cập vào đối tượng.

``` 
print("Dog is \(mirror.displayStyle.debugDescription)" ) // 1
print("name of dog is \(String(describing:  mirror.descendant("name")))")

// 3
for (label, value) in mirror.children {
    print (label, value)
}

```

Phía trên mình có sử dụng 3 method mà Mirror cung cấp.

- (1) mình sử dụng **displayStyle** để lấy về kiểu của đối tương mickey
- (2) mình sử dụng ***descendant*** để tìm xem gía trị của thuộc tính có tên là ***name***
- (3) mình sử dụng  ***children*** để liêt kê tất cả các thuộc tính mà đối tượng mickey chứa.

và kết quả thu được là
 
>
> Dog is Optional(Swift.Mirror.DisplayStyle.class)
> 
> name of dog is Optional("Mickey")
> 
> name Mickey
> 
> age 2

## Ứng dụng của Reflection


- Có một ứng dụng rất phổ biến mà Reflection đó là phục vụ cho viêc debug, log thông tin của một đối tượng. Rõ ràng trong runtime chúng ta không thể viết thêm code để log thông tin của object vì thế để làm được điều này chúng ta phải dùng Mirror 
- Ứng dụng tiếp theo cũng là thứ mình hay dùng nhất đó là khi mà object của bạn có rất nhiều thuộc tính như user chẳng hạn. Trong màn đăng ký đối tựơng user sẽ được tạo ra với rất nhiều thuộc tính, sau đó bạn cần method POST để đấy các thuộc tính đó lên server, sẽ thật là ngốc nghếch khi bạn phải gõ tất cả các thuộc tính kèm với giá trị của nó hay dùng các lệnh if-else để check xem trường nào trống để đưa ra các message thông báo. Okay xem qua đoạn code dưới đây của mình :

```
//1
class BaseModel {
    
    private var ignoresParams: [String] = []
    
    private func listPropertiesWithValues() -> [String: Any] {
        var params: [String: Any] = [:]
        
        //1.1
        let mirror = Mirror(reflecting: self)
        
        //1.2
        mirror.children.forEach { (attr) in
            //1.3
            guard let propertyName = attr.label else { return }
            //1.4
            guard !ignoresParams.contains(propertyName) else { return }
            //1.5
            if let value = attr.value as? BaseModel {
                params[propertyName] = value.exportParams()
            } else {
                //1.6
                params[propertyName] = attr.value
            }
        }
        return params
    }
    
    func setIgnores(params: [String]) {
        ignoresParams = params
    }
    
    func exportParams() -> [String: Any] {
        return listPropertiesWithValues()
    }
    
}

//2
final class User: BaseModel {
    var firstName: String = ""
    var lastName: String = ""
    var birthday: String = ""
    var description: String = ""
    var address: String = ""
    var job: String = ""
    var hobby: [String] = []
    
    init(firstName: String, lastName: String, birthday: String,
         description: String, address: String, job: String, hobby: [String]) {
        self.firstName = firstName
        self.lastName = lastName
        self.birthday = birthday
        self.description = description
        self.address = address
        self.job = job
        self.hobby = hobby
    }
    
}

//3
let user = User(firstName: "Nguyen Van",
                lastName: "A",
                birthday: "29/02/1998",
                description: "Hello",
                address: "Framgia Inc Keangnam Landmark Tower, Nam Từ Liêm, Ha Noi",
                job: "IOS developer",
                hobby: ["Play game", "Play football"])

//4
user.setIgnores(params: ["description"])

//5
print(user.exportParams())

```

Tạm thời bỏ qua (1) nhìn xuông phía dưới các bạn đều có thể dễ dàng hiểu được mình viết gì đúng không.
- Đầu tiên đó là tạo một class User với các thuộc tính
- Tiếp đến là khởi tạo user
- Sau đó mình setIgnores cho một số param, mục đích là mình muốn loại bỏ thuộc tính đó khi export ra tham số gửi lên server.
- Cuối cùng là sử dụng hàm exportParams để tạo ra tham số cho server. 

Okay xem kêt quả nhé :

> ["job": "IOS developer", "firstName": "Nguyen Van", "hobby": ["Play game", "Play football"], "birthday": "29/02/1998", "address": "Framgia Inc Keangnam Landmark Tower, Nam Từ Liêm, Ha Noi", "lastName": "A"]
> 

Thấy không chỉ bằng một dòng code exportParams mình sẽ không cần phải những dòng lệnh dài dòng, copy-paste đôi khi còn bị nhầm nữa. Vậy hãy quay trở lại (1) để xem mình đã làm gì ở đây nhé

- Ở 1.1 mình tạo ra một Mirror cho chính class hiện tại, mirror này sẽ dung để truy cập vào các thuộc tính của class đó
- Tiếp theo 1.2 mình sử dụng vòng lặp forearch để duyệt tất cả các con (lable,value) có class
- 1.3 là để kiểm tra loại bỏ case lable rỗng
- 1.4 là để loại bỏ các tham số mà mình muốn bỏ qua
- 1.5 Mình sẽ check xem nếu giá trị con là kiểu BaseModel mình sẽ đệ qui nó để có thể đưa ra một tham số con.
- 1.6 Nếu giá trị được check chỉ là kiểu dữ liệu thuần thì lúc này dữ liêu sẽ được gán với label tương ứng

Như vậy là mình có thể duyệt qua tất cả các thuộc tính trong class và đưa chúng ra dạng [String, Any ] được sử dụng làm tham số cho server.


## Kết. 


Qua bài viết này mình đã giới thiệu cho các bạn khái niệm Reflection, cách mà apple đã implement nó trên Swift language bằng Mirror và một số ứng dụng, hi vọng các bạn thấy bãi viết hữu ích, có thể tìm ra nhiều ứng dụng hay hơn nữa và cùng chia sẻ cho mọi người để coding trở nên thú vị hơn.