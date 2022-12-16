## I. Lời mở đầu
![](https://images.viblo.asia/e8f086fe-03f2-4c28-9132-d411f9ec6db8.png)

**1. Tại sao cần phải backup Database ?**

Database hay cơ sở dữ liệu là những thông tin vô cùng quan trọng nó có thể là chữ viết, con số, kí hiệu, hình ảnh, âm thanh,… Cụ thể hơn trong từng lĩnh vực dữ liệu sử dụng và được khai thác có thể khác nhau. Ví dụ một trang web như Viblo, các dữ liệu Database có thể là dữ liệu về người dùng, bài viết, hoạt động người dùng,... Một trang web bán hàng thì lại khác, sẽ có thêm thông tin khách hàng, thông tin sản phẩm, chi tiết đơn hàng, ... 
Trong một ngày đẹp trời, tự dưng dữ liệu của bạn bị bốc hơi do lỗi server, code lỗi hay thậm chí là xóa nhầm thì đó đúng là một điều tồi tệ. Chính vì vậy Database cần được bảo mật, và backup thường xuyên để ta có thể sao lưu bất kỳ lúc nào.

**2. Bạn có backup Database trên production và đang thực hiện như thế nào ?**

- Có rất nhiều cách backup Database trên production, tuy nhiên việc backup Database cũng sẽ có chi phí và độ phức tạp khác nhau:
    - Backup và bảo mật với Amazon Web Services (AWS): https://aws.amazon.com/vi/backup/pricing/
    - Backup Database với Cloud (Google): https://cloud.google.com/pricing
    - Backup Database dữ liệu dung lượng nhỏ đơn giản trên chính server
    - .....
  
## II. Tự động backup Database hằng ngày đơn giản (Ứng dụng chạy docker)
Nhằm giải quyết việc backup Database cho chính nhu cầu của bản thân, mình đã viết một `Image` khá hữu ích để áp dụng backup nhanh chóng trên production. Nếu bạn mới đang tìm hiểu về docker thì có thể tham khảo series [Cùng nhau học docker](https://viblo.asia/s/2018-cung-nhau-hoc-docker-Wj53Omjb56m)

Đầu tiên để sử dụng bạn phải pull `image` về máy :
``` docker push vanquynguyen/mysql-backup```
```bash
ruacon@ruacon-Lenovo-Z50-70:~$ docker pull vanquynguyen/mysql-backup
Using default tag: latest
latest: Pulling from vanquynguyen/mysql-backup
Digest: sha256:c587b913db06226440bcfe673533af6d21f0c448abf8ae85f24993a6837d0b10
Status: Image is up to date for vanquynguyen/mysql-backup:latest
docker.io/vanquynguyen/mysql-backup:latest
```
Sau khi pull xong image backup sẽ được tải về máy của bạn
```bash
ruacon@ruacon-Lenovo-Z50-70:~$ docker images
REPOSITORY                                 TAG                 IMAGE ID            CREATED             SIZE
vanquynguyen/mysql-backup                  latest              3979ec7bf361       5 days ago          39.8MB

```
- Backup cho ứng dụng sử dụng docker:
Nếu bạn đang chạy ứng dụng của mình bằng docker thì bạn hãy kiểm tra xem container đang chạy Database (Mysql) của hệ thống có hoạt động không nhé.
```bash
ruacon@ruacon-Lenovo-Z50-70:~$ docker ps
CONTAINER ID        IMAGE                              COMMAND                  CREATED             STATUS              PORTS                           NAMES
f520dc5c27c1        framgia/laravel-nginx              "nginx"                  6 hours ago         Up 8 minutes        443/tcp, 0.0.0.0:8000->80/tcp   v_nginx
72a08ac89c73        framgia/laravel-php-fpm            "docker-php-entrypoi…"   6 hours ago         Up 8 minutes        9000/tcp                        v_php-fpm
646b5e1a7ccc        mysql:5.7                          "docker-entrypoint.s…"   6 hours ago         Up 8 minutes        3306/tcp, 33060/tcp             v_mysql
0f77df466355        sunasteriskrnd/php-workspace:7.4   "php-fpm-entrypoint …"   6 hours ago         Up 8 minutes        9000/tcp                        v_workspace
bfaddec57d21        redis                              "docker-entrypoint.s…"   6 hours ago         Up 8 minutes        6379/tcp                        v_redis

```
- Bạn hãy kiểm tra docker network của v_mysql chứa Database của bạn
```bash
ruacon@ruacon-Lenovo-Z50-70:~$ docker inspect v_mysql
...
"Networks": {
	"v_default": {
	    "IPAMConfig": null,
	    "Links": null,
	    "Aliases": [
		"mysql",
		"646b5e1a7ccc"
	    ],
	    "NetworkID": "b46c18c4dfe41ee4ecc90efe4319346498f4aa2c55bd836725fb6f2184e7df58",
	    "EndpointID": "baa09411fb4b292ae4ee486d64559bb5be36adbb468d9585ca3f2dc1617c5b38",
	    "Gateway": "172.18.0.1",
	    "IPAddress": "172.18.0.4",
	    "IPPrefixLen": 16,
	    "IPv6Gateway": "",
	    "GlobalIPv6Address": "",
	    "GlobalIPv6PrefixLen": 0,
	    "MacAddress": "02:42:ac:12:00:04",
	    "DriverOpts": null
	}
}
```
Hãy focus vào phần networks để biết bạn đang sử dụng network nào cho container v_mysql, ở đây thì mình đang dùng network có tên là v_default. Tuy nhiên, bạn cũng có thể tạo thêm một network mới và thêm container v_mysql vào network đó.
Tham khảo [Docker network](https://viblo.asia/p/docker-nhung-kien-thuc-co-ban-phan-3-4dbZNoovlYM#_13-docker-network-la-gi-co-nhung-kieu-docker-network-mac-dinh-nao-6)
- Tiếp theo là bước cuối cùng bạn run image mới tải về thành container và uống trà hưởng thụ thành quả :v  
```bash
docker run --env HOSTNAME={MYSQL_HOST} \
    --env ROOT_DATABASE={MYSQL_DATABASE} \
    --env MYSQL_USERNAME={MYSQL_USERNAME} \
    --env MYSQL_PASSWORD={MYSQL_PASSWORD} \
    --network {NETWORK} \
    --volume {VOLUME} \
    --name {CONTAINER_NAME} \
    -d vanquynguyen/mysql-backup
```
- Bạn hãy kiểm tra lại xem container backup đã hoạt động chưa
```bash
ruacon@ruacon-Lenovo-Z50-70:~$ docker ps
CONTAINER ID        IMAGE                              COMMAND                  CREATED             STATUS              PORTS                           NAMES
abdcb29afa66        vanquynguyen/mysql-backup          "crond -l2 -f"           4 seconds ago       Up 3 seconds                                        v-backup_mysql
f520dc5c27c1        framgia/laravel-nginx              "nginx"                  6 hours ago         Up 34 minutes       443/tcp, 0.0.0.0:8000->80/tcp   v_nginx
72a08ac89c73        framgia/laravel-php-fpm            "docker-php-entrypoi…"   6 hours ago         Up 34 minutes       9000/tcp                        v_php-fpm
646b5e1a7ccc        mysql:5.7                          "docker-entrypoint.s…"   6 hours ago         Up 34 minutes       3306/tcp, 33060/tcp             v_mysql
0f77df466355        sunasteriskrnd/php-workspace:7.4   "php-fpm-entrypoint …"   6 hours ago         Up 34 minutes       9000/tcp                        v_workspace
bfaddec57d21        redis                              "docker-entrypoint.s…"   6 hours ago         Up 34 minutes       6379/tcp                        v_redis

```
- Kiểm tra xem container đã tạo backup database chưa
```bash
ruacon@ruacon-Lenovo-Z50-70:~$ docker exec -it v-backup_mysql sh
/ # ls -la
total 64
drwxr-xr-x    1 root     root          4096 Feb  9 09:54 .
drwxr-xr-x    1 root     root          4096 Feb  9 09:54 ..
-rwxr-xr-x    1 root     root             0 Feb  9 09:54 .dockerenv
drwxr-xr-x    2 root     root          4096 Sep 11  2018 bin
drwxr-xr-x    3 root     root          4096 Feb  9 09:58 data
drwxr-xr-x    5 root     root           340 Feb  9 09:54 dev
drwxr-xr-x    1 root     root          4096 Feb  9 09:54 etc
drwxr-xr-x    2 root     root          4096 Sep 11  2018 home
drwxr-xr-x    1 root     root          4096 Sep 11  2018 lib
drwxr-xr-x    5 root     root          4096 Sep 11  2018 media
drwxr-xr-x    2 root     root          4096 Sep 11  2018 mnt
dr-xr-xr-x  274 root     root             0 Feb  9 09:54 proc
drwx------    1 root     root          4096 Feb  9 09:58 root
drwxr-xr-x    1 root     root          4096 Feb  9 09:54 run
drwxr-xr-x    2 root     root          4096 Sep 11  2018 sbin
drwxr-xr-x    2 root     root          4096 Sep 11  2018 srv
dr-xr-xr-x   13 root     root             0 Feb  9 09:54 sys
drwxrwxrwt    2 root     root          4096 Sep 11  2018 tmp
drwxr-xr-x    1 root     root          4096 Sep 11  2018 usr
drwxr-xr-x    1 root     root          4096 Sep 11  2018 var

```
Mình đang để Database backup sẽ được lưu trong namespace là /data. Bạn có thể đổi namespace trước khi run container với
```bash
ENV BACKUP_DIR=/data
```
Và đây là Database được backup
```bash
/ # cd data
/data # ls -la
total 12
drwxr-xr-x    3 root     root          4096 Feb  9 09:58 .
drwxr-xr-x    1 root     root          4096 Feb  9 09:54 ..
drwxr-xr-x    2 root     root          4096 Feb  9 10:02 2021-02-09-daily
/data # cd 2021-02-09-daily
/data/2021-02-09-daily # ls -la
total 1940
drwxr-xr-x    2 root     root          4096 Feb  9 10:02 .
drwxr-xr-x    3 root     root          4096 Feb  9 09:58 ..
-rw-r--r--    1 root     root        849727 Feb  9 10:00 mysql.sql.gz
-rw-r--r--    1 root     root       1126322 Feb  9 10:00 v-quy.mysql.gz

```
Done! Vậy là Database đã được tự backup hằng ngày. Hiện tại mình đang để là 4h mỗi ngày Database sẽ được tự động tạo backup. Bạn cũng có thể sửa lại thông số này và run lại container
```bash
ENV CRON_EXPRESSION="0 4 * * *"
```

Đầy đủ source code publish tại : 
* Github: https://github.com/vanquynguyen/docker-mysql-backup
* Dockerhub: https://hub.docker.com/r/vanquynguyen/mysql-backup
## III. Tạm kết
Hy vọng `image` nho nhỏ của mình sẽ giúp các bạn giải quyết được bài toán backup Database cho các bạn. Rất mong được sự góp ý và contribution từ tất cả mọi người.
![](https://images.viblo.asia/de712910-d0ef-4e55-aaf8-d7cffca1e892.jpg)