Tiếp nối [**bài viết kỳ trước**](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6), để giúp các bạn có thể theo dõi các bài trong series thực hành với Goong Maps, mình tiếp tục cung cấp tới các bạn những lý thuyết quan trọng cần biết trước khi bước vào “thực chiến”

> **Noted:** Các phần lý thuyết trong phần 2 này sẽ tập trung vào hỗ trợ các bạn xây dựng tấm bản đồ nhiệt trong project.

# STYLE SPECIFICATION (Tiếp)
## Layers (Tiếp)
### Heatmap

![](https://images.viblo.asia/5c81164a-1219-4c86-b78e-b93fe7b333e6.jpg)


> Heatmap là một kiểu layers. Giúp bạn tạo một bản đồ nhiệt bằng cách hiển thị một dải màu biểu thị mật độ của các điểm trong một khu vực.

Dưới đây là các thuộc tính của Heatmap:

| Thuộc tính                                                                                                                                                                                                                                                           | Giải thích                                                                                                                                                                             |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| heatmap-weight<br><br>**Giá trị tùy chọn** - Nhận vào một số nguyên lớn hơn hoặc bằng 0<br>**Giá trị mặc định:** 1<br>***Hỗ trợ sử dụng expression loại***: feature-state và interpolate                                                                                           | Xây dựng thước đo mức độ đóng góp của một điểm riêng lẻ vào bản đồ nhiệt. <br><br>***VD:*** Giá trị 10 sẽ tương đương với việc có 10 điểm có trọng số 1 ở cùng một vị trí.                                         |
| heatmap-intensity<br><br>**Giá trị tùy chọn** - Nhận vào một số nguyên (lớn hơn hoặc bằng 0)<br>**Giá trị mặc định:** 1<br>***Hỗ trợ sử dụng expression loại:*** interpolate                                                                                                       | Tương tự như `heatmap-weight` nhưng kiểm soát cường độ của bản đồ nhiệt dựa trên mức thu phóng.                                                                                                            |
| heatmap-color<br><br>**Giá trị tùy chọn** - Nhận vào một dải mã màu<br>**Giá trị mặc định:** `["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"]`<br>***Hỗ trợ sử dụng expression loại:*** interpolate | Xác định màu của mỗi pixel dựa trên giá trị mật độ trong bản đồ nhiệt. <br><br>**Lưu ý:** Giá trị của thuộc tính này thường sử dụng expression loại interpolate (Mình sẽ giới thiệu ở phần sau của bài viết này) |
| heatmap-radius<br><br>**Giá trị tùy chọn** - Nhận vào một số nguyên (lớn hơn hoặc bằng 1)<br>**Giá trị mặc định**: 30<br>Đơn vị: px<br>***Hỗ trợ sử dụng expression loại***: feature-state, interpolate                                                                            | Bán kính ảnh hưởng của một điểm lên bản đồ nhiệt tính bằng pixel. <br><br>**Tips:** Tăng giá trị heatmap-radius làm cho bản đồ nhiệt mượt mà hơn, nhưng ít chi tiết hơn.                                         |
| heatmap-opacity<br><br>**Giá trị tùy chọn** - Nhận các giá trị trong đoạn [0,1]<br>**Giá trị mặc định:** 1<br>***Hỗ trợ sử dụng expression loại:*** interpolate                                                                                                                    | Thiết lập độ trong suốt của lớp layers bản đồ nhiệt.                                                                                                                                                     |

## Expression
### interpolate

Tạo ra kết quả liên tục, mượt mà bằng cách “nội suy” giữa các cặp giá trị đầu vào và đầu ra `values ("stops")`
* Đầu vào có thể là bất kỳ biểu thức số nào (e.g., `["get", "population"]`). Các giá trị mốc dừng phải là biểu thức numeric tăng dần.
* Đầu ra là `number, array<number>`, hoặc `color.`

**Các loại nội suy:**
* `["linear"]:`  Nội suy tuyến tính
* `["exponential", base]`: Nội suy theo cấp số nhân Trong đó thuộc tính base tốc độ tăng của giá trị. Nếu bạn đặt base = 1, thì output sẽ tăng tăng tuyến tính. 
* `["square-bezier", x1, y1, x2, y2]`: Nội suy bằng cách sử dụng square-bezier với 4 điểm x1,y1,x2,y2 tương ứng.

**Cú pháp**
```
["interpolate",
    interpolation: ["linear"] | ["exponential", base] | ["cubic-bezier", x1, y1, x2, y2],
    input: number,
    stop_input_1: number, stop_output_1: OutputType,
    stop_input_n: number, stop_output_n: OutputType, ...
]: OutputType (number, array<number>, or Color)
```

**Vi dụ:**
```
'interpolate',
['linear'],
['get', 'mag'],
1, 'rgba(33,102,172,0)',
2, 'rgb(103,169,207)',
3, 'rgb(209,229,240)',
4, 'rgb(253,219,199)',
5, 'rgb(239,138,98)',
6, 'rgb(178,24,43)'
```