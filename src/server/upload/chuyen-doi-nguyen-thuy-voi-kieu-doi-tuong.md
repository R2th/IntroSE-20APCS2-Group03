# Giới thiệu
* Điều gì xảy ra khi các đối tượng được thêm vào: **obj1 + obj2**, trừ đi: **obj1 - obj2** hoặc in ra bằng cách sử dụng **alert(obj)**?
* Trong trường hợp đó, các đối tượng được tự động chuyển đổi thành kiểu nguyên thủy, và sau đó hành động được thực hiện. Chúng ta chắc đã biết quy tắc chuyển đổi nguyên thủy của các dạng số, chuỗi và boolean. Các phép **String()**, **Number()**, **Boolean()** sẽ chuyển đổi các giá trị một cách phù hợp. Tuy nhiên việc chuyển đổi nguyên thủy của đối tượng lại khác.
* Tất cả các đối tượng sẽ là true nếu thực hiện chuyển đổi kiểu **Boolean**. Sẽ chỉ có sự khác nhau giữa chuyển đổi số và chuyển đổi chuỗi.
* Việc chuyển đổi số xảy ra khi chúng ta trừ các đối tượng hoặc áp dụng các hàm toán học. Ví dụ, **Date** là đối tượng có thể được trừ đi và kết quả **date1 - date2** là chênh lệch thời gian giữa hai ngày.
* Đối với chuyển đổi chuỗi - nó thường xảy ra khi chúng ta in một đối tượng với **alert(obj)** và trong các ngữ cảnh tương tự.
# Nội dung
## ToPrimitive
* Chúng ta có thể tinh chỉnh chuyển đổi chuỗi và số, sử dụng các phương thức đối tượng đặc biệt.
* Có ba biến thể của chuyển đổi kiểu, được gọi là các **hints**, được mô tả trong [đặc điểm kĩ thuật](https://tc39.es/ecma262/#sec-toprimitive).
### "string"
* Đối với chuyển đổi đối tượng thành chuỗi, khi chúng ta thực hiện một thao tác trên một đối tượng yêu cầu một chuỗi, như **alert**:
```
// in ra đối tượng
alert(obj);

// sử dụng đối tượng như một key
anotherObj[obj] = 123;
```
### "number"
* Đối với chuyển đổi đối tượng thành số, như khi chúng ta làm toán:
```
// ép kiểu dạng số
let num = Number(obj);

// các phép toán (trừ phép cộng nhị phân)
let n = +obj;
let delta = date1 - date2;

// so sánh lớn/nhỏ hơn
let greater = user1 > user2;
```
### ""default"
* Xảy ra trong một số trường hợp hiếm khi "không chắc chắn" loại nào được mong đợi. Ví dụ: phép cộng nhị phân +, có thể hoạt động với cả chuỗi (nối chúng) và số (thêm chúng), vì vậy cả chuỗi và số đều làm được. Vì vậy, nếu một cộng nhị phân nhận một đối tượng làm đối số, nó sẽ sử dụng "default" gợi ý để chuyển đổi nó.
* Ngoài ra, nếu một đối tượng được so sánh bằng cách sử dụng phép == với chuỗi, số hoặc ký hiệu, thì cũng không rõ ràng nên thực hiện chuyển đổi nào, vì vậy "default" hint được sử dụng.
```
// phép cộng nhị phân sử dụng "default"
let total = obj1 + obj2;

// obj == number sử dụng "default"
if (user == 1) { ... };
```
* Các toán tử so sánh lớn hơn và nhỏ hơn, chẳng hạn như < >, cũng có thể hoạt động với cả chuỗi và số. Tuy nhiên, họ sử dụng "number" hint không phải "default". Đó là vì lý do lịch sử.
* Tuy nhiên, trong thực tế, chúng ta không cần phải nhớ những chi tiết đặc biệt này, bởi vì tất cả các đối tượng được xây dựng sẵn ngoại trừ một trường hợp (đối tượng Date) thực hiện chuyển đổi "default" theo cùng một cách như "number". Và chúng ta cũng có thể làm như vậy.
* **Chú ý**: không có "boolean" hint. Chỉ có 3 "hints" ("string", "number", "default") vì tất cả các đối tượng đều true ở trong ngữ cảnh boolean. Và nếu chúng ta xử lý "default" và "number" tương tự nhau, giống như hầu hết các bản cài sẵn khác, thì chỉ có hai chuyển đổi.
* Để thực hiện chuyển đổi, JavaScript cố gắng tìm và gọi ba phương thức đối tượng:
1. Gọi obj[Symbol.toPrimitive](hint) - phương thức có khóa tượng trưng Symbol.toPrimitive (system symbol), nếu phương thức đó tồn tại.
2. Ngược lại, nếu hint là "string", thực hiện **obj.toString()** và **obj.valueOf()**, bất cứ điều gì tồn tại.
3. Nếu hint là "number" hoặc "default", thực hiện **obj.valueOf()** và **obj.toString()**, bất cứ điều gì tồn tại.
## Symbol.toPrimitive
* Hãy bắt đầu từ phương pháp đầu tiên. Có một ký hiệu được xây dựng sẵn có tên **Symbol.toPrimitive** sẽ được sử dụng để đặt tên cho phương thức chuyển đổi, như sau:
```
obj[Symbol.toPrimitive] = function(hint) {
  // phải trả về giá trị nguyên thủy
  // hint = 1 trong các giá trị "string", "number", "default"
};
```
* Ví dụ, ở đây đối tượng **user** khai báo nó:
```
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// các chuyển đổi tương ứng:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```
* Như chúng ta có thể thấy, user trở thành một chuỗi tự mô tả (**this.name**) hoặc một số tiền (**this.money**) tùy thuộc vào kiểu chuyển đổi. Phương pháp duy nhất **user[Symbol.toPrimitive]** xử lý tất cả các trường hợp chuyển đổi.
* Chúng ta có thể gọi trực tiếp phương thức này và truyền tham số tương ứng:
```
alert(user[Symbol.toPrimitive]("string")); // hint: string -> {name: "John"}
alert(user[Symbol.toPrimitive]("number")); // hint: number -> 1000
alert(user[Symbol.toPrimitive]("default")); // hint: default -> 1000
```
## toString/valueOf
* Phương pháp **toString** và **valueOf** có từ xa xưa. Chúng không phải là các biểu tượng (các biểu tượng đã không tồn tại từ lâu), mà là các phương thức có tên chuỗi "thông thường". Chúng cung cấp một cách thay thế "kiểu cũ" để triển khai chuyển đổi.
* Nếu không có Symbol.toPrimitive thì JavaScript cố gắng tìm chúng và thử theo thứ tự:
    * toString -> valueOf cho "string" hint.
    * valueOf -> toString cho "number" hoặc "default" hint.
* Các phương thức này phải trả về một giá trị nguyên thủy. Nếu **toString** hoặc **valueOf** trả về một đối tượng, thì nó bị bỏ qua (giống như khi không có phương thức). Theo mặc định, một đối tượng thuần túy có các phương thức **toString** và **valueOf** hoạt động như sau:
    * Phương thức toString trả về một chuỗi "[object Object]".
    * Phương thức valueOf trả về chính bản thân đối tượng đó.
```
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```
* Vì vậy, nếu chúng ta cố gắng sử dụng một đối tượng dưới dạng chuỗi, như in trong method **alert**, thì theo mặc định, chúng ta sẽ thấy chuỗi "[object Object]". Và mặc định **valueOf** được đề cập ở đây chỉ để cho đầy đủ, tránh bất kỳ sự nhầm lẫn nào. Như bạn có thể thấy, nó trả về chính đối tượng và do đó bị bỏ qua. Đó là vì lý do lịch sử. Vì vậy, chúng ta có thể cho rằng nó không tồn tại.
* Hãy tự thực hiện tùy chỉnh các phương pháp này. Ví dụ ở đây đối tượng **user** thực hiện tương tự như trên bằng cách sử dụng kết hợp **toString** và **valueOf** thay vì **Symbol.toPrimitive**:
```
let user = {
  name: "John",
  money: 1000,

  // cho hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // cho hint="number" or "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```
* Như chúng ta có thể thấy, 2 phương thức trên thay thế cho **Symbol.toPrimitive**.
* Thông thường, chúng ta muốn có một phương thức "tổng hợp" để xử lý tất cả các chuyển đổi nguyên thủy. Trong trường hợp này, chúng ta có thể chỉ triển khai **toString**:
```
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```
* Trong trường hợp không có **Symbol.toPrimitive** và **valueOf**, **toString** sẽ xử lý tất cả các chuyển đổi nguyên thủy. Tương tự với việc chỉ khai báo **valueOf** để thực thi cho toàn bộ các kiểu chuyển đổi nguyên thủy.
## Các loại trả về
* Điều quan trọng cần biết về tất cả các phương thức chuyển đổi nguyên thủy là chúng không nhất thiết phải trả về nguyên thủy “hinted” (kiểu giá trị tương ứng với kiểu nguyên thủy).
* Không có quy ước liệu **toString** trả về chính xác một chuỗi hay phương thức **Symbol.toPrimitive** trả về một số cho một hint "number" hay không. Điều bắt buộc duy nhất là các phương thức này phải trả về một giá trị nguyên thủy, không phải một đối tượng.
* **Chú ý**: Vì lý do lịch sử, nếu **toString** hoặc **valueOf** trả về một đối tượng, không có lỗi, nhưng giá trị đó bị bỏ qua (coi như phương thức không tồn tại). Đó là bởi vì trong thời xưa không có khái niệm "**good error**" trong JavaScript.
## Các chuyển đổi khác
* Như chúng ta đã biết, nhiều toán tử và hàm thực hiện chuyển đổi kiểu, ví dụ như phép nhân * chuyển đổi toán hạng thành số.
* Nếu chúng ta truyền một đối tượng làm đối số, thì có hai giai đoạn:
    * Đối tượng được chuyển đổi thành nguyên thủy (sử dụng các quy tắc được mô tả ở trên).
    * Nếu giá trị nguyên thủy trả về không đúng loại, nó sẽ được tự động chuyển đổi.
* Ví dụ:
```
let obj = {
  // toString xử lý tất cả các kiểu chuyển đổi và trả về chuỗi "2"
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, giá trị nguyên thủy trả về là "2" nên được tự động converted thành số 2
``` 
* Ở trên chuỗi "2" tự động được converted sang số 2. Tuy nhiên với dấu cộng nhị phân thì sẽ nối các chuỗi trong cùng một trường hợp, vì nó sẵn sàng chấp nhận một chuỗi:
```
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), giá trị nguyên thủy trả về là "2" => nối thêm kí tự 2 
```
# Tóm lược
* Việc chuyển đổi đối tượng thành nguyên thủy được gọi tự động bởi nhiều hàm và toán tử được xây dựng sẵn, trong đó giá trị trả về là một giá trị nguyên thủy (không phải đối tượng).
* Có 3 loại "hint":
    * "string" (cho **alert** và các hành động khác cần một chuỗi)
    * "number" (đối với các phép toán học)
    * "default" (các trường hợp khác)
* Đặc tả mô tả rõ ràng toán tử nào sử dụng hint nào. Có rất ít toán tử “không biết điều gì sẽ xảy ra” và sử dụng hint "default" (phép cộng nhị phân). Với các đối tượng được xây dựng sẵn hint "default" sẽ thực hiện giống với hint "number" nên trong thực tế, hai hint cuối cùng thường được hợp nhất với nhau.
* Thuật toán chuyển đổi là:
    * Gọi **obj[Symbol.toPrimitive] (hint)** nếu phương thức tồn tại.
    * Nếu không, với hint là "string" gọi **obj.toString()** và **obj.valueOf()**, nếu chúng tồn tại.
    * Còn hint là "number" hoặc "default", gọi **obj.valueOf()** và **obj.toString()**, nếu chúng tồn tại.
* Trong thực tế, nó thường đủ khi chỉ cần triển khai **obj.toString()** như một phương pháp "bắt tất cả" cho tất cả các chuyển đổi nguyên thủy để trả về giá trị dễ hiểu đại diện cho một đối tượng, với mục đích ghi nhật ký hoặc gỡ lỗi. Hoặc chi tiết hơn khi gỡ lỗi, chúng ta nên khai báo phương thức **[Symbol.toPrimitive](hint)** để kiểm tra kiểu hint tương ứng được truyền vào.
* Nguồn tham khảo:
[https://javascript.info/object-toprimitive](https://javascript.info/object-toprimitive)
[https://tc39.es/ecma262/#sec-toprimitive](https://tc39.es/ecma262/#sec-toprimitive)