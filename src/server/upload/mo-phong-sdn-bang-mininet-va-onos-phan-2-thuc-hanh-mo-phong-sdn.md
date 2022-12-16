Ở phần trước mình đã hướng dẫn các bạn cài đặt môi trường và công cụ rồi, các bạn có thể xem ở [đây](https://viblo.asia/p/mo-phong-sdn-bang-mininet-va-onos-phan-1-cai-dat-moi-truong-va-cong-cu-XL6lAoMNKek)

Tiếp theo ở phần này mình sẽ hướng dẫn các bạn mô phỏng mạng SDN trên ONOS. Ở phần trước nếu các bạn chạy ONOS bằng lệnh ./start mà bị lỗi thì mình có thể khởi động ONOS bằng lệnh sau, đảm bảo chạy ngon lành, lúc tắt đi chỉ cần Ctrl+C![](https://images.viblo.asia/8cf5ca52-b8b3-48d9-8b45-cce0e4f157dd.png)
# Xây dựng kịch bản mô phỏng
Chúng ta sẽ sử dụng python để viết kịch bản mô phỏng, ở đây thì topo mạng của mình gồm có 3 hosts và 3 switch, tùy vào yêu cầu mô phỏng thì các bạn xây dựng kịch bản tương tự, kịch bản của mình như sau:
``` python
from mininet.topo import Topo

class MyTopo( Topo ):
    "Simple topology example."

    def __init__( self ):
        "Create custom topo."

        Topo.__init__( self )
	# add host
        h1 = self.addHost('h1')
	h2 = self.addHost('h2')
	h3 = self.addHost('h3')

	# add switch
        s1 = self.addSwitch('s1')
	s2 = self.addSwitch('s2')
	s3 = self.addSwitch('s3')

	# add connection
        self.addLink(s1, s2)
        self.addLink(s3, s2)
	self.addLink(s3, s1)
	
	self.addLink(s1, h1)
	self.addLink(s2, h2)
	self.addLink(s3, h3)


	# sudo mn --controller=remote,ip=127.0.0.1,port=6653 --custom code2.py --topo tp

topos = { 'tp': ( lambda: MyTopo() ) }
```
Sau đó chạy câu lệnh như mình comment, thay code2.py bằng tên file của bạn, với local là thư mục chứa file
![](https://images.viblo.asia/a897655b-588d-47e0-879c-110679aa17bc.png)

Khi đó thì màn hình onos sẽ hiển thị như sau:
![](https://images.viblo.asia/8d1c7e8e-8269-4ee6-ae44-b54fc7e9cd3e.png)
Cơ mà lúc này vẫn chưa ping được vì chúng ta chưa cấu hình định tuyến.
# Cấu hình định tuyến tự động
Các bạn vào Menu/Application và bật cho mình 2 cái này lên
![](https://images.viblo.asia/9481b1a6-7c20-4588-89dd-afc425ab6956.png)
Cái này cho phép sử dụng giao thức OpenFlow
![](https://images.viblo.asia/f2054ad9-4ce5-4eb5-a599-88ce9af8d334.png)
Còn cái này cho phép định tuyến tự động. 

Giờ thì ping ngon rồi :D
![](https://images.viblo.asia/c04c9c8a-6af4-4d03-b2a8-1844814cf967.png)

# Cấu hình định tuyến thủ công.
Trước tiên các bạn vào Menu/Application và tắt Reactive Forwading đi rồi bật ARP/NDP proxy (lúc này ping giữa 2 host sẽ không thành công do đã tắt chức năng định tuyến tự động ở phần trên)
Ở đây mình đã tạo file cấu hình có nội dung như sau:
``` txt
{
  "flows": [
    {
      "id": "52917298863470654",
      "tableId": "0",
      "appId": "org.onosproject.net.intent",
      "groupId": 0,
      "priority": 55,
      "timeout": 0,
      "isPermanent": true,
      "deviceId": "of:0000000000000001",        // id của switch
      "state": "ADDED",
      "life": 1689,
      "packets": 0,
      "bytes": 0,
      "liveType": "UNKNOWN",
      "lastSeen": 1557803155885,
      "treatment": {
        "instructions": [
          {
            "type": "OUTPUT",     // cổng ra số 2
            "port": "2"
          }
        ],
        "deferred": []
      },
      "selector": {
        "criteria": [
          {
            "type": "IN_PORT",    // cổng vào số 3
            "port": 3
          },
          {
            "type": "ETH_DST",              
            "mac": "8E:BB:58:81:5D:4D"            // mac của host đích đến
          },
          {
            "type": "ETH_SRC",
            "mac": "62:D6:0A:99:C5:DB"          // mac của host gửi, mấy cái sau tương tự
          }
        ]
      }
    },
{
      "id": "52917298863470654",
      "tableId": "0",
      "appId": "org.onosproject.net.intent",
      "groupId": 0,
      "priority": 55,
      "timeout": 0,
      "isPermanent": true,
      "deviceId": "of:0000000000000001",
      "state": "ADDED",
      "life": 1689,
      "packets": 0,
      "bytes": 0,
      "liveType": "UNKNOWN",
      "lastSeen": 1557803155885,
      "treatment": {
        "instructions": [
          {
            "type": "OUTPUT",
            "port": "3"
          }
        ],
        "deferred": []
      },
      "selector": {
        "criteria": [
          {
            "type": "IN_PORT",
            "port": 2
          },
          {
            "type": "ETH_DST",
            "mac": "62:D6:0A:99:C5:DB"
          },
          {
            "type": "ETH_SRC",
            "mac": "8E:BB:58:81:5D:4D"
          }
        ]
      }
    },
{
      "id": "52917298863470654",
      "tableId": "0",
      "appId": "org.onosproject.net.intent",
      "groupId": 0,
      "priority": 55,
      "timeout": 0,
      "isPermanent": true,
      "deviceId": "of:0000000000000003",
      "life": 1689,
      "packets": 0,
      "bytes": 0,
      "liveType": "UNKNOWN",

      "treatment": {
        "instructions": [
          {
            "type": "OUTPUT",
            "port": "1"
          }
        ],
        "deferred": []
      },
      "selector": {
        "criteria": [
          {
            "type": "IN_PORT",
            "port": 2
          },
          {
            "type": "ETH_DST",
            "mac": "8E:BB:58:81:5D:4D"
          },
          {
            "type": "ETH_SRC",
            "mac": "62:D6:0A:99:C5:DB"
          }
        ]
      }
    },
{
      "id": "52917298863470654",
      "tableId": "0",
      "appId": "org.onosproject.net.intent",
      "groupId": 0,
      "priority": 55,
      "timeout": 0,
      "isPermanent": true,
      "deviceId": "of:0000000000000003",
      "state": "ADDED",
      "life": 1689,
      "packets": 0,
      "bytes": 0,
      "liveType": "UNKNOWN",
      "lastSeen": 1557803155885,
      "treatment": {
        "instructions": [
          {
            "type": "OUTPUT",
            "port": "2"
          }
        ],
        "deferred": []
      },
      "selector": {
        "criteria": [
          {
            "type": "IN_PORT",
            "port": 1
          },
          {
            "type": "ETH_DST",
            "mac": "62:D6:0A:99:C5:DB"
          },
          {
            "type": "ETH_SRC",
            "mac": "8E:BB:58:81:5D:4D"
          }
        ]
      }
    },
{
      "id": "52917298863470654",
      "tableId": "0",
      "appId": "org.onosproject.net.intent",
      "groupId": 0,
      "priority": 55,
      "timeout": 0,
      "isPermanent": true,
      "deviceId": "of:0000000000000002",
      "state": "ADDED",
      "life": 1689,
      "packets": 0,
      "bytes": 0,
      "liveType": "UNKNOWN",
      "lastSeen": 1557803155885,
      "treatment": {
        "instructions": [
          {
            "type": "OUTPUT",
            "port": "3"
          }
        ],
        "deferred": []
      },
      "selector": {
        "criteria": [
          {
            "type": "IN_PORT",
            "port": 2
          },
          {
            "type": "ETH_DST",
            "mac": "8E:BB:58:81:5D:4D"
          },
          {
            "type": "ETH_SRC",
            "mac": "62:D6:0A:99:C5:DB"
          }
        ]
      }
    },
{
      "id": "52917298863470654",
      "tableId": "0",
      "appId": "org.onosproject.net.intent",
      "groupId": 0,
      "priority": 55,
      "timeout": 0,
      "isPermanent": true,
      "deviceId": "of:0000000000000002",
      "state": "ADDED",
      "life": 1689,
      "packets": 0,
      "bytes": 0,
      "liveType": "UNKNOWN",
      "lastSeen": 1557803155885,
      "treatment": {
        "instructions": [
          {
            "type": "OUTPUT",
            "port": "2"
          }
        ],
        "deferred": []
      },
      "selector": {
        "criteria": [
          {
            "type": "IN_PORT",
            "port": 3
          },
          {
            "type": "ETH_DST",
            "mac": "62:D6:0A:99:C5:DB"
          },
          {
            "type": "ETH_SRC",
            "mac": "8E:BB:58:81:5D:4D"
          }
        ]
      }
    }
  ]
}
```
Sau đó các bạn vào đường dẫn sau và dán code đó vào rồi nhấn Try it out!
```http://localhost:8181/onos/v1/docs/#!/flows/post_flows```
![](https://images.viblo.asia/fd13f712-e1f7-4496-a949-93510690fa8c.png)
Giờ thì ping lại ổn :D Lưu ý là gói tin đi qua mạng SDN thì TTL không bị giảm nhé
![](https://images.viblo.asia/61f90556-e348-4f6b-ac3f-573a6bb74ead.png)

Qua 2 bài viết này thì mình đã hướng dẫn các bạn cài đặt môi trường và mô phỏng mạng SDN qua mininet, onos. Đối với mô phỏng SDN-IP thì phức tạp hơn, các bạn có thể xem hướng dẫn ở [đây](https://wiki.onosproject.org/display/ONOS/SDN-IP+Tutorial)

Tài liệu tham khảo:
* [https://wiki.onosproject.org/......](https://wiki.onosproject.org/display/ONOS/SDN-IP+Tutorial)
* [https://wiki.onosproject.org/displa......](https://wiki.onosproject.org/display/ONOS/Basic+ONOS+Tutorial)