Bạn là lập trình viên, những ngày bắt đầu thật sự nhẹ nhàng, bạn tìm đến với `C` làm quen với `structured programming` (một ngôn ngữ hướng thủ tục). Sau đó, bạn làm quen với `OOP` (hướng đối tượng) hoặc cũng có thể đến với `functional programming`, `imperactive programming`... Những lúc gặp vấn đề, các anh có kinh nghiệm lại bảo tìm hiểu thêm về `design pattern`, bạn hào hứng tìm hiểu, áp dụng chúng vào dự án, giải quyết những vấn đề thú vị. Nhưng sau cùng, bạn nhận ra nó không phải là thứ đủ lớn để có thể xây dựng nên kiến trúc cho một dự án. Rồi bạn lại nghĩ về việc tạo `base structure` cho các dự án bằng các `architecture`, bạn tìm đến `MVC`, `MVP`, `MVVM` ... hoặc to hơn là `onion architecture`, `hexagonal architecture` và gần đây là `clean architecture`.

Mọi thứ có vẻ thật mông lung, một ngày bạn chợt nhận ra là `programming vocabulary` thật rộng lớn và cũng đáng để tìm hiểu :) 

Hãy cùng dừng *code* một tý để lướt qua chi tiết một vài định nghĩa.
## Programming paradigms
*Programming paradigms*  (mô hình lập trình) là cách phân loại ngôn ngữ lập trình dựa vào các tính năng, đặc trưng (đặc điểm) của chúng. Nó là một kiểu lập trình cơ bản của lập trình máy tính, không được quyết định bởi các phương pháp quản lý dự án. 

Các *paradigm* khác nhau trong các khái niệm và sự trừu tượng hóa được sử dụng để biểu diễn các phần tử trong chương trình (ví dụ *object, functions, variable, constraint*...) và các bước bao gồm tính toán (như *assignation, evaluation, continuation, data flow*...). 

Một vài *paradigm*:
* Imperactive
    * Object-oriented: Java, Smalltalk, PHP
    * Procedural COBOL, FORTRAN, C
*	Declarative 
	* Functional
	* Logical 
*	Symbolic

...

Không có *paradigm* chính nào có định nghĩa chính xác, cũng như được *official* thành tiêu chuẩn quốc tế, cũng không có thỏa thuận nào về *paradigm* tốt nhất để phát triển phần mềm. 

Các ngôn ngữ cung cấp các *paradigm* (đặc điểm, tính năng) cho phép ta ứng dụng để thực hiện một vấn đề nào đó, nhưng không bao giờ quy định cụ thể nó là gì và cú pháp ra sao. Chẳng hạn *paradigm* cho ngôn ngữ hướng đối tượng nêu lên các khái niệm về đóng gói (*encapsulation*). `Java` quy định sẽ dùng các `access modifier` như *public*, *protected*, *private*... `C#` lại dùng *property* để tăng tính đóng gói, `Python` lại chỉ dùng quy ước *method* bắt đầu với `_` là *private*... Hiểu một *paradigm*, không chỉ giúp bạn khi sử dụng một ngôn ngữ hỗ trợ nó, mà có thể áp dụng cho nhiều ngôn ngữ khác.

Một ngôn ngữ lập trình có thể hỗ trợ nhiều *paradigm*. Ví dụ `C++` hoặc `Object Pascal` có thể là thủ tục hoặc hướng đối tượng hoặc cả hai.

 *Software designer* hoặc *programmer* sẽ quyết định cách sử dụng các yếu tố của *paradigm* nào đó sao cho phù hợp với tình huống sử dụng. Có lẽ vì thế các nhóm khác nhau trong công nghệ phần mềm sẽ ủng hộ các phương thức khác nhau, các ngôn ngữ khác nhau sẽ ủng hộ các *paradigm* khác nhau. 

Ex: 

`Smalltalk` chỉ hỗ trợ *OOP*

`Haskell` chỉ hỗ trợ *Procedural*

`C++, C#, Ruby, Python`... hỗ trợ nhiều hơn 1 *paradigm*

