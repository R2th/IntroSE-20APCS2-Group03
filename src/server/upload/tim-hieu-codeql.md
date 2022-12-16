CodeQL là nền tảng phân tích mã nguồn được sử dụng bởi các nhà nghiên cứu bảo mật để tự động phân tích lỗi. CodeQL có thể thực hiện thông qua nền tảng online trên [query console LGTM.com](https://lgtm.com/query).

CodeQL dựa trên ngôn ngữ truy vấn mạnh mẽ được gọi là QL. Hiểu QL giúp cho ta có cái nhìn tốt hơn về việc đọc hiểu cũng như viết mã phân tích với CodeQL.

Hiện tại CodeQL đang hỗ trợ cho các loại ngôn ngữ: C/C++, C#, Go, Java, Python, Javascript, COBOL

# Giới thiệu QL
QL là một ngôn ngữ truy vấn mạnh mẽ làm nền tảng cho CodeQL.Truy vấn được viết bởi CodeQL có thể tìm lỗi và phát hiện các loại biến thể của lỗ hổng bảo mật liên quan. Để đọc các ví dụ lỗ hổng bảo mật mới phát hiện trong open souce project vào [GitHub Security Lab](https://securitylab.github.com/). 

QL là ngôn ngữ truy vấn logic, vì vậy nó được xây dựng từ các cấu trúc logic. QL sử dụng các kết nối logic phổ biến  (như `and`, `or`, `not`), định lượng (như `forall`, `exists`), và các khái niệm logic quan trọng khác như **[predicate]()**. 

QL cũng hỗ trợ đệ quy và tập hợp. Điều này cho phép ta viết truy vấn đệ quy phức tạp sử dụng cú pháp QL đơn giản và sử dụng các hàm tập hợp như `count`, `sum`, `average` một cách trực tiếp.

Để hiểu rõ hơn về QL vào [About QL](https://help.semmle.com/QL/learn-ql/about-ql.html), [QL language handbook](https://help.semmle.com/QL/ql-handbook/index.html)
## Cú pháp cơ bản
Cú pháp cơ bản của QL trông giống như SQL, nhưng nó được sử dụng hơi khác.

Một câu truy vấn được định nghĩa bởi mệnh đề **`select`**, nó chỉ ra kết quả mong muốn ở đầu ra.

Một câu truy vấn đơn giản
```sql
select "Hello world"
```
Câu truy vấn chỉ đơn giản đưa ra kết quả là một chuỗi "Hello world".

Câu truy vấn phức tạp hơn
```sql
from /* ... variable declarations ... */
where /* ... logical formulas ... */
select /* ... expressions ... */
```

Ví dụ, kết quả câu truy vấn là 42
```sql
from int x, int y
where x = 6 and y = 7
select x * y
```
# Một số khái niệm cơ bản
## Predicates
Predicate được sử dụng để mô tả các mối quan hệ logic tạo nên một chương trình QL. Đúng hơn, một predicate đánh giá một bộ dữ liệu. Ví dụ:
```sql
predicate isCountry(string country) {
  country = "Germany"
  or
  country = "Belgium"
  or
  country = "France"
}

predicate hasCapital(string country, string capital) {
  country = "Belgium" and capital = "Brussels"
  or
  country = "Germany" and capital = "Berlin"
  or
  country = "France" and capital = "Paris"
}
```
Predicate `isCountry` có 1 tuple `{("Belgium"),("Germany"),("France")}`, `hasCapital` có 2 tuple `{("Belgium","Brussels"),("Germany","Berlin"),("France","Paris")}`
### Định nghĩa một predicate
khi định nghĩ một predicate, cần phải chỉ định các:
1. Từ khóa `predicate` (nếu không có dữ liệu trả về), hoặc kiểu của dữ liệu trả về.
2. Tên của predicate. Định danh bắt đầu bằng chữ thường.
3. Các tham số của predicate, nếu có nhiều thì phân cách nhau bởi dấu phẩy. Với mỗi tham số đầu vào cần phải chỉ định kiểu dữ liệu.
4. Nội dung của predicate.
#### Predicate không có dữ liệu trả về
```sql
predicate isSmall(int i) {
  i in [1 .. 9]
}
```
#### Predicate có dữ liệu trả về
```sql
int getSuccessor(int i) {
  result = i + 1 and
  i in [1 .. 9]
}
```
## Source
Trong quá trình phân tích luồng dữ liệu, `source` được hiểu là nơi bắt đầu của luồng dữ liệu.
## Sink
`sink` được coi là điểm kết thúc của dòng chảy dữ liệu.
## Flow
Luồng dữ liệu mô hình hóa cách dữ liệu chảy qua chương trình lúc chạy. Trong khi đó [abstrct syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) phản ánh cấu trúc của chương trình.

# Cài đặt môi trường
Để thực hành truy vấn mã CodeQL có 2 cách: sử dụng nền tảng [lgtm console](https://lgtm.com/query) hoặc chạy trên local
## Truy vấn trên lgtm console
![](https://images.viblo.asia/0927e5da-9d35-448b-967f-f3fb44d20447.png)
Trước khi viết mã CodeQL ta chọn ngôn ngữ và project

![](https://images.viblo.asia/4cdc4bc8-4ec0-4ac9-8aba-cdf7c4e2c8d0.png)

Cuối cùng, viết câu truy vấn và nhấn **run** để thực hiện câu truy vấn.và cho ra kết quả.
![](https://images.viblo.asia/632a10fe-55cd-43b9-960f-7c5555568968.png)
## Truy vấn trên local

Để truy vấn trên local ta cần phải cài đặt công cụ cần thiết.
1. [Codeql-cli](https://github.com/github/codeql-cli-binaries/releases)
2. [VsCode](https://code.visualstudio.com/)
3. [Extension Codeql Vscode](https://help.semmle.com/codeql/codeql-for-vscode/procedures/setting-up.html)
4. [QL library](https://github.com/Semmle/ql)

### Cài đặt công cụ
Đầu tiên tải file codeql-cli và giải nén ra. Tiếp theo cài đặt extension codeql cho vscode.
![](https://images.viblo.asia/d9c6d4ee-499b-43d7-a033-cdc338b9c2f9.png)

Sau khi cài xong extension codeql cho vscode, để có thể thực hiện các lệnh codeql ta cần phải cài codeQL-cli. Cài codeql-cli bằng cách thêm đường dẫn file thực thi codeql vào phần User setting, với linux dùng file **codeql**, windows sử dụng file **codeql.exe**.
![](https://images.viblo.asia/e6eebcb8-87cd-4e04-8bfe-308929b9ace4.png)

Cuối cùng thêm thư viện QL vào workspace của vscode để ta có thể bắt đầu viết câu truy vấn.
![](https://images.viblo.asia/82c88c6f-af87-4cd1-8819-2280cfddeb45.png)

### Viết truy vấn
Sau khi đã cài đầy đủ các thứ cần thiết ta đến bước cuối cùng là viết câu truy vấn. Để viết câu truy vấn ta cần có database ( cũng như SQL, muốn truy vấn có kết quả thì cần phải có database để câu truy vấn hiển thị kết qua cho ta thấy).

#### Tạo database
Khi tạo database để truy vấn, codeql sẽ phân tích source code và tạo 1 bản snapshot trên source code. Để tạo database ta sử dụng câu lệnh sau.
```sh
 codeql database create databases/<database-name> -s projects/<source-code> -l javascript
 ```
 * `codeql`: đây là file thực thi nằm trong codeql-cli đã tải ở trên.
 * ```databases/<database-name>```:  đường dẫn đến nơi lưu trữ database
 * ```-s```: đường dẫn đến source code muốn tạo database
 * ```-l```: ngôn ngữ muốn tạo database

#### Viết truy vấn
Khi viết truy vấn ta cần đặt câu truy vấn vào nơi thích hợp. Trong trường hợp viết truy vấn cho source code javascript, ta cần đặt file mã truy vấn vào đường dẫn: ```ql/javascript/ql/src```
    
Để hình dung rõ hơn, ta sử dụng một ví dụ đơn giảm tìm lỗi XSS trên source code javascript.
```javascript
var param = location.hash.split("#")[1];
document.write("Hello " + param + "!");
```
##### Truy vấn tìm document.write
```sql
import javascript
from Expr dollarArg,CallExpr dollarCall
where dollarCall.getCalleeName() = "write" and
    dollarCall.getReceiver().toString() = "document" and
    dollarArg = dollarCall.getArgument(0)
select dollarArg
```
Chạy truy vấn được kết quả như sau
![](https://images.viblo.asia/cf82655f-aaec-41a7-a997-e0d1705dc5ca.png)

##### Truy vấn location.hash.split
```sql
import javascript
from CallExpr dollarCall
where dollarCall.getCalleeName() = "split" and
    dollarCall.getReceiver().toString() = "location.hash"
select dollarCall
```
![](https://images.viblo.asia/123f2657-9d8b-4ba9-92c2-b197cc63ecd5.png)

##### Phân tích luồng dữ liệu
Sau khi tìm được `source` và `sink` của lỗi xss. Ta tiến hành kết hợp chúng lại để tìm những đoạn code có dòng dữ liệu đi từ  `source` đến `sink`.
```sql
class XSSTracker extends TaintTracking::Configuration {
  XSSTracker() {
    // unique identifier for this configuration
    this = "XSSTracker"
  }
  override predicate isSource(DataFlow::Node nd) {
   exists(CallExpr dollarCall |
      nd.asExpr() instanceof CallExpr and
      dollarCall.getCalleeName() = "split" and
      dollarCall.getReceiver().toString() = "location.hash" and
      nd.asExpr() = dollarCall
    ) 
  }
  override predicate isSink(DataFlow::Node nd) {
    exists(CallExpr dollarCall |
      dollarCall.getCalleeName() = "write" and
      dollarCall.getReceiver().toString() = "document" and
      nd.asExpr() = dollarCall.getArgument(0)
    )
  }
}
from XSSTracker pt, DataFlow::Node source, DataFlow::Node sink
where pt.hasFlow(source, sink)
select source,sink
```
![](https://images.viblo.asia/fd8a1718-d640-4325-be01-55c2d647bd98.png)

##### Bonus: Luồng dữ liệu có thể nhìn bằng mắt 
Để sử dụng tính năng này sẽ cần phải thay thế một số hàm sử dụng. Nhưng ý tưởng tìm lỗi vẫn như vậy, vẫn phải tìm `source` và `sink`. Sau khi code chạy xong thì ta có thể tìm bằng mắt xem dữ liệu của ta đi qua những chỗ nào.
```sql
/**
 * @name XSS
 * @kind path-problem
 * @id js/test
 */

import javascript
import DataFlow::PathGraph

class XSSTracker extends TaintTracking::Configuration {
  XSSTracker() {
    // unique identifier for this configuration
    this = "XSSTracker"
  }
  override predicate isSource(DataFlow::Node nd) {
   exists(CallExpr dollarCall |
      nd.asExpr() instanceof CallExpr and
      dollarCall.getCalleeName() = "split" and
      dollarCall.getReceiver().toString() = "location.hash" and
      nd.asExpr() = dollarCall
    ) 
  }
  override predicate isSink(DataFlow::Node nd) {
    exists(CallExpr dollarCall |
      dollarCall.getCalleeName() = "write" and
      dollarCall.getReceiver().toString() = "document" and
      nd.asExpr() = dollarCall.getArgument(0)
    )
  }
}
from XSSTracker pt, DataFlow::PathNode source, DataFlow::PathNode sink
where pt.hasFlowPath(source, sink)
select sink.getNode(), source, sink, "xss"
```
![](https://images.viblo.asia/4613895e-efa5-4259-8bf4-2cf597179bcf.png)