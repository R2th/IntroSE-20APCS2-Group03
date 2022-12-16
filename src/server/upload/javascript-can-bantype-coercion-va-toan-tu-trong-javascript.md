**Bài viết note kiến thức lập trình Javascript căn bản**

### 1. Type Coercion

**Type Coercion** là chuyển đổi kiểu dữ liệu từ kiểu này sang kiểu khác.

Ví dụ: đổi kiểu số sang kiểu chuỗi, kiểu chuỗi sang kiểu boolean...

- Toán tử +
```js
console.log(1 + 2);
console.log(3+4);
console.log(10 + "10"); //1010
console.log("10" + 10); /1010
```

Giải thích: Javascript sẽ chuyển số 10 thành chuỗi "10" với toán tử +
`console.log(String(10) + "10");`

```js
console.log(null + ""); // "null"
console.log(null + undefined); //NaN - không phải số
console.log(null + 10); //10
```

- Toán tử khác  + (-, *, /, %)
```js
console.log("10" - 10); // 0 Number("10") - 10
console.log("" - 1); // Number("") -> 0 -> 0 - 1 = -1
console.log(false - true); //Number(false) = 0 - Number(true) = 1 -> 0 -1 = -1
```

### 2. Toán tử so sánh

- Các toán tử: > < >= <=

```js
console.log(5 > 7); //false
console.log(10 > 7); //true
console.log(6 >= 6); //true
console.log(7 >= 8); //false
console.log(6 <= 6); //true
```

### 3. Toán tử logic
- Toán tử logic cơ bản: && || !

```js
console.log(5 > 7 && 8 > 3); //false && true -> false
console.log(5 > 7 || 8 > 3); //false || true -> true
const isChecked = true;
console.log(!isChecked); //false
```

- Boolean &

```js
//false && true -> false
//true && fasle -> fasle
//false && false -> false
//true && true -> true
```

- Boolean ||
```js
// false || true -> true
// true || fasle -> true
// true || true -> true
// false || false -> false
```

### 4. So sánh == vs ===
 
**== loose equality vs === strict equality**

- == so sánh theo giá trị
```js
console.log(10 == 10); //true
console.log(10 == '10'); //true "10" == "10"
console.log(true == 1); //Number(true) = 1 -> 1 == 1 -> true
console.log(1 == "01"); //Number("01") = 1 == 1 -> true
console.log(null == ""); // "null"!= " -> false
console.log(typeof 10); //number
console.log(typeof "10"); //string
```

- === so sánh theo giá trị và kiểu dữ liệu

```js
console.log(10 === '10'); //false
console.log(10 !== '10') ; //true
```

=> Khuyến khích sử dụng so sánh === strict equality


**Nguồn:**
-  https://www.youtube.com/channel/UC8vjHOEYlnVTqAgE6CFDm_Q
- https://kt.city/course/tu-hoc-javascript-hieu-qua-va-de-dang-danh-cho-nguoi-moi