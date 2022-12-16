![](https://images.viblo.asia/7861c585-19f3-4bfb-bea8-861cd84fc9fc.jpg)

Chào các bạn!

Gần đây mình có tìm hiểu về ngôn ngữ Python, khi tiếp cận với 1 ngôn ngữ mới thường mình không có đủ kiên nhẫn để đọc hết docs của nó, vì vậy mình hay tìm ra cái gì đó để nghịch hoặc thực hành, điều này giúp mình hiểu nó rõ và nhớ lâu hơn!

Tất nhiên, mỗi người có cách học khác nhau, sẽ có nhiều bạn thì đọc docs sẽ hiểu kĩ hơn, còn riêng với cá nhân mình thì có đôi chút khác biệt ^_^

Ok, và đây là bài viết của mình, vì vậy mình xin trình bày theo cách của mình! ;)

Trong bài viết này mình có dành ra thời gian áp dụng những kiến thức cơ bản nhất của Python mình vừa tìm hiểu được để tạo ra 1 game Bầu Cua Tôm Cá :v

Trò chơi khá đơn giản, luật chơi thì hẳn đa số mọi người đã biết vì vậy mình xin phép không giới thiệu lại nữa!

Sau đây là phần code mình vừa viết xong:

```python
import random
import os

cubes = [
	'bau','cua','tom','ca','huou','ga'
	]

cubesNew = [
	'bau','cua','tom','ca','huou','ga'
	]

random.shuffle(cubesNew)
dealer = []
player = []

dealer.append(cubesNew[0])
dealer.append(cubesNew[1])
dealer.append(cubesNew[2])

def converChoice(index):
	return cubes[index]

def openBowl():
	listResult = []
	print('tren dia co: [{}]'.format(']['.join(dealer)))
	for item in player:
		for face in dealer:
			if(item==face):
				listResult.append(face)
	if len(listResult)>0 :
		print('Ban da thang duoc: {}'.format('-'.join(listResult)))
	else:
		print('Chuc ban may man lan sau!')


def selectFace():
	print('1.bau')
	print('2.cua')
	print('3.tom')
	print('4.ca')
	print('5.huou')
	print('6.ga')
	print('7.khong dat cuoc')
	choice = input('Ban muon dat cuoc cua nao? :')
	if(int(choice)>=7):
		openBowl()
		return True
	else:
		player.append(converChoice(int(choice)-1))
		return False

while True:
	os.system('cls' if os.name == 'nt' else 'clear')
	if len(player)>0:
		print('Ban da dat cua: [{}]'.format(']['.join(player)))
		answer = input('Ban muon dat cuoc tiep khong?(y/n): ')
		if answer == 'y':
			if selectFace():
				break
		else:
			openBowl()
			break
	else:
		if selectFace():
			break
```


- Như các bạn cũng thấy, ở trên mình tạo ra 2 mảng gồm cubes và cubesNew, 2 mảng sẽ được cấp phát bộ nhớ riêng biệt để lưu trữ giá trị gồm các mặt của 1 khối lập phương có các hình hài khác nhau của trò chơi.

- Tiếp theo mình đảo vị trí các giá trị trong mảng cubesNew để tương ứng với hành động lật các khối khi chúng ta rung bát trong trò chơi.
- Sau đó mình thêm 3 kết quả là 3 mặt vừa có được vào mảng dealer.
- Tiếp đến mình cho người dùng đặt cược mặt mà họ đoán sẽ có trong kết quả dựa theo index của các mặt. Người chơi có thể chọn nhiều mặt tùy ý(tạm thời là không giới hạn)
- Khi người chơi đã chọn xong và muốn mở bát ra để xem kết quả thì sẽ gõ n theo hướng dẫn.
- Kết quả hiện ra sẽ bao gồm việc tính toán xem người chơi đã thắng những ô nào và thắng mấy lần.

Trò chơi hết sức đơn giản nhưng cơ bản đã có thể giúp mình hiểu hơn về cách sử dụng khai báo mảng, khai báo hàm, if...else, print, while...break và for.

Qua đây hi vọng cũng sẽ tạo ra 1 cái nhìn thú vị hơn với Python ở những bạn cũng đang có hứng thú và mới bước vào những bài học Python đầu tiên như mình ^_^