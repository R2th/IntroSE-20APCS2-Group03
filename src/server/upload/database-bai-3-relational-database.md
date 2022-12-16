Trong bài viết này, chúng ta sẽ cùng thảo luận về một chủ đề mới có tên là `Relational Database`. Từ `relational` - tạm dịch là có sự liên hệ, liên quan - được sử dụng ở đây để biểu thị cho tính chất đặc trưng của các bản ghi trong `database`. Khi chúng ta muốn thiết kế một `database` mà dữ liệu được lưu trữ ở dạng các bản ghi có các mối liên hệ qua lại, bổ trợ lẫn nhau; thì chúng ta có thể gọi đây là một `Relational Database`.

## Các mối liên hệ của các bản ghi được biểu thị như thế nào?

Xuất phát điểm là từ nhu cầu muốn mở rộng tính năng cho trang blog đơn giản mà chúng ta đang xây dựng. Trong bài viết trước, chúng ta đã nói tới việc giả định là giao diện web mà chúng ta xây dựng sẽ có thêm các trang đơn trình bày nội dung giới thiệu về một danh mục `category`. Và lúc này hiển nhiên nội dung của mỗi trang đơn `category` cũng là một bản ghi và cần được lưu trữ trong `database` giống như các bản ghi `article` và các bản ghi `admin`.

Như vậy chúng ta đang có các bản ghi `article` và các bản ghi `category` cùng biểu thị một phần thông tin chung - đó là tên hiển thị của các danh mục.

```
   +----------------------------------------------------+
   |   article                                          |
   |      id: 0000                                      |
   |      title: Làm Thế Nào Để Tạo Ra Một Trang Web?   |
   |      short-title: Getting Started                  |
   |                                                    |
   |      category: html                                |
   |                                                    |
   |      keywords: tutorial, html, document            |
   |      edited: Fri, 15 Apr 2022 11:01:34 GMT         |
   |      content: Một nội dung rất rất dài...          |
   +----------------------------------------------------+
   
   +----------------------------------------------------+
   |   article                                          |
   |      id: 0001                                      |
   |      title: Cách Chèn Ảnh & Các Liên Kết           |
   |      short-title: Getting Started                  |
   |                                                    |
   |      category: html                                |
   |                                                    |
   |      keywords: tutorial, html, image, link         |
   |      edited: Fri, 15 Apr 2022 12:03:45 GMT         |
   |      content: Một nội dung khác cũng rất rất dài   |
   +----------------------------------------------------+
   
   +-------------------+
   |   category        |
   |      id: 00       |
   |      name: html   |
   |      ...          |
   +-------------------+
```

Đây là dạng biểu thị khi chúng ta đã truy xuất bằng code và chuyển các bản ghi thành các `object`dữ liệu. Ở đây chúng ta đang có các bản ghi `article` có thuộc tính `category: html`; Và một bản ghi `category` biểu thị tên của danh mục với thuộc tính `name: html`.

Câu chuyện lúc này là giả sử chúng ta đang có 1001 bài viết `article` thuộc danh mục này và muốn thay đổi tên hiển thị của danh mục thành `html5`. Hiển nhiên là trước hết chúng ta sẽ thay đổi giá trị của thuộc tính `name` trong bản ghi `category` ở trên. Tuy nhiên để đảm bảo kết quả hiển thị đồng nhất ở cả những trang đơn bài viết nữa thì chúng ta sẽ cần phải sửa lại luôn cả giá trị của thuộc tính `category` trong 1001 bản ghi `article` và tạo ra sự thay đổi tương ứng trong cấu trúc tệp là ở phần tên của các thư mục đại diện cho các bản ghi `article`.

Phương án xử lý như thế này là hoàn toàn khả thi và không khó khăn đối với khả năng xử lý của máy tính và khả năng viết code của chúng ta ở thời điểm hiện tại. Tuy nhiên ở đây chúng ta lại có thể tiếp tục cải thiện cái `convention` lưu trữ dữ liệu thêm một chút - để code của chúng ta không cần phải thực hiện thao tác xử lý lặp với một tập kết quả truy vấn. Cụ thể là ở các bản ghi `article`, thay vì lưu trữ trực tiếp tên hiển thị của một `category`, chúng ta có thể lưu trữ trị số định danh `id` của `category` đó.

```
   +-------------------------+
   |   article               |
   |      id: 0000           |
   |      title: ...         |
   |      short-title: ...   |
   |                         |
   |      category-id: 00    |
   |      ...                |
   +-------------------------+
   
   +-------------------------+
   |   article               |
   |      id: 0001           |
   |      title: ...         |
   |      short-title: ...   |
   |                         |
   |      category-id: 00    |
   |      ...                |
   +-------------------------+
   
   +-------------------+
   |   category        |
   |      id: 00       |
   |      name: html   |
   |      ...          |
   +-------------------+
```

