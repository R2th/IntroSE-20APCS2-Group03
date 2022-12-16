Snapshot Testing là một kĩ thuật so sánh 2 đầu ra (output) khác nhau. Điều này gần giống kiểm thử hồi quy trong End 2 End (e2e).


### Vậy kiểm thử hồi quy tức có nghĩa là gì?

* Kiểm thử hồi quy được định nghĩa là một loại kiểm thử phần mềm để xác nhận rằng một tính năng mới được thêm không ảnh hưởng xấu đến các tính năng hiện có.

* Kiểm thử hồi quy là kiểm thử lại các trường hợp đã được thực hiện để đảm bảo các chức năng hiện có hoạt động tốt.

* Kiểm thử này được thực hiện để đảm bảo rằng những thay đổi source code mới sẽ không ảnh hưởng tới các chức năng hiện có, đảm bảo rằng code cũ vẫn hoạt động sau khi thực hiện thay đổi source code.

ví dụ: chúng ta muốn test một button không bị thay đổi style sau khi thêm chức năng liên quan đến button đó


Chúng ta sẽ lấy base screenshot của button với các đoạn mã html và css. Mỗi lần chúng ta thay đổi code thì sẽ chạy lại screenshot đó nếu không có gì thay đổi button thì test sẽ pass ngược lại thì fail :grinning:
Còn nếu thực sự thay đổi button đó là đúng thì chúng ta sẽ reset lại snapshot của component (ở đây là button đó).

### Minh họa một số vấn đề testing với Jest

Đầu tiên chúng ta có 1 function cần kiểm tra các trường hợp dễ hiểu như sau:

```javascript
// error-message.js
export default function getErrorMessage(code) {
  if (code === 1) {
    return 'The camel walks on a leg'
  } else if (code === 2) {
    return 'Cats don't eat mouses'
  } else if (code === 3) {
    return 'The Car dont run'
  }
  throw new Error('No error messages for that code')
}
```

Vậy kiểm tra cho đoạn mã trên như bình thường

```javascript
import getErrorMessage from "./error-message";

describe("getErrorMessage", () => {
  it("returns dog message when code is 1", () => {
    expect(getErrorMessage(1)).toBe("The camel walks on a leg");
  });

  it("returns cat message when code is 2", () => {
    expect(getErrorMessage(2)).toBe("Cats don't eat mouses");
  });

  it("returns car message when code is 3", () => {
    expect(getErrorMessage(3)).toBe("The Car dont run");
  });

  it("throws an error otherwise", () => {
    expect(() => getErrorMessage(4)).toThrow("No error messages for that code");
  });
});
```

Các bạn thấy không, rất đơn giản nhưng có nhiều vấn đề ở đây:
* **Duplicate**: hàm trên kiểm tra đi kiểm tra lại cùng 1 logic
* **Sự thay đổi liên tục**: khi mã nguồn chúng ta thay đổi nhỏ, đoạn mã Test kia cần thay đổi theo liên tục để đáp ứng phù hợp để chạy Unit test đúng điều này cực kì mất thời gian

### Thay đổi áp dụng snapshot testing để xử lý vấn đề trên

Bây giờ chúng ta sẽ có đoạn code sau:

```javascript
import getErrorMessage from "./error-message";

describe("getErrorMessage", () => {
  it("returns an error for a valid code", () => {
    expect(getErrorMessage(1)).toMatchSnapshot();
    expect(getErrorMessage(2)).toMatchSnapshot();
    expect(getErrorMessage(3)).toMatchSnapshot();
  });

  it("throws an error otherwise", () => {
    expect(() => getErrorMessage(4)).toThrowErrorMatchingSnapshot();
  });
});
```

Bây giờ cùng xem kết quả chạy code:
![](https://images.viblo.asia/90e8546e-55be-49e5-96da-60cc097306bb.png)
chúng ta thấy được 4 snapshot được viết ra và kiểm tra.

Vậy điều gì xảy ra khi chúng ta sẽ thay đổi mã nguồn giả dụ thay vì 

```javascript
if (code === 1) {
    return 'The dog walks on a leg'
}
```

![](https://images.viblo.asia/cfdfb8b5-0775-4d05-85b5-b7769c946485.png)
Bùm bug lun. Để giải thích vấn đề này, thì lần đầu tiên chạy test thì những record cũ sẽ được viết vào snapshot và điều đó sẽ đúng, khi thay đổi nhỏ như code trên thì việc thay đổi không còn khớp với snapshot nữa, tùy thuộc vào trường hợp quyết định đoạn code đó có thể là 2 trường hợp sau đây:
* Đó là bug
* Đó là sự thay đổi chủ quan và nó cần thiết

Đối với trường hợp thứ 2, sự thay đổi này bạn cần 'chụp' snapshot lại
Hình ảnh trên bạn có thể thấy Jest yêu cầu nhấn chữ 'u' để chụp snapshot lại nếu đó thực sự là thay đổi chủ quan của bạn.

### Tiếp tục chia sẻ thêm vấn đề của bài post trước
Tại sao **90% dự án Công nghệ thông tin là thất bại ?**. Thất bại ở đây thực ra có khi còn nhiều hơn nữa tùy theo tiêu chuẩn, ví dụ tiêu chuẩn trong mơ đối với dự án công nghệ thông tin: 

1. Đúng tiến độ dự án thậm chí nhanh
2. Đúng yêu cầu dự án
3. Thỏa mãn các bên liên quan
4. Dev hài lòng, cảm thấy yêu thích khi hoàn thành dự án không bị stress hay phải OT.
.... còn nhiều nữa các tiêu chí dựa theo các **miền tri thức** của quản lý dự án.

Mình có học qua quản lý dự án thì có khái niệm **10 miền tri thức** vậy tức là tất cả thứ tiêu chuẩn đó đều thành công cực kì khó và rất thấp.

### Kết luận

Vậy chúng ta đã tìm hiểu qua về sử dụng snapshot testing. Trong việc test `components` trong `vuejs` hay `reactjs` thì snapshot tỏ ra cực kì hữu dụng.
Phần tiếp theo chúng ta cùng tìm hiểu **sơ lược** về [Thư viện test chuyên dành cho component cho vuejs](https://vue-test-utils.vuejs.org/)

facebook: https://www.facebook.com/quanghung997