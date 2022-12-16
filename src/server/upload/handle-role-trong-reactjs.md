## Giới thiệu
Lúc mới học reactjs mình gặp nhiều khó khăn trong việc control role. Mặc dù tuỳ dự án tuỳ spec sẽ có cách xử lý khác nhau nhưng cơ bản thì giống nhau. Mình sẽ giới thiệu sơ cách mình và mọi người hay dùng, ae hứng thú thì tìm hiểu thêm nhé :joy:

## Lý thuyết
Cách mình đề cập cơ bản thì nó như này: Login xong -> lưu role vào localStorage, dùng HOC để check role trước khi vào component, nếu không có quyền thì redirect về trang 404 hoặc Dashboard gì đó, với component mà nhiều role có thể vào nhưng thao tác chi tiết mới chia ra thì phải check role trong từng function.

1. Lưu role sau khi login
Sau khi user login thì sẽ có cách để lấy role từ BE, ta cần lưu vào localStorage để lấy ra check khi cần.
Nhưng localStorage thì user cũng có thể sửa nên các bạn có thể mã hoá nó, dù chắc chắn là BE cũng check role khi có request từ FE rồi nên không cần quá lo nhưng mã hoá cho *hay* :v
Mình thì hay dùng js-base64
https://www.npmjs.com/package/js-base64

Có 1 vấn đề là nếu user save account và auto login lần sau, trong khi role của user đó đã thay đổi thì sao? Cái này cũng tuỳ spec, các bạn có thể set sau 3 ngày thì fetch lại role gì đó, để check quá 3 ngày thì cũng lưu 1 cái cờ vào localStorage.

2. Bọc component với HOC để check role
Ai chưa biết về HOC thì có thể xem ở đây
https://viblo.asia/p/higher-order-components-in-react-maGK7Lw9Zj2
Cơ bản thì nó là 1 hàm nhận vào 1 component và trả về 1 component. Mình có thể check role để return component trong này: có role thì return component đầu vào, không thì return `<Redirect />`

Demo:
```
const verifyPermission = (Component, permission) => {
  function Verify() {
    const isAccessible = checkIsAccessible(permission);

    if (!isAccessible) {
      return <Redirect to="/dashboard" />;
    }

    return <Component />;
  }

  return Verify;
};

export default verifyPermission;
```

Áp dụng:
```
function Meo() {
  return (
    ...
  );
}

export default verifyPermission(
  Meo,
  ['roleA', 'roleB'],
);
```

## Kết luận
Lý thuyết chỉ có vậy thôi, khá đơn giản nhỉ :v Hãy thử tìm thêm các cách khác nữa nhé!