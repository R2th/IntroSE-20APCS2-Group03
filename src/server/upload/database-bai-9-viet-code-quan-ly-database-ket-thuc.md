Trong bài viết này chúng ta sẽ cùng nói về khái niệm View trong quản lý Database nói chung. Đây cũng là bài viết cuối cùng về code triển khai `database` đơn giản trước khi chúng ta quay lại Sub-Series ExpressJS để viết code xử lý cho các `route` và hoàn thành trang blog cá nhân như đã dự định.

## View

Chúng ta sẽ xuất phát với một tính năng giả định của trang chủ mà bạn đang xây dựng cho blog cá nhân. Giả sử bạn muốn bổ sung một tính năng tự động tải thêm các đoạn `entry` giới thiệu tới các bài viết khác khi người dùng cuộn trang web vượt qua 10 `entry` được tải sẵn. 

Tính năng này cũng rất thường thấy trong thiết kế của các trang mạng xã hội hoặc các trang web chia sẻ các nội dung đa phương tiện như audio, video, ... mang tính chất cập nhật thường xuyên.

Như vậy mỗi khi người dùng cuộn qua đoạn `entry` cuối cùng thì sẽ có một yêu cầu gửi tới `server` để truy vấn thêm vài bản ghi `Article` tính từ `id` tiếp theo của `entry` cuối cùng. Và lúc này chúng ta thấy rằng chúng ta đang cần làm việc với tập kết quả tiềm năng của thao tác `select` trong nhóm `procedure/Article` rất thường xuyên.

Có khi thì chúng ta cần `select` 10 bài viết đầu tiên để `render` ra trang chủ lần đầu. Và ở một thời điểm khác, khi người dùng cuộn qua `entry` cuối cùng thì chúng ta lại cần `select` 5 bài viết tính từ `id` tiếp theo. Và rất có thể trong tương lai bạn còn muốn thực hiện thêm thao tác làm thống kê số lượt đọc cho mỗi trang bài viết. 

Lúc này chúng ta thấy tập kết quả tiềm năng của `select` bao gồm tất cả 1001 bài viết trong `database` lại đang là chất liệu cho nhiều thao tác truy vấn tổ hợp khác. Và như vậy thì sẽ thật tiện lợi nếu như chúng ta có thể biểu thị tất cả 1001 bản ghi này ở dạng một nguồn dữ liệu trừu tượng và có thể được lặp qua khi cần sử dụng tới. Nguồn dữ liệu này có thể được xem như một bảng dữ liệu bao gồm các bản ghi được biểu thị bởi các hàng dữ liệu và mỗi cột là một trường dữ liệu `@id`, `title`, `short-title`, v.v...

```article-view.txt
+--------------+-----------------------+---------------+-----------------+
|        @id   |   title               |   .........   |   category-id   |
+--------------+-----------------------+---------------+-----------------+
|       0000   |   Làm Thế Nào .....   |   .........   |            00   |
+--------------+-----------------------+---------------+-----------------+
|       0001   |   Cách Chèn Ảnh ...   |   .........   |            01   |
+--------------+-----------------------+---------------+-----------------+
|       ....   |   .................   |   .........   |            ..   |
+--------------+-----------------------+---------------+-----------------+
|   Infinity   |   Chưa Đăng Tải ...   |   .........   |      Infinity   |
+--------------+-----------------------+---------------+-----------------+
```

Bây giờ chúng ta sẽ mô phỏng nguồn dữ liệu trừu tượng này trong phần mềm quản lý `database` đơn giản đang xây dựng. Chúng ta sẽ tạo ra một thư mục dành riêng cho các View `database/view` và viết code tạo ra một object View chứa 1001 bản ghi `Article`. Lý tưởng ở đây vẫn là việc chúng ta không cần phải tải toàn bộ 1001 bản ghi `Article` vào môi trường phần mềm cùng lúc mà chỉ đơn giản là cung cấp một phương thức cho phép code bên ngoài có thể lặp tuần tự qua nguồn dữ liệu này.

