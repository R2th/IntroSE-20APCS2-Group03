# Mở đầu
Hí anh em! lại là tui, Đức Thảo đây!

Hôm nay Hà Lội 😁 mưa, buồn quá chả biết làm gì. Ngồi nhìn đống code thì oidoioi luôn, không buồn làm gì cả!
Thế là lại lang thang lên các forum, các trang mạng xã hội, xem có gì hay không, nhưng không chả có gì hay ho với tâm trạng của một ngày mưa cả hjx

Để hoà vào không khí buồn man mác đó thì mình quyết định bắt đầu một cái seri mới về cái thằng mà mình khổ sở về nó, nó là JAV à nhầm **JAVA** hi!

Để bắt đầu với seri này thì mình sẽ lên đồ với một bài viết về **JDK, JVM, JRE**

Những bạn học JAVA, hoặc mới tiếp cận JAVA thì chắc là không còn xa lạ với các thuật ngữ này rồi, nhưng bạn có bao giờ tự đặt câu hỏi là, tại sao lại có những thứ quái quỷ này, nó dùng để làm gì và nó khác nhau như thế nào không?
Hôm này mình sẽ gỉai đáp những thắc mắc này cho các bạn hiểu hơn về nó nhá! 😁😁😁

> Lưu ý:   Kiến thức của bài viết này và các bài viết khác của mình đều do mình tự tìm hiểu và học hỏi, mình cũng dùng những ngôn từ gần gũi nhất để những bạn mới tiếp cận cũng có thể hiểu nó một cách đơn giản nhất và kiến thức của mình có thể đúng hoặc sai hoặc thiếu, nếu sai ở đâu thì các bạn hãy góp ý ở phía bên dưới để mọi người cùng hiểu hơn nhá!😍

# Bắt đầu thôi
## **JDK**  là cái quần gì? :  
 -  **Java Development Kit**  hay còn gọi là **JDK** môi trường phát triển phần mềm, được sử dụng cho các nhà phát triển phần mềm (là chúng ta, những con người đi code thuê nè 😂) và applets (thằng này thì thật ra mình cũng không rõ nó đâu, đại khái nó dc phát triển bởi java và một số ngôn ngữ khác -> không biết đúng không, hihi). JDK nó bao gồm môi trường runtime (Runtime Environment JRE), interpreter/loader (java), compiler (javax), archiver (jar), documentation generator (Javadoc) và một số công cụ dành cho nhà phát triển khác nữa!
 -  Như mình cũng đã liệt kê ở trên, JDK gồm 2 phần chính:
         
         -  Môi trường và công cụ phát triển chương trình java của chúng ta
         -  JRE (chúng ta sẽ thảo luận về nó ngay bây giờ)

## **JRE lại cái quần nữa!**
* **Java Runtime Environment**  hay còn gọi là **JRE** và cũng có thể gọi là **RTE**, và đúng như cái tên cúng cơm của nó, nó chỉ dùng để chạy thôi chứ không dùng để phát triển chương trình java. Nó bao gồm cả **JVM** (chúng ta sẽ tìm hiểu về nó phía bên dưới nhé), và các thư viện như: 
    
    *     Thư viện cơ sở Lang và util, bao gồm lang và util, quản lý, phiên bản ..v..v..
    *     Các thư viện tích hợp, bao gồm Ngôn ngữ định nghĩa giao diện (IDL), Kết nối cơ sở dữ liệu Java (JDBC)..v..v..

## **JVM** cái quần cuối cùng!
* **Java Virtual Machine**  hay còn gọi là **JVM**. Bạn có để ý là **JRE** nằm trong **JDk** và **JVM**  lại nằm trong **JRE** không?, mình để cái ảnh này là bạn hiều rõ hơn nè: 

![image.png](https://images.viblo.asia/033cd9e6-2b4e-4be8-858c-110cacdbde79.png)

   Rùi, đã hiểu hơn chưa nào? **JVM** là phần cực kỳ quan trọng của **JDK** và **JRE** vì nó được tích hợp trong 2 thằng này
*  Thế cuối cùng nó dùng để làm cái quần gì?. Bất cứ chương trình Java nào bạn chạy bằng **JRE** hoặc **JDK** đều đi vào **JVM** và **JVM** chịu trách nhiệm thực hiện chương trình java một cách tuần tự, do đó nó còn được gọi là **interpreter**..Mình sẽ có một bài viết riêng về cách hoạt động của thằng  **JVM**  này nhé!

## **3 cái quần này thì khác nhau cái gì?**
* Thật ra sự khác nhau của 3 thằng này mình cũng đã nói luôn ở trên rồi, bây giờ mình sẽ tóm tắt lại để các bạn phân biệt được cơ bản sự khác nhau của 3 thằng này nhé!
### JDK 
    - Cung cấp môi trường dành cho nhà phát triển
###     JRE
    - Cung cấp môi trường chỉ để chạy (run) chứ không dùng để phát triển các chương trình java!
###     JVM
    - Nó rất quan trọng và nó nằm bên trong **JDK** và **JRE**, chị trách nhiệm thực hiện chương trình java một cách tuần tự!
    
#     Kết
* Chúng ta đã cùng tìm hiểu xem **JDK**,**JRE**,**JVM** cơ bản và sự khác nhau của nó là gì rồi, nhưng để hiểu sâu hơn cách làm việc của từng thằng thì mình sẽ có bài viết về từng thằng nhá,