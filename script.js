// Отображение даты и времени на главной странице
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        datetimeElement.textContent = now.toLocaleDateString('ru-RU', options);
    }
}

// Модальное окно для изображений
function initializeImageModal() {
    // Получаем модальное окно
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("modalCaption");
    const closeBtn = document.querySelector(".close-modal");
    
    // Если элементов нет - выходим
    if (!modal || !modalImg) {
        console.log("Модальное окно не найдено");
        return;
    }
    
    // Обработчик для всех кликабельных изображений
    const images = document.querySelectorAll('.clickable-image img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            console.log("Клик по изображению:", this.src);
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            
            // Блокируем прокрутку страницы
            document.body.style.overflow = "hidden";
        });
    });
    
    // Закрытие по крестику
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }
    
    // Закрытие по клику вне изображения
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
}

// Обработчик формы регистрации
function initializeRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            const services = formData.getAll('services');
            
            // Создаем HTML для отображения результатов
            const resultHTML = `
                <h2>Регистрация успешно завершена!</h2>
                <div class="registration-data">
                    <p><strong>ФИО:</strong> ${data.fullName}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Телефон:</strong> ${data.phone}</p>
                    <p><strong>Пол:</strong> ${data.gender === 'male' ? 'Мужской' : 'Женский'}</p>
                    <p><strong>Страна:</strong> ${getCountryName(data.country)}</p>
                    <p><strong>Услуги:</strong> ${services.map(getServiceName).join(', ')}</p>
                    <p><strong>Комментарии:</strong> ${data.comments || 'Нет комментариев'}</p>
                </div>
            `;
            
            document.getElementById('registrationResult').innerHTML = resultHTML;
            registrationForm.reset();
        });
    }
    
    // Обработчик кнопки "Вход"
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('Функция входа будет реализована в ближайшее время');
        });
    }
}

// Обработчик формы обратной связи
function initializeFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Валидация
            if (!data.agreement) {
                showFeedbackResult('Необходимо согласие на обработку персональных данных', 'error');
                return;
            }
            
            // Создаем HTML для отображения результатов
            const resultHTML = `
                <h3>Сообщение отправлено!</h3>
                <div class="feedback-data">
                    <p><strong>Имя:</strong> ${data.contactName}</p>
                    <p><strong>Email:</strong> ${data.contactEmail}</p>
                    <p><strong>Телефон:</strong> ${data.contactPhone || 'Не указан'}</p>
                    <p><strong>Тема:</strong> ${getSubjectName(data.subject)}</p>
                    <p><strong>Сообщение:</strong> ${data.message}</p>
                    <p><strong>Рассылка:</strong> ${data.newsletter ? 'Подписан' : 'Не подписан'}</p>
                </div>
                <p>Мы свяжемся с вами в ближайшее время.</p>
            `;
            
            showFeedbackResult(resultHTML, 'success');
            feedbackForm.reset();
        });
    }
}

// Вспомогательные функции
function getCountryName(code) {
    const countries = {
        'ru': 'Россия',
        'kz': 'Казахстан',
        'by': 'Беларусь'
    };
    return countries[code] || code;
}

function getServiceName(code) {
    const services = {
        'spa': 'SPA',
        'breakfast': 'Завтрак',
        'parking': 'Парковка'
    };
    return services[code] || code;
}

function getSubjectName(code) {
    const subjects = {
        'booking': 'Бронирование номера',
        'question': 'Общий вопрос',
        'complaint': 'Жалоба',
        'suggestion': 'Предложение',
        'cooperation': 'Сотрудничество'
    };
    return subjects[code] || code;
}

function showFeedbackResult(message, type) {
    const resultElement = document.getElementById('feedbackResult');
    if (!resultElement) return;

    // Удаляем предыдущие состояния
    resultElement.classList.remove('success', 'error');
    resultElement.innerHTML = '';

    // Добавляем нужный класс
    if (type === 'error') {
        resultElement.classList.add('error');
    } else {
        resultElement.classList.add('success');
    }

    // Показываем сообщение (включая HTML)
    resultElement.innerHTML = message;
    resultElement.style.display = 'block';

    // Автоматически скрываем через 10 секунд
    setTimeout(() => {
        resultElement.classList.remove('success', 'error');
        resultElement.innerHTML = '';
        resultElement.style.display = 'none';
    }, 10000);
}


// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM загружен, инициализируем функции...");
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    initializeImageModal();
    initializeRegistrationForm();
    initializeFeedbackForm();
    
    console.log("Все функции инициализированы");
});