Xin chào các bạn. Hôm nay mình sẽ giới thiệu với các bạn về việc Xử lý file JSOn và file XML trong Python

## Xử lý file JSON

JSON	là	một	trong	những	định	dạng	file	trao	đổi	dữ	liệu
thông	dụng	nhất	hiện	nay.	Với	kiến	trúc	đơn	giản	và	tương
đồng	với	cấu	trúc	của	Python	nên	việc	thao	tác	JSON	trên
Python	rất	dễ	hiểu.

### Load	file	từ	Internet

Thông	thường	dữ	liệu	JSON	được	lấy	từ	nguồn	khác	(như
file,	internet..)	nên	chương	này	sẽ	bắt	đầu	bằng	cách
hướng	dẫn	download	một	file	JSON	từ	Internet	và	sau	đó
mới	parsing	nội	dung	JSON	download.

Sử	dụng	module	 urllib2 	để	download	file	và	module
json 	để	encode/decode	JSON	data.	Ví	dụ:

```text
import	urllib2
import	json
				
response	=	urllib2.urlopen('https://api.github.com/
users/voduytuan/repos')
				
data	=	json.load(response)
				
print	data
```

Ví	dụ	trên	sẽ	truy	vấn	đường	dẫn
https://api.github.com/users/voduytuan/repos	để	lấy	danh
sách	Repository	trên	Github	của	mình	dưới	định	dạng
JSON.

### Parsing	JSON	Data

Nếu	như	bạn	đã	có	JSON	data	dưới	dạng	chuỗi,	muốn
parsing	chuỗi	này	thành	Data	thì	sử	dụng	như	cách	dưới
đây:

```text
import	json
mystring	=	'{"a":1,"b":2,"c":3,"d":4,"e":5}'
data	=	json.loads(mystring)
print	data
(Hiển	thị:	{u'a':	1,	u'c':	3,	u'b':	2,	u'e':	5,	u'd':	4})
```

### Encoding	JSON	Data

Nếu	như	bạn	đã	có	một	biến	và	muốn	encode	thành	JSON
string	thì	có	thể	dùng	theo	cách	sau:

```text
import	json
				
mydata	=	{
				'name':	'John',
				'age':	10
}
jsonstring	=	json.dumps(mydata)
print	jsonstring				
(hiển	thị:	{"age":	10,	"name":	"John"})
```

## Xử lý file XML

Trong	phần	này,	chúng	ta	sẽ	parsing	nội	dung	XML	thành
dữ	liệu	để	xử	lý.	Để	xử	lý	XML,	ta	sẽ	sử	dụng	thư	viện
Beautifulsoup	4.	Đây	là	một	thư	viện	giúp	việc	triển	khai
việc	parsing	html,	xml	được	nhanh	chóng	và	tiện	lợi.


### Cài	đặt	Beautifulsoup

Bạn	có	thể	tham	khảo	hướng	dẫn	cách	cài	đặt	tại	website
http://www.crummy.com/software/BeautifulSoup/bs4/doc/#insbeautiful-soup.


Trên	MacOS,	có	thể	cài	bằng	 pip 	như	sau:

```text
$	sudo	pip	install	beautifulsoup4
```

### Cài	đặt	 `lxml` 	parser

Để	parsing	 xml 	từ	beautifulsoup,	tao	sử	dụng	bộ	parser
xml	có	tên	là	 lxml .	Xem	hướng	dẫn	cài	đặt	tại http://www.crummy.com/software/BeautifulSoup/bs4/doc/#insa-parser

Trên	MacOS,	có	thể	cài	bằng	 pip 	như	sau:

```text
sudo	pip	install	lxml
```

### Ví	dụ	về	parsing	XML

Cho	ví	dụ	sau:

```text
from	bs4	import	BeautifulSoup	as	Soup
note	=	'''
<?xml	version="1.0"	encoding="UTF-8"?>
<breakfast_menu>
				<food>
								<name>Belgian	Waffles</name>
								<price>$5.95</price>
								<description>Two	of	our	famous	Belgian	Waff les	with	plenty	of	real	maple syrup	 
                                </description>

								<calories>650</calories>
				</food>
				<food>
								<name>Strawberry	Belgian	Waffles</name>
								<price>$7.95</price>
								<description>Light	Belgian	waffles	covered	with	strawberries	and	whipped	cream</description>
								<calories>900</calories>
				</food>
</breakfast_menu>
'''
				
soup	=	Soup(note,	'xml')
				
foods	=	soup.findAll('food')
				
for	x	in	foods:
				print	x.find('name').string,	':	',	x.price.string
```

Khi	chạy	thì	sẽ	hiển	thị	ra	màn	hình	như	sau:


```text
Belgian	Waffles	:		$5.95
Strawberry	Belgian	Waffles	:		$7.95		
```

Đối	tượng	thuộc	class	 `Soup` 	(BeautifulSoup)	sẽ	giúp	truy
xuất	các	thành	phần	của	file	xml	nhanh	chóng	và	tiện	lợi.

Trong	ví	dụ	có	một	số	cách	truy	xuất	đến	các	phần	tử	như:
* `findAll()` :	trả	về	mảng	các	thẻ	có	tên	cần	tìm
* `find()` :	trả	về	phần	tử	đầu	tiên	có	tên	cần	tìm
* Truy	xuất	trực	tiếp	thông	qua	tên	thẻ	như `x.price.string`



### Parsing	HTML

Tương	tự	như	 `xml` ,	BeautifulSoup	có	thể	parsing	nội	dung
HTML	thông	qua	hàm	khởi	tạo	và	chọn	 `html` 	ở	tham	số
thứ	2.

```text
soup	=	Soup(websitehtml,	'html')
```

Dưới đây mình  đã giới thiệu với các bạn về  Xử lý file JSOn và file XML trong Python và một số ví dụ cơ bản. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

--- 
### Tham Khảo

http://www.crummy.com/software/BeautifulSoup/bs4/doc/#insa-parser


http://www.crummy.com/software/BeautifulSoup/bs4/doc/#insbeautiful-soup.

https://linuxconfig.org/how-to-parse-data-from-json-into-python
https://docs.python.org/2/library/xml.etree.elementtree.html