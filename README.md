Kanban Board Proje
Dokümantasyonu

Bu proje, React ve Vite kullanılarak geliştirilen, kullanıcıların görev kartlarını Backlog, To Do, In
Progress ve Done sütunları arasında sürükleyip bırakabildiği bir Kanban Board uygulamasıdır

Proje Yapısı:
kanban-board/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── Board.jsx
│ │ ├──Column.jsx
│ │ └── Card.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── services/
│ └── boardServices.jsx

Proje Yapım Açıklaması:
Projede kodun okunabilirliğini ve yeniden kullanılabilirliğini artırmak için üç ana bileşeni

component olarak ayırdım:

• Board.jsx → Uygulamanın genel iskeletini oluşturan, tüm column'ları içeren ana bileşen.
State yönetimi ve drag/drop işlemlerinin merkezi burada.
• Column.jsx → Her bir sütunu (Backlog, To Do, In Progress, Done) temsil eden bileşen.
Başlık, kart listesi ve kart ekleme butonunu içeriyor.
• Card.jsx → Her bir işi temsil eden kart bileşeni. Sürükle-bırak, silme ve içerik gösterimi bu
component içerisinde yönetiliyor.

Bu component yapısı sayesinde, her parçanın görevini net bir şekilde ayırarak yönetilebilir, test
edilebilir ve geliştirilebilir bir yapı kurdum.
4 sabit sütun (Backlog, To Do, In Progress, Done) olarak tasarladım.

Kartın arka plan rengi, hangi sütuna ait olduğuna göre belirleniyor.

Veri kaydını tarayıcının kendi hafızası olan LocalStorage’ye yaptım bu sayede uygulamayı
yenilesekte veriler kaybolmayacak.

Her board'a özel URL (örneğin: /helloworld) eklemesi yaptım.
Sürükle bırak işlemlerini önce react-beautiful-dnd ile yaptım ama reactın 19 sürümü ile
uyuşmazlığını fark edince @dnd-kit kütüphanesi ile yapmaya karar verdim.

Bu kütüphane sayesinde kartlar liste içinde sıralanabilir ve listeler arası sürükle bırak olacak hale
getirdim.

Sürüklenebilir hale getirmek için useSortable kullanıldı.
State yönetimi olarak useState hookunu kullandım proje büüyük boyutta olmadığı için redux toolkit
veya context api ile yapmaya karar verdim.

ID’leri UUID olarak oluşturdum.

Responsive tasarım için Grid ve Flexbox kullanılarak modern görsel yerleşim sağladım.

Her sütun için sabit başlık ve card içerikleri için başlık ekledim.

Kart ekle butonu ile card içeriğine yeni içerik ve başlık ekleyip localstoragede tutacak hale
getirdim.

Kullanılan Teknolojiler:
• React
• Vite
• React Router
• @dnd-kit @dnd-kit/core & @dnd-kit/sortable
• UUID
• localStorage API

Projeyi Çalıştırmak İçin:
Terminalde şu komutları çalıştırınız;
cd kanban-board
npm install
npm run dev
Tarayıcıdan şu adresi ziyaret et:
http://localhost:5173
