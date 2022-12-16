** Để làm việc đa số với ứng dụng sử dụng singletone để lưu dữ liệu, nhưng có một số data chúng ta cần kill app vẫn phải lưu được, chắc hẳn các bạn cần một nơi để lưu data đó, như là core data, hoạc Realm, Nhưng đối với dữ liệu ít thì sử dụng core data hoặc Realm là dùng con dao mổ bò để giết một con gà, Nên hôm nay mình sẽ chia sẻ đến các bạn lưu Object lồng Object với NSUserDefault **

Bước 1.  Tạo struct là Dog và class được tham chiếu đến là  Sound

```
import UIKit
import Foundation

struct Dog: Codable {
    var name: String
    var age: Int
    var sound: Sound
}


class Sound: Codable {
    var sound: String
    init(sound: String) {
        self.sound = sound
    }
}
```

Bước 2: tạo đối tượng dog để save xún NSUserDefault
```
let dog = Dog(name: "Rex", age: 18, sound: Sound(sound: "gaugau"))
```

Bước 3: viết hàm save xún với key là dogObject

```
func saveObject(dog: Dog) {
    do {
        if let jsonData = try? JSONEncoder().encode(dog) {
            UserDefaults.standard.setValue(jsonData, forKey: "dogObject")
        }
    } catch {
    //do something print error
   }
}
```
Các bạn để ý NSUserDefault có thể save được nhiều kiểu dữ liệu nhưng hãy cân nhắc là data bé thì mới thích hợp, còn data lớn thì hãy dùng Database nhé

B4. lấy dog Object lên từ NSUserDefault

```
func getObject(){
    let dataConverted = UserDefaults.standard.value(forKey: "dogObject") as! Data
    do {
        if let dogDecode = try? JSONDecoder().decode(Dog.self, from: dataConverted) {
            print(dogDecode.name)
            print(dogDecode.sound.sound)
        }
    } catch {}
}
``` 

Như vậy theo cách trên của mình thì đã lưu được 1 object lồng nhau xún NSUserDefault rồi, case này thích hợp cho những app không dùng database rườm rà nhưng cần lưu lại profile chẳng hạn.
Chỉ là kiến thức nhỏ thôi nhưng lúc cần thì cũng tiện lắm đấy nhé, Chúc các bạn học iOS vui vẻ.