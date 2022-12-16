Trên các diễn đàn về tin học hiện nay, có nhiều bài blog và mục hỏi đáp liên quan đến chủ đề "ngôn ngữ lập trình A và B khác nhau như thế nào?". Mình nghĩ đây là một đề tài quan trọng cho cả người mới học lập trình lẫn người đã lập trình lâu năm. Tuy nhiên lướt qua một vòng các diễn đàn mạng thì mình thấy hầu hết các bài viết về chủ đề này đều chưa thỏa đáng, và tệ hơn nữa là đôi khi chứa nhiều thông tin sai lệch.

Bài viết này sẽ cố gắng giải thích sự khác biệt giữa các ngôn ngữ lập trình một cách có hệ thống, đồng thời đính chính những nhận định sai lầm mà mình thấy xuất hiện nhiều trên các forum/blog. 

## Tại sao lại sinh ra nhiều ngôn ngữ lập trình khác nhau ?
Trước hết, ta cần hiểu ngôn ngữ lập trình là một công cụ giúp cho lập trình viên ra mệnh lệnh cho máy tính thực hiện. Nó cũng giống như đồ nghề của một người thợ. Đối với mỗi kiểu công việc khác nhau thì người thợ cần sử dụng các công cụ khác nhau (VD như để hàn thì dùng máy hàn, để khoan thì dùng máy khoan). Tương tự như vậy, trong quá trình xây dựng phần mềm thì người ta nhận thấy có nhiều kiểu phần mềm khác nhau, với các đặc tính riêng biệt. Do đó, người ta phát triển các ngôn ngữ khác nhau để hỗ trợ làm việc hiệu quả với các kiểu phần mềm này. 

Trong bài này mình sẽ phân loại các ngôn ngữ lập trình theo các tiêu chí phổ biến thường gặp nhất: 1) cách mà ngôn ngữ được biên soạn trước khi máy tính vận hành (compilation); 2) phong cách lập trình của ngôn ngữ (paradigm). 

## Tiến trình biên soạn (Compilation process)

### Instruction set, ngôn ngữ máy và ngôn ngữ Assembly 
Mỗi CPU trong máy tính đều có bộ nhớ nội bộ (gọi là registry) và một tập hợp các câu lệnh mà nó có thể thực thi, được gọi là *Instruction set*. Các CPU có kiến trúc khác nhau (VD như x86, x64, ARM vv...) sẽ có registry và Instruction set khác nhau. Dù cho bạn sử dụng ngôn ngữ nào thì chương trình của bạn cũng phải được chuyển hóa thành các câu lệnh (instruction) nằm trong *Instruction set* nói trên để máy tính có thể thực thi. 

*Instruction* có thể được biểu diễn dưới hai dạng. Dạng thứ nhất là dạng mã nhị phân (binary code), tức là chỉ bao gồm chuỗi các bit `0` và `1`. Đây là dạng mà máy tính có thể hiểu và thực hiện trực tiếp được. Các câu lệnh dưới dạng mã nhị phân này được gọi là ngôn ngữ máy (machine language).

Hiển nhiên là ngôn ngữ dạng này không mấy thân thiện với con người. Do đó người ta còn biểu diễn instruction dưới dạng chữ, được gọi là ngôn ngữ Assembly. Ngôn ngữ Assembly này chứa những câu lệnh mang tính cơ bản nhất mà CPU có thể thực hiện, thao tác trực tiếp với registry của CPU, ví dụ như:

```assembly
    ldr eax, adr_var1    ; tải giá trị tại địa chỉ bộ nhớ 'adr_var1' vào registry 'eax' 
    add eax, ebx         ; cộng giá trị của 'ebx' vào 'eax'
    inc eax              ; tăng giá trị của 'eax' thêm 1
    str eax, adr_var2    ; lưu giá trị 'eax' vào địa chỉ bộ nhớ 'adr_var2'
```

