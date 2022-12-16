`PDB là viết tắt của "Python Debugger", nó là trình gỡ lỗi (debug) source code tích hợp nhiều tính năng như: tạm dừng chương trình, xem các biến trong môi trường hợp cụ thể, thay đổi các giá trị của biến đó, ...`

## Giới thiệu

Gỡ lỗi (Debugging) là một trong những điều kinh khủng, khó ưa nhất trong phát triển phần mềm, nhưng điều ngang trái thay nó lại là một trong những thứ quan trọng bậc nhất trong vòng đời phát triển phần mềm. Chắc chắn trong giai đoạn phát triển, mọi lập trình viên đều phải tự debug mã của mình, điều này là không thể tránh khỏi.

Có rất nhiều cách để debug một ứng dụng viết ra. Một phương pháp được sử dụng rất phổ biến đó là sử dụng câu lệnh "print" trong các trường hợp để xem nó chạy như thế nào trong khi thực thi chương trình. Tuy nhiên, phương pháp này xảy ra nhiều vấn đề, chẳng hạn như việc muốn in được các giá trị của biến thì phải thêm code vào, v.v.. => Quá phức tạp. Hơn nữa cách này chỉ dùng tạm bợ cho những chương trình nhỏ, tầm trăm dòng code trở lại thì ok, khi mà sang một chương trình lớn hơn, có nhiều file hơn, thì nó lại là một vấn đề lớn lớn lớn.

Vậy thì, chúng ta đã có trình gỡ lỗi để giải quyết vấn đề đó cho. Nó giúp chúng ta tìm các lỗi trong một ứng dụng bằng các lệnh bên ngoài, do đó không có thay đổi nào đối với code. Như đã đề cập ở trên, mình muốn giới thiệu các bạn module PDB - một module tích hợp bên trong python (không cần phải cài đặt từ nguồn bên ngoài), thông qua bài viết "Có PDB, debug python không còn khó khăn".

Mời các bạn đọc tiếp.

## Các lệnh thao tác cơ bản

Để hiểu các lệnh hoặc công cụ chính có trong PDB, mình sẽ viết một đoạn chương trình nho nhỏ, vui vui, cơ bản, sau đó thử debug bằng các lệnh PDB. Bằng các này, chúng ta sẽ thấy được một cách rõ ràng hơn, chính xác hơn mỗi lệnh của PDB sẽ làm gì.

`# Filename: loves.py`

```py
list_crush = ['Lê', 'Thi', 'Thiên', 'Mỹ']
love_codes = [1111112, 2111014, 3451524, 4512244]

def show_list_crush():
    print('List crush: ')
    for crush in list_crush:
        print(crush)

    print("Code of loves: ")
    for code in love_codes:
        print(code)

def main():
    show_list_crush()

if __name__ == "__main__":
    main()
```

Kết quả của đoạn script trên:

```txt
List crush:
Lê
Thi
Thiên
Mỹ
code of loves:
1111112
2111014
3451524
4512244
```

Đoạn mã trên chắc mình cũng không cần phải giải thích nhiều, vì nó là basic đối với một người làm về python rồi, nó không có gì khó cũng như cú pháp phức tạp cả. Bạn không cần phải hiểu đoạn lệnh trên thực hiện, mục đích chính của mình thực hiện một số lệnh PDB dựa trên chương trình này. Ok, bắt đầu thôi.

Sử dụng PDB yêu cầu sử dụng Command Line Interface (CLI), do đó bạn phải chạy ứng dụng của mình từ `terminal` hoặc `command`.

Chạy lệnh dưới đây trong CLI của bạn:

```shell
python -m pdb loves.py
```

Trong lệnh trên, tên tệp `loves.py`, vì vậy bạn sẽ cần chèn tên tệp của bạn thay cho `loves.py`.

**Lưu ý:** `-m` là một cờ và nó thông báo cho Python rằng một mô-đun cần phải được imported; cờ này được theo sau bởi tên của mô-đun, trong trường hợp của trên của mình là pdb.

Chạy xong lệnh sẽ hiển thị như thế này:

```shell
> /home/nguyenmanh/projects/test/loves.py(1)<module>()
-> list_crush = ['Lê', 'Thi', 'Thiên', 'Mỹ']
(Pdb)
```

Đầu ra sẽ luôn có cùng cấu trúc. Nó sẽ bắt đầu với đường dẫn thư mục đến tệp mã nguồn. Sau đó, trong ngoặc, nó sẽ cho biết số dòng từ tệp mà PDB hiện đang trỏ tới, trong trường hợp của mình là `(1)`. Dòng tiếp theo, bắt đầu bằng ký hiệu `->`, cho biết dòng đang được trỏ đến.

Để đóng PDB, chỉ cần nhập `quit` hoặc `exit`.

