Trong bài viết này, chúng ta sẽ cùng xem xét thêm một vài bối cảnh truy vấn dữ liệu từ Database. Hãy xuất phát từ nhu cầu truy vấn các bản ghi `Article` mới nhất để tạo ra các `entry` giới thiệu các bài viết trên trang chủ của blog đơn giản mà chúng ta đang xây dựng.

## select-join

Blog cá nhân của mình thì không sử dụng thiết kế trang chủ dạng này, tuy nhiên đây lại là thiết kế blog rất phổ biến và đặc biệt phù hợp cả với những trang web có thông tin mang tính chất cập nhật thường xuyên như các trang tin tức hay các mạng xã hội. Giả sử blog của bạn đang xây dựng cần trưng bày các bản giới thiệu ngắn `entry` tới 10 bài viết mới nhất với thiết kế có dạng như trang cập nhật của Viblo thế này.

[https://viblo.asia/newest](https://viblo.asia/newest)
![](https://images.viblo.asia/7eee099e-fa26-4f8f-a99f-1263c54805c0.png)

Tuy nhiên thay vì sử dụng các `tags` bên cạnh tiêu đề chính thì blog đơn giản của bạn có thể chỉ cần gắn tên danh mục tương ứng với mỗi bài viết. Lưu ý ở đây là 10 bài viết này có thể thuộc những danh mục khác nhau chứ không chắc chắn là thuộc cùng một danh mục như trong trường hợp của các trang đơn biểu thị cho các danh mục.

Lúc này chúng ta sẽ cần truy vấn từ `database` 10 bản ghi `Article` mới nhất và kết quả thu được là 1 mảng các object `Article`. Sau đó chúng ta cần lấy ra từ các object này thông tin `category-id` để truy vấn thêm các bản ghi `Category`. Và để code xử lý `template` có thể biết `Article` nào thuộc `Category` nào thì chúng ta sẽ cần sắp xếp lại tập kết quả truy vấn sau cùng ở dạng `Map` với các cặp `key/value` là các object `Article/Category`.

Để đáp ứng các nhu cầu truy vấn dữ liệu liên hợp như thế này, các phần mềm quản lý Relational Database đều có cung cấp thêm tùy chọn `select-join`. Kết quả thu được khi sử dụng `select-join` là một tập các bản ghi thuộc một kiểu trừu tượng với các trường dữ liệu được tổ hợp từ hai kiểu bản ghi liên quan. Và để thực hiện điều tương tự trong code Database đơn giản ở đây, đầu tiên chúng ta sẽ tạo ra kiểu bản ghi trừu tượng `ArticleJoinCategory`.

```database/type/ArticleJoinCategory.js
const Article = require("./Article");
const Category = require("./Category");

const ArticleJoinCategory = class extends Map {
   constructor(...params) {
      super(...params);
      
      for (var key of ArticleJoinCategory.fieldNames) {
         if (this.has(key))
            { /* do nothing */; }
         else
            this.set(key, null);
      } // for ... of

      return this;
   }

   static fieldNames = [
      // --- Article
      "@id",
      "title",
      "short-title",
      "keywords",
      "edited-datetime",
      "content",
      // --- Category
      "category-id",
      "category-name",
      "category-keywords",
      "category-content"
   ];

   static populate(
      in_article = new Article(),
      in_category = new Category(),
      out_joined = new ArticleJoinCategory()
   ) {
      for (var entry of in_article) {
         var [key, value] = entry;
         out_joined.set(key, value);
      }

      out_joined.set("category-name", in_category.get("name"))
                .set("category-keywords", in_category.get("keywords"))
                .set("category-content", in_category.get("content"));

      return ArticleJoinCategory;
   }
}; // ArticleJoinCategory

module.exports = ArticleJoinCategory;
```

Ở đây chúng ta vẫn chỉ có các bản ghi dữ liệu thực là `data/Article` và `data/Category`. Kiểu bản ghi `ArticleJoinCategory` sẽ chỉ tồn tại trong môi trường vận hành phần mềm nhằm đáp ứng nhu cầu sử dụng của code truy vấn. Tiếp theo chúng ta sẽ tạo ra nhóm thủ tục mới cho kiểu bản ghi liên hợp này là `procedure/ArticleJoinCategory` với thao tác `select-by-id` cơ bản.

```structure.txt
[database]
.  |
.  +-----[procedure]
.  |        |
.  |        +-----[sub-procedure]
.  |        |
.  |        +-----[Article]
.  |        +-----[Category]
.  |        +-----[ArticleJoinCategory]
.  |                 |
.  |                 +-----select-by-id--async-throw.js
.  |
.  +-----manager.js
```

```procedure/ArticleJoinCategory/select-by-id--async-throw.js
const ArticleJoinCategory = require("../../type/ArticleJoinCategory");
const Article = require("../../type/Article");
const Category = require("../../type/Category");
const selectArticleById = require("../Article/select-by-id--async-throw");
const selectCategoryById = require("../Category/select-by-id--async-throw");

module.exports = async (
   in_recordId = "Infinity",
   out_selected = new ArticleJoinCategory()
) => {
   try {
      var selectedArticle = new Article();
      await selectArticleById(in_recordId, selectedArticle);

      var categoryId = selectedArticle.get("category-id");
      var selectedCategory = new Category();
      await selectCategoryById(categoryId, selectedCategory);

      ArticleJoinCategory.populate(selectedArticle, selectedCategory, out_selected);
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

Cuối cùng là khai báo thủ tục mới tại `database/manager.js` và viết `test` để kiểm tra hoạt động.

```database/manager.js
/* requires ... */
/* other procedures ... */

const articleJoinCategoryProcedure = new Map()
   .set("select-by-id", require("./procedure/ArticleJoinCategory/select-by-id--async-throw"));

/* exports ... */
```

```express-blog/test.js
const ArticleJoinCategory = require("./database/type/ArticleJoinCategory");
const databaseManager = require("./database/manager");

void async function() {
   var selected = new ArticleJoinCategory();
   await databaseManager.execute(
      ArticleJoinCategory.name, "select-by-id",
      "01", selected
   );
   console.log(selected);
} (); // void
```

```CMD|Terminal.io
ArticleJoinCategory(10) [Map] {
  '@id' => '0001',
  'title' => 'Làm Thế Nào Để Tạo Ra Một Trang Web?',
  'short-title' => 'Giới Thiệu HTML',
  'keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html', 'giới thiệu' ],
  'edited-datetime' => 'Sat, 16 Apr 2022 10:13:22 GMT',
  'content' => 'Nội dung của bài viết đầu tiên trong danh mục HTML...',
  'category-id' => '01',
  'category-name' => 'HTML',
  'category-keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html' ],
  'category-content' => 'Nội dung của trang đơn mô tả danh mục HTML...'
}
```

Như vậy là chúng ta đã có được kiểu dữ liệu liên hợp và thủ tục `select-by-id` cơ bản cho kiểu dữ liệu này. Việc xây dựng một thao tác `select-top` để lấy ra 10 bản ghi mới nhất thuộc kiểu dữ liệu này thì chúng ta đã biết cách xử lý từ bài trước rồi. Ở đây mình sẽ chỉ đặt code ví dụ và `test` để bạn so sánh với code mà bạn tự viết và kiểm tra luôn giúp mình xem có chỗ nào nhầm lẫn không. :D

```procedure/ArticleJoinCategory/select--async-throw.js
const ArticleJoinCategory = require("../../type/ArticleJoinCategory");
const Article = require("../../type/Article");
const readAllRecordIds = require("../sub-procedure/read-all-record-ids--async-throw");
const selectRecordById = require("../ArticleJoinCategory/select-by-id--async-throw");

