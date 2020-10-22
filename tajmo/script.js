const watchImagePaths = [
  './images/diesel-dz1437.jpg',
  './images/diesel-DZ1845.jpg',
  './images/fossil-FS5061c.jpg',
  './images/fossil-FS5132.jpg',
  './images/fossil-FS5445.jpg',
  './images/fossil-FS5447.jpg',
  './images/fossil-FS5448.jpg',
  './images/fossil-fs5461.jpg',
  './images/fossil-jf02378793.jpg',
  './images/fossil-JR1401.jpg',
  './images/hugo-boss-1513245.jpg',
  './images/hugo-boss-1550020.jpg',
  './images/hugo-boss-1550038.jpg',
  './images/hugo-boss-1550046.jpg',
  './images/hugo-boss-1550055.jpg',
  './images/hugo-boss-1550066.jpg',
  './images/lacoste-2010970.jpg',
  './images/lacoste-2010978.jpg',
  './images/police-pl-14383JSB-61.jpg',
  './images/police-pl-15526jsrbl-03.jpg',
  './images/tommy-hilfiger-1791350.jpg',
  './images/tommy-hilfiger-1791388.jpg',
  './images/tommy-hilfiger-1791420.jpg',
  './images/tommy-hilfiger-1791421.jpg',
  './images/tommy-hilfiger-1791464.jpg',
];

var first_click = false;
var current_thumb = null;
var current_button = null;
var one_watch = null;
var removed_watches = 0;

function createWatchElement(watchImagePath) {
  const watchesPanelElement = document.querySelector('#watches-panel');
  const newWatchElement = document.createElement('div');
  const newWatchButtonElement = document.createElement('div');
  const newWatchButtonElementContent = document.createTextNode('no bueno?');
  const newWatchThumbnailElement = document.createElement('img');

  addClass(newWatchElement, 'watch');
  addClass(newWatchButtonElement, 'button');
  addClass(newWatchButtonElement, 'watch-button');
  addClass(newWatchThumbnailElement, 'watch-thumb');
  newWatchThumbnailElement.src = watchImagePath;

  newWatchButtonElement.appendChild(newWatchButtonElementContent);
  newWatchElement.appendChild(newWatchButtonElement);
  newWatchElement.appendChild(newWatchThumbnailElement);

  watchesPanelElement.appendChild(newWatchElement);
}

function removeFirstClickClass() {
  watches.forEach(img => (img.classList.remove('watches-first-selection')));
  watches.forEach(img => (img.classList.add('watches-selection')));
}

function addClass(element, className) {
  element.classList.add(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function removeWatch(button) {
  current_thumb.remove();
  button.target.remove();
  current_watch.src = './images/bdbuno.jpeg';
  addClass(current_watch, 'final-showcase');
  removed_watches++;
  if (removed_watches === watches.length - 1) {
    one_watch = document.querySelectorAll('.watch-thumb');
    console.log(one_watch[0].src);
    wrapper.forEach(div => (div.classList.add('zero-opacity')));
    addClass(final_text, 'zero-opacity');
    setTimeout(displayFinalWatch, 2000);
  }
}

function imgSwitch(watch) {
  if (first_click === false) {
    watches.forEach(img => (img.classList.add('watches-first-selection')));
    setTimeout(removeFirstClickClass, 2500);
    first_click = true;
  }
  if (current_button != null) {
    removeClass(current_button, 'watch-button-selected');
  }
  watches.forEach(img => (img.style.opacity = 0.8));
  watch.target.style.opacity = 0.5;
  current_watch.src = watch.target.src;
  current_thumb = watch.target;
  current_button = current_thumb.previousElementSibling;
  addClass(current_button, 'watch-button-selected');
  addClass(current_watch, 'switch-animation');
  setTimeout(removeClass.bind(null, current_watch, 'switch-animation'), 700);
}

function displayFinalWatch() {
  removeClass(final_text, 'zero-opacity');
  addClass(final_text, 'switch-animation');
  addClass(final, 'final-showcase');
  addClass(send, 'opacity-full');
  document.getElementById('final-watch').src = one_watch[0].src;
  document.getElementById('subtitle').innerHTML = 'Bueno!';
  document.getElementById('send-button').disabled = false;
  form.value = one_watch[0].src;
}

watchImagePaths.forEach(watchImagePath => createWatchElement(watchImagePath));

const current_watch = document.querySelector('#selected-watch');
const final = document.querySelector('#final-wrap');
const final_text = document.querySelector('#subtitle');
const send = document.querySelector('#send-button');
const form =  document.querySelector('#final-watch-url');
const watches = document.querySelectorAll('#watches-panel img');
const buttons = document.querySelectorAll('.watch-button');
const wrapper = document.querySelectorAll('.selection-panel');

buttons.forEach(div => div.addEventListener('click', removeWatch));
watches.forEach(img => img.addEventListener('click', imgSwitch));
