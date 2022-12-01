function include(url) {
    let script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

include('js/features/clockAndCalendar.js');