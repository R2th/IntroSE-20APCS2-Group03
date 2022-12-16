**1 Giới thiệu PlantUML**
Là 1 Open Source project có thể vẽ:
• Sequence diagram

• Usecase diagram

• Class diagram

• Activity diagram

• Component diagram

• State diagram

• Object diagram

Các Diagram được định nghĩa bằng ngôn ngữ đơn giản và trực quan.

**2 Cài đặt môi trường**

Download file tại [planuml](http://plantuml.com/download)

Cài [JDK 7](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html)

**3 Bắt đầu vẽ Sequence diagram**
Tạo file test.txt
Khai báo các actor, entity, control ...
```
@startuml
actor Foo1
boundary Foo2
control Foo3
entity Foo4
database Foo5
collections Foo6
@enduml
```

Thực hiện các action: 

```
Foo1 -> Foo2 : To boundary
Foo1 -> Foo3 : To control
Foo1 -> Foo4 : To entity
Foo1 -> Foo5 : To database
Foo1 -> Foo6 : To collections
```
Chay file test.txt bằng tool trong file nén planuml.zip tải ở trên sẽ được kết quả
![](https://images.viblo.asia/9983ab51-e46b-437f-a3b9-1fcf29f8e44f.png)

Gửi action có message kèm theo:
```
@startuml
Alice -> "Bob()" : Hello
"Bob()" -> "This is very\nlong" as Long
' You can also declare:
' "Bob()" -> Long as "This is very\nlong"
Long --> "Bob()" : ok
@enduml
```
 ![](https://images.viblo.asia/4fe2cf5f-0ddb-4742-9920-ed0ae8715d5b.png)
 
Custome style: 
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
![](https://images.viblo.asia/a4688e49-08ab-4b98-9149-07d072f46e76.png)

Sử dụng thẻ Note:
```
@startuml
Alice->Bob : hello
note left: this is a first note
Bob->Alice : ok
note right: this is another note
Bob->Bob : I am thinking
note left
a note
can also be defined
on several lines
end note
@enduml
```

![](https://images.viblo.asia/012e22ba-a2ec-4295-bb97-632dc0e3238c.png)

Vòng đời của 1 participant
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
![](https://images.viblo.asia/32548e89-f81a-4e29-a413-f59ad6ce2da5.png)

Sử dụng thẻ Group:
```
@startuml
Alice -> Bob: Authentication Request
alt successful case
Bob -> Alice: Authentication Accepted
else some kind of failure
Bob -> Alice: Authentication Failure
group My own label
Alice -> Log : Log attack start
loop 1000 times
Alice -> Bob: DNS Attack
end
Alice -> Log : Log attack end
end
else Another type of failure
Bob -> Alice: Please repeat
end
@enduml
```

![](https://images.viblo.asia/9886cb8a-2f3d-49ce-9219-c32ff0ea2bf7.png)

Ngoài ra cũng còn 1 số lệnh: 
```
@startuml
[-> Bob
[o-> Bob
[o->o Bob
[x-> Bob
[<- Bob
[x<- Bob
Bob ->]
Bob ->o]
Bob o->o]
Bob ->x]
Bob <-]
Bob x<-]
@enduml
```
![](https://images.viblo.asia/54c9c7ab-0b38-4faa-97ce-4c78140a5b27.png)

Bằng một số lệnh cơ bản rất đơn giản và trực quan chúng ta đã có thể vẽ được Sequence diagram một cách nhanh chóng

PlanUml còn hỗ trợ chúng ta tạo ra rất nhiều loại diagram khác một cách nhanh chóng và mình sẽ giới thiệu với các bạn ở phần tiếp theo :)

Nguồn: http://plantuml.com/running