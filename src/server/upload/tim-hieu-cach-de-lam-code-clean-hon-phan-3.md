Xin chào mọi người, hôm nay chúng ta sẽ tiếp tục tìm hiểu các cách để làm code clean hơn trong phần tiếp theo của series này. Mọi người có thể đọc lại các phần trước đó: [Phần 1](https://viblo.asia/p/tim-hieu-cac-cach-de-lam-code-clean-hon-phan-1-924lJbnalPM) ,  [Phần 2](https://viblo.asia/p/tim-hieu-cac-cach-de-lam-code-clean-hon-phan-2-naQZRYVmKvx)
# I. One task at a time 
- Khi code một hàm với các chức năng chồng chéo nhau sẽ dẫn đến khó hiểu, dễ sai logic và rất khó để viết test cho những hàm như vậy nên key idea ở đây sẽ là  <br>
```
    Code nên được tổ chức sao cho nó chỉ thực hiện một tác vụ tại một thời điểm
```
![](https://images.viblo.asia/29e5438f-9d21-40cd-9a8e-2c1906fe1c41.png)
- Có thể ta đã nghe đến lời khuyên đó là "**một hàm chỉ nên thực hiện một chức năng duy nhất**", idea ở đây cũng tương tự như vậy nhưng không chỉ dừng lại ở phạm vi là hàm.Đúng là tách thành các hàm con từ một hàm lớn là tốt nhưng thậm chí nếu không làm vậy ta vẫn có thể tổ chức code trong một hàm lớn sao cho logic được tách biệt với nhau. Dưới đây là quá trình sẽ làm code "one task at a time" <br>
1. Liệt kê tất cả các task mà ta đang code, task ở đây có thể như là "kiểm tra nếu object này hợp lệ", "lặp từng node trong một cây nhị phân" ...
2. Cố gắng tách các task này thành các hàm hoặc ít nhất là thành các khối code . <br>
OK, lý thuyết là vậy hãy cùng xem các ví dụ áp dụng dưới đây  <br>
Giả sử ta làm một chức năng upvote và downvote cho bình luận của người dùng trong một blog với 2 nút "Up", "Down", tổng điểm cho comment được tính là: với mỗi upvote là +1 và -1 cho mỗi downvote. Dưới đây là 3 trạng thái của và tác động của mỗi trạng thái đến tổng điểm vote <br>
![](https://images.viblo.asia/ce2f7d0b-88d5-4826-9b4c-1bc37de360e7.png) <br>
Khi người dùng click vào một trong các button để vote, đoạn code javascript sau sẽ được gọi
``` javascript
    var vote_changed = function (old_vote, new_vote) {
        var score = get_score();
        if (new_vote !== old_vote) {
            if (new_vote === 'Up') {
                score += (old_vote === 'Down' ? 2 : 1);
            } else if (new_vote === 'Down') {
                score -= (old_vote === 'Up' ? 2 : 1);
            } else if (new_vote === '') {
                score += (old_vote === 'Up' ? -1 : 1);
            }
        }
        set_score(score);
    };
```
Mặc dù đoạn code trên ngắn nhưng nó thực hiện rất nhiều thứ, đoạn code trên có vẻ thực hiện một task (update cho tổng điểm vote) nhưng thực ra là nó thực hiện 2 task: <br>
1. **old_vote** và **new_vote** được "parse" thành giá trị số
2. **score** được update lại
<br>
Chúng ta có thể làm code dễ đọc hơn bằng cách tách các task riêng rẽ nhau, đoạn code dưới đây thực hiện task thứ nhất, parse giá trị vote thành số
``` javascript
    var vote_value = function (vote) {
        if (vote === 'Up') {
            return +1;
        }
        if (vote === 'Down') {
            return -1;
        }
        return 0;
    };
```
Tiếp theo đoạn code sau sẽ thực hiện update lại score <br>
``` javascript
    var vote_changed = function (old_vote, new_vote) {
        var score = get_score();
        score -= vote_value(old_vote); // loại bỏ giá trị vote cũ
        score += vote_value(new_vote); // thêm giá trị vote mới
        set_score(score);
    };
```
## Tách biệt logic
- Chúng ta cần implement một task với nhiệm vụ format địa điểm của user dưới dạng "City, Country" ví dụ như "Santa Monica, USA" hoặc "Paris, France". Hình ảnh dưới đây sẽ minh họa cho ví dụ tiếp theo <br>
![](https://images.viblo.asia/9cfb8399-3835-4daf-b751-9a9b802ec6d3.png)
- Khi chọn một "City" chúng ta sẽ chọn dựa trên độ ưu tiên như sau "LocalityName" > "SubAdministrativeAreaName" > "AdministrativeAreaName" <br>
- Nếu cả 3 trường trên trống thì default sẽ là "Middle of Nowhere" <br>
- Nếu "CountryName" bị trống, default sẽ là "Planet Earth" <br>
![](https://images.viblo.asia/4175b88d-19b5-4911-aaf2-c68a33f6431e.png)
Dưới đây là đoạn code javascript implement cho task này <br>
``` javascript
    var place = location_info["LocalityName"]; // e.g. "Santa Monica"
    if (!place) {
        place = location_info["SubAdministrativeAreaName"]; // e.g. "Los Angeles"
    }
    if (!place) {
        place = location_info["AdministrativeAreaName"]; // e.g. "California"
    }
    if (!place) {
        place = "Middle-of-Nowhere";
    }
    if (location_info["CountryName"]) {
        place += ", " + location_info["CountryName"]; // e.g. "USA"
    } else {
        place += ", Planet Earth";
    }
    return place;
```
Đoạn code trên đã thực hiện được task mà ta đã đưa ra nhưng nó còn khá là rối.  Và giả sử sau đó chúng ta muốn mở rộng chức năng như sau: với các địa điểm, chúng ta muốn hiểu thị **state** thay vì **country** (nếu có thể), vd: thay vì "Santa Monica, USA", có thể là "Santa Monica, California". Với đoạn code trên thì ta phải thay đổi khá nhiều để thực hiện yêu cầu này <br>
##  Áp dụng "one task at a time"
- Đầu tiên ta cần xác định các task mà hàm trên đang thực hiện bao gồm: <br>
1. Lấy giá trị của **location_info** từ danh sách đã có
2. Xác định giá trị của **City**, mặc định sẽ là **Middle of Nowhere** nếu không thể tìm thấy giá trị nào
3. Xác định giá trị của **Country**, mặc định sẽ là **Planet Earth** nếu không có giá trị nào
4. Update trường **place** <br>
Vì vậy, ta sẽ viết lại đoạn code trên để thực hiện các task một cách độc lập
**Task 1** <br>
``` javascript
    var town = location_info["LocalityName"]; // e.g "Santa Monica"
    var city = location_info["SubAdminitrativeAreaName"]; // e.g "Los Angeles"
    var state = location_info["AdminitrativeAreaName"]; // e.g "CA"
    var country = location_info["CountryName"]; // e.g "USA"
```
**Task 2** <br>
``` javascript
    var first_half = "Middle-of-Nowhere";
    if (state && country !== "USA") {
        first_half = state;
    }
    if (city) {
        first_half = city;
    }
    if (town) {
        first_half = town;
    }
```
**Task 3**
``` javascript
    var second_half = "Planet Earth";
    if (country) {
        second_half = country;
    }
    if (state && country === "USA") {
        second_half = state;
    }
```
Và cuối cùng 
``` javascript
    return first_half + ", " + second_half;
```
Khi đã tách biệt được các phần ta còn có thể dễ dàng hơn trong việc refactor lại code <br>
``` javascript
    var first_half, second_half;
    if (country === "USA") {
        first_half = town || city || "Middle-of-Nowhere";
        second_half = state || "USA";
    } else {
        first_half = town || city || state || "Middle-of-Nowhere";
        second_half = country || "Planet Earth";
    }
    return first_half + ", " + second_half;
```
Tóm lại <br>
- Khi ta thấy đoạn code khó đọc, hãy liệt kê các task nó đang làm, một số task có thể chuyển thành dạng function riêng biệt (hoặc class) hoặc cũng có thể viết chung nhưng hãy tách biệt các logic trong hàm
# II. Chuyển suy nghĩ thành code
Có một câu nói của Einstein đó là 
> Bạn không thật sự hiểu được thứ gì đó trừ khi bạn có thể giải thích điều đó với bà của bạn

Khi giải thích một thứ gì đó phức tạp với người khác, thường rất dễ bối rối với tất cả những chi tiết nhỏ bên trong, một kỹ năng rất quan trọng là có thể giải thích ý tưởng dưới dạng "plain text" để người khác có thể hiểu được, điều này còn giúp chúng ta clear hơn về cái mà ta đang làm. Phần này ta sẽ tìm hiểu một phương pháp giúp code ta clear hơn với các bước: <br>  
1. Mô tả được cái mà đoạn code cần làm dưới dạng văn bản thông thường
2. Tập trung, chú ý vào các key word, những cụm từ trong phần miêu tả
3. Viết code sao cho đúng với mô tả <br>
Ví dụ một đoạn code PHP đơn giản với chức năng check xem nếu user đã authorized thì được xem trang web nếu không sẽ chuyển sang trang nào đó và đưa thông báo <br>
``` php
    $is_admin = is_admin_request();
    if ($document) {
        if (!$is_admin && ($document['username'] != $_SESSION['username'])) {
            return not_authorized();
        }
    } else {
        if (!$is_admin) {
            return not_authorized();
        }
    }
```
Đoạn code trên thực hiện một số logic và tương đối khó hiểu, nếu áp dụng các kiến thức của các phần trước ta có tối giản hóa lại nhưng bằng cách nào? trước tiên hãy miêu tả nó dưới dạng văn bản <br>
```
Có 2 cách để thực hiện authorized:
1) Nếu user là admin
2) Nếu user là chủ sở hữu của document
Còn lại thì sẽ là not authorized
```
Ta sẽ chuyển thành code để thực hiện theo đúng miêu tả trên như sau <br>
``` php
    if (is_admin_request()) {
        // authorized
    } elseif ($document && ($document['username'] == $_SESSION['username'])) {
        // authorized
    } else {
        return not_authorized();
    }
// continue rendering the page ...
```
Đoạn code được thực hiện theo đúng mô tả và được tối giản để dễ đọc, dễ hiểu hơn
# III. Kết luận
Trên đây là những kiến thức mình tìm hiểu được để giúp dễ dàng hơn trong việc code và review code. Hi vọng bài viết sẽ có ích cho mọi người. Nếu có gì góp ý hay thảo luận hãy để lại bình luận phía dưới. Hẹn gặp lại (seeyou)
# Reference
- Cuốn: **THE ART OF READABLE CODE**