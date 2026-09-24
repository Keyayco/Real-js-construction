const WHATSAPP = "27641463161";
const wa = t => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;

document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = wa("Hi, I found your website and would like to enquire about your services.");
  a.target = "_blank"; a.rel = "noopener";
});

const btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
btn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", e => {
  if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
});

const links = [...nav.querySelectorAll('a[href^="#"]')];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.hash === "#" + e.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
links.forEach(l => { const s = document.querySelector(l.hash); if (s) io.observe(s); });

document.getElementById("enquiry").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, err = document.getElementById("err");
  const name = f.name.value.trim(), job = f.type.value.trim(), where = f.where.value.trim();
  err.hidden = !!(name && job);
  if (err.hidden === false) return;
  const msg = `Hi, my name is ${name}. I'd like to enquire about: ${job}.` + (where ? ` Site location: ${where}.` : "");
  window.open(wa(msg), "_blank", "noopener");
});
document.getElementById("yr").textContent = new Date().getFullYear();
