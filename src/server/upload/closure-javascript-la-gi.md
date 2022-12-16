Chào mn, trong javascript có rất rất nhiều khái niệm như hoisting, currying, higher-order-function,... Nhưng có một khái niệm có thể còn mơ hồ và bạn chưa biết nhiều về nó, đó chính là Closure. Vậy Closure là gì? trong bài này chúng ta sẽ tìm hiểu về nó nhé.

### Closure là gì?
Closure bao gồm nhiều function được bundled cùng với nhau, và hàm bên trong(inner function) có thể reference đến params hoặc variables của hàm bên ngoài(outer function), reference env đó còn được gọi là lexical enviroment. Clusure được tạo ở mọi lúc khi một function được tạo.
Lý thuyết có thể hơi khó hiểu mình cùng qua phần tiếp theo ví dụ để hiểu thêm nhé.

 ### Ví dụ về Closure
 - Có thể bạn đã nghe qua cụm từ như là "bảo toàn dữ liệu", và "bảo toàn dữ liệu" là gì?
 Closure có liên quan gì tới nó. Ok chúng ta tìm hiểu tiếp nhé.
 Khi bạn sử dụng Closure, variables và params của outer function chỉ được sử dụng ở trong outer function
 và những hàm bên trong(inner function), không thể sử dụng từ bên ngoài hàm được.
 
 ```javascript
 const getSecret = (secret) => {
  return {
    get: () => secret
  };
};

test('Closure for object privacy.', assert => {
  const msg = '.get() should have access to the closure.';
  const expected = 1;
  const obj = getSecret(1);

  const actual = obj.get();

  try {
    assert.ok(secret, 'This throws an error.');
  } catch (e) {
    assert.ok(true, `The secret var is only available
      to privileged methods.`);
  }

  assert.equal(actual, expected, msg);
  assert.end();
});
 ```
 
  Về ví dụ trên. get là phương thức nằm trong getSecret nên có có thể access tham số từ getSecret và chỉ có nó mới access được secret thôi.
 
 - Ngoài Object bảo toàn dữ liệu thì Closure còn có thể sử dụng stateful function.
 ```javascript
const secret = (msg) => () => msg;

test('secret', assert => {
  const msg = 'secret() should return a function that returns the passed secret.';

  const theSecret = 'Closures are easy.';
  const mySecret = secret(theSecret);

  const actual = mySecret();
  const expected = theSecret;

  assert.equal(actual, expected, msg);
  assert.end();
});
 ```
 
 Closure được sửa dụng rất rộng rãi trong ứng dụng, kỹ thuật Currying là một trong số đó. Bạn có thể tham khảo tại [đây](https://medium.com/better-programming/currying-inside-javascript-a19f29600880)
  
  Còn nhiều ví dụ hơn về Closuare bạn có thể tham khảo thêm tại [đây](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36).
  Hy vọng qua bài này bạn có thể hiểu thêm về Closure và áp dụng chúng vào công việc lập trình của mình. Cảm ơn!