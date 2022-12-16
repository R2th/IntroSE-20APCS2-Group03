## Mock và Stub
Sự khác nhau giữa Stub và Mock không thật sự khác biệt, cả 2 đều có tác dụng tách sự phụ thuộc để kiểm tra.
Có một số người cho rằng, `Stub` là triển khai phương thức tĩnh còn `Mock` là triển khai động các phương thức được gọi như API.
Nhưng ở đây Jest cho tất cả `Spies, stub, mock` là `mock function` khá là dễ đỡ phải lằng nhằng.

Theo như series thì tui có nhắc đến Testing của Vuejs, dự định thì tui sẽ viết hết các loại hình thức test đối với Jest. Nhưng đối với bài này, để gần gũi hơn việc Test API bằng `Mock` của Javascript ngay trong Vuex.

Trước khi đến với ví dụ dưới sau đây mình có chút yêu cầu các bạn đã chút nền tảng Vuex và Vuejs.

Đầu tiên về luồng dữ liệu tui có hình sau đây:
![](https://images.viblo.asia/743953b1-3e8c-4d94-80cd-07db9a3739bb.png)

Giải thích qua qua, chúng ta có hệ thống API server được vuex gọi để lấy dữ liệu.
Bạn hãy tưởng tượng Vuex giống như 1 class hướng đối tượng cho dễ hình dung, ai còn không biết OOP chắc học lại nghề lập trình quá.:grinning:

**state** `là các thuộc tính của 1 Vuex có dạng là protected`

**getters** `là gần giống phương thức get của class ấy có thể modify thêm mắm muối tiền xử lý, các components cũng có thể gọi được`

**actions** `là các method được sử lý từ components gọi nó bằng dispatch hay ...mapActions`

**mutations** `thì gần giống phương thức set thuộc tính của class được gọi trong actions hay thậm chí qua components cũng gọi được.`


Đối với bài viết này, chúng ta có đoạn mã xử lý  trong `actions`

```javascript
async addJsonLdShop({ commit, state, rootState }) {
    await axios
        .get('api/add-json-shop', {
            headers: {
                Authorization: `Bearer ${rootState.auth.token}`
            }
        })
        .then(response => {
            if (response.data.result == 'successfully') {
                commit('SET_STATUS', response.data.result)
                commit('SET_MESSAGE', response.data.message)
                commit('checkJsonLd/SET_STATUS_SHOP', 'true', { root: true })
                setTimeout(() => commit('SET_STATUS',null), 4000)
            }
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status === 401) {
                    commit('SET_STATUS', 'Your session has expired, please log in again')
                    this.$router.push({ path: '/' })
                } else if (error.response.status === 500) {
                    commit('SET_STATUS', 'Server is under maintenance')
                    this.$router.push({ path: '/' })
                } else {
                    commit('SET_STATUS', 'Something Error')
                    this.$router.push({ path: '/' })
                }
            }
        })
},
```

**addJsonLdShop** của chúng ta chỉ có gọi API bằng thư viên axios, đối với call API mà thành công sẽ gọi `commit` của `mutations` để set dữ liệu `state` 
còn false (tèo) thì sẽ `commit` kiểu khác. Vậy test double ở đây ý nghĩa như thế nào. đơn giản mà nói chúng ta test được cả "diễn viên đóng thế là API" bằng `Mock API` và test actions gọi đúng các trường hợp hay không.
Chúng ta có mức độ ưu tiên 5 cấp độ
TDD ở đây như thế nào, bây giờ như thế này kiểm thử hộp trắng có yêu cầu như sau: 


| Mục đích muốn test | Mức độ ưu tiên |
| -------- | -------- |
| sau khi gọi API này thành công sẽ set dữ liệu `commit` 3 lần       | Ưu tiên 5     |
| không thành công sẽ đặt lại trạng thái của state đó       | Ưu tiên 4     |
| JSON Web Token hết hạn      | Ưu tiên 5     |
| Có lấy được đúng format JSON Web Token hay không      | Ưu tiên 2     |
| Kiểm tra API trả về có đúng format hay không | Ưu tiên 2|


Tại sao tui lại chia nó ra như vậy, thông thường ứng dụng của mình cần chạy được các chức năng cần thiết tức nó đúng hết ko sinh ra ngoại lệ, những thứ mình cho là nguy hiểm như hết hạn token vẫn truy cập đều như vắt chanh cũng không hay :scream:

Ngoài ra tui có 1 test như là Kiếm tra API trả về đúng format không cái này, đối với ứng dụng nghiêm ngặt việc Test API thường sẽ có Tool riêng như bằng POSTMAN chẳng hạn... 

## Góc cảm nghĩ, các bạn có thể bỏ qua đọc phần sau.
Chia sẻ thêm, các QA cũng có QA this, QA that. QA xịn sò sẽ biết nhiều `automation Test` hay `manual Test` . Thông thường các thánh nhân từ Developer chuyển sang làm QA, lương cao hơn nhiều so với QA bình thường.  Đáng sợ nhất những thánh nhân đó sẽ cho Developer như bạn sẽ không ngóc nổi đầu dậy luôn, các bạn cũng đã thấy kim tự tháp phần Series mở đầu tui đã nhắc đến rồi đó, tự nhắc bản thân phải cố gắng viết code sạch, tự giác viết unit test để đỡ bị bổ vào đầu. Việc kiểm thử phần mềm là công việc rất tốn công sức, cái này theo mình các PM có kinh nghiệm sẽ phân công hợp lý làm sao chi phí thấp hiệu quả cao, nhanh gọn nhẹ, tiến độ không bị chậm dự án. Mình có ấn tượng cái câu nói hay mà tôi đã nghe ở trường đại học: **Hơn 90% dự án Công Nghệ Thông Tin là thất bại** còn tại sao lại thất bại thì phần tiếp theo tui chia sẻ thêm.

## Triển khai viết test theo ý tưởng trên
đầu tiên tui import modules cần test và test `addJsonLd`

`axios` thư viện đã được customer để call API
`axios-mock-adapter` thư viện giúp mock API axios dễ dàng hơn các bạn cũng có thể dùng `jest.mock()` để mock axios theo ý thích của mình

```javascript
import addJsonLd from "~/store/modules/addJsonLd"
import axios from '~/plugins/axios'
import MockAdapter from 'axios-mock-adapter'
const mock = new MockAdapter(axios)

describe("add json ld actions", () => {
  it('check axios call add json shop', async () => {
    const commit = jest.fn()
    const state = jest.fn()
    const rootState = {
      auth: {
        token: 'aaaa'
      }
    }
    const response = {}

    mock
      .onGet("api/add-json-shop", {
        headers: {
          Authorization: `Bearer ${rootState.auth.token}`
        }
      })
      .reply(200, {
        result: 'successfully',
        message: 'abcxyz'
      })
    await addJsonLd.actions.addJsonLdShop({ commit, state ,rootState })
    await axios.get('api/add-json-shop')
      .then((response) => {
        // console.log(response.data)
      expect(response.data).toEqual({result: 'successfully', message: 'abcxyz'})
      expect(commit).toHaveBeenCalledWith("SET_STATUS", 'successfully')
      expect(commit).toHaveBeenCalledWith("SET_MESSAGE", 'abcxyz')
      expect(commit).toHaveBeenCalledWith("checkJsonLd/SET_STATUS_SHOP", 'true', {root: true})
      expect(commit).toHaveBeenCalledTimes(3)
      setTimeout(() => {
        expect(commit).toHaveBeenCalledWith("SET_STATUS", null)
      }, 4000)
    })
  })
})
```
`addJsonLdShop` của tui có truyền 3 tham số, tui cũng sẽ mock function 3 tham số đó, bên trong thân hàm addJsonLd tui có gọi axios sẽ `mock axios` đúng theo mô hình trên `mock.onGet` diễn viên đóng thế của chúng ta sẽ trả về thành công kết quả là chuỗi json thế kia.
bên dưới là 1 loạt các kiểm tra expect. Do `commit` ở đây nó lại 1 thứ phụ thuộc khác nên sử dụng mock function ở đây là hợp lý, muốn kiểm tra `commit` có set đúng dữ liệu `state` hay không thì cần test unit `mutations` ở file khác.

Đối với trường hợp mà tui bảo call API bị lỗi thì chỉ cần cho diễn viên đóng thế của chúng ta có status code là 500 hay 401, 404, kết quả trả về mong muốn trùng khớp với tài liệu API đã được cung cấp như vậy.

## Mock những điều thú vị
Mock trong jest có nhiều thứ awesome hơn chúng ta nghĩ, ở trên tui có dùng là `mock module` và `mock function` ngoài ra còn có `mock file`

sơ qua `mock file`, đầu tiên chúng ta sẽ tạo thư mục `__mocks__` và có file `src/__mocks__/student-service.js`
Jest sẽ tự động gọi module `student-service` bằng cách `jest.mock("./student-service.js")`

```javascript
// __mocks__/student-service.js
export default {
  get: jest.fn(id => Promise.resolve(id))
};
```

```javascript
// student.test.js
jest.mock("./student-service");
// ...
it("returns data", async () => {
  const student = createStudent(1, "");
  const data = await student.fetch();
  expect(data).toBe(1);
});
```

với cách này thì cấu trúc test của chúng ta gọn gàng hơn.
## Kết luận
Dựa vào đoạn code đã thực hiện hóa 1 phần mô hình trên có thể thấy được unit test viết nhiều đến cỡ nào. Code viết mỗi tí mà cái cần test thì một đống, tùy thuộc vào sếp hay leader yêu cầu, việc viết test có thể xông xênh cái nào quan trọng thì viết còn thấy ko quan trọng thì bỏ qua. Phần tiếp theo, chúng ta sẽ tới đến Snapshot Testing.

facebook: https://www.facebook.com/quanghung997