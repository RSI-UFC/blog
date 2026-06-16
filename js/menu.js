/* Code block language labels */
document.querySelectorAll('.highlight').forEach(function (block) {
	var code = block.querySelector('code[data-lang]');
	if (code) {
		var lang = code.getAttribute('data-lang');
		if (lang) block.setAttribute('data-lang', lang);
	}
});

/* Mobile nav toggle */
const toggle = document.getElementById('toggle');
const menu = document.getElementById('menu');

if (toggle && menu) {
	toggle.addEventListener('click', function () {
		menu.classList.toggle('main-nav__list--active');
		this.classList.toggle('main-nav__btn--active');
		this.setAttribute(
			'aria-expanded',
			this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
		);
	}, false);
}

/* Theme toggle */
(function () {
	const btn = document.getElementById('theme-toggle');
	const root = document.documentElement;

	const MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
	const SUN  = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

	function applyTheme(theme) {
		if (theme === 'light') {
			root.setAttribute('data-theme', 'light');
		} else {
			root.removeAttribute('data-theme');
		}
		if (btn) btn.innerHTML = theme === 'dark' ? SUN : MOON;
	}

	var saved = null;
	try { saved = localStorage.getItem('rsi-theme'); } catch (e) {}
	applyTheme(saved || 'dark');

	if (btn) {
		btn.addEventListener('click', function () {
			var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
			var next = current === 'dark' ? 'light' : 'dark';
			try { localStorage.setItem('rsi-theme', next); } catch (e) {}
			applyTheme(next);
		});
	}
})();
