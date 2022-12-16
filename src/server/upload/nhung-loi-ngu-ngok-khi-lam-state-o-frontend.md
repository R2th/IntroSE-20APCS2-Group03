## Tại sao nên đọc bài này?

- Cải thiện kỹ năng state management ở frontend, xa hơn sẽ khiến code logic đỡ mệt mỏi hơn
- Tránh một sỗ lỗi khiến mình code nhanh, ít bug 🐞 hơn

## State management nữa hả?

Ờ, thì code frontend có 2 cái chứ mấy

- UI Transform - Cái này mình chỉ ở mức chấp nhận được
- State management - Cái này thì mình làm nhiều

Nhưng tại sao kì này mới bắt đầu xuất hiện nhiều khái niệm phải quản lý state? Hồi trước jQuery vẫn khỏe mà.

Đúng rồi, việc các library/framework mà thằng tiên phong là React bắt đầu hiện thực khái niệm Declarative ở frontend thay vì Imperative như trước đây nên keyword State Management cũng bắt đầu nổi lên.

Hiểu đơn giản thì

**Declarative**

Bạn sẽ là người tự viết từ khâu nhận interact, xử lý event, tạo state, sau đó Lib/Framework sẽ từ state đó tạo ra UI

`UI = f(state)`

**Imperative**

Bạn sẽ là người tự viết từ khâu nhận interact, xử lý event, dùng bất cứ kiểu gì bạn thấy tiện để lưu data, rồi cũng từ output kết quả xử lý trên update lại UI

`UI = bạn code(state)`

Do đó, kỹ năng trong việc thêm, update state ở kỷ nguyên này là khá quan trọng. Bạn làm nó mượt mà thì code ít bug, UI cũng render mượt mà, trơn chu hơn. Bạn làm nó rối thì cũng khó maintain hơn, cũng như chạy ì ạch hơn (Vì phải work around nhiều mà)

## Nói nhiều quá, lỗi đầu tiên đi

### Avoid Redux nếu không cần

