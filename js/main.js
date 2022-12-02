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

/// ========= Date section

const date = document.querySelector('.date')
let newDate = new Date()

function currentHour() {
  return new Date().getHours()
}

function showDate() {
  newDate = new Date()
  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  let currentDate = newDate.toLocaleDateString('en-US', options)
  date.textContent = currentDate
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

function showGreeting() {
  const greetingText = `Good ${getTimeOfDay(currentHour())}`
  return userGreeting.textContent = greetingText
}

/// ========= Time section

const time = document.querySelector('.time')

function showTime() {
  newDate = new Date()
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

userCity.addEventListener('change', getWeather)


async function getWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&lang=en&appid=08983b23d3ae989b57d8a4f5432db702&units=metric`
  let res = await fetch(url)
  let data = await res.json()
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`)
  temperature.textContent = `${data.main.temp}°C`
  weatherDescription.textContent = data.weather[0].description
}

getWeather()