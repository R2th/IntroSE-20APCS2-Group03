![](https://images.viblo.asia/05eb5512-98fc-4b88-bc36-34421282f99a.png)

[**OpenSea**](https://opensea.io/) là một nền tảng cho phép bất kỳ ai cũng thể trao đổi, mua bán các loại token **NFT**(Non-fungible token) như ERC-721 hoặc ERC-1155. Nhưng bài này mình sẽ không đi sâu vào cách thức hoạt động chi tiết của nó (nếu muốn tham khảo chi  tiết mọi người có thể truy cập tại đây https://docs.opensea.io/). Mà mình sẽ đi vào cách để có thể đưa một contract ERC-1155 đã deploy rồi và không tuân theo chuẩn contract của OpenSea lên mạng của họ. Tại sao phải làm điều này đó là vì đối với những smart chưa được deploy và bạn có dự định sẽ đưa nó lên OpenSea thì sẽ có nguyên một tutorial hướng dẫn bạn từ cách tạo contract đến thiết lập metadata [tại đây](https://docs.opensea.io/docs/1-structuring-your-smart-contract). Còn đối với những contract đã deploy trước đó nhưng vẫn muốn đưa lên OpenSea thì buộc bạn phải cung cấp cho OpenSea một API trả về metadata đúng với định dạng mà họ quy định và sau đó liên hệ để họ add API đó vào hệ thống cho bạn. Sau đây mình sẽ hướng dẫn các bạn làm một server cung cấp API như vậy

# Chuẩn bị
Môi trường chúng ta sẽ sử dụng server API bằng nodejs (theo như hướng dẫn của OpenSea có 2 loại mẫu server là python và nodejs - [**here**](https://docs.opensea.io/docs/metadata-standards#section-deploying-your-metadata-api)).

Đầu tiên ta sẽ clone project mẫu về: `git clone https://github.com/ProjectOpenSea/metadata-api-nodejs.git` 

Theo như `README` thì nên để từ node 8.11.* trở lên 

# Phát triển
Sau khi có mẫu server của OpenSea thì công việc bây giờ là cần phải sửa đổi server theo ý của mình để nó có thể trả về các thông tin đúng với định dạng metadata mà OpenSea yêu cầu. Cấu trúc metadata:


```
    {
      "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.", 
      "external_url": "https://openseacreatures.io/3", 
      "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png", 
      "name": "Dave Starbelly",
      "attributes": [ ... ], 
    }
```

Giải thích từng thành phần như sau




| Attribute | Description |
| -------- | -------- |
| image     | Đây là URL đến hình ảnh của mặt hàng. Có thể chỉ là về bất kỳ loại hình ảnh nào (là SVG, PNG, JPG và thậm chí là MP4) và cũng có thể là URL hoặc đường dẫn IPFS. Chúng tôi khuyên bạn nên sử dụng hình ảnh 350 x 350.     | 
| image_data     | Raw SVG image data - nếu bạn muốn tạo hình ảnh một cách nhanh chóng (không khuyến khích). Chỉ sử dụng điều này khi bạn không sử dụng parameter  `image` |
| external_url     | Đây là URL sẽ xuất hiện bên dưới hình ảnh của nội dung trên OpenSea và sẽ cho phép người dùng redirect khỏi OpenSea đến sản phẩm trên trang web của bạn.  |
| description     | Đây là phần mô tả về sản phẩm và phần này có hỗ trợ Markdown |
| name     | Là tên của mặt hàng |
| attributes     | Là các thuộc tính sẽ hiện thị ở phần `Attributes`  |
| background_color     | Màu nền của mặt hàng và tham số truyền vào cần là dạng mã màu có `#` ở đầu  |
| animation_url     | Một URL link đến tệp đính kèm đa phương tiện của mặt hàng. Các loại định dạng như GLTF, GLB, WEBM, MP4, M4V, OGV và OGG, ngoài ra cũng hỗ trợ cả các loại dành cho âm thanh như MP3, WAV và OGA. |
| youtube_url     | Link video youtube |

&nbsp;

Phần `Attributes` sẽ là phần các thuộc  tính mà ta tùy chỉnh và nó sẽ được hiển thị kiểu như này khi lên giao diện

![](https://images.viblo.asia/d856859d-776c-41da-8f52-ddc274392a79.png)

Để biểu diễn như trên thì trong mảng attributes của ta cần thiết lập các kiểu type để các giá trị sẽ được đưa vào đúng chỗ như ví dụ dưới đây:

```json
    ...
    {
    "attributes": [
        {
          "trait_type": "Base", 
          "value": "Starfish"
        }, 
        {
          "trait_type": "Eyes", 
          "value": "Big"
        }, 
        {
          "trait_type": "Mouth", 
          "value": "Surprised"
        }, 
        {
          "trait_type": "Level", 
          "value": 5
        }, 
        {
          "trait_type": "Stamina", 
          "value": 1.4
        }, 
        {
          "trait_type": "Personality", 
          "value": "Sad"
        }, 
        {
          "display_type": "boost_number", 
          "trait_type": "Aqua Power", 
          "value": 40
        }, 
        {
          "display_type": "boost_percentage", 
          "trait_type": "Stamina Increase", 
          "value": 10
        }, 
        {
          "display_type": "number", 
          "trait_type": "Generation", 
          "value": 2
        }
      ]
    }
```

Rồi sau khi đã hiểu về cách format metadata trả về phải tuân thủ như trên thì bây giờ chúng ta sẽ đến bước dựng server. Hãy cùng quay lại với project mà chúng ta đã clone về ở trên, nó thì đã được config gần như đầy đủ còn có cả kết hợp config `Keroku` cho những ai không có server riêng mà muốn deploy miễn phí. 

![](https://images.viblo.asia/cb0a87b1-a94d-49c0-b0f7-83754058c208.png)

Nhưng để phù hợp với loại mặt hàng cũng như ứng dụng của mình chúng ta sẽ cần thay đổi. Như mặt hàng của mình là bán các NFT điện thoại và các thuộc tính thì mình không lưu trữ ở database, mà mình lưu trên contract chỉ có ảnh là mapping ở server nên mình sẽ cần một hàm để gọi lên contract lấy thông tin và một hàm để lấy ảnh.

Nào giờ đầu tiên xem ta cần những gì và import vào đã. Đầu tiên ta sẽ cần một số thứ để ở biến môi trường nên cần `dotenv`, muốn connect để gọi lên contract ta cần có `web3` và để gọi được contract đó ta cũng cần có `abi` của contract đã được complie. Viết thêm một hàm để mapping ảnh theo  thông số nữa `getIphoneLayout` phần import sẽ như thế này

```js
// index.js
    
    require('dotenv').config();
    const express = require('express');
    const Web3 = require('web3');
    const { getIphoneLayout } = require('./src/getIphoneLayout.js');
    const Devices = require('./src/contracts/Devices.json');
    const PORT = process.env.PORT || 5000;
    const app = express().set('port', PORT);
    app.get('/', function (req, res) {
      res.send('Get ready for OpenSea!');
    });
```

Giờ sẽ đi làm một hàm để từ `token_id` ta có thể get ra được các thông tin của mặt hàng ở trên contract. Do hàm get info của mặt hàng từ contract chỉ là hàm `view`  nên không cần phải ký bằng private key, mà đơn giản chúng ta cần thông qua một node Ethereum để gọi như ở đây mình đang sử dụng node của `Infura`. Và sau khi get được thông tin mình sẽ set chúng vào các trường  tương ứng để nó có thể hiển thị được trên OpenSea.

```js
    app.get('/:token_id', async function (req, res) {
      const tokenId = parseInt(req.params.token_id).toString();
      
      web3 = new Web3(
        new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)
      ); // Do contract đang ở trên mainnet nên mình gọi tạo thẳng một web3 connect đến node trên mainnet
      
      // Sau khi đã có web3 ta sẽ tạo một Instance với ABI và địa chỉ contract đã được deploy
      const devicesInstance = new web3.eth.Contract(Devices.abi, process.env.ADDRESS_DEVICE_CONTRACT);
      
      
      try {
      // Gọi lên contract để lấy thông tin về 
        let deviceInfo = await devicesInstance.methods.getSpecsById(tokenId).call();
        
        // Set dữ liệu vào các trường của metadata
        const data = {
          name: deviceInfo.model + ' - ' + deviceInfo.color,
          attributes: [
            {
              trait_type: 'id',
              value: tokenId
            },
            {
              trait_type: 'model',
              value: deviceInfo.model
            },
            {
              trait_type: 'color',
              value: deviceInfo.color
            },
            {
              trait_type: 'price',
              value: deviceInfo.price / 10e18
            },
            {
              trait_type: 'unit',
              value: 'IPHONE'
            },
            {
              trait_type: 'others',
              value: deviceInfo.others
            }
          ],
          // Thiết lập để link gọi image theo kiểu model và color thay vì mapping 1:1
          // Domain sẽ để ở biến môi trường và ta sẽ sửa khi deploy lên hệ thống thật
          image: `${process.env.DOMAIN}/image/${deviceInfo.model}/${deviceInfo.color}`
        };
        return res.send(data);
      } catch (error) {
        return res.send('Not Found');
      }
    });
```

Hàm này sẽ trả về dữ liệu dạng như sau 
```json
// API : http://localhost:5000/1 
    {
       "name":"4 - Black",
       "attributes":[
          {
             "trait_type":"id",
             "value":"1"
          },
          {
             "trait_type":"model",
             "value":"4"
          },
          {
             "trait_type":"color",
             "value":"Black"
          },
          {
             "trait_type":"price",
             "value":100
          },
          {
             "trait_type":"unit",
             "value":"IPHONE"
          },
          {
             "trait_type":"others",
             "value":"0x"
          }
       ],
       "image":"http://localhost:5000/image/4/Black"
    }
```

Tiếp đến ta sẽ viết một api nữa để khi OpenSea gọi vào `http://localhost:5000/image/4/Black` sẽ trả về ảnh của sản phẩm

```js
    app.get('/image/:model/:color', function (req, res) {
      const model = req.params.model;
      const color = req.params.color;
      try {
        const phone = getIphoneLayout(model, color);
        res.sendFile(__dirname + '/' + phone.img);
      } catch (error) {
        res.status(404);
        return res.send('Not Found');
      }
    });
```

Hàm `getIphoneLayout` đã được quy đinh để truyền vào thông số `model` và `color` sẽ đưa ra ảnh của mẫu đó

```js
// getIphoneLayout.js

    const iphoneInfo = {
      '3': {
        Black: {
          style: 'iphone3',
          img: iPhone3Img,
          layout: iPhone3,
          codeColor: '#1F2020'
        }
      },
      '3S': {
        Black: {
          style: 'iphone3',
          img: iPhone3SImg,
          layout: iPhone3S,
          codeColor: '#1F2020'
        }
      },
      '4': {
        Black: {
          style: 'iphone4',
          img: iPhone4BlackImg,
          layout: iPhone4Black,
          codeColor: '#1F2020'
        },
        ...
        
    const getIphoneLayout = (_model, _color) => {
      return iphoneInfo[_model][_color];
    };

    module.exports = { getIphoneLayout };
    
```

Kết quả của api: `http://localhost:5000/image/4/Black` sẽ là

![](https://images.viblo.asia/c6d5d34f-f1c6-429f-9b20-4ffe23891e53.png)

Cấu trúc tổng kết của server sẽ như sau

```js
    require('dotenv').config();
    const express = require('express');
    const Web3 = require('web3');
    const { getIphoneLayout } = require('./src/getIphoneLayout.js');
    const Devices = require('./src/contracts/Devices.json');
    const PORT = process.env.PORT || 5000;
    const app = express().set('port', PORT);
    app.get('/', function (res) {
      res.send('Get ready for OpenSea!');
    });

    app.get('/:token_id', async function (req, res) {
      const tokenId = parseInt(req.params.token_id).toString();
      web3 = new Web3(
        new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)
      );
      const devicesInstance = new web3.eth.Contract(Devices.abi, process.env.ADDRESS_DEVICE_CONTRACT);
      try {
        let deviceInfo = await devicesInstance.methods.getSpecsById(tokenId).call();
        const data = {
          name: deviceInfo.model + ' - ' + deviceInfo.color,
          attributes: [
            {
              trait_type: 'id',
              value: tokenId
            },
            {
              trait_type: 'model',
              value: deviceInfo.model
            },
            {
              trait_type: 'color',
              value: deviceInfo.color
            },
            {
              trait_type: 'price',
              value: deviceInfo.price / 10e18
            },
            {
              trait_type: 'unit',
              value: 'IPHONE'
            },
            {
              trait_type: 'others',
              value: deviceInfo.others
            }
          ],
          image: `${process.env.DOMAIN}/image/${deviceInfo.model}/${deviceInfo.color}`
        };
        return res.send(data);
      } catch (error) {
        return res.send('Not Found');
      }
    });

    app.get('/image/:model/:color', function (req, res) {
      const model = req.params.model;
      const color = req.params.color;
      try {
        const phone = getIphoneLayout(model, color);
        res.sendFile(__dirname + '/' + phone.img);
      } catch (error) {
        res.status(404);
        return res.send('Not Found');
      }
    });

    app.listen(app.get('port'), function () {
      console.log('Node app is running on port', app.get('port'));
    });
```

```js
// .env

    DOMAIN = <https://domnain.com>
    ADDRESS_DEVICE_CONTRACT = <0x.....>
    INFURA_ID = <23123123...>
```

![](https://images.viblo.asia/9d389988-2513-4488-b2fc-8f5b63c95834.png)

# Deploy lên server và configure Nginx
Nếu bạn nào không có server thì có thể sử dụng server `Heroku` hướng dẫn rất chi tiết  [tại đây](https://devcenter.heroku.com/articles/git).  

Còn đối với trường hợp có server riêng ta sẽ có 2 cách để đưa code lên server đó là một ssh rồi coppy trực tiếp và cách thứ hai đó là ta sẽ đẩy nó lên git rồi sau đó vào server pull code về như bình thường. Khi code đã ở trên server ta sẽ tải các thư viện cần thiết và như ở đây mình sử dụng thêm một thằng chuyên quản lý việc chạy của một ứng dụng đó là thằng [**PM2**](https://pm2.keymetrics.io/). Nó sẽ giúp cho server của chúng ta chạy 24/7 và tự động chạy lại khai server bị chết nó kiểu kiểu như `nodemon` vậy nhưng hịn hơn :D :D :D. 

cài đặt thêm **pm2** : 

```shell
    $ npm install pm2@latest -g
    # or
    $ yarn global add pm2
```

sau đó chạy nó với file `index.js` của chúng ta cùng với tên của nó để phân biệt với các ứng dụng khác

![](https://images.viblo.asia/e3b8d517-4c7f-4bf5-aeda-5197c13841f8.png)

Sau khi đã chạy ứng dụng giờ chúng ta sẽ đến config Nginx. À trước tiên thì cần sửa lại file `.env` thành domain của mình trước đã nhá. Config Nginx đầu tiên vào thư mục `/etc/nginx/sites-available` và tạo một config ở đó

```js
    // asset-api

        upstream asset-api {
            server 127.0.0.1:5000;
    }


    server {
            listen 80;
            server_name asset.phone.com;

            location / {
                    proxy_set_header   Host            $http_host;
                    proxy_set_header   Upgrade         $http_upgrade;
                    proxy_set_header   Connection      "upgrade";
                    proxy_set_header   X-Real-IP       $remote_addr;
                    proxy_set_header   X-NginX-Proxy   true;
                    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_http_version 1.1;
                    proxy_redirect     off;
                    proxy_pass         http://asset-api/;
            }

    }
```

Sau khi đã có file tại `/etc/nginx/sites-available` ta sang thư mục `/etc/nginx/sites-enabled` và tạo một symbolic link từ bên thư mục `sites-available` sang 

```shell
    ln -s ../sites-available/asset-api .
```

Bây giờ thì restart lại Nginx để xem kết quả nào


- `<your-api.com>/{token_id}`

![](https://images.viblo.asia/cc19fdab-a551-4994-af83-b7f99d68a387.png)

- `<your-api.com>/image/:model/:color`
![](https://images.viblo.asia/e36dadca-b726-446b-9e18-76d48c255293.png)

Done công việc cuối cùng sẽ là liên hệ với bên support của OpenSea để họ có thể add API của chúng ta vào hệ  thống. Theo như hướng dẫn của họ tại đây https://docs.opensea.io/docs/opensea-integration#section-metadata-api

# Kết luận
Như vậy là chúng ta đã có thể custom server để nó trả metadata đúng chuẩn của OpenSea. Bài viết hơi có khuynh hướng lưu trữ cá nhân, vậy nên nếu có gì chưa tốt mong nhận được sự đóng góp của mọi người :handshake::handshake::handshake: