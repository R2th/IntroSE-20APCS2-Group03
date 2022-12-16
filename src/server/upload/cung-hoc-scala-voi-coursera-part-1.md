Scala là ngôn ngữ lập trình, theo mình là rất thú vị và có nhiều cái mới mẻ để chúng ta học thêm( Trước khi học Scala mình đã tìm hiểu C++ hướng đối tượng căn bản, song vẫn khá choáng khi tiếp xúc với 1 programming style mới: Functional Programming ). Tuy vậy, tài liệu về Scala còn khá ít, đa số là tiếng anh, nên sẽ khó tiếp thu cho các bạn mới làm quen. Theo document trên trang chủ của Scala, chúng ta có thể tìm hiểu về ngôn ngữ này qua các khóa học hoàn toàn miễn phí tại Coursera và edX. Mình đã học thử và cảm thấy như được mở mang thêm rất nhiều sau khi học tại đây, và series này chính là thành quả, bởi các cụ có câu: Ta chỉ hiểu vấn đề khi có thể giải thích cho kẻ khác hiểu vấn đề ấy. Loạt bài viết sẽ theo format của Coursera, mỗi chương trong 1 week là 1 bài, nếu dài hơn mình sẽ chia thành 2, 3 part. Dựa trên slide của giảng viên Coursera và những gì mình tiếp thu được sau khi học, nên sau khi đọc mình khuyên các bạn nên xem lại Video bài giảng theo link tại document của scala nhé. 
OK, bắt đầu nào !

# **Getting Started**