## Programming idiom
*Programming idiom* hay *code idiom* thể hiện một tính năng đặc biệt của cấu trúc lặp lại trong một hoặc nhiều ngôn ngữ lập trình. *Developer* nhận ra các *idiom* bằng cách liên kết và đưa ra ý nghĩa cho một hoặc nhiều đoạn *code*. 

*Idiom* có thể được xem là một khái niệm bên dưới của một *Pattern* (mẫu) trong *code*, được biểu diễn trong việc triển khai bằng những đoạn *code* liền kề hoặc phân tán. Những mảnh này có sẵn trong một số ngôn ngữ, *framework* hoặc *library*.

Ex: 

1. *Printing Hello World*
```
C++ code:     cout << "Hello, World!";
Java code:    System.out.println("Hello, World!");
```
2. *Insert element in an array*

*Idiom* này giúp *dev* hiểu được làm thế nào thao tác với *array list* trong một ngôn ngữ cho trước, thêm *element* `x` vào vị trí `i` của list `s`
```
Python code:      s.insert(i, x)
JavaScript code:  s.splice(i, 0, x)
```
Biết được các *idiom* liên kết với một ngôn ngữ và cách sử dụng chúng là một phần quan trọng để đạt được sự lưu loát trong ngôn ngữ đó và chuyển giao kiến thức theo dạng tương tự từ một ngôn ngữ hoặc *framework* này sang ngôn ngữ hay *framework* khác.

