# Một nhiệm vụ tại một thời điểm

![](https://i.imgur.com/nmnce4t.png)

Đoạn code **thực hiện nhiều thứ một lúc** sẽ **trở nên khó hiểu**. Một khối mã duy nhất có thể khởi tạo một đối tượng mới, xử lý dữ liệu, phân tích đầu vào, và xử lý logic nghiệp vụ cùng một lúc. Nếu tất cả chúng được kết hợp cùng nhau, nó sẽ trở nên khó hiểu hơn là việc mỗi nhiệm vụ được xử lý và hoàn thành riêng biệt với nhau.

> KEY IDEA: 
> Code phải được tổ chức sao cho chỉ thực hiện **một nhiệm vụ tại một thời điểm**.
> 

Nói một cách khác, chương này nói về “**defragmenting**” (defragmenting có thể hiểu giống như việc bản tổ chức code của mình sao cho dể hiểu có trình tự) code của bạn. Sơ đồ sau minh họa quá trình này: bên trái hiển thị các tác vụ khác nhau mà một đoạn mã đang thực hiện và bên phải hiển thị cùng một đoạn mã đó sau khi nó được sắp xếp để thực hiện một tác vụ tại một thời điểm.

![](https://i.imgur.com/a6YkYf8.png)

Bạn có thể đã nghe lời khuyên rằng “mỗi chức năng chỉ nên làm một việc.” Lời khuyên của chúng tôi cũng tương tự, nhưng không phải lúc nào cũng về ranh giới chức năng. Đúng, chia một chức năng lớn thành nhiều chức năng nhỏ hơn có thể tốt. Nhưng ngay cả khi bạn không làm điều này, bạn **vẫn có thể tổ chức mã bên trong hàm lớn** đó để có cảm giác như có các phần **logic riêng biệt**.

Đây là quy trình chúng tôi sử dụng để làm cho mã thực hiện "một tác vụ tại một thời điểm:

1. **Liệt kê tất cả các “nhiệm vụ”** mà mã của bạn **đang thực hiện**. Chúng tôi sử dụng từ "nhiệm vụ" mang ý nghĩ rất rộng — nó có thể nhỏ như "đảm bảo đối tượng này hợp lệ" hoặc trừu tượng như "lặp qua mọi nút trong cây."
2. Cố gắng **tách các tác vụ đó nhiều nhất có thể thành các chức năng khác nhau** hoặc ít nhất là các **phần mã khác nhau**.

Trong chương này, chúng tôi sẽ chỉ cho bạn một số ví dụ về cách thực hiện việc này.

## Các nghiệm vụ có thể nhỏ

Giả sử có một tiện ích bầu chọn trên blog nơi người dùng có thể bỏ phiếu cho nhận xét “UP” hoặc “DOWN”. Tổng điểm của một nhận xét là tổng điểm của tất cả các phiếu bầu: +1 cho mỗi phiếu bầu “UP”, –1 cho mỗi phiếu bầu “DOWN”.

Phiếu bầu của người dùng có thể là ba trạng thái dưới đây và nó sẽ ảnh hưởng như thế nào đến tổng điểm:

![](https://i.imgur.com/VmQycYa.png)

Khi người dùng nhấp vào một trong các nút (để thực hiện / thay đổi phiếu bầu của họ), JavaScript sau được gọi là:

```
vote_changed(old_vote, new_vote); // each vote is "Up", "Down", or ""
```
Hàm này cập nhật tổng điểm và hoạt động dự vào kết hợp của vote cũ và vote mới:
```javascript=
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
Mặc dù **mã này khá ngắn**, nhưng nó đang **làm được rất nhiều điều**. Có rất nhiều chi tiết phức tạp và **khó có thể biết ngay được liệu có bất kỳ lỗi sai**, lỗi chính tả hay lỗi nào khác hay không.

Đoạn mã có vẻ như chỉ làm một việc (cập nhật điểm số), nhưng thực tế có hai tác vụ được thực hiện cùng một lúc:
    1. old_vote và new_vote đang được "phân tích" thành các giá trị số
    2. điểm đang được cập nhật.

Chúng tôi có thể **làm cho mã dễ đọc hơn** bằng cách **giải quyết từng nhiệm vụ riêng biệt**.

Đoạn mã sau giải quyết nhiệm vụ đầu tiên, phân tích biểu quyết thành một giá trị số:

```javascript=
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

Bây giờ phần còn lại của mã có thể giải quyết nhiệm vụ thứ hai, cập nhật điểm:

```javascript=
var vote_changed = function (old_vote, new_vote) {
    var score = get_score();
    score -= vote_value(old_vote); // xõa vote cũ
    score += vote_value(new_vote); // thêm vote mới.
    set_score(score);
};
```

Như bạn có thể thấy, phiên bản code này cần ít suy nghĩ đầu óc để thuyết phục bản thân rằng nó hoạt động. Đó là một phần quan trọng làm cho mã dễ hiểu.

## Trích xuất giá trị từ một đối tượng.

Chúng tôi đã từng có một số JavaScript định dạng vị trí của người dùng thành một chuỗi “Thành phố, Quốc gia” thân thiện như “Santa Monica, USA” hoặc “Paris, France”. Chúng tôi được cung cấp một từ điển location_info với nhiều thông tin có cấu trúc. Tất cả những gì chúng tôi phải làm là chọn “Thành phố” và “Quốc gia” từ tất cả các trường và ghép chúng lại với nhau.

Hình minh họa sau đây cho thấy ví vụ input/output:

![](https://i.imgur.com/2TQ2i7Q.png)

Cho đến thời điểm này, nó có vẻ dễ dàng, nhưng phần khó là bất kỳ hoặc tất cả bốn giá trị này có thể bị thiếu. Đây là cách chúng tôi giải quyết vấn đề đó:

- Khi chọn “City”, chúng tôi ưu tiên sử dụng “LocalityName” (thành phố / thị trấn) nếu có, sau đó là “SubAdministrativeAreaName” (thành phố / quận lớn hơn), sau đó là “AdministrativeAreaName” (tiểu bang / lãnh thổ)
- Nếu cả ba đều bị thiếu, "Thành phố" được trìu mến đặt cho mặc định là “Middle-ofNowhere”.
- Nếu thiếu "CountryName", "Planet Earth" được sử dụng làm mặc định.

Hình sau đây cho thấy hai ví dụ về việc xử lý các giá trị bị thiếu.

![](https://i.imgur.com/cxoyuUm.png)

Đây là mã chúng tôi đã viết để triển khai tác vụ này:

```javascript=
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

Đúng, nó hơi **lộn xộn**, **nhưng** nó **đã hoàn thành** công việc.

**Nhưng** một vài ngày sau, **chúng tôi cần cải thiện chức năng**: đối với các vị trí ở Hoa Kỳ, chúng tôi muốn hiển thị tiểu bang thay vì quốc gia (nếu có thể). Vì vậy, thay vì "Santa Monica, USA", nó sẽ trả về "Santa Monica, California."

Thêm tính năng này vào **code trước đó sẽ khiến nó xấu hơn nhiều**.

### Áp dụng “Từng nhiệm vụ một”

**Thay vì thay đổi mã** này theo ý muốn của chúng tôi, chúng tôi đã dừng lại và nhận ra rằng **nó đã thực hiện nhiều tác vụ cùng một lúc**:

1. Trích xuất giá trị từ từ điển location_info
2. Thực hiện một thứ tự ưu tiên cho "City", mặc định là "Middle-of-Nowhere" nếu không thể tìm thấy bất kỳ thứ gì
3. Nhận “Country” và sử dụng “Planet Earth” nếu không có
4. Cập nhật địa điểm

Vì vậy, thay vào đó, chúng tôi đã viết lại mã gốc để **giải quyết từng tác vụ này một cách độc lập**

**Nhiệm vụ đầu tiên** (trích xuất các giá trị từ location_info) rất dễ tự giải quyết:

```
var town = location_info["LocalityName"]; // e.g. "Santa Monica"
var city = location_info["SubAdministrativeAreaName"]; // e.g. "Los Angeles"
var state = location_info["AdministrativeAreaName"]; // e.g. "CA"
var country = location_info["CountryName"]; // e.g. "USA
```
Tại thời điểm này, chúng tôi đã sử dụng xong location_info và không phải nhớ những cái thứ dài và không trực quan đó. Thay vào đó, chúng tôi có bốn biến đơn giản để làm việc.

**Tiếp theo**, chúng tôi phải tìm ra "**phần sau**" của giá trị trả về sẽ là gì:

```javascript=
// Bắt đầu với giá trị mặc định và tiếp tục ghi đè bằng giá trị cụ thể nhất.
var second_half = "Planet Earth";
if (country) {
    second_half = country;
}
if (state && country === "USA") {
    second_half = state;
}
```
Tương tự, chúng tôi có thể tìm ra “**phần đầu**”:

```javascript=
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
**Cuối cùng**, chúng tôi kết hợp thông tin của chúng với nhau:
```javascript=
return first_half + ", " + second_half;
```

Hình minh họa "**defragmentation**" ở đầu chương này thực sự là đại diện của giải pháp ban đầu và phiên bản mới này. Đây là hình minh họa tương tự, với nhiều chi tiết hơn được điền vào:

![](https://i.imgur.com/1wnoHYM.png)

Như bạn có thể thấy, **bốn tác vụ** trong giải pháp thứ hai đã được **phân mảnh thành các vùng riêng biệt**.

### Cách tiếp cận khác

Khi **tái cấu trúc lại mã**, thường **có nhiều cách để thực hiện** và trường hợp này cũng không ngoại lệ. Khi bạn đã tách một số nhiệm vụ, mã sẽ dễ nghĩ hơn và bạn có thể nghĩ ra những cách tốt hơn để cấu trúc lại nó.

Ví dụ, loạt câu lệnh if trước đó yêu cầu đọc kỹ để biết mọi trường hợp có hoạt động chính xác hay không. Trên thực tế, có hai nhiệm vụ phụ diễn ra đồng thời trong đoạn mã đó:

1. Thông qua danh sách các biến và chọn biến ưu tiên nhất có sẵn
2. Sử dụng một danh sách khác, tùy thuộc vào quốc gia có phải là “Hoa Kỳ” hay không.

Nhìn lại, bạn có thể thấy rằng đoạn mã trước đó có logic “if USA” đan xen kẽ với phần còn lại của logic.
Thay vào đó, chúng tôi có thể xử lý các trường hợp Hoa Kỳ và không phải Hoa Kỳ riêng biệt:

```javascript=
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
Trong trường hợp bạn không quen thuộc với cú pháp JavaScript, a || b || c là thành ngữ và lấy giá trị đầu tiên nếu giá trị đó là true. Mã này có lợi ích là rất dễ dàng kiểm tra danh sách ưu tiên và cập nhật nó. Hầu hết các câu lệnh if đã bị loại bỏ và logic nghiệp vụ được thể hiện bằng ít dòng mã hơn.

## Một ví dụ lớn hơn

Trong hệ thống thu thập dữ liệu web mà chúng tôi đã xây dựng, một hàm có tên UpdateCounts () được gọi để tăng các thống kê khác nhau sau khi mỗi trang web được tải xuống

```
void UpdateCounts(HttpDownload hd) {
    counts["Exit State" ][hd.exit_state()]++; // e.g. "SUCCESS" or "FAILURE"
    counts["Http Response"][hd.http_response()]++; // e.g. "404 NOT FOUND"
    counts["Content-Type" ][hd.content_type()]++; // e.g. "text/html"
}
```
Chà, chúng tôi ước mã chông như thế!

Trên thực tế, đối tượng HttpDownload không có phương thức nào được hiển thị ở đây. Thay vào đó, HttpDownload là một lớp rất lớn và phức tạp, với nhiều lớp lồng vào nhau và chúng tôi phải tự tìm ra các giá trị đó. Để làm cho vấn đề tồi tệ hơn, đôi khi những giá trị đó bị thiếu hoàn toàn — trong trường hợp đó, chúng tôi chỉ sử dụng "unknown" làm giá trị mặc định.

Vì tất cả những điều này, mã thực sự **khá lộn xộn**:

```
// WARNING: DO NOT STARE DIRECTLY AT THIS CODE FOR EXTENDED PERIODS OF TIME.
void UpdateCounts(HttpDownload hd) {
    // Figure out the Exit State, if available.
    if (!hd.has_event_log() || !hd.event_log().has_exit_state()) {
        counts["Exit State"]["unknown"]++;
    } else {
        string state_str = ExitStateTypeName(hd.event_log().exit_state());
        counts["Exit State"][state_str]++;
    }

    // If there are no HTTP headers at all, use "unknown" for the remaining elements.
    if (!hd.has_http_headers()) {
        counts["Http Response"]["unknown"]++;
        counts["Content-Type"]["unknown"]++;
        return;
    }

    HttpHeaders headers = hd.http_headers();

    // Log the HTTP response, if known, otherwise log "unknown"
    if (!headers.has_response_code()) {
    c   ounts["Http Response"]["unknown"]++;
    } else {
        string code = StringPrintf("%d", headers.response_code());
        counts["Http Response"][code]++;
    }

    // Log the Content-Type if known, otherwise log "unknown"
    if (!headers.has_content_type()) {
        counts["Content-Type"]["unknown"]++;
    } else {
        string content_type = ContentTypeMime(headers.content_type());
        counts["Content-Type"][content_type]++;
    }
}
```

Như bạn có thể thấy, có **rất nhiều mã**, **rất nhiều logic** và thậm chí là **một vài dòng mã lặp lại**. Mã này đoặc chẳng không thú vị.

Đặc biệt, mã này chuyển đổi qua lại giữa các tác vụ khác nhau. Dưới đây là **các nhiệm vụ khác nhau được xen kẽ trong toàn bộ mã**:

1. Sử dụng "unknown" làm giá trị mặc định cho mỗi khóa
2. Phát hiện xem có thiếu thành phần của HttpDownload hay không
3. Trích xuất giá trị và chuyển đổi nó thành một chuỗi
4. Cập nhật lại số lượng

Chúng tôi có thể **cải thiện** mã bằng cách **tách một số tác vụ này thành các vùng riêng biệt trong mã**:

```
void UpdateCounts(HttpDownload hd) {
    // Task: define default values for each of the values we want to extract
    string exit_state = "unknown";
    string http_response = "unknown";
    string content_type = "unknown";

    // Task: try to extract each value from HttpDownload, one by one
    if (hd.has_event_log() && hd.event_log().has_exit_state()) {
        exit_state = ExitStateTypeName(hd.event_log().exit_state());
    }
    if (hd.has_http_headers() && hd.http_headers().has_response_code()) {
        http_response = StringPrintf("%d", hd.http_headers().response_code());
    }
    if (hd.has_http_headers() && hd.http_headers().has_content_type()) {
        content_type = ContentTypeMime(hd.http_headers().content_type());
    }
    
    // Task: update counts[]
    counts["Exit State"][exit_state]++;
    counts["Http Response"][http_response]++;
    counts["Content-Type"][content_type]++;
}
```

Như bạn có thể thấy, mã có **ba vùng riêng biệt** với các mục đích sau:
1. Define defaults for the three keys we are interested in.
2. Xác định giá trị mặc định cho ba khóa mà chúng tôi quan tâm.
3. Cập nhật số lượng cho mỗi key/value.

Điều tốt ở những vùng này là chúng tách biệt với nhau — trong khi bạn đang đọc một vùng, bạn không cần phải nghĩ về các vùng khác.

Lưu ý rằng mặc dù chúng tôi đã liệt kê **bốn nhiệm vụ**, nhưng chúng tôi **chỉ có thể tách biệt ba trong số chúng**. Điều đó **hoàn toàn ổn**: những công việc bạn liệt kê ban đầu **chỉ là điểm khởi đầu**. Ngay cả việc tách một số trong số chúng có thể giúp ích rất nhiều cho mọi thứ, như nó đã làm ở đây.

### Cải tiến hơn nữa

Phiên bản mới này của mã là một cải tiến rõ rệt so với phiên bản quái dị ban đầu. Và lưu ý rằng chúng tôi thậm chí không phải tạo các chức năng khác để thực hiện việc clean up này. Như chúng tôi đã đề cập trước đây, ý tưởng về "một nhiệm vụ tại một thời điểm" có thể giúp bạn clean up code bất kể chức năng.

Tuy nhiên, chúng tôi cũng có thể cải thiện mã này theo cách khác, **bằng cách đưa vào ba hàm trợ giúp**:

```
void UpdateCounts(HttpDownload hd) {
    counts["Exit State"][ExitState(hd)]++;
    counts["Http Response"][HttpResponse(hd)]++;
    counts["Content-Type"][ContentType(hd)]++;
}
```
Các hàm này sẽ trích xuất giá trị tương ứng hoặc trả về "unknown". Ví dụ:
```
string ExitState(HttpDownload hd) {
    if (hd.has_event_log() && hd.event_log().has_exit_state()) {
        return ExitStateTypeName(hd.event_log().exit_state());
    } else {
        return "unknown";
    }
}
```
Lưu ý rằng giải pháp thay thế này thậm chí không xác định bất kỳ biến nào! Như chúng tôi đã đề cập trong Chương 9, Biến và Khả năng đọc, các biến giữ kết quả trung gian thường có thể **bị loại bỏ hoàn toàn**

Trong giải pháp này, chúng tôi chỉ đơn giản là "cắt" vấn đề theo một hướng khác. Cả hai giải pháp đều rất dễ đọc, vì **chúng yêu cầu người đọc chỉ nghĩ về một nhiệm vụ tại một thời điểm**.

## Tóm lược
Chương này minh họa một kỹ thuật đơn giản để tổ chức mã của bạn: chỉ làm **một nhiệm vụ tại một thời điểm**

Nếu bạn có mã khó đọc, hãy cố gắng liệt kê tất cả các nhiệm vụ mà mã đang thực hiện. Một số tác vụ này có thể dễ dàng trở thành các hàm (hoặc lớp) riêng biệt.
Những thứ khác có thể chỉ trở thành "đoạn" hợp lý trong một hàm duy nhất. Chi tiết chính xác về cách bạn tách các nhiệm vụ này không quan trọng bằng việc chúng được tách biệt.
Phần khó là mô tả chính xác tất cả những điều nhỏ nhặt mà chương trình của bạn đang làm.

## Tài liệu tham khảo 
**Chapter 11** cuốn **the art of readable code**