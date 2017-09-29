  class Select {
    constructor(options) {
      this.options = mergeObjects({
        selector: 'select',
        customSelectClassName: 'select',
        customSelectActiveClassName: 'select--open',
        currentClassName: 'select__current',
        selectListClassName: 'select__list',
        selectItemlassName: 'select__item',
        activeItemClass: 'select__item--active',
        disableItemClass: 'select__item--disabled',
        activeClass: 'select--open',
        event: 'click',
        onChange(select) {
          // ...
        }
      }, options);

      return this.init(this.options.selector);
    }
    init(selector) {
      const selects = document.querySelectorAll(selector);
      if (!selects) return;
      selects.forEach((element) => {
        const customSelect = this.renderSelect(element);
        element.parentNode.insertBefore(customSelect, element.nextSibling);
      });
    }
    update(selector) {
      document.querySelectorAll(selector).forEach((select) => {
        const nextElement = select.nextSibling;
        if (nextElement.classList.contains(this.options.selector)) {
          nextElement.remove();
        }
      });
      this.init(selector);
    }
    renderSelect(select) {
      const currentElement = document.createElement('span');
      const customSelectList = document.createElement('ul');
      const customSelect = document.createElement('div');
      const nativeSelectClasses = select.className.split(' ');
      // add classes to custm select
      customSelect.classList.add(this.options.customSelectClassName);
      if (select.className) {
        customSelect.classList.add(...nativeSelectClasses);
      }

      // add tabindex if it exist
      if (select.getAttribute('tabindex')) {
        customSelect.setAttribute('tabindex', select.getAttribute('tabindex'));
      }
      // add disabled class if it exist
      if (select.disabled) {
        customSelect.classList.add('disabled');
      }
      currentElement.classList.add(this.options.currentClassName);
      customSelectList.classList.add(this.options.selectListClassName);

      customSelect.appendChild(currentElement);
      customSelect.appendChild(customSelectList);

      const options = select.querySelectorAll('option');
      const selected = select.querySelector('option:checked');
      // set current
      const currentText = selected.getAttribute('data-display') || selected.innerText;
      currentElement.innerText = currentText;

      // build list
      options.forEach((option, index) => {
        const display = option.getAttribute('data-display');
        const nativeOptionClasses = option.className.split(' ');
        const item = document.createElement('li');
        item.classList.add(this.options.selectItemlassName);

        if (option.className) {
          item.classList.add(...nativeOptionClasses);
        }

        if (option.selected) {
          item.classList.add(this.options.activeItemClass);
        }

        if (option.disabled) {
          item.classList.add(this.options.disableItemClass);
        }

        item.setAttribute('data-value', option.value);
        item.innerText = display || option.innerText;
        customSelectList.appendChild(item);
      });

      this.addListeners(select, customSelect);

      return customSelect;
    }
    addListeners(select, customSelect) {
      const options = this.options;

      select.addEventListener('change', function () {
        if (typeof options.onChange === "function") {
          options.onChange(this);
        }
      });

      customSelect.addEventListener('click', function () {
        this.classList.toggle(options.customSelectActiveClassName);
      });

      const optionsList = customSelect.getElementsByClassName(options.selectItemlassName);
      const currentElement = customSelect.getElementsByClassName(options.currentClassName)[0];
      const naviveOptions = select.querySelectorAll('option');


      Array.prototype.forEach.call(optionsList, (item) => {
        item.addEventListener('click', function (event) {
          if (this.classList.contains(options.activeItemClass)) {
            return;
          }

          if (this.classList.contains(options.disableItemClass)) {
            event.stopPropagation();
            return;
          }
          const index = Array.prototype.indexOf.call(this.parentElement.children, this);

          Array.prototype.forEach.call(customSelect.getElementsByClassName(options.selectItemlassName), (element) => {
            element.classList.remove(options.activeItemClass);
          });

          currentElement.innerText = this.innerText;
          this.classList.add(options.activeItemClass);

          // change select value
          select.value = this.getAttribute('data-value');
          naviveOptions.forEach((nativeItem) => {
            nativeItem.selected = false;
          });
          naviveOptions[index].selected = true;
          select.dispatchEvent(new Event('change'))
        })
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

  export default Select;