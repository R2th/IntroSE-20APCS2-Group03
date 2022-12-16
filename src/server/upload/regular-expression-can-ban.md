Regular Expressions hay còn được gọi với cái tên ngắn gọn là Regex, một cô gái mới nhìn qua thì thấy không được ưa nhìn cho lắm nhưng nếu làm bạn và tìm hiểu tận sâu bên trong con người cô thì mới nhận ra rằng cô là một cô gái cực kỳ mạnh mẽ trong công việc xử lý dữ liệu liên quan đến chuỗi, chuỗi khó hoặc phức tạp đến mấy cô cũng cân tất chấp luôn cả mấy ông if else đang xếp hàng ngoài kia. Cùng tìm hiểu về cô gái mang tên Regex này xem sao <3 

# 1.Công dụng
Nguyên tắc hoạt động của Regex là tìm và so sánh chỗi dựa trên khuôn mẫu được xây dựng từ các nguyên tắc căn bản mà nó đề ra.

Regex không phải là một ngôn ngữ mà nó là một công cụ mà hầu hết ngôn ngữ hiện nay đều có, chỉ cần học một lần xài ở đâu cũng được, tội gì không tìm hiểu!

Mọi chuyện từ đơn giản đến phức tạp Regex đều có thể giải quyết từ tìm kiếm và thay thế một số pattern nào đó, validate một form gồm ngày tháng, email, password... xem người dùng đã nhập có hợp lệ hay không, hay khó hơn như refactor một đoạn code phức tạp...

Chỉ bấy nhiêu đó thôi cũng đủ thấy rằng Regex là một công cụ cực kỳ hữu ích và mạnh mẽ, đáng để coi là một hành trang không thể thiếu trong chặng đường sau này phải không nào?

Mặc dù hữu ích và mạnh mẽ đến như vậy nhưng không phải lúc nào cũng phải dùng đến Regex. Tại sao mình lại nói như vậy, bởi vì Regex nếu tìm hiểu sơ qua một cách cơ bản thì khá dễ nhưng nếu muốn đi sâu vào tìm hiểu thì thật sự không đơn giản. Mục đích ra đời của regex là làm cho mọi chuyện trở nên đơn giản, tiết kiệm được thời gian và công sức hơn. Nếu bạn cảm thấy thời gian để viết ra một đoạn regex hay refactor nó mất khá nhiều thời gian so với cách thông thường thì dùng cách thông thường sẽ tiết kiệm được thời gian cho bạn cũng như đồng nghiệp.

# 2.Khai báo
Để khai báo một chuỗi Regex ta chỉ cần khai báo bắt đầu bằng ký tự `/` và kết thúc cũng là ký tự `/`.

Ví dụ:

```
const str = "The lazy dog jumped over the quick brown fox"
const regex = /dog/
regex.test(str) //return true
```

Hoặc trong js có cách khai báo khác là:
```
const str = "The lazy dog jumped over the quick brown fox"
const regex = new RegExp("dog");
regex.test(str) //return true
```

# 3. Cách sử dụng
## Character classes

- **`[abc]`**: tìm tất cả những ký tự bên trong ngoặc vuông, thứ tự bên trong dấu ngoặc vuông không ảnh hưởng đến kết quả tìm kiếm