### Ngôn ngữ Native
Dù Assembly dễ đọc hơn là ngôn ngữ máy, tuy nhiên vì nó chỉ là các câu lệnh trực trực tiếp cho phần cứng của CPU nên đối với người lập trình viên, nó vẫn rất khó sử dụng. Ví dụ, nếu ta muốn cộng 2 biến số `a` và `b` với nhau, ta chỉ muốn ra lệnh `a+b`, thay vì phải viết một loạt các câu lệnh liên quan đến registry như ví dụ trên. Nói cách khác, lập trình viên muốn viết các câu lệnh thể hiện ý muốn của mình, thay vì phải viết lệnh theo cơ chế hoạt động của CPU (ví dụ như bạn vào quán ăn thì bạn chỉ muốn gọi một bát phở, chứ không muốn ra lệnh cho đầu bếp chế biến theo các bước nào). Trong tin học, khái niệm này được gọi là *trừu tượng hóa* (abstraction).

Các ngôn ngữ bậc cao được phát triển nhằm cung cấp *abstraction* cho lập trình viên. Thông qua quá trình biên soạn (compilation), cú pháp bậc cao sẽ được chuyển hóa thành ngôn ngữ máy để máy tính làm việc. Công cụ thực hiện quá trình này được gọi là *compiler*. Nếu compiler của ngôn ngữ có thể biên soạn ngôn ngữ trực tiếp ra mã máy, thì ngôn ngữ đó được gọi là ngôn ngữ Native. Một vài VD thường gặp của kiểu ngôn ngữ này bao gồm C, C++, Go, Rust ... Đối với các ngôn ngữ này, lập trình viên phải thực hiện việc biên soạn code trước khi chương trình có thể chạy. Việc biên soạn trực tiếp ra ngôn ngữ máy thường tốn nhiều thời gian, tuy nhiên cũng vì thế mà compiler có cơ hội tối ưu code một cách  tốt nhất. Đây là lý do mà các ngôn ngữ Native thường có hiệu năng tốt hơn các kiểu ngôn ngữ khác.

> Hiểu lầm thường gặp: **C/C++ là ngôn ngữ lập trình bậc thấp (low-level)**. Thực chất, theo định nghĩa, ngôn ngữ bậc thấp là ngôn ngữ không cung cấp abstraction cho người lập trình. Vì vậy hiểu theo định nghĩa này, ngôn ngữ bậc thấp bao gồm ngôn ngữ Assembly và ngôn ngữ máy. C/C++ được xếp vào ngôn ngữ bậc cao (high-level).

### Ngôn ngữ Managed

Các ngôn ngữ Native kể trên tuy cung cấp abstraction cho lập trình viên, tuy nhiên việc sử dụng chúng cũng có một vài khó khăn:

* Do chương trình được biên soạn trực tiếp ra ngôn ngữ máy, code viết bằng ngôn ngữ Native thường bị ràng buộc với một kiểu kiến trúc CPU (x86, x64, ARM).
* Nếu chương trình tương tác với hệ điều hành (làm việc với file, với network...) thì code cũng bị ràng buộc bởi các API của hệ điều hành. VD như, để mở một file, API của Linux là `open()`, trong khi đó của Windows là `OpenFile()`. Điều này khiến việc viết phần mềm có thể chạy trên nhiều OS trở nên không dễ dàng. 

