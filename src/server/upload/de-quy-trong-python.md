Chào các bạn Trong bài  này, mình sẽ giới thiệu có các bạn về khái niệm Đề Quy trong Python. Các bạn cùng tìm hiểu trong bài viết của mình nhé!


----

####  Đệ quy là gì ?

Đệ quy có nghĩa là một hàm tự gọi lại chính nó.

Một ví dụ t là đặt hai gương song song đối diện nhau. Bất kỳ đối tượng nào ở giữa chúng sẽ được phản ánh được gọi là đệ quy.

----

####  Hàm Đệ Quy trong Python

Trong Python, chúng ta biết rằng một hàm có thể gọi các hàm khác. Thậm chí có thể cho hàm tự gọi. Các loại cấu trúc này được gọi là các hàm đệ quy.

Hình ảnh sau đây cho thấy hoạt động của một hàm đệ quy được gọi là `recurse`.


![](https://images.viblo.asia/6c1eb3cb-1657-4dba-8116-fce5379cee9b.png)


Sau đây là một ví dụ về một hàm đệ quy để tìm giai thừa của một số nguyên.

Giai thừa của một số là tích của tất cả các số nguyên từ 1 đến số đó. Ví dụ: giai thừa của 6 (được ký hiệu là 6!) Là `1*2*3*4*5*6 = 720`


#####  Ví dụ về một hàm đệ quy

``` html
def factorial(x):
    """This is a recursive function
    to find the factorial of an integer"""

    if x == 1:
        return 1
    else:
        return (x * factorial(x-1))


num = 3
print("The factorial of", num, "is", factorial(num))
```

Kết quả sẽ là 

``` html
The factorial of 3 is 6
```

Trong ví dụ ở trên, `factorial()` là một hàm đệ quy vì nó gọi chính nó.

Khi chúng ta gọi hàm này với một số nguyên dương, nó sẽ gọi một cách đệ quy chính nó bằng cách giảm số


Mỗi hàm nhân số với giai thừa của số bên dưới nó cho đến khi nó bằng một. Cách gọi hàm đệ quy này có thể được giải thích theo các bước sau.

``` html
factorial(3)          # 1st call with 3
3 * factorial(2)      # 2nd call with 2
3 * 2 * factorial(1)  # 3rd call with 1
3 * 2 * 1             # return from 3rd call as number=1
3 * 2                 # return from 2nd call
6                     # return from 1st call
```


Dưới đây là một ảnh giải thích cụ thể từng bước cách xử lý hàm đệ quy:

![](https://images.viblo.asia/cedc935a-5cce-41bb-9a62-c35b5e5165f1.png)



Đệ quy của chúng ta kết thúc khi số lượng giảm xuống 1. Đây được gọi là điều kiện bắt buộc nhé.

Lưu ý là mọi hàm đệ quy phải có một điều kiện bắt buộc  để dừng đệ quy  nếu không hàm đó sẽ  gọi chính nó vô hạn.


Theo mặc định, `depth` tối đa  của đệ quy là `1000`. Nếu vượt qua giới hạn, nó dẫn đến lỗi Đệ quy `RecursionError`.

Dưới đây là ví dụ gây lỗi khi quá giới hạn `depth`.

``` html
def recursor():
    recursor()
recursor()
```


Lỗi sẽ hiển thị như sau: 

``` html
Traceback (most recent call last):
  File "<string>", line 3, in <module>
  File "<string>", line 2, in a
  File "<string>", line 2, in a
  File "<string>", line 2, in a
  [Previous line repeated 996 more times]
RecursionError: maximum recursion depth exceeded
```



----

####  Một số ưu điểm của Đệ Quy



1. Khi sử dụng hàm Đệ Quy thì sẽ giúp code được sach sẽ và tối ưu hơn.
2. Một yêu cầu phức tạp có thể được chia thành các task nhỏ đơn giản hơn bằng cách sử dụng đệ quy.

----

#### Kết Luận
Dưới đây mình đã giới thiệu với các bạn về khái niệm của Đệ Quy trong Python
Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---

### Tham Khảo chi tiết hơn

https://www.programiz.com/python-programming/object-oriented-programming