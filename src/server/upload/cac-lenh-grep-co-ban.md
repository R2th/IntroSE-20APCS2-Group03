Trong bài viết này mình xin giới thiếu về lệnh grep và các option cơ bản đi kèm để tìm kiếm từ, chuỗi trong file hoặc trong thư mục.

Để hiểu cụ thể hơn các ví dụ, giả sử có sẵn các dữ liệu sau:
-  Thư mục: `data_test`
Bên trong thư mục `data_test` có 2 file:
- test1.txt
```
This is a test 1.
Hello world 1
TEST
exit 1
```

- text2.txt
```
This is a test 1.
Hello world 1
exit 1
```

Các lệnh cơ bản:

### 1. Tìm kiếm text đơn giản nhất trong file
```bash
$ grep "test" test1.txt

output:
This is a test 1.
```

### 2. Tìm kiếm trong nhiều file
```bash
$ grep "test" test*

output:
test1.txt:       This is a test 1.
test2.txt:       This is a test 2.
```

### 3. Tìm kiếm text trong thư mục
```bash
$ grep -r "test" data_test

output:
test1.txt:       This is a test 1.
test2.txt:       This is a test 2.
```
Tương tự với
```bash
$ grep -d "test" data_test
```

### 4. Tìm kiếm cả chữ hoa chữ thường
```bash
$ grep -i "test"test*

output:
test1.txt:     This is a test 1.
test1.txt:     TEST
test2.txt:     This is a test 2.
```

### 5. Tìm kiếm với regular expression
```bash
$ grep "This*test" test1.txt

output:
This is a test1.
```

### 6. Tìm kiếm chính xác
```bash
grep "i" test1.txt

output:
This is a test 1.
exit 1
```

```bash
grep -w "i" test1.txt
No output
```

### 7. Tìm kiếm ngược (loại trừ)
```bash
grep -v "1" test1.txt

output:
TEST
```

### 8. Hiển thị dòng của kết quả
```bash
$ grep -n -i "test" test1.txt

output:
1:   This is a test 1.
3:   TEST
```

### 9. Hiển thị các dòng xung quanh kết quả

Hiện thêm 1 dòng phía trước kết quả:
```bash
$ grep -n -A 1 "Hello" test1.txt

output
1:   This is a test 1.
2:   Hello world 1
```

Hiện thêm 2 dòng phía sau kết quả:
```bash
$ grep -n -B 2 "This" test1.txt

output
1:   This is a test 1.
2:   Hello world 1
3:   TEST
```

Hiện thêm 1 dòng xung quanh kết quả:
```bash
$ grep -n -C 1 "Hello" test1.txt

output
1:   This is a test 1.
2:   Hello world 1
3:   TEST
```

Nguồn:
https://www.tutorialspoint.com/unix_commands/grep.htm