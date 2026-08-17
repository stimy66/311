// بيانات المطعم والقائمة (عربية)
// حدد هنا رقم واتساب المطعم بالصيغة الدولية (مثال: "213XXXXXXXXX")
let restaurantPhone = "213798526084"; // <-- رقم واتساب مطعم 311

// بيانات الأصناف مع الأسعار الأساسية
const menuData = {
  "burger-simple": {
    id: "burger-simple",
    name: "برغر عادي",
    basePrice: 800, // سعر الحجم العادي
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80",
    desc: "شريحة لحم مشوية على الفحم مع الخضار الطازجة والصلصة الخاصة - النكهة الكلاسيكية الأصيلة."
  },
  "burger-double": {
    id: "burger-double",
    name: "برغر دوبل فرماج",
    basePrice: 1100,
    image: "https://images.unsplash.com/photo-1606755962770-0b15f73f8a91?auto=format&fit=crop&w=1600&q=80",
    desc: "طبقتان غنيتان من الجبن المذاب الفاخر فوق شريحة اللحم المتبلة - تجربة غنية لعشاق الجبن."
  },

  // Pizzas - base price corresponds to small
  "pizza-sample": {
    id: "pizza-sample",
    name: "بيتزا سامبل",
    prices: { "صغير": 700, "متوسط": 1000, "كبير": 1300 },
    image: "https://images.unsplash.com/photo-1601924638867-3ec6d8a5a7a9?auto=format&fit=crop&w=1600&q=80",
    desc: "عجينة هشة مع صلصة الطماطم الفاخرة وجبن الموزاريلا والريحان - البساطة في أبهى صورها."
  },
  "pizza-3cheese": {
    id: "pizza-3cheese",
    name: "بيتزا 3 فرماج",
    prices: { "صغير": 800, "متوسط": 1100, "كبير": 1400 },
    image: "https://images.unsplash.com/photo-1603079849310-3bd6f9e3f6a9?auto=format&fit=crop&w=1600&q=80",
    desc: "مزيج غني من ثلاثة أجبان فاخرة مذابة حتى العصر الذهبي."
  },
  "pizza-tuna": {
    id: "pizza-tuna",
    name: "بيتزا بالطون",
    prices: { "صغير": 850, "متوسط": 1150, "كبير": 1450 },
    image: "https://images.unsplash.com/photo-1612874742689-9fb2a5b77d56?auto=format&fit=crop&w=1600&q=80",
    desc: "قطع التونة الفاخرة مع الزيتون الأسود والصلصة الخاصة."
  },
  "pizza-meat": {
    id: "pizza-meat",
    name: "بيتزا باللحم",
    prices: { "صغير": 900, "متوسط": 1200, "كبير": 1500 },
    image: "https://images.unsplash.com/photo-1601924582975-1dfc62d7f4b6?auto=format&fit=crop&w=1600&q=80",
    desc: "مفروم اللحم المتبل بالأعشاب الطبيعية مع الفلفل والأجبان."
  },
  "pizza-chicken": {
    id: "pizza-chicken",
    name: "بيتزا بالدجاج",
    prices: { "صغير": 900, "متوسط": 1200, "كبير": 1500 },
    image: "https://images.unsplash.com/photo-1604908177522-3f4b77d8a3f5?auto=format&fit=crop&w=1600&q=80",
    desc: "شرائح صدر الدجاج المتبل والمشوي بعناية مع التوابل الخاصة."
  },

  // Drinks
  "drink-coke": {
    id: "drink-coke",
    name: "كوكاكولا",
    basePrice: 200,
    image: "https://images.unsplash.com/photo-1568759897976-8f15ad6d56c3?auto=format&fit=crop&w=1400&q=80",
    desc: "مشروب غازي بارد ومنعش."
  },
  "drink-pepsi": {
    id: "drink-pepsi",
    name: "بيبسي",
    basePrice: 200,
    image: "https://images.unsplash.com/photo-1602333566476-0a9e76ec4d41?auto=format&fit=crop&w=1400&q=80",
    desc: "طعم منعش ومفضل لدى الجميع."
  },
  "drink-hamoud": {
    id: "drink-hamoud",
    name: "حمود بوعلام",
    basePrice: 250,
    image: "https://images.unsplash.com/photo-1606312618020-9d7fe3c8b8a4?auto=format&fit=crop&w=1400&q=80",
    desc: "مشروب غازي جزائري تقليدي ومنعش."
  }
};

// رسوم توصيل افتراضية (يمكن تعديلها)
const DELIVERY_FEE = 200;

// سلة الطلبات
let cart = [];

