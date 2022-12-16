Vừa rồi mình có tìm hiểu thấy toán tử (!!) - NOT NOT operation sau khi thấy mấy anh Ấn Độ sử dụng trong 1 video mình xem.

# 1. Các giá trị Trutly và Falsy trong js
Các giá trị trong js đều là `trutly` trừ các giá trị được định nghĩa falsy trong js. Các giá trị đó là: 
```
false, 0, chuỗi rỗng (""), null, undefined, NaN
```

Vì vậy các giá khác sẽ là trutly nếu không rơi vào 1 trong các trường hợp nêu trên. Để dễ hiểu thì liên tưởng như trong boolean thì giá trị `trutly` được thể hiện là `true` còn giá trị `falsy` được thể hiện là `false`.

Toán tử NOT (!) sẽ phủ định giá trị nếu là `true` nó sẽ đảo ngược giá trị thành `false` giống và ngược lại `false` thành `true`.

```js
!true === false // a NOT true equals false
!false === true // a NOT false equals true
```

Toán tử này thường được dùng nhiều trong việc xác định giá trị đó là `true` hay `false` để kiểm trả lựa chọn thực hiện công việc nào đó.

```js
if (!X) { // Kiểm trả X có phải là giá trị falsy hay không
    // something code
}

!(X) ? <something> : <something> // Kiểm trả X có phải là giá trị falsy hay không
```

# 2. Double NOT (!!) - NOT NOT operation

Vào trọng tâm của bài nào. Đầu tiên ta cần làm rõ không có toán tử NOT NOT (!!) chỉ có toán tử NOT (!). NOT NOT (!!) là biến thể khi sử dụng nhiều lần toán tử NOT (!).

Cùng đi đến 1 ví dụ để dễ hiểu hơn nha.
```js
!!true === true // a NOT NOT true equals true
```

Ở ví dụ đầu tiên
1. **NOT (!) thứ 1** sẽ phủ định giá trị `true` 1 lần thành `false`
2. Sau đó tiếp tục phủ định lần nữa ở **NOT (!) thử 2** nó sẽ thành `true`
3. Ta có thể hiểu nó sẽ có dạng như này.

```js
!!true === true
// NOT lần 1: !!true => !false
// NOT lần 2: !false => true
```

Vậy khoan đã nếu vậy thì vì sao lại phải dừng ở NOT NOT (!!). Bạn nghĩ đúng rồi đấy ta có thể sử dụng bao nhiều lần NOT (!) tuỳ thích, tuỳ vào các bạn dùng. Ta cùng xem thêm vài ví dụ:

```js
!!!true === false // a NOT NOT NOT true equals false
!!!!true === true // a NOT NOT NOT NOT true equals true
```

# 3. Có nên sử dụng ?
Theo mình thì không nên sử dụng quá nhiều, nó sẽ gây ra việc khó đọc code dễ gây nhầm lẫn.

Nhiều khi lại bị chữi vì làm mọ chuyện xoắn não hơn. Mình nghỉ chỉ nên sử dụng tối đa là 2 lần NOT (!) để tránh rườm ra khó đọc.