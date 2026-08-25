const path = require('path');
const { spawnSync } = require('child_process');
const webpack = require('webpack');

webpack({
  mode: 'development',
  target: 'node',
  entry: path.resolve(__dirname, 'chart_export_entry.js'),
  output: { path: '/tmp/funding-chart-export', filename: 'exporter.cjs' },
}, (error, stats) => {
  if (error) { console.error(error); process.exit(1); }
  const info = stats.toJson();
  if (stats.hasErrors()) { console.error(info.errors); process.exit(1); }
  console.log(stats.toString({ colors: false, chunks: false, modules: false }));
  const result = spawnSync(process.execPath, ['/tmp/funding-chart-export/exporter.cjs'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit',
  });
  process.exit(result.status ?? 1);
});
