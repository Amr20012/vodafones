// دالة لحساب التكلفة بناءً على قيمة الرصيد
function calculateCost(amount) {
    const prices = {
        50: 60,
        100: 125,
        200: 250,
        300: 370,
        400: 490,
        500: 610
    };
    return prices[amount] || (amount * 1.22).toFixed(2);
}

// تحديث حقل التكلفة تلقائيًا
const amountInput = document.getElementById('amount');
const costInput = document.getElementById('cost');

amountInput.addEventListener('input', function() {
    const amount = parseFloat(this.value);
    if (!isNaN(amount)) {
        costInput.value = calculateCost(amount) + ' جنيه';
    } else {
        costInput.value = '';
    }
});

// إرسال الطلب عبر Telegram مع السكرين شوت
document.getElementById('rechargeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    // جمع بيانات النموذج
    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value;
    const cost = document.getElementById('cost').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const receiptInput = document.getElementById('receipt');
    const receiptFile = receiptInput.files[0];

    // التحقق من رقم التليفون
    const phonePattern = /^01[0-2][0-9]{8}$/;
    if (!phonePattern.test(phone)) {
        alert('برجاء إدخال رقم تليفون صحيح (11 رقم يبدأ بـ 010، 011، أو 012)');
        return;
    }

    // التحقق من قيمة الرصيد
    if (!amount) {
        alert('برجاء إدخال قيمة رصيد.');
        return;
    }

    // التحقق من طريقة الدفع
    if (!paymentMethod) {
        alert('برجاء اختيار طريقة الدفع.');
        return;
    }

    // التحقق من السكرين شوت
    if (!receiptFile) {
        alert('برجاء رفع سكرين شوت الدفع.');
        return;
    }

    // إظهار مؤشر التحميل
    document.getElementById('loading').style.display = 'block';

    // إنشاء رسالة الإشعار
    const message = `طلب شحن جديد:\nرقم التليفون: ${phone}\nقيمة الرصيد: ${amount} جنيه\nالتكلفة: ${cost}\nطريقة الدفع: ${paymentMethod === 'VodafoneCash' ? 'فودافون كاش' : 'إنستاباي'}`;

    // إرسال الصورة والرسالة إلى Telegram
    const formData = new FormData();
    formData.append('chat_id', '6565721230');
    formData.append('caption', message);
    formData.append('photo', receiptFile);

    fetch(`https://api.telegram.org/bot7458022114:AAFtM8-YFwUmntW3ixv8bDD3eoYREu3JpvA/sendPhoto`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('loading').style.display = 'none';
        if (data.ok) {
            // إظهار رسالة التأكيد
            document.getElementById('confirmation').style.display = 'block';
            document.getElementById('rechargeForm').reset();
            document.getElementById('cost').value = '';
        } else {
            alert('حدث خطأ، حاول مرة أخرى!');
            console.log('Error:', data);
        }
    })
    .catch(error => {
        document.getElementById('loading').style.display = 'none';
        alert('حدث خطأ، حاول مرة أخرى!');
        console.log('Error:', error);
    });
    particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4 },
        move: { enable: true, speed: 6 }
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' }
        }
    }
});
});