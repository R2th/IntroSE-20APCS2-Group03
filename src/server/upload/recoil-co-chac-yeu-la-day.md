## Overview
Đối với các bạn đã và đang tìm hiểu về `ReactJS`, có lẽ không dưới dăm ba lần nghe qua những cái tên như *`Redux`, `MobX`, `Context API`,...* dùng để quản lý `state` của ứng dụng. Mỗi công nghệ đều có cho mình những ưu nhược điểm riêng.

Trong lúc chúng ta vẫn đang so sánh, xem xét cái nào "hot" nhất thì trong sự kiện [`React Europe 2020`](https://www.react-europe.org/) tháng 05 vừa qua, `Facebook` cho ra mắt `Recoil` - một `open-source` cho phép mình có thêm một phương pháp  mới trong việc quản lý `state`. Hết anh em bạn bè lần lượt vỗ vai chém gió về `Recoil` với các mỹ từ *nhỏ gọn, linh hoạt, tiện dụng, vân vân và mây mây* làm mình cũng rất hiếu kì về nó 😛

*Trong bài viết này, cùng mình tìm hiểu nó có gì hay ho mà vừa ra mắt vài tuần đã "nổi như cồn" như vậy nhé ^^*

![](https://images.viblo.asia/acdd51e0-2cdd-4bf1-9901-9afd9f5e4fe5.png)

## Concept
*Theo [Official document](https://recoiljs.org/):*
> Recoil lets you create **a data-flow graph** that flows from **atoms** through **selectors** & down into React components.

### Atom
> Atoms are units of the state that components can subscribe to & update as well.

<br/>

Để tạo một `atom`:

```js
import { atom } from 'recoil';
 
export const todoListState = atom({
    key: 'todoListState',
    default: []
});
```
 
`Atoms` cần một `globally-unique-key` *(tương tự `id`, là duy nhất trên cả ứng dụng)* và một giá trị mặc định cho trước *(có thể là một số, một chuỗi, một hàm hay thậm chí là một xử lý bất đồng bộ)*.

Chúng ta có thể để `component` lấy giá trị của `atom` thông qua `useRecoilValue() API`:

```JS
import { useRecoilValue } from 'recoil';
 
export default TodoList = () => {
    const todoList = useRecoilValue(todoListState);
    return (
        <ul>
            {todoList.map(todo => <TodoItem key={todo.id} {...todoList} />}
        </ul>
    );
};
```

Để đơn giản, bạn có thể nghĩ `atom` giống như một `state` thông thường, có chăng sự khác biệt ở đây là các `components` khác có thể `subscribe` nó được. Khi `atom` thay đổi, các `components` này sẽ tự động `re-render`.

### Selector
> A selector is a pure function accepting atoms or other selectors as input to transform this state either sync or async.

```js
import { selector } from 'recoil';
 
export const todoListCount = selector({
    key: 'todoListCount',
    get: ({ get }) => {
        const todoList = get(todoListState);
        return todoList.length;
     }
});
```

Được ví như một `derived-data-based-on-atom`, `selector` có `get() function`  như cái cách mà thư viện `reselect()` trong `ReactJS ecosystem` hay `@computed` in `MobX`. Hơn nữa, selector còn có `set() function` dùng để cập nhật một hoặc nhiều `atoms`.

```js
import { useRecoilValue } from 'recoil';
 
export default Statistic = () => {
 const count = useRecoilValue(todoListCount);
 return (<p>Statistic: { count }</p>);
};
```

Khi `atom` hay `selector` được cập nhật, `selector` sẽ được tính toán lại, `component` cập nhật. Điều này có nghĩa là bất cứ khi nào chúng ta thay đổi `todoList`,`todoList` sẽ được cập nhật & `todoListCount` cũng sẽ được cập nhật theo giá trị mới. `TodoList` & `Statistic` sẽ `re-render`.

### Notes

Như vậy, `Recoil` làm cuộc đời bớt khổ trong việc quản lý `state` qua:
* **`Atom`**: **mẩu dữ liệu tương tự `state`, nhưng sẽ được dùng chung nếu các `component` `subscribe` nó.**
*  **`Selector`**: với sức mạnh của `getter` và `setter` giúp **biến đổi các giá trị đầu ra của `atom` hoặc thực hiện xử lý bất đồng bộ** như gọi `API` về từ một `public resources` chẳng hạn.

<br/>

Sau khi điểm qua `Atom` & `Selector`, có một vài điểm chúng ta cần lưu ý khi sử dụng các `Recoil APIs` như sau:
* Phân biệt một số `APIs`:
    * `useRecoilValue()` để LẤY giá trị.
    * `useSetRecoilState()` to ĐẶT giá trị.
    * `useRecoilState()` để THỰC HIỆN CẢ HAI VIỆC ĐÓ.
* KHÔNG sử dụng `useRecoilState()` với `selector` bởi vì nó không phải giá trị có thể ghi được.

### Demo

Đây là [TodoApp](https://codesandbox.io/s/recoil-todos-dqn74) - một demo về `ReactJS`, `RecoilJS` cho phép chúng ta xem, thêm, xóa và tổng hợp được số việc cần làm. Hãy tham khảo và tự thực hiện cho mình một `demo` để có thể hiểu rõ mọi thứ hơn nhé 😉😉

## Recoil vs. Redux - Context API - MobX

### Idea
Hiện nay, một số thư viện "có tên tuổi" cho phép quản lý `state` được xây dựng dựa trên **`kiến trúc Flux`** trong `ReactJS ecosystem` có thể kể đến như `Redux`, `MobX`.

Trong muôn vàn các `third-party` đấy thì trước đó `React` cũng đã giới thiệu tới `Context API`.  `Context API` cho phép chia sẻ `state` trong `component tree` mà không cần phải truyền xuống `component` cấp này, truyền lên `component` cấp kia.

`Redux`, `MobX`, `Context API` & the latest as `Recoil`, tất cả chúng đều có chung một ý tưởng ban đầu đó là tạo ra một nơi chứa các `data` cần được chia sẻ và chỉ những `components` bị thay đổi mới `re-render`.

Quay lại với anh bạn mới của chúng ta, `Recoil` với `Atom`, `Selector` và các `APIs` đơn giản cho ta cách tiếp cận dễ dàng và cảm thấy linh hoạt hơn 😽😽.

### Syntax
Cá nhân mình thấy rằng, điều thực sự làm `Recoil` tiềm năng là cách nó hỗ trợ các tác vụ đơn giản từ việc lấy, nhận `state` cho tới các tác vụ phức tạp như xử lý bất đồng bộ bằng các `cú-pháp-hết-sức-đơn-giản`. Thừa nhận rằng các thư viện kia chẳng phải là không làm được những điều này, cũng làm được đó nhưng với cú pháp dài dòng hơn một chút.

![](https://i.imgur.com/Eusq4uQ.gif)

Như chúng ta đã thấy trong `concept` và `demo`, để làm việc với `Recoil`, chúng ta chỉ cần bắt đầu với `RecoilRoot`, khai báo `atoms`, `selectors` & đọc, ghi mới `states` chủ yếu là thông qua 03 `APIs` phía trên.

So sánh với Redux, giả sử mình có một `state` trên `store`. Đôi lần mình cảm thấy bị rối và hơi phiền một chút khi liên tục phải `mapDispatchToProps()`, `mapStateToProps()`, `connect() syntax` cho `component này` rồi lại sang `component kia` 🥴🥴.

Công bằng mà nói, `Redux` có một `concept` tuyệt vời & một `ecosystem` rộng lớn *(`Redux Thunk`, `Redux Saga`, etc.).* Duy chỉ có một điểm "hơi tiếc một chút thôi" đó là các bạn mới tiếp cận đôi khi có thể bối rối không hiểu được luồn của nó.

Chốt lại thì mình xin phép chốt một câu như  này nha:

> With Recoil, we can `run pretty complex logic` with `the minimum boilerplate`.

### Native
`Recoil` được phát triển bởi `Facebook`. Vào thời điểm bài viết này được đăng lên *(07/2020)*, `Recoil` cũng đã được sử dụng trong nội bộ `Facebook` một thời gian rùi mới `publish` nên cá nhân mình thấy rằng: **`Recoil` đáng tin vì `Recoil` là người nhà** (J4F)  😸😸.

### Context
*Sau Ý tưởng, Cú pháp rồi Độ tin cậy, bây giờ mình xét qua thời gian nhé !*

Thời điểm `Redux`, `MobX` & `Context API` được tạo ra sớm hơn thời điểm `React Hook` ra mắt nên có chăng chúng `chưa-hoàn-toàn` tương thích với nhau, dù sau khi `Hook` ra mắt thì chúng đã có những `update version`.

<br/>

**Đừng hiểu nhầm !**

Mục này mình chẳng có ý đề cao `Recoil` mà dìm `Redux`, `Context API`, `MobX` gì đâu =))) Thực tế thì chẳng có vấn đề gì to tát với những thư viện kia cả. Khi chưa có `Recoil` chúng ta vẫn thấy `Redux` tuyệt vời, `MobX` linh hoạt,... đó thôi đúng không nào ^^

Có chăng là các bản `update version` trong thời gian gần đây các thư viện trong `React ecosystem` đều có xu hướng chuyển sang `hooks` & `functional programming`. Mình chỉ muốn chỉ ra `Recoil` đang rất tiềm năng và có thể phát triển trong thời gian tương lai 😺😺.

## Conclusion

Yeahhh, vậy là chúng ta cùng nhau tìm hiểu về `Recoil` từ `concept`, `demo` & cho tới bức tranh toàn cảnh trong việc quản lý `state` với `Redux` - `Context API` - `MobX` rồi nè 🎉🎉

Cảm ơn vì bạn đã đọc bài viết này. Mình mong rằng bài viết này có thể giúp ích gì đó được cho bạn ^^ Tặng mình **`01 upvote`** để có thêm động lực cho các bài viết tiếp theo nhé 😻😻

![](https://i.imgur.com/07u4TWg.gif)

Bạn nghĩ sao về `Recoil`? Giữa chúng thì bạn thích cái nào? Hãy chia sẻ cho mình biết ở phía dưới `comments` ^^

Đọc thêm các bài viết tại [DevNotes](https://haodev.wordpress.com/devnotes/).

<br/>

Happy coding ❤

<br/>

<br/>

***My article in Enlish version [here](https://haodev.wordpress.com/2020/07/15/recoil-better-or-worse/).***

***References:** [Medium](https://medium.com/swlh/recoil-another-react-state-management-library-97fc979a8d2b), [Official document](https://recoiljs.org/), [Infod](https://www.infoq.com/news/2020/05/recoil-react-state-management/), [Dev.to](https://dev.to/wobsoriano/recoil-an-experimental-state-management-library-for-react-apps-open-sourced-by-facebook-1cmn).*