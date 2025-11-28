const fname: string = 'Nodejs with Typescript'

console.log(fname)

type HandleFunc = () => Promise<String>
const handle: HandleFunc = () => Promise.resolve('Hello Promise with TypeScript')
handle().then((val) => console.log(val))
