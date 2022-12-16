###### Chúng ta tiếp tục cùng tìm hiểu những phần tiếp theo của shell script nhé !
##### :small_red_triangle_down: Vòng lặp (Loop)<br>
:black_small_square:  Ở những phần đầu, ta đã tìm hiểu qua về loop, bây giờ ta sẽ đi chi tiết hơn về nó nhé:
- Có 3 cấu trúc vòng lặp cơ bản trong `shellscript` mà ta sẽ nói tới ở bên dưới.
<hr>

**1. While Loop**
- Một trong những vòng lặp dễ nhất đó là vòng lặp `while`. Nó sẽ hoạt động như sau: khi một biểu thức của `while` trả về `true`, nó thực thi các dòng code bên trong cho tới khi nào biểu thức nó trả về `false` thì dừng. Nó có cú pháp sau:
```bash
while [ <test> ]
do
<command 1>
<command 2>
...
done
```
- Luồng hoạt động của nó sẽ như sau:

![](https://images.viblo.asia/53f36827-77f4-426b-91d2-9bc47467341d.png)

- Ví dụ:
```bash
#!/bin/bash

counter=1 #line 3
while [ $counter -le 5 ] #line 4
do
echo $counter #line 6
((counter++)) #line 7
done #line 8
```
- Dòng 3: Ta tạo biến `counter` với giá trị bắt đầu của nó là 1.
- Dòng 4:  khi biểu thức của `while` là `true`, nghĩa là `counter nhỏ hơn hoặc bằng 5` thì nó sẽ thức hiện các câu lệnh trong `do` cho đến khi nào thỏa mãn.
- Dòng 6: Ta có thể viết bất cứ lệnh nào mà ta cần. `echo` ở đây chỉ là một ví dụ minh họa.
- Dòng 7: Sử dụng dấu `((counter++))` ta có tăng giá trị của `counter` lên thêm 1.
- Dòng 8: Nếu biểu thức của `while` trả về `false` thì nó sẽ kết thúc vòng lặp, và thực hiện tiếp các câu lệnh dưới `done`
- Kết quả trả về:
```bash
➜  ~ ./while_loop.sh
1
2
3
4
5
```

<hr>

**2. Until Loop**

- `until` khá giống với `while`. Chỉ có khác là nó sẽ thực hiện các lệnh bên trong nó cho đến khi  điều kiện là true.Nói cách khác, nếu điều kiện là true, thì khi đó các lệnh sẽ không được thực hiện và chương trình sẽ nhảy tới dòng lệnh sau lệnh done. Cú pháp:
```bash
until [ <condition> ]
do
<commands>
done
```
- Ví dụ:
```bash
#!/bin/bash

counter=1
until [ $counter -gt 5 ]
do
echo $counter
((counter++))
done
```
- Kết quả sẽ là:
```
~ ./until_loop.sh   
1
2
3
4
5
```
<hr>

**3. For Loop**

- Vòng lặp for hơi khác một chút so với hai vòng lặp trước. Nó sẽ thực hiện việc lấy từng mục trong một danh sách nhất định thực hiện các lệnh đã cho. Cú pháp:
```bash
for var in <list>
do
<commands>
done
```
- Vòng lặp for sẽ lấy từng mục trong danh sách (theo thứ tự lần lượt0), gán mục đó làm giá trị của biến var, thực hiện các lệnh giữa `do` và `done` sau đó quay lại, lấy các mục tiếp theo trong danh sách và lặp lại các bước đó cho đến hết các mục.
- Danh sách được định nghĩa sẽ là một chuỗi string, được tách ra bởi dấu cách.
- Ví dụ:
```bash
#!/bin/bash

names='Thich That Su' #line 4
for name in $names #line 5
do
echo $name #line 7
done
```
- Dòng 4: Tạo một danh sách đơn giản là một loạt các tên.
- Dòng 5: Đối với mỗi mục trong danh sách `names`, ta gán  từng mục cho biến name và thực hiện các lệnh đã cho.
- Dòng 7: echo ra ngoài màn hình từng tên trong danh sách. Ở đây, chúng ta có thể thực hiện bao nhiêu lệnh tùy thích.
- Kết quả:
```
 ~ ./for_loop.sh
Thich
That
Su
```
- Ta có thể sử dụng phạm vi cho vòng for, ví dụ như:
```bash
#!/bin/bash

for number in {1..5} #line 3
do
echo $number
done
```
- Dòng 3: Điều quan trọng khi chỉ định một phạm vi như thế này là không có khoảng trắng giữa các dấu ngoặc nhọn {}. Nếu có thì nó sẽ không được xem như một phạm vi mà là một danh sách các mục.
- Kết quả sẽ là:
```
~ ./range.sh
1
2
3
4
5
```
- Khi chỉ định một phạm vi, ta có thể chỉ định bất kỳ số nào ta thích cho cả giá trị bắt đầu và giá trị kết thúc. Giá trị đầu tiên cũng có thể lớn hơn giá trị thứ hai và trong trường hợp nó sẽ đếm ngược.
- Ngoài ra, ta cũng có thể chỉ định một giá trị tăng hoặc giảm mỗi lần bằng cách thêm hai dấu chấm `..` và giá trị cho từng bước. Ví dụ như:
```bash
#!/bin/bash

for number in {10..5..9}
do
echo $number
done
```
<hr>

##### :small_red_triangle_down: Kiểm soát vòng lặp bằng cách sử dụng Break và Continue<br>

**1. Break**

- Câu lệnh `break` nói cho bash biết là sẽ rời khỏi vòng lặp ngay lập tức. Có thể có những tình huống ta cần kết thúc vòng lặp ngay lập thực nếu không muốn tiếp tục. Ví dụ:
```bash
#!/bin/bash
 
for number in {10..15} #line 3
do
  if [ $number -eq 14 ] #line 5
  then
    echo "Number: $number"
    break #line 8
  fi
done
```
- Dòng 3: Ta sử dụng vòng lặp cho một danh sách số từ 10 đến 15
- Dòng 5: Ở đây, ta check điều kiện `if` nếu phần tử bằng 14
- Dòng 8: Ta sử dụng `break` để thoát khỏi vòng lặp ngay lập tức.
- Kết quả sẽ là:
```
~ ./break.sh
Number: 14
```
<hr>

**2. Continue**

- Câu lệnh `continue` nói cho bash biết, nó sẽ dừng bỏ qua lần lặp này và bắt đầu lần lặp kế tiếp. Ví dụ sẽ khá giống với phần trên:
```bash
#!/bin/bash
 
for number in {5..10} 
do
  if [ $number -eq 8 ]
  then
    continue
  fi
  echo "Number: $number"
done
```
- Kết quả trả về:
```bash
➜  ~ ./continue.sh
Number: 5
Number: 6
Number: 7
Number: 9
Number: 10
```
- Như vậy, nó đã bỏ qua lần lặp nếu phần tử là 8, và output ra ngoài chỉ gồm các số 5, 6, 7, 9, 10
<hr>

**3. Select**

- Câu lệnh `select` cho phép ta tạo ra một menu các option đơn giản cho chúng ta lựa chọn. Cú pháp như sau:
```bash
select var in <list>
do
<commands>
done
```
- Khi được gọi, nó sẽ lấy tất cả các mục trong danh sách (tương tự các phần tử sẽ phân biệt bởi dấu cách) và hiển thị ra bên ngoài màn hình với mỗi số trước mỗi danh mục. Khi ta chọn một số và ấn enter, mục tương ứng sẽ được gán cho biến var và cách lệnh giữa `do` và `done` sẽ được chạy. Sau khi hoàn thành, menu lựa chọn sẽ hiển thị lại cho chúng ta lựa chọn. Ví dụ:
```bash
#!/bin/bash

names='Cuc Ky Thuyet Phuc' #line 4
PS3='Select character: ' #line 5
select name in $names
do
if [ $name == 'Phuc' ] #line 8
then
break
fi #line 11
echo Hi $name #line 12
done
echo Bye #line 14
```
- Dòng 4: Thiết lập một biến với danh sách các ký tự là các tùy chọn mà ta có thể chọn để thoát.
- Dòng 5: Thay đổi giá trị của biến hệ thống PS3 để lời nhắc được mô tả dễ hiểu hơn. (Theo mặc định, nó là `#?`)
- Dòng 8 đến 11: Nếu ta chọn tùy chọn 'Phuc' thì ta thoát ra khỏi vòng chọn và sẽ dừng vòng lặp ở đây.
- Dòng 12: In ra màn hình những gì ta muốn. Ở đây, ta có thể viết bao nhiêu command tùy thích.
- Dòng 14: In ra màn hình thông báo rằng ta đã kết thúc vòng chọn.
<hr>

  ###### Cảm ơn các bạn đã đọc bài viết của mình !