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

function showDate() {
  newDate = new Date()
  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  let currentDate = newDate.toLocaleDateString('en-US', options)
  date.textContent = currentDate
}

/// ========= Greeting section
const userGreeting = document.querySelector('.greeting')

function showGreeting() {
  const currentHour = newDate.getHours();

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
  const greetingText = `Good ${getTimeOfDay(currentHour)}`
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