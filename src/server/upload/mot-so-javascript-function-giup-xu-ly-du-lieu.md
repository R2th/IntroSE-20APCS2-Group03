![](https://images.viblo.asia/3d4301a2-29b6-48cc-a810-91bce4fa2983.jpeg)



**Lady and gentlemen!**


Chào mừng quý vị đến với bài viết thứ 4 của em, 4 bài viết cũng có nghĩa là em đã ở đây... 4 tháng. Không dài mà cũng không lâu :v  Và qua các bài viết vừa rồi thì em nhận ra 1 điều rằng: "Viết càng đơn giản, càng ngôn ngữ thuần thì sẽ có nhiều quý vị ghé thăm hơn ạ!"

Nhân vì sự ấy, hôm nay em xin gởi tới quý vị bài viết chỉ có only Javascript. Bài viết được mang tên "Một số javascript function giúp xử lý dữ liệu".

## Kiểm tra kiểu dữ liệu object

Kiểm tra kiểu của dữ liệu là một trong những điều mà chúng ta thường gặp nhất trong lúc xây dựng logic quý vị nhỉ?

Như quý vị đã biết hoặc chưa biết, thường thì người đời có câu rằng "In javascript everything is an object"![](https://images.viblo.asia/f3f91cc9-544d-4dd3-aadc-7f1dd34032f2.png)
> Ngay cả google nó cũng nghĩ vậy ạ =))

Nên việc kiểm tra dữ liệu đó có thực sự phải là một object không cũng có lúc phải dùng tới quý vị nhỉ?
> Bởi vì typeof [] nó cũng là "object" quý vị à

Dưới đây là func check type mà quý vị có thể đưa vào utils.js của dự án để sử dụng giúp việc coding nhanh gọn hơn ạ <3


```js
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1
 * }
 *
 * isPlainObject(new Foo)
 * // => false
 *
 * isPlainObject([1, 2, 3])
 * // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 })
 * // => true
 *
 * isPlainObject(Object.create(null))
 * // => true
 */
function isPlainObject(value) {
  if (
    !(typeof value === "object" && value !== null) ||
    Object.prototype.toString.call(value) != "[object Object]"
  ) {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}
```

## Cộng tổng giá trị của một mảng

Việc cộng tổng giá trị của hai biến, ba biến... hay tổng giá trị của một mảng, một object là những logic mà đúng ta phải thường gặp.

Dưới đây là một func cộng tổng giá trị của một array, mong có thể giúp gì được cho quý vị.
>Với những array bình thường như [1,2,3,4] thì quá đơn giản phải không ạ, nhưng giống như câu mà team leader của em thường nói "Cuộc sống đâu dễ dàng vậy eeeem" (chữ e kéo dài ạ :))) thì chúng ta phải gặp những mảng như này [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }]

>À mà thực ra cũng dễ phải không ạ!

```js
/**
 * This method is like `sum` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the value to be summed.
 * The iteratee is invoked with one argument: (value).
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {number} Returns the sum.
 * @example
 *
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }]
 *
 * sum(objects, ({ n }) => n)
 * // => 20
 */
function sum(array, iteratee) {
  let result;

  if (array != null && array.length) {
    for (const value of array) {
      let current;
      if (iteratee === undefined) {
        current = value;
      } else {
        current = iteratee(value);
      }

      if (current !== undefined) {
        result = result === undefined ? current : result + current;
      }
    }
    return result;
  }
  
  return 0;
}
```
## Lấy một giá trị radom trong mảng
Nghe có lẽ phi lý nhưng cũng rất... có lúc chúng ta cần phải dùng đến quý vị ạ!

Mong một func nhỏ này giúp được một trong những quý vị ạ!


```js
/**
 * Gets a random element from `array`.
 *
 * @param {Array} array The array to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * sample([1, 2, 3, 4])
 * // => 2
 */
function sample(array) {
  const length = array == null ? 0 : array.length
  return length ? array[Math.floor(Math.random() * length)] : undefined
}
```

## Lời nhắn gởi

Tới đây đêm cũng đã khuya, người viết cũng đến lúc dừng bút, mong những dòng code mọn này có thể giúp được quý vị chút nào.

Code trên có gì sai sót hay có bug mong quý vị chỉ giáo thêm ạ!

> Qua đây cũng sorry team leader vì đã bị mang vô làm ví dụ ạ !

Tham khảo: https://github.com/lodash/lodash