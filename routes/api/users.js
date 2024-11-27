const express = require("express"); // створюємо веб-сервер

const router = express.Router(); // створюємо router (це як записна книга, де по шляху можна побачити, що потрібно робити)

const ctrl = require("../../controllers/users");

const { validateBody, authenticate, upload } = require("../../middleswares");

const { schemas } = require("../../models/user");

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.registerUser);
router.get("/verify/:verificationToken", ctrl.verifyEmail);                              // для підтверження емейлу
router.post("/verify", validateBody(schemas.EmailSchema, ctrl.resendVerifyEmail));      // для повторного підтверження емейлу
router.post("/login",  validateBody(schemas.registerSchema),  ctrl.loginUser);
router.post("/logout", authenticate, ctrl.logoutUser);
router.get("/current", authenticate, ctrl.getCurrentUser);
router.patch("/:userId/subscription", authenticate, ctrl.updateUserSubscription);
// upload.fields([{name: "cover", maxCount:1}, {name: "subcover", maxCount:2}]) // очікуємо в двух полях файли (назва поля, максимальна кі-сть файлів)
// upload.array("avatar", 8); // очікуємо кілька файлів (до 8 шт) в полі avatar 
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateUserAvatar);  // в полі avatar очікуємо один файл

module.exports = router;



// КОРОТКО:
// Реєстрація(створення нового облікового запису): користувач вводить дані, вони відправляються на бекенд, там пароль хешується (шифрується без можливості розшифрувати) (Для кешування встановлюємо бібліотеку npm install bcrypt)

// Авторизація(процес перевірки прав доступу):   користувач вводить емейл та пароль, вони відправляються на бекенд, там перевіряється чи є такий користувач (якщо ні, то видається помилка, що невірно введений емейл або пароль). 
// Якщо такий користувач є, то в метод compare (бібліотеки bcrypt) відправляється отриманий пароль користувача та пароль користувача з бекенду, який знайдений по емейлу, коли перевіряли чи є такий користувач. Цей метод хешує отриманий пароль і ці захешовані паролі порівнюються. 
// Якщо вертається false, то теж викидаємо помилку таку ж саму. 
// Але якщо паролі співпадають, створюємо токен (Потрбно встановити npm install jsonwebtoken для генерації токена.  І ця бібліотека містить метод, в який потрібно відправити id користувача, секретний ключ, який самі придумуємо і зберігаємо в env та вказуємо скільки буде жити токен. Цей метод і генерує токен.) Потім токен вертаємо на бекенд.
