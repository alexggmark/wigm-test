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

    this.showDefaultGrandchildMenu();

    // Optional: Add animation or CSS class for transition
    if (!this.animations) this.animations = this.dropdownContent.getAnimations();
    this.animations.forEach(animation => animation.play());
  }

  hideDropdown() {
    this.menuButton.setAttribute('aria-expanded', 'false');
    this.dropdownContent.hidden = true;

    // Optional: Cancel the animations
    if (this.animations) {
      this.animations.forEach(animation => animation.cancel());
    }
  }

  showDefaultGrandchildMenu() {
    // TODO: fix this
    return;
    this.grandchildMenus.forEach(menu => {
      menu.hidden = true;
    });

    const defaultGrandchildMenu = this.dropdownContent.querySelector('.header__submenu-grandchildren[data-default="true"]');
    if (defaultGrandchildMenu) {
      defaultGrandchildMenu.hidden = false;
    }
  }

  showGrandchildren(event) {
    console.log("Show grandchild");
    const childLink = event.currentTarget;
    const grandchildMenuId = childLink.getAttribute('aria-controls');
    const grandchildMenu = document.getElementById(grandchildMenuId);

    this.grandchildMenus.forEach(menu => {
      menu.hidden = true;
    });

    grandchildMenu.hidden = false;
  }
}

customElements.define('header-menu', HeaderMenu);
