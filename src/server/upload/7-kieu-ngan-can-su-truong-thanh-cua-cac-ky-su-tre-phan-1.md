![](https://images.viblo.asia/7f19be32-0d7c-42bd-8181-2fa4beff0356.jpg)


(Bài viết này được dịch từ bài viết của tác giả Isekawa.

Nguồn: https://qiita.com/Akira-Isegawa/items/45eaceb6c4c4cb7ef70d).

Hôm nay tôi xin tóm tắt lại những chia sẻ trước đây của tôi về chủ đề “Những căn bệnh mà kỹ sư từ năm 2 ~ năm 5 dễ mắc phải và cách phòng tránh”.
Những bạn kỹ sư trẻ, nhất định đừng lặp lại những thất bại kiểu này, hãy sống tốt lứa tuối 20 nhé.

# 1, Bệnh phụ thuộc Google
Đây là căn bệnh do thời hiện đại - nơi mà cái gì cũng có thể tìm thấy trên Google- sinh ra.

## Triệu chứng:
* Nếu tìm error log trên Google mà không thấy là nghĩ ngay rằng không có cách giải quyết
* Khi muốn làm một thứ mới, nếu không thấy ghi chép về cách thực hiện trên Google thì nghĩ ngay là không thể thực hiện
## Cách phòng tránh:
* Google không thạo tiếng Nhật nên hãy tìm kiếm bằng tiếng Anh
* Còn rất nhiều phương pháp giải quyết mà không thể tìm ra trên Google. Cách trước nay mà người ra vẫn làm là hiểu kỹ error message rồi dùng logic chạy thử để tìm ra cách giải quyết.


# 2, Bệnh có thể làm ngay, cái gì cũng làm được
Đây là căn bệnh mà những người đã làm được việc, người có một chút kiến thức dễ mắc phải.

### Triệu chứng:
* Khi xét thấy có thể thực hiện được trên design lý thuyết là thỏa mãn luôn
* Hoặc hiểu nhầm rằng là mình thì có thể làm ngay được
### Cách phòng tránh:
* System là thế giới của logic nên nếu có data, có kết nối network thì nói chung cái gì cũng có thể thực hiện được trên lý thuyết. Tuy nhiên, dù về mặt logic có thể thực hiện được nhưng không có nghĩa là khả thi về mặt chi phí.
* Vậy nên hầu hết các trường hợp nghĩ rằng "nếu là tôi thì có thể làm được", "nếu cố gắng thì sẽ làm được" đều nhầm lẫn. Khi tự mình làm thử chắc chắn sẽ xuất hiện những phần không suôn sẻ. 
* Cảm giác mình có thể làm được là cái chỉ có thể có được khi tự thân vận động thử làm thực tế. Bằng cách tự làm, gặp vướng mắc rồi giải quyết nó bạn sẽ có được thực lực.
* Triệu chứng này không chỉ có ở những bạn năm 2 mà còn có thể nhìn thấy ở tầng lớp manager - những người đã không còn liên quan đến code. Với những người như thế thì hãy cho đọc bài viết này để nhắc họ rằng: sau tất cả thực lực hiện giờ của họ chỉ ở mức năm 2 mà thôi.

# 3, Bệnh phụ thuộc open sourse/library
Chứng bệnh sinh ra do thời đại tiện nghi chỉ cần sử dụng library trong open source hay kết hợp các API trong đó là có thể thực hiện hầu hết mọi thứ.

## Triệu chứng
* Phụ thuộc vào library trong open sourse, nghĩ rằng những cái library không làm được thì không thể thực hiện.
* Khi phát hiện thấy bug có nguyên nhân từ library của open sourse đang sử dụng thì chốt là do lỗi của library nên không thể xử lý.

## Cách phòng tránh
* Phải nhận thức được rằng dù là library chưa đối ứng nhưng không có nghĩa không thể thực hiện được.
* Cân nhắc xem nếu không dùng library thì làm cách nào để thực hiện, chi phí thực hiện sẽ vào khoảng bao nhiêu, làm sao để ko gây conflict với library sẵn có.
* Nếu chi phí thực hiện thấp thì bỏ đó library đi rồi viết lại cũng được.
* Nếu chi phí thực hiện cao thì thử sửa rồi đưa pull request. Nếu pull request rồi mà vẫn không có phản ứng thì thay thế sang một library khác.

(phần 2: https://viblo.asia/p/7-kieu-ngan-can-su-truong-thanh-cua-cac-ky-su-tre-phan-2-yMnKM1JNK7P)