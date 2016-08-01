export function markupMenu(document) {
  const nav = document.createElement('div');
  const style = document.createElement('style');
  nav.className = 'helper-nav';
  style.innerHTML =
    `.helper-nav a:hover {
      color:#fff;
      background-color:#000;
    }
    .helper-nav a {
      display:block;
      color: #000;
      padding: 3px;
      margin:0
    }
    .helper-nav {
      position: fixed;
      bottom: 0;
      right: 0;
      background-color: #fff;
      font-family: monospace;
      z-index: 9999;
      border: 1px solid #000;
      padding: 3px;
      boxShadow: 0 0 40px 0 rgba(0,0,0,.2);
    }`;
  document.head.appendChild(style);
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/js/vendor/files.json', true);
  xhr.send();
  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState !== 4) return;
    let pages;
    try {
      pages = JSON.parse(xhr.responseText)
    } catch (e) {
      console.warn('Art Lemon production');
      return;
    }
    for (let i = 0; i < pages.length; i++) {
      nav.innerHTML += `<a href="/${pages[i]}">${pages[i]}</a>`;
    }
    document.body.appendChild(nav);
    let flag = localStorage.getItem('flag') ? JSON.parse(localStorage.getItem('flag')) : false;
    const display = flag ? 'block' : 'none';
    nav.style.display = display;
    document.addEventListener('keyup', (e) => {
      if (e.ctrlKey && e.keyCode === 88) {
        flag ? nav.style.display = 'none' : nav.style.display = 'block';
        flag = !flag;
        localStorage.setItem('flag', flag);
      }
    });
  });
}
