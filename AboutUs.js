<template>
  <div class="AboutUs">
    <h1>About Us</h1>
    <p> The contributors for the periodic table visualization project with IBM for TCD SwEng 2023</p>
    <ul>
      <li v-for="user in users" :key="user.id">
        <img :src="user.photo" :alt="user.name" @click = handleClick />
        
        <h2>{{ user.name }}</h2>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
		message : "",
		message2 : "",
      users: [
        {
          id: 1,
          name: 'NANDINI GUPTA',
          photo: 'https://via.placeholder.com/150',
		      number : '21338634',
		      degree : 'Integrated Computer Science'
        },
        {
          id: 2,
          name: 'ANDREW SYOMUSHKIN',
          photo: 'https://via.placeholder.com/150'
        },
        {
          id: 3,
          name: 'TEMILOLUWA OYEYEMI',
          photo: 'https://via.placeholder.com/150'
        },
        {
          id: 4,
          name: 'DANIEL PADMORE',
          photo: 'https://via.placeholder.com/150'
        },
        {
          id: 5,
          name: 'JAEDON PAGET',
          photo: 'https://via.placeholder.com/150'
        },
        {
          id: 6,
          name: 'NUOXI ZHANG',
          photo: 'https://via.placeholder.com/150'
        },
        {
          id: 7,
          name: 'ANDREY YAMKOVOY',
          photo: 'https://via.placeholder.com/150'
        },
        {
          id: 8,
          name: 'ALANNA FUSCIARDI WA',
          photo: 'https://via.placeholder.com/150'
        },
        {
          id: 9,
          name: 'MAMOKE MERLYN JESSE ARUBAYI',
          photo: 'https://via.placeholder.com/150'
        }
      ]
    }
  },
  methods: {
    handleClick(){
      this.message = this.user.number;
		  this.message2 = this.user.degree;
    }
  }
}
</script>

<style scoped>
/* Add styles for the user list */
.AboutUs {
  font-size: 24px;
  color: #f4f4f4;
  background-color: #212121;
  padding: 20px;
  position : relative;
}
</style>




