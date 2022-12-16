# Use Intention-Revealing Names (Sử dụng tên bộc lộ mục đích)
Có thể nói đơn giản là bộc lộ ý nghĩa qua tên gọi. Chọn một cái tên cần thời gian nhưng để nhớ nó còn tốn thời gian hơn nữa. Lưu tâm đến những cái tên bạn chọn và thay đổi chúng nếu bạn tìm thấy một thay thế tốt hơn.

Tên là câu trả lời cho một câu hỏi lớn. Nó sẽ nói cho bạn biết tại sao nó tồn tại, nó dùng để làm gì, và nó sử dụng ra sao.

Chọn tên để làm cho nó dễ dàng hơn trong việc hiểu và thay đổi Code.
Example:

```
public List<int[]> getThem() {
   List<int[]> list1 = new ArrayList<int[]>();
      for (int[] x : theList)
         if (x[0] == 4)
            list1.add(x);
   return list1;
}
```

1. What kinds of things are in theList?
2. What is the significance of the zeroth subscript of an item in theList?
3. What is the significance of the value 4?
4. How would I use the list being returned?

```
public List<int[]> getFlaggedCells() {
   List<int[]> flaggedCells = new ArrayList<int[]>();
      for (int[] cell : gameBoard)
         if (cell[STATUS_VALUE] == FLAGGED)
            flaggedCells.add(cell);
   return flaggedCells;
}
```

```
public List<Cell> getFlaggedCells() {
   List<Cell> flaggedCells = new ArrayList<Cell>();
      for (Cell cell : gameBoard)
         if (cell.isFlagged())
            flaggedCells.add(cell);
   return flaggedCells;
}
```
# Avoid Disinformation (Tránh sai lệch thông tin)
Tránh đặt những gợi ý sai lầm làm lu mờ ý nghĩa thực sự của Code. Ví dụ như viết tắt từ này có thể hiểu nhầm sang nghĩa khác.

Ví dụ: Đừng quy một nhóm tài khoản thành accountList nếu nó không thực sự là một danh sách, vì có thể làm hiểu sai ý nghĩa. Nên thay bằng accountGroup, bunchOfAccount hay chỉ đơn giản là accounts.

Cẩn thận với tên có một sự thay đổi nhỏ. Mất bao lâu để nhận ra sự khác biệt giữa:
XYZControllerForEfficientHandlingOfStrings và XYZControllerForEfficientStorageOfStrings?
Chúng có hình dạng giống nhau đến khủng khiếp.

Sử dụng cách viết tương tự với khái niệm là Information, cách viết không nhất quán là Disinformation.

Ví dụ khủng khiếp khác là sử dụng tên ở mức thấp: l(L) hoặc O(o), dễ gây nhầm lẫn với số 1 và 0.

# Make Meaningful Distinctions (Làm cho sự riêng biệt trở nên rõ ràng)
Lập trình viên tự tạo vấn đề cho chính họ khi viết ra code chỉ để thỏa mãn trình biên dịch hoặc một trình thông dịch chạy. Ví dụ: Bởi vì bạn không thể tạo cùng một tên để tham khảo đến 2 điều khác nhau trong cùng một phạm vi, bạn có thể bị cám dỗ để thay đổi một tên cho phù hợp một cách tùy tiện. Đôi khi điều này được thực hiện bởi một lỗi chính tả, dẫn đến khu vực sửa lỗi chính tả và làm trình biên dịch không thể biên dịch.
Nếu phải đặt một tên khác, nên lựa chọn tên dựa vào sự khác nhau giữa 2 điều đó.

Number-Series (a1, a2,... aN) nó mâu thuẫn với việc đặt tên có mục đích. Tên không cung cấp thông tin, không cung cấp ý định của người viết.

```
public static void copyChars(char a1[], char a2[]) {
   for (int i = 0; i < a1.length; i++) {
      a2[i] = a1[i];
   }
}
```

Hàm này sẽ dễ đọc hơn khi sử dụng biến source và destination như tham số truyền vào.

