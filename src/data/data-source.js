export class DataSource {
  getData(dataName) {
    return new Promise((resolve, reject) => {
      $.getJSON(dataName, json => {
        resolve(json);
      });
    });
  }
}
