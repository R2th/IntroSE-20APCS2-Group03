# Tổng quan
Docker đã và đang là 1 lựa chọn tốt khi chạy môi trường phát triển với các ưu điểm được nêu rất đầy đủ ở đây: https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0. Vì vậy khi tham gia buổi **TensorFlow World Hanoi Extended** ngày 9-11 vừa rồi, mình đã cài Jupyter Notebook bằng Docker như là 1 cách an toàn(còn cài đặt ở local mình làm sau).
# Các bước làm
1. Kéo image bằng lệnh `docker pull jupyter/all-spark-notebook`. Tuy nhiên với 1 số trường hợp cần tạo tài khoản tại hub.docker.com và ở terminal cần chạy lệnh `docker login -u <DockerHubID> -p <password>`

![](https://images.viblo.asia/dfab6cb1-d069-450b-a6e8-9879f89fcd33.png)

Ở đây thì mình kéo image về rồi nên hiện thông báo như này. Trong trường hợp image bị outdate thì câu lệnh cũng tự động update
2. Sau khi pull xong, bạn hãy chạy command sau
```bash
docker run -it --rm -p 8888:8888 -p 4040:4040 -v ~:/home/jovyan/workspace jupyter/all-spark-notebook
```
Trong trường hợp command không hoạt động thì thay `~:` bằng đường dẫn thư mục home của bạn(ví dụ của mình là `/Users/quanhoang`

Command trên sẽ thực thi các nhiệm vụ:
- Download toàn bộ Docker image của jupyter/all-spark-notebook.
- Kết nối port 8888 (Jupyter notebook port) và 4040 (Spark UI port) vào máy local của bạn
- Kết nối tới các thư mục home trên máy của bạn(nhớ set quyền allow)

Và hiện tới kết quả này là bạn thành công

![](https://images.viblo.asia/fb5778f6-7a88-49b6-a249-f0bf9cc63797.png)

1 chút giải thích tại sao là `jovyan`: Như Jupyter là biến tấu của Jupiter, Jovyan cũng là từ Jovian là ra, nghĩa là phụ thuộc vào Jupiter. Ở đây ám chỉ tới các dependencies của Jupyter

3. Bạn làm theo hướng dẫn ở trên là truy cập 1 trong 2 link ở trên browser. Ở đây mình chọn link thứ 2: `http://127.0.0.1:8888/?token=84d79cc223c5fc530f2519d6f183a93e20c2c7f82f7b564f`

Và đây là cái bạn nhận được: 
![](https://images.viblo.asia/4d4fb685-e2b0-4953-98d7-b529b818e01c.png)

4. Việc của bạn bây giờ chỉ là bấm new và chọn theo ngôn ngữ nào đó thôi. Ở đây mình chọn python3

![](https://images.viblo.asia/969b8d88-5b70-4d10-8b66-2ff1329c298b.png)

6. Và giờ là mình thử thôi. Đầu tiên là cài tensorflow và numpy

![](https://images.viblo.asia/bf4cab63-967d-4eaa-9a06-431e6f3eb516.png)

Và sau đó là thêm vào project

![](https://images.viblo.asia/7c6e670f-9650-4003-8bbc-aa61a7ea2470.png)

Thôi mấy bước còn lại mình lười quá. Các bạn xem nốt ở đây đi: https://github.com/BlazingRockStorm/Gryqhon-object-detection-tensorflow-project/blob/master/main.ipynb

# Tham khảo
https://medium.com/fundbox-engineering/overview-d3759e83969c

https://github.com/bangoc123/learn-machine-learning-in-two-months/blob/master/tf2.0/1.SequentialModel.ipynb
# Lời cuối
Hãy để lại cho blog "[Learn machine learning in 2 months](https://github.com/bangoc123/learn-machine-learning-in-two-months)" 1 sao để GDG cũng như Tensorflow Vietnam có thể xin được nhiều tài trợ hơn để chúng ta có nhiều workshop hơn nữa trong tương lai gần.