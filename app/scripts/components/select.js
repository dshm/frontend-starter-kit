class Select {
  constructor(options) {
    const defaultOptions = {
      selector: "select",
      customSelectClassName: "select",
      customSelectActiveClassName: "select--open",
      currentClassName: "select__current",
      selectListClassName: "select__list",
      selectItemClassName: "select__item",
      activeItemClass: "select__item--active",
      disableItemClass: "select__item--disabled",
      activeClass: "select--open",
      event: "click",
      onChange(/* select */) {
        // select onChange event
      }
    };
    this.options = {
      ...defaultOptions,
      ...options
    };

    return this.init(this.options.selector);
  }
  init(selector) {
    const selects = document.querySelectorAll(selector);
    if (!selects) return;
    selects.forEach(element => {
      const customSelect = this.renderSelect(element);
      element.parentNode.insertBefore(customSelect, element.nextSibling);
    });
  }
  update(selector) {
    const selects = document.querySelectorAll(selector);
    if (!selects) return;
    selects.forEach(select => {
      const nextElement = select.nextSibling;
      if (nextElement.classList.contains(this.options.selector)) {
        nextElement.remove();
      }
    });
    this.init(selector);
  }
  renderSelect(select) {
    const currentElement = document.createElement("span");
    const customSelectList = document.createElement("ul");
    const customSelect = document.createElement("div");
    const nativeSelectClasses = select.className.trim().split(" ");
    // add classes to custm select
    customSelect.classList.add(this.options.customSelectClassName);
    if (select.className) {
      customSelect.classList.add(...nativeSelectClasses);
    }

    // add tabindex if it exist
    if (select.getAttribute("tabindex")) {
      customSelect.setAttribute("tabindex", select.getAttribute("tabindex"));
    }
    // add disabled class if it exist
    if (select.disabled) {
      customSelect.classList.add("disabled");
    }
    currentElement.classList.add(this.options.currentClassName);
    customSelectList.classList.add(this.options.selectListClassName);

    customSelect.appendChild(currentElement);
    customSelect.appendChild(customSelectList);

    const options = select.querySelectorAll("option");
    const selected =
      select.querySelector("option:checked") ||
      select.querySelector("option:first-child");
    // set current
    const currentText =
      selected.getAttribute("data-display") || selected.innerText;
    currentElement.innerText = currentText;

    // build list
    options.forEach(option => {
      const display = option.getAttribute("data-display");
      const nativeOptionClasses = option.className.trim().split(" ");
      const item = document.createElement("li");
      item.classList.add(this.options.selectItemClassName);

      if (option.className) {
        item.classList.add(...nativeOptionClasses);
      }

      if (option.selected) {
        item.classList.add(this.options.activeItemClass);
      }

      if (option.disabled) {
        item.classList.add(this.options.disableItemClass);
      }

      item.setAttribute("data-value", option.value);
      item.innerText = display || option.innerText;
      customSelectList.appendChild(item);
    });

    this.addListeners(select, customSelect);

    return customSelect;
  }
  addListeners(select, customSelect) {
    const { options } = this;

    select.addEventListener("change", function onChangeHandler() {
      if (typeof options.onChange === "function") {
        options.onChange(this);
      }
    });

    customSelect.addEventListener("click", function onClickHandler() {
      this.classList.toggle(options.customSelectActiveClassName);
    });

    const optionsList = customSelect.getElementsByClassName(
      options.selectItemClassName
    );
    const currentElement = customSelect.getElementsByClassName(
      options.currentClassName
    )[0];
    const naviveOptions = select.querySelectorAll("option");

    Array.prototype.forEach.call(optionsList, item => {
      item.addEventListener("click", function onClickHandler(event) {
        if (this.classList.contains(options.activeItemClass)) {
          return;
        }

        if (this.classList.contains(options.disableItemClass)) {
          event.stopPropagation();
          return;
        }
        const index = Array.prototype.indexOf.call(
          this.parentElement.children,
          this
        );

        Array.prototype.forEach.call(
          customSelect.getElementsByClassName(options.selectItemClassName),
          element => {
            element.classList.remove(options.activeItemClass);
          }
        );

        currentElement.innerText = this.innerText;
        this.classList.add(options.activeItemClass);

        // change select value
        select.setAttribute("value", this.getAttribute("data-value"));
        naviveOptions.forEach(nativeItem => {
          nativeItem.setAttribute("selected", false);
        });
        naviveOptions[index].selected = true;
        select.dispatchEvent(new Event("change"));
      });
    });
  }
}

export default Select;
