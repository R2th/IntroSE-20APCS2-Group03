**Bài Toán**: Khi triển khai auto scaling trên Azure với `Azure Scale Set`, cần có cơ chế để tự động cập nhật các `Virtual Machine (VM)` mỗi khi app có version mới.

---

**TL;DR**: Sử dụng một tính năng mới của Azure (mới được giới thiệu ngày 1/7/20): [Auto upgrade image cho các custom image](https://azure.microsoft.com/en-us/updates/automatic-image-upgrade-for-custom-images-now-available-for-azure-vmss/) - tính năng này cho phép kết hợp [Automatic image upgrade](https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-automatic-upgrade) với [Shared Image Gallery](https://docs.microsoft.com/azure/virtual-machine-scale-sets/shared-image-galleries) => cung cấp giải pháp auto deploy version mới của app tới các VM trong 1 Scale Set.

## Giới thiệu qua

Hình vẽ dưới đây đã mô tả khái quát quy trình triển khai, sử dụng cùng lúc một vài service của Azure:
- Sử dụng `Image Builder`, tự build một custom image có chứa đầy đủ các resource cần thiết (môi trường, ứng dụng, source code ...) để có thể chạy được app của mình.
- Image được tạo ra ở trên - sử dụng `Shared Image Gallery` - có thể được lưu trữ, phân phối và đánh tag version cho các image
- Sử dụng các phiên bản được lưu trong `Shared Image Gallery`, deploy image lên các con VM trong Scale Set của mình (và việc deploy này cũng sẽ được thực hiện tự động)

![](https://images.viblo.asia/a44efc03-442b-4755-acdf-8a3a3de5624f.png)

## 1 chút giới thiệu

### Build image

Thông thường, việc deploy app và cập nhật các bản update security thường là một quy trình phức tạp, bao gồm nhiều bước. Việc sử dụng 1 `VM image` đã được tiêu chuẩn hóa - thường đã bao gồm sẵn config, security, app cần thiết để chạy ứng dụng ... - sẽ giúp đảm bảo được tính ổn định, nhất quán giữa các lần deploy.

Có 2 cách để tạo các `VM image` này:
- Tự build sử dụng imaging pipeline cá nhân
- Sử dụng service có sẵn của Azure - [Azure Image Buider](https://docs.microsoft.com/azure/virtual-machines/linux/image-builder-overview)

Sử dụng, Azure Image, Builder, ta có thể lựa chọn 1 based image (Windows hoặc Linux), sau đó cài cắm thêm các thành phần cần thiết trước khi đóng gói lại thành 1 custom image.

### Phân phối image vừa được tạo

[Shared Image Gallery](https://docs.microsoft.com/azure/virtual-machine-scale-sets/shared-image-galleries) cho phép phân phối image cho nhiều subscription, nhiều region ... thông qua một platform quản lý image duy nhất.

### Deploy app

Bước thứ 3 trong flow này - đó là deploy các image vừa tạo cho các VM trong 1 Scale Set. Sử dụng [automatic OS image upgrade](https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-automatic-upgrade), ta không cần phải làm gì nhiều để deploy image. Service sẽ tự động theo dõi image gallery, phát hiện các version của image mới được tạo, tự động upgrade các VM đã có theo image mới.

Việc này được thực hiện bằng cách thay thế `OS disk` của các VM với một disk mới, được tạo theo image mới nhất. Trong khi đó, `data disk` của mỗi VM thì vẫn được giữ lại. Để tối ưu thời gian downtime, upgrade được thực hiện theo batch, với max là 20% số VM của scale set sẽ được update lần lượt.

Monitor sẽ theo dõi health của các VM đang được upgrade, health của toàn bộ scale set trong quá trình update. Update kiểu này cũng sẽ hỗ trợ auto rollback nếu như update có vấn đề.

## Nghịch thử

Đầu tiên, ta có thể tự build 1 image (có thể tích hợp việc này vào quy trình CD, mỗi khi app có 1 version mới thì sẽ tự động build 1 custom image)

hoặc dùng `Image builder` để build image (Chú ý: [service này vẫn đang ở trạng thái preview](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/image-builder-overview) =)) )

> Azure Image Build [is expected to be generally available in Q3 2020](https://azure.microsoft.com/en-us/blog/streamlining-your-image-building-process-with-azure-image-builder/).

Tiếp theo, như đã nói ở trên, ta sẽ cần tạo 1 gallery, là nơi chứa các image mà ta sẽ tạo.

![](https://images.viblo.asia/bb0e0ddf-8530-45d5-aaa6-f98a3ae45051.png)

Sau khi tạo xong, quan sát trong image gallery, ta sẽ thấy có mục `image definition`, đây sẽ là resource tiếp theo mà ta cần phải tạo/ Về cơ bản ,thì [image definition](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/shared-image-galleries#image-definitions) là một nhóm các version của một image; nó chứa các thông tin chung về image như base type (linux hay windows) ...

![](https://images.viblo.asia/1b1c13b0-710f-4907-ad16-15c691bbaeee.png)

Từ một `image definition`, ta có thể thấy các lựa chọn:
- Add thêm version cho definition (là khi có update)
- provision một VM mới dựa trên definition
- thậm chí provision hẳn Scale Set mới, tất cả các VM trong Scale Set đó đều sẽ dựa theo definition này

![](https://images.viblo.asia/1471c3b9-04c4-4e3f-aff7-fe71be58e379.png)

Khi lựa chọn tạo mới một Scale Set, khi tới tab `Management`, ta sẽ set `Automatic OS upgrades = On`

![](https://images.viblo.asia/828942e9-fa31-45fd-bbf9-2816b53ae778.png)

Như vậy là đã xong. Scale Set khi tạo mới sẽ được map với gallery, mà mỗi khi có 1 image version mới, các VM sẽ tự động được upgrade theo image mới đó.
# Tài liệu

https://azure.microsoft.com/en-us/blog/build-distribute-and-deploy-application-updates-to-azure-virtual-machine-scale-sets/