> Tham khảo thêm các *Programming Idiom* [tại đây](https://www.programming-idioms.org)

## Design Pattern
*Pattern* là những mẫu phổ biến chung mà bạn tìm thấy trong các chương trình. Nó cho phép chúng ta xây dựng một cấu trúc phức tạp bằng cách sử dụng những phần đơn giản. Nó cung cấp một giải pháp chung cho một lớp các vấn đề. VD: *Quick sort, merge sort* là những *algorithmic pattern* (mẫu giải thuật) cho việc sắp xếp theo thứ tự một tập các phần tử...

*Design Pattern* ở mức cao hơn, là một giải pháp chung tổng thể cho các vấn đề chung trong thiết kế phần mềm. Chúng là những giải pháp đã được tổng hợp, tối ưu thành các chuẩn.
> Design patterns may be viewed as a structured approach to computer programming intermediate between the levels of a programming paradigm and a concrete algorithm.

Tạm dịch

> *Design Pattern* có thể xem là một tiếp cận có cấu trúc của lập trình nằm ở khoảng giữa các mức (*level*) của một mô hình lập trình (*programming paradigm*) và một giải thuật cụ thể (*concrete algorithm*)

*Design Pattern* chưa phải là một thiết kế hoàn thiện để có thể chuyển trực tiếp thành *code*, nó chỉ là một mô tả hay *template* làm thế nào để giải quyết vấn đề mà có thể dùng trong nhiều tình huống khác nhau. Đây là những *best practice* mà *developer* có thể sử dụng để giải quyết các vấn đề chung khi thiết kế một ứng dụng hay hệ thống.

*Design Patterns* thường được liên kết với *code* ở mức độ phổ biến. Cung cấp các lược đồ khác nhau để tinh chỉnh và xây dựng một hệ thống nhỏ (*subsystem*). Nó thường bị ảnh hưởng bởi các ngôn ngữ lập trình, có trạng thái biến đổi, có thể không phù hợp với *functional programming*, một số *Patterns* có thể không cần thiết trong ngôn ngữ mà nó đã có các *built-in* hỗ trợ sẵn để giải quyết các vấn đề. *Oriented Pattern* có thể không nhất thiết phải phù hợp vs các ngôn ngữ *non-Object-Oriented* .

Các giải thuật không được xem là các *Design Pattern*, vì chúng giải quyết các vấn đề về tính toán hơn là các vấn đề về thiết kế.

Các *design pattern* giúp tăng tốc quá trình phát triển phần mềm bằng cách cung cấp các mô hình *paradigm* phát triển đã được chứng thực và kiểm chứng. Thông thường *developer* chỉ biết cách áp dụng cho một số *design pattern* nào đó vào một vấn đề cụ thể nào đó. Một kĩ thuật *design pattern* khó để *apply* mở rộng cho các vấn đề khác. Các *Design Pattern* cung  cấp các giải pháp chung, được viết tài liệu dưới một định dạng mà không gắn liền với một vấn đề cụ thể nào cả.

*Design Patterns*  được chia làm 3 *category* chính: *Creational*, *Structural*, *Behavioral*. Hãy cùng lướt qua nhé:
#### Creational design patterns
Những *design pattern* này dùng cho việc khởi tạo *class*.  Chúng được thiết kế để đối phó với các cơ chế tạo đối tượng, cố gắng tạo các đối tượng theo cách phù hợp với tình huống, giải quyết các vấn đề bằng cách kiểm soát việc tạo đối tượng.

Ex: 

`Builder`: Tách nhỏ các thuộc tính từ *constructor*

`Object Pool`: Tránh việc tạo lại và giải phóng tài nguyên bằng cách tái sử dụng các đối tượng không còn được sử dụng.

`Factory`: tạo 1 *instance* của một vài *class* dẫn xuất

`AbstractFactory`: có thể tạo các *factory* khác, có thể gọi là “*Factory of factories*”

`Prototype`: Một *instance* được *copy* hoặc nhân bản

`Signleton`: Một *instance* duy nhất của *class* có thể tồn tại  
…

#### Structural design patterns
Các *design pattern* này dùng cho cả *Class* và *Object*. Các *pattern* này làm đơn giản việc thiết kế bằng việc xác định một cách đơn giản để nhận ra mối quan hệ giữa các thực thể (*entity*)

Ex:

`Adapter`: Kết nối *interface* của các lớp khác nhau

`Composite`: Cấu trúc cây (*tree*) của các đối tượng *simple* và *composite*, sử dụng khi cần xử lý một nhóm đối tượng theo cách tương tự như một đối tượng riêng lẻ.

`Facade`: *Class* đại điện cho toàn bộ một *subsystem*, che dấu sự phức tạp của hệ thống và cung cấp một *interface* mà các *client* có thể truy cập

`Proxy`: một *class* đại diện chức năng cho một *class* khác 

…

#### Behavioral design patterns
Các *design pattern* này dùng cho việc trao đổi giữu các đối tượng của *Class*. Xác định các *Pattern* giao tiếp chung giữa các đối tượng và nhận ra các *Pattern* này. Bằng cách này, các *Pattern* tăng tính linh hoạt trong việc thực hiện giao tiếp.

Ex:

`Observer`: Dùng khi có mối quan hệ *one-to-many* giữa các *object*, trong đó nếu một *object* thay đổi, các *object* phụ thuộc sẽ được thông báo tự động.

`Template`: dùng một *Abstract class* cho thấy các cách/ mẫu được định nghĩa trước để thực thi *method*. Các *class* con sẽ *override* các *method* theo nhu cầu, nhưng việc gọi các *mothod* là giống nhau được định nghĩa trước ở *abstract class*.

`Null Object`: Tạo một đối tượng *null* thay thế việc kiểm tra *Null instance*. *Null Object* có thể được sử dụng để cung cấp các hành vi mặt định trong các trường hợp dữ liệu của đối tượng không có sẵn.

…

## Architectual Pattern
*Architectural pattern* là một giải pháp chung, có thể tái sử dụng cho một vấn đề thường gặp trong *software architecture* trong một ngữ cảnh cụ thể. Các mẫu *Architectural pattern* **tương tự như *Design Pattern* nhưng có phạm vi rộng hơn**. Các *pattern* này giải quyết các vấn đề khác nhau trong kỹ thuật phần mềm, chẳng hạn giới hạn hiệu suất phần cứng, tăng tính khả dụng và giảm thiểu rủi ro *business*.

*Architectural pattern* được xem là **phổ biến ở mức cao hơn của *design pattern***, Các *architectural pattern* là các chiến lược *high-level* liên quan đến các thành phần có quy mô lớn, các thuộc tính và cơ chế toàn cục của một hệ thống.

Mặc dù một *architectural pattern* truyền tải một hình ảnh của một hệ thống, **nhưng nó không phải là một *architecture***. Một *architectural pattern* là một khái niệm giải quyết và phân định một số yếu tố gắn kết thiết yếu của kiến trúc phần mềm. Vô số các kiến trúc khác nhau có thể thực hiện cùng một khuôn mẫu và chia sẻ các đặc điểm liên quan. Các *pattern* này thường được định nghĩa là “*strictly described and commonly available*” nghĩa là “được mô tả chính xác và thường xuyên có sẵn”.

*MVC, MVVM, MVP* là các *Architectural Patterns*.

## AntiPattern
Giống như  bản sao của các *Design Pattern*, định nghĩa một *process* (quá trình) và *implementation* (triển khai) lỗi bên trong các tổ chức. Là một phản ứng chung đối với một vấn đề lặp lại mà thường không có hiệu quả cao và rủi ro bị phản tác dụng.

*AntiPattern* mô tả một giải pháp thường xuyên cho một vấn đề mà tạo ra những hậu quả tiêu cực khác nhau. Một *antipattern* có thể là kết quả của một *manager* hay *developer* không biết cái nào tốt hơn, không đủ kiến thức hoặc kinh nghiệm để giải quyết một loại vấn đề cụ thể, hoặc cũng có thể là do áp dụng một mô hình hoàn hảo (*good pattern*) trong ngữ cảnh không đúng.

*AntiPattern* cung cấp kinh nghiệm thực tế trong việc nhận ra các vấn đề lặp lại trong công nghiệp phần mềm và cung cấp một biện pháp khắc phục chi tiết cho các tình huống khó khăn chung nhất. *AntiPattern* làm nổi bật các vấn đề phổ biến nhất phải đối mặt và cung cấp công cụ để cho phép bạn nhận ra những vấn đề này và quyết định nguyên nhân cơ bản của chúng 

Hơn nữa, *AntiPattern* trình bày một kế hoạch chi tiết để đảo ngược các nguyên nhân cơ bản và triển khai các giải pháp. *AntiPattern* mô tả một cách hiệu quả các biện pháp có thể được thực hiện ở nhiều cấp độ để cải thiện việc phát triển ứng dụng, thiết kế hệ thống và quản lý hiệu quả dự án phần mềm.

Có ít nhất 2 yếu tố chính để phân biệt *AntiPattern* và một *simple bad habit*, *bad practice* hay *bad idea*:
1. Một *process*, *structure* hoặc *pattern* của hành động thường được dùng, mặc dù ban đầu dường như là một phản ứng thích hợp và có hiệu quả đối với một vấn đề, nhưng về sau lại có nhiều hậu quả xấu hơn.
2. Một giải pháp khác tồn tại được ghi lại, có thể lặp lại và được chứng minh là có hiệu quả.

Một vài kiểu *AntiPattern* trong *Software development*:
#### Development AntiPattern:
Mục tiêu là mô tả các *form* hữu ích cho việc tái cấu trúc phần mềm (*software refactoring*). Tái cấu trúc là việc chỉnh sửa *code*, dùng để cải thiện cấu trúc phần mềm để hỗ trợ khả năng *extend* và *maintain*. Trong hầu hết các trường hợp, mục tiêu là chuyển đổi *code* mà không ảnh hưởng đến tính chính xác của phần mềm.
#### Architecture AntiPattern
*Architecture AntiPattern* tập trung vào kiến trúc *system-level* hoặc *enterprise-level* của các ứng dụng và thành phần.
#### Project management AntiPattern
Trong sự phát triển của kĩ thuật, hơn một nửa công việc liên quan đến việc giao tiếp của con người và giải quyết các vấn đề con người. *AntiPattern* này xác định một số các kịch bản chính trong đó là các vấn đề gây ảnh hưởng, phá hoại quy trình phần mềm.

Ex: Một vài *AntiPattern* trong lập trình *OOP* thường gặp:

`Call Super`: Yêu cầu các lớp con gọi các *overridden method* của lớp cha

`God Object`: Tập trung quá nhiều chức năng trong một phần của *design* (*class*)

`Circular dependency`: Sự phụ thuộc trực tiếp hoặc gián tiếp không cần thiết giữa các đối tượng hoặc *module* phần mềm.

> Tham khảo thêm các *AntiPattern* [tại đây](https://sourcemaking.com/antipatterns )

## Software architecture
*Software arrchitecture* hay kiến trúc phần mềm đơn giản chính là cấu trúc của các thành phần trong hệ thống phần mềm. Nó đề cập đến cấu trúc mức cao của một hệ thống phần mềm, khuôn mẫu ràng buộc của việc tạo ra cấu trúc (*structure*), và tài liệu của các cấu trúc này. Những cấu trúc này cần thiết để giải thích về hệ thống, mỗi cấu trúc bao gồm các phần tử (*element*), các mối quan hệ (*relation*) giữa chúng và các đặc tính của cả hai. Một *architecture* của một hệ thống phần mềm tương tự như kiến trúc của một tòa nhà.

*Architecture* tạo ra các lựa chọn cấu trúc cơ bản mà ít tốn kém chi phí để thay đổi một khi được thực hiện vì việc viết tư liệu kiến trúc phần mềm tạo điều kiện cho giao tiếp giữa các bên liên quan, nắm bắt các quyết định ban đầu về thiết kế cấp cao và cho phép tái sử dụng các thành phần và các mẫu thiết kế giữa các dự án.

Lựa chọn *architecture* bao gồm các tùy chọn về cấu trúc từ các khả năng trong thiết kế phần mềm. Ví dụ, các hệ thống kiểm soát xe đưa đón có yêu cầu rất nhanh và đáng tin cậy. Do đó, một ngôn ngữ máy tính thời gian thực (*realtime*) thích hợp sẽ cần phải được chọn. Ngoài ra, để đáp ứng nhu cầu về độ tin cậy, sự lựa chọn có thể được thực hiện để có nhiều bản sao dự phòng của chương trình, và chạy các bản sao này trên phần cứng độc lập trong khi kiểm tra chéo kết quả.

Khi nói về *Architecture*, điều đó có nghĩa là:

1. Tất cả các quyết định kĩ thuật sẽ xuyên suốt tất cả các vấn đề phát triển phần mềm. VD: *frameworks, coding standards, document, process*...
2. Là tập quyết định về mặt kỹ thuật mà sẽ rất khó thay đổi về sau trong dự án 
3. Là bức tranh tổng thể của hệ thống về hình hài, câú trúc, các thành phần và quan hệ giữa chúng.
4. Sẵn sàng cho sự thay đổi của dự án, thường đơn giản bằng cách trì hoãn các quyết định đến thời điểm cuối cùng có thể chấp nhận được.
5. Nó chuẩn bị cho dự án để tái sử dụng các thành phần và *module*
6. Nó thiết lập các chuẩn trong việc nhất quán về mặt kết quả và trọng lượng nhẹ của các quy trình.
7. Nó không chỉ là trách nhiệm của một người mà là một hội các *developer* giàu kinh nghiệm thuộc các nhóm đặc trưng khác nhau trong dự án.

## Conclusion
Có thế kết luận rằng “Một phần mềm lớn, phức tạp trải qua một loạt các quá trình giải mã ở các cấp độ khác nhau. Ở mức độ lớn, các `architectural patterns` là các công cụ. Ở cấp độ nhỏ hơn, các `design patterns` là các công cụ và ở cấp độ triển khai (`implementation`), các `programming paradigms/idiom` là các công cụ.”

*Programming paradigms*: Cụ thể cho từng ngôn ngữ lập trình

*Design Patterns, AntiPatterns*: Giải quyết các vấn đề lặp đi lặp lại bên trong xây dựng *software* 

*Architectural Patterns, software architecture*: Tổ chức cấu trúc cơ bản cho các hệ thống phần mềm.

**References**:

https://en.wikipedia.org/wiki/Programming_paradigm 

https://en.wikipedia.org/wiki/Programming_idiom 

https://en.wikipedia.org/wiki/Software_design_pattern 

https://en.wikipedia.org/wiki/Architectural_pattern

https://sourcemaking.com/

https://en.wikipedia.org/wiki/Software_architecture

https://herbertograca.com/2017/07/05/software-architecture-premises/

https://www.tutorialspoint.com/design_pattern/index.htm