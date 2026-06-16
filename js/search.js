(function () {
  var input   = document.getElementById('search-input');
  var tagBtns = document.querySelectorAll('.tag-filter-btn');
  var cards   = document.querySelectorAll('.cards .entry.card__box');
  var empty   = document.getElementById('search-empty');

  if (!input) return;

  var activeTag = null;

  function normalize(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function filter() {
    var q = normalize(input.value.trim());
    var visible = 0;

    cards.forEach(function (card) {
      var title  = normalize(card.dataset.title || '');
      var desc   = normalize(card.dataset.desc  || '');
      var author = normalize(card.dataset.author || '');
      var tags   = (card.dataset.tags || '').split(',');

      var matchesSearch = !q || title.includes(q) || desc.includes(q) || author.includes(q);
      var matchesTag    = !activeTag || tags.includes(activeTag);

      var show = matchesSearch && matchesTag;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
  }

  input.addEventListener('input', filter);

  tagBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tag = btn.dataset.tag;
      if (activeTag === tag) {
        activeTag = null;
        btn.classList.remove('active');
      } else {
        activeTag = tag;
        tagBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      }
      filter();
    });
  });
})();
