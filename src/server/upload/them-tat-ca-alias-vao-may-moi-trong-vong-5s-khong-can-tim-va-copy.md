Bài toàn gặp phải. 
Mình làm việc với khá nhiều server linux, mỗi khi sang 1 máy mới, mình lại phải đi tìm dánh sách file alias rồi copy vào .bashrc. 
Rất mất thời gian, mỗi khi bổ sung thêm alias mới vào, lại phải bổ sung vào tất cả các server, như vậy rất mất thời gian.

Để giải quyết vấn đề đó.
1. Quản lý các alias vào 1 repos trên gist của mình là gist [này](https://gist.github.com/ledangtuanbk/f0128bf06ef89bcff859f78ca9c5b65d). Mình tạo public gist để chia sẻ cho mọi người, tất cả mọi ng đều có quyền down về.
2. Khi vào máy mới, dùng wget down về, thêm vào bashrc, reload lại bashrc


Bước 1. Rõ là nhớ link dài thế kia là không thể, mỗi khi thay đổi gist lại sinh ra 1 link mới. -> Mình lấy link raw cho file của mình. f0128bf06ef89bcff859f78ca9c5b65d là giá trịnh trên url của gist 
```
https://gist.githubusercontent.com/ledangtuanbk/f0128bf06ef89bcff859f78ca9c5b65d/raw/linux
```
Link vẫn dài và khó nhớ. 
Mình vào bit.ly tạo short link của riêng mình. Mỗi người có thể chọn riêng link để dễ nhớ
```
https://bit.ly/ldtunix
```
Đây là bước chuẩn bị nên mất nhiều thời gian, đối với các máy mới chỉ cần chạy từ bước 2
Bước 2. Vào tải file về, thêm vào bash, reload bash là xong -> 5s
```
wget bit.ly/ldtunix -O ~/.alias
echo '. ~/.alias' >> ~/.bashrc
. ~/.bashrc
```

Ưu điểm: không cần chuyển cửa sổ, không cần copy trên UI của các editor khác. Mình vẫn làm việc với cửa sổ terminal hiện tại.
Nếu muốn thêm alias vào gist để sửa, copy đề, reload lại là xong.

Cảm ơn đã đọc bài, nếu có câu hỏi cần trao đổi, hãy comment ở dưới.