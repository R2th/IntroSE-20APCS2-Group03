# Quản lý state trong một ứng dụng Vue.js
* Quản lý state cho các component trong một ứng dụng có thể rất khó.  Facebook cũng đã từng rất khó khăn trong việc này và tạo ra mô hình **Flux**  (Flux pattern). Vuex được phát triển dựa theo Flux pattern. Nó là một thư viện và mô hình quản lý state của Vue. Trong bài viết ngày hôm nay, chúng ta sẽ hiểu được tại sao một ứng dụng lại có thể rất cần Vuex và Vuex có thể giúp nâng cao ứng dụng của bạn như thế nào.
* **State** là gì? State là dữ liệu mà các component của bạn phụ thuộc vào và hiện thị ra, chẳng hạn như các blog posts, to-do items...Hãy thử tưởng tưởng rằng, một ngày ứng dụng của bạn rất lớn, gồm có rất nhiều component. Mỗi component Vue lại có thể có một trạng thái state của riêng nó.
    ![](https://images.viblo.asia/3bcd4c91-20c0-43dc-8cab-1169f67f0258.png)
* Khi một component A muốn thay đổi trạng thái state của nó, một component B họ hàng xa của A cũng sử dụng state đó, như vậy các component cần giao tiếp để biết được sự thay đổi state. Cách giao tiếp thông thường đó là sử dụng event để giao tiếp từ component A lên các component cha của A, rồi từ các component cha sẽ truyền xuống các props xuống để chia sẻ dữ liệu đến component B. Tuy nhiên cách làm như vậy có thể trở lên rất phức tạp.
![](https://images.viblo.asia/1a6b1d4a-3d2a-4a60-9d1d-4f97ef73dae7.png)
* Thay vào đó chúng ta có thể chứa tất cả các state của chúng ta ở một nơi, một địa điểm mà chứa tất cả các trạng thái hiện tại của toàn bộ ứng dụng, người ta gọi đó là **single source of truth**.
# Single source of truth
* Single source of truth chính là cái mà Vuex cung cấp, chính là những state global của toàn bộ ứng dụng và tất cả các component có thể truy cập trực tiếp vào các global state đó.
* Cũng giống như data của một instance Vue, State là "reactive". Khi một component cập nhật State, các component khác mà đang sử dụng dữ liệu này, sẽ nhận được thông báo, tự động nhận gía trị mới.
![](https://images.viblo.asia/3551900a-da5a-4549-bb16-826f15fa7ca7.png)
* Tuy nhiên, việc hợp nhất dữ liệu thành một **single source of truth** không giải quyết được hoàn toàn các vấn đề về quản lý State. Cái gì sẽ xảy ra khi mà nhiều component thay đổi State theo những cách khác nhau và từ những địa điểm khác nhau? Hơn nữa những thay đổi State là không thể đoán trước và không thể kiểm soát được. Như vậy chúng ta phải cần một tiêu chuẩn hóa.
# Một mô hình quản lý State (A State Management Pattern)
* Những vấn đề nêu trên lý giải tại sao Vuex cung cấp một khuôn mẫu quản lý  state đầy đủ với một cách đơn giản và chuẩn hóa để thay đổi state.
* Nếu bạn đã quen thuộc với Vue, Vuex cũng khá tương đồng
![](https://images.viblo.asia/c50ce913-0e95-40c2-87fe-7811f70a0021.png)
    * Nếu Vue tạo ra một instance Vue root với `new Vue` thì Vuex cung cấp một store với `new Vuex.Store`
    * Trong khi Vue instance có một thuộc tính `data`, thì Vuex store có `state`. Cả 2 đều "reactive".
    * Với Vue instance chúng ta có `methods` để cập nhật dữ liệu, store có `Actions` cũng để cập nhật state.
    * Và trong khi instance có thuộc tính `computed`, store có `getters`, cho phép chúng ta truy cập các state được lọc, được dẫn xuất hoặc được tính toán.
* Thêm vào đó, Vuex cung cấp cách để theo dõi (**track**) sự thay đổi state, với việc sự dụng **Mutations**. **Sử dụng Actions để commit Mutations**. Và từ Vue DevTools, chúng ta có thể theo dõi ngược thời gian nhờ một bản ghi của mỗi mutation state.
# Ví dụ Vuex Store
![](https://images.viblo.asia/2b3bc1df-d609-4b0d-9649-9b061e842c46.png)https://images.viblo.asia/2b3bc1df-d609-4b0d-9649-9b061e842c46.png
* Trong State chúng ta có thuộc tính `isLoading` cùng với mảng `todos`
* Chúng ta có mutations `SET_LOADING_STATUS` để chuyển state` isLoading` từ true thành false và ngược lại, và một mutations `SET_TODOS` để set state `todos` với giá trị mà chúng ta có từ responses trả về từ API.
* Bên dưới chúng ta có `actions`,  trước tiên chúng ta commit mutation `SET_lOADING_STATUS`, lúc này state `isLoading` sẽ được chuyển từ false sang true. Ở trong actions, chúng ta cũng có thể dùng axios để gọi api, như bên trên khi có response trở về, chúng ta lại thực hiện commit mutation `SET_LOADING_STATUS`, lúc này state `isLoading` của chúng ta sẽ có giá trị là false. Sau đó chúng ta tiếp tục commit mutation `SET_TODOS`, state `todos` của chúng ta sẽ có giá trị là `response.data.todos`, `response` trả về từ api.
* Nếu trong trường hợp chúng ta chỉ muốn truy xuất các phần tử todo với nhãn là done, chúng ta có thể dùng `Getter`, sẽ truy xuất chỉ những state mà chúng ta muốn.
![](https://images.viblo.asia/fc1d41b3-97b1-4e8b-bfbb-08866f959a9c.png)
* Cả quá trình trên được thể hiện qua hình động sau đây:
![](https://images.viblo.asia/45849c95-d6ab-4295-8621-601bda331c88.gif)
# Tổng kết
* Qua bài viết trên, hy vọng các bạn có thể hiểu được tại sao chúng ta cần dùng Vuex và cách nó nâng cao ứng dụng bằng việc cung cấp một single source of truth cho State. Cùng với đó hiểu được cách sử dụng các thư viện Actions, Mutations, Getters.
Mong bài viết sẽ có ích đối với các bạn.
* Nguồn tham khảo:
https://www.vuemastery.com/courses/mastering-vuex/intro-to-vuex