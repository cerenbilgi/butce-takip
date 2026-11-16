export default function TransactionList({ islemler, onDuzenle, onSil }) {
  if (islemler.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-blue-100 text-center text-slate-400 text-sm">
        Henüz kayıtlı bir işleminiz bulunmuyor. Yukarıdaki formdan yeni kayıt ekleyebilirsiniz.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
      <div className="px-6 py-4 bg-blue-950 text-white flex justify-between items-center">
        <h2 className="text-base font-semibold">Bütçe Hareketleri</h2>
        <span className="text-xs bg-blue-800 px-2.5 py-1 rounded-full">
          {islemler.length} Kayıt
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {islemler.map((islem) => (
          <div key={islem.id} className="p-4 px-6 flex items-center justify-between hover:bg-blue-50/40 transition">
            <div>
              <p className="font-medium text-slate-800">{islem.islemAdi}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <span className="bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded font-medium">
                  {islem.islemKategorisi}
                </span>
                <span>•</span>
                <span>{islem.islemTarihi}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`font-bold ${islem.islemTipi === "gelir" ? "text-blue-600" : "text-orange-600"}`}>
                {islem.islemTipi === "gelir" ? "+" : "-"}
                {Number(islem.islemTutari).toLocaleString("tr-TR")} ₺
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => onDuzenle(islem)}
                  className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1.5 rounded-md font-medium transition cursor-pointer"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => onSil(islem.id)}
                  className="text-xs bg-orange-50 text-orange-700 hover:bg-orange-100 px-2.5 py-1.5 rounded-md font-medium transition cursor-pointer"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}