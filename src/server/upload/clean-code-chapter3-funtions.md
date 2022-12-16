Trong những ngày đầu của lập trình, chúng ta biên soạn hệ thống của chúng ta bằng chương trình (routines - thủ tục, hàm, chương trình con) và những chương trình con (subroutines). Sau đó là thời đại của Fortran và PL/1 hệ thống của chúng ta bao gồm những chương trình (programs), chương trình con (subprograms), và chức năng (functions). Đến nay chỉ có chức năng là tồn tại được từ những ngày đầu tiên. Chức năng là đơn vị đầu tiên tổ chức nên bất cứ chương trình nào. Rất khó để hiểu một hàm chức năng dài với nhiều mức trừu tượng khác nhau, các lệnh if lồng nhau, các chuỗi xa lạ và những chức năng lẻ khác được gọi. Tuy nhiên, chỉ với một vài phương pháp rút gọn đơn giản, thay đổi một số tên, và tái cấu trúc lại một ít, là có thể nắm được đường cơ bản chính ở trong chức năng.
# Small!
Nguyên tắc đầu tiên của functions là chúng cần phải nhỏ. Nguyên tắc thứ hai là chúng cần phải nhỏ hơn nữa.

Đó không phải là một lời khẳng định mà tác giả có thể chứng minh. Không có bất cứ liên hệ với các nghiên cứu nào cho thấy function nhỏ thì sẽ tốt hơn. Những gì có thể nói cho bạn đó là trong gần bốn thập kỷ, những kinh nghiệm về viết các function với những kích thước khác nhau cho thấy, có một sự khó chịu gớm ghiếc với function 3000 dòng, function với 100-300 dòng. Và cuối cùng là những function với 20-30 dòng. Kinh nghiệm từ những sai lầm đã chỉ ra, function nên được viết rất nhỏ(very small).

Function không nên dài quá 20 dòng và một dòng không nên quá 150 ký tự (không vượt quá màn hình 100-120 ký tự).
```
public static String renderPageWithSetupsAndTeardowns(
   PageData pageData, boolean isSuite) throws Exception {
   if (isTestPage(pageData))
      includeSetupAndTeardownPages(pageData, isSuite);
   return pageData.getHtml();
}
```
### Blocks and Indenting
Những khối câu lệnh if, else, while nên được chứa trong một dòng, và những dòng này nên được đặt thành một lời gọi hàm. Điều này không chỉ giữ cho function nhỏ mà còn cho biết thêm thông tin cụ thể về việc nó đang làm bằng một cái tên mô tả độc đáo.
Điều này cũng có nghĩa là các function không nên có những cấu trúc lồng nhau. Vì thế, mức thụt lề của function nên chỉ ở mức một hoặc hai. Tất nhiên, nó sẽ làm cho function dễ đọc và dễ hiểu hơn.
# Do One Thing
Function chỉ nên thực hiện một thứ. Nó nên thực hiện điều đó cho tốt. Nó nên thực hiện một điều duy nhất.

Vấn đề đặt ra ở đây là, thật khó để biết được "một thứ" (one thing) đó là gì?

Nên phân biệt rõ one thing với multi steps. Một function không chỉ là gồm một bước mà bao gồm nhiều công đoạn. Mỗi bước có thể lại là một function, mục tiêu là để phân rã một khái niệm lớn, nói cách khác tên của function là tập hợp các bước ở một mức độ tiếp theo của tính trừu tượng.

Thực hiện một điều bằng cách chia thành nhiều phần.

# One Level of Abstraction per Function
Để đảm bảo chắc chắn rằng function của chúng ta đang thực hiện một điều duy nhất cần đảm bảo rằng các câu lệnh ở trong function đều ở cùng một mức độ trừu tượng.

Trộn lẫn các mức độ trừu tượng ở trong function luôn làm cho nó khó hiểu. Người đọc có thể không biết được biểu hiện cụ thể của một chi tiết hay khái niệm quan trọng. Tồi tệ hơn, như một cửa sổ bị phá vỡ, các chi tiết trộn lẫn với khái niệm quan trọng, và nó lớn dần lên bên trong hàm.

