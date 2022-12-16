Hi mọi người, nếu mọi người còn nhớ thì ở bài https://viblo.asia/p/vue-ra-mat-version-30-hua-hen-mang-lai-cho-khan-gia-nhung-man-trinh-dien-day-dac-sac-LzD5dgDzljY mình đã nói đến việc bundle ở vue3 đã được giảm rất nhiều bundle

Hôm nay chúng mình cùng tạo 1 playground và test thử có như lời Vue team không nhé ^^

## Tạo project
có thể bạn chưa biết thì ở vue3 đã release bản beta, bọn mình có thể chạy project với vue3 rồi ^^

mình sẽ sử dụng vue cli v3 để tạo project, cùng với lệnh

```
vue create test-vue3
```

## Build ở version cũ

mình cd vào thư mục và `yarn build` để lấy kết quả khi chạy bản cũ

kết quả như sau:

![](https://images.viblo.asia/c015e6ec-af24-42b7-b04d-f5144cc4db58.png)


## Upgrade lên v3

Sau khi cài đặt xong, mình theo dõi trên https://github.com/vuejs/vue-cli-plugin-vue-next
Họ hướng dẫn sử dụng `vue add vue-next` để upgrade project lên vue3. Mình sẽ tiếp tục chạy lệnh để lên vue3
Lưu ý: vue-next cần vue-cli version > 4.2.3, bạn có thể upgrade bằng cách `npm i -g @vue/cli@4.2.3`

![](https://images.viblo.asia/afd9a8a2-d74b-4792-9f0a-e9be887a1a14.png)

có vẻ sau khi upgrade thì project đã giảm ~10kb, có vẻ không như quảng cáo của Vue team lắm nhưng `10kb` như Vue team giới thiệu có lẽ là 1 bản minimal hơn

Cảm ơn các bạn