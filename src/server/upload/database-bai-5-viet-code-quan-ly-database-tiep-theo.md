Trường hợp sử dụng của `insert` là khi chúng ta tạo một danh mục mới trên giao diện quản lý blog. Lúc này biểu mẫu nhập liệu `<form>` có chứa các thành phần như ô nhập tên `name`, ô nhập các từ khóa liên quan `keywords`, khung soạn thảo nội dung `markdown`. Các dữ liệu thu được ở đây sẽ được gửi tới một `endpoint` đặc định để yêu cầu thêm bản ghi mới vào `database`.

Code xử lý của `route` tương ứng sẽ sử dụng `class Category` để tạo ra một `object` mô tả bản ghi mới và gọi thủ tục `insert` qua `manager`. Như vậy là chúng ta chỉ còn thiếu một trị số `id` mới - được quản lý bởi code `database` là hoàn thiện đủ nội dung của một bản ghi. Như vậy chúng ta sẽ có các tác vụ chia nhỏ cần xử lý:

- `/* generate new record's id */` - tạo ra một giá trị `id` mới
- `/* populate output */` - ghi dữ liệu hoàn chỉnh của bản ghi mới vào `out_inserted`
- `/* write to data folder */` - ghi dữ liệu của bản ghi mới vào thư mục `data/Category/`

```procedure/Category/insert--async-throw.js
const Category = require("../../type/Category");
const generateNewRecordId = require("../sub-procedure/generate-new-record-id--async-throw");
const writeDataToRecordFolder = require("../sub-procedure/write-data-to-record-folder--async-throw");

module.exports = async (
   in_submitted = new Category(),
   out_inserted = new Category()
) => { 
   try {
      /* --- generate new record's id */
      var generated = { recordId: null };
      await generateNewRecordId(Category.name, generated);

      /* --- populate output */
      Category.clone(in_submitted, out_inserted);
      out_inserted.set("@id", generated.recordId);

      /* --- write data to files */
      await writeDataToRecordFolder(Category.name, out_inserted);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

Các tác vụ xử lý chi tiết được ủy thác tới các thủ tục `sub-procedure` để có thể được sử dụng cho các Procedure khác nữa. Và để các `sub-procedure` có thể được tái sử dụng, chúng ta cần sử dụng một tham số định vị đối tượng dữ liệu ở các vị trí `Category.name` để logic bên trong các `sub-procedure` này có thể đáp ứng với từng kiểu bản ghi khác nhau.

Ví dụ như thủ tục `generateNewRecordId` khi được sử dụng để tạo `id` mới cho một bản ghi `Article` thì sẽ cần duyệt qua các thư mục của các bản ghi `Article` đang có; Và khi được sử dụng để tạo `id` mới cho một bản ghi `Category` thì sẽ cần duyệt qua các thư mục của các bản ghi `Category` đang có.

```procedure/Category/sub-procedure/generate-new-record-id--async-throw.js
const Article = require("../../type/Article");
const Category = require("../../type/Category");
const readAllRecordIds = require("./read-all-record-ids--async-throw");

