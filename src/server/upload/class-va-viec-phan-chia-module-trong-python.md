Xin chào các bạn. Hôm nay mình sẽ giới thiệu với các bạn về  Class và việc Phân chia Module trong Python


- [Class](#class)
    - [Khai	báo	một	Class](#khai-bao-class)
- [Phân	chia	module](#phan-chia-module)
    - [Các	loại	module	/	thư	viện](#module-thu-vien)
    - [Đường	dẫn	tìm	để	load	module](#load-module)
    - [Lấy	danh	sách	thuộc	tính	và	phương
thức	của	một	module](#list-module)
    - [Cách	khai	báo	và	sử	dụng	module](#use-module)
    - [Package	module](#package-module)


## Class

Lập	trình	hướng	đối	tượng	là	một	khái	niệm	không	thể
thiếu	trong	hầu	hết	các	ngôn	ngữ	thông	dụng	hiện	nay.
Python	cũng	hỗ	trợ	lập	trình	hướng	đối	tượng	với	các	khái
niệm	Class,	Object,	Override...

### Khai	báo	một	Class

Khai	báo	một	class	theo	cú	pháp	sau:

```text
class	myclass([parentclass]):
				assignments
				def	__init__(self):
								statements
				def	method():
								statements
				def	method2():
								statements
```


Ví	dụ	một	class:


```text
class	animal():
				name	=	''				name	=	''
				age	=	0
				def	__init__(self,	name	=	'',	age	=	0):
								self.name	=	name
								self.age	=	age
				def	show(self):
								print	'My	name	is	',	self.name
				def	run(self):
								print	'Animal	is	running...'
				def	go(self):
								print	'Animal	is	going...'
				
								
class	dog(animal):
				def	run(self):
								print	'Dog	is	running...'
								
myanimal	=	animal()
myanimal.show()
myanimal.run()
myanimal.go()
				
mydog	=	dog('Lucy')
mydog.show()
mydog.run()
mydog.go()
```

Sau	khi	thực	thi	sẽ	cho	ra	kết	quả:

```text
My	Name	is
Animal	is	running...
Animal	is	going...
My	Name	is	Lucy
Dog	is	running...
Animal	is	going...
```

Trong	ví	dụ	trên	thì:

* `animal` 	và	 `dog` 	là	2	class.	Trong	đó	class	 `dog` 	kế	thừa
từ	class	cha	là	 `animal` 	nên	sẽ	có	các	phương	thức	của
class	 `animal` .
* `name` 	và	 `age` 	là	thuộc	tính	(Attribute)	của	class.
* Phương	thức	 `__init__(self)` 	là	hàm	tạo	của	class.
Hàm	này	sẽ	được	gọi	mỗi	khi	có	một	object	mới	được
tạo	(từ	một	class),	gọi	là	quá	trình	tạo	instance.
* `show() `,	` run()` 	và	 `go() `	là	2	phương	thức	của	2	class.
Khi	khai	báo	phương	thức	có	kèm	tham	số	 `self` 	dùng
để	truy	cập	ngược	lại	object	đang	gọi.	Lúc	gọi	phươngthức	thì	không	cần	truyền	tham	số	này.
* Phương	thức	 `run()` 	của	class	 `dog` 	gọi	là	 `override`
của	phương	thức	 `run()` 	của	class	 `animal` .



## Phân	chia module

Tất	cả	ví	dụ	cho	đến	thời	điểm	này	đều	được	thực	thi	trong
command	line	hoặc	từ	một	file	python	 `.py` .	Tuy	nhiên,	đối
với	các	ứng	dụng	lớn,	có	nhiều	chức	năng	thì	phân	chia	nhỏ
dự	án	thành	các	file	khác	nhau	sẽ	giúp	dễ	bảo	trì	và	tái	sử
dụng	các	thành	phần	đã	thiết	kế.

Chương	này	sẽ	giúp	bạn	thiết	kế	các	tính	năng	theo	mô
hình	các	module	và	khi	cần	thì	sẽ	gọi	file	tương	ứng	và	sử
dụng.

### Các	loại	module	/	thư	viện

Có	3	loại	module	thường	thấy	là:

1. Viết	bằng	Python:	có	phần	mở	rộng	là	 `.py`
2. Các	thư	viện	liên	kết	động:	có	phần	mở	rộng	là	 `.dll` ,
`.pyd` ,	 `.so` ,	 `.sl` ,...
3. C-Module	liên	kết	với	trình	phiên	dịch.


### Đường	dẫn	tìm	để	load	module

Để	tải	một	module	vào	script	của	bạn,	sử	dụng	cú	pháp
đơn	giản:
```text
import	modulename
```

khi	gặp	câu	lệnh	trên	thì	trình	biên	dịch	sẽ	tiến	hành	tìm
kiếm	file	module	tương	ứng	theo	thứ	tự	thư	mục	sau:

1. Thư	mục	hiện	hành	mà	script	đang	gọi
2. Các	thư	mục	trong	PYTHONPATH	(nếu	có	set)
3. Các	thư	mục	cài	đặt	chuẩn	trên	Linux/Unix..

Có	thể	biết	được	đường	dẫn	mà	một	module	đã	được	load
bằng	đoạn	code	dưới	đây:

```text
import	math
math.__file__
(Ví	dụ	trả	về	'/usr/lib/python2.5/lib-dynload/math.
so')
				
import	random
random.__file__
(Ví	dụ	trả	về	'/usr/lib/python2.5/random.pyc')
```

### Lấy	danh	sách	thuộc	tính	và	phương thức	của	một	module

Để	lấy	được	danh	sách	các	thuộc	tính	và	phương	thức	mà
module	hỗ	trợ,	sử	dụng	hàm	 `dir(modulename)` .	Ví	dụ:

```text
dir(math)
['__doc__',	'__file__',	'__name__',	'__package__',	
'acos',	'acosh',	'asin',	'asinh',	'atan',	'atan2',	
'atanh',	'ceil',	'copysign',	'cos',	'cosh',	'degree
s',	'e',	'erf',	'erfc',	'exp',	'expm1',	'fabs',	'fa
ctorial',	'floor',	'fmod',	'frexp',	'fsum',	'gamma'
,	'hypot',	'isinf',	'isnan',	'ldexp',	'lgamma',	'lo
g',	'log10',	'log1p',	'modf',	'pi',	'pow',	'radians
',	'sin',	'sinh',	'sqrt',	'tan',	'tanh',	'trunc']
```


Có	thể	gọi	hàm	 `dir()` 	không	truyền	tham	số	để	lấy	các
thuộc	tính	và	phương	thức	của	scope	hiện	tại	đang	thực
thi.

### Cách	khai	báo	và	sử	dụng	module

Giả	sử	bạn	tạo	một	file	python	 `mymath.py` 	có	nội	dung	như
sau:

```text
def	cong(a,	b):
				return	a	+	b
				
def	tru(a,	b):
				return	a	-	b
				
def	nhan(a,	b):
				return	a	*	b
```

Sau	đó,	tạo	một	file	có	tên	 `myexample.py` ,	trong	cùng	thư
mục	với	file	 `mymath.py` 	vừa	tạo	ở	trên,	có	nội	dung	như
sau:


```text
import	mymath
				
num1	=	1
num2	=	2
				
print	'Tong	hai	so	la:	',	mymath.cong(num1,	num2)
```

Vào	command	line,	thực	hiện	gọi	file	myexample	như	sau:

```text
$	python	myexample.py
```

Sau	khi	thực	hiện	sẽ	hiển	thị	lên	màn	hình	là

```text
Tong	hai	so	la:	3
```


### Package	module

Có	thể	gom	nhiều	module	 `.py` 	vào	một	thư	mục	và	tên	thư
mục	là	tên	của	package	và	tạo	một	file	` __init__.py` 	trong
thư	mục	này.

Như	vậy,	cấu	trúc	thư	của	một	package	sẽ	như	sau:

```text
|--	mypack
|			|--	__init__.py
|			|--	mymodule1.py
|			|--	mymodule2.py
|
```

Có	thể	sử	dụng	 `mymodule1` 	theo	cú	pháp	import	sau:

```text
import	mypack.mymodule1
```

hoặc

```text
import	mypack.mymodule1	as	mymodule1
```
hoặc

```text
import	mypack.mymodule1	as	mod
```

Khi	sử	dụng	một	module	thuộc	một	package	thì	các	lệnh
trong	file	 `__init__.py` 	sẽ	được	thực	hiện	trước.	Thông
thường	thì	file	 `__init__.py` 	sẽ	rỗng.

Có	thể	tạo	các	subpackage	bên	trong	một	package	theo
đúng	cấu	trúc	thư	mục,	có	file	 `__init__`.py .	Ví	dụ:

```text
import	mypack.mysubpack.mysubsubpack.module
```




Dưới đây mình  đã giới thiệu với các bạn về Class cũng như là việc phân chia Module trong Python. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.


### Tham Khảo

https://docs.python.org/3/tutorial/modules.html#compiled-python-files


https://docs.python.org/3/tutorial/classes.html