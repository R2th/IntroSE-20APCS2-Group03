Bước đầu tiên trong bài toán `custom object detection` là thu thập ảnh, các ảnh thường được lấy trên mạng. Khi download các file ảnh trên mạng tên của các ảnh không được được đánh số thứ tự, tên dài ngắn khác nhau. Điều này gây khó khăn trong việc đếm số ảnh cũng như theo dõi sau này. Mình sẽ thực hiện đánh số các ảnh download về, loại bỏ các ảnh lỗi có size = 0. Nếu download đồng loạt các ảnh về, việc lẫn vào trong đó một số ảnh có nội dung không phù hợp là điều không thể tránh khỏi (do thuật toán tìm kiếm của Google). Để loại bỏ nó có thể phải đi mở từng ảnh để loại bỏ, hoặc trong quá trình gán nhãn có thể loại bỏ nó. Nếu số lượng ảnh quá nhiều việc làm trên có thể tốn nhiều thời gian.

Dưới đây là code copy ảnh từ thư mục `SOURCE` sang thư mục `DESTINATION` với định dạng file ảnh mới là `FORMAT`
```python
def sort_images(SOURCE, DESTINATION, FORMAT):
    Paths = paths.list_images(SOURCE)
    new_Paths = []

    for path in Paths:
        if os.path.getsize(path) > 0:
            new_Paths.append(path)
    
    i = 1
    for path in new_Paths:
        filename = "image" + "_" + format(i, "0>5d") + FORMAT
        destination = os.path.sep.join([DESTINATION , filename])
        shutil.copyfile(path, destination)
        i += 1
```
Sau khi thực hiện tất cả ảnh sẽ được lưu vào thư mục `DESTINATION` với cùng một định dạng. Tên file được đánh số từ 1 trở đi. Việc này tuy đơn giản nhưng là một thực hành tốt trong quá trình tiền xử lý ảnh giúp cho project của chúng ta được gọn gàng hơn.

Trên đây mình đã chia sẻ với các bạn cách đánh số ảnh theo thứ tự. Các bạn có thể xem thêm bản demo chi tiết ở [huytranvan2010](https://github.com/huytranvan2010/Script-to-sort-images)