Trong quá trình xây dựng web **[Toidicafe.vn](https://toidicafe.vn/) - Website tổng hợp và đánh giá quán cafe đẹp ở Hà Nội**, mình có 1 task là tính lượt view của mỗi quán cafe để dựa vào đó đề xuất các quán nổi bật, được nhiều người quan tâm.
Đây là cách mình đã làm, mọi người có cách hay hơn thì chia sẻ nhé!

![](https://images.viblo.asia/5132a63e-58a0-405f-89a8-d48280bb5854.png)

# Xây dựng ý tưởng
Luồng xử lý cơ bản sẽ là ở database mỗi quán cafe sẽ có 1 cột view, mỗi khi người dùng truy cập vào trang chi tiết quán, sẽ update database tăng biến view lên 1.
Truy nhiên, cách này sẽ không được tối ưu, mình sẽ phải connect vào database và đọc ghi liên tục, gây tốn tài nguyên server.

Ý tưởng của mình là dùng Redis để ưu lại lượt view của từng quán cafe và tạo 1 job cập nhật lượt view từ redis vào database.
Redis là gì và công dụng của nó thì các bạn có thể tham khảo [ở đây](https://itnavi.com.vn/blog/redis-la-gi)

# Code thôi
Mình sử dụng backend là Nodejs, và đây là code mình đã làm:

Tạo function tăng biến view và gọi mỗi lần truy cập và chi tiết quán cafe đó:
```
async function incViewCountPlace(placeId) {
    const count =  await promisify(cb => client.get(`placeview_${placeId}`, cb));
    client.set(`placeview_${placeId}`, count ? parseInt(count) + 1 : 1);
}
```

Tạo cronjob để cập nhật lượt view từ redis và database:
```
const job = schedule.scheduleJob('0 0 * * * *', async function(){
            const keys = await promisify(cb => client.keys(`placeview_*`, cb));
            await Promise.all(keys.map(async key => {
                const id = key.split('_')[1];
                const place = await Place.findById(id, 'view').lean();
                const views = place.view || 0;
                const newViews = await promisify(cb => client.get(key, cb));
                const total = views + parseInt(newViews);
                await Place.findByIdAndUpdate(id, {view: total});
            }))
            client.del(keys);
            console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')}: Run save place view job!`);
        });
```

# Chia sẻ
Trên đây là cách mình đã làm để tính lượt view cho website, cách này cũng chưa hẳn tối ưu và nó sẽ tốn Ram hơn 1 chút nhưng mình thấy nó ổn hơn là cách thông thường, mình là sinh viên vừa ra trường kinh nghiệm cũng chưa được nhiều có gì các tiền bối và mọi người góp ý và chia sẻ kinh nghiệm nhé!
Tiện thể **[Toidicafe.vn](https://toidicafe.vn/)** là sản phẩm đồ án tốt nghiệm của mình, công dụng của nó là giúp mọi người tìm kiếm được quán cafe dễ dàng hơn theo vị trí, nhu cầu mục đích, các bác vào trải nghiệm để ủng hộ mình nhé.

Cảm ơn đã đọc bài😍