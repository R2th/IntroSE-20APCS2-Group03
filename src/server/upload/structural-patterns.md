Chào các bạn, trong bài viết [trước](https://viblo.asia/p/creational-design-pattern-bWrZnpjr5xw) thì mình đã giới thiệu về **Creational Patterns** và một số mẫu cơ bản trong nhóm **Design Pattern** này. Và để tiếp tục loạt bài về **Design Pattern** thì mình sẽ trình bày về **Structural Patterns** và **Adapter**-một trong những mẫu thiết kế thuộc về **Structural Patterns**.
# Structural Patterns
Trong Kỹ thuật phần mềm, Các Structural Patterns (SP) là các Design Pattern (DP) giúp dễ dàng thiết kế bằng cách xác định một cách đơn giản để nhận ra mối quan hệ giữa các thực thể.<br>
Có rất nhiều mẫu thiết kế trong nhóm này mà chúng ta có thể liệt kê: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Private Class Data và Proxy. Và sau đây mình sẽ giới thiệu rõ hơn với các bạn về **Adapter**.
# Adapter
## Định nghĩa
Adapter Pattern là pattern giữ vai trò trung gian giữa hai lớp, chuyển đổi giao diện của một hay nhiều lớp có sẵn thành một giao diện khác, thích hợp cho lớp đang viết. Điều này cho phép các lớp có các giao diện khác nhau có thể dễ dàng giao tiếp tốt với nhau thông qua giao diện trung gian, không cần thay đổi code của lớp có sẵn cũng như lớp đang viết. Adapter Pattern còn gọi là Wrapper Pattern do cung cấp một giao diện “bọc ngoài” tương thích cho một hệ thống có sẵn, có dữ liệu và hành vi phù hợp nhưng có giao diện không tương thích với lớp đang viết.
## Các khái niệm
Để hiểu về sơ đồ mô tả Adapter Pattern thì trước hết bạn phải hiểu về 3 khái niệm:
* Client: Đây là lớp sẽ sử dụng đối tượng của bạn (đối tượng mà bạn muốn chuyển đổi giao diện).
* Adaptee: Đây là những lớp bạn muốn lớp Client sử dụng, nhưng hiện thời giao diện của nó không phù hợp.
* Adapter: Đây là lớp trung gian, thực hiện việc chuyển đổi giao diện cho Adaptee và kết nối Adaptee với Client.
## Phân loại
Trong hướng đối tượng có hai khái niệm quan trọng song hành cùng nhau, đó là:
* Composition: cấu thành. Nghĩa là một lớp B nào đó sẽ trở thành một thành phần của lớp A (một field trong lớp A). Tuy lớp A không kế thừa lại giao diện của lớp B nhưng nó có được mọi khả năng mà lớp B có.
* Inheritance: kế thừa. Nghĩa là một lớp Derived sẽ kế thừa từ lớp Base và thừa hưởng tất cả những gì lớp Base có. Nhờ kế thừa mà nó giúp tăng khả năng sử dụng lại code, tăng khả năng bảo trì và nâng cấp chương trình. Và do vậy kế thừa là khái niệm trọng tâm trong hướng đối tượng. Nhưng nó có một nhược điểm, đôi khi nếu chúng ta quá lạm dụng nó, nó sẽ làm cho chương trình của chúng ta phức tạp lên nhiều, điển hình là trong lập trình game. Do vậy đôi lúc trong lập trình game người ta thường có khuynh hướng thích sử dụng composition hơn.
## Sơ đồ minh họa
![](https://images.viblo.asia/7f625496-cac5-41f6-bd27-5d45431cc9c5.png)<br>
Các bước giải quyết một vấn đề theo Adapter
* Xác định đối tượng: xác định các thành phần muốn được cung cấp (client) và thành phần cần điều chỉnh (adaptee).
* Xác định giao diện mà client yêu cầu.
* Thiết kế một lớp wrapper có thể có khả năng phù hợp với adaptee và client.
* Lớp adapter/wrapper có một phiên bản của lớp adaptee.
* Lớp adapter/wrapper nối giao diện của client đến giao diện của adaptee.
* Client sử dụng (được ghép nối với) giao diện mới.
## Ví dụ
Trong ví dụ này, chúng ta có một lớp `SimpleBook` có các phương thức `getAuthor ()` và `getTitle ()`. Client mong đợi một phương thức `getAuthorAndTitle ()`. Để thích nghi `SimpleBook` với việc kiểm tra, chúng ta có một lớp adapter, `BookAdapter`, lấy một thể hiện của `SimpleBook` và sử dụng các phương thức của `SimpleBook` là `getAuthor ()` và `getTitle ()` trong phương thức `getAuthorAndTitle ()` của chính nó.<br><br>
Adapter rất hữu ích nếu bạn muốn sử dụng một lớp không có các phương thức chính xác mà bạn cần và bạn có thể thay đổi lớp gốc. Adapter có thể sử dụng các phương thức bạn có thể truy cập trong lớp gốc và điều chỉnh chúng thành các phương thức bạn cần.<br>
Code minh họa
```
<?php

class SimpleBook {
    private $author;
    private $title;
    function __construct($author_in, $title_in) {
        $this->author = $author_in;
        $this->title  = $title_in;
    }
    function getAuthor() {
        return $this->author;
    }
    function getTitle() {
        return $this->title;
    }
}

class BookAdapter {
    private $book;
    function __construct(SimpleBook $book_in) {
        $this->book = $book_in;
    }
    function getAuthorAndTitle() {
        return $this->book->getTitle().' by '.$this->book->getAuthor();
    }
}

  // client

  writeln('BEGIN TESTING ADAPTER PATTERN');
  writeln('');

  $book = new SimpleBook("Gamma, Helm, Johnson, and Vlissides", "Design Patterns");
  $bookAdapter = new BookAdapter($book);
  writeln('Author and Title: '.$bookAdapter->getAuthorAndTitle());
  writeln('');

  writeln('END TESTING ADAPTER PATTERN');

  function writeln($line_in) {
    echo $line_in."<br/>";
  }

?>
```
**Output**
```
BEGIN TESTING ADAPTER PATTERN

Author and Title: Design Patterns by Gamma, Helm, Johnson, and Vlissides

END TESTING ADAPTER PATTERN
```
# Lời kết
Trên đây chỉ là tổng quan về Adapter pattern, hy vọng bài viết này sẽ hữu ích đối với bạn 😃.