import playList from './playList.js';

/// ========= Local Storage section

const userName = document.querySelector('.name')

function setLocalStorage() {
  localStorage.setItem('userName', userName.value)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('userName')) {
    userName.value = localStorage.getItem('userName')
  }
}
window.addEventListener('load', getLocalStorage)

/// ========= Add other languages section

const dropdownMenu = document.querySelector('.dropdown__content')
// const dropdownLang = document.querySelectorAll('.dropdown-language')
const currentLang = document.querySelector('.current-language')
// const hideLang = document.querySelector('.language-hidden')

const langEnglish = document.querySelector('.lang-en')
const langRussian = document.querySelector('.lang-ru')
const langSpanish = document.querySelector('.lang-es')

let pageLang = 'en'
currentLang.textContent = langEnglish.textContent

function dropdownToggle() {
  dropdownMenu.classList.toggle('dropdown--hidden')
}
currentLang.addEventListener('click', dropdownToggle)


langRussian.addEventListener('click', function() {
  currentLang.textContent = langRussian.textContent
  langEnglish.classList.remove('language-hidden')
  langSpanish.classList.remove('language-hidden')
  langRussian.classList.add('language-hidden')
  pageLang = 'ru'
  dropdownToggle()
  getWeather()
  newQuote()
})
langSpanish.addEventListener('click', function() {
  currentLang.textContent = langSpanish.textContent
  langEnglish.classList.remove('language-hidden')
  langRussian.classList.remove('language-hidden')
  langSpanish.classList.add('language-hidden')
  pageLang = 'es'
  dropdownToggle()
  getWeather()
  newQuote()
})
langEnglish.addEventListener('click', function() {
  currentLang.textContent = langEnglish.textContent
  langSpanish.classList.remove('language-hidden')
  langRussian.classList.remove('language-hidden')
  langEnglish.classList.add('language-hidden')
  pageLang = 'en'
  dropdownToggle()
  getWeather()
  newQuote()
})

document.addEventListener('click', e => {
  if (e.target !== dropdownMenu && e.target !== currentLang) {
    dropdownMenu.classList.add('dropdown--hidden')
    // console.log(e.target)
  }
});

/// ========= Date section

const date = document.querySelector('.date')
let newDate = new Date()

function currentHour() {
  return new Date().getHours()
}

function showDate() {
  newDate = new Date()
  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  if (pageLang === 'en') {
    let currentDate = newDate.toLocaleDateString('en-US', options)
    date.textContent = currentDate
  } else if (pageLang === 'ru') {
    let currentDate = newDate.toLocaleDateString('ru-RU', options)
    date.textContent = currentDate
  } else if (pageLang === 'es') {
    let currentDate = newDate.toLocaleDateString('es-ES', options)
    date.textContent = currentDate
  }
}

/// ========= Greeting section

const userGreeting = document.querySelector('.greeting')

function getTimeOfDay(hour) {
  if (hour >= 0 && hour < 6) {
    return 'night'
  } else if (hour >= 6 && hour < 12) {
    return 'morning'
  } else if (hour >= 12 && hour < 18) {
    return 'afternoon'
  } else {
    return 'evening'
  } 
}

function getTimeOfDayRU(hour) {
  if (hour >= 0 && hour < 6) {
    return 'Доброй ночи'
  } else if (hour >= 6 && hour < 12) {
    return 'Доброе утро'
  } else if (hour >= 12 && hour < 18) {
    return 'Добрый день'
  } else {
    return 'Добрый вечер'
  } 
}

function getTimeOfDayES(hour) {
  if (hour >= 0 && hour < 6) {
    return 'Buenas noches'
  } else if (hour >= 6 && hour < 12) {
    return 'Buenos dias'
  } else if (hour >= 12 && hour < 18) {
    return 'Buenas tardes'
  } else {
    return 'Buenas noches'
  } 
}

const greetingTranslation = {
  'English': `Good ${getTimeOfDay(currentHour())},`,
  'Russian': `${getTimeOfDayRU(currentHour)},`,
  'Spanish': `${getTimeOfDayES(currentHour)},`,
}

