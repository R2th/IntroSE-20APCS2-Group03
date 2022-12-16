# 1. Cú pháp
* Gradle được viết bằng [Groovy](http://www.groovy-lang.org/) – một ngôn ngữ dành cho Java platform. Để tiếp cận một cách rõ ràng hơn, chúng ta sẽ tìm hiểu một vài khái niệm của Groovy.
### a. Closure
* Closure là một dạng khái niệm mà chúng ta cần phải nắm rõ để hiểu rõ về Gradle. Closure là một đoạn code độc lập có thể truyền đối số, trả về giá trị và có thể gán cho một biến. Nó là một sự pha trộn giữa Callable interface, Feature, con trỏ hàm...
* Về cơ bản, đây là một đoạn code được thực thi khi chúng ta gọi nó. Chúng ta hãy xem một ví dụ Closure đơn giản:
```
def myClosure = { println 'Hello world!' }

//execute our closure
myClosure()

#output: Hello world!
```
Hoặc một Closure có đối số:
```
def myClosure = {String str -> println str }

//execute our closure
myClosure('Hello world!')

#output: Hello world!
```
Hoặc nếu Closure chỉ có 1 đối số, nó có thể được tham chiếu như sau:
```
def myClosure = {println it }

//execute our closure
myClosure('Hello world!')

#output: Hello world!
```
Hoặc Closure chứa nhiều đối số:
```
def myClosure = {String str, int num -> println "$str : $num" }

//execute our closure
myClosure('my string', 21)

#output: my string : 21
```
Hay đơn giản, các đối số là tùy chọn nên ví dụ trên có thể được đơn giản hóa như sau:
```
def myClosure = {str, num -> println "$str : $num" }

//execute our closure
myClosure('my string', 21)

#output: my string : 21
```
* Một tính năng thú vị là Closure có thể tham chiếu các biến từ bối cảnh hiện tại (read class). Mặc định thì bối cảnh hiện tại là class tạo ra Closure:
```
def myVar = 'Hello World!'
def myClosure = {println myVar}
myClosure()

#output: Hello world!
```
Một điều thú vị khác là bối cảnh hiện tại cho Closure có thể thay đổi bằng các gọi *Closure#setDelegate()*. Tính năng này sẽ trở nên vô cùng quan trọng sau này:
```
def myClosure = {println myVar} //I'm referencing myVar from MyClass class
MyClass m = new MyClass()
myClosure.setDelegate(m)
myClosure()

class MyClass {
    def myVar = 'Hello from MyClass!'
}

#output: Hello from MyClass!
```
* Như chúng ta đã thấy, tại thời điểm chúng ta tạo ra Closure, biến *myVar* không tồn tại. Điều này là hoàn toàn có lợi bởi vì *myVar* chỉ nên xuất hiện trong bối cảnh tại thời điểm chúng ta thi hành Closure này. Trong trường hợp này, chúng ta đã chỉnh sửa bối cảnh hiện tại cho Closure trước khi chúng ta thi hành nó và biến *myVar* có thể dùng được.
### b. Truyền đối số cho Closure
* Lợi ích lớn nhất của Closure là khả năng thích nghi với nhiều phương thức khác nhau giúp cho chúng ta tách rời các logic thực thi. Trong các ví vụ trên, chings ra đã sử dụng khả năng này khi sử dụng nhiều phương thức với cùng một Closure. Bây giờ chúng ta sẽ thực hiện các cách khác nhau để gọi phương thức chấp nhận Closure:
- Phương thức một đối số - Closure
```
myMethod(myClosure)
``` 
- Nếu phương thức chỉ chấp nhận một đối số - dấu () có thể được bỏ qua
```
MyMethod myClosure
```
- Chúng ta có thể tạo Closure một dòng
```
myMethod {println 'Hello World'}
```
- Phương thức chấp nhận 2 đối số
```
myMethod(arg1, myClosure)
```
- Hoặc 2 đối số trên một dòng
```
myMethod(arg1, { println 'Hello World' })
```
- Nếu đối số mà một Closure thì chúng ta có thể đưa ra ngoài dấu ()
```
myMethod(arg1) { println 'Hello World' }
```
# 2.Gradle
* Chúng ta cùng phân tích một ví dụ đơn giản như sau:
```
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:1.2.3'
    }
}
allprojects {
    repositories {
        jcenter()
    }
}
```
* Sau khi tìm hiểu về cú pháp của Groovy, chúng ta có thể phân tích một vài dư liệu như sau:
- Đây là một phương thức buildscript chấp nhận Closure:
```
def buildscript(Closure closure)
```
- Có một phương thức allprojects chấp nhận Closure:
```
def allprojects(Closure closure)
```
......
* Chúng ta cần phải biết chính xác nơi mà phương thức được gọi và [Project](https://docs.gradle.org/current/dsl/org.gradle.api.Project.html) là câu trả lời.
### a. Project
* Đây là chìa khóa để hiểu các script của Gradle.
> All top level statements within build script are delegated to Project instance
*  Điều này có nghĩa là Project sẽ bắt đầu với phương thức *buildscript*.
> **"delegates to [something]"** and **"configures [something]"** - 2 statements which mean exactly the same - closure will be execute against specified class.
* Gradle dử dụng rộng rãi chiến lược ủy nhiệm này, vì vậy điều thực sự quan trong là phải hiểu thuật ngữ này. Chúng ta sẽ xem những gì xảy ra khi chúng ta kích hoạt Closure *{classpath 'com.android.tools.build:gradle:1.2.3'}*  với bối cảnh *DependencyHandler*. Theo tài liệu hướng dẫn, cú pháp sẽ như sau *<configurationName> <dependencyNotation1>*. Với Closure chúng ta đang cấu hình với tên *classpath* để sử dụng *com.android.tools.build:gradle:1.2.3* như là một phụ thuộc.
### b. Các khối Script
* Theo mặc định, chúng ta sẽ có các khối script được định nghĩa sẵn trong *Project*, nhưng Gradle cũng cho phép chúng ta tạo ra các khối script mới.
* Chúng ta sẽ xem xét khối script mặc định của Android (*app/build.gradle*)
```
apply plugin: 'com.android.application'
android {
    compileSdkVersion 22
    buildToolsVersion "22.0.1"
    defaultConfig {
        applicationId "com.trickyandroid.testapp"
        minSdkVersion 16
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```
* Chúng ta có thể thấy trước khi kích hoạt phương thức *android*, chúng ta sẽ sử dụng *com.android.application* plugin. Android application plugin mở rộng đối tượng *Project* với *android* script.
# 3. Kết
* Mình hy vọng với bài viết này các bạn sẽ có thêm một vài hiểu biết về Gradle của Android. Nọi dung của bài viết mình có tham khảo của tác giả [Tricky Android](https://trickyandroid.com/)