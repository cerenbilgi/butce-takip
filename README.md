# Bütçe Takip Asistanı

ReactJS ve Tailwind CSS kullanılarak geliştirilmiş, kişisel gelir ve gider hareketlerinin takip edilmesini sağlayan web uygulamasıdır.

## Özellikler

- **Gelir ve Gider Ekleme:** İşlem tipine göre dinamik olarak değişen özel kategorilerle yeni bütçe kaydı oluşturma.
- **Canlı Bakiye Hesaplama:** Toplam gelir, toplam gider ve kalan bakiyenin anlık olarak hesaplanması.
- **Güncelleme ve Silme (CRUD):** Mevcut kayıtların tutar, kategori veya açıklamasını düzenleme ve listeden silme.
- **Kalıcı Veri Saklama:** `LocalStorage` entegrasyonu sayesinde tarayıcı kapatılsa dahi verilerin korunması.

## Kullanılan Teknolojiler

- **ReactJS (Vite)**
- **Tailwind CSS**
- **JavaScript (ES6+)**
- **LocalStorage API**

## Kurulum ve Çalıştırma

1. Projeyi klonlayın ve klasöre girin:
   `git clone <repo-linkiniz>`
   `cd butce-takip`

2. Bağımlılıkları yükleyin:
   `npm install`

3. Uygulamayı başlatın:
   `npm run dev`