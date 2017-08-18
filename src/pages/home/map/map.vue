<template>
    <div class="map">
        <x-header style="background-color: #eb6100;">商家位置</x-header>
        <div class="map-view" style="margin-top: 46px;">
    
            <group class="group">
                <cell :title="storeInfo.address">
                    <!-- <img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="> -->
                </cell>
                <cell :title="storeInfo.telphone" is-link>
                    <!-- <img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="> -->
                </cell>
            </group>
            <div class="amap-wrapper">
                <el-amap :vid="'amap-vue'" :center="center" :zoom="zoom">
                    <el-amap-marker v-for="marker in markers" :key="marker" :position="marker.position" :events="marker.events"></el-amap-marker>
                    <el-amap-info-window v-for="window in windows" :key="window"  :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
                </el-amap>
    
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import { XHeader, Loading, Scroller, Cell, Group } from 'vux'

export default {
    data() {
        let self = this;
        return {
            zoom: 14,
            center: [121.5652703333, 38.9156007488],
            markers: [],
            windows: [],
            storeInfo: {}
        }
    },
    components: {
        XHeader,
        Loading,
        Scroller,
        Group,
        Cell,

    },
    mounted() {

        this.storeInfo = JSON.parse(localStorage.getItem("storeInfo"));
        var longitude = Number(this.storeInfo.longitude);
        var latitude = Number(this.storeInfo.latitude);
        this.center = [longitude,latitude];
        console.log(this.center);
        let markers = [];
        let windows = [];
        let self = this;
        markers.push({
            position:  this.center,
            events: {
                click() {
                    self.windows.forEach(window => {
                        window.visible = false;
                    });

                    self.$nextTick(() => {
                        self.windows[0].visible = true;
                    });
                }
            }
        });

        windows.push({
            position:  this.center,
            content: `<div class="prompt">${this.storeInfo.site_name}</div>`,
            visible: true
        });

        this.markers = markers;
        this.windows = windows;
    }
}
</script>
<style type="less">
.group {
    padding-top: 10px;
    text-align: left;
}

.weui-cell {
    font-size: .6rem;
}

.amap-wrapper {
    bottom: .1rem;
    position: fixed;
    z-index: 99;
    width: 94%;
    margin-left: 3%;
    margin-right: 3%;
    margin-bottom: 1rem;
    height: 20rem;
    box-shadow: 2px 3px 4px RGB(218, 218, 218);
}

.amap-maps {
    border-radius: 5px;
}

.amap-layers {
    border-radius: 5px;
}
</style>
