Là một java dev nên khi mới tiếp cận với shellscript tôi luôn có tư tưởng tiếp cận nó giống với java.
Với một logic phức tạp sẽ tách thành các method nhỏ để xử lý rồi trả về kết quả. Ví dụ để tính tổng của 2 số sẽ viết như sau.

Tạo file `return_test.sh` có nội dung:

```shellscript
   #!/bin/bash

   add() {
     return $(expr $1 + $2);
   }

  echo $(add 1 2)

```

Sau đó chạy để lấy kết quả:

```shellscript
$ ./return_test.sh

$
```

Ngạc nhiên là màn hình in ra một line trống chứ không phải là `3` như chúng ta mong đợi, tại sao vậy? có vấn đề gì với return trong shellscript ở đây?

Hoá ra lệnh `return` trong shellscript khác với các ngôn ngữ lập trình hiện đại khác nó chỉ có thể trả về các mã exit code của một lệnh hay một chương trình. Mã exit code này cho chúng ta biết là cậu lệnh hay chương trình thực thi thành công hay thất bại. Chỉ vậy thôi. Mã exit code này sẽ nhận giá trị trong khoảng `0 - 255`, nếu giá trị trả về nằm ngoài khoảng này nó sẽ được lấy module của 256, ví dụ -10 tương đương 246, 257 sẽ tương đương với 1. Câu lệnh thành công thì mã exit trả về là 0 còn thất bại sẽ là các mã khác không (non-zero), mỗi mã khác không sẽ đại diện cho một lỗi nào đó như: syntax, lỗi not found file,...

Lưu ý nữa là mã exit code này được lưu trong biến `$?`
ví dụ:

```shellscript
$ echo "hello"
$ echo "$?"
=> kết quả trả về 0 vì câu lệnh echo thực hiện thành công

# Giả ls -la một thư mục không tồn tại "abcdef"
$ ls -la abcdef
ls: abcdef: No such file or directory
$ echo "$?" 

=> kết quả trả về 1 vì lệnh `ls -la` có lỗi do thư mục "abcdef" không tồn tại
```


Như vậy mục đích của lệnh return là để chỉ thị cho chúng ta biết một câu lệnh hay một chương trình chạy thành công hay thất bại chứ không phải là trả về các dữ liệu, hay cấu trúc dữ liệu như các ngôn ngữ khác.
Ok đến đây nhận ra cần phải thay đổi mindset khi làm việc với shellscript, để không áp đặt các ngôn ngữ khác lên nó.

Quay lại vấn đề ban đầu vậy thì có các nào trong shellscript để có thể return được các dữ liệu giống như các ngôn ngữ khác, java chẳng hạn.
Có 3 cách để làm được điều đó.


#### 1. Sử dụng biến global

Cách này đơn giản, cứ chỗ nào cần một share variable thì tạo một biến global. Tuy nhiên trong một chương trình lớn thì việc sử dụng quá nhiều các biến global dẫn đến khó control và debug chương trình. Đây là ví dụ dùng biến global:

```shellscript
#!/bin/bash

   SUM=0

   add() {
     SUM=$(expr $1 + $2);
   }

   add 1 2
   echo $SUM
```

Kết quả ra `3` như mong đợi:

```shellscript
$ ./return_test.sh
3
```


#### 2. Sử dụng lệnh echo thay vì return

Sử dụng lệnh echo có thể return ra bất cứ string nào.
Dưới đây là ví dụ:

```
 #!/bin/bash

   add() {
     echo $(expr $1 + $2);
   }

   echo $(add 1 2)
```

Kết quả ra `3`:

```shellscript
$ ./return_test.sh
3
```

#### 3. Sử dụng biến truyền vào để lưu giá trị trả về

Tư tưởng cách này là khi gọi function sẽ truyền thêm biến để lưu kết quả trả về, sau đó kết quả trả về của method sẽ được set ngược lại cho biến này

```
 #!/bin/bash

   add()
   {
       local  __resultvar=$1
       local  sum=$(expr $2 + $3)
       eval $__resultvar="'$sum'"
   }

   add result 1 2
   echo $result
```

```shellscript
$ ./return_test.sh
3
```

Đến đây chúng ta đã biết vài cách để có thể return kết quả trả về như mong muốn, điều quan trọng hơn là khi tiếp cận shellscript cố gắng hiểu được và follow được mindset của nó thay vì áp đặt những kiến thức từ ngôn ngữ khác mà mình đã quen thuộc.