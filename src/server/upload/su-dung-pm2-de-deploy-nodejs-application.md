Xin chào mọi người. Hôm nay mình sẽ giới thiệu và hướng dẫn cơ bản với các bạn một công cụ hỗ trợ đắc lực cho việc deploy ứng dụng Node.js và quản lý các process của ứng dụng. Lý do là mình vô tình click vào một đường link trên Google và thấy giao diện của nó mới toanh so với lần gần nhất mình vào. :D Kể lại thì trước đây mình cũng có sử dụng PM2 để deploy và quản lý process cho một dự án về có sử dụng Node.js (Nuxt). Thấy thằng PM2 này có vẻ khá tiện và nhiều star nên mình thử luôn. Mình thấy nó cũng rất gì và này nọ. 
#### Introduction
PM2 là một daemon process manager, nó giúp bạn quản lý các tiến trình trong ứng dụng của bạn, giúp cho application của bạn luôn chạy, mình thì hay gọi là luôn ở trạng trái "sống". 

Chắc hẳn khi dùng node.js, với môi trường local, để start một node.js app, bạn sẽ chạy command theo kiểu:
```shell
$ node app.js
```
Tuy nhiên, khi lên trên server thực tế chúng ta không thể dùng theo kiểu này, mọi thứ sẽ phức tạp hơn rất nhiều. Chúng ta phải có một công cụ để quản lý, tracking các process của ứng dụng, có thể biết được tài nguyên (RAM, CPU,... ) mà các process đang sử dụng. Ngoài ra còn có thể giám sát log từ phía application của bạn. 
#### Install & quickstart
Cài đặt PM2 khá đơn giản, theo cú pháp:
```shell
$ npm install pm2 -g

// or

$ yarn global add pm2
```
Sau khi cài đặt bạn có thể kiểm tra version của PM2:
```
$ pm2 -v
```

Lúc này bạn cũng có thể sử dụng pm2 để start ứng dụng bằng lệnh:
```shell
$ pm2 start app.js
```

Sau khi chạy lệnh này, sẽ có giao diện hiển thị phần thông tin process node.js app của bạn kèm một vài thông tin về process này. 

Tương tự, để stop app nếu bạn muốn dừng:
```
$ pm2 stop app.js 
```

Cơ bản để quickstart một node.js app với PM2, thì chúng ta chỉ cần các bước như trên là được. Tuy nhiên, chúng ta sẽ tìm hiểu và nghiên cứu sâu hơn về các tính năng mà PM2 mang lại. Bài này mình sẽ nói chủ yếu về cách sử dụng PM2 để deploy và giới thiệu các command để tracking process node.js application. 
#### Deployment
Chúng ta cần một file cấu hình chứa các thông tin về các tùy chọn như name, environment, scripts file, logs, node instances... PM2 hỗ trợ chúng ta một file `ecosystem.config.js` để làm chứa các thông tin này. Chạy command:
```bash
$ pm2 ecosystem
```
PM2 sẽ sinh ra một file cho bạn như sau:
```js
module.exports = {
  apps : [{
    name: 'API', // application name 
    script: 'app.js', // script path to pm2 start

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two', // string containing all arguments passed via CLI to script
    instances: 1, // number process of application
    autorestart: true, //auto restart if app crashes
    watch: false,
    max_memory_restart: '1G', // restart if it exceeds the amount of memory specified
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

// deployment
  deploy : {
    production : {
      user : 'node',
      host : 'xx.xx.xx.xx',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
```
Có lẽ không cần giải thích quá nhiều phải không nào. Khá là dễ hiểu. Phần deployment nếu bạn có thêm môi trường như staging thì bạn cũng tạo một đoạn config tương tự như vậy. Đoạn `post-deploy` sẽ là đoạn script mà bạn sẽ thực thi. Dưới dây là ví dụ về một application mà mình đã từng làm trước đây. 
```js
module.exports = {
    apps: [
        {
            name: 'app-name',
            script: './server/index.js',
            cwd: __dirname, // path-to-project
            instances: 2, // default 1
            autorestart: true,
            exec_mode: 'cluster', // allow scale up app
            env: {
                NODE_ENV: 'production',
            },
        },
    ],

    deploy: {
        production: {
            host: 'xx.yy.zz.vv',
            user: 'deploy',
            ssh_options: [
                'ForwardAgent=yes',
            ],
            ref: 'origin/master',
            repo: 'git@github:repo/repo.git',
            path: '/path/to/project',
            'post-deploy': 'cd /path/to/project && NODE_ENV=production yarn --production=false;yarn build;pm2 startOrReload ecosystem.config.js',
            env: {
                NODE_ENV: 'production',
            },
        },

        staging: {
            user: 'deploy',
            host: 'xx.yy.zz.vv',
            ref: 'origin/develop',
            repo: 'git@github.com:repo/repo.git',
            path: '/path/to/project',
            ssh_options: ['PasswordAuthentication=no', 'StrictHostKeyChecking=no'],
            'post-deploy': 'cd /path/to/project && yarn --production=false;yarn build;pm2 startOrReload ecosystem.config.js',
            env: {
                NODE_ENV: 'production',
            },
        },
    },
};

```
Để start application thì bạn chạy:
```js
$ pm2 start ecosystem.config.js // lúc trước là pm2 start app.js
```
Ngoài ra các bạn có thể tham khảo thêm các thông tin về các lệnh tại: https://pm2.keymetrics.io/docs/usage/application-declaration/#attributes-available.

