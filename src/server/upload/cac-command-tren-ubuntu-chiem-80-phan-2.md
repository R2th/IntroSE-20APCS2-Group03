Trong ngành công nghệ thông tin hiện nay, kĩ năng công nghệ, kĩ thuật tìm hiểu và học hỏi là một phần gọi là basic nhất với mọi dev. Trong đó kĩ năng tìm kiếm và học hỏi là không thể thiếu rồi, ae có công nhận không. Nên không ít người từ các chuyên ngành khác nhờ sự tìm hiểu và học hỏi có thể to dev, to PM, bla bla.... và ngược lại ae dev ta nếu có khả năng tìm hiểu và học hỏi chuyên ngành của họ thì cũng có thể to HR, to vân vân, to mây mây, tùy theo động lực của mình. Cơ mà nhìn chung là nếu mình to HR thì khả năng cũng không bì được với mấy bạn HR được, giống như việc 1 ông bác sĩ răng to bác sĩ bó bột vẫn còn hơn người không biết gì to bác sĩ. Ae công nhận không :rofl::rofl::rofl:.

Với kĩ năng tìm kiếm và học hỏi thì chắc là có những việc tôi và bạn cứ nghĩ là ừ thì thì đến lúc đó thì search làm gì mà căng. Nhưng không, thế là chưa đủ, có những cái khó search vô cùng, hoặc là chưa biết keyword nhưng mà đến lúc cần mà đi search thì hơi mệt nha, nên có những cái nên được học hỏi dần, tích lũy dần, lớn lên từng ngày để đến khi lúc cần thì chỉ việc mang ra chiến thôi. Không cần phải hỏi là cái này có chưa, có cần làm mới không, hay làm bằng  .... cơm. Ví du như việc tìm kiếm 1 tệp nào đó trong 1 thư mục nào đó, của 1 thư mục nào đó trong 1 danh sách các thư mục.... làm bằng cơm tìm từng thư mục thì mệt nha, nhưng nếu biết find command (như ví dụ bài trước link [ở đây](https://viblo.asia/p/cac-command-tren-ubuntu-chiem-80-phan-1-Eb85oL0WK2G)) thì mọi chuyện có vẻ ngon rồi nha, run cái là xong. À bạn nào chưa xem thì có thể theo dõi seri này link [ở đây](https://viblo.asia/s/command-tren-ubuntu-z45bx8x6ZxY) nha. :scream::scream::scream::scream:

Nào tiếp tục vào vấn đề chính nha ae. Start.


-----

### ln

ln commad là một câu lệnh hệ thống của Linux, nó được sử dụng để tạo link. What's the link? Tạo link java antivirut á?

Hong nha, link này có thể coi là 1 điểm truy cập, 1 đường dẫn để truy cập nhanh đến 1 file khác. Tương tự với Windows shortcuts. Có 2 loại link là hard links và soft links.

### Hard links

Cái này thì hiếm khi được sử dụng, hạn chế của link này là không thể tạo link đến các thư mục và cũng không thể link đến các external filesystem (disks). Cú pháp:

```
ln <original> <link>
```

Một điểm nữa là 1 file được tạo ra không biết được đã từng lấy từ ở đâu. Nó như một bản copy hơn, nội dung không khác gì bản gốc.

![](https://images.viblo.asia/dee7407e-de49-4745-9d7b-42357ad7bd7a.png)

Nhưng nếu bạn chỉnh sửa bất kì file nào thì nội dung sẽ được cập nhật ở cả 2 file luôn.

![](https://images.viblo.asia/5892733e-9080-490e-baae-57b9c722e7df.png)

Nếu xóa file gốc, thì nội dung file link không ảnh hưởng vẫn tồn tại.

![](https://images.viblo.asia/c79f5c64-2d2f-4956-955c-cd4b37a25e0c.png)

### Soft links

soft link thì khác, nó có thể link các filesystem và các thư mục nhưng khi các file nguồn mà bị xóa thì link cũng bị hỏng. Cú pháp:

```
ln -s <original> <link>
```

![](https://images.viblo.asia/6d81bfb9-76ca-4090-a9d1-fcf72c93bd70.png)

### gzip

Bạn có thể sử dụng gzip để nén một file với protocol tên là [LZ77](https://en.wikipedia.org/wiki/LZ77_and_LZ78). Cú pháp:

```
gzip filename

gzip -c filename > filename.gz
```

Nếu với câu lệnh đầu tiên thì khi nén xong nó sẽ xóa file gốc, khi Với option -c nó sẽ nén tệp và thêm đuôi .gz và không xóa tệp gốc.

![](https://images.viblo.asia/df720140-5d43-4689-b3f4-0801184fac32.png)

Với gzip có một vài level nén khác nhau, Có các cấp độ từ 1 (nhanh nhất, nén tệ nhất) đến 9 (chậm nhất, nén tốt nhất). và mặc định nếu không chỉ định sẽ là 6. Cái level này chỉ thực sự dùng đến khi phải nén 1 tệp rất nặng khi phải đắn đo nén tốt với thời gian nhanh cái nào ngon hơn. Cú pháp:

```
gzip -level filename
```

Có thể nén nhiều file cùng lúc:

```
gzip filename1 filename2
```

Có thể nén tất cả các file trong một thư mục:

```
gzip -r a_folder
```

Sử dụng thêm option -kv để hiển thị phần trăm nén được.

gzip cũng có thể sử dụng để giải nén 1 file, sử dụng option -d:

```
gzip -d filename.gz
```

### tar

tar command được sử dụng để tạo một kho, nơi chứa nhiều file (kiểu như thư mục chứa nhiều files). Cú pháp:

```
tar -cf archive.tar file1 file2
```

option c - create, f option được sử dụng để tạo kho.

Để extract sử dụng cmd sau, với x là extract:

```
tar -xf archive.tar
```

tar thường được sử dụng để tạo một kho nén (tạo 1 kho rồi nén lai) bằng 1 cmd:

```
tar -czf archive.tar.gz file1 file2
```

Và để unzip thì dùng gunzip rồi extract nó ra, nhưng với -xf nó sẽ làm mọi thứ luôn:

```
tar -xf archive.tar.gz
```

### alias

Trước khi đi tìm hiểu alias, chúng ta đi qua ví dụ sau: ví dụ với ls command mặc định nó sẽ in ra 1 tên file, và nếu sử dụng option -al thì nó hiển thị tất cả thông tin của các file.

![](https://images.viblo.asia/1e85ffe0-2673-4b1e-b1df-86d8861cdf51.png)

Cũng không mất công lắm nhỉ, thêm option `-al` thôi nên không vẫn đề chi. Nhưng bạn có thể tạo ra cmd mới tên là `ll` là hợp lại của `ls -al` (chữ đầu và chữ cuối) để gõ cho tiện và nhanh. Và nếu là câu lệnh sau: `git show --pretty=short --show-signature` thì gõ vất nhỉ. Vậy có cách nào để gõ nhanh không. Có đó chính là alias. Cú pháp:

```
alias ll='ls -al'
```

Nhưng khi gõ câu lệnh này thì nó chỉ hoạt động trong phiên của terminal thôi nếu tắt máy hoặc sang user khác thì mất. Nên để sử dụng đặt cái này trong các file: ~/.bashrc or ~/.profile or ~/.bash_profile.

Để xem các alias có sẵn sử dụng: `alias`

### cat

Tương tự như `tail` để view nội dung của file, ngoại trừ `cat` có thể thêm vào nội dung của file. 

```
cat file1
cat file1 file2 > file3
cat file1 file2 >> file3
```

Để thêm thông tin về số dòng sử dụng option -n:

```
cat -n file1
```

![](https://images.viblo.asia/144b11f8-3b52-4837-855b-705e987126ee.png)

Tip: sử dụng kèm câu lệnh khác.

![](https://images.viblo.asia/00af10c3-b83f-4e7d-857f-6e23edf92ccb.png)

###  tail

Tương tự như `cat` để view nội dung của file, tuy nhiên `tail` không thể thêm được nội dung và có thể xem được nội dung của file ngay khi file thay đổi (realtime), sử dụng để xem log. Cú pháp sử dụng phổ biến:

```
tail -f /var/log/system.log
```

Có thể show 10 dòng cuối cùng

```
tail -n 10 <filename>
```

### less

Đây là 1 cmd tôi sử dụng rất ít, hầu như không sử dụng đến vì có những cái khác quen thuộc hơn và dễ dung hơn nhiều là nước tẩy vim và vật liệu nano (vi - nano). Show nội dung file interactive UI. Cú pháp:

```
less <filename>
```

Sử dụng:

* `q` - quit
* `up` - lên trên, down xuống dưới, sang `trái phải`
* đi xuống dòng cuối bằng `G`, top bằng `g`
* search `/keyword` or `?keyword` enter
* edit - `v`

Giống vim :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

-----

Done. Đây là phần 2 nhé. Mình sẽ back lại chuỗi bài này sau. Các bạn đón đọc phần 3 link ở đây. Cảm ơn mọi người đã quan tâm.