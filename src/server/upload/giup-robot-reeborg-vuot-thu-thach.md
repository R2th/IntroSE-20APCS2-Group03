![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/10/0vwbwKEXd.png?w=1200&ssl=1)

[Reeborg’s world](http://reeborg.ca/index_en.html) là một trang web được thiết kế cho việc học lập trình, cụ thể là thực hành lập trình Python. Điều thú vị ở đây là trong thế giới Reeborg’s World, việc thực hành Python chính là điều khiển chú robot sao cho bạn ấy thực hiện đúng yêu cầu của các thử thách. 


Trong bài blog này, mình sẽ dẫn bạn robot của mình đi dạo với 2 thử thách.

👉 Thử thách [“Hurdle 4”](https://reeborg.ca/reeborg.html?lang=en&mode=python&menu=worlds%2Fmenus%2Freeborg_intro_en.json&name=Hurdle%204&url=worlds%2Ftutorial_en%2Fhurdle4.json): bạn robot cần vượt qua các chướng ngại vật và về đích

👉 Thử thách[ “Maze”](https://reeborg.ca/reeborg.html?lang=en&mode=python&menu=worlds%2Fmenus%2Freeborg_intro_en.json&name=Maze&url=worlds%2Ftutorial_en%2Fmaze1.json):  bạn robot cần tìm đường ra khỏi mê cung

Để vượt qua các thử thách này, bạn hãy đọc kỹ đề ở “World Info” và xem các gợi ý về cú pháp Python cũng như các hàm điều kiện cho sẵn để có thể gọi cho robot di chuyển, ví dụ là: turn_left() để rẽ trái hay move() để đi thẳng.

## Thử thách "Hurdle 4" vượt chướng ngại vật
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/10/Screen-Shot-2021-10-13-at-21.57.21.png?w=658&ssl=1)

### Phân tích thử thách
Reeborg đang ở trong một cuộc đua vượt rào. Trò chơi yêu cầu bạn ấy cần di chuyển theo các đường mũi trên đang được hiển thị để có thể vượt rào thành công. 

Một lưu ý là các vị trí cũng như độ cao của rào sẽ thay đổi mỗi khi bạn tải lại thử thách. Và thử thách này là thử thách vượt rào khó nhất, phần lập trình này yêu cầu cũng hoạt động tốt cho các thử thách Hurdles1, Hurdles2, Hurdles3.

### Reeborg's basic keyboard
Đầu tiên, bạn hãy click vào “Reeborg’s basic keyboard” sẽ thấy cửa sổ hướng dẫn sau:
![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/10/keyboard.png?resize=768%2C352&ssl=1)

Có 5 tabs là:

– “**Commands**“: các hàm có sẵn để dùng như move(), turn_left(), …

– “**Conditions**“: các hàm có sẵn để kiểm tra điều kiện như đến đích với at_goal(), phía trước có trống không? với *frontisclear()*, có tường phía trước không? *wallinfront()*, …

– “**Python**“: các cú pháp Python gợi ý

– “**Objects**“, “**Special**“: các đối tượng và các ký tự đặc biệt, cái này thì trong bài này mình sẽ không dùng.

### Viết các hàm phụ trợ
#### Rẽ phải
Như bạn có thể thấy ở trên, mình có hàm di chuyển từng ô với move() và rẽ trái với turn_left(). 

Nhưng rõ là mình sẽ cần rẽ phải, cho nên mình cần viết một hàm để giúp mình làm việc này.

Giả sử Reeborg của mình đang hướng lên phía trên theo chiều mũi tên như trong hình, thì việc rẽ phải sẽ là xoay qua trái 3 lần. 

Bạn nhớ hồi xưa mình đi học hay có học quay trái, quay phải như thực hành nghi thức Đội không? Đây chính là một kiểu như thế ấy, “Bên trái, quay!” ba lần như thế là thành sang bên phải.
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/10/turn-right.png?w=544&ssl=1)
Vậy là mình viết được hàm rẽ phải, nó chỉ đơn giản là như thế này:
```python
def turn_right():
    turn_left()
    turn_left()
    turn_left()
```

#### Nhảy qua chướng ngại vật
Giả sử Reeborg đang đứng ở đáy của rào, hướng về phía bên phải như hình bên dưới. Reeborg cần thực hiện các thao tác sau để có thể vượt rào:

**Bước 1:** rẽ trái để bắt đầu vượt rào

**Bước 2:** vì độ cao của rào có thể thay đổi, nên Reeborg cần tiến về phía trước cho đến khi bạn ấy biết được đâu là đỉnh của rào. Vậy bạn có đoán được khi nào là đỉnh của rào không? Mình nghĩ bạn có thể đoán được, đỉnh của rào chính là khi bạn ấy có thể rẽ phải, tức bên phải trống để có thể rẽ được.

Tại đây mình có thể sử dụng hàm **right_is_clear()** để kiểm tra bên phải có trống hay không?

Nếu bên phải trống thì bạn ấy có thể rẽ phải, nếu không trống thì tiếp tục đi thẳng.

**Bước 3:** Tiếp theo sau khi đã rẽ sang phải rồi, vì rào chỉ bằng 1 lần di chuyển, cho nên chỉ cần di chuyển 1 lần nữa và tiếp tục rẽ phải để có thể hướng robot xuống phía dưới.

**Bước 4:** Reeborg sẽ tiếp tục tiến về phía trước theo hướng mặt đất cho đến khi nào gặp mặt đất thì rẽ trái để quay về hướng sẵn sàng cho lần di chuyển tiếp theo.
![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/10/Screen-Shot-2021-10-20-at-23.05.47.png?resize=768%2C575&ssl=1)

Dựa vào cách di chuyển để Reeborg có thể vượt rào ở trên, hàm jump() được viết là:

```python
def jump():
    turn_left()
    move()

    while not right_is_clear():
        move()

    turn_right()
    move()
    turn_right()

    while front_is_clear():
        move()

    turn_left()
```

### Chinh phục thử thách
Sau khi đã có cách vượt rào rồi, mình sẽ cho Reeborg tiến về phía trước, nếu gặp rào thì jump(), và cứ tiếp tục như vậy cho đến khi về đích với hàm at_goat() trả về True thì dừng lại.

```python
while not at_goal():
    if wall_in_front():
        jump()
    else:
        move()
```
Cùng xem kết quả cuối cùng của thử thách vượt rào nhé.
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/11/Screen-Shot-2021-10-30-at-22.47.17.png?resize=768%2C467&ssl=1)

