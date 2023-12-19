const dateFunc = (dateEnd) => {
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cYear = currentDate.getFullYear();
    let cMonth = currentDate.getMonth();
    if (dateEnd) {
      cMonth = currentDate.getMonth() + 3;
    } else {
      cMonth = cMonth + 1;
    }
    if (cMonth > 12) {
      cMonth = cMonth - 12;
      cYear = cYear + 1;
    }

    if (cMonth < 10) {
      cMonth = '0' + cMonth;
    }
    if (cDay < 10) {
      cDay = '0' + cDay;
    }

    console.log('dates ' + cYear + '-' + cMonth + '-' + cDay);
    return cYear + '-' + cMonth + '-' + cDay;
  };

  export default dateFunc;