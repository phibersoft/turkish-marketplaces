## Turkish Marketplaces (2.0.2)

Bu paket ile Türkiye'de bulunan büyük e-ticaret sitelerinin REST API entegrasyonlarını tek bir formatta toplar.

### Şuanda desteklenen platformlar

* Trendyol
* Çiçeksepeti
* Ideasoft

### Yol Haritası

* N11
* Cimri
* Amazon
* GittiGidiyor

### Kullanım Kılavuzu

Her platformun ayrı bir class'ı vardır. Tüm sınıflar aynı kullanım standartına sahiptir.

#### Class Fonksiyonları

#### Constructor (Yapıcı Fonksiyon)
Burada platforma ait giriş bilgileri girilir.

|  Platform   |           Constructor Parametreleri            |
|:-----------:|:----------------------------------------------:|
|  Trendyol   |           apiKey, apiSecret, firmId            |
| Çiçeksepeti |                     apiKey                     |  
|  Ideasoft   | apiKey, magazaUri(https://www.magaza-ismi.com) |

#### getProducts(requestParameters)
Her platformda ürünler kendi parametreleri ile çağırılır. Platformda zorunlu kılınan parametreler, classda zorunlu değildir. Örneğin tarih parametresi platformda zorunlu ise, classda tarih girmediğinizde otomatik olarak 1 günlük aralığı gönderir.

#### getProductsBulk(requestParameters, middleware)
Platformda ürünleri toplu şekilde çekmek için kullanılır. Size ve Page parametrelerini kabul etmez, geri kalan tüm parametreler gönderilebilir.
Middleware parametresine bir fonksiyon göndererek hangi sayfa üzerinde olduğunun bilgisine erişilebilir.

#### getOrders(requestParameters)
Platformda siparişleri çekmek için kullanılır.

#### getOrdersBulk(requestParameters, middleware)
Platformda siparişleri toplu şekilde çekmek için kullanılır. Size ve Page parametrelerini kabul etmez, geri kalan tüm parametreler gönderilebilir.
Middleware parametresine bir fonksiyon göndererek hangi sayfa üzerinde olduğunun bilgisine erişilebilir.

#### timeFormatter(date)
Her platform requestlerde kendine özgü bir format ister.
Örneğin Trendyol timestamp parametresi isterken, Ideasoft YYYY-MM-DD HH:MM:SS formatında gönderilmesini ister.
Bu durumda her class'ta bulunan bu fonksiyon, aldığı <strong> Date </strong> parametresini istenen formata çevirir.

## Notlar

### Çiçeksepeti Limitleri
Çiçeksepeti platformu, requestleri sınırlandırmak için, limitleri kullanır. Bu limitler şu şekilde kurallandırılmıştır: <br />
- Aynı Request Body ile 10 dakikada 1 request gönderebilirsiniz.
- Farklı Request Body ile 5 saniyede 1 request gönderebilirsiniz. <br />
Bu durumun önüne geçebilmek için, sayfa sayısını (45-60 arası random) farklı göndererek request body'i değiştirebiliriz. <br />
Çiçeksepetinin `getOrdersBulk` ve `getProductsBulk` fonksiyonlarında bu sistem implemente edilmiştir.
