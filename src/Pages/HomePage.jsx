import { useState, useEffect } from "react";
import SummaryCards from "../Components/SummaryCards";
import TransactionForm from "../Components/TransactionForm";
import TransactionList from "../Components/TransactionList";

const VARSAYILAN_ISLEMLER = [
  {
    id: 1,
    islemAdi: "Aylık Maaş Ödemesi",
    islemTutari: 45000,
    islemTipi: "gelir",
    islemKategorisi: "Maaş",
    islemTarihi: new Date().toLocaleDateString("tr-TR"),
  },
  {
    id: 2,
    islemAdi: "Kedi Maması ve Kum",
    islemTutari: 1250,
    islemTipi: "gider",
    islemKategorisi: "Evcil Hayvan Giderleri",
    islemTarihi: new Date().toLocaleDateString("tr-TR"),
  },
];

export default function HomePage() {
  const [islemler, setIslemler] = useState(() => {
    const kayitliVeri = localStorage.getItem("butce_asistani_verileri");
    return kayitliVeri ? JSON.parse(kayitliVeri) : VARSAYILAN_ISLEMLER;
  });

  const [duzenlenenIslem, setDuzenlenenIslem] = useState(null);

  useEffect(() => {
    localStorage.setItem("butce_asistani_verileri", JSON.stringify(islemler));
  }, [islemler]);

  const islemKaydet = (yeniIslem) => {
    if (duzenlenenIslem) {
      setIslemler(islemler.map((item) => (item.id === yeniIslem.id ? yeniIslem : item)));
      setDuzenlenenIslem(null);
    } else {
      setIslemler([yeniIslem, ...islemler]);
    }
  };

  const islemSil = (id) => {
    setIslemler(islemler.filter((item) => item.id !== id));
    if (duzenlenenIslem && duzenlenenIslem.id === id) {
      setDuzenlenenIslem(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white py-6 px-4 shadow-md mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tight">Bütçe Takip Asistanı</h1>
          <p className="text-blue-100 text-sm mt-1">
            Gelir ve giderlerini ekleyerek finansal durumunu kendin denetle.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-12">
        <SummaryCards islemler={islemler} />

        <TransactionForm
          onKaydet={islemKaydet}
          duzenlenenIslem={duzenlenenIslem}
          onIptal={() => setDuzenlenenIslem(null)}
        />

        <TransactionList
          islemler={islemler}
          onDuzenle={(islem) => setDuzenlenenIslem(islem)}
          onSil={islemSil}
        />
      </main>
    </div>
  );
}
