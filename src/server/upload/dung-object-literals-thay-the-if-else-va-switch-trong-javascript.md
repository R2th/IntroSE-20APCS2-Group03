![](https://images.viblo.asia/81b88ec0-b247-4fec-99f1-aaa124074970.jpg)
Viết các điều kiện phức tạp trong JavaScript luôn có khả năng tạo ra một số mã khá lộn xộn. Danh sách dài các câu lệnh if / else hoặc các switch/case là cách chúng ta đã tiếp cận từ rất sớm.
## 1. Vấn đề
Viết các điều kiện phức tạp trong Javascript luôn có khả năng làm cho code lộn xộn và khó đọc khó maintain. 

Khi có nhiều điều kiện object literals là cách dễ đọc nhất, hãy cùng tìm hiểu xem cách nó hoạt động như nào.

Ví dụ chúng ta có 1 function nhận vào 1 cụm từ lóng có vần điệu và trả về 1 từ có nghĩa. Sử dụng câu lệnh if else nó sẽ giống như sau :
```

function getTranslation(rhyme) {
  if (rhyme.toLowerCase() === "apples and pears") {
    return "Stairs";
  } else if (rhyme.toLowerCase() === "hampstead heath") {
    return "Teeth";
  } else if (rhyme.toLowerCase() === "loaf of bread") {
    return "Head";
  } else if (rhyme.toLowerCase() === "pork pies") {
    return "Lies";
  } else if (rhyme.toLowerCase() === "whistle and flute") {
    return "Suit";
  }

  return "Rhyme not found";
}
```
Nó không những không dễ đọc mà còn lập lại toLowerCase() nhiều lần.
Chúng ta có thể tránh việc lặp lại bằng cách gắn rhyme cho 1 biến ở đầu hoặc bằng cách sử dụng switch case như dưới đây :
```
function getTranslation(rhyme) {
  switch (rhyme.toLowerCase()) {
    case "apples and pears":
      return "Stairs";
    case "hampstead heath":
      return "Teeth";
    case "loaf of bread":
      return "Head";
    case "pork pies":
      return "Lies";
    case "whistle and flute":
      return "Suit";
    default:
      return "Rhyme not found";
  }
}
```
Bây giờ chúng ta chỉ gọi toLowerCase() 1 lần nhưng không có nghĩa là nó hoàn hảo. Trong trường hợp này chúng ta chỉ trả về 1 giá trị nhưng trong trường hợp phức tạp hơn rất dễ bỏ lỡ "break" và gặp lỗi.
## 2. Cách thay thế
Bạn có thể sử dụng một object để thực hiện 1 chức năng tương đương và gọn hơn rất nhiều. Nhìn vào ví dụ dưới đây :
```
function getTranslationMap(rhyme) {
  const rhymes = {
    "apples and pears": "Stairs",
    "hampstead heath": "Teeth",
    "loaf of bread": "Head",
    "pork pies": "Lies",
    "whistle and flute": "Suit",
  };
  
  return rhymes[rhyme.toLowerCase()] ?? "Rhyme not found";
}
```
Chúng ta có 1 đối tượng trong đó các key là điều kiện và các value là reponses. Sau đó chúng ta có thể sử dụng dấu ngoặc vuông để lấy chính xác kết quả dựa vào key được chuyển vào. Ta cũng đã xử lý được trường hợp phản hồi mặc định.

Thêm 1 ví dụ khác :
```
function stringToBool(str) {
  const boolStrings = {
    "true": true,
    "false": false,
  };

  return boolStrings[str] ?? "String is not a boolean value";
}
```
Bằng cách viết như này chúng ta có thể dễ dàng đọc, bảo trì và tránh được những lỗi không mong muốn
## 3. Trường hợp logic phức tạp hơn
Đôi khi chúng ta cần xử lý những login phức tạp hơn bên trong điều kiện của mình, lúc đó ta có thể sử dụng 1 hàm làm giá trị cho các key của mình, các hàm phải có giá trị trả về.
```
function calculate(num1, num2, action) {
  const actions = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
  };

  return actions[action]?.(num1, num2) ?? "Calculation is not recognised";
}
```
Bằng cách làm trên ta có thể tính toán, chuyển đổi theo cách mình mong muốn.
## 4. Kết luận
Xử lý điều kiện luôn là 1 vấn đề quan trọng và tùy từng trường hợp sẽ có những cách tiếp cận khác nhau. Tuy nhiên theo ý kiến chủ quan cách viết object literals là dễ đọc và dễ bảo trì nhất.
Cảm ơn các bạn đã đọc bài, nếu bạn có cách tiếp cận tốt hơn thì chúng ta có thể cùng thảo luận trong phần comment.