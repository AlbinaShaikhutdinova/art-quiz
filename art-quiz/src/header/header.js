import header from './header.html';
import htmlToElement from '../utils/htmlToElement';
import './style.scss';

const CLASSES = {
    HEADER: 'header',
    NAV_LINK: 'nav-link',
    SETTINGS_ICON: 'settings-icon',
    HIDDEN: 'hidden',
    HEADER_LOGO: 'header-logo',
    NAV_HEADER: 'nav-header',
    NO_VISIBILITY: 'no-visibility',
    DEFAULT_HEADER: 'default-header',
    GAME_HEADER: 'game-header',
    TIMER_REGIM: 'timer-regim',
}

export default class Header {
    constructor(settings, footer) {
        this.headerElement = htmlToElement(header);
        this.header = document.querySelector(CLASSES.HEADER);
        this.header.append(this.headerElement);
        this.settings = settings;
        this.footer = footer;
        const links = this.headerElement.querySelectorAll(`.${CLASSES.NAV_LINK}`);
        for (let item of links) {
            item.addEventListener('click', this.footer.changePage.bind(this.footer, item));
        }
        this.settings.addListenerForHeader(this.headerElement.querySelector(`.${CLASSES.SETTINGS_ICON}`));
    }
    hide() {
        this.header.classList.add(CLASSES.HIDDEN);
    }
    show() {
        this.header.classList.remove(CLASSES.HIDDEN);
    }
    showLogo() {
        this.headerElement.querySelector(`.${CLASSES.HEADER_LOGO}`).classList.remove(CLASSES.NO_VISIBILITY);
        this.headerElement.querySelector(`.${CLASSES.NAV_HEADER}`).classList.remove(CLASSES.NO_VISIBILITY);
    }
    hideLogo() {
        this.headerElement.querySelector(`.${CLASSES.HEADER_LOGO}`).classList.add(CLASSES.NO_VISIBILITY);
        this.headerElement.querySelector(`.${CLASSES.NAV_HEADER}`).classList.add(CLASSES.NO_VISIBILITY);
    }
    showGameMode() {
        this.headerElement.querySelector(`.${CLASSES.DEFAULT_HEADER}`).classList.add(CLASSES.HIDDEN);
        this.headerElement.querySelector(`.${CLASSES.GAME_HEADER}`).classList.remove(CLASSES.HIDDEN);
        if (!this.settings.appSettings.timer) {
            document.querySelector(`.${CLASSES.TIMER_REGIM}`).classList.add(CLASSES.NO_VISIBILITY);
        }
    }
    showDefaultMode() {
        this.headerElement.querySelector(`.${CLASSES.DEFAULT_HEADER}`).classList.remove(CLASSES.HIDDEN);
        this.headerElement.querySelector(`.${CLASSES.GAME_HEADER}`).classList.add(CLASSES.HIDDEN);
        document.querySelector(`.${CLASSES.TIMER_REGIM}`).classList.remove(CLASSES.NO_VISIBILITY);
    }

}