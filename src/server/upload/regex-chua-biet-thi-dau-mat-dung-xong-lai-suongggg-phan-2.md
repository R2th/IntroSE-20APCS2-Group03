#  Giới thiệu
Ở phần 1 mình đã giới thiệu về các kí tự đặc biệt trong biểu thức regex, ý nghĩa và cách sử dụng chúng.
Sang tới phần này, sẽ giới thiệu thêm về "ngoặc tròn" và các phương thức được sử dụng trong biểu thức chính quy.
## Ngoặc tròn - ý nghĩa, cách sử dụng
Bất kì đoạn kí tự so khớp nào ứng với mô tả bên trong ngoặc tròn tương ứng sẽ được nhớ. Nó sẽ có thể được sử dụng lại và sau đó còn có thể làm đầu ra cho các function sử dụng regex.

Ví dụ mẫu `/[^!]+(!,?){1,}/` khớp với 1 chuỗi với phần đầu không có dấu chấm than, và theo ngay sau là 1 dãy dấu chấm than liên tiếp. Mẫu này có thể khớp với chuỗi "hà nội ngàn năm văn vở !!!!!" và dấu chấm tha sẽ được nhớ.

Nếu không muốn nó được nhớ (trường hợp có quá nhiều ngoặc tròn trong mẫu hoặc vòng lặp sử dụng ngoặc tròn sẽ có tác động tới bộ nhớ của máy) thì hãy thêm `?:` vào phía trước như thế này:
`/[^!]+(?:!,?){1,}/`
## Những phương thức được sử dụng trong biểu thức chính quy

| Phương thức |  Mô tả |
| -------- | -------- |
|exec | Tìm kiếm chuỗi phù hợp (trong 1 chuỗi xác định) với mẫu so khớp và trả về một mảng chứa kết quả tìm kiếm.|
|test	| Kiểm tra chuỗi có khớp với mẫu hay không, kết quả trả lại là boolean.|
|match	|So khớp toàn bộ chuỗi với mẫu. Trả về một mảng chứa kết quả tìm kiếm hoặc null nếu không tìm thấy.|
|search	|Tìm kiếm chuỗi con phù hợp  (trong 1 chuỗi xác định) với mẫu so khớp và trả về vị trí của chuỗi đó hoặc -1 nếu không tìm thấy.|
|replace|Tìm kiếm một chuỗi con trong 1 chuỗi xác định theo mẫu so khớp và thay thế chuỗi con đó bằng chuỗi thay thế.|
|split|Sử dụng mẫu hoặc 1 chuỗi bấ bhieesn để ngắt chuỗi đó thành một mảng các chuỗi con.|

Lưu ý: khi sử dụng các phương thức trên, nếu muốn truy cập những thuộc tính của một mẫu như vị trí đã so khớp tới chẳng hạn thì chúng ta cần lưu mẫu vào 1 biến cụ thể.
```
let pattern = /an(h+)moi/g;
let result = pattern.exec("emoiangianhhhhmoi");
console.log("The value of lastIndex is " + pattern.lastIndex);
```
như trên ta có kế quả là 17.
```
let result = /an(h+)moi/g.exec("emoiangianhhhhmoi");
console.log("The value of lastIndex is " + /an(h+)moi/g.lastIndex);
```
còn ở đây nó sẽ trả ra 0, vì 2 /an(h+)moi/g dùng ở trên về bản chất là khác nhau.
## Sử dụng nhiều dấu ngoặc tròn
Các vùng so khớp trong dấu ngoặc tròn sẽ sẽ được lưu lại và được đánh chỉ số từ trái qua phải chạy từ 1 đến n
```
var re = /(\w+)\s(\d+)/;
var str = "LandMark 72";
var newstr = str.replace(re, "$2 $1");
console.log(newstr);    //72 LandMark
```
## Tìm kiếm với cờ


| Cờ | Mô tả |
| ------- | -------- |
|g|	Tìm kiếm toàn bộ kết quả trên chuỗi mục tiêu.|
|i|Tìm kiếm không phân biệt hoa thường.|
|m|	Tìm kiếm đa dòng, so khớp mẫu với toàn bộ các dòng với rule như tương tự|.
|y|	So khớp được bắt đầu ở vị trí hiện tại trong chuỗi mục tiêu.|

# Kết thúc
Chào tạm biệt, hi vọng bài viết đã giúp ích.
💙___💌___💜 ......(💜💙)__🍀__(💜💙)