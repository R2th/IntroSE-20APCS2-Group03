**Gradle**, các file **build.gradle, settings.gradle** - bạn vẫn hay thấy chúng trong project Android phải không nào ?? Tuy nhiên khá nhiều người thường không hay để ý đến chúng hoặc đơn giản xem rồi copy/paste những cái mình cần vào. Vì đơn giản nó không được thuận mắt, code thì lằng nhằng, khó nhớ chẳng hạn. Vậy nên ở bài này, chúng ta hãy cùng nhau đi sâu hơn vào Gradle, xem nó có các thành phần nào, cấu tạo ra sao, ... nhé :D

# I. Ngôn ngữ sử dụng
Trước hết, hãy xem ngôn ngữ lập trình mà nó sử dụng !!!
**Gralde** sử dụng **Groovy**, một ngôn ngữ JVM tương tự Java nhưng với cú pháp đơn giản hơn rất nhiều
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Groovy-logo.svg/1200px-Groovy-logo.svg.png"/>

Cơ bản về Groovy

1. Code **Java** được là **Groovy** cũng được. Ở console bạn có thể code Java vào được.
<img src="https://miro.medium.com/max/401/1*mGnuOAsMoQrFWjxT1JFnwQ.png"/>
2. Không cần class bọc ở ngoài và hàm **main()** để chạy code. Đồng thời **Groovy** tự động imports **System.out**, nên ta sẽ ko cần viết nó ở những chỗ sử dụng. Nhấn Run là chạy luôn

<img src="https://miro.medium.com/max/447/1*_y4hrqL8flHajf4GI62nNg.png"/>

3. Không cần dấu ngoặc đơn để gọi hàm với một nhiều hơn 1 tham số.
4. Dấu chấm phẩy là không bắt buộc - vậy bỏ luôn cho tiện ; ))

Ví dụ

Từ
```
System.out.println(“Hi, there!”);
```
Đổi thành
```
println “Hi, there!”
```

Bạn có thể thấy là không cần System.out, ko chấm phẩy ( ; ), ko cần đóng mở ngoặc :D

5. Groovy Closures

Đây là một khái niệm quan trọng của Groovy

Đầu tiên, hãy định nghĩa một class, bên trong có hàm **doSomething**, tham số là một kiểu **Closure**
```
class MyClass{

 void doSomething(Closure closure)
     {
        closure.call()
     }
}
```
Giờ ta muốn chạy hàm ` closure.call()`, ta làm như sau
```
MyClass myClass = new MyClass();

myClass.doSomething{
   println “Hi, there!”
}
```
Kết quả, in ra `Hi, there!` - Done

Chi tiết hơn về Closure bạn có thể xem [tại đây](https://groovy-lang.org/closures.html). Hiểu cơ bản nó như là lamda trong Java 8 đó.

Và hẳn bạn đã quen với đoạn code sau

```
dependencies {
    testCompile group: ‘junit’, name: ‘junit’, version: ‘4.22”
}
```

Nhìn nó giống cái ví dụ **doSomething** không các bạn :D

Vậy 
- **dependencies** là một phương thức nhận một **closure** làm tham số. 
- **testCompile** là hàm một **closure**, có các tham số là **group: ‘junit’** (tương tự vs những cái còn lại và viết bỏ dấu ngoặc đơn mình đã nói ở trên)

Cơ bản là vậy thôi. Giờ sang phần cấu tạo nào !!!

# II. Cấu tạo
## 1. Các loại file
Có 3 loại scripts chính, ta cũng hay gặp
- **build scripts** ở build.gradle files.
- **settings scripts** ở settings.gradle
- **init scripts**: dùng đế cấu hình

### a. Build Scripts
Những gì liên quan, phục vụ cho cấu hình, code project của bạn như nơi lấy thư viện, các thư viện sẽ dùng, các môi trường, kiểu build, ... sẽ được liệt kê ở đây.

Trong Android thì có 2 loại, đó là **Root/top level gradle** và **Module level**

<img src="https://i.stack.imgur.com/5JXDS.jpg"/>

Chúng có gì thì bạn có thể mở project lên xem nhé. Cơ bản thì một cái là định nghĩa chung cho tất cả các module trong app. Một cái thì chỉ cho từng module riêng lẻ.

### b. Settings scripts
File **settings.gradle** bạn có thể thêm các module vào app, sửa các tham số từ command line, ... Nếu các setting của bạn chỉ liên quan đến build mà ko tới project hoặc yêu cầu logic trước khi thêm các module thì sẽ được cấu hình ở đây

```
include ':clevertap-android-sdk-1.2.4'
include ':app', ':accountkitsdk', ':PhoneVerificationLibrary'
include ':library'

project(':base').projectDir = new File('BaseModule/base')
project(':PhoneVerificationLibrary').projectDir = new File('BaseModule/PhoneVerificationLibrary')
project(':library').projectDir = new File('BaseModule/library')
```

### c. Init scripts
Chính là file **gradle.properties** và **gradle-wrapper.properties** và các file đuôi **.properties** bạn tự tạo ra : ))  . Nó lưu trữ dữ liệu đơn giản chỉ dưới dạng **string**. Các file script này dùng để:
- Định nghĩa chi tiết việc build, kiểu gradle dùng phiên bản nào, sdk lấy ở đâu (**distributionUrl, sdk.dir, org.gradle.jvmargs**)
- Xác định các thuộc tính dựa vào môi trường, như thông số cấu hình môi trường cho môi trường dev - production (chính là file **.propertities** mà ta có thể tự tạo đó)

## Tóm lại
**Gradle** là một thành phần quan trọng trong lập trình Android và **Groovy** là ngôn ngữ được dùng để tạo ra nó. Bài viết đã cung cấp các khái niệm cơ bản, các thành phần của Gradle và có các ví dụ cụ thể. Mong là mọi người đã hiểu dk sâu hơn về nó :D

## Tham khảo
1. https://medium.com/gradeup/the-simplest-guide-to-understanding-gradle-758d9924e6ca
2. https://medium.com/@andrewMacmurray/a-beginners-guide-to-gradle-26212ddcafa8

Các bạn có thể đọc nhiều bài viết hơn tại blog [Code cùng Trung](http://codecungtrung.com/) của mình nhé :D 

Link blog: http://codecungtrung.com/

Hẹn các bạn tại blog :D