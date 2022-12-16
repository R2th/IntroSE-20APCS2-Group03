Chào tất cả mọi người! Như vậy là chúng ta lại gặp nhau sau một tháng dài dằng dặc. Và cũng như mọi khi, hôm nay mình sẽ trình bày với các bạn về một khái niệm rất hay gặp trong Python Language là **Module**.<br>
Để có thể hiểu được nội dung hôm nay thì mình khuyến khích các bạn nên có một chút kiến thức cơ bản về Python Languge. Các bạn có thể tìm hiểu về Python qua chị gu-gồ hoặc cũng có thể tìm đọc series viết về Python của mình trong list dưới đây:<br>
* [Python language](https://viblo.asia/p/python-language-LzD5dJDeZjY)
* [Cấu trúc rẻ nhánh trong Python](https://viblo.asia/p/cau-truc-re-nhanh-trong-python-E375zW4RKGW)
* [Hàm trong Python](https://viblo.asia/p/ham-trong-python-eW65GgkP5DO)
* [Class và Object trong Python](https://viblo.asia/p/class-va-object-trong-python-4P856dvLZY3)
* [Abstract class trong Python](https://viblo.asia/p/abstract-class-trong-python-naQZRXgj5vx)
<br>
Bây giờ hãy cùng tìm hiểu về Module thôi nào!
# What is a Module?
Trong lập trình, một Module là một phần của phần mềm có chức năng cụ thể. 
Một Module giống như là một thư viện code phục vụ cho ứng dụng của bạn.
Module là một tệp chứa một tập hợp các chức năng mà bạn muốn đưa vào ứng dụng của bạn.<br>
Ví dụ: khi xây dựng trò chơi bóng bàn, một Module sẽ chịu trách nhiệm về logic trò chơi và
một Module khác sẽ chịu trách nhiệm vẽ trò chơi trên màn hình. Mỗi Module là một tệp khác nhau và có thể được chỉnh sửa riêng.<br>
# Xây dựng một Module
Các Module trong Python chỉ đơn giản là các tệp Python có phần mở rộng .py. Tên của Module sẽ là tên của tệp. Một Module Python có thể có một tập hợp các hàm, các lớp hoặc các biến được định nghĩa và triển khai. <br>
Trong ví dụ trên, chúng ta sẽ có hai tệp là draw.py và game.py.
Tập lệnh trong Module game sẽ triển khai trò chơi. Nó sẽ sử dụng hàm drawGame từ Module draw, hay nói cách khác, Module draw sẽ triển khai logic để vẽ trò chơi trên màn hình.<br>
Để Module game có thể sử dụng được hàm draw_game từ Module draw chúng ta cần phải import Module draw vào trong Module game của chúng ta. Và để thực hiện điều đó Python cung cấp cho chúng ta từ khóa `import`. Code trong 2 Module của chúng ta sẽ có dạng như thế này:<br>
```
# draw.py
def drawGame():
    print('This game has been drawn')
    
def clearScreen():
    print('Clear screen')
```
```
# game.py
# Sử dụng từ khóa import để import Module draw vào Module game
import draw 
def playGame():
    print('Play the game')
def main():
    playGame()
    draw.drawGame()
draw.clearScreen()
print('Loading game ...')
main()
```
Trong ví dụ này, Module game import Module draw, cho phép nó sử dụng các chức năng được triển khai trong Module đó. Hàm `main` sẽ sử dụng hàm cục bộ `playGame` để chạy trò chơi, sau đó vẽ trò chơi bằng cách sử dụng một hàm được triển khai trong Module draw có tên `drawGame`. Để sử dụng hàm `drawGame` từ Module draw, chúng ta sẽ cần chỉ định Module nào được thực hiện, sử dụng toán tử `.`. Để tham chiếu hàm `drawGame` từ Module game, chúng ta sẽ cần import Module draw và sau đó gọi `draw.drawGame()`. <br>
Khi lệnh import draw chạy, trình thông dịch Python sẽ tìm một tệp trong thư mục mà tập lệnh được thực thi từ đó, bằng tên của Module với tiền tố .py, vì vậy trong trường hợp của chúng ta, nó sẽ cố gắng tìm draw.py. Nếu tìm thấy, nó sẽ import. Nếu không, nó sẽ tiếp tục tìm kiếm các Module tích hợp.<br>
Và đây là kết quả khi chạy file game.py <br>
![](https://images.viblo.asia/90ab1cce-7e93-440b-9667-05490a81b664.png)
<br>
## Từ khóa from
Chúng ta dùng từ khóa from để import những gì chúng ta cảm thấy cần thiết trong một Module. Không nhất thiết phải import hết tất cả các thành phần của nó.<br>
VÍ dụ:<br>
Chúng ta sử dụng `import draw` hoặc `from draw import *` để lấy hết tất cả các thành phần của Module draw.<br>
Và nếu chúng ta chỉ cần dùng hàm `drawGame` trong Module draw thì chỉ cần dùng `from draw import drawGame` là được.
# Ví dụ
Trong ví dụ sau đây, mình sẽ tạo ra các Module: square, rectangle với các chức năng cơ bản như tính diện tích, chu vi.<br>
Code Module square:<br>
![](https://images.viblo.asia/8bd657ae-7b61-4d9e-bb7b-6a187d42c46f.png)<br>
Code Module rectangle:<br>
![](https://images.viblo.asia/d5f835f1-a675-49c4-af0c-4e5644f9fd0e.png)<br>
Code file main.py:<br>
![](https://images.viblo.asia/5e696487-de24-4cc9-9db2-a64e1f88931d.png)<br>
Các bạn thấy đấy, ở đây mình dùng 2 Module square và rectangle để lưu các chức năng riêng biệt:
* Module square dùng để chứa các đoạn code xử lý riêng cho square.
* Module rectangle dùng để xử lý các logic riêng cho rectangle.<br>
Các bạn có thể thấy là nó rất tương tự với Class nhưng với Module thì các bạn không cần phải khởi tạo để sử dụng nó.<br>
Và đây là kết quả của mình:<br>
![](https://images.viblo.asia/78f78f43-8572-4677-866c-8beae60be469.png)<br>
# Kết luận
Trên đây là những gì mình biết về Module trong Python. Có lẽ cũng chưa được đầy đủ lắm nên những ai muốn tìm hiểu sâu hơn có thể vào [đây](https://www.google.com/) để tìm hiểu nhé :)<br>
Good luck for all.