## Thử thách "Maze" vượt mê cung
Vừa vượt rào xong đến đích thì Reeborg tưởng đâu là đã về đến rồi. Thế nhưng thì ra là bạn ấy đã vô tình bị lọt tiếp vào ngay trong mê cung 😱 🥲

Giờ làm sao có thể thoát ra khỏi mê cung này và về nhà đây, chúng mình cùng giúp bạn ấy nhé!

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/10/Screen-Shot-2021-10-13-at-22.02.35.png?w=657&ssl=1)

### Phân tích thử thách

Có một cách khá đơn giản để thoát khỏi mê cung đó là hay cứ đi về một hướng thôi, có thể là bên trái hoặc bên phải, cách này gọi là “**Right-Hand Rule**” nên thường sẽ đi về bên phải (xem thêm ở đây).

Cùng thử xem cách này có giúp Reeborg thoát khỏi mê cung không nhé.


### Chinh phục thử thách
Đi về bên phải thì mình có thể dùng lại hàm** turn_right()** đã viết ở thử thách vượt rào. 

Tiếp theo, làm sao để robot cứ đi bên phải nhỉ? 

Hẳn là nếu bên phải trống thì mình sẽ cho phép bạn ấy rẽ phải, còn không trống, thì sẽ cứ đi thẳng dọc tường. 

Hình dưới mô tả việc kiểm tra bên phải phía trước, từ đó quyết định cho robot hành động rẽ phải hoặc đi thẳng. 

Việc kiểm tra này có thể dùng các hàm **right_is_clear()** và **front_is_clear()**.
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/11/along-the-wall.png?w=643&ssl=1)

Thế khi robot đâm vào ngõ cụt thì sao? 

Khi đó bên phải không trống, phía trước cũng không trống, bạn ấy sẽ cứ đứng im vậy thôi. 

Lúc này, là lúc mình cần cho bạn ấy rẽ trái để phía bên phải sẽ trống khi mình xoay đến hướng ngược lại của ngõ cụt.

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/11/Screen-Shot-2021-10-30-at-23.45.59.png?w=682&ssl=1)

```python
def turn_right():
    turn_left()
    turn_left()
    turn_left()


while not at_goal():
    if right_is_clear():
        turn_right()
        move()
    elif front_is_clear():
        move()
    else:
        turn_left()
```

<hr/>
Và đây là kết quả của cách “Right-Hand Rule”, cùng xem bạn robot có đi khỏi mê cung không nhé.
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/11/Screen-Shot-2021-10-31-at-00.03.30.png?resize=768%2C467&ssl=1)

Trên đây là kết quả bạn ấy đã thoát khỏi được mê cung rồi, dù hơi đi vòng vèo một tẹo hihi.

Tuy nhiên, trong lúc thử nghiệm mình cũng thấy đôi khi bạn robot của mình bị bế tắc khi đi thành hình vuông mãi vậy á, cùng tìm hiểu thêm trường hợp đặc biệt đó ở mục tiếp theo hen.
![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/11/Screen-Shot-2021-10-31-at-16.12.01.png?w=755&ssl=1)


