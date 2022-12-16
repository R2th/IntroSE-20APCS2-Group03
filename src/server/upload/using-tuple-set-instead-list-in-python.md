Nếu đã làm việc với Python, bạn chắc đã quá quen với command list. list rất tiện dụng, linh hoạt, syntax rõ ràng. Chính vì những ưu điểm đó, nó đã lấn át 2 vị anh em họ hàng xa là tuple, và set. 

Mình đã từng nghe một câu nói:
> Mọi thứ sinh ra và tồn tại tới bây giờ đều có lý do.

Vậy tuple và set có những ưu thế gì mà nó vẫn được giữ cho tới bây giờ ? Tuple và set có thể thay thế list trong nhưng hoàn cảnh nào ? Bài viết dưới đây sẽ giúp mọi người trả lời được 2 câu hỏi trên.

## Tuple

Có lẽ điểm khác nhau về cách sử dụng giữa list và tuple nhiều nhất là `tuple is immutable`. Một tuple được define, các phần tử trong tuple sẽ không thể changed.

List sử dụng "[]" để define, tuple sử dụng "()" để define. Việc chuyển đổi qua lại giữa list và tuple cũng rất đơn giản.

```py

>>> # define a list
... var_list = [1, 2, 3]
>>> 
>>> print(var_list)
[1, 2, 3]
>>> print(type(var_list))
<class 'list'>

>>> # define a tuple
... var_tuple = (1, 2, 3)
>>> 
>>> print(var_tuple)
(1, 2, 3)
>>> print(type(var_tuple))
<class 'tuple'>

>>> # convert from list to tuple
... print(tuple(var_list))
(1, 2, 3)
>>> print(type(tuple(var_list)))
<class 'tuple'>

>>> # convert from tuple to list
... print(list(var_tuple))
(1, 2, 3)
>>> print(type(list(var_list)))
<class 'list'>
```

Ban đầu, vì sự `immutable` sẽ làm developer khá là khó chịu khi sử dụng. Tuy nhiên, có 2 trường hợp bạn có thể cân nhắc sử dụng tuple thay thế cho list.

- `Writing more semantic and safe code`. Tức là, khi bạn define một tuple, bạn muốn nói rằng, variable đó chỉ được view, not change. Nó sẽ khiến code mình chặt chẽ và an toàn hơn.

- `Improving performance`. Việc sử dụng tuple sẽ nhanh hơn sử dụng list. Tuple sử dụng memory hiệu quả hơn list. Lý do bởi phần tử trong tuple không bị thay đổi.

Nếu bạn có một danh sách các phần tử sẽ không bị thay đổi hoặc danh sách đó chỉ có nhiệm vụ lặp đi lặp lại, hãy thử sử dụng tuple thay thế list.

## Set

Set sinh ra để đảm bảo trong một danh sách các phần tử, không có phần tử nào giống phần tử nào. 

Set sử dụng "{}" để define. Nó khá giống dict. Nên khi develop hãy chú ý để tránh nhầm lẫn.

```py
>>> # define a list
... var_list = [1, 2, 3]
>>> 
>>> print(var_list)
[1, 2, 3]
>>> print(type(var_list))
<class 'list'>

>>> # define a set
... var_set = {1, 2, 3}
>>> 
>>> print(var_set)
{1, 2, 3}
>>> print(type(var_set))
<class 'set'>

>>> # convert from list to set
... print(set(var_list))
{1, 2, 3}
>>> print(type(set(var_list)))
<class 'set'>

>>> # convert from set to list
... print(set(var_set))
{1, 2, 3}
>>> print(type(list(var_set)))
<class 'list'>
```

Như đã nói ở bên trên set sẽ đảm bảo rằng trong một danh sách sẽ không có phần tử nào bị lặp lại.

```py
>>> duplicate_var_list = [1, 2, 3, 4, 4, 4, 5, 6]
>>> print(set(duplicate_var_list))
{1, 2, 3, 4, 5, 6}
>>> print(list(set(duplicate_var_list)))
[1, 2, 3, 4, 5, 6]
```

Qua ví dụ này bạn sẽ thấy "lý do" sử dụng set. Khi bạn có một danh sách các phần tử , có phần tử bị duplicate. Khi bạn loop, mà muốn bỏ qua những phần tử đã được loop rồi thì sử dụng thêm set là hợp lý. 

Ngoài ra, khi bạn gặp các bài toán thế này. 
- Bạn cần so sánh 2 list xem chúng có những phần tử nào khác nhau. Bạn có thể sử chuyển 2 list thành 2 set. Sau đó sử dụng `difference()` function đẻ compare.

```py
>>> set1 = {10, 20, 30, 40, 80} 
>>> set2 = {100, 30, 80, 40, 60} 
>>> print (set1.difference(set2)) 
{10, 20}
>>> print (set2.difference(set1)) 
{100, 60}
```

- Bạn cần so sánh 3 list xem chúng có những phần tử nào giống. Bạn có thể sử chuyển 3 list thành 3 set. Sau đó sử dụng `intersection()` function để get ra list các phần tử giống nhau trong 3 list ban đầu.

```py
>>> set1 = {2, 4, 5, 6}  
>>> set2 = {4, 6, 7, 8}  
>>> set3 = {4,6,8} 
>>> print("set1 intersection set2 intersection set3 :", set1.intersection(set2,set3)) 
set1 intersection set2 intersection set3 : {4, 6}
```

- Bạn cần tổng hợp danh sách các phần tử khác nhau từ 4 list. Trong 4 list này có thể có các phần tử trùng nhau. Bạn có thể sử dụng set kết hợp với `union()`.

```py
>>> set1 = {2, 4, 5, 6}  
>>> set2 = {4, 6, 7, 8}  
>>> set3 = {7, 8, 9, 10}
>>> set4 = {7, 8, 9, 10}
>>> print("set1 U set2 U set3 :", set1.union(set2, set3, set4)) 
set1 U set2 U set3 : {2, 4, 5, 6, 7, 8, 9, 10}
```

## Conclusion

Mỗi một bài toán, Python đề có công cụ phù hợp để xử lý cho bài toán đó. Sử dụng list có thể đáp ứng tốt được cái bài toán. Nhưng nếu nói đáp ứng tốt nhất thì phải tùy trường hợp ta có thể thay thế việc sử dụng list bằng tuple hay list.