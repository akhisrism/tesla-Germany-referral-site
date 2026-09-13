(() => {
  function refresh() {
    const heading = document.getElementById('tesla-bonus-heading');
    if (!heading) return;
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    const date = Object.fromEntries(parts.map(p => [p.type, p.value]));
    const expired = `${date.year}-${date.month}-${date.day}` > '2026-09-15';
    const en = location.pathname.startsWith('/en/') || document.documentElement.lang.startsWith('en');
    heading.textContent = expired
      ? (en ? 'New-order deadline passed — qualifying existing orders may retain the Tesla Bonus'
            : 'Bestellfrist abgelaufen — berechtigte bestehende Bestellungen können den Tesla Bonus behalten')
      : (en ? 'Up to €2,000 Tesla Bonus — order by September 15, 2026'
            : 'Bis zu 2.000 € Tesla Bonus — bis 15. September 2026 bestellen');
  }
  refresh();
  new MutationObserver(refresh).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  setInterval(refresh, 60000);
})();
