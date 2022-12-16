Ở bài viết trước, chúng ta đã hoàn thành xong các thủ tục cơ bản của nhóm `procedure/Category` để làm việc với một bản ghi đơn. Cụ thể là chúng ta đã có các thủ tục:

- `insert` - Thêm một bản ghi `Category` mới vào `database`.
- `select-by-id` - Truy xuất một bản ghi `Category` bởi giá trị `id`.
- `update` - Cập nhật một bản ghi `Category` đã có trong `database`.
- `delete-by-id` - Xóa một bản ghi `Category` bởi giá trị `id`.

Chúng ta cũng đã thiết kế các Sub-Procedure để có thể được sử dụng chung cho các nhóm Procedure chính khác nhau; Và vì vậy nên ở đây mình cũng sẽ giả định là bạn đã thực hiện xong các thủ tục cơ bản tương tự cho nhóm `procedure/Article`.

## select-by-category-id

Ở đây chúng ta sẽ tiếp tục với thủ tục `select-by-category-id` của nhóm `procedure/Article` mà chúng ta đã đề cập tới ở cuối bài trước, khi viết code cho thủ tục `delete-by-id` của nhóm `procedure/Category`. Thủ tục mới này có hơi phức tạp hơn một chút so với các thủ tục cơ bản mà chúng ta đã nói ở trên. Tuy nhiên do chúng ta đã có thủ tục `select-by-id` làm chất liệu kèm theo các Sub-Procedure hỗ trợ, việc viết code cho thủ tục mới cũng khá đơn giản.

Công việc mà `select-by-category-id` cần thực hiện là chọn ra các bản ghi `Article` với giá trị `category-id` được cung cấp. Về thì chúng ta có thể chia thủ tục này thành những thao tác sau:

- Truy vấn tất cả các giá trị `id` của các bản ghi `Article` đang có trong `database`.
- Lặp qua từng giá trị `id` và sử dụng thủ tục `select-by-id` để truy vấn bản ghi `Article` tương ứng.
- Kiểm tra xem bản ghi `Article` vừa được chọn có `category-id` phù hợp hay không. Nếu có thì thêm vào tập kết quả trả về.

```procedure/Article/select-by-category-id--async-throw.js
const readAllRecordIds = require("../sub-procedure/read-all-record-ids--async-throw");
const selectArticleById = require("./select-by-id--async-throw");
const Article = require("../../type/Article");

module.exports = async (
   in_categoryId = "",
   out_selected = []
) => {
   /* --- Collect all records' ids */
   var allRecordIds = [];
   await readAllRecordIds(Article.name, allRecordIds);

   /* --- Loop & Select each record to check */
   for (var recordId of allRecordIds) {
      var record = new Article();
      await selectArticleById(recordId, record);

      /* --- Collect the Article if category-id matches */
      if (record.get("category-id") != in_categoryId)
         { /* record is not matched */; }
      else
         out_selected.push(record);
   } // for
};
```

Khai báo thêm thủ tục mới tại `database/manager.js` và viết `test` để chạy thử.

```database/manager.js
/* requires ... */

const articleProcedure = new Map()
   .set("insert", require("../database/procedure/Article/insert--async-throw"))
   .set("select-by-id", require("../database/procedure/Article/select-by-id--async-throw"))
   .set("update", require("../database/procedure/Article/update--async-throw"))
   .set("delete-by-id", require("../database/procedure/Article/delete-by-id--async-throw"))
   .set("select-by-category-id", require("../database/procedure/Article/select-by-category-id--async-throw"));

/* categoryProcedure... */
/* storedProcedure ... */
/* exports... */
```

```express-blog/test.js
const Article = require("./database/type/Article");
const databaseManager = require("./database/manager");

void async function() {
   /* --- insert */
   var newRecord = new Article()
      .set("title", "Cách Chèn Ảnh & Các Liên Kết")
      .set("short-title", "Ảnh & Liên Kết")
      .set("keywords", ["hướng dẫn cơ bản", "lập trình web", "html", "ảnh", "liên kết"])
      .set("edited-datetime", (new Date()).toUTCString())
      .set("category-id", "01")
      .set("content", "Nội dung của bài viết thứ hai trong danh mục HTML...");
   var inserted = new Article();
   await databaseManager.execute(
      Article.name, "insert",
      newRecord, inserted
   );

   /* --- select-by-category-id */
   var selected = [];
   await databaseManager.execute(
      Article.name, "select-by-category-id",
      "01", selected
   );
   console.log(selected);
} (); // void
```

