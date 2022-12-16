Một ngày đẹp trời nào đó, một đứa bạn có hỏi mình rằng à lệnh A, B này chạy như thế nào, t muốn kết quả như thế này này thì bây h phải chạy câu lệnh như thế nào, mài có biết không? Úi dồi ubuntu chứ gì, tra google là xong, cơ mà có nhiều cái không biết nên tra như thế nào?  Gây mất thời gian, do vậy nếu bạn biết được ít nhiều về command trong ubuntu thì nhìn cái biết liền, đỡ mất thời gian, mà còn hãnh diện với các bạn nữ nữa chứ. :grinning::grinning: :v: Cho nên thôi học lấy 20% cái quan trọng và hay gặp nhất ngay nào.

Bạn nào chưa đọc bài trước thì có thể xem tại [đây](https://viblo.asia/p/cac-command-tren-ubuntu-chiem-80-phan-2-Qpmlebdo5rd).

![](https://images.viblo.asia/fc8dcf65-1d7c-4261-b3eb-7f19eaf1f353.jpg)

-----

# wc

Câu lệnh wc cho chúng ta thông tin thống kê về nội dung một file hoặc 1 đầu ra nhận được sau một command nào đó. cú pháp:

```
wc fileName
```

Kết quả của câu lệnh sẽ cho các thông tin lần lượt là: Số dòng | Số từ | số bytes | tên file

![](https://images.viblo.asia/af3a760a-5e50-41f2-8794-8455a8565f06.png)

Như ví dụ trên thông tin ra gồm: 4 dòng | 6 từ | 31 bytes| tên file. Ngoài ra có thể chỉ định các option cho đầu ra:

* Đếm số dòng
```
wc -l test.txt
```
* Đếm số từ
```
wc -w test.txt
```
* Đếm số bytes
```
wc -c test.txt
```

Câu lệnh wc có thể được sử dụng để đếm output đầu ra của các command:

![](https://images.viblo.asia/8fa57446-03a5-4954-9525-dec553be85c2.png)

# grep

Lệnh grep là một công cụ rất hữu ích, khi bạn thành thạo sẽ giúp bạn rất nhiều trong công việc hàng ngày. grep là viết tắt của cụm từ "global regular expression print".

Bạn có thể sử dụng grep để tìm kiếm từ khóa có trong tệp:

![](https://images.viblo.asia/647f155b-8441-4eb8-a9d4-607b87030fc6.png)

Sử dụng option -n để hiển thị số dòng. Hoặc kết hợp với câu lệnh khác để kiểm tra kết quả của câu lệnh đó.

![](https://images.viblo.asia/23d9e884-2df6-4202-a668-87a04dad3982.png)

Nhiều khi xem một dòng nào đó đem đến khá ít thông tin, grep cung cấp option `-C` cho phép hiển thị số dòng trước và sau keyword tìm thấy được.

![](https://images.viblo.asia/8e1e5075-f9c1-48ce-bd35-946534492201.png)

Mặc định, grep sẽ tìm kiếm theo case sensitive - tìm kiếm phân biệt chữ hoa và chữ thường. Sử dụng option `-i`  để tìm kiếm theo insensitive - không phân biệt hoa thường.

![](https://images.viblo.asia/b74ee746-f3d6-4cd0-a3a3-c3ed4443832f.png)

# sort

Giả sử bạn có một tệp chưa thông tin của các con mèo chẳng hạn:

![](https://images.viblo.asia/0a4506bc-7175-4d2f-92a9-dbb26d3a76cb.png)

Sử dụng sort để sắp xếp các cái tên này:

![](https://images.viblo.asia/0905afc0-ffa8-4bc8-8df4-97308484846e.png)

Kết quả sắp xếp được sẽ được hiển thị, còn nội dung file vẫn giữ nguyên, nếu bạn muốn cập nhật thông tin file thì sử dụng thêm `> file`. Sử dụng option `-r` để thu được kết quả ngược lại.

![](https://images.viblo.asia/b8e11984-5f25-418c-9833-348ff10bc42e.png)

sort Không chỉ làm việc với file, sort có thể làm việc với các câu lệnh khác mà đầu ra của các câu lệnh này là một luồng kết quả - pipe. Do vậy, có thể sử dụng sort để sắp xếp kết quả đầu ra của 1 câu lệnh khác. Ví dụ: `ls`

![](https://images.viblo.asia/4fb61367-a86b-4dde-beb6-c40458aff2cf.png)

# uniq

uniq là một lệnh hữu ích để cắt bỏ các dòng trùng lặp một tệp hoặc kết quả của một lệnh khác. Tuy nhiên khi sử dụng mặc định thì nó chỉ có thể xóa đưuọc các dòng trùng nhau liền kề.

![](https://images.viblo.asia/d78e10e3-1b85-4083-a2aa-5727ab65543a.png)

Với câu lệnh sort có thể sử dụng option `-u` hoặc kết hợp với uniq để xóa bỏ tất cả các dòng trùng lặp:

![](https://images.viblo.asia/3f9f03e5-b821-4b76-970a-e741a97a6bc2.png)

Sử dụng option `-d` để chỉ hiển thị những dòng trùng lặp:

![](https://images.viblo.asia/61f8f92b-4f47-41ad-ae45-d269003331ca.png)

Sử dụng option `-u` để chỉ hiển thị những dòng không trùng lặp:

![](https://images.viblo.asia/dc999241-e2ab-44f3-92be-efdee68d7bbb.png)

Sử dụng option `-c` để đếm xem các dòng trùng lặp bao nhiêu:

![](https://images.viblo.asia/caa5e6bf-87ef-4d40-8a5b-7b853696f779.png)

# diff

diff là một lệnh tiện dụng. Giả sử bạn có 2 tệp, chứa thông tin gần như giống nhau, nhưng bạn không thể tìm thấy sự khác biệt giữa hai tệp. diff sẽ so sánh 2 têp và tìm ra những điểm khác nhau:

![](https://images.viblo.asia/5f4835fe-5d6f-46a2-9493-5a7a034e8bd7.png)

Sử dụng option -y để compare từng dòng của 2 file:

![](https://images.viblo.asia/943109c3-8487-44b6-9e9d-82ccfadb8458.png)

# echo

echo cho phép in ra màn hình đối số được truyền vào câu lệnh.

```
echo "hello"
```

Để thêm text vào 1 file sử dụng câu lệnh sau:

```
echo "hello" >> output.txt
```

Để ghi đè text vào 1 file sử dụng câu lệnh sau:

```
echo "hello" > output.txt
```

Truyền biến vào kết quả:

![](https://images.viblo.asia/37c219bb-0f80-4355-9f6b-5b183f404c2c.png)

Bạn có thể thực hiện một câu lệnh nào đó rồi in ra kết quả của câu lệnh đó:

![](https://images.viblo.asia/ca60819a-345e-4af0-a303-bd6762186569.png)

![](https://images.viblo.asia/ba52b5e2-9aba-4d6e-96ed-d163bf7e52d1.png)

-----

Done. Đây là phần 3 nhé. Mình sẽ back lại chuỗi bài này sau. Các bạn đón đọc phần 4 [link](https://viblo.asia/p/cac-command-tren-ubuntu-chiem-80-phan-4-QpmleNnr5rd) ở đây. Cảm ơn mọi người đã quan tâm.