# 1. Yêu cầu bài toán
Bạn có 1 file ***.jar** dùng để chạy một số công việc hiện tại. Nhưng nó có 1 lỗi nhỏ, bạn muốn chỉnh sửa nó nhưng không có source-code.
# 2. Các giải pháp
Có 2 giải pháp 
1. Decompile *.jar ->  chỉnh sửa ->  build lại 
2. Giải nén Java classes -> Modify Java Bytecode -> Đóng gói lại 

**Phương pháp (1)** có khá nhiều ưu điểm nếu bạn quen thuộc với Java, tuy nhiên nó cũng sẽ có những nhược điểm
1. File jar phụ thuộc vào nhiều thư viện, bạn phải tìm hiểu để import đúng các thư viện đó.
2. Quá trình decompile sẽ không chính xác 100%, bạn phải có kinh nghiệm để fix rất nhiều lỗi mới có thể compile được.
Tùy thuộc vào mực độ phức tạp của project nó sẽ sinh ra số lỗi khác nhau. Mất khá nhiều thời gian để fix nó.

Trong bài hôm nay, mình chủ yếu tập trung vào **phương pháp (2)**: Nhanh hơn, ít lỗi hơn và nó đơn giản thực hiện. 
Nó sẽ hữu ích cho developer vá những lỗi nhỏ. Có 1 số case hữu ích:
1. Loại bỏ các giới hạn của phần mềm (bản quyền, chữ ký ...)
2. Sử các lỗi liên quan security mà không cần source code
3. Thêm một số đoạn code nhỏ.
# 3. Cách thực hiện 
Trong bài toán này mình đã build 1 file jar [Test.jar](https://drive.google.com/file/d/1vqB1EeRdDU_bh20kTFaRxpT0bGZsPeJ0/view?usp=sharing) 
Khi chạy thì nó hiển thị như sau: Có 2 lỗi ở đây
1. value**e** -> value
2. 3.1**5**->3.1**4**

```
java -jar Test.jar
The valuee of pi: 3.15
```

Để sửa file này chúng ta làm các bước sau(máy đã cài sẵn java jdk của mình là bản 1.8) :
1. Giải nén file *.jar
2. Sửa file .class bằng Java Bytecode Editor
3. Đóng gói lại file *.jar 
4. Chạy lại và test 


## 3.1 Giải nén file *.jar
Mình thao tác trên linux, các môi trường khác làm tương tự (hiểu ý tưởng của nó là được)
```
// Tạo 1 folder để thực hiện 
mkdir test 
// copy file Test.jar mình gửi link ở trên vào thư mục vừa tạo 
cp Test.jar test
// di chuyển vào thư mục đó
cd test
// giải nén 
jar -xf Test.jar 
// xóa file Test.jar đi 
rm Test.jar
// Kiểm tra các file trong thư mục 
tree .
```

Quan sát ta thấy có 1 file *.class -> Test.class

```
.
├── com
│   └── ldt
│       └── test
│           └── Test.class
└── META-INF
    ├── MANIFEST.MF
    └── maven
        └── org.example
            └── TestJar
                ├── pom.properties
                └── pom.xml


```

Thử đọc file này thấy lỗi tung tóe 
```
cat com/ldt/test/Test.class
```

![](https://images.viblo.asia/38ee83e2-5cba-45a7-8864-3d520908d107.png)

Chúng ta phải sử dụng tool chuyển dụng để đọc bytecode file -> bước 2
## 3.2. Sửa file .class bằng Java Bytecode Editor
Tải về và run từ link [Java bytecode editor 0.1.1 ](http://set.ee/jbe/jbe-0.1.1.zip)

Sau khi tải về thì có các file như sau:
```
drwxrwxr-x  4 ldt ldt  4096 Mar 13  2011 ./
drwxr-xr-x 27 ldt ldt  4096 May  9 19:21 ../
drwxrwxr-x  4 ldt ldt  4096 Mar 13  2011 bin/
-rw-rw-r--  1 ldt ldt 18007 Jul  6  2004 COPYING.TXT
-rw-rw-r--  1 ldt ldt    53 Sep 29  2006 jbe.bat
-rw-rw-r--  1 ldt ldt    53 Sep 29  2006 jbe.sh
drwxrwxr-x  4 ldt ldt  4096 Mar 13  2011 src/
-rw-rw-r--  1 ldt ldt    26 Mar 13  2011 version.txt
```

Windows chạy jbe.bat
Linux: jbe.sh

**Lưu ý**: Mình thao tác trên linux (Ubuntu) ban đầu nó chưa cấp quyề chạy file jbe.sh Mình cấp quyền cho nó
```
chmod a+x jbe.sh
```

Sau đó chạy thì bị lỗi, mình không rõ ở chỗ nào, có lẽ do lúc tạo file này có vấn đề. mình tạo 1 file **run.sh** để run với nội dung giống hệt file này. **Bạn nào biết lỗi ở đâu thì chỉ giúp mình **
```
ldt@ldtpc:~/Downloads/jbe$ ./jbe.sh 
./jbe.sh: line 1: cd: $'bin\r': No such file or directory
Error: Could not find or load main class ee.ioc.cs.jbe.browser.BrowserApplication
Caused by: java.lang.ClassNotFoundException: ee.ioc.cs.jbe.browser.BrowserApplication
```

```
nano run.sh
chmod a+x run.sh
```

Đây là nội dung file run.sh giống với file cũ jbe.sh
```
cd bin
java ee.ioc.cs.jbe.browser.BrowserApplication
```

Bật tool JBE rồi mở file 
![](https://images.viblo.asia/d13de524-829b-4279-a3b5-986cfcb5a6e1.png)

**Methods** -> **main** -> **Code** -> Chọn tab **Code Editor**
![](https://images.viblo.asia/be7aac44-8cba-4288-b801-4ea287ee2532.png)


Nếu bạn có kiến thức về Java ByteCode thì sẽ hiểu không thì bắt buộc phải đoán. 
Như mình quan sát thấy :
có biến **3.15** (line 1) và **valuee** ở line 7

Sửa và lưu lại click button (**Save method**) đến bước tiếp theo

## 3.3. Đóng gói lại file *.jar 
```
jar -cvmf META-INF/MANIFEST.MF TestNew.jar ./*
```

Mình đóng gói lại file TestNew.jar 
**Lưu ý**: Phải chỉ đường dẫn chính xác đến file MANIFEST.MF, ban đầu mình không chỉ và bị lỗi (**no main class found**)

Sau khi chạy xong ta có file TestNew.jar, chuyển sang bước 4 để kiểm thử lại 


## 3.4. Chạy lại và test 
```
ldt@ldtpc:~/temp/git/TestJar/target/test$ java -jar TestNew.jar 
The value of pi: 3.14
```

Đúng như ta mong muốn

# 4. Kết luận:
1. Mỗi phương pháp sẽ có những ưu và nhược điểm riêng, tùy theo từng yêu cầu để lựa chọn phương thức cho phù hợp
2. Để sử dụng phương pháp sửa java bytecode: Cần có những kiến thức và java bytecode, hiểu cấu trúc file, biết sửa file class nào, sửa chỗ nào...
Trong ví dụ trên, nó rất đơn giản và dễ tìm, với file phức tạp thì cần nhiều thời gian hơn. 
Trong bài * tiếp theo mình sẽ hướng dẫn tìm hiểu về bytecode, cấu trúc trong đó.
3. Chúng ta cũng có thể dùng tool [Java Decomplier](http://java-decompiler.github.io/) để hiểu cấu trúc file và project, từ đó dễ dàng đoán được đoạn code mình cẩn sửa ở file nào.
Do project nhỏ nên nhìn rất rõ file và nội dung file .java
![](https://images.viblo.asia/272b5840-0390-48fb-a00e-918ccfece7ce.png)


# Tài liệu tham khảo
* https://www.netspi.com/blog/technical/thick-application-penetration-testing/patching-java-executables-the-easy-way/