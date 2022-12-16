# Introduction
Since SHA-1 and RSA-1024 is outdated and has shown low security, SHA-256 and RSA 2048 is the current standard. SHA-256 is a perfectly good secure hashing algorithm and quite suitable for use on certificates while 2048-bit RSA is a good signing algorithm (do note that signing is not the same as encrypting). Using 2048-bit RSA with SHA-256 is a secure signing scheme for a certificate. This will allow you to generate and public and private key that can be used to encrypt and decrypt your data. To demo this i have created a empty android App and you can follow the guide and examine the code below. Happy Coding!


**RSACipher**

```

import android.util.Base64;

import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.KeySpec;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.Cipher;

public class RSACipher {
    private final static String CRYPTO_METHOD = "RSA";
    private final static String CYPHER = "RSA/ECB/OAEPWITHSHA-256ANDMGF1PADDING";
    private final static int CRYPTO_BITS = 2048;
    private static String PUB_KEY = "pubKey";
    private static String PRIVATE_KEY = "privateKey";
    private static String CHARSET = "UTF-8";
    /*private final static int CRYPTO_BITS = 4096; This will encrypt in 4093bits, note however that is slower.*/

    public RSACipher() {
        KeyPair kp = getKeyPair();
        PublicKey publicKey = kp.getPublic();
        byte[] publicKeyBytes = publicKey.getEncoded();
        PUB_KEY = new String(Base64.encode(publicKeyBytes, Base64.DEFAULT));
        //Save the public key so it is not generated each and every time
        PrivateKey privateKey = kp.getPrivate();
        byte[] privateKeyBytes = privateKey.getEncoded();
        PRIVATE_KEY = new String(Base64.encode(privateKeyBytes, Base64.DEFAULT));
        //Also Save the private key so it is not generated each and every time
    }

    public static KeyPair getKeyPair() {
        KeyPair kp = null;
        try {
            KeyPairGenerator kpg = KeyPairGenerator.getInstance(CRYPTO_METHOD);
            kpg.initialize(CRYPTO_BITS);
            kp = kpg.generateKeyPair();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return kp;
    }

    public static String encrypt(String clearText) {
        String encryptedBase64 = "";
        try {
            KeyFactory keyFac = KeyFactory.getInstance(CRYPTO_METHOD);
            KeySpec
                keySpec =
                new X509EncodedKeySpec(Base64.decode(PUB_KEY.trim().getBytes(), Base64.DEFAULT));
            Key key = keyFac.generatePublic(keySpec);
            final Cipher cipher = Cipher.getInstance(CYPHER);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] encryptedBytes = cipher.doFinal(clearText.getBytes(CHARSET));
            encryptedBase64 = new String(Base64.encode(encryptedBytes, Base64.DEFAULT));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return encryptedBase64.replaceAll("(\\r|\\n)", "");
    }

    public static String decrypt(String encryptedBase64) {
        String decryptedString = "";
        try {
            KeyFactory keyFac = KeyFactory.getInstance(CRYPTO_METHOD);
            KeySpec keySpec = new PKCS8EncodedKeySpec(
                Base64.decode(PRIVATE_KEY.trim().getBytes(), Base64.DEFAULT));
            Key key = keyFac.generatePrivate(keySpec);
            final Cipher cipher = Cipher.getInstance(CYPHER);
            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] encryptedBytes = Base64.decode(encryptedBase64, Base64.DEFAULT);
            byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
            decryptedString = new String(decryptedBytes);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return decryptedString;
    }
}
```

**MainActivity**

```
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    private String textToEncrypt = "Enter any text here";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        new RSACipher();
        String encrypt = RSACipher.encrypt(textToEncrypt);
        String decrypt = RSACipher.decrypt(encrypt);
        TextView textEncrypted = findViewById(R.id.text_encrypted);
        textEncrypted.setText(encrypt);
        TextView textDecrypted = findViewById(R.id.text_decrypted);
        textDecrypted.setText(decrypt);
    }
}
```

**activity_main.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="10dp"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingBottom="10dp"
        android:text="Encrypted"
        android:textSize="14sp"
        android:textStyle="bold"/>

    <TextView
        android:id="@+id/text_encrypted"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingBottom="10dp"
        android:textAlignment="center"
        android:textSize="12sp"/>

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingBottom="10dp"
        android:text="Decrypted"
        android:textSize="14sp"
        android:textStyle="bold"/>

    <TextView
        android:id="@+id/text_decrypted"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textAlignment="center"
        android:textSize="12sp"/>

</LinearLayout>
```

**Image**

![](https://images.viblo.asia/e1a79a75-bd90-4c3c-aa91-6cd3e8f94d90.png)

Thats it! I have commented important notes for clarifications. Remember to save your keys at the first time they are generated as neglecting so will result in multiple and newer keys being generated all the time. Peace out.