Lúc này, khi truy vấn nội dung của một bản ghi `article` và gửi phản hồi cho trình duyệt web, chúng ta có thể thực hiện thao tác tìm kiếm tên hiển thị của danh mục tương ứng bằng cách đi từ trị số được lưu ở khóa `category-id` và tìm tới bản ghi `category` tương ứng để truy xuất giá trị của thuộc tính `name`.

Như vậy là các bản ghi `article` đã có sự lệ thuộc vào thông tin chi tiết được cung cấp bởi các bản ghi `category` và chúng ta đã có thể gọi cơ sở dữ liệu của chúng ta là `relational database`.

## Các dạng thức liên hệ có thể xuất hiện trong Relational Database

Trong ví dụ ở phần trên, chúng ta có dữ liệu của một bản ghi `category` được sử dụng bởi 1001 bản ghi `article` thuộc danh mục `html`. Dạng thức liên hệ này thường được được gọi tên là `one-to-many` - hay `một-và-1001` - đại ý nói là khi một bản ghi thuộc một kiểu dữ liệu này được tham chiếu tới từ 1001 bản ghi thuộc một kiểu dữ liệu khác.

Bên cạnh đó thì trong những trường hợp sử dụng khác, chúng ta sẽ có thể có những dạng thức liên hệ khác là -

- Dạng thức `one-to-one` - hay `một-và-một` - khi một bản ghi thuộc kiểu dữ liệu này được tham chiếu tới từ duy nhất một bản ghi thuộc kiểu dữ liệu khác, và ngược lại.
- Dạng thức `many-to-many` - hay `1001-và-1001` - khi mỗi bản ghi thuộc kiểu dữ liệu này có thể được tham chiếu tới từ 1001 bản ghi thuộc kiểu dữ liệu khác, và ngược lại.

### a. One-to-One

Dạng thức `one-to-one` thường được sử dụng khi chúng ta muốn tách rời một nhóm dữ liệu khỏi một bản ghi lớn, để sử dụng cho mục đích truy xuất riêng và biểu thị tới người dùng hoặc xử lý logic đặc trưng nào đó của web hay phần mềm. 

Ví dụ như khi bạn xây dựng một nền tảng blog cho nhiều người dùng; việc quản lý thông tin người dùng có thể được lưu trữ bằng các bản ghi `user` và `person` như sau -

```
   +-----------------------+       +-----------------------+
   |   user                |       |   person              |
   |      id: ...          |       |      id: ...          |
   |      username: ...    |       |      firstname: ...   |
   |      password: ...    |       |      lastname: ...    |
   |                       |       |      address: ...     |
   |      person-id: ...   |       |      mobile: ...      |
   +-----------------------+       |      email: ...       |
                                   |      ...              |
                                   +-----------------------+
```

Ở đây thông tin của mỗi người dùng được biểu thị bằng một bản ghi lớn và được tách ra làm hai nhóm thông tin `user` và `person`. Mục đích của thiết kế này là để tách rời nhóm thông tin hiển thị `person` khỏi các thông tin dành cho chức năng đăng nhập. Điều này giúp cho chúng ta có thể sử dụng các bản ghi `person` trong code xử lý các tác vụ khác mà không gặp phải rủi ro về việc thao tác nhầm trên các thông tin đăng nhập cần bảo vệ.

### b. one-to-1001

Với ví dụ mở đầu của bài viết thì chúng ta đã biết về `one-to-1001` rồi. Dạng thức này được sử dụng khi phần mềm của chúng ta cần phân chia các bản ghi của một kiểu dữ liệu nào đó thành các hạng mục không giao thoa - tức là mỗi bản ghi sẽ chỉ thuộc một hạng mục duy nhất.

### c. 1001-to-1001

Để lấy ví dụ mô tả cho dạng thức này, chúng ta hãy giả định là blog đơn giản mà chúng ta đang xây dựng sẽ có thêm một tính năng nữa - đó là các trang đơn biểu thị cho các từ khóa `keywords` hay còn được gọi là các thẻ `tags`. Đại loại là các trang đơn đó sẽ có dạng giống với một trang hiển thị cho thẻ `tutorial` của Viblo như thế này -

