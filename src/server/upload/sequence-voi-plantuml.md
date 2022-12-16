## 1. Giới thiệu
- Sequence diagram là một loại biểu đồ rất quan trọng trong việc mô tả luồng xử lý trong lập trình. Thông thường tool được sử dụng để vẽ sequence diagram là StartUml, Astah, ... . Mình sẽ giới thiệu đến các bạn một công cụ khác để vẽ sequence là PlantUML.
## 2. Bắt đầu nào!
### a. Cơ bản
- Kí hiệu "->" được sử dụng để vẽ một thông điệp giữa hai đối tượng tham gia. Những đối tượng tham gia không cần phải được khai báo rõ ràng.
- Sử dụng kí hiệu  --> để thể hiện một thông điệp đáp trả của đối tượng đến một đối tượng khác.
vd:
```
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: Another authentication Response
@enduml
```
Kết quả:
![](https://images.viblo.asia/72e1e03f-c762-45a2-b63d-ef6c12f40fa9.png)

### b. Khai báo đối tượng
Nếu từ khóa "participant" được sử dụng để khai báo một đối tượng.
Thứ tự khai báo các đối tượng sẽ là thứ tự hiển thị chúng.
Sử dụng các từ khóa khác để khai báo đối tượng, sẽ thay đổi theo từ khóa được khai báo:
```
@startuml
participant participant as Foo
actor       actor       as Foo1
boundary    boundary    as Foo2
control     control     as Foo3
entity      entity      as Foo4
database    database    as Foo5
collections collections as Foo6
queue       queue       as Foo7
Foo -> Foo1 : To actor 
Foo -> Foo2 : To boundary
Foo -> Foo3 : To control
Foo -> Foo4 : To entity
Foo -> Foo5 : To database
Foo -> Foo6 : To collections
Foo -> Foo7: To queue
@enduml
```

Kết quả:
![](https://images.viblo.asia/f452fca9-bfeb-47fb-a155-f4b0e6e6cfbd.png)

Bạn cũng có thể đổi tên đối tượng được khai báo bằng từ khóa: as.
Thay đổi màu nền của đối tượng.
```
@startuml
actor Bob #red
' The only difference between actor
'and participant is the drawing
participant Alice
participant "I have a really\nlong name" as L #99FF99
/' You can also declare:
   participant L as "I have a really\nlong name"  #99FF99
  '/

Alice->Bob: Authentication Request
Bob->Alice: Authentication Response
Bob->L: Log transaction
@enduml
```

Kết quả:
![](https://images.viblo.asia/f61a1371-7ea9-45ef-ab6e-97bcccd6f3e7.png)

Bạn có thể sử dụng từ khóa order để tùy chỉnh thứ tự hiển thị của các đối tượng.
```
@startuml
participant Last order 30
participant Middle order 20
participant First order 10
@enduml
```

kết quả:
![](https://images.viblo.asia/547f933e-9891-40ea-b1a9-584e93af1484.png)

Bạn có thể sử dụng dấu ngoặc kép để xác định đối tượng. Và bạn có thể sử dụng từ khóa as để đặt bí danh cho những đối tượng đó.

```
@startuml
Alice -> "Bob()" : Hello
"Bob()" -> "This is very\nlong" as Long
' You can also declare:
' "Bob()" -> Long as "This is very\nlong"
Long --> "Bob()" : ok
@enduml
```

Kết quả:
![](https://images.viblo.asia/a72b0325-d9d9-4f70-8a85-6a25a2865878.png)

### c. Message to Self
Các đối tượng có thể gửi thông điệp cho chính nó.
```
@startuml
Alice->Alice: This is a signal to self.\nIt also demonstrates\nmultiline \ntext
@enduml
```

Kết quả:
![](https://images.viblo.asia/21f69316-33d7-45b0-99a4-61f17f592699.png)

### d. Căn chỉnh text
Bạn có thể đặt văn bản của thông báo phản hồi bên dưới mũi tên, bằng lệnh skinparam responseMessageBelowArrow true.
```
@startuml
skinparam responseMessageBelowArrow true
Bob -> Alice : hello
Alice -> Bob : ok
@enduml
```

Kết quả:
![](https://images.viblo.asia/4ca0e92f-fb6b-4571-8b70-106fee5c13aa.png)

### e. Thay đổi kiểu mũi tên
Bạn có thể thay đổi kiểu mũi tên bằng một số cách:
Thêm dấu x cuối cùng để biểu thị một tin nhắn bị mất
Sử dụng \ hoặc / thay vì <hoặc> để chỉ có phần dưới cùng hoặc phần trên của mũi tên
Lặp lại đầu mũi tên (ví dụ: đầu >> hoặc //) để có một bản vẽ mỏng
Sử dụng - thay vì - để có một mũi tên chấm
Thêm chữ "o" cuối cùng ở đầu mũi tên
Sử dụng mũi tên hai chiều <->

```
@startuml
Bob ->x Alice
Bob -> Alice
Bob ->> Alice
Bob -\ Alice
Bob \\- Alice
Bob //-- Alice

Bob ->o Alice
Bob o\\-- Alice

Bob <-> Alice
Bob <->o Alice
@enduml
```
Kết quả:
![](https://images.viblo.asia/57cc8208-bb1a-475b-9ed1-fe740f0240aa.png)

### f. Thay đổi màu mũi tên
Bạn có thể thay đổi màu của các mũi tên riêng lẻ bằng cách sử dụng ký hiệu.

```
@startuml
Bob -[#red]> Alice : hello
Alice -[#0000FF]->Bob : ok
@enduml
```

Kết quả:
![](https://images.viblo.asia/0fa7824b-6506-4b72-a50f-6211b25daa77.png)

### Kết
Bài chia sẻ hôm nay mình xin dừng lại ở đây. Những nội dung tiếp mình xin chia sẻ ở phần tiếp.