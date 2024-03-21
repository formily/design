import baseConfig from './webpack.base'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import MonacoPlugin from 'monaco-editor-webpack-plugin' // 注释后可以减少编辑器体积
import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import TerserPlugin from 'terser-webpack-plugin'

const createPages = (pages) => {
  return pages.map(({ filename, template, chunk }) => {
    return new HtmlWebpackPlugin({
      filename,
      template,
      inject: 'body',
      // chunks: chunk,
    })
  })
}

export default {
  ...baseConfig,
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    ...createPages([
      {
        filename: 'index.html',
        template: path.resolve(__dirname, './template.ejs'),
        chunk: ['playground'],
      },
    ]),
    // new MonacoPlugin({
    //   languages: ['json'],
    // }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    moment: 'moment',
    antd: 'antd',
    // 使用 externals 配置将 Ant Design Icons 指定为外部依赖，不进行打包处理。这样，在运行时会从 CDN 加载 Ant Design Icons。
    '@ant-design/icons': 'icons', // 这里假设从 CDN 加载的全局变量为 'icon'
    // 'monaco-editor': 'monaco' // 这里假设从CDN加载的全局变量为'monaco'

    // '@formily/reactive': 'Formily.Reactive',
    // '@formily/path': 'Formily.Path',
    // '@formily/shared': 'Formily.Shared',
    // '@formily/validator': 'Formily.Validator',
    // '@formily/core': 'Formily.Core',
    // '@formily/json-schema': 'Formily.JSONSchema',
    // '@formily/react': 'Formily.React',
    // '@designable/shared': 'Designable.Shared',
    // '@designable/core': 'Designable.Core',
  },
  optimization: {
    minimize: true,
    // size 2M => 400k config
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
    // splitChunks: {
    //   chunks: 'all',
    //   // }
    //   splitChunks: {
    //     // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
    //     chunks: "async",
    //     // 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
    //     minSize: 30000,
    //     maxSize: 1000000,
    //     // 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1。
    //     minChunks: 1,
    //     // 表示按需加载文件时，并行请求的最大数目。默认为5。
    //     maxAsyncRequests: 5,
    //     // 表示加载入口文件时，并行请求的最大数目。默认为3。
    //     maxInitialRequests: 3,
    //     // 表示拆分出的chunk的名称连接符。默认为~。如chunk~vendors.js
    //     automaticNameDelimiter: '~',
    //     // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
    //     name: true,
    //     // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块，就分配到该组。模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。默认将所有来自 node_modules目录的模块打包至vendors组，将两个以上的chunk所共享的模块打包至default组。
    //     cacheGroups: {
    //         vendors: {
    //             test: /[\\/]node_modules[\\/]/,
    //             priority: -10
    //         },
    //         //
    //     default: {
    //             minChunks: 2,
    //             priority: -20,
    //             reuseExistingChunk: true
    //         }
    //     }
    // }

    // // 作者：前端论道
    // // 链接：https://juejin.cn/post/6844904103848443912
    // // 来源：稀土掘金
    // // 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
  },
}
