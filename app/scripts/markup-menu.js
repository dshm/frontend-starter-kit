module.exports = function(document) {
  let nav = document.createElement('div');
  let style = document.createElement('style');
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
      background-color: '#fff';
      font-family: monospace;
      z-index: 5;
      border: 1px solid #000;
      padding: 3px;
      boxShadow: 0 0 40px 0 rgba(0,0,0,.2);
    }`;
  document.head.appendChild(style);
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/js/vendor/files.json', true);
  xhr.send();
  xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState !== 4) return;
    let pages;
    try {
      pages = JSON.parse(xhr.responseText)
    } catch (e) {
      console.log('env is production');
      return;
    };
    for (let i = 0; i < pages.length; i++) {
      nav.innerHTML += `<a href="/${pages[i]}">${pages[i]}</a>`;
    };
    document.body.appendChild(nav);
    let flag = localStorage.getItem('flag') ? JSON.parse(localStorage.getItem('flag')) : false;
    let display = flag ? 'block' : 'none';
    nav.style.display = display;
    document.addEventListener('keyup', function(e) {
      if (e.ctrlKey && e.keyCode == '88') {
        flag ? nav.style.display = 'none' : nav.style.display = 'block';
        flag = !flag;
        localStorage.setItem('flag', flag);
      }
    });
  });
};