```database/view/Article.js
const readAllRecordId = require("../procedure/sub-procedure/read-all-record-ids--async-throw");
const selectArticleById = require("../procedure/Article/select-by-id--async-throw");
const Article = require("../type/Article");

const ArticleView = class {
   /* --- Provide iterator method */
   async * [Symbol.asyncIterator] () {
      for (var recordId of this.allRecordIds) {
         var selected = new Article();
         await selectArticleById(recordId, selected, this.fieldNames);
         yield selected;
      } // for .. of
   }

   /* --- Index data into the view instance */
   static async indexData(
      out_instance = new ArticleView(),
      in_order = "default", /* default | reversed */
      in_partial = Article.fieldNames
   ) {
      /* --- Initialize allRecordIds */
      out_instance.allRecordIds = [];
      await readAllRecordId(Article.name, out_instance.allRecordIds);
      
      /* --- Order the id-list (if needed) */
      if (in_order == "default")
         { /* keep the order */; }
      else
         out_instance.allRecordIds.reverse();
      
      /* --- Initialize fieldNames */
      out_instance.fieldNames = in_partial;
      
      return ArticleView;
   }
}; // ArticleView

module.exports = ArticleView;
```

Việc khởi tạo thuộc tính `allRecordIds` sẽ cần sử dụng thao tác `async` do đó chúng ta không thể sử dụng `constructor`. Thay vào đó thì một phương thức `static async` có tên là `indexData` được sử dụng để truy vấn danh sách `id` của tất cả các bản ghi và đặt vào `object` đã được khởi tạo rỗng.

