Trả là hôm nọ mình có đọc qua một số tài liệu về `ES7` và thấy có một số tính mới khá là hay và tiện ích, đặc biệt là 2 `method` mới giúp chúng ta biến một `Object` thành một `Array` chỉ trong một nốt nhạc :dash::dash::dash:. Không dài dòng văn tự nữa, hay xem 2 `method` này hữu ích như thế nào nhé :yum:.

## Khi không có `ES7`...

Trước khi đi vào tìm hiểu 2 `method` thần thánh như đã giới thiệu thì mình muốn cho các bạn thấy việc biến biến một `Object` thành `Array` khi chưa có `ES7` nó khổ sở như thế nào :sleepy::sleepy::sleepy:.

***1.*** Dưới đây là một ví dụ khi các bạn muốn lấy ra các `key` của một `Object` rồi cho vào một `Array`.

***Khi không có `ES6`:***
```js
const object = {
    prop1: 1,
    prop2: 2
};

const objectKeys = [];

for (let objectKey in object) {
    objectKeys.push(objectKey);
}

console.log(objectKeys); // *** Array ["prop1", "prop2"]
```

***Với `ES6`:*** Cho những ai chưa biết thì `Object.keys` sẽ trả về một mảng chứa các `key` của một `Object` nhé.

```js
const object = {
    prop1: 1,
    prop2: 2
};

const objectKeys = Object.keys(object);

console.log(objectKeys); // *** Array ["prop1", "prop2"]
```

***2.*** Một ví dụ nữa khi các bạn muốn lấy ra tất cả các giá trị của một `Object` và cho vào một `Array`.

***Khi không có `ES6`:***
```js
const object = {
    prop1: 1,
    prop2: 2
};

const objectValues = [];

for (let objectKey in object) {
    objectValues.push(object[objectKey]);
}

console.log(objectValues); // *** Array [1, 2]
```

***Đây là khi `ES6` và cuộc, và tình hình cũng không tốt hơn là mấy :sweat_smile::sweat_smile::sweat_smile:.***

```js
const object = {
    prop1: 1,
    prop2: 2
};

var objectValues = [];

Object.keys(object).forEach(objectKey => {
	objectValues.push(object[objectKey]);
});

console.log(objectValues); // *** Array [1, 2]
```

Tuy không hề khó viết chút nào, những những cách trên khá là dài dòng. Không biết các bạn thấy thế nào, nhưng việc viết lại một `function` để biến một `Object` thành một `Array` cho mỗi dự án mới thực sự là một cực hình đối với mình.

## Và rồi `ES7` xuất hiện...

Mọi thứ trở nên dễ dàng hơn rất rất rất rất ... nhiều :muscle::muscle::muscle:.

### Object.values

`Method` này sẽ đưa tất cả giá trị của một `Object` vào một `Array`. 

```js
const object = {
    prop1: 1,
    prop2: 2
};

const objectValues = Object.values(object);

console.log(objectValues); // *** Array [1, 2]
```

### Object.entries

`Method` thứ 2 sẽ biến một `Object` vào một `Array` theo đúng nghĩa đen luôn :D.  Hơi khó giải thích, các bạn hãy xem ví dụ phía dưới để xem cách nó hoạt động nhé. 

```js
const object = {
    prop1: 1,
    prop2: 2
};

const objectValues = Object.entries(object);

console.log(objectValues); // Array [["prop1", 1], ["prop2", 2]]
```

`method` này cực kỳ hữu dụng khi bạn kết hợp nó với `Array destructuring` trong `ES6`.

```js
const object = {
    prop1: 1,
    prop2: 2
};

const objectInArray = Object.entries(object);

objectInArray.forEach(([key, value]) => {
  console.log(key);
  console.log(value);
});

/*
	*** kết quả:
	prop1
	1
	prop2
	2
*/
```

## Lời kết

Các bạn thấy thế nào, 2 `method` mới này quả là hữu ích phải không :kissing_smiling_eyes::kissing_smiling_eyes::kissing_smiling_eyes:, vừa ngắn gọn, vừa dễ dùng. Có điều là chúng không được nhiều trình duyệt hỗ trợ đâu nhé !. Những đây cũng không phải là một vấn đề quá lớn khi mà các các bạn hoàn toàn có thể dùng `Babel` để thêm `polyfill` cho 2 `method` này. Vậy thôi, chúc các bạn một ngày vui vẻ, nếu thấy hay thì các bạn hãy cho mình một like và share nhé. Bye :raised_hands::raised_hands::raised_hands:.