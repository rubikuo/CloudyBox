export const convertDate = (isoDate) => {
  if (isoDate) {
    let timeStr = isoDate;
    let date = new Date(timeStr);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dateStr = month + "/" + day + "/" + year;
    return dateStr;
  }
}