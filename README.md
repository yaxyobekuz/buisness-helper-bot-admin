# buisness-helper-bot-admin

Telegram bot uchun admin panel. Next.js 16 (App Router) + Tailwind CSS 4.

Server alohida loyiha — `buisness-helper-bot-server`.

## Ishga tushirish

```bash
npm install
cp .env.example .env.local   # server API manzilini ko'rsating

npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

Kirish ma'lumotlari server `.env` faylidagi `ADMIN_LOGIN` va
`ADMIN_PASSWORD` dan olinadi (standart: `admin` / `admin123`).
Ularni **Profil** sahifasidan o'zgartirish mumkin.

## Sahifalar

| Manzil | Sahifa |
| --- | --- |
| `/login` | Kirish |
| `/` | Bosh sahifa — statistika, grafik, so'nggi arizalar |
| `/arizalar` | Arizalar ro'yxati — holat filtri, qidiruv, sahifalash |
| `/arizalar/[id]` | Ariza tafsiloti — fayllar, tashkilot, holatni o'zgartirish |
| `/tashkilotlar` | Tashkilotlar ro'yxati — qidiruv (faqat ko'rish) |
| `/tashkilotlar/[id]` | Tashkilot ma'lumotlari va uning arizalari |
| `/sozlamalar` | Yo'nalishlar — qo'shish, nomini va holatini o'zgartirish |
| `/profil` | Login, F.I.Sh. va parolni o'zgartirish |

Ichki sahifalarning barchasida breadcrumb bor.

## Tuzilma

```
src
├── proxy.js            kirishni tekshiruvchi qatlam (auth guard)
├── app/
│   ├── login/          kirish sahifasi
│   ├── (panel)/        sidebar li sahifalar guruhi
│   └── actions/        server action lar (auth, ma'lumot o'zgartirish)
├── components/         UI komponentlari
└── lib/                api klient, konstantalar, formatlash
```

## Autentifikatsiya

Login server action orqali serverga yuboriladi, qaytgan JWT **HTTP-only
cookie** ga yoziladi va brauzer JavaScript iga chiqmaydi. Sahifalar server
komponentlari bo'lgani uchun so'rovlar server tomonida, `Authorization`
sarlavhasi bilan yuboriladi — token hech qachon brauzerga uzatilmaydi.

`src/proxy.js` cookie yo'q bo'lsa `/login` ga yo'naltiradi.

## Brend va logotip

Brend rangi — to'q ko'k, `src/app/globals.css` dagi `--color-brand-*`
o'zgaruvchilarida. Ularni o'zgartirsangiz butun panel rangi o'zgaradi.

Logotip: `public/logo.svg`. **Hozir vaqtinchalik belgi turibdi** —
prokuratura gerbini shu faylga (yoki `logo.png` qilib) qo'ying. Boshqa
formatdan foydalansangiz `src/components/sidebar.jsx` va
`src/components/login-form.jsx` dagi `/logo.svg` yo'lini almashtiring.

## Yo'nalishlar haqida

Botda faqat `Faol` yo'nalishlar ko'rsatiladi. Foydalanuvchi ro'yxatda yo'q
yo'nalish kiritsa, u `Yangi` holatda qo'shiladi — Sozlamalar sahifasidan
`Faol` qilmaguningizcha botda ko'rinmaydi. Panel orqali qo'shilgan
yo'nalish darhol `Faol` bo'ladi.
