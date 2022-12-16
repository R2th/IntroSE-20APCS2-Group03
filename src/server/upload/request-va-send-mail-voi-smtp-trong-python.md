Xin chào các bạn. Hôm nay mình sẽ giới thiệu với các bạn về việc Request trong Python và cách send mail với SMTP trong Python



## Request
Hỗ	trợ	sẵn	các	phương	thức	tương	ứng	cho	Http	request
như	GET,	POST,	PUT,	DELETE...
```text
import	requests
				
r	=	requests.get('https://api.github.com/events')
r	=	requests.post("http://httpbin.org/post")
r	=	requests.put("http://httpbin.org/put")
r	=	requests.delete("http://httpbin.org/delete")
r	=	requests.head("http://httpbin.org/get")
r	=	requests.options("http://httpbin.org/get")
```

### GET	Query	string
Đối	với	các	request	 `GET` ,	có	thể	truyền	tham	số	đường	dẫn
thông	qua	tham	số	 `params` 	khi	gọi	phương	thức	 `get()` .	Ví
dụ:

```text
import	requests
				
payload	=	{'key1':	'value1',	'key2':	'value2'}
r	=	requests.post("http://httpbin.org/post",	data	=
	payload)
```

### Upload	file
Có	thể	gởi	thêm	tham	số	 `files` 	để	upload	file	kèm	theo
request.	Ví	dụ:

```text
import	requests
				
url	=	'http://httpbin.org/post'
files	=	{'file':	open('report.xls',	'rb')}
r	=	requests.post(url,	files=files)
```

### Response
Sau	khi	gọi	các	phương	thức	tương	ứng	để	request,	bạn	sẽ
có	đối	tượng	thuộc	class	 `Response` .	Đối	tượng	này	có	một
số	thông	tin	như	sau:

* `status_code` :	HTTP	Status	server	trả	về
* `headers` :	Các	thông	tin	header	mà	server	trả	về	dưới
dạng	Dictionary.
* `cookies` :	Nếu	server	có	trả	về	cookie	thì	có	thể	sử
dụng	thuộc	tính	này	để	lấy	các	cookie.
* `text` :	Trả	về	nội	dung	response

## Gửi	email	với	SMTP

SMTP	là	giao	thức	gởi	mail	thông	dụng	hiện	nay.	Python	hỗ
trợ	mặc	định	thư	viện	 `smtplib` 	dùng	để	kết	nối	đến	một
SMTP	Server	và	gởi	email.	Tuy	nhiên,	việc	sử	dụng	thư
viện	này	sẽ	gây	khó	khăn	cho	việc	định	dạng	và	sử	dụng
nên	chúng	ta	sẽ	sử	dụng	thư	viện	 `sender` ,	là	một	thư	viện
giúp	định	dạng	và	gởi	email	đơn	giản	hơn.

### Cài	đặt	 `sender`

Cài	đặt	từ	 `pip` 	như	sau:

```text
$	sudo	pip	install	sender
```

### Gửi	email	đơn	giản
Để	gởi	1	email	với	 `sender` ,	bạn	cần	có	tài	khoản	và	một	số
thông	tin	của	SMTP	Server	trước	khi	gởi.	Ví	dụ	đoạn	code
để	gởi	1	email	từ	SMTP	Server	của	Amazon.


```text
from	sender	import	Mail,	Message
				
mail	=	Mail(
				"smtp.gmail.com",	
				port	=	465,	
				username	=	"example@gmail.com",	
				password	=	"yourpassword",
				use_tls	=	False,	
				use_ssl	=	True,	
				debug_level	=	False
)
				
msg	=	Message("msg	subject")
msg.fromaddr	=	("Vo	Duy	Tuan",	"example@gmail.com")
msg.to	=	"destuser@gmail.com"
msg.body	=	"this	is	a	msg	plain	text	body"
msg.html	=	"<b>this	is	a	msg	text	body</b>"
msg.reply_to	=	"example@gmail.com"
msg.charset	=	"utf-8"
msg.extra_headers	=	{}
msg.mail_options	=	[]
msg.rcpt_options	=	[]
				
#	Send	message
mail.send(msg)
```

### Gửi	email	có	đính	kèm	file

Bạn	cần	sử	dụng	thêm	class	Attachment	để	tạo
attachment.
```text
from	sender	import	Mail,	Message,	Attachment
mail	=	Main(...)
msg	=	Message(..)
...
				
#	Open	attached	file	and	create	Attachment	object
with	open("photo01.jpg")	as	f:
				file01	=	Attachment("photo01.jpg",	"image/jpeg"
,	f.read())
				
msg.attach(file01)
				
#	Send	message
mail.send(msg)
```

Dưới đây mình  đã giới thiệu với các bạn về Request trong Python và các bước cơ bản để gửi email	với	SMTP trong Python. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

##Tham Khảo

http://docs.python-requests.org

https://www.tutorialspoint.com/python/python_sending_email.htm


http://sender.readthedocs.org/