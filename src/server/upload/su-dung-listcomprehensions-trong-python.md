List comprehensions cung cấp một cách ngắn gọn để tạo một danh sách mới. Nó bao gồm dấu ngoặc chứa một biểu thức theo sau nó là một mệnh đề.
Các biểu thức có thể là bất cứ điều gì. Kết quả sẽ trả lại một List mới dựa trên đánh giá của mệnh đề trong đó.
List comprehensions luôn trả về một danh sách kết quả.

Nếu như chúng ta hay sử dụng như thế này: 
```
new_list = []
for i in old_list:
    if filter(i):
        new_list.append(expressions(i))
 ```
Thì chúng ta có thể viết lại ngắn gọn như thế này:
```
new_list = [expression(i) for i in old_list if filter(i)]
```

# Cú pháp
Cú pháp cơ bản tạo 1 list :
```
[ expression for item in list if conditional ]
```
Cú pháp ở trên tương đương:
```
for item in list:
    if conditional:
        expression
```
chúng ta có thể tạo set hoặc dict:
```
{ expression for item in list if conditional }
```

# Ví dụ
Để tạo một list gồm các số từ 1 tới 10 chúng ta thường làm:
```
lst = []
for i in range(1,11):
	lst.append(i)

print(lst)
[1,2,3,4,5,6,7,8,9,10]
```
Nếu sử dụng list comprehensions thì công việc rất ngắn gọn:
```
lst = [i for i in range(1, 11)]

print(lst)
[1,2,3,4,5,6,7,8,9,10]
```
# Sử dụng list comprehensions thay cho map và filter
Nếu như chúng ta chỉ sử dụng một đối số thì list comprehensions sẽ dễ hiểu hơn là chúng ta sử dụng map.
Thông thường khi sử dụng map trong python chúng ta thường sử dụng kèm với lambda.
```
>>> a=  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
>>> squares= map(lambda x: x**2, a)
>>> list(squares)
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

nếu sử dụng list comprehensions:
```
>>> a=  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
>>> even_squares=[x**2 for x in a]
>>> even_squares
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```
rõ ràng khi nhìn vào 2 biểu thức trên thì ta sẽ thấy sử dụng list comprehensions với 1 tham số sẽ dễ hiểu hơn dùng map.

Filter buil-in function có thể được sử dụng kèm với map. FIlter sẽ trả về một danh sách kết quả với các điều kiện là true.
```
>>> alt	= map(lambda x:	x**2, filter(lambda	x: x%2==0, a))
>>> list(alt)
[4, 16, 36, 64, 100]
```
Nhưng khi nhiều vào khối lệnh trên thì nó sẽ rất lằng nhằng và khó đọc.
Thay vào đó sử dụng list comprehensions sẽ rất dễ dàng và dễ hiểu:
```
>>> even_squares =[x**2 for x in a if x%2==0]
>>> even_squares
[4, 16, 36, 64, 100]
```

### Note
List comprehensions  cũng hỗ trợ nhiều cấp và điều kiện ở mỗi cấp. Tuy nhiên, chúng ta cũng chỉ nên sử dụng nó ở 2 cấp. Việc sử dụng lồng nhiều cấp độ cũng gây ra tình trạng khó đọc. Chúng ta nên tránh điều đó.


# Conclusion
Trên đây là mình đã giới thiệu cách sử dụng List comprehensions trong python. Việc sử dụng nó sẽ giúp code nhìn trông sáng sủa hơn, dễ đọc hơn. Nhưng cũng tránh một số trường hợp. Cái này làm nhiều chũng ta sẽ rút được ra kinh nghiệm. Cảm ơn đã đọc bài.

Tham khảo:

[effective python](https://www.google.com/search?q=effective+pythong+pdf&oq=effective+pythong+pdf&aqs=chrome..69i57j0l5.6053j0j4&sourceid=chrome&ie=UTF-8)

https://www.pythonforbeginners.com/basics/list-comprehensions-in-python