![alt](https://cdn-images-1.medium.com/max/800/1*4WIiBjwyKvOfdIMf1VFbaA.png)
`Vòng lặp for` của JavaScript phục vụ cho chúng ta rất tốt từ xưa, nhưng giờ nó đã trở nên lỗi thời và nên "về hưu" để ủng hộ cho các kỹ thuật mới hơn của functional programing.

May mắn thay là sự thay đổi này không yêu cầu bạn phải là một trùm về functional programing 😅. Hơn thế, bạn có thể làm nó trong những dự án của bạn ngay từ hôm nay!!!

### Vậy đâu là vấn đề với ```vòng lặp for``` của JavaScript? 🤔🤔🤔

Thiết kế của vòng lặp for là để **thay đổi trạng thái** và sử dụng các **side effects**, 2 thứ tiềm tàng bug và những đoạn mã khó đoán trước.

Chúng ta đều được nghe rằng việc sử dụng global state khá là tệ và ta nên tránh dùng nó. Tuy nhiên, local state cũng chứa những nhược điểm của global state vậy, chỉ đơn giản là ta không nhận ra vì phạm vi của nó nhỏ hơn nhiều. Nên về cơ bản ta không hề giải quyết được vấn đề, ta chỉ làm vấn đề nhỏ đi hết mức có thể.

Với những `trạng thái có thể thay đổi`, vào một thời điểm bất kì nào đó, một biến sẽ bị thay đổi vì một lý do bí hiểm nào đó và bạn sẽ phải dành hàng giờ để debug và tìm ra nguyên nhân giá trị đó bị thay đổi. Người viết đã từng phải vò đầu bứt tai cả tiếng đồng hồ để suy nghĩ về vấn đề này (Người dịch thì chưa LOL).

Tiếp theo ta sẽ nói nhanh về các side effects. Mấy từ này nghe thôi đã thấy ghê, ```side effect = tác dụng phụ ``` !!! Bạn có muốn ứng dụng của bạn có ```"tác dụng phụ"```. No thanks!

![alt](https://78.media.tumblr.com/f6c378374e30866d2982fb655b389422/tumblr_inline_p8fcggEMqq1r7mh3x_500.png)

### Thế còn side effect là gì? 🤔🤔🤔

**Một hàm được coi là có `side effect` là khi nó thay đổi một cái gì đó bên ngoài phạm vi của nó**. Nó có thể là thay đổi giá trị của một biến, đọc đầu vào bàn phím, thực hiện gọi api, ghi dữ liệu vào đĩa, ghi log vào console, v.v.

`Side effects` vô cùng mạnh mẽ, tuy nhiên thì "great power comes great responsibility" (sức mạnh đi đôi cùng với trách nhiệm)".

Vì vậy `side effects` nên được loại bỏ ngay khi có thể hoặc đóng gói lại và quản lý chặt chẽ. Các hàm có `side effect` thì sẽ khó để kiểm tra, cho nên tránh xa nó bất cứ khi nào bạn có thể. Thật may là ta sẽ không phải quan tâm đến `side effect` trong bài viết này.

Rồi, giờ nói ít code nhiều. Hãy cùng xem một đoạn code có vòng lặp for mà khá chắc kèo là bạn đã thấy vài nghìn lần.

```javascript
const cats = [
  { name: 'Mojo',    months: 84 },
  { name: 'Mao-Mao', months: 34 },
  { name: 'Waffles', months: 4 },
  { name: 'Pickles', months: 6 }
]
var kittens = []
// typical poorly written `for loop`
for (var i = 0; i < cats.length; i++) {
  if (cats[i].months < 7) {
    kittens.push(cats[i].name)
  }
}
console.log(kittens)
```

Mục tiêu của mình là sẽ tái cấu trúc lại đoạn code này theo từng bước để cho bạn thấy việc biến đoạn code này trở nên đẹp mắt hơn đơn giản như thế nào.

Việc đầu tiên mình sẽ thay đổi là tách điều kiện if thành một function riêng.

```javascript
const isKitten = cat => cat.months < 7
var kittens = []
for (var i = 0; i < cats.length; i++) {
  if (isKitten(cats[i])) {
    kittens.push(cats[i].name)
  }
}
```

Tách điều kiện if riêng ra một hàm riêng là một good practice. Việc thay đổi trong việc lọc từ ```"less than 7 months (nhỏ hơn 7 tháng tuổi)"``` sang ```"is a kitten (là mèo con)"``` khá là quan trọng. Giờ khi bạn đọc lại code thì sẽ đấy mục đích của điều kiện trở nên sáng nghĩa hơn. Tại sao phải lấy những con mèo nhỏ hơn 7 tháng tuổi? Vì mục đích là tìm những chú mèo con. Và vì mục đích của ta là tìm mèo con, nên hãy viết điều kiện y như vậy!

Một lợi ích khác là hàm ```isKitten``` có thể tái sử dụng và ta cũng biết rằng việc có thể tái sử dụng code luôn là cái đích mà ta muốn đạt được.

Sự thay đổi tiếp theo là cũng tách việc lấy tên của mèo từ object ra một hàm riêng. Việc thay đổi này sẽ có ý nghĩa ở các bước tiếp theo, hiện tại thì các bạn cứ làm theo mình 😉
```javascript
const isKitten = cat => cat.months < 7
const getName = cat => cat.name
var kittens = []
for (var i = 0; i < cats.length; i++) {
  if (isKitten(cats[i])) {
    kittens.push(getName(cats[i]))
  }
}
```
Mình đã dự tính viết một vài đoạn ngắn để mô tả cơ chế hoạt động của hàm filter và map. Nhưng mình nghĩ thay vì mô tả chúng và chỉ ra nó đơn giản như thế nào thì để các bạn đọc và hiểu đoạn code này, kể cả chưa bao giờ được giới thiệu về hàm map hoặc filter, sẽ thể hiện rõ nhất cách mà đoạn code của bạn trở nên dễ đọc hơn.

```javascript
const isKitten = cat => cat.months < 7
const getName = cat => cat.name
const kittens =
  cats.filter(isKitten)
      .map(getName)
```
Một chú ý nữa là ta đã loại bỏ hàm kittens.push(...). Như chúng ta đã đề cập từ đầu: `Không thay đổi trạng thái và cũng không sử dụng var!`

#### *Code that uses const (over var and let) is sexy as hell*

Mình khuyến khích các bạn viết lại đoạn code này 1 chút đó là cho đoạn code filtering và mapping này vào 1 hàm riêng (để tiện cho việc tái sử dụng ¯\\\_(ツ)_/¯ ).

Và khi kết hợp tất cả:
```javascript
const isKitten = cat => cat.months < 7
const getName = cat => cat.name
const getKittenNames = cats =>
  cats.filter(isKitten)
      .map(getName)
const cats = [
  { name: 'Mojo',    months: 84 },
  { name: 'Mao-Mao', months: 34 },
  { name: 'Waffles', months: 4 },
  { name: 'Pickles', months: 6 }
]
const kittens = getKittenNames(cats)
console.log(kittens)
```
### Note 😤😤😤
Đây sẽ là bài đâu tiên trong series mình sẽ dịch về việc vứt bỏ cách code cũ và viết code lại theo Functional Programming.

Nguồn: [Link](https://hackernoon.com/rethinking-javascript-death-of-the-for-loop-c431564c84a8)