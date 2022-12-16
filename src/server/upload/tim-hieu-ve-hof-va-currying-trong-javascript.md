![image.png](https://images.viblo.asia/6fddef70-dd02-4136-a725-1dcf324bbeb7.png)

Ở bài trước, chúng ta đã cùng nhau tìm hiểu về function trong JavaScript là như thế nào rồi. Đó chỉ mới là kiến thức căn bản mà thôi, trong bài viết này chúng ta cùng nhau tìm hiểu khái niệm nâng cao hơn một chút đó là **HOF** và **Currying** nhé 😉.

Hai khái niệm này thường sẽ được các nhà tuyển dụng hỏi với các ứng viên cho vị trí middle và senior dev JavaScript đấy. Nếu bạn nắm được hai khái niệm này từ sớm thì bạn đã hơn đa số các bạn dev JavaScript khác rồi đó 😁. Nào chúng ta bắt đầu thôi.

Bạn có thể xem thêm bài viết tại: https://200lab.io/blog/tim-hieu-ve-hof-va-currying-trong-javascript/

## I. HOF là gì?

**HOF** hay **Higher-Order-Function** là một function mà nhận tham số đầu vào là function hoặc return kết quả là một function, chỉ đơn giản vậy thôi 😁.

Cùng xem ví dụ cho dễ hiểu hơn nhé 😉

```
const result = [2, 4, 6, 8].map((item) => item * item);
console.log(result);
//-->Output: [4, 16, 36, 64]

const getSum = a => b => a + b; //Viết theo arrow function
console.log(getSum(5)(10));
//-->Output: 15;
```

Ta thấy ví dụ với function `map()` thì `map()` nhận vào một function dạng **arrow function**, còn ví dụ `getSum` thì ta return về kết quả là function `b => a + b`. Như bạn thấy đó, hai ví dụ đều là **HOF** đấy, có thể bạn thấy quen quen đấy 😄.

Trong HOF có 3 khái niệm khá là quan trọng, bạn cần lưu ý cũng như phải nắm rõ 3 ông thần này gồm: **callback function**, **closure** và **currying**

Tuy nhiên khái niệm về **callback function** và **closure** chúng ta đã tìm hiểu ở bài trước rồi nên ở bài này chúng ta sẽ không nói lại mà sẽ tìm hiểu tiếp khái niệm **currying** nhé 😉

## II. Currying là gì?

Vậy **Currying** là cái gì? Nó là một **kỹ thuật** mà cho phép ta thay vì sử dụng **một function có nhiều tham số** truyền vào dài dòng thì ta có thể chuyển đổi thành **những function liên tiếp có một tham số** truyền vào thôi.

Ví dụ `getSum(5)(10)` đó là một **currying** đơn giản đấy 😉. Kỹ thuật currying này có sử dụng **closure** đó 😁 bất ngờ chưa. Bản thân **currying** cũng dùng các biến của function cha mà.

Cùng đi vào bài toán nhỏ để thấy được công dụng của kỹ thuật này tuyệt vời như thế nào nè:

* Tìm các số tự nhiên bé hơn 10 mà phải là số lẻ.
* Tìm các số tự nhiên bé hơn 20 mà phải là số chẵn.
* Tìm các số tự nhiên bé hơn 30 mà khi đem chia cho 3 thì số dư bằng 2.

Thông thường các bạn code sẽ như vầy:

```
function findNumberLess10AndOdd() {
	const result = [];
    for(let i = 0; i < 10; i++) {
    	if(i % 2 !== 0) {
        	result.push(i);
        }
    }
    return result;
}
console.log(findNumberLess10AndOdd());
//-->Output: [1, 3, 5, 7, 9]

function findNumberLess20AndEven() {
	const result = [];
    for(let i = 0; i < 20; i++) {
    	if(i % 2 === 0) {
        	result.push(i);
        }
    }
    return result;
}
console.log(findNumberLess20AndEven());
//-->Output: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

function findNumberLess30AndDivide3surplus2() {
	const result = [];
    for(let i = 0; i < 30; i++) {
    	if(i % 3 === 2) {
        	result.push(i);
        }
    }
    return result;
}
console.log(findNumberLess30AndDivide3surplus2());
//-->Output: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29]
```

Nhìn đoạn code trên khá là dài dòng phải không nào 😅 và nó cũng không có tính tái sử dụng giống như ta đã đề cập về ưu điểm của function phải không nào 😁. Để rút gọn hơn và tận dụng tính tái sử dụng của ưu điểm khi sử dụng function thì ta áp dụng khái niệm mà ta đã tìm hiểu trước đó là **callback function** nè.

Code sẽ được rút gọn và tái sử dụng như sau:

```
function findNumberByCondition(num, func) {
	const result = [];
    for(let i = 0; i < num; i++) {
    	if(func(i)) {
        	result.push(i);
        }
    }
    return result;
}
console.log(findNumberByCondition(10, (num) => num % 2 !== 0));
//-->Output: [1, 3, 5, 7, 9]

console.log(findNumberByCondition(20, (num) => num % 2 === 0));
//-->Output: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

console.log(findNumberByCondition(30, (num) => num % 3 === 2));
//-->Output: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29]
```

Bất ngờ chưa 🤣 ngắn chưa 😁.

Ta cũng có thể rút gọn code bằng **currying** đấy 😉. Như vầy nè:

```
//Lần này ta sử dụng arrow function để đổi gió tý nhé
const findNumberByCondition = (num) => (func) => {
	const result = [];
    for(let i = 0; i < num; i++) {
    	if(func(i)) {
        	result.push(i);
        }
    }
    return result;
};

console.log(findNumberByCondition(10)((num) => num % 2 !== 0));
//-->Output: [1, 3, 5, 7, 9]

console.log(findNumberByCondition(20)((num) => num % 2 === 0));
//-->Output: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

console.log(findNumberByCondition(30)((num) => num % 3 === 2));
//-->Output: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29]
```

Nhìn có vẻ cũng không khác mấy việc ta sử dụng **callback function** là bao nhỉ 🤣. Tuy vậy chứ khi làm việc với JavaScript thì không ít thì nhiều, bạn cũng sẽ dùng nó đấy, nếu học xong JavaScript và học tiếp ReactJS library thì bạn sẽ sử dụng nó nhiều hơn đó 😉.

## III. Tổng kết

Cá nhân mình thấy **HOF** quả là một kỹ thuật rất hữu ích, nó đem lại cho ta khả năng tư duy logic để viết function không chỉ chạy được, chạy tốt, chạy nhanh mà còn có thể tái sử dụng được cho nhiều trường hợp khác nhau nhưng code vẫn ngắn gọn nhất có thể.

Để có thể sử dụng được **HOF** thì cần phải thực hành nhiều và đưa tư duy mình vào việc xem xét liệu function này có dùng cho các trường hợp khác hay không, để biết được các trường hợp khác nhau của nó và áp dụng **HOF** vào.

Mà mình thấy code theo dạng **callback function** vẫn dễ đọc hơn nên mình hay dùng còn đối với **currying** thì một số trường hợp đặc biệt thì mình mới dùng thôi, **closure** cũng vậy.

Hy vọng qua bài viết sẽ giúp các bạn biết thêm về một khái niệm không xa lạ nhưng cũng không phải ai cũng biết. Và các bạn biết rồi đó, cố gắng thực hành nhiều để rèn luyện nhé 😉. Cảm ơn các bạn đã đọc 🤗