### **Cơ chế phân quyền của file**
1. Các loại permission của file:
* r = READ: chỉ có quyền view đối với file.
* w = WRITE: quyền được thay đổi hoặc sửa đổi với file.
* e = EXECUTE: chạy code, chương trình hoặc một danh mục.

2. Các kí hiệu và số:
```
* rwe = 7
* rw- = 6
* r-e = 5
* r-- = 4
* --- = 0
```
-----

### **Một số quyền đối với 1 file**
```
* 777 = rwxrwxrwx
* 770 = rwxrwx---
* 755 = rwxr-xr-x
* 700 = rwx------
* 666 = rw-rw-rw-
* 644 = rw-r--r--
* 600 = rw-------
```
* 777(rwxrwxrwx) =>  3 kí tự đầu(rwx) là đối với user sở hữu file(own file) sẽ có quyền read, write, execute; 3 kí tự tiếp(rwe) theo là của group user sẽ có quyền read, write, execute; 3 kí tự cuối(rwx) là phần còn lại sẽ có read, write, execute.
* 644(rw-r--r--) =>  3 kí tự đầu(rw-) là đối với user sở hữu file(own file) sẽ có quyền read, write; 3 kí tự tiếp(r--) theo là của group user sẽ có quyền read; 3 kí tự cuối(r--) là phần còn lại chỉ có quyền read.
* 755(rwer-xr-x) =>  3 kí tự đầu(rwe) là đối với user sở hữu file(own file) sẽ có quyền read, write, execute; 3 kí tự tiếp(r-e) theo là của group user sẽ có quyền read, execute; 3 kí tự cuối(r-e) là phần còn lại có read, execute.

-----


### **Ví Dụ**

```
-rwx------ 1 [User] [Group] 111 [Date-Modified] [Filename] 
```
* Trong linux khi thực hiện lệnh *ls -l* sẽ hiển thị tất cả các file cũng và quyền của file.

Bài này mình học ở trên udemy nên giờ viết lại cho vui nhé.