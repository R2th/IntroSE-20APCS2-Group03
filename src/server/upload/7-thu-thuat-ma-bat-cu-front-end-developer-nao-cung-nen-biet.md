Hello, xin chào mọi người hôm nay mình sẽ giới thiệu những **Tricks** hay mà có thể các bạn chưa sử dụng hoặc đã sử dụng rồi mà vẫn chưa biết về nó, để xem có hay ho hay không thì mình cũng tìm hiểu thôi nào.

## 1. Datalist element
Các bạn có để ý khi bạn vào một trang login hoặc nhập một thông tin gì đó như là search thì khi bạn focus vào input nó sẽ show ra cho mình những data như này:

![](https://images.viblo.asia/93211b44-9cab-4082-8a93-7ab82b01fd39.png)

Đó là nhờ vào thẻ datalist trong html:
- Định nghĩa danh sách trước khi bạn cần nhập
- Tạo tính năng "autocomplete" cho input tag

```html
<input list="animals" name="animal" id="animal">
<datalist id="animals">
    <option value="Cat">
    <option value="Dog">
    <option value="Chicken">
    <option value="Cow">
    <option value="Pig">
</datalist>
```

## 2 . Focus vào input khi click vào label
Cái này các bạn chắc hẵn đã sử dụng rất nhiều rồi, thông thường ta làm theo cách này:

```html
<input type="checkbox" name="checkbox" id="checkbox_id" value="value">
<label for="checkbox_id">I agree</label>
```

Bạn có thể thấy là ta cần tạo một thuộc tính **for** vào bên trong thẻ label để có thể kích hoạt focus. Nhưng có một cách đơn giản, ngắn hơn là bạn chỉ cần lồng thẻ input vào bên trong label là ok

```html
<label><input type="checkbox" name="checkbox" id="checkbox_id" value="value">I agree</label>
```

Đơn giản hơn rồi phải không nào.

## 3.  Writing mode
![](https://images.viblo.asia/2fcd9184-b66a-4c97-95a8-24908dc03016.png)

Có bao giờ bạn mong muốn sẽ tạo một đoạn text như hình thay vì theo chiều ngang từ trái qua phải mà là trừ trên xuống dưới?
Trong css có một thuộc tính là writing-mode sẽ giúp bạn làm được điều này

```html
<style>
.sideway { 
   writing-mode: vertical-rl;
}
.normal {
   width: 5%;
   float: left;
}
</style>
<p class="normal">
     Hi some paragraph text
</p>
<p class="sideway"> 
     Hey I'm some sidway text 
</p>
```

Ngoài ra nó còn có nhiều options khác:

```css
writing-mode: horizontal-tb;
writing-mode: vertical-rl;
writing-mode: vertical-lr;
writing-mode: sideways-rl;
writing-mode: sideways-lr;
```

## 4. calc() function css
 Khi bạn muốn tính toán một giá trị gì đó(như width chẳng hạn), thường thì chúng ta thường nghĩ sẽ tính toán điều này trong js hoặc **Preprocesser** như sass, scss. Nhưng trong css cũng đã hổ trợ calc() làm được điều đấy.
 
 ```css
 width: calc(5px + 100px);
width: calc(6em * 8);
width: calc(100% - 50px);
 ```
 
 ## 5. Math.round & Math.floor
 Trong *javascript* khi bạn muốn làm tròn xuống số nguyên gần nhất thì các bạn hay dùng **Math.floor** hoặc **Math.round** nếu bạn muốn làm tròn lên/xuống nếu phần thập phân lớn/nhỏ hơn 5
 
 ```javascript
 Math.floor(743.4343) // returns 743
 Math.round(812.777) // returns 813
 ```
 
 Nhưng cũng có cách hay ho bạn cũng có thể thử qua:
 
 ```javascript
 0|743.4343 // returns 743
Math.floor(743.4343) // returns 743

812.777+.5|0 // returns 813
Math.round(812.777) // returns 813
 ```
 
 Cũng hay ho phải không nào :))
 
 ## 6. Console.table
 Cũng giống như console.log() nhưng console.table() sẽ log ra không phải dạng json nữa mà nó là một dạng table ở ngay trong tab console luôn, nó giúp biểu diễn dữ liệu một cách tường minh dể hiểu
 
 ```javascript
 let car1 = { name : "Audi", model : "A4" }
let car2 = { name : "Volvo", model : "XC90" }
let car3 = { name : "Ford", model : "Fusion" }
console.table([car1, car2, car3]);
 ```
 
 ![](https://images.viblo.asia/b2268977-c1e5-4d70-b7be-ca872fc7b061.png)

## 7. In operator
Khi bạn check một thuộc tính có nằm trong một object hay không thì các bạn thường hay sử dụng:

**Đối với Array:** includes(), indexOf()

```javascript
[1, 2, 3, 4].indexOf(4) // return 3
[1, 2, 3, 4].includes(4) // return true
```

**Đối với Object:** hasOwnProperty(), Comparing with undefined( So sánh với undefined )

 ```javascript
const hero = {
  name: 'Batman'
};

hero.hasOwnProperty('name');     // => true
hero.hasOwnProperty('realName'); // => false

const hero = {
  name: 'Batman'
};

hero.name;     // => 'Batman'
hero.realName; // => undefined
 ```
 
 Và còn một cách cũng hay ho đó là sử dụng keyword **in**:
 
  ```javascript
 let cars = ['Audi', 'BMW', 'Mini', 'Bentley', 'Porsche'];
0 in cars        // returns true
3 in cars        // returns true
6 in cars        // returns false

const person = { firstName : "Dave", surname: "Smith", age: 34 };
'firstName' in person  // returns true
'surname' in person    // returns true
'age' in person        // returns true
'gendar' in person     // returns false
 ```
 
 ## Tổng kết
 Đến đây thì cũng hết rồi, trên đây là những thủ thuật hay có giúp các bạn có thêm kiến thức cho mình, cảm ơn các bạn.