## Vấn đề:
Chào mọi người, vừa qua mình có làm một chức năng mà mất một khoảng thời gian không nhỏ mình mới tìm ra được cách, đó là xậy dựng list user ở đúng theo thứ tự sort, nhưng hoàn toàn được sort realtime thời gian thực, tức là ngay tại thời điểm đó nếu các điều kiện sort bị thay đổi, thì cái list của mình cũng phải phản ảnh ngay lập tức (chứ ko đợi refresh page như thông thường) 
## Khó khăn:
- List sort phải hoàn toàn realtime và phải là lazyload.
- Tương phản đến toàn bộ các màn hình quản lí admin.
- Có đến 5 lại sort để tính toán realtime.
- Có loại sort sâu 3 lớp.
Làm thế nào để hệ thống có thể tính toán sort dễ dàng nhất và có thể tương phản đến tất cả admin user (realtime) mà ko mất công tính toán riêng cho mỗi user.
## Giải pháp:
### Các ý tưởng
1. Lúc đầu mình nghỉ sẽ dùng sort của mysql rồi interval refresh làm mới cái list đó (ví dụ 10s chẳng hạn). Thế nhưng nó thật sự là 1 cách rất silly, vận hành sort làm hệ thống phải tính toán rất nhiều, đặc biệt là server mysql, thế mà cứ mỗi 10s lại bắt nó tính toán 1 lần, chưa kể lượng tính toán đó chỉ cho 1 user, mà hệ thống chúng ta có thể có tới hàng chục admin. Loại ngay !!!!
2. Sau đó mình nghĩ, sẽ lưu hết các id user và các key cần tính toán sort vào trong elasticsearch, rồi dùng nó get kết quả ra có vẻ nhanh hơn bên mysql, nhưng nó cũng phát sinh cùng vấn đề như trên, đặc biệt nếu theo hướng interval thì ko thể chấp nhận được, nhưng ko theo hướng đó thì làm thế nào để nó realtime (?)
 - Rồi nếu user thứ 100 đùng một cái nó có order = 2 thì làm thế nào để biết được mà đưa nó vào list sort hiển thị cho người dùng.(vì list hiện tại có thể chỉ mới hiện 20 user đầu tiên).
3. Và rồi mình đã tìm ra giải pháp để áp dụng, mà nó giống mình giải quyết đồng thời 2 vấn đề: đỡ mất công tính toán nhất và realtime tới user.
### Cách được chọn
Đó là sử dụng Sorted sets của redis để lưu cấu trúc sort, và sử dụng event keyspace của redis(https://redis.io/topics/notifications) để tương tác realtime:
**Redis sort set** là một cấu trúc dữ liệu advance của redis, nó chứa score và value, các value ko được trùng nhau, các giá trị khi được lưa vào sẽ được order theo score, việc của chúng ta là phải tạo score thật đúng cho mỗi loại sort.
1. **Dễ nhất là sort 1 tầng:**
    Đối với mình là 2 sort gồm theo thời gian message client mới nhất và thời gian message client cũ nhất(nói cách khác là chờ lâu nhất):
    ````
    Redis::zAdd(config('js.page.arrival').'|thread_sort_time_wait', (float)strtotime($date), $threadId);
    Redis::zAdd(config('js.page.arrival').'|thread_sort_arrival', (float)(-strtotime($date)), $threadId);
    ````
    Như các bạn có thể thấy, mình chuyển date time thông thường thành unix time và đổi nó qua float để đúng với kiểu score, như vậy với mội loại user nhắn tin đến mới ($threadId) mình lập tức lưu vào đây, thì redis sẽ tự động sort lại list theo score, và như vậy ta có một list hoàn toàn đúng thứ tự sort =))
2. **Sort 2 tầng:**
   Đối với mình đó là sort theo user nào chưa được trả lời, nếu 2 người cùng đều chưa được trả lời, thì thằng nào đến trước sẽ nằm ở trên, vậy là chúng ta có 2 tầng sort:
   ````
   $countRespond = Message::where('thread_id', $thread->id)->where('role', Message::RO_SERVER)
                            ->where('ownerable_type', Message::OWNER_ADMIN)->count();
        if ($countRespond == 0) {
            $score = - (float)self::PHP_MAX_INT - (float)strtotime($thread->last_time_client);
        } else {
            $score = - (float)strtotime($thread->last_time_client);
        }
        Redis::zAdd(config('js.page.arrival').'|thread_sort_dont_respond', $score, $thread->id);
   ````
   Trên là cách mình áp dụng, đầu tiên ta sẽ tính toán thì user này đã được trả lời bao giờ chưa ($countRespond = 0 là chưa bao giờ), thằng nào chưa được trả lời thì tuyệt đối phải nằm trên thằng trả lời dù bất kể thời gian thế nào, vậy nên mình cho score của nó cộng thêm  - (float)self::PHP_MAX_INT, vì unix time ko bao giờ vượt quá con số này, nên chắc chắn $score của thằng chưa trả lời lúc nào cũng phải bé hơn đã trả lời rồi (sorted set thì score càng bé càng được lên trên nhé)
  3. **Sort 3 tầng:**
   Đối với mình đó là sort theo status hôi viện, một user có thể là hội viên hay không phải là hội viên, hội viên thì phải luôn nằm ở trên, hội viên sẽ có status từ 0 -> 5, mình phải order hội viên sao cho status nhỏ thì nằm trên status lớn, nếu 2 hội viện cùng status thì sort theo tin nhắn mới nhất. Vậy là ta có điều kiện 3 tầng (haiz)
   ````
   $user = $thread->loadUser();
        if ($user->status == -1) {
            $scoreStatus = (float)((float)self::MAX_SORT_STATUS + (float)$user->status - (float)(strtotime($thread->last_time_client) / self::PHP_MAX_INT));
        } else {
            $scoreStatus = (float)((float)$user->status - (float)(strtotime($thread->last_time_client) / self::PHP_MAX_INT));
        }
        Redis::zAdd(config('js.page.not_respond').'|thread_sort_status_member', $scoreStatus, $thread->id);
   ````
   - Mình xin chia sẻ thêm  1 chút cách trên, vì user status không quá 5 nên mình để MAX_SORT_STATUS = 10, như vậy thằng nào không phải là hội viên thì mình cộng thêm thằng này, đảm bảo mấy thằng hội viên ko thể lớn hơn được (lol)  (sorted set redis thì score càng lớn thì càng ở sau nhóe :v)
   - Tiếp đến là mình cộng thêm (float)$user->status để user nào có status càng lớn thì score càng lớn và nó càng nằm ở sau.
   - Tiếp đến là thời gian đến mới, ở đây mình để là (float)(strtotime($thread->last_time_client) / self::PHP_MAX_INT) , như thế nó sẽ ko thể lớn hơn 1 và như thế nó ko ảnh hưởng tới các cột mốc kia, chỉ khi các cột mốc kia bằng nhau thì thằng này mới ảnh hưởng :v: 
  