// function showGreeting(lang) {
//   userGreeting.textContent = greetingTranslation[`${lang}`]
// }

function showaGreeting() {
  if (pageLang === 'en') {
    userGreeting.textContent = greetingTranslation['English']
  } else if (pageLang === 'ru') {
    userGreeting.textContent = greetingTranslation['Russian']
  } else if (pageLang === 'es') {
    userGreeting.textContent = greetingTranslation['Spanish']
  }
}

/// ========= Time section

const time = document.querySelector('.time')

function showTime() {
  newDate = new Date()
  let currentTime = newDate.toLocaleTimeString()
  time.textContent = currentTime
  showDate()
  showaGreeting()
  setTimeout(showTime, 1000)
}
  
showTime()

/// ========= Slider section 

const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNum = getRandomInt(10, 20)

function getSlideNext() {
  if (randomNum < 20) {
    randomNum += 1
  } else if (randomNum == 20) {
    randomNum = 10
  }
  setBg()
}
function getSlidePrev() {
  if (randomNum > 10) {
    randomNum -= 1
  } else if (randomNum == 10) {
    randomNum = 20
  }
  setBg()
}

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

function setBg() {
  let bgNum = randomNum
  let timeOfDay = getTimeOfDay(currentHour())
  let img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
  img.onload = () => {
    document.body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg)`
  }
}

setBg()

/// ========= Weather section

const userCity = document.querySelector('.city')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')

userCity.value = 'Moscow'
userCity.addEventListener('change', getWeather)

async function getWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&lang=${pageLang}&appid=08983b23d3ae989b57d8a4f5432db702&units=metric`
  let res = await fetch(url)
  let data = await res.json()
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`)
  temperature.textContent = `${data.main.temp}°C`
  weatherDescription.textContent = data.weather[0].description
}

getWeather()

/// ========= Quote of the day section

const quote = document.querySelector('.quote')
const quoteAuthor = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

function newQuote() {
  if (pageLang === 'en') {
    getQuotesEN()
  } else if (pageLang === 'ru') {
    getQuotesRU()
  } else if (pageLang === 'es') {
    getQuotesES()
  }
}

changeQuote.addEventListener('click', newQuote)

async function getQuotesEN() {
  let quotes = 'js/quotesEN.json'
  let res = await fetch(quotes)
  let data =  await res.json()
  let randomNumber = getRandomInt(0, 9)
  quote.textContent = data[randomNumber].text
  quoteAuthor.textContent = data[randomNumber].author
}
async function getQuotesRU() {
  let quotes = 'js/quotesRU.json'
  let res = await fetch(quotes)
  let data =  await res.json()
  let randomNumber = getRandomInt(0, 9)
  quote.textContent = data[randomNumber].text
  quoteAuthor.textContent = data[randomNumber].author
}
async function getQuotesES() {
  let quotes = 'js/quotesES.json'
  let res = await fetch(quotes)
  let data =  await res.json()
  let randomNumber = getRandomInt(0, 9)
  quote.textContent = data[randomNumber].text
  quoteAuthor.textContent = data[randomNumber].author
}
getQuotesEN()

/// ========= Audio player section

const audio = document.querySelector('audio')
const playButton = document.querySelector('.play')
const playPrevButton = document.querySelector('.play-prev')
const playNextButton = document.querySelector('.play-next')
const playListContainer = document.querySelector('.play-list')

let isPlay = false
let playNum = 0

playButton.addEventListener('click', playAudio)

function togglePlay() {
  if (isPlay) {
  playButton.classList.add('pause')
  } else {
    playButton.classList.remove('pause')
  }  
}

function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum].src
    audio.currentTime = 0
    audio.play()
    isPlay = true
    togglePlay()
  } else {
    audio.pause()
    isPlay = false
    togglePlay()
  }
}

function playNext() {
  playAudio()
}
function playPrev() {
  playAudio()
}

playNextButton.addEventListener('click', playNext)
playPrevButton.addEventListener('click', playPrev)

playList.forEach(el => {
  let li = document.createElement('li')
  li.classList.add('play-item')
  li.textContent = el.title
  playListContainer.append(li)
  // console.log(el.title)
})