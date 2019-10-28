/**
 * Brandon Ly - Code to make Storybook work with TypeScript.
 *
 * See https://storybook.js.org/docs/configurations/typescript-config/#setting-up-typescript-with-babel-loader,
 * specifically the section for setting up TypeScript in Storybook with Babel 7.
 *
 */
module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
