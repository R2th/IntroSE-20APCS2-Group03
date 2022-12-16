## Note tích hợp Unity IAP 2d để tiện tích hợp khi cần:

### Bước 1: Enable Service In App Purchasing 

![](https://connect-prd-cdn.unity.com/20190130/3d069e04-7886-4bba-91ce-f6cba77722c0_review_services_fixname.png.2000x0x1.webp)

### Bước 2: Tạo Script Purchase bao gồm các function sau:

* InitializePurchasing: Khởi tạo IAP Builder, thêm các product của game & add các callback cần thiết quản lý sự kiện mua bán.
* BuyProductID: 1 func private thực hiện việc mua sản phẩm dựa vào ID của sản phẩm mà ta khai báo ( config theo store)
* BuyConsumable, BuyNonConsumable, BuySubscription: Public function để thực hiện mua bán dựa trên loại của sản phẩm, truyền vào để lấy được chính xác ID của product.
* RestorePurchases: Trên iOS gọi hàm này để restore lại sản phẩm vừa mua trước đó.
* OnInitialize: được gọi để check xem thử app có connect được với Unity IAP hay ko, OnInitialize được chạy ngầm, chỉ fail khi chúng ta config bị sai.
* OnInitializeFailed: gọi khi IAP init có vấn đề và hiển thị log ở console
* ProcessPurchase: Check 1 sản phẩm được mua thành công & có show log ở console.
* OnPurchaseFailed: Hiển thị lỗi khi giao dịch bị thất bại ở console.

Add Script như sau vào folder source :

```csharp
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Purchasing;

// Placing the Purchaser class in the CompleteProject namespace allows it to interact with ScoreManager, 
// one of the existing Survival Shooter scripts.
namespace CompleteProject
{
    // Deriving the Purchaser class from IStoreListener enables it to receive messages from Unity Purchasing.
    public class Purchaser : MonoBehaviour, IStoreListener
    {
        private static IStoreController m_StoreController;          // The Unity Purchasing system.
        private static IExtensionProvider m_StoreExtensionProvider; // The store-specific Purchasing subsystems.

        // Product identifiers for all products capable of being purchased: 
        // "convenience" general identifiers for use with Purchasing, and their store-specific identifier 
        // counterparts for use with and outside of Unity Purchasing. Define store-specific identifiers 
        // also on each platform's publisher dashboard (iTunes Connect, Google Play Developer Console, etc.)

        // General product identifiers for the consumable, non-consumable, and subscription products.
        // Use these handles in the code to reference which product to purchase. Also use these values 
        // when defining the Product Identifiers on the store. Except, for illustration purposes, the 
        // kProductIDSubscription - it has custom Apple and Google identifiers. We declare their store-
        // specific mapping to Unity Purchasing's AddProduct, below.
        public static string kProductIDConsumable =    "consumable";   
        public static string kProductIDNonConsumable = "nonconsumable";
        public static string kProductIDSubscription =  "subscription"; 

        // Apple App Store-specific product identifier for the subscription product.
        private static string kProductNameAppleSubscription =  "com.unity3d.subscription.new";

        // Google Play Store-specific product identifier subscription product.
        private static string kProductNameGooglePlaySubscription =  "com.unity3d.subscription.original"; 

        void Start()
        {
            // If we haven't set up the Unity Purchasing reference
            if (m_StoreController == null)
            {
                // Begin to configure our connection to Purchasing
                InitializePurchasing();
            }
        }

        public void InitializePurchasing() 
        {
            // If we have already connected to Purchasing ...
            if (IsInitialized())
            {
                // ... we are done here.
                return;
            }

            // Create a builder, first passing in a suite of Unity provided stores.
            var builder = ConfigurationBuilder.Instance(StandardPurchasingModule.Instance());

            // Add a product to sell / restore by way of its identifier, associating the general identifier
            // with its store-specific identifiers.
            builder.AddProduct(kProductIDConsumable, ProductType.Consumable);
            // Continue adding the non-consumable product.
            builder.AddProduct(kProductIDNonConsumable, ProductType.NonConsumable);
            // And finish adding the subscription product. Notice this uses store-specific IDs, illustrating
            // if the Product ID was configured differently between Apple and Google stores. Also note that
            // one uses the general kProductIDSubscription handle inside the game - the store-specific IDs 
            // must only be referenced here. 
            builder.AddProduct(kProductIDSubscription, ProductType.Subscription, new IDs(){
                { kProductNameAppleSubscription, AppleAppStore.Name },
                { kProductNameGooglePlaySubscription, GooglePlay.Name },
            });

            // Kick off the remainder of the set-up with an asynchrounous call, passing the configuration 
            // and this class' instance. Expect a response either in OnInitialized or OnInitializeFailed.
            UnityPurchasing.Initialize(this, builder);
        }


        private bool IsInitialized()
        {
            // Only say we are initialized if both the Purchasing references are set.
            return m_StoreController != null && m_StoreExtensionProvider != null;
        }


        public void BuyConsumable()
        {
            // Buy the consumable product using its general identifier. Expect a response either 
            // through ProcessPurchase or OnPurchaseFailed asynchronously.
            BuyProductID(kProductIDConsumable);
        }


        public void BuyNonConsumable()
        {
            // Buy the non-consumable product using its general identifier. Expect a response either 
            // through ProcessPurchase or OnPurchaseFailed asynchronously.
            BuyProductID(kProductIDNonConsumable);
        }


        public void BuySubscription()
        {
            // Buy the subscription product using its the general identifier. Expect a response either 
            // through ProcessPurchase or OnPurchaseFailed asynchronously.
            // Notice how we use the general product identifier in spite of this ID being mapped to
            // custom store-specific identifiers above.
            BuyProductID(kProductIDSubscription);
        }


        void BuyProductID(string productId)
        {
            // If Purchasing has been initialized ...
            if (IsInitialized())
            {
                // ... look up the Product reference with the general product identifier and the Purchasing 
                // system's products collection.
                Product product = m_StoreController.products.WithID(productId);

                // If the look up found a product for this device's store and that product is ready to be sold ... 
                if (product != null && product.availableToPurchase)
                {
                    Debug.Log(string.Format("Purchasing product asychronously: '{0}'", product.definition.id));
                    // ... buy the product. Expect a response either through ProcessPurchase or OnPurchaseFailed 
                    // asynchronously.
                    m_StoreController.InitiatePurchase(product);
                }
                // Otherwise ...
                else
                {
                    // ... report the product look-up failure situation  
                    Debug.Log("BuyProductID: FAIL. Not purchasing product, either is not found or is not available for purchase");
                }
            }
            // Otherwise ...
            else
            {
                // ... report the fact Purchasing has not succeeded initializing yet. Consider waiting longer or 
                // retrying initiailization.
                Debug.Log("BuyProductID FAIL. Not initialized.");
            }
        }


        // Restore purchases previously made by this customer. Some platforms automatically restore purchases, like Google. 
        // Apple currently requires explicit purchase restoration for IAP, conditionally displaying a password prompt.
        public void RestorePurchases()
        {
            // If Purchasing has not yet been set up ...
            if (!IsInitialized())
            {
                // ... report the situation and stop restoring. Consider either waiting longer, or retrying initialization.
                Debug.Log("RestorePurchases FAIL. Not initialized.");
                return;
            }

            // If we are running on an Apple device ... 
            if (Application.platform == RuntimePlatform.IPhonePlayer || 
                Application.platform == RuntimePlatform.OSXPlayer)
            {
                // ... begin restoring purchases
                Debug.Log("RestorePurchases started ...");

                // Fetch the Apple store-specific subsystem.
                var apple = m_StoreExtensionProvider.GetExtension<IAppleExtensions>();
                // Begin the asynchronous process of restoring purchases. Expect a confirmation response in 
                // the Action<bool> below, and ProcessPurchase if there are previously purchased products to restore.
                apple.RestoreTransactions((result) => {
                    // The first phase of restoration. If no more responses are received on ProcessPurchase then 
                    // no purchases are available to be restored.
                    Debug.Log("RestorePurchases continuing: " + result + ". If no further messages, no purchases available to restore.");
                });
            }
            // Otherwise ...
            else
            {
                // We are not running on an Apple device. No work is necessary to restore purchases.
                Debug.Log("RestorePurchases FAIL. Not supported on this platform. Current = " + Application.platform);
            }
        }


        //  
        // --- IStoreListener
        //

        public void OnInitialized(IStoreController controller, IExtensionProvider extensions)
        {
            // Purchasing has succeeded initializing. Collect our Purchasing references.
            Debug.Log("OnInitialized: PASS");

            // Overall Purchasing system, configured with products for this application.
            m_StoreController = controller;
            // Store specific subsystem, for accessing device-specific store features.
            m_StoreExtensionProvider = extensions;
        }


        public void OnInitializeFailed(InitializationFailureReason error)
        {
            // Purchasing set-up has not succeeded. Check error for reason. Consider sharing this reason with the user.
            Debug.Log("OnInitializeFailed InitializationFailureReason:" + error);
        }


        public PurchaseProcessingResult ProcessPurchase(PurchaseEventArgs args) 
        {
            // A consumable product has been purchased by this user.
            if (String.Equals(args.purchasedProduct.definition.id, kProductIDConsumable, StringComparison.Ordinal))
            {
                Debug.Log(string.Format("ProcessPurchase: PASS. Product: '{0}'", args.purchasedProduct.definition.id));
                // The consumable item has been successfully purchased, add 100 coins to the player's in-game score.
                ScoreManager.score += 100;
            }
            // Or ... a non-consumable product has been purchased by this user.
            else if (String.Equals(args.purchasedProduct.definition.id, kProductIDNonConsumable, StringComparison.Ordinal))
            {
                Debug.Log(string.Format("ProcessPurchase: PASS. Product: '{0}'", args.purchasedProduct.definition.id));
                // TODO: The non-consumable item has been successfully purchased, grant this item to the player.
            }
            // Or ... a subscription product has been purchased by this user.
            else if (String.Equals(args.purchasedProduct.definition.id, kProductIDSubscription, StringComparison.Ordinal))
            {
                Debug.Log(string.Format("ProcessPurchase: PASS. Product: '{0}'", args.purchasedProduct.definition.id));
                // TODO: The subscription item has been successfully purchased, grant this to the player.
            }
            // Or ... an unknown product has been purchased by this user. Fill in additional products here....
            else 
            {
                Debug.Log(string.Format("ProcessPurchase: FAIL. Unrecognized product: '{0}'", args.purchasedProduct.definition.id));
            }

            // Return a flag indicating whether this product has completely been received, or if the application needs 
            // to be reminded of this purchase at next app launch. Use PurchaseProcessingResult.Pending when still 
            // saving purchased products to the cloud, and when that save is delayed. 
            return PurchaseProcessingResult.Complete;
        }


        public void OnPurchaseFailed(Product product, PurchaseFailureReason failureReason)
        {
            // A product purchase attempt did not succeed. Check failureReason for more detail. Consider sharing 
            // this reason with the user to guide their troubleshooting actions.
            Debug.Log(string.Format("OnPurchaseFailed: FAIL. Product: '{0}', PurchaseFailureReason: {1}", product.definition.storeSpecificId, failureReason));
        }
    }
}
```

### Bước 3: 

Kéo Purchaser script vào gameObject cần test/ implement IAP.

![](https://connect-prd-cdn.unity.com/20190130/2984a776-2120-48f1-92bf-e25347982380_drag_purchaser_script.png.2000x0x1.webp)

Tạo thử nghiệm mua IAP với 1 consumable item gọi là 100 coins.  Khi mua thành công sẽ được add 100 coins vào.

![](https://connect-prd-cdn.unity.com/20190130/561a7653-3a5f-41a0-a035-a87dc1557ebd_ex_21593_d4d83a50e881bc1263e91cb3f2b4b7ee_http___cms_hq_unity3d_com_sites_default_files_9_png.png.2000x0x1.webp)

Chúng ta sẽ gọi function của script Purchase để mua IAP. Add thêm 1 Button vào IAP Panel & add sự kiện cho button trỏ đến function của Purchase script.

![](https://connect-prd-cdn.unity.com/20190130/14b519ab-0e78-4a1f-9c19-3adf8129984c_postshopcube.png.2000x0x1.webp)

### Bước 4: Testing:

Chạy game & kích hoạt màn hình cho chứa script Purchase sẽ hiển thị như này ở console log:

![](https://connect-prd-cdn.unity.com/20190130/0945e96c-4876-4916-b2f1-45429515ad67_ex_21593_7ad6d6ac993228467879aa88e7e871bd_http___cms_hq_unity3d_com_sites_default_files_16_copy_png.png.2000x0x1.webp)

Nhấn vào button đã implement sự kiện mua consummer product, sẽ hiển thị:

![](https://connect-prd-cdn.unity.com/20190130/a54d1751-1cfc-4001-a9d2-a96194f3a0a1_ex_21593_b59ba5be5a0fca551cbacba029baca64_http___cms_hq_unity3d_com_sites_default_files_17_copy_png.png.2000x0x1.webp)

![](https://connect-prd-cdn.unity.com/20190130/faa43a4f-b051-4271-ae46-c8efe2897828_ex_21593_e83bce52391d52fef6f40a8ce19b1815_http___cms_hq_unity3d_com_sites_default_files_18_copy_png.png.2000x0x1.webp)

![](https://connect-prd-cdn.unity.com/20190130/77f6bc57-7399-4b7b-9dd2-e9c73cb24674_ex_21593_27f4b3cefd1e44267383f9b8740a863c_http___cms_hq_unity3d_com_sites_default_files_18_png.png.2000x0x1.webp)

DONE.

Để test thực trên iOS / Android thì phải config trên account của từng store. Xem thêm trên các video youtube để biết cách config như thế nào.