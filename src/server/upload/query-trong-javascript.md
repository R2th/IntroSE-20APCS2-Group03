Giống như Vue hay React phát triển rộng rãi bởi vì họ sẵn sàng phát triển tạo điều kiện cho front-end có nhiều function để query những dữ liệu ngay tại đó. Điều đó có nghĩa là khi một data được phía back-end trả về cho giao diện người dùng, thì việc query ngay tại front-end rất có lợi bởi vì giúp cho back-end giảm số lượng xử lý từ phía server. Do đó cải thiện hiệu suất làm việc ở tầng dưới.

Ngay từ đầu bài viết này thảo luận về chức năng tìm kiếm của danh sách rất nhẹ nhàng. Khi một data của server trả lại tất cả dữ liệu về giao diện người dùng, giao diện người dùng thực hiện truy vấn có điều kiện, có thể giảm số lượng yêu cầu được gửi đến máy chủ, do đó cải thiện hiệu suất rất nhiều. Bài viết này liên quan đến nhiều cách truy vấn nên rất hữu ích cho những bạn mới học javascript tới react. Trước tiên chúng ta hãy xem một đoạn code, và nói về kiến thức:

Giả sử chúng ta có 5 tiền đạo hàng đầu trong lịch sử bóng đá Việt Nam, giả sử thôi nhé =]]

```
const players  = [ 
   {name: "huynh duc", job: "programmer", age: "18", hobby: "study"}, 
   {name: "van quyen", job: "student", age: "8", hobby: "study"}, 
   {name: "cong vinh", job: "teacher", age: "28", hobby: "play"}, 
   {name: "anh duc", job: "programmer", age: "19", hobby: "sleep"}, 
   {name: "cong phuong", job: "cook", age: "38", hobby: "paintting"}
]
```
### 1 - Tìm kiếm theo key và value
Ở phần này chúng ta sẽ đi tìm items được return về đúng với điều kiện đề ra.

Bài toán: Tìm items có job là programmer -   job =  "programmer"

```
function searchKeyValue(lists, key, value) {
     let res = lists.filter(item => item[key] == value);
     return res
}
console.log(searchKeyValue(players, "job", "programmer"))

/*
Output:
0: {name: "huynh duc", job: "programmer", age: "18", hobby: "study"}
1: {name: "anh duc", job: "programmer", age: "19", hobby: "sleep"}
*/
```
Tặc lưỡi, ôi dào dễ á mà. Chúc mừng bạn, tiếp tục chứ....

### 2 - Tìm kiếm theo key và multiple value
Tiếp theo sẽ khó hơn một chút, vẫn như bài toán trên những giờ đây chúng ta lại tìm job nhưng nhiều value.

Bài toán: Cụ thể  là tìm những items có job là programmer và student

```
function searchKeyValues(lists,key,valueArr){
     let res = lists.filter(item => valueArr.find(i => i === item[key]))
     return res;
}
console.log(searchKeyValues(players, "job", ['programmer','student']))
/*
Output:
0: {name: "huynh duc", job: "programmer", age: "18", hobby: "study"}
1: {name: "van quyen", job: "student", age: "8", hobby: "study"}
2: {name: "anh duc", job: "programmer", age: "19", hobby: "sleep"}
*/
```
Notes: Trong bài toán 2 này chúng ta sẽ có thêm phương thức array.find() một method của  array và Array-Like Objects. 

### 3 - Tìm kiếm chính xác đa điều kiện
Cụ thể  là tìm kiếm những items có name = huynh duc hoặc hobby = paintting

Bài toán: Nhiệm vụ chúng ta phải làm sao tìm được items thoả mãn những điều kiện trên và chú ý toán tử || thay vì &&

```
function searchKeysValue(lists, filters) {
    let key = Object.keys(filters);
    return resArr = lists.filter(item => key.find(k => item[k] == filters[k]))
}
let filters = {
    name: "huynh duc",
    hobby: "paintting"
}
console.log(searchKeysValue(players, filters))
/*
Output:
0: {name: "huynh duc", job: "programmer", age: "18", hobby: "study"}
1: {name: "cong phuong", job: "cook", age: "38", hobby: "paintting"}
*/
```
Notes: Chú ý đọc thêm về  Let's talk about object javascript 

### 4 - Tìm kiếm chính xác đa điều kiện và đa giá trị
Bài toán: Ở bài 4 này thì hơi phức tạp, vì yêu cầu là tìm kiếm "đa điều kiện và đa giá trị" bạn có thể xem yêu cầu đó với

```
let filters = {
    age:[8,18],
    hobby:["play","sleep"]
}
```
 
Thật ra có cách làm chúng ngắn gọn hơn nhưng với những bài viết thế này, tôi thường viết một cách tường minh cho các bạn dễ hình dung hơn. Nếu cẩn thận hơn bạn nên tìm hiểu về for ... in và for ... of nó sẽ giúp bạn rất nhiều.

Notes: Có một bài rất hay nói về vấn đề này "For ... of trong javascript đừng bỏ lỡ viên đá quý này"

```
function searchKeysValues(lists, filters) {
     let resArr = [];
     lists.filter((item) => {
         for (let i in filters) {
             for (let j of filters[i]) {
                 if (item[i] == j) {
                     resArr.push(item)
                 }
             }
         }
     })
     return resArr
}
let filters = {
    age:[8,18],
    hobby:["play","sleep"]
}
console.log(searchKeysValues(players, filters))
/*
Output:
0: {name: "huynh duc", job: "programmer", age: "18", hobby: "study"}
  1: {name: "van quyen", job: "student", age: "8", hobby: "study"}
  2: {name: "cong vinh", job: "teacher", age: "28", hobby: "play"}
  3: {name: "anh duc", job: "programmer", age: "19", hobby: "sleep"}
*/
```
### 5 - Kiến thức liên quan đến việc thực hiện
Đi qua 4 bài toán trên, bạn sẽ gặp nhiều về hai method đó là filter() và find(). Thống kê cho thấy kể từ khi ES6 ra đời thì 2 method này được sử dụng rất nhiều, chính vì thế bạn bắt buộc phải hiểu về chúng

filter(): Phương pháp được sử dụng để lọc các phần tử của Array. Phương pháp này tạo ra một mảng mới chứa tất cả các phần tử của kiểm tra được thực hiện bởi hàm được cung cấp. 

filter(): Mảng trống sẽ không được phát hiện và Array ban đầu sẽ không bị thay đổi.