// عناصر DOM
const cartItemsEl = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const grandTotalEl = document.getElementById('grand-total');
const deliveryFeeEl = document.getElementById('delivery-fee');
const openCheckoutBtn = document.getElementById('open-checkout');
const clearCartBtn = document.getElementById('clear-cart');
const scrollMenuBtn = document.getElementById('scroll-menu');
const confirmWhatsappBtn = document.getElementById('confirm-whatsapp');
const toastEl = document.getElementById('toast');

// عناصر Drawer للسلة
const drawerEl = document.getElementById('cart-drawer');
const drawerOverlay = document.getElementById('cart-drawer-overlay');
const openDrawerBtn = document.getElementById('open-drawer');
const closeDrawerBtn = document.getElementById('close-drawer');
const drawerItemsEl = document.getElementById('drawer-cart-items');
const drawerSubtotalEl = document.getElementById('drawer-subtotal');
const drawerDeliveryEl = document.getElementById('drawer-delivery-fee');
const drawerGrandEl = document.getElementById('drawer-grand-total');
const drawerCheckoutBtn = document.getElementById('drawer-checkout');

// حفظ واستعادة من localStorage (اختياري)
function saveCart() {
  localStorage.setItem('restaurant311_cart', JSON.stringify(cart));
}
function loadCart() {
  const data = localStorage.getItem('restaurant311_cart');
  if (data) {
    cart = JSON.parse(data);
  }
}

// تنسيق العملة
function formatPrice(n) {
  return n.toLocaleString('ar-EG') + ' د.ج';
}

// حساب المجموعات
function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const total = subtotal + (cart.length ? DELIVERY_FEE : 0);
  subtotalEl.textContent = formatPrice(subtotal);
  deliveryFeeEl.textContent = cart.length ? formatPrice(DELIVERY_FEE) : '0 د.ج';
  grandTotalEl.textContent = formatPrice(total);
  return { subtotal, delivery: cart.length ? DELIVERY_FEE : 0, total };
}

// إعادة عرض السلة
function renderCart() {
  cartItemsEl.innerHTML = '';
  if (drawerItemsEl) drawerItemsEl.innerHTML = '';

  if (cart.length === 0) {
    const emptyMsg = '<p class="text-gray-400">لا توجد عناصر في السلة بعد. أضف بعض الأطباق اللذيذة!</p>';
    cartItemsEl.innerHTML = emptyMsg;
    if (drawerItemsEl) drawerItemsEl.innerHTML = emptyMsg;
    calculateTotals();
    saveCart();
    return;
  }

  cart.forEach((it, idx) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'flex items-center gap-3 p-3 bg-[#071829] rounded border border-gray-800';
    itemEl.innerHTML = `
      <img src="${it.image}" alt="${it.name}" class="w-16 h-16 object-cover rounded">
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-semibold">${it.name}</div>
            <div class="text-sm text-gray-400">${it.size ? 'الحجم: ' + it.size : ''}</div>
          </div>
          <div class="text-amber-400 font-bold">${formatPrice(it.price * it.qty)}</div>
        </div>
        <div class="mt-2 flex items-center gap-2">
          <button data-idx="${idx}" class="dec-qty px-2 py-1 bg-gray-800 rounded">-</button>
          <div class="px-3 py-1 border border-gray-700 rounded">${it.qty}</div>
          <button data-idx="${idx}" class="inc-qty px-2 py-1 bg-gray-800 rounded">+</button>
          <button data-idx="${idx}" class="remove-item ml-auto text-sm text-red-400">إزالة</button>
        </div>
      </div>
    `;
    cartItemsEl.appendChild(itemEl);

    // also add to drawer if present
    if (drawerItemsEl) {
      const dEl = document.createElement('div');
      dEl.className = 'flex items-center gap-3 p-3 bg-[#071829] rounded border border-gray-800';
      dEl.innerHTML = `
        <img src="${it.image}" alt="${it.name}" class="w-14 h-14 object-cover rounded">
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-semibold">${it.name}</div>
              <div class="text-sm text-gray-400">${it.size ? 'الحجم: ' + it.size : ''}</div>
            </div>
            <div class="text-amber-400 font-bold">${formatPrice(it.price * it.qty)}</div>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <button data-idx="${idx}" class="dec-qty px-2 py-1 bg-gray-800 rounded">-</button>
            <div class="px-3 py-1 border border-gray-700 rounded">${it.qty}</div>
            <button data-idx="${idx}" class="inc-qty px-2 py-1 bg-gray-800 rounded">+</button>
            <button data-idx="${idx}" class="remove-item ml-auto text-sm text-red-400">إزالة</button>
          </div>
        </div>
      `;
      drawerItemsEl.appendChild(dEl);
    }
  });

  // Attach handlers (works for both cart area and drawer because buttons share classes)
  document.querySelectorAll('.inc-qty').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = +e.currentTarget.dataset.idx;
      cart[idx].qty += 1;
      renderCart();
      saveCart();
    });
  });
  document.querySelectorAll('.dec-qty').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = +e.currentTarget.dataset.idx;
      if (cart[idx].qty > 1) cart[idx].qty -= 1;
      else cart.splice(idx,1);
      renderCart();
      saveCart();
    });
  });
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = +e.currentTarget.dataset.idx;
      cart.splice(idx,1);
      renderCart();
      saveCart();
    });
  });

  const totals = calculateTotals();
  // update drawer totals if present
  if (drawerSubtotalEl) drawerSubtotalEl.textContent = formatPrice(totals.subtotal);
  if (drawerDeliveryEl) drawerDeliveryEl.textContent = cart.length ? formatPrice(DELIVERY_FEE) : '0 د.ج';
  if (drawerGrandEl) drawerGrandEl.textContent = formatPrice(totals.total);

  saveCart();
}