```CMD|Terminal.io
npm test

[
  Article(7) [Map] {
    '@id' => '0001',
    'title' => 'Làm Thế Nào Để Tạo Ra Một Trang Web?',
    'short-title' => 'Giới Thiệu HTML',
    'keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html', 'giới thiệu' ],
    'edited-datetime' => 'Sat, 16 Apr 2022 10:13:22 GMT',
    'category-id' => '01',
    'content' => 'Nội dung của bài viết đầu tiên trong danh mục HTML...'
  },
  Article(7) [Map] {
    '@id' => '0002',
    'title' => 'Cách Chèn Ảnh & Các Liên Kết',
    'short-title' => 'Ảnh & Liên Kết',
    'keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html', 'ảnh', 'liên kết' ],      
    'edited-datetime' => 'Thu, 28 Apr 2022 14:29:30 GMT',
    'category-id' => '01',
    'content' => 'Nội dung của bài viết thứ hai trong danh mục HTML...'
  }
]
```

## select-top

Thủ tục `select-by-category-id` là thủ tục đầu tiên mà chúng ta có được để làm việc với một tập kết quả - cụ thể là một mảng chứa tất cả các bản ghi `Article` có `category-id` phù hợp.

Tuy nhiên trên thực tế thì hiếm khi chúng ta cần sử dụng cùng lúc tất cả các bản ghi trong tập kết quả của một thủ tục truy vấn tổ hợp như thế này. Giả sử khi hiển thị giao diện của một trang đơn biểu thị cho một danh mục nội dung, chúng ta thường chỉ cần khoảng 10 - 20 bài viết đầu tiên hoặc mới nhất thuộc danh mục đó. Mặc dù chúng ta có thể đang có rất nhiều bản ghi thuộc danh mục đó ở thời điểm truy vấn dữ liệu.

Chính vì vậy nên các phần mềm quản lý các Relational Database thường cung cấp thêm tùy chọn `select-top` để chọn ra một số bản ghi đứng Top trong tập kết quả tiềm năng. Chúng ta có thể chọn ra Top Ten, hay Top Twenty, hay Top 1001 tùy vào hoàn cảnh cần sử dụng.

Và để thể hiện tính năng tương tự trong code Database đơn giản ở đây thì chúng ta chỉ cần thêm một tham số tùy chọn `in_top` cho các thủ tục `select` tổ hợp. Tham số này là số lượng bản ghi mà chúng ta muốn đặt giới hạn cho tập kết quả trả về. Và thay vì truy xuất toàn bộ tất cả các bản ghi vào một mảng rồi mới bắt đầu chọn ra một khoảng Top, thì chúng ta vẫn sẽ duyệt lần lượt từng bản ghi và dừng thủ tục ngay khi mảng kết quả có đủ số lượng Top.

```procedure/Article/select-by-category-id--async-throw.js
/* requires ... */

module.exports = async (
   in_categoryId = "",
   out_selected = [],
   in_top = Infinity
) => {
   /* --- Collect all records' ids ... */

   /* --- Loop & Select each record to check */
   for (var recordId of allRecordIds) {
      /* --- Limit the result set */
      if (out_selected.length == in_top)
         break /* out of the loop */;
      else
         { /* keep collecting record */; }

      /* --- Select an Article ... */
      /* --- Collect the Article if category-id matches ... */
   } // for
};
```

Để kiểm tra hoạt động của tùy chọn `in_top`, chúng ta sẽ `insert` thêm một bản ghi `Article` nữa thuộc danh mục `HTML` và chỉ chọn ra `top 2` trong số 3 bản ghi đang có trong danh mục này.

```express-blog/test.js
const Article = require("./database/type/Article");
const databaseManager = require("./database/manager");

void async function() {
   /* --- insert */
   var newRecord = new Article()
      .set("title", "Sử Dụng Các Nội Dung Nhúng")
      .set("short-title", "Các Nội Dung Nhúng")
      .set("keywords", ["hướng dẫn cơ bản", "lập trình web", "html", "nội dung nhúng"])
      .set("edited-datetime", (new Date()).toUTCString())
      .set("category-id", "01")
      .set("content", "Nội dung của bài viết thứ ba trong danh mục HTML...");
   var inserted = new Article();
   await databaseManager.execute(
      Article.name, "insert",
      newRecord, inserted
   );

   /* --- select-by-category-id */
   var selected = [];
   await databaseManager.execute(
      Article.name, "select-by-category-id",
      "01", selected, 2
   );
   console.log(selected);
} (); // void
```

