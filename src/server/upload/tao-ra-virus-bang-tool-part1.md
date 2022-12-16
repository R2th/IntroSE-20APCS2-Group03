# Virus?
Chắc hẳn bạn đã nghe qua khái niệm mã độc virus hoặc tồi tệ hơn chính PC của bạn đã bị dính mã độc virus và không ít lần bạn phải ra ngoài quán để cài lại hệ điều hành vì mấy con virus này.
Tác hại của nó để lại cũng nặng nề:
* Gây khó chịu cho chúng ta là tác hại đầu tiên.
* Gây mất mát dữ liệu quan trọng của máy tính.
* Thậm chí có thể làm tổn thương phần cứng.

## Vậy virus là gì ?

Trong khoa học máy tính, virus máy tính virus tin học (thường được người sử dụng gọi tắt là virus) là những đoạn mã chương trình được thiết kế để thực hiện tối thiểu là 2 việc:

1. Tự xen vào hoạt động hiện hành của máy tính một cách hợp lệ, để thực hiện tự nhân bản và những công việc theo chủ ý của người lập trình. Sau khi kết thúc thực thi mã virus thì điều khiển được trả cho trình đang thực thi mà máy không bị "treo", trừ trường hợp virus cố ý treo máy.
2. Tự sao chép chính nó, tức tự nhân bản, một cách hợp lệ lây nhiễm vào những tập tin (file) hay các vùng xác định (boot, FAT sector) ở các thiết bị lưu trữ như đĩa cứng, đĩa mềm, thiết bị nhớ flash (phổ biến là USB),... thậm chí cả EPROM chính của máy.

Trước đây, virus thường được viết bởi một số người am hiểu về lập trình muốn chứng tỏ khả năng của mình nên thường virus có các hành động như: cho 1 chương trình không hoạt động đúng, xóa dữ liệu, làm hỏng ổ cứng,... hoặc gây ra những trò đùa khó chịu.

Những virus mới được viết trong thời gian gần đây không còn thực hiện các trò đùa hay sự phá hoại đối máy tính của nạn nhân bị lây nhiễm nữa, mà đa phần hướng đến việc lấy cắp các thông tin cá nhân nhạy cảm (các mã số thẻ tín dụng) mở cửa sau cho tin tặc đột nhập chiếm quyền điều khiển hoặc các hành động khác nhằm có lợi cho người phát tán virus.

### Vậy về mặt lý thuyết là như vậy, ở bài viết này tôi sẽ đi sâu vào việc tạo ra 1 con virus bằng công cụ như thế nào nhé ?
* Đầu tiên các bạn cần cài đặt các phần mềm **CFF explorer**, **Odbg110** và các bạn chuẩn bị 1 file exe (32 bit thì càng tốt các bạn nhé - có thể lấy ở window XP)
* Vậy tại sao tôi lại bảo bạn chuẩn bị cho tôi 1 file exe, tôi nghĩ đến giả thuyết tôi sẽ cố chèn mã độc vào file exe này để khi ta thực thi file exe này thì mã độc cũng sẽ được kích hoạt luôn đúng như định nghĩa của virus nhé :3 
* Ta sẽ tìm hiểu về cấu trúc của 1 file exe xem nó gồm có những cái gì nhé
![](https://images.viblo.asia/7f3f175f-ab51-45bc-bc32-2f4e18118159.jpg)
### * Ở đây tôi xin phép được đề cập đến phần chính chúng ta thao tác, còn các phần khác các bạn có thể tự tìm hiểu thông qua từ khóa PE format nhé :>
* Trong phần optional Header -> Standard COFF Fields -> **AddressOfEntryPoint**, đây chính là chìa khóa để chạy chương trình này. Hay hiểu theo cách khác, đối với các bạn từng học lập trình thì để thực thi 1 chương trình nào đó ta sẽ biết nó gọi vào hàm **main()** và thực thi tuần tự các hàm được gọi trong hàm **main()**, thì **AddressOfEntryPoint** chính là lời gọi đến hàm đầu tiên để thực thi trong hàm **main()** vì vậy nếu ta thay đổi giá trị của thành phần này thì sẽ gọi đến hàm khác và làm thay đổi trình tự thực thi hàm.
* Vậy khi 1 chương trình chạy, thì phần content của file exe này sẽ được chia ra thành các **section table** (Bạn có thể quan sát nó chính là phần cuối trong cấu trúc bên trên). Một chương trình khi thực thi sẽ chạy các section table theo thứ tự từ trên xuống dưới (mỗi file exe sẽ có 1 số **section table** nhất định). Trong phần 
**COFF Header** ->  **NumberOfSections** chưa số section table mà file exe này thực thi. Ví dụ giá trị của thành phần này là 3 thì nó chỉ thực thi 3 **section table** vậy nên nếu ta cố gán kèm **section table** vào đây thì file exe này cũng chỉ thực thi 3 **section table**.
* Vì vậy chúng ta cần phải để ý đến những thành phần trên khi thực hiện chèn mã độc vào file exe.
* Chúng ta cùng mở chương trình CFF Explorer lên và quan sát nhé:
![](https://images.viblo.asia/33ce9ec6-326c-49ef-bdb1-8dfda260b7cb.png)
* Bên tay trái của chúng ta là bảng menu, bao gồm các phần của 1 file exe và tôi đang bật phần **Section Header** ( chính là **Section table** ) thì ta quan sát ở đây file **notepad2.exe** bao gồm 4 **section table**: *.text*, *.data*, *.rsrc*, *.code*
 ![](https://images.viblo.asia/850d2d67-fbfa-4fe2-b7df-cbda9ad8ac28.png)
*  Đây chính là phần **AddtressOfEntryPoint** phần tôi đã trình bày cho các bạn ở trên thì **Value** của thành phần này chính là lời gọi đến hàm thực thi đầu tiên ở hàm main() của file exe này.
![](https://images.viblo.asia/1aed0024-0a55-4fa2-8dac-a44ae7176459.png)
* Đây chính là phần **NumberOfSections** tôi đã trình bày với các bạn ở trên, ở đây **Value** của nó chính là số **Section Table** và bằng 4 đúng như 4 **Section Table** ở bên trên.
![](https://images.viblo.asia/33ce9ec6-326c-49ef-bdb1-8dfda260b7cb.png)
* Giờ công việc của chúng ta là thêm 1 section rỗng vào file exe này và thêm code mã độc vào section rỗng này.
* Ở phần này tôi xin phép được kết thúc ở việc hiểu khái niệm và ý tưởng thực hiện, phần sau tôi sẽ bắt đầu trình bày cụ thể các bước thực hiện. Các bạn cùng đón xem nhé ! Cảm ơn các bạn đã đọc !
* link part 2: https://viblo.asia/p/tao-ra-virus-bang-tool-part2-Qbq5QayX5D8