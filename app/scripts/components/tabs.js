class Tabs {
  constructor(options) {
    const defaultOption = {
      selector: ".tabs-list",
      activeClass: "active",
      checkHash: true,
      tabLinks: "a",
      attribute: "href",
      event: "click",
      onChange: null
    };
    this.options = {
      ...defaultOption,
      ...options
    };

    return this.init(this.options);
  }
  init(options) {
    const tabs = document.querySelectorAll(options.selector);
    tabs.forEach(element => {
      this.setInitialState(element);
    });
  }
  update(selector) {
    const tabs = document.querySelectorAll(selector || this.options.selector);
    tabs.forEach(element => {
      this.setInitialState(element);
    });
  }
  setInitialState(element) {
    const links = element.querySelectorAll(this.options.tabLinks);
    this.addEvents(links);
    let historyLink = null;
    if (this.options.checkHash && window.location.hash) {
      historyLink = element.querySelector(
        `[${this.options.attribute}="${window.location.hash}"]`
      );
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
    links.forEach(link => {
      link.addEventListener(this.options.event, event => {
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
    if (activeTabID === "#") return;
    const activeTabBlock = document.querySelector(activeTabID);
    if (activeTabBlock) {
      activeTabBlock.classList.add("active");
    }
    this.removeTabs(activeTab);
    if (typeof this.options.onChange === "function") {
      this.options.onChange();
    }
  }
  removeTabs(activeTab) {
    const tabNav = activeTab.closest(this.options.selector);
    tabNav.querySelectorAll(this.options.tabLinks).forEach(element => {
      if (element !== activeTab) {
        element.classList.remove("active");
        const tabID = element.getAttribute(this.options.attribute);
        const tabBlock = document.querySelector(tabID);
        if (tabBlock) {
          tabBlock.classList.remove("active");
        }
      }
    });
  }
}

export default Tabs;
