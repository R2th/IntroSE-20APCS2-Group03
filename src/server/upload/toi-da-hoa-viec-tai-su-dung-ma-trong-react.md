*Cách tăng tốc độ phát triển bằng cách chia sẻ các thành phần ReactJS từ bất kỳ codebase, sử dụng Bit*

## Sử dụng lại code là rất tốt - mọi người đều

Sử dụng lại code là rất tốt nhưng tất cả chúng ta đều biết rằng nó sẽ tốn khác nhiều thời gian, công sức. Việc sử dụng lại code trên các kho lưu trữ đòi hỏi phải đóng gói và xuất bản - một vấn đề đau đầu. Code cần tài liệu, ví dụ và thuộc 1 bộ sưu tập nào đó của trang web để hiển thị nó và để thấy nó thực sự đáng được khám phá và sử dụng. 

> Minimizing the cost of making code reusable.

Trong bài đăng này, tôi sẽ trình bày cách sử dụng [Bit](https://github.com/teambit/bit) và [Bit.dev](https://bit.dev/) để giảm thiểu chi phí làm cho code React của bạn có thể sử dụng lại và có sẵn cho bạn và nhóm của bạn. Giảm chi phí là chìa khóa để tối đa hóa việc tái sử dụng code, tăng tốc độ phát triển và xây dựng một cơ sở mã hóa có thể duy trì và mở rộng hơn.

## Bit & Bit.dev là gì?

[Bit.dev](https://bit.dev/) là một trung tâm thành phần. Nó có thể lưu trữ và quản lý các thành phần có thể tái sử dụng từ các dự án khác nhau của bạn. Nó là một công cụ mạnh mẽ giúp tăng khả năng sử dụng lại code và tối ưu hóa sự hợp tác nhóm của bạn.
Nó cũng là một lựa chọn tốt để xây dựng các hệ thống thiết kế từ đầu (vì về cơ bản nó có mọi thứ mà một hệ thống thiết kế cần).
Bit.dev hoạt động hoàn hảo với Bit, một công cụ nguồn mở xử lý việc cô lập và xuất bản thành phần (khi sử dụng Bit.dev, các thành phần sẽ được xuất bản lên Bit’s registry).

![](https://images.viblo.asia/4e893f5b-07f3-46ea-8f26-c7641afb5ef2.gif)

## "Thu hoạch" các thành phần có thể tái sử dụng

![](https://images.viblo.asia/84f074ae-374e-4f0b-9bd3-c1df82f6219b.gif)
[source](https://github.com/teambit/react-demo-app)

Tôi có sẵn 1 app tên `to-do`, và giờ cần chia sẻ các thành phần của nó. Hãy cùng xử lý nó với Bit

### 8 bước để chia sẻ thành phần

### 1. Tạo component collection trên [bit.dev](https://bit.dev/)

![](https://images.viblo.asia/9664aea1-2916-47d5-bf77-e40480f2d9de.png)

Nó sẽ gần giống như bạn tạo 1 repository trống trên github vậy.

### 2. Cài đặt Bit globally (NPM/Yarn)

```
$ yarn global add bit-bin
```

### 3. Đăng nhập tài khoản ở local

```
$ bit login
```

### 4. Init workspace

```
$ bit init --package-manager yarn
```
*Lưu ý rằng một tệp `.bitmap` mới đã được thêm vào thư mục của bạn và `bit` sẽ được thêm vào `package.json` của bạn*

### 5. Tracking tất cả các thành phần ứng dụng. 
Trong trường hợp này, chúng được đặt trong thư mục `components` (ví dụ `src/components/button/index.js`):

```
$ bit add src/components/*
```

### 6. Config cấu hình trình biên dịch phù hợp (React JS / TS) 
để làm cho các thành phần có thể sử dụng được trong các môi trường với các thiết lập khác nhau:

```
// React JS
$ bit import bit.envs/compilers/react --compiler
// React with TypeScript
$ bit import bit.envs/compilers/react-typescript --compiler
```

### 7. Gắn thẻ các thành phần 
để xây dựng chúng một cách cô lập (và thay đổi khóa):

```
$ bit tag --all 1.0.0

```

*Bit tự theo dõi các phụ thuộc thành phần của bạn và không cấu hình thủ công. Nhưng bạn vẫn có thể kiểm tra nó bằng `$ bit status`*

### 8. Xuất các thành phần đã được track
(đẩy chúng vào bộ sưu tập được chia sẻ):

```
$ bit export <user-name>.<collection-name>
```

Xong, các thành phần hiện được chia sẻ và công khai

Bạn có thể truy cập `bit.dev/<user-name>/<collection-name>` để xem chúng được hiển thị, demo trên Bit. Nếu không, bạn có thể kiểm tra bộ sưu tập của tôi ở đây:

![](https://images.viblo.asia/f4f78d0c-bdc8-4b7d-8bf2-065faf1869d5.png)
*[A demo React with TS collection*](https://bit.dev/eden/react-ts-demo)

### Viết document cho thành phần: từ local đến cloud

Quá trình tài liệu hóa bắt đầu bằng cách viết các thành phần trong môi trường dev ở local của bạn và kết thúc bằng cách viết các ví dụ trong trang thành phần trên bit.dev.

Khi sử dụng React với prop-type hoặc React với TypeScript, phần lớn công việc chỉ cần dừng ở đó. Bit trích xuất props and types, tạo mẫu tài liệu và hiển thị nó trên trang thành phần (trên bit.dev). Document sẽ được tạo tự động với các mô tả của JSDocs, khá hay ho.

Ví dụ: React với prop-types:

```
const RemovableListItem = (props) => { 
    const {id, text, removeItem}  = props;
    return(
        <Item>
           <Text>{text}</Text>
           { (removeItem && id) && 
            <DelButton onClick={() => removeItem(id)}>X</DelButton>
            }      
        </Item>
    )
}

RemovableListItem.propTypes = {
    /**
     * The items's ID
     */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The item's text
     */
    text: PropTypes.string.isRequired,
    /**
     * A callback to be exectuted on a remove-item event
     */
    removeItem: PropTypes.func
}

export default RemovableListItem;
```

![](https://images.viblo.asia/f9eef1ac-a857-442f-ba83-aebc1d5e9dd4.png)


Ví dụ: React với TypeScript

```
type RemovableListItemProps = {
    /** The item's text */
    text: string,
    id: string,
    /** A callback function for the "X" click event */
    removeItem: (id: string) => void
}


const RemovableListItem : React.FC<RemovableListItemProps> = ({text, id, removeItem} : RemovableListItemProps) => {
    const [isCompleted, setIsCompleted] = useState(false);
    return(
        <li className={styles.listItem}>
            <span data-iscompleted={isCompleted} className={styles.text}  onClick={() => setIsCompleted(!isCompleted)}>{text}</span>
            <button className={styles.delete} onClick={() => removeItem(id)}>X</button>
        </li>
    )
}

export default RemovableListItem;
```

![](https://images.viblo.asia/d8a994be-a70e-4cfc-b426-9f5f31d506e5.png)

### Viết ví dụ trên Bit’s playground

Sau khi xuất các thành phần, tốt nhất là hoàn thành quy trình document hóa bằng cách cung cấp một ví dụ (trên trang thành phần).

Các ví dụ cho phép các thành phần hiển thị trong Bit’s playground (thằng này cần phải có ví dụ cụ thể mới hiển thị) và hướng dẫn người dùng các thành phần về cách sử dụng chúng tốt nhất.

![](https://images.viblo.asia/1d31838c-3665-4e29-8f9e-bf7c0063189d.png)
*Thành phần được hiển thị trong Bit’s playground*

### Consuming components — built and source code

![](https://images.viblo.asia/97fbb309-76a7-4364-a842-f813b3789693.gif)

Có hai cách để dùng các thành phần được chia sẻ trên bit.dev. Đầu tiên là bằng cách sử dụng cài đặt quen thuộc `npm install` hoặc `yarn add` (các thành phần được chia sẻ được xuất bản trên sổ đăng ký riêng của Bit - không phải NPM. Các lệnh ở đây chỉ để thuận tiện).

Cách thứ hai là `bit import` các thành phần với mã nguồn của chúng. Bạn có thể chọn điều đó vì một số lý do - một trong số đó là phát triển thêm và thậm chí xuất bản lại, sửa đổi.

Ví dụ: giả sử, tôi muốn import `removable-list-item` được chia sẻ trước đó từ bộ sưu tập này vào dự án mới `create-react-app`:

```
// create a new React project
$ npx create-react-app new-app
// initialize a new Bit workspace
$ cd new-app
$ bit init
// import the component
$ bit import <user-name>.<collection-name>/removable-list-item
```

Thành phần này được nhập vào thư mục `components`, nằm trong thư mục gốc của dự án:

```
├───.git
├───components
│   ├───removable-list-item
```

Giờ bạn có thể chỉnh sửa `removable-list-item`. Sau đó gắn --tag cho thay đổi 

```
$ bit tag <user-name>.<collection-name>/removable-list-item
```
*Thành phần đã nhập đã được theo dõi và định cấu hình bằng trình biên dịch thích hợp - đó là lý do tại sao `bit add` hoặc `bit <compiler id> --compiler` không cần thiết ở đây.*


Cuối cùng, export component lại bộ sưu tập:

```
$ bit export <user-name>.<collection-name>
```

Mong rằng bài này sẽ giúp cho bạn hiểu thêm về các sử dụng Bit

Nguồn: [https://blog.bitsrc.io/](https://blog.bitsrc.io/)