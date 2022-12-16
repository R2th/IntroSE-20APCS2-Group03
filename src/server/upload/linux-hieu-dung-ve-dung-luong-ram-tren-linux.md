Chào các bạn, lại là mình đây! Hôm nay mình chia sẻ các bạn về RAM (Memory) trong Linux. Cách kiếm tra dung lương bộ nhớ (RAM) sử dụng trong hệ điều hành Linux. Trong bài chia sẻ này mình sử dụng Ubuntu 20.04 LTS.
# 1.Tổng quan
**RAM** được viết tắt từ **Random Access Memory** - một trong những yếu tố hết sức quan trọng bên cạnh vi xử lý. RAM là bộ nhớ tạm của máy giúp lưu trữ thông tin hiện hành để CPU có thể truy xuất và xử lý.

**RAM** không thể lưu trữ được dữ liệu khi mất nguồn điện cung cấp. Nếu như thiết bị bị mất nguồn, tắt máy thì dữ liệu trên **RAM** sẽ bị xóa.

Khi một ứng dụng trên server khởi chạy dữ liệu của ứng dụng sẽ được truyền từ ổ cứng và lưu trữ tại RAM, lúc này CPU sẽ truy xuất và lấy dữ liệu từ RAM để hiển thị vào đáp ứng lại thao tác của người dùng.

