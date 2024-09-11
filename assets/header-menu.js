class HeaderMenu extends HTMLElement {
  constructor() {
    super();
    this.menuButton = this.querySelector('button');
    this.dropdownContent = this.querySelector('.header__dropdown-area');
    this.childLinks = this.dropdownContent.querySelectorAll('.header__submenu-column button');
    this.grandchildMenus = this.dropdownContent.querySelectorAll('.header__submenu-grandchildren');

    this.menuButton.setAttribute('aria-expanded', 'false');
    this.dropdownContent.hidden = true;

    this.menuButton.addEventListener('mouseover', this.showDropdown.bind(this));
    this.dropdownContent.addEventListener('mouseover', this.showDropdown.bind(this));

    this.menuButton.addEventListener('mouseleave', this.hideDropdown.bind(this));
    this.dropdownContent.addEventListener('mouseleave', this.hideDropdown.bind(this));

    this.childLinks.forEach(childLink => {
      childLink.addEventListener('mouseover', this.showGrandchildren.bind(this));
    });
  }

  showDropdown() {
    if (HeaderMenu.currentlyOpenDropdown && HeaderMenu.currentlyOpenDropdown !== this) {
      HeaderMenu.currentlyOpenDropdown.hideDropdown();
    }

    HeaderMenu.currentlyOpenDropdown = this;

    this.menuButton.setAttribute('aria-expanded', 'true');
    this.dropdownContent.hidden = false;
  }

  hideDropdown() {
    this.menuButton.setAttribute('aria-expanded', 'false');
    this.dropdownContent.hidden = true;
  }

  showGrandchildren(event) {
    console.log("Show grandchild");
    const childLink = event.currentTarget;
    const grandchildMenuId = childLink.getAttribute('aria-controls');
    const grandchildMenu = document.getElementById(grandchildMenuId);

    this.grandchildMenus.forEach(menu => {
      menu.hidden = true;
      menu.classList.remove('show');
    });

    grandchildMenu.hidden = false;
    void grandchildMenu.offsetWidth; /* Weird fix, forcing reflow to make sure animation triggers */
    grandchildMenu.classList.add('show');
  }
}

customElements.define('header-menu', HeaderMenu);
