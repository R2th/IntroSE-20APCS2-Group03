Bài viết chỉ mang tính chất LƯU HỌC HỎI  :relaxed: . Mọi ý kiến đóng góp của mọi người mình xin cảm ơn nhé!

**1. Shorthand Evaluate**
Khi gán giá trị của biến cho biến khác, chúng ta thường muốn đảm bảo rằng giá trị biến đó không null, không undefinded hoặc rỗng, vì vậy mà cần phải viết một loạt điều kiện để kiểm tra:
```
let variable2;
if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
     variable2 = variable1;
} else {
    variable2 = "";
}
```
Có thể rút ngắn gọn thành:
```
const variable2 = variable1  || "";
```

**2. Convert array of objects into array of properties**
```

var someJsonArray = [
  {id: 0, name: "name", property: "value", therproperties: "othervalues"},
  {id: 1, name: "name1", property: "value1", otherproperties: "othervalues1"},
  {id: 2, name: "name2", property: "value2", otherproperties: "othervalues2"}
];
var finalArray = someJsonArray.map(function (obj) {
  return obj.id;
});
console.log(finalArray); ==> Kết Quả:[0, 1, 2]
```