Một vài điều cần lưu ý, nếu chương trình của bạn có các tham số đầu vào, bạn cũng có thể chuyển chúng qua command line. Ví dụ, nếu chương trình của mình yêu cầu 3 đầu vào từ người dùng, thì lệnh của mình sẽ như thế này:

```shell
python -m pdb loves.py var1 var2 var3
```

Tiếp tục, nếu trước đó bạn đã đóng PDB thông qua lệnh `quit` hoặc `exit`, sau đó chạy lại tệp code thông qua PDB. Sau đó, chạy lệnh sau trong command line PDB:

```shell
(Pdb) list
```

Đầu ra trông như thế này:

```shell
  1  -> list_crush = ['Lê', 'Thi', 'Thiên', 'Mỹ']
  2     love_codes = [1111112, 2111014, 3451524, 4512244]
  3  
  4     def show_list_crush():
  5         print('List crush: ')
  6         for crush in list_crush:
  7             print(crush)
  8  
  9         print("code of loves: ")
 10         for code in love_codes:
 11             print(code)
(Pdb)
```

Hiển thị 11 dòng đầu tiên của chương trình cho bạn, với dấu `->` hướng về dòng hiện tại đang được debug. Tiếp theo, hãy thử lệnh này trong command line PDB.

```shell
(Pdb) list 4, 6
```

Lệnh này sẽ chỉ hiển thị các dòng được chọn, trong trường hợp này là các dòng 4 đến 6. Đây là đầu ra:

```shell
  4     def show_list_crush():
  5         print('List crush: ')
  6         for crush in list_crush:
(Pdb)
```

## Debugging với Break points

Một thứ quan trọng tiếp theo mà chúng ta sẽ tìm hiểu là `Breakpoint`. `Breakpoint` thường được sử dụng cho các chương trình lớn hơn, nhưng để hiểu rõ hơn về nó, chúng ta sẽ tìm hiểu cách nó hoạt động dựa trên ví dụ cơ bản bên trên. `Breakpoint` là các vị trí cụ thể mà chúng tôi khai báo trong code của mình. Code của tôi chạy đến vị trí đó và sau đó tạm dừng. Những điểm này được tự động gán số bởi PDB.

Có các tùy chọn sau đây để tạo `Breakpoint`:

1. Theo số dòng (By line number)
2. Bằng cách khai báo hàm (By function declaration)
3. Bởi một điều kiện (By a condition)

Để khai báo `Breakpoint` theo số dòng, hãy chạy lệnh sau trong commandline PDB:

```shell
(Pdb) break loves.py:9
```

Lệnh này chèn một `Breakpoint` ở dòng code thứ 8, nó sẽ tạm dừng chương trình một khi nó chạy tới điểm đó. Đầu ra lệnh này được hiển thị là:

```shell
Breakpoint 1 at /home/nguyenmanh/projects/test/loves.py:9
(Pdb)
```

Để khai báo các `Breakpoint` trên một hàm, hãy chạy lệnh sau:

```shell
(Pdb) break loves.show_list_crush
```

Để chèn một điểm dừng theo cách này, bạn phải khai báo nó bằng tên tệp và sau đó là tên hàm. Điều này xuất ra như sau:

```shell
Breakpoint 2 at /home/nguyenmanh/projects/test/loves.py:4
(Pdb)
```

Như bạn thấy, `Breakpoint` này đã được được tự động gán số 2 và số dòng là 4 - chính là tại dòng hàm được khai báo.

`Breakpoint` cũng có thể được khai báo bởi một điều kiện. Trong trường hợp đó, chương trình sẽ chạy cho đến khi điều kiện sai và sẽ tạm dừng khi điều kiện đó trở thành đúng. Chạy lệnh sau:

```shell
(Pdb) break loves.py:6, crush == "Thi"
```

Điều này sẽ theo dõi giá trị của biến `crush` trong suốt quá trình thực thi và chỉ ngắt khi giá trị của nó là "Thi" ở dòng 6.

Để xem tất cả các `Breakpoint` mà mình đã khai báo dưới dạng danh sách, hãy chạy lệnh

```shell
(Pdb) break
```

Kết quả sẽ có dạng:

```shell
Num Type         Disp Enb   Where
1   breakpoint   keep yes   at /home/nguyenmanh/projects/test/loves.py:9
2   breakpoint   keep yes   at /home/nguyenmanh/projects/test/loves.py:4
3   breakpoint   keep yes   at /home/nguyenmanh/projects/test/loves.py:6
        stop only if crush == "Thi"
(Pdb)
```

Cuối cùng, làm thế nào chúng ta có thể vô hiệu hóa, kích hoạt và xóa một `Breakpoint` cụ thể tại bất kỳ trường hợp nào. Chạy lệnh sau:

```shell
(Pdb) disable 2
```

Lệnh trên sẽ vô hiệu hóa `Breakpoint` 2, nhưng sẽ không xóa nó khỏi phiên debug.

Bạn sẽ thấy số `Breakpoint` bị vô hiệu hóa.

```shell
Disabled breakpoint 2 at /home/nguyenmanh/projects/test/loves.py:4
(Pdb)
```

Cho phép xem lại danh sách tất cả các `Breakpoint` để xem giá trị "End" cho `Breakpoint` 2:

```shell
(Pdb) break
```

Đầu ra:

```shell
1   breakpoint   keep yes   at /home/nguyenmanh/projects/test/loves.py:9
2   breakpoint   keep no    at /home/nguyenmanh/projects/test/loves.py:4 # you can see here that the "ENB" column for #2 shows "no"
3   breakpoint   keep yes   at /home/nguyenmanh/projects/test/loves.py:6
        stop only if crush == "Thi"
(Pdb)
```

Để kích hoạt `Breakpoint` 2:

```shell
(Pdb) enable 2
```

Và một lần nữa, đây là đầu ra:

```shell
Enabled breakpoint 2 at /home/nguyenmanh/projects/test/loves.py:4
```

Bây giờ, nếu bạn in danh sách tất cả các điểm break, giá trị "End" của breakpoint 2 sẽ hiển thị `yes`.

Bây giờ chúng ta hãy xóa breakpoint 1:

```shell
(Pdb) clear 1
```

Kết quả:

```shell
Deleted breakpoint 1 at /home/nguyenmanh/projects/test/loves.py:9
(Pdb)
```

Nếu chúng ta in lại danh sách các breakpoint, thì bây giờ sẽ chỉ hiển thị 2 breakpoint. Hãy kiểm tra bằng lệnh `break`.

```shell
Num Type         Disp Enb   Where
2   breakpoint   keep yes   at /home/nguyenmanh/projects/test/loves.py:4
3   breakpoint   keep yes   at /home/nguyenmanh/projects/test/loves.py:6
        stop only if crush == "Thi"
(Pdb)
```

Đúng như mong đợi.

Trước khi làm điều tiếp theo, tôi muốn hiển thị ra kết quả khi chạy code cho đến khi breakpoint được đặt. Để làm điều đó, hãy xóa tất cả các breakpoint trước đó và khai báo một breakpoint khác thông qua commandline PDB:

1. Xóa tất cả các breakpoint

    ```shell
    (Pdb) clear
    ```

    Sau đó, nhập "y" và nhấn "ENter". Bạn sẽ thấy kết quả xuất hiện:

    ```shell
    Deleted breakpoint 2 at /home/nguyenmanh/projects/test/loves.py:4
    Deleted breakpoint 3 at /home/nguyenmanh/projects/test/loves.py:6
    (Pdb)
    ```

2. Khai báo một breakpoint mới

    Mình sẽ chạy cho đến khi giá trị của biến `crush` bằng "Thi". Vì vậy, về cơ bản, chương trình sẽ tạm dừng trước chữ "Lê".

    ```shell
    (Pdb) break loves.py:6, crush == "Thi"
    ```

3. Chạy cho đến breakpoint

Để chạy code, sử dụng `continue`, lệnh này sẽ thực thi code cho đến khi chạm breakpoint hoặc kết thúc:

```shell
(Pdb) continue
```

Bạn sẽ thấy:

```shell
Lê
Thi
> /home/nguyenmanh/projects/test/loves.py(6)show_list_crush()
-> for crush in list_crush:
(Pdb)
```

Chương trình chạy cho đến breakpoint và tạm dừng, bây giờ tùy thuộc vào chúng ta muốn thay đổi bất cứ điều gì, kiểm tra các kiến hoặc nếu chúng ta muốn chạy tập lệnh cho đến khi hết hoàn thành. Hãy chạy lệnh `continue`.

Kết quả:

```shell
Thiên
Mỹ
code of loves:
1111112
2111014
3451524
4512244
The program finished and will be restarted
> /home/nguyenmanh/projects/test/loves.py(1)<module>()
-> list_crush = ['Lê', 'Thi', 'Thiên', 'Mỹ']
(Pdb)
```

Trong kết quả trên, có thể thấy chương trình tiếp tục từ breakpoint, chạy phần còn lại và sau đó khởi động lại để cho phép chúng ta debug thêm nếu muốn. Bây giờ chuyển sang phần tiếp nha.

**Lưu ý quan trọng:** Trước khi di chuyển về phía trước, hãy xóa tất cả các breakpoint bằng cách chạy lệnh `clear`, sau đó nhập `y` vào commandline PDB.

## Chức năng Next và Step

