import playList from './playList.js';

/// ========= Local Storage section

const userName = document.querySelector('.name')

function setLocalStorage() {
  localStorage.setItem('userName', userName.value)
  localStorage.setItem('userCity', userCity.value)
  localStorage.setItem('pageLangOnLoad', pageLang)
}

function getLocalStorage() {
  if (localStorage.getItem('userName')) {
    userName.value = localStorage.getItem('userName')
    showPlaceholder()
  }
  if (localStorage.getItem('userCity')) {
    userCity.value = localStorage.getItem('userCity')
    getWeather()
  }
  if (localStorage.getItem('pageLangOnLoad') !== pageLang) {
    if (localStorage.getItem('pageLangOnLoad') !== null) {
      currentLang.textContent = localStorage.getItem('pageLangOnLoad')
      pageLang = localStorage.getItem('pageLangOnLoad')
      showPlaceholder()
      newQuote()
      getWeather()
      localizeSettings()
    } else if (localStorage.getItem('pageLangOnLoad') === null) {
      currentLang.textContent = 'en'
    }
    
  }
}

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)

/// ========= Add other languages section

const dropdownMenu = document.querySelector('.dropdown__content')
const currentLang = document.querySelector('.current-language')
const langEnglish = document.querySelector('.lang-en')
const langRussian = document.querySelector('.lang-ru')
const langSpanish = document.querySelector('.lang-es')

let pageLang = 'en'

currentLang.textContent = pageLang

function dropdownToggle() {
  dropdownMenu.classList.toggle('dropdown--hidden')
}

currentLang.addEventListener('click', dropdownToggle)
window.addEventListener('load', e => {
  if (pageLang === 'ru') {
    langEnglish.classList.remove('language-hidden')
    langSpanish.classList.remove('language-hidden')
    langRussian.classList.add('language-hidden')
  } else if (pageLang === 'es') {
    langEnglish.classList.remove('language-hidden')
    langRussian.classList.remove('language-hidden')
    langSpanish.classList.add('language-hidden')
  }
})

langRussian.addEventListener('click', function() {
  currentLang.textContent = langRussian.textContent
  langEnglish.classList.remove('language-hidden')
  langSpanish.classList.remove('language-hidden')
  langRussian.classList.add('language-hidden')
  console.log(userName.placeholder)
  pageLang = 'ru'
  dropdownToggle()
  getWeather()
  newQuote()
  localizeSettings()
  showPlaceholder()
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
  localizeSettings()
  showPlaceholder()

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
  localizeSettings()
  showPlaceholder()
})

document.addEventListener('click', e => {
  if (e.target !== dropdownMenu && e.target !== currentLang) {
    dropdownMenu.classList.add('dropdown--hidden')
  }
});

/// ========= Date section

const date = document.querySelector('.date')

