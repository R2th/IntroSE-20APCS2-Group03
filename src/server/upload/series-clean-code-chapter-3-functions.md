![](https://images.viblo.asia/0d2c75ee-eedd-48e7-b88c-ec90afaaa3aa.png)

Trong những ngày đầu của lập trình, chúng ta biên soạn hệ thống của chúng ta bằng chương trình *(routines - thủ tục, hàm, chương trình con)* và những chương trình con *(subroutines)*. Sau đó là thời đại của Fortran và PL/1 hệ thống của chúng ta bao gồm những chương trình *(programs)*, chương trình con *(subprograms)*, và chức năng *(functions)*. Đến nay chỉ có chức năng là tồn tại được từ những ngày đầu tiên. Chức năng là đơn vị đầu tiên tổ chức nên bất cứ chương trình nào. Rất khó để hiểu một hàm chức năng dài với nhiều mức trừu tượng khác nhau, các lệnh **if** lồng nhau, các chuỗi xa lạ và những chức năng lẻ khác được gọi. Tuy nhiên, chỉ với một vài phương pháp rút gọn đơn giản, thay đổi một số tên, và tái cấu trúc lại một ít, là có thể nắm được đường cơ bản chính ở trong chức năng.
```java
public static String renderPageWithSetupsAndTeardowns(
   PageData pageData, boolean isSuite
) throws Exception {
   boolean isTestPage = pageData.hasAttribute("Test");
   if (isTestPage) {
      WikiPage testPage = pageData.getWikiPage();
      StringBuffer newPageContent = new StringBuffer();
      includeSetupPages(testPage, newPageContent, isSuite);
      newPageContent.append(pageData.getContent());
      includeTeardownPages(testPage, newPageContent, isSuite);
      pageData.setContent(newPageContent.toString());
   }
   return pageData.getHtml();
}
```
Nếu như bạn không phải là một thành viên thực hiện, chắc chắn bạn không thể nào hiểu hết được tất cả những chi tiết bên trong nó. Tuy nhiên, bạn hoàn toàn có thể hiểu được chức năng của hàm này bao gồm cài đặt và xóa bỏ trang test sau đó trả lại về trang HTML.

Vì vậy hàm trên là dễ đọc, dễ hiểu hơn. Làm thế nào chúng ta có thể truyền đạt mục tiêu của một hàm chức năng? Những thuộc tính nào đưa vào function thì có thể làm cho một người đọc bất kỳ có thể cảm nhận được sự sống của nó bên trong chương trình?
# 1. Small!
*Nguyên tắc đầu tiên của functions là chúng cần phải nhỏ. Nguyên tắc thứ hai là chúng cần phải nhỏ hơn nữa.*

Đó không phải là một lời khẳng định mà tác giả có thể chứng minh. Không có bất cứ liên hệ với các nghiên cứu nào cho thấy function nhỏ thì sẽ tốt hơn. Những gì có thể nói cho bạn đó là trong gần bốn thập kỷ, những kinh nghiệm về viết các function với những kích thước khác nhau cho thấy, có một sự khó chịu gớm ghiếc với function 3000 dòng, function với 100-300 dòng. Và cuối cùng là những function với 20-30 dòng. Kinh nghiệm từ những sai lầm đã chỉ ra, function nên được viết rất nhỏ *(very small)*.

Function không nên dài quá 20 dòng và một dòng không nên quá 150 ký tự (không vượt quá màn hình 100-120 ký tự).
```java
public static String renderPageWithSetupsAndTeardowns(
   PageData pageData, boolean isSuite) throws Exception {
   if (isTestPage(pageData))
      includeSetupAndTeardownPages(pageData, isSuite);
   return pageData.getHtml();
}
```
**Blocks and Indenting**

Những khối câu lệnh if, else, while nên được chứa trong một dòng, và những dòng này nên được đặt thành một lời gọi hàm. Điều này không chỉ giữ cho function nhỏ mà còn cho biết thêm thông tin cụ thể về việc nó đang làm bằng một cái tên mô tả độc đáo.

Điều này cũng có nghĩa là các function không nên có những cấu trúc lồng nhau. Vì thế, mức thụt lề của function nên chỉ ở mức một hoặc hai. Tất nhiên, nó sẽ làm cho function dễ đọc và dễ hiểu hơn.
# 2. Do One Thing
*Function chỉ nên thực hiện một thứ. Nó nên thực hiện điều đó cho tốt. Nó nên thực hiện một điều duy nhất.*

Vấn đề đặt ra ở đây là, thật khó để biết được "một thứ" (one thing) đó là gì?

Nên phân biệt rõ **one thing** với **multi steps**. Một function không chỉ là gồm một bước mà bao gồm nhiều công đoạn. Mỗi bước có thể lại là một function, mục tiêu là để phân rã một khái niệm lớn, nói cách khác tên của function là tập hợp các bước ở một mức độ tiếp theo của tính trừu tượng.

Thực hiện một điều bằng cách chia thành nhiều phần.
# 3. One Level of Abstraction per Function
Để đảm bảo chắc chắn rằng function của chúng ta đang thực hiện một điều duy nhất cần đảm bảo rằng các câu lệnh ở trong function đều ở cùng một mức độ trừu tượng.

Trộn lẫn các mức độ trừu tượng ở trong function luôn làm cho nó khó hiểu. Người đọc có thể không biết được biểu hiện cụ thể của một chi tiết hay khái niệm quan trọng. Tồi tệ hơn, như một cửa sổ bị phá vỡ, các chi tiết trộn lẫn với khái niệm quan trọng, và nó lớn dần lên bên trong hàm.

**Reading Code from Top to Bottom: The Stepdown Rule**

Chúng ta muốn đọc Code như một câu chuyện từ trên xuống. Mỗi function sắp xếp đều được tuân theo theo mức độ của sự trừu tượng từ trên xuống. Giảm dần mức độ trừu tượng khi chúng ta đọc từ trên xuống.Gọi là **Nguyên tắc Stepdown**.

```
To Include (Setups & TearDowns):
    Include (Setups)
    Include (Test Page Content)
    Include (TearDowns)
       To Include (Setups):
           Include (Suite Setup)
           Include (Regular Setup)
              To Include (Suite Setup):
                  Search the parent hierarchy for the "SuiteSetUp"
                  Add an Include statement with the path of that page
...
```

Rất khó khăn để các lập trình viên học và viết Function ở một mức đơn cấp trừu tượng. Nhưng học thủ thuật này rất quan trọng. Nó giữ cho Function ngắn và luôn thỏa mãn "one thing".
# 4. Switch Statements
Thật khó để rút gọn câu lệnh **switch**. Chúng ta không thể nào luôn luôn tránh câu lệnh **switch**, những chúng ta chắc chắn rằng mỗi câu lệnh **switch** luôn cất giữ bởi một class ở mức thấp hơn và không bao giờ được sử dụng lại. Chúng ta làm được, bằng đa hình. 
```java
public Money calculatePay(Employee e)
throws InvalidEmployeeType {
   switch (e.type) {
      case COMMISSIONED:
         return calculateCommissionedPay(e);
      case HOURLY:
         return calculateHourlyPay(e);
      case SALARIED:
         return calculateSalariedPay(e);
      default:
         throw new InvalidEmployeeType(e.type);
   }
}
```
Có một số vấn đề với function này. Đầu tiên là nó lớn, và khi có thêm một loại nhân viên mới được thêm vào, nó sẽ phát triển thêm. Thứ hai, nó rõ ràng là làm nhiều hơn một điều. Thứ ba, vi phạm Single Responsibility Principle bởi vì có nhiều hơn một lý do cho trường hợp nó thay đổi. Thứ tư, vi phạm Open Close Principle bởi vì nó phải thay đổi bất cứ khi nào có kiểu nhân viên mới được thêm vào. Nhưng vấn đề tồi tệ nhất với function này là có một số lượng không giới hạn các function khác sẽ có cấu trúc tương tự.

Cách giải quyết vấn đề này là chôn vùi lệnh **switch** trong tầng hầm của một ABSTRACT FACTORY, và không bao giờ để bất kỳ ai nhìn thấy nó. Factory sẽ sử dụng lệnh switch để tạo ra các trường hợp thích hợp của nhân viên, và các chức năng khác nhau, tất cả được gửi đi bằng đa hình thông qua Employee interface.
```java
public abstract class Employee {
   public abstract boolean isPayday();
   public abstract Money calculatePay();
   public abstract void deliverPay(Money pay);
}
```
```java
public interface EmployeeFactory {
   public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}
```
```java
public class EmployeeFactoryImpl implements EmployeeFactory {
   public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
      switch (r.type) {
         case COMMISSIONED:
            return new CommissionedEmployee(r) ;
         case HOURLY:
            return new HourlyEmployee(r);
         case SALARIED:
            return new SalariedEmploye(r);
         default:
            throw new InvalidEmployeeType(r.type);
      }
   }
}
```
Nguyên tắc chung cho câu lệnh switch là có thể được chấp nhận nếu nó chỉ xuất hiện một lần, được sử dụng để tạo ra các đối tượng đa hình, được ẩn đằng sau một mối quan hệ thừa kế để phần còn lại của hệ thống không thể nhìn thấy chúng. Tất nhiên trong mọi hoàn cành, có những lúc tôi vi phạm một hoặc nhiều phần của nguyên tắc đó.

# 5. Use Descriptive Names
Sử dụng tên mô tả những gì function làm.

Đừng ngại bởi vì nó là một cái tên dài. Tên mô tả dài tốt hơn là một tên ngắn bí ẩn. Tên mô tả dài tốt hơn là một đoạn bình luận mô tả. Sử dụng một quy tắc đặt tên là dùng những từ ngữ dể đọc để làm tên hàm và dùng những từ khóa để mô tả chức năng của nó làm gì.

Sử dụng tên mô tả sẽ làm rõ việc thiết kế các module trong tâm trí bạn và giúp bạn cải thiện nó.

# 6. Function Arguments
Số lượng những tham số lý tưởng trong hàm là 0 (niladic), tiếp đến là 1 (monadic), theo sau là 2 (dyadic). Ba (triadic) tham số thì nên tránh nếu có thể. Nhiều hơn ba (polyadic) đòi hỏi phải có một sự lý giải rất đặc biệt và không nên sử dụng thế nào cũng được.

Tham số thậm chí còn khó khăn hơn khi đứng ở góc độ kiểm thử. Tưởng tượng rằng viết test case sẽ khó khăn thế nào khi phải đảm bảo tất cả tổ hợp các tham số đều hoạt động đúng. Nếu không có tham số, điều này là bình thường. Nếu có một tham số nó cũng không quá khó. Nếu hai tham số thì vấn đề trở nên khó khăn hơn một chút. Với nhiều hơn hai tham số, điều này quả thực là cả một vấn đề.

Tham số đầu ra khó để hiểu hơn là tham số đầu vào. Khi chúng ta đọc một hàm, chúng ta sử dụng ý tưởng về thông tin đầu vào qua các tham số, và giá trị trả về ở đầu ra. Không mong đợi thông tin trả về lại thông qua một tham số. Nên tham số đầu ra thường khiến chúng ta phải lấy hai lần (double-take).
* **Common Monadic Forms**

    Hai hình thức phổ biến khi sử dụng một tham số là:

    - Một hàm lý luận, trả về true hoặc false
    
    - Một hàm lập luận, biến nó thành một cái gì khác và trả lại nó.
    
    Một hình thức ít phổ biến hơn là hàm xử lý sự kiện, có một tham số đầu vào nhưng không có đối số đầu ra.

    Cố gắng tránh bất cứ Monadic Functions nào mà không theo những form trên.
* **Flag Arguments**

    Không gì tồi tệ hơn khi tham số truyền vào là một flag argument, bởi vì nó đã làm nhiều hơn một điều: một khi flag có giá trị đúng, và một khác khi flag có giá trị sai.
Chúng ta nên tách trường hợp này thành 2 hàm.
* **Dyadic Functions**

    Hàm có hai tham số sẽ khó để hiểu hơn hàm có một tham số. 
    
    Có những trường hợp 2 tham số là hoàn toàn hợp lý, *Ví dụ: Point p = new Point(0,0);*

    Tuy nhiên 2 tham số trong trường hợp này được sắp xếp làm thành phần của một giá trị duy nhất.
    
    *=> Hai tham số phải có sự gắn kết tự nhiên hoặc là sắp xếp của một trật tự tự nhiên.*
    
* **Triads**

    Những hàm phải đưa ra tới 3 đối số càng khó để hiểu hơn là hai. Khuyên bạn nên thực sự cẩn thận khi đưa ra một hàm với một bộ 3 tham số.
    
    *(Overload khi đợi các tham số)*
    
    Tuy nhiên đôi khi cũng cần phải sử dụng. *Ví dụ: assertEquals (1.0, amount, .001)*
* **Argument Objects**

    Khi một số hàm thực sự cần nhiều hơn 2 hay 3 tham số, có khả năng là một số trong những tham số đó có thể gói gọn trong một lớp của riêng chúng:
    ```java
    Circle makeCircle(double x, double y, double radius);
    Circle makeCircle(Point center, double radius);
    ```
* **Argument Lists**

    Đôi khi chúng ta muốn vượt qua số lượng biến số của tham số vào một hàm.
    ```java
    String.format("%s worked %.2f hours.", name, hours);
    ```
    Nếu các tham số đều được đối xử tương tự nhau, có thể gộp chung lại thành một tham số đơn kiểu List.
* **Verbs and Keywords**

    Trong trường hợp là một monad function, hàm và tham số nên tạo thành một động từ hoặc một cặp danh từ đẹp.

    Điều cuối cùng là dạng từ khóa của tên hàm. Sử dụng hình thức này chúng ta mã hóa tên các tham số vào tên hàm. *Ví dụ: assertEquals* có thể được viết tốt hơn là *assertExpectedEqualsActual(expected, actual)*, điều này giảm nhẹ vấn đề phải nhớ thứ tự các tham số.
    
# 7. Have No Side Effects (Không có tác dụng phụ)
Hàm của bạn hứa hẹn làm một điều, nhưng đôi khi có những phản ứng không mong muốn. Đôi khi nó làm thay đổi bất thường các biến trong class của chính nó. Đôi khi nó để các thông số thông qua và vào hàm hoặc hệ thống toàn cục. Trong cả 2 trường hợp nó sinh ra nhưng hiểu lầm quanh co và tai hại dẫn đến những sự phụ thuộc và liên kết kỳ lạ.

=> Do One Thing

**Output Arguments**

Ví dụ:
```
appendFooter (s);
```
Có phải hàm này nối thêm s và Footer vào cái gì không? Hay là nối thêm footer vào s? s là input hay output?
```java
public void appendFooter(StringBuffer report)
```
Lúc trước, khi lập trình hướng đối tượng đôi khi cần thiết có tham số đầu ra. Tuy nhiên, phần lớn các tham số đầu ra biến mất dần, bởi vì this như một dụng ý hành động như một tham số đầu ra. Nói cách khác nó sẽ là tốt hơn khi gọi appendFooter là:
```java
report.appendFooter();
```
*Nói chung, nên tránh tham số đầu ra.*
# 8. Command Query Separation (Tách lệnh truy vấn)
Hàm nên thực hiện hoặc làm một điều gì đó hoặc trả lời một cái gì đó, nhưng không bao gồm cả hai. Hàm của bạn nên thay đổi trạng thái của đối tượng hoặc trả về thông tin của một đối tượng. Làm cả hai sẽ dẫn đến sự nhầm lẫn.

Ví dụ:
```java
public boolean set(String attribute, String value);
```
Hàm này đặt giá trị của một thuộc tính và trả về true nếu thành công, và false nếu thuộc tính không tồn tại.
```java
if (set("username", "unclebob"))...
```
Vấn đề: Không biết set này dùng theo cách
- Nếu "username" đã tồn tại giá trị "unclebob" trước chưa
- Set thuộc tính "username" với giá trị "unclebob"...

=> Gây nhầm lẫn

Giải quyết vấn đề bằng cách đặt lại tên và phân tách các câu lệnh truy vấn để sự mơ hồ không xảy ra:
```java
if (attributeExists("username")) {
   setAttribute("username", "unclebob");
   ...
}
```
# 9. Prefer Exceptions to Returning Error Codes
Trả về các đoạn code báo lỗi ở trong các câu lệnh của hàm là một vi phạm tinh tế của tách câu lệnh truy vấn. Nó đẩy mạnh các lệnh sử dụng như biểu thức trong các vị từ của câu lệnh **if**.
```java
if (deletePage(page) == E_OK) {
   if (registry.deleteReference(page.name) == E_OK) {
      if (configKeys.deleteKey(page.name.makeKey()) == E_OK){
         logger.log("page deleted");
      } else {
         logger.log("configKey not deleted");
      }
   } else {
      logger.log("deleteReference from registry failed");
   }
} else {
   logger.log("delete failed");
   return E_ERROR;

}
```
Điều này không bị nhầm lẫn giữa các động từ/tính từ nhưng cũng dẫn đến các cấu trúc lồng nhau. Khi tạo ra các mã lỗi, bạn tạo ra vấn đề mà người gọi phải đối phó ngay lập tức.

Mặt khác, nếu bạn sử dụng sự ngoại lệ để thay thế một đoạn code lỗi, sau đó lỗi xử lý code được tách ra, không ảnh hưởng tới những vấn đề khác.
```java
try {
   deletePage(page);
   registry.deleteReference(page.name);
   configKeys.deleteKey(page.name.makeKey());
}
catch (Exception e) {
   logger.log(e.getMessage());
}
```
* **Extract Try/Catch Blocks**

    Tách các khối xử lý Try/Catch ra khỏi các thành phần chức năng riêng của chính nó.

    ```java
    public void delete(Page page) {
       try {
          deletePageAndAllReferences(page);
       }
       catch (Exception e) {
          logError(e);
       }
    }
    private void deletePageAndAllReferences(Page page) throws Exception {
       deletePage(page);
       registry.deleteReference(page.name);
       configKeys.deleteKey(page.name.makeKey());
    }
    private void logError(Exception e) {
       logger.log(e.getMessage());
    }
    ```

* **Error Handling Is One Thing**

    Function nên làm một việc (do one thing). Xử lý lỗi là một việc (one thing). Vậy nên một chức năng xử lý lỗi không nên làm bất cứ thứ gì nữa.
* **The Error.java Dependency Magnet**

    Một class hoặc Enum chứa tất cả định nghĩa các lỗi. Class đó như một nam châm phụ thuộc; nhiều class khác phải nhập vào và sử dụng nó. Vậy nên khi danh sách lỗi thay đổi thì tất cả những class khác đều phải được biên dịch và bố trí lại. Lập trình viên không muốn điều đó xảy ra nên sử dụng lại các Code lỗi cũ thay vì thêm mới.

    Khi sử dụng các exception hơn là các error code, việc thêm một ngoại lệ mới là dẫn xuất của lớp exception nên chúng có thể được thêm vào mà không cần phải biên dịch hay bố trí lại.
# 10. Don't Repeat Yourself
Sự trùng lặp là một vấn đề vì nó thổi phồng mã lên và sẽ phải yêu cầu thay đổi nhiều lần nếu thuật toán có sự thay đổi. Nó cũng cấp số nhân nhiều lần cho một lỗi thiếu sót nào đó.

*Mục tiêu là giảm thiểu sự trùng lặp.*

Trùng lặp có thể là gốc rễ mọi tội lỗi ở trong phần mềm. Nhiều nguyên tắc và thông lệ được tạo ra nhằm kiếm soát và hạn chế sự trùng lặp đó. Lập trình hướng đối tượng, lập trình cấu trúc,...
# 11. Structured Programming
Nguyên tắc Dijkstra trong lập trình cấu trúc: Mọi Function và mọi block ở trong function nên có một đầu vào và một đầu ra. Điều đó có nghĩa là chỉ nên có một statement trả về trong hàm, không có break hay continue trong một vòng lặp, và không bao giờ có ever hay bất cứ phát biểu goto nào.

Nó mang lại lợi ích rất ít khi hàm chức năng rất nhỏ. Chỉ khi hàm chức năng lớn hơn theo nguyên tắc này mới mang lại lợi ích đáng kể.

Vì vậy nến bạn giữ cho hàm của bạn nhỏ, sau đó thêm các phát biểu return, break, hay continue không gây tổn hại gì, đôi khi còn mang lại ý nghĩa hơn là tuân theo nguyên tắc một đầu vào, một đầu ra. Mặt khác, goto chỉ nên sử dụng khi các hàm lớn, nên không khuyến khích sử dụng.
# 12. How  Do You Write Functions Like This?
Viết phần mềm cũng như viết bất cứ một văn bản nào khác. Khi bạn viết một bài văn hay một bài báo, bạn sẽ có những ý tưởng đầu tiên, sau đó bạn uốn nắn nó để có thể đọc được tốt hơn. Phác thảo đầu tiên có thể vụng về và thiếu tổ chức, nhưng bạn có thể rèn câu cú, tái cấu trúc và sàng lọc lại cho đến khi nó  đọc được theo cách bạn muốn.

Khi viết một hàm, nó bắt đầu rất dài và phức tạp. Nó có nhiều vết lõm và vòng lặp lồng nhau. Nó có một danh sách dài các tham số. Tên thì tùy tiện và có code trùng lặp. Nhưng cũng có một bộ Unit Test bao gộp những dòng code vụng về đó.

Vì vậy, uốn nắn và sàng lọc lại code, phân chia các chức năng, thay đổi tên, loại bỏ sự trùng lặp. Co rút các phương pháp và sắp xếp nó lại. Đôi khi bùng nổ các class nhưng sau tất cả vẫn giữ cho test passing.
# 13. Conclusion
Functions là động từ, Classes là danh từ. Nghệ thuật của lập trình là nghệ thuật của ngôn ngữ thiết kế.

Các lập trình viên bậc thầy nghĩ rằng các hệ thống như một câu chuyện để kể chứ không phải là một chương trình để viết.
# 14. Setup TeardownIncluder
```java
package fitnesse.html;

import fitnesse.responders.run.SuiteResponder;
import fitnesse.wiki.*;

public class SetupTeardownIncluder {
   private PageData pageData;
   private boolean isSuite;
   private WikiPage testPage;
   private StringBuffer newPageContent;
   private PageCrawler pageCrawler;

   public static String render(PageData pageData) throws Exception {
      return render(pageData, false);
   }

   public static String render(PageData pageData, boolean isSuite)
   throws Exception {
      return new SetupTeardownIncluder(pageData).render(isSuite);
   }

   private SetupTeardownIncluder(PageData pageData) {
      this.pageData = pageData;
      testPage = pageData.getWikiPage();
      pageCrawler = testPage.getPageCrawler();
      newPageContent = new StringBuffer();
   }

   private String render(boolean isSuite) throws Exception {
      this.isSuite = isSuite;
      if (isTestPage())
         includeSetupAndTeardownPages();
      return pageData.getHtml();
   }

   private boolean isTestPage() throws Exception {
      return pageData.hasAttribute("Test");
   }

   private void includeSetupAndTeardownPages() throws Exception {
      includeSetupPages();
      includePageContent();
      includeTeardownPages();
      updatePageContent();
   }

   private void includeSetupPages() throws Exception {
      if (isSuite)
         includeSuiteSetupPage();
      includeSetupPage();
   }

   private void includeSuiteSetupPage() throws Exception {
      include(SuiteResponder.SUITE_SETUP_NAME, "-setup");
   }

   private void includeSetupPage() throws Exception {
      include("SetUp", "-setup");
   }

   private void includePageContent() throws Exception {
      newPageContent.append(pageData.getContent());
   }

   private void includeTeardownPages() throws Exception {
      includeTeardownPage();
      if (isSuite)
      includeSuiteTeardownPage();
   }

   private void includeTeardownPage() throws Exception {
      include("TearDown", "-teardown");
   }

   private void includeSuiteTeardownPage() throws Exception {
      include(SuiteResponder.SUITE_TEARDOWN_NAME, "-teardown");
   }

   private void updatePageContent() throws Exception {
      pageData.setContent(newPageContent.toString());
   }

   private void include(String pageName, String arg) throws Exception {
      WikiPage inheritedPage = findInheritedPage(pageName);
      if (inheritedPage != null) {
         String pagePathName = getPathNameForPage(inheritedPage);
         buildIncludeDirective(pagePathName, arg);
      }
   }

   private WikiPage findInheritedPage(String pageName) throws Exception {
      return PageCrawlerImpl.getInheritedPage(pageName, testPage);
   }

   private String getPathNameForPage(WikiPage page) throws Exception {
      WikiPagePath pagePath = pageCrawler.getFullPath(page);
      return PathParser.render(pagePath);
   }

   private void buildIncludeDirective(String pagePathName, String arg) {
      newPageContent
         .append("\n!include ")
         .append(arg)
         .append(" .")
         .append(pagePathName)
         .append("\n");
       }
   }

```