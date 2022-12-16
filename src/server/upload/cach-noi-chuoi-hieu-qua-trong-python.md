Khi tôi mới bắt đầu sử dụng Python, tôi thường sử dụng toán tử `+` để nối chuỗi như  nhiều ngôn ngữ lập trình đã làm như Java.

Tuy nhiên tôi nhận ra rằng nhiều các dev xung quanh dùng `join()` thay vì sử dụng `+`. Trong bài viết này tôi sẽ giới thiệu sự khác nhau giữa 2 phương pháp và tại sao bạn không nên dùng `+`

# Bắt đầu
![](https://images.viblo.asia/e9425850-e3a4-4470-98fe-a584b1f88807.jpeg)

Thường người mới bắt đầu, chuyển sang từ các ngôn ngữ khác sử dung `+` để nối chuỗi, rất dễ để viết như sau:

```python
str1 = 'I love '
str2 'Python.'
print(str1+str2)

Output: I love Python.
```
Khi bạn sử dụng Python nhiều hơn, bạn nhân ra rằng nhiều người sẽ dùng `join()` để nối chuỗi như sau:

```python
str1 = 'I love '
str2 'Python.'
print(''.join([str1, str2]))

Output: I love Python.
```

Chúng ta có thể gặp trường hợp nối nhiều chuỗi cùng 1 lúc trong 1 list
`strs = ['Life', 'is', 'short,', 'I', 'use', 'Python']`

Ban đầu chúng ta cỏ thể làm như sau:
```python
strs = ['Life', 'is', 'short,', 'I', 'use', 'Python']
def join_strings(strings):
    result = ''
    for s in strs:
        result += ' ' + s
    return result[1:]
  
join_strings(strs)

Output: Life is short, I use Python
```

Như vậy ta phải viết 1 vòng lặp để nối từng chuỗi vào một. Tất nhiên ta cũng phải thêm các space giữa các string trong list. Sau đó tôi nhận ra `join()` có thể làm điều này 1 cách nhanh chóng

```python
def join_strings_better(strings):
    return ' '.join(strings)
    
join_strings_better(strings)
```

Điều này thật sự rất cool đúng kiểu **one line do everthing** trong Python. 
Nhưng `join()` trong Python không chỉ làm syntax ngắn hơn, mà vể mặt performance `join()` cũng đạt kết quả tốt hơn.

# Logic đằng sau phương thức join

Bây giờ chúng ta sẽ so sánh, về mặt hiệu năng giữa 2 phương pháp. Chúng ta có thể sử dụng `%timeit` của Jupyter Notebook để so sánh :
![](https://images.viblo.asia/9e15708f-1834-4e9d-bc1d-e304353c95a0.png)


Hiệu năng đo ở trên ở trên 100000 bản ghi do đó kết quả rất rõ ràng v à chính xác.  Sử dụng `join()` có thể nhanh hơn 4 lần so với dùng `+`.

Đây là cách mà `+` hoạt động:
![](https://images.viblo.asia/62bcd15e-fb69-492d-ba81-59867c938d34.png)

Điều này cho thấy những gì vòng lặp for và toán tử + đã làm:

1. Đối với mỗi vòng lặp, chuỗi được tìm thấy từ danh sách
2. Trình thực thi Python diễn giải kết quả biểu thức + = '' + s và áp dụng cho địa chỉ bộ nhớ cho khoảng trắng ''.
3. Sau đó, executor nhận ra rằng khoảng trắng cần được nối với một chuỗi, vì vậy nó sẽ áp dụng cho địa chỉ bộ nhớ cho chuỗi s, đó là vòng lặp đầu
4. Đối với mỗi vòng lặp,executor sẽ cần phải áp dụng cho địa chỉ bộ nhớ hai lần, một lần cho các khoảng trắng và một lần khác là cho chuỗi
5. Có 12 lần cấp phát bộ nhớ

Còn đây là cách `join()`sử dụng :
![](https://images.viblo.asia/bead0a24-c497-49fa-846f-c30a33e8d00f.png)

1. executor sẽ đếm có bao nhiêu chuỗi trong danh sách (có 6).
2. Điều đó có nghĩa là chuỗi được sử dụng để nối các chuỗi trong danh sách sẽ cần phải được lặp lại 6 - 1 = 5 lần.
3. Nó biết rằng có tổng cộng 11 không gian bộ nhớ là cần thiết, vì vậy tất cả chúng sẽ được áp dụng cùng một lúc và được phân bổ trả trước.
4. Đặt các chuỗi theo thứ tự, trả lại kết quả.

Như vậy có 1 sự khác nhau đáng kể khi phân bố bộ nhớ giữa 2 phương pháp và đó là nguyên nhân chính dẫn đến sự khác nhau về mặt hiệu năng.

# Summary
![](https://images.viblo.asia/177aa9da-9f31-4643-8779-cdeb372ec7ff.jpeg)

Python là 1 ngôn ngữ kì diệu, **oneline can do everything**. Hãy tận dụng sự magic của Python để đạt hiệu năng tối đa cho phần mềm chúng ta phát triển. Happy coding !!!

# Nguồn
https://towardsdatascience.com/do-not-use-to-join-strings-in-python-f89908307273
https://stackoverflow.com/questions/3055477/how-slow-is-pythons-string-concatenation-vs-str-join