Noise work cũng là một sự riêng biệt vô nghĩa. Giả sử bạn có một class Product. Nếu bạn gọi hàm ProductInfo hoặc ProductData, bạn đã thực hiện thay đổi tên gọi khác nhau nhưng  Data và Info là những noise work không rõ ràng như a, an và the. Không có gì sai khi sử dụng những noise work nếu họ đảm bảo làm cho sự riêng biệt có ý nghĩa nhưng cũng có vấn đề khi sử dụng nó.

Noise work là một sự dư thừa. Một biến không bao giờ có tên variable. Từ table không nên xuất hiện trong tên bảng. Tên NameString tốt hơn Name ở chỗ nào?

Cái tên khác biệt trong trường hợp này giúp bạn biết được sự khác biệt được đưa ra.
# Use Pronounceable Names (Sử dụng tên đọc được)
Một phần quan trọng của bộ não chúng ta dành riêng cho khái niệm của từ ngữ. Những từ ngữ này sẽ được định nghĩa, và phát âm.

```
class DtaRcrd102 {
   private Date genymdhms;
   private Date modymdhms;
   private final String pszqint = "102";
   /* ... */
};

class Customer {
   private Date generationTimestamp;
   private Date modificationTimestamp;;
   private final String recordId = "102";
   /* ... */
};
```

Rõ ràng, đoạn mã được phiên âm rõ ràng thì người sử dụng sẽ dễ dàng hiểu được vấn đề hơn.
Use Searchable Names (Sử dụng tên tìm kiếm được)
Tên biến và tên hằng có một vấn đề là không dễ dàng gì để xác định được vị trí của chúng. Nếu biến và hằng được sử dụng nhiều nơi trong đoạn mã thì nên đặt tên để tìm kiếm thân thiện hơn.

```
for (int j=0; j<34; j++) {
   s += (t[j]*4)/5;
}

int realDaysPerIdealDay = 4;

const int WORK_DAYS_PER_WEEK = 5;

int sum = 0;

for (int j=0; j < NUMBER_OF_TASKS; j++) {

   int realTaskDays = taskEstimate[j] * realDaysPerIdealDay;

   int realTaskWeeks = (realdays / WORK_DAYS_PER_WEEK);

   sum += realTaskWeeks;
}
```

Biến sum không phải một tên riêng việt có nghĩa nhưng nó dễ dàng tìm kiếm.
# Avoid Encodings
Bảng mã hóa hiện tại đã đủ dùng vì vậy không cần bổ sung thêm vào. Việc thêm mã hóa lạ vào tên đơn giản làm tăng gắng nặng cho việc giải mã. Điều đó là không hợp lý khi yêu cầu nhân viên mới đọc hiểu những mã hóa lạ thêm vào trong khi những mã hóa có sẵn đã đủ dùng.
### Hungarian Notation:
Ngày xửa ngày xưa, khi chúng ta làm việc với ngôn ngữ name-length-challenged, chúng ta đã vi phạm những quy tắc cần thiết. Fortran buộc phải mã hóa bằng cách thao tác với những chữ cái đầu tiên. Phiên bản đầu tiên của BASIC chỉ cho phép một ký tự với một chữ số. Hungarian Notation đã lên một tầm cao mới. 

Trong ngôn ngữ lập trình hiện đại, các kiểu dữ liệu phong phú hơn, các trình biên dịch nhớ và thực thi được nhiều loại hơn. Hơn nữa xu hướng bây giờ các lớp nhỏ hơn, các hàm ngắn hơn nên mọi người thường có thể thấy điểm khai báo của mỗi biến mà họ đang sử dụng.
### Member Prefixes (Thành phần tiền tố)
Bạn không cần phải đặt tên với tiền tố m_ ở mọi nơi. Các lớp và hàm đủ nhỏ để không phải sử dụng đến các tiền tố đó. Bạn nên dùng editing environment để đánh dấu hoặc bôi đậm các lớp hoặc các hàm để phân biệt chúng.

```
public class Part {
   private String m_dsc; // The textual description
   void setName(String name) {
      m_dsc = name;
   }
}
_________________________________________________
public class Part {
   String description;
   void setDescription(String description) {
      this.description = description;
   }
}
```

