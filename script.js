let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function showSection(sectionId) {
    let sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    if (sectionId === 'favorite') {
        displayFavorites();
    }
    document.getElementById('sidebar').classList.remove('active');
}

// تبديل بين الوضع الداكن والفاتح من القائمة الجانبية
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i> تبديل الوضع الليلي' : '<i class="fas fa-moon"></i> تبديل الوضع الليلي';
    localStorage.setItem('darkMode', isDarkMode);
});

// تحميل الوضع السابق عند تحميل الصفحة
window.onload = function() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> تبديل الوضع الليلي';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> تبديل الوضع الليلي';
    }
    const savedTheme = localStorage.getItem('theme') || 'default';
    changeTheme(savedTheme);
};

// إدارة أيقونة الهامبرغر
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
hamburger.addEventListener("click", () => {
    sidebar.classList.add('active');
});

// إغلاق القائمة الجانبية عند النقر على زر الإغلاق
function closeSidebar() {
    sidebar.classList.remove('active');
}

// إغلاق القائمة الجانبية عند النقر خارجها
document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && event.target !== hamburger) {
        sidebar.classList.remove('active');
    }
});

// منع إخفاء القائمة الرئيسية عند النقر على الهامبرغر
hamburger.addEventListener('click', (event) => {
    event.stopPropagation();
});

// وظائف الإعدادات
function contactUs() {
    window.open('https://Basitapp.blogspot.com', '_blank');
}

function rateApp() {
    alert("شكرًا لتقييمك! يرجى تقييم التطبيق في المتجر.");
}

function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'حكم من نور',
            text: 'جرب تطبيق حكم من نور المميز!',
            url: window.location.href
        }).catch(error => console.log('خطأ في المشاركة:', error));
    } else {
        alert('شارك الرابط: ' + window.location.href);
    }
}

function notifications() {
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            showNotification("تم تفعيل الإشعارات!", "ستتلقى تذكيرات وتحديثات جديدة.");
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    showNotification("تم تفعيل الإشعارات!", "ستتلقى تذكيرات وتحديثات جديدة.");
                    setInterval(() => {
                        showNotification("تذكير يومي", "تأمل في حكمة اليوم: الصبر مفتاح الفرج.");
                    }, 60000);
                }
            });
        } else {
            alert("تم رفض الإشعارات. يرجى تفعيلها يدويًا من إعدادات المتصفح.");
        }
    } else {
        alert("المتصفح لا يدعم الإشعارات.");
    }
}

function checkUpdate() {
    alert("التطبيق محدث إلى الإصدار 1.0.0. تحقق من GitHub لتحميل الإصدار الأحدث إذا كان متاحاً!");
}

// وظيفة البحث
function searchContent() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const sections = document.querySelectorAll('.content');

    if (searchTerm === '') {
        return;
    }

    sections.forEach(section => {
        const text = section.innerText.toLowerCase();
        if (text.includes(searchTerm)) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    if (!document.querySelector('.content.active')) {
        document.getElementById('home').classList.add('active');
    }
}

// تغيير الألوان
function changeTheme(theme) {
    const body = document.body;
    body.classList.remove('theme-default', 'theme-green', 'theme-purple', 'theme-gray');

    switch (theme) {
        case 'green':
            body.classList.add('theme-green');
            localStorage.setItem('theme', 'green');
            break;
        case 'purple':
            body.classList.add('theme-purple');
            localStorage.setItem('theme', 'purple');
            break;
        case 'gray':
            body.classList.add('theme-gray');
            localStorage.setItem('theme', 'gray');
            break;
        default:
            body.classList.add('theme-default');
            localStorage.setItem('theme', 'default');
    }
}

// وظائف الميزات تحت كل عنصر
function copyText(element) {
    const text = element.textContent || element.innerText;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert('تم نسخ النص بنجاح: ' + text);
        }).catch(err => {
            console.error('فشل في النسخ:', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert('تم نسخ النص بنجاح: ' + text);
    } catch (err) {
        alert('فشل في النسخ، حاول مرة أخرى: ' + err);
    }
    document.body.removeChild(textArea);
}

function shareText(element) {
    const text = element.textContent || element.innerText;
    if (navigator.share) {
        navigator.share({
            title: 'نص من حكم من نور',
            text: text
        }).catch(error => console.log('خطأ في المشاركة:', error));
    } else {
        alert('النص جاهز للمشاركة: ' + text);
    }
}

function whatsappShare(element) {
    const text = element.textContent || element.innerText;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}

function addToFavorites(element) {
    const text = element.textContent || element.innerText;
    if (!favorites.includes(text)) {
        favorites.push(text);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('تمت إضافة العنصر إلى المفضلة!');
        displayFavorites();
    } else {
        alert('هذا العنصر موجود بالفعل في المفضلة!');
    }
}

function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';
    favorites.forEach(fav => {
        const div = document.createElement('div');
        div.className = 'item-container';
        div.innerHTML = `
            <p>${fav}</p>
            <div class="item-actions">
                <button onclick="copyText(this.parentElement.previousElementSibling)"><i class="fas fa-copy"></i></button>
                <button onclick="shareText(this.parentElement.previousElementSibling)"><i class="fas fa-share"></i></button>
                <button onclick="whatsappShare(this.parentElement.previousElementSibling)"><i class="fab fa-whatsapp"></i></button>
                <button onclick="addToFavorites(this.parentElement.previousElementSibling)"><i class="fas fa-heart"></i></button>
                <button onclick="removeFromFavorites(this.parentElement.previousElementSibling)"><i class="fas fa-trash"></i></button>
            </div>
        `;
        favoritesList.appendChild(div);
    });
}

function removeFromFavorites(element) {
    const text = element.textContent || element.innerText;
    favorites = favorites.filter(fav => fav !== text);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
    alert('تم حذف العنصر من المفضلة!');
}

// وظيفة عرض الإشعارات
function showNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: body,
            icon: 'icon.png'
        });
    }
}

// وظائف الزخرفة
function decorateText() {
    const input = document.getElementById('decorationInput').value;
    const decorated = decorateArabicText(input);
    document.getElementById('decoratedOutput').innerText = decorated;
}

function decorateArabicText(text) {
    const decorations = [
        "✨", "🌸", "💫", "🌟", "🎉", "❤️", "🌹", "💖", "🌷", "⭐"
    ];
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += text[i] + (decorations[Math.floor(Math.random() * decorations.length)]);
    }
    return result;
}

function convertToImage() {
    const output = document.getElementById('decoratedOutput').innerText;
    if (output) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 200;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(output, canvas.width / 2, canvas.height / 2);
        const link = document.createElement('a');
        link.download = 'decorated_text.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    } else {
        alert('أدخل نصاً للزخرفة أولاً!');
    }
}