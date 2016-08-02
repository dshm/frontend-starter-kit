export function markupMenu(document) {
  const nav = document.createElement('div');
  const style = document.createElement('style');
  const button = document.createElement('button');
  const wrapper = document.createElement('div');
  wrapper.appendChild(button);
  wrapper.appendChild(nav);
  wrapper.className = 'helper-nav-wrapper';
  button.innerHTML="Open pages list";
  button.className = 'helper-nav-button';
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
    .helper-nav-button {
      background: #000;
      color: #fff;
      padding: 5px;
    }
    .helper-nav-wrapper {
      position: fixed;
      bottom: 0;
      right: 0;
      font-family: monospace;
      z-index: 9999;
      text-align: right;
    }
    .helper-nav {
      text-align: left;
      background-color: #fff;
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
    document.body.appendChild(wrapper);
    let flag = localStorage.getItem('flag') ? JSON.parse(localStorage.getItem('flag')) : false;
    const display = flag ? 'block' : 'none';
    nav.style.display = display;
    function toggleNav() {
      flag ? nav.style.display = 'none' : nav.style.display = 'block';
      flag = !flag;
      localStorage.setItem('flag', flag);
    }
    document.addEventListener('keyup', (e) => {
      if (e.type === 'keyup' && e.ctrlKey && e.keyCode === 88) {
        toggleNav();
      }
    });
    button.addEventListener('click', toggleNav);
  });
}
