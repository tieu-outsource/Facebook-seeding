<template>
  <v-navigation-drawer permanent class="sidebar">
    <v-list-item class="sidebar__header">
      <v-img :src="require('@/assets/logo.png')" max-height="75" />
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <router-link :to="item.link" class="sidebar__item-container">
          <div class="sidebar__item">
            <v-icon>{{ item.icon }}</v-icon>
            <h5>{{ item.title }}</h5>
          </div>
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  setup() {
    const items = [
      { title: "Dashboard", icon: "mdi-view-dashboard", link: "/" },
      { title: "Accounts", icon: "mdi-image", link: "/accounts" },
      { title: "About", icon: "mdi-help-box", link: "/login" },
    ];
    return { items };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 200px !important;
  background: linear-gradient(178.67deg, #147bd8 0%, #00a0ff 100%);
  color: white;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__item-container {
    width: 100%;
    text-decoration: none;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    margin-top: 10px;
    i {
      font-size: 55px;
    }

    h5 {
      font-size: 16px;
    }
  }
}
</style>