Như vậy là xong server, cứ mỗi lần có message đến mới mình chỉ cần tính toán lại score của user đó và add vào chuỗi sorted set của redis :v: 

### Tương tác realtime cho list sort.
Ở đây mình sẽ tận dụng event keyspace của redis để detect nếu có bất cứ yếu tố sort nào thay đổi, mình cũng đồng thời send xuống server qua socket.
Subscribe nó nào:
````
subClient.psubscribe('__keyspace@0__:arrival|*', function (channel, count) {
});
subClient.psubscribe('__keyspace@0__:not_respond|*', function (channel, count) {
});
subClient.psubscribe('__keyspace@0__:history|*', function (channel, count) {
});
````
Publish xuống client thôi:
````
} else if (pattern == '__keyspace@0__:arrival|*' || pattern == '__keyspace@0__:not_respond|*'
                || pattern == '__keyspace@0__:history|*') {
            pubClient.zrange(channel.replace('__keyspace@0__:', ''), 0, -1, function (err, result) {
                var data = {
                    'channel': channel.replace('__keyspace@0__:', ''),
                    'list': result,
                }
                var data = JSON.stringify({'action' : 'pull_list_sort', 'data' : data})
                io.to('server').emit('message', data);
            });
        }
````
Ở client mình viết theo vuejs, vuex, code là thế này:
````
else if (response.action == 'pull_list_sort') {
                var params = response.data.channel.split('|');
                if (params[0] == 'arrival') {
                    var list = _.map(response.data.list, function(value) {
                        return parseInt(value)
                    });
                    commit(PULL_LIST_SORT, {key: params[1], value: list})
                    if (params[1] == state.sortBy && state.stateList == 'sort') {
                        var threadId = state.activeThread.id

                        var listIdsThreadCurrent = _.map(state.threads, function(o) {
                            return o.id;
                        });

                        console.log('listIdsThreadCurrent', listIdsThreadCurrent)

                        var indexThreadNew = _.indexOf(list, threadId)
                        var listIdNeedAdd = []

                        list.some(function(val, index) {
                            if (listIdsThreadCurrent.indexOf(val) == -1) {
                                listIdNeedAdd.push(val)
                            }
                            return index >= (indexThreadNew + 20);
                        })

                        var funcSortUpdateThread = () => {
                            var listSortedThread = _.sortBy(newListThread, [function(o) {
                                return _.indexOf(list, o.id)
                            }]);

                            commit(CHANGE_THREAD, listSortedThread);
                            commit(UPDATE_MESSAGE_THREAD);
                            dispatch('jumpToActiveThread')
                        }

                        var newListThread = state.threads.slice(0)
                        if (!_.isEmpty(listIdNeedAdd)) {
                            console.log('listIdNeedAdd', listIdNeedAdd)
                            axios.get('/admin/api/arrival/load-thread-choose', {params: {
                                threadChoose: listIdNeedAdd
                            }}).then(function(res) {
                                if (res.status == 200) {
                                    _.forEach(res.data.data, function(val) {
                                        val.isRealtimeNew = true
                                        newListThread.push(val)
                                    });
                                    funcSortUpdateThread()
                                }
                            });
                        } else {
                            funcSortUpdateThread()
                        }
                    }
                }
            }
````
Hơi rườm rà một chút nhưng đại ý là nếu list sort có thay đổi từ **server** nó sẽ bắn qua socket về thằng vuex xử lí, dữ liệu gửi tới là list user id đã được sort đúng, mình sẽ sort lại toàn bộ user có mặt theo list id này, nếu thiếu thằng nào (vì có thể thằng user đó chưa được load) thì gửi lại về key user_id bị thiếu để có thể nhận được toàn bộ thông tin về user và hiển thị trong list user ở admi.
## Kết luận:
Cách trên khá ngon, vì tính toán sort chỉ cần làm mỗi khi có thay đổi và chỉ được tính toán 1 lần, mọi thay đổi redis event keyspace nhận diện và gửi tới tất cả user qua socket cho việc update. Hy vọng nó sẽ giúp ích cho các bạn trong tương lại nếu phải gặp usecase hại não này :v. Thank for reading.
- Thêm xí kết quả cho nó lộng lẫy nào :#) 


![](https://images.viblo.asia/da8fe5c6-5d5c-4818-a02e-47001e0eb6e2.png)