module.exports = async(
   out_selected = [],
   in_top = Infinity,
   in_order = "default" /* default | reversed */
) => {
   /* --- Collect all records' ids */
   var allRecordIds = [];
   await readAllRecordIds(Article.name, allRecordIds);

   /* --- Order id-list */
   if (in_order == "default")
      { /* keep default order */; }
   else
      allRecordIds.reverse();

   /* --- Loop & Select each record to check */
   for (var recordId of allRecordIds) {
      /* --- Limit the result set */
      if (out_selected.length == in_top)
         break /* out of the loop */;
      else
         { /* keep collecting record */; }

      /* --- Select a record */
      var record = new ArticleJoinCategory();
      await selectRecordById(recordId, record);
      out_selected.push(record);
   } // for .. of
};
```

```database/manager.js
/* requires ... */
/* otherProcedures ... */

const articleJoinCategoryProcedure = new Map()
   .set("select-by-id", require("./procedure/ArticleJoinCategory/select-by-id--async-throw"))
   .set("select", require("./procedure/ArticleJoinCategory/select--async-throw"));

/* exports ... */
```

Chúng ta đang có tổng cộng 5 bản ghi `Article` ở thời điểm hiện tại, và vì vậy nên số bản ghi kết quả `ArticleJoinCategory` cũng sẽ tương ứng. Ở đây chúng ta sẽ `test` chọn ra Top 3 bản ghi có `id` lớn nhất.

```express-blog/test.js
const ArticleJoinCategory = require("./database/type/ArticleJoinCategory");
const databaseManager = require("./database/manager");

