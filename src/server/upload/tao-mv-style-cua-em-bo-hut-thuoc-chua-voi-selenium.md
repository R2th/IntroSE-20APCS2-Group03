## Hoàn cảnh
Hôm trước tình cờ có xem được MV **[Em bỏ hút thuốc](https://www.youtube.com/watch?v=WAxxfzdcNdA)** chưa của **Bích Phương** (link youtube: https://www.youtube.com/watch?v=WAxxfzdcNdA)

Thấy: ô, hay vậy, làm sao mà chat được như vậy nhỉ, sao mà chat kịp ấy. Nhìn kỹ mới  thấy màn hình điện thoại không có bàn phím. Nhìn kỹ: à, thì ra đây là công nghệ edit video, trông đơn giản nhưng khá hay.

Thế là nảy ra ý tưởng, có thể làm chat tự động theo nhạc được như vậy không.

ĐƯỢC, thế là bắt tay vào làm luôn sau mấy tuần.

Kết quả mong muốn là: thực hiện MV chat tự động tương tự với bài **Bánh Mì Không** (vì có 2 người hát) trên nền tảng **Messenger** (trong **Em bỏ hút thuốc chưa** thì là **Instagram**)
## Cách thực hiện

Tìm hiểu, xác định các việc cần làm: có 2 vệc chính đó là làm sao để chat theo thời gian của đoạn nhạc được, làm sao để chat được trên nền tảng mạng xã hội. Thực hiện từng việc một:

### Đọc câu chat theo thời gian (Karaoke)

Mày mò và biết rằng, trên Zingmp3 có chức năng Karaoke, các text hiển thị khớp với nhạc luôn, khớp theo từ luôn, và đây là text chứ không phải video.

![](https://images.viblo.asia/18885b12-63cf-46c6-8e59-7b9f1cde6616.png)

Inspect thì lấy được API: 
(https://zingmp3.vn/api/song/get-lyric?id=ZWAFE897&ctime=1592657865&sig=a79a3de95632ac37d116c01755f216e965784f2cf2ce13dac1ced62a3f08430438691484848bf685903c363a367eec12d1379c13f6d25288488b59b2fac1b091&api_key=38e8643fb0dc04e8d65b99994d3dafff)

```
{
  "startTime": 33380,
  "endTime": 35469,
  "words": [
    {
      "startTime": 33380,
      "endTime": 33799,
      "data": "Khi"
    },
    {
      "startTime": 33799,
      "endTime": 34049,
      "data": "mà"
    },
    ...
  ]
}
```

Đúng cái mình cần rồi, có thời gian bắt đầu, thời gian kết thúc của 1 câu hát, trong câu hát thì chia thành từng từ.

Lưu lại thành file và viết code cho phần đọc file này. Đoạn code dưới sẽ đọc file này, in ra **Terminal** theo thời gian của câu hát (chủ yếu lấy phần logic xử lý thời gian của câu hát để ghép ở phần sau)

```
#!usr/bin/python3
# created by namph

import json
import time
import os

with open('banhmikhong.json', 'r') as f:
	song = json.loads(f.read())

my_string = ''
current_time = 0
# cần thêm thời gian delay vì xử lý mất một vài mili giây (ms)
delay_time = 4
end_time_word = 0

for line in song['data']:
	words = line['words']

	for w in words:
		start_time_word = w['startTime']

		if end_time_word != 0:
            # vì có sự chênh lệch của thời gian kết thúc của từ trước và thời gian bắt đầu của từ sau, nên cần sleep 1 khoảng thời gian
			sleep_word = start_time_word - end_time_word
			time.sleep(sleep_word/1000)

		end_time_word = w['endTime']

		word = w['data']
        # tách và in theo từng ký tự để hiển thị mượt hơn, không thì chỉ hiển thị theo từng từ
        # ở phần gửi qua Messenger sẽ gửi theo từng từ vì thời gian xử lý khá lâu
		split_word = [char for char in word]

		time_sleep = end_time_word - start_time_word
        # cần sleep ít hơn, 1 lượng bằng thời gian delay (nhân với số lần in ra màn hình)
		time_sleep -= delay_time * len(split_word)
		time_sleep = time_sleep/1000

		if time_sleep < 0:
			time_sleep = 0
		
		for c in split_word:
			os.system('clear')
			my_string += c
			print(my_string)
			time.sleep(time_sleep/len(split_word))

		my_string += " "
	my_string += "\n"
```


### Đăng nhập Facebook với Selenium

Sử dụng **Selenium** (ở đây mình dùng **python 3**) để đăng nhập và thực hiện chat tự động. Cách cài đặt, sử dụng selenium mình không giới thiệu ở đây, các bạn có thể tham khảo tại link https://selenium-python.readthedocs.io/

Sử dụng Account facebook chính, hoặc có thể tạo account test tại link:
https://www.facebook.com/whitehat/accounts/

```
from selenium.webdriver import Chrome, ChromeOptions
from selenium.webdriver.common.keys import Keys
import time

email = 'youremail@gmail.com'
password = 'yourpassword'

browser = Chrome()
url = 'https://www.facebook.com/'
browser.get(url)

# nhập username, password
email_input = browser.find_element_by_xpath('//input[@type="email"]')
email_input.send_keys(email)
pass_input = browser.find_element_by_xpath('//input[@type="password"]')
pass_input.send_keys(password)
pass_input.send_keys(Keys.RETURN)
url_mes = 'https://messenger.com/'
browser.get(url_mes)
time.sleep(5)

# click vào nút cho phép đăng nhập với account facebook hiện tại
submit_input = browser.find_element_by_xpath('//button[@type="submit"]')
submit_input.click()

url_mes_account_1 = 'https://www.messenger.com/t/100037068474173'
browser.get(url_mes_account_1)

# chat tin nhắn
text = 'hi'
text_input = browser.find_element_by_xpath('//div[@role="combobox"]')
text_input.send_keys(text)
text_input.send_keys(Keys.RETURN)

```

### Kết hợp chat, xử lý thời gian

Xử lý 2 phần chính đã xong, giờ ghép 2 phần lại nữa là xong :)

```
from selenium.webdriver import Chrome, ChromeOptions
from selenium.webdriver.common.keys import Keys
import time
import json
import os

email = 'email1'
password = 'passowrd1'

email2 = 'email2'
password2 = 'password2'

browser = Chrome()
browser2 = Chrome()
url = 'https://www.facebook.com/'
browser.get(url)
browser2.get(url)
email_input = browser.find_element_by_xpath('//input[@type="email"]')
email_input.send_keys(email)
pass_input = browser.find_element_by_xpath('//input[@type="password"]')
pass_input.send_keys(password)

email_input2 = browser2.find_element_by_xpath('//input[@type="email"]')
email_input2.send_keys(email2)
pass_input2 = browser2.find_element_by_xpath('//input[@type="password"]')
pass_input2.send_keys(password2)

pass_input.send_keys(Keys.RETURN)
pass_input2.send_keys(Keys.RETURN)

time.sleep(5)
url_mes = 'https://www.messenger.com'
url_mes_account_1 = 'https://www.messenger.com/t/100037068474173'
url_mes_account_2 = 'https://www.messenger.com/t/100052278181234'
browser.get(url_mes)
browser2.get(url_mes)

while True:
	try:
		submit_input = browser.find_element_by_xpath('//button[@type="submit"]')
		submit_input.click()
		break
	except Exception as e:
		print('loi roi')

while True:
	try:
		submit_input2 = browser2.find_element_by_xpath('//button[@type="submit"]')
		submit_input2.click()
		break
	except Exception as e:
		print('loi roi')

browser.get(url_mes_account_2)
browser2.get(url_mes_account_1)

text_input = browser.find_element_by_xpath('//div[@role="combobox"]')
text_input2 = browser2.find_element_by_xpath('//div[@role="combobox"]')

with open('banhmikhong.json', 'r', encoding="utf-8") as f:
	song = json.loads(f.read())

current_time = 0
end_time_word = 0

# cần lưu lại thời gian xử lý bị chênh nếu thời gian xử lý send_keys nhiều hơn thời gian nhạc của từ đó
# và sẽ bù vào từ tiếp theo (nếu từ tiếp theo có thời gian nghỉ nhiều)
time_not_enough = 0

count = 0
print('init success')
# sau khi login các kiểu xong, cần chat start và nhấn Enter (thực ra chat gì cũng được) và đồng thời nhấn nút play nhạc đúng đoạn bắt đầu hát (chờ nhạc, bắt đầu hát thì nhấn enter)
check_done = input("chat 'start' to start\n")

for line in song['data']:
	if 'change' in line:
		count += 1
	words = line['words']

	if count % 2 == 0:
		current_input = text_input
	else:
		current_input = text_input2

	start_time_line = time.time()
	for w in words:
		# logic giống phần trước, chỉ khác thay vì thời gian delay cố định, thì cần phải tính lại thời gian xử lý và bù trừ lại
		# thay vì in ra terminal thì cần sử dụng Selenium để send_keys vào input chat của trình duyệt
		start_time_word = w['startTime']

		if end_time_word != 0:
			sleep_word = (start_time_word - end_time_word) / 1000 - time_not_enough
			if sleep_word < 0:
				time_not_enough = -sleep_word
			else:
				time_not_enough = 0
				time.sleep(sleep_word)

		end_time_word = w['endTime']

		word = w['data']
		start_time = time.time()

		time_sleep = end_time_word - start_time_word
		time_sleep = time_sleep/1000

		if time_sleep < 0:
			time_sleep = 0

		current_input.send_keys(word + " ")
		end_time = time.time()
		total_time = end_time - start_time

		diff_time = time_sleep - total_time - time_not_enough
		if diff_time < 0:
			time_not_enough = -diff_time
		else:
			time_not_enough = 0
			time.sleep(diff_time)

	end_time_line = time.time()
	total_time_line = end_time_line - start_time_line

	# bù thời gian nhấn phím Enter
	start_time = time.time()
	current_input.send_keys(Keys.RETURN)
	end_time = time.time()
	time_not_enough += (end_time - start_time)
```

Giải thích qua code: sẽ tạo 2 browser tương ứng với 2 account. Cần xử lý thời gian bù trừ: thời gian chạy code (*sendkeys*) và thời gian ngắt nghỉ của câu hát (như comment trong code)
À, để phân biệt 2 người chat, cần thao tác thủ công, thêm trường "change": 1 nếu câu hát chuyển ca sĩ

```
{
	"change": 1,
  "startTime": 54130,
  "endTime": 56979,
  "words": [
    {
      "startTime": 54130,
      "endTime": 54469,
      "data": "Em"
    },
    {
      "startTime": 54479,
      "endTime": 54809,
      "data": "thì"
    },
    ...
  ]
}
```

## Kết luận
Vậy là có MV chat tự động theo phong cách Em bỏ hút thuốc chưa, thực ra không đẹp như edit video đâu :)

Kết quả đây: https://youtu.be/Pcu8O46cf8M (quay màn hình bằng extension của chrome nên âm hơi rè :) ) --> Bị Youtube xóa vì bản quyền âm nhạc rồi
Ae tham gia bình luận trên facebook cho xôm :), link bài viết facebook: [link](https://www.facebook.com/huunam.19/videos/1773246946148059/)

Link github:
* Xử lý text song: https://gist.github.com/south1907/dae4d547d46391d0ebc60659d18a3b83
* Xử lý login facebook: https://gist.github.com/south1907/f97b957907fae4fc3d9fae3dc9d71930
* Code hoàn thiện: https://gist.github.com/south1907/7e8e2554d28441f5b1b9e1b2e96c2263

Mình hay thích làm mấy cái như này, xảm xí phải không :)) Ý  tưởng tiếp theo mình định **viết code tự động vẽ**, nghe cũng đã thấy khá xảm xí rồi =))

À, 1 phút dành cho quảng cáo: Mình nhận làm các tool liên quan đến:
* Crawl dữ liệu
* Tool auto marketing: tự động post bài, tự động comment, like, chat,...
* Tool auto cho các thao tác thực hiện lặp đi lặp lại trên website: quản lý thêm xóa sử, đặt hàng,...

Liên hệ qua facebook: [Nam](https://www.facebook.com/huunam.19)