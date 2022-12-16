### Github page là gì ?
GitHub Pages là dịch vụ được tạo bởi GitHub cho phép xuất bản trang web hoặc ứng dụng web bằng cách lưu trữ nó trong kho GitHub miễn phí.
![](https://images.viblo.asia/accf2e6b-dc8c-4112-8de1-81d2764b4d7d.png)
Bạn có thể lưu trữ một trang web đầy đủ và các trang dự án không giới hạn, có thể được coi là “trang” trên website. Code trang web được lưu trong kho lưu trữ GitHub chỉ định, sau đó GitHub sẽ xuất bản để có thể xem trên mọi máy tính hoặc máy tính bảng. Đối với trang web tĩnh hoặc ứng dụng web nhỏ, có một số kế hoạch lưu trữ miễn phí bạn có thể khởi động và hoạt động trực tuyến ngay lập tức. Thường chúng yêu cầu ít thiết lập hơn máy chủ trả phí. 

GitHub Pages là một trong những giải pháp miễn phí như vậy, ở bài viết này mình sẽ đề cập đến việc deploy một static page sử dụng Reactjs lên github page
### Hướng dẫn sử dụng:
Để sử dụng được công cụ github page thì chắc chắn bạn phải có một tài khoản github.

Khi đã có tài khoản github chúng ta tiến hành tạo một repo để lưu trữ source code
![](https://images.viblo.asia/7d60ae0c-76db-4ed4-b1bb-df5d489038b1.png)
Sau khi tạo xong repo, chúng ta tiến hành clone về máy local, như vậy là xong việc chuẩn bị


-----
Bây giờ đến phần code, để tạo một project reactjs chúng ta sử dụng câu lệnh
```
cd /path/to/repo
create-react-app .
```
sau khi đã chạy xong, sử dụng câu lệnh sau để kiểm tra xem project đã hoạt động chưa
```
yarn start
```
![](https://images.viblo.asia/ee2a60ce-4b30-4b1d-89bf-a01d06141f2d.png)

Tiếp theo chúng ta cài đặt package ```gh-pages``` để complie code và phục vụ cho việc deploy
```
yarn add gh-pages --save-dev
```
Sau đó chúng ta vào file ```package.json``` config như sau
```json
{
  "homepage": "http://iamPhong.github.io/mycv",
  "name": "mycv",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "gh-pages": "^2.2.0",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "3.4.0"
  },
  "scripts": {
    "predeploy": "yarn run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
Ở đây chúng ta add thêm một property là ```homepage: http://iamPhong.github.io/mycv``` với url được định dạng như sau:
```http://{username}.github.io/{repo-name}```, ```username``` là user đang nhập github, ```repo-name``` là tên repo vừa tạo, ở đây của mình là ```mycv```.
Tham số cần chú ý tiếp theo là:
```
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```
Đây chính là config sử dụng package ```gh-page``` để deploy lên github. Sau khi đã config xong chúng ta thực hiện đẩy code lên github
```
git add .
git commit -m "Your awesome message"
git push origin master
```
Cuối cùng thực hiện deploy bằng câu lệnh
```
yarn run deploy
```
Khi đã deploy xong chúng ta vào setting của repo hiện tại trên github sẽ thấy phần cài đặt sau:
![](https://images.viblo.asia/f85ef0ab-a269-4f82-b365-f67cab7030f1.png)

Có thể thấy github page của chúng ta được public ở url: ```https://{username}.github.io/{repo-name}```, và source code của trang static page này là nhánh ```gh-pages```.

Vậy thực sự thì package ```gh-pages``` đã làm gì?. Chúng ta tiến hành checkout sang nhánh ```gh-pages```
![](https://images.viblo.asia/f38ea411-cf02-457c-adce-a05383f6b0d9.png)

Ở đây ta thấy tất cả code ở nhánh master sẽ được complie hết lại thành các file và folder để github page có thể hiểu được, do đó sau này chỉ cần merged code vào master và tiến hành deploy bằng câu lệnh ```yarn run``` thì branch ```gh-pages``` sẽ được update lại.

Vậy là giờ đây chúng ta có thể làm việc với reactjs một cách bình thường, nhiệm vụ deploy đã có pakage ```gh-pages``` lo :))

###  Kết luận:
Vậy là mình đã giới thiệu xong cho các bạn cách deploy một ứng dụng web static bằng reactjs lên github pages.
Các bạn có thể thỏa thích sáng tạo với github page và reactjs mà không cần lo lắng về chi phí.

Ở đây mình cũng đã viết một trang cv bằng reactjs và typescript trên github page [tại đây](https://iamphong.github.io/mycv/)

Một vài screenshot
![](https://images.viblo.asia/50303d97-cb36-4ed3-a9ec-4c2efca807ab.png)

Nhìn có vẻ nguy hiểm nhỉ =))
![](https://i.imgur.com/vBOkflC.gif?1)

Vì mới tập tành reactjs nên code còn rất lởm khởm, nếu thấy hứng thú thì các bạn có thể clone source code của mình tại https://github.com/iamPhong/mycv và modify lại cho phù hợp nhé

Chúc các bạn một ngày mới làm việc hiệu quả và tràn trề năng lượng

## Tham khảo:
https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f