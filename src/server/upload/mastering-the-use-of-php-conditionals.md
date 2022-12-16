Xin chào các bạn, ở Việt Nam đang mùa dịch bệnh nên trong thời gian rảnh rỗi mình xin dịch một bài viết khá hay về việc sử dụng cấu trúc điều kiện một cách `master` mà mình thấy khá hay. Mong rằng chia sẻ của mình sẽ giúp anh em có những dòng code sạch sẽ hơn :D

Link bài viết gốc:  https://carlalexander.ca/mastering-php-conditionals/

Trong quá trình coding, các cấu trúc điều kiện như `if`, `elseif`, `else` thường được các lập trình viên sử dụng rất rộng rãi. Nhưng các điều kiện này thường `easy to learn, hard to master` (dễ để học, khó để giỏi). Trong thực tế, chúng rất dễ sử dụng nên ta thường tạo ra nhiều thói quen xấu xung quanh việc `coding`. Điều này dẫn đến nhiều đoạn code `lởm`,  gây khó khăn trong việc đọc cũng như maintain sau này. 

Câu hỏi đặt ra là tại sao chúng ta không hình thành những thói quen tốt sử dụng các điều kiện ? Và làm thế nào để sử dụng các câu cấu trúc điều kiện tốt. Sau đây sẽ là 1 số kĩ thuật để cải thiện câu điều kiện của bạn.
# 1. PHP đánh giá độ ưu tiên các dạng điều kiện như thế nào?
Đầu tiên, chúng ta hãy xem cách PHP đánh giá độ ưu tiên các điều kiện. Khi biết cách đánh giá, chúng cho phép bạn `loại bỏ`  toán tử  `and` hoặc`or` trong việc kết hợp điều kiện. Điều này làm cho code của bạn đơn giản hơn.
## 1.1 Thứ tự ưu tiên của một điều kiện
Hồi bé mình học toán khi nói về thứ tự ưu tiên của một phép toán mình hay nhớ câu `Tính toán từ trái qua phải`, `nhân chia trước, cộng trừ sau` hay là `trong ngoặc trước, ngoài ngoặc sau`. Nhưng trong ngôn ngữ lập trình thì sao? chúng ta cùng tìm hiểu tiếp nhé.

Hầu hết trong các ngôn ngữ lập trình, độ ưu tiên thường **từ trái qua phải** và `PHP` cũng không ngoại lệ
```php
if (is_array($array) && !empty($var)) {
    do_something($array, $var);
}
```
Nhìn vào ví dụ trên, `PHP` sẽ gọi hàm `is_array` đầu tiên, nếu hàm này trả về `true`, nó sẽ tiếp tục gọi hàm `empty`. Như vậy là hàm `empty`sẽ chỉ được gọi khi `is_array` trả về `true`. Đây là một thuộc tính quan trọng trong các câu điều kiện của `PHP`. 

`PHP` sẽ ngừng đánh giá các điều kiện một khi nó tìm được một kết quả xác định. Điều này có nghĩa là PHP không luôn luôn chạy tất cả các `hàm` trong câu lệnh của bạn. Để hình dung rõ hơn, chúng ta sẽ lấy ví dụ trên với câu lệnh `if` lồng nhau.
```php
if (is_array($array)) {
    if (!empty($var)) {
        do_something($array, $var);
    }
}
```

Ví dụ trên có logic tương tự khi chúng ta dùng câu lệnh `if` đơn trước đó. `PHP` sẽ bắt đầu bằng cách đánh giá câu lệnh `if` đầu tiên. Và chỉ khi hàm `is_array` trả về `true`. Nó mới đánh giá câu lệnh `if` thứ hai.

Điều đáng chú ý là cả 2 ví dụ trên đều khá phức tạp. Luồng xử lý logic cả 2 ví dụ trên không thay đổi. Điều đó làm cho code của chúng ta khó đọc hơn. Đó là lí do tại sao nên kết hợp chúng lại thành điều kiện duy nhất để tốt hơn.

