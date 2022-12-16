<h2>Mở đầu</h2>
Bài viết không liên quan tới machine learning. Chúng ta sẽ gọi api của fpt.

Ở bài viết này mình sẽ hướng dẫn cho các bạn tạo app text to speech. Có luôn source code để các bạn tải về dùng miễn phí hoàn toàn. Các bạn có thể dùng để nghe truyện, đọc báo hoặc tạo giọng nói cho nhà thông minh, chatbot của bạn chẳng hạn rất tiện phải không.

Xin lỗi mình không nhúng được file mp3 vào đây. bạn có thể vào link nhé
Đây là một đoạn của google translate. 

[Google translate](http://35.196.17.90/blog/wp-content/uploads/2018/12/translate_tts.mp3)

Đây là api fpt

[Fpt speech](http://35.196.17.90/blog/wp-content/uploads/2018/12/full.mp3)

&nbsp;

Đây là phần giới thiệu của fpt

Tổng hợp tiếng nói (Speech synthesis) là bài toán cơ bản trong bài toán lớn về giao tiếp giữa người và máy (Human-Machine Interface).

Với tham vọng riêng của mình, Ban công nghệ FPT (FTI) đã nỗ lực nghiên cứu suốt gần 5 năm qua để cho ra mắt sản phẩm FPT Speech Synthesis. Sản phẩm là sự kết hợp của:
<ul>
 	<li>Ngôn ngữ học (Linguistics): âm vị học (Phonology), hình thái học (Morphology), ngữ dụng học (Pragmatics)</li>
 	<li>Vật lý học: âm học</li>
 	<li>Công nghệ: Xử lý ngôn ngữ tự nhiên (Natural Language Processing) , học máy (Machine Learning), xử lý tín hiệu số (Digital Signal Processing)</li>
</ul>
Được đánh giá là hệ thống tổng hợp tiếng nói tiếng Việt có chất lượng tốt nhất thị trường hiện nay, hệ thống tổng hợp tiếng Việt mới của FPT đang được mở trên Open FPT (http://openfpt.vn/). Các nhà phát triển có thể khai thác nguồn tài nguyên này để xây dựng ứng dụng của riêng mình trên các nền tảng khác nhau. Cho đến thời điểm này, đã có nhiều sản phẩm như “Giao thông thông minh” do FPT IS phát triển, hệ thống thông báo thông tin tài chính của VHT, hệ thống sinh ra video tự động từ bái báo điện tử, … đang sử dụng Speech Synthesis API của Open FPT và nhận được rất nhiều phản hồi tích cực từ người dùng.
<h2>Text to speech</h2>
Mình viết bằng python. Đầu tiên ta cần vào <a href="https://dev.openfpt.vn/">https://dev.openfpt.vn/</a> đăng ký tài khoản và tạo key để dùng cho app. Ok có cả phần test luôn. Các bạn có thể thử để xem chất lượng giọng nói.

Tài liệu ở <a href="https://docs.openfpt.vn/#speech-synthesis">đây. </a>Chúng ta bắt đầu code.
<h3>Khởi tạo các tham số</h3>
Keys xin phép được ẩn đi. Mình chẳng tiếc nhưng sợ đông người dùng các bạn làm chậm của nhau. May cho chúng ta có phần comment của thằng bạn mình.

Source code ở phía cuối bài viết, mình cũng lười không làm cái ứng dụng giao diện tử tế. Quan trọng là ý tưởng phải không :D.

Chúng ta dùng nhiều key bởi vì fpt sẽ chặn số lượng request tính trên phút. Mình sẽ thay đổi liên tục các keys để lack vụ này :D.
```python
import sys
import requests
#API Key của bạn
keys = [
        '#############################',
        '#############################',
  	'#############################',
	'#############################'
]

#Xác định các giọng đọc, voice có các giá trị là leminh (giọng nam miền bắc), male (giọng nam miền bắc),
#female (giọng nữ miền bắc), hatieumai (giọng nữ miền nam), ngoclam (giọng nữ Huế)
voice = "leminh"
# Xác định các giọng đọc, voice có các giá trị là:
# leminh (giọng nam miền bắc nghe ấm ), 
# male (giọng nam miền bắc hơi già có tiếng thở),
# female (giọng nữ miền bắc trẻ, giọng trong đọc hơi chậm so với các giọng khác), 
# hatieumai (giọng nữ miền nam nghe đk), 
# ngoclam (giọng nữ Huế  đọc hơi bị ngắt nên cho chậm lại)
speed= "0"
#ngữ điệu 1 on. 0 off
prosody= "0"

#phần dưới này để phục vụ cho việc nhận tham số từ cmd khi sử dụng file start.py 
# vd call file "start.py input" #input là input.txt lưu văn bản cần chuyển thành giọng nói
# hoặc chỉnh sửa short_direct đối với dùng jupyter notebook
# ngoài cách chạy command line có thể sử dụng jupyter notebook chủ yếu cho người phát triển
args = sys.argv
if len(args) &gt;= 1:
    short_direct = args[1]
    direc = '{}/'.format(args[1])
# Thay ten file
short_direct = 'starttq'
direc = f'{short_direct}/'
```

<h3>Backup file mp3 trước đó</h3>
Mục đích tránh ghi đè mất file mp3 ở đợt trước

```python
import os
import datetime

#backup file full.mp3
if short_direct not in os.listdir():
    os.mkdir(short_direct)
if 'full.mp3' in os.listdir('{}'.format(direc)):
    #create folder backup if not exists
    if 'backup' not in os.listdir('{}'.format(direc)):
        os.mkdir('{}backup'.format(direc))
    
    now = str(datetime.datetime.now()).replace(" ", "_").replace(":", "_")
    os.rename("{}full.mp3".format(direc), "{}backup/{}.mp3".format(direc, now))
    print('backup file full mp3 to {}backup/{}.mp3'.format(direc, now))
# Remove all file mp3
for item in os.listdir('{}'.format(direc)):
    if item.endswith(".mp3"):
        os.remove(os.path.join(direc, item))
print('remove all file mp3')
```


Kết quả

<img class="alignnone size-full wp-image-139" src="http://35.196.17.90/blog/wp-content/uploads/2018/12/backup-file.png" alt="" width="651" height="62" />

<h3>Gọi API và tải các file nhạc</h3>
Vì fpt giới hạn số lượng ký tự. Nên ta cần cắt ra thành nhiều đoạn. Cắt thế nào để không vào giữa một chữ (phải là "xin chào" chứ không thể cắt "xin ch" rồi file sau là "ào" được). Cách làm đơn giản là lấy 500 (giới hạn của fpt) lùi lại đến khi gặp dấu cách thôi rồi cắt từ đó. Mình để 480 cho chắc :D. Đối với python thì chúng ta có thư viện textwrap.

```python
from textwrap import wrap

import time
import wget
import random
file = open("{}.txt".format(short_direct), "r", encoding="utf-8") 
content = file.read()

wraptexts = wrap(content, 480)


for i in range(len(wraptexts)):
while True:
try:
text = wraptexts[i]
api_key = random.choice(keys)
print('\n', api_key)
url = "http://api.openfpt.vn/text2speech/v4?api_key={}&amp;voice={}&amp;speed={}&amp;prosody={}".format(api_key, voice, speed, prosody)
response = requests.post(url, data=text.encode('utf-8'), headers={'voice':voice, 'speed':speed, 'prosody':prosody})
response = response.json()
print('\n', response['async'])
file = response['async']
print("downloading file {}/{} ".format(i+1, len(wraptexts)), "{}{:03}.mp3".format(direc, i))
except :
time.sleep(1)
continue
break
while True:
try:
wget.download(file, "{}{:03}.mp3".format(direc, i))
except :
time.sleep(0.1)
print('Co loi. Thu lai', end='')
continue
break

print('\nCOMPLETE')
```

Kết quả:

<img class="alignnone size-full wp-image-140" src="http://35.196.17.90/blog/wp-content/uploads/2018/12/download-files.png" alt="" width="825" height="471" />
<h3>Gộp files</h3>
Sau bước trên ta đã tải được các file đơn bây giờ gộp lại. Trên linux thì mình nhớ có sẵn lệnh split và merge file rồi. Trước mình đã thử chia nhỏ ảnh của mình và merge lại vẫn dùng được. Còn trên windows thì không có mình dùng một cái ffmpeg để merge file audios. Còn tải ở đâu thì mình không nhớ, các bạn có thể xem tài liệu <a href="https://trac.ffmpeg.org/wiki/Concatenate">https://trac.ffmpeg.org/wiki/Concatenate,</a> hoặc tải 3 file exe ở phần sourcecode.

```python
#create list for merge
import subprocess
f = open("{}create_list.bat".format(direc), "w")
f.write("(for %%i in (*.mp3) do @echo file '%%i') &gt; list.txt")
f.close()
s = "{}create_list.bat".format(direc)
os.chdir(short_direct)
print(os.listdir())
print(s)


# os.system("create_list2.bat".format(direc))
subprocess.Popen("create_list.bat")
os.chdir('..')
```
```python

#merge file for create 
#output: full.mp3
p = subprocess.run('ffmpeg -f concat -safe 0 -i {}list.txt -c copy {}full.mp3'.format(direc, direc))
```
Vậy là xong. Bạn muốn thưởng thức thì quay lại phần đầu mở audio lên.