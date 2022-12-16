# 1. Giới thiệu
Ở những phần trước mình đã giới thiệu 1 phần về vẽ sequence với plant uml. Do nội dung dài nên mình chia nhỏ ra để mỗi bài viết không quá dài. Hôm nay mình tiếp tục chia sẻ về nội dung này.
# 2. Kí hiệu, cách vẽ
## a. Activation và Destruction Lifeline
- Activate và deactivate được sử dụng để biểu thị kích hoạt cho các đối tượng.
- Khi một đối tượng được kích hoạt, lifeline đối tượng đó sẽ xuất hiện.
- Kích hoạt và hủy kích hoạt áp dụng cho lệnh trước đó.
- Sự phá hủy biểu thị sự kết thúc của vòng đời của một đối tượng.

Vd:
```
@startuml
participant User

User -> A: DoWork
activate A

A -> B: << createRequest >>
activate B

B -> C: DoWork
activate C
C --> B: WorkDone
destroy C

B --> A: RequestCreated
deactivate B

A -> User: Done
deactivate A
@enduml
```
Kết quả:
![](https://images.viblo.asia/9687b76d-cdfa-4db5-abd9-de34d1b8498f.png)

- Có thể sử dụng lifeline lồng nhau và có thể thêm màu trên lifeline.

Vd:
```
@startuml
participant User

User -> A: DoWork
activate A #FFBBBB

A -> A: Internal call
activate A #DarkSalmon

A -> B: << createRequest >>
activate B

B --> A: RequestCreated
deactivate B
deactivate A
A -> User: Done
deactivate A

@enduml
```

Kết quả:
![](https://images.viblo.asia/54be4388-15a1-4009-a18c-bb6f1fe85f22.png)

- Có thể tự động kích hoạt và hoạt động với các từ khóa trả về.
Vd:
```
@startuml
autoactivate on
alice -> bob : hello
bob -> bob : self call
bill -> bob #005500 : hello from thread 2
bob -> george ** : create
return done in thread 2
return rc
bob -> george !! : delete
return success

@enduml
```

kết quả:
![](https://images.viblo.asia/8ed5b42f-a2f7-4b70-8f0b-f952267b6f35.png)

## b. Return
- Lệnh **return** tạo ra một thông báo trả về với nhãn văn bản tùy chọn.
- Điểm trở lại là nguyên nhân gây ra kích hoạt lifeline gần đây nhất.
- Cú pháp là **return label** trong đó label nếu được cung cấp là bất kỳ chuỗi nào được chấp nhận cho các thông báo thông thường.

Vd:
```
@startuml
Bob -> Alice : hello
activate Alice
Alice -> Alice : some action
return bye
@enduml
```

Kết quả:
![](https://images.viblo.asia/bf59f380-07cb-4a6a-9ac1-b697a6a51779.png)

## c. Creation đối tượng
- Bạn có thể sử dụng từ khóa **create** ngay trước message đầu tiên để nhấn mạnh thực tế là thư này đang thực sự tạo ra đối tượng mới này.
Vd:
```
@startuml
Bob -> Alice : hello

create Other
Alice -> Other : new

create control String
Alice -> String
note right : You can also put notes!

Alice --> Bob : ok

@enduml
```

Kết quả:
![](https://images.viblo.asia/a6d1f6b8-612c-4ee1-8f9a-8f684139a388.png)

## d. Cú pháp tắt để: activation, deactivation, creation
- Ngay sau khi chỉ định đối tượng mục tiêu, có thể sử dụng cú pháp sau:
    ++ Kích hoạt mục tiêu (tùy chọn màu có thể theo sau)
    -- Hủy kích hoạt nguồn
    ** Tạo một phiên bản của mục tiêu
    !! Hủy một phiên bản của mục tiêu

Vd:
```
@startuml
alice -> bob ++ : hello
bob -> bob ++ : self call
bob -> bib ++  #005500 : hello
bob -> george ** : create
return done
return rc
bob -> george !! : delete
return success
@enduml
```

Kết quả:
![](https://images.viblo.asia/5632a823-bfb3-406d-8131-b820a72f0c70.png)

- Sau đó, bạn có thể kết hợp kích hoạt và hủy kích hoạt, trên cùng một dòng.
 Vd:
```
@startuml
alice   ->  bob     ++   : hello1
bob     ->  charlie --++ : hello2
charlie --> alice   --   : ok
@enduml
```

Kết quả:
![](https://images.viblo.asia/6d7d7f82-3889-45df-8abb-1ec0f06e1e9b.png)

Vd:
```
@startuml
alice -> bob   --++ #gold: hello
bob   -> alice --++ #gold: you too
alice -> bob   --: step1
alice -> bob   : step2
@enduml
```

Kết quả:
![](https://images.viblo.asia/674d373c-19ba-4658-b4c5-a0b1af62c102.png)

## e. Message đến và đi
- Bạn có thể sử dụng các mũi tên đến hoặc đi nếu bạn muốn tập trung vào một phần của sơ đồ.
- Sử dụng dấu ngoặc vuông để biểu thị bên trái "[" hoặc bên phải "]" của sơ đồ.

Vd:
```
@startuml
[-> A: DoWork

activate A

A -> A: Internal call
activate A

A ->] : << createRequest >>

A<--] : RequestCreated
deactivate A
[<- A: Done
deactivate A
@enduml
```

Kết quả:
![](https://images.viblo.asia/6c80c145-5a42-48cd-9ced-f72d2e4098c8.png)

- Bạn cũng có thể có cú pháp sau.

Vd:
```
@startuml
participant Alice
participant Bob #lightblue
Alice -> Bob
Bob -> Carol
...
[-> Bob
[o-> Bob
[o->o Bob
[x-> Bob
...
[<- Bob
[x<- Bob
...
Bob ->]
Bob ->o]
Bob o->o]
Bob ->x]
...
Bob <-]
Bob x<-]

@enduml
```

Kết quả:
![](https://images.viblo.asia/e528fa90-af1f-4688-99d2-fa4bd1ef7e43.png)

# 3. Phần kết
- Mình chia nhỏ các nội dung theo từng phần để mỗi bài không quá dài. Nếu có ý kiến đóng góp, xin comment ở phía dưới.
- Mình xin được lắng nghe để những bài viết sau được hiệu quả hơn.