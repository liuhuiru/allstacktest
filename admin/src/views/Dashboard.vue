<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :span="5" :offset="1" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <i class="el-icon-user-solid card-panel-icon"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">教授</div>
            <span class="card-panel-num">{{ this.jiaoshouNum }}位</span>
          </div>
        </div>
      </el-col>
      <el-col :span="5" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <i class="el-icon-user-solid card-panel-icon"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">副教授</div>
            <span class="card-panel-num">{{ this.fujiaoNum }}位</span>
          </div>
        </div>
      </el-col>
      <el-col :span="5" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <i class="el-icon-user-solid card-panel-icon"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">讲师</div>
            <span class="card-panel-num">{{ this.jiangshiNum }}位</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <i class="el-icon-user-solid card-panel-icon"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">博/硕士生</div>
            <span class="card-panel-num">{{ this.xueshengNum }}位</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <div
      style="width: 500px; height: 500px"
      ref="memberChart"
      class="memberChart"
    ></div>
    <div
      style="width: 500px; height: 500px"
      ref="achievementChart"
      class="achievementChart"
    ></div>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  // components: {
  // },
  data() {
    return {
      researcher: [],
      project: [],
      paper: [],
      patent: [],
      jiaoshouNum: 0,
      fujiaoNum: 0,
      jiangshiNum: 0,
      xueshengNum: 0,
      name: "课题组科研现状",
      xData: ["科研项目", "科研论文", "科研专利"],
      yData: [3, 5, 6],
    };
  },
  methods: {
    async fetch() {
      const res1 = await this.$http.get("researcher");
      this.researcher = res1.data;
      const res2 = await this.$http.get("project");
      this.project = res2.data;
      const res3 = await this.$http.get("paper");
      this.paper = res3.data;
      const res4 = await this.$http.get("patent");
      this.patent = res4.data;
      this.count();
      this.initmemberCharts();
      this.initachievementCharts();
    },
    count() {
      for (let i = 0; i < this.researcher.length; i++) {
        switch (this.researcher[i].title) {
          case "教授":
            this.jiaoshouNum++;
            break;
          case "副教授":
            this.fujiaoNum++;
            break;
          case "讲师":
            this.jiangshiNum++;
            break;
          case "学生":
            this.xueshengNum++;
            break;
        }
      }
    },
    initmemberCharts() {
      let myChart = echarts.init(this.$refs.memberChart);
      // console.log(this.$refs.chart)
      // 绘制图表
      myChart.setOption({
        title: { text: "课题组人员构成", left: "center" },
        roseType: "angle",
        tooltip: {},
        series: [
          {
            name: "人数",
            type: "pie",
            radius: "55%",
            data: [
              { value: this.jiaoshouNum, name: "教授" },
              { value: this.jiangshiNum, name: "讲师" },
              { value: this.fujiaoNum, name: "副教授" },
              { value: this.xueshengNum, name: "博/硕士生" },
            ],
          },
        ],
      });
    },
    initachievementCharts() {
      let myChart = echarts.init(this.$refs.achievementChart);
      // console.log(this.$refs.chart)
      // 绘制图表
      myChart.setOption({
        title: { text: "课题组成果汇总", left: "center" },
        roseType: "angle",
        tooltip: {},
        series: [
          {
            name: "个数",
            type: "pie",
            radius: "50%",
            data: [
              { value: this.project.length, name: "科研项目" },
              { value: this.patent.length, name: "科研专利" },
              { value: this.paper.length, name: "科研论文" },
            ],
          },
        ],
      });
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.memberChart {
  float: left;
}
.achievementChart {
  float: left;
}
</style>