Chúng ta vốn luôn quen với việc tập trung vào chất lượng code, nhưng lại bỏ qua chất lượng code Unit test. Điều đó khiến việc nhìn code Unit test trong project lúc nào trông cũng lộn xộn. Vì thế, chúng ta cũng nên tập làm quen với việc sử dụng eslint cả ở trong Jest nữa, mà cụ thể ở đây là *eslint-plugin-jest*.
> https://www.npmjs.com/package/eslint-plugin-jest

Một số rules của package này được gợi ý nên sử dụng trong project Unit test:

```
'jest/expect-expect': 'error',
'jest/lowercase-name': [
    'error',
    {
        ignore: ['describe'],
    },
],
'jest/no-disabled-tests': 'error'
'jest/no-done-callback': 'error',
'jest/no-duplicate-hooks': 'error',
'jest/no-conditional-expect': 'error',
'jest/no-export': 'error',
'jest/no-focused-tests': 'error',
'jest/no-identical-title': 'error',
'jest/no-interpolation-in-snapshots': 'error',
'jest/no-jasmine-globals': 'error',
'jest/no-jest-import': 'error',
'jest/no-large-snapshots': 'error',
'jest/no-mocks-import': 'error',
'jest/no-standalone-expect': 'error',
'jest/no-test-prefixes': 'error',
'jest/valid-describe': 'error',
'jest/valid-expect-in-promise': 'error',
'jest/prefer-to-have-length': 'warn',
'jest/valid-expect': 'error',
```

Chúng ta có thể cài đặt với project Unit test của mình để hiểu thêm về các rules trên. Tuy nhiên, bài viết này vẫn muốn giới thiệu một số rules hay ho nên sử dụng.

### jest/no-done-callback
```
test('foo', done => {
  function callback(data) {
    try {
      expect(data).toBe('foo');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```
Việc sử dụng callback khi viết test kiểm tra bất đồng bộ rất dễ xảy ra lỗi, vì đòi hỏi nhiều về việc hiểu và nắm được cách thức hoạt động khi lên kịch bản test, nếu không đúng thì việc test sẽ không được như mong đợi. Có hai tình huống cần phải thay đổi lại cách viết test:
- Với async oparation (hoạt động bất đồng bộ): Sử dụng *async/await* thay vì sử dụng *done*:
```
test('foo', async () => {
  const data = await fetchData();
  expect(data).toBe('foo');
});
```
Hoặc có thể sử dụng Promise như sau:
```
return fetchData().then(data => {...})
```

- Với setTimeout:

Sử dụng *jest.useFakeTimers()* ngay ở đầu test file. Sau đó sử dụng *jest.runAllTimers()* để lướt nhanh cho đến khi toàn bộ timers được thực thi. Tham khảo thêm về timer mocker [ở đây](https://jestjs.io/docs/timer-mocks).

### jest/no-conditional-expect

Sử dụng *conditional* đôi khi cũng dẫn đến việc có những expect âm thầm bị bỏ qua. Kể cả việc đặt trong *catch* cũng vậy.

```
it ('foo', () => {
    const result = doSomething();
    if (result === 1) {
        expect(1).toBe(1)
    }
})

it ('bar', () => {
    try {
        await foo();
    } catch (err) {
        expect(err).toMatchObject({ code: 'MODULE_NOT_FOUND' });
    }
})
```

Sẽ tốt hơn nếu viết như thế này

```
it ('foo', () => {
    const result = doSomething();
    expect(result).toBe(1);
    expect(1).toBe(1);
})

it ('throws an error', () => {
    await expect(foo).rejects.toThrow(Error);
})
```

### jest/no-identical-title

Rules này giúp tránh việc đặt title test case bị trùng tên. Ví dụ như sau:

```
it('should do bar', () => {});
it('should do bar', () => {}); // Has the same title as the previous test
```

### Kết luận
Việc tạo thói quen sử dụng eslint khi viết test sẽ giúp code unit test trở nên clear và chất lượng hơn, đảm bảo không bị bỏ sót bất kì trường hợp nào. Có thể tham khảo và đọc thêm về các rules [tại đây](https://github.com/jest-community/eslint-plugin-jest/tree/main/docs/rules).

Bài viết được lược dịch và tham khảo từ nhiều nguồn.