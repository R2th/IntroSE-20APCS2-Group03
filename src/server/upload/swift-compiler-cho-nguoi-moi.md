*Cách build executable file từ Swift source file*

### Compile Swift source files

Khi bạn có 1 file swift, và bạn chỉ muốn chạy riêng file đó thôi thì bạn sẽ làm thế nào? Liệu bạn có cần tạo hẳn 1 Xcode project hay playground chỉ để chạy file này hay không?

Câu trả lời là không cần thiết. Để build và run một file swift chúng ta có thể sử dụng Swift compiler để tạo ra một binary executable file, sau đó run file này. 
Cách làm như sau:
Đầu tiên chúng ta tạo một file *main.swift* (lưu file ở đâu thì tùy các bạn nhé). File này chỉ đơn giản là print một dòng text "Hello World!".

```swift
// main.swift
print("Hello world!")
```

Chúng ta không cần phải import Foundation framework, bởi vì hàm print đã nằm trong Swift standard library.

Giờ làm sao để biến file này thành một file executable mà chúng ta có thể run bất cứ lúc nào? 

Chúng ta sẽ phải compile file này thành một file binary executable bằng Swift compiler. Câu lệnh mà chúng ta sẽ sử dụng là *swiftc*.

Mở terminal và cd vào folder chứa file main.swift, sau đó nhập vào dòng lệnh sau:
```shell
swiftc main.swift 
```

Bạn sẽ thấy một file mới có tên *main* xuất hiện trong folder. Đây là một executable file được compile từ file *main.swift*. 

Để chạy file này, chúng ta đơn giản gọi tên file đó.
```shell
./main

# prints: 
Hello World
```


Chúng ta cũng có thể chỉ định tên của file output bằng cách sử dụng parameter -o. Tất nhiên parameter này là optional, nếu bạn không chỉ định thì mặc định compiler sẽ lấy tên của file .swift làm tên của file executable (như ví dụ trên là *main*). 

Chạy lại dòng lệnh sau trong terminal:

```shell
swiftc main.swift -o hello
```

Một file executable mới có tên là *hello* xuất hiện trong folder. Và để chạy file này tất nhiên chỉ cần:
```shell
./hello

# prints: 
Hello World
```

### Arguments và flags
Câu lệnh *swiftc* cũng có rất nhiều loại flags và arguments khác mà bạn có thể sử dụng để tùy chỉnh quá trình compile. Để xem list các flags và arguments, bạn có thể thêm -h hoặc --help.

```shell
swiftc -h
```

### Custom Swift compiler flags
Có thể sẽ có lúc bạn muốn tự tạo một custom flag để chỉ định đoạn code trong source file mà bạn muốn chạy. Ví dụ phổ biến nhất chính là flag DEBUG. 

Dưới đây là một ví dụ với file *main.swift*:
```swift
// main.swift
#if(DEBUG)
    print("debug mode")
#endif
print("Hello world!")
```

Để chỉ định sử dụng một flag bạn cần sử dụng argument -D. Với file *main.swift* mới này nếu bạn chạy swiftc command thông thường thì output sẽ chỉ có "Hello world!", nhưng nếu chúng ta thêm flag DEBUG thì đoạn text "debug mode" cũng sẽ được print ra.

```shell
swiftc main.swift -D DEBUG

./main

# prints: 
debug mode
Hello world!
```
Hoặc chỉ với một dòng lệnh
```shell
swiftc main.swift -D DEBUG && ./main

# prints: 
debug mode
Hello world!
```

### Compile nhiều Swift file

Vậy nếu bạn muốn compile nhiều hơn 1 Swift source file thành một file binary duy nhất thì sao? 

Điều này hoàn toàn có thể. Chúng ta cũng xem ví dụ dưới đây.

Đầu tiên ta tạo thêm một file *point.swift* trong cùng directory với file *main.swift*:

```swift
// point.swift
struct Point {
    let x: Int
    let y: Int
}
```

Giờ trong file *main.swift*, bạn có thể sử dụng struct Point này. Do cả 2 file đang ở trong cùng 1 directory, nên bạn sẽ không cần sử dụng keyword import. 

```swift
// main.swift
#if(DEBUG)
    print("debug mode")
#endif
let p = Point(x: 4, y: 20)

print("Hello world!", p.x, p.y)
```

Bây giờ, để compile cả 2 file thành một file duy nhất, chúng ta chỉ cần gọi tên cả 2 file khi sử dụng swiftc command. Thứ tự tên các file không quan trọng, compiler hoàn toàn đủ thông minh để xác định sự phụ thuộc giữa các file với nhau.

Chạy dòng lệnh sau trên terminal:
```shell
swiftc point.swift main.swift -o point-app

./point-app

# prints: 
Hello world! 4 20
```

Tương tự, nếu bạn muốn tạo một file executable chạy ở chế độ debug, bạn cần add thêm flag DEBUG khi compile 2 file swift trên:

```shell
swiftc point.swift main.swift -D DEBUG -o point-app-debug

./point-app-debug

# prints: 
debug mode 
Hello world! 4 20
```

Trên đây là cách sử dụng Swift compiler để tạo binary executable file. Hi vọng bài viết của mình đã giúp cho các bạn có thêm một công cụ hữu ích.