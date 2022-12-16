Tới bây giờ thì chúng ta đã khá quen thuộc với cấu trúc thư mục và việc phân chia các tác vụ nhỏ Sub-Procedure rồi; Do đó nên trong bài viết này chúng ta sẽ đi nhanh qua các Procedure cơ bản còn lại là `select`, `update`, và `delete`. Hãy cùng bắt đầu với thủ tục `select`.

## select

Chính xác hơn thì là `select-by-id` - đây là thủ tục `select` cơ bản nhất và có thể được sử dụng để làm chất liệu cho các Procedure khác phức tạp hơn. Về cơ bản thì ở đây chúng ta chỉ cần thực hiện một vài bước như sau:

- Tìm đường dẫn tới thư mục bản ghi tương ứng với `id` được cung cấp
- Đọc dữ liệu từ các tệp `header.json` và `content.md` để nạp vào `object` kết quả thuộc `class Category`.

```javascript:procedure/Category/select-by-id--async-throw.js
const findRecordFolderPathById = require("../sub-procedure/find-record-folder-path-by-id--async-throw");
const readRecordHeader = require("../sub-procedure/read-record-header--async-throw");
const readRecordContent = require("../sub-procedure/read-record-content--async-throw");
const Category = require("../../type/Category");

module.exports = async (
   in_recordId = "Infinity",
   out_selected = new Category()
) => {
   try {
      /* --- find record's folder path */
      var found = { recordFolderPath: null };
      await findRecordFolderPathById(Category.name, in_recordId, found);

      /* --- read record's header and content */
      await readRecordHeader(found.recordFolderPath, out_selected);
      await readRecordContent(found.recordFolderPath, out_selected);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

Việc tìm kiếm đường dẫn tới thư mục bản ghi tương ứng thì chỉ đơn giản là chúng ta đọc tên của tất cả các thư mục và lọc ra kết quả phù hợp thôi. Để thu thập đường dẫn thư mục của tất cả các bản ghi thì chúng ta có thể sử dụng lại Sub-Procedure `read-all-record-folder-names` đã viết trước đó. Còn thao tác lọc ra kết quả phù hợp thì chúng ta sẽ sử dụng vòng lặp `for` để phù hợp với tinh thần Procedural Programming thay vì sử dụng phương thức lặp `.forEach()` của mảng.

```javascript:procedure/sub-procedure/find-record-folder-path-by-id--async-throw.js
const readAllRecordFolderNames = require("./read-all-record-folder-names--async-throw")
const path = require("path")

module.exports = async (
   in_type = Map.name,
   in_recordId = "Infinity",
   out_found = { recordFolderPath: "" }
) => {
   try {
      var allRecordFolderNames = []
      await readAllRecordFolderNames(in_type, allRecordFolderNames)

      /* --- search for matched folder name */
      var matchedFolderName = ""
      for (var folderName of allRecordFolderNames) {
         if (folderName.includes(in_recordId))
            matchedFolderName = folderName;
         else
            continue /* searching */;
      } // for

      /* --- populate output path if found matched */
      if (matchedFolderName == "")
         { /* do nothing */; }
      else
         out_found.recordFolderPath = path.join(
            __dirname, "../../data", in_type, matchedFolderName
         ); // out_found
   }
   catch (error) {
      throw error
   }
} // module.exports
```

Việc viết code chạy thử các Sub-Procedure thì mình sẽ lược giản bớt và ở đây chúng ta sẽ chỉ viết code chạy thử các Procedure chính để duy trì nội dung bài viết gọn gàng hơn. Sau khi đã tìm được đường dẫn `path` tới thư mục của bản ghi tương ứng, chúng ta tiến hành đọc các tệp dữ liệu và nạp vào `object` kết quả. Tuy nhiên đối với các thao tác đọc nội dung từ các tệp, chúng ta cần đảm bảo rằng kết quả thu được sẽ ở dạng văn bản với mã `encoding` là `utf-8`.

```javascript:procedure/sub-procedure/read-record-header--async-throw.js
const fsPromises = require("fs/promises");
const path = require("path");

