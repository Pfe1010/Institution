// آموزشگاه کنکور اوج — اسکریپت مشترک صفحات
document.addEventListener("DOMContentLoaded", function () {

  /* منوی موبایل */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  /* فعال کردن لینک صفحه جاری در منو */
  var current = document.body.getAttribute("data-page");
  if (current) {
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      if (a.getAttribute("data-nav") === current) a.classList.add("active");
    });
  }

  /* فیلتر تب دوره‌ها (صفحه courses.html) */
  var tabs = document.querySelectorAll(".tab-btn");
  var cards = document.querySelectorAll("[data-group]");
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var group = tab.getAttribute("data-tab");
        cards.forEach(function (card) {
          var show = group === "all" || card.getAttribute("data-group") === group;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* شمارنده آمار در هدر (شمارش تا عدد هدف هنگام ورود به دید) */
  var stats = document.querySelectorAll("[data-count]");
  if (stats.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        var current = 0;
        var step = Math.max(1, Math.round(target / 40));
        var timer = setInterval(function () {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current.toLocaleString("fa-IR") + suffix;
        }, 25);
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });
    stats.forEach(function (el) { observer.observe(el); });
  }

  /* فرم تماس با ما — اعتبارسنجی ساده سمت کلاینت (دمو، بدون بک‌اند) */
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        if (!input.value.trim()) {
          field.classList.add("invalid");
          ok = false;
        } else {
          field.classList.remove("invalid");
        }
      });
      var emailInput = form.querySelector("#email");
      if (emailInput && emailInput.value && !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
        emailInput.closest(".field").classList.add("invalid");
        ok = false;
      }
      var successBox = document.querySelector("#form-success");
      if (ok) {
        form.reset();
        if (successBox) successBox.classList.add("show");
      } else if (successBox) {
        successBox.classList.remove("show");
      }
    });
  }
});
