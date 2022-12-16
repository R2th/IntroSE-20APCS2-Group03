# Ai đặt tên cho vòng for?

### Đi tìm kho báu
Trong bài viết này chúng ta sẽ dùng code để mô phỏng trò chơi "Đi tìm kho báu". Trò chơi này gồm 1 ma trận 5x5 gồm các string rỗng (""), trong đó có 1 vị trí chứa string "X", và đó là kho báu ta cần tìm. 

Để đơn giản thì kho báu lần này chúng ta sẽ hard code luôn, còn trong game thật chắc bạn sẽ muốn cho ma trận này to lên và random chữ X đấy cho người chơi lú 1 tí. Ý tưởng để tìm ra chữ "X" này bằng code khá đơn giản, chúng ta sẽ dùng 2 vòng for lồng nhau để chạy qua tất cả các vị trí trong ma trận cho đến khi tìm được chữ "X".

### Code ban đầu như này:

```swift
var board = [[String]](repeating: [String](repeating: "", count: 10), count: 5)

board[3][5] = "X"

for (rowIndex, cols) in board.enumerated() { 
    for (colIndex, col) in cols.enumerated() {
        if col == "X" {
            print("Found the treasure at row \(rowIndex) col \(colIndex)!") 
        }
    } 
}
```

Chắc các bạn thấy ngay chạy đoạn code này sẽ rất là lãng phí, dù đúng là nó có thể tìm ra kho báu X thật. 
Giả sử kho báu của chúng ta nằm ngay vị trí đầu tiên (1x1), thì sau khi tìm được X vòng lặp của chúng ta vẫn tiếp tục chạy, đến khi chạy hết tất cả các vị trí nó mới dừng lại. 

Trong Swift chúng ta có keyword "break" để xử lý trường hợp này, nhưng liệu đã xử lý triệt để hay chưa?

### Cải tiến lần 1, nhưng...

```swift
for (rowIndex, cols) in board.enumerated() { 
    for (colIndex, col) in cols.enumerated() {
        if col == "X" {
            print("Found the treasure at row \(rowIndex) col \(colIndex)!") 
            break
        }
    }
}
```


Chưa triệt để. Khi tìm được "X" chúng ta sẽ gọi ngay keyword break, nhưng thực tế như vậy chúng ta chỉ break được vòng for bên trong mà thôi, còn vòng bên ngoài vẫn chạy tốt. Đúng là như này thì bớt lãng phí hơn một chút, nhưng vẫn là lãng phí. 

Một trick phổ biến mà ta có thể sử dụng là đặt 1 biến Bool ở bên ngoài, check giá trị của biến đó ở vòng for ngoài và set giá trị của biến đấy thành true khi tìm được X ở vòng for trong. 

Cách này ổn, nhưng Swift cho bạn giải pháp xanh sạch đẹp hơn: Bạn có thể "đặt tên" cho vòng for của mình, và dùng tên này để refer đến vòng for đó khi cần. 

Cách thực hiện cũng rất đơn giản.

### Cải tiến lần 2, nhìn phát hiểu luôn:

```swift
var board = [[String]](repeating: [String](repeating: "", count: 10), count: 5)

board[5][3] = "X"

rowLoop: for (rowIndex, cols) in board.enumerated() { 
    for (colIndex, col) in cols.enumerated() {
        if col == "X" {
            print("Found the treasure at row \(rowIndex) col \(colIndex)!")
            break rowLoop
        } 
    }
}
```


Trong đoạn code trên ta đặt tên cho vòng for (rowIndex, cols) là rowLoop, và tại vòng for (colIndex, col) chúng ta có thể dùng tên này để refer tới vòng for rowLoop và break nó trực tiếp luôn. Khi vòng rowLoop break rồi thì tất nhiên vòng for bên trong cũng không thể chạy nữa.

Đây là cách code ít lãng phí nhất có thể với ngôn ngữ Swift, bởi khi tìm được X, chúng ta ngay lập tức dừng các vòng lặp lại. Không chỉ tiết kiệm mà chúng ta còn được cộng điểm thanh lịch khi viết code ngắn gọn và sạch đẹp nữa.

Việc "đặt tên", hay "đánh nhãn" cho câu lệnh này trong Swift tiếng anh gọi là "labeled statements". Áp dụng labeled statements cho vòng for đã rất hay ho rồi, nhưng Swift còn cho phép chúng ta đánh nhãn được nhiều thứ hơn thế nữa. Nhiều hơn thế nào thì mình xin phép nói tiếp trong bài lần sau ha.

Hi vọng bài viết của mình giúp các bạn có thêm 1 công cụ hữu ích khi code Swift.