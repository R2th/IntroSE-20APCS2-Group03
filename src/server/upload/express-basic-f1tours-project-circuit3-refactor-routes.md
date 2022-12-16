Chào các bạn!
Nối tiếp [Circuit2](https://viblo.asia/p/express-basic-f1tours-project-circuit2-xu-ly-patch-va-delete-request-924lJPjmKPM).
Hôm nay, chúng ta tiếp tục đến với chặng 3 của "F1 Tours" nhé!<br>
Trong phần này, mình sẽ điều chỉnh lại các funtions xử lý request để giúp code dễ đọc và tinh gọn hơn.
<br>
# 1. Refactor routes:
## Bằng cách tách các functions xử lý routes:
Việc xử lý bằng cách tách functions cũng khá là đơn giản, chỉ là mình tách các funtions xử lý ở mỗi request và đặt tên cho chúng để có thể dễ đọc code hơn. Cách xử lý này cũng là một trong số nhiều cách mà tùy mỗi người sẽ sử dụng, theo trường hợp nhất định. <br>
Việc làm cho code dễ đọc hơn thay vì comment trong code cũng là một phương pháp viết code hiệu quả. Trong *app.js*, mình chỉ xử lý việc refactor cho các requests, các phần khác không đổi.<br>
Chỉnh sửa *app.js* như sau:
```javascript:app.js
...

const getAllF1Tours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
};

const getAF1Tour = (req, res) => {
  const id = parseInt(req.params.id);

  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  })
};

const createAF1Tour = (req, res) => {
  const newF1Id = tours.length + 1;
  const newF1Tour = Object.assign({id: newF1Id}, req.body);

  tours.push(newF1Tour);

  fs.writeFile(`${__dirname}/data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newF1Tour
      }
    })
  });
};

const updateAF1Tour = (req, res) => {
  const id = parseInt(req.params.id);

  const updatingTour = tours.find(el => el.id === id);
  if (!updatingTour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  Object.assign(updatingTour, req.body);

  tours.map(r => (updatingTour.id == r.id) || r);

  fs.writeFile(`${__dirname}/data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: updatingTour
      }
    })
  });
};

const deleteAF1Tour = (req, res) => {
  const id = parseInt(req.params.id);

  const deleteTour = tours.find(el => el.id === id);
  if (!deleteTour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  remainTours = tours.filter(function(obj, index, arr){ return obj.id !== id;})

  fs.writeFile(`${__dirname}/data/f1tours.json`, JSON.stringify(remainTours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: null
      }
    })
  });
};

app.get('/api/f1/tours', getAllF1Tours);
app.get('/api/f1/tours/:id', getAF1Tour);
app.post('/api/f1/tours', createAF1Tour);
app.patch('/api/f1/tours/:id', updateAF1Tour);
app.delete('/api/f1/tours/:id', deleteAF1Tour);

...

```
Sau khi refactor xong, mình đọc lại cảm giác code dễ hiểu và đỡ rối hơn tí chút. :>

## Bằng cách sử dụng route:
Bằng cách gom nhóm theo route, sẽ giúp code dễ hình dung hơn nữa, thay vì tách chúng theo từng route handle theo từng request như trên. Mình sẽ gom route thành 2 nhóm: *'/api/f1/tours'* và *'/api/f1/tours/:id'*.<br>
Lưu ý, mình chỉ thay đổi phần xử lý theo từng request riêng lẻ sang phần gom theo route. Các phần khác không đổi.
Chỉnh sửa *app.js* như sau:
```javascript:app.js
...

app
  .route('/api/f1/tours')
  .get(getAllF1Tours)
  .post(createAF1Tour)

app
  .route('/api/f1/tours/:id')
  .get(getAF1Tour)
  .patch(updateAF1Tour)
  .delete(deleteAF1Tour)

...

```

# 2. Phần kế tiếp:
Circuit3 đến đây xin kết thúc. Phần kế tiếp mình sẽ giới thiệu và cách sử dụng middlewave trong Express. Các bạn cùng đón đọc nhé.
<br>
*Cảm ơn các bạn đã đọc bài viết của mình.*<br>
*Bài viết không thể tránh khỏi những thiếu xót, mong nhận được sự góp ý của các bạn để bài viết được hoàn thiện hơn.*<br>
***Nguồn tham khảo:*** <br>
*- Expressjs.com*<br>
*- Udemy.com*<br>
*- Và một số nguồn khác* <br>