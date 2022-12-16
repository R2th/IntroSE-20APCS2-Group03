# 1. Giới thiệu
- Ở phần trước mình đã giới thiệu 1 phần về vẽ sequence với plant uml. Do nội dung dài nên mình chia nhỏ ra để mỗi bài viết không quá dài. Hôm nay mình tiếp tục chia sẻ về nội dung này.
# 2. kí hiệu, cách vẽ
## a. Đánh số trình tự
- Từ khóa autonumber được sử dụng để tự động thêm một số tăng dần vào thư.
- vd:
```
@startuml
autonumber
Bob -> Alice : Authentication Request
Bob <- Alice : Authentication Response
@enduml
```
Kết qủa:
![](https://images.viblo.asia/2e661ff5-c01f-49d6-b6ba-8c95896a8144.png)

- Bạn có thể chỉ định một số bắt đầu với autonumber //start // và cũng có một số tăng với số autonumber //start// //increment//.
```
@startuml
autonumber
Bob -> Alice : Authentication Request
Bob <- Alice : Authentication Response

autonumber 15
Bob -> Alice : Another authentication Request
Bob <- Alice : Another authentication Response

autonumber 40 10
Bob -> Alice : Yet another authentication Request
Bob <- Alice : Yet another authentication Response

@enduml
```

Kết quả:
![](https://images.viblo.asia/336a7d46-7b86-4cc0-ab20-a1cf8eeca6e0.png)

Bạn có thể chỉ định định dạng cho số của mình bằng cách đưa chúng vào dấu ngoặc kép.
vd: "<b>[000]"
    
Việc định dạng được thực hiện với lớp DecimalFormat của Java.
    
Bạn có thể sử dụng một số thẻ html trong định dạng.

vd: 
```
@startuml
autonumber "<b>[000]"
Bob -> Alice : Authentication Request
Bob <- Alice : Authentication Response

autonumber 15 "<b>(<u>##</u>)"
Bob -> Alice : Another authentication Request
Bob <- Alice : Another authentication Response

autonumber 40 10 "<font color=red><b>Message 0  "
Bob -> Alice : Yet another authentication Request
Bob <- Alice : Yet another authentication Response

@enduml
```
Kết quả:
 ![](https://images.viblo.asia/2a3045d4-1890-4719-b4c1-8e3f2c0747e9.png)

  - Bạn cũng có thể sử dụng autonumber stop và autonumber resume //increment// //format// để tương ứng tạm dừng và tiếp tục autonumber.
       
vd: 
```
@startuml
autonumber 10 10 "<b>[000]"
Bob -> Alice : Authentication Request
Bob <- Alice : Authentication Response

autonumber stop
Bob -> Alice : dummy

autonumber resume "<font color=red><b>Message 0  "
Bob -> Alice : Yet another authentication Request
Bob <- Alice : Yet another authentication Response

autonumber stop
Bob -> Alice : dummy

autonumber resume 1 "<font color=blue><b>Message 0  "
Bob -> Alice : Yet another authentication Request
Bob <- Alice : Yet another authentication Response
@enduml
```
       
Kết quả:
![](https://images.viblo.asia/3febc2ef-b82a-48ef-9e90-4a8e13e4f7a5.png)
     
- Số bắt đầu của bạn cũng có thể là một chuỗi 2 hoặc 3 chữ số sử dụng dấu phân cách trường, chẳng hạn như.,;, ,,: hoặc kết hợp của các ký tự này. Ví dụ: 1.1.1 hoặc 1.1: 1.
- Tự động chữ số cuối cùng sẽ tăng lên.
- Để tăng chữ số đầu tiên, hãy sử dụng: autonumber inc A. Để tăng chữ số thứ hai, hãy sử dụng: autonumber inc B.

vd:
```
@startuml
autonumber 1.1.1
Alice -> Bob: Authentication request
Bob --> Alice: Response

autonumber inc A
'Now we have 2.1.1
Alice -> Bob: Another authentication request
Bob --> Alice: Response

autonumber inc B
'Now we have 2.2.1
Alice -> Bob: Another authentication request
Bob --> Alice: Response

autonumber inc A
'Now we have 3.1.1
Alice -> Bob: Another authentication request
autonumber inc B
'Now we have 3.2.1
Bob --> Alice: Response
@enduml
```
Kết quả:
    ![](https://images.viblo.asia/c4fbe449-4f18-42b7-a684-c85108c1371d.png)
       
       
## b.Tiêu đề, Đầu trang và cuối trang
- Title keyword được sử dụng để thêm tiêu đề cho trang.
- Các trang có thể hiển thị đầu trang và chân trang bằng cách sử dụng "**header**" và "**footer**".

    vd:
```
@startuml

header Page Header
footer Page %page% of %lastpage%

title Example Title

Alice -> Bob : message 1
Alice -> Bob : message 2

@enduml
```
    
Kết quả:
    ![](https://images.viblo.asia/53e59b64-b869-4a0d-bb60-01363170da48.png)

## c. Tách trang
    
- Từ khóa "**newpage**" được sử dụng để chia một sơ đồ thành nhiều hình ảnh.
- Bạn có thể đặt tiêu đề cho trang mới ngay sau từ khóa trang mới. Tiêu đề này ghi đè tiêu đề đã chỉ định trước đó nếu có.
Điều này rất tiện dụng với Word để in sơ đồ dài trên một số trang.
    
(Lưu ý: điều này thực sự hiệu quả. Chỉ trang đầu tiên được hiển thị bên dưới)
    
vd: 
```
@startuml

Alice -> Bob : message 1
Alice -> Bob : message 2

newpage

Alice -> Bob : message 3
Alice -> Bob : message 4

newpage A title for the\nlast page

Alice -> Bob : message 5
Alice -> Bob : message 6
@enduml
```
    
Kết quả:
    ![](https://images.viblo.asia/6f71d6c1-3ae5-4e1f-bebb-29cea8376c7e.png)

## d. Grouping message
- Có thể nhóm các tin nhắn lại với nhau bằng các từ khóa sau:
    - alt/else
    - opt
    - loop
    - par
    - break
    - critical
    - group, followed by a text to be displayed

- Có thể thêm văn bản sẽ được hiển thị vào tiêu đề (đối với nhóm, xem đoạn tiếp theo 'Nhãn nhóm phụ').
- Từ khóa end được sử dụng để đóng nhóm.
- Lưu ý rằng có thể lồng các nhóm.
    
vd: 
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
    
Kết quả:
    ![](https://images.viblo.asia/06e0d723-e4fb-4823-bc1d-50478a5184f5.png)

## e. Secondary group label/Nhãn nhóm phụ
    
- Đối với nhóm, có thể thêm vào giữa [], văn bản hoặc nhãn phụ sẽ được hiển thị vào tiêu đề.
    
vd:
```
@startuml
Alice -> Bob: Authentication Request
Bob -> Alice: Authentication Failure
group My own label [My own label 2]
    Alice -> Log : Log attack start
    loop 1000 times
        Alice -> Bob: DNS Attack
    end
    Alice -> Log : Log attack end
end
@enduml
```
Kết quả:
    ![](https://images.viblo.asia/65ab4960-fb76-4931-8a83-a25bfada24c8.png)

# 3. Phần kết
- Để tránh bài viết quá dài mình sẽ chia làm các phần nhỏ. Bài hôm nay mình xin được kết thúc ở đây.
- Nếu có ý kiến thì xin phép comment ở phía dưới. Mình sẽ ghi nhận tất cả các ý kiến đóng góp.