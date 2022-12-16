Bài viết này mình sẽ giới thiệu cho bạn cách để deploy một project create-react-app lên Github Pages các bạn nhé.

### 1. Tạo một Github repository

Điều đầu tiên bạn phải làm là tạo một kho lưu trữ (repo) trên Github với tên bắt kì.
Cách khởi tạo một repo, bạn có thể tham khảo thêm ở linh này:  https://help.github.com/articles/create-a-repo/

### 2. Sử dụng Command line

1. Chạy `npm run build` trong project create-react-app của bạn. Một thư mục `build` sẽ được tạo ngay sau khi kết thúc dòng lệnh.
2. Tiếp theo, bạn tìm đến file package.json và paste đoạn mã này vào `"homepage": "http://username.github.io/myapp"`. Thay `username` bởi Github Username của bạn và `myapp` là tên repo mà bạn vừa tạo trước đó.

![](https://images.viblo.asia/0e4c7462-d0df-4771-b3b7-a6e4654c1002.png) 

3. Thêm các đoạn mã dưới đây vào package.json

    `"predeploy": "npm run build",`
    
    `"deploy": "gh-pages -d build"`
    
    Sau đó, chạy `npm install --save-dev gh-pages`
    
    Bạn sẽ thấy `gh-pages` được thêm vào `"devDependencies"` trong file package.json ngay sau đó

    ```
    "devDependencies": {
     "gh-pages": "^1.1.0"
    }
    ```

    ![](https://images.viblo.asia/ceaffd67-45c3-4a3d-a7a1-6e7758c45b54.png)

4. Cuối cùng, chạy `npm run deploy`.

    Đi đến đường dẫn `http://username.github.io/myapp` bạn đã khai báo trước đó xem project create-react-app của mình đã chạy chưa nhé. 

    ![](https://media.giphy.com/media/e07y5SEwFMDm0/giphy.gif)

### 3. Notes

Github Pages không support routers sử dụng HTML5 `pushState` history API các bạn nhé (Ví dụ, React Router sử dụng `browserHistory`).
Điều này là do khi trang được tải mới một url như `http://user.github.io/todomvc/todos/42`, trong đó `/todos/42` là một frontend route, lúc này Server của Github Pages sẽ trả về 404 vì nó không biết`/todos/42` là gì. Nếu bạn muốn thêm router vào project được hosted trên Github Pages, dưới đây bạn có thể tham khảo một số giải pháp:
* Nếu bạn đang sử dụng React Router, bạn có thể switch qua `hashHistory` thay vì `browserHistory`, nhưng URL lúc này sẽ trông dài và xấu hơn (Ví dụ: `http://user.github.io/todomvc/#/todos/42?_k=yknaj`)
* Bạn có thể sử dụng trick để giúp Github Pages xử lý 404 bằng cách chuyển hướng đến trang `index.html`. Bạn sẽ cần thêm một file `404.html` với code chuyển hướng đến folder `build` trước khi deploy, và thêm code xử lý chuyển hướng vào `index.html`. Chi tiết về kĩ thuật này, bạn có thể tìm thấy ở đây: https://github.com/rafrex/spa-github-pages

### 4. Troubleshooting

**"/dev/tty: No such a device or address"**

Khi deploy, nếu gặp lỗi `/dev/tty: No such a device or address`, bạn xử lí follow các bước sau:

1. Tạo mới một [Personal Access Token](https://github.com/settings/tokens)
2. `git remote set-url origin https://<user>:<token>@github.com/<user>/<repo>`
3. Chạy `npm run deploy`

**"Cannot read property 'email' of null"**

Nếu gặp lỗi này `Cannot read property 'email' of null` bạn follow các bước sau:

1. `git config --global user.name '<your_name>'`
2. `git config --global user.email '<your_email>'`
3. Chạy `npm run deploy`

### 5. Kết luận

Bài viết mình có tham khảo ở hai nguồn dưới đây:

* https://medium.com/@_mariacheline/deploy-create-react-app-project-to-github-pages-2eb6deda5b89
* https://facebook.github.io/create-react-app/docs/deployment#github-pages-https-pagesgithubcom

Cảm ơn các bạn đã đọc bài viết, chúc các bạn học tốt !