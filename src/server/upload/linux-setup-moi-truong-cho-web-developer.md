Mình xài Linux cũng một thời gian kha khá và có một số kinh nghiệm trong việc setup môi trường cho việc code Web ở Linux. Cho nên mình xin chia sẻ cho các bạn một số ứng dụng mình cài lên máy phục vụ cho công cụ tạo bug của mình nhé.

## Base System

Mình hiện tại đang sử dụng Ubuntu 18.04 làm OS chính của mình. Trước đây có sử dụng Linux Mint 19.2 Tina nhưng cài Docker trên đó hơi có vấn đề một tí (Ít nhất là tới thời điểm viết bài này) nên mình chuyển qua lại Ubuntu cho thân thuộc. Ubuntu mình cài đặt ở chế độ Minimal Installation nhé. Nó sẽ loại bỏ các ứng dụng không cần thiết cho công việc của mình.![](https://htknguyen.com/wp-content/uploads/2019/10/7d1ddd116b0080d5.png) Nhớ chọn cái Minimal installation nhé.

## Internet Browser & Internet

*   Firefox - Trình duyệt chính của mình trên Linux. Firefox hoạt động trên Linux ổn định và nhẹ nhàng hơn Google Chrome nên mình chọn thằng này.
*   [Google Chrome](https://www.google.com/intl/vi/chrome/) - Tuy vậy, thì Chrome vẫn phải cài đặt để test trên nhiều browser. Mình chỉ thỉnh thoảng mới bật lên để test thôi.
*   [Skype](https://www.skype.com/en/) - Chat chit một số việc Freelancer với khách hàng trên này.
*   [Rambox](https://github.com/ramboxapp/community-edition) - Dùng để chat Facebook Messenger là chính. Đỡ phải vào Web.

## Tool

*   [Shutter](https://launchpad.net/shutter) - Mặc định thì cái screen shot của Ubuntu khá là cùi. Vì thế nên sử dụng thằng này để screen shot được xịn sò hơn. Nó cũng chỉnh sửa ảnh sau khi screen shot nữa.
*   [Draw.io](https://github.com/jgraph/drawio-desktop) - Máy mình khá yếu nên sử dụng Draw.io trên trình duyệt khá là nặng. Dùng bản Offline của nó ổn hơn nhiều các bạn ạ.
*   [Pinta](https://pinta-project.com/pintaproject/pinta/howto/installing-pinta) - Cái này dùng để edit ảnh ọt. Nhẹ nhàng đơn giản thôi. Mình không dùng Gimp vì nó nặng nề quá không dùng hết.
*   [Typora](https://www.typora.io/) - Dùng để viết Markdown trực quan. Như ở bài [Tại sao nên sử dụng Markdown thay vì Word?](https://htknguyen.com/2019/10/02/tai-sao-nen-su-dung-markdown-thay-vi-word/) thì mình không dùng Office nên dùng thằng này cho nhẹ nhàng.
*   [Insomia](https://insomnia.rest/) - Dùng để gọi API thay cho Postman. Mình thích thằng này hơn Postman. Dễ cài đặt hơn, giao diện trực quan dễ nhìn hơn.
*   [Ibus-teni](https://github.com/teni-ime/ibus-teni): Gõ tiếng việt trên Linux đúng là khổ dâm. Và thằng này, mặc dù giờ ngưng phát triển rồi, nhưng mình thấy ổn trên bản Ubuntu 18.04 này.
*   [Synaptic](http://www.nongnu.org/synaptic/) - Cài đặt ứng dụng ngoài, thay cho Ubuntu Software Center.

## Editors

*   [Visual Studio Code](https://code.visualstudio.com/) - VS Code thần thánh. Mình code chính Javascript + PHP nên mình dùng thằng này.
*   [Atom / Sublime Text](https://flight-manual.atom.io/getting-started/sections/installing-atom/) - Dùng để mở source code demo là chính.
*   Vim - Tập sử dụng thằng này thay cho nano. Làm màu là chính (nhưng dùng quen thì thấy nó xịn thật).

## Terminal

*   [Zsh + Oh My Zsh](https://ohmyz.sh/) - Dùng bash mặc định của Linux cũng được. Nhưng zsh có nhiều plugin hay hơn nên mình qua thằng này. Mình sử dụng Plugin auto-completation để gõ lệnh nhanh hơn.
*   [Cowsay + fortune](https://en.wikipedia.org/wiki/Cowsay): Tự động có mấy cái quote hay ho khi bật Terminal lên.
![](https://htknguyen.com/wp-content/uploads/2019/10/nguyenhoang@aki-var-www-html-project-public_001.png) 

Ví dụ ở Cowsay + Forrtune

## Development Environment

*   [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) - Quá nổi tiếng. Không nói nhiều.
*   [Docker-compose](https://github.com/docker/compose/releases) - Luôn đi kèm với Docker. Cũng không phải nói nhiều.
*   Git - Không nói nói nhiều. Hình như nó được cài mặc định thì phải.

## PHP - Javascript

*   [LAMP Stack](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04) - Stack thay cho XAMPP cho những bạn nào mới nhảy từ Window sang khi code PHP
*   [Composer](https://getcomposer.org/) - Mình hay dùng Laravel khi code PHP nên phải install thêm thằng này nữa.
*   [Virtualhost](https://github.com/RoverWire/virtualhost) - Tạo nhanh Vhost trên Ubuntu. Mình lười tạo cái này mỗi khi có Project mới lắm.
*   [NodeJS + NPM](https://github.com/nodesource/distributions/blob/master/README.md) - Mình code cả NodeJS nên cài luôn vào máy.

### NPM Packages:

Đây là những packages mình cài ở dạng global khi sử code trên NodeJS.

*   [live-server](https://www.npmjs.com/package/live-server) - Dùng để tạo Server khi chạy các file HTML/CSS. Các bạn đừng click mở trực tiếp mà nhớ sử dụng thằng này nhé.
*   [nodemon](https://www.npmjs.com/package/nodemon) - Auto restart lại server khi code NodeJS.
*   [localtunnel](https://github.com/localtunnel/localtunnel) - Dùng để tạo một đường dẫn thực sự từ local để test. Thường thì mình dùng cái này để test Facebook Messenger Bot.

## Kết luận

Trên đây là một số ứng dụng mình dùng để setup cho môi trường làm việc của mình trên Linux của mình. Bài viết chỉ có tính chất tham khảo thôi các bạn nhé các bạn trẻ.

[Source](https://htknguyen.com/2019/10/03/linux-setup-moi-truong-cho-web-developer/)