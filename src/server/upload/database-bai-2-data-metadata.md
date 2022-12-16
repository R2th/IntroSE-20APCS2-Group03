Trong bài viết này, chúng ta sẽ cùng gặp gỡ hai khái niệm `convention` đầu tiên về lưu trữ dữ liệu trong `database` - đó là `Dữ Liệu & Phần Mô Tả Dữ Liệu` - hay `Data & Metadata`.

## Tiền tố Meta

Từ `data` hay `Dữ Liệu` thì chúng ta đã rõ rồi. Không có gì để băn khoăn với viên gạch mở đầu cả. Còn từ `meta`, đâu đó được Google và Wikipedia định nghĩa là một thành phần mô tả ngắn gọn và xúc tích hơn về chính đối tượng mà nó đang đứng trước. Điều đó có nghĩa là nó cũng sẽ được hiểu một cách tương đối tính từ vị trí quan sát, và ở đây chúng ta có `metadata` được sử dụng để mô tả ngắn gọn về `data`. Thế nhưng mô tả như thế nào?

Góc nhìn của chúng ta lúc này là đối tượng sử dụng dữ liệu đang là `máy tính`. Và vì vậy nên chúng ta có thể hiểu `metadata` là một dạng mô tả ngắn gọn về `data` để khiến `máy tính` hiểu được một phần nào đó về `data`. Thế nhưng máy tính thì hiểu được gì nhỉ?

Hmm... chúng ta đang xây dựng một blog đơn giản chứ không phải là một phần mềm trợ lý thông minh AI. Thế nên hiển nhiên là code quản lý `database` do chúng ta viết ra sẽ không hiểu được ngữ cảnh của các câu chuyện bên trong một tệp. Nhưng nếu nói riêng về việc tổ chức lưu trữ dữ liệu, thì lại có khá nhiều thông tin mà chúng ta có thể cung cấp cho code quản lý `database` để hiểu về các tệp lưu trữ. 

Ví dụ cụ thể là... bài viết `article` này được tạo ra đầu tiên hay là bài viết thứ 1001? Hay có số thứ tự `id` là bao nhiêu?

Hoặc nếu như blog của bạn có chia danh mục cho các bài viết thì... bài viết `article` này được xếp vào danh mục nào?

Và như vậy là chúng ta đã có một vài thuộc tính `metadata`đầu tiên để mô tả về các tệp lưu trữ bài viết - để giúp cho máy tính có thể `nhìn lướt qua` là biết được tệp nào là tệp mà chúng ta muốn truy xuất thông tin. Bây giờ chúng ta sẽ tạo ra một thư mục `database` trong `project express-blog` đang xây dựng để viết code cung cấp những tính năng truy xuất dữ liệu cơ bản để code xử lý ở các `route` có thể sử dụng.

## Cấu trúc thư mục lưu trữ dữ liệu

Ở đây chúng ta sẽ chỉ quan tâm duy nhất tới thư mục `database` và code cung cấp các thao tác truy xuất dữ liệu là một tệp `manager.js` được đặt ngay ở cấp đầu tiên của thư mục `database`. 

Chúng ta sẽ tạo ra 2 tệp `article` lưu nội dung của 2 bài viết và 1 tệp `admin` lưu nội dung của 1 tác giả. Mỗi một tệp `article` hay `admin` lưu nội dung đầy đủ về một đối tượng dữ liệu (bài viết hoặc tác giả) như thế này còn được gọi là một `bản ghi` hay `record`.

```structure.txt
[express-blog]
   |
   +-------------[database]
   |                |
   |                +---------[data]
   |                |            |
   |                |            +-----article--id-0000--category-html.md
   |                |            +-----article--id-0001--category-html.md
   |                |            +-----admin--id-00.json
   |                |
   |                +---------manager.js
   |
   +---test.js
```

Đây là cấu trúc tên của các tệp mà chúng ta khởi điểm để bắt đầu thảo luận chi tiết hơn -

