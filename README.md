# UP Fruit Company — PWA Launcher

यह GitHub Pages पर होस्ट होने वाला installable PWA launcher है। यह आपके मौजूदा Google Apps Script Web App को खोलता है; यह आपके Apps Script backend या database को replace नहीं करता।

## GitHub पर लगाने से पहले
1. `config.js` खोलें।
2. `appUrl` में अपना पूरा Google Apps Script Web App URL डालें, उदाहरण: `https://script.google.com/macros/s/DEPLOYMENT_ID/exec`।
3. सभी फाइलें repository के root में upload करें (या ZIP extract करके upload करें)।
4. GitHub repository में **Settings → Pages** खोलें। Source में **Deploy from a branch**, branch `main`, folder `/ (root)` चुनकर Save करें।
5. GitHub Pages का HTTPS URL खुलने के बाद Android Chrome में मेनू → **Install app** / **Add to Home screen** चुनें। iPhone Safari में Share → **Add to Home Screen** चुनें।

## जरूरी बातें
- Apps Script deployment को सही access setting के साथ deploy होना चाहिए; निजी Google login या organization restrictions होने पर user को sign-in करना पड़ सकता है।
- PWA shell के install/offline cache होने का अर्थ यह नहीं कि Apps Script business app offline चलेगा। वास्तविक app चलाने के लिए इंटरनेट चाहिए।
- Google Apps Script URL को `config.js` में डालना अनिवार्य है।
- यह package केवल launcher है। मौजूदा Apps Script `Code.gs` या HTML files को इसमें बदलने की जरूरत नहीं।

## Files
- `index.html` — branded launcher page
- `config.js` — Apps Script URL setting
- `manifest.json` — PWA install metadata
- `sw.js` — service worker for static shell
- `icons/` — generated app icons and Apple touch icon
- `favicon.ico` — browser favicon
