Python có hai toán tử để so sánh bằng, `is` và `==`. Trong bài viết này, thông qua các ví dụ, tôi sẽ chỉ cho bạn biết sự khác biệt giữa hai toán tử này và khi nào thì sử dụng chúng.

![](https://images.viblo.asia/ab7bc6a6-629b-464c-bce4-c19db5d63be3.png)

Khi tôi còn là một đứa trẻ, nhà hàng xóm của tôi có hai con mèo sinh đôi.

Cả hai con mèo trông có vẻ giống hệt nhau - cùng bộ lông màu xám, cùng đôi mắt xanh. Bạn không thể phân biệt chúng chỉ bằng việc nhìn vẻ bề ngoài. Nhưng tất nhiên chúng là hai con mèo khác nhau, hai sinh vật riêng biệt mặc dù nhìn chúng giống hệt nhau.

Có một sự khác biệt về mặt ngữ nghĩa giữa *equal* và *identical*. Và sự khác biệt này là quan trọng khi bạn muốn hiểu các toán tử `is` và `==` hoạt động như thế nào.

**The `==` operator compares by checking for equality (Toán tử `==` so sánh bằng việc kiểm tra tính ngang bằng)**: Nếu những con mèo này là các đối tượng Python và nếu chúng ta so sánh chúng với toán tử `==`, chúng ta sẽ thu được câu trả lời "hai con mèo bằng nhau".

**The `is` operator, however, compares identities (Tuy nhiên toán tử `is` so sánh tính đồng nhất)**: Nếu chúng ta so sánh những con mèo với toán tử `is`, chúng ta sẽ nhận được câu trả lời "đây là những con mèo khác nhau".

Chúng ta hãy bắt đầu với những đoạn code Python.

Đầu tiên, chúng ta tạo ra một đối tượng list và đặt tên nó là `a`, sau đó định nghĩa một biến `b` trỏ tới cùng đối tượng list:

```Python
>>> a = [1, 2, 3]
>>> b = a
```

Cùng xem xét hai biến này. Chúng ta có thể thấy chúng trỏ đến các list trông đồng nhất:

```Python
>>> a
[1, 2, 3]
>>> b
[1, 2, 3]
```

Bởi vì hai đối tượng list trông giống nhau, chúng ta sẽ nhận được kết quả mong muốn khi chúng ta so sánh chúng với toán tử `==`:

```Python
>>> a == b
True
```

Tuy nhiên điều đó không có nghĩa `a` và `b` trỏ cùng tới một đối tượng. Tất nhiên chúng ta biết chắc điều đó bởi vì cách chúng ta gán chúng trước đó, nhưng giả sử chúng ta không biết - làm sao để chúng ta tìm ra?

Câu trả lời là so sánh hai biến với toán tử `is`. Điều này khẳng định hai biến thực tế cùng trỏ tới một đối tượng list:

```Python
>>> a is b
True
```

Hãy cùng xem điều gì xảy ra khi chúng ta tạo ra một bản copy của đối tượng list. Chúng ta có thể làm như vậy bằng cách gọi `list()`:

```Python
>>> c = list(a)
```

Một lần nữa bạn sẽ thấy rằng là list mới mà chúng ta vừa tạo trông giống đối tượng list `a`:

```Python
>>> c
[1, 2, 3]
```

Đây là lúc mọi thứ bắt đầu thú vị - hãy cùng so sánh list `c` với list khởi tạo ban đầu `a` sử dụng toán tử `==`. Câu trả lời nào mà bạn mong chờ?

```Python
>>> a == c
True
```

Okay, tôi hi vọng đó là những gì bạn mong muốn. Điều mà kết quả này nói cho chúng ta biết chính là `c` và `a` có cùng content. Chúng được coi là bằng nhau trong Python. Nhưng liệu chúng có trỏ tới cùng một đối tượng?

```Python
>>> a is c
False
```

Bùm - đây chính là lúc chúng ta thu được một kết quả khác. Python nói với chúng ta rằng `c` và `a` trỏ tới hai đối tượng khác nhau mặc dù content của chúng có thể giống nhau.

Vậy nên, để tổng kết lại, ta đưa ra sự khác biệt giữa `is` và `==` qua hai định nghĩa:

- Biểu thức `is` trả về kết quả `True` nếu hai biến trỏ tới cùng một đối tượng

- Biểu thức `==` trả về `True` nếu các biến có cùng content

Nhớ rằng, nghĩ về những con mèo sinh đôi bất cứ khi nào bạn cần quyết định giữa việc sử dụng `is` và `==` trong Python.

Nguồn: https://dbader.org/blog/difference-between-is-and-equals-in-python