Trong bài viết này, chúng ta sẽ cùng bắt đầu thực hiện công việc viết code quản lý một `database` đơn giản cho trang blog cá nhân mà chúng ta đang xây dựng. Tuy nhiên, mình muốn lưu ý một chút về `convention` trong việc viết code xử lý `database` trước khi bắt tay vào viết code.

Code quản lý `database` sẽ được viết chủ đạo trên nền [`PP (Procedural Programming)`](https://viblo.asia/p/Eb85oAw2Z2G), với các thủ tục `procedure` thao tác `nhập/xuất` trên các tệp dữ liệu. Các kết quả thu được khi thực hiện các `procedure` sẽ được trả về ở dạng hiệu ứng biên `side-effect` - tức là thay đổi nội dung của một `object` được truyền vào thay vì sử dụng lệnh `return`.

Các tham số của `procedure` sẽ được chia làm 2 nhóm là:

- `in_` - các tham số truyền dữ liệu vào và sẽ không bị thay đổi.
- `out_` - các tham số nhận kết quả khi `procedure` được thực thi.

```procedure.js
const selectCategoryById = async (
   in_recordId = "Infinity",
   out_selected = new Map()
) => {
   // truy vấn dữ liệu từ các tệp...
   // gắn dữ liệu vào object kết quả
   out_selected.set("@id", in_recordId);
   out_selected.set("name", "html");
};

var selected = new Map();
await selectCategoryById("01", selected);
console.log(selected);

// Category(2) [Map] {
//    '@id' => '01',
//    'name' => 'html'
// }
```

Do hầu hết các `procedure`  ở đây đều làm việc với các tệp và chúng ta đã thảo luận từ trước là sẽ dùng các thao tác `async`, vì vậy nên khi nào nhìn thấy từ khóa `async` thì chúng ta sẽ ngầm định là Procedure. Trong trường hợp không phải là thao tác `async` thì mình sẽ ghi `/* procedure */` thay vào vị trí của từ khóa đó.

Các hàm (nếu cần sử dụng) - cũng sẽ được viết với cú pháp `=>` và sử dụng `/* function */` thay vào vị trí `async` ở trên. Tuy nhiên, khi sử dụng khái niệm hàm, chúng ta sẽ không có các tham số `in_` và `out_`, mà tất cả đều sẽ được ngầm định là `in_` và được áp dụng từng phần khi gọi hàm; Đồng thời, các hàm sẽ luôn luôn sử dụng lệnh `return` để trả về kết quả và không tạo ra `side-effect` nào đối với các yếu tố bên ngoài hàm. Đồng thời khi định nghĩa hàm mình cũng sẽ bỏ đi tất cả các dấu `;`.

```function.js
const sumOf = /* function */
   (a = 0) =>
   (b = 0) =>
      {  var sum = a + b
         return sum
      }

var nine = sumOf(1)(8)
console.log(nine)   // 9
```

Các `class` tự định nghĩa cũng sẽ được khai báo ở dạng gán vào một hằng `const` giống với các `procedure` và `function`. Đồng thời, tất cả các phương thức định nghĩa trong `class` sẽ đều mặc định `return this` khi kết thúc - hoặc `return ClassName` nếu là phương thức `static`.

```class.js
const Article = class extends Map {
   nonStaticMethod() {
      /* do something */ ;
      return this;
   }

   static clone() {
      /* do something */ ;
      return Article;
   }
}; // Article
```

## Cấu trúc thư mục database

Chúng ta sẽ khởi đầu với các nhóm dữ liệu bài viết `article` và danh mục `category`; Và thư mục `database` của chúng ta sẽ có cấu trúc cơ bản như thế này -

```structure.txt
[express-blog]
.  |
.  +-----[database]
.  |        |
.  |        +-----[data]
.  |        |        |
.  |        |        +-----[Article]
.  |        |        +-----[Category]
.  |        |
.  |        +-----[procedure]
.  |        |        |
.  |        |        +-----[Article]
.  |        |        +-----[Category]
.  |        |
.  |        +-----[type]
.  |        |        |
.  |        |        +-----Article.js
.  |        |        +-----Category.js
.  |        |
.  |        +-----manager.js
.  |
.  +-----test.js
```

Các tệp dữ liệu như chúng ta vẫn quy ước trước đó là đặt trong thư mục `data`, với các bản ghi được xếp thành các nhóm `Article` và `Category`. Khi các bản ghi được truy xuất vào môi trường vận hành code sẽ cần được chuyển thành các `object`; Và do đó nên chúng ta có thêm các `class` mô tả tương ứng được đặt trong thư mục `type`.

Cuối cùng là các tệp code định nghĩa các thủ tục thao tác trong `database` được đặt trong thư mục `procedure` và sẽ được tổng kết tại `manager.js`. Code ở bên ngoài sẽ chỉ sử dụng các phương thức do `manager` cung cấp và các `class` trong thư mục `type` chứ không chạm vào bất kỳ thành phần nào khác trong thư mục `database`.

## Các bản ghi và cấu trúc các tệp dữ liệu

Đối với mỗi bản ghi thuộc bất kỳ kiểu dữ liệu nào - `Article`, `Category`, `Admin`, v.v... - sẽ có một thư mục đại diện với tên thư mục ở dạng `id-1001` và bên trong thư mục này sẽ gồm một tệp `header.json` và một tệp `content.md`. Trong đó thì tệp `header.json` sẽ chứa các thông tin dạng ngắn `metadata`, còn tệp `content.md` sẽ chứa nội dung văn bản `data` của trang đơn mô tả cho bản ghi đó trên bề mặt web (nếu có).

```structure.txt
[data]
.  |
.  +-----[Article]
.  |        |
.  |        +-----[id-0000]
.  |                 |
.  |                 +-----header.json
.  |                 +-----content.md
.  |
.  +-----[Category]
.           |
.           +-----[id-00]
.                    |
.                    +-----header.json
.                    +-----content.md
```

Các bản ghi `Article` sẽ có tệp `header.json` với nội dung dạng này -

```data/Article/id-0000/header.json
{
   "@id": "0001",
   "title": "Làm Thế Nào Để Tạo Ra Một Trang Web?",
   "short-title": "Giới Thiệu Mở Đầu",
   "keywords": [
      "hướng dẫn cơ bản",
      "lập trình web",
      "html",
      "giới thiệu"
   ],
   "edited-datetime": "Sat, 16 Apr 2022 10:13:22 GMT",
   "category-id": "01"
}
```

Ở đây `@id` là giá trị `id` được lưu trong tên thư mục của bản ghi này. Nội dung của tệp `content.md` thì chỉ đơn giản là văn bản dài có chứa mã `markdown` của Github nên chúng ta không có gì để lưu ý. Khi bản ghi `article` này được truy vấn `đầy đủ` và đưa vào môi trường vận hành code thì chúng ta sẽ có một `object` như sau:

```article.js
var firstHTMLArticle = {
   "@id": "0001",
   "title": "Làm Thế Nào Để Tạo Ra Một Trang Web?",
   "short-title": "Giới Thiệu Mở Đầu",
   "keywords": [
      "hướng dẫn cơ bản",
      "lập trình web",
      "html",
      "giới thiệu"
   ],
   "edited-datetime": "Sat, 16 Apr 2022 10:13:22 GMT",
   "category-id": "01",
   "content": "Đây là nội dung của bài viết đầu tiên..."
}
```

Còn đây là nội dung tệp `header.json` của một danh mục `Category`:

```data/Category/id-02/header.json
{
   "@id": "02",
   "name": "css",
   "keywords": [
      "hướng dẫn cơ bản",
      "lập trình web"
   ]
}
```

Bạn có thể chuẩn bị trước nội dung ngắn gọn cho một vài bản ghi hoặc `copy/paste` từ các liên kết dưới đây:

- `database/data/Article`
    - [id-0000/header.json](https://gist.github.com/semiarthanoian/8db07796e9b3d9450394edcc77137896)
    - [id-0000/content.md](https://gist.github.com/semiarthanoian/9c86fffa7d7451c026ad9ca91ddbc4cf)
    - [id-0001/header.json](https://gist.github.com/semiarthanoian/3c8c5bbe1e6419e830ea56f87a6432bc)
    - [id-0001/content.md](https://gist.github.com/semiarthanoian/de83d9d4c08ac1fc85595181b5994a94)
    - [id-Infinity/header.json](https://gist.github.com/semiarthanoian/f98c76005dca1de4be733de4700d87b5)
    - [id-Infinity/content.md](https://gist.github.com/semiarthanoian/2b67181c32029e643e7472c4958fa2e7)
- `database/data/Category`
    - [id-00/header.json](https://gist.github.com/semiarthanoian/04b64e228aa9a84c359dce21b08225a4)
    - [id-00/content.md](https://gist.github.com/semiarthanoian/d97a8fb3116687b1fc0b9895117fc0c1)
    - [id-01/header.json](https://gist.github.com/semiarthanoian/5f5066ceb041a952c52a643fb46a3fc1)
    - [id-01/content.md](https://gist.github.com/semiarthanoian/e023bc3c200fe13326c4e6bcead7f5ca)
    - [id-Infinity/header.json](https://gist.github.com/semiarthanoian/5a9a750af4041bdcfbbedabcb9c15e77)
    - [id-Infinity/content.md](https://gist.github.com/semiarthanoian/57642b0ec76a674a6ad0aa5ecb56d2f3)

Ở đây mình cũng xin lưu ý một chút về `convention` sử dụng các bản ghi đặc biệt là `id-00`, `id-0000`, `id-Infinity`, Đối với bản thân mình thì số `0` và giá trị `Infinity` rất đặc biệt và mình thường ưu tiên sử dụng các `id` này để làm các bản ghi mặc định cho một số nội dung đặc biệt. Cụ thể là `Article/id-0000` được mình sử dụng làm bài viết giới thiệu về blog và đặt trong trang `/about` hoặc Trang Chủ `/`; Còn `Article/id-Infinity` được mình sử dụng làm bài viết dự phòng và thông báo ngoại lệ trong trường hợp không tìm thấy nội dung phù hợp với yêu cầu nhận được.

Vì lý do này nên trong một số thao tác làm việc với `database` - ví dụ như tạo ra một giá trị `id` cho một bản ghi mới, trong code ví dụ minh họa ở đây bạn sẽ thấy mình có viết thêm một thao tác để chọn trị số `id` của bản ghi đứng trước bản ghi `Infinity` và thực hiện tăng giá trị. Còn nếu bạn không sử dụng Convention như mình và không có bản ghi `Infinity` thì chỉ việc chọn `id` của bản ghi mới nhất và tăng giá trị lên thôi. :D

## Các Class mô trả dữ liệu

Các `procedure` về cơ bản là code thực hiện tương tác giữa môi trường vận hành và các tệp tĩnh; Do đó nên trước hết chúng ta sẽ cần chuẩn bị trước các `class` mô tả các bản ghi trong môi trường phần mềm. Đối với mỗi nhóm các bản ghi thì chúng ta nên có tên `class` riêng và vì vậy nên chúng ta sẽ có hai `class` là - `Article` và `Category`.

Về cơ bản thì các `class` này đều không có gì đặc biệt và chỉ đơn giản là được sử dụng tạo ra các `object` chung chuyển dữ liệu. Đối với nhu cầu sử dụng như thế này thì chúng ta có [`class Map`](https://viblo.asia/p/LzD5dR60ZjY) đã được thiết kế sẵn với nhiều tính năng tiện ích phù hợp. Và đầu tiên là code cho `class Article extends Map` -

```database/type/Article.js
const Article = class extends Map {
   constructor(...params) {
      super(...params);
      
      for (var key of Article.fieldNames) {
         if (this.has(key))
            { /* do nothing */; }
         else
            this.set(key, null);
      } // for .. of
      
      return this;
   }

   static fieldNames = [
      "@id",
      "title",
      "short-title",
      "keywords",
      "edited-datetime",
      "category-id",
      "content"
   ];
}; // Article

module.exports = Article;
```

Giống với việc sử dụng các `class` tự định nghĩa thông thường, sau khi kế thừa `Map` chúng ta cần khởi tạo các `thuộc tính` - hay các `trường dữ liệu` - tương ứng với các bản ghi bằng cách tạo một phương thức có tên là `initialize(key)`. Phương thức này sẽ kiểm tra sự tồn tại của các khóa `key` và khởi tạo những thuộc tính còn thiếu khi code bên ngoài sử dụng `new Article(...entries)`. Và tương tự thì chúng ta có định nghĩa `class Category`.

```database/type/Category.js
const Category = class extends Map {
   constructor(...params) {
      super(...params);
      
      for (var key of Category.fieldNames) {
         if (this.has(key))
            { /* do nothing */; }
         else
            this.set(key, null);
      } // for .. of
      
      return this;
   }

   static fieldNames = [
      "@id",
      "name",
      "keywords",
      "content"
   ];
}; // Category

module.exports = Category;
```

Rồi... như vậy là đã tạm đủ chất liệu cho các `procedure` làm việc. Bây giờ chúng ta sẽ tiến hành viết code cho các `procedure`; Khi nào cần bổ sung hoặc chỉnh sửa gì đó ở các `class` này thì chúng ta sẽ quay lại xử lý thêm sau. Trong bài viết này thì chúng ta sẽ tập trung cho các `procedure` làm việc trên các bản ghi `Category` trước. Lý do thì là vì các bản ghi `article` có sự lệ thuộc vào các bản ghi `Category` như chúng ta đã nói trong bài trước.

## Các thủ tục cơ bản

Mặc dù mục đích sử dụng phần mềm `server` ở lớp bên ngoài rất đa dạng. Nhưng khi tương tác với `database` thì về cơ bản chúng ta sẽ chỉ có 4 kiểu thao tác -

- `insert` - thêm một ghi mới vào `database`.
- `select` - lấy ra một bản ghi để xem thông tin.
- `update` - cập nhật dữ liệu của một ghi đã có.
- `delete` - xóa một bản ghi trong `database`.

Và chúng ta sẽ khởi đầu với các `procedure` tương ứng thực hiện thao tác trên một bản ghi đơn. Các thao tác phức tạp hơn (nếu cần thiết) - sẽ có thể sử dụng các `procedure` này làm chất liệu.

```structure.txt
[database]
.  |
.  +-----[procedure]
.  |        |
.  |        +-----[sub-procedure]
.  |        |
.  |        +-----[Article]
.  |        +-----[Category]
.  |                 |
.  |                 +-----insert--async-throw.js
.  |                 +-----select-by-id--async-throw.js
.  |                 +-----update--async-throw.js
.  |                 +-----delete-by-id--async-throw.js
.  |
.  +-----manager.js
```

Mình thường có thói quen ghi chú trong tên tệp một vài yếu tố mà mình quan tâm ở phía cuối; Vì vậy nên tên các tệp trong ví dụ mình ghi có hơi dài một chút. Bạn có thể đặt tên tệp theo cách hiểu của bạn là được, điểm này không quan trọng lắm nên bạn đừng bận tâm nhé. :D

Về cơ bản thì các `procedure` đều phải thực hiện các thao tác nhập/xuất liên quan tới các tệp nên thường sẽ là các thao tác `async`, và nếu có ngoại lệ phát sinh khi tương tác với các tệp dữ liệu thì chúng ta sẽ `throw`ra ngoài cho code xử lý `route`. Bởi vì code quản lý `database` về cơ bản là một phần mềm plug-in thụ động - được sử dụng bởi code logic điều hành của `route` ở phía bên ngoài; Do đó nên việc xử lý các ngoại lệ thế nào để phản hồi cho trình duyệt web thì hiển nhiên là không thể xử lý ở tầng này được.

Do các `procedure` của chúng ta đều phải thực hiện các thao tác có nhiều bước và chắc chắn sẽ cần chia thành các tác vụ nhỏ. Ở đây chúng ta sẽ tạo sẵn một thư mục `sub-procedure` để lưu trữ code xử lý các tác vụ chia nhỏ và có thể được sử dụng chung cho các `procedure` chính.

Bây giờ thì chúng ta sẽ khai báo đơn giản và tổng kết các `procedure` này tại `manager.js` để code bên ngoài có thể sử dụng được:

```database/procedure/Category/insert--async-throw.js
const Category = require("../../type/Category");

module.exports = async (
   in_submitted = new Category(),
   out_inserted = new Category()
) => {
   console.log("insert-category");
   console.log(`in_submitted: ${in_submitted}`);
   console.log(`out_inserted: ${out_inserted}`);
};
```

```database/procedure/Category/select-by-id--async-throw.js
const Category = require("../../type/Category");

module.exports = async (
   in_recordId = "Infinity",
   out_selected = new Category()
) => {
   console.log("select-category-by-id");
   console.log(`in_recordId: ${in_recordId}`);
   console.log(`out_selected: ${out_selected}`);
};
```

```database/procedure/Category/update--async-throw.js
const Category = require("../../type/Category");

module.exports = async (
   in_record = new Category(),
   out_updated = new Category()
) => {
   console.log("update-category");
   console.log(`in_record: ${in_record}`);
   console.log(`out_updated: ${out_updated}`);
};
```

```database/procedure/Category/delete-by-id--async-throw.js
const Category = require("../../type/Category");

module.exports = async (
   in_recordId = "Infinity",
   out_deleted = new Category()
) => {
   console.log("delete-category-by-id");
   console.log(`in_recordId: ${in_recordId}`);
   console.log(`out_deleted: ${out_deleted}`);
};
```

```database/manager.js
const Article = require("../database/type/Article");
const Category = require("../database/type/Category");

const articleProcedure = new Map()
   .set("insert", require("../database/procedure/Article/insert--async-throw"))
   .set("select-by-id", require("../database/procedure/Article/select-by-id--async-throw"))
   .set("update", require("../database/procedure/Article/update--async-throw"))
   .set("delete-by-id", require("../database/procedure/Article/delete-by-id--async-throw"));

const categoryProcedure = new Map()
   .set("insert", require("../database/procedure/Category/insert--async-throw"))
   .set("select-by-id", require("../database/procedure/Category/select-by-id--async-throw"))
   .set("update", require("../database/procedure/Category/update--async-throw"))
   .set("delete-by-id", require("../database/procedure/Category/delete-by-id--async-throw"));

const storedProcedure = new Map()
   .set(Article.name, articleProcedure)
   .set(Category.name, categoryProcedure);

exports.execute = async ( 
   typeName, procedureName,
   ...parameters
) => {
   await storedProcedure
      .get(typeName)
      .get(procedureName)
      .call(null, ...parameters);
}; // exports.execute
```

Ở đây chúng ta tạo ra một `object manager` đại diện cho phần mềm quản lý `database` với một phương thức duy nhất là `execute()` (thực thi) để tìm và gọi một Procedure trong các nhóm Procedure chính `procedure/Article`  và `procedure/Category`.

Cú pháp cơ bản của `execute()` sẽ yêu cầu các thành phần lần lượt là `typeName -> procedureName -> parameters`:

- `typeName` - tên của kiểu bản ghi cần thực hiện thủ tục truy vấn hoặc chỉnh sửa.
- `procedureName` - tên của thủ tục cần áp dụng.
- `parameters` - mảng chứa các tham số sử dụng cho thủ tục được chọn.

Ở phía trên thì mình chỉ liệt kê code mockup của các thao tác cơ bản thuộc nhóm `procedure/Category`. Để code có thể hoạt động được thì bạn copy/paste và đổi lại tên thư mục và một số yếu tố trong code để khởi tạo nhóm `procedure/Article` nhé.

Sau đó chúng ta có thể viết một vài dòng trong `test.js` và chạy lệnh `npm test` để xem `manager` đã được kết nối với các tệp `procedure` ổn chưa:

```express-blog/test.js
const Category = require("./database/type/Category");
const databaseManager = require("./database/manager");

void async function() {
   console.log("==========");
   await databaseManager.execute(
      Category.name, "insert",
      "a-new-category", "inserted"
   );

   console.log("==========");
   await databaseManager.execute(
      Category.name, "select-by-id",
      "id-00", "selected"
   );

   console.log("==========");
   await databaseManager.execute(
      Category.name, "update",
      "a-category", "updated"
   );

   console.log("==========");
   await databaseManager.execute(
      Category.name, "delete-by-id",
      "id-00", "deleted"
   );
} (); // void
```

![](https://images.viblo.asia/80e4e2d6-4333-4e40-ab87-028924b28adf.png)

Và bây giờ thì chúng ta sẽ bắt đầu viết code xử lý chi tiết cho từng `procedure`. Tuy nhiên thì bài viết của chúng ta tới đây thực sự là đã hơi dài quá rồi, vì vậy nên... Trong bài viết tiếp theo, chúng ta sẽ cùng viết code xử lý chi tiết cho thao tác `insert`.

[[Database] Bài 5 - Viết Code Quản Lý Database (Tiếp Theo)](https://viblo.asia/p/Eb85oAn0Z2G)