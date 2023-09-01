import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
import preprocess from 'svelte-preprocess';
const dev = process.argv.includes('dev');
const config = {
        preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    paths: {
      base: dev ? '' : process.env.BASE_PATH,
    }
  },
};

export default config; 