- Với cách đặt tên như thế này, chúng ta đang có các tệp lưu nội dung bài viết được phân biệt với các tệp lưu thông tin tác giả bởi từ khóa đầu tiên trong tên các tệp là `article` và `admin`.
- Sau đó mỗi tệp bài viết lại có một trị số định danh `id` để phân biệt với nhau và đồng thời cũng là trình tự mà các tệp được tạo ra.
- Cuối cùng là các danh mục mà chúng ta sắp xếp các tệp có nội dung liên quan sẽ được thể hiện bằng từ khóa thứ ba trong tên tệp.

Lúc này chúng ta có thể giả định là đã có một giao diện web hoàn chỉnh và người dùng nhấn vào một liên kết yêu cầu xem bài viết đầu tiên là `htttps://your-name.com/article/0001`; Và chắc chắn là chúng ta sẽ có thể tách lấy `id` trong `path` yêu cầu `/article/:id` và gọi tới code ở `manager.js` yêu cầu truy xuất tệp `article--id-0001`; Sau đó gửi trả lại nội dung cho trình duyệt web. Tuy nhiên chúng ta hãy khởi đầu với thao tác đơn giản là  truy xuất tên của tất cả các bản ghi `article` và in ra `console`.

```database/data/manager.js
const fsPromises = require("fs/promises");
const path = require("path");
const pathToDataFolder = path.join(__dirname, "data");

const queryAllArticles = async function() {
   fsPromises
      .opendir(pathToDataFolder)
      .then(async function(dir) {
         for await (var dirEnt of dir) {
            console.log(dirEnt.name);
         } // for await
      })
      .catch(function(error) {
         console.error(error);
      });
}; // queryAllArticles

module.exports = {
   queryAllArticles
};
```

