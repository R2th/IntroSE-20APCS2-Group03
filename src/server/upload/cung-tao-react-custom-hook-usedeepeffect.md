# `Create React Custom Hook - useDeepEffect`
Trong vài tháng trở lại đây, cái tên React Hook không còn là một khái niệm quá đỗi xa lạ, đặc biệt với những bạn làm việc với Frontend. Húc mang lại nhiều sự tiện lợi, đặc biệt với những syntax hết sức ngắn gọn và sạch sẽ. Thay vì phải đau đầu với những vòng đời của một component, giờ đây ta chỉ còn quan tâm đến sự phụ thuộc qua lại của các state và props, đến function component. Chính vì thế mà ở tuần này mình sẽ cùng thử tìm hiểu và áp dụng hook với một khía cạnh mới là hook custom.
![](https://images.viblo.asia/3e326803-a7e7-4ccb-8081-be87f16f373a.jpeg)
## Required
Ôn lại kiến thức một chút, useEffect là hàm sẽ được chạy sau khi component đã được render ra màn hình. UseEffect nhận 2 tham số, một là callback, hai là dependencies, sẽ được gọi lại mỗi khi các deps thay đổi. UseEffect vì thế mà có thể thay thế cho compoentDidMount, componentDidUpdate, componentWillUnmount khi ta sử dụng với class component.
Đây là cách sử dụng cơ bản của useEffect
```js
const [count, setCount] = useState(0);

useEffect(() => {
// Update the document title using the browser API
document.title = `You clicked ${count} times`;
});

<div>
  <p>You clicked {count} times</p>
  <button onClick={() => setCount(count + 1)}>
    Click me
  </button>
</div>
```
## Case study
Bài toán xảy ra là do cơ chế của useEffect sẽ check sự thay đổi của các deps dưới dạng compare reference, nghĩa là nếu tham số đó là một object, chỉ cần một thuộc tính trong object đó thay đổi nghìa là useEffect đó sẽ bị gọi lại. Do đó mà trong một số trường hợp sẽ xảy ra gọi useEffect không mong muốn.
```js
const NameTag = (data) => {
    useEffect(() => {
        console.log('change')
    }, [data])
    return <div>{data.firstName} {data.lastName}</div>
}

const Main = () => (
    <NameTag data={{ firstName: 'Hoang', lastName: 'Thuy Linh' }} />
)
```

Do biến data là một object, mỗi khi Main render lại luôn tạo ra một object mới. Từ đó NameTag sẽ bị render lại bất kể là nội dung trong data là giống hệt nhau.
## Resolution
Giải pháp là mình có thể viết một custom hook ở đây để kiểm tra

```js
const useDeepEffect = (effectFunc, deps) {
    const isFirstRender = useRef(true)
    const prepDeps = useRef(deps)
    
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        const isChangedDeps = deps.some((dep, index) => !isEqual(dep, prepDeps.current[index]))
        if (isChangedDeps) {
            effectFunc()
            prepDeps.current = deps
        }
    }, deps)
}
```

Biến isFirstRender dùng để check liệu rằng đây có phải là lần đầu sử dụng đến effect này không. Lần đầu thì luôn luôn cho phép chạy.
IsChangedDeps sẽ kiểm tra liệu có deps nào đã thay đổi, nếu có sẽ cần phải gọi lại effect trên. isEqual là util mình dùng của lodash
Cuối hàm, deps sẽ được cập nhật tương ứng để keep lại lần sau kiểm tra
## Conclusion
Trên đây mình đã vừa hướng dẫn các bạn đã tạo ra một custom hook để kiểm tra sự thay đổi của deps. Tương tự với cách sử dụng như vậy, bạn có thể tạo ra nhiều các biến thể khác nhau cho phù hợp với mục đích sử dụng. Các ơn các bạn đã theo dõi nhé.

### References
- https://reactjs.org/docs/hooks-reference.html#useeffect
- https://medium.com/better-programming/how-to-use-the-react-hook-usedeepeffect-815818c0ad9d