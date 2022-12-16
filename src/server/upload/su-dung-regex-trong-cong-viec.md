Bạn đã bao giờ cảm thấy khó khăn trong việc tìm kiếm một dòng code trong một mớ source code dài vô tận chưa ?
Bạn đã bao giờ cảm thấy logic xử lý cho việc match string và replace của mình quá đỗi rườm rà và ăn 1 đống comment của các "anh".

Dưới dây mình xin chia sẻ một chút hiểu biết và áp dụng của mình trong công việc khi sử dụng chung với regex.


Trước tiên thì để tìm hiểu thêm và phục vụ cho mục đích vọc vạch, mình nghĩ các bạn nên biết đến trang https://regex101.com/ nó quả thật là một trang web rất hữu ích trong việc nghiên cứu và test các đoạn regex, cũng có giải thích đầy đủ về  các cú pháp mà dựa vào đó ta áp dụng mà không cần phải thuộc hết bộ cú pháp khổng lồ của regex.

## Tìm kiếm code trong source code

Ở đây mình sẽ lấy vi dụ về việc tìm kiếm các method về `eager_load` trong source code của rails.

Thường thường thì chúng ta sẽ search như này:

Kết quả trả về :-ss

![](https://images.viblo.asia/28ca7c54-7cc5-4e7e-a96d-76c92d403fe2.png)

365 result in 99 files

Nhiều đến rất nhiều luôn :( và nó còn kèm theo rất nhiều file mà các bạn không mong muốn search chả hạn. Ví dụ như nếu làm với js nhiều thì kiểu gì chả có các file .min.js và sẽ chả bao giờ có ai search trong đó cả =)).

