export default function importImages() {
    const context = require.context('../assets/img', false, /\.(png|jpe?g|svg)$/)
    return context.keys().map(context);
}
  