Nếu bạn muốn lưu văn bản dưới dạng một biến hoặc hiển thị nó trên màn hình (với `say`, `echo` hoặc `print`), bạn phải đặt văn bản trong dấu nháy. Bao quanh văn bản bởi dấu nháy làm cho văn bản đó thành một chuỗi string.

Bạn có thể sử dụng dấu nháy đơn `' '` hoặc dấu nháy đôi `" "`, nhưng có một số điểm khác biệt quan trọng mà tôi sẽ đề cập trong bài viết này.


### Dấu nháy đơn (Single Quotes)


Dấu nháy đơn là cách đơn giản nhất để tạo một chuỗi string. Nó chỉ hiển thị những gì nó nhận được, không có "sức mạnh" đặc biệt như có thể hiển thị các giá trị biến (xem bên dưới trong phần dấu nháy đôi).

```
// Using single quotes to save a string in a variable:
$recipe_title = 'Meatball Spaghetti';

// Using single quotes to write something on the screen:
echo '<h1>Meatball Spaghetti</h1>';

// The line above will get output as-is in your code:
<h1>Meatball Spaghetti</h1>
```

<br>

**Xuống dòng với dấu nháy đơn**

Nếu bạn cần hiển thị text trên nhiều dòng, bạn có thể sử dụng ngắt dòng trong dấu nháy đơn để đạt được điều này. Ví dụ:

```
print '<ul>
  <li>Flour - 300 grams</li>
  <li>Butter - 200 grams</li>
  <li>Water - 100 ml</li>
</ul>';
```

Nó sẽ hiển thị ra như sau:

```
<ul>
  <li>Flour - 300 grams</li>
  <li>Butter - 200 grams</li>
  <li>Water - 100 ml</li>
</ul>
```

Nếu bạn cố gắng sử dụng nhiều `print` hoặc `echo` trên nhiều dòng, nó sẽ không hoạt động đúng. Ví dụ:

```
print '<ul>';
print '<li>Flour - 300 grams</li>';
print '<li>Butter - 200 grams</li>';
print '<li>Water - 100 ml</li>';
print '</ul>';
```

Nó sẽ hiển thị ra như sau:

```
<ul><li>Flour - 300 grams</li><li>Butter - 200 grams</li><li>Water - 100 ml</li></ul>
```

**Các ký tự đặc biệt và escape character với dấu nháy đơn**

Bạn chỉ có 2 tùy chọn đối với dấu nháy đơn:

Một là sử dụng `\` để escape một dấu nháy đơn trong một chuỗi string được trích dẫn đơn lẻ.

Bạn sẽ cần phải escape ký tự `'` nếu bạn muốn đưa nó vào chuỗi string. Ví dụ:
```
Bạn sẽ cần phải thoát ký tự 'nếu bạn muốn đưa nó vào chuỗi. Ví dụ:
```

Nó sẽ output ra chuỗi sau một cách chính xác mà không gây ra lỗi
```
Za'atar is a Middle Eastern spice mix.
```

<br>

Hai là sử dụng `\\` để escape dấu gạch chéo `\` (ký tự escape) trong chuỗi.
Bạn có thể sử dụng:
```
echo 'A \\ is called a "backslash."';
```
Để in ra
```
A \ is called a "backslash."
```

*Nó có thể phụ thuộc vào trình biên dịch, nhưng khi tôi thử nghiệm điều này, `\` dường như cũng hoạt động một mình. Tuy nhiên, nếu vì lý do nào đó bạn muốn hiển thị `\\`, bạn có thể cần sử dụng một cái gì đó như `echo '\\\'`; hoặc `echo '\\\\';`. Vì đó là một ký tự đặc biệt, có lẽ tốt nhất bạn nên escape nó trong một số trường hợp*

### Dấu nháy đôi (Double Quotes)

Một sự khác biệt lớn về dấu nháy đôi so với dấu nháy đơn là bạn có thể sử dụng dấu nháy đôi để include các biến trực tiếp bên trong string. Nếu bạn sử dụng dấu nháy đơn, bạn sẽ phải nối các phần lại với nhau. Hãy xem một ví dụ.