Một hệ các ngôn ngữ lập trình, bao gồm Java, C#, Scala ... được phát triển nhằm giải quyết các vấn đề trên. Các ngôn ngữ này ngoài trình biên soạn compiler, chúng còn được cung cấp kèm với một nền tảng *ảo hóa* (virtualization), VD như JVM của Java hay .NET đối với C#. Nền tảng này giúp cho các chương trình lập trình bằng những ngôn ngữ này có thể chạy trên nhiều OS khác nhau. Cơ chế hoạt động của các ngôn ngữ này như sau:
* Khi dev viết code, code sử dụng một hệ API chung cho tất cả các OS cũng như các kiến trúc CPU mà ngôn ngữ/nền tảng đó hỗ trợ. 
* Khi biên soạn, code sẽ được compiler dịch ra một mã trung gian. Mã này tương đối gần với Assembly code, tuy nhiên vẫn có mức độ abstraction nhất định giúp cho mã không bị ràng buộc vào OS hay kiến trúc CPU cố định nào. Đối với Java/Scala, mã này được gọi là *Java bytecode*, đối với C#, mã này được gọi mà *MSIL (Microsoft Intermediate Language)*. 
* Mã trung gian này không chạy trực tiếp trên CPU, mà được vận hành bởi một chương trình ảo hóa đi kèm với ngôn ngữ. Chương trình này được gọi là *Virtual machine* (hay *Runtime* - tùy theo tên gọi mà nhà phát triển ngôn ngữ đó đặt ra). Nó có nhiệm vụ chuyển hóa mã trung gian ra mã máy để CPU vận hành. Qúa trình chuyển hóa này được gọi là Just-In-Time compilation, hay viết tắt là JIT. Do JIT được thực hiện lúc phần mềm đang chạy, nên mã máy sẽ không được tối ưu một cách tốt nhất (do hạn chế về mặt thời gian). Vì lý do này mà các ngôn ngữ Managed thường có hiệu năng kém hơn ngôn ngữ Native. 

> Kiến thức ngoài lề: Do hạn chế về hiệu năng kể trên, các nhà phát triển thường cung cấp một công cụ giúp chuyển hóa mã trung gian thành mã máy *trước* khi phần mềm chạy. Công cụ này được gọi là *Ahead-Of-Time* compiler, hay AOT. Nếu bạn đã từng nghe đến công nghệ *Android Runtime* trên Android, đó là một công cụ AOT như vậy. 

### Ngôn ngữ Scripting

Dòng ngôn ngữ Scripting được phát triển nhằm đơn giản hóa hơn nữa việc viết và chạy phần mềm. Ví dụ của dòng ngôn ngữ này gồm Python, Ruby, PHP, Javascript, hay các ngôn ngữ shell như Bash, Powershell... Đối với các ngôn ngữ này, khâu biên soạn (compilation) được lược bỏ hoàn toàn. Thay vào đó, code được vận hành thông qua một chương trình *interpreter* (biên dịch). VD, lệnh `./python program.py` sẽ vận hành trực tiếp code trong file `program.py`, ở đây `python` là interpreter. Interpreter chuyển hóa code thành mã máy tại thời điểm đoạn code đó hoạt động.

Điểm khác biệt của các ngôn ngữ Scripting so với các ngôn ngữ Managed ở phần trên là các ngôn ngữ Managed có một quá trình biên soạn ra mã trung gian gần với mã máy hơn. Điều này giúp cho Runtime của ngôn ngữ Managed có thể tối ưu hóa code hơn. Vì vậy nhìn chung các ngôn ngữ Scripting có hiệu năng thấp hơn các ngôn ngữ Managed hay Native. Tuy nhiên, sự đơn giản và dễ sử dụng khiến cho các ngôn ngữ Scripting như Python, Javascript... rất được ưa chuộng.

> Hiểu lầm thường gặp: Các ngôn ngữ Scripting (Python, Ruby ...) cho phép code **ngắn gọn** hơn các ngôn ngữ khác. Sự ngắn gọn hay dài dòng phụ thuộc vào cú pháp của từng ngôn ngữ cụ thể chứ không phụ thuộc vào cơ chế biên soạn (hay biên dịch). Các ngôn ngữ OOP truyền thống như Java, C# nhìn chung có cú pháp dài hơn các ngôn ngữ Scripting, tuy nhiên một số ngôn ngữ Managed mới theo hướng *functional programming* như Scala, F# có cú pháp rất ngắn gọn, thậm chí ngắn gọn hơn các ngôn ngữ Scripting thông thường. Tất nhiên, độ ngắn gọn không phải là yếu tố duy nhất quyết định sự ưu việt của một ngôn ngữ.

### Garbage collection

