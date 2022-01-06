import htmlToElement from "../utils/htmlToElement";
import settings from './settingsIndex.html';
import './style.scss';

const CLASSES = {
  MAIN: 'main',
  VOLUME_SLIDER: 'volume-slider',
  TIMER_TOGGLE: 'timer-toggle',
  ANSWER_SIGNAL: 'answer-signal',
  RIGHT: 'right',
  WRONG: 'wrong',
  GAME_OVER: 'game-over',
  AMOUNT_INPUT: 'amount-input',
  SETTINGS_EXIT_SIGN: 'settings-exit-sign',
  GO_BACK_SIGN: 'go-back-sign',
  NEW_SETTING: 'new-setting',
  DEFAULT_SETTING: 'default-setting',
  SLIDER: 'slider',
  SETTINGS: 'settings',
}
export default class Settings {
  constructor() {
    this.prevPage = '';
    this.settingsPage = htmlToElement(settings);
    document.querySelector(CLASSES.MAIN).append(this.settingsPage);
    this.volumeSlider = this.settingsPage.querySelector(`.${CLASSES.VOLUME_SLIDER}`);
    this.settingsTimer = this.settingsPage.querySelector(`.${CLASSES.TIMER_TOGGLE}`).querySelector('input');
    this.audoSignals = document.querySelectorAll(`.${CLASSES.ANSWER_SIGNAL}`);
    this.input = this.settingsPage.querySelector(`#${CLASSES.AMOUNT_INPUT}`);
    this.settingsPage.querySelector(`.${CLASSES.SETTINGS_EXIT_SIGN}`).addEventListener('click', this.hide.bind(this));
    this.settingsPage.querySelector(`.${CLASSES.GO_BACK_SIGN}`).addEventListener('click', this.hide.bind(this));
    this.settingsPage.querySelector(`.${CLASSES.NEW_SETTING}`).addEventListener('click', this.updateSettings.bind(this));
    this.settingsPage.querySelector(`.${CLASSES.DEFAULT_SETTING}`).addEventListener('click', this.setDefaultSettings.bind(this))
    this.settingsPage.querySelector(`.${CLASSES.SLIDER}`).addEventListener('click', this.changeStatus.bind(this));
    this.volumeSlider.addEventListener('change', this.changeVolumeSlider.bind(this));
  }
  init() {
    if (localStorage.getItem('settings')) {
      this.appSettings = JSON.parse(localStorage.getItem('settings'));
      this.timer = this.appSettings.timer;
    }
    else this.setDefaultSettings();
    this.updatePage();
  }
  updatePage() {
    this.volumeSlider.value = this.appSettings.volume;
    this.input.value = this.appSettings.answerTime;
    this.settingsTimer.checked = this.appSettings.timer;
    this.updateVolume();
  }
  updateVolume() {
    for (let el of this.audoSignals) {
      el.volume = this.appSettings.volume;
    }
    this.changeVolumeSlider();
  }
  setDefaultSettings(volume = 0.5, timer = true, answerTime = 20) {
    this.volume = volume;
    this.timer = timer;
    this.answerTime = answerTime;
    this.appSettings = {
      volume: this.volume,
      timer: this.timer,
      answerTime: this.answerTime,
    }
    this.updatePage();
    this.updateSettingsStorage();
  }
  updateSettings() {
    this.appSettings.volume = this.volumeSlider.value;
    this.appSettings.timer = this.timer;
    this.appSettings.answerTime = this.settingsPage.querySelector(`#${CLASSES.AMOUNT_INPUT}`).value;
    this.updateSettingsStorage();
    this.updateVolume();
  }
  updateSettingsStorage() {
    localStorage.setItem('settings', JSON.stringify(this.appSettings));
    this.hide();
  }
  getSettings() {
    return this.appSettings;
  }
  addListenerForHeader(el) {
    el.addEventListener('click', this.show.bind(this))
  }

  show() {
    document.querySelector(`.${CLASSES.SETTINGS}`).style.top = '0vh';
  }
  hide() {
    document.querySelector(`.${CLASSES.SETTINGS}`).style.top = '-100vh'
  }

  playAnswerSignal(correct) {
    if (correct) {
      document.querySelector(`.${CLASSES.ANSWER_SIGNAL}.${CLASSES.RIGHT}`).play();
    }
    else document.querySelector(`.${CLASSES.ANSWER_SIGNAL}.${CLASSES.WRONG}`).play();
  }

  playGameOverSignal() {
    document.querySelector(`.${CLASSES.ANSWER_SIGNAL}.${CLASSES.GAME_OVER}`).play();
  }

  changeVolumeSlider() {
    let target = this.volumeSlider;
    const { min, max, value } = target;
    target.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%';
  }

  changeStatus() {
    this.timer = !this.timer;
  }
}