function currentHour() {
  return new Date().getHours()
}
function showDate() {
  let newDate = new Date()
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

const greetingContainer = document.querySelector('.greeting-container')
const userGreeting = document.querySelector('.greeting')
const greetingPlaceholder = document.querySelector('.greeting-placeholder')

function setPlaceholder() {
  if (pageLang === 'en') {
    greetingPlaceholder.textContent = '[Enter name]'
  } else if (pageLang === 'ru') {
    greetingPlaceholder.textContent = '[Введите имя]'
  } else if (pageLang === 'es') {
    greetingPlaceholder.textContent = '[Ingrese su nombre]'
  }
}
function showPlaceholder() {
  if (userName.value === '') {
    setPlaceholder()
  } else {
    greetingPlaceholder.textContent = ''
  }
}
showPlaceholder()

userName.addEventListener('input', showPlaceholder)

function getTimeOfDay(hour) {
  if (hour >= 0 && hour < 6) {
    return 'night'
  } else if (hour >= 6 && hour < 12) {
    return 'morning'
  } else if (hour >= 12 && hour < 18) {
    return 'afternoon'
  } else if (hour >=18 && hour < 24) {
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
  } else if (hour >=18 && hour < 24) {
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
  } else if (hour >=18 && hour < 24) {
    return 'Buenas noches'
  } 
}

const greetingTranslation = {
  'English': `Good ${getTimeOfDay(currentHour())},`,
  'Russian': `${getTimeOfDayRU(currentHour())},`,
  'Spanish': `${getTimeOfDayES(currentHour())},`,
}

function showGreeting() {
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
  let newDate = new Date()
  let currentTime = newDate.toLocaleTimeString()
  time.textContent = currentTime
  showDate()
  showGreeting()
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

// ===========================

// Turn this section ON when you need images from GitHub (static 20 images per time of day), not from Unsplash

// ===========================

/* function getRandomBgNumber() {
  let num = getRandomInt(1, 20)
  if (num < 10) {
    return `0${num}`
  } return num
}

let randomNum = getRandomBgNumber()

function getSlideNext() {
  if (randomNum < 20) {
    randomNum += 1
  } else if (randomNum == 20) {
    randomNum = 1
  }
  setBg()
}
function getSlidePrev() {
  if (randomNum > 1) {
    randomNum -= 1
  } else if (randomNum == 1) {
    randomNum = 20
  }
  setBg()
}

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

function setBg() {
  let bgNum = getRandomBgNumber()
  let timeOfDay = getTimeOfDay(currentHour())
  let img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
  img.onload = () => {
    document.body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg)`
  }
}
setBg() */


/// ========= API BACKGROUND section

async function setBgAPI() {
  let timeOfDay = getTimeOfDay(currentHour())
  const apiUrl = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=Ly8qHaqhTrN5wcOPTxKNJdXSVpBB34su6ztYTBhQIik`
  const res = await fetch(apiUrl);
  const data = await res.json();
  const imgUrl = data.urls.regular
  let img = new Image();
  img.src = imgUrl
  img.onload = () => {
    document.body.style.backgroundImage = `url(${imgUrl})`
  }
}

setBgAPI()

function getSlideNext() {
  setBgAPI()
}
function getSlidePrev() {
  setBgAPI()
}

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)


/// ========= Weather section

const weather = document.querySelector('.weather')
const userCity = document.querySelector('.city')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const feelsLike = document.querySelector('.feels-like')

userCity.addEventListener('change', getWeather)

async function getWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&lang=${pageLang}&appid=08983b23d3ae989b57d8a4f5432db702&units=metric`
  let res = await fetch(url)
  let data = await res.json()
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`)
  temperature.textContent = `${Math.round(data.main.temp)}°C`
  weatherDescription.textContent = data.weather[0].description
  if (pageLang === 'en') {
    feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
    humidity.textContent = `Humidity: ${data.main.humidity}%`
  } else if (pageLang === 'ru') {
    feelsLike.textContent = `Ощущается как ${Math.round(data.main.feels_like)}°C`
    wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`
    humidity.textContent = `Влажность: ${data.main.humidity}%`
  } else if (pageLang === 'es') {
    feelsLike.textContent = `Se siente como ${Math.round(data.main.feels_like)}°C`
    wind.textContent = `Velocidad del viento: ${Math.round(data.wind.speed)} m/s`
    humidity.textContent = `Humedad: ${data.main.humidity}%`
  }
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
newQuote()

/// ========= Audio player section

const audioPlayer = document.querySelector('.player')
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
  audio.pause()
  audio.src = playList[playNum + 1].src
  audio.currentTime = 0
  audio.play()
  isPlay = true
  playNum += 1
  togglePlay()
}
function playPrev() {
  audio.pause()
  audio.src = playList[playNum - 1].src
  audio.currentTime = 0
  audio.play()
  isPlay = true
  playNum -= 1
  togglePlay()
}

playNextButton.addEventListener('click', playNext)
playPrevButton.addEventListener('click', playPrev)

playList.forEach(el => {
  let li = document.createElement('li')
  li.classList.add('play-item')
  li.textContent = el.title
  playListContainer.append(li)
})

/// ========= Settings section

const settingsGear = document.querySelector('.settings')
const settingsMenu = document.querySelector('.settings__menu')

const timeToggleSwitch = document.querySelector('.settings--time')
const timeLabel = document.querySelector('.settings--time-span')

const dateToggleSwitch = document.querySelector('.settings--date')
const dateLabel = document.querySelector('.settings--date-span')

const greetingToggleSwitch = document.querySelector('.settings--greeting')
const greetingLabel = document.querySelector('.settings--greeting-span')

const quoteToggleSwitch = document.querySelector('.settings--quote')
const quoteLabel = document.querySelector('.settings--quote-span')

const weatherToggleSwitch = document.querySelector('.settings--weather')
const weatherLabel = document.querySelector('.settings--weather-span')

const audioToggleSwitch = document.querySelector('.settings--audio')
const audioLabel = document.querySelector('.settings--audio-span')

function toggleSettings() {
  settingsMenu.classList.toggle('settings-hide')
}

settingsGear.addEventListener('click', toggleSettings)

function localizeSettings() {
  if (pageLang === 'en') {
    timeLabel.textContent = 'Time'
    dateLabel.textContent = 'Date'
    greetingLabel.textContent = 'Greeting'
    quoteLabel.textContent = 'Quote of the day'
    weatherLabel.textContent = 'Weather'
    audioLabel.textContent = 'Audio player'
  } else if (pageLang === 'ru') {
    timeLabel.textContent = 'Время'
    dateLabel.textContent = 'Дата'
    greetingLabel.textContent = 'Приветствие'
    quoteLabel.textContent = 'Цитата дня'
    weatherLabel.textContent = 'Погода'
    audioLabel.textContent = 'Аудиоплеер'
  } else if (pageLang === 'es') {
    timeLabel.textContent = 'Tiempo'
    dateLabel.textContent = 'Fecha'
    greetingLabel.textContent = 'Saludo'
    quoteLabel.textContent = 'Cita del día'
    weatherLabel.textContent = 'Clima'
    audioLabel.textContent = 'Reproductor de música'
  }
}

function toggleElement(el) {
  el.classList.toggle('hide-from-settings')
} 

timeToggleSwitch.addEventListener('change', e => toggleElement(time))
dateToggleSwitch.addEventListener('change', e => toggleElement(date))
greetingToggleSwitch.addEventListener('change', e => toggleElement(greetingContainer))
quoteToggleSwitch.addEventListener('change', e => {
  toggleElement(quote)
  toggleElement(quoteAuthor)
  toggleElement(changeQuote)
})
weatherToggleSwitch.addEventListener('change', e => toggleElement(weather))
audioToggleSwitch.addEventListener('change', e => toggleElement(audioPlayer))