class ReturnData {
    constructor() {
        this.hasError = false;
        this.error = [];    
    }
  
    addData(key, value) {
      this[key] = value;
    }
  
    toJSON() {
      const obj = { hasError: this.hasError, error: this.error };
      for (const key in this) {
        if (key !== "hasError" && key !== "error") {
          obj[key] = this[key];
        }
      }
      return obj;
    }
  }
  

module.exports = ReturnData;