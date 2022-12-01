const time = document.querySelector('.time')
const date = document.querySelector('.date')

function showDate() {
  let newDate = new Date()
  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  let currentDate = newDate.toLocaleDateString('en-US', options)
  date.textContent = currentDate
}

function showTime() {
  let newDate = new Date()
  let currentTime = newDate.toLocaleTimeString()
  time.textContent = currentTime
  showDate()
  setTimeout(showTime, 1000)
}

showTime()
