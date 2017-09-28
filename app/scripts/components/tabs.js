// import Tabs from './components/tabs';
// new Tabs({
//   onChange() {
//     // callback
//   }
// });

class Tabs {
  constructor(options) {
    this.options = mergeObjects({
      selector: '.tabs',
      activeClass: 'active',
      checkHash: true,
      tabLinks: 'a',
      attribute: 'href',
      event: 'click',
      onChange: null
    }, options);

    return this.init(this.options);
  }
  init(options) {
    const tabs = document.querySelectorAll(options.selector);
    tabs.forEach((element) => {
      this.setInitialState(element);
    });
  }
  setInitialState(element) {
    const links = element.querySelectorAll(this.options.tabLinks);
    this.addEvents(links);
    let historyLink = null;
    if (this.options.checkHash && window.location.hash) {
      historyLink = element.querySelector(`[${this.options.attribute}="${window.location.hash}"]`);
    }
    if (historyLink) {
      this.setActiveTab(historyLink);
    } else {
      links.forEach((link, index) => {
        if (index === 0) {
          this.setActiveTab(link);
        }
      });
    }
  }
  addEvents(links) {
    links.forEach((link, index) => {
      link.addEventListener(this.options.event, (event) => {
        event.preventDefault();
        if (!event.currentTarget.classList.contains(this.options.activeClass)) {
          this.setActiveTab(link);
        }
      });
    });
  }
  setActiveTab(activeTab) {
    activeTab.classList.add(this.options.activeClass);
    const activeTabID = activeTab.getAttribute(this.options.attribute);
    const activeTabBlock = document.querySelector(activeTabID);
    if (activeTabBlock) {
      activeTabBlock.classList.add('active');
    }
    this.removeTabs(activeTab);
    if (typeof this.options.onChange === "function") {
      this.options.onChange();
    }
  }
  removeTabs(activeTab) {
    const tabNav = activeTab.closest(this.options.selector);
    tabNav.querySelectorAll(this.options.tabLinks).forEach((element) => {
      if (element !== activeTab) {
        element.classList.remove('active');
        const tabID = element.getAttribute(this.options.attribute);
        const tabBlock = document.querySelector(tabID);
        if (tabBlock) {
          tabBlock.classList.remove('active');
        }
      }
    });
  }
}


function mergeObjects(obj1, obj2) {
  for (const property in obj2) {
    if ({}.hasOwnProperty.call(obj2, property)) {
      try {
        if (obj2[property].constructor === Object) {
          obj1[property] = mergeObjects(obj1[property], obj2[property]);
        } else {
          obj1[property] = obj2[property];
        }
      } catch (e) {
        obj1[property] = obj2[property];
      }
    }
  }
  return obj1;
}

if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (css) {
    let node = this;
    while (node) {
      if (node.matches(css)) return node;
      node = node.parentElement;
    }
    return null;
  };
}

if (!Element.prototype.matches) {
  Element.prototype.matches = function matches(selector) {
    const element = this;
    const elements = (element.document || element.ownerDocument).querySelectorAll(selector);
    let index = 0;

    while (elements[index] && elements[index] !== element) {
      ++index;
    }

    return Boolean(elements[index]);
  };
}

export default Tabs;