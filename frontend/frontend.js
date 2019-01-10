const apiUrl = 'https://n0z4ae7ktl.execute-api.eu-central-1.amazonaws.com/default/'

const app = window.vueApp = new Vue({
  el: '#app',
  data: {
    width: 0,
    file: null,
    result: null,
    resultSrc: null,
    imageSrc: null,
    imageInfo: null
  },
  methods: {
    resize () {
      console.log(`resize, width ${this.width}`)
      const req = new XMLHttpRequest()
      const url = `${apiUrl}?width=${this.width}&height=`
      req.responseType = 'blob'
      req.open('POST', url, true)
      req.setRequestHeader("Content-type", "image/png")
      req.onreadystatechange = () => {
        console.log('state changed', req)
      }
      req.onload = e => {
        console.log('done', e)
        console.log(req.responseType, typeof req.response)
        this.result = req.response
        console.log('result updated to', this.result)
        const reader = new FileReader()
        reader.onload = e => {
          this.resultSrc = e.target.result
          console.log('resultSrc updated to', this.resultSrc)
        }
        reader.readAsDataURL(this.result)
      }
      req.send(this.file)
    },

    reset () {
      this.width = this.imageInfo.width
      this.result = null
      this.resultSrc = null
    },

    download () {
      if (this.result) saveBlob(this.result, 'result.png')
    },

    updateImageInfo (e) {
      this.imageInfo = {
        height: e.target.height,
        width: e.target.width
      }
      this.width = this.imageInfo.width
    },

    fileChanged(event) {
      console.log('file changed', event)
      this.result = null
      this.resultSrc = null
      if (event.target.files && event.target.files.length > 0) {
        this.setFile(event.target.files[0])
      } else {
        this.setFile(null)
      }
    },

    setFile(file) {
      if (file) {
        this.file = file
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

function saveBlob (blob, fileName) {
  var a = document.getElementById('downloader')
  if (!a) {
    a = document.createElement("a");
    a.setAttribute('id', 'downloader')
    document.body.appendChild(a);
    a.style = "display: none";
  }
  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}