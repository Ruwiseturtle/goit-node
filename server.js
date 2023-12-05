const mongoose = require("mongoose");                    // імпортуємо mongoose для підключення до баз даних

const app = require("./app");

const { DB_HOST } = process.env;                          // беремо секретну змінну (строку підключення до бд) зі змінних оточення
console.log(process.env.DB_HOST);
mongoose.set('strictQuery', true);                       // підключаємося


mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('все добре');
    app.listen(3000);                                    // запускаємо сервер
    console.log("Database connection successful");
  })
  .catch((error) => { 
    console.log('ошибочка');
    console.log(error.message);
    process.exit(1);                          // команда закриває запущені процеси (якщо щось запущене)
  })


// створюємо проект на mongodb.com, налаштовуємо, створюємо користувача
// в MongoDb Compas підключаємось до проекту через строку з паролем
// в проекті visual studio: підключаємо mongoose  
// заливаємо на гіт хаб а задеплоїти на render.com (тобто на render.com +new service, добавити ссилку на репозиторій -> ok і він задеплоїний) 
// після цього на render.com зявляється ссилка на адресу задеплоїного проекту. Вставити її у постман, вибрати GET, дописати, наприклад /api/contacts і повинен зявитися список контактів

// це ми зробили нормальний хостинг

// ховаємо секретні дані (строку підключення до бд та пароль): 
// виносимо у окремий файл секретні змінні, експортуємо
// цей файл добавяємо у гіт ігнор
// у server.js імпортуємо змінну з того файлу
// щоб ця секретна змінна була і на сервері, потрібно додати її на render.com в нашому проекті - Environment - add environment variable (ключ - назва змінної, валие - строка підключенні до бд)
