Trong bài viết này chúng ta sẽ cùng nhau tìm hiểu một số khái niệm và sẽ thử publish một npm package đơn giản. Tài liệu mà chúng ta sẽ dựa vào là https://docs.npmjs.com/creating-and-publishing-scoped-public-packages


Về scope, sẽ có [3 dạng scope](https://docs.npmjs.com/package-scope-access-level-and-visibility) khi public một npm package:
+ Unscoped - luôn luôn public
+ User scoped - private hoặc public
+ Org scoped - private hoặc public

Trong ví dụ này, chúng ta sẽ tập trung vào dạng **user scope** bởi vì nó sẽ không gặp phải vấn đề **trùng tên**.

# 1. Practice

## Create a package

```bash
mkdir how-to-publish-to-npm
cd how-to-publish-to-npm
npm init --scope=@nguyenyou
touch index.js
```

Bổ sung nội dung cho file `index.js` như sau:

```js
function helloworld() {
  console.log('Hello World')
}

module.exports = {
  helloworld,
}
```

Như vậy, thư viện mà chúng ta đang xây dựng chỉ đơn giản chưa một function helloworld, sẽ in ra một dòng chữ 'Hello World'

Tiếp theo, là công đoạn publish cái thư viện này. Nhưng, cần lưu ý, để thư viện của chúng ta có thể sử dụng được, đảm bảo rằng trong file `package.json` có chứa dòng `"main": "index.js"`:

Đây là file package.json của mình:

```json
{
  "name": "@nguyenyou/how-to-publish-to-npm",
  "version": "1.0.0",
  "description": "how to publish to npm",
  "main": "index.js",
  "author": "younguyen",
  "license": "MIT"
}
```

## Publish
Đầu tiên, để publish package, chúng ta cần phải tạo một tài khoản trên npm: https://docs.npmjs.com/creating-a-new-npm-user-account

Sau khi tạo xong tài khoản, tiến hành đăng nhập vào terminal:

```bash
npm login
```

Sau khi đăng nhập thành công, chúng ta đã sẵn sàng để publish package của mình, dùng câu lệnh:

```bash
$ npm publish --access public

npm notice 
npm notice 📦  @nguyenyou/how-to-publish-to-npm@1.0.0
npm notice === Tarball Contents === 
npm notice 91B  index.js    
npm notice 180B package.json
npm notice === Tarball Details === 
npm notice name:          @nguyenyou/how-to-publish-to-npm          
npm notice version:       1.0.0                                     
npm notice filename:      @nguyenyou/how-to-publish-to-npm-1.0.0.tgz
npm notice package size:  305 B                                     
npm notice unpacked size: 271 B                                     
npm notice shasum:        a599bcdb134c0da4e4239c686b3387e4e0a37169  
npm notice integrity:     sha512-2Rt3Lu/Gl3OxK[...]K7Dqn6BnWfB5w==  
npm notice total files:   2                                         
npm notice 
+ @nguyenyou/how-to-publish-to-npm@1.0.0
```

Chỉ đơn giản như vậy thôi, package của chúng ta đã được publish thành công lên **npm**

## Check

Thử khởi tạo một dự án node.js bất kỳ, sau đó cài package mà chúng ta vừa mới publish:

```bash
npm i @nguyenyou/how-to-publish-to-npm
```

Sử dụng: tạo một file `index.js` với nội dung như sau:

```js
const { helloworld } = require('@nguyenyou/how-to-publish-to-npm')

helloworld()
```

Chạy câu lệnh: node index.js và xem kết quả.

# 2. Conclusion

Trong bài viết này, chúng ta chỉ mới làm quen với việc publish một đoạn code javascript đơn giản. Trong bài viết tiếp theo, chúng ta sẽ thử publish một package chứa **React.js component.**