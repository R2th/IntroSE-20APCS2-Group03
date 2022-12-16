# Giới thiệu
Như các bạn đã biết ES6 ra đời cũng một thời gian và đã giúp JavaScript giờ trở nên mạnh mẽ hơn bao giờ hết.
Hôm nay mình sẽ chia sẻ cho các bạn 1 số thủ thuật trong ES6 để giúp chúng ta tiết kiệm thời gian và  khiến code của bạn trở lên tuyệt vời hơn.
Bắt đầu nào.
# Nội dung
## 1. Quickly logging to the console
Chúng ta có thể sử dụng  **object literal shorthand**  để nhanh chóng ghi lại một biến vào console:
```
let myVar = 'foo';
let otherVar = 2;

// output:
// {myVar: "foo", otherVar: 2}
console.log({myVar, otherVar});
```
Bằng cách sử dụng **object literal shorthand**, chúng tôi tạo ra một đối tượng  ngay lập tức được ghi vào nhật ký. Và vì các khóa khớp với tên biến, nên các giá trị có nhãn. Điều này có ích đặc biệt khi các biến cùng thời gian (tất cả các chuỗi, tất cả các số, v.v.) và chúng ta cần phân biệt giữa chúng.
<br>
Note: **object literal shorthand**  là kiểu cú pháp ngắn tạo ra đối tượng
## 2. Coercing to a string
Chúng ta có thể nhanh chóng ép buộc một giá trị thành một chuỗi bằng cách gói nó trong **template literal** :
```
let num = 2;
let numString = `${num}`;

// output:
// {num: 2, numString: "2"}
console.log({num, numString});
```
Điều này thay thế cho cách ép buộc yêu thích trước đây của tôi (nối chuỗi trống):
```
let num = 2;
let numString = num + '';

// output:
// {num: 2, numString: "2"}
console.log({num, numString});
```
## 3.Swapping variables

Chúng ta có thể nhanh chóng trao đổi hai biến mà không cần biến tạm thời bằng cách sử dụng **array destructuring** :
```
let a = 1;
let b = 2;

[b, a] = [a, b];
```
Đầu tiên chúng tôi xây dựng một mảng bằng cú pháp mảng bằng hai phần tử: a và b. 
Sau đó, bằng cách sử dụng phá hủy mảng, chúng ta đã gán phần tử đầu tiên của mảng vừa tạo b và phần tử thứ hai vào a.
Kết quả là các giá trị của các biến đã được hoán đổi.
## 4.Simulating named parameters

Chúng ta có thể mô phỏng các tham số được đặt tên với giá trị phá hủy đối tượng và giá trị mặc định  trong tiêu đề hàm:
```
const notify = (msg, {type='info', timeout, close=true} = {}) => {
  // display notification
}

notify('Hi!');
notify('Hi!', {type: 'error'});
notify('Hi!', {type: 'warn', close: false});
```
Toàn bộ đối tượng (tham số thứ hai) được mặc định là {} khi undefined và sau đó các thuộc tính type và close cũng được mặc định khi undefined. Điều này cung cấp rất nhiều tính linh hoạt trong cách chức năng có thể được gọi.
## 5.Copying an array
Chúng ta có thể nhanh chóng sao chép một mảng bằng **spread operator** :
```
const manipulateList = (list) => {
    // defensively copy list
    let copiedList = [...list];

    // do something with copiedList
};
```
## 6.Concatenating arrays

Chúng ta có thể nhanh chóng ghép nhiều mảng lại với nhau bằng **spread operator** :
```
let start = ['do', 're', 'mi'];
let end = ['la', 'ti'];
let scaleFromLiteral = [...start, 'fa', 'so', ...end];

// output: ['do', 're', 'mi', 'fa', 'so', 'la', 'ti']
console.log(scaleFromLiteral);
```
## 7.De-duping an array

Chúng ta có thể kết hợp **Set** tính chất khử trùng lặp với **spread operator** để tạo ra một mảng khử các phần tử trùng lặp:
```
function dedupe(array) {
    return [...new Set(array)];
}

let noDupesArray = dedupe([1, 2, 1, 4, 7, 3, 1]);

// output: [1, 2, 4, 7, 3]
console.log(noDupesArray);
```
Tạo **Set** từ **array** sẽ dẫn đến việc trùng lặp được loại bỏ và **spread operator** chuyển đổi Set trở lại thành một **Array**.

## 8. Enforcing required parameters

