Bài viết không mang nặng tính kỹ thuật - chủ yếu là mình muốn thể hiện tư tưởng về code đạo của mình . 
Chẳng là dạo gần đây, mình đang suy nghĩ khá nghiêm túc về các loại câu hỏi "để làm gì ?" .
> Sống để làm gì ? Code để làm gì ? Ăn để làm gì ? Ngủ để làm gì ?

Trong dòng suy nghĩ lan man, mình vô tình nhớ đến câu hỏi của thằng em đồng nghiệp code Java : "Anh Hiếu ơi, ngôn ngữ Ruby thì làm được những gì ạ ? Em thấy ông anh em bảo chỉ để code web ? " .

Hê hê, chú nhầm. Nếu là vì tiền, thì có lẽ đúng là Ruby chỉ dùng để code Web. Nhưng anh code vì linh hồn của mình, vì tình yêu rạo rực trong huyêt quản chú ạ . (gáy rất khét , có ai yêu đou nên mới bày đặt yêu code, rõ văn vở )

Mình yêu lập trình. Và ngoài ra, mình là một người làm âm nhạc nghiệp dư (cũng vì tình yêu).

Thế là mình quyết định cắt ngang dòng suy hiện tại để dùng Ruby để code ra **Music Video** cho nó sợ . :D 
.

### 1. Làm nhạc và lên ý tưởng cho video
Quay trở lại câu hỏi ở đầu bài :

> Mình sống để làm gì ?

Cá nhân mình thì mình sống vì tình yêu :D (yêu tiền) . Tiền bạc , nhan sắc, danh vọng, sự tranh giành, ham muốn chiến thắng , .... tất cả đều sẽ biến mất theo thời gian . Tình yêu sẽ là thứ trụ lại cuối cùng . 

