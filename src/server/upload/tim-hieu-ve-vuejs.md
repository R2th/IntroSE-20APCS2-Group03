### Tìm hiểu căn bản về Vuejs

**VueJs** hiện nay là một trong những **framework JavaScript** tốt nhất và cũng có thể **Vue** sẽ dần thay thế cho **Angular** và **React** trong tương lai. Nếu bạn chưa biết gì về **VueJs** thì đây không phải là bài để bạn đọc, bạn có thể quay trở lại đây khi đã biết được cơ bản về VueJs.

### 1. Vuex là gì?
Các ứng dụng lớn có xu hướng ngày càng trở nên phức tạp do có nhiều thành phần trạng thái (state) khác nhau và các giao tiếp giữa các thành phần ấy. 
Flux và Redux là 2 cái tên không xa lạ với cộng đồng React, còn với cộng đồng Vue chúng ta được Vue cung cấp vuex.

Vuex là thư viện quản lí trạng thái chính thức, lấy cảm hứng từ **Elm**. **Vuex** thậm chí còn được tích hợp vào **vue-devtools**, cung cấp tính năng **time-travel debugging** mà không cần phải cài đặt gì thêm.

### 2. Vuex hoạt động như thế nào
Vuex hoạt động theo mô hình “one-way data flow” (luồng dữ liệu một chiều) với các thành phần

Hãy cùng tôi xem xét ví dụ sau đây để hiểu rõ hơn:

```
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    &lt;div&gt;{{ count }}&lt;/div&gt;
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```

> - **State**: Nơi dữ liệu được truy xuất để thực hiện ứng dụng.
> - **View**: Chức các khai báo ánh xạ với State.
> - **Action**: Những cách thức làm trạng thái thay đổi phản ứng lại các nhập liệu của người dùng từ View.
> 


**Dưới đây là một thể hiện cực kỳ đơn giản với khái niệm “one-way data flow”**

**one-way data flow**

Tuy nhiên, sự đơn giản này sẽ nhanh chóng bị phá vỡ khi mà chúng ta có rất nhiều thành phần “**component**” sử dụng chung nhau trạng thái “**state**” như:

Nhiều “**views**” có thể phụ thuộc vào từng phần chung của “**state**”

Những **actions** từ những **view** khác nhau cần thay đổi từng phần của “**state**”

- Với vấn đề đầu tiên có thể có thể xử lý đặt các **views** lồng vào nhau và chỉ đơn giản không làm việc với các thành phần “**component**” cùng cấp. 

- Vấn đề thứ hai chúng ta thường tìm đến những giải pháp riêng của mỗi chúng ta như tiếp cận trực tiếp đến những thể hiện cha/con liên quan hoặc cố gắng thay đổi dữ liệu và sẽ đồng bộ những bản copy state này qua những “**event**”.

**Tuy nhiên** cả hai cách trên đều **rất mong manh dễ vỡ** và có thể nhanh chóng dẫn đến không thể nào maintain được mã nguồn nữa.

**Vuex** đã thấy được vấn đề này và đã đưa các trạng thái được chia sẻ qua các **component** và quản lý chúng trong một bộ máy toàn cục duy nhất. **Bây giờ các component trở thành các view** và các **component** có thể truy xuất trạng thái hoặc **trigger** các hành động, bất kể là chúng nằm ở đâu trong ứng dụng.

Ý tưởng cơ bản đằng sau **Vuex** được lấy cảm hứng từ **Flux**, **Redux** và **The Elm Architecture**. **Vuex** là một thư viện implement riêng cho **VueJs** để tận dụng được những lợi thế và sự cập nhật được hiệu quả nhất.

### 3. Các thành phần trong Vuex:

**State:** 
- Vuex sử dụng một “**single state tree**”, có nghĩa là đối tượng này chứa tất cả những tầng state của ứng dụng của bạn và đóng vai trò là “**single source of truth**” (nguồn chân lí, một khái niệm chỉ việc dữ liệu được truy xuất từ một nguồn duy nhất). Điều này cũng có nghĩa chỉ có duy nhất một nơi lưu trữ duy nhất cho mỗi ứng dụng, cũng làm cho việc có thể xác định đúng một phần riêng của state trở thành đơn giản và cho chúng ta có thể dễ dàng lấy được những ảnh (snapshot) hiện tại của state ứng dụng cho mục đích để **debug**.


**Getters:**
- Được sử dụng đến khi cần lấy lại giá trị **state** qua một sự tính toán đã làm thay đổi khác đi so với state gốc, ví dụ như là lọc bỏ những giá trị không thỏa mãn điều kiện nào đó. Sử dụng getter là cần thiết để tránh được sự trùng lặp những phương thức cùng phục vụ cho những component khác nhau hoặc là để tránh phải lấy lại từ một helper dùng chung và phải import lại ở những nơi sử dụng.
Mutations: Cách duy nhất để có thể thay đổi state trong Vuex là bằng cách “commit” một sự thay đổi. Vuex mutation tương tự như là event: mỗi một thay đổi có có type và handler.


**Actions:**
- Tương tự như với **mutation** nhưng có một vài khác biệt. **Action** là hoạt động bất đồng bộ (asynchronous) còn mutations là hoạt động đồng bộ (synchronous). Do Vuex học tập thiết kế luồng dữ liệu một chiều (one way data flow) từ các hệ thống như **Flux, Redux …** do đó mutations là các hoạt động đồng bộ và một chiều để thay đổi dữ liệu state. Actions thường là nơi chứa các hành động như lấy dữ liệu từ API hay một hành động làm thay đổi dữ liệu trong **CSDL** (thêm, sửa, xóa)

**Modules**: 
- Vì là Vuex sử dụng một cây **state** nên tất cả state của ứng dụng dược chứa đựng bên trong một đối tượng lớn. Tuy nhiên khi mà ứng dụng mở rộng lên thì kho chứa (store) có thể phình lên rất nhiều. Để giải quyết vấn đề này, Vuex cho phép chúng ta chia nhỏ những store ra trong module. Mỗi module đều có thể chứa đựng states, mutations, actions, getters hay cả những module lồng nhau.

### 4. Khi nào sử dụng Vuex trong ứng dụng

**Vuex hữu dụng khi mà bạn cần dữ liệu cho nhiều hơn 2 component,** hoặc khi có **rất nhiều hơn 2 component cần sử dụng chung dữ liệu** nhưng **không có quan hệ cha/con** giữa chúng.

Nếu bạn không xây dụng một ứng dụng lớn SPA (Single Page App) thì không nên sử dụng Vuex, nó có thể làm cho bạn cảm thấy mất công mất sức hoặc có thể làm bạn nản chí. Even bus có lẽ sẽ là tốt hơn với những ứng dụng nhỏ hoặc có thể một store pattern đơn giản.

**Không nên sử dụng đến Vuex ngay khi mà bạn cảm thấy chưa cần đến.**

### 5. Vue 3 mới có gì hay?

**Vue 3.0.0** đã chính thức ra mắt cách đây không lâu (read: 21 days :v). Là một major version, **Vue** 3 được giới thiệu với rất nhiều

**ưu điểm:**

- Cải thiện hiệu năng
- Bundle nhẹ hơn
- Tích hợp TypeScript tốt hơn
- API mới giúp làm việc tốt hơn với dự án quy mô lớn
- Tạo nền tảng vững chắc cho sự phát triển lâu dài của Vue
- Cùng với đó là danh sách Breaking Changes khá dài.

Đây là những ưu điểm nôi bật của Vua 3. Mình sẽ nói rõ hơn về về từng ưu điểm trong phần sau của bài viết.

### 6. Tài liệu tham khảo.

- https://vuejs.org/v2/guide/
- https://viblo.asia/p/tim-hieu-ve-vuejs-co-ban-part-1-Do754bpWZM6