# Xin chào mọi người. Xử lý ảnh là một trong những lĩnh vực mà Python được áp dụng rất nhiều. Hôm nay mình xin phép giới thiệu một thư viện xử lý hình ảnh khá thông dụng trong Python, PILLOW.

## I. Định nghĩa 
- Pillow là một fork từ thư viện PIL của Python được sử dụng để xử lý hình ảnh. So với PIL thì Pillow được cập nhật thường xuyên và đánh giá cao hơn. (PIL đã không được cập nhật từ năm 2009).
- Lưu ý: Pillow và PIL không thể cùng tồn tại trong cùng một môi trường, trước khi cài Pillow hãy xóa PIL.
- Hướng dẫn cài Pillow có thể đọc ở [đây](https://pillow.readthedocs.io/en/stable/installation.html).
 
## II. Yêu cầu: 
1. Một thư mục có môi trường Python 3.7 được cài Pillow
2. Một bức ảnh. Trong Tutorial này ảnh của mình sẽ có tên: the_catch.jpg

## III. Hướng dẫn cơ bản

### 1. Sử dụng class Image
- Vì đây đều là những ví dụ đơn giản nên mình sẽ sử dụng thẳng Python từ trong shell. Sau khi đã cài môi trường và thư viện Pillow bạn có thể mở shell và gõ Python.
- Bước tiếp theo là import thư viện PIL
```
>>> from PIL import Image
```
- Mở và load ảnh trong thư mục hiện tại của bạn vào.
```
>>> img = Image.open("the_catch.jpg")
```
- Bạn đã có 1 Instance của class Image. Bạn có thể xem các thông tin về ảnh bằng cách truy cập thuộc tính của nó. 
```
>>> print(f"format: {img.format}, size: {img.size}, mode: {img.mode}, name: {img.filename}")
format: JPEG, size: (1000, 800), mode: RGB, name: the_catch.jpg
```
- Để truy cập toàn bộ các thuộc tính của `img`, bạn có thể gõ.
```
>>> dir(img)
['_Image__transformer', '__array_interface__', '__class__', '__copy__', '__delattr__', '__dict__', '__dir__', '__doc__', '__enter__', '__eq__', '__exit__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__setstate__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_close_exclusive_fp_after_loading', '_copy', '_crop', '_dump', '_ensure_mutable', '_exclusive_fp', '_exif', '_expand', '_get_safe_box', '_getexif', '_getmp', '_min_frame', '_new', '_open', '_repr_png_', '_seek_check', '_size', 'alpha_composite', 'app', 'applist', 'bits', 'category', 'close', 'convert', 'copy', 'crop', 'custom_mimetype', 'decoderconfig', 'decodermaxblock', 'draft', 'effect_spread', 'entropy', 'filename', 'filter', 'format', 'format_description', 'fp', 'frombytes', 'fromstring', 'get_format_mimetype', 'getbands', 'getbbox', 'getchannel', 'getcolors', 'getdata', 'getexif', 'getextrema', 'getim', 'getpalette', 'getpixel', 'getprojection', 'height', 'histogram', 'huffman_ac', 'huffman_dc', 'icclist', 'im', 'info', 'layer', 'layers', 'load', 'load_djpeg', 'load_end', 'load_prepare', 'load_read', 'mode', 'offset', 'palette', 'paste', 'point', 'putalpha', 'putdata', 'putpalette', 'putpixel', 'pyaccess', 'quantization', 'quantize', 'readonly', 'reduce', 'remap_palette', 'resize', 'rotate', 'save', 'seek', 'show', 'size', 'split', 'tell', 'thumbnail', 'tile', 'tobitmap', 'tobytes', 'toqimage', 'toqpixmap', 'tostring', 'transform', 'transpose', 'verify', 'width']
```
- Nếu bạn muốn hiển thị ảnh của mình, có thể sử dụng `show`
```
>>> img.show()
```
Pillow sẽ lưu ảnh của bạn sang một file tạm thời và dùng một phần mềm khác để hiển thị ảnh của bạn.
### 2. Đọc và ghi ảnh
- Như đã thấy ở phần trên, bạn không cần phải truyền vào dạng ảnh vì Pillow tự biết phân biệt các loại ảnh khác nhau. Muốn đọc ảnh bạn chỉ cần gọi hàm `open` của class `Image`.
- Nếu đuôi (extension) của file ảnh của bạn là một trong những đuôi thông dụng, thì không cần phải cụ thể hóa đuôi file, Pillow sẽ lưu file ảnh mới theo đuôi của ảnh cũ. 
- Nếu bạn muốn đổi đuôi file ảnh, có thể dùng hàm `save` và truyền vào nó tên file kèm theo đuôi mà bạn muốn.
```
>>> try:
...     new_img_name = "the_catch.png"
...     img.save(new_img_name)
... except IOerror:
...     print("Cannot convert file")
... 
>>> new_img = Image.open("the_catch.png")
>>> new_img
<PIL.PngImagePlugin.PngImageFile image mode=RGB size=1000x800 at 0x7F667EA69080>
```
- Bạn có thể tạo thumbnail bằng cách gọi hàm ```thumbnail```
```
>>> size = (256, 256)
>>> try:
...     new_thumbnail = "the_catch_thumbnail.png"
...     with Image.open("the_catch.png") as im:
...         im.thumbnail(size)
...         im.save(new_thumbnail, "PNG")
... except IOError:
...     print("Cannot create thumbnail")
... 
>>> 

```
Vậy là bạn đã tạo được 1 file thumbnail kích cỡ 256x256
### 3. Cắt dán và nhập ảnh. 
- Bạn có thể cắt một khu trong ảnh với hàm ```crop```. 
- Cách làm là bạn truyền vào 1 tuple gồm 4 tọa độ. Vị trí các toạ độ lần lượt là (trái, trên, phải, dưới ).
- Lưu ý là Pillow dùng hệ tọa độ (0, 0) từ góc trên bên trái, và các tọa độ này chỉ đến vị trí giữa các pixel.
```
>>> box = (120, 120, 360, 360)
>>> region = im.crop(box)
>>> region
<PIL.Image.Image image mode=RGB size=240x240 at 0x7F667ED108D0>
```
Phần được cắt ra đã được lưu trong biến `region`, bạn có thể xử lý và dán nó lại.
```
>>> region = region.transpose(Image.ROTATE_180)
>>> region.show()
>>> img.paste(region, box)
>>> img.show()
```
### 4. Biến đổi hình học.
- Bạn có thể resize lại ảnh với hàm ```resize```
```
>>> resized_img = img.resize((128, 128))
>>> resized_img.show()
```
- Hoặc xoay ảnh với hàm ```rotate```. *Lưu ý là Pillow xẽ xoay ảnh theo chiều ngược kim đồng hồ.
```
>>> rotated_img = img.rotate(90)
>>> rotated_img.show()
```
### 5. Biến đổi màu
- Bạn có thể biến đổi màu với hàm ```convert```
- Pillow có thể chuyển giữa 2 chế độ màu thông dụng là đen trắng (L) và có màu (RGB). Nếu muốn chuyển sang chế độ màu khác bạn sẽ phải dùng 1 hình ảnh trung gian (thường là ảnh RGB). 
```
>>> converted_img = img.convert("L")
>>> converted_img.show()
```
- Với các ảnh RGB, ảnh được phân thành các tầng màu (band). Bạn có thể tách các tầng màu này ra, chỉnh sửa và sắp xếp lại chúng rồi nhập lại vào hình ảnh.
```
>>> r, g, b = img.split()
>>> changed_img = Image.merge("RGB", (r, b, g))
>>> changed_img.show()
```

Đó là các phần cơ bản nhất của thư viện Pillow. Nếu cần tìm hiểu thêm bạn có thể đọc ở [đây](https://pillow.readthedocs.io/en/stable/handbook/tutorial.html). Tài liệu chi tiết có thể đọc ở [đây](https://pillow.readthedocs.io/en/stable/reference/index.html). Cảm ơn mọi người vì đã đọc bài, chúc các bản tạo thành công phần mềm chỉnh ảnh của riêng mình.