Hello anh em, sau vài ngày nghiên cứu đọc lại liệu cũng như cài cắm thủ công đủ thể loại, với vô số lỗi fail thì mình cũng cài đặt thành công cụm etcd cluster một cách thủ công. Trước giờ chuyên tạo cụm K8s trên cloud cũng như sử dụng công cụ kubeadm nên giờ setup từng bước bỡ ngỡ quá. Hy vọng bài viết này sẽ giúp anh em cài cắm và hiểu các bước setup một cụm etcd cluster một cách đơn giản nhất.

etcd có thể coi như là bộ não của Kubernetes, nơi lưu trữ toàn bộ dữ liệu dưới dạng key-values. Việc thiết kế k8s cluster trên cơ sở một cụm etcd cluster sẽ đảm bảo tính sẵn sàng (high availability) và nhất quán (consistency) trong hệ thống.

Đầu tiên mình chuẩn bị 3 server với địa chỉ IP lần lượt: node1: 10.3.4.33, node2: 10.3.4.41, node3: 10.3.4.45

Bước 1: Cài đặt etcd trên tất cả các node
- Cài đặt etcd trên tất cả các node
```
			ETCD_NAME=node-1
			ETCD_VER=v3.5.0
			GOOGLE_URL=https://storage.googleapis.com/etcd
			GITHUB_URL=https://github.com/etcd-io/etcd/releases/download
			DOWNLOAD_URL=${GOOGLE_URL}
			rm -f /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz
			rm -rf /tmp/etcd-download-test && mkdir -p /tmp/etcd-download-test
			curl -L ${DOWNLOAD_URL}/${ETCD_VER}/etcd-${ETCD_VER}-linux-amd64.tar.gz -o /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz
			tar xzvf /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz -C /tmp/etcd-download-test --strip-components=1
			rm -f /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz
			/tmp/etcd-download-test/etcd --version
			/tmp/etcd-download-test/etcdctl version
			/tmp/etcd-download-test/etcdutl version
			cp /tmp/etcd-download-test/etcd /usr/local/bin
			cp /tmp/etcd-download-test/etcdctl /usr/local/bin
			cp /tmp/etcd-download-test/etcdutl /usr/local/bin
```
- Test etcd run normaly
```
			etcd --version
			etcdctl version
			etcdutl version
			etcd
```

Bước 2: Sử dụng cfssl để generate cert/key file và cấu hình TLS-IP (trên node-1)
- Cài đặt cfssl
- Requirement:
				Install git, make, go
```
			apt install git
			snap install make
			Guide install go: https://golang.org/doc/install
			Go to: https://github.com/cloudflare/cfssl/
			git clone https://github.com/cloudflare/cfssl.git
			cd cfssl
			make
			Check install: tree bin (in /cfssl)
				Expect result:
					bin
					├── cfssl
					├── cfssl-bundle
					├── cfssl-certinfo
					├── cfssl-newkey
					├── cfssl-scan
					├── cfssljson
					├── mkbundle
					└── multirootca
					0 directories, 8 files
			Copy all file "cfssl/bin" to "/usr/local/bin"
```

- Cầu hình TLS-IP
```
			git clone https://github.com/etcd-io/etcd (etcd official)
			cd /etcd/hack/tls-setup
			Replace all IP in host to three IP của 3 node at req-csr.json. Save
			Export
                    export infra0={IP-0} //ip node1
                    export infra1={IP-1} //ip node2
                    export infra2={IP-2} //ip node3
			cd etcd/hack/tls-setup/
			Run to gen certificate/key
                    make
			Trong thư mục etcd/hack/tls-setup/certs sẽ gen ra cert và key của 3 node cũng như ca.key và ca.crt 
			(lưu ý đổi tên cho phù hợp)
			Copy 4 file ca.crt/ca.key/server.crt/server.key đến đường dẫn /etc/etcd với 3 node tương ứng
```

