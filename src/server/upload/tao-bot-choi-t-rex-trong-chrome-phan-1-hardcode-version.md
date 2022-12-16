Có thể bạn đã biết, trình duyệt Google Chrome được tích hợp sẵn một game nhỏ để bạn có thể giết thời gian mỗi khi mất mạng. Nếu bạn truy cập một trang web bằng Chrome mà mất mạng, bạn sẽ nhìn thấy hình ảnh một chú khủng long khá dễ thương hiện ra. Cách chơi game rất đơn giản: bạn bấm phím "Space"/"Up" để nhảy tránh chướng ngại vật, là cây xương rồng hoặc những con khủng long bay.

<p align="center">
  <img src="https://Tulip4attoo.github.io/assets/img/chrome-trex/chrome_trex_intro.gif"><br>
  <i>Trò chơi nhỏ của Chrome giúp bạn giết thời gian khi mất mạng (nguồn: https://mathewsachin.github.io)</i>
</p>

Mình sẽ viết 1 series bài về cách tạo ra 1 con bot chơi game này. Hiện tại mình đã giải quyết bài toán với 2 phương pháp:

+ hardcode

+ sử dụng Genetic Algorithm trong 1 neural network để giải quyết bài toán

Nếu có thời gian, mình sẽ tìm cách sử dụng reinforcement learning làm cách thứ 3 giải quyết bài toán này. Để ổn định, chúng ta sẽ chơi trên 1 trang web khác thay vì chơi trên Chrome đã ngắt mạng. Mình chọn trang này: http://www.trex-game.skipser.com/ Trong bài viết này, mình sẽ nói về cách giải quyết bằng phương pháp hardcode.


# Phương pháp hardcode

Ý tưởng của phương pháp này rất đơn giản: chúng ta sẽ liên tục check khoảng phía trước của con khủng long, nếu xuất hiện vật thể lạ thì khủng long sẽ nhảy lên. Về cơ bản thì đây chính là cách chúng ta chơi trò này ban đầu.

## Thiết lập ban đầu

Trước hết chúng ta cần import các package cần thiết. Chúng ta sẽ dùng  `mss` để chụp màn hình, `pyautogui` để output ra ngoài và vài package quen thuộc khác.

```python
import pyautogui
import time
import numpy as np
import cv2

from mss import mss
```

Chúng ta sẽ define ra 1 số constant dùng sau này:

```python
TIME_BETWEEN_FRAMES = 0.01
TIME_BETWEEN_GAMES = 0.5
```

Chúng ta tạo ra các hàm để chơi game, bao gồm: 1 class `Cordinates` để lưu vị trí của các object, và 2 hàm để restart game cũng như press phím Up.

```python
class Cordinates(object):
    # vi tri cua cac object
    replay_pos = (390, 410) # vi tri cua button replay
    # replay_pos = (520, 390)

def restart_game():
    pyautogui.click(Cordinates.replay_pos)

def press_up():
    pyautogui.keyDown("up") # press a key down
    time.sleep(0.02)
    # print("Jump")
    pyautogui.keyUp("up") # release a key
```

## Nhận diện vật thể

Chúng ta tạo ra hàm `get_cactus_box_value` để xem xét trong 1 khu vực phía trước của khủng long (mà ở đây ta gọi là `cactus_box`) có xuất hiện vật cản hay không. Chúng ta sẽ chuyển giá trị khu vực `cactus_box` về dạng gray và lưu giá trị lại, để có thể so sánh với giá trị `BLANK_BOX` của khu vực đó khi không có vật cản.

Các bạn chú ý là các giá trị ở đây sẽ thay đổi tuỳ theo từng thiết lập các máy, nếu bạn muốn chạy ở máy mình thì có thể phải sửa 1 chút nha.

```python
BLANK_BOX = 247000

def get_cactus_box_value():
    cactus_box = {'left': 270, 'top': 420, 
                  'width': 50, 'height': 20}
    # cactus_box = {'left': 370, 'top': 400, 
    #               'width': 50, 'height': 20}
    sct = mss()
    img = np.array(sct.grab(cactus_box))[:,:,:3]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return gray.sum()
```

Tới đây chúng ta đã cơ bản hoàn thành phần code cho 1 lượt chơi. Tuy nhiên, chúng ta nên làm thêm 1 hàm `check_gameover`, để khi có gameover thì chúng ta sẽ phát hiện ra và gọi hàm `restart_game` để chơi lại.

```python
GAMEOVER_RANGE = [620000, 660000]

def check_gameover(gameover_range = GAMEOVER_RANGE):
    result = False
    gameover_box = {'left': 290, 'top': 360, 
                  'width': 200, 'height': 15}
    # gameover_box = {'left': 430, 'top': 345, 
    #               'width': 200, 'height': 15}
    sct = mss()
    img = np.array(sct.grab(gameover_box))[:,:,:3]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    curr_state = gray.sum()
    if curr_state < GAMEOVER_RANGE[1] and curr_state > GAMEOVER_RANGE[0]:
        result = True
    return result
```

Sau khi đã chuẩn bị xong toàn bộ các thành phần phía trên, chúng ta sẽ tạo ra hàm `main` để kết hợp toàn bộ những thành phần ở trên lại.

```python
def main():
    while True:
        gameover_state = check_gameover()
        if gameover_state:
            time.sleep(TIME_BETWEEN_GAMES)
            print("Game over. Restart game")
            restart_game()
        cactus_state = get_cactus_box_value()
        if cactus_state != BLANK_BOX:
            press_up()
        time.sleep(TIME_BETWEEN_FRAMES)
```

# Thiết lập hệ thống

Môi trường của hệ thống là ubuntu 16.04, xài chrome.

+ Bước 1: bật trình duyệt và truy cập: http://www.trex-game.skipser.com/, khởi động game.

+ Bước 2: chia đôi màn hình bằng cách gõ `Ctrl + Super + Left/Right`

+ Bước 3: chạy file chrome_trex_api.py

+ Bước 4: quay clip lại và mang đi khoe :v

Các bạn có thể lấy file `chrome_trex_api.py` ở [đây](https://github.com/Tulip4attoo/chrome_trex/blob/master/chrome_trex_api.py)

# Kết quả

Tada, và đây là kết quả của chúng ta. Khá tốt phải không nào?

<p align="center">
  <img src="https://Tulip4attoo.github.io/assets/img/chrome-trex/chrome_trex_hardcode.gif"><br>
  <i>Chạy file thôi \m/</i>
</p>

Ở những bài viết sau mình sẽ giới thiệu về Genetic Algorithms và cách áp dụng nó để tạo bot học cách chơi game này.