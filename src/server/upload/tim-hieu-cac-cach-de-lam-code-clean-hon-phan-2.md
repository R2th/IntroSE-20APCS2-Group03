Xin chào mọi người, bài viết này sẽ tiếp tục tìm hiểu về các cách để code dễ đọc, dễ hiểu hơn. Mọi người có thể đọc phần 1 [tại đây](https://viblo.asia/p/tim-hieu-cac-cach-de-lam-code-clean-hon-phan-1-924lJbnalPM) <br>
# 1. Tối giản hóa biểu thức
Tiếp theo của tối giản hóa biểu thức như phần 1, chúng ta sẽ xem xét một ví dụ phức tạp hơn 1 chút <br>
Giả sử chúng ta cần implement một class là Range với cấu trúc như sau: 
``` java
    struct Range {
        int begin;
        int end;
        // hàm kiểm tra nếu 2 khoảng chồng lên nhau
        bool overlapsWith(Range other);
    }
```
Ví dụ về các khoảng lồng nhau như hình vẽ: <br>
![](https://images.viblo.asia/8a45d623-ce18-4b57-9be6-41e63bea3e38.png)
<br>
Chú ý rằng chúng ta sẽ không bao gồm điểm cuối cùng, như trên hình vẽ thì A, B, C không chồng lên nhau nhưng D thì chồng lên tất cả 3 đoạn A, B, C. <br>
Sau đây là 1 đoạn code implement hàm overlapsWith <br>
``` java
    bool Range::overlapsWith(Range other) {
        // check nếu begin hoặc end nằm trong khoảng của range khác
        return (begin >= other.begin && begin <= other.end ||
            (end >= other.begin && end <= other.end);
    }
```
Mặc dù đoạn code trên khá ngắn, những có nhiều login diễn ra được miêu tả như trong hình vẽ sau: <br>
![](https://images.viblo.asia/f3fb73f6-d62a-4842-96f5-7f321a86820c.png) <br>

Có thể thấy có khá nhiều cases cần phải chú ý đến do đó sẽ dẫn đến việc ta bỏ qua bugs. Ví dụ theo như đoạn code trên thì Range **\[0, 2)** sẽ chồng lên Range **\[2, 4)** nhưng thực tế thì không phải vậy. <br>
Vậy chúng ta sẽ sửa lại thành <br>
``` java
    return (begin >= other.begin && begin < other.end) ||
        (end > other.begin && end <= other.end);
```
Giờ thì đúng rồi chứ nhỉ? Không nó sẽ xuất hiện thêm một bugs khác, đoạn code này sẽ thiếu trường hợp Range bao trọn range khác. Tiếp tục sửa thành. 
``` java
    return (begin >= other.begin && begin < other.end) ||
        (end > other.begin && end <= other.end) ||
        (begin <= other.begin && end >= other.end);
```
Nhìn vào đoạn code trên khá khó để người đọc có thể hiểu được và biết chính xác nếu nó đã implement đúng. Hãy thử xem cách tốt hơn. <br>
Hãy cùng implement đoạn code trên theo hướng ngược lại, tức là thay vì ta check xem nếu 2 range đó có chồng lên nhau hay không, hãy thử xem xét trường hợp 2 range không chồng lên nhau. Có thể thấy xem xét trường hợp ngược lại cho ta kết quả dễ hơn. 2 Range không chồng lên nhau chỉ xảy ra trong 2 trường hợp: <br>
1. Trường hợp 1 range kết thúc trước khi range khác bắt đầu <br>
2.  Trường hợp 1 range bắt đầu sau khi range khác kết thúc <br>
Do đó ta có thể implement lại đoạn code trên một cách dễ dàng như sau: <br>
``` java
    bool Range::OverlapsWith(Range other) {
        if (other.end <= begin) return false;  // range hiện tại bắt đầu sau khi range khác kết thúc
        if (other.begin >= end) return false;  // range hiện tại kết thúc trước khi range khác bắt đầu
        return true; // return true trong trường hợp ngước lại
    }
```
Nhìn vào đoạn code trên có thể thấy nó đơn giản hơn hẳn và khiến người đọc có thể dễ dàng hiểu hơn. <br>
**Xem xét tiếp một ví dụ sau:** <br>
``` javascript
    var update_highlight = function (message_num) {
        if ($("#vote_value" + message_num).html() === "Up") {
            $("#thumbs_up" + message_num).addClass("highlighted");
            $("#thumbs_down" + message_num).removeClass("highlighted");
        } else if ($("#vote_value" + message_num).html() === "Down") {
            $("#thumbs_up" + message_num).removeClass("highlighted");
            $("#thumbs_down" + message_num).addClass("highlighted");
        } else {
            $("#thumbs_up" + message_num).removeClass("highighted");
            $("#thumbs_down" + message_num).removeClass("highlighted");
        }
    };
```
Từng đoạn code nhỏ trên không lớn nhưng chúng được đặt cùng nhau nên tạo thành một biểu thức khá lớn, dẫn đến khó hiểu cho người đọc. Nhưng ta có thể thấy các biểu thức nhỏ khá giống nhau nên có thể chia nhỏ chúng và đặt trong một biến đặt ở đầu function như sau: <br>
``` javascript
    var update_highlight = function (message_num) {
        var thumbs_up = $("#thumbs_up" + message_num);
        var thumbs_down = $("#thumbs_down" + message_num);
        var vote_value = $("#vote_value" + message_num).html();
        var hi = "highlighted";
        
        if (vote_value === "Up") {
            thumbs_up.addClass(hi);
            thumbs_down.removeClass(hi);
        } else if (vote_value === "Down") {
            thumbs_up.removeClass(hi);
            thumbs_down.addClass(hi);
        } else {
            thumbs_up.removeClass(hi);
            thumbs_down.removeClass(hi);
        }
    };
```
Thực tế là cũng không cần thiết lắm khi tạo biến **var hi = "highlighted"** nhưng ta sử dụng biến này ở khá nhiều chỗ nên điều này có thể có lợi khi: giúp tránh viết sai, giúp code ngắn gọn hơn, khi cần thay đổi thì chỉ cần thay đổi ở một chỗ. <br>
Như vậy chúng ta đã tìm hiểu được các cách để đơn giản hóa biểu thức cồng kềnh thành đơn giản, dễ đọc hơn.
# 2. Sử dụng biến
Tại phần này chúng ta sẽ tìm hiểu các cách để xử lý biến với các trường hợp hay gặp phải như sau:
1. Trường hợp khó kiểm soát khi sử dụng quá nhiều biến
2. Trường hợp scope của biến lớn
3. Trường hợp thay đổi giá trị của biến thường xuyên dẫn đến khó kiểm soát được giá trị tại thời điểm hiện tại <br>
Ở những phần trước chúng ta đã tìm hiểu cách để sử dụng thêm biến để khiến code trở nên dễ đọc, ngắn gọn hơn. Phần này chúng ta sẽ xem xét trường hợp loại bỏ đỡ biến không cần thiết.
## Biến tạm không cần thiết
Xem xét đoạn code sau đây:
``` python
    now = datetime.datetime.now()
    root_message.last_view_time = now
```
Biến **now** thực sự có cần thiết? Có một số lý do cho thấy không cần thiết phải sử dụng biến này: <br>
1. Nó không giúp đơn giản hóa biểu thức
2. Nó không giúp giải thích code dễ hơn, biểu thức **datetime.datetime.now()** đã đủ clear
3. Chỉ sử dùng một lần biến này
Vì vậy không cần biến now, code vẫn có thể dễ dàng hiểu được <br>
``` python
    root_message.last_view_time = datetime.datetime.now()
```
##  Loại bỏ biến trung gian
Sau đây là đoạn code javascript dùng để remove một giá trị trong một mảng <br>
``` javascript
    var remove_one = function (array, value_to_remove) {
        var index_to_remove = null;
        for (var i = 0; i < array.length; i += 1) {
            if (array[i] === value_to_remove) {
                index_to_remove = i;
                break;
            }
        }
        if (index_to_remove !== null) {
            array.splice(index_to_remove, 1);
        }
    };
```
Biến **index_to_remove** được sử dụng để giữ kết quả trung gian, các biến này có thể loại bỏ được như sau:
``` javascript
    var remove_one = function (array, value_to_remove) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i] === value_to_remove) {
            array.splice(i, 1);
            return;
            }
        }
    };
```
Bằng cách sử dụng return sớm, ta loại bỏ được biến index_to_remove, tối ưu hóa lại code một chút. Tổng thể thì sẽ tốt nếu ta tuân theo:
```
    Hoàn thành một tác vụ nhanh nhất có thể.
```
## Loại bỏ biến trong luồng
Thỉnh thoảng ta sẽ gặp một đoạn code với pattern như sau:
``` java
    boolean done = false;
    while (/* condition */ && !done) {
        ...
        if (...) {
            done = true;
            continue;
        }
    }
```
Biến **done** trong trường hợp trên không giữ dữ liệu chính mà chỉ sử dụng để điều khiển luồng, ta cũng nên loại bỏ biến này để biểu thức trở thành như sau:
``` java
    while (/* condition */) {
        ...
        if (...) {
            break;
        }
    }
```
Trường hợp này có thể dễ dàng sửa được, nhưng nếu trong trường hợp các luồng lồng nhau thì sao? Trong các trường hợp như vậy thì tốt hơn là ta nên di chuyển các đoạn code thành hàm mới (Có thể là code trong luồng hoặc toàn bộ luồng).
## Thu nhỏ lại phạm vi của biến
Chúng ta thường nghe rằng "hãy tránh dùng các biến toàn cục (global variables)". Đây là một lời khuyên tốt vì rất khó để kiểm soát các biến này, thực tế là hãy thu nhỏ phạm vi của tất cả các biến không chỉ là biến toàn cục. Có một "key idea" là
```
    Hãy làm cho biến của bạn visible tại ít dòng code nhất có thể
```
Tại sao lại như vậy, vì khi đó ta sẽ giảm thiểu được các biến cần quan tâm đến <br>
Ví dụ ta có một class với biến chỉ được sử dụng ở 2 method như sau: <br>
``` java
    class LargeClass {
        string str_;
        void Method1() {
            str_ = ...;
            Method2();
        }
        void Method2() {
            // Uses str_
        }
    };
    // rất nhiều hàm khác không sử dụng biến str ...
```
Biến str như là một "mini-global" của class, trong trường hợp class lớn sẽ dẫn đến khó kiểm soát được biến này. Tốt hơn hết là ta nên loại bỏ các biến này.
``` java
    class LargeClass {
        void Method1() {
            string str = ...;
            Method2(str);
        }
        void Method2(string str) {
            // Uses str
        }
    };
    // Các hàm khác giờ không thể thấy được biến str.
```
Cách khác để hạn chế truy cập đến biến là sử dụng các static method, nó là cách tốt để thông báo cho người đọc biết rằng "những dòng code trong method này độc lập với biến bên ngoài". Nhưng mỗi ngôn ngữ khác nhau sẽ có rule khác nhau cho việc hạn chế phạm vị của biến. Sau đây là một vài ví dụ <br>
### Scope của if trong C++
Giả sử chúng ta có đoạn code như sau:
``` java
    PaymentInfo* info = database.ReadPaymentInfo();
    if (info) {
        cout << "User paid: " << info->amount() << endl;
    }
    // Many more lines of code below ... 
```
Biến **info** được sử dụng ở đây khiến người đọc phải ghi nhớ xem nó được sử dụng như thế nào, nhưng ở đây biến **info** chỉ sử dụng trong **if** , trong C++ ta có thể định nghĩa **info** trong điều kiện luôn
``` java
    if (PaymentInfo* info = database.ReadPaymentInfo()) {
        cout << "User paid: " << info->amount() << endl;
    }
```
Người đọc code giờ có thể quên đi biến info sau khi đã ra khỏi biểu thức if
### Tạo biến private trong javascript
Giả sử ta có một biến được sử dụng tại duy nhất 1 function
``` javascript
    submitted = false;
    // Note: biến toàn cục
    var submit_form = function (form_name) {
        if (submitted) {
        return; // tránh submit form 2 lần
        }
        ...
        submitted = true;
    };
```
Biến **submitted** được sử dụng duy nhất 1 chỗ và ngoài function khiến ta khó kiểm soát được biến này, có thể thay đổi bằng cách cho vào trong hàm <br>
``` javascript
    var submit_form = (function () {
        var submitted = false; // Note: chỉ có thể truy cập bởi hàm phía dưới
        return function (form_name) {
            if (submitted) {
                return; // tránh submit form 2 lần
            }
            ...
            submitted = true;
        };
    }());
```

# 3. Tổ chức lại code
Tại phần này ta sẽ tìm hiểu các cách để: <br>
1. Trích xuất các subproblem từ một chương trình
2. Tổ chức lại code để hàm chỉ thực hiện một chức năng duy nhất tại một thời điểm
3. Cách để diễn đạt code bằng lời trước, sau đó sử dụng miêu tả đó để giúp có một phương án tốt nhất
## Trích xuất các subproblems
- Idea của phần này là
1. Nhìn vào function hoặc đoạn code đã có, hỏi rằng "mục tiêu chính của đoạn code này là gì?"
2.  Với mỗi dòng code thì nó có trực tiếp giúp để thực hiện mục tiêu trên không? hay là nó giúp giải quyết một vấn đề khác (subproblems) nhưng cần thiết cho việc thực hiện mục tiêu chính
3.  Nếu đã đủ các dòng code để giải quyết một subproblem, ta sẽ tách chúng thành một function mới <br>
Ví dụ: hàm **findClosestLocation()**
- Mục tiêu chính của hàm này là tìm kiếm địa điểm gần nhất với điểm đã cho
``` javascript
    // trả về phần tử của mảng mà gần nhất với tọa độ đã cho
    var findClosestLocation = function (lat, lng, array) {
        var closest;
        var closest_dist = Number.MAX_VALUE;
        for (var i = 0; i < array.length; i += 1) {
            // Chuyển đổi các điểm thành radians
            var lat_rad = radians(lat);
            var lng_rad = radians(lng);
            var lat2_rad = radians(array[i].latitude);
            var lng2_rad = radians(array[i].longitude);
            // Sử dụng công thức tính khoảng cách trong hình cầu
            var dist = Math.acos(Math.sin(lat_rad) * Math.sin(lat2_rad) +
            Math.cos(lat_rad) * Math.cos(lat2_rad) *
            Math.cos(lng2_rad - lng_rad));
            if (dist < closest_dist) {
                closest = array[i];
                closest_dist = dist;
            }
        }
        return closest;
    };
```
Hầu hết các đoạn code trong vòng lặp thực hiện các subproblem đó là: tính toán khoảng cách giữa 2 điểm. Ta sẽ tách nó ra thành một function mới với tên là **spherical_distance()** với mục đích là tính toán khoảng cách giữa 2 điểm trong hình cầu
``` javascript
    var spherical_distance = function (lat1, lng1, lat2, lng2) {
        var lat1_rad = radians(lat1);
        var lng1_rad = radians(lng1);
        var lat2_rad = radians(lat2);
        var lng2_rad = radians(lng2);
        // Sử dụng công thức tính khoảng cách trong hình cầu
        return Math.acos(Math.sin(lat1_rad) * Math.sin(lat2_rad) +
            Math.cos(lat1_rad) * Math.cos(lat2_rad) *
            Math.cos(lng2_rad - lng1_rad));
    };
```
Bây giờ đoạn code ban đầu sẽ trở thành
``` javascript
    var findClosestLocation = function (lat, lng, array) {
        var closest;
        var closest_dist = Number.MAX_VALUE;
        for (var i = 0; i < array.length; i += 1) {
            var dist = spherical_distance(lat, lng, array[i].latitude, array[i].longitude);
            if (dist < closest_dist) {
                closest = array[i];
                closest_dist = dist;
            }
        }
        return closest;
    }
```
Với đoạn code này người đọc có thể dễ dàng hơn trong việc hiểu mục đích cuối cùng của hàm, hơn nữa việc tách hàm ra cũng khiến ta có thể dễ dàng test được hơn và có thể sử dụng lại hàm này trong tương lai.
### Các hàm utility thuần
- Có rất nhiều các task nhỏ mà các lập trình viên cần phải giải quyết như xử lý với chuỗi( cắt chuỗi, nối chuỗi, tìm kiếm ký tự trong chuỗi), sử dụng hash table, đọc/ghi file <br>
- Các công việc nhỏ này đã được hầu hết các ngôn ngữ lập trình đã xây dựng một thư viện bên trong. Ví dụ trong PHP khi muốn đọc file có thể sử dụng **file_get_contents("filename")**, hay với Python là **open("filename").read()**. Tuy nhiên với C++ ta không có những hàm xây dựng sẵn này mà cần phải tự implement một hàm dùng riêng.
- Như vậy ý tưởng ở đây là khi chúng ta có suy nghĩ là "Tôi ước gì có một thư viện nào đó thực hiện một hàm XYZ() nào đó". Hãy xây dựng hàm này (tất nhiên là giả sử chưa có thư viện nào có hàm này). Như vậy sau một thời gian chúng ta sẽ có một thư viện riêng để dùng chung cho cả project. <br>
**OK, có vẻ là đã đủ cho phần này**
# 4. Kết luận
Trên đây là những kiến thức mình tìm hiểu được để giúp code dễ đọc, dễ review hơn. Hi vọng bài viết sẽ có ích cho mọi người. Nếu có gì góp ý hay thảo luận hãy để lại bình luận phía dưới. Trong bài viết tới mình sẽ trình bày  nốt phần còn lại. Hẹn gặp lại (seeyou)
# 5. Reference
- Cuốn: **THE ART OF READABLE CODE**