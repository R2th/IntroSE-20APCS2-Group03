# 1.  Các toán tử định danh is và is not
   Trong python, **is** và **is not** là các toán tử dùng để so sánh "danh tính" (identity)  của hai đối tượng (object), cụ thể là địa chỉ bộ nhớ của chúng. Mọi thứ trong Python đều là một đối tượng và mỗi đối tượng được lưu trữ tại một vị trí bộ nhớ cụ thể nào đó. Trong python, **is** và **is not** là các toán tử kiểm tra xem hai biến có tham chiếu đến cùng một đối tượng trong bộ nhớ hay không. <br>
Chúng ta có thể sử dụng **id()** để kiểm tra identity của một đối tượng bất kỳ.

![](https://images.viblo.asia/e9f29921-3c2f-4533-80bf-f7bf3994ea8a.png)
    <br>
    Có một số trường hợp phổ biến trong đó các đối tượng có cùng giá trị sẽ có cùng id theo mặc định. Ví dụ, các số -5 đến 256 được đặt trong CPython. Mỗi số được lưu trữ tại một vị trí duy nhất và cố định trong bộ nhớ, giúp tiết kiệm bộ nhớ cho các số nguyên thường được sử dụng.<br>
    Tuy nhiên, khi chúng ta sử dụng toán tử gán **(=)** để tạo một biến bằng với biến khác, thì chúng ta đã làm cho các biến này trỏ đến cùng một đối tượng trong bộ nhớ. Điều này có thể dẫn đến hành vi không mong muốn cho các đối tượng  mutable. Ví dụ trong trường hợp sau:
```
>>> a = [1, 2, 3]
>>> b = a
>>> a
[1, 2, 3]
>>> b
[1, 2, 3]
```
<br>    Khi ta thay đổi giá trị của biến **a** sẽ dẫn đến **b** cũng bị thay đổi theo: 
 
    
```
>>> a.append(4)
>>> a
[1, 2, 3, 4]
>>> b
[1, 2, 3, 4]
```
<br>Lí do dẫn đến điều này là do khi gán biến **b** theo **a** thì cả biến **b** và **a** đều trỏ đến cùng một địa chỉ trong bộ nhớ, hay cả **a** và **b** cùng tham chiếu đến một đối tượng.<br>
    
```
>>> id(a)
2570926056520
>>> id(b)
2570926056520
```
<br>
Nếu chúng ta định nghĩa các biến này một cách độc lập với nhau, thì chúng sẽ được lưu trữ tại các địa chỉ bộ nhớ khác nhau và hoạt động hoàn toàn độc lập:<br>

```
>>> a = [1, 2, 3]
>>> b = [1, 2, 3]
>>> a is b
False
>>> id(a)
2356388925576
>>> id(b)
2356388952648
```
<br>

Như các bạn đã thấy, vì **a** và **b** bây giờ tham chiếu đến các đối tượng khác nhau trong bộ nhớ, việc thay đổi một đối tượng này không ảnh hưởng đến đối tượng còn lại. Và đương nhiên, kết quả của phép **is** trong trường hợp này sẽ là **False** <br>
# 2. Các toán tử so sánh (==) và (!=)

Các đối tượng có cùng giá trị thường được lưu trữ tại các địa chỉ bộ nhớ riêng biệt. Sử dụng các toán tử đẳng thức **(==)** và **(!=)** giúp chúng ta kiểm tra xem hai đối tượng có cùng giá trị hay không, bất kể chúng được lưu trữ ở đâu trong bộ nhớ. Trong đa số các trường hợp, đây là những gì mà chúng ta muốn làm. Hãy cùng xem xét ví dụ dưới đây:

```
>>> a = [1, 2, 3]
>>> b = a.copy()
>>> a
[1, 2, 3]
>>> b
[1, 2, 3]

>>> id(a)
2570926058312
>>> id(b)
2570926057736

>>> a == b
True
>>> a is b
False

```

Trong ví dụ ở trên, biến **b** là một bản sao của **a**. Ta có thể thấy rằng mặc dù hai biến **a** và **b** có cùng một giá trị nhưng chúng có địa chỉ trong bộ nhớ hoàn toàn khác nhau. Và trong trường hợp này, toán tử **(==)** trả về kết quả **True** còn toán tử **is** trả về kết quả **False**.
Thực tế là,  khi sử dụng toán tử đẳng thức **(==)**, thì ta đã gọi đến phương thức lớp   __eq __()  của đối tượng nằm bên trái **(==)**. Ta hoàn toàn có thể override lại phương thức này

```
class SillyString(str):
  
    def __eq__(self, other):
        print(f'comparing {self} to {other}')
        # Trả về True nếu self và object còn lại có cùng độ dài
        return len(self) == len(other) 
```

Bây giờ, chuỗi 'Hello world' của SillyString bằng chuỗi 'World hello' và thậm chí với bất kỳ đối tượng nào khác có cùng độ dài:


```
>>> 'hello world' == 'world hello'
False

>>> 'hello world' == SillyString('world hello')
True

>>> SillyString('hello world') == [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
True
```
<br>

Đương nhiên sẽ rất ít khi chúng ta viết lại hàm so sánh, nhưng ví dụ trên minh họa những gì xảy ra khi bạn so sánh hai đối tượng sử dụng **(==)**. Đối với toán tử **(!=)** chúng ta có hàm  __ne __() tương ứng. Chúng ta sẽ làm rõ hơn một số cách thức so sánh của hai toán tử (==) và (!=) trong phần 3.
# 3. Các phương thức tương ứng với các toán tử so sánh

Ngoài hai toán tử (==) và (!=), ta còn có các toán tử so sánh khác như là (>), (<), (>=), (<=) dùng để so sánh giá trị của hai đối tượng. Các toán tử (==) và (!=) được gọi là *equality comparison* còn các toán tử (>), (<), (>=), (<=) là *order comparison*. Các toán tử so sánh nói chung sẽ chỉ quan tâm đến giá trị của đối tượng mà không bắt buộc **Type** của hai đối tượng đó phải cùng loại. 

Vấn đề đặt ra ở đây là: *"Giá trị của một đối tượng bất kỳ là gì?"*. Với các đối tượng thuộc loại số như số nguyên, số thập phân, số phức, v..v thì không khó để ta biết giá trị của chúng là gì. Tuy nhiên, với các đối tượng khác như String chẳng hạn thì giá trị của chúng là một thứ rất khó xác định. Trong Python, giá trị của một đối tượng là một khái niệm khá trừu tượng. Ví dụ: Hoàn toàn không có phương thức truy cập chính tắc nào cho giá trị của đối tượng. Ngoài ra, không có ràng buộc nào hay yêu cầu rằng giá trị của một đối tượng nên được xây dựng theo một cách cụ thể, ví dụ như bao gồm tất cả các thuộc tính dữ liệu của nó. Vì vậy, các toán tử so sánh đã tạo ra các phương thức riêng để so sánh giá trị của hai đối tượng. Các hàm tương ứng của các toán tử (>), (<), (>=), (<=) lần lượt là __gt __(),__lt __() ,__ge __(),__le __() . Như đã trình bày ở phần 2, các hàm này tương tự hàm __eq __(), ta hoàn toàn có thể xây dựng lại các hàm này để định nghĩa cách mà chúng ta so sánh hai đối tượng.  

Sau đây là một số cách mà Python đã xây dựng cho chúng ta: 
*    Kiểu số học có sẵn (Numeric Types — int, float, complex) và kiểu số học trong các thư viện chuẩn như **fractions.Fraction** và **decimal.Decimal** có thể so sánh với nhau, hạn chế là số phức không hỗ trợ các phép so sánh (<, >, <= và >=). 
*    Chuỗi byte (ví dụ bytes hoặc bytearray): có thể so sánh với nhau, họ so sánh theo thứ tự từ điển sử dụng giá trị số học của các phần tử.
*    String: so sánh theo thứ tự từ điển sử dụng mã Unicode. Giá trị mã Uniode có trong hàm ord() của các ký tự của chúng. Chuỗi Str và chuỗi binary không thể so sánh trực tiếp. 
```
>>> print(ord('c'))
99
```

*   Tuple, List: Chỉ so sánh được cùng kiểu và không hỗ trợ các order comparison (>), (<), (>=), (<=) . Nếu ta so sánh một tuple với một list bằng toán tử (==) thì kết quả trả về sẽ là False. Ví dụ:
```
>>> (1, 2) == [1, 2]
False
```

*   Sets (set hoặc frozenset): Cho phép so sánh cùng kiểu hoặc lẫn nhau.
*   Mappings (dict): Chỉ bằng nhau khi chúng có cùng cặp (key, value)
*   Cuối cùng, khi không được hỗ trợ hoặc định nghĩa, khi cố gắng sử dụng  các toán tử order comparison (>), (<), (>=), (<=)  có thể tạo ra lỗi TypeError.




# 4. Kết luận

Theo nguyên tắc thông thường, bạn phải luôn luôn sử dụng các toán tử đẳng thức **(==)** và **(!=)**, trừ trường hợp bạn so sánh với **None**:
* Sử dụng toán tử **(==)** và **(!=)** để so sánh  giá trị của hai đối tượng. Đây là những gì bạn cần nếu bạn muốn so sánh xem hai đối tượng có cùng nội dung hay không và bạn không quan tâm đến nơi lưu trữ chúng trong bộ nhớ.
* Sử dụng toán tử **is** và **is not** khi bạn muốn so sánh identity của hai đối tượng. Ở đây, bạn có thể so sánh xem hai biến có trỏ đến cùng một đối tượng trong bộ nhớ hay không. Trường hợp sử dụng chính cho các toán tử này là khi bạn so sánh với **None**. Nó nhanh hơn và an toàn hơn khi so sánh với **None** theo địa chỉ bộ nhớ so với sử dụng các phương thức lớp.

Tóm lại, các biến có cùng giá trị thường được lưu trữ tại các địa chỉ bộ nhớ riêng biệt. Điều này có nghĩa là bạn nên sử dụng **(==)** hoặc **(!=)** để so sánh các giá trị của chúng và sử dụng **is** và **is not**  khi bạn muốn kiểm tra xem hai biến có trỏ đến cùng một địa chỉ bộ nhớ hay không.