Với thông điệp ấy, mình đã sản xuất ra một bài hát tên là "Love last" ở [link này](https://youtu.be/srf82YqrkNM) .

Vấn đề bây giờ là đang cuối tháng, mình không có tiền để đầu tư Music Video cho nó . Thế nên kết hợp với câu chuyện của bé dev Java mà các bạn đã biết, mình quyết định **code ra 1 Music Video**  cho tiết kiệm chi phí . Cụ thể ý tưởng là mình sẽ dùng [gem gosu ](https://github.com/gosu/gosu) để code ra một game hợp với thông điệp bài hát của mình .

`Gem gosu` là một thư viện game 2D, dùng để lập trình game bằng ngôn ngữ Ruby và C++ . Cộng đồng người sử dụng nó cũng tương đối lớn.
Bạn có thể đọc thêm tài liệu về nó [ở đây ](https://www.libgosu.org/)

### 2. Cài đặt gem gosu và tìm game
Để sử dụng được gosu , trước hết bạn phải cài được `gem gosu` . Mình sẽ hướng dẫn bạn cài trên Ubuntu với 2 câu lệnh cơ bản sau: 
```
sudo apt-get install build-essential libsdl2-dev libgl1-mesa-dev libopenal-dev \
                     libsndfile-dev libmpg123-dev libgmp-dev libfontconfig1-dev

gem install gosu
```
Nếu bạn dùng 1 OS khác, vui lòng tham khảo hướng dẫn cài gem [tại đây](https://github.com/gosu/gosu/wiki) .

Sau khi cài xong gem, và vọc vạch trên google 1 chút, mình tìm thấy một sourcecode có chứa 1 tựa game phù hợp với bài nhạc của mình. Đó là sourecode của [gem gosu-examples](https://github.com/gosu/gosu-examples) . Để sử dụng nó, cái bạn tải thư mục về tại đây [tại đây](https://github.com/gosu/gosu-examples) .

Tựa game mình sẽ sử dụng là game `tutorial.rb ` . Các bạn có thể chạy nó như sau :
```
ruby gosu-examples-master/examples/tutorial.rb
#Nhớ trỏ đúng đường dẫn của thư mục gosu-examples mà bạn tải về nhé
```
Và nó sẽ hiển thị như sau :

![](https://images.viblo.asia/45f75904-95e1-4e95-9fd7-e2cb59406402.gif)

Một tựa game khá quen thuộc phải không nhỉ . :D . Giờ mình sẽ tìm cách sửa lại hình ảnh của nó một chút để cho phù hợp với music video của mình nhé .

### 3. Sửa lại một chút đồ họa của game

Mình sẽ sửa lại 3 thứ cho phù hợp với tinh thần của video :
*  Thứ nhất, mình sẽ thay **con tàu** bằng **logo kênh âm nhạc** của mình .
*  Thứ 2, mình sẽ thay hình ảnh **các ngôi sao** bằng hình ảnh **các trái tim** - tượng trưng cho tình yêu :D .
*  Thứ 3, mình sẽ thay cái background vũ trụ đen ngòm, bằng một hình ảnh gì đấy mà ghi được producer tag của mình lên đó .

Nghe chừng việc thay ảnh trong sourecode có vẻ dễ và làm được trong nháy mắt. Nhưng khi làm thì mình gặp một số vấn đề nhỏ .
Vấn đề số 1, khi thay con tàu bằng **logo kênh âm nhạc** thì nó trông sẽ như thế này :

![](https://images.viblo.asia/f4b8c401-2bf3-44c6-ae10-53ddf077f1a4.gif)

Cái mà các bạn đang thấy chính là hình ảnh **logo âm nhạc** của mình quá to, chắn hết màn hình game .

Sau khi đọc trong sourecode ở đoạn dưới đây và tính toán 1 chút, mình thấy logo của mình cần được đưa về kích thước `64x64` để có thể trông vừa đẹp với màn hình của game.

Mình sử dụng `MiniMagick` (một thư viện xử lý ảnh của Ruby) để tạo một file ảnh `64x64` từ logo của mình :

```
image = MiniMagick::Image.open("Downloads/logo cpnt/Logo-CPNT-01.png")
=> #<MiniMagick::Image:0x000055d6a39a3920 @path="/tmp/mini_magick20200926-5871-....>>
irb(main):004:0> image.resize "64x64"
=> #<MiniMagick::Image:0x000055d6a39a3920 @path="/tmp/mini_magick20200926-...>>
irb(main):005:0> image.write "Documents/gosu-examples-master/examples/media/cpnt.png"
```

Sau đó, mình thay file ảnh trong sourcecode của game thành file `cpnt.png` vừa tạo :
```ruby
def initialize
    @image = Gosu::Image.new("media/cpnt.png")
    @beep = Gosu::Sample.new("media/beep.wav")
    @x = @y = @vel_x = @vel_y = @angle = 0.0
    @score = 0
  end
```

Mình cũng sử dụng MiniMagick tương tự cho trường hợp thay hình ngôi sao và background của game, kết quả là được một Music Video hoàn chỉnh như thế này :D :

{@embed: https://www.youtube.com/watch?v=srf82YqrkNM}

Tổng kết lại thì, Ruby ngoài làm web ra cũng có thể làm được thêm một số việc như : code game, xử lý ảnh, xử lý dữ liệu cơ bản , tạo một số thư viện dùng cho ngôn ngữ khác , ......

Hoặc đôi khi dùng để làm mấy cái đồ họa xấu xấu cho 1 Music Video giá cả phải chăng như thế này cũng được :D .

Nói chung là cũng như thông điệp của bài hát, nếu là vì tình yêu , chúng ta sẽ tự tìm ra cách để sử dụng những thứ tưởng chừng như chẳng dùng để làm gì . :) 

Love always last .

Cảm ơn các bạn đã theo dõi bài viết này :D .

Nhớ sấp rai kênh làm nhạc của mình nếu bạn có hứng thú . hé . 

Bài này rõ ràng là bài quảng cáo chứ chia sẻ kỹ thuật mẹ gì :D .