# Hakathon_project
أكيد! ها نموذج **README.md** بسيط وعملي مناسب لمشروعك ديال منصة تذكير بالأدوية مع المصادقة (auth) والتنقل بين الصفحات.

````markdown
# Matnsach Platform

منصة إلكترونية كتساعد المستخدمين باش ماينساوش ياخذو دواهم في الوقت الصحيح.

---

## 📋 الوصف

هاد المشروع عبارة عن موقع ويب فيه:

- تسجيل الدخول والتسجيل للمستخدمين.
- تذكير المستخدمين بمواعيد الأدوية.
- عرض قائمة الأدوية الخاصة بالمستخدم.
- خاصية تسجيل الخروج.
- تنقل ديناميكي بين الصفحات حسب حالة تسجيل الدخول.

---

## 🛠️ التقنيات المستعملة

- Frontend: React.js مع React Router.
- Backend: Node.js مع Express.js.
- قاعدة البيانات: MongoDB (ممكن تغير حسب مشروعك).
- المصادقة: JWT أو Cookies (حسب تنفيذك).
- إرسال الإيميلات: Nodemailer.

---

## 🚀 طريقة التشغيل محلياً

1. استنساخ المستودع:
```bash
git clone https://github.com/Oumaima-El-Badraouy/Hakathon_project.git
cd repo-name
````

2. تثبيت التبعيات:

* للخادم (backend):

```bash
cd server
npm install
```

* للواجهة (frontend):

```bash
cd ../client
npm install
```

3. إنشاء ملف `.env` في مجلد `server` يحتوي على المتغيرات المهمة مثل:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5001
```

4. تشغيل الخادم:

```bash
npm run dev
```

5. تشغيل الواجهة:

```bash
npm start
```

---

## ⚙️ الاستخدام

* افتح المتصفح على `http://localhost:3000` (أو البورت اللي انت محدده).
* سجل حساب جديد أو سجل دخول إذا كنت مسجل.
* بعد تسجيل الدخول، ستتمكن من الوصول إلى صفحة الأدوية.
* يمكنك تسجيل الخروج من خلال زر "تسجيل الخروج".

---

## 🔒 الأمان

* يرجى عدم رفع ملف `.env` على GitHub لأن فيه معلومات حساسة.
* يستخدم المشروع حماية من تسرب أسرار مثل رموز التوكن وكلمات السر.

---

## 🧩 ملاحظات

* تأكد من إعداد ملفات البيئة `.env` بشكل صحيح.
* يمكنك تعديل روابط API حسب البيئة (تطوير أو إنتاج).

---

## 👩‍💻 المساهمون

* [Oumaima El Badraouy](https://github.com/Oumaima-El-Badraouy)

---

## 📄 الترخيص

MIT License

---

