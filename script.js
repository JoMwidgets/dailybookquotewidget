const form = document.getElementById('quoteForm');
    const input = document.getElementById('quoteInput');
    const display = document.getElementById('quoteDisplay');

    function getQuotes() {
      return JSON.parse(localStorage.getItem('bookQuotes') || '[]');
    }

    function saveQuote(quote) {
      const quotes = getQuotes();
      quotes.push({ quote, date: new Date().toISOString() });
      localStorage.setItem('bookQuotes', JSON.stringify(quotes));
    }

    function getQuoteOfTheDay() {
      const quotes = getQuotes();
      if (!quotes.length) return "No quotes saved yet!";
      const today = new Date().toDateString();
      let hash = 0;
      for (let i = 0; i < today.length; i++) {
        hash += today.charCodeAt(i);
      }
      const index = hash % quotes.length;
      return quotes[index].quote;
    }

    display.textContent = getQuoteOfTheDay();

    form.addEventListener('submit', e => {
      e.preventDefault();
      saveQuote(input.value.trim());
      input.value = '';
      display.textContent = getQuoteOfTheDay();
    });