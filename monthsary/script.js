const START_DATE = new Date(2026, 0, 28, 0, 0, 0);
const PARTNER_NAME = "Leomary";
const $ = (selector) => document.querySelector(selector);

function ordinal(n) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}

function completedMonths(start, now) {
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  return Math.max(0, months);
}

function updateCounter() {
  const now = new Date();
  const diff = Math.max(0, now - START_DATE);
  const totalDays = Math.floor(diff / 86_400_000);
  const months = completedMonths(START_DATE, now);

  const monthAnchor = new Date(START_DATE);
  monthAnchor.setMonth(monthAnchor.getMonth() + months);
  const daysAfterMonths = Math.max(0, Math.floor((now - monthAnchor) / 86_400_000));
  const hoursAfterDays = Math.max(0, Math.floor((now - monthAnchor - daysAfterMonths * 86_400_000) / 3_600_000));

  $("#countMonths").textContent = months;
  $("#countDays").textContent = daysAfterMonths;
  $("#countHours").textContent = hoursAfterDays;
  $("#daysTogether").textContent = `${totalDays.toLocaleString()} days and counting ♡`;

  const isMonthsary = now.getDate() === START_DATE.getDate();
  if (isMonthsary && months > 0) {
    $("#monthsaryHeadline").textContent = `Happy ${ordinal(months)} Monthsary, ${PARTNER_NAME}. Every month with you is another chapter I’m grateful for.`;
    $("#finalMessage").textContent = `Happy ${ordinal(months)} Monthsary, ${PARTNER_NAME}.`;
  } else {
    $("#monthsaryHeadline").textContent = "Every day with you is one more memory I want to keep.";
    $("#finalMessage").textContent = `For you, ${PARTNER_NAME}.`;
  }
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(item);
  });
}

function burstHearts(count = 22) {
  const layer = $("#heartLayer");
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.45 ? "♥" : "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--dur", `${3.4 + Math.random() * 2.6}s`);
    heart.style.setProperty("--drift", `${-55 + Math.random() * 110}px`);
    heart.style.animationDelay = `${Math.random() * .45}s`;
    heart.style.fontSize = `${13 + Math.random() * 17}px`;
    layer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }
}

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
  });
});

$("#surpriseBtn").addEventListener("click", () => {
  $("#surpriseText").classList.toggle("is-open");
  burstHearts(28);
  if (navigator.vibrate) navigator.vibrate([35, 25, 35]);
});

updateCounter();
setupReveal();
setInterval(updateCounter, 60_000);