Thì đúng với như tiêu đề thì hôm nay mình sẽ hướng dẫn cho các bạn cách để ta có thể đọc và xử lý dữ liệu trong firebase với thằng combine nó sẽ như thế nào. Rồi chúng ta cùng bắt đầu thôi nào.
# Cấu hình FireBase cho App 
Thì Firebase là một dịch vụ cơ sở dữ liệu thời gian thực được cung cấp bởi Google và hoạt động trên nền tảng đám mây. Nó giúp các lập trình phát triển nhanh các ứng dụng di động bằng cách đơn giản hóa các thao tác với cơ sở dữ liệu. Và ở trong bài hôm nay thì mình sẽ sử dụng thằng realtime database thì nó là: thằng lưu trữ và đồng bộ dữ liệu người dùng thời gian thực. Các ứng dụng hỗ trợ tính năng này có thể lưu trữ và lấy dữ liệu từ máy chủ rất nhanh. Các dữ liệu được lưu trữ trong hệ thống cơ sở dữ liệu hỗ trợ NoSQL và được đặt trên nền tảng máy chủ đám mây. Dữ liệu được ghi và đọc với thời gian thấp nhất tính bằng mili giây.

Và để cấu hình thì đầu tiên các bạn phải vào /settings/general/ của cái firebase của các bạn. Để tải về GoogleService-Info.plist và rồi bỏ nó vào trong file app của ta. Sau đó thì khác với bên UIKit một chút thì ở bên SwiftUI ta sẽ gọi hàm configure trong init của cái view tổng như này.
![Screen Shot 2021-07-21 at 09.02.12.png](https://images.viblo.asia/d0c4e338-c8a1-4e47-a8ea-b793821f52c6.png)

Vậy là chúng ta đã xong phần thiết lập cấu hình firebase rồi đó. Tiếp theo thì ta sẽ bắt đầu tạo ra một cái ứng dụng đơn giản để demo bài học hôm nay nhé.
![](https://images.viblo.asia/828945ed-4be1-41af-87e8-13b18c2b9307.png)

# Tạo service cho thằng firebase

## Lấy tất cả dữ liệu của một cái reference

``` swift
func getAllDataOfChildNote<T: Decodable, E: Error>(child: String) -> Future<[T], E> {
        return Future({ promise in
            Database.database().reference().child(child).observeSingleEvent(of: .value) { snapshot in
                var data: [T] = []
                for note in snapshot.children {
                    guard let snap = note as? DataSnapshot,
                          let value = snap.value else { return }
                    do {
                        let model = try FirebaseDecoder().decode(T.self, from: value)
                        data.append(model)
                    } catch let error {
                        print("ERROR: \(error)")
                        promise(.failure(error as! E))
                    }
                }

                promise(.success(data))
            }
     })
}
```

Thì nhìn qua thì ta có thể thấy ở đây mình sử dụng thằng Future đây là một loại pulisher đặc biệt nó sẽ phát ra một giá trị duy nhất, sau đó kết thúc hoặc fail.
Nó sẽ thực hiện một lời hứa Promise. Đó là 1 closure với kiểu Result, nên sẽ có 1 trong 2 trường hợp:

Success : phát ra Output

Failure : phát ra Error

Nên khi nó chỉ trả về cho ta data sau khi các data đã được get về hết. Còn việc decode data trong firebase thì mình sẽ sử dụng thằng https://github.com/alickbass/CodableFirebase nó sẽ hổ trợ việc mình decode và encode một cách nhanh tróng và dễ dàng.
## Xử lý dữ liệu của một cái reference
```swift
func addDateChildNote<E: Error>(note: Note) -> Future<Void, E> {
        return Future { promise in
            let docData = try! FirebaseEncoder().encode(note)
            Database.database().reference().child("note").childByAutoId().setValue(docData) { error, _ in
                if let error = error {
                    promise(.failure(error as! E))
                } else {
                    promise(.success(()))
                }
            }
        }
    }

    func removeDataChildNote<E: Error>(element: Note) -> Future<Void, E> {
        return Future ({ promise in
            Database.database().reference().child("note").observeSingleEvent(of: .value) { snapshot in
                for note in snapshot.children {
                    guard let snap = note as? DataSnapshot,
                          let value = snap.value as? [String: AnyObject] else { return }
                    if let content = value["content"] as? String,
                       element.content == content {
                        Database.database().reference().child("note").child(snap.key).removeValue { error, _ in
                            if let error = error {
                                promise(.failure(error as! E))
                            } else {
                                promise(.success(()))
                            }
                        }
                        break
                    }
                }
            }
        })
    }
```
Đó như ở bên trên mình đã nói thì khi các công việc đã xong thì nó sẽ gửi cho ta một dữ liệu để báo đã tương tác dữ liệu thành công. Do ở đây là phương thức post nên ta cũng không cần nó trả về cho ta một dữ liệu nào cả nên ở đây Future<Void, E>.
# MVVM với Combine
##  Phía ViewModel
Ở bên đây do nó đang là mô hình MVVM thì nó sẽ có hai thằng là input và output 
``` swift
struct Input {
        let loadTrigger: AnyPublisher<Void, Never>
        let contentNoteTrigger: AnyPublisher<String, Never>
        let addNoteTrigger: AnyPublisher<Void, Never>
        let removeNoteTrigger: AnyPublisher<Note, Never>
    }

    struct Output {
        let notes: AnyPublisher<[Note], Never>
        let addValueSuccess: AnyPublisher<Void, Never>
        let removeValueSuccess: AnyPublisher<Void, Never>
    }

    func bind(_ input: Input) -> Output {
```

Trên đó mình đang sử dụng thằng AnyPublisher nó là Type-erased publisher Với AnyPublisher, thì không thể gọi function send( ) được.Class này đã bọc và ẩn đi nhiều phương thức & thuộc tính của Publisher.
Và để chuyển các input của người dùng trở thành một cái output mong muốn thì ta sẽ sử dụng như sau:
```swift
input.loadTrigger
            .flatMap {
                usecase.getAllDataList(child: "note")
            }
            .eraseToAnyPublisher()
```
thằng flatMap thì nó sẽ biến đổi một publisher này thành một pulisher khác.Nhưng mà khác bên rxSwift thì khi biến đổi thì kiểu dữ liệu nó trả về thành một cái cục rất rúi nhùi.
Nên sau đó ta gọi 1 function eraseToAnyPublisher(). Khi đó nó sẽ biến dữ liệu hiện tại của ta thành kiểu giá trị cho đối tượng mới là AnyPublisher. Và dữ liệu đó sẽ được trả về cho bên View xử lý.
##  Phía View
```swift
@State private var list: [Note] = []

.onReceive(output.notes) { notes in
            list = notes
 }
```
Thì nó sẽ đăng ký nhận thông báo dữ liệu được trả về dữ liệu của luồng. Thì khi bên output có dữ liệu trả về thì ta sẽ sử dụng nó để bắt lấy cái dữ liệu trả về đó thì khi có xong thì nó chỉ cần gán vào list.
Do biến list của ta đang là @State nên khi dữ liệu của nó thay đổi thì khi nó sẽ tự động cập nhật các view đang sử dụng thằng biến state đó.

Thì đến đây thì các bạn đã có cho mình đầy đủ các công cụ để networking với các loại api luôn chứ không riêng gì thằng firebase nữa

![Screen Shot 2021-07-21 at 09.43.25.png](https://images.viblo.asia/c4a7ce35-fb3f-48cb-884a-f171ce383ac0.png)

Còn đây là link project để các bạn có thể tham khảo : https://github.com/thanduchuy/SwiftUI-FirebaseAppList