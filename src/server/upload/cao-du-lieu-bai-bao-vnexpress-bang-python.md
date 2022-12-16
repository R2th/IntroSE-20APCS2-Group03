Để thực hiện các bài toán xử lý ngôn ngữ tự nhiên cho tiếng Việt như phân loại bài báo, huấn luyện word embedding, mô hình ngôn ngữ, ... trước tiên cần phải có bộ ngữ liệu tiếng Việt. Việc này thường được thực hiện tự động vì sẽ tốn nhiều thời gian nếu bạn cào dữ liệu thủ công nhất là khi dữ liệu để huấn luyện mô hình học sâu thường rất lớn. Khi đó chúng ta cần những công cụ thu thập dữ liệu tự động.

Trong bài viết này, mình muốn chia sẻ các bạn chương trình cào dữ liệu trang báo Tiếng Việt hàng đầu [VNExpress](https://vnexpress.net/) được viết bằng ngôn ngữ Python.  

![Unsplash image](https://images.unsplash.com/photo-1546422904-90eab23c3d7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80)
*<div align="center">Nguồn: Unsplash</div>*

Bài viết này gồm 4 phần:
- Giới thiệu về ứng dụng
- Hướng dẫn sử dụng
- Một số lưu ý
- Lời kết

Toàn bộ mã nguồn bạn có thể xem ở repo sau: https://github.com/egliette/VNExpressCrawler

# 1. Giới thiệu

Chương trình của mình sử dụng thư viện web scrapping rất phổ biến [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) lấy dữ liệu văn bản của trang web bằng URL. Với mỗi bài báo, mình sẽ lần lượt cào 3 phần văn bản là tiêu đề, mô tả và nội dung như minh họa sau:
![VNExpress contents](https://i.imgur.com/Nv4OvEY.png)
*<div align="center">Các đoạn văn bản cần cào</div>*

Tại đây mình hỗ trợ hai cách cào dữ liệu:
- **Cào dựa trên các URL cho trước:** bạn liệt kê url các bài báo vào một file txt sau đó gọi đường dẫn file (mặc định là `urls.txt`) khi chạy chương trình theo hướng dẫn.
![URLs crawling example](https://i.imgur.com/AszXhAG.png)
*<div align="center">File trên: danh sách đường dẫn cần cào, File dưới: nội dung cào được từ đường dẫn đầu tiên</div>*

- **Cào dựa trên thể loại bài báo:** thay vì liệt kê cụ thể, bạn có thể nhập thể loại của các bài báo cần thu thập để chương trình tự động tìm các URL liên quan và lấy dữ liệu như cách trên. Hiện tại mình hỗ trợ cào 11 thể loại bài báo sau:
```bash 
thoi-su
du-lich
the-gioi
kinh-doanh
khoa-hoc
giai-tri
the-thao
phap-luat
giao-duc
suc-khoe
doi-song
```

# 2. Hướng dẫn sử dụng

## 2.1. Cài đặt

Đầu tiên bạn cần clone repo của mình:
```
git clone https://github.com/egliette/VNExpressCrawler.git
```
Sau đó vào thư mục vừa clone, cài đặt và khởi động môi trường ảo để tải các package cần thiết. Lưu ý phiên bản Python mình dùng để cài đặt là 3.10.7.
```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```
Đến bước này, bạn có thể cào dữ liệu theo hai cách mình vừa giới thiệu trên.

## 2.2. Sử dụng URL cho trước

Đầu tiên bạn điền vào file txt các URL bài báo cần thu thập dữ liệu sao cho mỗi dòng một URL. Sau đó chạy lệnh:
```
python urls_crawler.py --input [URLS_FPATH] --output [OUTPUT_DPATH]
```
Với
- `[URLS_FPATH]`: là đường dẫn tới file txt chứa URL của bạn (mặc định là `url.txt`).
- `[OUTPUT_DPATH]`: đường dẫn tới folder chứa các file txt chứa nội dung của các bài báo thu thập thành công (mặc định là `data`).

Kết quả thu được giống như ví dụ mình vừa mô tả ở trên.

## 2.3. Sử dụng thể loại bài báo

Chương trình hỗ trợ cào một thể loại trong một lần hoặc tất cả các thể loại trong một lần. Vì trước tiên cần phải lấy được các đường dẫn của các bài báo thuộc danh mục cần thu thập, chương trình cần phải duyệt từng trang thuộc danh mục đó để tìm URL các bài báo sau đó mới thực hiện cào nội dung. Tại thời điểm mình viết bài, VNExpress cung cấp tối đa 20 trang cho mỗi danh mục, nếu bạn tìm quá số trang thì sẽ được đưa đến [trang tìm kiếm](https://timkiem.vnexpress.net/).

![VNExpress page number](https://i.imgur.com/gXS26FU.png)
*<div align="center">Một danh mục báo bao gồm nhiều trang</div>*

Do đó bạn cần cung cấp thể loại cần thu thập và số lượng trang cần cào để thực hiện thao tác này.

**Một loại trong một lần**
Bạn chạy dòng lệnh sau:
```
python types_crawler.py --type [ARTICLE_TYPE] --pages [TOTAL_PAGES] --output [OUTPUT_DPATH]

```
Với:
- `[ARTICLE_TYPE]`: là tên danh mục bài báo cần cào thuộc 11 loại mình liệt kê ở trên (mặc định là `du-lich`).
- `[TOTAL_PAGES]`: số lượng trang thuộc danh mục cần thu thập (mặc định là 1).
- `[OUTPUT_DPATH]`: đường dẫn đến folder chứa kết quả (mặc định là `data`).

Sau khi chạy xong, trong thư mục `[OUTPUT_DPATH]` sẽ sinh hai thư mục con:
- `urls`: chứa file txt chứa các URL thu thập thành công.
- `results`: chứa folder tên tương ứng với thể loại bạn vừa nhập. Bên trong folder đó là danh sách các file txt chứa nội dung của các bài báo được cào thành công.
 
**Tất cả thể loại trong một lần**
Khi đó bạn không cần cung cấp tên thể loại mà chỉ cần gọi flag `--all`
```
python types_crawler.py --all --pages [TOTAL_PAGES] --output [OUTPUT_DPATH]
```

Các giá trị còn lại thì ý nghĩa tương tự như cào một loại. Tương tự với kết quả ngoại trừ trong hai thư mục con gồm tất cả các loại. Quá trình này khá lâu nên bạn có thể treo máy và đi pha một ly cà phê ☕.

# 3. Một số lưu ý

Không phải lúc nào việc cào cũng thành công, vì mình lấy thông tin dựa trên class và tag html nên nếu trang cần cào không chứa các class hoặc tag mà mình đã cài đặt cứng từ trước thì sẽ không thu thập được hoặc chỉ một phần nhỏ. Ví dụ như một số bài báo dưới dạng video sẽ có class hoặc tag khác đối với các phần chủ đề, mô tả và nội dung
![VNExpress video](https://i.imgur.com/dHzaSFI.jpg)
*<div align="center">Bài báo dạng video</div>*

Mình cũng có ghi lại danh sách các URL cào không thành công dưới dạng kết quả trả về của các hàm  thu thập. Nếu bạn nào có nhu cầu xem các URL lỗi thì có thể sử dụng hoặc thay đổi mã nguồn.

Và ngoài ra còn có format của URL số trang theo danh mục mình cũng nhập cứng theo công thức
```
https://vnexpress.net/[TYPE]-p[PAGE_NUMBER]
```
Với `[TYPE]` là danh mục và `[PAGE_NUMBER]` là số trang. Ví dụ như:
```
https://vnexpress.net/the-gioi-p2
```
Nên trong tương lai, nếu VNExpress có thay đổi các thành phần trên thì có thể chương trình không hoạt động. Lúc đó mong các bạn vui lòng thông báo cho mình trong mục Issues của repo để mình có thể cập nhật nhanh chóng.

# 4. Lời kết

Để tiết kiệm thời gian chạy chương trình hoặc phòng trường hợp mình vừa nêu trên, mình đã cào tất cả các thể loại trên với mỗi thể loại 20 trang mà bạn có thể tải tại [link drive này](https://drive.google.com/file/d/1zgS3nldOGW90QKgumNtbarScqtycTLsz/view).

Mong chương trình của mình hữu ích cho các bạn.