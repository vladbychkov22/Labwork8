// 1. Реалізуйте клас Person з полями для імені, прізвища, статі та сімейного становища.
// Реалізуйте метод toLocaleString для форматування імені, наприклад, 'Ms. Smith', 'Frau
// Smith', 'Mme Smith'. Дізнайтесь, які форми ввічливості прийняті у різних мовах, і реалізуйти
// такі варіанти як Ms. або Mrs./Miss.

class Person {
  constructor(firstName, lastName, gender, maritalStatus) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.maritalStatus = maritalStatus;
  }

  toLocaleString() {
    let title;
    if (this.gender === 'male') {
      title = 'Mr.';
    } else if (this.maritalStatus === 'married') {
      title = 'Mrs.';
    } else if (this.maritalStatus === 'single') {
      title = 'Miss';
    } else {
      title = 'Ms.';
    }
    return `${title} ${this.lastName}`;
  }
}

const person1 = new Person('John', 'Smith', 'male', 'married');
console.log(person1.toLocaleString()); // "Mr. Smith"

const person2 = new Person('Mary', 'Jones', 'female', 'single');
console.log(person2.toLocaleString()); // "Miss Jones"

const person3 = new Person('Anna', 'Miller', 'female', 'divorced');
console.log(person3.toLocaleString()); // "Ms. Miller"


// 2. Руалізуйте програму яка приймає число та друкує його у трьох версіях - англійських,
// арабських та тайських цифр. 

function printNumberInDifferentLanguages(number) {
  const digits = {
    0: ['٠', 'zero', '๐'],
    1: ['١', 'one', '๑'],
    2: ['٢', 'two', '๒'],
    3: ['٣', 'three', '๓'],
    4: ['٤', 'four', '๔'],
    5: ['٥', 'five', '๕'],
    6: ['٦', 'six', '๖'],
    7: ['٧', 'seven', '๗'],
    8: ['٨', 'eight', '๘'],
    9: ['٩', 'nine', '๙'],
  };

  const arabicNumber = number.toString().split('').map(digit => digits[digit][0]).join('');
  const englishNumber = number.toString().split('').map(digit => digits[digit][1]).join(' ');
  const thaiNumber = number.toString().split('').map(digit => digits[digit][2]).join('');

  console.log(`Arabic: ${arabicNumber}`);
  console.log(`English: ${englishNumber}`);
  console.log(`Thai: ${thaiNumber}`);
}

printNumberInDifferentLanguages(123); // Output: Arabic: ١٢٣, English: one two three, Thai: ๑๒๓


// 3. Напишіть програму для демонстрації стилів форматування дати та часу у Франції, Китаї,
// Єгипті та Таїланді (з використанням тайських цифр).

const date = new Date();

// Франція
console.log(new Intl.DateTimeFormat('fr-FR').format(date));

// Китай
console.log(new Intl.DateTimeFormat('zh-CN-u-ca-chinese').format(date));

// Єгипет
console.log(new Intl.DateTimeFormat('ar-EG-u-ca-islamic').format(date));

// Таїланд
console.log(new Intl.DateTimeFormat('th-TH-u-nu-thai').format(date));


// 4. Напишіть функцію порівняння двох текстових фрагментів відповідно до локалі. Вона
// повинна працювати в режимах ігнорування та врахування регістру.

function compareTexts(text1, text2, locale) {
  return text1.localeCompare(text2, locale, { sensitivity: 'case' });
}

console.log(compareTexts('Apple', 'apple', 'en-US')); // 1
console.log(compareTexts('apple', 'Apple', 'en-US')); // -1
console.log(compareTexts('Apple', 'apple', 'tr-TR')); // -1

function compareTextsIgnoreCase(text1, text2, locale) {
  return text1.localeCompare(text2, locale, { sensitivity: 'accent', caseFirst: 'false' });
}

console.log(compareTextsIgnoreCase('Apple', 'apple', 'en-US')); // 0
console.log(compareTextsIgnoreCase('apple', 'Apple', 'en-US')); // 0
console.log(compareTextsIgnoreCase('Apple', 'apple', 'tr-TR')); // 0


// 5. Розглянемо шаблон '{0} has {1} messages'.Його французька версія повинна мати вигляд 'Il y
// a {1} messages pour {0}'. При форматуванні повідомлення аргументи передаються у
// фіксованому порядку, що не залежить від мови. Напишіть функцію messageFormat, яка
// приймає шаблонний рядок та змінну кількість аргументів. Придумайте механізм який
// виставлятиме аргументи в шаблон відповідно до локалі.

function messageFormat(template, ...args) {
  // регулярний вираз для пошуку номерів позицій аргументів у шаблонному рядку
  const regex = /\{(\d+)\}/g;
  
  // заміна номерів позицій аргументів на їх значення у шаблонному рядку
  const formatted = template.replace(regex, (match, p1) => args[p1]);
  
  return formatted;
}

const message = messageFormat('{0} has {1} messages', 'John', 5);
console.log(message); // 'John has 5 messages'

const messageFr = messageFormat('Il y a {1} messages pour {0}', 'Jean', 5);
console.log(messageFr); // 'Il y a 5 messages pour Jean'


// 6. Запропонуйте клас для відображення розмірів аркуша паперу, що залежить від локалі, з
// використанням бажаної одиниці вимірювання та розміру за умовчанням для даної локалі.
// У всіх країнах, окрім США та Канади, розміри аркушів паперу визначаються стандартом ISO
// 216. Лише три країни ще не перейшли офіційно на метричну систему: Ліберія, М'янма
// (Бірма) та США.

class PaperSize {
  constructor(locale) {
    this.locale = locale;
  }

  get defaultSize() {
    const units = this.isImperialLocale() ? 'in' : 'mm';
    return { width: 210, height: 297, units };
  }

  getSize(sizeName) {
    const size = this.getSizes()[sizeName];
    if (!size) {
      throw new Error(`Size ${sizeName} not found for locale ${this.locale}`);
    }
    return size;
  }

  getSizes() {
    const sizes = {
      A0: { width: 841, height: 1189 },
      A1: { width: 594, height: 841 },
      A2: { width: 420, height: 594 },
      A3: { width: 297, height: 420 },
      A4: { width: 210, height: 297 },
      A5: { width: 148, height: 210 },
      A6: { width: 105, height: 148 },
      A7: { width: 74, height: 105 },
      A8: { width: 52, height: 74 },
      A9: { width: 37, height: 52 },
      A10: { width: 26, height: 37 },
    };

    return sizes;
  }

  isImperialLocale() {
    return ['US', 'LR', 'MM'].includes(this.locale.toUpperCase());
  }
}

// Приклад використання
const paperSize = new PaperSize('en-US');
console.log(paperSize.defaultSize); // { width: 8.27, height: 11.69, units: 'in' }
console.log(paperSize.getSize('A4')); // { width: 210, height: 297 }