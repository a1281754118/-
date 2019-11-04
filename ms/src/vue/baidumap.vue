<template>
  <div>
    <slot></slot>
    <div ref="map" :style="mapStyle"></div>
  </div>
</template>
<script>
var map, local;
export default {
  props: [
    "mapStyle",
    "controllers",
    "wheelZoom",
    "suggestId",
    "level",
    "lng",
    "lat"
  ],
  data() {
    return {
      options: {
        mapStyle: this.mapStyle,
        controllers: this.controllers || true,
        wheelZoom: this.wheelZoom || true,
        suggestId: this.suggestId,
        lng: this.lng || 118.156801,
        lat: this.lat || 24.485408,
        cursor: this.cursor || "default",
        level: this.level || 12
      }
    };
  },
  mounted() {
    var ele = this.$refs.map;

    map = new BMap.Map(ele); //创建地图
    if (this.options.wheelZoom) {
      map.enableScrollWheelZoom(); //  开启鼠标滚轮缩放
    }
    if (this.options.suggestId) {
      var ac = new BMap.Autocomplete({
        //建立一个自动完成的对象
        input: document.getElementById(this.options.suggestId),
        location: map
      });

      ac.addEventListener("onconfirm", e => {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        var myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        this.$emit("suggestSelect", myValue, _value);
      });
    }
    map.centerAndZoom(
      new BMap.Point(this.options.lng, this.options.lat),
      this.options.level
    ); //设置中心
    map.setDefaultCursor(this.options.cursor); //设置默认鼠标样式
    map.addEventListener("click", event => {
      this.$emit("click", event);
    }); //监听点击
    if (this.options.controllers) {
      var top_left_control = new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_TOP_LEFT
      }); // 左上角，添加比例尺
      var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
      map.addControl(top_left_control); //添加控件
      map.addControl(top_left_navigation); //添加控件
    }
    local = new BMap.LocalSearch(map, {
      renderOptions: { map: map }
    });
    var loaded = function() {
      var c = document.getElementsByClassName("BMap_cpyCtrl");
      var c2 = document.getElementsByClassName("anchorBL");
      c[0].parentElement.removeChild(c[0]);
      c2[0].parentElement.removeChild(c2[0]);
      map.removeEventListener("tilesloaded", loaded);
    };
      map.addEventListener("tilesloaded", loaded);
  },
  methods: {
    center: function(o) {
      map.centerAndZoom(
        new BMap.Point(o.lng || this.options.lng, o.lat || this.options.lat),
        o.level||this.options.level
      ); //设置中心
    },
    clearMarker: function() {
      map.clearOverlays();
    },
    addMarker: function(o) {
      var marker = new BMap.Marker(new BMap.Point(o.lng, o.lat));
      map.addOverlay(marker);
    },
    search: function(value) {
      local.search(value);
    },
    map: function() {
      return map;
    },
    removeMarker: function(point) {
      var allOverlay = map.getOverlays();
      for (var i = 0; i < allOverlay.length; i++) {
        //删除指定经度的点
        if (allOverlay[i] instanceof BMap.Marker) {
          if (
            allOverlay[i].getPosition().lng == point.lng &&
            allOverlay[i].getPosition().lat == point.lat
          ) {
            map.removeOverlay(allOverlay[i]);
          }
        }
      }
    },
    getSuggessPoint: function(options) {
      var local = new BMap.LocalSearch(map, {
        //智能搜索
        onSearchComplete: function myFun() {
          var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          options.success(pp);
        }
      });
      local.search(options.address);
    }
  }
};
</script>