import axios from 'axios';

export const CallumAPI = {
  celebrities: [

  ],
  celebrity: {},
  all: function () {
    return axios.get('/profiles', {


    })
      .then(res => {
        this.celebrities = res.data;
        return this.celebrities;
      })
  },

  getCelebrity: function (id) {
    return axios.get(`/profiles/${id}`, {


    })
      .then(res => {
        this.celebrity = res.data;
        return this.celebrity;
      })
  },

  addCelebrity: function (celebrity) {
    const formData = new FormData();
    formData.append('firstName', celebrity.firstName);
    formData.append('lastName', celebrity.lastName);
    formData.append('address', celebrity.address);
    formData.append('gender', celebrity.gender);
    formData.append('image', celebrity?.file);
    formData.append('age', celebrity?.age)
    return axios.post('/profiles', formData, {

    }).then(
      res => {
        this.celebrity = res.data;
        return this.celebrity;
      }
    )


  },

  editCelebrity: function (celebrity, id) {
    const formData = new FormData();
    formData.append('firstName', celebrity.firstName);
    formData.append('lastName', celebrity.lastName);
    formData.append('address', celebrity.address);
    formData.append('gender', celebrity.gender);
    if(celebrity?.file) {
      formData.append('image', celebrity?.file);
    }
    formData.append('age', celebrity?.age)
    return axios.put(`/profiles/${id}`, formData, {

    }).then(
      res => {
        this.celebrity = res.data;
        return this.celebrity;
      }
    )


  },
  deleteCelebrity: function (id) {
    return axios.delete(`/profiles/${id}`).then(
      res => {
        this.celebrity = res.data;
        return this.celebrity;
      }
    )
  }
}
