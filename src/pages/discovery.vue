<template>
  <div class="discovery">
    <header class="header">
      <headtitle></headtitle>
    </header>
    <div class="page">
      <div v-for="item in findList"
           class="box_list">
        <router-link :to="{name:'featureDetail',params:{feature_id:item.id}}">
          <img :src="item.mimgShow"
               alt="">
          <div class="text">
            <p class="icon">{{item.title}}</p>
            <p class="time">{{item.createTime}}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import headtitle from '../components/header'
export default {
  props: [],
  findList: [],
  data() {
    return {
      findList: [1, 2, 3]
    }
  },
  components: {
    headtitle
  },
  methods: {

    Request() {

      var url = '/rest/find/findFeature';
      var that = this;
      that.axios.get(url)
        .then(response => {
          that.findList = response.data.data.featureList;
        })
    }
  },
  mounted() {

    this.active("#discovery");
    this.Request();

  },
  updata() {
    this.Request();

  }

}
</script>

<style>
@import "../../reset.css";
.discovery .box_list {
  width: 100%;
  height: 8.0rem;
  overflow: hidden;
  margin-bottom: 0.08rem;
}

.discovery .box_list a {
  display: block;
  width: 100%;
  height: 8.0rem;
  position: relative;
}

.discovery .box_list .text {
  width: 100%;
  height: 2rem;
  position: absolute;
  bottom: 0;
  padding-left: 0.44rem;
  background: rgba(35, 35, 35, 0.5);
}

.discovery .box_list a .text .icon {
  font-size: 0.6rem;
  color: #fff;
  padding-top: 0.35rem;
  width: 85%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}

.discovery .box_list a .text .time {
  font-size: 0.5rem;
  color: #fff;
  text-align: left;
}

.discovery .page {
  margin-top: 1.76rem;
  margin-bottom: 2.2rem;
}

.discovery img {
  width: 100%;
  display: block;
  height: auto;
}
</style>