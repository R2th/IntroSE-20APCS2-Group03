Bài toán: Mình cần 1 repository để lưu trữ Docker Images của mỗi lần build.

Tại sao phải cài đặt repository riêng, trong khi mình có thể dùng khá nhiều repos có sẵn như Docker Hub...
-> Docker hub chỉ cho duy nhất 1 private repos, còn lại sẽ mất phí hoặc phải để public. tham khảo ở đây ([Docker Hub])(https://www.docker.com/pricing)

Thử google phát ra luôn trang hướng dẫn chính thống [Guide](https://docs.docker.com/registry/deploying/)
Nếu dùng được luôn thì chắc mình cũng không mấy hôm loay hoay.

Phân tích chút, theo hướng dẫn chạy 1 lệnh là xong

```
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```


Chạy thử, thấy ok luôn, nó tạo sẵn cho mình 1 container, có thể push image lên đây, nhìn có vẻ ổn. 
nhưng lưu ý, nó chỉ là  **Local Registry** chỉ dùng trong local máy chạy **registry** này (Rõ ràng không thấy thông tin của **username**, **password**). -> Không đáp ứng được nhu cầu, vì mình cần build ở 1 máy khác, và chạy ở 1 máy khác nữa.

Không thể lười được nữa, tiếp tục đọc đoạn sau của hướng dẫn.
[](https://docs.docker.com/registry/deploying/#restricting-access)
![](https://images.viblo.asia/fd9b6323-72c6-4273-b16d-72c718031c78.png)
Đây cũng có vẻ đúng như cái mình muốn, 
Có username, password và đặc biệt nó yêu cầu thêm  certificate.
Mình gặp vấn đề ngay ở step 1:
```
docker run \
  --entrypoint htpasswd \
  registry:2 -Bbn testuser testpassword > auth/htpasswd
```
Gặp lỗi, như thế này.
```
docker: Error response from daemon: OCI runtime create failed: container_linux.go:345: starting container process caused &quot;exec: \&quot;htpasswd\&quot;: executable file not found in $PATH&quot;: unknown.
<font color="#CC0000">ERRO</font>[0000] error waiting for container: context canceled
```

Theo mình hiểu thì trong thằng registry:2 phải có lệnh htpasswd. 
không rõ lỗi ở đâu, nhưng vẫn có vượt qua được. 
Mình Google ra được 1 trang tạo [htpasswd online](https://hostingcanada.org/htpasswd-generator/) . 
![](https://images.viblo.asia/a6dc4f16-993b-4713-bbf9-edd134baf322.png)
Chọn mode **Bcrypt** như trên hình trên. Lưu kết qủa vào, thế là xong step 1.

Đến bước 3, hướng dẫn không nói rõ lấy file domain.crt, domain.key thế nào, người mới đến bước này thì chịu. 
Như lúc đầu mình lười bỏ đoạn dùng certs đi, chạy vẫn được. Nhưng đến lúc login từ máy khác thì bị lỗi. 
**X509 errors: X509 errors usually indicate that you are attempting to use a self-signed certificate without configuring the Docker daemon correctly**

Khi đó muốn pass được thì lại phải config ở các máy client run ở chế độ [insecure](https://docs.docker.com/registry/insecure/), nó mất thời gian 

Muốn lười cũng không được, mình quen việc sử dụng Let'Encrypt để lấy certificate. MÌnh hay thao tác trên CentOS nên dùng theo hướng dẫn này.

https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-centos-7
Để lấy certificate cần phải có 1 domain trỏ vào 1 địa chỉ ip. 

Nhưng Let'Encrypt nó tạo ra nhiều file hơn mình mong muốn

![](https://images.viblo.asia/d231d3c5-e939-460d-8bce-9c6604b0fcab.png)
![](https://images.viblo.asia/e0bea7b0-5bc0-4476-9c8e-e49aacaf8ff2.png)


```
privkey.pem -> domain.key 
fullchain.pem -> domain.crt 
```

Mình sẽ viết 1 bài chi tiết về cách tạo certificate từ let'encrypt

Ngoài ra các bạn có thể sử dụng file docker compose của mình để dùng

Trong này mình có sử dụng biến môi trường $REGISTRY_HOME cho gọn

```
export REGISTRY_HOME=/srv/registry
```

```
version: '3.3'
services:
    registry:
        ports:
            - '5000:5000'
        restart: always
        container_name: registry
        volumes:
            - '$REGISTRY_HOME/auth:/auth'
            - '$REGISTRY_HOME/certs:/certs'
            - '$REGISTRY_HOME/registry:/var/lib/registry'
        environment:
            - REGISTRY_AUTH=htpasswd
            - 'REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm'
            - REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd
            - REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt
            - REGISTRY_HTTP_TLS_KEY=/certs/domain.key
        image: 'registry:2'

```

After install, we can login to registry to check
```
docker login SERVER_IP:5000
```

Get the list of category
```
https://SERVER_IP:5000/v2/_catalog
```

Or view list tag of Category
```
https://SERVER_IP:5000/v2/test/tags/list
test is one type of category
```