Giả sử bạn có công thức nấu ăn và bạn muốn lưu tiêu đề vào một biến có tên là `$recipe_title`:
```
$recipe_title = 'Meatball Spaghetti';
```
Nếu bạn muốn tạo HTML cho các tiêu đề công thức để chúng trông giống như thế này (và bạn không nhúng PHP trực tiếp vào các file HTML, trong đó bạn có thể sử dụng thẻ `<?php ?>` để thay thế các biến):
```
<h1>Meatball Spaghetti</h1>
```

Sử dụng dấu nháy đơn bạn cần thêm các part khác nhau:
```
echo '<h1>' . $recipe_title . '</h1>';
```
Tuy nhiên, với dấu nháy đôi, bạn có thể đặt biến trực tiếp bên trong dấu ngoặc kép
```
echo "<h1>$recipe_title</h1>";
```
Cả 2 cách đều có thể hoạt động tốt, tuy nhiên việc dùng dấu nháy đôi có thể giúp bạn tránh được một vài rắc rối.

**Pro Tip:**

Sử dụng dấu ngoặc nhọn `{}` để chỉ định rõ phần cuối của tên biến khi phân tích cú pháp nó thành một chuỗi dấu nháy đôi.

Cố gắng print 2 cốc ở dòng 2 bên dưới sẽ báo lỗi vì code cho rằng tên biến là `$unit_cups` thay vì `$unit_cup`:
```
$unit_cup = "cup";
print "Flour - 2 $unit_cups";
```
Để tránh những lỗi như thế này, bạn có thể đặt tên biến trong dấu ngoặc nhọn như sau:
```
$unit_cup = "cup";
print "Flour - 2 ${unit_cup}s";
```

Bạn cũng có thể thực hiện một số operations phức tạp hơn với dấu nháy đôi, nhưng điều đó nằm ngoài phạm vi của bài viết này. Để tìm hiểu thêm về phân tích cú pháp các operations phức tạp trong dấu ngoặc kép, hãy xem các ví dụ trong [PHP manual](https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing.complex)

--


Nhân tiện, giống như dấu nháy đơn, bạn có thể thêm dấu ngắt dòng vào output của mình bằng cách thêm dấu ngắt dòng trong chuỗi. Ví dụ:
```
print "<ul>
  <li>Gin - 3 ounces</li>
  <li>Tonic - 4 ounces</li>
  <li>Lime - 1 slice</li>
</ul>";
```
Hiển thị:
```
<ul>
  <li>Gin - 3 ounces</li>
  <li>Tonic - 4 ounces</li>
  <li>Lime - 1 slice</li>
</ul>
```

<br>

**Các ký tự đặc biệt và escape character với dấu nháy đôi**

Dấu nháy đôi cung cấp cho bạn nhiều ký tự đặc biệt hơn so với dấu nháy đơn, bao gồm cả ký tự ngắt dòng:
* `\n` cho 1 dòng mới
* `\t` cho 1 tab
* `\$` cho ký tự $ (để không bị nhầm lẫn với khai báo biến)
* `\"` cho dấu nháy đôi
* Xem thêm tại [PHP Manual](https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.double)

**Chúng ta nên sử dụng cái nào?**

Nói chung, bạn có thể sử dụng một trong hai, nhưng bạn phải nhất quán với loại bạn sử dụng và khi nào. Ví dụ: bạn có thể chọn sử dụng các dấu nháy đơn theo mặc định trừ khi bạn cần sử dụng các biến hoặc ký tự đặc biệt trong chuỗi.

Bạn có thể nghĩ rằng vì dấu nháy đôi cung cấp cho bạn nhiều tính năng hơn, nên tốt hơn là sử dụng chúng mọi lúc, nhưng dấu nháy đơn có lẽ tốt hơn cho các chuỗi đơn giản vì bạn không cần phải escape các ký tự đặc biệt như ký hiệu đô la,...


***Nguồn: ***https://dev.to/morinoko/double-quotes-vs-single-quotes-in-php-2e5n