![](https://images.viblo.asia/7971ee1d-0e46-4dbe-81eb-8502b878d294.jpeg)

OK như vậy chúng ta hiểu rõ về RAM rồi. Sau đây mình sẽ đi tìm hiểu cách kiếm tra dung lượng RAM thực tế cũng như dung lượng RAM đã sử dụng trên server Linux.
# 2.Chuẩn bị
Vẫn như mọi khi mình làm  trên Server **Ubuntu 20.04LTS**. 
> OS: Ubuntu 20.04 LTS
> 
> Cấu hình: 2 CPU / 2 GB RAM / 20 GB Disk
> 
> IP: 123.123.123.123 (IP Public – eth0)

## 2.1 Kiểm tra dung lượng bộ nhớ
### 2.1.1 Kiểm tra dung lượng bộ nhớ đơn giản
Cách đơn giản nhất để kiếm tra dung lượng bộ nhớ của Server là các bạn sử dụng câu lệnh **free**

ở đây mình sẽ thực hiện câu lệnh `free -h`

![](https://images.viblo.asia/352a445d-7766-487a-8078-534e348e761e.png)

Kết quả cho thấy, Server của mình có thông số bộ nhớ RAM như sau:

- Tổng dung lượng bộ nhớ bằng 1,9 GB (**total**)
- Đã sử dụng 568MB (**used**)
- Dung lượng rảnh rỗi bằng 458MB (**free**)
- Dung lượng bộ nhớ sử dụng cho việc lưu đệm bằng 966 MB (**buff/cache**)

Lưu ý:

- Số RAM trống tuy chỉ bằng 458 MB (**free**) nhưng thực tế bạn có thể sử dụng nhiều hơn thế. Tổng số bộ nhớ có thể sử dụng sẽ bằng **free + buff/cache**. Vậy ở đây, số RAM thực sự có thể sử dụng được sẽ bằng 1.424GB.

- Lượng bộ nhớ RAM được **buff/cache** thường được sử dụng để cải thiện hiệu năng đọc ghi ổ đĩa. Vì bộ RAM sẽ có tốc độ truy vấn, đọc ghi cao hơn rất nhiều so với tốc độ truy vấn, đọc ghi ổ đĩa nên hệ điều hành sử dụng lượng RAM còn trống để cài thiện hiệu năng.

### 2.1.2 Kiểm tra dung lượng bộ nhớ nâng cao
Để kiếm tra các thông số chi tiết về bộ nhớ RAM, chúng ta sẽ kiểm tra file **/proc/meminfo**. Bản thân câu lệnh free cũng sử dụng file meminfo để kiếm tra dung lượng bộ nhớ RAM của Server.

Thống số trong file **/proc/meminfo** khá nhiều nên mình sẽ lấy các tham số quan trọng về bộ nhớ.

```
egrep --color 'Mem|Cache' /proc/meminfo
```
![](https://images.viblo.asia/557da896-bdd5-4d62-a72b-47a6f92c7035.png)

Kết qua cho thấy:
- **MemTotal**: Đây là tổng số bộ nhớ RAM hiện có (Đơn vị kilobyte). Ở đây giá trị bằng 2040848 kB tức bằng 2 GB (chênh lệch chút với kết quả của câu lệnh free 1.9 GB 😜 )
- **MemFree**: Đây là số bộ nhớ RAM trống, giá trị bằng 468264 kB tức bằng 468 MB (chênh lệch chút 😜  458 MB)
- **MemAvailable**: Đây tổng số RAM có thể sử dụng, giá trị bằng 1257144 kB tức gần bằng 1,3 GB. Như mình đã nói tuy số dung lượng bộ nhớ trống bằng 468 MB tuy nhiên bạn có thể sử dụng nhiều hơn.(Chênh lệch chút 1.424GB 😜)
- **Cached**: Đây là dung lượng bố nhớ sử dụng làm bộ lưu đệm. Vì bộ nhớ RAM sẽ có tốc độ truy vấn đọc ghi rất cao nên hệ điều hành sử dụng lượng RAM còn trống để cài thiện hiệu năng, tuy nhiên khi cần sử dụng bộ nhớ RAM hệ điều hành sẽ tự động giải phóng bộ nhớ đệm.

### 2.1.2Một vài câu lệnh tương tự
```
cat /proc/meminfo
less /proc/meminfo
free -m
```
## 2.2 Vì sao dung lượng RAM Server nhận thiếu
![](https://images.viblo.asia/352a445d-7766-487a-8078-534e348e761e.png)

Các bạn sẽ thắc mắc tại sao Server mình 2 GB RAM bộ nhớ nhưng khi kiểm tra thì hệ điều hành chỉ nhận 1.9 GB. Vậy có phải hệ điều hành đã nhận thiếu RAM hoặc nhà cung cấp đã cung cấp thiếu bộ nhớ cho Server

Mình cũng thắc mắc và đây là lí do. Thực ra, hệ điều hành Linux đã nhận đủ dung lượng bộ nhớ RAM là 2 GB tuy nhiên trong quá trình khởi động hệ điều hành một phần RAM đã bị chiếm dụng bởi nhân hệ thống (Kernel Linux).

Mình dùng lệnh:
``` 
dmesg | grep -i memory
```
![image.png](https://images.viblo.asia/e5ec71ec-5d52-4cd8-b5d4-0de09b5f98fc.png)

- Nhìn vào Memory  chúng ta thấy tuy tổng dung lượng là 2 GB (**2093424K**) nhưng lại chỉ sử dụng được 1,9 GB (**1969584K**)
- Chúng ta sẽ lưu ý giá trị 123840K **reserved**, giá thị thể hiện trong quá trình khởi động nhân hệ điều hành đã sử dụng 1.2GB để thực hiện một số module đặc biệt. Nếu cộng giá trị **1969584K** với dung lượng bộ nhớ có thể sử dụng **123840K** chúng ta sẽ được giá trị gần bằng hoặc bằng dung lượng bộ nhớ vật lý của Server.  Tuy nhiên,  dung lượng bộ nhớ sử dụng cho nhân hệ điều hành sẽ được giải phóng một phần, trả lại cho bộ nhớ RAM. Tuy dung lượng bộ nhớ là 1.9 GB nhưng bạn có thể sử dụng nhiều hơn thế.
# 3. Đóng máy
Đến đây mình kết thúc phần tìm hiểu về RAM trên Server Linux. Các bạn có ý kiến nào hay comment ở bên dưới để mọi người cùng biết nhé.!  Chúc các bạn thành công!

**Tham khảo:**
https://serverfault.com/questions/219987/why-doesnt-the-value-in-proc-meminfo-seem-to-map-exactly-to-the-system-ram/219990#219990