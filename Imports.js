let Imports  = {
    Fonts : [
      
    ],
    SCSS : [
        './src/scss/vars.scss',
        './src/scss/mixins.scss',
    ]
}

let Resources = [];
for (let Resource in Imports) {
    Resources.push(...Imports[Resource])
  }

console.log('Import resources:')
console.log(Resources)


module.exports = Resources;