Thử tưởng tượng bạn có 1 image toàn chữ vì bạn không có đủ thời gian ngay lúc đó để note nó lại, bạn chỉ có vài giây để chụp nó lại. Hoặc khi bạn đi du lịch, đến đất nước khác, nhìn biển quảng cáo hoặc nhà hàng mà không biết tên của nó là gì? Bạn không biết nó được viết như thế nào để translate, lúc này bạn sẽ muốn có được một cách nào đó để có thể lấy được text từ image. Dưới đây mình sẽ giới thiệu cách trích xuất text từ image sử dụng [Tesseract](https://github.com/tesseract-ocr/tesseract/wiki), `ImageMagick` (một công cụ xử lý image rất quen thuộc với Ruby) bằng Ruby code.
#### Cài đặt `Tesseract`
`Tesseract` là một công cụ nhận dạng văn bản bằng cách sử dụng nhận dạng ký tự quang học (OCR) và nó hỗ trợ rất nhiều ngôn ngữ. Bạn có thể xem danh sách ngôn ngữ mà tesseract hỗ trợ tại [đây](https://github.com/tesseract-ocr/tessdata)

**Đối với linux**
```
sudo apt install tesseract-ocr
sudo apt install libtesseract-dev
```

**Đối với MacOS**
```
brew install tesseract
# check traning data được lưu tại đâu bạn có thể dùng lệnh
brew list tesseract
# Thông thường nó sẽ được nằm trong thư mục
# /usr/local/Cellar/tesseract/4.0.0/share/tessdata/
```
=> trả về kết quả thư mục lưu trữ traning data, bạn sẽ cần đến nó để lưu trữ language bạn sẽ dùng để trích xuất trong hình ảnh. Ví dụ mình sẽ lấy text tiếng anh từ hình ảnh => bạn down file `eng.traineddata` từ list [danh sách](https://github.com/tesseract-ocr/tessdata) và copy vào thư mục trả về bên trên lệnh list (`/usr/local/Cellar/tesseract/4.0.0/share/tessdata/`) như vậy là chúng ta có thể bắt đầu sử dụng chúng.
Bạn cũng có thể xem thêm nhiều cách sử dụng khác nhau trong wiki của nó.

#### Nhận dạng text
Chúng ta sẽ thử nhận dạng với 2 image, 1 là subtitle của 1 bộ phim, 2 là 1 image mình chụp lại. Original của 2 image sẽ là:

![](https://images.viblo.asia/7cc8fa30-2f77-4979-b5cd-12a4f719394d.png)

![](https://images.viblo.asia/518a9099-54fd-41b5-a2dc-a45ec395a43e.png)

Chúng được đặt trong 1 folder và chúng ta sẽ duyệt từng image để get text từ nó.
Đầu tiên, ta sẽ chuyển ảnh về chế độ đen trắng, việc này giúp là bước đệm cho bước thứ 2 là xoá bỏ những thứ không cần thiết bằng cách bao phủ image bởi một mầu đen hoặc trắng => như vậy hình ảnh sau khi chỉnh lại chỉ còn backgroud đen hoặc trắng với text trắng hoặc đen điều này sẽ giúp cho `Tesseract` nhận dạng text tốt hơn. Cuối dùng sẽ dùng `Tesseract` để nhận dạng text.

##### Chuyển image về dạng ảnh đen trắng (grayscale)
```ruby
require 'pathname'
require 'open3'
require 'mini_magick'

INPUT_DIR = '/Users/ngocnguyen/Desktop/import/'
OUPUT_DIR = '/Users/ngocnguyen/Desktop/export'
Pathname.new(INPUT_DIR).children.each do |f|
  src_path = f.realpath
  tmp_path = "#{OUPUT_DIR}/#{f.basename}"

  img = MiniMagick::Image.open(src_path)
  img.colorspace('Gray')
  img.write(tmp_path)
end
```
Chúng ta sẽ được image mới dạng
![](https://images.viblo.asia/b7772b77-4e93-4d36-afdc-cf6264d2488d.png)

![](https://images.viblo.asia/518a9099-54fd-41b5-a2dc-a45ec395a43e.png)

Đối với ảnh thứ 2 sẽ không có gì khác biệt vì bản thân image đó nó đã thuộc dạng không cần phải xử lý gần như là sẽ dùng được luôn, có nghĩa là nó đã quá clean để có thể đọc text ngay.

##### Clean Image
```ruby
require 'pathname'
require 'open3'
require 'mini_magick'

INPUT_DIR = '/Users/ngocnguyen/Desktop/import/'
OUPUT_DIR = '/Users/ngocnguyen/Desktop/export'
Pathname.new(INPUT_DIR).children.each do |f|
  MiniMagick::Tool::Magick.new do |magick|
     # Bước 1
    src_path = f.realpath
    tmp_path = "#{OUPUT_DIR}/#{f.basename}"
    img = MiniMagick::Image.open(src_path)
    img.colorspace('Gray')
    img.write(tmp_path)
    # Bước 2
    magick << tmp_path
    magick.negate
    magick.threshold("007%")
    magick.negate
    magick << tmp_path
  end
end
```
Và chúng ta sẽ được image sau khi xử lý như dưới. 
![](https://images.viblo.asia/5b5153d9-f96a-46bb-ac5e-a8e341e73cd6.png)

![](https://images.viblo.asia/03c9296d-7159-43d8-a350-110ef55e276f.png)

Bạn có thể thấy là tất cả những chi tiết của image đã bị xoá thành mầu đen chỉ còn duy nhất text. Đối với image thứ 2 thì như trên mình có nói, nó sẽ không thay đổi gì vì nó đã clean, có xử lý thì nó cũng như vậy (có chăng là text sẽ đậm hơn chút). Và cuối cùng tới công đoạn cuối.

##### Nhận dạng text
Dùng `tesseract` để nhận dạng text và `open3` để `capture` text trả về.
```ruby
require 'pathname'
require 'open3'
require 'mini_magick'

INPUT_DIR = '/Users/ngocnguyen/Desktop/import/'
OUPUT_DIR = '/Users/ngocnguyen/Desktop/export'
Pathname.new(INPUT_DIR).children.each do |f|
  MiniMagick::Tool::Magick.new do |magick|
     # Bước 1
    src_path = f.realpath
    tmp_path = "#{OUPUT_DIR}/#{f.basename}"
    img = MiniMagick::Image.open(src_path)
    img.colorspace('Gray')
    img.write(tmp_path)
    # Bước 2
    magick << tmp_path
    magick.negate
    magick.threshold("007%")
    magick.negate
    magick << tmp_path
		
		# Bước 3
	text, _,  _ = Open3.capture3("tesseract #{tmp_path} stdout -l eng --oem 0 --psm 3")

    puts text.strip
  end
end
```
Kết quả chúng ta sẽ được text lần lượt như sau:

```
— I already know
how to swim.
Nguyen Thi Ngoc ‘I
Nguyen Thi Ngoc 2
Nguyen Thi Ngoc 3
Nguyen Thi Ngoc 4
Nguyen Thi Ngoc 5
```
Chúng ta có thể thấy là mức độ nhận diện text không phải hoàn toàn chính xác với một số kí tự đặng biệt, tuy nhiên ta cũng có thể tìm hiểu, đọc wiki để improve và xử lý cần thiết cho những trường hợp khác nhau. Trên đây là những bước nhận diện text cơ bản và đơn giản. Hy vọng sẽ hữu ích khi bạn cần xử lý liên quan đến image.

> Reference:  https://aonemd.github.io/blog/extracting-text-from-images-using-ruby