Để deploy application thì lần đầu tiên bạn cần chạy
```shell
$ pm2 deploy production setup
// or staging
$ pm2 deploy staging setup
```
Ở lần đầu thì nó sẽ kéo source code của bạn về và setup. Ở các lần tiếp theo thì bạn chỉ cần chạy:
```
$ pm2 deploy production update
// or
$ pm2 deploy staging update
```
Chi tiết hơn về Deployment của PM2 bạn có thể xem tại https://pm2.keymetrics.io/docs/usage/deployment/.

Ở đây mình chỉ đang nói về PM2 và deployment nên mình sẽ không nhắc gì đến setup server nhé.

Sau khi chạy command deploy, bạn sẽ thấy giao diện của bạn xuất hiện như sau.
![](https://images.viblo.asia/7e029e53-9ba5-4492-bdbb-9a73c9290675.png)
Như vậy là thành công rồi nhé. 
Bạn sẽ thấy được trạng thái các process, uptime, cpu, memory usage,status... của application. 
Việc quan trọng tiếp theo cần làm đó là check logs, theo dõi, quản lý các process đang chạy. 

#### Logs 
Mặc định PM2 sẽ lưu logs tại ./pm2/logs.

Có thể check logs bằng command:
```shell
$ pm2 logs app-name
```
#### Monitoring
PM2 cho phép chúng ta có thể monitor resource usage, CPU.. vân vân mà mây mây.
```bash
$ pm2 monit 
```
Dưới đây là phần monitoring project mình chạy bên trên
![](https://images.viblo.asia/26037256-285f-4871-8149-0fdfc502fbac.png)

Bạn có thể thấy rõ hơn các thông tin mà các process đang sử dụng tại phần `custom metrics`, cùng với đó là thông tin app tại phần `Metadata`.
#### Manage Process
Mình sẽ giới thiệu với các bạn một vài command của PM2 mà mình hay dùng để quản lý application.
```
$ pm2 start ecosystem.config.js --name app-name
$ pm2 stop ecosystem.config.js
$ pm2 stop app-name
$ pm2 restart ecosystem.config.js
$ pm2 restart app-name
$ pm2 reload ecosystem.config.js
$ pm2 reload app-name
$ pm2 startOrReload ecosystem.config.js 
$ pm2 delete ecosystem.config.js
$ pm2 status // check status PM2
```

Ngoài ra trong quá trình làm việc với server, mình cũng có sử dụng thêm `htop`, đây là một ứng dụng cho phép theo dõi các process real-time.
Cài đặt htop:
```
sudo apt-get install htop
```
Sau khi process của bạn chạy, bạn có thể kiểm tra bằng lệnh: `htop` để thấy được chi tiết hơn các tài nguyên, các thông số mà hệ thống đang dùng. 

![](https://images.viblo.asia/983383b0-5d30-4903-b5c9-bc82c59b466c.png)




Với PM2, bạn có thể kết hợp các tool CI, CD khác như CircleCI, hay như mình đang sử dụng thì là Sun* CI để hỗ trợ cho việc auto deploy, zero-downtime application.  Tuyệt vời phải không nào. :D.

Bài viết mình xin dừng lại tại đây. Cảm ơn các bạn đã theo dõi.

Reference: https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/