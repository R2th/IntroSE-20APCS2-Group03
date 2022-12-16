# Mở Đầu
Xin chào mọi người cũng lâu rồi mình mới lại viết bài mới, hôm nay mình sẽ thực hiện thêm chức năng copy các đoạn code. Nó chỉ là một chức năng nhỏ thôi nhưng đôi khi chỉ cần từ nhưng thứ nho nhỏ như vậy gộp lại cũng đã đem đến cho người dùng những trải nghiệm tuyệt vời hơn. Không Vòng vo nữa nhé bắt đầu luôn thôi.
# Thực Hiện
Để thực hiện được chức năng này đầu tiên chúng ta cần phải thêm được nút copy vào các đoạn code, Trong trường hợp của mình những đoạn code này đang nằm trong thẻ `pre`. Thẻ bao này có thể khác tùy thuộc vào bạn sử dụng gì để convert markdown sang HTML.

![Screenshot from 2022-01-14 11-25-08.png](https://images.viblo.asia/bc627cc9-d905-411c-977e-d8b3922babd9.png) 

Bây giờ chúng ta cần thực hiện lấy tất cả các đoạn code ra và thêm nút copy vào, đây là phần code để lấy ra các đoạn code và thêm nút copy vào đoạn code đó. À có một lưu ý nhỏ là mình mình đang dùng Vue nhé, về cơ bản dùng js hay react cũng tương tự :D. trong `mounted` mình gọi đến function `addButtonCopy`, function `addButtonCopy` trong methods như sau:
```js
    addButtonCopy() {
        const highlights = document.querySelectorAll('pre[class*="language-"]')

        highlights.forEach((div) => {
            const copy = document.createElement('button')
            copy.addEventListener('click', this.handleCopyClick)
            div.append(copy)
        })
    },
```
giải thích qua một chút về đoạn code trên, đầu tiên mình lấy ra tất cả các đoạn mã, sau đó thêm nút copy, tiếp theo là thêm sự kiện thực hiện copy code vào clipboard sau khi click vào nút copy đó (cái này mình sẽ nói rõ hơn ở phần sau ), cuối cùng là append nút copy vào từng đoạn code. Kết quả tạm thời chúng ta sẽ được như thế này 
![Screenshot from 2022-01-14 13-49-21.png](https://images.viblo.asia/0350221c-b1c0-466b-9059-a43bb1bb8281.png)

à mình cũng cần style lại một chút cho nút copy nữa nhé:D 
```css
 pre[class*='language-'] button {
        box-sizing: border-box;
        transition: 0.2s ease-out;
        cursor: pointer;
        user-select: none;
        background: rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(0, 0, 0, 0);
        padding: 5px 10px;
        font-size: 0.8em;
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 0 0.15rem;
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        grid-column-gap: 4px;
        color: aliceblue;

        &::before {
            content: "Copy";
        }

        &::after {
            content: "📋";
            display: block;
        }

        &.copied {
            &::before {
                content: "Copied!";
            }

            &::after {
                content: "✔️";
            }
        }
    }
```
Tiếp theo sẽ là copy đoạn code vào clipboard, như ở trên mình đã nói, khi thực hiện click vào button "copy" thì chũng ta sẽ thực hiện copy đoạn code đó. ở trên khi tạo nút copy mình có để sự kiện khi click vào button thì sẽ gọi đến hàm "handleCopyClick". Hàm "handleCopyClick" như sau : 
```js
            handleCopyClick(evt) {
                const { children } = evt.target.parentElement
                const { innerText } = Array.from(children)[0]

                copyToClipboard(innerText)
                evt.target.classList.add('copied');

                setTimeout(() => {
                    evt.target.classList.remove('copied');
                }, 2000)
            },

```
giải thích một chút đầu tiên sẽ lấy phần tử con ra. vì ở trên mình đã append nút copy vào đoạn mã nên phần tử đầu tiên sẽ là phần code, sau khi lấy được code rồi thì sẽ thực hiện copy vào clipboard (phần này mình sẽ nói rõ hơn ở phần sau). sau khi đã copy vào clipboard thành công thì mình thực hiện add class "copied" để thông báo cho người dùng là đã copy thành công, sau đó 2s thì sẽ remove class đó đi để hiển thị lại text là "copy" cho nút.

Mình tìm hiểu thì "clipboard API" không hoạt động trên một số trình duyệt cũ, vì thế để thực hiện copy mình cần thêm một chút nữa đó là "copyToClipboard" như sau:
```js
    const copyToClipboard = (str) => {
        const el = document.createElement('textarea')
        el.value = str
        el.setAttribute('readonly', '')
        el.style.position = 'absolute'
        el.style.left = '-9999px'
        document.body.appendChild(el)
        const selected = document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt(0)
            : false
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        if (selected) {
            document.getSelection().removeAllRanges()
            document.getSelection().addRange(selected)
        }
    }
```
Giải thích qua thì đầu tiên là tạo một phần tử <textarea>  sau đó sẽ set giá trị cho nó bằng chuỗi mà bạn muốn sao chép, set cho nó là "readonly" để tránh trường hợp thêm data vào, tiếp theo là set vị trí cho nó mục đích là nó không xuất hiện ở màn hình. Rồi append <textarea>  ở trên vào  HTML document, tiếp theo là kiểm tra xem có nội dung nào được chọn trước đó không nếu có thì lưu lại còn không thì đánh dấu là "false". Chọn nội dung  <textarea>, thực hiện sao chép khi có action từ người dùng, cuối cùng là kiểm tra xem đã có nội dung được chọn trước khi sao chép thì bỏ chọn tất cả trên document HTML và khôi phục lại nội dung chọn ban đầu. Cùng xem kết quả chúng ta đạt được nhé :D 

![Peek 2022-01-14 14-36.gif](https://images.viblo.asia/06a18fcc-6fe6-4e62-82fa-d70780f82448.gif)
 # Kết Luận
  Như vậy mình đã cùng các bạn thực hiện thêm chức năng copy cho những đoạn code, tuy chỉ là một chức năng nhỏ thôi nhưng nó cũng góp phần mang đến những trải nghiệm tốt hơn cho người dùng đúng không. Mọi người có đóng góp hay thắc mắc gì thì hãy comment xuống bên dưới cho mình được biết nhé. Nếu thây bài viết có ích thì hãy cho mình một upvote + 1 follow nhé. Cảm ơn các bạn.
  
 Tham khảo 
    
[https://www.aleksandrhovhannisyan.com/blog/how-to-add-a-copy-to-clipboard-button-to-your-jekyll-blog/](https://www.aleksandrhovhannisyan.com/blog/how-to-add-a-copy-to-clipboard-button-to-your-jekyll-blog/)
    
  [https://spdevuk.com/how-to-create-code-copy-button/](https://spdevuk.com/how-to-create-code-copy-button/)