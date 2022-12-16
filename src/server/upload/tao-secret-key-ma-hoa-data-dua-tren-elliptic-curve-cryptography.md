Dữ liệu ngày càng quan trọng hơn bao giờ hết và đảm bảo an toàn thông tin, an toàn dữ liệu là bài toán quan trọng với những ứng dụng hay những nền tảng web yêu cầu bảo mật dữ liệu.

Đơn cử như khi bạn xây dựng các API phục vụ cho các App truy xuất dữ liệu từ server chúng ta vẫn thường dùng các package để mã hoá dữ liệu như JWT chẳng hạn, bạn sử dụng 1 secret key chung cho cả hai phía server và native, server có thể có nhiều cách để gen ra secret key này, nhưng client gần như phải fix cứng đảm bảo là sử dụng cùng 1 key cho việc encrypt/decrypt data. Việc decompile một ứng dụng mobile và view source code có thể sẽ không còn đảm bảo được tính an toàn nữa.

Kỹ thuật mã hóa hiện đại thường dựa trên ý tưởng rằng khóa sử dụng để mã hóa dữ liệu có thể được công khai trong khi khóa dùng cho hoạt động giải mã dữ liệu phải được giữ bí mật. Vì vậy, các hệ thống này được biết đến dưới tên hệ thống mã hóa khóa công khai. Nói chung, một hệ thống mã hóa khóa công khai có hai thành phần, một khóa công khai và một khóa riêng.

**Hôm nay mình sẽ giới thiệu một thuật toán mã hoá như trên để giải quyết vấn đề trao đổi secret key giữa client và server. Đó là ECC hay là Mã hóa đường cong Elliptic - Elliptic Curve Cryptography.**

#### 1. Đôi điều về ECC
> Năm 1985, thuật toán mã hóa khóa công khai mới được đề xuất dựa trên đường cong Elliptic. Một đường cong Elliptic là tập hợp các điểm thỏa mãn một phương trình toán học cụ thể. Các phương trình cho một đường cong Elliptic trông giống như sau: $y^2 = x^3 + ax + b$

Một trong những tính chất quan trọng nhất của đường cong elliptic là đối xứng ngang. Bất cứ điểm nào trên đường cong cũng có thể lấy đối xứng qua trục x và vẫn sẽ thuộc đường cong.

#### 2. Một vài ứng dụng ECC trong thực tế
> ECC hiện đang được sử dụng trong một loạt các ứng dụng: chính phủ Mỹ sử dụng để bảo vệ thông tin liên lạc nội bộ, các dự án Tor sử dụng để giúp đảm bảo ẩn danh, đây cũng là cơ chế được sử dụng để chứng minh quyền sở hữu trong Bitcoins, cung cấp chữ ký số trong dịch vụ iMessage của Apple, để mã hóa thông tin DNS với DNSCurve, và là phương pháp tốt để xác thực cho các trình duyệt web an toàn qua SSL/TLS. Thế hệ đầu tiên của thuật toán mã hóa khóa công khai như RSA và Diffie-Hellman vẫn được duy trì trong hầu hết các lĩnh vực, nhưng ECC đang nhanh chóng trở thành giải pháp thay thế cho RSA.

> Cụ thể hơn nếu truy cập vào phiên bản HTTPS của các trang web phổ biến, như Google.com, Amazon.com, Facebook.com… từ một trình duyệt như Chrome hoặc Firefox, trình duyệt sẽ sử dụng ECC – như là sử dụng ECDHE_ECDSA. ECDHE là viết tắt của Elliptic Curve Diffie Hellman Ephemeral và là một cơ chế trao đổi khóa dựa trên đường cong Elliptic. ECDSA là Elliptic Curve Digital Signature Algorithm là cơ chế tạo chữ ký số để xác thực kết nối với máy chủ.

> Sự cải thiện hiệu suất của ECDSA hơn RSA là rất rõ ràng. Ngay cả với một phiên bản cũ của OpenSSL không có tối ưu cho ECC, tạo một chữ ký ECDSA với khóa 256-bit là nhanh hơn 20 lần so với một chữ ký RSA với khóa 2048-bit.

> Trong kỷ nguyên công nghệ thông tin và truyền thông hiện nay, nhu cầu đảm bảo an toàn thông tin là không thể thiếu. Với việc khóa mã hóa có độ dài ngày tăng dần theo thời gian, ECC đang là ứng viên phù hợp để thay thế RSA trong việc tạo ra các khóa mã ngắn hơn mà vẫn đảm bảo an toàn, từ đó có thể triển khai trên nhiều nền tảng thiết bị từ các mạch điện tử đơn giản đến máy tính lớn, dễ dàng tạo ra hệ thống mạng đáng tin cậy phục vụ tốt hơn cho xã hội.

**Mình sẽ không đi sâu về phương trình toán học của ECC, so sánh ECC vs các thuật toán mã hoá công khai khác như RSA, về độ dài key hay thời gian bẻ khoá. Cũng khá là phức tạp mà =))**

