![](https://images.viblo.asia/31bb05e1-7ea5-4383-95d3-a3f1e1ab1611.png)
### 1. Đọc đề bài
Đây là một bài ctf về khả năng code. Đề bài cho chúng ta 8 file gồm:
- 3 file log phím từ cục gạch nokia 7110 (sms1/2/3.csv)
- 3 file sms1/2/3.txt chứa nội dung gốc của sms1/2/3.csv
- 1 file log **sms4.csv** chứa nội dung **flag**
- 1 file định nghĩa các phím **keys.h**

Nhìn qua file sms4 356 dòng log chắc chắn mình không phải chúa tể thời gian để ngồi làm tay được rồi, đành phải code thôi :)

Mở file keys.h lên:
```C
#ifndef N7110
#define N7110

enum {
    N7110_KEYPAD_ZERO = 0,
    N7110_KEYPAD_ONE = 1,
    N7110_KEYPAD_TWO = 2,
    N7110_KEYPAD_THREE = 3,
    N7110_KEYPAD_FOUR = 4,
    N7110_KEYPAD_FIVE = 5,
    N7110_KEYPAD_SIX = 6,
    N7110_KEYPAD_SEVEN = 7,
    N7110_KEYPAD_EIGHT = 8,
    N7110_KEYPAD_NINE = 9,
    N7110_KEYPAD_STAR = 10,
    N7110_KEYPAD_HASH = 11,
    N7110_KEYPAD_MENU_LEFT = 100,
    N7110_KEYPAD_MENU_RIGHT = 101,
    N7110_KEYPAD_MENU_UP = 102,
    N7110_KEYPAD_MENU_DOWN = 103,
    N7110_KEYPAD_CALL_ACCEPT = 104,
    N7110_KEYPAD_CALL_REJECT = 105
} N7110_KEYPAD_KEYS;

enum {
    N7110_IME_T9 = 0,
    N7110_IME_T9_CAPS = 1,
    N7110_IME_ABC = 2,
    N7110_IME_ABC_CAPS = 3
} N7110_IME_METHODS;

#define N7110_KEYPAD_ZERO_ABC_CHARS  " 0"
#define N7110_KEYPAD_ONE_ABC_CHARS   ".,'?!\"1-()@/:"
#define N7110_KEYPAD_TWO_ABC_CHARS   "abc2"
#define N7110_KEYPAD_THREE_ABC_CHARS "def3"
#define N7110_KEYPAD_FOUR_ABC_CHARS  "ghi4"
#define N7110_KEYPAD_FIVE_ABC_CHARS  "jkl5"
#define N7110_KEYPAD_SIX_ABC_CHARS   "mno6"
#define N7110_KEYPAD_SEVEN_ABC_CHARS "pqrs7"
#define N7110_KEYPAD_EIGHT_ABC_CHARS "tuv8"
#define N7110_KEYPAD_NINE_ABC_CHARS  "wxyz9"
#define N7110_KEYPAD_STAR_ABC_CHARS  "@/:_;+&%*[]{}"
#define N7110_KEYPAD_HASH_CHARS N7110_IME_METHODS

#endif // N7110
```

Về cơ bản thì mấy cái phím này tương tự hồi bé nghịch nokia nhắn tin trong giờ học thôi :)
Nhưng mà ngoài gõ thẳng tuột thì khi đọc file log chúng ta dễ thấy còn có các hoạt động khác như di chuyển con trỏ, xóa...

Để đúng với ý tưởng của người ra đề thì mình sẽ code 1 tool để gõ lại dựa theo kết quả từ file log. Đến đây thì có 2 cách code:
- Cách 1: Code đọc file log và in ra string, khi gặp những phím điều hướng thì chỉ in ra tên phím và tự làm tay đoạn đó.
- Cách 2: Code tool điều khiển bàn phím cho máy tự gõ.

Vì mình lười nên mình chọn cách 2 :D<br>
Mình code tool gõ phím bằng python, sử dụng pynput

