
(function(){
  const stage = document.getElementById('newsdeskStage');
  const dotsHost = document.getElementById('newsdeskDots');
  const nextBtn = document.getElementById('newsdeskNext');
  const counter = document.getElementById('newsdeskCounter');
  if(!stage || !dotsHost || !nextBtn || !counter) return;

  // EDITABLE LATEST NEWS:
  // Keep date in YYYY-MM-DD. The site takes the five newest stories, then randomises their display order.
  // Add the Instagram / YouTube / source URL when you have the exact public post.
  const allStories = [
    {
      date:"2026-10-02",
      displayDate:"02 OCT 2026",
      category:"LIVE",
      title:"The Derby // Kennington",
      deck:"Recent solo set at The Derby — live loops, crowd interaction and another performance added to the growing AntZ live archive.",
      file:"LIVE_LOG / DERBY_SE11",
      url:""
    },
    {
      date:"2026-09-25",
      displayDate:"25 SEP 2026",
      category:"BAND",
      title:"Band performance // field update",
      deck:"Recent band activity stays visible here as part of the running timeline rather than disappearing once the next post arrives.",
      file:"BAND_LOG / 250926",
      url:""
    }
  ];

  // Keep the bulletin tight: use only the five most recent dated stories,
  // then shuffle those five on each page load so repeat visits feel fresh.
  function shuffle(arr){
    const copy = arr.slice();
    for(let i = copy.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const stories = shuffle(
    allStories
      .slice()
      .sort((a,b)=>b.date.localeCompare(a.date))
      .slice(0,5)
  );

  function storyHTML(s){
    const source = s.url
      ? `<a class="newsdesk-link" href="${s.url}" target="_blank" rel="noopener">View original post →</a>`
      : `<span class="newsdesk-file">SOURCE LINK // ADD WHEN PUBLISHED</span>`;
    return `
      <div class="newsdesk-meta"><span class="category">${s.category}</span><span>${s.displayDate}</span></div>
      <h4>${s.title}</h4>
      <p class="newsdesk-deck">${s.deck}</p>
      <div class="newsdesk-footer">
        <span class="newsdesk-file">${s.file}</span>
        ${source}
      </div>
    `;
  }

  stories.forEach((s,i)=>{
    const el = document.createElement('article');
    el.className = 'newsdesk-story' + (i===0 ? ' active' : '');
    el.innerHTML = storyHTML(s);
    stage.appendChild(el);

    const dot = document.createElement('button');
    dot.className = 'newsdesk-dot' + (i===0 ? ' active' : '');
    dot.type = 'button';
    dot.setAttribute('aria-label','Show news item ' + (i+1));
    dot.addEventListener('click',()=>show(i,true));
    dotsHost.appendChild(dot);
  });

  const slides = Array.from(stage.children);
  const dots = Array.from(dotsHost.children);
  let index = 0;
  let timer;

  function show(nextIndex,userTriggered){
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((s,i)=>s.classList.toggle('active',i===index));
    dots.forEach((d,i)=>d.classList.toggle('active',i===index));
    counter.textContent = String(index+1).padStart(2,'0') + ' / ' + String(slides.length).padStart(2,'0');
    if(userTriggered) restart();
  }
  function advance(){ show(index+1,false); }
  function restart(){
    clearInterval(timer);
    timer = setInterval(advance,7000);
  }

  window.addEventListener("antz-upcoming-opened",()=>clearInterval(timer));
  window.addEventListener("antz-upcoming-closed",restart);

  nextBtn.addEventListener('click',()=>show(index+1,true));
  stage.addEventListener('mouseenter',()=>clearInterval(timer));
  stage.addEventListener('mouseleave',restart);
  restart();
})();
