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
    @media screen and (max-width: 1200px) {
  .main-area {
    margin-left: 0;
    padding: 0px;
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    background-attachment: scroll;
    width: 100%;
    min-height: auto;
    image-rendering: pixelated;
    box-sizing: border-box;
  }
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

<p>even <i>further</i> are the books i've been reading. this is a little slow to update, and i also don't use goodreads much (where i'm getting the data from), so it might not be super accurate</p>

<p>i also really like rollerblading (outside), philosophy (analytic, mostly; feminism and metaphysics), and bouldering (indoors).</p>

<a href="#" class="theme-toggle" onclick="toggleTheme(); return false;">get all this shit off my screen `(`⇀‸↼´`)</a>

{% assign latest = site.posts.first %}

<h2>read my most recent blog post:</h2>
<div style="border: 5px solid var(--bg2); margin-bottom: 20px;">
    <div style="display: grid; grid-template-columns: auto 1fr; gap: 0;">
        <img src="{{ latest.image | relative_url }}" style="background-color: var(--bg2); width: 200px; height: 100%; object-fit: cover; display: block;">
        <div style="background-color: var(--bg2); padding: 20px; display: flex; flex-direction: column;">
            <h2 style="margin: -0.5em 0 -0.5em 0;"><a href="{{ latest.url | relative_url }}">{{ latest.title }}</a></h2>
            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.5; max-height: 150px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; position: relative;">
                {% assign post_content = latest.content | split: '<!--more-->' | last %}
                {{ post_content | replace_first: '</p>', '' }}...
            </div>
            <div style="margin-top: 0.5em; margin-bottom: -0.5em; display: flex; justify-content: space-between; align-items: center;">
                <a href="{{ latest.url | relative_url }}">full post</a>
                <a href="{{'/blog' | relative_url }}">go to blog</a>
            </div>
        </div>
    </div>
</div>

<h2><a href = "https://www.last.fm/user/relaxedrealist">my</a> listening:</h2>
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
        const [currentResponse, readResponse] = await Promise.all([
            fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.goodreads.com/review/list_rss/${userId}?shelf=currently-reading`)}`),
            fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.goodreads.com/review/list_rss/${userId}?shelf=read`)}`)
        ]);
        
        const currentText = await currentResponse.text();
        const readText = await readResponse.text();
        
        const parser = new DOMParser();
        const currentDoc = parser.parseFromString(currentText, 'text/xml');
        const readDoc = parser.parseFromString(readText, 'text/xml');
        
        const booksContent = document.getElementById('books-content');
        let html = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">';
        
        // Currently Reading (left column)
        html += '<div>';
        html += '<h3 style="margin-top: 0; margin-bottom: 10px; color: var(--text-secondary);">reading</h3>';
        
        const currentItems = currentDoc.querySelectorAll('item');
        if (currentItems.length > 0) {
            const item = currentItems[0];
            const title = item.querySelector('title')?.textContent || 'Unknown';
            const link = item.querySelector('link')?.textContent || '#';
            const description = item.querySelector('description')?.textContent || '';
            
            const descDoc = parser.parseFromString(description, 'text/html');
            const img = descDoc.querySelector('img');
            let coverUrl = img ? img.src : '';
            coverUrl = coverUrl.replace(/_SX\d+_/, '_SX318_').replace(/_SY\d+_/, '_SY475_');
            
            const authorMatch = description.match(/author:\s*([^<]+)/i);
            const author = authorMatch ? authorMatch[1].trim() : 'Unknown Author';
            
            html += `
                <div style="display: flex; gap: 15px;">
                    <img src="${coverUrl}" alt="${title}" style="width: auto; height: 240px; object-fit: cover;">
                    <div>
                        <div style="font-weight: bold; margin-bottom: 5px;"><a href="${link}" target="_blank">${title}</a></div>
                        <div style="color: var(--text-secondary);">${author}</div>
                    </div>
                </div>
            `;
        }
        html += '</div>';
        
        // Recently Finished (right column)
        html += '<div>';
        html += '<h3 style="margin-top: 0; margin-bottom: 10px; color: var(--text-secondary);">recently read</h3>';
        
        const readItems = Array.from(readDoc.querySelectorAll('item')).slice(0, 3);
        readItems.forEach(item => {
            const title = item.querySelector('title')?.textContent || 'Unknown';
            const link = item.querySelector('link')?.textContent || '#';
            const description = item.querySelector('description')?.textContent || '';
            
            const descDoc = parser.parseFromString(description, 'text/html');
            const img = descDoc.querySelector('img');
            let coverUrl = img ? img.src : '';
            coverUrl = coverUrl.replace(/_SX\d+_/, '_SX98_').replace(/_SY\d+_/, '_SY160_');
            
            const authorMatch = description.match(/author:\s*([^<]+)/i);
            const author = authorMatch ? authorMatch[1].trim() : 'unknown author';
            
            html += `
                <div style="display: flex; gap: 10px; margin-bottom: 0px;">
                    <img src="${coverUrl}" style="width: 50px; height: 80px; object-fit: cover;">
                    <div>
                        <div style="font-weight: bold; font-size: 16px;"><a href="${link}" target="_blank">${title}</a></div>
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
        document.getElementById('books-content').innerHTML = 'books arent loading /ᐠ ╥ ˕ ╥マ';
    }
}

loadGoodreadsBooks();
</script>
<style>