Ví dụ: mình muốn tìm ra tất cả chữ `the` hoặc `The` 
![](https://images.viblo.asia/0a5e20fa-b9da-4931-965f-76f8b768e363.gif)

- **`[a-n]`**: tìm những ký tự từ `a` đến `n`

![](https://images.viblo.asia/9bdf0fa6-6915-4d9c-938e-9eb35849114d.gif)

- **`\d`**: bất kỳ chữ số nào từ 0 đến 9
- **`\w`**: một chữ cái
- **`\s`**: ký tự trắng (có thể là dấu cách, tab, hoặc xuống dòng...)

    Khi chữ cái được viết hoa thì tác dụng của nó ngược lại so với bên trên
- **`\D`**: ký tự không phải là số
- **`\W`**: ký tự không phải chữ cái
- **`\S`**: ký tự không phải ký tự trắng

Ví dụ: 
![](https://images.viblo.asia/4320bc4c-f45c-4d80-949d-3f083d1c4916.gif)

## Quantifiers & Alternation
- **`.`**: bất kỳ ký tự nào trừ xuống dòng
- **`+`**: ký tự đứng trước nó xuất hiện 1 lần trở lên

![](https://images.viblo.asia/63eacc88-a289-498f-aa75-ef22405139ee.gif)

Nếu nhìn qua thì thấy kết quả tìm được không thay đổi nhưng hãy để ý kỹ phần số lượng matches 

- **`\`**: ký tự escape dùng kết hợp với một số ký tự đặc biệt,  vì trong regex có một vài ký tự đặc biệt ứng với các nhiệm vụ khác nhau nên khi ta muốn tìm những ký tự đó thì phải kết hợp với escape (\. \* \\ \t \n)

![](https://images.viblo.asia/920c7473-8c8c-4071-a795-2d0518393407.gif)


- **`^`**: ký tự nghịch đảo tập hợp các ký tự, sử dụng trong trường hợp bạn muốn kiểm tra một chuỗi không chứa bất kỳ ký tự nào trong tập hợp đã cho

![](https://images.viblo.asia/e1f5916a-dfc9-4e5f-98d3-171dd98f942d.gif)

- **`*`**: ký tự đứng trước nó xuất hiện >= 0 lần (có thể không xuất hiện)

Định nghĩa ở trên khá là khó hiểu, ví dụ như khi nhập số điện thoại, nhiều người sẽ nhập đầu số bắt đầu bằng `0` nhưng cũng có người nhập đầu số là `+84`. Bình thường nếu dùng regex `/[0-9]+/` sẽ dễ dàng bỏ sót mất dấu `+`, hoặc đơn giản mình muốn lấy ra dấu `-` trước những số âm chẳng hạn.

![](https://images.viblo.asia/47ee3ccd-e0e6-4bb3-b6d6-55eaaad1cd1e.gif)

- **`?`**: ký tự đứng trước nó có thể xuất hiện hoặc không

Tiếp tục ví dụ trên mình đã lấy được số âm lẫn số dương nhưng nếu muốn lấy thêm phần thập phân thì sẽ làm như sau

![](https://images.viblo.asia/20123486-7b6b-46e3-a36a-d195abeedd14.gif)


Về bản chất thì nó cũng giống với ký tự **`*`** một phần, đều chỉ ra sự xuất hiện của ký tự trước nó có xuất hiện hay không nhưng ký tự **`?`** chỉ định nghĩa xuất hiện 1 lần khác với **`*`** là nhiều lần. Trong hình trên mình nhận donate dưới hình thức chuyển tiền qua tài khoản 0451.000.123.456 nếu dùng ký tự **`?`** thì chỉ lấy được một dấu chấm còn nếu muốn lấy được số tài khoản chính xác nhất thì phải sử dụng ký tự **`*`**.

![](https://images.viblo.asia/db958b34-384d-4576-906e-3a8db050a456.gif)

- **`a{n}`**:  phần tử `a` xuất hiện đúng `n` lần
- **`a{n, m}`**:  phần tử `a` xuất hiện từ `n` đến `m` lần
- **`a{n, }`**:  phần tử `a` xuất hiện nhiều hơn hoặc bằng `n` lần
- **`ab|cd`**: tìm chuỗi ab hoặc cd, trường hợp bạn có nhiều mẫu cần kiểm tra xem chuỗi đưa ra có chứa một trong các mẫu đó

Ví dụ một số điện thoại ở nước ta sẽ có dạng **`0xx.xxx.xxxx`** hoặc **`+84xx.xxx.xxxx`**, mình tìm trên mạng thì lấy được một ít đầu số của một số nhà mạng phổ biến hiện nay như:

Viettel: 032-039, 086, 096-098

MobiFone: 081-085, 088, 091, 094

VinaPhone: 076-079, 089, 090, 093

Bỏ qua trường hợp phải đúng đầu số của các nhà mạng hiện tại. Thông thường khi viết regex mình sẽ tách vấn đề ra thành nhiều phần hoặc làm những phần đơn giản trước. Đầu tiên mình sẽ xử lý phần đầu số, nó bắt đầu bằng `0` hoặc `+84` rồi sau đó là 2 số tương ứng với đầu số của nhà mạng, rồi đến phần số phía sau.

![](https://images.viblo.asia/9a6ef995-721e-4f9f-880e-2eb5047d85f4.gif)

## Anchors

Nối tiếp ví dụ ở phần trước, nếu mình điền thừa số vào phía sau hoặc phía trước số thì kết quả trả về vẫn là hợp lệ và đó là kết quả không mong muốn. Regex cung cấp cho chúng ta 2 cách để giải quyết vấn đề này.

![](https://images.viblo.asia/4dc7b7f9-ea81-4389-84e6-d9ea3d8c03d6.gif)

Sử dụng ký tự **`^`** để bắt đầu và kết thúc bằng **`$`**, hoặc sử dụng ký tự biên `\b` (word boundary)

![](https://images.viblo.asia/b91bc8e9-3ca0-404e-a607-4735f1107649.gif)


## Flag
Regular Expression cung cấp tổng cộng tất cả 6 flags: i, g, m, s, u, y dưới đây mình chỉ liệt kê ra 3 flags hay dùng nhất
- **`g`**:  (global) tìm kiếm tất cả các kết quả, nếu không có flag này thì kết quả sẽ chỉ chứa mẫu đầu tiên phù hợp

![](https://images.viblo.asia/a5215e7a-e4ee-4e36-a959-285cc92c838b.gif)

- **`i`**: (case insensitive) phân biệt chữ hoa/chữ thường

![](https://images.viblo.asia/5712df75-d782-4270-a7fb-688e00fb057b.gif)

- **`m`**: (multiline) phân biệt giữa nhiều dòng, tương đương `^$`

![](https://images.viblo.asia/0df82a54-3e22-4e72-98d2-873c0d413d55.gif)


# 4. Một số phương thức
## Test
Đây là phương thức cơ bản nhất dùng để kiểm tra xem một chuỗi có chứa những mẫu đã đưa ra hay không, nếu có sẽ trả về **true**, nếu không thì trả về **false**.
```
const regex = /abc/
regex.test('abcd') // return true
regex.test('abd') // return false
regex.test('aabcc') // return true
```

## Exec
Nếu như phương thức **`tets`** ở trên chỉ kiểm tra xem trong chuỗi có chứa mẫu hay không thì đối với phương thức **`exec`** sẽ trả về một đối tượng trùng khớp với mẫu đã đưa ra, nếu không có đối tượng nào trùng khớp sẽ trả về `null`

![](https://images.viblo.asia/61e462fb-2c52-4a70-96cd-a54eaed5c3b8.gif)

# 5. Một số công cụ
## 1.[Regexr](https://regexr.com/) 

Đây là công cụ mà mình dùng để lấy ví dụ ở những phần trên, nó khá dễ sử dụng, giao diện đẹp cũng như có cả định nghĩa về các ký tự, flag... ngoài ra còn có thể lưu lại những pattern mà bạn muốn sử dụng về sau.

![](https://images.viblo.asia/bf1c0b45-8030-4b58-b814-e003ef020a62.gif)

## 2. [Regex101](https://regex101.com/)

Regex101 là một công cụ hữu ích không kém khi có thêm phần `Code Generator`, `Quiz` giúp bạn luyện thêm phần regex cũng khá hay :D 

![](https://images.viblo.asia/fba0a1db-8cd2-4542-aa44-f39fed801d15.gif)


# 6. Một số đoạn Regex hay dùng
[UPDATING...]