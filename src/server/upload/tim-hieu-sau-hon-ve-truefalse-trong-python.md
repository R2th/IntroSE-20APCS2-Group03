Tháng vừa rồi, mình có join khóa lập trình Python của công ty mở ra. Thật lòng cảm  thấy nhiều thứ rất hay ho từ ngôn ngữ này
Và hôm nay, mình viết một bài viết tổng hợp về các kết quả True/ False trong Python 
Bài viết có cóp nhặt từ nhiều nguồn khác khau , mong rằng những người mới học về Python như mình thấy hữu ích 

P/s : Trong bài mình sử dụng Python ver 3.8.0

## 1 - Khai báo Phương thức khởi tạo là __bool__() hoặc __len__()

Ta cùng thử nhìn qua với đoạn code sau :

###  __bool__() 
```
>>> class Class1:
...     def __bool__(self):
...             print('constructor is __bool__() ')     
...             return False
...
>>> if Class1():
...     print('True')
... else:
...     print('False')
...
constructor is __bool__()                          # câu lệnh trả về
False
```

Vậy nếu ta định nghĩa constructor cho một Class là bool thì mặc định nó là False 

###  __len__() 

```

>>> class Class2:
...     def __len__(self):
...             print('constructor is __len__()')
...             return False
...
>>> if Class2():
...     print('True')
... else:
...     print('False')
...
constructor is __len__()                # Sau khi thực thi câu lệnh 
False
```
Tương tự với __bool__ , nếu ta khởi tạo là len thì mặc định constructor trả về cũng là False 

**Kết luận** : Khi định nghĩa constructor của 1 class là bool , hoặc len thì mặc định nó là False
Vậy nên trong nhiều trường hợp, ng ta sẽ định nghĩa như sau : 

```
def __len__(self):
        print('len function called')
        if self.id > 0:
            return self.id
        else:
            return 0
```

## Các kiểu giá trị và bool()

Tóm tắt cho phần này bằng bảng dưới đây : 

```
Object            Type         __bool__() or __len__()
---------------------------------------------------------------
None                 NoneType           not exists
False                bool               __bool__()
0                    int                __bool__()
0.0                  float              __bool__()
0j                   complex            __bool__()
Decimal(0)           decimal            __bool__()     
Fraction(0, 1)       Fraction           __bool__()     
''                   str                __len__()
()                   tuple              __len__()
[]                   list               __len__()
{}                   dict               __len__()
set()                set                __len__()
range(0)             range              __bool__() or __len__()
```

Ta có thể dùng __doc__ để đọc xem python trả về true/false như thế nào 

Ví dụ :
```
>>> int.__bool__.__doc__
'self != 0'                  # False khi là 0,  còn lại là  True
>>> list.__len__.__doc__
'Return len(self).'          # trả về giá trị len(self)
```

Ví dụ cụ thể 
###  Kiểu Int 

```
>>> hasattr(int, '__bool__')      
True
>>> hasattr(int, '__len__')
False
>>> bool(1)
True
>>> bool(0)
False                               # Ngoài 0 thì sẽ về True 
>>> bool(-1)
True
```

### str

```
>>> hasattr(str, '__bool__')      
False
>>> hasattr(str, '__len__')        
True
>>> bool('str')                      
True                              
>>> bool('')                       
False                               # Khoảng trống sẽ là False 
```

### list 

```
>>> hasattr(list, '__bool__')
False
>>> hasattr(list, '__len__')        
True
>>> bool([1, 2, 3])
True
>>> bool([0])
True
>>> bool([])
False                               # List rỗng là False 
```

### dict 

```
>>> hasattr(dict, '__bool__')
False
>>> hasattr(dict, '__len__')      
True
>>> bool({1: 'one', 2: 'two', 3: 'three'})
True
>>> bool({})
False                               # dict trỗng là False 
```

### bool 

```
>>> hasattr(bool, '__bool__')      
True
>>> hasattr(bool, '__len__')
False
True
>>> bool(True)
True
>>> bool(False)
False
```

## Kết luận 

Mong rằng bài viết có thể giúp các bạn newbie như mình có thể hiểu hơn về các kiểu trả về true/false trong Python ^^