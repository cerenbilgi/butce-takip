import { useState, useEffect } from "react";

const GIDER_KATEGORILERI = [
  "Fatura ve Ev Giderleri",
  "Yemek ve İçecek",
  "Kişisel Harcamalar",
  "Kira",
  "Evcil Hayvan Giderleri",
  "Yol Harcamaları",
];

const GELIR_KATEGORILERI = [
  "Maaş",
  "Diğer",
];

export default function TransactionForm({ onKaydet, duzenlenenIslem, onIptal }) {
  const [islemAdi, setIslemAdi] = useState("");
  const [islemTutari, setIslemTutari] = useState("");
  const [islemTipi, setIslemTipi] = useState("gider");
  const [islemKategorisi, setIslemKategorisi] = useState(GIDER_KATEGORILERI[0]);

  const aktifKategoriler = islemTipi === "gelir" ? GELIR_KATEGORILERI : GIDER_KATEGORILERI;

  useEffect(() => {
    if (duzenlenenIslem) {
      setIslemAdi(duzenlenenIslem.islemAdi);
      setIslemTutari(duzenlenenIslem.islemTutari);
      setIslemTipi(duzenlenenIslem.islemTipi);
      setIslemKategorisi(duzenlenenIslem.islemKategorisi);
    } else {
      setIslemAdi("");
      setIslemTutari("");
      setIslemTipi("gider");
      setIslemKategorisi(GIDER_KATEGORILERI[0]);
    }
  }, [duzenlenenIslem]);

  const handleTipDegisimi = (yeniTip) => {
    setIslemTipi(yeniTip);
    setIslemKategorisi(yeniTip === "gelir" ? GELIR_KATEGORILERI[0] : GIDER_KATEGORILERI[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!islemAdi.trim() || !islemTutari || Number(islemTutari) <= 0) return;

    onKaydet({
      id: duzenlenenIslem ? duzenlenenIslem.id : Date.now(),
      islemAdi: islemAdi.trim(),
      islemTutari: Number(islemTutari),
      islemTipi,
      islemKategorisi,
      islemTarihi: duzenlenenIslem
        ? duzenlenenIslem.islemTarihi
        : new Date().toLocaleDateString("tr-TR"),
    });

    setIslemAdi("");
    setIslemTutari("");
    setIslemTipi("gider");
    setIslemKategorisi(GIDER_KATEGORILERI[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 mb-6">
      <h2 className="text-lg font-semibold text-blue-950 mb-4">
        {duzenlenenIslem ? "İşlemi Güncelle" : "Yeni Gelir / Gider Ekle"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="İşlem açıklaması..."
          value={islemAdi}
          onChange={(e) => setIslemAdi(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          required
        />

        <input
          type="number"
          placeholder="Tutar (₺)"
          value={islemTutari}
          onChange={(e) => setIslemTutari(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          required
        />

        <select
          value={islemTipi}
          onChange={(e) => handleTipDegisimi(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
        >
          <option value="gider">Gider (-)</option>
          <option value="gelir">Gelir (+)</option>
        </select>

        <select
          value={islemKategorisi}
          onChange={(e) => setIslemKategorisi(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
        >
          {aktifKategoriler.map((kat) => (
            <option key={kat} value={kat}>
              {kat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition cursor-pointer shadow-sm"
        >
          {duzenlenenIslem ? "Güncellemeyi Kaydet" : "Listeye Ekle"}
        </button>

        {duzenlenenIslem && (
          <button
            type="button"
            onClick={onIptal}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-lg transition cursor-pointer"
          >
            Vazgeç
          </button>
        )}
      </div>
    </form>
  );
}