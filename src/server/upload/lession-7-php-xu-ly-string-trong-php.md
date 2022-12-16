### 1. Các hàm xử lý chuỗi
**1. PHP chop () : Xóa kí tự phía bên phải.**

```
 <?php
    $str = "I am Lam";
    echo $str . "<br>";
    echo chop($str,"Lam");
 ?>
```

<br>

Kết quả: 

![](https://images.viblo.asia/3b628504-e2a1-43a8-8f59-c2508946866d.PNG)


- Cho một biến **$str** chứa chuỗi: "I am Lam"
- Thực hiên in ra với **echo**: 
    - Lần in thứ nhất in ra đầy đủ chuỗi kí tự.
    - Lần in thứ hai kết hợp hàm **chop()** với tham số truyền vào là biến **$str** và chuỗi kí tự phía ngoài cùng bên phải cần xóa.

- Tương tự hàm **chop()** là hàm **rtrim()**.



-----


**2. PHP ltrim (): Xóa các kí tự bên trái của chuỗi**


```
<?php
$str = "I am Lam";
echo $str . "<br>";
echo ltrim($str,"I");
?> 
```

<br>

Kết quả:

![](https://images.viblo.asia/848f7da5-e392-4d8b-b619-0619e68888ed.PNG)

Hàm này ngược lại với hàm **chop()**, nó sẽ xóa đi kí tứ bên trái chuỗi và lưu ý rằng chỉ có thể tính từ các kí tự đứng đầu trong chuỗi.


-----


**3. PHP chunk_split (): Chia chuỗi thành các chuỗi nhỏ.**

```
<?php
    $str = "I am Lam";
    echo chunk_split($str,1,".");
?> 
```

<br>

Kết quả: 

![](https://images.viblo.asia/923fede6-98ac-47a2-92f3-794089ed4ddd.PNG)


- Cho một biến **$str** chứa chuỗi: "I am Lam"
- Thực hiện in ra với **echo**: gọi hàm **chunk_split()** với 3 tham số đầu vào, tham số đầu tiên (bắt buộc) truyền vào biến chuỗi, tham số thứ 2  và tham số thứ 3 (Không bắt buộc) là sau bao nhiêu chữ thì chèn vào nội dung trong ngoặc kép.




-----


**4. PHP lcfirst (): Chuyển kí tự đầu tiên thành chữ thường**

```
<?php
echo lcfirst("I am Lam");
?> 
```

<br>

Kết quả: 

![](https://images.viblo.asia/dda4ac9b-89eb-4477-a6cc-359b58302ed8.PNG)

- Không có gì để nói nhiều về hàm này nhỉ :wink: Đơn giản là truyền vào một chuỗi và từ nào đứng đầu chuỗi là chữ hoa thì nó ép sang chữ thường.



-----



**5. PHP similar_text (): Đếm số kí tự trùng nhau giữa hai chuỗi**

```
<?php
echo similar_text("I am Lam","I am Linh");
?>
```

<br>

Kết quả trả về:  6 kí tự giống nhau.



-----


**6. PHP strcasecmp (): So sánh không phân biệt chữ hoa chữ thường**

```
<?php
echo strcasecmp("I am Lam","I AM LAM");
?>

<p>Nếu hàm trả về 0, hai chuỗi so sánh không có khác biệt.</p>
```

<br>
    
Kết quả: 

![](https://images.viblo.asia/063e3a25-fe23-46e1-9e22-98423ed357d8.PNG)

- Và nếu như hai chuỗi có sự khác biệt thì hàm sẽ trả về số lượng kí tự khác biệt trong chuỗi.


-----



**7. PHP strchr (): Tìm kí tự trong chuỗi, trả về kí tự đó và phần còn lại**

```
<?php
echo strchr("I am Lam, hello Lam","am");
?>
```

<br>

Kết quả:

![](https://images.viblo.asia/65cc594d-7c36-4fd5-b7d6-33e6c1bcd445.PNG)

- Hàm **strchr()** sẽ tìm kí tự trong chuỗi, nếu tìm thấy nó sẽ thực hiện trả về kí tự đó và toàn bộ phần chuỗi phía sau kí tự vừa tìm được.


-----


**8. PHP strcmp (): So sánh hai chuỗi và phân biệt chữ hoa chữ thường**

```
<?php
// 2 chuỗi bằng nhau
echo strcmp("I am Lam!","I am Lam!") . "<br>"; // => 0

//Phân biệt chữ hoa chữ thường và khi hoán đổi vị trí chuỗi
echo strcmp("i am lam!","I AM LAM!") . "<br>"; // => 32
echo strcmp("I AM LAM!","i am lam!") . "<br>"; // => -32

//Giảm độ dài ở một chuỗi và khi hoán đổi vị trí chuỗi
echo strcmp("I am Lam!","I am") . "<br>"; // => 5
echo strcmp("I am","I am Lam!") . "<br>"; // => -5

//Tăng độ dài ở một chuỗi và khi hoán đổi vị trí chuỗi
echo strcmp("I am Lam nhảm","I am Lam") . "<br>"; // => 7
echo strcmp("I am Lam","I am Lam nhảm") . "<br>"; // => -7
?> 
```

<br>

Kết quả: 

![](https://images.viblo.asia/028ef228-acbe-465f-8684-30bd03301464.PNG)

- Hàm **strcmp ()** phân biệt chữ hoa chữ thường, nếu chuỗi thứ hai viết thường, kết quả trả về luôn là -32 và ngược lại

-  Tóm lại, Hàm này trả về:
    - `0` - nếu hai chuỗi bằng nhau
    - `<0` - nếu string1 nhỏ hơn string2
    - `>0` - nếu string1 lớn hơn string2


-----


**9. PHP strcspn (): In ra số kí tự đứng trước kí tự được tìm kiếm.**

```
<?php
echo strcspn("Hello, I am Lam","l");
?>
```

<br>

Kết quả: 2

- **strcspn()** tìm kiếm  kí tự trong ngoặc kép từ đầu chuỗi. Nó chỉ tìm đúng một lần và in ra số lượng các kí tự đứng trước nó mà thôi.



-----


**10. PHP stristr (): In ra số kí tự đứng sau kí tự được tìm kiếm.**

```
<?php
echo stristr("Hello Lam!","ll");
?>
```

<br>

Kết quả: 

![](https://images.viblo.asia/c9c5a373-085a-4208-817d-bf9ea08ea938.PNG)

- Nếu **strcspn()** in ra các kí tự đứng trước kí tự được tìm kiếm thì **stristr()** sẽ in ra các kí tự đứng sau kí tự được tìm kiếm


-----


**11. PHP strlen (): Trả về độ dài chuỗi**

```
<?php
echo strlen("Lam");
?>
```

<br>

Kết quả: 3

- Tên cũng như cách thức hoạt động, hàm **strlen()** đếm và trả về số kí tự trong chuỗi.


-----


**12. PHP strpbrk (): Tìm kiếm một chuỗi cho bất kì kí tự nào được chỉ định**

```
<?php
echo strpbrk("Hello Lam","ml");
?>
```

<br>

Kết quả: 

![](https://images.viblo.asia/25e3d857-6604-4123-bc71-66e2d086b103.PNG)

- Truyền vào bất kì kí tự gì bạn muốn tìm kiếm trong chuỗi, hàm **strpbrk()** sẽ duyệt từ đầu chuỗi, kí tự bạn muốn tìm xuất hiện lần đầu ở đâu nó sẽ in nguyên các kí tự phía sau kí tự được tìm kiếm đó.


-----



**13. PHP strrev (): Đảo ngược chuỗi**

```
<?php
echo strrev("Hello Lam!");
?>
```

<br>

Kết quả:  **!maL olleH**


-----


**14. PHP strtolower (): Chuyển tất cả kí tự trong chuỗi thành chữ thường**

```
<?php
echo strtolower("Hello LAM");
?>
```

<br>

Kết quả: **hello lam**


-----


**15. PHP strtoupper (): Chuyển tất cả kí tự trong chuỗi thành chữ hoa**

```
<?php
echo strtoupper("Hello lam!");
?> 
```

<br>

Kết quả: **HELLO LAM!**



-----


**16. PHP substr (): Trả về chuỗi sau chỉ số cho trước**

```
<?php
echo substr("Hello Lam",6);
?>
```

<br>

Kết quả: **Lam**

- Chỉ số index bắt đầu từ 0, đếm từ đầu chuỗi đến kí tự thứ 6 là chữ L, vậy hàm **substr()** in ra kết quả **Lam**.


-----


**17. PHP substr_count (): Đếm số lần chuỗi con xuất hiện trong chuỗi cho trước.**

```
<?php
echo substr_count("Hello Lam. Lam is fine","Lam");
?>
```

<br>

Kết quả: 2

- Rất rõ ràng và dễ hiểu, nhìn vào chuỗi đầu tiên, chuỗi con "Lam" xuất hiện 2 lần trong chuỗi cha => kết quả trả về là 2.



-----


**18. PHP substr_replace (): Thay thế chuỗi ở một chỉ số index được chỉ định.**

```
<?php
echo substr_replace("Hello Lam","Linh",6); 
?>
```

<br>

Kết quả: Hello Linh

- Theo đoạn code trên, đếm index đến số 6 thì thay chuỗi con "Linh" vào chuỗi cha, vậy là chữ Lam sẽ mất đi, thay vào đó là chữ Linh.

**19. PHP trim (): Xóa kí tự sát đầu và sát cuối.**

```
<?php
$str = "Hello Lam!";
echo $str . "<br>";
echo trim($str,"Ham!");
?>
```

<br>

Kết quả: 

![](https://images.viblo.asia/26efc15a-5ef1-4042-b7c1-66d9d25396a9.PNG)

- Hàm trim() sẽ tìm kí tự đầu và cuối và thực hiện xóa từ những kí tự đó, nếu bạn nhập những kí tự ở giữa thì nó chịu, không xử lý được nhé :laughing:



-----


**20. PHP ucfirst (): chuyển đổi ký tự đầu tiên của một chuỗi thành chữ hoa**


```
<?php
echo ucfirst("hello lam!");
?> 
```

<br>

Kết quả: **Hello lam**

- Xin nhắc lại là chỉ kí tự đầu tiên trong chuỗi thôi nhé!


-----


21. PHP ucwords (): chuyển đổi ký tự đầu tiên của mỗi từ trong chuỗi thành chữ hoa

```
<?php
echo ucwords("hello lam");
?> 
```

<br>

Kết quả: Hello Lam

- Mỗi kí tự bắt đầu mỗi từ đều sẽ được chuyển thành chữ hoa.

<br>



-----

### 2. Nguồn tham khảo
Tham khảo thêm ở  [PHP string reference](https://www.w3schools.com/php/php_ref_string.asp).

Nhiều quá nên không nhớ hết được, để ở đây cùng xem nhé!  :yum:

 :maple_leaf:**𝔑𝔥ậ𝔱 𝔏𝔞𝔪**:maple_leaf: