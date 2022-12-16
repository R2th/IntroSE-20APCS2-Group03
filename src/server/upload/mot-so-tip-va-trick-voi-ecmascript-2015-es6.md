EcmaScript 2015 (còn gọi là ES6) đã có mặt từ vài năm nay, và các tính năng mới khác có thể được sử dụng theo những cách thông minh. Tôi muốn liệt kê và thảo luận một trong số những điều đó, hi vọng bạn sẽ thấy chúng hữu ích. Nếu bạn có những trick khác, vui lòng comment ở phía dưới.

### Tham số bắt buộc

ES6 cho phép bạn set giá trị mặc định cho tham số của hàm, và nó sẽ được sử dụng nếu như hàm được gọi mà ko có tham số đó. Sau đây là cách mà các bạn có thể bắt buộc phải truyền đủ tham số khi gọi hàm;

```
const required = () => {throw new Error('Missing parameter')};

const add_1 = (a = required(), b = required()) => a + b;
const add_2 = (a, b) => a + b;

add_1(1, 2) //3
add_2(1, 2) //3
add_1(1) // Error: Missing parameter.
add_2(1) // NaN
```

### Hàm "reduce"

Hàm "reduce" của Array là 1 hàm rất linh hoạt. Nó thường được sử dụng để chuyển đổi một mảng thành một giá trị duy nhất. Nhưng bạn có thể làm nhiều hơn với nó.

Lưu ý: Các trick dựa trên giá trị đầu vào là Array hoặc Object.

- Sử dụng "reduce" để "map" và "filter" đồng thời.
	
	Giả sử bạn có một list các item, bạn muốn update mỗi item (map) và sau đó lọc ra vài item (filter). Điều đó có nghĩa là bạn sẽ phải duyệt danh sách 2 lần. Với reduce bạn chỉ cần duyệt danh sách 1 lần là đủ.
	
	```
	const numbers = [10, 20, 30, 40];
	// Nhân đôi giá trị các phần tử mảng number và đưa ra các giá trị lớn hơn 50.
	const doubledOver50 = numbers.reduce((finalList, num) => {
	  num = num * 2; //map

	  //filter
	  if (num > 50) {
		finalList.push(num);
	  }
	  return finalList;
	}, []);
	doubledOver50; // [60, 80]
	```

- Sử dụng "reduce" thay thế "map" hoặc "filter"

	Từ ví dụ trên bạn có thể thấy rằng có thể thay thế map và filter bằng reduce.
- Đếm số phần tử trùng nhau của mảng phần tử (Convert Array -> Object)

	```
	var cars = ['BMW','Benz', 'Benz', 'Tesla', 'BMW', 'Toyota'];
	var carsObj = cars.reduce(function (obj, name) { 
	   obj[name] = obj[name] ? ++obj[name] : 1;
	  return obj;
	}, {});
	carsObj; // => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }
	```

### Object destructuring

- Loại bỏ các thuộc tính không mong muốn
Đôi khi bạn muốn lọai bỏ một thuộc tính không mong muốn vì chúng chứa thông in nhạy cảm hoặc đơn giản là quá lớn. Thay vì lặp trên toàn bộ các đối tượng để loại bỏ chúng thì chúng ta có cách để trích xuất các thuộc tính và giữ lại những cái hữu ích.
Ở ví dụ dưới đây, ta sẽ loại bỏ thuộc _internal và toBig. 

	```
	let {_internal, tooBig, ...cleanObject} = {el1: '1', _internal:"secret", tooBig:{}, el2: '2', el3: '3'};
	console.log(cleanObject); // {el1: '1', el2: '2', el3: '3'}
	```
	
- Destructure nested objects in function params

	```
	var car = {
	  model: 'bmw 2018',
	  engine: {
		v6: true,
		turbo: true,
		vin: 12345
	  }
	}
	const modelAndVIN = ({model, engine: {vin}}) => {
	  console.log(`model: ${model} vin: ${vin}`);
	}
	modelAndVIN(car); // => model: bmw 2018  vin: 12345
	```
	
- Merge object

	ES6 có một toán tử mới là spread operator (ký hiệu bởi ba chấm). Nó thường được dùng để giải mã giá trị của mảng, nhưng bạn cũng có thể dùng nó trên Object. Ta có thể dùng nó để merge 2 object khác nhau, key của object2 sẽ ghi đè key của object1:
	```
	let object1 = { a:1, b:2,c:3 }
	let object2 = { b:30, c:40, d:50}
	let merged = {…object1, …object2}
	console.log(merged) // {a:1, b:30, c:40, d:50}
	```
	
### Sets

- De-duping Arrays với Sets.

	Với ES6 bạn có thể de-dupe items một cách đơn giản sử dụng Sets, Sets chỉ chấp nhận các giá trị unique được lưu trữ.
	
	```
	let arr = [1, 1, 2, 2, 3, 3];
	let deduped = [...new Set(arr)] // [1, 2, 3]
	```
	
- Sử dụng method của Array.

	Để convert Sets sang Array có một cách đơn giản là sử dụng spread operator(...) từ đó bạn có thể thoải mái dùng các method của Array với Sets.
	
	```
	let mySet = new Set([1,2, 3, 4, 5]);
	var filtered = [...mySet].filter((x) => x > 3) // [4, 5]
	```
	
### Array destructuring

- Swap value

	```
	let param1 = 1;
	let param2 = 2;
	//swap and assign param1 & param2 each others values
	[param1, param2] = [param2, param1];
	console.log(param1) // 2
	console.log(param2) // 1
	```
	
- Nhận và assign nhiều giá trị từ một hàm.

	```
	async function getFullPost(){
	  return await Promise.all([
		fetch('/post'),
		fetch('/comments')
	  ]);
	}
	const [post, comments] = getFullPost();
	```
    
    ### Tài liệu tham khảo
    https://medium.freecodecamp.org/check-out-these-useful-ecmascript-2015-es6-tips-and-tricks-6db105590377