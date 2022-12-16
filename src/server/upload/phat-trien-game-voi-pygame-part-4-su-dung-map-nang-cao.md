Chào mọi người, giờ mình cũng không hiểu tại sao mình lại đào mộ viết nốt cái series đã gần 7 năm tuổi này nữa =)). Cơ mà cứ thỉnh thoảng lâu lâu lại thấy có bạn vào comment bảo anh ơi viết nốt phần 4 đi, thôi thì hoàn thành nốt vậy. Mình sẽ cố gắng dùng hết trí nhớ già cỗi của mình để nhớ và viết nốt cái series dang dở này nhé :smile:. Mình sẽ đưa ra hướng dẫn và giải thích là chính, còn cụ thể thế nào, bạn hãy tham khảo link source code có ở cuối bài, code (chắc là) cũng dễ đọc thôi :sweat_smile:. Nào chúng ta cùng đi vào phần cuối, sử dụng map nâng cao.

## Map và Triggers

Như đã viết ở các phần trước, trigger sẽ đóng vai trò quan trọng như là một lớp ẩn, tương tác với người dùng và sẽ được hiển thị bởi các tile khác nhau tùy vào thuộc tính của trigger. Các trigger này đều nằm trong object layer **triggers**:
![](https://images.viblo.asia/155538ea-ccfa-40cb-a907-8ea30bf8efdf.png)

và chúng ta sẽ ẩn lớp này đi và thay bằng các tile tương ứng:

Ví dụ với lớp trigger như thế này:

![](https://images.viblo.asia/e97c7d94-8f61-45f5-9d2a-c6fe6bbd6df2.png)

Thì sau khi xử lý logic game, sẽ hiển thị trong game như sau:

![](https://images.viblo.asia/85101eae-6bbf-4421-8522-589d0aaa11be.png)

Okay, chúng ta cùng xem xét một số ví dụ cụ thể.

## Tạo tileset cho trigger

Trước tiên chúng ta cần tạo một tileset mới cho riêng phần trigger này, để khi thao tác đặt các trigger chúng ta sẽ biết rằng mình đang đặt nó ở đâu. Mình tạo hai tileset tương ứng **triggers** và **triggers2x** cho 2 kích thước title khác nhau. Bạn ko cần quan tâm đồ họa của  các trigger như thế nào, chỉ cần đơn giản màu hoặc label dễ nhớ để phân biệt.

![](https://images.viblo.asia/ac75c8a7-b51a-46db-9741-56efb77a5230.png)

![](https://images.viblo.asia/d00904c9-a0e1-4f81-8a0a-c1dae4d5e686.png)

Ở đây mình có quy ước viết tắt:
- `Br`: brick là viên gạch mà Mario sẽ va chạm
- `Cb`: là coin box, hộp tiền
- `T`: là turtle
- `flower`: là bông hoa độc màu đỏ
- `P`: là player, tức là vị trí ban đầu của Mario

Sau khi đã tạo xong, hãy chú ý sang phía trái của giao diện Tiled, bạn sẽ thấy có một mục là `Properties`, ở đây ta có thể set thuộc tính cho từng loại tile khác nhau. Đây là phần rất quan trọng để khi load map vào game, ta có thể tìm và lấy ra được các thuộc tính có cùng một loại để xử lý. Như hình minh họa, mình đã set thuộc tính `coinbox`cho tile của `Cb` giá trị là `yes` hay đối với `Br` sẽ có thuộc tính `brick = yes` . Tương tự cho các tile, bạn có thể cài đặt tùy theo logic game.

![](https://images.viblo.asia/131e7337-e869-4b91-8894-ef14d8f86596.png)

## Các ví dụ minh họa

### Tạo brick trigger

Sau khi đã có tileset, chuyển layer hiện hành sang object layer **triggers** và ấn phím `T`. Lúc này ta có thể chọn các tile và vẽ vào map. Chuyển qua tab Objects, ta có thể thấy các object đã được thêm vào layer (chỉ là nó ko có tên thôi chứ thực ra là vẫn có nhé):

![](https://images.viblo.asia/f062804d-23a0-4a5e-a454-193b0e2186a6.png)


Quay về với phần code, chúng ta sẽ xử lý như sau. Tại hàm `init_map` của `main.py`:

```main.py
self.bricks = tmx.SpriteLayer()
for _brick in self.tilemap.layers['triggers'].find('brick'):
    brick.Brick(self, (_brick.px, _brick.py), self.bricks)
```            

Sử dụng hàm `find` của `tilemap`, ta có thể tìm kiếm trong `layers['triggers']` tất cả các object có thuộc tính này, đối với mỗi object, ta sẽ lấy ra được vị trí của nó rồi tạo đối tượng thuộc lớp `Brick` với đúng vị trí tương ứng.

Lớp `Brick` này chúng ta cũng có `set_blockers(game, "tlrb")` để khi Mario còn bé thì sẽ không làm gì được:

![](https://images.viblo.asia/f71e43e3-f11e-4d24-8354-58274269c471.gif)

nhưng khi đã lớn lên rồi thì BAM!

![](https://images.viblo.asia/b372188b-dc34-49c0-a50a-4d201247a16e.gif)


Phần xử lý này và hiệu ứng mảnh gạch bay tung tóe, bạn có thể tham khảo thêm ở: https://github.com/vigov5/mario_game/blob/develop/brick.py

### Tạo coinbox trigger

Tiếp theo là một ví dụ khó hơn, như ở hình đầu tiên, có một số coinbox tuy có mặt ở trong map nhưng đến khi render ra thì lại không có, đây là những coinbox ẩn. Để có thể xử lý phần này, rất đơn giản, chỉ cần thêm thuộc tính riêng cho các coinbox này:

![](https://images.viblo.asia/f08cb412-8866-4ecd-89a3-ab8acaf5c206.png)

và xử lý tương tự:

```main.py
self.coinboxs = tmx.SpriteLayer()
for _coinbox in self.tilemap.layers['triggers'].find('coinbox'):
    box_type = getattr(coinbox, _coinbox.properties.get("type", "SECRET"))
    prize = None
    if _coinbox.properties.get("item"):
        prize = getattr(powerup, _coinbox.properties.get("item"))
    count = _coinbox.properties.get("count", 1)
    coinbox.CoinBox(self, (_coinbox.px, _coinbox.py), box_type, prize, count, self.coinboxs)
```

ta sẽ lấy ra thuộc tính `type` của coinbox, mặc định là `SECRET`, và ngoài ra:
- Trong coinbox, còn có thể chứa các item: nấm mạng (`ONE_UP`), nấm lớn (`MUSHROOM`), nấm độc (`BAD_FUNGUS`), hoa lửa (`FLOWER`)... chúng ta cũng định nghĩa thêm thuộc tính `item`
- Coinbox có thể phải huýnh nhiều lần mới hết coin, chúng ta sẽ thêm thuộc tính count (mặc định là 1)

Sau khi có các thông tin từ object trigger, ta sẽ tạo Coinbox tương ứng. Tham khảo thêm ở: https://github.com/vigov5/mario_game/blob/develop/coinbox.py và https://github.com/vigov5/mario_game/blob/develop/powerup.py

Và đây là kết quả:

![](https://images.viblo.asia/213b063e-4ae3-4916-af6c-4a516df19495.gif)

nhớ thêm các layer vào game nhé:

```python
self.insert_layer(self.powerups, "powerups", 1)
self.insert_layer(self.coins, "coins", 2)
self.insert_layer(self.coinboxs, "coinboxs", 3)
self.insert_layer(self.bricks, "bricks", 4)
self.insert_layer(self.enemies, "enemies", 5)
self.insert_layer(self.sprites, "sprites", 6)
```

### Tạo đường hầm sang map khác

Và đây là ví dụ nâng cao hơn. Ở đây ta sẽ cần tạo thêm trigger mới có tên là `pipe` và đặt nó ở ngay phía trên của miệng ống nước:

![](https://images.viblo.asia/bc0bcb16-8dd9-4ebf-95d3-e8a14ff5f3cf.png)

Gắn cho nó các thuộc tính như dưới đây:

![](https://images.viblo.asia/f229cbb9-5d6b-4251-a64f-ca2ea6c3714a.png)

- `pipe`: để xác định miệng ống nước
- `map`: sẽ là tên của file map kế tiếp là `underground1.tmx`
-  `next`: sẽ là vị trị Mario sẽ xuất hiện ở map tiếp theo.

mở file `underground1.tmx` trong repo, chúng ta sẽ thấy có một tile màu vàng của trigger layer với các thuộc tính tương ứng:

![](https://images.viblo.asia/4bc87292-7e21-4fb7-9156-a78f429453e1.png)

Và phần code xử lý:

```mario.py
 # collison with pipe
if self.v_state == "crouching":
    for pipe in game.tilemap.layers["triggers"].collide(new, "pipe"):
        start_x = pipe.left + pipe.width/4
        end_x = pipe.right - pipe.width/4
        if last.bottom <= pipe.top and new.bottom > pipe.top \
            and new.centerx > start_x and new.centerx < end_x:
                self.state = "pipeing"
                self.pipe_y = pipe.top
                self.pipe_obj = pipe
                break
```
Đầu tiên là kiểm tra xem khi ấn nút ngồi thì Mario có đang va chạm với pipe nào không, và phải đảm bảo là Mario đứng ở trên và chính giữa của đường ống. Khi đó, ta sẽ đưa nó và trạng thái "chui ống" (`pipeing`).

```mario.py
if self.state == "pipeing":
    self.vy = 1
    self.vx = 0
```
Khi chui ống, ta sẽ loại bỏ hết tất cả các input và chỉ có going down, down, down...Đến khi chui ống hoàn thành, nghĩa là đầu của Mario khuất sau cái ống:
```mario.py
if new.bottom >= self.pipe_y + new.height:
    self.state = "piped"
    self.pipe_y = None
```

sẽ là bước xử lý và load map mới:

```main.py
def update(self, dt):
    if self.my_mario.state == "piped":
        next_map = self.my_mario.pipe_obj.properties.get("map")
        new_pos = self.my_mario.pipe_obj.properties.get("next")
        self.init_map(next_map + '.tmx', new_pos, False)
        if "underground" in next_map:
            self.bg_color = config.BLACK
        else:
            self.bg_color = config.SKY
        self.my_mario.state = "normal"

    self.tilemap.update(dt / 1000., self)
```
như ở trên, ta sẽ lấy ra các thông tin của map mới từ `pipe_obj` cũng như là vị trí mới của mario, rồi đưa vào hàm `init_map`. Và đây là kết quả quá trình chui ống của chúng ta:

![](https://images.viblo.asia/0331a20b-1d9f-4e6d-b921-d7431fe0436f.gif)

## Kết

Trên đây là những ý cơ bản để từ đó ta có thể mở rộng và phát triển thêm nhiều thứ nữa:
- Thêm các kẻ địch: rùa, hoa,...
- Làm cho Mario biến to, nhỏ
- hay là cầm gạch choảng nhau ???

như demo dưới đây

{@embed: https://www.youtube.com/watch?v=RX4vgH0U3Kg&feature=youtu.be}

Tất cả bạn cần làm chỉ là tưởng tượng + coding

![](https://media3.giphy.com/media/BQUITFiYVtNte/giphy.gif)

**Bonus**: "bay lên nào là em bay lên nào" :joy:

![](https://images.viblo.asia/cc4544ac-8f37-4131-86e8-e9a0a888c279.gif)

Source code: https://github.com/vigov5/mario_game/

Vậy là kết thúc series, finally, thực ra giờ không còn ai viết code chay to tay như thế này nữa rồi, tất cả giờ đã có các game engine hỗ trợ đến tận chân răng, giúp cho việc phát triển dễ dàng hơn rất nhiều. Tuy nhiên, đôi khi bạn cần phải nắm được những thứ cơ bản trước để có thể đi sâu hơn. Anw, hi vọng nó có ích cho mọi người :D