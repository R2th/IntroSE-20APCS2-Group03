> Lưu ý: Bài viết có đưa ra nhiều ý kiến cá nhân, mọi người cùng đọc và tham khảo.

Hiện nay, việc sử dụng **Window** và **Linux** (ở đây mình không nói đến **macOS**) là khá phổ biến đối với các lập trình viên. Và  có rất nhiều lập trình viên đam mê khá nhiều game. Như ở công ty mình thì dùng ubuntu (do công ty tiết kiệm vì mua Windows bản quyền khá tốn kém), việc dùng Linux cũng có rất nhiều cái hay, nhưng vấn đề Linux vẫn chưa xử lý tốt đó là chơi game, việc chơi game thì Windows nói số 2 không ai dám đứng nhất từ trước đến nay. Tuy nhiên việc gõ code ở trên Linux lại đem cảm giác tốt hơn là so với Windows. Nhiều lập trình viên ở công ty sử dụng Ubuntu, về nhà lại dùng Windows, cảm giác gõ trên Win lại không được "thuận tay" cho lắm.

## Vậy làm thế nào để vừa chơi game sướng như Windows, mà vừa gõ code sướng như Linux
Thật may là trên Windows có Windows Subsystem for Linux (WSL) mà tôi đã giới thiệu ở bài viết trước, nó thật sự mạnh. Windows đã tích hợp nhân của Linux vào Windows, tuy chưa thật sự hoàn hảo nhưng Microsoft đang cố gắng tích hợp hoàn toàn Linux vào Windows ở bản WSL 2 sắp tới.  

## Ai cũng biết là khả năng chơi game trên Windows được Windows hỗ trợ tận chân răng như thế nào. Vậy gõ code trên Windows thì sao
Đầu tiên, chúng ta cần phải cài đặt WSL lên máy Windows của mình. Hướng dẫn đầy đủ tại đây https://docs.microsoft.com/en-us/windows/wsl/install-win10

Hiện nay, anh em trong group của mình chủ yếu sử dụng VSCode để lập trình (trong đó cũng có mình). Rất may mắn là VSCode được tích hợp khả năng kết nối tới WSL. Chúng ta cần cài đặt **Visual Studio Code Remote - WSL extension**, tiện ích này sẽ giúp cho chúng ta chạy các lệnh và các tiện ích mở rộng khác trực tiếp trong WSL, để ta có thể chỉnh sửa các tệp nằm trong WSL hoặc hệ thống tệp Windows được gán (ví dụ `/mnt/c`) mà không phải lo lắng về các vấn đề đường dẫn, khả năng tương thích nhị phân hoặc các hệ điều hành chéo khác.

![](https://code.visualstudio.com/assets/docs/remote/wsl/architecture-wsl.png)

### Mở một thư mục từ xa hoặc không gian làm việc
#### Từ WSL Terminal 
![](https://images.viblo.asia/1b8418a4-dc1b-4bdb-8c0b-782301cf9893.gif)

Tương tự như sử dụng Linux
- Mở WSL lên và trỏ đến đường dẫn thư mục project muốn mở trên VSCode. 
- Gõ `code .` và chờ VSCode tìm và nạp toàn bộ file trong project và các mã cần thiết để chạy trong WSL. 

Sau một lát thì VSCode mở ra và chúng ta có thể thấy một chỉ mục nằm ở phía cuối góc trái

![](https://images.viblo.asia/0d136af7-384b-474c-9df5-ad5b7e0355bd.png)

#### Từ VS Code
Ấn F1 rồi chọn Remote-WSL: New windows

![](https://images.viblo.asia/b54be653-5d6b-4fd0-8ce7-4a89d2b55e5d.png)

#### Từ CMD Command Line
Có thể mở VSCode với WSL bằng lệnh `--remote` với cú pháp

```powershell
code --remote wsl+<distro name> <path in WSL>
```
Ví dụ: 
```powershell
code --remote wsl+Ubuntu /home/minhtuan/owasp_guide
```
### Làm việc với Git
Ta cũng có thể làm viêc với Git một cách bình thường giống như trên Linux vậy.

### Quản lý tiện ích mở rộng
Bên cạnh đó VSCode cũng tích hợp việc cài extension ở local riêng và ở WSL riêng, rất tiện lợi. 

![](https://images.viblo.asia/876ac5ed-4a83-46e7-bcf5-bb189f240503.png)
### Mở Terminal trên WSL
Việc mở một Terminal trên WSL rất đơn giản, khi đang sử dụng VSCode với WSL, thì mọi cửa sổ Terminal được mở sẽ được chạy trên WSL chứ không phải ở local. 

![](https://images.viblo.asia/6508ce2e-5bce-4f0a-954a-c4f52990ec39.gif)

### Debug trên WSL
Việc debug cũng diễn ra như bình thường khi bạn sử dụng trên local vậy. 
### Docker
Đối với những dự án cần sử dụng docker để code cho đồng bộ thì WSL cũng được support với docker. Tuy nhiên docker sẽ được hỗ trợ hoàn toàn vào phiên bản WSL 2 sắp tới khi được tích hợp đầy đủ nhân Linux trên http://kernel.org/.
## Tham khảo
- https://docs.microsoft.com/en-us/windows/wsl/wsl2-about
- https://docs.microsoft.com/en-us/windows/wsl/install-win10
- https://code.visualstudio.com/docs/remote/wsl