Cuối cùng, nhưng không kém phần quan trọng, chúng ta nghiên cứu tới `next` và `step`. Chúng ta sẽ sử dụng rất thường xuyên khi bạn bắt đầu debug các ứng dụng của mình, vì vậy hãy tìm hiểu kỹ về nó nhé.

Các hàm `next` và `step` được sử dụng để lặp trong suốt quá dòng code của chúng ta theo từng dòng. Có sự khác biệt giữa cả hai. Trong khi lặp, nếu `step` gặp lệnh gọi hàm, nó sẽ di chuyển đến dòng đầu tiên nơi định nghĩa hàm đó và cho chúng ta chính xác những gì có ở bên trong hàm. trong khi đó, `next` khi được gọi nó sẽ chạy tất cả các dòng của hàm đó trong một lần duy nhất và tạm dừng ở lệnh gọi hàm tiếp theo.

Bối rối? Hãy xem điều đó trong một ví dụ.

Chạy lại chương trình:

```shell
python -m pdb loves.py
```

Bây giờ gõ vào `step` và tiếp tục cho đến khi kết thúc chương trình.

```shell
> /home/nguyenmanh/projects/test/loves.py(1)<module>()
-> list_crush = ['Lê', 'Thi', 'Thiên', 'Mỹ']
(Pdb) step
> /home/nguyenmanh/projects/test/loves.py(2)<module>()
-> love_codes = [1111112, 2111014, 3451524, 4512244]
(Pdb) step
> /home/nguyenmanh/projects/test/loves.py(4)<module>()
-> def show_list_crush():
(Pdb) step
> /home/nguyenmanh/projects/test/loves.py(13)<module>()
-> def main():
(Pdb) step
> /home/nguyenmanh/projects/test/loves.py(16)<module>()
-> if __name__ == "__main__":
(Pdb) step
> /home/nguyenmanh/projects/test/loves.py(17)<module>()
-> main()
(Pdb) step
--Call--
> /home/nguyenmanh/projects/test/loves.py(13)main()
-> def main():
(Pdb) step
> /home/nguyenmanh/projects/test/loves.py(14)main()
-> show_list_crush()
(Pdb) step
--Call--
> /home/nguyenmanh/projects/test/loves.py(4)show_list_crush()
-> def show_list_crush():
(Pdb) step
> /home/nguyenmanh/projects/test/loves.py(5)show_list_crush()
-> print('List crush: ')
(Pdb) step
List crush:
> /home/nguyenmanh/projects/test/loves.py(6)show_list_crush()
-> for crush in list_crush:
(Pdb)
.
.
.
.
```

Bây giờ, chạy lại toàn bộ chương trình, nhưng lần này sử dụng lệnh `next` thay vì `step`. 

```shell
> /home/nguyenmanh/projects/test/loves.py(1)<module>()
-> list_crush = ['Lê', 'Thi', 'Thiên', 'Mỹ']
(Pdb) next
> /home/nguyenmanh/projects/test/loves.py(2)<module>()
-> love_codes = [1111112, 2111014, 3451524, 4512244]
(Pdb) next
> /home/nguyenmanh/projects/test/loves.py(4)<module>()
-> def show_list_crush():
(Pdb) next
> /home/nguyenmanh/projects/test/loves.py(13)<module>()
-> def main():
(Pdb) next
> /home/nguyenmanh/projects/test/loves.py(16)<module>()
-> if __name__ == "__main__":
(Pdb) next
> /home/nguyenmanh/projects/test/loves.py(17)<module>()
-> main()
(Pdb) next
List crush:
Lê
Thi
Thiên
Mỹ
code of loves:
1111112
2111014
3451524
4512244
--Return--
> /home/nguyenmanh/projects/test/loves.py(17)<module>()->None
-> main()
(Pdb)
```

Bây giờ chúng ta sẽ phân tích xem chúng khác nhau như thế nào. Đối với `step`, bạn có thể thấy rằng khi `show_list_crush` nó di chuyển bên trong hàm và lặp qua `step`, cho chúng ta thấy chính xác những gì xảy ra bên trong mỗi bước.

Tuy nhiên, `next` khi gọi hàm `main`, nó sẽ không cho chúng ta thấy điều gì xảy ra bên trong hàm đó (tức là gọi một cách trức tiếp), và sau đó in trực tiếp kết quả cuối cùng trong một bước duy nhất.

## kết luận

Trong phần hướng dẫn này, tôi đã hướng dẫn các bạn tìm hiểu về các gỡ lỗi với module python PDB. Hi vọng sẽ giúp cho các bạn lập trình python gỡ được nhiều lỗi hơn =))

Cuối cùng, cảm ơn các bạn đọc bài, chúc các bạn thành công!
Blog của mình: [manhnv.com](https://manhnv.com)