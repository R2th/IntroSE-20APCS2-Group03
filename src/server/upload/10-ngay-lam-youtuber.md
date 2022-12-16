<h2>Mở đầu</h2>
Nếu bạn có theo dõi bài trước <a href="https://viblo.asia/p/text-to-speech-chuyen-van-ban-thanh-giong-noi-Az45bm7qlxY">Chuyển văn bản thành giọng nói</a> của mình, mình code cho bạn mình app để chuyển văn bản thành giọng nói để nó nghe truyện kiếm hiệp. Và nó đăng lên youtube. Nó khoe với mình rằng nó được 400 lượt sub và mấy chục nghìn lượt xem. Mình không ngờ rằng mọi người thích nghe truyện kiếm hiệp vậy. Có thể đối với các bạn là ít, nhưng với cái kênh youtube của mình mấy năm được 10 sub thì đây là con số lớn trong khi kênh của nó được tháng. Mình bảo nó là có vẻ nhu cầu là vô hạn và mơ tưởng đến làm một lần và ăn cả đời. Nhưng sự thật thì chẳng được như mơ!!!

Mục đích là kể chuyện vui, cũng có một số thông tin về api, ngôn ngữ lập trình, và công cụ.
<h2>10 ngày làm youtuber</h2>
Mình thấy lạ khi có nhiều người đọc truyện ngôn tình, kiếm hiệp, tiên hiệp, sắc hiệp đến vậy. Trước kia mình có đọc thử truyện ngôn tình xem thế nào, mình thấy suốt ngày tâng bốc nhân vật chính, ngôn ngữ thì lấy từ truyện trung quốc, được dịch bằng tool và được chỉnh sửa bởi cộng đồng có lẽ cũng không phải giới nhà văn. Mình thích đọc tiểu thuyết văn học hơn. Vậy nên mình mới ấn tượng khi có cả một cộng đồng to lớn <a href="https://truyen.tangthuvien.vn/">Tàng thư viện - đọc và thăng hoa cùng đam mê</a>, <a href="https://truyen.tangthuvien.vn/">truyenfull.vn - Đọc truyện online, đọc truyện chữ, truyện full, truyện hay. Tổng hợp đầy đủ và cập nhật liên tục,</a> <a href="https://truyenyy.com/">https://truyenyy.com/</a>, <a href="https://truyencv.com">https://truyencv.com.</a> Có truyện lên đến 259819 lượt xem, và 7000 lượt theo dõi. Đây chỉ là ý kiến cá nhân của mình, các bạn đọc truyện cũng không nên chấp mình làm gì, nghĩa là nhu cầu đọc, nghe truyện cũng lớn các bạn ạ. Nhưng mảnh đất màu mỡ này đã được rất nhiều các tên tuổi khác khai thác rồi. Mình mới đến lại chẳng tìm hiểu gì cả.
<h3>Và mình bắt đầu code...</h3>
Api fpt thì mình đã code trước cho bạn rồi. Bạn đang tự hỏi là có gì để code ở đây

<img class="alignnone size-full wp-image-182" src="http://35.196.17.90/blog/wp-content/uploads/2018/12/YoutubeKIT.png" alt="" width="319" height="154" />
<h3>Crawler</h3>
Đầu tiên là lấy dữ liệu từ các trang như truyenfull, truyen.tangthuvien, truyencv về. Các bạn có thể sử dụng thư viện Scrapy của python. Rất nhanh chỉ trong khoảng 3 phút chúng ta có cả mấy nghìn chương từ các trang này.

```python
def parse(self, response):
        page = response.url.split("/")[-2]
        if 'data' not in os.listdir():
            os.mkdir('data')
        if self.sub_url not in os.listdir('data'):
            os.mkdir(f'data/{self.sub_url}')

        text_file = f'data/{self.sub_url}/{page}.txt'
        title_file = f'data/{self.sub_url}/{page}.title'
        
        title = ' '.join(response.css('.chapter-title ::text').extract())
        content = '. '.join(response.css('.chapter-c ::text').extract())
        with open(text_file, 'w', encoding='utf-8') as f:
            f.write(content)
        with open(title_file, 'w', encoding='utf-8') as f:
            f.write(title)
        self.log('Saved file %s' % text_file)
```

