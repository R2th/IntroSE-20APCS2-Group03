## 1. Introduction

> In computer programming, a comment is a programmer-readable explanation or annotation in the source code of a computer program.  They are added with the purpose of making the source code easier for humans to understand, and are generally ignored by compilers and interpreters.
>
> Trong lập trình, comment là lời giải thích hoặc chú thích mà lập trình viên dễ dàng hiểu được trong mã nguồn của chương trình máy tính. Chúng được thêm vào với mục đích làm cho mã nguồn dễ hiểu hơn đối với con người, và thường bị các trình biên dịch và thông dịch bỏ qua.

Chúng ta sẽ kiểm tra lý thuyết trên thông qua Java class sau:
```Java
public class Comment {
	//Hello, I'm Logbasex.
	public static void main(String[] args) {}
}
```
Nếu bạn tiến hành disassemble class này trong trường hợp có comment và không có comment thì bạn sẽ thấy cả hai đều cho ra cùng một kết quả. Từ đấy chúng ta có thể khẳng định rằng việc comment không hề ảnh hưởng đến performance của code.
```
$ javac Comment.java
$ javap -v Comment.class

Classfile /home/logbasex/IdeaProjects/java-demo/src/Comment.class
  Last modified Mar 7, 2022; size 259 bytes
  MD5 checksum d87a21ec88edb7b9ce782875eaef27d2
  Compiled from "Comment.java"
public class Comment
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #3.#12         // java/lang/Object."<init>":()V
   #2 = Class              #13            // Comment
   #3 = Class              #14            // java/lang/Object
   #4 = Utf8               <init>
   #5 = Utf8               ()V
   #6 = Utf8               Code
   #7 = Utf8               LineNumberTable
   #8 = Utf8               main
   #9 = Utf8               ([Ljava/lang/String;)V
  #10 = Utf8               SourceFile
  #11 = Utf8               Comment.java
  #12 = NameAndType        #4:#5          // "<init>":()V
  #13 = Utf8               Comment
  #14 = Utf8               java/lang/Object
{
  public Comment();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 1: 0

  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=0, locals=1, args_size=1
         0: return
      LineNumberTable:
        line 4: 0
}
SourceFile: "Comment.java"
```

## 2. Two bits of history
Nghe nói comment ra đời trong một đêm mưa gió, khi một tập tin `hello.asm` được viết như sau:
```
          global    _start

          section   .text
_start:   mov       rax, 1             
          mov       rdi, 1                  
          mov       rsi, message            
          mov       rdx, 13                 
          syscall                           
          mov       rax, 60                 
          xor       rdi, rdi                
          syscall                           

          section   .data
message:  db        "Hello, World", 10      
```

Bạn thường được bảo rằng, **comment explain WHY, not HOW**, nhưng có vẻ với assembly code thì **HOW** lại là một điều cần thiết. 
```
; ----------------------------------------------------------------------------------------
; Writes "Hello, World" to the console using only system calls. Runs on 64-bit Linux only.
; To assemble and run:
;
;     nasm -felf64 hello.asm && ld hello.o && ./a.out
; ----------------------------------------------------------------------------------------

          global    _start

          section   .text
_start:   mov       rax, 1                  ; system call for write
          mov       rdi, 1                  ; file handle 1 is stdout
          mov       rsi, message            ; address of string to output
          mov       rdx, 13                 ; number of bytes
          syscall                           ; invoke operating system to do the write
          mov       rax, 60                 ; system call for exit
          xor       rdi, rdi                ; exit code 0
          syscall                           ; invoke operating system to exit

          section   .data
message:  db        "Hello, World", 10      ; note the newline at the end
```

Bởi vì cú pháp của ngôn ngữ không gần với ngôn ngữ tự nhiên nên là việc xử lý thông tin với bộ não thông thường sẽ gặp delay,  đó cũng là lý do dẫn đến sự ra đời của những ngôn ngữ bậc cao sau này.

