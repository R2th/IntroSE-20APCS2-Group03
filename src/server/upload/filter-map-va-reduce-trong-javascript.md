# Giới thiệu
Hello các bạn, lại là mình đây, tháng này mình có dịp được tham gia vào dự án Front end và được tiếp xúc nhiều hơn với JavaScript. Công nhận đây quả là một thứ khó nhằn khi mà debug và phát hiện lỗi khó hơn hẳn các ngôn ngữ khác, bản thân mình thấy nó khá lú :D
Sau một thời gian đắp mình làm Front end trong team dự án, mình thấy có 3 hàm khá hữu dụng mà đơn giản để thao tác với mảng được tiện dụng và nhanh chóng hơn, đó chính là Filter, Map và Reduce.
# Filter
* Đúng như tên gọi của nó, filter là hàm giúp lọc ra kết quả từ một mảng thỏa mãn điều kiện cho trước tương ứng
* Khá dễ hiểu phải không, thử đến một ví dụ nhé, giả sử ta có mảng sau
```
arr = [5,14,9,47,32,24];
```
* Giờ ta cần lấy ra những phần tử là số chẵn trong mảng, ta sẽ viết như sau:
```
result = arr.filter((item) => {
    return item % 2 == 0;
});
```
* Trong đó, callback function sẽ thao tác với từng phần tử item của mảng arr, nếu kết quả callback  là true, filter sẽ lấy ra item đó, nếu kết quả callback là false, filter sẽ bỏ qua phần tử đó
* Kết quả:
```
[14, 32, 24]
```
* Ta cũng có thể viết tắt thành, kết quả vẫn sẽ ra tương tự
```
result = arr.filter((item) => item % 2 == 0);
```

# Map
* Map chắc là đã quá quen thuộc với những bạn trước đây học C/C++ rồi, nó sẽ trả về một mảng mới có kích thước bằng mảng cũ, nhưng phần tử của mảng sẽ được quyết định bởi kết quả callback trả về 
* Ví dụ, ta có mảng các đối tượng như sau:
```C
[
    {
        id: 1,
        value: 'Jack',
    },
    {
        id: 2,
        value: 'cho',
    },
    {
        id: 3,
        value: '5trieu',
    },
]
```
* Bình thường nếu muốn lấy ra một mảng các giá trị value ta phải khởi tạo một mảng rỗng, sau đó dùng forEach để lặp từng đối tượng của mảng trên rồi push vào từng value tương ứng, nhưng với Map, mọi chuyện sẽ đơn giản hơn rất nhiều
```
result = arr.map((item) => {
    return item.value;
});
```
* Kết quả:
```
["Jack", "cho", "5trieu"]
```

# Reduce
* Hồi mình mới đọc qua hàm này, mình thấy thật sự lú, nhưng sau khi sử dụng nhiều, mình thấy nó thực sự mạnh và hữu dụng
* Hàm reduce có thể hiểu là nó sẽ duyệt một lần qua tất cả các phần tử của mảng và trả về một kết quả duy nhất
* Hàm này có 4 biến truyền vào callback nhưng mình thấy chủ yếu chỉ sử dụng 2 biến, một là giá trị tính lũy của mỗi lần lặp và giá trị của phần tử  tại mỗi vòng lặp. Hơi rối nhỉ, để mình lấy một ví dụ dễ hiểu nhé, giả sử bạn có mảng sau:
```
arr = [1,2,3,4,5];
```
* Giờ bạn cần tính tổng tất cả các phần tử trong mảng. Chúng ta sẽ sử dụng reduce để làm điều này
```
result = arr.reduce((sum, item) => {
    return sum + item;
}, 0);
```
* Trong đó giá trị sum là tổng của các phần tử trong mảng và được cộng dồn qua từng giá trị trả về của callback, 0 là giá trị khởi tạo ban đầu của sum
* Và kết quả:
```
15
```
# Tổng kết
Trên đây là những chia sẻ hết sức ngắn gọn về 3 hàm mà mình thấy cực kỳ hữu ích khi chập chững bước vào "môn phái" JavaScript để viết Front end cho dự án, bạn có thể tìm thấy những nguồn đọc viết khi chi tiết khác trên mạng, nhưng đây là những gì mình tóm tắt được sau khi đọc một loạt bài, và mình cảm thấy như vậy là đủ để các bạn hiểu, trong quá trình sử dụng với các bài toán khác nhau, bạn sẽ tự ngộ ra nhiều thứ. Tất nhiên, sẽ có bạn thấy: "Hmm, cần gì phải viết loằng ngoằng thế làm gì, viết xong cái hàm chắc viết tay forEach còn nhanh hơn". Mới đầu mình cũng nghĩ thế, nhưng hãy thử tưởng tượng những mảng thực tế bạn phải xử lý, thường là một mảng các object có một tỷ thuộc tính, nếu cứ viết tay bằng forEach hay duyệt trâu điều kiện thì không khả quan tý nào, thay vào đó, hãy thử sử dụng những tiện ích kia, bạn sẽ thấy một vùng trời mới đấy ^^