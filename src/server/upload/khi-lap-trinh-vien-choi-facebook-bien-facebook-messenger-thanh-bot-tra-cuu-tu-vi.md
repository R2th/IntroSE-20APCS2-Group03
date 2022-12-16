# Giới thiệu
Ở trong cái xã hội mà nhà nhà, người người, từ trẻ nhỏ tới người già, từ nông thông tới thành thị đều dùng mạng xã hội ` có vẻ lặp từ xã hội - nhưng kệ đi =)) `. Đặc biệt thứ mà nhiều người đa số đều dùng đó chính là facebook. Nên là facebook là gì hay là làm thế nào chơi facebook thì mình sẽ không đề cập ở trong bài viết này, thế nhá! Với mình là một lập trình viên ` à mà có là lập trình viên không ta? chắc chỉ là thằng đi code thôi =(( ` thì hôm nay, tại đây mình sẽ hưóng dẫn các bạn chơi facebook một cách thật ngầu, thật chất.

=> Xàm xàm thế đủ rồi, bắt đầu thôi nào =))
=> Sản phẩm của mình làm ra trong hôm nay chính là: Biến **messenger cá nhân trên facebook của bạn thành một bot đa năng =))**
# Demo
{@embed: https://www.youtube.com/watch?v=mZR45A8rc7s}
# Bắt đầu
Thì với mình là một thằng code Python nên trong bài viết này mình xin được phép sẽ dùng Python để múa rìu qua mắt thợ.
* Chuẩn bị: `Những thứ chuẩn bị ở đây anh/em code python chắc chắn biết cài rồi nên mình chỉ liệt kê mà không hưóng dẫn nữa nhé`
	* Python 3.6
	* Cài đặt thư viện fbchat và requests: 
	```sh
	$ pip install fbchat requests
	```
	* Tạo một `folder project`: Chắc chắn rồi, khi code chúng ta cần vứt code vào 1 folder ở đây mình đặt tên folder là `nguyenmanh_messenger_bot`.
	* Tạo file `main.py`: * Đây chính là file mình sẽ code chương trình chính trong này =)) `nói những thứ thừa thãi v**`
	* Tạo file `tu_vi.py`: Dùng để code mấy thứ liên quan tới API tử vi
	* Tạo file `session.json`: Dùng lưu session facebook
	* Tạo file `nguyen_manh_bot.py`: Dùng để code bot messenger
	![alt text](https://lh3.googleusercontent.com/sSQNDl4XGK4FekGcPFbt8VH4vqcCTtiOuQsFTC2H9VTpYZolfH83W4EFr2Ufp8VPiH7YEDhwmM3l-lvPinOZ566SezrIun__I8513Lv7tT05pIEP4mZo4ZPQCFsOTqA7GCFN-aS2br680I3hopBUZJAeJpl91ZtylsVigx4LiO1dZ2hCHjSwUD1BSQD-CP19bmSmYUNFVQdSlgcdfIEpIPya4n95aLzrbzNg_HpT5h2Jw8nA64ysmFNe8a6sVWFTSOKYCs2c6AyOYiVbeZ-3c-q8s72aTkWsmOZ6rGdz3ONAgPylV7Hs9KSN2xfBkVdTkaoPyPmTfKY_lAJ360jxKyAYJlNYAB07OdQYVw_e_lPkaJhLlNvYSLPJq4iAdbtdYxEDMQEk0i9zbQRgRL11zkvTo-WDANFhhwV1t-XA7z3stNU5DKXGa260gmpgGO9FHsQCwpkEnPJvkuBJpxKvfx49HQa_vczOIz8IMMvMRXIsZAfOxxm4dEIoQzqsURxUEKtbT8K-3nVILqQTftj-jtwylZdv3KMQ_suKiIc8gqKFYHhl_zdArRWglcrJFlNZ5zHLR8LLBBE5wdIZUlkWsuD8Zz1VHZLRAWMnvnWd1RDbXHIywPNMIemIoUgAnSovW2tmOLUITypY-SRanL4jaTKWDTMQBg=w339-h235-no "Folder")
* Danh sách API dùng trong bài viết:
	* Tử vi cung hoàng đạo hằng ngày: `https://api.kma-chatbot.com/cunghoangdao.php?cung=<Tên cung hoàng đạo>`
		* Ví dụ cung hoàng đạo: Song ngư
	* Tử vi 12 con giáp hằng ngày: `https://api.kma-chatbot.com/tuvi.php?tuoi=<con giáp>`
		* Ví dụ con giáp: Sửu

# Triển khai code
* Code `tu_vi.py`:
```python
import requests


class TuVi():
    def __init__(self):
        pass

    def con_giap(self, Cgiap=''):
        url = 'https://api.kma-chatbot.com/tuvi.php?tuoi={}'.format(Cgiap.strip())
        loi_phan = ''  # Lời phán

        try:
            r = requests.get(url)
            data_json = r.json()

            set_attributes = data_json.get('set_attributes')

            if set_attributes:
                loi_phan = '-----{}-----\n- {}\n- {}\n- {}\n- {}\n'.format(
                    set_attributes.get('tvcongiap'),
                    set_attributes.get('congviec'),
                    set_attributes.get('tinhcam'),
                    set_attributes.get('taivan'),
                    set_attributes.get('cantrong')
                )
        except:
            loi_phan = 'Có thể con giáp bạn nhập bị sai :('

        return loi_phan

    def cung_hoang_dao(self, cung_hd=''):
        # Cái này mình cho API rồi các bạn tự viết nha =)) Lười!
        pass

```
* Code `nguyen_manh_bot.py`
```python
# -*- coding: UTF-8 -*-
from fbchat.models import *
from fbchat import log, Client

from tu_vi import TuVi


class NguyenManhBot(Client):
    def onMessage(self, author_id, message_object, thread_id, thread_type, **kwargs):
        self.markAsDelivered(thread_id, message_object.uid)
        self.markAsRead(thread_id)

        log.info("{} from {} in {}".format(message_object, thread_id, thread_type.name))

        if author_id != self.uid:
            if message_object.text:
                if message_object.text == '/Getid' or message_object.text == '/getid':
                    self.send(Message(text=message_object.author), thread_id=thread_id, thread_type=thread_type)

                elif '/tuvi' in message_object.text:
                    tuoi = message_object.text[message_object.text.index('/tuvi') + len('/tuvi'):]
                    tuvi = TuVi()
                    loi_phan = tuvi.con_giap(Cgiap=tuoi)
                    self.send(Message(text=loi_phan), thread_id=thread_id, thread_type=thread_type)
                else:
                    self.send(Message(
                        text='\n \n Tôi là Nguyễn Mạnh. \n- Tôi sẽ rep sau khi đi công việc về \n- Nếu xem tử vi gõ /tuvi <tuổi>; ví dụ: /tuvi sửu. \n- Tin nhắn của bạn: {0}'.format(
                            message_object.text)),
                        thread_id=thread_id,
                        thread_type=thread_type
                    )

```
* Code `main.py`
```python
import json

from nguyen_manh_bot import NguyenManhBot


def main():
    # Load session đăng nhập từ trước nếu có
    with open('session.json') as f:
        session_cookies = json.load(f)

    client = NguyenManhBot('username', 'password', session_cookies=session_cookies)

    # Lấy session và lưu vào file để lần sau dùng cho đăng nhập
    session_cookies_new = client.getSession()
    with open('session.json', 'w') as outfile:
        json.dump(session_cookies_new, outfile)

    # Lắng nghe phản hồi từ messenger
    client.listen()


if __name__ == '__main__':
    main()

```

# Đưa code lên heroku
Bây giờ bạn đã có một bot khá ok rồi, bạn có thể chạy trên local nhưng để chuyên nghiệp hơn thì chúng ta nên đưa nó lên heroku để không phải bật máy cho nó listen mãi =))
* Bước 1: Vào heroku tạo một tài khoản
	* Vào https://signup.heroku.com/login đăng ký một tài khoản
	![alt text](https://lh3.googleusercontent.com/Sod1dF409cebqKzfzIbtBM9slXT5pJfNR9rrrEUGXPh71VBPGocvEicYzkANIH_k7lKpeiNoN8nHue9wcOWb6QvQfjoRMF24_wti6gPtn4NBIZqqUMSE1G422u9KWQzb7LpYPzt6BuJ7RoZnUNgNmbWalfda0_9LO3UYrEl7rolqSMXa5G7bOlUzHqg353AfzFTMs6VOxRn684dXPHt2PFn-9nufkLTIq_u_e5OUEkI0Mir0pRlGTN5Qb6WfYwxooXwY5t_KlJjXmPdBmI6idErQqiJiaj-ZNtYmZxEJo-1KBntye86-xZZQP9NqHUmcsoMroe7BG9rGcZ2AaTg_iuziJR2XagJ4rOKEL663wSRM7GNdkjx9_aX4MG0I5Hl9cvxO4imEsi61ZWNEH_C2v0MLWEQkPibU-zu2j6QQHSDqZb-c8_UW4AcsoU30LxooMAf64EtkWZL9-y5CNBKitP8KlbGnbqejWBwD_SNPkyU6zIsOb0IVj8Kpf5XNtQrcIA0i9wf4kk-PPVQ-XZXZt_5i2RGHb6mBLMUaFl2VDBWYFEx16pQ7NamoCgFlHdCz_bi62XxK0k3FonsG6u1AS895NTec0yIDoo_W0omp4GHa3d0fcr4Rzta4uNecGK1RikdMH7RZ5pGJsGig8vmuxrCJ4T0XoA=w1249-h630-no "Đăng ký heroku")
* Bước 2: Tạo app heroku
	* Sau khi đăng ký tài khoản xong và https://dashboard.heroku.com/apps để tạo một app
	![alt text](https://lh3.googleusercontent.com/5JCgW_MbRY2jIVriky874asT9PNR5BB4y8fbHGzodYTgBEP_QM-n538aZBMnshK82HJPVv_0U6-Rrv6oOQskT9vNQez_9j8z9q3WGsQkdsM6lOhAxdEIVW7RbaR_Md1_13-_Tj5Lv3VxdpOawaDPl93IkqfVqfbH8rIohppHDZBcqbCWQ5iEoZH9hemImRkACLlDyCWnDnYiBYqOqu-b0jXPRKHzvx7C7s9aiZ_5fqobxmEEqfRKAnqwWDozh1Bd52e9bqZA-tbrpOtV8yawSPB8QPxPDWb60WEbKScRcNNhZWHYVwm_GAieL-8aSpFI1steQr9hmLfvSfkcYedk3E2rTteY-zpNelRzK58pLlhjUdmAuP20YWxMEopCRdSd2cS42lk6g6cqWfC1qydqOQ_3UsVxqxhsJab1zOctlCXk0a8PjVtelBsWMQiWXIqkRmthg0Ma_rAF3b_iPVVxfrYlSNBQRT95ABTx2Rb6ejrI4lT9nPiQdmF2GoSDs7f1W9hcyDoDGJwZUwyAZ2koCKBiza2-NJNWig66Uow7c0gc7FkWqbQP3JClcs2AlIOO5r3Fv1AszFFUaB2r8Nm0pH2Eu-DqT7aVtuunOSh83JjFIsvsGu8Xyjf-OCtSDDhFbvuTtZEWJ149_kPhVX0TQiwQtTEJIA=w1362-h625-no "Tạo app")
* Bước 3: Cài git và heroku lên máy
	* Heroku có dùng git nên chúng ta cài git lên máy nhé
		* Window thì download: https://git-scm.com/downloads
		* Linux thì chạy lệnh: `sudo apt-get install git`
	* Cài heroku
		* Window: https://devcenter.heroku.com/articles/heroku-cli
		* Linux: `sudo snap install --classic heroku`
* Bước 4: Deploy code lên heroku
	* Để heroku chạy được code bạn thì cần phải tạo 1 file 'Procfile' trong project với nội dung
	```sh
	worker: python test.py
	```
	* Làm theo các bưóc sau để đưa code lên
		* Đăng nhập heroku
		```sh
		$ heroku login
		```
		* Khởi tạo git
		```sh
		$ git init
		```
		* Add remote của heroku vào git
		Thay `nguyen-manh-messenger` bằng tên app bạn tạo trên heroku
		```sh
		$ heroku git:remote -a nguyen-manh-messenger
		```
		* Deploy app của bạn
		```sh
		$ git add .
		$ git commit -am "Lần đầu làm chuyện ấy"
		$ git push heroku master
		```


# Kết quả
* Source code: https://github.com/nguyenmanh1997/nguyenmanh-messager
* Sau khi làm theo như mình hướng dẫn bên trên thì bạn đã có một con `bot tra cứu tử vi` trên messenger cá nhân của bạn rồi. Giờ vào tận hưởng thành quả đi nào.
* Các bạn dựa vào code mình làm và nâng cấp thêm nhiều chức năng mới nhé.
* Chúc các bạn thành công!