### 2. Phân tích
#### 2.1 Điện thoại Nokia 7110
Mình không viết nhầm tiêu đề đâu :v Để code ra được thì phải xem con 7110 này như nào nữa, đây là ảnh của nó:
![](https://images.viblo.asia/51d1a263-bec8-41fc-8474-bd0da04a2ff6.jpg)
Về các phím số, chữ thì nó vẫn bình thường, nhưng mà nó không có phím điều hướng. Thay vào đó 7110 có thêm 1 thanh cuộn như trên mấy con chuột máy tính.

#### 2.2 Thư viện pynput
[pynput](https://pypi.org/project/pynput/) là thư viện hỗ trợ việc điều kiển các thiết vị nhập như bàn phím và chuột. Ở bài này chúng ta chỉ cần quan tâm đến việc điều khiển bàn phím như nào thôi.

Để điều khiển bàn phím cần thêm danh sách các phím và các phương thức điều khiển. Các bạn có thể đọc bài [Điều khiển bàn phím với pynput](https://viblo.asia/p/dieu-khien-ban-phim-voi-pynput-Ljy5VzO35ra) của mình tại đây.

Có 1 điều nhỏ cần phải chú ý là: việc điều khiển bàn phím sẽ bắt đầu ngay khi chạy code, các phím sẽ được gõ ngay tại ví trí con trỏ văn bản, bất kể nó đang đặt ở đâu. Nên hãy cho chương trình sleep khoảng vài giây trước khi bắt đầu chạy để có thời gian click chuột vào file text trống nhé.

#### 2.3 File log phím
Mỗi file log gồm 2 cột:
- Cột đầu tiên là thời gian nhấn phím
- Cột thứ 2 là phím được nhấn

Đừng bỏ qua cột 1 nhé. Vì sao ?

Để ý nội dung file sms1.txt như sau: "rudolf where are you brrr".<br>
Thấy đoạn "rrr" chứ, trong file log thì đoạn đấy là 9 lần gõ phím 7 đấy :3 

Theo mình phân tích thì nếu thời gian giữa 2 lần nhấn phím > 1000 thì tức là đã nghỉ để gõ tiếp ký tự mới. Ngược lại là vẫn đang chọn ký tự.

### 3. Code
```python
from pynput.keyboard import Key, Controller
import csv
import time

k = [' 0',
	 '.,\'?!\"1-()@/:',
	 'abc2',
	 'def3',
	 'ghi4',
	 'jkl5',
	 'mno6',
	 'pqrs7',
	 'tuv8',
	 'wxyz9',
	 '@/:_;+&%*[]{}']

keyboard = Controller()
with open('sms4.csv', 'r') as f:
	reader = csv.reader(f)
	press_list = list(reader)

def pressNum(kcode, times):
	keyboard.press(k[kcode][(times - 1) % len(k[kcode]) ])
	keyboard.release(k[kcode][(times - 1) % len(k[kcode]) ])
	time.sleep(0.1)

def pressMov(kcode, times):
	for i in range(times):
		if (kcode == 101):
			keyboard.press(Key.backspace)
			keyboard.release(Key.backspace)
		elif (kcode == 102):
			keyboard.press(Key.left)
			keyboard.release(Key.left)
		elif (kcode == 103):
			keyboard.press(Key.right)
			keyboard.release(Key.right)
		time.sleep(0.1)

logsize = len(press_list)
i = 0
while (i < logsize - 1):
	times = 1
	kcode = press_list[i][1]
	while (kcode == press_list[i + 1][1]):
		if (int(press_list[i + 1][0]) - int(press_list[i][0]) > 1000): break
		times += 1
		i += 1
	i += 1
	kcode = int(kcode)
	print(i, ' ', kcode, ' ', times)
	if (kcode == 11): print('T9 <-> ABC ???')
	elif (kcode >= 100): pressMov(kcode, times)
	else: pressNum(kcode, times)

''' OUTPUT:
alright pal heres ye flag good luck entering it with those hooves lol its aotw{l3ts_dr1nk_s0m3_eggn0g_y0u_cr4zy_d33r}0m.. .l ,p
'''
```
Ở phần phân tích mình cũng đã nói qua về việc Nokia 7110 chỉ có thanh cuộn thay cho 4 phím điều hướng rồi. Tác dụng của thanh đó thực ra là thay cho 2 phím điều hướng trái - phải. Cuộn lên thì con trỏ sẽ di chuyển sang trái, cuộn xuống thì con trỏ sẽ di chuyển sang phải.

Ngoài ra gõ sai thì còn phải xóa nữa, lúc này thì phím MENU_RIGHT (key code = 101) sẽ tương ứng với phím Backspace trên bàn phím máy tính.

| Keycode|7110| Keyboard |
| :--------: | :--------: | :--------: |
| 101    | MENU_RIGHT | Backspace |
| 102    | MENU_UP | Left |
| 103    | MENU_DOWN | Right |
 
Mình vẫn không biết keycode = 11 (Chuyển T9 <-> ABC) để làm gì, mà cũng chẳng ảnh hưởng đến flag
*****
Viết in hoa aotw được flag: **AOTW{l3ts_dr1nk_s0m3_eggn0g_y0u_cr4zy_d33r}**