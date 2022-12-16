Một tutorial mô tả từng bước về 3 cách chính để đảo ngược một list trong Python.

<br>

[![How to Reverse a List in Python](https://i.ytimg.com/vi/sGhY8dQdu4A/sddefault.jpg)]("https://www.youtube.com/watch?v=sGhY8dQdu4A")

Đảo ngược một list là một thao tác phổ biến trong lập trình Python.

Ví dụ, tưởng tượng bạn có một list gồm các tên khách hàng đã được sắp xếp mà chương trình của bạn hiển thị theo thứ tự alphabet. Một vài user muốn xem list khách hàng theo thứ tự ngược lại.

### Đâu là cách tốt nhất để đảo ngược một list trong Python?

Trong bài viết này, chúng ta sẽ thấy ba cách khác nhau để đạt được mục đích mà không cần tới thư viện của bên thứ ba:

>1. Sử dụng phương thức `list.reverse()`
>2. Sử dụng mẹo list slicing "[::-1]"
>3. Tạo một iterator đảo ngược với hàm built-in `reversed()`

### Option #1: Reversing a List In-Place With the `list.reverse()` Method

*In-place* ở đây nghĩa là sẽ không có list mới được tạo ra. Thay vào đó phương thức `reverse()` sẽ trực tiếp thay đổi đối tượng list ban đầu:

```Python
>>> mylist = [1, 2, 3, 4, 5]
>>> mylist
[1, 2, 3, 4, 5]

>>> mylist.reverse()
None

>>> mylist
[5, 4, 3, 2, 1]
```

Như bạn có thể thấy, việc gọi `mylist.reverse()` trả về `None` nhưng lại thay đổi đối tượng list ban đầu. Việc implement đã được lựa chọn kỹ càng bởi các nhà phát triển thư viện chuẩn Python:

>The `reverse()` method modifies the sequence in place for economy of space when reversing a large sequence. To remind users that it operates by side effect, it does not return the reversed sequence.

### Option #2: Using the “[::-1]” Slicing Trick to Reverse a Python List

List có một tính năng thú vị là *slicing*. Một trường hợp đặc biệt khi slicing một list với "[::-1]" sẽ tạo ra một list mới đã được đảo ngược:

```Python
>>> mylist
[1, 2, 3, 4, 5]

>>> mylist[::-1]
[5, 4, 3, 2, 1]
```

Đảo ngược list theo cách này tốn bộ nhớ hơn so với cách đầu tiên bởi vì nó tạo ra một *shallow copy* của list ban đầu. Tạo ra một shallow copy nghĩa là chỉ có container bị duplicate, còn bản thân các element trong list thì không. Vậy nên, nếu một element trong list ban đầu bị thay đổi thì shallow copy cũng sẽ bị ảnh hưởng.

### Option #3: Creating a Reverse Iterator With the `reversed()` Built-In Function

Bản thân `reversed()` không đảo ngược list ban đầu, cũng chẳng tạo ra một bản copy. Thay vào đó, chúng ta nhận được một iterator đảo ngược mà từ đó chúng ta có thể duyệt qua các element của list theo thứ tự ngược:

```Python
>>> mylist = [1, 2, 3, 4, 5]
>>> for item in reversed(mylist):
...     print(item)
5
4
3
2
1
>>> mylist
>>> [1, 2, 3, 4, 5]
```

Ở bên trên, chúng ta chỉ lặp qua các element của list theo thứ tự ngược. Vậy làm thế nào để tạo ra một bản copy đảo ngược với hàm `reversed()`?

```Python
>>> mylist = [1, 2, 3, 4, 5]
>>> list(reversed(mylist))
[5, 4, 3, 2, 1]
```

Vậy đó! Kết quả là chúng ta thu được một shallow copy của list ban đầu.

### Summary

Nếu bạn đang thắc mắc đâu là cách tốt nhất để đảo ngược một list trong Python, câu trả lời của tôi sẽ là "Còn tùy". Theo cá nhân tôi, tôi thích cách tiếp cận thứ nhất và thứ ba:

- Phương thức `list.reverse()` nhanh, rõ ràng. Nếu trong trường hợp của bạn, việc đảo ngược bản thân list ban đầu là chấp nhận được, hãy chọn cách này.

- Nếu điều đó là không chấp nhận được, hãy sử dụng `reversed()`.

Tôi không thích mẹo list slicing. Cú pháp của nó khá khó hiểu. Tôi tránh sử dụng nó vì lý do này.

Chú ý rằng có những cách tiếp cận khác như là tự implement từ đầu hay đảo ngược list sử dụng đệ quy - những cái hay được hỏi trong các buổi phỏng vấn nhưng không thực sự là giải pháp hay đối với lập trình Python trong thực tế. Đó là lý do mà tôi không đề cập đến nó trong tutorial này.

Nguồn: https://dbader.org/blog/python-reverse-list