### Vấn đề: đi xà quần bất tận
#### Tạo thử thách mô phỏng vấn đề
Đầu tiên, mình cần tạo một phiên bản trò chơi mô phỏng vấn đề này, để khi nào cũng có thể mở lên và thực hành được. 

Reeborg’s world cho phép mình đổi vị trí của robot và lưu thành một bản game riêng bằng cách:

Chọn “Additional Options” > tại “World: creation, edition, …” chọn “Edit world” > Chọn “Robot” và chọn “Position” để có thể bắt đầu sửa vị trí robot.

Click chọn vào robot để bỏ chọn vị trí đang đứng, và chọn lại vị trí như sau. 
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/11/Screen-Shot-2021-10-31-at-22.28.25.png?w=457&ssl=1)

Tiếp theo, chọn “Onload” để nó chuyển thành dấu x để chương trình không tự động load vị trí ngẫu nhiêu của robot nữa.
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/11/Screen-Shot-2021-10-31-at-22.34.40.png?w=1211&ssl=1)

Cuối cùng chọn “Save world in browser” và đặt tên cho thử thách, có thể là “maze-problem”. 

Nếu bạn vẫn chưa tạo được mô phỏng thì có thể tải về bản mình problem_world.json mình đã có ở [đây](https://github.com/GraphicDThanh/100-days-python/blob/main/6_function_karel/Reeborg%20World%20Tests/problem_world.json), và nạp vào nhé.


#### Phân tích vấn đề
Vậy là mình đã cùng nhau mô phỏng được vấn đề rồi. Thế thì lý do vì sao mà bạn robot của mình đi xà quần mãi như thế nhỉ? 😅

Một điều mình có thể thấy ở đây là do vị trí ban đầu của bạn ấy, có vị trí sẽ không gặp vấn đề này, có vị trí lại gặp. Vậy cần xem xét vị trí ban đầu cho tình huống này có gì đặc biệt?

Ở vị trí nào mà bạn ấy có thể đi thành hình vuông, thì nơi đó có khả năng sinh ra vấn đề. 

**Lý do là vì bạn robot của mình sẽ rẽ phải khi có thể rồi lại tiến về trước rồi lại rẽ phải. Nếu bên phải luôn luôn có thể rẽ thì bạn ấy sẽ đi được hình vuông như trên, và cứ lặp lại như thế.**

Vậy làm sao để giải quyết nó đây?

#### Giải quyết vấn đề

Bạn có đoán được chưa? Thử đoán xem thế nào đã nhé 😉 ☕️

Nếu bên phải luôn trống sẽ sinh vấn đề thì có cách nào bạn robot của mình luôn có thể bắt đầu với bên phải không trống không nhỉ? Và đây là cách mình giúp bên phải bạn ấy không trống(có tường): 

**Trước khi bắt đầu tìm đường đi, nếu phía trước robot trống thì bạn ấy cứ tiến về phía trước cho đến khi nào chạm tường rồi thì quẹo trái.**

Cùng xem mô phỏng của cách di chuyển này ở hình bên dưới:

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/11/Screen-Shot-2021-10-31-at-22.36.58.png?w=642&ssl=1)
![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/11/Screen-Shot-2021-10-31-at-22.37.26.png?w=684&ssl=1)

Công việc này được thực hiện bằng cách kiểm tra và di chuyển robot về vị trí phù hợp ngay trước khi bắt đầu tìm đường ra khỏi mê cung, để đảm bảo bên phải bạn ấy luôn là tường. 

Các câu lệnh như sau:

```python
while front_is_clear():
    move()

turn_left()
```

Từ đó, mình có chương trình đầy đủ là:

```python
def turn_right():
    turn_left()
    turn_left()
    turn_left()

while front_is_clear():
    move()

turn_left()

while not at_goal():
    if right_is_clear():
        turn_right()
        move()
    elif front_is_clear():
        move()
    else:
        turn_left()
```
Cùng xem thành quả của Reeborg vượt mê cung thành công trong trường hợp khó nhằn này 🥳

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/11/Screen-Shot-2021-10-31-at-22.40.07.png?resize=768%2C451&ssl=1)

<hr/>
Vậy là tụi mình đã cùng dẫn robot đi dạo và cũng giúp bạn ấy vượt qua các chướng ngại vật và thoát khỏi mê cung rồi. Thật là thú vị phải không 🥰 

Nếu có thêm thời gian bạn hãy rèn thêm kỹ năng Python của mình với các thử thách khác nhé.

Bài viết này mình có tham khảo một khóa học online trên Udemy mà mình đã học qua, hi vọng sẽ hữu ích với mọi người.

[Bài gốc của nội dung này](https://beautyoncode.com/giup-robot-reebord-vuot-thu-thach/) nằm trên blog cá nhân của mình nhé!

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!