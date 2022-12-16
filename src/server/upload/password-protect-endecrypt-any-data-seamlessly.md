![](https://images.viblo.asia/d2a35c51-58da-40e7-8fe5-d3688c734f9d.png)

Have you seen the film "[We Live in Public](http://www.imdb.com/title/tt0498329/)"? If you haven't yet, you probably should. We live in a time where privacy is becoming a big concern, transparently. All the data we exchange between us, or even between our sweet Android (or, yeah, the iPhone), are travelling through public channels, every moment, where all of it can be intercepted. The only protection we can achieve against unauthorized access is encryption.

Most of the times, the cipher world of encryption and decryption remains transparent, due to it's obvious nature (too keep it's ordinary consumers hassle free). There are some exceptions though, not to mention, security practitioners, developers and security paranoids.

Most of us have encountered encryption at least once, in the form of a login window, pattern lock or maybe a password protected archive. In this article, we are going go through the steps of data encryption and decryption using Ruby and OpenSSL.

## Symmetric and asymmetric encryption

The process of encryption and decryption are parts of cryptography. The process varies based on the purpose of en/decryption and the usage scenario. Primarily, cryptographic algorithms can be splitted into two major sections. The public key cryptography and private key cryptography. Public key cryptography has a pair of keys that are used when en/decrypting a piece of data. But, unlike public key cryptography, private key cryptography uses a single key for both encryption and decryption.

Public key cryptography can be exemplified with SSL/TLS support of HTTP, which is more commonly known as HTTPS. Private key cryptography appears more commonly, as an example, login form. We are going to focus on private key cryptography, otherwise known as symmetric cryptography.

![]()

The process itself is simple as the image above. You take the original data, choose an encryption key, pass it through a symmetric algorithm and voila! You have the encrypted data. Now, do the same process in reverse and you get the original data back! Amazing, isn't it!

There are many symmetric algorithms available, e.g. Blowfish, DES, IDEA, MARS, RC2, RC4, RC5, RC6, Rijndael, Serpent, Triple-DES, Twofish and many more. There is no best algorithm, One is chosen based on the usage scenario. It depends on the computational resource available, efficiency expected, encryption strength expected, minimum data confidentiality guarantees, key length and strength and more. Our focus will be AES.


## Authenticated encryption

Cryptography is often concerned about several factors, namely, Authenticity (Verification, that data has an authentic source), Integrity (Verification that the data has not been tampered with) and Confidentiality (Verification that the data has not been exposed to an unexpected party).

Encryption of data, in practical implementation is not as simple as our first figure, which can not provide all the three factors we are concerned about. For sake of simplicity, we want want to encrypt and decrypt our data in a way, so that it remains incorrupt, but still becomes available to its recipient with proper access credential. In order for this to achieve, we need what is known as authenticated encryption. It provides us with all the factors we are concerned about, Integrity, Authenticity and Confidentiality.

There are different components of authenticated encryption. Our symmetric cipher AES is one of them. There's another component we need, which is a hashing algorithm. We are going to use SHA-1. The third and last puzzle to our problem is the mode of operation. Symmetric cipher operates on a single and fixed block of data. But, the real life data has a varying length. So, different challenges like block chaining, padding need to be overcome. Among different existing algorithms that tackle these issues, we are going to choose GCM (Galois/Counter Mode).

## Encrypting and decrypting any data

Now that we know all the components needed for the simplest yet working en/decryption solution, we can start building one. All the required components (and many more) are already implemented in the [OpenSSL](https://github.com/ruby/openssl) package. A simplified code that implements authenticated encryption will look like the snippet below.

```ruby
require "openssl"
require "securerandom"

module Hide
  # `AE` implements authenticated encryption API based on AES-256
  class AE
    class << self
      # Encrypts a data stream with an authenticity tag for reliable decryption
      #
      # Returns a hash containing encrypted data, IV and authentication tag
      def encrypt(
        data, key, salt, iter, iv = SecureRandom.random_bytes(12),
        auth_data = "", key_length = 32
      )
        cipher = OpenSSL::Cipher.new "aes-256-gcm"
        cipher.encrypt
        cipher.key =
          OpenSSL::PKCS5.pbkdf2_hmac_sha1(key, salt, iter, key_length)
        cipher.iv = iv
        cipher.auth_data = auth_data
        {
          data: cipher.update(data) + cipher.final,
          iv: iv,
          auth_tag: cipher.auth_tag
        }
      end

      # Decrypts an encrypted datastream with authenticity verification check
      #
      # Returns the decrypted data
      def decrypt(
        data, key, salt, iter, iv, auth_tag, auth_data = "", key_length = 32
      )
        decipher = OpenSSL::Cipher.new "aes-256-gcm"
        decipher.decrypt
        decipher.key =
          OpenSSL::PKCS5.pbkdf2_hmac_sha1(key, salt, iter, key_length)
        decipher.iv = iv
        decipher.auth_tag = auth_tag
        decipher.auth_data = auth_data
        decipher.update(data) + decipher.final
      rescue OpenSSL::Cipher::CipherError
        raise ArgumentError, "Authentication failed"
      end
    end
  end
end
```

## Usage scenarios

### Scenario 1: Password protecting files

One good usage example of our service can be a file encryptor. The gem [hide](https://github.com/at-shakil/hide) en/decrypts any data file, including binary files.

## Conclusion
There are some available solutions for file en/decryption of data. One Rails based solution that I can remember is "attr_encrypted". It is purpose and platform locked. But, as a developer, we often find the necessity of a solution, that is both cross platform and modifiable to the core. If the pitfalls are avoided, what could be better than being in the control of the entire process. :)

## References

- TItle image: https://medium.com/@amit.kulkarni/encrypting-decrypting-a-file-using-openssl-evp-b26e0e4d28d4
- Gem: https://github.com/at-shakil/hide
- OpenSSL: https://github.com/ruby/openssl