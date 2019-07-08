function getCueParameter(cuesRead, param) {
  let allCuesForParam = [];
  for (let i = 0; i < cuesRead.length; i++) {
    let objArr = JSON.parse(cuesRead[i]);
    for (let j = 0; j < objArr.length; j++) {
      if (objArr[j][param]) {
        allCuesForParam.push(
          objArr[j][param]
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .trim()
            .toLowerCase()
        );
      }
    }
  }
  return allCuesForParam;
}
