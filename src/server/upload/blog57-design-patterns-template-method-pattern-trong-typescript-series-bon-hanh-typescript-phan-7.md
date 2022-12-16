![image.png](https://images.viblo.asia/94da03b5-13f1-4954-87d9-4d4c35085ee3.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Chào mừng bạn đến với loạt bài **Design Patterns trong TypeScript**, tại đây mình giới thiệu một số Design Patterns hữu ích trong phát triển web bằng TypeScript.

Các Design Patterns rất quan trọng đối với các web developer và chúng ta có thể code tốt hơn bằng cách thành thạo chúng. Trong bài viết này, mình sẽ sử dụng **TypeScript** để giới thiệu **Template Method Pattern.**

Kịch bản thưởng gặp
----

CSV (Comma-Separated Values - Các value được phân tách bằng dấu phẩy) là định dạng tệp tương đối đơn giản. Tệp CSV lưu trữ dữ liệu dạng bảng (numbers and text) ở dạng văn bản thuần túy. Khi bạn cần xử lý dữ liệu CSV, quy trình xử lý tương ứng được hiển thị trong hình sau:

![image.png](https://images.viblo.asia/e34fb047-643a-4690-ac79-dd7c1f0b78a2.png)

Sau khi hiểu được quy trình xử lý trên, chúng ta hãy sử dụng Node.js để implement function **Parsing** tệp csv.

**users.csv**

```
id,Name
1,Bytefer
2,Kakuqo
```

**parse-csv.ts**

```javascript
import fs from "fs";
import path from "path";
import * as url from "url";
import { csvParse } from "d3-dsv";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const processData = (fileData: any[]) => console.dir(fileData);
const content = fs.readFileSync(path.join(__dirname, "users.csv"), "utf8");
const fileData = csvParse(content);
processData(fileData);
```

Trong đoạn code trên, chúng ta import mô-đun [d3-dsv](https://github.com/d3/d3-dsv) để implement function Parsing csv. Sau đó, chúng ta sử dụng [esno](https://github.com/esbuild-kit/esno) để thực thi tệp **parse-cvs.ts** :

```console
$ npx esno parse-csv.ts
```

Khi đoạn code trên chạy thành công, terminal sẽ xuất ra kết quả như sau:

```console
[
  { id: '1', Name: 'Bytefer' },
  { id: '2', Name: 'Kakuqo' },
  columns: [ 'id', 'Name' ]
]
```

Tiếp theo, Markdown là một ngôn ngữ đánh dấu văn bản nhẹ cho phép mọi người viết tài liệu ở định dạng văn bản thuần túy, dễ đọc và dễ viết. Để hiển thị tài liệu Markdown trên các trang web, chúng ta phải chuyển đổi tài liệu Markdown thành tài liệu HTML.

Để thực hiện được function trên, quy trình xử lý của chúng ta như sau:

![image.png](https://images.viblo.asia/b0d9c788-a162-4593-8aee-66e9c3465f5b.png)

Sau khi hiểu được quy trình xử lý trên, chúng ta hãy sử dụng Node.js để implement function Parsing Markdown.

**Users.md**

```
### Users
- Bytefer
- Kakuqo
```

**parse-md.ts**

```javascript
import fs from "fs";
import path from "path";
import * as url from "url";
import { marked } from 'marked';
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const processData = (fileData: any[]) => console.dir(fileData);
const content = fs.readFileSync(path.join(__dirname, "Users.md"), "utf8");
const fileData = marked.parse(content);
processData(fileData);
```

Trong đoạn code trên, chúng ta import mô-đun [marked](https://github.com/markedjs/marked) để thực hiện function Parsing Markdown. Sau đó, chúng ta lại sử dụng [esno](https://github.com/esbuild-kit/esno) để thực thi tệp **parse-md.ts** :

```
$ npx esno parse-md.ts
```

Khi đoạn code trên chạy thành công, terminal sẽ xuất ra kết quả như sau:

```console
'<h3 id="users">Users</h3>\n<ul>\n<li>Bytefer</li>\n<li>Kakuqo</li>\n</ul>\n'
```

Đối với hai ví dụ trước, mặc dù các loại tệp khác nhau được Parsing, nhưng bạn sẽ thấy rằng quá trình Parsing của chúng là tương tự nhau.

![image.png](https://images.viblo.asia/7b46f729-56ed-434e-959a-428b4b97db3f.png)

Toàn bộ quá trình chủ yếu bao gồm ba bước: **đọc, Parsing và xử lý dữ liệu**. Đối với kịch bản này, chúng ta có thể apply **Template Method Pattern** để gói gọn trình tự xử lý của ba bước trên.

Template Method Pattern
-----

**Template Method Pattern** bao gồm hai phần: **một abstract parent class và một implementation subclass cụ thể**. Thông thường, khung thuật toán của **subclass** được đóng gói trong **abstract parent class** và nó cũng bao gồm việc thực hiện một số hàm public và thứ tự thực hiện của tất cả các hàm trong subclass được đóng gói. Bằng cách kế thừa **abstract class** này, các **subclass** cũng kế thừa toàn bộ cấu trúc thuật toán và có thể chọn ghi đè các hàm của **parent class**.

Tiếp theo, hãy xem cách implement trình Parsing CSV và Parsing Markdown bằng cách sử dụng Template Method Pattern.

Để hiểu rõ hơn về đoạn code sau, trước tiên chúng ta hãy xem sơ đồ lớp UML tương ứng:

![image.png](https://images.viblo.asia/0b9bed00-b1f2-441d-9935-d8e03bab7a7d.png)

Trong hình trên, chúng ta định nghĩa một abstract class `FileParser` và sau đó định nghĩa hai subclass, `CsvParser` và `MarkdownParser`, tương ứng.

**FileParser class**

```javascript
abstract class FileParser {
  // Template Method
  parse(filePath: string) {
    let content = this.readFile(filePath);
    let fileData = this.parseFile(content);
    this.processData(fileData);
  }
  readFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
  }
  abstract parseFile(fileContent: string): any;
  processData(fileData: any[]) {
    console.log(fileData);
  }
}
```

Phương thức `parse` trong abstract class `FileParser` được gọi là **Template method**, trong đó chúng ta đóng gói quá trình xử lý tệp.

**CsvParser class**

class CsvParser extends FileParser {
  parseFile(fileContent: string) {
    return csvParse(fileContent);
  }
}

**MarkdownParser class**

class MarkdownParser extends FileParser {
  parseFile(fileContent: string) {
    return marked.parse(fileContent);
  }
}

Với hai lớp `CsvParser` và `MarkdownParser`, chúng ta có thể Parsing CSV và Markdown theo các cách sau:

```javascript
const csvParser = new CsvParser();
csvParser.parse(path.join(__dirname, "Users.csv"));

const mdParser = new MarkdownParser();
mdParser.parse(path.join(__dirname, "Users.md"));
```

Khi bạn chạy thành công đoạn code trên, output tương ứng được hiển thị trong hình sau:

![image.png](https://images.viblo.asia/1ee97422-e00a-442d-b07f-7e345423bc9a.png)

Bằng cách sử dụng Template Method Pattern, chúng ta đã implement lại việc Parsing CSV và Markdown. Trên thực tế, với abstract class `FileParser`, chúng ta có thể dễ dàng phát triển các chức năng Parsing cú pháp tệp khác nhau mà ko cần sửa Abstract class.

Các tình huống sử dụng của Template Method Pattern:

*   Các bước tổng thể của thuật toán là rất cố định, nhưng khi các phần riêng lẻ có thể thay đổi, Template Method Pattern có thể được sử dụng tại thời điểm này để trừu tượng hóa các phần dễ thay đổi cho các subclass thực hiện.

Các vấn đề tương tư như trên cũng hoàn toàn giải quyết được bằng **Dependency Injection Pattern**. Tương lai mình cũng sẽ có bài viết về chủ đề này các bạn nhớ đón xem nhé.

Roundup
----
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
----
* https://tuan200tokyo.blogspot.com/2022/12/blog57-design-patterns-template-method.html