Dưới đây là 1 số trường hợp PHP sẽ `không bao giờ gọi` vào hàm `do_something` để thoát khỏi cấu trúc điều kiện. Bạn có thể tham khảo nó để có thể kiểm soát câu điều kiện một cách dễ dàng hơn.
```php
if (false && do_something())
    // ...
} elseif (false and do_something())
    // ...
} elseif (true || do_something())
    // ...
} elseif (true or do_something())
    // ...
}
```
## 1.2 Độ ưu tiên

Hãy tưởng tượng chúng ta sẽ thay đổi ví dụ trên như sau 
```php
if (is_array($array) && !empty($array) || !empty($var)) {
    do_something($array, $var);
}
```
Làm thế nào để `PHP` đánh giá một điều kiện logic như trên. Hmm, trong `PHP` có một khái niệm là [độ ưu tiên của toán tử](https://carlalexander.ca/mastering-php-conditionals). Nó cho bạn biết cách mà `PHP` ưu tiên và nhóm các toán tử khác nhau.

Ví dụ khi thực hiện phép tính 1 + 5 * 3 thì kết quả sẽ là 16 chứ k phải 18 bởi vì toán tử * sẽ có độ ưu tiên hơn toán tử +. Hoặc chúng ta có thể sử dụng dấu ngoặc đơn để ưu tiên hơn, (1 + 5 )* 3 sẽ có kết quả là 18.
```php
if ((is_array($array) && !empty($array)) || !empty($var)) {
    do_something($array, $var);
}
```
Trên đây  là cách `PHP` nhìn thấy điều kiện logic của bạn thông qua lăng kính `ưu tiên toán tử`. Chúng sẽ nhóm `is_array` và `empty` để check `array` cùng nhau. Sau đó nhóm kết hợp nhóm đó với hàm `empty` thứ hai.

# 2. Làm thế nào để quản lí các điều kiện lồng nhau ?

## 2.1 Sử dụng mệnh đề bảo vệ

Cách tốt nhất để tránh sử dụng các điều kiện lồng nhau là thay thế chúng bằng [guard clauses](https://en.wikipedia.org/wiki/Guard_(computer_science)).

> Guard Clauses: những đoạn code check điều kiện đơn giản đặt ở trên cùng function

  Mục tiêu của mệnh đề bảo vệ là bảo vệ code của bạn để không xảy ra bất kì lỗi nào trong quá trình thực thi.

Để cho dễ theo dõi trong quá trình đọc, từ thời điểm này mình xin phép dịch `guard clauses` thành mệnh đề bảo vệ cho đúng nghĩa việt hóa. Nếu bạn nào có thể dịch sát nghĩa hơn, vui lòng comment để mình sửa nhé.

![](https://images.viblo.asia/fdf58bb4-daae-414b-9109-b6f4ca873b6f.png)
Trong thực tế, các mệnh đề bảo vệ không có gì khác với các điều kiện mà bạn đã thấy từ trước đến nay. Giả sử rằng chúng ta đã so sánh các điều kiện trong một tập các mệnh đề bảo vệ với một tập các điều kiện lồng nhau, bạn có thể thấy chúng gần như giống nhau.


> Sự khác biệt rõ ràng nhất là ở cấu trúc của chúng. Bạn sẽ ko muốn lồng các điều kiện và bảo vệ nó 1 cách phức tạp, mà sẽ muốn code của bạn đi qua 1 lượt như đi qua cổng thôi. Thế nên nó tương tự nhưng mà lại hữu dụng.

Bạn có thể cần thay đổi điều kiện logic trong từng điều kiện của mình. Ví dụ như bạn có thể cần phải đảo ngược một điều kiện so với điều kiện lồng nhau của nó.
## 2.2 Ví dụ về mệnh đề bảo vệ

Để dễ hiểu hơn chúng ta sẽ đi vào ví dụ chi tiết. Đầu tiên hãy nhìn vào ví dụ với điều kiện duy nhất
```php
function do_something_to_array($array)
{
    if (is_array($array)) {
        $array = clean_array($array);
    }
 
    return $array;
}
```
Điều kiện nằm trong hàm `do_something_to_array` khá đơn giản. Nếu `is_array` trả về `true`, chúng ta thực thi hàm `clear_array` bên trong điều kiện `if`. Sau khi thực hiện xong, hàm sẽ trả về biến `$array`.

Bây giờ hãy nhìn cũng hàm trên nhưng ta dùng mệnh đề bảo vệ

```php
function do_something_to_array($array)
{
    if (!is_array($array)) {
        return $array;
    }
 
    return clean_array($array);
}
```
Chúng ta đã đảo ngược điều kiện để nó có thể hoạt động như một mệnh đề bảo vệ. Để vượt qua nó, `is_array` phải trả về `true`. Nếu không sẽ trả về giá trị của biến `$array`.
Khi đã vượt qua được mệnh đề bảo vệ, chúng ta biết rằng nó là 1 mảng. Đây là một thực tế chúng ta sẽ sử dụng sau này. Như trong ví dụ trên, điều đó có nghĩa là chúng ta phải gọi hàm `clear_array` và trả về giá trị của nó.

Đó là ví dụ với một điều kiện duy nhất. Hãy tăng độ khó cho ví dụ tiếp theo này. Hãy cùng xem các mệnh đề bảo vệ sẽ trông như thế nào với các điều kiện lồng nhau.

```php
function do_something_to_array($array)
{
    if (is_array($array)) {
        $array = clean_array($array);
 
        if (count($array) == 1) {
            return current($array);
        }
    }
 
    return $array;
}
```
Chúng ta có thể thấy ví dụ trên tương tự như trước đó, nhưng ngoại trừ việc chúng ta đã thêm một điều kiện lồng nhau vào nó. Điều kiện mới sẽ kiểm tra kích thước của biến `$array` được hàm `clean_array` trả về. 

Nếu `array` chỉ có một giá trị trong đó, chúng ta sẽ trả về giá trị đó. Để làm việc đó, chúng ta sử dụng hàm `current()`.  Đây là một hàm của PHP trả về giá trị hiện tại mà con trỏ mảng bên trong đang trỏ đến.
```php
function do_something_to_array($array)
{
    if (!is_array($array)) {
        return $array;
    }
 
    $array = clean_array($array);
 
    if (count($array) == 1) {
        return current($array);
    }
 
    return $array
}
```
Trên đây là ví dụ khi ta áp dụng mệnh đề bảo vệ. Trông nó rất giống với ví dụ của chúng ta với các điều kiện lồng nhau trước đó. Chúng ta lấy mọi thứ bên trong điều kiện đầu tiên và đặt nó trước mệnh đề bảo vệ.
## 2.3 Vai trò của mệnh đề bảo vệ
Như chúng ta đã đề cập trước đó, các mệnh đề bảo vệ không xóa đi các điều kiện khỏi code của bạn. Thay vào đó, nó cho phép bạn cấu trúc lại các điều kiện của bạn để code của bạn trở nên `tuyến tính` . Điều đó giúp code của bạn dễ đọc hơn.

![](https://images.viblo.asia/692d3c82-d37d-40e9-8004-3e7c076f8395.png)

Sơ đồ minh họa sự khác biệt giữa 2 phương pháp. Các điều kiện lồng nhau giống như kim tự tháp, nếu xoay ngoang ảnh, thì giống như bạn leo lên nó, nhưng rất khó để biết điều kiện nào đúng từ nơi bạn ở trên đó.

Trong khi đó, mỗi mệnh đề bảo vệ mà `PHP` xử lí giống như kiểm tra một điều kiện tiên quyết. Bạn có thể kiểm tra PHP đã xử lí điều kiện tiên quyết đó chưa bằng cách xem ở bất kỳ chỗ nào trong code của bạn. Đây là những gì làm cho các mệnh đề bảo vệ dễ đọc hơn so với điều kiện lồng nhau.

## 2.4 Refactor các điều kiện lồng nhau để bảo vệ các mệnh đề

Sau khi đọc đến đây bạn có thể đã công nhận với tôi rằng chúng ta không muốn có các điều kiện lồng nhau trong code của bạn nữa. Vậy làm cách nào để chuyển từ điều kiện lồng nhau sang mệnh đề bảo vệ, dưới đây là phương pháp minh họa hình ảnh dành cho bạn.

![](https://images.viblo.asia/4cd08990-d9b9-4e16-ac9f-38fb99f1b166.png)

Trong rất nhiều trường hợp, bạn có thể chuyển đổi từng nấc trong kim tự tháp của điều kiện lồng nhau thành mệnh đề bảo vệ. Thứ tự của mệnh đề bảo vệ phải tuân thủ theo thứ tự hoặc cấp độ của kim tự tháp. Level thấp nhất của kim tự tháp là mệnh đề bảo vệ đầu tiên của bạn, tương tự  như vậy với level 2, 3. Bạn hiểu ý tưởng đúng không :v: 

Đối với code trên mỗi cấp độ của kim tự tháp, nó đi sau mệnh đề bảo vệ cấp độ của nó. Đôi khi bạn cần phải refactor một số logic code. Những lần khác, bạn sẽ có thể sao chép code như hiện tại. Đó là cơ sở mà bạn phải tìm ra trên cơ sở từng trường hợp.
# 3. Return sớm
`Return early` không phải là một phương pháp phức tạp như các mệnh đề bảo vệ. 
> Nó chỉ có ý nghĩa là bạn nên sử dụng các câu lệnh return sớm trong `function` hoặc method của mình nếu nó hợp lí để làm như vậy.

Mục tiêu của phương pháp này là giảm sự lộn xộn trong tư duy logic của người đọc. Khi bạn `return` ở một `function` hoặc  `method` sớm, nó sẽ làm cho bạn dễ theo dõi logic code của mình hơn. Điều này cũng làm code của bạn dễ đọc, dễ maintain hơn.

Nếu như bạn có để ý thì cả 2 ví dụ về mệnh đề bảo vệ chúng ta đều dùng phương pháp này. Chúng ta trả về biến `array` nếu `is_array` trả về `false`. Chúng ta cũng trả về giá trị  `current` bên trong biến `array` nếu nó chỉ chứa một giá trị.


Điều này đưa chúng ta đến một kết luận về `return sớm`: Bạn chỉ có thể sử dụng nó với mệnh đề bảo vệ. Nhưng ngược lại thì không đúng. Bạn không cần phải sử dụng phương pháp `return sớm` khi bạn sử dụng mệnh đề bảo vệ.
# 4. Phá vỡ điều kiện lồng nhau
Đôi khi sẽ không có phương pháp nào trong số các phương pháp trên phù hợp với code của bạn. Trong những tình huống đó, bạn có thể sử dụng điều kiện lồng nhau. Nhưng bạn nên tránh giữ nguyên cấu trúc của code.

Thay vào đó bạn nên chia các điều kiện lồng nhau thành các hàm hoặc phương thức riêng của chúng. 
> Điều đó có nghĩa là bạn phải thay đổi cấu trúc code của bạn nhưng không phải loại bỏ những điều kiện lồng nhau bằng phương pháp này. 

Với mục đích làm cho code của bạn dễ đọc hơn. 
Cùng nhìn vào ví dụ sau để dễ hiểu hơn 
```php
function create_something(array $data)
{
    if (empty($data['type'])) {
        $data['type'] = 'post';
    }
 
    if ('page' == $data['type']) {
        if (empty($data['title'])) {
            $data['title'] = 'Default page title';
        }
 
        // Do stuff with page data
 
        save($data);
    } elseif ('post' == $data['type']) {
        if (empty($data['title'])) {
            $data['title'] = 'Default post title';
        }
 
        // Do stuff with post data
 
        save($data);
    }
}
```
Chúng ta có thể chia hàm `create_something` thành 3 phần như sau. Đầu tiên, sẽ có một mệnh đề bảo vệ ở đầu, nó đảm bảo rằng `data` của mảng luôn là có giá trị với key là `type`.

Bạn có thể tìm thấy phần thứ hai và thứ 3 trong khối điều kiện `if` và `elseif`. Khối `if` chứa code để tạo  một trang. Trong khi đó, khối `elseif` chứa code để tạo của một bài `post`. Cả 2 khối đều chứa một câu lệnh `if` lồng nhau được sử dụng để tạo một tiêu đề mặc định nếu không tồn tại tiêu đề trong mảng.

Vấn đề ở đây nếu dòng `Do stuff` kia là một đoạn logic dài 20 - 30 dòng, khả năng sẽ khó hơn rất nhiều để ta có thể theo dõi những gì sẽ diễn ra. Đó là lí do tại sao phải chia ra làm 3 hàm khác nhau.

```php
function create_page(array $page_data)
{
    if (empty($page_data['title'])) {
        $page_data['title'] = 'Default page title';
    }
 
    // Do stuff with page data
 
    save($page_data);
}
 
 
function create_post(array $post_data)
{
    if (empty($post_data['title'])) {
        $post_data['title'] = 'Default post title';
    }
 
    // Do stuff with post data
 
    save($post_data);
}
 
function create_something(array $data)
{
    if (empty($data['type'])) {
        $data['type'] = 'post';
    }
 
    if ('page' == $data['type']) {
        create_page($data);
    } elseif ('post' == $data['type']) {
        create_post($data);
    }
}
```
Như bạn có thể thấy, chúng ta tạo ra 2 hàm mới là `create_page` và `create_post`. Chúng ta đã chuyển code từ mỗi khối có điều kiện vào từng `function`. Điều này cũng giúp ta tái sử dụng code của mình.

Điều quan trọng là hàm `create_something` rất dễ để đọc bây giờ. Chúng ta thay thế code trong `block`  điều kiện bằng lời gọi hàm riêng biệt. Và cả hai tên hàm đều làm tốt công việc giải thích code mà [hàm thay thế.](https://carlalexander.ca/importance-naming-programming/) .

# 5. Tận dụng toán tử ba ngôi
Bạn đã bao giờ thấy code sử dụng : và ? trước ? Trong PHP, chúng ta sử dụng sự kết hợp các kí tự này để thể hiện[ toán tử ba ngôi](https://en.wikipedia.org/wiki/%3F:). Nó là tips ít được biết đến trong cấu trúc điều kiện 

> condition ? value_if_true : value_if_false

Trong hầu hết các ngôn ngữ lập trình, một điều kiện sử dụng toán tử ba ngôi tuân theo định dạng này. Có một điều kiện, một giá trị điều kiện nếu là đúng và một giá trị nếu điều kiện là sai. Dấu ? và : tách ra thành ba thành phần. 

Mục tiêu chính của toán tử ba ngôi là rút ngắn các câu điều kiện nhỏ. Đây là những điều phổ biến khi bạn muốn gán giá trị dựa trên một điều kiện nào đó. Một kịch bản gán biến có điều kiện phổ biến là gán giá trị mặc đinh. Chúng ta có thể nhìn lại ví dụ sau 

```php
function create_something(array $data)
{
    if (empty($data['type'])) {
        $data['type'] = 'post';
    }
 
    // ...
}
```
Hàm `create_something` ở đây sẽ bắt đầu bằng việc kiểm tra phần từ có key là `type` có rỗng hay không, nếu có sẽ gán giá trị mặc định cho `type` là `post`. Bây giờ bạn cũng có thể sửa mệnh đề bảo vệ này bằng cách sử dụng toán tử ba ngôi. Trông nó sẽ như thế này
```php
function create_something(array $data)
{
    $data['type'] = empty($data['type']) ? 'post' : $data['type']
 
    // ...
}
```
Dựa vào định nghĩa bên trên ta có thể dễ dàng đọc được logic code của đoạn trên mà hết sức ngắn gọn. Điều này khá giống với một định nghĩa trong lập trình, mình xin phép để nguyên dạng tiếng Anh.
> Keep the same value if the empty check is false

# 6 Tránh sử dụng câu lệnh else
## 6.1 Tại sao nên tránh sử dụng ?
> Câu lệnh else làm code phức tạp hơn
> 
Đây gần như là đỉnh cao của tất cả các phương pháp, giống như bạn đạt đến võ công thượng thừa đó. Để thực hiện điều này, bạn cần áp dụng tất cả các phương pháp đã đề cập ở trên. Nhưng làm thế nào để không sử dụng `else`, Điều này có vẻ hơi điên khùng nhưng hãy coi đó là một thử thách dành cho bạn.

Để giải thích lí do tại sao không nên sử dụng `else` chúng ta phải đi tìm căn nguyên của vấn đề sử dụng `else`. Sử dụng câu lệnh `else` giống như đánh cược với số phận vậy. Chúng ta làm một cái gì đó trong điều kiện đúng, ngược lại làm một cái khác. 

Vấn đề gần như việc bạn đi nước đôi vậy. Nó làm cho code của bạn khó đọc hơn, khi bạn phải đọc cái phủ định của điều kiện `if`, và nó cũng làm cho code của bạn phức tạp hơn.

Trong lập trình, chúng ta tốn thời gian đọc code nhiều hơn viết. Đó là lí do tại sao khả năng đọc là một vấn đề quan trọng như vậy. Thật không may là chúng ta không dễ dàng đọc được logic khi sử dụng `else`
![](https://images.viblo.asia/6f5e246e-820c-4501-9041-fc92a084e9c3.png)


Sơ đồ trên cố gắng minh họa tác động đó. Đối với chúng ta, việc đọc sẽ dễ dàng hơn nếu mọi thứ nằm trong một luồng `xử  lý logic tuyến tính`.

Nhưng câu lệnh `else` phá vỡ luồng xử lí tuyến tính trong code của bạn. Bạn sẽ bị rối vì phải hiểu tại sao code của bạn lại nằm trong câu lệnh `else`. Điều đó có nghĩa là bạn phải quay lại từng câu lệnh `if`, `elseif` để xem tại sao lại là `false`.

Cùng theo dõi ví dụ sau để thấy rõ ràng hơn.
```php
function do_something($maybe_array) {
    if (is_array($maybe_array)) {
        foreach($maybe_array as $value) {
            do_something_else($value);
        }
    } else {
        do_something_else($maybe_array);
    }
}
```
Khi ta sử dụng `else` trong trường hợp trên, chúng ta buộc phải sử dụng hàm `do_something_else` hai lần trong 8 dòng code. Đây là điều không nên vì chúng ta đã bị lặp lại logic code. Đó là điều chúng ta nên tránh vì nó có thể làm code của bạn khó bảo trì.
## 6.2 Làm sao để tránh sử dụng else ?
Mẹo nhỏ ở đây là
>  Zoom out on your code

Nhìn lại điều kiện ở hàm `do_something`, bạn có thể thấy nó sẽ xử lí hai kịch bản. Một là `maybe_array` là một mảng, chúng ta sẽ dùng vòng lặp với từng giá trị của mảng `maybe_array` được truyền vào hàm `do_something_else`. Mặc khác, nếu `maybe_array`không là mảng. Chỉ cần truyền `maybe_array` vào trong `do_something_else`.

Vấn đề đặt ra là tại sao chúng ta cần tận hai kịch bản này? hay nói cách khác chúng ta có thể làm cách nào đó để
**chắc chắn rẳng giá trị truyền vào là mảng**.

Khi đã xác định chắc chắc `maybe_array` là một mảng, chúng ta có thể lại bỏ được việc sử dụng `else`.

> Sử dụng mệnh đề bảo vệ thay thế else

Một cách khác là sử dụng mệnh đề bảo vệ để tránh sử dụng else. Nếu chúng ta muốn `maybe_array` là mảng, chúng ta chỉ cần thêm một mảng vào đầu hàm `do_something`. 
```php
function do_something($maybe_array) {
    if (!is_array($maybe_array)) {
        $maybe_array = array($maybe_array);
    }
    
    foreach($maybe_array as $value) {
        do_something_else($value);
    }
}
```
Như chúng ta có thể thấy câu lệnh `else` đã biến mất bằng các dùng mệnh đề bảo vệ kiểm tra nếu `maybe_array` không phải `array`, sẽ biến nó thành một `array`.

# 7. Tổng kết
Tổng kết lại chúng ta đã đưa ra các phương pháp để sử dụng cấu trúc điều kiện để code trở lên sáng sủa hơn như
1. Sử dụng mệnh đề bảo vệ
2. Return sớm
3. Phá vỡ logic trong biểu thức điều kiện
4. Tận dụng toán tử ba ngôi
5. Tránh sử dụng `else`

Bài viết này mình đã đọc khá lâu và nó ăn sâu vào tư duy lập trình của bản thân, để mỗi khi coding mình luôn cố gắng tạo ra những dòng code sạch nhất có thể. Hi vọng nó sẽ giúp bạn thay đổi cả tư duy lập trình của bản thân.

Cảm ơn các bạn đã đọc bài viết, hẹn gặp lại ở những bài viết lần sau.