![](https://images.viblo.asia/834a71ff-21f0-4762-a7ef-89783ad78ca8.png)


"Có hai điều không thể bỏ lỡ trong cuộc sống. Đó là những chuyến xe cuối cùng và những người yêu ta thật lòng"  - Đây là câu nói rất hay trong phim Mắt Biếc ra rạp cách đây đúng một năm. Còn trong lập trình có hai điều khó khăn đó là : vô hiệu hóa bộ nhớ cache và đặt tên cho biến, function....

Bỏ qua việc vô hiệu hóa cache, điều này thực sự khó. Điều thứ hai đặt tên biến có vẻ dễ thực hiện hơn. Việc đặt tên rõ ràng  giúp cho mọi người đọc code dễ hiểu, dễ fix bug, dễ support người khác hơn. Khi code mình luôn cố gắng đặt tên cho biến hay function tuân theo một số rule cơ bản.

# 1. Sử dụng tiền tố có ý nghĩa

Mặc dù các tiền tố này không phổ biến, nhưng chúng rất hữu ích trong việc làm việc nhóm. Sử dụng một cách nhất quán trong suốt quá trình codebase giúp cho việc đọc hiểu trở nên dễ dàng hơn

- `get`, `find`, `fetch` : cho hàm trả về giá trị hoặc 1 `Promise` resolve một giá trị mà không làm thay đổi đối số hoặc chính nó.
- `set`, `update` : cho các hàm nhằm thay đổi giá trị truyền vào, update đối tượng, khởi tạo giá trị, ... Hoặc các hàm này cũng có thể trả về giá trị hoặc một `Promise` resolve thành giá trị được cập nhật.
- `on`, `handle` : cho các hàm xử lý sự kiện. Ví dụ : `onEvent` dùng để props qua các component, `handleEvent` dùng để xử lý trong component.
- `is`, `should`, `can` dùng cho các biến và hàm kiểm tra hay trả về giá trị là `boolean`.

Bất kỳ convention nào của team nên được document lại cho cả team follow theo để dễ dàng cho mọi người review.

# 2. Sử dụng các từ bổ sung có ý nghĩa

Hẳn sẽ có rất nhiều anh em đặt tên biến là `data` như là một thói quen mặc định, chúng ta cùng xem qua một số định nghĩa của nó là gì :

- Thông tin thực tế (chẳng hạn như các phép đo hoặc thống kê) được sử dụng làm cơ sở để lập luận, thảo luận, báo cáo hoặc tính toán.
-  Thông tin ở dạng kỹ thuật số có thể được truyền hoặc xử lý.

Các định nghĩa này rất chung chung, không cung cấp chi tiết thông tin cho mọi người, hãy xem qua ví dụ không tuân thủ nguyên tắc :

```javascript
function total(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i].value;
  }

  return total;
}
```

Đọc qua ví dụ, chúng ta đều biết hàm này tính tổng một cái gì đó với tham số truyền vào là data gì đó , rõ ràng khi review code chúng ta rất khó khăn.

*Trường hợp ngoại lệ*

Ví dụ như thư viện axios sử dụng `data`, dữ liệu trong form gán vào `data` truyền vào hàm gửi lên server.

# 3. Sử dụng từ đầy đủ

Nhiều người vì thấy tên biến hay hàm dài thì thường viết tắt nó để cho ngắn.

Chúng ta xem qua ví dụ :

```javascript
function totBal(accts) {
  let tot = 0;
  for (let i = 0; i < accts.length; i++) {
    tot += accts[i].bal;
  }

  return tot;
}
```

Đọc qua và mất thời gian lắc não một chút thì chúng ta có thể dịch được : `accts` có nghĩa là `accounts`, `tot` có nghĩa là `total`, nhưng nếu không có thời gian suy nghĩ và đọc qua thì cũng không đoán được ý nghĩa nó là gì.

*Trường hợp ngoại lệ*

Các chữ viết tắt phổ biến nên được sử dụng từ viết tắt hơn là viết đầy đủ (ví dụ : URL, API, CSS, HTML...)

# 4. Không sử dụng những từ `Fluff`

`Container` và `Wrapper` chỉ có ý nghĩa liên quan đến thứ mà chúng đang chứa.Vấn đề là bất kỳ thành phần nào không phải là base element thì đều chứa một thành phần khác.Việc nay gây khó khăn cho việc đặt tên, ví dụ như : `MyComponentContainerContainer`.

*Trường hợp ngoại lệ*

Trong một số ngữ cảnh, những từ `fluff` lại có ý nghĩa quan trọng. Một ví dụ điển hình trong các class component của React là presentation/container . Trong trường hợp này, container có thể chỉ ra là một component quản lý `state` .

# 5. Chính tả

Chắc không ít trong chúng ta đã từng đặt tên cho biến hay hàm sai chính tả, như là thiếu chữ, thừa chữ, sai nghĩa... điều này có thể gây khó chịu cho người review :sweat_smile:. À trong trường hợp này không có ngoại lệ cho việc sai chính tả nhé, nước đi này sai không được phép đi lại :joy:

# Kết hợp với nhau

Áp dụng các quy tắc trên, chúng ta nhận được hàm như sau

```javascript
function getAccountsTotalBalance(accounts) {
  let totalBalance = 0;
  for (let accountIndex = 0; accountIndex < accounts.length; accountIndex++) {
    totalBalance += accounts[accountIndex].balance;
  }

  return totalBalance;
}
```

# Kết luận

Mục tiêu của các quy tắc này giúp mang lại nhiều ý nghĩa  cho cả team xây dựng bộ quy tắc khi đăt tên biến, tên hàm luôn thống nhất không chỉ từ đầu đến cuối dự án mà còn xây dựng cho mọi người thói quen code sau này. Hãy xem xét lại các quy tắc của team, nếu quy tắc nào gây hại nhiều hơn là có lợi thì hãy gỡ bỏ quy tắc đó đi.

**REFER**

[Stop Using data as a variable name](https://dev.to/dcwither/stop-using-data-as-a-variable-name-3954)