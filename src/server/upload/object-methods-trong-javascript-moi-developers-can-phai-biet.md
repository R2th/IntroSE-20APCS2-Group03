**Đây là một bài viết thuộc series** ["tips and tricks javascript"](https://anonystick.com/)
<p><strong>Object javascript l&agrave; g&igrave;? Thật ra hầu hết mọi thứ trong javascript đều l&agrave; object. Nhưng ở b&agrave;i post n&agrave;y th&igrave;, ch&uacute;ng ta sẽ t&igrave;m hiểu những method object được sử dụng nhiều v&agrave; rộng r&atilde;i nhất, đến nỗi dự &aacute;n n&agrave;o cũng phải sử dụng đến. B&ecirc;n cạnh đ&oacute; c&ograve;n kể đến những&nbsp;</strong><a href="https://anonystick.com/blog-developer/javascript-developer-javascript-nen-biet-nhung-method-arrays-nao-trong-javascript-x0ZB3R6E"><strong>&quot;Array method in javascript&quot;&nbsp;</strong></a></p>

<h2>Object javascript l&agrave; g&igrave;?</h2>


<p>Để hiểu hết tối đa b&agrave;i viết n&agrave;y th&igrave; trước ti&ecirc;n bạn phải hiểu &quot;Object javascript l&agrave; g&igrave;?&quot; v&agrave; hơn hết bạn phải hiểu c&aacute;ch creating, modifying, v&agrave; working một object. Ở những hướng dẫn trước của tipjs, đ&atilde; n&oacute;i nhiều về Object bạn c&oacute; thể xem qua. Ở b&agrave;i trước <strong><a href="https://anonystick.com/blog-developer/javascript-developer-javascript-nen-biet-nhung-method-arrays-nao-trong-javascript-x0ZB3R6E">&quot;Array method in javascript&quot;&nbsp;</a> ch&uacute;ng t&ocirc;i đ&atilde; n&oacute;i rất nhiều về c&aacute;ch sử dụng method của Array.</strong></p>

<p>Object trong javascript l&agrave; một collection <code>key/value</code>. Trong đ&oacute; c&aacute;c gi&aacute; trị c&oacute; thể bao gồm c&aacute;c properties v&agrave; methods v&agrave; c&oacute; thể chứa tất cả c&aacute;c loại dữ liệu JavaScript kh&aacute;c, chẳng hạn như <code>String</code>, <code>Number</code> v&agrave; <code>Booleans</code>.</p>

<p>Object c&oacute; nhiều method được t&iacute;ch hợp hữu &iacute;ch m&agrave; ch&uacute;ng ta c&oacute; thể sử dụng v&agrave; truy cập để l&agrave;m việc với c&aacute;c Object ri&ecirc;ng lẻ một c&aacute;ch đơn giản. Hướng dẫn củ b&agrave;i post n&agrave;y sẽ đi qua c&aacute;c method Object t&iacute;ch hợp quan trọng, v&agrave; k&egrave;m theo đ&oacute; l&agrave; những v&iacute; dụ minh hoạ cho từng trường hợp cụ thể khi sử dụng object.</p>

<h2>Object.create()</h2>

<p><code>Object.create()</code> l&agrave; một method được sử dụng để tạo ra một Object mới v&agrave; d&ugrave;ng object đ&oacute; để mở rộng hơn cho một object, ch&uacute;ng ta c&ugrave;ng xem một v&iacute; dụ dưới đ&acirc;y.</p>

```
// Initialize an object with properties and methods
const job = {
    position: 'cashier',
    type: 'hourly',
    isAvailable: true,
    showDetails() {
        const accepting = this.isAvailable ? 'is accepting applications' : "is not currently accepting applications";

        console.log(`The ${this.position} position is ${this.type} and ${accepting}.`);
    }
};

// Use Object.create to pass properties
const barista = Object.create(job);

barista.position = "barista";
barista.showDetails();

Output
The barista position is hourly and is accepting applications.
```

<p>Tr&ecirc;n đ&oacute; ta cũng thấy l&agrave; ch&uacute;ng ta c&oacute; thể thay đổi gia trị của một properties của Object mới m&agrave; ta vừa sử dụng <code>Object.create()</code> .</p>

<h2>Object.keys()</h2>

<p><code>Object.keys()</code> l&agrave; một method d&ugrave;ng để tạo ra một Array với tất cả key của một Object. V&agrave; theo kinh nghiệm của tipjs th&igrave; c&oacute; lẽ đ&acirc;y l&agrave; một method rất hay. V&igrave; tipjs đ&atilde; sử dụng rất nhiều.</p>

```
// Initialize an object
const employees = {
    boss: 'Michael',
    secretary: 'Pam',
    sales: 'Jim',
    accountant: 'Oscar'
};

// Get the keys of the object
const keys = Object.keys(employees);

console.log(keys);

Output
["boss", "secretary", "sales", "accountant"]
```

<p>Sau khi ch&uacute;ng ta đ&atilde; c&oacute; một Array từ sử dụng <code>Object.keys()</code> th&igrave; ch&uacute;ng ta c&oacute; thể tiếp tục sử dụng <a href="https://anonystick.com/blog-developer/javascript-developer-javascript-nen-biet-nhung-method-arrays-nao-trong-javascript-x0ZB3R6E">Method Array in javascript</a> để ph&aacute;t triển th&ecirc;m như iterate:</p>

```
// Iterate through the keys
Object.keys(employees).forEach(key => {
    let value = employees[key];

     console.log(`${key}: ${value}`);
});

Output

boss: Michael
secretary: Pam
sales: Jim
accountant: Oscar
```

<h2>Object.values()</h2>

<p><code>Object.values()</code> l&agrave; một method ngược lại với <code>Object.keys()</code> th&igrave; n&oacute; tạo một new Array với tất cả những gi&aacute; trị của một object.</p>

```
// Initialize an object
const session = {
    id: 1,
    time: `26-July-2018`,
    device: 'mobile',
    browser: 'Chrome'
};

// Get all values of the object
const values = Object.values(session);

console.log(values);
Output
[1, "26-July-2018", "mobile", "Chrome"]
```

<h2>Object.entries()</h2>

<p><code>Object.entries()</code> l&agrave; một method tạo một nested array với key/value của một Object.</p>

```
// Initialize an object
const operatingSystem = {
    name: 'Ubuntu',
    version: 18.04,
    license: 'Open Source'
};

// Get the object key/value pairs
const entries = Object.entries(operatingSystem);

console.log(entries);
Output
[
    ["name", "Ubuntu"]
    ["version", 18.04]
    ["license", "Open Source"]
]
```

<h2>Object.assign()</h2>

<p><code>Object.assign()</code> l&agrave; một method d&ugrave;ng để sao ch&eacute;p những gi&aacute; trị từ một object n&agrave;y sang một object kh&aacute;c. Ở v&iacute; dụ dưới đ&acirc;y, ch&uacute;ng ta sử dụng <code>Object.assign()</code> để merge ch&uacute;ng lại với nhau:</p>

```
// Initialize an object
const name = {
    firstName: 'Philip',
    lastName: 'Fry'
};

// Initialize another object
const details = {
    job: 'Delivery Boy',
    employer: 'Planet Express'
};

// Merge the objects
const character = Object.assign(name, details);

console.log(character);
Output
{firstName: "Philip", lastName: "Fry", job: "Delivery Boy", employer: "Planet Express"}
```

<p>Nhưng điều quang trọng l&agrave; khi sử dụng <code>Object.assign()</code> th&igrave; đ&oacute; l&agrave; một shallow-cloning. Xem th&ecirc;m <a href="https://anonystick.com/blog-developer/objectassign-co-the-lam-nhung-gi-voi-object-javascript-PPqgJNrs.jsx" target="_blank">&quot;shallow-cloning in javascript&quot;</a>. Ngo&agrave;i ra th&igrave; merge một object th&igrave; ch&uacute;ng ta c&oacute; thể sử dụng <code>(...)</code>, xem tiếp v&iacute; dụ nếu bạn c&ograve;n hứng th&uacute;:</p>

```
// Initialize an object
const name = {
    firstName: 'Philip',
    lastName: 'Fry'
};

// Initialize another object
const details = {
    job: 'Delivery Boy',
    employer: 'Planet Express'
};

// Merge the object with the spread operator
const character = {...name, ...details}

console.log(character);
Output
{firstName: "Philip", lastName: "Fry", job: "Delivery Boy", employer: "Planet Express"}
```

<p>V&agrave; <a href="https://anonystick.com/blog-developer/5-cach-su-dung-spread-operator-trong-javascript-2020040666007774" target="_blank">spread syntax</a> cũng l&agrave; một shallow-cloning. Xem th&ecirc;m <a href="https://anonystick.com/blog-developer/phong-van-su-khac-nhau-giua-shallow-copying-va-deep-copying-trong-object-javascript-2019112823755023" target="_blank">Sự kh&aacute;c nhau giữa Shallow copying v&agrave; Deep copying trong object javascript</a></p>

<h2>Object.freeze()</h2>

<p><code>Object.freeze()</code> d&ugrave;ng để ngăn chặn một h&agrave;nh vi sử đổi thuộc t&iacute;nh gi&aacute; trị của một object, ngo&agrave;i ra cũng c&oacute; thể ngăn chặn một h&agrave;nh vi như xo&aacute; or add th&ecirc;m thuộc t&iacute;nh.</p>

```
// Initialize an object
const user = {
    username: 'AzureDiamond',
    password: 'hunter2'
};

// Freeze the object
const newUser = Object.freeze(user);

newUser.password = '*******';
newUser.active = true;

console.log(newUser);
Output
{username: "AzureDiamond", password: "hunter2"}
```

<p>Để hiểu <code>Object.freeze()</code> kh&ocirc;ng phải l&agrave; một v&iacute; dụ n&agrave;y l&agrave; bạn c&oacute; thể hiểu được những tipjs gợi &yacute; bạn c&oacute; thể đọc th&ecirc;m về b&agrave;i viết n&agrave;y: <a href="https://anonystick.com/blog-developer/how-can-i-deep-freeze-an-object-in-javascript-2020041412698143" target="_blank">How can I deep freeze an object in JavaScript?</a></p>

<h2>Object.seal()</h2>

<p><code>Object.seal()</code> th&igrave; hơi ngược lại với <code>Object.freeze()</code> đ&oacute; l&agrave; d&ugrave;ng để ngăn chặn h&agrave;nh vi add th&ecirc;m một new properties nhưng lại cho ph&eacute;p modification những thuộc t&iacute;nh đ&atilde; tồn tại trước đ&oacute;. V&iacute; dụ:</p>

```
// Initialize an object
const user = {
    username: 'AzureDiamond',
    password: 'hunter2'
};

// Seal the object
const newUser = Object.seal(user);

newUser.password = '*******';
newUser.active = true;

console.log(newUser);
Output
{username: "AzureDiamond", password: "*******"}
```

<p>Đến đ&acirc;y, ch&uacute;ng t&ocirc;i khuy&ecirc;n bạn tiếp tục xem th&ecirc;m b&agrave;i viết về <a href="https://anonystick.com/blog-developer/golobal-const-va-objectfreeze-trong-javascript-2019042650544299" target="_blank">&quot;Sự kh&aacute;c nhau Object.freeze() v&agrave; Object.seal() trong JavaScript&quot;</a></p>

<h2>Kết luận v&agrave; r&uacute;t ra b&agrave;i học</h2>

<p>Điều tuyệt vời nhất l&agrave; mang đến cho bạn một c&aacute;ch nh&igrave;n, hiểu v&agrave; sử dụng c&aacute;c method object trong javascript một c&aacute;ch hiệu quả v&agrave; đầy tinh tế. Mỗi v&iacute; dụ, ch&uacute;ng t&ocirc;i cố gắng truyền đến những b&agrave;i viết để đi s&acirc;u hơn nữa. Bạn đừng bỏ qua n&oacute; một c&aacute;ch l&atilde;ng ph&iacute;. V&igrave; mỗi b&agrave;i viết đều chứa đựng nhiều kiến thức hơn nữa. Ngo&agrave;i ra, bạn cũng n&ecirc;n t&igrave;m hiểu về <strong><a href="https://anonystick.com/blog-developer/javascript-developer-javascript-nen-biet-nhung-method-arrays-nao-trong-javascript-x0ZB3R6E">&quot;Array method in javascript&quot;</a>.</strong></p>

<p>Nếu bạn quan tâm đến bài viết về javascript vui lòng theo dõi : <a href="https://anonystick.com/" target="_blank">Tips and tricks javasccript</a></p>

<p>Tham khảo thêm: <a href="https://www.digitalocean.com/community/tutorials/how-to-use-object-methods-in-javascript" target="_blank">digitalocean.com</a></p>