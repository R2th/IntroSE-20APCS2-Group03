Có lẽ khi bạn update lên version mới của android studio bạn sẽ gặp lỗi sau **No toolchains found in the NDK toolchains folder for ABI with prefix: mips64el-linux-android**.

![](https://images.viblo.asia/719e6ceb-2bac-4dbd-ba2e-b5b7bd69b9f1.png)



Để fix được lỗi đó bạn vui lòng [Click here](https://developer.android.com/ndk/downloads/older_releases.html) để download NDK này về ( Android NDK, Revision 17c ) .

Tùy os của từng máy mà các bạn down đúng Platform nhé (mình khuyên nên cài bản 17c) 


![](https://images.viblo.asia/1ee5fd60-f43f-4151-a64b-832b4084ec5a.png)


Sau khi giải nén bạn sẽ thấy như sau ![](https://images.viblo.asia/014338e0-72ff-4ab5-8946-0eda1d9c62b5.png).


Tiếp theo bạn vào thư mục toolchains 

![](https://images.viblo.asia/d7a88416-0ea0-4bb4-acd4-98595da6364a.png)

Bạn so sánh các folder trong này với các folder trong thư mục Home/Android/Sdk/ndk-bundle/toolchains 

![](https://images.viblo.asia/c4723386-b250-4c2c-9562-476dfb64e8cf.png)

Nếu thấy thiếu folder nào bạn hãy copy và paste vào, recompile lại project.

Để recompile lại project các bạn vào Build -> Rebuild Project 

Đợi 1 lát cho nó rebuild lại, vậy là bạn đã fix được rồi đấy. 

# KẾT LUẬN 

Cảm ơn các bạn đã theo dõi bài viết của mình. Hy vọng với cách chia sẽ của mình các bạn có thể fix được lỗi này và chạy project ngon lành :D