Về việc sử dụng `Symbol` để tạo ra phương thức `asyncIterator` hỗ trợ vòng lặp `for await ... of` thì chúng ta đã thực hiện trong bài viết về [Date & Symbol](https://viblo.asia/p/m68Z0BMA5kG) của Sub-Series JavaScript.

Bây giờ thì chúng ta sẽ thử lặp qua toàn bộ 5 bản ghi `Article` đang có trong `database` thông qua View này.

```express-blog/test.js
const ArticleView = require("./database/view/Article");

void async function() {
   var view = new ArticleView();
   await ArticleView.indexData(view, "reversed", ["@id", "title", "short-title", "category-id"])

   for await (var record of view) {
      console.log(record);
   }
} (); // void
```

```CMD|Terminal.io
npm test

Article(4) [Map] {
  '@id' => 'Infinity',
  'title' => Nội Dung Chưa Được Đăng Tải',
  'short-title' => 'Chưa Đăng Tải',
  'category-id' => 'Infinity'
}
Article(4) [Map] {
  '@id' => '0003',
  'title' => 'Sử Dụng Các Nội Dung Nhúng',
  'short-title' => 'Các Nội Dung Nhúng',
  'category-id' => '01'
}
Article(4) [Map] {
  '@id' => '0002',
  'title' => 'Cách Chèn Ảnh & Các Liên Kết',
  'short-title' => 'Ảnh & Liên Kết',
  'category-id' => '01'
}
Article(4) [Map] {
  '@id' => '0001',
  'title' => 'Làm Thế Nào Để Tạo Ra Một Trang Web?',
  'short-title' => 'Giới Thiệu HTML',
  'category-id' => '01'
}
Article(4) [Map] {
  '@id' => '0000',
  'title' => 'Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên',
  'short-title' => 'Tự Học Lập Trình Web',
  'category-id' => '00'
}
```

Và như vậy là chúng ta đã có được một nguồn dữ liệu trừu tượng để làm chất liệu cho các thao tác `select` tổ hợp. Bây giờ chúng ta có thể viết lại code cho thủ tục `select-by-category-id` của nhóm `procedure/Article` bằng cách sử dụng View này làm nguồn truy vấn. Logic xử lý của `select-by-category-id` bây giờ sẽ trở nên đơn giản và dễ quan sát hơn nhiều.

```procedure/Article/select-by-category-id--async-throw.js
const ArticleView = require("../../view/Article");
const Article = require("../../type/Article");

module.exports = async (
   in_categoryId = "",
   out_selected = [],
   in_top = Infinity,
   in_order = "default", /* default | reversed */
   in_partial = Article.fieldNames
) => {
   try {
      /* --- Create view & index data */
      var view = new ArticleView();
      await ArticleView.indexData(view, in_order, in_partial)

      /* --- Loop & Select each record to check */
      for await (var record of view) {
         /* --- Limit the result set */
         if (out_selected.length == in_top)
            break /* out of the loop */;
         else
            { /* keep collecting record */; }

         /* --- Collect the Article if category-id matches */
         if (record.get("category-id") != in_categoryId)
            { /* record is not matched */; }
         else
            out_selected.push(record);
      } // for .. of
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

Và code chạy thử sẽ chọn ra Top 2 bản ghi `Article` mới nhất của danh mục HTML.

```express-blog/test.js
const databaseManager = require("./database/manager");
const Article = require("./database/type/Article");

void async function() {
   var selected = [];

   await databaseManager.execute(
      Article.name, "select-by-category-id",
      /* in_recordId */    "01",
      /* out_selected */   selected,
      /* out_top */        2,
      /* out_order */      "reversed",
      /* out_partial */    ["@id", "title", "short-title", "category-id"]
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
  }
]
```

## Indexed View

Như vậy là chúng ta đã được gặp khái niệm View trong quản lý Database nói chung và đã tạo ra một View để sử dụng cho các thao tác truy vấn tổ hợp trên các bản ghi `Article`. Bạn có thể tạo ra những View khác nữa cho các kiểu bản ghi còn lại là `Category`, `ArticleJoinCategory`, v.v... dựa trên thao tác `select-by-id` cơ bản. Những View này còn được gọi với một cái tên khác là Non-indexed View - có nghĩa là View chưa có dữ liệu sẵn mà chỉ khi nào được khởi tạo và chạy `View.indexData` thì mới có thể được sử dụng.

Các phần mềm quản lý Relational Database thường hỗ trợ chúng ta tạo ra các View kiểu Non-Indexed như trên và bên cạnh đó còn có thêm các View kiểu Indexed. Các Indexed View được triển khai bằng cách tạo ra các tệp dữ liệu thực từ các bản ghi kết quả tiềm năng và các tệp này được cập nhật đồng bộ liên tục với các tệp dữ liệu gốc.

Ví dụ chúng ta có thể tạo ra một Indexed View cho kiểu `ArticleJoinCategory` bằng cách tạo ra một thư mục lưu các tệp dữ liệu là các bản ghi liên hợp tương ứng với kết quả truy vấn. Sau đó xây dựng các Procedure để kích hoạt việc cập nhật các tệp dữ liệu của View này khi các tệp dữ liệu gốc trong hai thư mục `data/Article` và `data/Category` có sự thay đổi.

Ở thời điểm hiện tại thì các Indexed View thực sự chưa có nhiều ý nghĩa đối với việc xây dựng trang blog đơn giản của chúng ta. Thêm vào đó là việc viết code mô phỏng lại tính năng này cho `database/manager` cũng sẽ đem lại sự phức tạp không cần thiết. Do đó chúng ta sẽ ghi chú thêm điểm này và tạm thời dừng lại với phần giới thiệu Indexed View thật mơ hồ. :D

Bây giờ thì chúng ta đã có thể quay trở lại Sub-Series ExpressJS để viết code xử lý các `route` và đăng tải trang blog cá nhân đơn giản lên Glitch.com. Hẹn gặp lại bạn trong những bài viết tiếp theo.

[[ExpressJS] Bài 6 - Viết Code Điều Hành Một Blog Cá Nhân Đơn Giản](https://viblo.asia/p/Eb85oAVkZ2G)