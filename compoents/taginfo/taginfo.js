// compoents/taginfo/taginfo.js
Component({
  data: {
    lockFlag: true
  },
  properties: {
    title: {
      type: String,
      value: ""
    },
    textColor: {
      type: String,
      value: ""
    },
    tags: {
      type: Array,
      value: []
    },
    locked: {
      type: Boolean,
      value: true,
      observer: function(e){
        this.updateLock()
      }
    }
  },
  lifetimes: {
    attached() {
      this.updateLock()
    }
  },
  methods: {
    onTap() {
      this.triggerEvent("toUnlock");
    },
    updateLock(){
      this.setData({
        lockFlag: this.properties.locked
      })
    }
  }
})