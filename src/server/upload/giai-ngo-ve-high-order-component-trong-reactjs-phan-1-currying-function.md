### Mở đầu
Khi làm việc với **ReactJS** thì chắc hẳn mọi người đều đã từng nghe qua về khái niệm **Higher Order Component** (HOC) - một thuật ngữ dùng để chỉ các Component bậc cao trong ReactJS. Thực sự mới lúc đầu nghe cái tên gọi thôi thì hầu như ai cũng sẽ rất ngại phải tìm hiểu, vậy thì trong bài viết ngày hôm nay thì mình sẽ giải ngố cho mọi người về thằng **HOC** này từ A cho tới Z luôn nhé.

Trước khi bước vào khái niệm của **HOC** thì chúng ta thử cùng ngó qua xem bản chất thực sự của **HOC** là gì thông qua 1 khái niệm trong Javascript là **Currying function**.
### Currying function
Đối với những ai làm việc lâu năm với Javascript thì chắc cũng không còn lạ lẫm với khái niệm này nữa. Tuy nhiên thì để tìm hiểu về HOC thì mình sẽ giới thiệu qua về **Currying function**.

##### Bài toán
Giả sử ta có 1 trang thương mại điện tử với danh sách các sản phẩm được bày bán. Câu hỏi được đặt ra là viết 1 hàm để tính giá của tất cả sản phẩm sau khi giảm giá 10%

Khá là dễ phải không nào, sau khi nghe được đề bài thì hầu như là ai cũng sẽ viết ra được ngay 1 function kiểu như này:
```js
function priceWithDiscount(price) {
    return price * (1 - 0.1);
}
```
Hoặc viết theo kiểu gọn hơn với ES6:
```js
const priceWithDiscount = price => price * (1 - 0.1);
```

Có vẻ ổn đấy nhưng mà khoan đã, nếu như trong 1 màn hình khác có danh các sản phẩm được discount 20% thì sao nhỉ? Function `priceWithDiscount` trên sao dùng lại được nữa, chả nhẽ lại viết ra 1 function khác chỉ để tính giá tiền cho sản phẩm được giảm 20%, thành ra mỗi loại discount khác nhau lại có 1 function riêng, như vậy là dở rồi. Thay vì fix cứng giá trị discount thì ta sẽ biến nó thành param như này:
```js
const priceWithDiscount = (price, discount) => price * (1 - (discount / 100));
```
Như vậy là với mỗi sản phẩm có discount 10% hay 20% thì ta chỉ việc gọi `priceWithDiscount(price, 10)` hoặc `priceWithDiscount(price, 20)` là xong

Đến đây thì ổn hơn rồi đấy nhưng................. Nếu như trong màn danh sách các sản phẩm có 100 sản phẩm được giảm giá 10% thì code sẽ trông như nào đây? Kết quả là hàm `priceWithDiscount(price, 10)` sẽ được gọi 100 lần và mọi người có thể thấy số 10 - giá trị discount đang bị lặp lại 100 lần. Vậy thì có cách nào để giải quyết vấn đề trên không? Câu trả lời là **CÓ**, bằng cách sử dụng **Currying function**.

##### Currying function

Vậy  **Currying function** (CF) là gì? Thực chất thì nó cũng giống như các function bình thường khác, chỉ khác 1 chỗ đó là giá trị mà nó return ra là 1 function, kiểu như này:
```js
function a() {
    return function() {
        // code
    };
}

// ES6:
const a = () => () => { //code };
```

Trong CF thì giá trị của param đầu tiên thường là những giá trị ít khi bị thay đổi cho nên để áp dụng CF vào bài toán bên trên thì ta sẽ viết lại function `priceWithDiscount` như sau:

```js
function priceWithDiscount(discount) {
    return function(price) {
        return price * (1 - (discount / 100));
    };
}

// ES6:
const priceWithDiscount = discount => price => price * (1 - (discount / 100));
```
Sau đó trong màn hình danh sách các sản phẩm, ta cần định nghĩa 1 function cho giá trị discount là 10%:
```js
const priceWithDiscount10 = priceWithDiscount(10);
```
Do function **priceWithDiscount** trả về 1 function với param truyền vào là price của sản phẩm cho nên tất cả những sản phẩm mà có discount 10% chỉ cần gọi đến `priceWithDiscount10(price)` là xong. Ngoài ra thì ta cũng có thể viết gọn lại cách gọi 1 hàm CF như sau:
```js
priceWithDiscount(10)(price)
```
Như vậy là với CF chúng ta đã giải quyết được bài toán bị lặp code 1 cách vô cùng nhanh chóng mà không phải tốn nhiều công sức để refactor lại code, rất tuyệt vời phải không nào :D

-> Tóm lại thì với CF thay vì phải truyền vào 1 đống param như các function bình thường khác thì ta có thể truyền vào từng param 1 cho từng function con được return bên trong. Nhờ vậy mà ta có thể linh hoạt sử dụng function trong nhiều trường hợp khác nhau và trường hợp code bị lặp trong bài toán trên là 1 ví dụ.

##### Ví dụ khác
Giả sử ta có 1 mảng các sản phẩm:
```js
const products = [
    {
        id: 1,
        price: 100000,
    },
    {
        id: 2,
        price: 50000,
    },
    {
        id: 3,
        price: 200000,
    }
];
```
Bài toán đặt ra là tìm trong mảng các sản phẩm có price lớn hơn hoặc bằng 100.000, thì cách nhanh nhất đó là ta sẽ duyệt qua toàn bộ các sản phẩm trong mảng rồi so sánh price của từng sản phẩm với giá 10000
```js
const filterPrice = (price, product) => product.price >= price;

products.filter(product => filterPrice(100000, product.price));
```
Trên là cách viết thông thường, nhưng với CF ta chỉ cần viết ngắn gọn như sau:
```js
const filterPrice = price => product => product.price >= price;

products.filter(filterPrice(100000));
```
### Kết luận

Tóm lại thì **Currying function** khá là thuận tiện trong 1 số trường hợp nhất định, tuy nhiên nếu dùng không đúng cách thì nó sẽ khiến code của chúng ta trở nên cồng kềnh và khó hiểu, nhất là khi được kết hợp với cú pháp của ES6 thì trông nó lại càng khó hiểu hơn.

Vậy thì thằng CF này có liên quan gì đến **HOC**? Thì về bản chất của **HOC** là được xậy dựng dựa trên nguyên lý và các tính chất của CF cho nên để hiểu về **HOC** trước hết chúng ta phải hiểu được CF đã. Còn muốn biết cụ thể **HOC** nó như nào thì trong bài viết sắp tới mình sẽ giới thiệu chi tiết về **HOC** hơn để mọi người cùng tìm hiểu nhé.