<h3>Audio Maker</h3>
Tạo audio ta sẽ gọi các api text to speech của google, fpt, microsoft để làm việc này. Công việc sẽ là như sau:
<ul>
 	<li>Đọc các file text, chia thành các đoạn nhỏ</li>
 	<li>Gửi lên lấy cái file audio</li>
 	<li>Gộp thành một file</li>
 	<li>Gộp 10 chương làm một file</li>
 	<li>Chèn nhạc nền (cho hay)</li>
</ul>
ffmpeg sẽ là công cụ giúp bạn công việc này. Vâng đọc đống tài liệu của cái này đau đầu thật. Từ đầu mà đi đọc các bài viết tiếng Việt cho nhanh.
<h3>Image Maker</h3>
Chúng ta sẽ tạo ảnh hàng loạt. Sẽ in các con số của các chương lên. Để tạo video ở phần dưới

Trong python có thư viện pillow. Mình sẽ đưa một ít code demo

```python
def draw_image(start_chapter, end_chapter , path, image_name, font_family, font_size, x, y, color):
    text = f'{start_chapter}-{end_chapter}'
    image = Image.open(path + image_name)
    font_type=ImageFont.truetype(font_family, font_size)
    draw = ImageDraw.Draw(image)
    draw.text(xy=(x, y), text=text, fill=color, font=font_type) #color is tuple
    # image.show()
    if f'chuong-{start_chapter}-{end_chapter}' not in os.listdir(path):
        os.mkdir(f'{path}chuong-{start_chapter}-{end_chapter}')
    image.save(f"{path}chuong-{start_chapter}-{end_chapter}/chuong-{start_chapter}-{end_chapter}.png","PNG")
```

<h3>Video Maker</h3>
Lại là ffmpeg. Chúng ta sẽ ghép audio và image tương ứng làm thành video. Image càng chất lượng việc tạo video càng lâu.
<h3>Video Uploader</h3>
Chúng ta cũng có thể upload hàng loạt video lên youtube. Tài liệu của youtube có hướng dẫn sẵn các bạn tải code mẫu trên đây. Nếu dùng python thì code dành cho python 2 nhé. Mình lại dùng python 3.
<h3>Progress Viewer</h3>
Nãy giờ toàn console, màn hình đen, mình tạo thêm một cái giao diện phục vụ việc theo dõi tiến độ. Mình rất đắn đo là dùng python như Tkinter, QT, ... hay dùng electron. Dùng python thì tiện vì đang code python sẵn, còn electronjs thì có thể tạo giao diện bằng html css. Và rồi mình chọn electronjs cho đẹp :D

<img class="alignnone size-full wp-image-183" src="http://35.196.17.90/blog/wp-content/uploads/2018/12/home.png" alt="" width="890" height="811" />

<img class="alignnone size-full wp-image-184" src="http://35.196.17.90/blog/wp-content/uploads/2018/12/proggressviewer.png" alt="" width="1919" height="1038" />
<h3>Azure VPS</h3>
Nếu treo máy mình thì mình khá sót. Nên mình đăng ký một VPS của bill gate. Treo thoải mái.

&nbsp;
<h3>và kết quả...</h3>
Kết quả là một ngày mình up được tới 99 videos, tương đương với 990 chương truyện. Vì youtube chỉ giới hạn 99 video. Mình không rõ nó là bao nhiêu nhưng có ngày mình up đến video thứ 100 thì báo exceed ... gì đó. Nhưng truyện auto của mình không được quan tâm lắm. Có lẽ cần thời gian.

Nhưng phải có đến ba bốn chục kênh như kênh của bạn mình rồi. Thường là giọng google hoặc microsoft an. Chưa kể có những bạn đọc chay (mình nghĩ cũng kiên nhẫn thật). Máy không thể bằng người được, cũng công bằng phải không :D. Còn đội hình auto còn lại thì cũng rộn ràng không kém. Nhưng vẫn có những người nghe không biết là giọng máy, vẫn cất tiếng chửi rủa giọng này mà đăng lên mạng, đọc không ngắt nghỉ gì cả, đọc chậm thôi ad, ra được có chục phút ra làm gì (cái này do tác giả chưa viết, ra truyện nào bạn mình làm ngay truyện ấy). Cũng có những bình luận tích cực giọng hay, ra tiếp đi ad, ... khá khen cho fpt, microsoft, nhiều người không phân biệt được giọng thật và giọng máy. Cũng có một số giọng mình biết chắc là máy nhưng không biết các bạn ấy làm kiểu gì.
<h2>Kết thúc</h2>

Cám ơn các bạn đã theo dõi.