// إضافة صنف إلى السلة
function addToCart(itemId, size = null) {
  const meta = menuData[itemId];
  if (!meta) return;
  // حدد سعر حسب الحجم
  let price = 0;
  if (meta.prices) {
    price = meta.prices[size || Object.keys(meta.prices)[0]];
  } else {
    price = meta.basePrice;
    // إذا كان هناك حجم 'كبير' يضيف تكلفة
    if (size === 'كبير' && itemId.startsWith('burger')) {
      // قيمة إضافية معرّفة في الواجهة: نستخدم زيادة ثابتة أو قمت بتحديد السعر في الزر
      // افتراض زيادة 200 أو 300 حسب العنصر (في الواجهة أعلاه قمت بتحديد نصي لتوضيح)
      if (itemId === 'burger-simple') price += 200;
      else if (itemId === 'burger-double') price += 300;
    }
  }

  // تحقق إذا كان نفس العنصر(بالحجم نفسه) موجودًا فزد الكمية
  const existing = cart.find(c => c.id === itemId && c.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: itemId,
      name: meta.name,
      size: size,
      price: price,
      qty: 1,
      image: meta.image
    });
  }
  renderCart();
  showToast('تمت إضافة العنصر إلى السلة');
}

// أحداث أزرار الإضافة (من الزر "أضف")
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const id = btn.dataset.id;
    // إيجاد select المقابل
    const sel = document.querySelector('.size-select[data-item-id="' + id + '"]');
    let size = sel ? sel.value : null;
    // تحويل قيم الحجم من النص العربي المستخدم في الواجهة
    addToCart(id, size);
  });
});

// مشروبات (أزرار مخصصة)
document.querySelectorAll('.add-drink').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const id = btn.dataset.id;
    addToCart(id, null);
  });
});

// تنظيف السلة
clearCartBtn.addEventListener('click', () => {
  if (!confirm('هل تريد فعلاً تفريغ السلة؟')) return;
  cart = [];
  renderCart();
  saveCart();
});

// تمرير للقائمة
scrollMenuBtn.addEventListener('click', () => {
  document.getElementById('menu').scrollIntoView({behavior: 'smooth'});
});

// فتح قسم الدفع (تمرير)
openCheckoutBtn.addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
});

// Drawer open/close functions
function openDrawer() {
  if (!drawerEl || !drawerOverlay) return;
  drawerEl.classList.remove('translate-x-full');
  drawerEl.classList.add('translate-x-0');
  drawerOverlay.classList.remove('opacity-0','pointer-events-none');
  drawerOverlay.classList.add('opacity-100');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  if (!drawerEl || !drawerOverlay) return;
  drawerEl.classList.remove('translate-x-0');
  drawerEl.classList.add('translate-x-full');
  drawerOverlay.classList.add('opacity-0','pointer-events-none');
  drawerOverlay.classList.remove('opacity-100');
  document.body.style.overflow = '';
}

if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

// Intercept header/footer cart links to open drawer instead of jumping
document.querySelectorAll('a[href="#cart"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  });
});

