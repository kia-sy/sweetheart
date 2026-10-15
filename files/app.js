// ===================== EDIT THIS PART =====================
const CONFIG = {
  name: "Jana",
  // the special date shown in the calendar (month 1-12)
  date: { year: 2026, month: 10, day: 15, message: "You found it! This is the day my favorite person was born 💖" },
  // put your own song in this folder and set src: "song.mp3". Empty = a little "Happy Birthday" tune is played.
  song: { title: "Pasilyo", artist: "SunKissed Lola", src: "SunKissed Lola - Pasilyo.mp3" },
  // as many letters as you like
  letters: [
    { icon: "💌", title: "Happy Birthday!", sign: "Yours always, King",
      text: "Hi {name},\n\nHappy birthday! Thank you for being the best part of my days.\n\nI know I said how grateful I am for you too many times, but I really want you to feel how appreciated you are by me. You’ve been making my days special; every moment with you is so magical. My world has become more colorful since you began to exist on my canvas.  I wish that our relationship will be full of smiles and love. Thank you for giving me the chance to be your boyfriend.\n\nNever forget to smile. Your smile is my favorite thing in this world." },
    { icon: "🌷", title: "Why I love you", sign: "Forever yours",
      text: "Dear {name},\n\nYou listen, you laugh at my silly jokes, and you make ordinary days feel special.\n\nI love how kind you are, even when you are tired. I love how you care. Your presence has so much meaning in my life, love. I don’t know where this admiration of mine started; maybe I admired your maturity from the first impression. Being with you is magical; you have this energy that makes everything light, the spark in your eyes that I can’t get enough of. I like you, Jana. I love the way your feelings reflect on your face; I love the way your eyes glow and sparkle when the sun hits them; I love the smile you make when you first see me every day, the smiles you make when you are shy, and how your legs move when you love the food we’re eating. I feel the need to protect those smiles and sparkles in your eyes. \n\nI'm so lucky it's you." },
    { icon: "🌿", title: "Open when you're sad", sign: "Always here, Me",
      text: "Hey {name},\n\nIf today is heavy, breathe. You are doing better than you think.\n\nI am proud of you, and I'm only a message away. Drink some water, hug a pillow, and remember that this will pass." },
    { icon: "🎂", title: "Wishes for 23", sign: "Will always be there with you",
      text: "{name},\n\nI wish you all the greatest things in life. I am so happy seeing how far you’ve come, and I will always be proud of everything you achieve. I hope the world pours its blessings onto you and guides you down the right paths. May you reach every goal your heart is set on and find deep fulfillment in all that you do. You are such a wonderful person, Jana. I know the world will give back every bit of the kindness you share with everyone around you. I love you so much.\n\nI'll be right here, celebrating every little victory." }
  ],
  // your pictures: src = file in the "photos" folder, e.g. "photos/us1.jpg". No src = a colorful placeholder.
  photos: [
    { src: "first meet.jpg", caption: "First Spontaneous Date" }, { src: "ehe.jpg", caption: "Statue" },
    { src: "magina.jpg", caption: "Mag ina ko" }, { src: "arena.jpg", caption: "Arena Era" }, { src: "baksyon.jpg", caption: "First 2026 Date" },
    { src: "prominade.jpg", caption: "Prominade Dates" }, { src: "first.jpg", caption: "Birthday with You" }, { src: "second.jpg", caption: "" },
    { src: "valentines.jpg", caption: "Valentines with You" }, { src: "magical.jpg", caption: "Kakilig Ackkkk" }, { src: "matching.jpg", caption: "Matching Top" },
    { src: "match.jpg", caption: "cutieeees" }, { src: "fav.jpg", caption: "ANG GANDAAAAAA!!!" }, { src: "hell nah.jpg", caption: "hell nawh" },
    { src: "asawa.jpg", caption: "Na Para Bang" }, { src: "HAHAHA.jpg", caption: "ANG CUTE NATIN HERE!" }, { src: "fawk.jpg", caption: "So Magical" },
    { src: "kathniel.jpg", caption: "Bagay shet" }, { src: "ulti.jpg", caption: "ULTI!" }, { src: "so pretty.jpg", caption: "So Pretty 💖" },
    { src: "iconic.jpg", caption: "iconic" }, { src: "my pretty.jpg", caption: "So GANDAAAA!" }, { src: "cute.jpg", caption: "cutieeee" },
    { src: "oo.jpg", caption: "Just WOW!!!" }, { src: "happy.jpg", caption: "HAPPY BIRTHDAY LOVE!" }
  ]
};
// ==========================================================

const $ = (s) => document.querySelector(s);
const modal = $("#modal"), title = $("#mTitle"), body = $("#mBody");
let cleanup = () => {};