Bước 3: Cấu hình file etcd.conf và etcd.service (systemd)
- Cấu hình /etcd.conf (all node)
```
			ETCD_NAME=node-1
			ETCD_LISTEN_PEER_URLS="https://10.3.4.33:2380"
			ETCD_LISTEN_CLIENT_URLS="https://10.3.4.33:2379"
			ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster"
			ETCD_INITIAL_CLUSTER="node-1=https://10.3.4.33:2380,node-2=https://10.3.4.41:2380,node-3=https://10.3.4.45:2380"
			ETCD_INITIAL_ADVERTISE_PEER_URLS="https://10.3.4.33:2380"
			ETCD_ADVERTISE_CLIENT_URLS="https://10.3.4.33:2379"
			ETCD_TRUSTED_CA_FILE="/etc/etcd/ca.crt"
			ETCD_CERT_FILE="/etc/etcd/server.crt"
			ETCD_KEY_FILE="/etc/etcd/server.key"
			ETCD_PEER_CLIENT_CERT_AUTH=true
			ETCD_PEER_TRUSTED_CA_FILE="/etc/etcd/ca.crt"
			ETCD_PEER_KEY_FILE="/etc/etcd/server.key"
			ETCD_PEER_CERT_FILE="/etc/etcd/server.crt"
			ETCD_DATA_DIR="/var/lib/etcd"

			ETCD_NAME=node-2
			ETCD_LISTEN_PEER_URLS="https://10.3.4.41:2380"
			ETCD_LISTEN_CLIENT_URLS="https://10.3.4.41:2379"
			ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster"
			ETCD_INITIAL_CLUSTER="node-1=https://10.3.4.33:2380,node-2=https://10.3.4.41:2380,node-3=https://10.3.4.45:2380"
			ETCD_INITIAL_ADVERTISE_PEER_URLS="https://10.3.4.41:2380"
			ETCD_ADVERTISE_CLIENT_URLS="https://10.3.4.41:2379"
			ETCD_TRUSTED_CA_FILE="/etc/etcd/ca.crt"
			ETCD_CERT_FILE="/etc/etcd/server.crt"
			ETCD_KEY_FILE="/etc/etcd/server.key"
			ETCD_PEER_CLIENT_CERT_AUTH=true
			ETCD_PEER_TRUSTED_CA_FILE="/etc/etcd/ca.crt"
			ETCD_PEER_KEY_FILE="/etc/etcd/server.key"
			ETCD_PEER_CERT_FILE="/etc/etcd/server.crt"
			ETCD_DATA_DIR="/var/lib/etcd"

			ETCD_NAME=node-3
			ETCD_LISTEN_PEER_URLS="https://10.3.4.45:2380"
			ETCD_LISTEN_CLIENT_URLS="https://10.3.4.45:2379"
			ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster"
			ETCD_INITIAL_CLUSTER="node-1=https://10.3.4.33:2380,node-2=https://10.3.4.41:2380,node-3=https://10.3.4.45:2380"
			ETCD_INITIAL_ADVERTISE_PEER_URLS="https://10.3.4.45:2380"
			ETCD_ADVERTISE_CLIENT_URLS="https://10.3.4.45:2379"
			ETCD_TRUSTED_CA_FILE="/etc/etcd/ca.crt"
			ETCD_CERT_FILE="/etc/etcd/server.crt"
			ETCD_KEY_FILE="/etc/etcd/server.key"
			ETCD_PEER_CLIENT_CERT_AUTH=true
			ETCD_PEER_TRUSTED_CA_FILE="/etc/etcd/ca.crt"
			ETCD_PEER_KEY_FILE="/etc/etcd/server.key"
			ETCD_PEER_CERT_FILE="/etc/etcd/server.crt"
			ETCD_DATA_DIR="/var/lib/etcd"
```

- Cấu hình etcd.service (systemd) trên 3 node (path: /lib/systemd/system)
```
			[Unit]
			Description=etcd key-value store
			Documentation=https://github.com/etcd-io/etcd
			After=network.target
			 
			[Service]
			Type=notify
			EnvironmentFile=/etc/etcd/etcd.conf
			ExecStart=/usr/local/bin/etcd
			Restart=always
			RestartSec=10s
			LimitNOFILE=40000
			 
			[Install]
			WantedBy=multi-user.target
```

- Reload daemon and start/enable service 
```
			sudo systemctl daemon-reload
			sudo systemctl enable etcd
			sudo systemctl start etcd
```

Bước 4: Kiểm tra kết nối
2 cách để kiểm tra kết nối
- Liệt kê các node có trong cluster
```
			etcdctl \
			--endpoints https://10.3.4.33:2379 \
			--cacert /etc/etcd/ca.crt \
			--cert /etc/etcd/server.crt \
			--key /etc/etcd/server.key \
			member list 
```
- Gửi 1 cặp key-value đến 1 node ở cluster và check ở các node còn lại
```
			etcdctl --endpoints https://10.3.4.33:2379 --cert /etc/etcd/server.crt --cacert /etc/etcd/ca.crt --key /etc/etcd/server.key put foo bar
			etcdctl --endpoints https://10.3.4.41:2379 --cert /etc/etcd/server.crt --cacert /etc/etcd/ca.crt --key /etc/etcd/server.key get foo
```
![](https://images.viblo.asia/e1b02115-3f50-4a3e-a10e-a99454dfa0be.png)

Cảm ơn anh em đã đọc và hẹn gặp trong bài tiếp theo :D