Chương trình nào hoạt động thì cũng cần sử dụng bộ nhớ RAM (memory) của máy tính. Trong các hệ điều hành hiện đại, các process khi cần dùng memory cần yêu cầu hệ điều hành cung cấp memory cho mình (thông qua các API như `malloc/alloc` hay `new()` trong C++). Khi đã sử dụng xong, process có trách nhiệm giải phóng (free) vùng bộ nhớ đó. Nếu bộ nhớ không được giải phóng, tình trạng *memory leak* (rò rỉ bộ nhớ) có thể xảy ra, gây ảnh hưởng đến tính năng và hiệu năng hoạt động của chương trình.

Các ngôn ngữ C/C++ yêu cầu lập trình viên phải tự quan lý việc sử dụng bộ nhớ và tự giải phóng khi cần thiết. Trong nhiều trường hợp, việc quản lý này khá phức tạp. Nói chung, phần mềm chứa càng nhiều code thì càng khó để lập trình viên có thể quản lý bộ nhớ chính xác. 

Do đó, nhiều ngôn ngữ lập trình bao gồm một thành phần *garbage collector* (tạm dịch là bộ phận thu nhặt rác), giúp lập trình viên không phải lo quản lý và giải phóng bộ nhớ. Các ngôn ngữ C#, Java, Go... và các ngôn ngữ Scripting đều có tính năng này. Về cơ bản, *garbage collector* hoạt động dựa trên việc theo dõi các địa chỉ bộ nhớ được process yêu cầu, và giải phóng vùng bộ nhớ tương ứng khi địa chỉ đó không được process sử dụng nữa. Để đạt được mục đích này, *garbage collector* thường hoạt động song song với process và đôi khi tạm ngưng process để thực hiện giải phóng và sắp xếp lại bộ nhớ. Vì lý do này mà *garbage collector* có thể làm giảm hiệu năng của process. 

## Phong cách lập trình (Paradigm)

### Kiểu dữ liệu tĩnh & động (static & dynamic typing)
Các ngôn ngữ theo kiểu truyền thống thường yêu cầu lập trình viên phải định nghĩa kiểu dữ liệu (data type) khi sử dụng chúng trong chương trình. Định nghĩa này là cố định và không thể thay đổi trong toàn bộ đoạn code của chương trình đó. VD như cấu trúc `struct` của ngôn ngữ C:
```C
struct person {
    char name[1024];
    int age;
};
```
Ở đây các trường `name` và `age` có các kiểu dữ liệu `char[]` và `int` mà các đoạn code làm việc với cấu trúc `person` phải tôn trọng, nếu không, compiler sẽ không biên soạn được chương trình. Quy tắc này gọi là *static typing*, được sử dụng trong các ngôn ngữ như C/C++, C#, Java, Rust, Go...  

Đối với nhiều người, việc phải định nghĩa kiểu dữ liệu khiến cho việc lập trình trở nên dài dòng và mất công hơn. Do đó, rất nhiều ngôn ngữ, đặc biệt là các ngôn ngữ Scripting (Python, Ruby, Javascript), chủ động loại bỏ công đoạn này, cho phép lập trình viên được sử dụng kiểu dữ liệu một cách tùy ý. Cách sử dụng dữ liệu theo kiểu này được gọi là *dynamic typing*. VD, trong Javascript, bạn được phép làm điều sau đây:

```Javascript
// khai báo biến không cần định nghĩa kiểu dữ liệu
var person = {
    name: "Bob",
    age: 25
};

// sử dụng trường mới 
person.job = "Developer";
// thay đổi kiểu dữ liệu của trường cũ
person.age = "25";
```

Vậy sử dụng cơ chế nào là ưu việt hơn? Điều này thực sự phụ thuộc vào quan điểm của mỗi người lập trình khác nhau. Điểm cộng lớn nhất của *dynamic typing* là bạn không phải mất công định nghĩa tất cả các kiểu dữ liệu, giúp tiết kiệm thời gian khi lập trình. Tuy nhiên, cá nhân mình thấy thích làm việc với các ngôn ngữ *static typing* hơn, vì các lý do sau đây:

* **Hiệu năng**: Do kiểu dữ liệu trong *dynamic typing* có thể thay đổi bất cứ lúc nào nên việc truy cập trường trong đối tượng phức tạp hơn. Trong VD trên, khi bạn truy cập `person.job` chẳng hạn, chương trình *Runtime* sẽ phải làm việc để xác định trường `job` có tồn tại không, và gía trị của nó là gì. Cách duy nhất để làm việc này là cấu trúc mỗi đối tượng thành một bảng hash, trong đó key của bảng hash là tên của trường (ở đây là `job`). Do đó, mỗi lần truy cập đối tượng, ta coi như phải thực hiện một lần hash. Đối với *static typing*, do bạn chỉ có thể truy cập các trường đã được định nghĩa, việc truy cập này chỉ đơn giản là truy cập vào địa chỉ bộ nhớ đã được định sẵn. Do đó mà các ngôn ngữ *static typing* thường có performance tốt hơn các ngôn ngữ *dynamic typing*.
* **Khả năng bắt lỗi trong quá trình biên soạn**: VD trên cũng cho ta thấy là nếu ta sử dụng dữ liệu sai cú pháp, compiler sẽ báo lỗi và ta có thể kịp thời sủa chữa. Điều này sẽ giúp cho việc hạn chế lỗi trong quá trình chương trình vận hành thực sự. Một lỗi ngớ ngẩn mà mình hay gặp phải khi viết Javascript là lỗi "sai chính tả" (ví dụ như `name` viết thành `nane` chẳng hạn). Lỗi này rất khó có thể bắt được trong Javascript do `person.nane` là hoàn toàn hợp cú pháp.
* **Các công cụ lập trình hỗ trợ tốt hơn**. Do *static typing* định nghĩa các kiểu dữ liệu rõ ràng nên các công cụ lập trình (IDE hay code editor) có khả năng hỗ trợ bạn tốt hơn trong quá trình lập trình.
### Lập trình hướng đối tượng (OOP)
Một ngôn ngữ như C có phong cách lập trình theo hướng *thủ tục* (procedural programming), nghĩa là các logic của một chương trình định nghĩa trong các thủ tục (procedure), hay trong C gọi là *function*. Đối với nhiều ứng dụng business thực tế thì cách tổ chức này gây ra khó khăn trong việc phân chia các vùng logic riêng biệt. Do đó, khái niệm *lập trình hướng đối tượng* (OOP) được phát minh. Mục đích chính của kiểu lập trình này là mô phỏng một chương trình phần mềm giống với cách các thực thể/đối tượng tương tác với nhau ngoài đời thực. Theo đó, dữ liệu và logic của chương trình được sắp xếp theo các đối tượng (object), tương tác với nhau qua việc gọi `method` của nhau. Các ngôn ngữ hỗ trợ OOP thường đi kèm các khái niệm như `class/object`, `inheritance`, `overloading`... Một số VD bao gồm C++, C#, Java, Kotlin, Swift...

> Hiểu lầm thường gặp: Java/C++/C# ... là các ngôn ngữ theo kiểu OOP. Cách nói này không đúng cho lắm, vì các ngôn ngữ trên cho phép bạn lập trình theo nhiều phong cách, VD như lập trình hướng khía cạnh (aspect-oriented) hay lập trình hàm (functional) chứ không giới hạn ở OOP. Bạn có thể viết một chương trình Java/C#... mà không sử dụng OOP. Vì thế OOP giống như một tính năng hơn là một định nghĩa về ngôn ngữ lập trình.

### Lập trình hàm (Functional programming)
Đây là một kiểu lập trình đang ngày càng được ưa chuộng. Để viết đầy đủ về Functional programming thì rất dài, nên để dễ hiểu mình sẽ nói qua về lý do tại sao Functional programming được sử dụng (nghĩa là nó giải quyết những vấn đề nào).

Các chương trình phần mềm đều hoạt động bằng cách kích hoạt các function/method (gọi chung là method nhé) được định nghĩa trong mã nguồn. Một method thường bao gồm input (các giá trị đầu vào mà bạn cung cấp), output (giá trị được trả lại), và logic ở trong method đó. Đối với một ngôn ngữ kiểu truyền thống (Java hay C++ chẳng hạn), khi bạn gọi một method thì có thể xảy ra những điều sau đây:

* Method đó có thể thay đổi giá trị của input. Điều này có nghĩa là sau khi hàm đó kết thúc, input mà bạn đưa vào có thể đã bị biến đổi. 
* Method đó có thể thay đổi các dữ liệu khác trong chương trình. 

Người ta gọi việc thay đổi này này là *side-effect*. Vấn đề chính của side-effect là, bạn khó có thể biết được khi nào side-effect xảy ra và khi nào chúng không xảy ra, nghĩa là trong code của bạn dữ liệu có thể bị biến đổi ở bất kì điểm nào. Điều này gây khó khăn cho việc đọc hiểu code cũng như truy tìm bug, nhất là khi chương trình có khối lượng code lớn. 

Functional programming giải quyết vấn đề trên dựa trên những nguyên lý sau:
* Các hàm (function) được dùng làm thành phần cấu tạo chính của chương trình. Các function có thể được sử dụng các kiểu dữ liệu thông thường, hay là tham số của một function khác.
* Các function *không được phép* có side-effect. Điều này có nghĩa làm output của function chỉ phụ thuộc vào input của function đó.
* Các đối tượng dữ liệu (object) của chương trình không được phép biến đổi (immutable). Khi cần thiết lập dữ liệu mới nào đó thì object mới phải được khởi tạo.

Ta thử lấy ví dụ cho một đoạn code đơn giản: tính toán giá trị bình phương của một mảng số integer. Theo kiểu lập trình truyền thống, ta có thể có đoạn code như sau:

```csharp
void CalculateSquare(List<int> nums) {
    for(var i=0; i< nums.Count; i++) {
        nums[i] = nums[i] * nums[i];
    }
}

CalculateSquare(new List<int> {1,2,3,4,5});
```
Đoạn code trên thay đổi giá trị của input `nums`. Điều này trái với nguyên tắc của *Functional programming*. Một đoạn code theo kiểu Functional programming sẽ như sau (ngôn ngữ F#):

```fsharp
let square = fun n -> n * n
let result = List.map square [ 1; 2; 3; 4; 5 ]
```
Ta thấy ở đây `square` là một function, được định nghĩa như một biến trong chương trình. Function này được đưa vào function `List.map` dưới dạng tham số, và kết quả của nó là một list `result`. Lưu ý là input `[ 1; 2; 3; 4; 5 ]` không hề thay đổi, thay vào đó `result` là một list mới được khởi tạo bởi `List.map` để lưu output.

F#, Haskell, Erlang... là một vài ngôn ngữ được phát triển với Functional programming là trọng tâm. Functional programming tuy giúp giải quyết vấn đề kể trên, nhưng để lập trình Functional programming một cách hiệu quả là tương đối khó, đặc biệt là đối với các hệ thống cần xử lý I/O. Do đó, Functional programming hiện nay thường được áp dụng song song với các kiểu lập trình truyền thống. 

## So sánh vui về hiệu năng (performance) của các ngôn ngữ lập trình

Trang Benchmark game (https://benchmarksgame-team.pages.debian.net/benchmarksgame/index.html) là một trang web thực hiện việc so sánh hiệu năng tính toán của nhiều ngôn ngữ với nhau. Lưu ý là so sánh này chỉ thực hiện trên một số bài toán cụ thể và mang tính tham khảo chứ không có giá trị kết luận về hiệu năng thực tế. 

Tương tự, Techempower Benchmark (https://www.techempower.com/benchmarks/) là một website so sánh performance của các nền tảng Web.