Bên cạnh đó mọi người còn bỏ qua các tiền tố hoặc hậu tố để tên có ý nghĩa hơn.
### Interfaces and Implementations
Đôi khi có trường hợp đặc biệt cần đến mã hóa. Ví dụ xây dựng một Abstract Factory, Factory được tạo ra dưới dạng một Interface và được thực thi bởi một class cụ thể. (Class : Interface) Có thể đặt tên như thế nào? IShapeFactory hay ShapeFactory? Thích lựa chọn AbcFactory hơn bởi vì khi đặt I ở trước có nhiều sự phân tán và thông tin không tốt. Không muốn khách hàng biết đang bàn giao cho họ một Interface, chỉ muốn họ biết rằng đó là một AbcFactory. Do đó nếu chọn mã hóa implementation hay interface chọn implementation. Gọi nó là ShapeFactoryImp hoặc CShapeFactory, nó thích đáng hơn là mã hóa interface
# Avoid Mental Mapping (Tránh ánh xạ tinh thần)
Chắc chắn bộ đếm vòng lặp có thể được đặt tên là i, j, k (không bao giờ là l) nếu phạm vi của nó nhỏ và không có tên nào xung đột với nó. Bởi vì tên single-letter này là cho vòng lặp truyền thống. Tuy nhiên trong hầu hết những trường hợp khác nó là một sự lựa chọn nghèo nàn, nó khiến cho người đọc phải ánh xạ tinh thần tới một khái niệm thực tế.

"Lập trình viên nói chung là những người khá thông minh. Những người thông minh đôi khi thích thể hiện sự thông minh của mình bằng cách chứng minh khả năng tung hứng tinh thần của họ. Sau khi tất cả, nếu bạn đáng tin cậy có thể nhớ r đó là phiên bản thường của các url với các máy chủ và chương trình gỡ bỏ, sau đó bạn phải rõ ràng rất thông minh."

Sự khác nhau giữa lập trình viên thông minh và lập trình viên chuyên nghiệp đó là lập trình viên chuyên nghiệp hiểu được "Sự rõ ràng chính là vua". Lập trình viên chuyên nghiệp dùng năng lực của họ để viết Code làm cho người khác có thể hiểu được.
# Class Names
Tên Classes và Objects nên là danh từ hoặc cụm danh từ. Tránh những từ như Manager, Processor, Data, or Info làm tên một class. Tên class cũng tránh là một động từ.
# Method Names
Tên của Method nên là một động từ hoặc cụm động từ. Các phương thức truy xuất, thay đổi nên được đặt tên với giá trị của chúng và tiền tố như get, set, is.

```
string name = employee.getName();
customer.setName("mike");
if (paycheck.isPosted())...
```

Khi Constructors overload, sử dụng static factory method cùng với tên và đối số.

`Complex fulcrumPoint = Complex.FromRealNumber(23.0);`

tốt hơn là:

`Complex fulcrumPoint = new Complex(23.0);`

# Don't Be Cute (Đừng tỏ ra dễ thương)
Lựa chọn những cái tên rõ ràng hơn là một cái tên tỏ ra hóm hỉnh hoặc cố tỏ ra thông minh và nguy hiểm (Ngu thì đừng tỏ ra nguy hiểm). Một lựa chọn tường minh thường tốt hơn là một giá trị mang tính chất giải trí.

Say what you mean (Hãy nói những gì bạn thấy có ý nghĩa). Mean what you say. 

# Pick One Word per Concept (Chọn một từ cho mỗi khái niệm)
Chọn một từ cho một khái niệm trừu tượng và gắn nó vào. Ví dụ, khá là khó để nhớ được các method tương đương ở trong các class khác nhau như fetch, retrieve, và get. Bạn có thể nhớ được những tên nào đã được sử dụng, nếu không sẽ mất khá nhiều thời gian cho việc tìm kiếm.

