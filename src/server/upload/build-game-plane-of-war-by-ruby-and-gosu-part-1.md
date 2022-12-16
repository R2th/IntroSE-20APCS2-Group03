Xin chào mọi người, hôm nay mình sẽ giới thiệu đến các bạn build một con game nhỏ nhỏ, mục đích chính của việc này là vừa "Luyện Chưởng Ruby" vừa làm game. :D

Để phục vụ cho việc build game cũng như view ban đầu hay là một thứ gì đó chuyên dụng phục vụ cho việc này nên ở bài viết này mình sẽ sử dụng [Gosu](https://github.com/gosu/gosu). Thư viện này theo mình tìm hiểu được thì nó cũng là một thư viện mạnh trong việc làm game của Ruby và C++. Nó cho phép mình phát triển trên macOS, Windows, Linux (bao gồm Raspbian) và  IOS. Về gosu thì nó rất nhẹ, và như các bạn nào làm game rồi thì sẽ biết rằng là thường thì nó sẽ chạy trong main or update,... để cập nhật trạng thái của sự vật sự việc liên tục thì Gosu nó cũng k phải là ngoại lệ, nó được chạy liên tục trong hàm update và nó là game window. Và dĩ nhiên nó chỉ có đồ họa 2D được hỗ trợ bởi OpenGL, nó cũng cung cấp cho chúng ta những phương thức liên quan đến sound, animation, music, keyboard, input, mouse event...
## 1. Game idea
Con game hôm nay mình giới thiệu là game bắn máy bay kinh điển mà thường thì các engine nào vừa start thì mọi người đều hướng đến để tiếp cận.

Game bắn máy bay này thì mình sẽ có một plane(player) ở phía bên phải or phía duới, tùy các bạn, và plane địch thì sẽ bay đối diện với mình và mục tiêu của mình là phải bắn hạ những máy bay đó càng nhiều càng tốt.

Mỗi lượt chơi player sẽ có 3 mạng tương ứng với số máy bay bay qua player mà chưa bắn chết. Trong quá trình chơi thì sẽ có những ngôi sao hiện ra để mình có thể ăn nó và quy đổi ra 10 điểm mỗi sao.

Ở bài viết hôm nay mình sẽ hướng dẫn các bạn đến một số phần cơ bản của game, và đến phần thứ 2 sẽ là phần hoàn thiện nó. OK. Lét gâu. :D

## 2. Start
Để làm được game này thì đầu tiên bạn phải cài đặt gosu đã rồi sau đó mình sẽ học những module, những phần cơ bản cần có đã, và sau đó mới hoàn thiện được.
### 2.1 Install Gosu
Ở đây thì mình dùng linux nên mình sẽ hướng dẫn linux nhé, còn các bạn k dùng thì có thể tham khảo wiki của gosu để biết nhé
```shell
# Dependencies for both C++ and Ruby
sudo apt-get install build-essential libsdl2-dev libsdl2-ttf-dev libpango1.0-dev \
    libgl1-mesa-dev libopenal-dev libsndfile-dev libmpg123-dev \
    libgmp-dev
# install gosu
gem install gosu
```
Để kiểm tra xem được hay chưa thì bạn gõ `irb` để vô ruby console, sau đó gõ 
```ruby
require "gosu"
=> true
```
Nếu là true thì OK, còn k phải true thì bạn biết phải làm gì rồi đấy. :D
Sau khi cài đặt xong xuôi thì các bạn hay tạo một folder chứa source code như sau nhé.
```
Plane-of-war
    ├── images
    │   ├── Bullet
    │   └── Plane
    ├── scripts
    └── sounds
```
Các bạn nhìn vào tên thì có thể đoán được mục đích để làm gì rồi đúng k ạ. mình sẽ chia ra cho dễ quản lý để tránh việc code và image và sound chung một folder.  :v
### 2.2 Overriding Window callbacks
Tất cả các game từ Gosu thì đều kế thừa từ Gosu::Window, bạn có thể theo dõi dưới đây
```ruby
require "gosu"

class GameManager < Gosu::Window
  def initialize
    super 1200, 900
    self.caption = "Cuộc Chiến Không Trung"
  end

  def update
  end

  def draw
  end
end

GameManager.new.show
```
Ở đây mình sẽ tạo một cửa sổ với kích thước là 1200x900, tuy nhiên nếu bạn muốn nó full screen thì bạn sẽ thêm tham số `fullscreen => true` vào sau 900.
```ruby
super 1200, 900, true
```
update() and draw() are overrides of methods defined by Gosu::Window. update() is called 60 times per second by default, and should contain the main game logic, such as moving objects around, or testing for collisions.

draw() is usually called 60 times per second, but may be skipped for performance reasons. It should contain code to redraw the whole scene, but no game logic.

Then follows the main program. We create a window and call its show() method, which does not return until the window has been closed by the user or by calling close(). This is the main loop of the game.

`update`, `draw` là 2 method được override lại từ `Gosu::Window.update` và chúng đều được gọi 60 lần mỗi giây. 

`udpate` là method chứa logic chính của game, cũng như là di chuyển, bắn, hay là va chạm vật lý.


Còn `draw` thì nó cũng chạy tương tự nhưng chức năng của nó không như update mà nó chưa code để render object lên scense(màn hình trong làm game). 

Sau khi chúng ta create một window rồi thì chúng ta sẽ phải show ra bằng cách gọi Class GameManager.new.show để show window ra và chạy, ngược với hàm show thì chúng ta sẽ có hàm close để đóng cửa sổ lại. :D. Game thì phải có hình ảnh, và phần tiếp theo là việc sử dụng hình ảnh như thế nào.

### 2.3 Using Images
```ruby
require "gosu"

class GameManager < Gosu::Window
  def initialize
    super 1200, 900
    self.caption = "Cuộc Chiến Không Trung"
    
    @backgroud_image = Gosu::Image.new("images/BG.png", :tileable => true)
  end

  def update
  end

  def draw
      @backgroud_image.draw(0, 0, 0)
  end
end

GameManager.new.show
```
Về tất cả sourse hình ảnh cũng như code hay là sound thì nó đều nằm trong repo rồi, cuối bài mình sẽ gắn link.
`Gosu::Image#initialize` nó có 2 tham số, 1 là filename 2 là option dạng hash `{}`. Ở đây mình có set tileable là true, để giải thích rõ hơn thì mọi người có thể thao khảo thêm ở [Basic Concepts](https://github.com/gosu/gosu/wiki/Basic-Concepts#tileability)

Khi khai báo new image không thôi thì chưa đủ, chúng ta phải render ảnh nó ra nữa, bằng cách mình phải dùng hàm draw để luôn luôn render. Nó có 3 tham số quan trọng là x, y, z và gốc nó nằm ở góc trên bên trái của cửa sổ.

### 2.4 Player & Movement
```ruby
class Player
  def initialize
    @player = Gosu::Image.new("images/Plane/Fly_1.png", :tileable => true)

    @x = @y = @vel_x = @vel_y = 0.0
  end

  def wrap x, y
    puts "Warping..."
    @x, @y = x, y
  end

  def up
    puts "up ..."
    @vel_y += Gosu.offset_y(0, 0.5)
  end

  def down
    puts "down ..."
    @vel_y -= Gosu.offset_y(0, 0.5)
  end

  def front
    puts "front"
    @vel_x += Gosu.offset_x(90, 0.5)
  end

  def back
    puts "back"
    @vel_x -= Gosu.offset_x(90, 0.5)
  end

  def move
    @x += @vel_x
    @y += @vel_y
    @x %= 1200
    @y %= 900

    @vel_x *= 0.95
    @vel_y *= 0.95
  end

  def draw
    @player.draw_rot(@x, @y, 1, 0)
  end
end
```

![](https://images.viblo.asia/12e7670b-22f1-43f4-abbc-a556f23d6c23.png)

![](https://images.viblo.asia/3eb02f97-a817-42f8-9b0d-6ef686915a26.png)
Bạn có thấy trong code có đoạn ofsset_x / offset_y thì nó cũng giống như sin / cos thôi. Nếu như player di chuyển 100px mỗi frame ở góc 30 độ, thì nó sẽ là offset_x(30, 100) khi di chuyển ngang, và offset_y(30, 100) cho việc di chuyển dọc.

Ở đây mình dùng draw_rot là bơi vì draw_rot nó lấy giữa ảnh làm tâm, chứ k phải ai kia (draw) render ảnh ở góc. :D

```ruby
...
require "gosu"

class GameManager < Gosu::Window
  def initialize
    ...
    @player = Player.new
    @player.wrap(600, 450)
  end

  def update
    if Gosu.button_down?(Gosu::KB_LEFT) || Gosu::button_down?(Gosu::GP_LEFT)
      @player.back
    end

    if Gosu.button_down?(Gosu::KB_RIGHT) || Gosu::button_down?(Gosu::GP_RIGHT)
      @player.front
    end

    if Gosu.button_down?(Gosu::KB_UP) || Gosu::button_down?(Gosu::GP_BUTTON_0)
      @player.up
    end

    if Gosu.button_down?(Gosu::KB_DOWN) || Gosu::button_down?(Gosu::GP_BUTTON_0)
      @player.down
    end
    @player.move
  end
...
end

GameManager.new.show
```
Gosu cũng cung cấp cho chúng ta một số hàm để check input như `button_down`, `button_up`.  Tương tự với các button di chuyển là các hàm di chuyển. Đơn giản đúng k ạ.
### 2.5 Simple animation
```ruby

class Player
  def initialize
     ...
    @flying_anim = init_animation_for "Fly", 2
    ...
  end
  
  def draw
    @player = @flying_anim[Gosu.milliseconds / 100 % @flying_anim.size]
    @player.draw_rot(@x, @y, 1, 0)
  end
  
  private
  def init_animation_for name, max_length
    max_length.times.map do |id|
      Gosu::Image.new("images/Plane/#{name}_#{id + 1}.png", :tileable => true)
    end
  end
end
```
Đối với animation thì nó là một chuỗi sự kiện đổi hình ảnh liên tục để tạo ra hiệu ứng chuyển động, cơ bản nó là vậy, còn ngày nay thì mọi người hầu hết thì đều sử dụng xương để kết nối chuyển động cho linh hoạt.

Tương tự ơ đây, mình tạo một mảng hình ảnh của hành động flying và ở hàm draw mình sẽ đổi hình ảnh liên tục theo thứ tự là OK. Hàm `milliseconds` là hàm đếm mili giây từ lúc ban đầu game start. neen mình sẽ dùng công thức này để đổi ảnh theo thứ tự liên tục.

### 2.6 Text and sound
```ruby
....
class GameManager < Gosu::Window
  def initialize
    ...
    @font = Gosu::Font.new(20)

    # Gosu::Song to play background sound
    @bg_sound = Gosu::Song.new("sounds/bg_sound.mp3")
    @bg_sound.play(true)
  end
  
  def draw
  ...
    @font.draw("SCORE: #{@player.score}", 10, 10, ZOrder::UI, 1.0, 1.0, Gosu::Color::YELLOW)
  end
end
```
Ở đây với text thì mình sử dụng font 20 và draw ở vị trí góc trái trên cùng nhé, còn sound thì ở đây mình sử dụng background music. Lưu ý rằng là nếu dùng để chơi background music thì dùng `Gosu::Song` và play loop, còn effect sound thì chúng ta dùng `Gosu::Sample`

## SUMMARY
Như vậy thì ở trên mình cũng đã giới thiệu và hướng dẫn các bạn dùng Gosu + Ruby để build game và các module nhỏ như thế nào rồi. Đây chỉ là một số phần nhỏ của game thôi, ở phần sau, mình sẽ hướng dẫn các bạn hoàn thiện con game này cũng với từng nấy module mà mình đã giới thiệu, nhưng phát triển ra một tí nữa. 

Để có source toàn bộ thì xin mời bạn truy cập vào Repo của mình:

https://github.com/TranHaiQuan/Game-Plane-of-War-Ruby-Gosu

**Tài liệu tham khảo**

https://github.com/gosu/gosu/wiki/Ruby-Tutorial