để tối ưu cho cách tìm kiếm trong các project lớn thì chúng ta có thể cải tiến cú pháp search như sau:
 thêm vào ô `files to exclude` đoạn `*.md, *.tt` và bấm vào ![](https://images.viblo.asia/cf8e8be3-f1e2-48c4-a2e4-b2aa76239960.png) để đảo ngược là sẽ loại trừ các files này. Ở các IDE khác không hỗ trợ sẵn thì các bạn thêm dấu ` - ` trước .md để thực hiện tương tự.
 kết quả trả về còn lại it hơn
 
 ![](https://images.viblo.asia/7a4d4b8b-4b7b-4375-9f1e-5a57e43422b7.png)
 
 326 results in 87 files.
Vẫn hơi nhiều nhỉ, cố thêm tí nữa xem lại requirement xem nào.

Tìm kiếm các method ? Ồ, vậy method thì chắc kèo là phải bắt đầu bằng `def` rồi, dùng như này hả `def eager_load` ồ không, cần phải tìm các method liên quan cơ mà, đâu phải chỉ tìm chính xác 1 method. Suy nghĩ 1 chút...!
Tích vào icon này để bật find with regex nhé các bạn ![](https://images.viblo.asia/1d3ebeea-42d6-4ab6-9522-9c8c6867e7aa.png)

Giờ ta xài thử đoạn này `(def )[^.]*eager_load` vscode đc cái bạn nhập các kí tự đặc biệt không cần thêm `\` đằng trc, nếu viết trong ide khác không hỗ trợ hoặc code thì cần đó ạ ví dụ như `\.` hoặc `\_`.

![](https://images.viblo.asia/55098c7e-6da6-493a-9a85-9cbdd1d63617.png)

Cỡ này là sử dụng thuật toán sức người được rồi nhỉ :-? , mà khoan, vẫn có thể giảm bớt kết quả. bạn không muốn search các method có arg hoặc là muốn các method kết thúc là `load` chứ không phải là `load_game` hay `loading` thừa thãi. thêm $ vào cuối để kết thúc 1 chuỗi.

 `(def )[^.]*eager_load$`
 
 ![](https://images.viblo.asia/72b9c19b-d35f-436a-b039-747eff10e79a.png)
 
 Mọi thứ có vẻ ổn rồi đấy. Đây thực ra chỉ là một áp dụng nho nhỏ trong việc tìm kiếm, ngoài ra các bạn có thể sử dụng để tìm kiếm trong 1 file hoặc dùng để replace khi dùng quen cú pháp regex mặc dù có hơi khác biệt 1 chút so với chính thống trong các IDE.
 
##  Regex xử lý String trong Code

### Bài toán 1: "Validate chuỗi"

Giả dụ mình cần validate một đoạn embed code của Youtube:
```
<iframe width="560" height="315" src="https://www.youtube.com/embed/2pgxEXn4VH8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
```

1 vài requirement cơ bản là phải có iframe, phải có src và lấy ra src. **Suy nghĩ**

=> kết quả: `(?:iframe[^src]*src=")([^\"]*)`

với đoạn regex này kết quả trả về sẽ là
code
```
input = input.match(/(?:iframe[^src]*src=")([^\"]*)/);
src = input ? input[1] : null;
```

`?:` có nghĩa là sẽ không tính đoạn đó là 1 group match thấy mặc dù có match nhưng group trả về sẽ không bao gồm nó.

`[^\"]` chuỗi kết thúc bằng ", group trả về sẽ không bao gồm `"` mà là kế sau nó sẽ là `"`.

```
Match 1
Full match	1-79	`iframe width="560" height="315" src="https://www.youtube.com/embed/2pgxEXn4VH8`
Group 1.	38-79	`https://www.youtube.com/embed/2pgxEXn4VH8`
```

Nếu xử lý không dùng regex ở đây có lẽ sẽ là 1 loạt split và cộng trừ chuỗi để lấy ra được cái url và check xem input có đúng là iframe hay không ^^

```
input = input.split('iframe');
input = input.length > 0 ? input[1].split('src=') : [];
input = input.length > 0 ? input[1].split('"') : [];
src = input.length > 0 ? input[0] : null;
```

Nhìn sida ứ chịu đc và chắc kèo là ăn comment =))


### Bài toán 2: "Chỉnh sửa chuỗi"

vẫn lấy ví dụ với đoạn input embed của youtube:

```
<iframe width="560" height="315" src="https://www.youtube.com/embed/2pgxEXn4VH8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
```

Mình có 1 ô input để người dùng nhập vào chỉnh width của iframe.

Nếu xử lý không dùng regex thì sẽ là:

```
input = input.split('iframe');
if(input.length > 0){
  width = input[1].split('width="');
  if(width.length > 0){
    value_width = width[1].split('"');    
    if(!isNaN(value_width[0])){
      value_width[0] = input_new_width;
    }
    width[1] = value_width.join('"');
  }
  input[1] = width.join('width="');
}
input = input.join('iframe');
```

comment incuming =))

Thử xài regex xem nhé :)

```
input.replace(/(iframe[^>]*width=")([^\"]*)/, '$1' + new_value);
```

 `$1` ở đây thể hiện cho index group mà nó find ra được bằng regex,
 
 Mỗi cặp `()` nếu match sẽ trả về 1 group.

đoạn regex trên sẽ find string và trả về 2 group là group match với đoạn `(iframe[^>]*width=")` và group match với đoạn `([^\"]*)` 

sau đó ta sẽ replace full match = $1 và new_value tương đương với việc replace bằng đoạn match với  `(iframe[^>]*width=")` và new_value :-s

code nhìn pro hơn hẳn các bạn nhỉ ^^

Trên đây chỉ là 2 bài toán nhỏ để các bạn tập áp dụng regex vào việc sử dụng match và replace của js từ đó sẽ nâng cao performance và tư duy :D

ngoài ra còn nhiều cách áp dụng regex trong các function khác nữa. Các bạn hãy chia sẻ bên dưới nếu biết nhé. Mình cũng chỉ là beginner regex thôi ạ.

reference: #chung_minh_tu #phan_viet_duc