// ---------- hearts + confetti ----------
function hearts(n = 30) {
  for (let i = 0; i < n; i++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = ["💖", "💗", "💚", "🌸"][i % 4];
    h.style.cssText = `left:${Math.random() * 100}%;font-size:${14 + Math.random() * 20}px;animation-duration:${4 + Math.random() * 4}s;animation-delay:${Math.random() * 2}s`;
    $("#hearts").appendChild(h);
    setTimeout(() => h.remove(), 10000);
  }
}
function confetti() {
  const colors = ["#f06fa4", "#ffd3e4", "#5fbf8a", "#bfe8cf", "#d6336c"];
  for (let i = 0; i < 50; i++) {
    const c = document.createElement("i");
    c.className = "confetti";
    c.style.cssText = `left:${Math.random() * 100}%;background:${colors[i % 5]};animation-delay:${Math.random() * .6}s;transform:rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }
}

// ---------- open / close ----------
function show(t, html) { title.innerHTML = t; body.innerHTML = html; modal.hidden = false; $("#close").focus(); }
function close() { cleanup(); cleanup = () => {}; modal.hidden = true; body.innerHTML = ""; }
$("#close").onclick = close;
modal.onclick = (e) => { if (e.target === modal) close(); };
document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

$("#open").onclick = () => { $("#start").hidden = true; $("#room").hidden = false; hearts(); };
const room = $("#room");
room.addEventListener("click", (e) => { const s = e.target.closest("[data-open]"); if (s) views[s.dataset.open](); });
room.addEventListener("keydown", (e) => {
  const s = e.target.closest("[data-open]");
  if (s && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); views[s.dataset.open](); }
});

// ---------- the five things in the room ----------
const views = {
  // ----- song -----
  song() {
    show("Song that reminds me of you 🎵", `<div class="song"><div class="disc" id="disc" title="Spin me"></div>
      <b>${CONFIG.song.title}</b><span>${CONFIG.song.artist}</span>
      <button class="btn" id="play">▶ Play Song</button>
      <p class="note">Spin the disc</p></div>`);
    let audio = null, ctx = null, on = false;
    const stop = () => { on = false; $("#disc") && $("#disc").classList.remove("spin"); if (audio) audio.pause(); if (ctx) { ctx.close(); ctx = null; } if ($("#play")) $("#play").textContent = "▶ Play Song"; };
    const start = () => {
      on = true; $("#disc").classList.add("spin"); $("#play").textContent = "❚❚ Pause";
      if (CONFIG.song.src) { audio = audio || new Audio(CONFIG.song.src); audio.play(); return; }
      ctx = new (window.AudioContext || window.webkitAudioContext)();       // no mp3 given: play "Happy Birthday"
      const hz = { G4: 392, A4: 440, B4: 494, C5: 523, D5: 587, E5: 659, F5: 698, G5: 784 };
      const tune = "G4 .75,G4 .25,A4 1,G4 1,C5 1,B4 2,G4 .75,G4 .25,A4 1,G4 1,D5 1,C5 2,G4 .75,G4 .25,G5 1,E5 1,C5 1,B4 1,A4 1,F5 .75,F5 .25,E5 1,C5 1,D5 1,C5 2".split(",");
      let t = ctx.currentTime + .1;
      tune.forEach((n) => {
        const [note, beats] = n.split(" "), d = beats * .42, o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "triangle"; o.frequency.value = hz[note]; o.connect(g); g.connect(ctx.destination);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.25, t + .03); g.gain.exponentialRampToValueAtTime(.001, t + d);
        o.start(t); o.stop(t + d); t += d;
      });
      setTimeout(() => on && stop(), (t - ctx.currentTime) * 1000);
    };
    const toggle = () => (on ? stop() : start());
    $("#play").onclick = toggle; $("#disc").onclick = toggle;
    cleanup = () => { stop(); audio = null; };
  },

  // ----- calendar -----
  calendar() {
    const { year, month, day, message } = CONFIG.date;
    const first = new Date(year, month - 1, 1).getDay(), days = new Date(year, month, 0).getDate();
    const mname = new Date(year, month - 1).toLocaleString("en", { month: "long" });
    let grid = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => `<i>${d}</i>`).join("") + "<span></span>".repeat(first);
    for (let d = 1; d <= days; d++) grid += `<button data-d="${d}">${d}</button>`;
    show("Special Month 🗓️", `<p class="sub">Try to find and tap the special date in ${mname}!</p><div class="cal">${grid}</div><p class="note" id="note"></p>`);
    let tries = 0;
    body.querySelector(".cal").onclick = (e) => {
      const b = e.target.closest("button"); if (!b) return;
      if (+b.dataset.d === day) { b.classList.add("hit"); $("#note").textContent = message; confetti(); return; }
      b.classList.remove("wrong"); void b.offsetWidth; b.classList.add("wrong"); tries++;
      $("#note").textContent = tries < 3 ? "Not that one 🙈" : (+b.dataset.d < day ? "Warmer... go later 🔥" : "Warmer... go earlier 🔥");
    };
  },

  // ----- letters (as many as you want) -----
  letters() {
    const list = () => {
      show("For you... 💌", `<p class="sub">${CONFIG.letters.length} letters, pick one</p><div class="envs">` +
        CONFIG.letters.map((l, i) => `<button class="env" data-i="${i}"><em>${l.icon}</em>${l.title}</button>`).join("") + "</div>");
      body.querySelector(".envs").onclick = (e) => { const b = e.target.closest(".env"); if (b) read(+b.dataset.i); };
    };
    const read = (i) => {
      const l = CONFIG.letters[i], n = CONFIG.letters.length;
      show(l.icon + " " + (i + 1) + " of " + n, `<div class="paper"><h3>${l.title}</h3>${l.text.replace(/{name}/g, CONFIG.name)}<div class="sig">♥ ${l.sign}</div></div>
        <div class="nav"><button class="btn green" id="prev">‹</button><button class="link" id="all">All letters</button><button class="btn green" id="next">›</button></div>`);
      $("#prev").onclick = () => read((i + n - 1) % n); $("#next").onclick = () => read((i + 1) % n); $("#all").onclick = list;
    };
    list();
  },

  // ----- picture carousel -----
  photos() {
    const ph = (i) => "data:image/svg+xml," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${i % 2 ? "#ffc9dd" : "#bfe8cf"}'/><stop offset='1' stop-color='${i % 2 ? "#bfe8cf" : "#ffc9dd"}'/></linearGradient></defs><rect width='400' height='500' fill='url(#g)'/><text x='200' y='270' font-size='84' text-anchor='middle'>📸</text><text x='200' y='340' font-size='22' text-anchor='middle' fill='#24493a' font-family='sans-serif'>Add photo ${i + 1}</text></svg>`);
    const P = CONFIG.photos;
    show("Favorite pictures 📸", `<p class="sub">Swipe it...</p><div class="carousel"><div class="track">` +
      P.map((p, i) => `<figure class="slide"><img src="${p.src || ph(i)}" alt="${p.caption}"><figcaption>${p.caption}</figcaption></figure>`).join("") +
      `</div><button class="arrow l" aria-label="Previous">‹</button><button class="arrow r" aria-label="Next">›</button></div><div class="dots">${P.map(() => "<b></b>").join("")}</div>`);
    const track = body.querySelector(".track"), dots = body.querySelectorAll(".dots b");
    const go = (d) => track.scrollBy({ left: d * track.clientWidth, behavior: "smooth" });
    body.querySelector(".l").onclick = () => go(-1); body.querySelector(".r").onclick = () => go(1);
    const mark = () => { const i = Math.round(track.scrollLeft / track.clientWidth); dots.forEach((d, k) => d.classList.toggle("on", k === i)); };
    track.onscroll = mark; mark();
  },

  // ----- wish: blow the candles with the microphone -----
  wish() {
    show("Make a Wish! 🕯️", `<p class="sub">Close your eyes, make a wish, turn on the mic, and blow out the candles...</p>
      <div class="candles" id="candles"><div class="candle"></div><div class="candle"></div><div class="candle"></div><div class="candle"></div><div class="candle"></div></div>
      <div class="stack"><button class="btn" id="blow">🎤 Blow</button><button class="link" id="click">Or tap here instead</button></div><p class="note" id="note"></p>`);
    let stream = null, ctx = null, timer = null, done = false;
    const finish = () => {
      if (done) return; done = true; clearInterval(timer);
      $("#candles").classList.add("out"); $("#note").textContent = "Your wish is on its way 💖 Happy birthday, " + CONFIG.name + "!"; confetti();
      document.querySelectorAll(".flame").forEach((f) => (f.style.opacity = 0));
    };
    $("#click").onclick = finish;
    $("#blow").onclick = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        const an = ctx.createAnalyser(); an.fftSize = 512; ctx.createMediaStreamSource(stream).connect(an);
        const buf = new Uint8Array(an.fftSize); let loud = 0;
        $("#note").textContent = "Listening... blow into the mic 🌬️";
        timer = setInterval(() => {
          an.getByteTimeDomainData(buf);
          const peak = Math.max(...buf.map((v) => Math.abs(v - 128))) / 128;
          loud = peak > .45 ? loud + 1 : 0;
          if (loud >= 3) finish();                    // about 0.3 seconds of loud air
        }, 100);
      } catch (e) { $("#note").textContent = "No microphone access. Tap the link below instead 💗"; }
    };
    cleanup = () => { clearInterval(timer); if (stream) stream.getTracks().forEach((t) => t.stop()); if (ctx) ctx.close(); };
  }
};
