SwiftyJSON là lib dùng để giải quyết các vấn đề về json, bài viết này mình ko đề cập đến cách sử dụng SwiftyJSON.(Vì cách sử dụng nó rất dễ dàng nên bạn có thể search google)
Mà mình chủ yếu nói về làm thế nào tạo 1 class và cách dùng nó 1 cách đơn giản và hiệu quả.

Thông thường, dữ liệu của app thường được lấy từ server.App Client call api, yêu cầu server trả về 1 thông tin nào đó, ví dụ là thông tin của user.Server xử lý và trả về client thông tin theo kiểu json.
Phía client sẽ tạo class user với parse json data này (ở đây mình sẽ dùng SwiftyJSON để parse).
Bài viết này, mình muốn trình bày 1 cách phân chia các hàm để parse json trong class mà mình thường hay làm.
# Class
 Thường việc tạo class và các biến tuỳ thuộc vào dự liệu json trả về.
 
 ```
{
  "id":"abc1",
  "user_name":"user_name1",
  "first_name":"A",
  "last_name":"Tran Van",
  "gender": 1,
  "email":"abc@gmail.com"
}
```

Ví dụ với đoạn json như trên thì mình sẽ tạo class User như sau:
```
import Foundation
import RealmSwift
import SwiftyJSON

class User: Object {

    var id: String?

    var firstName: String?

    var lastName: String?

    var email: String?
     
    var gender: Bool?
        
}
```
# Hàm parse Json
Hàm parse json sẽ được viết riêng như sau:
```
func parseJson(_ json: JSON) {
        self.id = json[JSONKey.id].string
        self.firstName = json[JSONKey.firstName].string
        self.lastName = json[JSONKey.lastName].string
        self.email = json[JSONKey.email].string
        self.gender = json[JSONKey.gender].bool
    }
```

Tạo struct JSONKey để create key:
```
struct JSONKey {
    static let id                           = "id"
    static let name                         = "name"
    static let userName                     = "user_name"
    static let firstName                    = "first_name"
    static let lastName                     = "last_name"
    static let gender                       = "gender"
    static let email                        = "email"
    static let accessToken                  = "access_token"
    static let clientId                     = "client_id"
    static let clientSecret                 = "client_secret"
    static let grantType                    = "grant_type"
    static let applicationState             = "application_state"
    static let aps                          = "aps"
    static let customer                      = "customer"
}
```

# Hàm Init
Hàm init truyền vào 1 object bất kỳ, cho dù nó có phải là json hay bất kỳ dữ liệu nào.
Trong hàm sẽ validate nếu dữ liệu không hợp lệ và sẽ trả về nill

```
 // MARK: - Init
    convenience init?(jsonObject: Any?) {
        guard let jsonData = jsonObject else { return nil }
        self.init()

        // parse json
        let json = JSON(jsonData)
        self.parseJson(json)
    }

    convenience init?(json: JSON?) {
        guard let _json = json else { return nil }
        self.init()

        // parse json
        self.parseJson(_json)
    }
```
# Class sử dụng
Đơn giản mình sử dụng như sau:
```
let user = User(jsonObject: data)
```

Trong trường hợp json trả về :
```
{
  "customer": {
      "id":"abc1",
      "user_name":"user_name1",
      "first_name":"A",
      "last_name":"Tran Van",
      "gender": 1
   }
}
```

Đối với trường hợp này minh tạo 1 static class :
```
static func fromCustomer(jsonObject: Any?) -> User? {

        guard let jsonData = jsonObject else { return nil }

        // parse json
        let json = JSON(jsonData)

        return User(jsonObject: json[JSONKey.customer].object)
    }
```

Và dùng:

```
let user = User.fromCustomer(jsonObject: data)
```

# Hàm update data
Thông thường trong class sẽ có thêm 1 hàm updateData, có nhiệm vụ update thông tin mà json ko trả về.
Ví dụ, trong Class User có biến fullName gồm cách ghép firstName và lastName, thì hàm sử lý thông tin này được viết trong hàm updateData()

```
func updateData() {
        self.fullName = (self.firstName ?? "") + (self.lastName ?? "")
}
```

```
let user = User(jsonObject: data)
user.updateData()
```