import { collatedTasks } from '../constants';

export const getTitle = (users, id) => users.find(user => user._id === id);
export const getCollatedTitle =  (users, id) =>
    users.find(user => user._id === id);

export const collatedTasksExist = selectedTask =>
    collatedTasks.find(task => task.key === selectedTask);

export const generatePushId = (() => {
  const PUSH_CHARS =
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  const lastRandChars = [];

  return function() {
    let now = new Date().getTime();

    const timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    let id = timeStampChars.join('');

    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }

    return id;
  };
})();
export const makeEmail = () => {
  let strValues="abcdefg12345";
  let strEmail = "";
  let strTmp;
  for (let i=0;i<10;i++) {
    strTmp = strValues.charAt(Math.round(strValues.length*Math.random()));
    strEmail = strEmail + strTmp;
  }
  strTmp = "";
  strEmail = strEmail + "@";
  for (let j=0;j<8;j++) {
    strTmp = strValues.charAt(Math.round(strValues.length*Math.random()));
    strEmail = strEmail + strTmp;
  }
  strEmail = strEmail + ".com"
  return strEmail;
}