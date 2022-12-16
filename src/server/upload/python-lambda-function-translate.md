>>> Bài viết được dịch từ bản gốc [Python Lambda Function](https://pythongeeks.net/python-tutorials/python-lambda-function/) của [Python Geeks](https://pythongeeks.net/)

Lambda function là một anonymous function. Nghĩa là không có tên function như bình thường. Trong bài viết này, tác giả trình bày cú pháp và cách sử dụng `lambda` function qua các ví dụ cụ thể. Hy vọng rằng sau khi xem bài viết này, các bạn sẽ có thể sử dụng nó trong code của mình.

**Ví dụ nhanh:**

```
y = lambda x : x + 1 print(y(1))
# Result: 2
```

### Lambda Function là gì?

Trong Python, một anonymous function là một hàm không có tên. Một hàm bình thường sẽ bắt đầu bằng từ khoá `def`. Tuy nhiên anonymous function được bắt đầu bằng từ khoá `lambda`. Chính ví vậy người ta thường gọi là `lambda` function.

Thường thì Python lambda function sẽ được các bạn có nhiều kinh nghiệm với Python sử dụng. Vì vậy việc nắm rõ và sử dụng tốt lambda function ngoài việc có thể giúp code đẹp hơn, ngắn gọn hơn, còn giúp thể hiện kinh nghiệm và level của các bạn.

![How Python Lambda Function make your beautiful code](https://pythongeeks.net/wp-content/uploads/2019/10/beautiful_view_of_paris-wallpaper-1920x1080.jpg?resize=640%2C360&ssl=1)<figcaption><br>(Paris - Source: <a href="http://wallpaperswide.com/">Wallpapers Wide</a>)</figcaption>

### Cú pháp và cách sử dụng

Cú pháp của lambda function như sau:

```
lambda arguments: expression
```

- arguments: Có thể dùng nhiều argument cùng lúc.
- expression: Nhưng chỉ có duy nhất một expression. Expression sẽ được thực thi và trả về kết quả.

### Các ví dụ về Python Lambda

#### Ví dụ 1: Lambda function với duy nhất 1 argument

```
y = lambda x : x * 2
print(y(10))

# Result: 20
```

Ở ví dụ trên, `lambda x : x * 2` là anonymous function. `x` là argument duy nhất. `x * 2` là expression sẽ được thực thi. Khi chúng ta gán `x = 10`, expression sẽ thực thi và trả về kết quả `20`.

#### Example 2: Lambda function với nhiều argument

```
ben = lambda x, y : x + y
print(ben(5, 10)) 

# Result: 15
```

Ở ví dụ trên, chúng ta định nghĩa một `lambda` function với 2 arguments. Nếu các bạn muốn có thể thêm nhiều argument nữa. Tuy nhiên nhớ rằng chỉ có duy nhất một expression.

#### Example 3: Lambda Và Map Function

```
iter1 = [1, 5, 7] 
iter2 = [9, 5, 3] 

result = map(lambda x, y: x + y, iter1, iter2) 
print(list(result)) 

# Result: [10, 10, 10]
```

Trong Python, chúng ta thường sử dụng lambda dưới dạng argument của các function higher-order như filter(), map().
Các bạn có thể xem thêm bài viết về [Python Map Function](https://pythongeeks.net/python-tutorials/python-map-function/)

#### Example 4: Lambda Và Filter Function

```
data_list = range(-5, 5)
# data_list = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]

greater_than_zero = list(filter(lambda x: x > 0, data_list))
print(greater_than_zero) 

# Result: [1, 2, 3, 4, 5]
```

Xem thêm về [Python Filter Function](https://pythongeeks.net/python-tutorials/python-filter-function/).