module.exports = async (
   in_recordFolderpath = "",
   out_record = new Map()
) => {
   try {
      var headerFilePath = path.join(in_recordFolderpath, "header.json");
      var headerText = await fsPromises.readFile(headerFilePath, {encoding: "utf-8"});
      var headerObject = JSON.parse(headerText);
      var headerEntries = Object.entries(headerObject);

      for (var entry of headerEntries) {
         var [key, value] = entry;
         out_record.set(key, value);
      } // for
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

```javascript:procedure/sub-procedure/read-record-content--async-throw.js
const fsPromises = require("fs/promises");
const path = require("path");

module.exports = async (
   in_recordFolderPath = "",
   out_record = new Map()
) => {
   try {
      var contentFilePath = path.join(in_recordFolderPath, "content.md");
      var recordContent = await fsPromises.readFile(contentFilePath, {encoding: "utf-8"});
      out_record.set("content", recordContent);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

Và bây giờ thì chúng ta đã có thể viết code chạy thử thủ tục `select-by-id`.

```javascript:express-blog/test.js
const Category = require("./database/type/Category");
const databaseManager = require("./database/manager");

void async function() {
   var selected = new Category();
   await databaseManager.execute(
      Category.name, "select-by-id",
      "02", selected
   );

   console.log(selected);
} (); // void
```

```rust:CMD|Terminal.io
npm test

Category(4) [Map] {
  '@id' => '02',
  'name' => 'webdev',
  'keywords' => [ 'tutorial', 'web' ],
  'content' => 'Looonggg... content...'
}
```

## update

Trường hợp sử dụng của `update` là khi chúng ta mở một bài viết đã đăng tải trước đó để chỉnh sửa nội dung và sau đó lưu lại. Lúc này thông tin được gửi về `server` sẽ là các cặp `key/value` của một `object Category`. Code xử lý của `route` tương ứng sẽ tạo ra một `object` bản ghi thuộc `class Category` và gọi thủ tục `update`.

```javascript:procedure/Category/update--async-throw.js
const writeDataToRecordFolder = require("../sub-procedure/write-data-to-record-folder--async-throw");
const Category = require("../../type/Category");

module.exports = async (
   in_record = new Category(),
   out_updated = new Category()
) => {
   try {
      Category.clone(in_record, out_updated);
      await writeDataToRecordFolder(Category.name, in_record);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

So với `insert` thì ở đây chúng ta không cần thực hiện thao tác khởi tạo giá trị `id` mới. Tuy nhiên ở đây chúng ta sẽ cần sửa lại `sub-procedure` ghi dữ liệu vào thư mục bản ghi mà chúng ta đã định nghĩa trước đó. Trường hợp lúc này là chúng ta đã có thư mục tương ứng với bản ghi cần cập nhật và thao tác `fsPromises.mkdir(recordPath)` trong code mà chúng ta đã viết dưới đây sẽ báo lỗi là "thư mục đã tồn tại".

```javascript:procedure/sub-procedure/write-data-to-record-folder--async-throw.js
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

Các thao tác ghi dữ liệu vào các tệp thì chắc chắn sẽ không có vấn đề gì, bởi vì theo tài liệu của NodeJS cung cấp thì thao tác `fsPromises.writeFile(filePath)` sẽ tự động thay thế tệp đã tồn tại bằng tệp mới. Do đó nên chúng ta chỉ cần thêm điều kiện kiểm tra xem thư mục bản ghi đã tồn tại chưa, trước khi quyết định khởi tạo đường dẫn cho thư mục mới và chạy lệnh `fsPromises.mkdir(recordPath)`.

```javascript:procedure/sub-procedure/write-data-to-record-folder--async-throw.js
const path = require("path");
const fsPromises = require("fs/promises");
const writeRecordHeaderToFile = require("./write-record-header-to-file--async-throw");
const writeRecordContentToFile = require("./write-record-content-to-file--async-throw");
const findRecordFolderPathById = require("./find-record-folder-path-by-id--async-throw");

module.exports = async (
   in_typeName = Map.name,
   in_record = new Category()
) => {
   try {
      /* --- prepare path to record's data folder */
      var recordFolderName = "id-" + in_record.get("@id");
      var recordFolderPath = path.join(__dirname, "../../data", in_typeName, recordFolderName);

      /* --- create folder for new record (if needed) */
      var found = { recordFolderPath: "" };
      await findRecordFolderPathById(in_typeName, in_record.get("@id"), found);

      if (found.recordFolderPath == recordFolderPath)
         { /* the record exists */; }
      else
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

Viết `test` để kiểm tra hoạt động của thủ tục `update`.

```javascript:express-blog/test.js
const Category = require("./database/type/Category");
const databaseManager = require("./database/manager");

void async function() {
   var selected = new Category();
   var updated = new Category();

   await databaseManager.execute(Category.name, "select-by-id", "02", selected);
   selected.set("name", "Web Development");
   await databaseManager.execute(Category.name, "update", selected, updated);
   console.log(updated);
} (); // void
```

```rust:CMD|Terminal.io
npm test

Category(4) [Map] {
  '@id' => '02',
  'name' => 'Web Development',
  'keywords' => [ 'tutorial', 'web' ],
  'content' => 'Looonggg... content...'
}
```

## delete

Trường hợp sử dụng của `delete` là khi chúng ta chọn nút nhấn xóa một danh mục trên giao diện web quản lý các danh mục bài viết. Dữ liệu được gửi về `server` thường sẽ chỉ cần duy nhất thành phần định danh của danh mục đó là `id`. 

Thao tác mà chúng ta cần xử lý đầu tiên là - kiểm tra xem có bài viết `article` nào đang thuộc danh mục này không; Nếu có thì cần thông báo ngoại lệ, còn nếu không thì chúng ta có thể tiến hành xóa bản ghi `category` tương ứng và trả về kết quả là thông tin của bản ghi đã được xóa khỏi `database`.

```javascript:procedure/Category/delete-by-id--async-throw.js
const selectArticlesByCategoryId = require("../Article/select-by-category-id--async-throw");
const removeRecordFromDatabase = require("../sub-procedure/remove-record-from-database--async-throw");
const Category = require("../../type/Category");

module.exports = async (
   in_recordId = "Infinity",
   out_deleted = new Category()
) => {
   try {
      var selectedArticles = [];
      await selectArticlesByCategoryId(in_recordId, selectedArticles);

      if (selectedArticles.length != 0)
         throw new Error("Đang có bài viết thuộc danh mục này");
      else
         await removeRecordFromDatabase(in_recordId, out_deleted);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

Để kiểm tra xem có bài viết `article` nào đang thuộc danh mục chỉ định hay không thì chúng ta sẽ tìm trong số tất cả các bản ghi `Article` để lọc ra các bản ghi có `category-id` tương ứng. Đây cũng là `procedure` đầu tiên mà chúng ta tạo ra cho nhóm `procedure/Article`. Tuy nhiên chúng ta hãy cứ tạm giả định là không có bài viết nào thuộc danh mục cần xóa và để dành Procedure này cho phần thảo luận sau cùng.

```javascript:procedure/Article/select-by-category-id--async-throw.js
module.exports = async (
   in_categoryId = "Infinity",
   out_matchedArticles = []
) => {
   /* do nothing */ ;
};
```

Và trong trường hợp không có bài viết nào đang thuộc danh mục chỉ định, thì việc xóa các tệp dữ liệu và thư mục của bản ghi `Category` này sẽ được ủy thác cho một Sub-Procedure có tên `removeRecord...` như trên.

```javascript:procedure/sub-procedure/remove-record-from-database--async-throw.js
const Article = require("../../type/Article");
const Category = require("../../type/Category");
const selectArticleById = require("../Article/select-by-id--async-throw");
const selectCategoryById = require("../Category/select-by-id--async-throw");
const findRecordFolderPathById = require("./find-record-folder-path-by-id--async-throw");
const fsPromises = require("fs/promises");
const path = require("path");

module.exports = async (
   in_typeName = Map.name,
   in_recordId = "Infinity",
   out_deleted = new Map()
) => {
   try {
      /* --- Cache the record before trying to delete */
      var theRecord = new Map();

      if (in_typeName == Article.name)
         await selectArticleById(in_recordId, theRecord);
      else if (in_typeName == Category.name)
         await selectCategoryById(in_recordId, theRecord);
      else
         throw new Error("Kiểu dữ liệu bản ghi không hợp lệ");

      /* --- Delete the record from database */
      var found = { recordFolderPath: "" };
      await findRecordFolderPathById(in_typeName, in_recordId, found);
      found.headerFilePath = path.join(found.recordFolderPath, "header.json");
      found.contentFilePath = path.join(found.recordFolderPath, "content.md");

      await fsPromises.rm(found.headerFilePath);
      await fsPromises.rm(found.contentFilePath);
      await fsPromises.rmdir(found.recordFolderPath);

      /* --- Populate the output */
      for (var entry of theRecord) {
         var [key, value] = entry;
         out_deleted.set(key, value);
      } // for
   }
   catch (error) {
      console.error(error);
   }
}; // module.exports
```

Bây giờ chúng ta cứ viết code chạy thử `delete-by-id` cho trường hợp danh mục không chứa bài viết nào đã. Trường hợp còn lại chúng ta sẽ tính sau. :D

```javascript:express-blog/test.js
const Category = require("./database/type/Category");
const databaseManager = require("./database/manager");

void async function() {
   var deleted = new Category();
   await databaseManager.execute(
      Category.name, "delete-by-id",
      "02", deleted
   );
   console.log(deleted);
} (); // void
```

```rust:CMD|Terminal.io
npm test

Category(4) [Map] {
  '@id' => '02',
  'name' => 'Web Development',
  'keywords' => [ 'tutorial', 'web' ],
  'content' => 'Looonggg... content...'
}
```

## Kết thúc bài viết :D

Mình xin lỗi nhưng có lẽ là chúng ta sẽ không mang một thủ tục của nhóm `procedure/Article` vào để thảo luận trong bài viết này, nhằm mục đích duy trì trọng tâm của bài viết xoay quanh các Procedure của nhóm `procedure/Category`. 

Chúng ta đã khá quen với các thao tác làm việc với các thư mục và đọc dữ liệu từ các tệp rồi, vì vậy nên mình tin chắc chắn rằng bạn đã có thể tự hoàn thành code xử lý các Procedure cơ bản cho các nhóm bản ghi khác như `Article`, `Admin`, v.v... mà blog của bạn cần sử dụng.

Trong bài viết tiếp theo, chúng ta sẽ nói về một số Procedure truy vấn khác, được xây dựng dựa trên thao tác truy vấn cơ bản `select-by-id`. Hẹn gặp lại bạn trong bài viết tiếp theo.

[[Database] Bài 7 - Viết Code Quản Lý Database (Tiếp Theo)](https://viblo.asia/p/3P0lP81plox)