Scope giống như oxy đối với một lập trình viên. Nó ở khắp mọi nơi. Bạn thường không nghĩ đến nó. Nhưng khi nó bị ô nhiễm, bạn sẽ bị ngạt thở.

Tin vui là những nguyên tắc cở bản về scope trong JavaScript lại hết sức đơn giản, được thiết kế tốt và cực kỳ mạnh mẽ. Nhưng có những ngoại lệ. Làm việc hiệu quả với JavaScript đòi hỏi phải làm chủ một số khái niệm cơ bản scope của biến cũng như các tình huống có thể dẫn tới những vấn đề hiểm họa.

### **Item 8: Minimise Use of the Global Object**

JavaScript làm cho việc khởi tạo biến trong không gian tên toàn cục (global namspace - GN) trở nên dễ dàng. Các biến toàn cục (global variable) tốn ít effort hơn để tạo bởi vì chúng không đòi hỏi việc khai báo và chúng có thể truy cập tự động ở khắp chương trình. Việc thuận tiện này biến chúng thành cạm bẫy đối với người mới bắt đầu. Nhưng những lập trình viên dày dạn biết tránh dùng biến toàn cục. Khai báo các biến toàn cục làm vấy bẩn không gian tên chung được chia sẻ bởi mọi người - điều có thể dẫn tới việc đụng độ tên. Các biến toàn cục đi ngược lại việc làm mịn: Chúng gây ra sự móc nối không mong muốn giữa các component riêng biệt của một chương trình. Các lập trình viên tốt nhất thường chú ý tới cấu trúc của các chương trình mà họ viết, liên tục nhóm các chức năng liên quan và các component không liên quan như một phần của quá trình lập trình.

Bởi vì GN là một cách thực tiễn để các component riêng biệt tương tác, việc sử dụng các GN là không thể tránh khỏi. Mỗi component hay thư viện phải định nghĩa một cái tên toàn cục để các phần khác của chương trình có thể sử dụng. Chắc chắn có thể việc một chương trình không có gì ngoài các biến toàn cục nhưng vấn để có thể xuất hiện. Thậm chí những hàm đơn giản định nghĩa các biến tạm thời một các toàn cục có thể khiến bạn bận tâm rằng liệu có đoạn code khác sử dụng cùng những tên biến đó hay không:

```JavaScript
var i, n, sum; // globals
function averageScore(players) {
    sum = 0;
    for (i = 0, n = players.length; i < n; i++) {
        sum += score(players[i]);
    }
    return  sum / n;
}
```

Việc định nghĩa `averageScore` sẽ không hoạt động nếu hàm `score` mà nó phụ thuộc lại sử dụng cùng các biến toàn cục đó:

```JavaScript
var i, n, sum; // same globals as averageScore!
function score(player) {
    sum = 0;
    for (i = 0, n = player.levels.length; i < n; i++) {
        sum += player.levels[i].score;
    }
    return  sum;
}
```

Câu trả lời là giữ các biến đó là biến cục bộ đối chỉ với các đoạn code cần chúng:

```JavaScript
function averageScore(players) {
    var i, n, sum;
    sum = 0;
    for (i = 0, n = players.length; i < n; i++) {
        sum += score(players[i]);
    }
    return  sum / n;
}
```

GN của JavaScript cũng là một đối tượng toàn cục (global object - GO) - cái mà có thể truy cập ở trên đỉnh của chương trình như là giá trị khởi tạo của keyword `this`. Trong các trình duyệt, GO cũng bị giới hạn bởi biến toàn cục `window`. Việc thêm hay thay đổi các biến sẽ tự động update GO:

```JavaScript
this.foo; // undefined
foo = "global foo";
this.foo; // "global foo"
```

Tương tự, update GO cũng tự động update GN:

```JavaScript
var foo = "global foo";
this.foo = "changed";
foo; // "changed"
```

Điều này có nghĩa là bạn có hai cơ chế để tạo một biến toàn cục: Bạn có khai báo nó với `var` trong phạm vi toàn cục hoặc bạn có thể thêm nó vào GO. Cả hai cách đều được nhưng việc khai báo `var` lợi ích vì tính tường minh của nó. Mặc dù việc tham chiếu tới một unbound variable sẽ dẫn tới lỗi runtine (runtime error), việc làm cho scope rõ ràng và đơn giản sẽ làm cho người đọc có thể dễ dàng hiểu những gì được khai báo.

Mặc dù tốt nhất là hạn chế việc sử dụng GO, có một trường hợp bất khả kháng mà chúng ta cần phải dùng. Bởi vì GO phản ánh môi trường toàn cục (global environment), bạn có thể sử dụng nó để query môi trường đang chạy để tìm ra các tính năng sẵn có của nền tảng. Ví dụ, ES5 đưa vào đối tượng JSON toàn cục (global JSON object) dành cho việc đọc và viết định dạng dữ liệu JSON. Như là một sự thay thế tạm thời để deploy code trong các môi trường mà ở đó đối tượng JSON có thể được hoặc không được cung cấp, bạn có thể kiểm tra GO về sự có mặt của nó và cung cấp một bản thực thi thay thế:

```JavaScript
if (!this.JSON) {
    this.JSON = {
        parse: ...,
        stringify: ...
    };
}
```

Nếu bạn đã sẵn sàng cung cấp một bản thực thi cho JSON, bạn tất nhiên có đơn giản sử dụng nó một cách vô điều kiện. Tuy nhiên các bản thực thi sẵn có (built-in implementation) được cung cấp bởi các môi trường chủ (host environment) sẽ luôn được ưu tiên: Chúng được test nhiều về độ chính xác cũng như cung cấp performance tốt hơn.

Kỹ thuật phát hiện tính năng (feature detection) đặc biệt quan trọng trong các trình duyệt web - khi mà cùng một đoạn code có thể được xử lý bởi nhiều trình duyệt với nhiều phiên bản khác nhau. Phát hiện tính năng là một cách tương đối đơn giản để làm cho các chương trình trở nên mạnh mẽ.

#### Things to Remember:

- Tránh khai báo các biến toàn cục

- Khai báo biến cục bộ khi có thể

- Tránh thêm các thuộc tính cho đối tượng toàn cục

- Sử dụng đối tượng toàn cục để phát hiện tính năng