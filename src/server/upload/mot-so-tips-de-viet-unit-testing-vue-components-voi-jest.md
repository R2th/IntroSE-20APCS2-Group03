Sử dụng Jest để test Vue.js components có thể khá khó. Chúng ta cần một package Vue Test Utils (`@vue/test-utils`) riêng biệt để virtually mount components của chúng ta và sử dụng Jest để thực hiện các test. Bởi vì hai thư viện này làm việc cùng nhau, điều quan trọng là phải đảm bảo rằng chúng ta không bị nhầm lẫn về các lệnh gọi API thuộc  thư viện nào. Cùng với các thư viện này, chúng ta cũng cần chú ý đến các phương thức cụ thể của JSDOM (virtual browser environment), đi kèm với Jest. Những điều này có thể gây nhầm lẫn và có thể ngăn cản chúng ta viết unittest. <br>
![](https://images.viblo.asia/728f29d4-3557-4766-8e46-4e4e1d498a03.gif) <br>
Ví dụ: `shallowMount()` là một phương thức của Vue Test Utils để tạo một shallow `wrapper` component (sử dụng shallow rendering để tránh rendering children components) và `beforeEach()` là một phương thức của Jest thực thi callback argument trước mỗi test. Chúng ta chạy `shallowMount()` bên trong `beforeEach()` để một component được mounted trước mỗi test. <br>
Tôi đã lập một danh sách các phương thức test chung mà team tôi đã sử dụng để giúp việc viết unit test Vue components của chúng tôi thành công. Hy vọng điều này sẽ giúp những người khác trải qua quá trình tương tự.<br>
#### Initial Setup
Hãy bắt đầu bằng cách thiết lập Jest. Cài đặt Jest npm package devDependencies <br>
```
$ npm i jest -D
```
Bây giờ, hãy cài đặt ứng dụng Vue Test Utils và các phụ thuộc khác như `babel-jest`, `vue-jest`, v.v. (lấy từ Vue Test Utils docs)<br>
```
$ npm i @vue/test-utils vue-jest babel-jest -D
```
Khi chúng ta đã setup tất cả các packages, hãy tạo một file jest config có tên là `jest.config.js` trong thư mục gốc của dự án chúng ta. Để thay thế, chúng ta cũng có thể thêm đối tượng JSON bên trong `module.exports` vào thuộc tính `jest: {}` vào `package.json` để cắt giảm số lượng tệp cấu hình mà chúng ta phải quản lý. <br>
{@gist: https://gist.github.com/achhunna/93c7a560fcfacf39245553de1bdb8b5d#file-jest-config-js}
Đảm bảo file `.babelrc` có cấu hình bên dưới với module `babel-Present-env` được cài đặt.<br>
{@gist: https://gist.github.com/achhunna/2d6376690b711507ba0991cb2aa0c24e#file-babelrc}
Khi chúng ta đã thiết lập các cấu hình với các tùy chọn (chủ yếu là collectCoverageFrom source path), chúng ta đã sẵn sàng để chạy Jest!<br>
Bây giờ, tất cả những gì chúng ta cần làm là thêm `scripts: { “test”: “jest” }` tới package.json.  Sau đó chạy script đó.
```
$ npm run test
```
#### Writing Test Files
Script trên không hữu ích lắm cho đến khi chúng ta có các files test mà Jest có thể chạy, vì vậy hãy để thêm một file.<br>
Jest sẽ chọn các tệp `* .test.js` hoặc` * .spec.js` trong thư mục dự án của chúng ta. Tôi muốn đặt các files test trong cùng thư mục với các component Vue của mình và sử dụng tên file component. <br>
Ví dụ. component `button.vue` sẽ có file test `button.test.js` trong folder `components/`. Điều này giúp tôi quản lý các files component và files test vì chúng cùng một folder và nằm ngay cạnh nhau trong Explorer trong VSCode. <br>
##### Test File Template
Đây là một base template test file tôi sử dụng để bắt đầu. Lưu ý `shallowMount()` có các thuộc tính khác nhau như `propsData`, `mocks`, `stubs`, `methods`, chúng ta có thể thiết lập mount component của chúng ta để mock or stub các thuộc tính khác nhau của component. <br>
Chúng ta gọi `shallowMount()` và lưu trữ mocked component trong một `wrapper`  trước mooic lần test và hủy `wrapper` sau mỗi lần test. Bằng cách đó chúng ta đang bắt đầu với một state mới mỗi lần test. Điều này làm cho test dễ dự đoán hơn. <br>
Jest có các hàm test như `describe()`, `test()` và `expect()` để thiết lập mỗi test và giá trị mong đợi. Tôi muốn check `wrapper.isVueInstance`  ngay từ đầu để đảm bảo rằng tôi đã giả định thuộc tính mặc định cho component. <br>
{@gist: https://gist.github.com/achhunna/3188e0cc1de7b78a0ec6aaa256f42e54#file-component-test-js}
Nếu component của chúng ta sử dụng Vuex, chúng ta cần thêm Vuex vào Vue instance (ở đây tên là `localVue`) bằng cách sử dụng `use()` và truyền vào `shallowMount()` <br>
{@gist: https://gist.github.com/achhunna/1e379a05197aa980db967ac1616b3638#file-component-vuex-test-js}
##### Common Testing Methods
Chúng ta hãy xem một số phương thức testing bao gồm hầu hết các loại unit testing.<br>
* **Existence of DOM elements** <br>
Chúng ta bắt đầu test bằng cách check xem wrapper có tất cả các elements mặc định mà chúng ta dự kiến sẽ được hiển thị khi component mounted. Chúng ta làm điều này bằng cách check actual element tag hoặc các thuộc tính khác như class, id, v.v. 
Các hàm assertion của Jest như `toBe()` cùng với `wrapper.contains()` hoặc `wrapper.findAll().length` từ Vue Test Utils có thể giúp với test này.<br>
```
test('has blah class', () => {
    expect(wrapper.contains('.blah')).toBe(true);
});

// check multiple elements by verifying count
test('has blah classes', () => {
    expect(wrapper.findAll('.blah').length).toBe(10);
});
```
Chúng ta cũng có thể check innerHTML của các elements bằng cách sử dụng hàm .text() của DOM element mà wrapper.find() trả về. <br>
Ví dụ. expect(wrapper.find('.blah').text()).toBe('blah text').<br>
* **DOM action events** <br>
Chúng ta có thể test các events sẽ emit khi một hành động được thực hiện trong component. Ví dụ. khi click vào button close, hộp thoại sẽ được đóng bằng cách lắng nghe một sự kiện `close`. Chúng ta sử dụng function `trigger()` từ Vue Test Utils để trigger 1 sự kiện trên phần tử DOM được chọn và `wrapper.emitted()` đưa ra một danh sách các sự kiện emitted được sử dụng để kiểm tra sự tồn tại của sự kiện mong muốn.
```
test('emit events when close-btn clicked', () => {
    const closeBtn = wrapper.find('.close-btn');
    closeBtn.trigger('click');
    expect(wrapper.emitted().close.length).toBe(1);
});
```
Ở trên chúng ta trigger `click` lên `closeBtn` , chúng ta cũng có thể trigger sự kiện như `keydown`
```
test('emit events when keydown.a pressed', () => {
    wrapper.trigger('keydown', {
        key: 'a'
    });
    expect(wrapper.emitted().aPressed.length).toBe(1);
});
```
* **Accessing Vue wrapper properties** <br>
Trong trường hợp chúng ta cần truy cập hoặc thay đổi `data`, `computed`, `methods` và `props` của Vue component của chúng ta, chúng ta có thể sử dụng đối tượng `wrapper.vm` vì Vue Test Utils tạo một instance của component trong `wrapper`. Điều này hữu ích khi chúng ta phải mock các giá trị cho một trong các thuộc tính.<br>
```
wrapper.vm.name = 'test'; // changes name data property
wrapper.vm.save(); // invokes save() method
wrapper.setProps({ propsName: newValue }); // changes propsName to newValue
```
Một ngoại lệ là các thuộc tính `computed` cần được tính lại bằng cách sử dụng `shallowMount()` và được truyền vào như 1 thuộc tính. Từ khi chúng ta mount component của chúng ta trong `beforeEach()`  và trong test cần phải pass các thuộc tính ghi đè trong `computed`<br>
{@gist: https://gist.github.com/achhunna/e4750cb72dc054f2c0110a05f07463e4#file-component-test-js}
* **Mocking methods and modules** <br>
Một trong những điều quan trọng cần biết khi viết unit tests là làm thế nào để fake hoặc mock việc thực hiện module hoặc method không phải là một phần chúng ta đang test. Điều này giúp làm cho tests của chúng ta dễ dự đoán hơn. Chúng ta có thể sử dụng các hàm Jest’s `fn()`  và `mock()` của Jest lề để trả về các mocked versions. Ngoài ra còn có một thuộc tính `mocks` bên trong `shallowMount()` trong Vue Test Utils được sử dụng để mock bất kỳ global functions nào mà component của chúng ta có thể đang sử dụng mà không cần import statement.<br>
Hãy cùng xem mocking functions dưới đây:
{@gist: https://gist.github.com/achhunna/7c9876edff249cfd776cc4b0a4970059#file-component-test-js}
* **Async callbacks** <br>
Nếu chúng ta có code không đồng bộ trong component của chúng ta, chúng ta có thể sử dụng `async/await` để `await` async callback, thường là Promise.
```
test('check async block', async() => {
    await wrapper.vm.asyncFunction(); // where asyncFunction() has a resolved Promise or other async stuff
});
```
#### Demo
Link repo [vue-jest-unit-test](https://github.com/achhunna/vue-jest-unit-test), tôi đã thiết lập 1 `App` component cùng với các test.
<br>
#### Tổng kết 
Nếu chúng ta xử lý tốt các API của Jest và Vue Test Utils, sau đó thì việc viết unittest cho Vue Component của chúng ta sẽ rất nhanh. Việc viết unittest sẽ giúp cho chúng ta viết code được tốt hơn và sẵn sàng tái cấu trúc^^
#### Link bài viết gốc
https://medium.com/swlh/tips-on-unit-testing-vue-components-with-jest-e68ff6a28bb5