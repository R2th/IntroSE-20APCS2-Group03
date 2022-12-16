Hello Xin chào tất cả các bạn!

Trong bài viết trước, mình có giới thiệu  docker là gì, và cách xây dựng 1 docker file đơn gian. Trong bài viết hôm nay minh xn giới thiệu về 15 conmands thường xuyên sử dụng khi làm việc với docker.

## Các commands được đề cập :
* docker -version
* docker pull
* docker run
* docker ps
* docker ps -a
* docker exec
* docker stop
* docker kill
* docker commit
* docker login
* docker push
* docker images
* docker rm
* docker rmi
* docker build

## Docker Comands:

1. **docker -version**

 - Command sử dụng để kiểm tra phiên bản của docker.

  ![](https://images.viblo.asia/0ccc0b62-25d6-4e87-994d-cd0a8a5c5aed.png)

2. **docker pull** 

 - Sử dụng để pull images từ docker repository.

   ![](https://images.viblo.asia/63dd8d33-4cc4-42a6-a1cc-822dd5b971a5.png)

3. **docker run**

 - sử dụng command : docker run -it -d <image name>
 - Command này sử dụng để khởi tạo một container từ một image.
    
   ![](https://images.viblo.asia/f4fee6d0-2960-4844-ad14-3c4ebdce1909.png)

4. **docker ps**
    
 - Command sử dụng để list ra những docker đang chạy.
    
   ![](https://images.viblo.asia/26ff1b09-d1c4-495c-9ea9-a2a1f4cdb365.png)

5. **docker ps -a**
    
 - Command sử dụng để hiện thị ra list các container dang chạy và những container đã tồn tại.
    
   ![](https://images.viblo.asia/05a50142-0b13-422a-a280-ecb49ac0f14f.png)

6. **docker exec**
    
 - Sử dụng: docker exec -it <container id> bash
 - Command này sử dụng để truy cập vào một container.

   ![](https://images.viblo.asia/be5d3af9-cb04-492b-8a82-8d7f9d9cfdd4.png)

7. **docker stop**
    
 - Sử dụng: docker stop <conatiner id>
 - Command này sử dụng để dừng một container đang chạy.
    
   ![](https://images.viblo.asia/48ba238c-ffe9-41ac-941d-fd67f0d7129b.png)

8. **docker kill**
    
 - Sử dụng: docker kill <container id>
 - Command này sẽ dừng 1 container ngay lập tức. Sự khác nhau giữa 'docker kill' và ' docker stop'. Docker stop sẽ cho container thời gian để kết thúc. 
    
   ![](https://images.viblo.asia/6a00813d-bfeb-48c4-ab18-e994c3e0322b.png)

9. **docker commit**
    
 - Sử dụng: docker commit <container id> <username/imagename>
 - Command này sử dụng để tạo một image hoặc có thể chỉnh sửa container trên máy local.
    
   ![](https://images.viblo.asia/8c6c4116-24ab-4375-8781-d8be3f82c56b.png)

10. **docker login**
    
 - Command này sử dụng để login dến docker hub repository.
    
   ![](https://images.viblo.asia/fbc66eb7-9682-4829-a304-4ebbfcf53772.png)

11. **docker push**
    
 - Sử dụng: docker push <username/image name>
 - Command này sử dụng để push một image lên docker hub repository.
   
   ![](https://images.viblo.asia/99fba184-48c1-4633-afb0-7970c27880c8.png)

    
12. **docker image**
    
 - Command này dùng để list ra tất các docker image được lưu dữ ở local.
    
   ![](https://images.viblo.asia/bbda0790-0260-4fc6-9b92-7c046de6a02a.png)

13. **docker rm**
    
 - Sử dụng: docker rm <container id>
 - Command sử dụng để xóa đi một container đã được dừng.
    
   ![](https://images.viblo.asia/91ee8fef-199f-40f5-96f8-9fad7d2e4ce3.png)

 14. **docker rmi**
    
 - Sử dụng: docekr rmi <image id>
 - Command sử dụng để xóa đi image trong local.
    
   ![](https://images.viblo.asia/c2479c55-e5c3-4e41-a7f4-25889312f372.png)

 15. **docker build**
    
 - Sử dụng: docker build <path to docker file>
 - Command này được sử dụng để xây dựng một image từ một tệp docker được chỉ định
    
   ![](https://images.viblo.asia/268893a2-de8f-44ac-b9b7-880352e60301.png)
    
 **Kết Luận**
    
Như vậy mình đã liệt kê ra những commands thường được sử dụng trong docker. Hy vọng các commands này sẽ hứu ích với bạn, nếu có vấn đề gì thì comment ở dưới để cùng trao đổi nhé.