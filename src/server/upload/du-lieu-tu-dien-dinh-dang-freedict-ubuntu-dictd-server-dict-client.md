Từ điển tiếng việt
==================

Giới thiệu
----------

Tôi đang định thử làm mô hình seq2seq dịch. Và đang tìm dữ liệu. Dữ liệu từ điển là nguồn tôi nghĩ đến đầu tiên.

Hôm nay chúng ta sẽ cùng làm từ điển tiếng việt:

Tải và giải nén dữ liệu từ điển Hồ Ngọc Đức
-------------------------------------------

Tải về tại trang web sau: [Từ điển Hồ Ngọc Đức](https://www.informatik.uni-leipzig.de/~duc/Dict/install.html)  
và giải nén tất cả

**Backup data:** [Backup Từ điển Hồ Ngọc Đức](https://drive.google.com/drive/folders/10Jt9pfJd7ulC2Wrp2RHTqulKaQxJmTrL?usp=sharing)

### Note

Tôi đã thử tải từ điển Việt-Việt nhưng chỉ có 30k từ, 30k từ là rất nhỏ, nhiều từ tra sẽ không thấy được. Tuy nhiên định dạng freedict là rất phổ biến, chúng ta cứ dùng bộ dữ liệu này để demo trước, nếu chúng ta có dữ liệu lớn hơn thì chỉ việc làm như bài viết này.

Sử dụng ubuntu, Cài đặt dictd, cấu hình từ điển và test thử
-----------------------------------------------------------

### Note

Để sử dụng bộ dữ liệu trên ta cần một server dictd và client dict. Có nhiều phần mềm với giao diện đồ họa khác nhưng ở đây chúng ta không quan tâm đến. Tôi sẽ cài dictd và dict trên ubuntu.

Để cài đặt ứng dụng dict trên ubuntu chúng ta dùng lệnh sau:

```bash
    sudo apt install dict # Cài đặt dict
 
    sudo dictd # Khởi chạy

    dict -D # Để xem danh sách từ điển đã được cài đặt

    ps -A | grep dictd # Để xem dictd đã được chạy hay chưa


```
                    

### Tiến hành cấu hình dictd, thêm dữ liệu của chúng ta vào

/etc/dictd/dictd.conf

```text
# /etc/dictd/dictd.conf
...
database hnd_ev
{
    data /home/luantm/Windows/Workshop/HoNgocDucDictionary/data/data/EV/anhviet109K.dict.dz
    index /home/luantm/Windows/Workshop/HoNgocDucDictionary/data/data/EV/anhviet109K.index
}
...
```    
                            
                        

### Sử dụng

 ```bash
 dict -d hnd_ev "hello"
 ```
 
 ```text
  
1 definition found

From @00-database-short [hnd_ev]:

@hello /hə'lou/ (halloa) /hə'lou/ (hello) /'he'lou/
*  thán từ
- chào anh!, chào chị!
- này, này
- ô này! (tỏ ý ngạc nhiên)
*  danh từ
- tiếng chào
- tiếng gọi "này, này" !
- tiếng kêu ô này "! (tỏ ý ngạc nhiên)
*  nội động từ
- chào
- gọi "này, này"
- kêu "ô này" (tỏ ý ngạc nhiên)
 ```
                        

### Ứng dụng

Từ đây chúng ta có thể tạo web api phục vụ từ điển cho web, mobile.  
Hoặc là dữ liệu đầu vào để phát triển xử lý ngôn ngữ tự nhiên

Chúc các bạn thành công  
Truy cập trang gốc: [Từ điển](https://taminhluan.com/study/nlp/02_tu_dien_implicit).  
Nếu bạn có dữ liệu, thông tin, hay câu hỏi thì có thể bình luận vào phía bên dưới.