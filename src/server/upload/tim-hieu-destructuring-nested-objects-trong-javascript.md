Dưới đây mình demo một ví dụ nho nhỏ để chúng ta hiểu được cách thức làm việc và vận dụng nguyên lý hoạt động của Object Destructuring trong Javascript.

![](https://images.viblo.asia/c627db88-f71f-4fad-b1d5-ed636a9d349c.jpg)
Object minh họa dưới đây được inspired bởi **MightyRaccon** qua clip của ảnh dịch nôm na là:  
[5 cách để làm gỏi THANOS!!!](https://www.youtube.com/watch?v=n_t6sYDwKBw)  
Hãy dành vài phút giải trí trước khi chúng ta bước vào ví dụ...Have some fun

```js
 function coolWaysToKillThanos() {
      return {
        data: {
          planOne: {
            method: 'Dr.Strange',
            rate: '7/10'
          },
          planTwo: {
            method: 'Call John Wick',
            rate: '8/10'
          }
        },
        possibility: '60%'
      }
    }

    function bestWaysToKillThanos() {
      return {
        data: {
          plans: [
            { method: 'Send Ant-man', rate: '9/10'},
            { method: "Blow Star-lord's head", rate: '10/10'},
          ],
          possibility: '100%'
        }
      }
    }   
```
## 1. Destructuring Objects

Khi chúng ta cần sử dụng một biến bên trong một Object, đặc biệt là khi Obj được nest khá nhiều bước thì khó tránh khỏi việc lặp lại code.
```js
const res = coolWaysToKillThanos();
const data = res.data;
const possibility = res.possibility;

console.log({data, possibility});
// -> {data: {planOne {...}}, possibility: '60%'}
```

**Destructuring** sẽ giúp ta giải quyết vấn đề này:
```js
const { data, possibility } = coolWaysToKillThanos();
```
Curly bracket ở đây không phải là một block, đó là cấu trúc của **destructuring**. Kết quả trả về của 2 cách trên là như nhau.

Tiếp đến giả sử ta cần đào sâu hơn với **planTwo** trong nested Ojbect

```js
const { data, possibility } = coolWaysToKillThanos();

console.log(data.planTwo, possibility);
// -> {method: 'Call John Wick', rate: '8/10'}  '60%'
```

Ta có thế destructuring **planTwo** trực tiếp như sau:

```js
const { data: { planTwo }, possibility } = coolWaysToKillThanos();

console.log(data.planTwo);
// -> Error!
```
Ngay lập tức Console trên sẽ báo lỗi, đơn giản lúc này **data** không còn là target variable được destructured, thay vào đó là **planTwo** , ta chỉ cần: 
```js
console.log(planTwo, possibility);
```
Ta có 2 biến được destructed là **planTwo** và **possibility**. Mọi việc có vẻ  sáng sủa rồi đó...

...Ta tiếp tục tới biến '*method*' và '*rate*'

```js
const { data: { planTwo: { method, rate } }, possibility } = coolWaysToKillThanos();

console.log(method, rate);
// -> 'Call John Wick', '7/10'
```

## 2. Destructuring && Renaming
Trong quá trình **destructuring** ta hoàn toàn có thể đổi lại tên biến theo ý muốn theo ví dụ dưới đây:

```js
const { data: { planTwo: { method: approach, rate: rating } }, possibility } = coolWaysToKillThanos();

console.log(approach, rating);
// -> 'Call John Wick', '7/10'
```

## 3. Destructuring Array
Ở Object được khởi tạo thứ 2 có một array, ta sẽ tìm hiểu **destructuring** array này.

```js
const { data: { plans: [plan1, plan2] } } = bestWaysToKillThanos();

console.log(plan1, plan2)
// -> { method: 'Send Ant-man', rate: '9/10'}
// -> { method: "Blow Star-lord's head", rate: '10/10'}
```

Như vậy ta chỉ cần đặt các var của array trong một square bracket '[]' và naming chúng (plan1, plan2) là tất cả sẽ ngăn nắp.

Kết lại, với ví dụ tí hon và fun fun này, mình hi vọng nó dễ hiểu đễ các bạn có thể tiếp thu một khái niệm nhỏ mà hữu dụng trong JS. Chúc các bạn thành công!