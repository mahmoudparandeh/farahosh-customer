export class Utility {
  static isNumber(event: any): boolean {
    const key = event.keyCode || event.charCode;
    if ((key > 47 && key < 59) || key === 110 || key === 190) {
      return true;
    } else {
      return false;
    }
  }
}