Chúng ta có thể sử dụng một giá trị mặc định có thể là kết quả của một lệnh gọi hàm để thực thi các tham số bắt buộc:
```
// Gets called if a parameter is missing and the expression
// specifying the default value is evaluated.
const throwIfMissing = () => {
    throw new Error('Missing parameter');
}
const func = (requiredParam = throwIfMissing()) => {
    // some implementation
}
```
Nếu **requiredParam** không được chỉ định hoặc **undefined**, Error sẽ bị ném ra , đó chính xác là những gì chúng ta muốn.

## 9. Enforcing maximum arity

Thật không may, ES6 không cung cấp một cơ chế để thực thi mức tối đa (số lượng tham số đã truyền) của hàm. Tuy nhiên, bạn có thể tận dụng các rest tham số  để hack xung quanh việc thiếu hỗ trợ đó.
```
function max(...values) {
	// only want as many a 3 parameters
	// so throw error if over
	if (values.length > 3)
		throw Error('max 3 parameters allowed!');

	// use destructuring to get values
	// into variables
	let [a, b, c] = values;

	return Math.max(a, b, c);
}

// not an error
// returns 3
max(1, 2, 3);

// error!
max(1, 2, 3, 4);
```

Vấn đề với phương pháp này là các chức năng thực sự muốn xác định a, b và c như thông số của nó, nhưng vì nó cần phải làm xác nhận arity, các biến thay vào đó có trong chức năng sử dụng destructuring .

Chúng tôi có thể tối ưu mọi thứ một chút:
```
function max(a, b, c, ...shouldBeEmpty) {
	if (shouldBeEmpty.length > 0)
		throw Error('max 3 parameters allowed!');

	return Math.max(a, b, c);
};

// not an error
// output 6
max(4, 5, 6);

// error!
max(4, 5, 6, 7);
```
Điều này tốt hơn một chút, nhưng giới thiệu một tham số thứ 4 **shouldBeEmpty**, đó không phải là một phần của mã thực tế, có thể gây nhầm lẫn.
## 10. Timing out fetch

Chúng tôi có thể dễ dàng cung cấp hỗ trợ hết thời gian cho API tìm nạp mới bằng cách đưa nó vào lệnh gọi **Promise.race** với chức năng hết thời gian:
```
// Wrap `setTimeout` in a promise such that if
// the timeout completes, the promise is rejected
const timeout = (delay = 30000) => {
    return new Promise((resolve, reject) => {
        let rejectWithError = () => {
            reject(new Error('Timed out!'));
        };

        setTimeout(rejectWithError, delay);
    });
}

// Return a promise that will be fulfilled if
// the fetch is fulfilled before the timeout
// is rejected.
const fetchWithTimeout = (url, delay = 3000) => {
	// construct an array to pass to `Promise.race`
	return Promise.race([
		fetch(url),
		timeout(delay)
	]);
}

// Make an XHR request for the URL that has to
// return a response *before* the 1 s timeout
// happens
fetchWithTimeout('/json/data.json', 1000)
    .then(response => {
    	// successful response before the 1 s timeout
    	console.log('successful response', response)
    })
    .catch((e) => {
    	// Either the timeout occurred or some other error.
    	// Would need to check the method or use a custom
    	// `Error` subclass in `timeout`
    	console.error('request error', e);
    });
```
## 11. Defining an abstract base class

Một lớp cơ sở trừu tượng là một loại lớp được dành riêng để kế thừa. Nó không thể được xây dựng trực tiếp. Trường hợp sử dụng chính là cho các lớp được kế thừa để có một giao diện chung. Thật không may, các lớp chưa tận dụng **abstractt** từ khóa để tạo các lớp cơ sở trừu tượng, nhưng bạn có thể sử dụng được **new.target** giới thiệu với các lớp để mô phỏng nó.

```
class Note {
	constructor() {
		if (new.target === Note) {
			throw new Error('Note cannot be directly constructed.')
		}
	}
}
class ColorNote extends Note {

}
let note = new Note();			   // error!
let colorNote = new ColorNote();   // ok
```
## 12.Defining lazy range function
Chúng ta có thể sử dụng **generators** để tạo ra một hàm phạm vi lười biếng:
```
// Return a new generator that will iterate from `start` for
// `count` number of times
function* range(start, count) {
    for (let delta = 0; delta < count; delta++) {
        yield start + delta;
    }
}

for (let teenageYear of range(13, 7)) {
    console.log(`Teenage angst @ ${teenageYear}!`);
}
```
# Kết luận
Ở trên là một số thủ thuật mình tìm hiểu và cũng hay sử dụng. Cảm ơn bạn đã đọc bài viết, chúc bạn tận dụng tốt những thủ thuật trên trong dự án của bản thân.
# Bài viết được lược dịch từ : http://www.benmvp.com/learning-es6-12-tricks-for-es6-fun/