#### Hôm nay mình sẽ giới thiệu phương pháp tạo ra cặp secret key đối xứng ở cả server và native (client) phục vụ mã hoá data.

Nguyên lý là: Server và client đều tạo ra cặp mã hoá công khai (private key và public key), 2 bên sẽ trao đổi cho nhau public key của mình.
- Với Server: Sử dụng **private key SERVER** + **public key CLIENT** để generate secret_key
- Với Client: Sử dựng **private key CLIENT** + **public key SERVER** để generate secret_key
- Hai secret_key được gen ra ở **client** và **server** này là **giống nhau**.

Package mình sẽ sử dụng là https://github.com/phpecc/phpecc trên Laravel Framework.
Cài đặt thông qua composer: `composer require mdanter/ecc`

```
<?php

use Mdanter\Ecc\EccFactory;
use Mdanter\Ecc\Serializer\PrivateKey\PemPrivateKeySerializer;
use Mdanter\Ecc\Serializer\PrivateKey\DerPrivateKeySerializer;

use Mdanter\Ecc\Serializer\PublicKey\PemPublicKeySerializer;
use Mdanter\Ecc\Serializer\PublicKey\DerPublicKeySerializer;
use Mdanter\Ecc\Serializer\Point\UncompressedPointSerializer;

class EccService
{
    /**
     * Gen a key to encrypt/decrypt data
     *
     * @param: String $serverPrivateKey pem
     * @param: String $clientPublicKey pem
     *
     * @return string value
     */
    public static function genKeyEncryption($serverPrivateKey, $clientPublicKey)
    {
        $adapter = EccFactory::getAdapter();

        $derPrivSerializer = new DerPrivateKeySerializer($adapter);
        $privatePemSerializer = new PemPrivateKeySerializer($derPrivSerializer);
        $serverPrivateKeyObj = $privatePemSerializer->parse($serverPrivateKey);

        $derPubSerializer = new DerPublicKeySerializer($adapter);
        $pubPemSerializer = new PemPublicKeySerializer($derPubSerializer);

        $exchange = $serverPrivateKeyObj->createExchange($pubPemSerializer->parse($clientPublicKey));

        return gmp_strval($exchange->calculateSharedKey());
    }
}
```

Ở đây mình sử dụng `secp256k1` trong số các library supports như:
- secp112r1
- secp256k1
- nistp192
- nistp224
- nistp256 / secp256r1
- nistp384 / secp384r1
- nistp521

Tạo key tương ứng trên client, nếu sử dụng react-native bạn có thể thao khảo thêm ở đây: https://github.com/danielking/react-native-rncrypto

Ngoài kỹ thuật tạo cặp secret key giữa client và server, chúng tao có thể sử dụng ECC cho mục đích xác thực theo chữ ký số. Hiểu đơn giản là client tạo ra cặp private và public key, public key này được lưu trữ trên server. Client tạo ra chữ ký số tương ứng với một message. Server sẽ sử dụng signature, message này cộng với public key đã lưu để verify signature trên.

### Một vài lưu ý:
- Để sử dụng ECC bạn cần cài đặt thêm module gmp của php
- Trên mỗi thiết bị (device) ứng với mỗi acount đều phải sinh ra cặp private + public key riêng của mình
- Mỗi lần encrypt/decrypt đều phải gen lại key để đảm bảo không lộ hàng -_-
- Trên react-native private và public key sinh ra dưới dạng mã Hexa, do đó server muốn sử dụng phải parse về đúng định dạng pem:

    ```
    use Mdanter\Ecc\Serializer\Point\UncompressedPointSerializer;
    ```

    ```
        /**
         * Parse public key from pem format to hex format
         *
         * @param: $publicKey String (pem format)
         * @return string value
         */
        public static function publicPemToHex($publicKey)
        {
            $adapter = EccFactory::getAdapter();
            $derPubSerializer = new DerPublicKeySerializer($adapter);
            $publicPemSerializer = new PemPublicKeySerializer($derPubSerializer);

            return $derPubSerializer->getUncompressedKey($publicPemSerializer->parse($publicKey));
        }

        /**
         * Parse public key from pem format to hex format
         *
         * @param: $publicKey String (pem format)
         * @return string value
         */
        public static function publicHexToPem($publicKey)
        {
            $adapter = EccFactory::getAdapter();
            $generator = EccFactory::getSecgCurves()->generator256k1();

            $derPubSerializer = new DerPublicKeySerializer($adapter);
            $pubPemSerializer = new PemPublicKeySerializer($derPubSerializer);

            $uncompressedPoint = new UncompressedPointSerializer();
            try {
                $point = $uncompressedPoint->unserialize(EccFactory::getSecgCurves()->curve256k1(), $clientPublicKey);
            } catch (\Throwable $e) {
                throw new \Exception('Client public key error.');
            }

            return $pubPemSerializer->serialize($generator->getPublicKeyFrom($point->getX(), $point->getY()));
        }
    ```