# 1. What is the White-box testing?
- White-box testing là kiểm thử hộp trắng dựa trên cấu trúc bên trong, thiết kế và mã hóa để xác định và kiểm tra input, ouput của phần mềm. 
- Thường được thực hiện bởi các developers
- Được áp dụng cho Unit Test, Intergration test 
# 2. White Box test design
## 2.1 Statement coverage
```
Formula = (number of statements exercised / Total number of statements) *100%
```

-> Phần trăm số câu lệnh được thực thi trên tổng số câu lệnh của chương trình đang có. 

Ví dụ: 
```
Read (a)
If (a>5) then 
 print ("a lớn hơn 5")
else 
 print("a nhỏ hơn 5")
endif
```
Nếu chỉ có 1 TC a = 7 thì nó chỉ chạy được 4/6 câu lệnh (~66% statement coverage). 
Cần phải thêm 1 TC thỏa mãn điều kiện (a<5) để có thể chạy tới câu lệnh `print("a nhỏ hơn 5") `nhằm mục đích chạy được hết các câu lệnh trong chương trình 

-> Vậy cần phải có 2 TC để cover 100% statement coverage trong ví dụ trên

## 2.2 Decision coverage (Branch coverage)

```
Formula = (number of decision outcomes exercised/ Total decision outcomes) *100%
```

-> Phần trăm số lượng kết quả quyết định được thực hiện trên tổng số kết quả quyết định của chương trình đang có.

Như ví dụ ở 2.1. Câu lệnh if cho ra 2 nhánh kết quả True và False. với TC a = 7 thì chỉ chạy được cho cho nhánh kết quả True. Lúc này  Decision coverage = 1/2 (~50%) => Cần phải thêm 1 TC cho nhánh kết quả False để cover 100% decision coverage

Với cùng 1 ví dụ thì Statement coverage và Decision coverage đang cho kết quả đều là 2 TCs để cover 100%

Mình sẽ thêm 1 ví dụ khác để có thể phân biệt rõ hơn sự khác nhau của 2 loại này 

```
Read (a)
Read (b)
C = a - 2*b
If (C <0 )  then 
 print ("C nhỏ hơn 0")
endif
```

- Với duy nhất 1 TC a = 10, b = 6 thì toàn bộ câu lệnh trong chương trình đều được thực thi -> Statement coverage đã đạt 100% chỉ với 1 TC 
 
- Còn với Decision coverage, TC (a = 10, b = 6) chỉ cover được 50% cho kết quả if = True =>Cần thêm 1 TC (a = 10, b = 4) giúp chương trình trả về kết quả False để đạt được 100% Decision coverage

## 2.3 Path coverage
```
Formula = (number of paths exercised/ Total paths it has) *100%
```

-> Phần trăm số lượng đường dẫn thực thi trên tổng số đường dẫn chương trình có. (Đường dẫn này bắt buộc phải đi từ đầu tới cuối chương trình).
Ví dụ
![](https://images.viblo.asia/a3c501c9-470c-42fb-a14e-a959412af9e1.png)
Từ trái qua phải tương ứng với tổng số lượng 2,3,4 path mà chương trình có thể có.

==> Tiêu chuẩn "Statement coverage" chỉ đảm bảo bao gồm tất cả câu lệnh nên khá kém và rất dễ miss case

==> Tiêu chuẩn "Decision coverage"  mạnh hơn "Statement coverage" tuy nhiên vẫn còn hơi yếu vì nó chỉ bao gồm nhánh 

==> Tiêu chuẩn "Path coverage" cung cấp phạm vi kiểm tra cao vì nó bao gồm tất cả các câu lệnh và các nhánh trong mã. 
![](https://images.viblo.asia/a097871c-bea1-4bff-8b49-7321c51f6871.png)

Ví dụ
![](https://images.viblo.asia/59eeebd7-5cd6-4eca-bc9d-2f280b222901.png)
Sơ đồ khối cho kết quả số lượng TCs tương ứng để đạt 100% coverage như sau: 
- Statement coverage: 1 TC (A = Red, B = Red)
- Decision coverage: 2 TCs (A = Red, B = Red) ; (A = Green, B = Black)
- Path coverage: 4 TCs (A = Red, B = Red) ; (A = Red, B = Green) ; (A = Green, B = Red) ; (A = Green, B = Green)