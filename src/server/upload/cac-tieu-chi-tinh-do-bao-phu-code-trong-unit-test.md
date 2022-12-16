Trong unit test, độ bao phủ code (code coverage) là một giá trị thể hiện độ bao phủ của code bởi các test case được biểu thị dưới dạng %, nó cho ta thấy được tỉ lệ code đã được thực thi bằng unit test trên tổng số code của một chương trình. Code coverage được tính bằng công thức sau
```
code coverage = items executed / total number of code
```

`items` ở công thức trên không chỉ đơn thuần là số dòng code mà còn là những đối tượng khác như câu lệnh, nhánh, điều kiện, ...

# Độ bao phủ câu lệnh (Statement Coverage)
Độ bao phủ câu lệnh thể hiện số câu lệnh của chưong trình đã được thực thi trong quá trình test, chúng ta có thể hiểu nôm na độ bao phủ câu lệnh ở đây chính là độ bao phủ các dòng lệnh, tức là số dòng lệnh đã được chạy qua khi test. Một dòng lệnh được tính là đã được thực thi khi chỉ một hoặc toàn bộ code của dòng lệnh đó được thực thi, vì thế khi độ bao phủ câu lệnhj không đảm bảo rằng chương trình của bạn 100% không có lỗi. chúng ta có thể xem ví dụ sau:

## Ví dụ
```ruby
def foo(decision)
  a = 0

  if (decision)
    a = 1
  end

  a = 1 / a

  return a
end
```
Ở ví dụ trên, chúng ta có thể dễ dàng đặt được 100% statement coverage bằng cách test với input foo(1), khi đó câu lệnh trong điều kiện if sẽ được thực thi, tuy nhiên nếu input là giá trị 0 thì ở dòng lênh return sẽ xảy ra lỗi `division by zero`

## Đánh giá về độ bao phủ câu lệnh
Như đã thấy ở ví dụ trên, thậm chí nếu độ bao phủ câu lệnh là 100%, chương trình vẫn còn tồn tại rất nhiều lỗi nghiêm trọng, vì thế độ bao phủ dòng lệnh chỉ thể hiện rằng tất cả dòng lệnh đã được thực thi ít nhất một lần. Về mặt chất lượng, môt chương trình với độ che phủ câu lệnh 100% chưa chắc ít lỗi hơn với một chương trình chỉ 70% nhưng cover được nhiều case hơn. Tuy vậy độ bao phủ câu lệnh rất có ích trong việc phát hiện `dead code`, tức là tất cả dòng code của chương trình đều chạy được và không bị lỗi compile. Độ bao phủ câu lệnh còn có thể cho thấy những test case bị thiếu thông qua việc chỉ ra các phần code chưa được test.

# Độ bao phủ nhánh (Branch Coverage)
Độ che phủ nhánh nhắm đến nhắm đến các tất cả các nhánh của luồng đi của một đoạn code/function. Ví dụ đơn giản nhất về nhánh là một cấu trúc điều kiện if sẽ có 2 nhánh là nhánh `then` và nhánh `else`

![](https://images.viblo.asia/270d8792-5cac-4331-9b6b-39e1fd0b917e.png)


## Một điều kiện if luôn có 2 nhánh
Với điều kiện `if` tuy có một số trường hợp không được viết ra trong code nhưng nhánh `else` luôn luôn tồn tại. Như ở ví dụ của mục 1, chúng ta sẽ thực hiện test tương tự như ở phần 1 cho đoạn code này bằng hình dưới đây nhưng sử dụng phương pháp đo lường độ bao phủ nhánh thay vì độ bao phủ câu lệnh

```ruby
def foo(decision)
  a = 0

  if (decision)
    a = 1
  end
# invisible else-branch
  a = 1 / a

  return a
end
```
Để dễ hình dung chúng ta xem sơ đồ khối bên dưới

![](https://images.viblo.asia/27b5a6e7-5dbd-4205-9821-ceca6e037886.png)


Hình trên mô tả phương pháp test để đạt 100% độ bao phủ câu lệnh ở mục 1, nhánh else bị ẩn đi đã không được thực thi (được bôi đỏ) vì thế chúng ta cần thêm một test case thứ 2 để có thể đạt được 100% độ bao phủ nhánh, với một test case thứ 2 đơn giản là foo(0) thì ta có thể dễ dàng phát hiện ra lỗi ở nhánh bị ẩn
# Độ bao phủ điều kiện (Condition Coverage)
Thông thường điều kiện trong if có thể được kết hợp từ nhiều điều kiện khác nhau thông qua các toán tử logic (AND, OR, NOT). Một điều kiện là một biểu thức boolean không chứa toán tử logic, độ bao phủ nhánh đạt 100% thì chưa chắc độ bao phủ điều kiện sẽ đạt 100%, mình sẽ giải thích ở ví dụ sau:

```ruby
def foo(decision1, decision2)
  a = 0

  if (decision1 || decision2) #branch 1
    a = 1
  end

  a = 1 / a
# invisible branch 2 (else-branch)
  return a
end
```

Với bao phủ nhánh thì chỉ cần pass một trong hai điều kiện decision1 hoặc decision2 trong điều kiện if thì sẽ được tính là đã bao phủ được nhánh if này, ta có thể dễ dàng đạt 100% branch bằng các test case sau:
- foo(1, 0) : branch1 covered
- foo(0, 0) : branch2 covered
Tuy nhiên với kỹ thuật bao phủ điều kiện thì decision1 và decision2 được tính là hai điều kiện độc lập với nhau nên các test case trên sẽ không đủ để bao phủ hết các điều kiện, trường hợp điều kiện desition2 bị sai thì mình không thể thấy được bug, chúng ta phải thêm ít nhất một test case để có thể đạt được 100% độ bao phủ điều kiện:
- foo(1, 0) : branch1 covered, decision1 covered
- foo(0, 1) : branch1 covered, decision2 covered
- foo(0, 0) : branch2 covered

# Kết
Hi vọng bài viết trên đây sẽ cho mọi người hiểu sơ qua về khái niệm về độ bao phủ code, cám ơn mọi người đã dành thời gian theo dõi :D