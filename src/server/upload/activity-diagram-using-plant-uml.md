**1. Mở đầu**
[Ở phần trước](https://viblo.asia/p/drawing-uml-with-plantuml-4dbZNEomKYM), mình đã hướng dẫn các bạn cài đặt môi trường và thực hiện vẽ Sequence diagram.
Phần này chúng ta tiếp tục tìm hiểu về Plant-Uml và thực hiện vẽ Activity diagram

**2. Thực hiện vẽ Activity diagram**

1 activity label được bắt đầu bằng 「:」 và kểt thúc bằng 「;」

```
@startuml
:Hello world;
:Hello **VietNam**;
@enduml
```

![](https://images.viblo.asia/5094c995-ff26-4e94-88c2-f727e9b50280.png)

Sử dụng start/stop 

```
@startuml
start
:Hello world;
:Hello VietNam **lines**;
end
@enduml
```

![](https://images.viblo.asia/b36fedbf-c56b-428f-bc71-ca7e3846262d.png)

Sử dụng câu điều kiện if/else

```
@startuml
start
if (Plant Uml installed?) then (yes)
  :process all\ndiagrams;
else (no)
  :process only
  __sequence__ and __activity__ diagrams;
endif
stop
@enduml
```
![](https://images.viblo.asia/0e17c8bc-c5d2-4f7c-8e50-af34c91e6fa5.png)

Sử dụng với if/else-if

```
@startuml
start
if (condition A) then (yes)
  :Text 1;
elseif (condition B) then (yes)
  :Text 2;
  stop
elseif (condition C) then (yes)
  :Text 3;
elseif (condition D) then (yes)
  :Text 4;
else (nothing)
  :Text else;
endif
stop
@enduml
```

![](https://images.viblo.asia/1ff21426-0e52-42d0-a790-398edf6ec61a.png)

Sử dụng vòng lăp while

```
@startuml
start
while (data available?)
  :read data;
  :generate diagrams;
endwhile
stop
@enduml
```

![](https://images.viblo.asia/3faed418-bf1e-4fdf-9638-f81b5ee1c32b.png)

Sử dụng thẻ Nodes 

```
@startuml
start
:foo1;
floating note left: This is a note
:foo2;
note right
  This note is on several
  //lines// and can
  contain <b>HTML</b>
  ====
  * Calling the method ""foo()"" is prohibited
end note
stop!
@enduml
```

![](https://images.viblo.asia/c9ed484d-eb2a-4986-9e56-a6c1752c22af.png)

Sử dụng Connector

```
@startuml
start
:Some activity;
(A)
detach
(A)
:Other activity;
@enduml
```

![](https://images.viblo.asia/cf849c3b-7441-46ab-af49-ed9855abc803.png)

**3** Ngoài ra Plant-Uml còn hỗ trợ rất nhiều thẻ cũng như vẽ nhiều loại diagram khác. Các bạn có thể tìm hiểu thêm tại [đây](http://plantuml.com/)

Nguồn: http://plantuml.com/