```CMD|Terminal.io
npm test

[
  Article(7) [Map] {
    '@id' => '0001',
    'title' => 'Làm Thế Nào Để Tạo Ra Một Trang Web?',
    'short-title' => 'Giới Thiệu HTML',
    'keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html', 'giới thiệu' ],
    'edited-datetime' => 'Sat, 16 Apr 2022 10:13:22 GMT',
    'category-id' => '01',
    'content' => 'Nội dung của bài viết đầu tiên trong danh mục HTML...'
  },
  Article(7) [Map] {
    '@id' => '0002',
    'title' => 'Cách Chèn Ảnh & Các Liên Kết',
    'short-title' => 'Ảnh & Liên Kết',
    'keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html', 'ảnh', 'liên kết' ],      
    'edited-datetime' => 'Thu, 28 Apr 2022 14:29:30 GMT',
    'category-id' => '01',
    'content' => 'Nội dung của bài viết thứ hai trong danh mục HTML...'
  }
]
```

Trong trường hợp chúng ta gọi thủ tục này và không cung cấp giá trị `in_top` thì giá trị được sử dụng đang được đặt mặc định là `Infinity`. Tập kết quả trả về vẫn sẽ là mảng chứa tất cả các bản ghi có `category-id` phù hợp.

## select-order

Lúc này chúng ta đã biết cách giới hạn số lượng bản ghi cần truy vấn trong một tập kết quả tiềm năng. Tuy nhiên mảng kết quả trả về mặc định sẽ luôn là những bản ghi được `insert` đầu tiên, và trong thực tế thì có rất nhiều trường hợp chúng ta lại cần truy xuất Top những bản ghi mới nhất.

Điểm quan trọng ở đây vẫn là phương cách xử lý tối ưu để chúng ta không phải `select` đủ tất cả các bản ghi phù hợp vào một mảng rồi mới chọn ra những bản ghi mới nhất. Ví dụ chúng ta có 1001 bản ghi phù hợp mà chỉ cần chọn ra Top 2 bản ghi mới nhất thì mong muốn chung chung là code của chúng ta sẽ không phải lặp qua 999 bản ghi đầu tiên.

Chính vì vậy nên các phần mềm quản lý Relational Database có cung cấp thêm tùy chọn `select-order` cho phép chúng ta thiết lập trình tự duyệt các bản ghi. Ở đây chúng ta sẽ bổ sung thêm một tham số tùy chọn nữa là `in_order` để lựa chọn trình tự duyệt các bản ghi trong `database`.

```procedure/Article/select-by-category-id--async-throw.js
/* requires ... */

module.exports = async (
   in_categoryId = "",
   out_selected = [],
   in_top = Infinity,
   in_order = "default" /* default | reversed */
) => {
   /* --- Collect all records' ids ... */

   /* --- Order id-list */
   if (in_order == "default")
      { /* keep default order */; }
   else
      allRecordIds.reverse();

   /* --- Loop & Select each record to check ... */
};
```

Bây giờ chúng ta sẽ `test` để chọn ra 2 bản ghi `Article` mới nhất trong số 3 bản ghi thuộc danh mục HTML vừa rồi.

```express-blog/test.js
const Article = require("./database/type/Article");
const databaseManager = require("./database/manager");

void async function() {
   var selected = [];
   await databaseManager.execute(
      Article.name, "select-by-category-id",
      "01", selected, 2, "reversed"
   );
   console.log(selected);
} (); // void
```

```CMD|Terminal.io
[
  Article(7) [Map] {
    '@id' => '0003',
    'title' => 'Sử Dụng Các Nội Dung Nhúng',
    'short-title' => 'Các Nội Dung Nhúng',
    'keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html', 'nội dung nhúng' ],       
    'edited-datetime' => 'Thu, 28 Apr 2022 15:23:26 GMT',
    'category-id' => '01',
    'content' => 'Nội dung của bài viết thứ ba trong danh mục HTML...'
  },
  Article(7) [Map] {
    '@id' => '0002',
    'title' => 'Cách Chèn Ảnh & Các Liên Kết',
    'short-title' => 'Ảnh & Liên Kết',
    'keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html', 'ảnh', 'liên kết' ],      
    'edited-datetime' => 'Thu, 28 Apr 2022 14:29:30 GMT',
    'category-id' => '01',
    'content' => 'Nội dung của bài viết thứ hai trong danh mục HTML...'
  }
```

## Kết thúc bài viết

Như vậy là chúng ta đã có được Procedure `select` tổ hợp đầu tiên với các tính năng tùy chọn `top` và `order`. Dưới đây là link tổng hợp code của `select-by-category-id` để bạn kiểm tra lại trong trường hợp mình viết bài nhỡ có nhầm lẫn gì mà soát lại không tìm thấy. :D

[procedure/Article/select-by-category-id--async-throw.js](https://gist.github.com/semiarthanoian/12efeb5886b7c295039e614d33571f62)

Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu thêm một vài trường hợp sử dụng khác của các Procedure `select`.

[[Database] Bài 8 - Viết Code Quản Lý Database (Tiếp Theo)](https://viblo.asia/p/bJzKmA4EK9N)