module.exports = async (
   typeName = Map.name,
   out_generated = { recordId: null }
) => {
   try {
      /* --- collect all ids */
      var allRecordIds = [];
      await readAllRecordIds(in_typeName, allRecordIds);

      /* --- generate new id */
      var latestRecordId = allRecordIds.slice(0, -1).pop();
      var newRecordIdNumber = Number(latestRecordId) + 1;

      if (in_typeName== Article.name)
         out_generated.recordId = String(newRecordIdNumber).padStart(4, "0");
      else if (in_typeName== Category.name)
         out_generated.recordId = String(newRecordIdNumber).padStart(2, "0");
      else
         throw new Error("Kiểu dữ liệu bản ghi không được hỗ trợ");
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

Do chúng ta đã sử dụng các trị số `id` để làm tên thư mục dữ liệu của các bản ghi, vì vậy nên thao tác tách lấy các giá trị `id` có thể dừng ở bước đọc tên của các thư mục và chưa cần mở các tệp `header.json` bên trong. Ở đây chúng ta chỉ cần lưu ý về dạng của trị số `id` khi ghi dữ liệu vào `database` hoặc gửi cho trình duyệt web cần phải đồng nhất là dạng chuỗi `string` có hai chữ số đối với `Category` và bốn chữ số đối với `Article`.

Thao tác đọc và thu thập trị số `id` của tất cả các bản ghi có thể được hỗ trợ xử lý bởi `module` File System, tuy nhiên ở đây chúng ta có thể tách tác vụ đọc tên của các thư mục bản ghi thành một Sub-Procedure khác. Chẳng hạn khi viết code xử lý cho thao tác cập nhật hay xóa một bản ghi thì hiển nhiên chúng ta sẽ cần lặp qua tên của các thư mục bản ghi và chọn ra đúng tên thư mục cần cập nhật hoặc xóa.

```procedure/sub-procedure/read-all-record-ids--async-throw.js
module.exports = async (
   in_typeName = Map.name,
   out_allRecordIds = []
) => {
   try {
      /* --- collect all records' folder names */
      var allRecordFolderNames = [];
      await readAllRecordFolderNames(in_typeName, allRecordFolderNames);

      /* --- extract ids from folder names */
      for (var folderName of allRecordFolderNames) {
         var recordId = folderName.match(/(id-)(\w+)/).pop();
         out_allRecordIds.push(recordId);
      } // for .. of
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

Do chúng ta đã sử dụng tên thư mục chứa dữ liệu các bản ghi trong thư mục `data` có cùng tên với các `class` mô tả ở thư mục `type`. Chúng ta chỉ cần tạo ra đường dẫn thư mực tương ứng bằng cách gắn `in_typeName` vào sau vị trí của thư mục `data` trong chuỗi mô tả đường dẫn.

```procedure/sub-procedure/read-all-record-folder-names--async-throw.js
const fsPromises = require("fs/promises");
const path = require("path");

module.exports = async (
   in_typeName = Map.name,
   out_allRecordFolderNames = []
) => {
   try {
      var dataFolderPath = path.join(__dirname, "../../data", in_typeName);
      var dir = await fsPromises.opendir(dataFolderPath);
      
      for await (var dirEnt of dir) {
         out_allRecordFolderNames.push(dirEnt.name);
      } // for .. of
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

- [Tài liệu class fs.Dir](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#class-fsdir)
- [Tài liệu class fs.Dirent](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#class-fsdirent)

Bây giờ thì chúng ta đã có thể viết một vài dòng trong `test.js` để kiểm tra hoạt động của các Sub-Procedure hỗ trợ tạo `id` mới. Đầu tiên chúng ta sẽ kiểm tra thao tác đọc tên của tất cả các thư mục bản ghi `Category`.

```express-blog/test.js
const readAllRecordFolderNames = require("./database/procedure/sub-procedure/read-all-record-folder-names--async-throw");
const Category = require("./database/type/Category");

void async function() {
   var allFolderNames = [];
   await readAllRecordFolderNames(Category.name, allFolderNames);

   for (var folderName of allFolderNames) {
      console.log(folderName);
   }
} (); // void
```

```CMD|Terminal.io
npm test

[ 'id-00', 'id-01', 'id-Infinity' ]
```

Sau đó là kiểm tra thao tác tách lấy tất cả các giá trị `id` từ tên của các thư mục bản ghi.

```express-blog/test.js
const readAllRecordIds = require("./database/procedure/sub-procedure/read-all-record-ids--async-throw");
const Category = require("./database/type/Category");

void async function() {
   var allRecordIds = [];
   await readAllRecordIds(Category.name, allRecordIds);
   console.log( allRecordIds );
} (); // void
```

```CMD|Terminal.io
npm test

[ '00', '01', 'Infinity' ]
```

Vậy giá trị `id` tiếp theo sẽ được tạo ra là `'02'`.

```express-blog/test.js
const generateNewRecordId = require("./database/procedure/sub-procedure/generate-new-record-id--async-throw");
const Category = require("./database/type/Category");

void async function() {
   var generated = { recordId: null };
   await generateNewRecordId(Category.name, generated);
   console.log(generated);
} (); // void
```

```CMD|Terminal.io
npm test

{ recordId: '02' }
```

Sau khi đã có được `id` mới thì thao tác tiếp theo mà chúng ta cần xử lý là tạo ra một `object` mô tả một bản ghi `Category` hoàn chỉnh để ghi vào thư mục `data/Category/` và đồng thời là để dùng làm kết quả trả về cho code gọi thủ tục `insert`.

Công việc cần thực hiện ở thao tác này thì về cơ bản chỉ là sao chép nội dung từ `object` được gửi đến `in_submitted` vào `object` kết quả `out_inserted` và sau đó gắn thêm trị số `id` vừa mới được tạo ra ở bước trước đó. Ở đây chúng ta sẽ ủy thác việc sao chép nội dung từ `in_submitted` vào `out_inserted` cho một phương thức `static` của `class Category`.

```procedure/Category/insert--async-throw.js
/* requires ... */

module.exports = async (
   in_submitted = new Category(),
   out_inserted = new Category()
) => { 
   try {
      /* --- generate new record's id ... (done) */

      /* --- populate output */
      Category.clone(in_submitted, out_inserted);
      out_inserted.set("@id", generated.recordId);

      /* --- write to data folder ... */
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

```database/type/Category.js
const Category = class extends Map {
   /* ... */
   
   static clone(
      in_source = new Category(),
      out_target = new Category()
   ) {
      for (var entry of in_source) {
         var [key, value] = entry;
         out_target.set(key, value);
      }
      
      return Category;
   }
}; // Category
```

Sau đó viết code kiểm tra kết quả vận hành của phương thức `Category.copy()`.

```express-blog/test.js
const Category = require("./database/type/Category");

var source = new Category()
   .set("@id", "Infinity")
   .set("name", "webdev")
   .set("keywords", ["tutorial", "web"])
   .set("content", "Looonggg... content...");

var target = new Category();
Category.clone(source, target);

console.log(target);
```

```CMD|Terminal.io
npm test

Category(4) [Map] {
  '@id' => 'Infinity',
  'name' => 'webdev',
  'keywords' => [ 'tutorial', 'web' ],
  'content' => 'Looonggg... content...'
}
```

Tiếp theo là viết code cho Sub-Procedure ghi dữ liệu của bản ghi mới vào thư mục `data/Category/`.

```procedure/Category/insert--async-throw.js
/* requires ... */

module.exports = async (
   in_submitted = new Category(),
   out_inserted = new Category()
) => { 
   try {
      /* --- generate new record's id ... (done) */
      /* --- populate output ... (done) */

      /* --- write to data folder */
      await writeDataToRecordFolder(out_inserted);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

Nội dung chính của thao tác này gồm các bước là - tạo ra một thư mục cho bản ghi mới, và ghi dữ liệu vào các tệp `header.json` và `content.md`.

```procedure/Category/sub-procedure/write-data-to-record-folder--async-throw.js
const path = require("path");
const fsPromises = require("fs/promises");
const Category = require("../../type/Category");
const writeRecordHeaderToFile = require("./write-record-header-to-file--async-throw");
const writeRecordContentToFile = require("./write-record-content-to-file--async-throw");

module.exports = async (
   in_typeName = Map.name,
   in_record = new Category()
) => {
   try {
      /* --- prepare path to record's data folder */
      var recordFolderName = "id-" + in_record.get("@id");
      var recordFolderPath = path.join(__dirname, "../../data", in_typeName, recordFolderName);

      /* --- create folder for new record */
      await fsPromises.mkdir(recordFolderPath);

      /* --- write record's data to files */
      await writeRecordHeaderToFile(in_typeName, in_record, recordFolderPath);
      await writeRecordContentToFile(in_typeName, in_record, recordFolderPath);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

Thao tác ghi dữ liệu vào các tệp `header.json` và `content.md` sẽ cần thêm một chút sự chuẩn bị và có thể khiến code của Sub-Procedure này bị rối; Do đó chúng ta sẽ ủy thác tới các Sub-Procedure tương ứng với mỗi kiểu tệp cần ghi dữ liệu.

```procedure/Category/sub-procedure/write-record-header-to-file--async-throw.js
const Article = require("../../type/Article");
const Category = require("../../type/Category");
const path = require("path");
const fsPromises = require("fs/promises");

module.exports = async (
   in_type = Map.name,
   in_record = new Map(),
   in_recordFolderPath = ""
) => {
   try {
      var headerJSON = new Object();

      if (in_type == Article.name)
         Article.populateHeaderJSON(in_record, headerJSON);
      else if (in_type == Category.name)
         Category.populateHeaderJSON(in_record, headerJSON);
      else
         throw new Error("Kiểu dữ liệu bản ghi không hợn lệ");

      var headerText = JSON.stringify(headerJSON);
      var headerFilePath = path.join(in_recordFolderPath, "header.json");
      await fsPromises.writeFile(headerFilePath, headerText);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

```procedure/Category/sub-procedure/write-record-content-to-file--async-throw.js
const path = require("path");
const fsPromises = require("fs/promises");
const Article = require("../../type/Article");
const Category = require("../../type/Category");

module.exports = async (
   in_type = Map.name,
   in_record = new Map(),
   in_recordFolderPath = ""
) => {
   try {
      if (in_type == Article.name)
         { /* record type is valid */; }
      else if (in_type == Category.name)
         { /* record type is valid */; }
      else
         throw new Error("Kiểu dữ liệu bản ghi không hợp lệ.");

      var contentFilePath = path.join(in_recordFolderPath, "content.md");
      var recordContent = in_record.get("content");
      await fsPromises.writeFile(contentFilePath, recordContent);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

Thao tác ghi nội dung cho tệp `content.md` thực sự không có gì đặc biệt ngoài việc chuẩn bị đường dẫn tới tệp cần ghi. Tuy nhiên thao tác ghi nội dung cho `header.json` thì chúng ta cần chuyển phần `header` trong bản ghi `in_record` thành một chuỗi JSON. Và ở bước này thì chúng ta sẽ lại ủy thác cho một phương thức `static` của `class Category`.

```database/type/Category.js
const Category = class extends Map {
   /* ... */

   static populateHeaderJSON(
      in_source = new Category(),
      out_headerJSON = new Object()
   ) {
      for (var entry of in_source) {
         var [key, value] = entry;
         
         if (key == "content")
            { /* don't take content */; }
         else
            out_headerJSON[key] = value;
      } // for .. of
      
      return Category;
   }
}; // Category

module.exports = Category;
```

Bây giờ thì chúng ta đã có thể viết code để chạy thử các Sub-Procedure và thủ tục chính `insert`. Chúng ta sẽ xuất phát từ phương thức `Category.populateHeaderJSON()`:

```express-blog/test.js
const Category = require("./database/type/Category");

var record = new Category()
   .set("@id", "Infinity")
   .set("name", "webdev")
   .set("keywords", ["tutorial", "web"])
   .set("content", "Looonggg... content...");

var headerJSON = new Object();
Category.populateHeaderJSON(record, headerJSON);

console.log(headerJSON);
```

```CMD|Terminal.io
npm test

{ '@id': 'Infinity', name: 'webdev', keywords: [ 'tutorial', 'web' ] }
```

Trong kết quả in ra chúng ta đã thấy trường dữ liệu `content` không được sao chép sang `headerJSON`. Như vậy là kết quả ghi vào tệp `header.json` cũng đã được đảm bảo. Bây giờ chúng ta sẽ thử `insert` luôn một bản ghi `category` mới.

```express-blog/test.js
const Category = require("./database/type/Category");
const databaseManager = require("./database/manager");

void async function() {
   var newRecord = new Category()
      .set("@id", "Infinity")
      .set("name", "webdev")
      .set("keywords", ["tutorial", "web"])
      .set("content", "Looonggg... content...");

   var inserted = new Category();

   await databaseManager.execute(
      Category.name, "insert",
      newRecord, inserted
   );

   console.log(inserted);
} (); // void
```

```CMD|Terminal.io
npm test

Category(4) [Map] {
  '@id' => '02',
  'name' => 'webdev',
  'keywords' => [ 'tutorial', 'web' ],
  'content' => 'Looonggg... content...'
}
```

![](https://images.viblo.asia/cc951f9f-f7be-46a7-811c-732c5b734c8f.png)

Phù... như vậy là chúng ta đã thực hiện được thủ tục `insert` một bản ghi `Category` mới vào `database`. Và trong bài viết tiếp theo, chúng ta sẽ tiếp tục viết code cho các thủ tục còn lại bao gồm `select`, `update`, và `delete`.

[[Database] Bài 6 - VIết Code Quản Lý Database (Tiếp Theo)](https://viblo.asia/p/RnB5pAM2KPG)