Bài viết sẽ trình bày việc làm như nào và tại sao sử dụng hàm enumerate trong python sẽ làm các vòng lặp python trở nên rõ ràng hơn. 

![](https://images.viblo.asia/91aeceea-c4cb-4003-bcd6-1ebb04acb86e.jpg)
Hàm enumerate của python thực sực có rất nhiều sức mạnh, thật khó để tổng kết sự hữu ích của nó trong một câu. 

Có rất nhiều những feature hữu ích của hàm, mà rất nhiều người mới lập trình python, và có thể có những người lập trình python tầm trung không iết đến. 

Về cơ bản, hàm enumerate() cho phép bạn truy nhập vòng lặp lần lượt qua các thành phần của một collection trong khi nó vẫn giữ index của item hiện tại. 

Hãy đến ví dụ 

```python
names = ['Bob', 'Alice', 'Guido']
for index, value in enumerate(names):
    print(f'{index}: {value}')

//output: 
0: Bob
1: Alice
2: Guido
```
Như bạn dã thấy, thì nó sẽ lần lượt in ra danh sách mảng cùng với chỉ số index của nó bắt đầu từ 0. 

## Làm cách viết các vòng lặp của bạn **pythonic** hơn với enumerate()
Giờ chúng ta sẽ tìm hiểu tại sao việc giữ index với hàm enumerate sẽ dễ dùng hơn. 

Các python developer mới thường bắt đầu từ những người có kinh nghiệm hoặc kiến thức về lập trình C hoặc Java, do đó, thỉnh thoảng code của họ vẫn viết vớ tư tưởng của ngôn ngữ C hoặc Java. Điều này không sai, chương trình vẫn chạy một cách hoàn hảo. 

```python
for i in range(len(my_items)):
    print(i, my_items[i])
```
 
Đây là cách tạo index một cách thông thường. 
Nhưng với những người lập trình Python, thì nhìn đó là một thứ code có mùi không được thơm cho lắm. Bằng cách sử dụng hàm enumerate() một cách khéo léo, vòng lặp của bạn sẽ rõ ràng và đơn giản hơn. 


## Thay đối starting index.
Mặc định, hàm enumerate sẽ bắt đầu với chỉ số index từ 0. Nếu muốn thay đổi chỉ số (index) bắt đầu của vòng lặp, thì ta có thể  thực hiện như sau:

```
names = ['Bob', 'Alice', 'Guido']
for index, value in enumerate(names, 1):
    print(f'{index}: {value}')
```
OutPut đầu ra:
```
1: Bob
2: Alice
3: Guido
```

## Tóm lại: 
- Enumerate là một built-in function của Python. Bạn có thể sử dụng nó cho các vòng lặp của một iterable với việc tự động sinh ra chỉ số index.

- Số đếm (index) bắt đầu mặc định từ 0, nhưng bạn có thể đặt lại nó bằng bất kỳ một số integer nào.

- Enumerate function được thêm vào python từ version 2.3 theo [PEP279](https://www.python.org/dev/peps/pep-0279/)

- Enumerate giúp bạn viết code một cách **pythonic** hơn, và việc đánh chỉ số index hay counter trong vòng lặp một cách tự động, tránh việc làm sai sót khi làm thủ công. 


Nguồn: https://dbader.org/blog/python-enumerate