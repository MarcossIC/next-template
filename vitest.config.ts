import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

import path from 'path';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import tsconfig from './tsconfig.json';

const raw: any = tsconfig.compilerOptions.paths;
const alias: any = {};

for (const x in raw) {
  alias[x.replace('/*', '')] = raw[x].map((p: string) =>
    path.resolve(__dirname, p.replace('/*', ''))
  );
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias,
  },
  test: {
    environment: 'jsdom',
  },
});
