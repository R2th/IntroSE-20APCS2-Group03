Các phép tính là một phần rất quan trọng trong lập trình, ngoài những phép tính cộng trừ nhân chia bình thường thì việc **cộng trừ "số" với "chuỗi"** sẽ thực hiện như thế nào? Trong bài viết này chúng ta cùng nhìn lại một số phép tính cơ bản và xem chúng sẽ thực hiện như thế nào với số và chuỗi.
## Các phép tính cơ bản

### - Phép cộng

- **Cộng số với số**: cái này thì chỉ là phép cộng số bình thường và kết quả sẽ là một số.
```go
1 + 1 = 2 //Number
```
- **Cộng chuỗi với chuỗi** (nối chuỗi): cũng chỉ là nối chuối thông thường và kết quả là một chuỗi.
```javascript
"Cộng" + "chuỗi" = "Cộngchuỗi" //String
```
- **Cộng số với chuỗi**: ở đây số sẽ được chuyển thành chuỗi và thực hiện nối chuỗi nên kết quả sẽ là một chuỗi.
```go
"Một" + 1 = "Một1" //String
//Số 1 được chuyển thành chuỗi "1" => "Một" + "1" = "Một1"

"1" + 1 = "11" //String
//Số 1 được chuyển thành chuỗi "1" => "1" + "1" = "11"
```
- **Thứ tự thực hiện phép tính**: cũng như phép tính thông thường thì thứ tự các phép tính cũng được thực hiện từ trái qua phải, trong ngoặc trước ngoài ngoặc sau dù là cộng số với số, chuỗi với chuỗi hay số với chuỗi.
```objectivec
1 + 1 + "1" = "21" //String
// Thực hiện phép tính từ trái sang phải: 2 + "1" = "21"

1 + ("2" + 3) + "4" = "1234" //String
// Thực hiện trong ngoặc trước ngoài ngoặc sau: 1 + "23" + "4" = "1234" 
```

### - Phép trừ
- **Trừ số với số**: kết quả là một số.
```go
1 - 1 = 0 //Number
```
- **Trừ chuỗi với chuỗi**: ở đây sẽ chuyển kiểu chuỗi thành số và thực hiện phép tính, nếu chuyển được thì kết quả là một số còn không thì sẽ là NaN.
```sql
"1" - "1" = 0 //Number
// "1" có thể chuyển thành số 1 nên có thể thực hiện phép tính và kết quả bằng 0

"Một" - "1" = NaN
// "Một" không thể chuyển thành số nên kết quả là NaN
```
- **Trừ số với chuỗi**: tương tự như trừ chuỗi với chuỗi.
```sql
1 - "1" = 0 //Number
// "1" có thể chuyển thành số 1 nên có thể thực hiện phép tính và kết quả bằng 0

"Một" - 1 = NaN
// "Một" không thể chuyển thành số nên kết quả là NaN
```
- **Thứ tự thực hiện phép tính**: thứ tự thực hiện cũng như các phép phép tính thông thường.
```sql
Thực hiện tương tự phép cộng
```

### - Cộng trừ số với chuỗi
- **Cộng trừ số**: đương nhiên kết quả sẽ là một số.
```sql
1 + 1 - 1 = 1 //Number
```
- **Cộng trừ chuỗi**: tùy vào thứ tự thực hiện mà các kiểu sẽ được chuyển đổi khác nhau nên kết quả có thể là một số, một chuỗi hay NaN.
```go
"1" - "1" + "1" = "01" //String
// Thực hiện từ trái qua phải: "1" - "1" = 0 + "1" = "01"

"2" - "1" - "1" = 0 //Number
// Thực hiện từ trái qua phải: "2" - "1" = 1 - "1" = 0

"Một" + "1" - "1" = NaN
// Thực hiện từ trái qua phải: "Một" + "1" = "Một1" - "1" = NaN
```
- **Cộng trừ số với chuỗi**: tùy vào thứ tự thực hiện mà các kiểu sẽ được chuyển đổi khác nhau nên kết quả có thể là một số, một chuỗi hay NaN.
```go
"1" - 1 + "1" = "01" //String
// Thực hiện từ trái qua phải: "1" - 1 = 0 + "1" = "01"

"2" - 1 - 1 = 0 //Number
// Thực hiện từ trái qua phải: "2" - 1 = 1 - 1 = 0

"Một" + 1 - "1" = NaN
// Thực hiện từ trái qua phải: "Một" + 1 = "Một1" - "1" = NaN
```
## Kết luận
Như vậy ở đây sẽ quy về bài toán **"Chuyển đổi kiểu ít sinh lỗi hơn"**.

- Kiểu số và chuỗi đều có toán tử cộng nên khi **cộng số với chuỗi sẽ chuyển về kiểu chuỗi** bởi chuỗi không chắc có thể chuyển sang số được để cộng nên chuyển tất cả thành kiểu chuỗi sẽ an toàn hơn. Ở đây cũng thực hiện từ trái qua phải, trong ngoặc trước ngoài ngoặc sau như phép tính thông thường.
- Kiểu chuỗi không có toán tử trừ nên bắt buộc khi **trừ số với chuỗi bắt buộc phải chuyển đổi sang kiểu số** để thực hiện. Nếu không chuyển chuỗi thành số được thì kết quả sẽ là NaN. Tương tự với phép nhân và chia số với chuỗi.