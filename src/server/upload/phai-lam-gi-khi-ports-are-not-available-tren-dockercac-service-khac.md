# Mở đầu
Chào các bạn, sau cái bài [Xử lý vấn đề "Port Already in Use" trên Linux và Windows
](https://viblo.asia/p/xu-ly-van-de-port-already-in-use-tren-linux-va-windows-Qbq5QENz5D8) thì mình lại gặp 1 trường hợp nữa, cái trường hợp này nó xảy ra quá lâu rồi và do mình lười fix nên nó vẫn còn đó, cách đây khoảng 10 ngày thì mình fix được rồi. Chính vì thế mình viết lên đây vừa là chia sẻ, vừa là note lại cho bản thân để sau này lỡ bị lại thì có lệnh xài luôn cho nhanh :joy: 

# Nguyên nhân
Vấn đề này nó cũng giống việc bị sử dụng port bởi service khác rồi, nhưng mà với thông báo khác. Mình ví dụ với Docker vì mình sử dụng Docker mở port khá nhiều

```bash
docker run -it --rm -p 8080:8080 httpd:2.4.49
docker: Error response from daemon: Ports are not available: listen tcp 0.0.0.0:8080: bind: An attempt was made to access a socket in a way forbidden by its access permissions.
ERRO[0000] error waiting for container: context canceled
```
Như các bạn có thể thấy, mình không thể mapping port 8080 từ Container ra bên ngoài máy mình, nó báo lỗi `Ports are not available` `An attempt was made to access a socket in a way forbidden by its access permissions`. Ban đầu thì mình cũng nghĩ nó bị trùng port ở đâu thôi, check thì chẳng có cái service nào đang chạy ở 8080 cả, thế mà vẫn bị chặn :|. 

Trước mình cũng có viết 1 bài debug Gitlab, mình cũng bị cái lỗi phiền phức này không cho mở port 3000, các bạn có thể đọc lại tại phần này [Setup debug Gitlab, tưởng không khó mà cũng không khó lắm - Extend](https://viblo.asia/p/setup-debug-gitlab-tuong-khong-kho-ma-cung-khong-kho-lam-1VgZvQmYKAw#_extend-4). Và mình đã tạm thời fix bằng việc xoá cái port đang bị Excluded đó đi bằng lệnh
```powershell
net stop winnat
netsh interface ipv4 delete excludedportrange protocol=tcp startport=2972 numberofports=100
net start winnat
```
Vấn đề máy mình ở đây bị `excluded port` quá nhiều, không thể fix bằng cái cách đó được, mình có thể show ra đây cho các bạn có thể thấy
```powershell
➜  ~ netsh interface ipv4 show excludedportrange protocol=tcp


Protocol tcp Port Exclusion Ranges


Start Port    End Port
----------    --------
      1061        1160
      1161        1260
      1361        1460
      1461        1560
      1561        1660
      1661        1760
      1761        1860
      1861        1960
      1961        2060
      2061        2160
      2180        2279
      2280        2379
      2380        2479
      2480        2579
      2618        2717
      2718        2817
      2918        3017
      3018        3117
      3118        3217
      3218        3317
      3318        3417
      3418        3517
      3605        3704
      3705        3804
      3805        3904
      3905        4004
      4005        4104
      4105        4204
      4205        4304
      4305        4404
      4584        4683
      4685        4784
      4785        4884
      4885        4984
      5041        5140
      5141        5240
      5241        5340
      5357        5357
      5404        5503
      5504        5603
      5604        5703
      5704        5803
      5804        5903
      5940        6039
      6040        6139
      6140        6239
      6240        6339
      6340        6439
      6440        6539
      6540        6639
      6640        6739
      6740        6839
      6840        6939
      6940        7039
      7040        7139
      7140        7239
      7323        7422
      7423        7522
      7523        7622
      7681        7780
      7847        7946
      7947        8046
      8047        8146
      8147        8246
      8247        8346
      8411        8510
      8519        8618
      8623        8722
      8723        8822
      8823        8922
      9014        9113
      9114        9213
      9214        9313
      9314        9413
      9488        9587
      9588        9687
      9689        9788
      9789        9888
      9889        9988
      9989       10088
     10188       10287
     10288       10387
     10388       10487
     10551       10650
     10656       10755
     10758       10857
     10858       10957
     10958       11057
     11058       11157
     11158       11257
     11258       11357
     11358       11457
     11459       11558
     11560       11659
     11660       11759
     11760       11859
     11863       11962
     11963       12062
     12063       12162
     12163       12262
     12265       12364
     12447       12546
     12547       12646
     12647       12746
     12747       12846
     12847       12946
     13033       13132
     13133       13232
     13233       13332
     13333       13432
     13433       13532
     13533       13632
     13703       13802
     13803       13902
     13903       14002
     14003       14102
     14103       14202
     14203       14302
     14303       14402
     14403       14502
     14503       14602
     14604       14703
     14704       14803
     14804       14903
     27339       27339
     50000       50059     *


* - Administered port exclusions.
```
Bị `Port Exclusion Ranges` từ port 1061 đến tận 14903, quá nhiều mà k biết để làm gì, cực kỳ khó chịu. Sau một hôm than thở với người anh tên Phương giấu tên, anh bảo là do Hyper-V hay sao ấy, anh ấy không bị lỗi giống mình. Vì lúc khởi động máy lên thì nó exclusion ít lắm, khi mở Docker (Docker chạy base WSL2 sử dụng Hyper-V) lên thì exclusion nhiều thế kia, nên mình cũng ngờ ngợ rồi. 

Người anh Phương giấu tên kia có gửi cho mình 1 link github về issue giống mình, bạn đọc có thể đọc tại [https://github.com/microsoft/WSL/issues/5306](https://github.com/microsoft/WSL/issues/5306). Sau khi reseearch một hồi thì mình biết nguyên nhân là do đâu, và vấn đề này được recommend giải quyết từ năm 2019 (thế mà còn lười không research để fix - chán bản thân :<)

![image.png](https://images.viblo.asia/fc5881b0-e1b2-4ac8-b02e-a647b70362de.png)

> [https://github.com/docker/for-win/issues/3171#issuecomment-554587817](https://github.com/docker/for-win/issues/3171#issuecomment-554587817)

Vậy thì nguyên nhân ở đây không phải do Docker, cũng chẳng phải do Hyper-V hay WSL2, nguyên nhân là do Windows update lỗi, dẫn tới nó cập nhật luôn dynamic port range từ 1024 luôn. Dynamic port range được sử dụng để Windows có thể sử dụng những port đó làm gì đấy mà không cho thằng nào khác sử dụng cả. Bằng một cách thần bí nào đấy nó set dynamic port range về 1024. Bạn đọc có thể check dynamic port đang được set ở giá trị nào thông qua câu lệnh
```powershell
➜  ~ netsh int ipv4 show dynamic protocol=tcp

Protocol tcp Dynamic Port Range
---------------------------------
Start Port      : 1024
Number of Ports : 13977
```
Và kết quả trên là cái setting mà khiến mình khốn đốn bao lâu nay

# Kết thúc chuỗi hành trình đầy chông gai
Cảm ơn các bạn đã đọc đến đây, và đây là 1 câu lệnh duy nhất khiến các bạn không còn khổ sở như mình nữa
```powershell
netsh int ipv4 set dynamic tcp start=49152 num=16384
```
Đơn giản là set dynamic ranger port về giá trị ban đầu vốn có của nó, sau đó restart máy là xong, đơn giản vậy thôi.   
Cẩn thận hơn thì có thể check lại
```powershell
➜  ~ netsh int ipv4 show dynamic protocol=tcp

Protocol tcp Dynamic Port Range
---------------------------------
Start Port      : 49152
Number of Ports : 16384
```

Chúc các bạn đỡ khổ sở về vấn đề này nữa, see you :joy:

# Tham khảo
- https://github.com/microsoft/WSL/issues/5306
- https://github.com/docker/for-win/issues/3171
- https://stackoverflow.com/questions/48478869/cannot-bind-to-some-ports-due-to-permission-denied/62061654#62061654