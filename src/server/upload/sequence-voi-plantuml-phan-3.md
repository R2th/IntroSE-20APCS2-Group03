# 1. Giới thiệu
- Ở những phần trước mình đã giới thiệu 1 phần về vẽ sequence với plant uml. Do nội dung dài nên mình chia nhỏ ra để mỗi bài viết không quá dài. Hôm nay mình tiếp tục chia sẻ về nội dung này.
# 2. kí hiệu, cách vẽ
## a. Note
**Note message**
- Có thể ghi chú vào tin nhắn bằng cách sử dụng từ khóa **note left** hoặc **note right** ngay sau message.
- Bạn có thể có một ghi chú nhiều dòng bằng cách sử dụng các từ khóa **end note**.
    
vd:
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
    
Kết quả:
    ![](https://images.viblo.asia/d15aec10-2b97-4712-a427-8bc462983ae4.png)
    
**Một vài kiểu note khác**
- Cũng có thể đặt vị trí ghi chú liên quan đến các đối tượng, như ghi chú bên trái, ghi chú bên phải hoặc ghi chú trên các từ khóa.
- Có thể đánh dấu một ghi chú bằng cách thay đổi màu nền của ghi chú đó.
- Bạn cũng có thể có một ghi chú nhiều dòng bằng cách sử dụng các từ khóa ghi chú cuối.

Vd:
```
@startuml
participant Alice
participant Bob
note left of Alice #aqua
This is displayed
left of Alice.
end note

note right of Alice: This is displayed right of Alice.

note over Alice: This is displayed over Alice.

note over Alice, Bob #FFAAAA: This is displayed\n over Bob and Alice.

note over Bob, Alice
This is yet another
example of
a long note.
end note
@enduml
```
Kết quả:
![](https://images.viblo.asia/eb31aa93-c6b6-4c3d-90c5-611012cc04c9.png)

**Thay đổi hình dạng của note**
- Bạn có thể sử dụng các từ khóa **hnote** và **rnote**  để thay đổi hình dạng note:
    + hnote: note hình lục giác
    + rnote: note hình vuông

vd:
```
@startuml
caller -> server : conReq
hnote over caller : idle
caller <- server : conConf
rnote over server
 "r" as rectangle
 "h" as hexagon
endrnote
rnote over server
 this is
 on several
 lines
endrnote
hnote over caller
 this is
 on several
 lines
endhnote
@enduml
```

Kết quả:
![](https://images.viblo.asia/993289f3-11a5-4f70-96d1-8b53634cfbab.png)

**Note All**
- Bạn có thể trực tiếp ghi chú cho tất cả đối tượng, với cú pháp:
    + note across: note_description
```
@startuml
Alice->Bob:m1
Bob->Charlie:m2
note over Alice, Charlie: Old method for note over all part. with:\n ""note over //FirstPart, LastPart//"".
note across: New method with:\n""note across""
Bob->Alice
hnote across:Note across all part.
@enduml
```
Kết quả:
![](https://images.viblo.asia/e9a13536-4d5d-40e4-9484-d2a1db2e259c.png)

**Note mở rộng**
- Bạn có thể tạo note nhanh bằng cách sau

Vd:
```
@startuml
note over Alice : initial state of Alice
note over Bob : initial state of Bob
Bob -> Alice : hello
@enduml
```

Kết quả:

![](https://images.viblo.asia/27ba7a66-53a4-4b4c-a0d7-b515de09faff.png)

Vd:
```
@startuml
note over Alice : initial state of Alice
/ note over Bob : initial state of Bob
Bob -> Alice : hello
@enduml
```

Kết quả:
![](https://images.viblo.asia/5e1e68aa-60a8-4459-9432-37bb9244bf4e.png)

## b. Creole và HTML
- Cũng có thể sử dụng định dạng creole.
Vd:
```
@startuml
participant Alice
participant "The **Famous** Bob" as Bob

Alice -> Bob : hello --there--
... Some ~~long delay~~ ...
Bob -> Alice : ok
note left
  This is **bold**
  This is //italics//
  This is ""monospaced""
  This is --stroked--
  This is __underlined__
  This is ~~waved~~
end note

Alice -> Bob : A //well formatted// message
note right of Alice
 This is <back:cadetblue><size:18>displayed</size></back>
 __left of__ Alice.
end note
note left of Bob
 <u:red>This</u> is <color #118888>displayed</color>
 **<color purple>left of</color> <s:red>Alice</strike> Bob**.
end note
note over Alice, Bob
 <w:#FF33FF>This is hosted</w> by <img sourceforge.jpg>
end note
@enduml
```

Kết quả:
![](https://images.viblo.asia/6b14e0a7-010e-4782-b8c0-d405db75131c.png)

## c. Dải phân cách (Divider/separator)
- Chúng ta có thể chia sơ đồ bằng dấu phân tách == để chia sơ đồ của bạn thành các bước hợp lý.

vd:
```
@startuml

== Initialization ==

Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

== Repetition ==

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response

@enduml
```

Kết qủa:
![](https://images.viblo.asia/7a816193-41cc-4079-9b71-603a7a164696.png)


## d. Reference
- Chúng ta có thể sử dụng tham chiếu trong một sơ đồ, sử dụng từ khóa **ref**.

Vd:
```
@startuml
participant Alice
actor Bob

ref over Alice, Bob : init

Alice -> Bob : hello

ref over Bob
  This can be on
  several lines
end ref
@enduml
```
Kết quả:
![](https://images.viblo.asia/e9df3bdc-3144-4f1f-b651-c7b33229da5e.png)

## e. Delay
- Chúng ta có thể sử dụng "..." để chỉ ra độ trễ trong sequence. Và cũng có thể đặt **message** với độ trễ này.

Vd:
```
@startuml

Alice -> Bob: Authentication Request
...
Bob --> Alice: Authentication Response
...5 minutes later...
Bob --> Alice: Good Bye !

@enduml
```

Kết quả:
![](https://images.viblo.asia/d6c3e7b9-6c99-49cc-89e6-f81a3801c3dd.png)

## f. Text wrapping
- Để ngắt các tin nhắn dài, bạn có thể thêm \ n vào văn bản của mình theo cách thủ công.
- Một tùy chọn khác là sử dụng từ khóa **maxMessageSize**.

Vd:
```
@startuml
skinparam maxMessageSize 50
participant a
participant b
a -> b :this\nis\nmanually\ndone
a -> b :this is a very long message on several words
@enduml
```

Kết quả:
![](https://images.viblo.asia/2ada1ac0-bbe1-4fb6-b01b-e5817ad90c96.png)

## g. Space
- Chúng ta có thể sử dụng ||| để chỉ ra một số khoảng cách trong sơ đồ.
- Và cũng có thể chỉ định một số pixel sẽ được sử dụng.

Vd:
```
@startuml

Alice -> Bob: message 1
Bob --> Alice: ok
|||
Alice -> Bob: message 2
Bob --> Alice: ok
||45||
Alice -> Bob: message 3
Bob --> Alice: ok
```
Kết quả:
![](https://images.viblo.asia/43af4344-0142-4f50-968d-263f6457e3bb.png)

# 3. Phần kết
- Mình chia nhỏ các nội dung theo từng phần để mỗi bài không quá dài. Nếu có ý kiến đóng góp, xin comment ở phía dưới.
- Mình xin được lắng nghe để những bài viết sau được hiệu quả hơn.