// Drawer checkout button scrolls to contact and closes drawer
if (drawerCheckoutBtn) drawerCheckoutBtn.addEventListener('click', () => {
  closeDrawer();
  setTimeout(() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'}), 300);
});

// Smooth animations for menu cards (fade-in & scale)
function animateCards(selector) {
  const cards = document.querySelectorAll(selector);
  if (!cards || !cards.length) return;
  cards.forEach(c => {
    // start hidden
    c.classList.add('opacity-0','translate-y-4','scale-95');
  });
  // stagger reveal
  setTimeout(() => {
    cards.forEach((c, i) => {
      setTimeout(() => {
        c.classList.remove('opacity-0','translate-y-4','scale-95');
      }, i * 80);
    });
  }, 60);
}

// حفظ مؤقت (يحفظ الحقول الحالية)
document.getElementById('save-local').addEventListener('click', () => {
  const tmp = {
    name: document.getElementById('cust-name').value,
    phone: document.getElementById('cust-phone').value,
    address: document.getElementById('cust-address').value,
    notes: document.getElementById('cust-notes').value
  };
  localStorage.setItem('restaurant311_form', JSON.stringify(tmp));
  showToast('تم حفظ البيانات مؤقتاً في المتصفح');
});

// تحميل نموذج محفوظ
function loadForm() {
  const data = localStorage.getItem('restaurant311_form');
  if (data) {
    const obj = JSON.parse(data);
    document.getElementById('cust-name').value = obj.name || '';
    document.getElementById('cust-phone').value = obj.phone || '';
    document.getElementById('cust-address').value = obj.address || '';
    document.getElementById('cust-notes').value = obj.notes || '';
  }
}

// إنشاء رسالة واتساب بالصيغة المطلوبة وإطلاق رابط
confirmWhatsappBtn.addEventListener('click', () => {
  // تحقق من صحة الحقول
  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const address = document.getElementById('cust-address').value.trim();
  const notes = document.getElementById('cust-notes').value.trim();

  if (!name || !phone || !address) {
    alert('الرجاء تعبئة الحقول الأساسية: الاسم، رقم الهاتف، والعنوان داخل حاسي بحبح.');
    return;
  }
  if (cart.length === 0) {
    alert('السلة فارغة. الرجاء إضافة عناصر قبل تأكيد الطلب.');
    return;
  }

  // بناء نص الرسالة
  const totals = calculateTotals();
  let messageLines = [];
  messageLines.push('*طلب جديد - مطعم 311*');
  messageLines.push('');
  messageLines.push('--- معلومات العميل ---');
  messageLines.push('الاسم: ' + name);
  messageLines.push('الهاتف: ' + phone);
  messageLines.push('العنوان (حاسي بحبح): ' + address);
  if (notes) messageLines.push('ملاحظات: ' + notes);
  messageLines.push('');
  messageLines.push('--- الطلب ---');

  cart.forEach((it, idx) => {
    const line = `${idx+1}. ${it.name}${it.size ? ' - ' + it.size : ''} x${it.qty} — ${formatPrice(it.price * it.qty)}`;
    messageLines.push(line);
  });

  messageLines.push('');
  messageLines.push('المجموع الجزئي: ' + formatPrice(totals.subtotal));
  messageLines.push('رسوم التوصيل: ' + formatPrice(totals.delivery));
  messageLines.push('المجموع الكلي: ' + formatPrice(totals.total));
  messageLines.push('');
  messageLines.push('طريقة الدفع: الدفع عند الاستلام (نقداً عند الاستلام)');
  messageLines.push('');
  messageLines.push('يرجى تأكيد وقت التوصيل إن أمكن.');

  const message = messageLines.join('\n');
  const encoded = encodeURIComponent(message);

  // فتح واتساب
  const waUrl = `https://wa.me/${restaurantPhone}?text=${encoded}`;
  window.open(waUrl, '_blank');

  // بعد فتح الرابط: تفريغ السلة مع إشعار بسيط
  cart = [];
  renderCart();
  saveCart();
  showToast('تم تحويل الطلب إلى واتساب. شكراً لك!');
});

// إشعار (toast)
function showToast(text) {
  toastEl.querySelector('div').textContent = text;
  toastEl.classList.remove('hidden');
  setTimeout(() => {
    toastEl.classList.add('hidden');
  }, 3500);
}

// فور التحميل: استعادة السلة والنموذج
window.addEventListener('DOMContentLoaded', () => {
  loadCart();
  loadForm();
  renderCart();
  // animate menu cards on load
  animateCards('.menu-card');
  // animate section cards when navigating via anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href === '#' ) return;
    a.addEventListener('click', () => {
      const id = href.replace('#','');
      setTimeout(() => animateCards('#' + id + ' .menu-card'), 250);
    });
  });
});

// اختياري: تعامل جميل مع إضافة عناصر من الواجهة بواسطة Enter أو اختصارات
// (لا حاجة حالياً)