Đừng dùng Redux nếu không cần thiết, hoặc bạn không thể thay đổi điều đó. Redux là một thư viện siêu siêu nổi tiếng và tuổi đời chắc cũng không kém cạnh gì React cả. Do đó khi search hay làm bất cứ thứ gì về state chắc chắn câu trả lời mà Google sẽ ném vào mặt bạn sẽ là Redux.
![Đã thấy “say sóng” chưa?](https://images.viblo.asia/4809463a-e80e-4587-a341-ac0eeb012121.png)

Đã thấy “say sóng” chưa?

Tuy nhiên mình có rất nhiều lý do bạn không nên dùng redux

- Global state ⇒ Bạn thực sự không cần thứ này đâu
- Learning curve lớn, nào là Init state, reducer, dispatch
- Chưa hết, nó còn khá cồng kềnh, nào là Redux-sagas, redux-thunk, generator ⇒ Bạn không 
cần tốn cả buổi để setup đống đó, và mỗi feature cần thêm 10p để update một state

Đọc thêm bài viết của mình trong việc chọn thư viện State management

[Chọn lib state management nào bây giờ?](https://thanhle.blog/blog/chon-lib-state-management-nao-bay-gio)

Redux cũng khuyên bạn nên suy nghĩ thận trọng khi sử dụng Redux

[General | Redux](https://redux.js.org/faq/general)

[You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

### Cái gì cũng bỏ vào global state

Lỗi này khá liên quan với lỗi bên trên. Vì Redux là thư viện Global State, do đó khi dev mình hay có thói quen bỏ luôn vào Redux Store cho nhanh. Vì nếu làm local state vì khi cần share data thì lại phải xóa code mà bỏ vào Redux, thôi thì … bỏ luôn vào từ đầu cho nhanh.

Thường mình thấy các bạn gặp lỗi này vì:

- Chi phí khi cần lift-state-up khá cao, nên dev quyết định thôi bỏ nó vào global luôn, khỏi lift đi đâu cả
- Mọi thứ đã nằm trong global state rồi, thôi mình cũng follow theo pattern này luôn. Và cứ vậy càng dev thì mọi thứ trong global state càng nhiều

Nếu dự án của các bạn không quá lớn và thường xuyên gặp vấn đề trên, thử dùng Jotai hoặc Recoil thử nhé

![image.png](https://images.viblo.asia/5585c3af-dd14-434a-90d1-1e93bcce7ae0.png)


### Thứ gì render ra UI sẽ là một state mới

Các lỗi trên là lỗi thường gặp trong việc sử dụng thư viện rồi, bây giờ thử ở lỗi coding xem nhé

Có bao giờ bạn suy nghĩ như dưới không nhỉ?

> Thứ gì render ra UI sẽ là một state mới
> 

Mình lấy ví dụ khi bạn cần render ra list todo mà trong đó có option filter (client filter nhé) thì kết quả của nó là một state mới

![image.png](https://images.viblo.asia/ebc367a3-6019-4640-bd94-11b7470080ac.png)

Code theo kiểu trên có các vấn đề

1. Phải define thêm 1 state mới (cục 💩 thứ 1)
2. Phải check lại những chỗ nào liên quan tới state mới cần render ra UI và sửa lại (cục 💩 thứ 2)
3. Check lại tất cả các chỗ handle event để sửa code thêm logic cho state mới (cục 💩 thứ 3)

Để khắc phục lỗi này hãy nhớ là state mới chỉ cần lưu lại data từ external event (API response, User action), các data để render ra UI có thể được tính toán từ state ở trên.

Đọc thêm bài viết về clean state của mình ở đây

[State management gọn gàng](https://thanhle.blog/blog/state-management-gon-gang)

[Khi nào thì thêm state mới ở Frontend?](https://thanhle.blog/blog/khi-nao-thi-them-state-moi-o-frontend)

Ba câu hỏi thần thánh mỗi lần quyết định thêm state mới

- State này có dùng để chứa api response không?
- State này có dùng để chứa async status không?
- State này có dùng để chứa minimum event data từ user không?

### useEffect cho computed state

Cái này hay bắt nguồn từ suy nghĩ Imperative

![image.png](https://images.viblo.asia/50df38a3-529b-49d4-8feb-0fd34b8e1fcd.png)

Bạn sẽ nhận được requirement như sau:

- Nếu counter > 3 thì cái nút hiện chữ màu đỏ

Bạn sẽ suy nghĩ:

- Ok vậy thì mình sẽ watch cái biến `counter` đó, > 3 thì làm cái state cho nó thành màu đỏ là xong

Việc này nó hết sức bình thường, suy nghĩ kiểu này khá tuyến tính: Requirement mô tả sao, bạn cũng làm một flow code y chang như vậy và code thì cũng vẫn chạy đúng 🙂

Nhưng nếu suy nghĩ sâu hơn, thử đặt 3 câu hỏi bên trên mà mình nói thì sẽ thấy state `color` không đạt được tiêu chí gì cả:

- State này để chưa api response ⇒ Không
- State này để chứa async status ⇒ Không
- State này để chưa minimum event data từ user ⇒ Không, minimum event data là cái state `counter` đã lưu rồi mà

Nhưng `color` lại là thứ state cần để render đúng UI, nếu vậy thì `color` sẽ là Computed state

> A computed property is state that is derived from other state
> 
> 
> ```jsx
> const model = {
>   user: null,
>   isLoggedIn: computed((state) => state.user != null),
> };
> ```
> 

Mà đã là Computed state thì bạn có thể set luôn nó vào một biến, hoặc bỏ nó trong `useMemo`

- `const color = counter < 3 ? 'black' : 'red';`
- `const color = useMemo(() ⇒ counter < 3 ? 'black' : 'red', [counter])`

## Lời kết

Chuỗi series bài viết về State Management là chuối bài viết mình khá tâm huyết, nó sẽ thay đổi Mental Modal của các bạn khi làm về state. Tuy nhiên, để có thể thay đổi được thì cần phải luyện tập khá nhiều

Nó giống như việc bạn bỏ một thói quen cũ, và cố gắng thay nó bằng một thói quen mới vậy. Mình biết là đâu đó có cách tốt hơn, nhưng khi làm thì vẫn auto “ngựa quen đường cũ” 🏇. Do đó thời gian đầu cần rất nhiều sự cố gắng để suy nghĩ về nó, làm thử thì mới hình thành một mental modal mới được.

Hy vọng chuỗi series này có ích!

## Bài viết “lan quyên”
https://thanhle.blog/blog/state-trong-frontend-la-gi-tai-sao-nen-gioi-cai-nay

Original post: https://thanhle.blog/blog/nhung-loi-ngu-ngok-khi-lam-state-o-frontend