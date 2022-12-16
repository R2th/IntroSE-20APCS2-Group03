RPC hoàn thành bằng module tiêu chuẩn của Python3
Nguồn:  https://qiita.com/nardtree/items/d7458eab839a6500a60a


Hiện tại, số lượng chủng loại của RPC trong Python là quá nhiều.
Tại năm 2020, phần lớn RPC được công khai với tư cách là OSS, tuy nhiên vì có quá nhiều chủng loại dẫn tới việc gia tăng những chi phí kèm theo như chi phí chọn lựa, chi phí đánh giá, chi phí học tập mà nó khiến cho tôi cảm thấy có vấn đề về mặt cá nhân.

Đối với chúng ta, thời gian là quý nhất, cho nên nếu dành thời gian để kiểm tra từng cái library hiện ra, rồi học cách dùng thì trong trường hợp cần làm nhanh PoC hay tạo những sản phẩm nhỏ theo kiểu đã đóng API chẳng hạn, thì sẽ không thích hợp cho lắm.

Trong multiprocessing của Python có tồn tại manager class, và thông qua việc dùng network để truyền tin giữa các process khi thực hiện multiprocessing, mà có thể implement Remote Procedure Call có tính năng cao hơn.

RPC sẽ rất tiện lợi khi bạn tiến hành xử lý phân tán quy mô lớn thông qua việc gọi hoặc truyền lệnh xử lý đến những computer khác nhau trong 1 hệ thống.

Giá trị của việc chạy bằng library tiêu chuẩn:

Tôi đã dùng qua nhiều library khác nhau rồi, nhưng những library đó vừa không còn hỗ trợ, vừa không có 1 thể chế để nhận pull request hay là tốn khá nhiều thời gian. Cho nên rất nhiều cái thư viện "có vẻ tốt" thì thực chất  là đã thuộc về dĩ vãng rồi.

Nếu được, thì không nên phụ thuộc vào library và implement đơn giản thôi, khi đó chỉ cần Python có tồn tại ( hay nói cách khác là trong Pythong không có deprecated) là có thể dùng rồi.

Giải thích code 

Dựa trên việc có thể suy nghĩ theo kiểu chi ra server và client, thì server là phía nhận mệnh lệnh trong khi client là phía phát hành lệnh.




server

from multiprocessing.managers import BaseManager as Manager
import os

//HÌnh dung là KVS của InMemory 
obj = {}
def get(k):
    print('get', k)
    return obj.get(k)

def put(k, v):
    obj[k] = v
    print('put', k,v)

// Lấy unam của server(function để biết là Linux hay MacOS)
def get_uname():
    print('get_uname')
    return str(os.uname())

if __name__ == "__main__":
    port_num = 4343
    Manager.register("get", get) # Đăng kí function dùng cho nhận lệnh
    Manager.register("put", put)
    Manager.register("get_uname", get_uname)
    manager = Manager(("", port_num), authkey=b"password") # Bằng cách để trống hostname, có thể nhận lệnh từ bất kì đâu. Có thể set password
    manager.start()
    input("Press any key to kill server".center(50, "-")) # Nhập cái gì đó vào là xong 
    manager.shutdown()
client

from multiprocessing.managers import BaseManager as Manager
Manager.register("get") # Đăng kí function
Manager.register("put")
Manager.register("get_uname")

if __name__ == "__main__":
    port_num = 4343

    manager = Manager(address=('25.48.219.74', port_num), authkey=b"password")
    manager.connect()
    print('get', manager.get('a')) // Tôi nghĩ là sẽ trả về None
    print('put', manager.put('a', 10)) // a -> Set là 10 
    print('get', manager.get('a').conjugate()) // Tôi nghĩ sẽ trả về 10, (Những format kiểu primitive chẳng hạn thì lấy ra bằng function conjugate)
    print('get_uname', manager.get_uname()) //Đang chạy client bằng MacOS nhưng mà server thì chắc là Linux 


Khi chạy thử code: 

Bằng server Linux (ubuntu), client MacOS(darwin), chúng tôi đã chạy chương trình ghi phía trên tại PC đặt tại nhà tôi thông qua việc thao tác ở cửa hàng cafe.

Kết quả là tôi có thể chạy theo đúng ý muốn của tôi, y chang như những gì tôi đã nghĩ.

Lấy ví dụ của việc này, đó là việc có thể xử lý số view Youtube, trend keyword của Twitter, không phải chạy từng câu lệnh BigQuery hay Redshift với mật độ cao mà vẫn có thể tổng hợp dữ liệu 1 cách hiệu quả. 

TÔi cũng rất coi trọng việc học hỏi các tool mới, nhưng tôi cũng rất coi trọng việc tối giản hóa bằng những gì đã có, thế nên hi vọng các bạn cũng có thể để mắt đến cách làm này nhằm đạt được mục tiêu bằng chi phí thấp nhất.

Ví dụ thêm: Code đếm số view Youtube.

Tôi hình dung là fork cái client thì sẽ có rất nhiều access từ nhiều nguồn khác nhau.

client

from concurrent.futures import ProcessPoolExecutor
import random
from multiprocessing.managers import BaseManager as Manager
Manager.register("get")  # đăng kí function
Manager.register("inc")

def extract(x):
    if hasattr(x, 'conjugate'):
        return x.conjugate()
    else:
        return x


def hikakin_watch(num):
    port_num = 4343
    manager = Manager(address=('127.0.0.1', port_num), authkey=b"password")
    manager.connect()
    for i in range(1000):
        try:
            now = extract(manager.get('hikakin'))
            print(now)
            manager.inc('hikakin')
        except Exception as exc:
            print(exc)

if __name__ == "__main__":
    with ProcessPoolExecutor(max_workers=5) as exe:
        exe.map(hikakin_watch, list(range(5)))

    port_num = 4343
    manager = Manager(address=('127.0.0.1', port_num), authkey=b"password")
    manager.connect()
    now = extract(manager.get('hikakin'))
    print(now)
server

from multiprocessing.managers import BaseManager as Manager
import os

//Hình dung là KVS của inmemory
obj = {}
def get(k):
    if k not in obj:
        obj[k] = 0
    return obj.get(k)

def inc(k):
    obj[k] += 1

if __name__ == "__main__":
    port_num = 4343
    Manager.register("get", get) # Đăng kí function nhận lệnh
    Manager.register("inc", inc)
    manager = Manager(("", port_num), authkey=b"password") // Bỏ trống hostname để có thể nhận lệnh từ bất kì nơi đâu. Có thể set password.
    manager.start()
    input("Press any key to kill server".center(50, "-")) // Nhập bất cứ cái gì là xong
    manager.shutdown()
    
Tôi nhận được con số 5000 như là output mà mình đã mong đợi, dù là đối với access song song thì cũng có thể giới hạn loại trừ rất rõ ràng.

Có thể dùng cho việc đếm số view YouTube