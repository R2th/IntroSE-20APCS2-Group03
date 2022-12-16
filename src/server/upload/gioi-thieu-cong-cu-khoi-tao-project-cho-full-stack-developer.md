# Lời nói đầu
Xin chào các bạn, mỗi khi các bạn bắt đầu một dự án mới, việc  cấu hình hay cài đặt các thư viện ban đầu thực sự tốn rất nhiều thời gian và công sức của các bạn dev. Đó là lý do tại sao mà `boilerplate` ra đời.

# Boilerplate là gì?
Boilerplate là một bộ khung sườn hay cũng có thể hiểu là một template. Boilerplate giúp các bạn đơn giản hóa việc cấu hình cấu trúc file và thư mục của dự án, ngoài ra người làm ra boilerplate cũng tích hợp sẵn một số thư viện tiêu biếu giúp bạn tiết kiệm thời gian cho việc tìm kiếm và cài đặt các thư viện.

Thực sự thì bạn có thể tìm thấy rất nhiều `boilerplate` trên github, nhưng trong bài viết này, mình xin chia sẻ với các bạn `boilerplate` của minh, nó có tên là [erb](https://github.com/htdangkhoa/erb) (viết tắt của `express-react-boilerplate`).

# [Erb](https://github.com/htdangkhoa/erb)
## Giới thiệu
Boilerplate của mình bao gồm các thành phần và tính năng chính như sau:
- [Express](https://expressjs.com) - Là framework để viết restful API.
- [React](https://reactjs.org) - Là một thư viện giúp bạn xây dựng giao diện người dùng bằng ngôn ngữ javascript.
- [MongoDB](https://www.mongodb.com) - Cơ sở dữ liệu NOSQL dành cho Node.js để lưu trữ data.
- Server side rendering.
- Redux, Redux-thunk
- Hot reloading
- SEO
- Đa ngôn ngữ
- etc.

## Cấu trúc
```
.
├── src
│   ├── api                     # All of restful API
│   ├── client                  # Client scope
│   │   ├── app                 # App root component
│   │   ├── assets              # Assets (e.g. images, fonts etc.)
│   │   ├── components          # Reusable components
│   │   ├── pages               # Page components
│   │   ├── stories             # UI components with Storybook
│   │   ├── themes              # App-wide style
│   │   ├── vendor              # 3rd libraries for client
│   │   └── index.js            # App bootstrap and rendering (webpack entry)
│   ├── middlewares             # All of express middleware
│   ├── model                   # Data transfer object
│   ├── mongo                   # MongoDB configuration
│   ├── public                  # Express server static path
│   │   ├── locales             # All of i18n resources
│   │   └── favicon.ico         # Favicon is placed in the same path with the main HTML page
│   ├── secure                  # All of security (e.g passport configuration, jsonwebtoken etc.)
│   ├── store                   # Store configuration for both client and server side
│   ├── tools                   # Project related configurations
│   │   ├── jest                # Jest configurations
│   │   ├── hooks.js            # Assets require hooks
│   │   └── webpack.config.js   # Webpack configuration
│   ├── types                   # All of type for flow
│   ├── utils                   # App-wide utils
│   ├── config.js               # Configuration entry point loaded from .env file
│   ├── i18n.js                 # I18next configuration
│   ├── index.js                # App entry point
│   ├── routes.js               # Routes configuration for both client and server side
│   └── server.js               # Express server
├── .env.development            # All of variables for development environment
└── .env.production             # All of variables for production environment
```

## Cách sử dụng
Có 2 cách sử dụng:
1. Truy cập vào git của [erb](https://github.com/htdangkhoa/erb) và clone về.
2. Các bạn có thể tải về thông qua npm
    ```bash
    $ yarn global add express-react-boilerplate
    # or (sudo) npm install -g express-react-boilerplate
    
    $ erb-gen --help
    
    Usage: erb-gen [options]
    
    Options:
        -v, --version      output the version number
        -d, --dir <type>   project's directory. (default: ".")
        -n, --name <type>  project's name. (default: "express-react-boilerplate")
        -h, --help         output usage information
    ```
    
## Các lệnh mà erb cung cấp
| Script    | Description                                                                           |
| --------- | ------------------------------------------------------------------------------------- |
| dev       | Chạy server ở môi trường develpment.                                                        |
| start     | Chạy server ở môi trường production.                                                          |
| build     | Đóng gói code (bao gồm server & client) vào thư mục `dist/`. |
| wp        | Đóng gói client vào thư mục `dist/`.                                                             |
| analyze   | Xem các gói của bạn một cách trực quan hơn dưới dạng treemap.                                           |
| storybook | Chạy storybook server.                                                           |
| test      | Chạy unit test.                                                                          |

## Demo
https://htdangkhoa-erb.herokuapp.com/

# Kết luận
[Erb](https://github.com/htdangkhoa/erb) là một boilerplate phù hợp với những dự án vừa và lớn. Nó thật sự giúp bạn tiết kiệm được một khoảng thời gian lớn. Ngoài những tính năng mà mình đã nói trên, các bạn có thể xem chi tiết lợi ích mà nó mang lại tại [đây](https://github.com/htdangkhoa/erb).

Nếu các bạn thấy hay thì có thể ủng hộ cho mình 1 star trên github nhé :).

Chúc các bạn một ngày vui vẻ :heart:.

# Tài liệu tham khảo
- Express - https://expressjs.com
- React - https://reactjs.org
- MongoDB - https://www.mongodb.com
- Erb - https://github.com/htdangkhoa/erb