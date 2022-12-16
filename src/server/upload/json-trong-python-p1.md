### 1. JSON là gì?
JSON là một kiểu định dạng dữ liệu trong đó sử dụng văn bản thuần tuý, định dạng JSON sử dụng các cặp key - value để dữ liệu sử dụng. JSON ban đầu được phát triển để dành phục vụ cho ứng dụng viết bằng JavaScript. Bản thân thuật ngữ JSON là viết tắt của cụm từ JavaScript Object Notation . Tuy nhiên vì JSON là một định dạng dữ liệu nên nó có thể được sử dụng bởi bất cứ ngôn ngữ nào àm không giới hạn với JavaScript.
### 2. JSON trong Python
Python tích hợp sẵn một gọi có tên là `json`, có thể sử dụng để làm việc với dữ liệu JSON.
```
import json
```
##### 1. Convert JSON trong Python
Sử dụng hàm `json.loads()` để convert một string JSON thành `Dictionary`
```
import json

# some JSON:
x =  '{ "name":"John", "age":30, "city":"New York"}'

# parse x:
y = json.loads(x)

# the result is a Python dictionary:
print(y["age"])
```

##### 2. Convert object Python thành JSON
Sử dụng hàm `json.dumps()` để convert một Object Python thành string JSON
```
import json

# a Python object (dict):
x = {
  "name": "John",
  "age": 30,
  "city": "New York"
}

# convert into JSON:
y = json.dumps(x)

# the result is a JSON string:
print(y)
```
Danh sách các object có thể convert thành string JSON

* dict
* list
* tuple
* string
* int
* float
* True
* False
* None

```
import json

print(json.dumps({"name": "John", "age": 30}))
print(json.dumps(["apple", "bananas"]))
print(json.dumps(("apple", "bananas")))
print(json.dumps("hello"))
print(json.dumps(42))
print(json.dumps(31.76))
print(json.dumps(True))
print(json.dumps(False))
print(json.dumps(None))
```
Bảng chuyển đổi đối tượng giữa Python và JSON
|Python|	JSON|
|-|-|
|dict|	Object
|list	|Array
|tuple	|Array
|str	|String
|int	|Number
|float|	Number
|True|	true
|False	|false
|None	|null|
```
import json

x = {
  "name": "John",
  "age": 30,
  "married": True,
  "divorced": False,
  "children": ("Ann","Billy"),
  "pets": None,
  "cars": [
    {"model": "BMW 230", "mpg": 27.5},
    {"model": "Ford Edge", "mpg": 24.1}
  ]
}

print(json.dumps(x))
```
##### 3. Format hiển thị
Để hiển thị đẹp mắt, dễ nhìn hơn `json.dumps()` cung cấp thêm tham số `indent` để format số thụt lề (1 indent bằng 1 space)
```
json.dumps(x, indent=4)
```

##### 4. Sắp xếp key
Mặc định JSON sẽ hiển thị các khóa không theo thứ tự. Để sắp xếp các key, `json.dumps()` cung cấp tham số `sort_keys`
```
json.dumps(x, indent=4, sort_keys=True)
```
### 3. Kết luận
Module `json` trong Python còn cung tích hợp rất nhiều tính năng khác trong các method trên. Phần sau mình sẽ cung cấp thêm cho các bạn.
Nguồn: https://www.w3schools.com/python/python_json.asp