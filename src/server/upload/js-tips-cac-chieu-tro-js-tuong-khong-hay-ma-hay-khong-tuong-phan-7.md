Xin chào các bạn,

Sau một thời gian trì hoãn, hôm nay mình tiếp tục chia sẻ với các bạn một số thủ thuật, kiến thức về JS, tiếp nối chuỗi series cũng <em>"hơi hơi dài"</em> của mình. Nếu chưa xem các bài trước thì các  bạn thử xem nhé, biết đâu bạn có thể tìm được dăm ba điều thú vị:

[[JS tips] Các "chiêu trò" JS tưởng không hay mà hay không tưởng](https://viblo.asia/s/cac-chieu-tro-js-tuong-khong-hay-ma-hay-khong-tuong-DVK2jDyjKLj)

Hôm nay mình sẽ chia sẻ tới các bạn ba vấn đề mình trích nguồn từ [anonystick](anonystick.com), cùng xem nhé! 

![](https://images.viblo.asia/fa5f8563-8f7e-4ae9-8be7-dfdfd36fa23e.jpg)

<h2>1. Vì sao forEach không support async/await?</h2>

Vấn đề này cũng đã được hỏi khá là nhiều với dân JS phải không? Và có nhiều câu trả lời được đưa ra nhằm giải thích hoặc trả lời cho câu hỏi đề bài, nhưng các câu trả lời hầu như là đưa ra giải pháp chứ không phải là giải thích cho việc <b>vì sao forEach lại không support async/await</b>.

![](https://images.viblo.asia/c781500a-6c7a-426c-becc-bb5545e8e59f.png)

Hoặc là:

![](https://images.viblo.asia/71062cd3-6c14-425a-a907-68b7f8f574d6.png)

Vậy thì chúng ta hãy cùng nhau tìm hiểu nhé!

Hãy xem xét một ví dụ dưới đây khi chúng ta đang sử dụng ```forEach``` và ```async/await```.
```javascript
let count = 0;
hello = async items => {
  	items.forEach( async () => {
     	await someAPICall();
     	count++;
  	})
  	console.log("count = " + count);
}
someAPICall = () => {
	return new Promise((resolve,reject) => {
		setTimeout(() => {
		resolve("done")
		}, 100);
	})
}
hello(['1','2','3','4']);
```

Nhưng hãy chú ý tới việc gọi hàm ```await someAPICall()``` . Giả như chúng ta comment nó lại, thì sao nhỉ?

```javascript
let count = 0;
hello = async items => {
  	items.forEach(async () => {
     	//await someAPICall();
     	count++;
  	})
  	console.log("count = " + count);
}
...
```

Chạy thử thì các bạn sẽ thấy kết quả sẽ là ```count = 4``` , nhưng nếu ta không comment thì kết quả sẽ là ```count = 0``` . Ô vì sao lại thế? :thinking::thinking::thinking: Để lý giải được thì cùng nhau đọc tiếp nào.

Ta hãy xem JS triển khai function forEach như thế nào nhé, việc này đã được giải thích rất rõ trong bài viết của [developer.mozilla.org](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) ở mục Polyfill. Chúng ta hãy chú ý đoạn code này nhé: 

```javascript
if (k in O) {
	// i. Let kValue be the result of calling the Get internal
	// method of O with argument Pk.
	kValue = O[k];
	// ii. Call the Call internal method of callback with T as
	// the this value and argument list containing kValue, k, and O.
	callback.call(T, kValue, k, O);
}
```

Ở đây chúng ta chú ý về 3 elements được trả về trong callback đó chính là elements, index, và array truyền vào. Theo cú pháp sau:

```javascript
const letters = ['a', 'b', 'c'];
letters.forEach((letter, index, arr) => {
  console.log(letter,index, arr);
});
// 3 elements được trả về lần lượt là elements, index, và array ban đầu
// 'a', 0, ['a', 'b', 'c']
// 'b', 1, ['a', 'b', 'c']
// 'c', 2, ['a', 'b', 'c']
```

Nếu bạn nhìn kỹ thì 3 elements được trả về lần lượt là elements, index, và array ban đầu như vậy chứng tỏ rằng <b>forEach không chờ asynchronous process trong callback</b>. Điều đó có nghĩa là, forEach mà bạn sử dụng không xây dựng trong quá trình asynchronous.

Đến đây thì OK rồi phải không các bạn, chúng ta đã lý giải được vì sao forEach lại không support async/await rồi nhé. Thế thì làm thế nào sử dụng được async/await trong forEach thì... mình đợi comment của các bạn nhé ;) 

<h2>2. Debounce vs throttle javascript</h2>

Các bạn đã nghe tới 2 cái này của JS chưa? <b>Đì-bao-sờ (debounce)</b> và <b>thờ-rót-tồ (throttle)</b> là gì nhỉ? Nếu bạn biết rõ rồi thì khỏi bàn nhé, nhưng mà với các bạn chưa biết thì hai khái niệm này hay lắm đó. 

Trước khi đi vào khái niệm về throttle và debounce và thì chúng ta sẽ xem qua tác dụng tuyệt vời mà hai khái niệm này mang lại cho lập trình viên JS. Đầu tiên ta phải nhìn nhận rằng trong lập trình có những event như ```resize```, ```scroll```, ```keyup```, ```keydown``` hoặc những chức năng tìm kiếm văn bản tại ứng dụng đều kích hoạt *sự kiện không giới hạn*. 

Ví dụ khi bạn cho người dùng tìm kiếm dữ liệu thì người dùng sẽ nhập text và lúc đó dữ liệu search liên tục dưới database thông qua ajax call. Điều đó làm giảm hiệu suất tìm kiếm, tăng khối lượng làm việc của browser. Điều này không chỉ làm giảm trải nghiệm của người dùng mà còn làm server của chúng ta nặng nề hơn. Vì vậy debounce và throttle đến đây để giúp chúng ta ngăn chặn những điều đó.

<h3>2.1 Debounce</h3>

Một ví dụ nhỏ về <b>debounce</b> dễ hiểu như sau: Hãy tưởng tượng bạn đang đi vào thang máy, trung bình mỗi thang máy sẽ chờ 5s để đóng cửa lại. Nhưng bỗng một người chạy từ đâu tới và cánh cửa thang máy lại mở ra và kích hoạt lại thời gian chờ đó là 5s. Và cứ thế cho đến khi không còn ai đến thì thang máy sẽ đóng cửa. Đó chính là cơ chế làm việc của debounce trong JS. Và thêm một ví dụ cụ thể trong lập trình mà chúng ta hay thường gặp đó là search text trong ứng dụng ... Cụ thể hơn là một ví dụ ở tiki.vn, hình như họ đã quên kích hoạt sư kiện này.

![](https://images.viblo.asia/2049acb2-e98c-487c-a4a2-af780f456332.gif)

Nếu như 100, 1000 người hay nhiều hơn thế đều thực hiện search thế thì khả năng hệ thống sẽ chậm đi trông thấy. Chính vì vậy, sử dụng <b>debounce</b> để giải quyết vấn đề sẽ như sau.

Đầu tiên ta tạo file ```index.html```
```html
<div>
    <input type="text" style="height:50px; width: 200px" id="debounce"/>
</div>
```


Nếu chúng ta không dùng thủ thuật <b>debounce</b> thì sẽ giống như tiki như thế này;

```javascript
window.onload = () => {
    function ajax (data) {
        console.log(new Date().toLocaleTimeString() + ' - ' + data)
    }

    document.querySelector('#debounce').addEventListener('keyup', e => {
        ajax(e.target.value)
    })
}
```

Kết quả có thể dự đoán được như sau:

![](https://images.viblo.asia/fedad2f0-e443-492f-ad94-af3c547bb39a.jpg)

 Nhưng khi cắm <b>debounce</b> vào thì code như nào nhỉ:
 
 ```javascript
 window.onload = () => {
    function ajax (data) {
        console.log(new Date().toLocaleTimeString() + ' - ' + data)
    }

    function debounce (fn, delay) {
        return args => {
            clearTimeout(fn.id)

            fn.id = setTimeout(() => {
                fn.call(this, args)
            }, delay)
        }
    }
    
    const debounceAjax = debounce(ajax, 1000)

    document.querySelector('#debounce').addEventListener('keyup', e => {
        debounceAjax(e.target.value)
    })
}
 ```

![](https://images.viblo.asia/e73c571e-c995-40cb-ae0a-33ab72d4b8f2.gif)

Lợi hại hơn rồi phải không các bạn? Điều này giúp server giảm query liên tục khi user nhập text tìm kiếm, khi user ngừng nhập trong vòng 1s thì sự kiện tìm kiếm mới tự kích hoạt. Các bạn có thể tăng hoặc giảm số giây tùy thuộc vào bài toán của các bạn nhé!

<h3>2.2 Throttle</h3>

Tác dụng của throttle cũng giống như debouce vậy, nhưng chỉ khác nhau ở chỗ nếu như ta lấy thang máy làm ví dụ cho debounce thì ở đây nó giống như là tàu điện ngầm. Nó không cần biết có bao nhiêu người đến, nó chỉ biết cứ 15 phút cửa tàu sẽ mở ra và đóng lại. Điều đó có nghĩa là có bao nhiêu sự kiện được kích hoạt thì đến một thời gian nào đó nó chỉ thực hiện một sự kiện mà thôi. Và khi thực hiện xong thì nó sẽ tạo lại thời gian như thế cho bước tiếp theo. 

```javascript
window.onload = () => {
    function ajax (data) {
        console.log(new Date().toLocaleTimeString() + ' - ' + data)
    }

    function throttle (fn, delay) {
        return args => {
            if (fn.id) return

            fn.id = setTimeout(() => {
                fn.call(this, args)
                clearTimeout(fn.id)
                fn.id = null
            }, delay)
        }
    }

    const throttleAjax = throttle(ajax, 1000)

    document.querySelector('#debounce').addEventListener('keyup', e => {
        throttleAjax(e.target.value)
    })
}
```

Kết quả thì có khác đôi chút nhé các bạn. Ở đây bạn nhìn kỹ ở đây thì bán sẽ thấy, cứ 1s thì sự kiện được kích hoạt, và cứ thế cho đến khi người dùng không còn nhập tìm kiếm nữa.

![](https://images.viblo.asia/57465e9c-3dce-4fbf-be1b-f13d213e7d0f.gif)


<h2>3. Sự khác nhau giữa Shallow copying và Deep copying trong object javascript</h2>

Copy object, một bài toán quá xưa với dân JS rồi, và nhắm mắt lại cũng có thể liệt kê được dăm ba cách để làm chuyện này phải không nào. Nhưng với câu hỏi ở phần tiêu đề, liệu rằng bạn đã thực sự trả lời được chúng trong các cuộc phỏng vấn? Trong tip cuối cùng này hãy cùng nhau xem lại và trả lời nhé.

<h3>3.1. Các cách copy object trong JS</h3>

Mình đã đề cập bên trên là có rất nhiều cách đúng không nào, nhưng ở đây mình chỉ liệt kê 3 cách thôi nhé, các bạn hãy để các cách mà các bạn biết dưới comment nhé!

 - Sử dụng ```Object.assign()```

Một cách từ rất lâu và vẫn thông dụng:

```javascript
const obj = {a:1,b:2,c:3};

const clone = Object.assign({},obj);

console.log(clone); // {a:1,b:2,c:3};
```

 - Sử dụng ```spread operatior``` trong ES6

Mới được ra đời những năm gần đây nhưng <em>em nó</em> lại rất được ưa chuộng bởi các anh dev:

```javascript
const obj = {a:1,b:2,c:3};

const clone = {...obj};

console.log(clone); // {a:1,b:2,c:3};
```


 - ```JSON.parse()``` và ```JSON.stringify()```

Cách cuối này thì khỏi bàn rồi:

```javascript
const obj = {a:1,b:2,c:{d:3}};

const clone = JSON.parse(JSON.stringify(obj));

console.log(clone); // {a:1,b:2,c:{d:3}};
```

Trong 3 cách copy object trên thì 2 trong số đó là thuộc <b>shallow copy</b>, đó là ```Object.assign()```, và ```Spread Operator```. Còn <b>deep copy</b> chính là cách thứ 3 - Sử dụng ```JSON.parse()``` và ```JSON.stringify()```. Tại sao lại thế thì kiên nhẫn đọc nốt đoạn sau cùng này nào.


<h3>3.2. Shallow copying và Deep copying </h3>

Nhiệm vụ của shallow copy là chỉ copy những giá trị nông, nghĩa là nó *chỉ sao chép các giá trị đối tượng bình thường nhưng các giá trị lồng nhau vẫn sử dụng reference đến một đối tượng ban đầu*

Ví dụ:

```javascript
const obj = {a:1,b:2,c:{d:3}};
const shallowClone = {...obj};
obj.c.d = 34; // chúng ta thay đổi giá trị d của object gốc
console.log(obj); // kết quả cho chúng ta thấy {a:1,b:2,c:{d:34}} 
console.log(shallowClone); // nhưng object mà chúng ta clone ra cũng bị thay đổi theo {a:1,b:2,c:{d:34}}
```

Qua ví dụ chúng ta thấy rằng chúng ta thay đổi giá trị ```d``` của object gốc ```d = 34```, nhưng <b>object mà chúng ta clone ra cũng bị thay đổi theo</b> ```{a:1,b:2,c:{d:34}}```. Chuyện quái gì vậy?? Đơn giản đó là nó vẫn giữ những giá trị reference của object gốc là obj. Giờ thì chúng ta hiểu hơn rồi phải không?

Giờ chúng ta hãy ngó qua <b>deep copy</b>. Nếu bạn hiểu <b>shallow copy</b> rồi thì <b>deep copy</b> đơn giản là *cũng giống như clone shallow nhưng các giá trị reference trong object gốc không thay trong object clone*.

Ví dụ về <b>deep clone</b> sử dụng sử dụng ```JSON.parse()``` và ```JSON.stringify()```

```javascript
const obj = {a:1,b:2,c:{d:3}};
const deepClone = JSON.parse(JSON.stringify(obj));
console.log(deepClone); // {a:1,b:2,c:{d:3}};
```

Bây giờ chúng ta cũng tương tự làm như các trên update ```d = 34```, thì chuyện gì xảy ra:

```javascript
obj.c.d = 34;
console.log(obj); // {a:1,b:2,c:{d:34}}
console.log(deepClone); // {a:1,b:2,c:{d:3}}
```

Ta thấy, khi update``` d = 34``` thì *object gốc đã thay đổi nhưng object clone thì không* bởi vì nó không phải là reference type của object gốc nữa rồi.

Đó, giờ thì mọi chuyện đã rõ về shallow và deep copy rồi nhé.

Nhưng, đó chưa phải là tất cả, bonus thêm một chút...

<h3>3.3. Sự hạn chế khi dùng deep copy trong JSON</h3>

Thêm một chi tiết nữa đó là một nhược điểm khi sử dụng deep copy ```JSON.parse()``` và ```JSON.stringify()``` đó là đôi khi bị miss những tham số của bạn, nêu tham số đó bạn gán ```underfined``` hoặc ```NaN``` ...

```javascript
JSON.parse(
  JSON.stringify({
    a: new Date(),
    b: NaN,
    c: new Function(),
    d: undefined,
    e: function() {},
    f: Number,
    g: false,
    h: Infinity
  })
)
```

Và kết quả test trên Chrome như sau:

![](https://images.viblo.asia/9b27417b-4485-483d-8a55-54b487987c80.jpg)

Các bạn thấy đấy, một số params đã một đi không trở lại, chính vì vậy hãy cẩn thận những gì JS mang lại cho chúng ta.

<h2>Kết luận</h2>

Và thế là cũng tới kết bài, cảm ơn các bạn đã kiên nhẫn theo dõi tới đây, và mình kì vọng rằng 3 thủ thuật lần này sẽ mang tới những kiến thức dù cũ nhưng cũng rất là hay cho những bạn muốn tìm hiểu.

Xin cảm ơn!

<h4>Reference</h4>

- [Vì sao foreach không support async await](https://anonystick.com/blog-developer/vi-sao-foreach-khong-support-async-await-2020052381240532)
- [debounce vs throttle javascript](https://anonystick.com/blog-developer/debounce-vs-throttle-javascript-202005261421546)
- [Phỏng vấn: Sự khác nhau giữa Shallow copying và Deep copying trong object javascript.](https://anonystick.com/blog-developer/phong-van-su-khac-nhau-giua-shallow-copying-va-deep-copying-trong-object-javascript-2019112823755023)