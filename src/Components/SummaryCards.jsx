export default function SummaryCards({ islemler }) {
  const toplamGelir = islemler
    .filter((islem) => islem.islemTipi === "gelir")
    .reduce((toplam, islem) => toplam + Number(islem.islemTutari), 0);

  const toplamGider = islemler
    .filter((islem) => islem.islemTipi === "gider")
    .reduce((toplam, islem) => toplam + Number(islem.islemTutari), 0);

  const kalanBakiye = toplamGelir - toplamGider;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-600">
        <p className="text-sm text-slate-500 font-medium">Kalan Bakiye</p>
        <p className={`text-2xl font-bold mt-1 ${kalanBakiye >= 0 ? "text-blue-900" : "text-orange-600"}`}>
          {kalanBakiye.toLocaleString("tr-TR")} ₺
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-sky-500">
        <p className="text-sm text-slate-500 font-medium">Toplam Gelir</p>
        <p className="text-2xl font-bold text-blue-600 mt-1">
          +{toplamGelir.toLocaleString("tr-TR")} ₺
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-orange-500">
        <p className="text-sm text-slate-500 font-medium">Toplam Gider</p>
        <p className="text-2xl font-bold text-orange-600 mt-1">
          -{toplamGider.toLocaleString("tr-TR")} ₺
        </p>
      </div>
    </div>
  );
}
