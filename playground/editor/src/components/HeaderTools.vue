<script setup lang="ts">
import { ref } from 'vue'
import { ElSelect } from 'element-plus'
import { useEditorStore } from '@/stores/editor'

interface ToolConfig {
  name: string
  icon: string
  desc: string
}

const editorStore = useEditorStore()
const currentLineType = ref(editorStore.lineType)

const toolsConfig: Array<ToolConfig> = [
  {
    name: 'save',
    icon: 'icon-save',
    desc: '保存'
  },
  {
    name: 'open-file',
    icon: 'icon-folder-open',
    desc: '打开文件'
  },
  {
    name: 'save-to-picture',
    icon: 'icon-image',
    desc: '保存为图片'
  },
  {
    name: 'undo',
    icon: 'icon-undo',
    desc: '撤销'
  },
  {
    name: 'redo',
    icon: 'icon-redo',
    desc: '重做'
  },
  {
    name: 'zoom-in',
    icon: 'icon-zoomin',
    desc: '放大'
  },
  {
    name: 'zoom-out',
    icon: 'icon-zoomout',
    desc: '缩小'
  },
  {
    name: 'clear',
    icon: 'icon-clear',
    desc: '清除画布'
  },
  {
    name: 'group',
    icon: 'icon-group',
    desc: '组合'
  },
  {
    name: 'ungroup',
    icon: 'icon-ungroup',
    desc: '取消组合'
  },
  {
    name: 'select',
    icon: 'icon-select',
    desc: '框选'
  }
]

const lineTypes = [
  {
    value: 'ortogonalLine',
    label: '折线'
  },
  {
    value: 'line',
    label: '直线'
  },
  {
    value: 'bezierCurve',
    label: '曲线'
  }
]

const changeLineType = (value: string) => {
  editorStore.setLineType(value)
}
</script>

<template>
  <div class="header-tools">
    <span
      class="icon iconfont tool-icon"
      :class="tool.icon"
      v-for="tool in toolsConfig"
      :key="tool.name"
      :title="tool.desc"
    ></span>
    <el-select
      v-model="currentLineType"
      :size="'small'"
      @change="changeLineType"
      style="width: 60px"
    >
      <el-option
        v-for="item in lineTypes"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<style scoped>
.header-tools {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #fbfbfb;
  border-bottom: 1px solid #dadce0;
  padding: 4px 14px;
  .tool-icon {
    margin-right: 10px;
    cursor: pointer;
    font-size: 18px;
    padding: 4px;
    margin-right: 8px;
    &:hover {
      cursor: pointer;
      background-color: #eeeeee;
      color: #5cb6ff;
    }
    &.disabled {
      color: #ccc;
    }
  }
}
</style>