## 1. Giới thiệu khóa học - Skip
## 2. Set up tools
Nếu bạn học trực tiếp trên Coursera, hãy xem video để biết chi tiết cách submit bài tập lấy chứng chỉ sau khi hoàn thành khóa học. Trong phạm vi bài viết mình chỉ trình bày cách setup các công cụ cần thiết để bạn viết và chạy được chương trình helloworld bằng Scala. 
###         a. Với các text editor như VS Code, Sublime Text,...( Mình ví dụ với VSCode)
Tải và cài đặt Visual Studio Code, sau khi mở lên sẽ được như hình:
  
  ![](https://images.viblo.asia/87e1cf75-7ddf-409c-af44-d0a2b1abdc50.png)
    Tiếp theo, bạn vào Extensions và cài một vài extensions support cho việc viết code scala dễ dàng hơn, như Scala Syntax, Code Runner.
    Với một số bạn sử dụng hệ điều hành windows, các bạn cần cài Scala cho máy mình trước nhé( Mở cmd gõ "scala --version", nếu kết quả như hình là OK)
   
   ![](https://images.viblo.asia/255d8dbf-30d9-4910-afe4-05fdb9b8e354.png)
    Còn nếu báo lỗi, các bạn tải file installer về từ trang chủ tại https://www.scala-lang.org/download/ , cài đặt và sau đó restart cmd và thử lại nhé.
    Cuối cùng mở VSCode, tạo 1 folder mới( Đặt tên là LearnBasic, mở nó trong VSCode), tạo 1 file mới là helloworld.scala, copy đoạn code sau và dán vào:

```
object main{
    def main(args: Arrar[String]){
        println("Hello world")
    }
}
````
Nếu in ra được dòng Helloworld tại màn hình Console là bạn đã cài đặt hoàn tất và có thể sử dụng VSCode để làm việc. Khi cài extension Code Runner, bạn chuột phải vào file code và chọn Run Code để biên dịch và run chương trình, hoặc bạn mở cmd/ terminal và gõ vào câu lệnh sau:
scala "C:\ProjectName\FolderName\helloworld.scala" ( Như trường hợp của mình là:  scala "d:\CodeProject\Scala\main\hello.scala" ).

![](https://images.viblo.asia/b15073c7-d9e1-44ee-800a-d95b9e6d8245.png)
Nếu xảy ra lỗi,vui lòng copy nó và dán vào thanh search của Google, stackoverflow sẽ giúp bạn.
###                 b. Với IntelliJ IDEA
###                 
 Các bạn tải IntelliJ IDEA về từ trang chủ của JetBrains và cài đặt như bình thường.
 Sau khi hoàn thành phần cài đặt và khởi động IntelliJ, tại phần Configure, chọn Plugins, tìm từ khóa Scala và cài đặt, restart lại IDE
 Khởi động lại IntelliJ, New Project, chọn scala -> sbt -> Next
 
 ![](https://images.viblo.asia/98b5f6dc-c814-4e44-9f63-7bb15e2a41e3.png)
  Chọn tên, location, jdk, sbt, scala version cho project( Mình để mặc định, tên project là HelloworldExample) -> Finish
  
  ![](https://images.viblo.asia/fa520de8-2018-468c-97de-304661ebee27.png)
  Bạn tạo file trong src/main/scala( New File -> helloworld.scala)
  
  ![](https://images.viblo.asia/1b969a29-3a20-4dfb-9b8d-8728d26d358e.png)
   Setup SDK
  
  ![](https://images.viblo.asia/fba6ad74-3bb8-4e96-978e-ff8c592eda02.png)
    OK, copy đoạn code helloworld phía trên vào, nhấn vào biểu tượng bên trái phần code hoặc chuột phải chọn run main, nếu in ra được dòng Hello world là bạn đã cài đặt thành công
   
   ![](https://images.viblo.asia/383d20a0-9fb1-468a-8f88-4398f2eedb87.png)





##        3. Cheat Sheet    
##             
Tham khảo: https://github.com/lampepfl/progfun-wiki/blob/gh-pages/CheatSheet.md
Các bạn nên có 2 lựa chọn: 1 là đọc qua bản cheat sheet để nắm được các nội dung cơ bản, sau đó học sâu từng phần qua các bài học phía sau. Hoặc là học chi tiết từng phần, sau đó sử dụng bảng cheat sheet này để ghi nhớ nhanh. Bản thân mình lúc đầu học theo cách 1 nhưng đọc đến phần Currying Function bắt đầu không hiểu cú pháp, và phải học theo cách thứ 2. Mình sẽ giải thích vắn tắt các đề mục, các bạn vừa đọc vừa xem cheat sheet tại link mình để phía trên nhé.
###             Evaluation Rules: call by name - call by values
Đây là cách viết parameters call by values, như bình thường: 
```
def sum(a: Int, b: Int, c: Int) : Int = a + b + c
```             

Còn đây là cách viết parameters call by name với biến c:
  
 ```
def sum(a : Int, b : Int, c: => Int) : Int = a + b + c

```

Sự khác nhau cơ bản của 2 cách này nằm ở phần tính toán các tham số truyền vào, call by values sẽ tính toán tất cả tham số trước khi truyền vào hàm, còn call by name chỉ khi nào sử dụng đến tham số đó thì mới tính toán, để hiểu rõ hơn, hãy nhìn vào ví dụ dưới đây

 ```
def loop : Int = loop // 1 biến lặp vô hạn
  def sumCallByName(a: Int, b: =>Int, c: Int): Int = a + c
  def sumCallByValue(a: Int, b : Int, c: Int): Int = a + c
  sumCallByName(1,loop,1)// Result = 2
  sumCallByValue(1,loop,1) // Error
```

  Các bài viết sau mình sẽ trình bày cụ thể hơn về ưu, nhược điểm của từng cách.
  
###                Higher order functions
Hiểu đơn giản là 1 hàm, có thể nhận 1 hàm khác là tham số, hoặc trả về kết quả là 1 hàm, hoặc xảy ra cả 2 điều trên. 
Để hiểu hơn, hãy đến với 1 bài toán tính giai thừa sử dụng đệ quy
```
  def factorial(number: Int) : Int ={
         if(number == 1 ) 1
         else number * factorial( number - 1)
 }                  
```
                            
  Tuy nhiên, nếu với number lớn, thì sẽ dẫn đến một số vấn đề về bộ nhớ( Bạn có thể search google về đệ quy để biết thêm). Hãy sửa lại code 1 chút, như vậy:

   ```
def factorial(number: Int ) : Int ={
        def factorialHelper(number: Int, cout: Int = number) : Int ={
          if (cout == 1 ) number
          else factorialHelper(number * (cout - 1), cout - 1)
        }
        factorialHelper(number)
      }
```

Như bạn thấy, hàm factorial phía trên có kết quả trả về là 1 hàm( factorialHelper) và có thể định nghĩa hàm helper ngay phía trong hàm factorial.
Còn rất nhiều điều thú vị về higher order function, mình sẽ trình bày ở những phần sau.

###                     Currying
Hiểu đơn giản là quá trình bạn chuyển đổi, từ 1 hàm nhận nhiều tham số thành nhiều hàm lồng nhau, mỗi hàm nhận 1 tham số.
Đây là phần khiến mình khó hiểu nhất trong toàn bộ cheat sheet, và giờ mình có thể giải thích cho các bạn ý nghĩa của từng dòng code tại phần Currying trong file cheat sheet như sau( Mình xin đổi thứ tự các dòng code 1 chút cho các bạn dễ hiểu hơn):
                
 ```
def f(a: Int, b: Int): Int = a + b //Phiên bản bình thường, nhận vào 2 số nguyên và trả về tổng
 val f2: (Int, Int) => Int = f // Vẫn là phiên bản bình thường, hằng số f2 là 1 hàm không tên( Hàm này nhận vào 2 số nguyên và trả về 1 số nguyên, chính là hàm f phía trên), và gán nó bằng hàm f, tức là sẽ trả về tổng 2 số
def f(a: Int)(b: Int): Int // Hàm f phiên bản currying :v . Hiểu nôm na là hàm f này nhận vào số nguyên a và trả về 1 hàm (mà hàm đó - mình tạm gọi là f2 nhận vào số nguyên b và f2 trả về 1 số nguyên)
val f3: Int => Int => Int = f2.curried // Cũng là phiên bản currying, hiểu tương tự như cách hiểu phía trên, sẽ dễ hiểu hơn khi viết val f3: Int => (Int => Int)
val f4: (Int, Int) => Int = Function.uncurried(f3) // Tương tự f2
```
                
Để hiểu kỹ hơn, các bạn hãy đọc các bài viết sau hoặc xem tại Coursera. Còn ưu khuyết điểm của phương pháp này bạn có thể tìm kiếm trên google nhé.  Các phần tiếp theo của cheat sheet sẽ được mình tổng hợp tiếp tại phần 2 của bài viết. Hẹn gặp lại các bạn.