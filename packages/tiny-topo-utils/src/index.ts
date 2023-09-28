interface Iopts {
  name: string;
}
const hello = (opts: Iopts) => {
  console.log(`hello:${opts.name}`);
};

hello({ name: 'qifutao' });