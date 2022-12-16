### Problem 1
Viết 3 hàm tính tổng của các số trong 1 dãy cho trước sử dụng for-loop, while-loop, và đệ quy.

### Problem 2
Viết 1 hàm kết hợp 2 dãy bằng cách xen kẽ các phần tử, Ví dụ: cho 2 dãy [a, b, c] và [1, 2, 3], hàm trả về [a, 1, b, 2, c, 3].

### Problem 3
Viết 1 hàm in ra 100 số Fibonacci đầu tiên. (0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...)

### Problem 4
Viết 1 hàm nhận vào 1 dãy các số nguyên không âm, sắp xếp chúng sao cho hợp thành 1 số lớn nhất có thể. Ví dụ nhận vào dãy [40, 1, 99, 12], hàm trả về 9940121.

### Problem 5
Cho 1 dãy các số 1, 2, 3, 4, ..., 9. Thêm các dấu +, - vào giữa các số này sao cho kết quả của phép tính = 100. Ví dụ 1 + 2 + 34 – 5 + 67 – 8 + 9 = 100.
Viết 1 hàm in ra tất cả các cách thêm dấu.

### Đáp án
Problem 1, 2, 3 khá đơn giản nên mình chỉ viết lời giải cho problem 4 và 5.
```javascript
// Problem 4
function solution4(list){
  list = list.slice();
  return list.sort(function(x, y){
    return (x+''+y < y+''+x) ? 1 : -1;
  }).join('');
}

// Problem 5
// cách 1
function solution5(){ 
  // first calculate all possible combinations
  // of numbers and operators
  var mem = ["1"], combos;
  for(var i = 2; i <= 9; i++){
    combos = [];
    mem.forEach(function(x){
      combos.push(x + i, x + " +" + i, x + " -" + i); // +, - or catenation
    });
    mem = combos;
  }
 
  // Now filter out the ones that equal 100
  return combos.filter(function(combo){
    // split a combo into numbers, sum them using reduce
    return combo.split(" ").reduce(function(x,y){
      return x/1+y/1;
    }) == 100; // and check if the sum is 100
  }) 
}


// cách 2 - đệ quy

function solution5(accumulated, total, ...numbers) {
  if (numbers.length === 0) {
    if (total == 100) console.log(accumulated);
  }
  else {
    const [first, ...butFirst] = numbers;
    if (accumulated !== "") {
      // TH 1, điền dấu +
      solution5(`${accumulated}+${first}`, total + first, ...butFirst);
      // TH 2, điền dấu -
      solution5(`${accumulated}-${first}`, total - first, ...butFirst);
    }
    else solution5(`${first}`, first, ...butFirst);
    // TH 3, không điền dấu
    if (butFirst.length > 0) {
      const [second, ...butSecond] = butFirst;
      solution5(accumulated, total, first * 10 + second, ...butSecond);
    }
  }
}
solution5("", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
```

I'm sure there are better solutions to these problems. I'd love to see them △.