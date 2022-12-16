> Bug do mình thì tìm nhanh và đơn giản! (hoặc không :v)
> 
> Bug do người khác thì tìm chả đơn giản mà fix cũng chả nhanh.. (hoặc không :v)
> 

### Các vấn đề khi fix bugs:

* Lỗi ở đâu ta?
* Sửa đây hỏng đâu không?
* Sửa chỗ này ok không hay nên sửa chỗ khác?

Ở bài này thì chúng ta sẽ đi sâu vào 1 kĩ thuật để tìm lỗi mà thôi, vì gần công đoạn này ngồi mò đã rất khổ rồi, các level thốn nó xếp dần như sau:
1. Thốn nhẹ: đọc error message ko hiểu mô tê gì, nhưng người code ra bug vẫn ở đó và support ta.
2. Thốn vãi: cảnh đó người đâu, giờ chỉ còn mình ta và đống code.
3. Thốn cực thốn: đây là legacy codebase, logic thì oẳn tà là vằn, flow code chạy loạn xị ngậu, và méo có test.

### Hướng giải pháp:

Thay vì mò mẫm theo file trong source code, ta có thể rà soát theo lịch sử. Ý tưởng khá đơn giản, checkout về các commit cũ, rồi test thử, nếu tọi ở commit nào thì debug ở commit đó là được.

Tuy nhiên, đôi khi việc mò từng commit có thể còn lâu hơn là việc mò mẫm trong code...

Vì vậy, ta cần ~~giải pháp~~ cách mò commit khác!

### Tản mạn về binary search:

Ôn lại chút bài cũ: binary search là công cụ tìm kiếm cực kì hữu hiệu cho danh sách đã được sắp xếp sẵn. Dí dụ:

```
cho 1 list: [1, 2, 3, .... 100]
cho 1 số ?
luật chơi: ta sẽ đoán cho bao giờ tìm đc ẩn số, nếu số ta đoán nhỏ hơn số cần tìm, máy sẽ báo "nhỏ hơn", và ngược lại.

Cách phổ thông nhất là đoán từng số 1:
Ta: 1?
Máy: nhỏ hơn

Ta: 2?
Máy: nhỏ hơn

...

Như vậy, đoán kiểu này thì trường hợp tồi tệ nhất là ta phải đoán 100 lần...
Và nó cũng méo khả thi nếu danh sách tăng lên tận 1000, 100000, ... phần tử.

Cách dùng binary search, ta sẽ đoán số ở giữa, giả sử ẩn số là 69, nếu đoán như trên thì mất 69 lần đoán, nhưng với kiểu mới:
Ta: 50?
Máy: nhỏ hơn => vậy éo thể là từ 0 => 50 rồi

Ta: 75
Máy: lớn hơn => vậy thì cũng chả phải từ 75-100 rồi

Ta: 62
Máy: nhỏ hơn => vậy chỉ có thể trong khoảng từ 62 - 75 thôi
...

Như vậy, với danh sách gồm 1000 phần tử, ta có thể loại bỏ 500 trường hợp chỉ trong 1 lần đoán!
```

Túm váy lại, binary search có công thức Big Oh là log2, tức:
- với 100 phần từ ta đoán tối đa tầm 7 lần
- với 1000 phần tử ta đoán tối đa tầm 10 lần!
- với 10000 phần tử ta đoán tối đa tầm 14 lần!!!!!

### Lighting debug:

Mọi yếu tố đều đã đầy đủ, ta có 1 danh sách đã được sắp xếp sẵn (các commit được sắp xếp theo lịch sử thời gian), ta có thể đoán (test thử xem bug hay không). Nên, ta có thể xài binary search!

```
fe72714 buggy
d5948fd buggy
6e61c4e buggy
4967f76 buggy
abcf7bc buggy
80b0e40 buggy
ef34f21 buggy
61c87dd buggy
3f17f1e buggy   ===> thủ phạm ở đây!
0dafa78 healthy
a5ee96d healthy
d1f574a healthy  ===> cái này từ lâu lâu r, méo có bug, lấy làm mốc

1. test thằng 80b0e40 => buggy => trừ 80b0e40 thì tất cả commit bên trên vô tội!
2. test thằng 3f17f1e => buggy => từ 3f17f1 ethì tất cả commit bên trên vô tội!
3. test thằng 0dafa78 => héo thì => ồ, chính là 3f17f1
=> 3 step! (hoặc 4 nếu ta chọn a5ee96d ở bước 3)
```

### Git bisect:

Thực tế là git có tính năng này rồi, thay vì tự ngồi checkout thủ công thì ta có thể chạy lệnh này để nó checkout tự động (cơ mà test thì tất nhiên vẫn phải là tự túc, trừ phi ta có 1 cái test suite để chạy thì khỏi phải test tay, gõ lệnh và đi pha cà phê về thấy commit bug thôi :v)

Có một cái document ở đây: https://git-scm.com/docs/git-bisect

Và có một cái tutorial ở đó: https://thoughtbot.com/blog/git-bisect

### Kết luận:

Ý tưởng thì khá hay ho nhưng đòi hỏi git flow chỉnh chu, commit nghìn dòng thì cũng bó tay chịu trận.
Cảm ơn các bạn đã theo dõi!