interface Iopts {
  name: string;
}
const helloTinyTopoCore = (opts: Iopts) => {
  console.log(`hello:${opts.name}`);
};

export default helloTinyTopoCore;