Bonus một ví dụ comment assembly code bằng high-level code =)) Thật không thể tin được 😂😂😂😂.
![](https://images.viblo.asia/30a48216-0a3f-437b-a5d1-505964c5c4ab.png)

Nếu bạn muốn tìm hiểu thêm về lịch sử ra đời của comment thì có thể xem thêm ở [đây](https://www.quora.com/How-long-have-comments-been-able-to-be-used-in-programming-languages-Was-there-ever-a-language-that-did-not-allow-comments) và [đây](https://hackaday.com/2021/10/23/in-search-of-the-first-comment/).

## 3. Issue
Sau khi có sự xuất hiện ngôn ngữ lập trình bậc cao, chúng ta có thể viết những đoạn code khá mượt mà và trực quan như sau:
```Java
private static final int EMPLOYEE_BONUS_PERCENTAGE = 10/100;
	
public void calculateBonus() {
    List<Employee> employees = getAllEmployees();
    for (Employee employee : employees) {
        if (employee.getType() == EmployeeEnum.MANAGER.getType()) {
            employee.setBonus(employee.getWage() * EMPLOYEE_BONUS_PERCENTAGE);
        }
    }
}
```
Không cần phải là chuyên gia thì bạn cũng dễ dàng nắm được đoạn code này làm cái gì rồi đúng không?
> Trong tất cả các nhân viên, tìm ra những ai là quản lý và cấp cho họ khoản bonus tương ứng 10% tiền lương.

Tuy nhiên vấn đề ở đây đó chính là nhiều tháng sau, khi bạn quay lại maintain đoạn code này, bạn không biết tại sao lại có con số 10% cả.

Úi giời dễ, bạn bảo rằng bạn sẽ tìm người đã viết đoạn code này để hỏi, nhưng hồi đó còn chưa có `git blame`, chỉ có copy rồi patch code qua USB hay cái gì đó tương tự thôi 🤣🤣 .
```Java
// ********************************************************************
// * Logger helper                                                    *
// *                                                                  *
// * 2005-03-01 First Version, Anders Abel                            *
// * 2007-08-17 Added Console Output, Anders Abel                     *
// * 2009-12-15 Removed file output, John Doe                         *
// *                                                                  *
// * Usage: Call Logger.Write() with string to be logged.             *
// ********************************************************************
public static class Logger { 

}
```
Thế thì bạn sẽ hỏi `QA`, `Manager`...kiểu gì cũng có người biết. Đồng ý là vấn đề của bạn sẽ được giải quyết nhưng đáng ra bạn sẽ tiết kiệm được thời gian nếu như đoạn code đó có một vài comment chẳng hạn. Nhưng đối với những đoạn tricky/clever code thì sẽ khó có ai giúp bạn hiểu được nếu như người viết đoạn code đó đã ra đi...
```
{ 
  { 
    while (.. ){ 
      if (..){
          }
      for (.. ){ 
          }
         .... (just putting in the control flow here, imagine another few hundred ifs)
      if(..)   {
            if(..)     {
                   if(..)   {
                ...
                (another few hundred brackets)
                       }
                  }
         } //endif
```
Thật là mệt mỏi 🥲🥲🥲.
![image.png](https://images.viblo.asia/5c3475ed-47c8-489b-9d09-6da25acfd189.png)

## 4. Solution
1. Trong `Employee` class có một trường `type` nhưng bạn không biết trường này định nghĩa cái gì, bao gồm những giá trị nào thì hãy dùng `javadoc` để reference đến enum của nó:
    ```Java
    /**
     * {@link com.logasex.enums.EmployeeEnum}
     */
    @Field(FieldConst.TYPE)
    private String type;
    ```
2. Con số 10% được định nghĩa rõ ràng trong `Jira ticket`, vậy làm sao để comment như một hyper link?
    ```Java
    /**
	 * {@link <a href="https://logbasex.atlassian.net/jira/software/c/projects/logbasex/boards/127?modal=detail&selectedIssue=logbasex-2949&assignee=5cf483a4757e4b0f2636c4c0"></a>}
	 */
    private static final int EMPLOYEE_BONUS_PERCENTAGE = 10/100;
    ```
3.  Phương tính tính bonus và wage có sự liên quan chặt chẽ nhưng không gọi trực tiếp đến nhau, vậy thì làm sau để biểu diễn điều đó qua comment? Thật may mắn là `javadoc` đã support reference method với [syntax](https://stackoverflow.com/questions/5915992/how-to-reference-a-method-in-javadoc) như sau:
    ![image.png](https://images.viblo.asia/b2285ecd-dca5-45b2-9479-2b5f0463182c.png)
    ```Java
    /**
     * {@link com.logbasex.WageServiceImpl#calculateWage()}
     */
    public void calculateBonus() {}
    ```
    ----
    Với những IDE hiện đại thì bạn có thể chuyển đến bất cứ reference link nào chỉ với một cú nhấp chuột. Thật là tiện lợi phải không?
## 5. Best practices
Trong trường hợp trên mình đang giả định là chúng ta đã có một đoạn code rõ ràng, dễ hiểu, tuy nhiên trong thực tế nhiều lúc sẽ không đạt được trạng thái lý tưởng đó. Vậy nên chúng ta cần một số kinh nghiệm để viết comment một cách hợp lí, tránh việc comment bừa bãi vừa làm ô nhiễm source code, vừa làm tăng `cognitive complexity` khiến bạn tốn thời gian không cần thiết cho việc đọc hiểu.

![](https://27a7x92iyp7i4yd8b4bgzvnb-wpengine.netdna-ssl.com/wp-content/uploads/2020/08/giphy.gif)

> “Every time you write a comment, you should grimace and feel the failure of your ability of expression.” — Robert C. Martin
>
> Good codes have rhythm while mediocre codes have a lot of pauses ... by comments.
>
> Communicate via your codes, not your comments.
>
> Code comment is a smell. If you write code comments as the last option to improve your code, it will force you to improve your self-documenting skills first. That's why it should be considered a smell.
>
> Keep comment up to date. “Code never lies, comments sometimes do.” — Ron Jeffries
>
> Self-documented code over comprehensive comments.
>
> “Don’t comment bad code explaining what is happening, Rewrite it!”
>
> “The only best comment is the comment you found a way not to write.”
> 
> Comments should describe the intended outcome of the code in a language-agnostic fashion. It should not restate the code itself.
>
> One should be able to completely re-implement the code in any language, given only the comments. In other words, your intent comments are a living specification!
> 
> I don’t comment my code because if it was hard to write, then it should also be hard to read

![image.png](https://images.viblo.asia/b74246db-3975-441b-bf65-ea2594fdc69f.png)

![image.png](https://images.viblo.asia/d314cb6a-737f-4205-900a-1705a4fa0d9f.png),.
## References
- https://github.com/chrislgarry/Apollo-11
- http://cs.brown.edu/courses/cs031/content/docs/asmguide.pdf
- https://betterprogramming.pub/how-code-comments-are-obsoleting-333d5ca256d0
- https://towardsdatascience.com/why-good-codes-dont-need-comments-92f58de19ad2
- https://fagnerbrack.com/code-comment-is-a-smell-4e8d78b0415b
- https://dev.to/codemouse92/to-comment-or-not-to-comment-3f7h
- https://stackoverflow.com/questions/184618/what-is-the-best-comment-in-source-code-you-have-ever-encountered
- https://devdeejay.medium.com/dont-comment-your-code-rewrite-it-a145d655f87b
- https://www.quora.com/I-dont-comment-my-code-because-if-it-was-hard-to-write-then-it-should-also-be-hard-to-read-How-good-is-this-attitude-for-a-coder
- https://hackaday.com/2021/10/23/in-search-of-the-first-comment/
- https://www.quora.com/What-is-the-difference-between-Java-and-Assembly-Language/answer/Michael-Hamburg