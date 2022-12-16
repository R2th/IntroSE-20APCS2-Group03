Tiếp tục chủ đề ở  [phần trước](https://viblo.asia/p/excel-vba-doi-tuong-range-trong-excel-vba-6J3ZgJ6xKmB), bài này tôi xin giới thiệu tới các bạn về các mệnh đề điều khiển trong VBA

# Mệnh đề if-else
Đây là mệnh đề khá phổ biến trong Excel VBA để thực hiện các đoạn code nếu nó thỏa mãn điều kiện cụ thể nào đó. Nó kiểm tra giá trị dạng boolean của điều kiện. Nếu giá trị điều kiện là True thì chỉ có khối lệnh sau if sẽ được thực hiện, nếu là False thì chỉ có khối lệnh sau else được thực hiện.

Cú pháp: 
```
If (condition) Then
    ' khối lệnh này được thực thi 
    ' nếu condition là true 
Else
    ' khối lệnh này được thực thi
    ' nếu condition = false
End If

```

***Các toán tử được sử dụng trong mệnh đề if-else:***
            =  bằng

            > Lớn hơn

            < nhỏ hơn

            >= Lớn hơn hoặc bằng

            <= Nhỏ hơn hoặc bằng

            <> khác

***Logic***

            And:   Và

            or:  Hoặc

            Xor:  cả 2 đúng hoặc sai là đúng

            Not: phủ định

Ví dụ 1: Tính Pass, Fail bài report tháng dựa vào % hoàn thành của bài report. Nếu >=60% thì bài report đó Pass, và ngược lại là Fail. Bằng cách sử dụng mệnh đề if- else thì ta có kết quả sau:
![](https://images.viblo.asia/db341b91-77bf-464a-a2a5-6aa247ae5796.png)

# Vòng lặp for
 Vòng lặp là 1 cấu trúc chương trình cho phép 1 câu lệnh hoặc 1 nhóm câu lệnh thực hiện 1 số lần có giới hạn. Giới hạn này có thể biết trước và có thể không, nhưng phải có để máy tính ngừng lại khi đủ số lần lặp ấn định trước. Giới hạn này có thể xác định bằng 1 con số cụ thể, 1 con số là kết quả của 1 phép tính, và cũng có thể là 1 điều kiện thoát ra khỏi vòng lặp.
 
 Nếu số lần lặp là cố định thì vòng lặp for được khuyến khích sử dụng, còn nếu số lần lặp không cố định thì nên sử dụng vòng lặp while hoặc do while.
 
 Cú pháp vòng lặp for: 
```
For  counter = start To end [Step stepcount]
   [statement 1]
   [statement 2]
   ....
   [statement 10]
   [Exit For]
   [statement 11]
   [statement 22]
   ....
   [statement n]
Next

```
 
Trong đó:

  [**Step** stepcount] là tùy chọn, nó rất hữu ích khi đếm lùi, đếm nhiều đơn vị một vòng lặp. Hãy xem các ví dụ dưới đây để hiểu các trường hợp sử dụng vòng lặp for trong VBA.
  
  Ví dụ 2: Tiếp tự bài toán ở ví dụ 1, lần yêu cầu bài toán đưa ra đó là tính Pass/Fail bài report của list 15 nhân viên. Kết hợp sử dụng mệnh đề if - else và vòng lặp for ta có kết quả như sau: 
  ![](https://images.viblo.asia/83d3f673-57b8-4339-bd22-17459c498139.png)
  
#   Vòng lặp Do-While
Công việc nhập lặp đi lặp lại do vậy  ta cần sử dụng vòng lặp. Nếu số lần lặp là không xác định nên không thể sử dụng vòng lặp For, nhưng nếu việc kiểm tra được tiến hành sau or trước khi thực hiện thì ta sẽ sử dụng vòng lặp Do ...  While.
![](https://images.viblo.asia/05c33bd9-03a1-4ea0-a539-911a68107f4a.png)

Cú pháp: Kiểm tra điều kiện ở đầu vòng lặp
```
Do While condition
   [statement 1]
   [statement 2]
   ...
   [statement l]
   [Exit Do]
   [statement m]
   ...
   [statement n]
Loop

```

Ví dụ 3: Cũng yêu cầu bài toán nhưng ở ví dụ 2 ta cũng có thể sử dụng vòng lặp do-while để giải quyết vấn đề với cú pháp kiểm tra điều kiện ở đàu vòng lặp.
![](https://images.viblo.asia/526724af-7329-462b-b8a1-b61fa610857b.png)

Cú pháp: Kiểm tra điều kiện ở cuối vòng lặp

```
Do
   [statement 1]
   [statement 2]
   ...
   [statement l]
   [Exit Do]
   [statement m]
   ...
   [statement n]
Loop While condition

```

Ví dụ 4:  Sử dụng vòng lặp do-while để giải quyết vấn đề với cú pháp kiểm tra điều kiện ở cuối vòng lặp.
![](https://images.viblo.asia/2a5e845c-4ece-41e4-89cc-dcdf15e9c7eb.png)

# Mệnh đề Select-Case
Mệnh đề Select-Case trong VBA được sử dụng để thực thi 1 hoặc nhiều khối lệnh từ nhiều điều kiện.

Khi một người dùng muốn thực hiện một nhóm các câu lệnh tùy thuộc vào một giá trị của một biểu thức, thì Select-Case sẽ được sử dụng. Mỗi giá trị được gọi là Case. Câu lệnh Case Else được thực thi nếu biểu thức kiểm tra không khớp với bất kỳ trường hợp nào được chỉ định bởi người dùng.

Case Else là một câu lệnh tùy chọn trong mệnh đề Select-Case, tuy nhiên, nó là tốt hơn khi luôn luôn có một câu lệnh Case Else.
![](https://images.viblo.asia/9ee5518a-f6e8-466e-89c4-f70d3f9cfcd2.png)

Cú pháp: 
```
Select Case expression
   Case expressionlist1
      statement1
      statement2
      ....
   Case expressionlist2
      statement1
      statement2
      ....
   Case expressionlistn
      statement1
      statement2
      ....
   Case Else
      elsestatement1
      elsestatement2
      ....
End Select

```

Ví dụ 5: Tiếp tục với ví dụ 4, bài toán đưa ra đó là cần phải phân loại các bài report dựa trên % hoàn thành. Kết hợp sử dụng vòng lặp do ... while và mệnh đề select- case ta có kết quả như sau: 
![](https://images.viblo.asia/c966e68d-2e08-4e0b-ba4b-7a8cfdc58f3e.png)