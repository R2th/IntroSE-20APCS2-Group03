## Vấn đề 
Theo bạn hàm dưới đây sẽ in kết quả như nào, hiện "foo" hay "bar" hay hiển thị cả 2 
```
func foo() {
  print("foo")
  return // ← chúng ta sử dụng return khi ko muốn câu lệnh sau nó thực hiện

  bar()
}

func bar() {
  print("bar")
}
```
Kết quả: cả "foo" và "bar" đều được hiển thị 
```
foo
bar
```

## Lý do 
Theo cú pháp, kí tự xuống dòng sau return sẽ được bỏ qua, do đó hàm ở trên sẽ trở thành `return bar()`  do đó function bar() được thực hiện
Đoạn code ở trên sẽ tương đương đoạn code sau: 
```
func foo() {
  print("foo")
  return bar()
}

func bar() {
  print("bar")
}
```
Hàm trả về kiểu Int như bên dưới cũng sẽ được thực hiện tương tự: 
```
func baz() -> Int {
  return


  1
}
```
## Phương pháp giải quyết 
Thêm `;` sau return 

```
func foo() {
  print("foo")
  return;

  bar()
}

func bar() {
  print("bar")
}
```
Kết quả: chỉ "foo" được hiển thị 
```
foo
```

## Kết luận 
- Với những hàm dạng void nên chú ý việc return 
- Ngoài ra ở Xcode cũng có warning hiển thị, nên khi code ngoài error bắt buộc sửa chúng ta cũng cần chú ý tới các warning

Source: https://qiita.com/yusuga/items/16ff83a25ea95bb5ab1a