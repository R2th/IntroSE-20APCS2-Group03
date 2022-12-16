Hôm nay mình sẽ hướng dẫn mọi người cách sử dụng Realm Swift cơ bản để lưu dữ liệu vào local của device trong iOS nhé.
# Realm là gì ?
Realm Moblie Database (gọi tắt là RMD) là một NoSQL ( Not Only SQL). Nó hướng tới việc xây dựng một ứng dụng theo hướng “Offline database first”. Điều này có nghĩa là ứng dụng vẫn có thể hoạt động dù cho không có kết nối mạng, dữ liệu sẽ được lưu trực tiếp trên thiết bị, người dùng vẫn có thể tiến hành mọi việc một cách thuận lợi.

RMD lưu trữ dữ liệu dưới dạng Object và nó cũng cung cấp các hàm và phương thức để có thể truy vấn dữ liệu mà không cần thông qua câu truy vấn SQL. Phần core của RMD được viết bằng C++ và là mã nguồn mở, người dùng có thể tùy chỉnh lại theo ý muốn cá nhân.

Cross-flatform và đã có phiên bản cho các ngôn ngữ sau: Swift, Java, Objective – C, Xamarin, React Native.

Cung cấp miễn phí.
# Cài đặt Realm vào project
Mình sẽ cài đặt realm thông qua Cocoapods.
1. Cài đặt Cocoapods 1.10.0 trở lên.
2. Trong terminal chạy câu lệnh `pod repo update` để update Cocoapods lên phiên bản mới nhất.
3. Vào thư mục project của bạn, dùng câu lệnh `pod init` để tạo podfile
4. Trong podfile bạn thêm` pod 'RealmSwift'` rồi lưu lại.
5. Tiếp tục ở terminal chạy câu lệnh `pod install` để install RealmSwift.
6. Sử dụng file .xcworkspace do CocoaPods tạo để làm việc với project của bạn
# Sử dụng Realm
Ở phần này mình sẽ ví dụ lưu 1 object PersonalInfo và truy xuất nó.
Realm lưu dữ liệu theo dạng object nên mình sẽ tạo 1 class PersonalInfo gồm 2 thuộc tính là name và birthdate.
## Tạo model
```
import Foundation
import RealmSwift

class PersonalInfo: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var birthdate: String = ""
    convenience init(name: String, birthdate: String) {
        self.init()
        self.name = name
        self.birthdate = birthdate
    }
}
```
## Add
Để thao tác với Realm. Đầu tiên chúng ta khởi tạo 1 biến realm với cú pháp

`let realm = try! Realm()`

Để lưu 1 object PersonalInfo chúng ta sẽ viết 1 function để lưu. Ví dụ:
```
private func saveData(name: String, birthdate: String) {
        let data = PersonalInfo()
        data.name = name
        data.birthdate = birthdate
        try! realm.write {
            realm.add(data)
        }
    }
```
Sau đó mình thực hiện lưu 2 object PersonalInfo(name: “Hoàng Anh Tuấn”, birthdate: “14/01/1998”) và PersonalInfo(name: “Hoàng Anh Tuấn”, birthdate: “06/11/2020;”)
## Get
Để lấy toàn bộ dữ liệu đã được lưu, chúng ta sử dụng
```
let list = realm.objects(PersonalInfo.self)
```
Lúc này list thuộc kiểu `Result<PersonalInfo>` và khi `print(list)` thì kết quả nhận được là
```
Results<PersonalInfo> <0x7fde9851bcc0> (
	[0] PersonalInfo {
		name = Hoàng Anh Tuấn;
		birthdate = 14/01/1998;
	},
	[1] PersonalInfo {
		name = Hoàng Anh Tuấn;
		birthdate = 06/11/2020;
	}
)
```
Để sử dụng thì khá là khó khăn nên mình suy nghĩ tới việc đưa nó về 1 mảng object PersonalInfo thì xử lý trong code sẽ dễ hơn. Vì vậy mình sẽ viết 1 phương thức chuyển nó thành mảng object:
```
extension Results {
    func toArray<T>(ofType: T.Type) -> [T] {
        var array = [T]()
        for i in 0 ..< count {
            if let result = self[i] as? T {
                array.append(result)
            }
        }
        return array
    }
}
```
Như vậy  để lấy 1 list các object đã lưu mình sẽ sử dụng :
```
let list = realm.objects(PersonalInfo.self).toArray(ofType: PersonalInfo.self)
```
Lúc này list đã là 1 mảng object. Thao tác với nó trong code sẽ dễ hơn nhiều ^^

Đây là lấy toàn bộ object được lưu, vậy còn lấy object theo 1 điều kiện nào đó thì sao? Thật may Realm cung cấp cho chúng ta phương thức Filter. Vậy sử dụng nó như thế nào? Mình sẽ ví dụ 1 phương thức lấy dữ liệu theo điều kiện:
```
private func getObject(name: String, birthdate: String) -> [PersonalInfo] {
        let data = realm.objects(PersonalInfo.self).filter("name = %@ AND birthdate = %@ ", name, birthdate).toArray(ofType: PersonalInfo.self)
        return data
}
```
Ở đây mình dùng AND để kết hợp 2 điều kiện, bạn cũng có thể dùng OR để lấy object theo 1 trong 2 điều kiện nhé
## Delete
Để delete 1 object thì mình sẽ tự viết 1 function để xoá:
```
private func deleteData(name: String, birthdate: String) {
        let dataFilters = realm.objects(PersonalInfo.self).filter("name = %@ AND birthdate = %@ ", name, birthdate)
        try! realm.write {
            realm.delete(dataFilters)
        }
    }
```
## Update
Vậy  còn update thì sao? Mình sẽ tự viết 1 function để update:
```
private func updateObject(currentName: String, currentBirthdate: String, newName: String, newBirthdate: String) {
        let dataFilter = realm.objects(PersonalInfo.self).filter("name = %@ AND birthdate = %@ ", currentName, currentBirthdate).toArray(ofType: PersonalInfo.self).first
        if let dataFilter = dataFilter {
            try! realm.write {
                dataFilter.name = newName
                dataFilter.birthdate = newBirthdate
            }
        }
    }
```
Bài hướng dẫn sử dụng Realm cơ bản của mình đến đây là hết. Cảm ơn mọi người đã đọc