void async function() {
   var selected = [];
   await databaseManager.execute(
      ArticleJoinCategory.name, "select",
      selected, 3, "reversed"
   );
   console.log(selected);
} (); // void
```

```CMD|Terminal.io
npm test

[
  ArticleJoinCategory(10) [Map] {
    '@id' => 'Infinity',
    'title' => 'Cách Chèn Ảnh & Các Liên Kết',
    'short-title' => 'Ảnh & Liên Kết',
    'keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html', 'ảnh', 'liên kết' ],      
    'edited-datetime' => 'Sat, 16 Apr 2022 19:13:22 GMT',
    'content' => 'Nội dung bạn yêu cầu chưa được đăng tải...',
    'category-id' => 'Infinity',
    'category-name' => 'Infinity',
    'category-keywords' => [ 'hướng dẫn cơ bản', 'lập trình web' ],
    'category-content' => 'Nội dung của trang đơn mô tả danh mục Infinity...'
  },
  ArticleJoinCategory(10) [Map] {
    '@id' => '0003',
    'title' => 'Sử Dụng Các Nội Dung Nhúng',
    'short-title' => 'Các Nội Dung Nhúng',
    'keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html', 'nội dung nhúng' ],       
    'edited-datetime' => 'Thu, 28 Apr 2022 15:23:26 GMT',
    'content' => 'Nội dung của bài viết thứ ba trong danh mục HTML...',
    'category-id' => '01',
    'category-name' => 'HTML',
    'category-keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html' ],
    'category-content' => 'Nội dung của trang đơn mô tả danh mục HTML...'
  },
  ArticleJoinCategory(10) [Map] {
    '@id' => '0002',
    'title' => 'Cách Chèn Ảnh & Các Liên Kết',
    'short-title' => 'Ảnh & Liên Kết',
    'keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html', 'ảnh', 'liên kết' ],      
    'edited-datetime' => 'Thu, 28 Apr 2022 14:29:30 GMT',
    'content' => 'Nội dung của bài viết thứ hai trong danh mục HTML...',
    'category-id' => '01',
    'category-name' => 'HTML',
    'category-keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html' ],
    'category-content' => 'Nội dung của trang đơn mô tả danh mục HTML...'
  }
]
```

## select-partial

Một trường hợp truy vấn dữ liệu khác là khi chúng ta chỉ cần một phần thông tin của các bản ghi chứ không cần tất cả các trường dữ liệu. Giả sử blog của bạn có xây dựng một thanh điều hướng ở bên trái khu vực hiển thị nội dung chính giống với trang tài liệu của [getBootstrap.com](https://getbootstrap.com/docs/5.1/getting-started/introduction/) như thế này:

![](https://images.viblo.asia/4ca13c3d-4ef5-43e6-9ea5-2dd4770ccfe6.png)

Thanh điều hướng bên kiểu này thường sẽ chứa đầy đủ liên kết tới tất cả các bài viết có trong blog. Code xử lý sẽ cần truy vấn tất cả các bản ghi `Article` và tất cả các bản ghi `Category`, sau đó thực hiện việc nhóm các bản ghi `Article` theo các object `Category`. Tuy nhiên chúng ta hãy tạm chưa quan tâm tới thao tác nhóm các bản ghi.

Ở đây chúng ta đang truy vấn tất cả 1001 bản ghi `Article` để chuyển cho code xử lý `template`, trong khi phần dữ liệu mà chúng ta cần sử dụng chỉ có một vài trường dữ liệu của 1001 tệp `header.json`, còn phần nội dung chính của các bài viết trong các tệp `content.md` thì chúng ta chắc chắn là không cần tới.

Và để tránh việc bộ nhớ đệm bị chiếm dụng trong trường hợp này thì các phần mềm quản trị Relational Database có cho phép thực hiện thao tác `select` với tính năng chọn lọc một số trường dữ liệu được chỉ định. Kết quả trả về là một kiểu bản ghi trừu tượng với số trường dữ liệu ít hơn so với thao tác `select` thông thường.

Tuy nhiên thì trong trường hợp này việc tạo ra thêm một kiểu bản ghi trừu tượng khác như kiểu `ArticleHeader` và một nhóm thủ tục mới là điều không cần thiết. Chúng ta chỉ cần bổ sung thêm một tham số tùy chọn `in_partial` cho các thao tác `select` để code sử dụng bên ngoài có thể chọn trường dữ liệu nào sẽ được sử dụng trong kết quả truy vấn. Chúng ta sẽ quay lại với thao tác cơ bản `select-by-id` của nhóm `procedure/Article` để viết code ví dụ minh họa.

```database/type/Article.js
const Article = class extends Map {
   /* constructor ... */
   
   static fieldNames = [
      "@id",
      "title",
      "short-title",
      "keywords",
      "edited-datetime",
      "category-id",
      "content"
   ];
   
   /* static methods ... */
}; // Article

