---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---
<head>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<style>
        .content {
      background: var(--bg);
      color: var(--bg-primary);
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
      position: relative;
    }
    body, html {
  overflow-x: hidden;
}
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
margin-top: -100px !important;
}
#main-content {
  flex: 1;
}
</style>
<div class="content">
<h1>ฅ(ᵔ꒳ ᵔマ.ᐟ</h1>
<p>my name is harper and this is my website. if you're on desktop you can see a bunch of stuff i like on the sides! you can also scroll a little further down and see my blog, which you should read because it is awesome. click on 'go to blog' to see the rest of my posts!! i talk about gender and stuff there.</p>

<p>even further down is the music i've been listening to recently. if it says 'now playing' then i'm listening to that right now!! live!! it updates on refresh.</p>

<p>even <i>further</i> are the books i've been reading. this is a little slow to update, and i also don't use goodreads much (where i'm getting the data from), so it might not be super accurate. i also get rate limited sometimes, but when that happens i put a cute gif of a puppy there so it's okay.</p>

<p>i also really like rollerblading (outside), philosophy (analytic, mostly; feminism and metaphysics), and bouldering (indoors).</p>

<p>look at <a href = "https://x.com/clairseoir" target="_blank">my x (formerly known as twitter)</a> and <a href = "https://harperlocution.substack.com/" target="_blank">my substack</a></p>

<h2><a href = "https://www.last.fm/user/relaxedrealist" target="_blank">my</a> listening:</h2>
<div id="music" style="color: var(--text-secondary); background-color: var(--bg2);">
    <div id="now-playing-section"></div>
    <div id="music-container">
        <div id="top-albums"></div>
        <div id="currently-playing"></div>
        <div id="listening-to"></div>
    </div>
</div>
<h2>books:</h2>
<div id="books" style="background-color: var(--bg2); padding: 20px; margin-bottom: 20px; color: var(--text-secondary);">
    <div id="books-content"></div>
</div>
</div>

<div style="--bg: var(--bg2); position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; width: 100vw; overflow-x: hidden; padding-bottom: 0; margin-bottom: -98px;">
  <div class="content" style="padding-bottom: 60px;">
    <script src="{{ '/assets/js/lastfm.js' | relative_url }}"></script>
    <link rel="stylesheet" href="{{ '/assets/css/lastfm.css' | relative_url }}">
    <div style="display: flex; flex-wrap: wrap; gap: 0px; justify-content: center;">
      {% for file in site.static_files %}
        {% if file.path contains '/meow/' %}
          <img src="{{ file.path | relative_url }}" alt="stamp" style="width: 90px; height: auto;">
        {% endif %}
      {% endfor %}
    </div>
    <div style="text-align: center;">
  </div>
  </div>


<script>
async function loadGoodreadsBooks() {
    const userId = '202206318';
    
    try {
        // Currently Reading shelf
        const currentResponse = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.goodreads.com/review/list_rss/${userId}?shelf=currently-reading`);
        const currentData = await currentResponse.json();
        
        // Read shelf
        const readResponse = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.goodreads.com/review/list_rss/${userId}?shelf=read`);
        const readData = await readResponse.json();
        
        const booksContent = document.getElementById('books-content');
        let html = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">';
        
        // Currently Reading (left column)
        html += '<div>';
        html += '<h3 style="margin-top: 0; margin-bottom: 10px; color: var(--text-secondary);">reading</h3>';
        
        if (currentData.items.length > 0) {
            const book = currentData.items[0];
            const parser = new DOMParser();
            const doc = parser.parseFromString(book.description, 'text/html');
            const img = doc.querySelector('img');
            let coverUrl = img ? img.src : '';
            
            // Upgrade to higher resolution
            coverUrl = coverUrl.replace(/_SX\d+_/, '_SX318_').replace(/_SY\d+_/, '_SY475_');
            
            // Extract author from description
            const authorMatch = book.description.match(/author:\s*([^<]+)/i);
            const author = authorMatch ? authorMatch[1].trim() : 'Unknown Author';
            
            html += `
                <div style="display: flex; gap: 15px;">
                    <img src="${coverUrl}" alt="${book.title}" style="width: 120px; height: 180px; object-fit: cover;">
                    <div>
                        <div style="font-weight: bold; margin-bottom: 5px;"><a href="${book.link}" target="_blank">${book.title}</a></div>
                        <div style="color: var(--text-secondary);">${author}</div>
                    </div>
                </div>
            `;
        }
        html += '</div>';
        
        // Recently Finished (right column)
        html += '<div>';
        html += '<h3 style="margin-top: 0; margin-bottom: 10px; color: var(--text-secondary);">recently read</h3>';
        
        readData.items.slice(0, 3).forEach(book => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(book.description, 'text/html');
            const img = doc.querySelector('img');
            let coverUrl = img ? img.src : '';
            
            // Upgrade to higher resolution
            coverUrl = coverUrl.replace(/_SX\d+_/, '_SX98_').replace(/_SY\d+_/, '_SY160_');
            
            // Extract author from description
            const authorMatch = book.description.match(/author:\s*([^<]+)/i);
            const author = authorMatch ? authorMatch[1].trim() : 'Unknown Author';
            
            html += `
                <div style="display: flex; gap: 10px;">
                    <img src="${coverUrl}" alt="${book.title}" style="width: 40px; height: 60px; object-fit: cover;">
                    <div>
                        <div style="font-weight: bold; font-size: 16px;"><a href="${book.link}" target="_blank">${book.title}</a></div>
                        <div style="color: var(--text-secondary); font-size: 16px;">${author}</div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        html += '</div>';
        
        booksContent.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading Goodreads books:', error);
        document.getElementById('books-content').innerHTML = '<img style="width: 300px; height: auto;" src="https://media1.tenor.com/m/HGQ8GDvoKPMAAAAd/golden-retriever-golden-retriever-puppy.gif">';
    }
}

loadGoodreadsBooks();
</script>