- [`fsPromises.openDir`](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fspromisesopendirpath-options) - mở một thư mục.
- [`fs.Dir`](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#class-fsdir) - `object` mô tả thư mục.
- [`fs.Dirent`](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#class-fsdirent) - `object` mô tả các thành phần bên trong một thư mục.

```test.js
const databaseManager = require("./database/manager");
databaseManager.queryAllArticles();
```

```CMD|Terminal.io
cd Documents/express-blog
npm test

article--id-0000--category-html.md
article--id-0001--category-html.md
admin--id-00.json
```

Hmm... Như vậy là ở đây chúng ta sẽ phải thêm thao tác lọc và tách các tệp `article` thành nhóm riêng. Rồi mới có thể thực hiện in danh sách tệp được. Rõ ràng là cái `convention` về cấu trúc thư mục của chúng ta có thể cải thiện thêm ở điểm này để giảm thao tác làm việc với tập kết quả cho code. Bây giờ chúng ta sẽ đặt các tệp `article` vào trong một thư mục con của `data` và tệp `admin` vào một thư mục khác.

```structure.txt
[database]
   |
   +---------[data]
   |            |
   |            +-----[article]
   |            |        |
   |            |        +--------id-0000--category-html.md
   |            |        +--------id-0001--category-html.md
   |            |
   |            +-----[admin]
   |                     |
   |                     +---id-00.json
   |
   +---------manager.js
```

Tuyệt... lúc này mọi thứ dường như đã được tách bạch tốt hơn và chúng ta có thể thực hiện thao tác riêng với các bản ghi `article` hoặc các bản ghi `admin` trong code mà  không phải thực hiện thao tác xử lý phụ không đáng có. Do chúng ta đã sử dụng tên kiểu dữ liệu làm tên thư mục để phân loại các bản ghi nên chúng ta có thể lược bỏ bớt thành tố đầu tiên trong tên của các tệp dữ liệu và sử dụng các tên tệp  xuất phát từ `id`.

```database/data/manager.js
const fsPromises = require("fs/promises");
const path = require("path");
const pathToDataFolder = path.join(__dirname, "data");
const pathToArticleFolder = path.join(pathToDataFolder, "article");

const queryAllArticles = async function() {
   fsPromises
      .opendir(pathToArticleFolder)
      .then(async function(dir) {
         for await (var dirEnt of dir) {
            console.log(dirEnt.name);
         } // for await
      })
      .catch(function(error) {
         console.error(error);
      });
}; // queryAllArticles

module.exports = {
   queryAllArticles
};
```

```CMD|Terminal.io
npm test

id-0000--category-html.md
id-0001--category-html.md
```

Như vậy là tới điểm này thì chúng ta đã có thể xử lý tiếp bằng cách kiểm tra `id` yêu cầu trong danh sách tên các tệp được in ra để chọn đúng tệp cần đọc dữ liệu và gửi phản hồi cho người dùng.

Tuy nhiên bây giờ chúng ta cần quan tâm hơn tới những nội dung được hiển thị, cụ thể là một trang web đơn trình bày một `article` có thể sẽ cần thêm một vài thông tin nữa về các bài viết. Ví dụ như các từ khóa liên quan `keywords`, hay thời gian chỉnh sửa lần cuối `edited-datetime`, và một tên mô tả ngắn hơn tiêu đề gốc `short-title` để sử dụng cho thanh điều hướng phụ ở bên cạnh khung hiển thị nội dung chính của trang web.

## Bổ sung các Metadata khác

Khi có thêm nhiều `metadata` cần lưu trữ thêm như trên vào một bản ghi `article`, thì chúng ta có thể sử dụng quy ước ngầm định về nội dung bên trong của các tệp dữ liệu. Ví dụ như chúng ta có thể lưu một chuỗi JSON ở ngay phần nội dung mở đầu của các tệp `article` để mô tả các dữ liệu bổ sung như trên, sau đó có thể tách lấy chuỗi JSON này khi đọc nội dung của các tệp.

Phương thức lưu trữ dữ liệu bổ sung như thế này được gọi là lưu trữ dữ liệu tiền tố. Ví dụ điển hình là [Jekyll của Github](https://jekyllrb.com/docs/front-matter/) gọi đây là các `Front Matter` và lưu trữ ở định dạng YAML - một định dạng mô tả dữ liệu theo kiểu object với các cặp `khóa/giá trị` giống với JSON.

```article.md
---
title: How to create a website?
short: Getting Started
datetime: 2017-07-27 05:00:00
---

Forget about technical and academic views. We go online everyday. We can start at homepage of [a website](https://medium.com/ "ext") and explore thousands of its pages. That's it.

> A website is a collection of many webpages.  
> \_\_A simple & happy Mind

So if you want to create a website, just start it simply by learning how to create a single webpage.
```

Thao tác để tách lấy phần dữ liệu tiền tố thì chúng ta có thể học theo `Front Matter` của Jekyll bằng cách sử dụng các dài ký hiệu phân tách `---` để khoanh vùng các dữ liệu bổ sung tách rời khỏi phần nội dung chính của bài viết. 

Tuy nhiên như vậy sẽ hơi bất tiện khi chúng ta chỉ muốn truy xuất các `Front Matter` cho một thao tác duyệt nhanh các bản ghi mà code xử lý lại phải thực hiện thao tác đọc toàn bộ nội dung của một tệp bài viết dài rồi sau đó mới tách lấy `Front Matter`. Ở đây chúng ta lại có thể tiếp tục cải thiện cái `convention` về cấu trúc thư mục dữ liệu như sau -

```structure.txt
[database]
   |
   +---------[data]
   |            |
   |            +-----[article]
   |            |        |
   |            |        +--------[id-0000]
   |            |        |           |
   |            |        |           +---header.json
   |            |        |           +---content.md
   |            |        |
   |            |        +--------[id-0001]
   |            |                    |
   |            |                    +---header.json
   |            |                    +---content.md
   |            |
   |            +-----[admin]
   |                     |
   |                     +---id-00.json
   |
   +---------manager.js
```

Lúc này chúng ta có mỗi bản ghi `article` được thể hiện bởi một thư mục có tên dạng `id-0000`, và phần nội dung chính của các bài viết `content` vẫn được đặt trong các tệp `.md`; Còn các `metadata` đều được lưu trữ trong một tệp rời `header.json` - ngoại trừ `id` được sử dụng để làm thành phần định danh cho bản ghi đã được sử dụng làm tên tư mục tổng. Chúng ta cũng có thể lưu cả tiêu đề đầy đủ của bài viết trong tệp `header.json` với một khóa `title` nữa, thay vì lưu cùng với phần nội dung chính của `article`.

```database/data/article/id-0000/header.json
{
   "@id": "0000"
   "title": "Làm Thế Nào Để Tạo Ra Một Trang Web?",
   "short-title": "Giới Thiệu Mở Đầu",
   "category": "html",
   "keywords": [
      "hướng dẫn cơ bản",
      "html",
      "giới thiệu"
   ],
   "edited-datetime": "Sat, 16 Apr 2022 10:13:22 GMT"
}
```

Với cách thức tổ chức thư mục như thế này, các thao tác truy vấn và lọc nhanh các bản ghi theo các dữ liệu bổ sung có thể được thực hiện đơn giản và không cần đọc các tệp dữ liệu chi tiết `content.md`; Và khi đã xác định được bản ghi cần gửi cho người dùng thì chúng ta có thể viết code đọc thêm nội dung tệp `content.md` của bản ghi đó rất đơn giản.

## Kết thúc bài viết

Như vậy là chúng ta đã đi qua một số phân tích cơ bản khi thiết kế cấu trúc thư mục để lưu trữ dữ liệu và hiểu nôm na về các khái niệm tương đối `Data & Metadata`.

Ở thời điểm hiện tại thì chúng ta đã có thể lưu trữ các bản ghi `article` và truy xuất khi người dùng nhấn vào một liên kết bằng cách tách lấy `id` trong tham số đường dẫn URL. Và như vậy là về cơ bản, chúng ta đã có thể viết code hoàn thiện việc xây dựng blog đơn giản. Tuy nhiên với thiết kế `database` như trên thì chúng ta vẫn còn một số hạn chế khi mở rộng tính năng của blog một chút.

Đơn cử là nếu như bạn xây dựng giao diện sử dụng blog có thêm các trang đơn thể hiện nội dung mô tả một danh mục bài viết; thì lúc này mỗi danh mục sẽ là một bản ghi `category` và cần được lưu trữ trong `database` giống như các bản ghi `article`.

```structure.txt
[database]
   |
   +---------[data]
   |            |
   |            +-----[article]
   |            |        |
   |            |        +--------[id-0000]
   |            |        |           |
   |            |        |           +--------header.json
   |            |        |           +--------content.md
   |            |        |
   |            |        +--------[id-0001]
   |            |                    |
   |            |                    +--------header.json
   |            |                    +--------content.md
   |            |
   |            +-----[category]
   |            |        |
   |            |        +---------[id-00]
   |            |                     |
   |            |                     +------header.json
   |            |                     +------content.md
   |            |
   |            +-----[admin]
   |                     |
   |                     +---id-00.json
   |
   +---------manager.js
```

```database/data/category/id-00/header.json
{
   "name": "html"
   "keywords": [
      "hướng dẫn cơ bản",
      "html",
      "giới thiệu"
   ]
}
```

Và chúng ta có thể thấy rằng giữa các bản ghi `article` và các bản ghi `category` có một sự liên quan hơi nhè nhẹ; Nếu như chúng ta thực hiện thao tác chỉnh sửa một bản ghi `category` để thay đổi tên hiển thị của một danh mục; thì để đảm bảo tính nhất quán của dữ liệu - code của chúng ta lúc này cũng sẽ cần phải cập nhật lại tên thư mục của 1001 bản ghi `article` đang thuộc danh mục đó; Hoặc... là ở đây chúng ta đang có thêm một chủ đề mới để tìm hiểu. :D

[[Database] Bài 3 - Relational Database](https://viblo.asia/p/yMnKMRMgZ7P)