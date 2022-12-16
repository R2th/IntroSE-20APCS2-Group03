## Lời nói đầu

-----


> LINE Front-end Framework（LIFF）là platform webapp chạy bên trong LINE. Khi khởi động webapp (LIFFapp) đã được đăng ký trên LIFF ở LINE thì có thể get được các thông tin như là user ID,... từ platform LINE. Các bạn có thể sử dụng những thông tin đó vào LIFF app để cung cấp các chức năng có sử dụng thông tin user, và bạn có thể thay user gửi tin nhắn.

## Thử implement LIFF


-----


Để có thể sử dụng LIFF thì bạn phải tạo LIFF app và đăng ký vào chanel.
Ở chanel muốn đăng ký, ở tab LIFF ấn vào tạo LIFF app.
![image.png](https://images.viblo.asia/efcfb799-20d3-48df-a4b5-f5cd6c3b7dc4.png)

Nhập tên, size, URL end point , BLE feature rồi ấn save.（Lần này tôi để URL end point cấu tạo = Cloudfront+S3）
![image.png](https://images.viblo.asia/f0497b6f-7901-43d8-9b24-bb1904fb0720.png)

Sau khi thành công thì sẽ hiển thị ra list. LIFF URL được gen ra. Cái URL này khi user tap vào sẽ access vào LIFF.
![image.png](https://images.viblo.asia/a52093cc-76ea-4307-9c6f-e70b6ffb8f92.png)

Việc đăng ký đến đây là kết thúc. Chúng ta cùng bắt đầu thực hiện implement LIFF thôi.
```
 <p id="id"></p>
        <p>メッセージを送信する</p>
        <button id="message">Hello, world!</button>
        <p>プロフィールを取得する</p>
        <button id="profile">プロフィールを取得する</button>
        <p id="userId"></p>
        <p id="displayName"></p>
        <p id="pictureUrl"></p>
        <p id="statusMessage"></p>
        <p>URLを開く</p>
        <button id="open">クラスメソッドを開く</button>
        <p>LIFFアプリを閉じる</p>
        <button id="close">閉じる</button>
```
```
   <script src="https://d.line-scdn.net/liff/1.0/sdk.js" type="text/javascript"></script>
        <script　type="text/javascript">
            const idSPace = document.getElementById('id');
            const errorSpace = document.getElementById('error');

            //liff init
            liff.init(
                data => {
                    const userId = data.context.userId;
                    idSPace.innerText = userId;
                },
                err => {
                    console.log('error', err);
                }
            );

            document.getElementById('profile').addEventListener('click', function () {
                liff.getProfile()
                .then(profile => {
                    const userIdSpace = document.getElementById('userId');
                    const displayNameSpace = document.getElementById('displayName');
                    const pictureUrlSpace = document.getElementById('pictureUrl');
                    const statusMessageSpace = document.getElementById('statusMessage');

                    userIdSpace.innerText = profile.userId;
                    displayNameSpace.innerHTML = profile.displayName;
                    pictureUrlSpace.innerHTML = profile.pictureUrl;
                    statusMessageSpace.innerHTML = profile.statusMessage;

                })
                .catch((err) => {
                    console.log('error', err);
                });
            });

            document.getElementById('open').addEventListener('click', function () {
                liff.openWindow({
                    url: 'https://classmethod.jp/'
                });
            });

            document.getElementById('close').addEventListener('click', function () {
                liff.closeWindow();
            });

            document.getElementById('message').addEventListener('click', function () {
                liff.sendMessages([
                    {
                        type:'text',
                        text:'Hello, World!'
                    }
                ])
                .then(() => {
                    console.log('message sent');
                })
                .catch((err) => {
                    console.log('error', err);
                });
            });
        </script>
```

## Test

-----

Tôi sẽ test thử trong thực tế. LIFF sẽ được hiển thị dưới dạng như thế này.
![image.png](https://images.viblo.asia/4958acc8-8b3e-4e86-951a-9554c7829211.png)

## Gửi mess

-----


Sau khi ấn button gửi thì mess sẽ được gửi đi.（Bởi vì nó là con bot "vẹt" nên nó sẽ rep nội dung y hệt)
![image.png](https://images.viblo.asia/8bf77002-3b1c-4ce5-ae7b-cc21ec7d8d27.png)

## Profile

-----


Khi ấn button get profile thì sẽ lấy được profile.
Có thể lấy được user ID, tên, ảnh profile, status message.
![image.png](https://images.viblo.asia/3cbbd490-8945-4ffc-bf7a-628525a1fdbe.png)

## Hiển thị URL

-----



Ấn vào button class method thì sẽ hiển thị ra site class method trên internal browser
![image.png](https://images.viblo.asia/75fc22e1-3827-4013-8f50-ad40e2f91334.png)

Tạm thời thì tôi thấy là các chức năng đã hoạt động đúng rồi. (Chức năng đóng LIFF app cũng hoạt động bình thường)

## Tổng kết 

-----


Bạn thấy sao? Bằng việc sử dụng LIFF có thể sẽ tạo được những UX vô cùng đa dạng.


Bài viết được dịch từ link: https://dev.classmethod.jp/articles/liff-tutorial/