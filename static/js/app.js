const jam = document.querySelector("[data-jam]");
if (jam) {
  const tgl = document.querySelector("[data-tanggal]");
  const fJam = new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false });
  const fTgl = new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", weekday: "long", day: "numeric", month: "short", year: "numeric" });
  const perbarui = () => {
    const now = new Date();
    jam.textContent = fJam.format(now).replace(":", ".");
    if (tgl) tgl.textContent = fTgl.format(now).replace(/^(\w+) /, "$1, ").replace(/\./g, "");
  };
  perbarui();
  setInterval(perbarui, 20000);
}
