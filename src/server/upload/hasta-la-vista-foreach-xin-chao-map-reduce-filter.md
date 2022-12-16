# 1. Mở đầu
Nếu bạn mới bắt đầu với Javascript, hoặc vẫn còn gà mờ (như mình chả hạn :v:) thì những method .map, .filter, .reduce chắc hẳn vẫn còn xa lạ. Có thể các bạn đã nhìn thấy nhiều rồi nhưng chưa hiểu mô tê nó hoạt động ra làm sao. Bài viết này sẽ giúp các bạn hiểu được sơ lược các method trên là gì, cách hoạt động và dùng trong trường hợp nào, ta cùng bắt đầu nhé :D 
# 2. Hướng dẫn sử dụng
## 2.1 .map()
Cách học nhanh nhất là qua ví dụ, vì vậy giả sử ta có:
```
var officers = [
  { id: 20, name: 'Captain Piett' },
  { id: 24, name: 'General Veers' },
  { id: 56, name: 'Admiral Ozzel' },
  { id: 88, name: 'Commander Jerjerrod' }
];
```
Và ta muốn trả về kết quả là các id của `officers`:  `[20, 24, 56, 88]`

Đến đây, các tay mơ sẽ nghĩ thế này: "Đơn giản thôi, tạo một mảng rỗng, sau đó mình lặp mảng `officers` dùng `.forEach()` và lần lượt push id vào thôi, izi pizi:
```
var officersIds = [];
officers.forEach(function (officer) {
  officersIds.push(officer.id);
});
```

Này là cách của a ma tơ :3, tạo mảng rỗng trước rồi lặp

Dân chuyên họ sẽ làm như thế này:
```
var officersIds = officers.map(function (officer) {
  return officer.id
});
```

## 2.2 .reduce()
Reduce hoạt động như thế nào nhở? Cũng giống như map, reduce sẽ chạy callback cho mỗi phần tử trong mảng. Điểm khác nhau ở đây là reduce sẽ truyền kết quả trả về của callback từ một phần tử của mảng sang phần từ khác.

Lằng nhằng nhỉ? Đến với ví dụ nhé, giả sử ta có mảng sau:
```
var pilots = [
  {
    id: 10,
    name: "Poe Dameron",
    years: 14,
  },
  {
    id: 2,
    name: "Temmin 'Snap' Wexley",
    years: 30,
  },
  {
    id: 41,
    name: "Tallissan Lintra",
    years: 16,
  },
  {
    id: 99,
    name: "Ello Asty",
    years: 22,
  }
];
```
Chúng ta cần tính tổng số năm kinh nghiệm của các phi công. Chúng ta có thể tạo 1 giá trị rỗng, sau đó lặp các phần tử trong mảng, lần lượt cộng tuổi vào giá trị rỗng vừa khởi tạo ở trên

**hoặc**
```
var totalYears = pilots.reduce(function (accumulator, pilot) {
  return accumulator + pilot.years;
}, 0);
```

Chú í rằng giá trị ban đầu được cài đặt là 0, giá trị đó có thể được thay đổi bằng bất kì giá trị nào khác. Kết quả của đoạn code trên sẽ trả về giá trị cuối cùng của `accumulator` (82)

## 2.3 .filter()
Bạn có 1 mảng, nhưng mà chỉ muốn lấy một số phần tử trong mảng ấy? Dùng filter nhé!
Lại quay lại ví dụ kia:
```
var pilots = [
  {
    id: 2,
    name: "Wedge Antilles",
    faction: "Rebels",
  },
  {
    id: 8,
    name: "Ciena Ree",
    faction: "Empire",
  },
  {
    id: 40,
    name: "Iden Versio",
    faction: "Empire",
  },
  {
    id: 66,
    name: "Thane Kyrell",
    faction: "Rebels",
  }
];
```

Ta có thể trả về 2 mảng, một mảng chứa các `pilots` có faction là `Rebels`, một mảng có `pilots` có faction là `Empire` bằng cách dùng `.filter()` như sau:
```
var rebels = pilots.filter(function (pilot) {
  return pilot.faction === "Rebels";
});

var empire = pilots.filter(function (pilot) {
  return pilot.faction === "Empire";
});
```

# 3. Áp dụng vào thực tế!
Hãy thử thay thế một số hàm sử dụng vòng `for` của bạn với 3 hàm trên, chắc chắn sẽ làm cho code của bạn đơn giản và dễ hiểu hơn rất nhiểu :v: 

Tài liệu tham khảo: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d