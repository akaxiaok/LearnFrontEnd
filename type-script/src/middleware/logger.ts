/* tslint:disable:no-console */
function logger() {
  return (store: object) => (next: any) => (action: any) => {
    console.log('log');
    next(action);
  }
}

export default logger();