Các IDE hiện đại hỗ trợ chức năng tìm kiếm và thêm các tham số cần thiết khi khai báo Function. Tên chức năng phải đứng một mình, và nó phải phù hợp để các bạn đúng phương pháp mà không thăm dò bổ sung.

Một thuật ngữ nhất quán đem lại lợi ích rất lớn cho những ai sử dụng mã nguồn của bạn.
# Don't Pun (Không chơi chữ)
Không sử dụng một từ cho hai mục đích. Sử dụng một thuật ngữ cho hai ý tưởng khác nhau đơn giản đó chỉ là một trò chơi chữ.

Nếu bạn tuân thủ quy tắc "một từ một khái niệm", bạn có thể sử dụng nó cho nhiều class. Tuy nhiên cần cân nhắc khi vì lý do nhất quán nhưng phương thức bạn sử dụng lại không có cùng nghĩa. Ví dụ, phương thức add không quan trọng giá trị trả về hay tham số truyền vào như nào, nó là tương đương. Tuy nhiên cần cân nhắc sử dụng phương thức add bạn định thêm vào không cùng ngữ nghĩa, có thể hiểu nhầm sang insert hoặc append. Giả sử chúng ta có nhiều classes với phương thức add, sẽ tạo một giá trị mới bằng cách thêm vào hoặc nối 2 giá trị có sẵn. Bây giờ chúng ta tạo một class mới với phương thức đặt một tham số vào một tập hợp. Lúc này không thể đặt tên phương thức là add nữa vì nó đã không còn  phù hợp. trong trường hợp này chúng ta dùng insert hoặc append thì phù hợp hơn. Đặt tên phương thức là add lúc này một trò chơi chữ.
# Use Solution Domain Names (Dùng tên của miền giải pháp)
Hãy nhớ rằng người đọc Code của bạn cũng là những lập trình viên. Vì vậy nên dùng những từ ngữ khoa học máy tính, toán học, thuật toán, các tên kiểu mẫu,... Sẽ không là khôn ngoan nếu thay thế tên miền bằng một tên khác để những lập trình viên khác phải vào lại yêu cầu của khách hàng để xem chi tiết trong khi thực sự thì họ đã biết điều đó.
# Use Problem Domain Names (Dùng tên của miền nghiệp vụ)
Khi làm việc với những thứ không phải của lập trình viên, hãy sử dụng tên nghiệp vụ. Ít nhất người bảo trì cũng nắm rõ được nghiệp vụ thông qua ý nghĩa của nó. Tách solution và problem là một phần công việc của lập trình viên và thiết kế tốt. Mã mà cần quan tâm thới những khái niệm nghiệp vụ nên mang tên nghiệp vụ.
# Add Meaningful Context (Thêm bối cảnh có ý nghĩa)
Có rất ít tên mà tự thân nó không có nghĩa, hầu như là không. Với những tên này, phải đặt tên vào bối cảnh của người đọc và đặt nó vào tên class, function, namespace. Khi thất bại, có thể đặt thêm tiền tố cần thiết như một lựa chọn cuối cùng.

Hãy tưởng tượng bạn có các biến với tên như sau: firstName, lastName, street, houseNumber, city, state và zipcode. Đặt chúng cạnh nhau thì rất rõ là sẽ tạo thành một địa chỉ. Nhưng biến state có nghĩa gì nếu bạn thấy nó một mình trong một phương thức? Liệu bạn có hiểu ngay đó là một phần của một địa chỉ?

Bạn có thể thêm bối cảnh bằng cách sử dụng tiền tốt: addrFirstName, addrLastName, adddrState, v.v. Ít nhất người đọc sẽ hiểu rằng những biến này là phần của một cấu trúc lớn hơn. Dĩ nhiên, giải pháp tốt hơn là tạo một lớp có tên là Address. Lúc đó thì thậm chí trình biên dịch cũng biết là những biến này thuộc một câu trúc lớn hơn.
# Don't Add Gratuitous Context (Đừng thêm những bối cảnh vô căn cứ)
Tên ngắn sẽ tốt hơn là tên dài nếu chúng rõ ràng. Việc không thêm bối cảnh vào tên là cần thiết.