### Reading Code from Top to Bottom: The Stepdown Rule
Chúng ta muốn đọc Code như một câu chuyện từ trên xuống. Mỗi function sắp xếp đều được tuân theo theo mức độ của sự trừu tượng từ trên xuống. Giảm dần mức độ trừu tượng khi chúng ta đọc từ trên xuống.Gọi là Nguyên tắc Stepdown.
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
```
Rất khó khăn để các lập trình viên học và viết Function ở một mức đơn cấp trừu tượng. Nhưng học thủ thuật này rất quan trọng. Nó giữ cho Function ngắn và luôn thỏa mãn "one thing".

# Use Descriptive Names
Sử dụng tên mô tả những gì function làm.

Đừng ngại bởi vì nó là một cái tên dài. Tên mô tả dài tốt hơn là một tên ngắn bí ẩn. Tên mô tả dài tốt hơn là một đoạn bình luận mô tả. Sử dụng một quy tắc đặt tên là dùng những từ ngữ dể đọc để làm tên hàm và dùng những từ khóa để mô tả chức năng của nó làm gì.

Sử dụng tên mô tả sẽ làm rõ việc thiết kế các module trong tâm trí bạn và giúp bạn cải thiện nó.

# Function Arguments
Số lượng những tham số lý tưởng trong hàm là 0 (niladic), tiếp đến là 1 (monadic), theo sau là 2 (dyadic). Ba (triadic) tham số thì nên tránh nếu có thể. Nhiều hơn ba (polyadic) đòi hỏi phải có một sự lý giải rất đặc biệt và không nên sử dụng thế nào cũng được.

Tham số thậm chí còn khó khăn hơn khi đứng ở góc độ kiểm thử. Tưởng tượng rằng viết test case sẽ khó khăn thế nào khi phải đảm bảo tất cả tổ hợp các tham số đều hoạt động đúng. Nếu không có tham số, điều này là bình thường. Nếu có một tham số nó cũng không quá khó. Nếu hai tham số thì vấn đề trở nên khó khăn hơn một chút. Với nhiều hơn hai tham số, điều này quả thực là cả một vấn đề.

Tham số đầu ra khó để hiểu hơn là tham số đầu vào. Khi chúng ta đọc một hàm, chúng ta sử dụng ý tưởng về thông tin đầu vào qua các tham số, và giá trị trả về ở đầu ra. Không mong đợi thông tin trả về lại thông qua một tham số. Nên tham số đầu ra thường khiến chúng ta phải lấy hai lần (double-take).

### Triads
Những hàm phải đưa ra tới 3 đối số càng khó để hiểu hơn là hai. Khuyên bạn nên thực sự cẩn thận khi đưa ra một hàm với một bộ 3 tham số.
(Overload khi đợi các tham số)
Tuy nhiên đôi khi cũng cần phải sử dụng. Ví dụ: assertEquals (1.0, amount, .001)
### Argument Objects
Khi một số hàm thực sự cần nhiều hơn 2 hay 3 tham số, có khả năng là một số trong những tham số đó có thể gói gọn trong một lớp của riêng chúng:
```
Circle makeCircle(double x, double y, double radius);
Circle makeCircle(Point center, double radius);
```
### Argument Lists
Đôi khi chúng ta muốn vượt qua số lượng biến số của tham số vào một hàm.
```
String.format("%s worked %.2f hours.", name, hours);
```
Nếu các tham số đều được đối xử tương tự nhau, có thể gộp chung lại thành một tham số đơn kiểu List.

### Verbs and Keywords
Trong trường hợp là một monad function, hàm và tham số nên tạo thành một động từ hoặc một cặp danh từ đẹp.

Điều cuối cùng là dạng từ khóa của tên hàm. Sử dụng hình thức này chúng ta mã hóa tên các tham số vào tên hàm. Ví dụ: assertEquals có thể được viết tốt hơn là assertExpectedEqualsActual(expected, actual), điều này giảm nhẹ vấn đề phải nhớ thứ tự các tham số.

# Kết luận
Functions là động từ, Classes là danh từ. Nghệ thuật của lập trình là nghệ thuật của ngôn ngữ thiết kế.
Các lập trình viên bậc thầy nghĩ rằng các hệ thống như một câu chuyện để kể chứ không phải là một chương trình để viết.