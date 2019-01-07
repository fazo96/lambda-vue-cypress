const apiUrl = 'https://n0z4ae7ktl.execute-api.eu-central-1.amazonaws.com/default/'

const app = window.vueApp = new Vue({
  el: '#app',
  data: {
    width: 0,
    file: null,
    imageSrc: null,
    image: null
  },
  methods: {
    resize () {
      console.log(`resize, width ${this.width}`)
      const req = new XMLHttpRequest()
      const url = `${apiUrl}?width=${this.width}`
      req.open('POST', apiUrl, true)
      //req.setRequestHeader("Content-type", "image/png")
      req.onreadystatechange = () => {
        console.log('state changed', req)
      }
      req.onload = e => {
        console.log('done', e)
      }
      req.send(this.file)
    },

    resetWidth () {
      this.width = this.image.width
    },

    updateImageInfo (e) {
      this.image = {
        height: e.target.height,
        width: e.target.width
      }
      this.width = this.image.width
    },

    fileChanged(event) {
      console.log('file changed', event)
      if (event.target.files && event.target.files.length > 0) {
        this.file = event.target.files[0]
        console.log('file updated to', this.file)
        const reader = new FileReader()
        reader.onload = e => {
          this.imageSrc = e.target.result
          console.log('imageSrc updated to', this.imageSrc)
        }
        reader.readAsDataURL(this.file)
      } else {
        console.log('file removed')
        this.file = null
      }
    }
  }
})