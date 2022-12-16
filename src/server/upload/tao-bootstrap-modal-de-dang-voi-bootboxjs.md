Bootbox.js là javascript library dùng để tạo  Bootstrap modal một cách dễ dàng hơn chỉ với vài dòng code.  
# Cài đặt
Có nhiều cách để add library này vào application của bạn:
* Dùng NPM
```
npm i bootbox
```

* Dùng cdnjs

https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.4.0/bootbox.min.js

* Direct download

https://github.com/makeusabrew/bootbox/releases/download/v5.4.0/bootbox.min.js

Note: Bootbox dựa trên `Boostrap` và `jQuery`, vậy bạn phải có cài đặt 2 library này để Bootbox có thể chạy được.

# Cách sử dụng:
Sau khi cài đặt xong, bạn chỉ đơn giản gọi các method của Bootbox trong js của mình là xong.
### Alert Dialog
* Basic
```js
bootbox.alert("Your message here…")

```
![](https://images.viblo.asia/77018df1-044f-4039-8497-ab7fab6c074b.png)
* Bạn cũng có thể dùng html text :
```js
bootbox.alert("Your message <b>here…</b>")
```
![](https://images.viblo.asia/35178260-b5f7-4b0e-baec-d8d23ed8e551.png)

* Nếu bạn cần thực hiện code sau khi dismiss alert, bạn phải dùng callback:
```js
bootbox.alert("Your message here…", function(){
    /* your callback code */ 
})
```

* Bạn có thể customize alert như sau:
```js
bootbox.alert({
    size: "small",
    title: "Your Title",
    message: "Your message here…",
    callback: function(){ /* your callback code */ }
})
```
Trong đó size: "small" | "large" | "extra-large"

![](https://images.viblo.asia/0666b666-ece1-4e13-9aca-438c8e063d75.png)

### Confirm Dialog
* Basic
```js
bootbox.confirm("Are you sure?", function(result) {
    /* your callback code */ 
})
```
Ở đây, confirm alert sẽ default có hai action: cancel và ok. Nếu cancel thì result sẽ là false, nếu ok thì result sẽ là true.
![](https://images.viblo.asia/4c2d7a89-d19d-497d-860e-29944cbb93da.png)

* Bạn có thể customize confirm này như sau:
```js
bootbox.confirm({ 
    size: "small",
    message: "Are you sure?",
    callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/ }
})
```
Trong đó size: "small" | "large" | "extra-large"
![](https://images.viblo.asia/7af42fd8-e7ab-43d1-ab86-c23ed85cf833.png)

### Custom Dialog
Ở trên Alert Dialog và confirm dialog là dialog có sẵn trong Bootbox.js, tuy nhiêu bạn cũng có thể customize loại dialog mới theo mình cần như sau:

```js
bootbox.dialog({ 
    title: 'Custom Dialog Example',
    message: '<p>This dialog demonstrates many of the options available when using the Bootbox library</p>',
    size: 'large',
    onEscape: true,
    backdrop: true,
    buttons: {
        fee: {
            label: 'Fee',
            className: 'btn-primary',
            callback: function(){
                                
            }
        },
        fi: {
            label: 'Fi',
            className: 'btn-info',
            callback: function(){
                                
            }
        },
        fo: {
            label: 'Fo',
            className: 'btn-success',
            callback: function(){
                                
            }
        },
        fum: {
            label: 'Fum',
            className: 'btn-danger',
            callback: function(){
                                
            }
        }
    }
})
```
Trong đó:
* title: title của dialog.
* message: Content cần hiển thị trong dialog.
* size: "small" | "large" | "extra-large".
* onEscape: true | false. Có dismiss dialog với ESC không.
* backdrop: true | false. Có cần show backdrop hay không.
* buttons: các buttons cần hiển thị. trong đó có `label`, `className` và `callback`.

![](https://images.viblo.asia/750476bf-9e68-4dba-93e5-d2b802fd7359.png)

Bài này là đã hướng dẫn một cách cơ bản nhất về cách sử dụng Bootbox.js này.
Ngòai ra còn các methods, events khác nữa. Bạn có thể xem chi tiết và tìm hiểu thêm trên tài liệu của nó.

http://bootboxjs.com/