[https://viblo.asia/tags/tutorial](https://viblo.asia/tags/tutorial)

Trang đơn này hiển thị các bài viết được các tác giả gắn thẻ `tutorial` và không quan trọng là các bài viết này thuộc danh mục gì - ngôn ngữ nào, framework nào, v.v... - cứ miễn được gắn thẻ `tutorial` là sẽ được hiển thị.

Như vậy là lúc này chúng ta sẽ có thêm các bản ghi `tag` thay thế cho việc lưu trữ các từ khóa trực tiếp trong các bản ghi `article`. Đồng thời, chúng ta có thể thấy rằng mỗi bản ghi `tag` có thể được sử dụng bởi nhiều bản ghi `article`, và ngược lại.

Việc thể hiện mối liên hệ giữa các bản ghi `article` và các bản ghi `tag` trong `database` ở trường hợp này sẽ tùy thuộc vào các khả năng mà môi trường phần mềm cung cấp. Do chúng ta đang lưu trữ bằng các tệp tĩnh tự tạo quy ước và xử lý bằng code JavaScript, các liên kết giữa các bản ghi có thể biểu thị bằng cách lưu một mảng `id` của các `tag` trong mỗi bản ghi `article` - và ngược lại.

```
   +----------------------------------------+
   |   article                              |
   |      id: ...                           |
   |      ...                               |
   |      tag-id: 00000000, 00000001, ...   |
   |      ...                               |
   +----------------------------------------+

   +------------------------------------+
   |   tag                              |
   |      id: ...                       |
   |      name: ...                     |
   |      article-id: 0001, 0009, ...   |
   |      ...                           |
   +------------------------------------+
```

Như vậy là chúng ta đã có thể truy xuất tới tên của các `tag` liên quan từ mỗi bản ghi `article`; Hoặc truy xuất tới các bản ghi `article` tương ứng từ mỗi bản ghi `tag`.

## Phần mềm quản trị Database

Như vậy là tính tới thời điểm này, chúng ta đã đi qua những kiến thức cơ bản về `database` và đã có thể bắt tay vào việc viết code chi tiết cho một `module` quản lý `database` - chính là tệp `manager.js` mà chúng ta đã có từ quy ước ở đầu `Sub-Series` này. Đó có thể được xem là một phần mềm quản trị `database` được nhúng trong bộ code web mà chúng ta đang xây dựng.

Việc tự thiết kế và viết một phần mềm quản trị `database` cho nhu cầu sử dụng không quá phức tạp là rất quan trọng. Tuy nhiên mọi thứ sẽ trở nên dễ dàng hơn nếu như chúng ta có một nguồn tham khảo. Và cách tốt nhất để có kinh nghiệm về việc thiết kế một thứ gì đó - là chúng ta cần sử dụng một thứ đã được xây dựng sẵn bởi những người đi trước và đã được sử dụng rộng rãi trong cộng đồng.

Nói riêng về `relational database`, nếu như bạn Google thử từ khóa này thì sẽ thấy các kết quả tìm kiếm đều liên quan tới một hệ quản trị `database` có tên là `SQL ... gì đó`. Hệ quản trị này bao gồm một `database` trừu tượng được lưu trữ ở dạng các tệp đặc biệt mà chúng ta sẽ không bao giờ phải mở xem trực tiếp; và một phần mềm quản trị cho phép chúng ta tự thiết kế dạng thức của các kiểu dữ liệu ở dạng các bảng chứa các bản ghi.

Môi trường vận hành của `SQL ...` có phần kém linh động hơn so với khả năng truy xuất các tệp tĩnh của JavaScript mà chúng ta đang sử dụng. Và đối với dạng thức liên hệ `many-to-many` ở trên thì chúng ta sẽ cần thiết kế một bảng dữ liệu trung gian để biểu thị mối liên hệ giữa các bản ghi `article` và các bản ghi `tag`. Tuy nhiên bù lại thì chúng ta sẽ có được sự đảm bảo về mặt nhất quán dữ liệu nhờ các công cụ hỗ trợ tạo các ràng buộc giữa các bản ghi.

Nếu như bạn có ý định xây dựng một website với tính năng phong phú hoặc cần mở rộng kiến thức ở mảng này để phục vụ cho công việc mơ ước trong tương lai thì mình khuyến khích là bạn nên bắt đầu học `SQL` ngay bây giờ. Bản thân mình thì không có nhu cầu sử dụng tới các hệ quản trị CSDL vì không có nhu cầu tạo ra ứng dụng thực tế có mức độ phức tạp và yêu cầu bảo mật như vậy. Do đó nên ở đây mình chỉ có thể chia sẻ với bạn một vài địa chỉ web tin cậy, có thể hỗ trợ tiến trình tự học `SQL` của bạn tốt hơn:

- [W3schools.com](https://www.w3schools.com/sql/)
- [TutorialsPoint.com](https://www.tutorialspoint.com/sql/index.htm)
- [SQLTutorial.org](https://www.sqltutorial.org/)

## Tự code một cái RDBMS đơn giản

Hmm.. nếu tính từ thời điểm chúng ta bắt đầu học code `server-side` cho tới giờ thì hình như chặng đường mà chúng ta đã đi qua cũng khá dài rồi; Và có lẽ chúng ta cần có một kết quả biểu thị để có tinh thần tiếp tục tìm hiểu thêm những kiến thức mới.

Tuy nhiên thì do bản thân mình không có nhu cầu sử dụng tới `SQL` nên ở đây chúng ta sẽ cần phải viết code để tự quản lý CSDL cho blog cá nhân đang xây dựng trên nền NodeJS. Mặc dù là rủi ro rằng sau một thời gian nữa chúng ta có thể sẽ phải thực hiện khá nhiều thay đổi đối với cả `database` và code xử lý khi có thêm những kiến thức và tầm nhìn mới. Hy vọng bạn sẽ tiếp tục cùng đồng hành. :D

[[Database] Bài 4 - Viết Code Quản Lý Một Database Đơn Giản](https://viblo.asia/p/Do754rbJZM6)