Để code được app Mobile đơn giản thì không khó.
# Hello Word
Chúng ta sẽ truy cập trang https://play.nativescript.org/ chọn mục new , tùy vào khẩu vị ngôn ngữ gì, hiện tại mình sẽ chọn mục **NS + Vue.js**
![](https://images.viblo.asia/f5e8fc1a-e93a-4880-9289-e8a3c60a26ec.png)

Click Preview góc phải màn hình, để quét mã QR code, chúng ta phải tải app của nativeScript để có thể hiển thị Preview.

![](https://images.viblo.asia/99e2bf60-b318-451b-9cce-bd1caf98a416.png)

2 app cần tải là **playground** và **preview** của nativescript. Playground để quét mã QR, còn preview là app hiển thị.

![](https://images.viblo.asia/67a055e8-b866-4fde-b81a-775e99ac3f43.jpg)

Bây giờ chúng ta sẽ có giao diện realtime đồng bộ những đoạn code trên nền tảng đó.
![](https://images.viblo.asia/f9123a28-711d-4ba0-8d07-3085c238533c.jpg)

# OCR Đơn giản
Nhận dạng chữ, hóa đơn thuộc lĩnh vực về AI, mình sẽ ko đi sâu phần này mà dùng 1 API free cung cấp từ bên thứ 3 để detected chúng, do hình ảnh ở đây có text tiếng việt nên độ chính xác không cao vì mình để default config của API này là tiếng anh. Xài tàm tạm cho vui.

Source Code: https://play.nativescript.org/?template=play-vue&id=kjPTc7&v=8

![](https://images.viblo.asia/3e57d24b-89df-4658-8158-a5bec65931bb.jpg)
![](https://images.viblo.asia/fe643890-8c69-4ab7-8849-ca8413af158f.jpg)
![](https://images.viblo.asia/ce7ff60c-9a90-4197-9321-072f878ccc96.jpg)

Trước hết chúng ta sẽ khởi tạo chức năng chụp ảnh cho ứng dụng của mình
```
<template>
    <Page class="page">
        <ActionBar>
            <StackLayout orientation="horizontal">
                <Image src="res://icon" width="40" height="40"
                    verticalAlignment="center" />
                <Label text="OCR NativeScript-Vue" fontSize=" 24"
                    verticalAlignment="center" />
            </StackLayout>
        </ActionBar>

        <ScrollView>
            <StackLayout class="home-panel">
                <Button text="Take Picture" @tap="takePicture" />
                <Image :src="img" width="1000" />
                <Button text="Detected OCR" @tap="ocrDetected" />
                <Label :text="result" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>
```

```js
<script>
    // sử dụng thư viện để truy cập camera
    import * as camera from "nativescript-camera";
    import * as bghttp from "nativescript-background-http";
    // module lấy ảnh
    const imageSourceModule = require("tns-core-modules/image-source");
    // module file lưu trữ của ảnh
    const fileSystemModule = require("tns-core-modules/file-system");

    export default {
        data() {
            return {
                textFieldValue: "",

                img: "",
                data: {
                    ParsedResults: [{}]
                },
                result: "",
                options: {},
                xxx: ""
            };
        },

        methods: {
        // hàm để bắt sự kiện click chụp ảnh sau đó lưu ảnh lại với tên, lưu cả đường dẫn path
            takePicture() {
                camera
                    .requestPermissions()
                    .then(() => {
                        camera
                            .takePicture({
                                width: 300,
                                height: 300,
                                keepAspectRatio: true,
                                saveToGallery: true
                            })
                            .then(imageAsset => {
                                this.img = imageAsset;
                                let temp;
                                const source = new imageSourceModule.ImageSource();
                                source.fromAsset(imageAsset).then(
                                    imageSource => {
                                        const folder =
                                            fileSystemModule.knownFolders
                                            .documents()
                                            .path;
                                        const fileName =
                                            "test.png";
                                        const path =
                                            fileSystemModule.path
                                            .join(
                                                folder,
                                                fileName
                                            );
                                        const saved = imageSource
                                            .saveToFile(
                                                path,
                                                "jpeg"
                                            );
                                        // alert(saved);

                                        if (saved) {
                                            console.log(
                                                "Image saved successfully!"
                                            );
                                            this.xxx = path;
                                        }
                                    });
                            })
                            .catch(e => {
                                console.log("error:", e);
                            });
                    })
                    .catch(e => {
                        console.log("Error requesting permission");
                    });
            },
            
            // hàm để detected OCR với file name this.xxx, dịch vụ API này là mình dùng của space OCR, các bạn có thể truy cập trang         // chủ của họ để lấy api miễn phí, detect nhiều loại ngôn ngữ khác nhau, ở đây mình default là tiếng anh
            ocrDetected() {
                let session = bghttp.session("image-upload");

                let request = {
                    url: "https://api.ocr.space/parse/image",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream",
                        "File-Name": "image"
                    },
                    description: "sadsadsa"
                };
                // alert(this.xxx);
                let params = [{
                        name: "apikey",
                        value: "ad7a02939588957"
                    },
                    {
                        name: "language",
                        value: "eng"
                    },
                    {
                        name: "isOverlayRequired",
                        value: "true"
                    },
                    {
                        name: "url",
                        filename: this.xxx,
                        mimeType: "image/jpeg"
                    }
                ];

                let task = session.multipartUpload(params, request);

                // task.on("progress", logEvent);
                // task.on("error", logEvent);
                task.on("responded", respondedHandler);

                function logEvent(e) {
                    console.log(e);
                }
                
                // đoạn này mình bắt thông tin trả về từ API đã detect được qua alert cho đơn giản
                function respondedHandler(e) {
                    let data = JSON.parse(e.data);
                    this.result = data.ParsedResults[0].ParsedText;
                    alert(this.result);
                }
            }
        }
    };
</script>
```

# Kết luận
Đây chỉ là ví dụ đơn giản, ngoài ra chúng ta có thể kết hợp nhiều components, các chức năng khác nhau ghép vào đa dạng hóa ứng dụng của mình