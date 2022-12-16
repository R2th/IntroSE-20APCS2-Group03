Trong bài viết lần trước, mình đã giới thiệu với các bạn 5 trong số 10 câu hỏi nhằm giúp bạn tăng cường kỹ năng JavaScript thông qua việc trả lời những câu hỏi này. Và bây giờ chúng ta hãy tiếp tục đến với 5 câu hỏi còn lại nhé.

# 6. Phép toán với .Reduce
Khởi đầu của ngày hôm nay sẽ là tiết toán học. Bạn hãy xem đoạn code sau và đoán xem kết quả mà log trả ra là gì

```
const arr = [
  x => x * 1,
  x => x * 2,
  x => x * 3,
  x => x * 4
];

console.log(arr.reduce((agg, el) => agg + el(agg), 1));
```

## Trả lời và giải thích
**120**

Với hàm reduce của Array, giá trị ban đầu của tập hợp (ở đây, được đặt tên là agg) được đưa ra trong đối số thứ hai. Trong trường hợp này, đó là 1. Sau đó chúng ta có thể lặp lại function của chúng ta như sau:

1 + 1 * 1 = 2 (giá trị của tập hợp trong lần lặp tiếp theo)

2 + 2 * 2 = 6 (giá trị của tập hợp trong lần lặp tiếp theo)

6 + 6 * 3 = 24 (giá trị của tập hợp trong lần lặp tiếp theo)

24 + 24 * 4 = 120 (tada)

Vậy nên 120 chính là đáp án cuối cùng.

# 7. Notification time
Bây giờ chúng ta hãy gửi cho người dùng một thông báo nhé. Đọc đoạn code sau và hãy đoán xem chúng ta đã gửi cho người dùng cái gì nào

```
const notifications = 1;

console.log(
  `You have ${notifications} notification${notifications !==
    1 && 's'}`
);
```

## Trả lời và giải thích
**"You have 1 notificationfalse"**

Thật không may, đoạn code gửi notification của chúng ta không hoạt động như mong đợi, `notifications !== 1 && 's'` trả về false chứ không hề như ta dự toán. Điều đó có nghĩa là chúng ta sẽ gửi cho người dùng đoạn noti như sau "You have 1 notificationfalse". Trông khá là buồn cười đúng không, nếu bạn muóon đoạn code trên hoạt động chính xác, chúng ta nên sử dụng toán tử kiểm tra điều kiện như sau: `$ {notifications === 1 ? '': 's'}`.

# 8. Spread và thay đổi data
Hãy xem xét mảng arr1 sau đây bao gồm 1 phần tử. Chuyện gì sẽ xảy ra nếu chúng ta spread array đó và thay đổi giá trị của phần tử `firstName` của object nằm ở index 0

```
const arr1 = [{ firstName: 'James' }];
const arr2 = [...arr1];
arr2[0].firstName = 'Jonah';

console.log(arr1);
```

## Trả lời và giải thích
** `[{ firstName: "Jonah" }]` **

Spread sẽ tạo một bản copy nông của arr1, nghĩa là object chứa trong arr2 sẽ trỏ đến cùng object trong bộ nhớ mà arr1 trỏ đến. Vậy nên khi thay đổi `firstName` của 1 array thì object trong array còn lại cũng sẽ thay đổi theo.

# 9. Binding mảng
Hãy đoán xem log từ đoạn code này sẽ trả về cái gì nào

```
const map = ['a', 'b', 'c'].map.bind([1, 2, 3]);
map(el => console.log(el));
```

## Trả lời và giải thích
**1 2 3**

`['a', 'b', 'c'].map` khi được gọi sẽ gọi đến `Array.prototype.map` với giá trị `this` của `['a', 'b', 'c']`. Nhưng, khi được sử dụng như tham biến thay vì được gọi, `['a', 'b', 'c'].map` chỉ đơn giản là tham chiếu đến `Array.prototype.map`.
`Function.prototype.bind` sẽ bind `this` của function tới tham số đầu tiên (trong trường hợp này sẽ là  `[1, 2, 3]`) và gọi `Array.prototype.map` với `this` , kết quả trong các items này sẽ được lặp lại và log ra.

# 10. Set Uniq và sắp xếp thứ tự
Trong bài toán sau, chúng ta sẽ dùng `set` và spread để tạo một array mới. Cái gì sẽ được log ra (tất cả items sẽ được chuyển sang unique hay nó sẽ được sắp xếp)

```
const arr = [...new Set([3, 1, 2, 3, 4])];
console.log(arr.length, arr[2]);
```

## Trả lời và giải thích
**4 2**

Set object sẽ ep những phần tử thành unique (những phần tử nằm sẵn trong set sẽ bị ignore). Kết quả arr sẽ là `[3, 1, 2, 4]` nghĩa là `arr.length` sẽ là 4 và phần tử index 2 sẽ là `2`

Bài viết của mình xin kết thúc tại đây, nếu bạn có góp ý gì hãy để lại comment nhé. Mình sẽ cố gắng kiếm những câu hỏi tương để chia sẻ với các bạn trong các bài viết sau.