const { Schema, model } = require("mongoose"); // mongoose - перевіряє те, що зберігаємо в базі даних
const Joi = require("joi");                    // joi - для перевірки даних, які приходять із фронтенда

const handleMongooseError = require("../middleswares/handleMongooseError");

const contactSchema = new Schema(
  {
    // для перевірки даних, які відправляємо на бекенд
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      //улюблена книга чи ні
      type: Boolean, //тип поля, якщо тип не поставили
      default: false, //значення за замовчуванням
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },                                      // для прикладу
                                            // genre: {              може бути поле жанр (більше до книг підходить). Можна втбрати жанр тільки з переліку
                                            //   type: String,       тип строка
                                            //   enum: ["fantastic", "love", "triller"],  перелік жанрів
                                            //   default: false,
                                            // },
                                             // data: {               може бути ще дата
                                            //   type: String,
                                             //   //16-10-2024
                                            //   match: /^\d{2}-\d{2}-\d{4}$/, регулярний вираз для формату дати
                                             //   required: true,
                                            // },
  },
  { versionKey: false, timestamps: true }
);  // для того, щоб показувало не версію документа, а дату створення обьекта в базі даних, бо знизу під полями ставить -v

//типа коли при збереженні в бд сталась помилка, нехай спрацює ця мідлвара. Тобто це для того, щоб вертало ще й правильний  статус помилки
contactSchema.post("save", handleMongooseError); 

// joi - схема для перевірки даних, які приходять із фронтенда!!!
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

const schemas = {
  updateFavoriteSchema,
  addSchema,
};

module.exports = {
  Contact,
  schemas,
};
