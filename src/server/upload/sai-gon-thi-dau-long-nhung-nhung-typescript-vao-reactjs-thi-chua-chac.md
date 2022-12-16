## ■ Intro.

Đợt đầu tháng, mình có trao đổi với [người anh](https://thinhdora.me) về việc triển khai `TypeScript` trong dự án. Là một người đã có trải nghiệm nhiều với ngôn ngữ lập trình này, anh thao thao:
```PY
- Ai rồi cũng phải dùng TypeScript thôi mà (J4F) =))
```

rồi `spoil` cho một vài điểm nổi bật của nó. Cá nhân mình tiếp cận với `TypeScript` trong `Angular` một thời gian nên cũng hiếu kỳ, không biết sang `ReactJS` thì nó sẽ `"dư lào"` :smile: :smile:))

*Để kiểm chứng nhận định trên của người anh, hãy đồng hành cùng mình trong bài viết này nhé!*

![](https://images.viblo.asia/b610ca47-1a26-4287-90b3-8560f2a5bf7a.png)

## ■ Target

Để tìm hiểu về việc nhúng `TypeScript` vào dự án `ReactJS`, chúng ta tập trung chủ yếu về: 
- **Lý do chọn `TypeScript`**.
- **Cấu hình dự án `ReactJS` kết hợp với `TypeScript`**.
- **Một số ví dụ cơ bản thường gặp**.


Do đó, bài viết sẽ hướng tới các bạn đã nắm qua cơ bản về `ReactJS` và một chút xíu xiu về `TypeScript` rồi nha các `homies` ^^

*Nhấp một ngụm `Espresso` và bắt đầu nào!*

![](https://www.dropbox.com/s/isdhlhtcik0ojt6/ahihi.gif?dl=1)



## ■ Why TypeScript?

*Theo [Trang chủ](https://www.typescriptlang.org/):*
> `TypeScript` is `a typed superset of JavaScript` that compiles to `plain JavaScript`. 


`TypeScript` được phát triển bởi `Microsoft` và cộng đồng mã nguồn mở.


`"Superset"` ở đây có thể được hiểu là:
```js
TypeScript = JavaScript + some amazing stuffs <3
```

Hãy cùng ngó qua [Biểu đồ xu hướng phát triển của một số ngôn ngữ lập trình phổ biến](https://octoverse.github.com/#top-languages) một chút:
![](https://images.viblo.asia/c2567dc7-7833-4dcd-a27b-804226664580.png)

Có thể nói `TypeScript` đang có xu hướng `"re-trending"` trong những năm trở lại đây :smile::smile:))

Ngoài sở hữu những đặc điểm của `JavaScript`, điều `TypeScript` làm mình ấn tượng hơn cả là về việc hỗ trợ **`static typing`**. Thành thật mà nói, đợt đầu mình cảm thấy *`"không thoải mái"`* lắm vì đã quen với **`dynamic typing`** bên `JavaScript` rồi, nghĩ bụng ngôn ngữ này thật là *`khó tínhh`* quá đi mà >.<  (J4F)

Tới giờ thì suy nghĩ khác chút, chúng ta có thể quản lý dữ liệu và luồng dữ liệu chặt chẽ hơn nhờ có `TypeScript`.

*Cùng nhau cấu hình một dự án nhỏ rồi xem `TypeScript` đã thuyết phục mình như thế nào!*

## ■ How to config?

Ngay từ cuối 2018, `React team` đã ra mắt bản `Create React App 2.1` có hỗ trợ `TypeScript` đầy đủ.

![](https://images.viblo.asia/3f277255-a81a-4477-85e5-a5cb04facf42.png)


Để bắt đầu `init` một `dự án ReactJS mới` với `Create React App` tích hợp `TypeScript`, chúng ta chạy lệnh:
```js
npx create-react-app PROJECT_NAME --template typescript
// OR
yarn create react-app PROJECT_NAME --template typescript
```
Trường hợp đã có dự án `ReactJS` trước đó rồi thì thể cài đặt thêm `TypeScript` thông qua:
```js
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
// OR
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```
sau đó đổi một số `files` đuôi `.js/.jsx` thành `.ts/.tsx`.

Tiếp theo chỉ cần `Restart server & enjoyyy` 🎉🎉

<br/>

#### Notes:

Một số tuỳ chọn biên dịch trong `tsconfig.json`:
```json:tsconfig.json
{
    "compilerOptions": {
        "jsx": "react",
        "module": "commonjs",
        "noImplicitAny": true,
        "outDir": "./build/",
        "preserveConstEnums": true,
        "removeComments": true,
        "sourceMap": true,
        "target": "es5",
        // ...
     },
     "include": [
        "src/components/index.tsx",
        // ...
     ],
}
```
Để tìm hiểu thêm, bạn có thể xem chi tiết [tại đây](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

*Phần tiếp theo, chúng ta sẽ đi vào một số ví dụ khi sử dụng `TypeScript` trong`ReactJS` nhé!*

## ■ How to implement?

### ■ Component

**Với `Functional Component`:**

```ts
// Declare
import React, { FC } from 'react';

type PostProps = {
    link: string,           // Required props
    hasSupportMe?: boolean, // Optional props
};

const Post1 = ({ link, hasSupportMe }: PostProps) => ( /* ... */ );
const Post2: FC<PostProps> = ({ link, hasSupportMe }) => ( /* ... */ );

// Use
<Post1 link="https://haodev.wordpress.com" hasSupportMe={true} />
<Post2 link="https://haodev.wordpress.com" hasSupportMe={false} />
```

Thoạt nhìn thì cách khai báo `Post1` và `Post2` khá giống nhau nhưng cách khai báo `Post2` cho phép mình có thể lấy thêm các `options` khác nữa, cụ thể:
```js
const Post2: FC<PostProps> = ({ link, hasSupportMe, children }) => ( /* ... */ );
```

<br/>

**Với `Class component`:**

```ts
// interface PostProps, PostState

class Post3 extends React.Component<PostProps, PostState> {
    constructor(props: PostProps) {
         super(props)
    }
    
    return ( /* ... */ );
};
```

<br/>

 
Để khai báo `default props` cho `component`:
```js
// Function component
const Post1 = ({
    link = "https://haodev.wordpress.com",
    hasSupportMe,
 }: PostProps) => ( /* ... */ );


// Class component
class Post3 extends React.Component<PProps, PState> {

    static defaultProps = {
         link: 'https://haodev.wordpress.com'
    }
    
}
 ```
 
 <br/>
 
 #### Notes: Prop-types
 
Nói đến việc kiểm tra kiểu dữ liệu của `props`, phía `ReactJS` cũng có một `built-in` là [`prop-types`](https://reactjs.org/docs/typechecking-with-proptypes.html) hỗ trợ điều này.

```js
PostI.propTypes = {
    link: PropTypes.string,
    hasSupportMe: PropTypes.boolean.isRequired,
};

PostI.defaultProps = {
    link: "https://haodev.wordpress.com",
    hasSupportMe: true,
};
```
Chú ý một chút, `hasSupportMe` được `PropTypes` khai báo vừa `required` và vừa có `default props`, thì `React component` sẽ hiểu đây chính là `Optional props` chứ không phải `Required props`.

***Dan Abramov*** từng có một nhận xét:
> `React` has its own, built-in way of type checking called `prop types`. Together with `TypeScript` this provides a full, `end-to-end` type-checking experience: `Compiler and run-time`.


Chúng ta hoàn toàn có thể kết hợp sử dụng `props-types` trong dự án `ReactJS` tích hợp `TypeScript`. Chi tiết bạn có thể đọc thêm [tại đây](https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88).

*Hmmm...*

*Sao lại là "Sử dụng kết hợp"?* *Chẳng phải chúng đều dùng để `check type` hay sao?*

**Nếu đã có `prop-types`, tại sao vẫn cần dùng `Typescript`?**

Có một số lý do dưới đây:
- Phân biệt `Compiler time` và `Run time`. Về bản chất thì `TypeScript` cần biên dịch sang `JavaScript`, trong quá trình biên dịch, nếu việc `type check` không được đảm bảo, `IDEs` và ứng dụng sẽ báo lỗi hoặc gợi ý sửa ngay khi chúng ta mắc phải.
- Chỉ có thể sử dụng `prop-types` cho các `components`. Mà trong ứng dụng thì còn muôn vàn các *`helpers`, `constants`, `hooks`, `common functions`* không sử dụng `React`.

Do đó, chúng ta vẫn rất cần anh bạn `TypeScript` trong trường hợp này ^^

*Xuống phần tiếp theo xem `TypeScript` ứng dụng trong `Xử lý sự kiện` và `Style - CSS` như thế nào nhé!*

### ■ Events

```js
const Post = () => {

    function handleChangeInput(event: SyntheticEvent) { /* ... */ }
   
    function handleClickBtn(event: MouseEvent) { /* ... */ }
  
    return (
        <>
            <input type="text" onChange={handleChangeInput} />
            <button onClick={handleClickBtn}>Comment</button>
        </>
     );
};
```

Ngoài *`SyntheticEvent`, `MouseEvent`* như ví dụ phía trên, chúng ta có thể tìm hiểu thêm các sự kiện khác như *`ChangeEvent`, `ClipboardEvent`, `DragEvent`, `FocusEvent`, `FormEvent`, `KeyboardEvent`, `PointerEvent`, `TouchEvent`, etc.*

Giả sử chỉ muốn `tracking` một hoặc một số kiểu `element` nhất định:

```js
// Chỉ áp dụng cho các HTMLButton Elements
handleVote(event: MouseEvent<HTMLButtonElement>) { /* ... */  }

 // Chỉ áp dụng cho các HTMLButton hoặc HTMLAnchorElement Elements
handleVote(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) { /* ... */  }
```


### ■ Styles - CSS
Có nhiều cách để áp dụng `CSS` trong một dự án `ReactJS`. Do đó việc ứng dụng `TypeScript` cũng rất đa dạng. Ví dụ với một số phương cách thường gặp:

<br/>

#### Với Inline Style
```js
// Declare
import CSS from 'csstype';

const h1Styles: CSS.Properties = {
    fontSize: '1.5rem',
};

// Use
<h1 style={h1Styles}>Make It Awesome</h1>
```

<br/>

#### Với Styled Components

```js
// Declare
type FlexProps = {
  direction?: 'row' | 'column',
}

const Flex = styled.div<FlexProps>`
    display: flex;
    flex-direction: ${props => props.direction};
`;

// Use
const el = <Flex direction="row"></Flex>
```


Trên đây là một số ví dụ về ứng dụng `TypeScript` vào `ReactJS` :smile::smile:))

![](https://www.dropbox.com/s/97tz7qy4dpx385h/len2.gif?dl=1)

Hiển nhiên, một dự án `ReactJS` không dừng lại ở `01 "chiếc" thư viện ReactJS` mà là cả một hệ sinh thái `ReactJS` với *`React-Router`, `Redux`, `Lodash`, `Axios`, etc*. Chưa có gì đáng ngại bởi vì phần lớn chúng đã đều hỗ trợ `Typescript` đầy đủ *(có thể `research` với từ khoá `TECH_NAME + TypeScript`)*. Đôi khi sẽ có một vài thư viện nho nhỏ chưa hỗ trợ `Typescript` nhưng chúng đều không đáng kể và ít sử dụng.

`Eslint` cho `Typescript` cũng gần như không khác gì nhiều; Các `IDEs` như *`VSCode`, `WebStorm`, `Sublime Text`,...* cũng hỗ trợ rất tốt ^^

 ## ■ Sumup
 
Yayyy, vậy là chúng ta đã cùng nhau tìm hiểu xong từ lý do chọn `TypeScript`; thực hành cấu hình cho tới xem qua một số ví dụ cơ bản về việc nhúng `TypeScript` vào `ReactJS` rồi nè 🎉🎉

Một điều nữa mình muốn chia sẻ, **`TypeScript` không-sinh-ra-với-mục-đích-thay-thế `JavaScript`. Nó là một-lựa-chọn.**

Với sức mạnh nổi bật của `TypeScript`, việc tích hợp vào `ReactJS` sẽ phù hợp với các dự án dài hạn hoặc phục vụ cho việc phát triển một thư viện. Song, nếu chưa chọn dùng `TypeScript` cũng chẳng sao, `TypeScript` thực sự tốt nhưng `JavaScript` không gặp bất lợi gì quá lớn cả, nó vẫn đáng để chúng ta tin tưởng và yêu thích ^^

![](https://www.dropbox.com/s/ggm9kbhcurdie1d/love.gif?dl=1)

Các bạn thấy như thế nào, hãy chia sẻ ý kiến của mình phía dưới `comment` nhé!

Mình cảm ơn các bạn vì đã đọc bài viết này và hy vọng rằng nó có thể mang lại được giá trị nào đó.



Tặng mình **`1 upvote`** để có thêm động lực cho những bài viết sắp tới nha <3

<br/>

#### Và trong thời điểm hiện tại thì...

Hãy cùng nhau thực hiện quy tắc  `5K` được `Bộ Y tế` khuyến cáo:
```py
#Coronavirus #5K #BoY Te
Khẩu trang - Khử khuẩn - Khoảng cách - Không tập trung - Khai báo y tế
```
để có thể giữ an toàn cho bản thân và mọi người xung quanh nhé 😺😺

*Chúc các bạn cuối tuần vui vẻ ^^*
 
## ■ Credits

- **Resources: [React's Official document](https://reactjs.org/docs/static-type-checking.html#typescript), [TypeScript's Official document](https://www.typescriptlang.org/), [Create React App](https://create-react-app.dev/docs/adding-typescript/),  [fettblog.eu](https://fettblog.eu/typescript-react/), [CuongNH  *(My Inspirer)*](https://viblo.asia/p/mot-vai-chia-se-khi-ung-dung-typescript-vao-reactjs-app-Ljy5V1zjlra), [Duy PT Blog](https://duypt.dev/tai-sao-nen-su-dung-typescript-khi-code-react), [Smashing Magazine](https://www.smashingmagazine.com/2020/05/typescript-modern-react-projects-webpack-babel/).**
- **Poster & thumbnail: ['SÀI GÒN ĐAU LÒNG QUÁ' toàn kỷ niệm chúng ta... | HỨA KIM TUYỀN x HOÀNG DUYÊN (OFFICIAL MV)
](https://www.youtube.com/watch?v=BdPk9ipvczM).**
- **Policies:**
    - [**This original article from My Make It Awesome blog**](https://haodev.wordpress.com/2021/05/30/sai-gon-thi-dau-long-nhung-nhung-typescript-vao-reactjs-thi-chua-chac/).
    - **Use my contents for sharing purpose, please attached resource linked to [my blog](https://haodev.wordpress.com).**
    - **Use my contents for trading purpose, please [contact me](https://haodev.wordpress.com/me/).**
- **Copyright:** **The posts in a spirit of sharing knowledge. If there is anything with regard to copyright of your contents, please [contact me](https://haodev.wordpress.com/me/).**

<br/>


***Happy coding !***