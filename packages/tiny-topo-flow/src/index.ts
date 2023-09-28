import helloTinyTopoCore from '@qftjs/tiny-topo-core';

interface Iopts {
  name: string;
}

const helloTinyTopoFlow = (opts: Iopts) => {
  console.log(`hello:${opts.name}`);
};

helloTinyTopoCore({ name: 'tiny-topo-core' });

export default helloTinyTopoFlow;