module.exports = Article;
```

```procedure/Article/select-by-id--async-throw.js
const findRecordFolderPathById = require("../sub-procedure/find-record-folder-path-by-id--async-throw");
const readRecordHeader = require("../sub-procedure/read-record-header--async-throw");
const readRecordContent = require("../sub-procedure/read-record-content--async-throw");
const Article = require("../../type/Article");

module.exports = async (
   in_recordId = "Infinity",
   out_selected = new Article(),
   in_partial = Article.fieldNames
) => {
   try {
      /* --- find record's folder path */
      var found = { recordFolderPath: "" };
      await findRecordFolderPathById(Article.name, in_recordId, found);

      /* --- read record's header and content */
      await readRecordHeader(found.recordFolderPath, out_selected);
      await readRecordContent(found.recordFolderPath, out_selected);

      /* --- remove unwanted fields */
      for (var key of out_selected.keys()) {
         if (in_partial.includes(key))
            { /* keep this field */; }
         else
            out_selected.delete(key);
      } // for .. of
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

Ở đây nếu như khi gọi thủ tục và không cung cấp tham số tùy chọn `in_partial` thì code sẽ sử dụng giá trị mặc định là mảng có chứa đầy đủ tên của tất cả các trường dữ liệu. Như vậy kết quả trả về vẫn sẽ là kiểu bản ghi `Article` có đầy đủ các trường dữ liệu. Bây giờ chúng ta sẽ `test` thử `select-by-id` với trường hợp đầy đủ tất cả các trường dữ liệu và trường hợp chỉ có `@id` và `short-title`.

```express-blog/test.js
const databaseManager = require("./database/manager");
const Article = require("./database/type/Article");

void async function() {
   var selected = new Article();

   await databaseManager.execute(
      Article.name, "select-by-id",
      "01", selected
   );
   console.log(selected);

   await databaseManager.execute(
      Article.name, "select-by-id",
      "01", selected, ["@id", "short-title"]
   );
   console.log(selected);
} (); // void
```

```CMD|Terminal.io
npm test

Article(7) [Map] {
  '@id' => '0001',
  'title' => 'Làm Thế Nào Để Tạo Ra Một Trang Web?',
  'short-title' => 'Giới Thiệu HTML',
  'keywords' => [ 'hướng dẫn cơ bản', 'lập trình web', 'html', 'giới thiệu' ],
  'edited-datetime' => 'Sat, 16 Apr 2022 10:13:22 GMT',
  'category-id' => '01',
  'content' => 'Nội dung của bài viết đầu tiên trong danh mục HTML...'        
}
Article(2) [Map] {
  '@id' => '0001',
  'short-title' => 'Giới Thiệu HTML'
}
```

Đối với các thao tác `select` phức tạp hơn được xây dựng dựa trên `select-by-id` thì chúng ta có thể triển khai tương tự và truyền tham số `in_partial` tới thao tác `select-by-id`. Tuy nhiên, để đảm bảo việc chỉnh sửa không ảnh hưởng đến hoạt động của code đã `test` xong trước đó, chúng ta cần đảm bảo tham số `in_partial` luôn là tham số cuối cùng của các thao tác `select`. 

Bây giờ chúng ta sẽ tiếp tục chỉnh sửa thủ tục `select-by-category-id` của nhóm `procedure/Article` để thêm tham số tùy chọn `in_patial`.

```procedure/Article/select-by-category-id--async-throw.js
const readAllRecordIds = require("../sub-procedure/read-all-record-ids--async-throw");
const selectArticleById = require("./select-by-id--async-throw");
const Article = require("../../type/Article");

module.exports = async (
   in_categoryId = "",
   out_selected = [],
   in_top = Infinity,
   in_order = "default" /* default | reversed */,
   in_partial = Article.fieldNames
) => {
   /* --- Collect all records' ids */
   var allRecordIds = [];
   await readAllRecordIds(Article.name, allRecordIds);

   /* --- Order id-list */
   if (in_order == "default")
      { /* keep default order */; }
   else
      allRecordIds.reverse();

   /* --- Loop & Select each record to check */
   for (var recordId of allRecordIds) {
      /* --- Limit the result set */
      if (out_selected.length == in_top)
         break /* out of the loop */;
      else
         { /* keep collecting record */; }

      /* --- Select an Article */
      var record = new Article();
      await selectArticleById(recordId, record, in_partial);

      /* --- Collect the Article if category-id matches */
      if (record.get("category-id") != in_categoryId)
         { /* record is not matched */; }
      else
         out_selected.push(record);
   } // for .. of
};
```

Lần này chúng ta sẽ `test` với các trường dữ liệu là `@id`, `short-title`, và `title` được sử dụng để hiển thị `tooltip` khi người dùng trỏ chuột vào một liên kết trên thanh điều hướng trong một thời gian dài mà không click.

```express-blog/test.js
const databaseManager = require("./database/manager");
const Article = require("./database/type/Article");

void async function() {
   var selected = [];

   await databaseManager.execute(
      Article.name, "select-by-category-id",
      /* in_id */          "01",
      /* out_selected */   selected,
      /* in_top */         Infinity,
      /* in_order */       "defaut",
      /* in_partial */     ["@id", "title", "short-title", "category-id"]
   );

   console.log(selected);
} (); // void
```

```CMD|Terminal.io
npm test

[
  Article(4) [Map] {
    '@id' => '0003',
    'title' => 'Sử Dụng Các Nội Dung Nhúng',
    'short-title' => 'Các Nội Dung Nhúng',
    'category-id' => '01'
  },
  Article(4) [Map] {
    '@id' => '0002',
    'title' => 'Cách Chèn Ảnh & Các Liên Kết',
    'short-title' => 'Ảnh & Liên Kết',
    'category-id' => '01'
  },
  Article(4) [Map] {
    '@id' => '0001',
    'title' => 'Làm Thế Nào Để Tạo Ra Một Trang Web?',
    'short-title' => 'Giới Thiệu HTML',
    'category-id' => '01'
  }
]
```

## select-group-by

Các phần quản trị Relational Database còn cung cấp một tính năng Group-by cho thao tác `select` tổ hợp, nhằm mục đích nhóm các bản ghi theo một tiêu chí nào đó và thực hiện một thao tác tính toán tổ hợp trên từng nhóm. Kết quả trả về sẽ là các bản ghi trừu tượng đại diện cho mỗi nhóm (1 bản ghi/ 1 nhóm) sau khi thao tác tính toán tổ hợp được thực hiện xong.

Tuy nhiên do chúng ta đang quản lý `database` đơn giản bằng JavaScript với độ linh hoạt rất cao nên việc mô phỏng lại tính năng này cho `database/manager.js` là không hẳn cần thiết. Thêm vào đó là chúng ta cũng chưa có trường hợp ứng dụng cụ thể cần thực hiện thao tác tính toán tổ hợp nào cho việc quản lý dữ liệu của blog cá nhân đơn giản. Vì vậy nên chúng ta sẽ để dành Group-by cho Sub-Series SQL sau khi chúng ta đã đăng tải xong trang blog cá nhân lên Glitch.com. 

Ở đây mình cũng lưu ý thêm là tính năng Join chúng ta nói ở phía trên cũng còn một vài khía cạnh mở rộng khác khá thú vị ảnh hưởng đến tập kết quả. Và chúng ta cũng sẽ ghi chú tại đây để khi bắt đầu Sub-Series SQL sẽ đề cập lại về hai tính năng này. Còn bây giờ thì chúng ta sẽ chuyển tới bài viết tiếp theo về một khái niệm mới trong quản lý Database có tên gọi là View.

[[Database] Bài 9 - Viết Code Quản Lý Database (Kết Thúc)](https://viblo.asia/p/database-bai-9-viet-code-quan-ly-database-ket-thuc-Az45bRMN5xY)