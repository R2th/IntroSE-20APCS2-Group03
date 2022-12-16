# Giới thiệu
React Portal là gì?

Đầu tiên là cái tên Portal. Có thể tạm dịch nó là cánh cổng (cổng vào đường hầm, cổng lên thiên đường, cổng sang thế giới khác chẳng hạn...). Nó cũng là tên của một tựa game khá nổi tiếng.

![https://www.geekgirlauthority.com/jj-abrams-portal-half-life-movies-still-development/](https://images.viblo.asia/bb37430c-7b0b-4464-929f-b165139684fe.jpeg)


Vậy thì nó liên quan gì đến React Portal? Chính xác là React cũng sử dụng cái tên này để mô tả cho API mà nó cung cấp. Theo React docs thì API cho phép bạn render component con vào một DOM node tồn tại ở bên ngoài parent component.

```js
ReactDOM.createPortal(child, container)
```

Tham số thứ nhất (`child`) là component React hoặc bất kỳ value nào có thể render được.

Tham số thứ hai (`container`) là một DOM element (thường được lấy từ `document.getElementById()`);

Hay có thể hiểu, React Portal cung cấp cho bạn một trang bị đặc biệt, cho phép bạn có thể mở ra một cánh cổng và ném đồ đạc ra bên ngoài :D

# Ứng dụng
Ví dụ bạn có file template:

```html:index.html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>React App</title>
</head>
<body>
	<div id="root"></div>
</body>
</html>
```

## Ví dụ đơn giản
Bạn có component sử dụng Portal:
```js:box.js
function Box({ name }) {
  return (
    <div style={{ border: "1px solid #AAA", padding: "5px" }}>
      <h1>I am {name}</h1>
      {createPortal(
        <h2>I was defined in {name}, but I am outside it.</h2>,
        document.getElementById("root")
      )}
    </div>
  );
}
```

Mặc dù thẻ `<h2>` được khai báo bên trong thẻ div, nhưng nó lại được render ở bên ngoài:
![](https://images.viblo.asia/64caa6db-ffca-441f-8ee7-3bf08dcae511.png)

Cấu trúc DOM được generate sẽ như thế này:
![](https://images.viblo.asia/4d33c302-5fd4-4d6b-9a47-4f46bc5b7f90.png)

Mặc dù Portal component được render bên ngoài component nhưng nó vẫn được tính là component con, nên nếu component cha re-render thì nó cũng được render lại:
```js:box.js
function Box({ name }) {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div style={{ border: "1px solid #AAA", padding: "5px" }}>
      <h1>
        I am {name}, click count state is: {clickCount}
      </h1>
      <button
        onClick={() => setClickCount((prevClickCount) => prevClickCount + 1)}
      >
        Click me
      </button>
      {createPortal(
        <h2>
          I was defined in {name}, but I am outside it. <br />
          Still, I can show parent state click count {clickCount}
        </h2>,
        document.getElementById("root")
      )}
    </div>
  );
}
```

![](https://images.viblo.asia/74714e95-fa4d-4872-8348-9cd5a0a5f35b.png)

[![Edit React Portal simple demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/lucid-kapitsa-8y40n?fontsize=14&hidenavigation=1&theme=dark)

## Modal
Ví dụ bạn sử dụng Bootstrap Modal và Bootstrap docs có note:

> Modals use *position: fixed*, which can sometimes be a bit particular about its rendering. Whenever possible, place your modal HTML in a top-level position to avoid potential interference from other elements. You’ll likely run into issues when nesting a .modal within another fixed element.

Bạn muốn đóng gói component và muốn đặt Modal ở level trên cùng nhất có thể? React Portal là cách đơn giản nhất để làm được điều này. 

Ví dụ bên dưới là một component `DeleteButton`, mỗi khi click button sẽ có Modal confirmation hiển thị. Mặc dù viết `PopupConfirm` là component con của `DeleteButton` nhưng bằng việc sử dụng React Portal nó sẽ không được render như là con của `DeleteButton` mà sẽ được render ở element có id = root, thường react template sẽ có sẵn element #root:

```js
export default function PopupConfirm({ isOpen, onCancel, onConfirm, children }) {
    return React.createPortal(
        isOpen ? (
            <Modal>
                {children}
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onConfirm}>Confirm</button>
            </Modal>
        ) : null,
        document.getElementById('root')
    );
}
```

```js
export default function DeleteButton({ handleDelete }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <PopupConfirm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onCancel={() => setIsOpen(false)}
                onConfirm={() => {
                    handleDelete();
                    setIsOpen(false);
                }
            >
                Are you sure?
            </PopupConfirm>
            <button
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                Delete
            </button>
        </>
    );
}
```

```js
export default function NotesList({ notes }) {
    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <tr key={note.id}>
                            <td scope="col">{note.id}</td>
                            <td scope="col">{note.title}</td>
                            <td scope="col">
                                <DeleteButton handleDelete={() => console.log('Delete: ', note)} />
                            </td>
                        </tr>;
                    ))}
                </tbody>
            </table>
        </div>
    );
}
```

Khi inspect trình duyệt bạn sẽ thấy HTML có cấu trúc:

```js
<html>
<head></head>
<body>
    <div id="root">
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>...</thead>
                <tbody>
                    <tr>
                        <td scope="col">1</td>
                        <td scope="col">Title</td>
                        <td scope="col">
                            <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal">...</div>
    </div>
</body>
</html>
```

## Breadcrumbs
Trường hợp bạn có layout cho content được đặt trong class `container`, nhưng trong mỗi page lại cần render breadcrumbs full width và breadcrumbs không được generate tự động, tức là tùy từng page mới hiển thị breadcrumbs. Có thể dùng Portal:
```js
export default function Layout({ children }) {
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div id="breadcrumbs-portal"></div>
            </div>
            <main className="container">{children}</main>
            <Footer />
        </>
    );
}
```

Breadcrumbs component:
```js
export default function Breadcrumbs({ items }) {
    const [breadcrumbNode, setBreadcrumbNode] = useState(null);

    useEffect(() => {
        setBreadcrumbNode(document.getElementById('breadcrumbs-portal'));
    }, []);

    if (!items || !items.length) {
        return null;
    }

    return (
        breadcrumbNode &&
        createPortal(
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    {items.map((item, index) => (
                        <React.Fragment key={index}>
                            {item.url ? (
                                <li className="breadcrumb-item">
                                    <Link to={item.url}>{item.title}</Link>
                                </li>
                            ) : (
                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                >
                                    {item.title}
                                </li>
                            )}
                        </React.Fragment>
                    ))}
                </ol>
            </nav>,
            breadcrumbNode
        )
    );
};
```

Ở từng trang sẽ sử dụng breadcrumbs và truyền vào các breadcrumbs item tương ứng:
```js
export default function SearchResult() {
    return (
        <>
            <Breadcrumbs items={[{ title: 'Search result' }]} />
            <div>...</div>
        </>
    );
}
```

```js
export default function ItemDetail() {
    return (
        <>
            <Breadcrumbs items={[{url: '/category', title: 'Category'}, { title: 'Item A' }]} />
            <div>...</div>
        </>
    );
}
```

Code mẫu mình để ở github: https://github.com/tuanpht/react-portal-demo

Demo: 

https://tuanpht.github.io/react-portal-demo

![](https://images.viblo.asia/51369e20-afb2-462b-a9fb-6f5d65b22c6c.png)