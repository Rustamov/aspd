# aspd

* [Установка зависимостей и запуск](readme/install-and-start.md)

Для валидации формы используется плагин  https://parsleyjs.org/

Если аяксом отправлятся форма то можно написать такой код:
```
$('body').on('submit', 'form', function(e) {
    e.preventDefault();
    let form = $(this);

    // code for ajax

    // после успешной отправки добавляем класс форме is-form-sent
    form.addClass('is-form-sent');
});
```

