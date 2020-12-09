<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 align-self-center">
        <img src="../assets/404.svg" />
      </div>
      <div class="col-md-6 align-self-center">
        <h1>404</h1>
        <h2>Görünüşe göre birileri kaybolmuş.</h2>
        <p>
          Aradığın sayfa mevcut değil. Buraya nasıl geldiğin de bir muamma ama aşağıdaki linke
          tıklayarak ana sayfaya geri dönebilirsin.
        </p>
        <router-link :to="{ name: 'Home' }" class="btn btn-primary btn-lg px-5 my-3">
          Ana Sayfa
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped lang="scss">
img {
  width: 100%;
}
h1 {
  font-size: 7.5em;
  margin: 15px 0px;
  font-weight: bold;
}
h2 {
  font-weight: bold;
}
.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 12rem);
}
</style>
